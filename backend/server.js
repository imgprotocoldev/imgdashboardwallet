const express = require('express');
const cors = require('cors');
const { Connection, PublicKey } = require('@solana/web3.js');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(cors());
app.use(express.json());

// Solana connection (using public RPC endpoint)
const connection = new Connection('https://api.mainnet-beta.solana.com', 'confirmed');

// IMG token mint address
const IMG_TOKEN_MINT = 'znv3FZt2HFAvzYf5LxzVyryh3mBXWuTRRng25gEZAjh';
const REQUIRED_IMG_AMOUNT = 47500; // 47.5k IMG required

// Health check endpoint
app.get('/health', (req, res) => {
    res.json({ status: 'OK', message: 'IMG Protocol Backend is running' });
});

// Check IMG tokens endpoint
app.post('/api/check-img-tokens', async (req, res) => {
    try {
        const { walletAddress } = req.body;
        
        if (!walletAddress) {
            return res.status(400).json({ 
                error: 'Wallet address is required' 
            });
        }

        console.log(`🔍 Checking IMG tokens for wallet: ${walletAddress}`);

        // Validate wallet address format
        let publicKey;
        try {
            publicKey = new PublicKey(walletAddress);
        } catch (error) {
            return res.status(400).json({ 
                error: 'Invalid wallet address format' 
            });
        }

        // Get token accounts for the wallet
        const tokenAccounts = await connection.getParsedTokenAccountsByOwner(
            publicKey,
            { mint: new PublicKey(IMG_TOKEN_MINT) }
        );

        // Calculate total IMG token balance
        let totalBalance = 0;
        let tokenAccountsFound = [];

        tokenAccounts.value.forEach(account => {
            const accountInfo = account.account.data.parsed.info;
            const balance = accountInfo.tokenAmount.uiAmount;
            totalBalance += balance;
            
            if (balance > 0) {
                tokenAccountsFound.push({
                    account: account.pubkey.toString(),
                    balance: balance
                });
            }
        });

        // Check if wallet has sufficient IMG tokens
        const hasEnoughTokens = totalBalance >= REQUIRED_IMG_AMOUNT;
        const isPremium = hasEnoughTokens;

        console.log(`💰 Wallet ${walletAddress}: ${totalBalance.toLocaleString()} IMG tokens`);
        console.log(`🔒 Premium access: ${isPremium ? 'GRANTED' : 'DENIED'}`);

        // Return result
        res.json({
            success: true,
            walletAddress: walletAddress,
            imgTokenBalance: totalBalance,
            hasEnoughTokens: hasEnoughTokens,
            isPremium: isPremium,
            requiredAmount: REQUIRED_IMG_AMOUNT,
            tokenAccounts: tokenAccountsFound,
            message: hasEnoughTokens 
                ? `Premium access granted! You have ${totalBalance.toLocaleString()} IMG tokens`
                : `Premium access denied. You need ${REQUIRED_IMG_AMOUNT.toLocaleString()} IMG tokens, but have ${totalBalance.toLocaleString()}`
        });

    } catch (error) {
        console.error('❌ Error checking IMG tokens:', error);
        res.status(500).json({ 
            error: 'Failed to check IMG tokens',
            message: error.message 
        });
    }
});

// Get IMG token info endpoint
app.get('/api/img-token-info', (req, res) => {
    res.json({
        tokenMint: IMG_TOKEN_MINT,
        requiredAmount: REQUIRED_IMG_AMOUNT,
        description: 'IMG Protocol Token',
        network: 'Solana Mainnet'
    });
});

// Start server
app.listen(PORT, () => {
    console.log(`🚀 IMG Protocol Backend running on port ${PORT}`);
    console.log(`🔗 Health check: http://localhost:${PORT}/health`);
    console.log(`🔍 IMG Token check: POST http://localhost:${PORT}/api/check-img-tokens`);
    console.log(`💡 IMG Token info: http://localhost:${PORT}/api/img-token-info`);
});
