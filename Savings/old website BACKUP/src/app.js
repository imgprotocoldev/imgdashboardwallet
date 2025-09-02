import page from 'page';

// Global state management
let appState = {
    isConnected: false,
    isPremium: false,
    walletAddress: '',
    currentPage: 'dashboard'
};

// Sidebar template with premium access control
const sidebarTemplate = (state) => `
    <div class="sidebar">
        <div class="sidebar-header">
            <div class="logo">
                <img src="./public/logo.png" alt="IMG Protocol" class="logo-img">
                <span class="logo-text">IMG Protocol</span>
            </div>
        </div>
        
        <nav class="sidebar-nav">
            <ul class="nav-list">
                <li class="nav-item ${state.currentPage === 'dashboard' ? 'active' : ''}" data-page="dashboard">
                    <a href="/dashboard" class="nav-link">
                        <span class="nav-icon">📊</span>
                        <span class="nav-text">Dashboard</span>
                    </a>
                </li>
                
                <li class="nav-item ${state.currentPage === 'metrics' ? 'active' : ''}" data-page="metrics">
                    <a href="/metrics" class="nav-link">
                        <span class="nav-icon">📈</span>
                        <span class="nav-text">Metrics</span>
                    </a>
                </li>
                
                ${state.isPremium ? `
                    <li class="nav-item ${state.currentPage === 'harvesting' ? 'active' : ''}" data-page="harvesting">
                        <a href="/harvesting" class="nav-link">
                            <span class="nav-icon">🌾</span>
                            <span class="nav-text">Harvesting</span>
                        </a>
                    </li>
                    
                    <li class="nav-item ${state.currentPage === 'distribution' ? 'active' : ''}" data-page="distribution">
                        <a href="/distribution" class="nav-link">
                            <span class="nav-icon">📦</span>
                            <span class="nav-text">Distribution</span>
                        </a>
                    </li>
                    
                    <li class="nav-item ${state.currentPage === 'wallet-lookup' ? 'active' : ''}" data-page="wallet-lookup">
                        <a href="/wallet-lookup" class="nav-link">
                            <span class="nav-icon">🔍</span>
                            <span class="nav-text">Wallet Lookup</span>
                        </a>
                    </li>
                    
                    <li class="nav-item ${state.currentPage === 'reward-calculator' ? 'active' : ''}" data-page="reward-calculator">
                        <a href="/reward-calculator" class="nav-link">
                            <span class="nav-icon">🧮</span>
                            <span class="nav-text">Reward Calculator</span>
                        </a>
                    </li>
                ` : ''}
            </ul>
        </nav>
        
        <div class="sidebar-footer">
            <button id="connect-wallet-btn" class="connect-wallet-btn">
                <span class="nav-text connect-wallet-text">
                    ${state.isConnected ? 'DISCONNECT WALLET' : 'CONNECT WALLET'}
                </span>
            </button>
            
            ${state.isConnected ? `
                <div class="wallet-info">
                    <div class="wallet-address">
                        ${state.walletAddress.slice(0, 6)}...${state.walletAddress.slice(-4)}
                    </div>
                    <div class="premium-status ${state.isPremium ? 'premium' : 'standard'}">
                        ${state.isPremium ? '⭐ Premium' : '🔒 Standard'}
                    </div>
                </div>
            ` : ''}
        </div>
    </div>
`;

// Page templates
const dashboardPage = () => `
    <div class="dashboard-page">
        <div class="page-header">
            <h1>Dashboard</h1>
            <p>Welcome to IMG Protocol - Your gateway to decentralized finance</p>
        </div>
        
        <div class="dashboard-grid">
            <div class="dashboard-card">
                <h3>Total Value Locked</h3>
                <div class="card-value">$2,847,392</div>
                <div class="card-change positive">+12.5%</div>
            </div>
            
            <div class="dashboard-card">
                <h3>IMG Token Price</h3>
                <div class="card-value">$0.047</div>
                <div class="card-change positive">+8.3%</div>
            </div>
            
            <div class="dashboard-card">
                <h3>Active Users</h3>
                <div class="card-value">1,847</div>
                <div class="card-change positive">+15.2%</div>
            </div>
            
            <div class="dashboard-card">
                <h3>Total Transactions</h3>
                <div class="card-value">47,392</div>
                <div class="card-change positive">+22.1%</div>
            </div>
        </div>
        
        <div class="dashboard-charts">
            <div class="chart-container">
                <h3>Price Performance</h3>
                <div class="chart-placeholder">
                    <p>📈 Chart visualization would go here</p>
                    <p>Showing IMG token price over time</p>
                </div>
            </div>
            
            <div class="chart-container">
                <h3>Volume Analysis</h3>
                <div class="chart-placeholder">
                    <p>📊 Trading volume charts</p>
                    <p>Daily and weekly volume trends</p>
                </div>
            </div>
        </div>
    </div>
`;

