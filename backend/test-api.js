// Test script for IMG Protocol Backend API
async function testBackendAPI() {
    // Dynamic import for node-fetch
    const fetch = (await import('node-fetch')).default;
    console.log('🧪 Testing IMG Protocol Backend API...\n');
    
    // Test 1: Health check
    try {
        console.log('1️⃣ Testing health check...');
        const healthResponse = await fetch('http://localhost:3001/health');
        const healthData = await healthResponse.json();
        console.log('✅ Health check:', healthData);
    } catch (error) {
        console.log('❌ Health check failed:', error.message);
    }
    
    console.log('');
    
    // Test 2: IMG token info
    try {
        console.log('2️⃣ Testing IMG token info...');
        const infoResponse = await fetch('http://localhost:3001/api/img-token-info');
        const infoData = await infoResponse.json();
        console.log('✅ IMG token info:', infoData);
    } catch (error) {
        console.log('❌ IMG token info failed:', error.message);
    }
    
    console.log('');
    
    // Test 3: Check IMG tokens (test wallet)
    try {
        console.log('3️⃣ Testing IMG token check...');
        const testWallet = '11111111111111111111111111111111'; // Test wallet address
        
        const tokenResponse = await fetch('http://localhost:3001/api/check-img-tokens', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                walletAddress: testWallet
            })
        });
        
        const tokenData = await tokenResponse.json();
        console.log('✅ IMG token check:', tokenData);
    } catch (error) {
        console.log('❌ IMG token check failed:', error.message);
    }
    
    console.log('\n🎯 Backend API test completed!');
}

// Run the test
testBackendAPI().catch(console.error);
