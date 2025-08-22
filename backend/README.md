# IMG Protocol Backend

Backend API for checking IMG token balances on Solana blockchain.

## Setup

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Create .env file:**
   ```bash
   # Copy this content to .env file
   PORT=3001
   SOLANA_RPC_URL=https://api.mainnet-beta.solana.com
   IMG_TOKEN_MINT=znv3FZt2HFAvzYf5LxzVyryh3mBXWuTRRng25gEZAjh
   REQUIRED_IMG_AMOUNT=47500
   CORS_ORIGIN=http://localhost:8000
   ```

3. **Run the server:**
   ```bash
   # Development mode
   npm run dev
   
   # Production mode
   npm start
   ```

## API Endpoints

### Health Check
- **GET** `/health`
- Returns server status

### Check IMG Tokens
- **POST** `/api/check-img-tokens`
- **Body:** `{ "walletAddress": "your_wallet_address" }`
- Returns IMG token balance and premium access status

### IMG Token Info
- **GET** `/api/img-token-info`
- Returns token configuration information

## Example Response

```json
{
  "success": true,
  "walletAddress": "your_wallet_address",
  "imgTokenBalance": 50000,
  "hasEnoughTokens": true,
  "isPremium": true,
  "requiredAmount": 47500,
  "tokenAccounts": [...],
  "message": "Premium access granted! You have 50,000 IMG tokens"
}
```

## Deploy to Render

1. Push code to GitHub
2. Connect repository to Render
3. Set environment variables in Render dashboard
4. Deploy as Web Service