const metricsPage = () => `
    <div class="metrics-page">
        <div class="page-header">
            <h1>Metrics & Analytics</h1>
            <p>Comprehensive data insights for IMG Protocol</p>
        </div>
        
        <div class="metrics-grid">
            <div class="metric-card">
                <h3>Market Cap</h3>
                <div class="metric-value">$134.2M</div>
                <div class="metric-change positive">+18.7%</div>
            </div>
            
            <div class="metric-card">
                <h3>Circulating Supply</h3>
                <div class="metric-value">2.85B IMG</div>
                <div class="metric-change neutral">0%</div>
            </div>
            
            <div class="metric-card">
                <h3>24h Volume</h3>
                <div class="metric-value">$847K</div>
                <div class="metric-change positive">+32.1%</div>
            </div>
            
            <div class="metric-card">
                <h3>Holders</h3>
                <div class="metric-value">12,847</div>
                <div class="metric-change positive">+5.3%</div>
            </div>
        </div>
        
        <div class="metrics-details">
            <div class="detail-section">
                <h3>Token Distribution</h3>
                <div class="distribution-chart">
                    <div class="chart-item">
                        <span class="chart-label">Liquidity Pool</span>
                        <span class="chart-value">45%</span>
                    </div>
                    <div class="chart-item">
                        <span class="chart-label">Community</span>
                        <span class="chart-value">30%</span>
                    </div>
                    <div class="chart-item">
                        <span class="chart-label">Development</span>
                        <span class="chart-value">15%</span>
                    </div>
                    <div class="chart-item">
                        <span class="chart-label">Marketing</span>
                        <span class="chart-value">10%</span>
                    </div>
                </div>
            </div>
        </div>
    </div>
`;

const harvestingPage = () => `
    <div class="harvesting-page">
        <div class="page-header">
            <h1>Harvesting Dashboard</h1>
            <p>Manage your IMG token harvesting operations</p>
        </div>
        
        <div class="harvesting-content">
            <div class="harvesting-stats">
                <div class="stat-card">
                    <h3>Your Harvested Tokens</h3>
                    <div class="stat-value">0 IMG</div>
                    <div class="stat-label">Available for collection</div>
                </div>
                
                <div class="stat-card">
                    <h3>Harvesting Rate</h3>
                    <div class="stat-value">5%</div>
                    <div class="stat-label">Per transaction</div>
                </div>
                
                <div class="stat-card">
                    <h3>Next Harvest</h3>
                    <div class="stat-value">24h</div>
                    <div class="stat-label">Time remaining</div>
                </div>
            </div>
            
            <div class="harvesting-actions">
                <button class="action-btn primary">Start Harvesting</button>
                <button class="action-btn secondary">View History</button>
            </div>
        </div>
    </div>
`;

const distributionPage = () => `
    <div class="distribution-page">
        <div class="page-header">
            <h1>Distribution Center</h1>
            <p>Manage token distribution and rewards</p>
        </div>
        
        <div class="distribution-content">
            <div class="distribution-stats">
                <div class="stat-card">
                    <h3>Total Distributed</h3>
                    <div class="stat-value">847,392 IMG</div>
                    <div class="stat-label">All time</div>
                </div>
                
                <div class="stat-card">
                    <h3>This Month</h3>
                    <div class="stat-value">23,847 IMG</div>
                    <div class="stat-label">Distributed</div>
                </div>
                
                <div class="stat-card">
                    <h3>Active Recipients</h3>
                    <div class="stat-value">1,247</div>
                    <div class="stat-label">Wallets</div>
                </div>
            </div>
            
            <div class="distribution-actions">
                <button class="action-btn primary">Distribute Tokens</button>
                <button class="action-btn secondary">View Recipients</button>
            </div>
        </div>
    </div>
`;

const walletLookupPage = () => `
    <div class="wallet-lookup-page">
        <div class="page-header">
            <h1>Wallet Lookup</h1>
            <p>Search and analyze wallet addresses</p>
        </div>
        
        <div class="lookup-content">
            <div class="search-section">
                <input type="text" id="wallet-search" placeholder="Enter wallet address..." class="search-input">
                <button id="search-btn" class="search-btn">Search</button>
            </div>
            
            <div class="results-section" id="search-results">
                <p class="placeholder-text">Enter a wallet address to search for information</p>
            </div>
        </div>
    </div>
`;

