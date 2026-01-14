const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
const path = require('path');
const crypto = require('crypto');
const app = express();
const PORT = 3000;

app.use(bodyParser.json({ limit: '5mb' }));
app.use(bodyParser.urlencoded({ limit: '5mb', extended: true }));
app.use(express.static('public'));

const DATA_FILE = path.join(__dirname, 'data.json');
const ADMIN_FILE = path.join(__dirname, 'admin.json');
const SECRET = 'bbz-secret-2026';

// Initialize files if they don't exist
if (!fs.existsSync(DATA_FILE)) {
    fs.writeFileSync(DATA_FILE, '[]');
}

// Robust JSON loader
function loadJSON(file, defaultValue = []) {
    try {
        if (!fs.existsSync(file)) return defaultValue;
        const content = fs.readFileSync(file, 'utf8').trim();
        if (!content) return defaultValue;
        return JSON.parse(content);
    } catch (e) {
        console.error(`Error parsing ${file}:`, e);
        return defaultValue;
    }
}

// Helper to save JSON
function saveJSON(file, data) {
    try {
        fs.writeFileSync(file, JSON.stringify(data, null, 2));
        return true;
    } catch (e) {
        console.error(`Error saving ${file}:`, e);
        return false;
    }
}

// Cleanup old returned loans (older than 30 days)
function performCleanup() {
    const loans = loadJSON(DATA_FILE);
    const thirtyDaysAgo = new Date();
    thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);

    const initialCount = loans.length;
    const filteredLoans = loans.filter(loan => {
        if (loan.returned && loan.returnedAt) {
            const returnDate = new Date(loan.returnedAt);
            return returnDate > thirtyDaysAgo;
        }
        return true;
    });

    if (filteredLoans.length !== initialCount) {
        console.log(`Cleanup: Removed ${initialCount - filteredLoans.length} old entries (30+ days returned).`);
        saveJSON(DATA_FILE, filteredLoans);
    }
}

// Helper to check password
function checkPassword(inputPassword) {
    const config = loadJSON(ADMIN_FILE, null);
    if (!config) return false;
    const inputHash = crypto.createHash('sha256').update(inputPassword).digest('hex');
    return inputHash === config.passwordHash;
}

// Generate a simple token for the cookie
function createToken() {
    const config = loadJSON(ADMIN_FILE, null);
    if (!config) return null;
    return crypto.createHash('sha256').update(config.passwordHash + SECRET).digest('hex');
}

// Verify a token
function verifyToken(token) {
    const expected = createToken();
    return token && token === expected;
}

// Routes
app.post('/api/loans', (req, res) => {
    const newLoan = {
        id: Date.now(),
        ...req.body,
        returned: false,
        timestamp: new Date().toISOString()
    };

    const loans = loadJSON(DATA_FILE);
    loans.push(newLoan);
    saveJSON(DATA_FILE, loans);
    res.json({ success: true });
});

// Update a loan (edit modal)
app.post('/api/admin/update', (req, res) => {
    const { token, id, updateData } = req.body;
    if (verifyToken(token)) {
        let loans = loadJSON(DATA_FILE);
        let found = false;
        loans = loans.map(loan => {
            if (String(loan.id) === String(id)) {
                found = true;
                return { ...loan, ...updateData };
            }
            return loan;
        });
        if (found) {
            saveJSON(DATA_FILE, loans);
            res.json({ success: true });
        } else {
            res.status(404).json({ error: 'Loan not found' });
        }
    } else {
        res.status(401).json({ authorized: false });
    }
});

app.post('/api/admin/verify', (req, res) => {
    const { token } = req.body;
    if (verifyToken(token)) {
        performCleanup(); // Clean up before sending
        const loans = loadJSON(DATA_FILE);
        res.json({ authorized: true, loans });
    } else {
        res.status(401).json({ authorized: false });
    }
});

app.post('/api/admin/loans', (req, res) => {
    const { password } = req.body;
    if (checkPassword(password)) {
        performCleanup(); // Clean up before sending
        const loans = loadJSON(DATA_FILE);
        const token = createToken();
        res.json({ authorized: true, loans, token });
    } else {
        res.status(401).json({ authorized: false });
    }
});

// Toggle return status
app.post('/api/admin/return', (req, res) => {
    const { token, id, status } = req.body;
    if (verifyToken(token)) {
        let loans = loadJSON(DATA_FILE);
        let updated = false;
        loans = loans.map(loan => {
            if (String(loan.id) === String(id)) {
                updated = true;
                const newStatus = (typeof status === 'boolean') ? status : !loan.returned;
                const returnedAt = newStatus ? new Date().toISOString() : null;
                return { ...loan, returned: newStatus, returnedAt };
            }
            return loan;
        });

        if (updated) {
            saveJSON(DATA_FILE, loans);
            res.json({ success: true });
        } else {
            res.status(404).json({ success: false, error: 'Loan not found' });
        }
    } else {
        res.status(401).json({ authorized: false });
    }
});

app.listen(PORT, () => {
    performCleanup(); // Initial cleanup on start
    console.log(`Server running at http://localhost:${PORT}`);
});
