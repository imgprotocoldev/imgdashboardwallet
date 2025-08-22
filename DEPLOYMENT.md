# 🚀 IMG Protocol Backend Deployment Guide

## 📋 What We've Built

A complete backend API that checks IMG token balances on Solana blockchain:

- **✅ Express.js server** with CORS support
- **✅ Solana Web3 integration** for token checking
- **✅ IMG token verification** (47,500 IMG required)
- **✅ Production-ready** with error handling
- **✅ Render deployment** configuration

## 🔧 Local Development

### 1. Start Backend
```bash
cd backend
npm install
npm start
```

### 2. Test API
```bash
# Health check
curl http://localhost:3001/health

# Check IMG tokens
curl -X POST http://localhost:3001/api/check-img-tokens \
  -H "Content-Type: application/json" \
  -d '{"walletAddress": "your_wallet_address"}'
```

### 3. Frontend Integration
The frontend now calls `http://localhost:3001/api/check-img-tokens` to verify IMG tokens.

## 🌐 Deploy to Render (Free)

### 1. Push to GitHub
```bash
git add .
git commit -m "Add backend API for IMG token verification"
git push origin main
```

### 2. Connect to Render
1. Go to [render.com](https://render.com)
2. Sign up/Login with GitHub
3. Click "New +" → "Web Service"
4. Connect your repository

### 3. Configure Service
- **Name**: `img-protocol-backend`
- **Environment**: `Node`
- **Build Command**: `cd backend && npm install`
- **Start Command**: `cd backend && npm start`
- **Plan**: `Free`

### 4. Environment Variables
Set these in Render dashboard:
```
NODE_ENV=production
PORT=10000
SOLANA_RPC_URL=https://api.mainnet-beta.solana.com
IMG_TOKEN_MINT=znv3FZt2HFAvzYf5LxzVyryh3mBXWuTRRng25gEZAjh
REQUIRED_IMG_AMOUNT=47500
CORS_ORIGIN=https://imgprotocol.io
```

### 5. Deploy
Click "Create Web Service" and wait for deployment.

## 🔄 Update Frontend

After deployment, update the frontend API URL:

```javascript
// In website/script.js, change:
const response = await fetch('http://localhost:3001/api/check-img-tokens', {

// To:
const response = await fetch('https://your-render-app.onrender.com/api/check-img-tokens', {
```

## 🧪 Test Production

### 1. Health Check
```
GET https://your-render-app.onrender.com/health
```

### 2. Check IMG Tokens
```bash
curl -X POST https://your-render-app.onrender.com/api/check-img-tokens \
  -H "Content-Type: application/json" \
  -d '{"walletAddress": "your_wallet_address"}'
```

## 🔒 Security Features

- **CORS protection** - Only allows requests from specified origins
- **Input validation** - Validates wallet address format
- **Error handling** - Graceful fallbacks and logging
- **Rate limiting** - Built into Render's free tier

## 📊 API Endpoints

| Endpoint | Method | Description |
|----------|--------|-------------|
| `/health` | GET | Server status |
| `/api/check-img-tokens` | POST | Check IMG token balance |
| `/api/img-token-info` | GET | Token configuration |

## 🎯 What This Solves

1. **✅ Real IMG token verification** - No more simulation
2. **✅ Secure backend API** - Protected token checking
3. **✅ Production ready** - Deploy to Render for free
4. **✅ Scalable** - Easy to upgrade and maintain
5. **✅ Professional** - Real blockchain integration

## 🚀 Next Steps

1. **Deploy to Render** using this guide
2. **Update frontend URL** to production backend
3. **Test with real wallets** holding IMG tokens
4. **Monitor API usage** in Render dashboard
5. **Scale up** when needed (Render paid plans)

Your IMG Protocol dashboard now has a real backend that checks actual Solana token balances! 🎉