const rewardCalculatorPage = () => `
    <div class="reward-calculator-page">
        <div class="page-header">
            <h1>Reward Calculator</h1>
            <p>Calculate your potential IMG token rewards</p>
        </div>
        
        <div class="calculator-content">
            <div class="calculator-form">
                <div class="form-group">
                    <label for="token-amount">Token Amount</label>
                    <input type="number" id="token-amount" placeholder="Enter amount" class="form-input">
                </div>
                
                <div class="form-group">
                    <label for="holding-period">Holding Period (days)</label>
                    <input type="number" id="holding-period" placeholder="Enter days" class="form-input">
                </div>
                
                <button id="calculate-btn" class="calculate-btn">Calculate Rewards</button>
            </div>
            
            <div class="calculator-results" id="calculator-results">
                <p class="placeholder-text">Enter values and click calculate to see your potential rewards</p>
            </div>
        </div>
    </div>
`;

// Wallet management functions
class WalletManager {
    constructor() {
        this.isConnected = false;
        this.isPremium = false;
        this.walletAddress = '';
        this.requiredImgAmount = 47500;
        
        this.init();
    }
    
    init() {
        // Check for existing connection
        this.checkExistingConnection();
        this.setupEventListeners();
    }
    
    async checkExistingConnection() {
        try {
            // Check for existing wallet connections
            if (window.solana && window.solana.isConnected && window.solana.publicKey) {
                await this.connectWallet('phantom');
            } else if (window.solflare && window.solflare.isConnected && window.solflare.publicKey) {
                await this.connectWallet('solflare');
            }
        } catch (error) {
            console.log('No existing wallet connection found');
        }
    }
    
    setupEventListeners() {
        // Connect wallet button
        const connectBtn = document.getElementById('connect-wallet-btn');
        if (connectBtn) {
            connectBtn.addEventListener('click', () => {
                if (this.isConnected) {
                    this.disconnectWallet();
                } else {
                    this.showWalletModal();
                }
            });
        }
        
        // Wallet modal close button
        const closeBtn = document.getElementById('wallet-modal-close');
        if (closeBtn) {
            closeBtn.addEventListener('click', () => this.hideWalletModal());
        }
        
        // Wallet provider buttons
        const phantomBtn = document.querySelector('[data-provider="phantom"]');
        const solflareBtn = document.querySelector('[data-provider="solflare"]');
        
        if (phantomBtn) {
            phantomBtn.addEventListener('click', () => this.connectWallet('phantom'));
        }
        
        if (solflareBtn) {
            solflareBtn.addEventListener('click', () => this.connectWallet('solflare'));
        }
        
        // Close modal on outside click
        const modal = document.getElementById('wallet-modal');
        if (modal) {
            modal.addEventListener('click', (e) => {
                if (e.target === modal) {
                    this.hideWalletModal();
                }
            });
        }
    }
    
    showWalletModal() {
        const modal = document.getElementById('wallet-modal');
        if (modal) {
            modal.classList.add('show');
            document.body.style.overflow = 'hidden';
        }
    }
    
    hideWalletModal() {
        const modal = document.getElementById('wallet-modal');
        if (modal) {
            modal.classList.remove('show');
            document.body.style.overflow = '';
        }
    }
    
    async connectWallet(provider) {
        try {
            let wallet;
            
            if (provider === 'phantom') {
                if (!window.solana || !window.solana.isPhantom) {
                    throw new Error('Phantom wallet not found. Please install Phantom wallet extension.');
                }
                wallet = window.solana;
            } else if (provider === 'solflare') {
                if (!window.solflare) {
                    throw new Error('Solflare wallet not found. Please install Solflare wallet extension.');
                }
                wallet = window.solflare;
            }
            
            // Connect to wallet
            const response = await wallet.connect();
            this.walletAddress = response.publicKey.toString();
            
            // Check IMG token balance
            this.isPremium = await this.checkImgTokens();
            this.isConnected = true;
            
            // Update app state
            appState.isConnected = true;
            appState.isPremium = this.isPremium;
            appState.walletAddress = this.walletAddress;
            
            // Save wallet state
            this.saveWalletState();
            
            // Update UI
            this.updateUI();
            this.hideWalletModal();
            
            // Redirect to dashboard if on premium page without access
            if (appState.currentPage !== 'dashboard' && appState.currentPage !== 'metrics' && !this.isPremium) {
                page.redirect('/dashboard');
            }
            
            console.log('✅ Wallet connected successfully:', this.walletAddress);
            
        } catch (error) {
            console.error('❌ Wallet connection failed:', error);
            alert('Wallet connection failed: ' + error.message);
        }
    }
    
