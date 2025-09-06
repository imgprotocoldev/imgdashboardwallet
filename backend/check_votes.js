const sqlite3 = require('sqlite3').verbose();
const path = require('path');

// Database path
const dbPath = path.join(__dirname, 'voting.db');

// Create database connection
const db = new sqlite3.Database(dbPath, (err) => {
    if (err) {
        console.error('❌ Error opening database:', err.message);
        process.exit(1);
    }
    console.log('✅ Connected to SQLite database');
});

// Check current votes
db.all('SELECT * FROM votes', (err, rows) => {
    if (err) {
        console.error('❌ Error fetching votes:', err.message);
    } else {
        console.log('📊 Current votes:');
        if (rows.length === 0) {
            console.log('  No votes found');
        } else {
            rows.forEach(vote => {
                console.log(`  Poll ${vote.poll_id}: ${vote.wallet_address} voted ${vote.vote_option} at ${vote.voted_at}`);
            });
        }
    }
    
    // Close database
    db.close((err) => {
        if (err) {
            console.error('❌ Error closing database:', err.message);
        } else {
            console.log('✅ Database closed');
        }
    });
});
