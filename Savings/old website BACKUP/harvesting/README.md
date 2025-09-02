# IMG Protocol - Harvesting Dashboard

## Overview
The Harvesting Dashboard is a premium feature that allows users to track their IMG token harvesting activities, view rewards distribution, and manage harvesting settings.

## Features

### 📊 Overview Cards
- **Total Harvested**: Shows total IMG tokens harvested
- **Current Rewards**: Displays pending rewards available for harvest
- **Harvesting Rate**: Shows daily harvesting rate in IMG
- **Last Harvest**: Timestamp of the most recent harvest

### 📈 Charts
- **Harvesting History**: Line chart showing harvesting activity over time
- **Rewards Distribution**: Doughnut chart showing different reward types
- **Period Selector**: Choose between 7 days, 30 days, 90 days, or 1 year

### 📋 Activity Table
- **Recent Activity**: Table showing recent harvesting transactions
- **Transaction Details**: Date, amount, type, status, and transaction ID
- **Refresh Button**: Update activity data manually

### ⚙️ Settings
- **Auto-Harvest**: Toggle automatic harvesting when threshold is reached
- **Harvest Threshold**: Set minimum IMG amount for auto-harvest
- **Notification Email**: Configure email notifications for harvesting events

## Access Control
- **Premium Feature**: Requires wallet connection with 47.5k+ IMG tokens
- **Sidebar Integration**: Accessible via sidebar navigation
- **Wallet Verification**: Automatically checks token balance

## File Structure
```
harvesting/
├── index.html          # Main HTML page
├── style.css           # Page-specific styles
├── harvesting.js       # JavaScript functionality
└── README.md           # This file
```

## Technical Details
- **Responsive Design**: Mobile-friendly layout
- **Chart.js Integration**: Interactive charts with dark theme
- **Mock Data**: Sample data for development/testing
- **Local Storage**: Settings saved to browser storage

## Future Enhancements
- **Real-time Data**: Connect to Solana blockchain
- **Transaction History**: Full transaction details
- **Advanced Analytics**: Performance metrics and trends
- **API Integration**: Backend data synchronization