    async checkImgTokens() {
        try {
            // Call your Render backend API
            const response = await fetch('https://img-protocol-backend.onrender.com/api/check-img-tokens', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    walletAddress: this.walletAddress
                })
            });
            
            if (response.ok) {
                const data = await response.json();
                return data.hasSufficientTokens;
            } else {
                // Fallback to simulation for testing
                console.log('Backend unavailable, using simulation');
                return this.walletAddress.length > 30; // Simple simulation
            }
        } catch (error) {
            console.error('Error checking IMG tokens:', error);
            // Fallback to simulation
            return this.walletAddress.length > 30;
        }
    }
    
    disconnectWallet() {
        this.isConnected = false;
        this.isPremium = false;
        this.walletAddress = '';
        
        // Update app state
        appState.isConnected = false;
        appState.isPremium = false;
        appState.walletAddress = '';
        
        // Clear saved state
        this.clearWalletState();
        
        // Update UI
        this.updateUI();
        
        // Redirect to dashboard
        page.redirect('/dashboard');
        
        console.log('✅ Wallet disconnected successfully');
    }
    
    saveWalletState() {
        try {
            const state = {
                isConnected: this.isConnected,
                walletAddress: this.walletAddress,
                isPremium: this.isPremium,
                timestamp: Date.now()
            };
            
            localStorage.setItem('imgProtocolWalletState', JSON.stringify(state));
            localStorage.setItem('walletConnected', this.isConnected.toString());
            localStorage.setItem('walletPremium', this.isPremium.toString());
            
            console.log('💾 Wallet state saved:', state);
        } catch (error) {
            console.error('Error saving wallet state:', error);
        }
    }
    
    clearWalletState() {
        try {
            localStorage.removeItem('imgProtocolWalletState');
            localStorage.removeItem('walletConnected');
            localStorage.removeItem('walletPremium');
            console.log('🗑️ Wallet state cleared');
        } catch (error) {
            console.error('Error clearing wallet state:', error);
        }
    }
    
    updateUI() {
        // Update sidebar
        this.updateSidebar();
        
        // Update connect wallet button
        const connectBtn = document.getElementById('connect-wallet-btn');
        if (connectBtn) {
            connectBtn.innerHTML = `
                <span class="nav-text connect-wallet-text">
                    ${this.isConnected ? 'DISCONNECT WALLET' : 'CONNECT WALLET'}
                </span>
            `;
        }
    }
    
    updateSidebar() {
        const sidebarContainer = document.getElementById('sidebar-container');
        if (sidebarContainer) {
            sidebarContainer.innerHTML = sidebarTemplate(appState);
        }
        
        // Re-attach event listeners
        this.setupEventListeners();
    }
}

// UI update functions
function updateSidebar() {
    const sidebarContainer = document.getElementById('sidebar-container');
    if (sidebarContainer) {
        sidebarContainer.innerHTML = sidebarTemplate(appState);
    }
}

function updateMainContent(content) {
    const mainContent = document.getElementById('main-content');
    if (mainContent) {
        mainContent.innerHTML = content;
    }
}

// Route handlers
function dashboardRoute() {
    appState.currentPage = 'dashboard';
    updateSidebar();
    updateMainContent(dashboardPage());
}

function metricsRoute() {
    appState.currentPage = 'metrics';
    updateSidebar();
    updateMainContent(metricsPage());
}

function harvestingRoute() {
    if (!appState.isPremium) {
        page.redirect('/dashboard');
        return;
    }
    
    appState.currentPage = 'harvesting';
    updateSidebar();
    updateMainContent(harvestingPage());
}

function distributionRoute() {
    if (!appState.isPremium) {
        page.redirect('/dashboard');
        return;
    }
    
    appState.currentPage = 'distribution';
    updateSidebar();
    updateMainContent(distributionPage());
}

function walletLookupRoute() {
    if (!appState.isPremium) {
        page.redirect('/dashboard');
        return;
    }
    
    appState.currentPage = 'wallet-lookup';
    updateSidebar();
    updateMainContent(walletLookupPage());
}

function rewardCalculatorRoute() {
    if (!appState.isPremium) {
        page.redirect('/dashboard');
        return;
    }
    
    appState.currentPage = 'reward-calculator';
    updateSidebar();
    updateMainContent(rewardCalculatorPage());
}

// Set up routes
page('/dashboard', dashboardRoute);
page('/metrics', metricsRoute);
page('/harvesting', harvestingRoute);
page('/distribution', distributionRoute);
page('/wallet-lookup', walletLookupRoute);
page('/reward-calculator', rewardCalculatorRoute);

// Fallback route
page('*', () => page.redirect('/dashboard'));

// Initialize app
document.addEventListener('DOMContentLoaded', () => {
    console.log('🚀 IMG Protocol SPA Initializing...');
    
    // Initialize wallet manager
    window.walletManager = new WalletManager();
    
    // Start routing
    page.start();
    
    // Load initial page
    page('/dashboard');
    
    console.log('✅ IMG Protocol SPA Ready!');
});
