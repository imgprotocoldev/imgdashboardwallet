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

// Reset polls and votes
db.serialize(() => {
    // Clear all votes
    db.run('DELETE FROM votes', (err) => {
        if (err) {
            console.error('❌ Error clearing votes:', err.message);
        } else {
            console.log('✅ Cleared all votes');
        }
    });
    
    // Reset poll options to zero
    db.run('UPDATE polls SET options = ?', [JSON.stringify({yes: 0, no: 0, abstain: 0, total: 0})], (err) => {
        if (err) {
            console.error('❌ Error resetting poll options:', err.message);
        } else {
            console.log('✅ Reset all poll options to zero');
        }
    });
    
    // Show current polls
    db.all('SELECT id, title, options FROM polls', (err, rows) => {
        if (err) {
            console.error('❌ Error fetching polls:', err.message);
        } else {
            console.log('📊 Current polls:');
            rows.forEach(poll => {
                console.log(`  Poll ${poll.id}: ${poll.title}`);
                console.log(`  Options: ${poll.options}`);
            });
        }
        
        // Close database
        db.close((err) => {
            if (err) {
                console.error('❌ Error closing database:', err.message);
            } else {
                console.log('✅ Database closed');
                console.log('🎉 Polls reset successfully!');
            }
        });
    });
});
