# IMG Dashboard

A dedicated dashboard application for IMG Protocol with separate tab
functionality.

## Project Structure

```
imgdashboard/
├── index.html          # Main dashboard page
├── style.css           # Main dashboard styles
├── script.js           # Main dashboard scripts
├── .htaccess           # URL routing and server configuration
├── public/             # Images and assets
└── tabs/               # Individual tab pages
    ├── reward-snapshot/    # Full reward snapshots spreadsheet
    ├── wallet-lookup/      # Wallet lookup functionality
    ├── reward-calculator/  # Reward calculation tools
    └── stocktwits/         # StockTwits integration
```

## URL Structure

- **Main Dashboard**: `/` (shows overview with Recent Reward Snapshots - 5 rows)
- **Reward Snapshots**: `/rewardsnapshot` (full spreadsheet view)
- **Wallet Lookup**: `/walletlookup`
- **Reward Calculator**: `/rewardcalculator`
- **StockTwits**: `/stocktwits`

## Installation

1. Upload the entire `imgdashboard/` folder to your web server
2. Ensure Apache mod_rewrite is enabled
3. Access via your domain: `yoursite.com/imgdashboard/`

## Features

- **Main Dashboard**: Token metrics, charts, and recent reward snapshots
- **Tab System**: Clean separation of functionality into dedicated pages
- **Responsive Design**: Mobile-friendly interface
- **Real-time Data**: Integration ready for backend APIs
