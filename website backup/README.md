# IMG Protocol Website - Reusable Sidebar System

## 🏗️ Project Structure

```
website/
├── index.html              # Main Dashboard (data-page="dashboard")
├── rewardsnapshot/
│   ├── index.html         # Reward Snapshot Page (data-page="reward-snapshot")
│   ├── style.css          # Shared styles
│   └── script.js          # Shared scripts
├── walletlookup/
│   ├── index.html         # Wallet Lookup Page (data-page="wallet-lookup")
│   ├── style.css          # Shared styles
│   └── script.js          # Shared scripts
├── rewardcalculator/
│   ├── index.html         # Reward Calculator Page (data-page="reward-calculator")
│   ├── style.css          # Shared styles
│   └── script.js          # Shared scripts
├── stocktwits/
│   ├── index.html         # StockTwits Page (data-page="stocktwits")
│   ├── style.css          # Shared styles
│   └── script.js          # Shared scripts
├── sidebar.html            # Reusable sidebar component
├── style.css               # Main stylesheet
├── script.js               # Main JavaScript
└── README.md               # This file
```

## 🚀 How It Works

### **Reusable Sidebar System**
- **`sidebar.html`** - Contains the sidebar markup
- **`script.js`** - Automatically loads the sidebar into any page
- **`style.css`** - Provides consistent styling across all pages

### **Page Setup**
Each page includes:
```html
<div id="sidebar-container" data-page="page-name">
    <div class="sidebar-loading">
        <div class="loading-spinner"></div>
        <p>Loading Navigation...</p>
    </div>
</div>
```

### **Navigation Links**
The sidebar automatically highlights the active tab based on the `data-page` attribute:
- `data-page="dashboard"` → Dashboard tab active
- `data-page="reward-snapshot"` → Reward Snapshot tab active
- `data-page="wallet-lookup"` → Wallet Lookup tab active
- `data-page="reward-calculator"` → Reward Calculator tab active
- `data-page="stocktwits"` → StockTwits tab active

## 🎯 Features

### **Professional Design**
- Modern, financial website aesthetics
- Professional tab-style navigation
- Subtle animations and transitions
- Responsive design

### **Enhanced Interactions**
- Smooth hover effects
- Professional connect wallet button
- Social media integration
- Loading states and feedback

### **Consistent Experience**
- Same sidebar across all pages
- Unified styling and behavior
- Easy maintenance and updates

## 🔧 Adding New Pages

1. **Create a new folder** for your page
2. **Copy the template files** (index.html, style.css, script.js)
3. **Set the `data-page` attribute** to match your page name
4. **Customize the content** for your specific page
5. **Update navigation links** in sidebar.html if needed

## 📱 Testing

Start the server from the website folder:
```bash
cd website
python3 -m http.server 8005
```

Then visit:
- **Dashboard**: http://localhost:8005/
- **Reward Snapshot**: http://localhost:8005/rewardsnapshot/
- **Wallet Lookup**: http://localhost:8005/walletlookup/
- **Reward Calculator**: http://localhost:8005/rewardcalculator/
- **StockTwits**: http://localhost:8005/stocktwits/

## 🎨 Customization

### **Styling**
- Modify `style.css` for visual changes
- All pages automatically inherit updates
- CSS variables for easy color customization

### **Functionality**
- Extend `script.js` for additional features
- Add page-specific JavaScript as needed
- Sidebar functionality is automatically included

## 🔗 Navigation Structure

The sidebar includes:
- **Dashboard** - Main overview page
- **Reward Snapshot** - View reward distributions
- **Wallet Lookup** - Search wallet information
- **Reward Calculator** - Calculate potential earnings
- **StockTwits** - Community integration
- **Connect Wallet** - Professional action button

## ✨ Benefits

- **Maintainable** - Update sidebar once, affects all pages
- **Consistent** - Same look and feel across the site
- **Professional** - Modern financial website design
- **Scalable** - Easy to add new pages
- **Efficient** - Shared resources and styling
