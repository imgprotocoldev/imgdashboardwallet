// Reusable Sidebar Loader for IMG Protocol Website - Modern Financial Design
class SidebarLoader {
    constructor() {
        console.log('SidebarLoader constructor called');
        this.sidebarContainer = document.getElementById('sidebar-container');
        console.log('Sidebar container found:', this.sidebarContainer);
        
        if (!this.sidebarContainer) {
            console.error('SIDEBAR CONTAINER NOT FOUND!');
            console.log('Available elements with IDs:', Array.from(document.querySelectorAll('*')).filter(el => el.id).map(el => ({ id: el.id, tagName: el.tagName })));
            return;
        }
        
        this.currentPage = this.getCurrentPage();
        console.log('Current page:', this.currentPage);
        this.init();
    }

    // Get current page identifier from URL or data attribute
    getCurrentPage() {
        // Check if page has a data-page attribute
        const pageElement = document.querySelector('[data-page]');
        if (pageElement) {
            return pageElement.getAttribute('data-page');
        }
        
        // Fallback: determine from URL path
        const path = window.location.pathname;
        if (path.includes('rewardsnapshot')) return 'reward-snapshot';
        if (path.includes('walletlookup')) return 'wallet-lookup';
        if (path.includes('reward-calculator')) return 'reward-calculator';
        if (path.includes('stocktwits')) return 'stocktwits';
        if (path === '/' || path === '/index.html') return 'dashboard';
        
        return 'dashboard';
    }

        // Initialize sidebar with enhanced animations
    async init() {
        console.log('SidebarLoader init started for page:', this.currentPage);
        console.log('Window width:', window.innerWidth);
        console.log('User agent:', navigator.userAgent);
        console.log('Current URL:', window.location.href);
        
        try {
            console.log('Loading sidebar...');
            await this.loadSidebar();
            console.log('Setting up sidebar...');
            this.setupSidebar();
            console.log('Setting active tab...');
            this.setActiveTab();
            console.log('Adding loaded class...');
            this.addLoadedClass();
            console.log('Setting up enhanced interactions...');
            this.setupEnhancedInteractions();
            console.log('Sidebar initialization complete!');
            
                    // Force mobile layout check after initialization
        setTimeout(() => {
            this.forceMobileLayout();
        }, 100);
        
        // Test sidebar.html accessibility
        setTimeout(() => {
            console.log('=== TESTING SIDEBAR.HTML ACCESS ===');
            // Use the same path logic as the main sidebar loader
            const currentPath = window.location.pathname;
            let testPath;
            
            if (currentPath.includes('/harvesting/') || currentPath.includes('/distribution/') || 
                currentPath.includes('/walletlookup/') || currentPath.includes('/rewardcalculator/') || 
                currentPath.includes('/stocktwits/')) {
                testPath = '../sidebar.html';
            } else {
                testPath = './sidebar.html';
            }
            
            fetch(testPath)
                .then(response => {
                    console.log('Sidebar.html fetch test - Status:', response.status);
                    console.log('Sidebar.html fetch test - OK:', response.ok);
                    if (response.ok) {
                        return response.text();
                    } else {
                        throw new Error(`HTTP ${response.status}`);
                    }
                })
                .then(text => {
                    console.log('Sidebar.html fetch test - Content length:', text.length);
                    console.log('Sidebar.html fetch test - Content preview:', text.substring(0, 100));
                })
                .catch(error => {
                    console.error('Sidebar.html fetch test - Error:', error);
                });
        }, 200);
        
        // Additional debugging - check sidebar state
        setTimeout(() => {
            console.log('=== SIDEBAR DEBUGGING ===');
            console.log('Sidebar container:', this.sidebarContainer);
            console.log('Sidebar container innerHTML length:', this.sidebarContainer.innerHTML.length);
            console.log('Sidebar container classes:', this.sidebarContainer.classList.toString());
            console.log('Sidebar container computed styles:', {
                display: window.getComputedStyle(this.sidebarContainer).display,
                position: window.getComputedStyle(this.sidebarContainer).position,
                transform: window.getComputedStyle(this.sidebarContainer).transform,
                left: window.getComputedStyle(this.sidebarContainer).left,
                top: window.getComputedStyle(this.sidebarContainer).top,
                width: window.getComputedStyle(this.sidebarContainer).width,
                height: window.getComputedStyle(this.sidebarContainer).height
            });
            
            // Check if sidebar content exists
            const sidebarContent = this.sidebarContainer.querySelector('.sidebar');
            if (sidebarContent) {
                console.log('Sidebar content found:', sidebarContent);
            } else {
                console.error('NO SIDEBAR CONTENT FOUND!');
                console.log('Available elements in container:', this.sidebarContainer.children);
            }
        }, 500);
        } catch (error) {
            console.error('Failed to load sidebar:', error);
            this.showSidebarError();
        }
    }

    // Load sidebar HTML from external file
    async loadSidebar() {
        console.log('Attempting to load sidebar...');
        console.log('Current page URL:', window.location.href);
        console.log('Sidebar container element:', this.sidebarContainer);
        
        try {
            // Determine the correct path to sidebar.html based on current location
            const currentPath = window.location.pathname;
            let sidebarPath;
            
            if (currentPath.includes('/harvesting/') || currentPath.includes('/distribution/') || 
                currentPath.includes('/walletlookup/') || currentPath.includes('/rewardcalculator/') || 
                currentPath.includes('/stocktwits/')) {
                // We're in a subfolder, go up one level
                sidebarPath = '../sidebar.html';
                console.log('Detected subfolder, using path:', sidebarPath);
            } else {
                // We're in the root website folder
                sidebarPath = './sidebar.html';
                console.log('Detected root folder, using path:', sidebarPath);
            }
            
            console.log('Testing fetch to:', sidebarPath);
            
            const response = await fetch(sidebarPath);
            console.log('Fetch response status:', response.status);
            console.log('Fetch response headers:', response.headers);
            
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            
            const sidebarHTML = await response.text();
            console.log('Sidebar HTML loaded, length:', sidebarHTML.length);
            console.log('Sidebar HTML preview:', sidebarHTML.substring(0, 200));
            
            this.sidebarContainer.innerHTML = sidebarHTML;
            console.log('Sidebar HTML inserted into container');
            
            // Check if sidebar content was loaded
            const sidebarContent = this.sidebarContainer.querySelector('.sidebar');
            if (sidebarContent) {
                console.log('Sidebar content found:', sidebarContent);
                
                // Check sidebar visibility and positioning
                const computedStyle = window.getComputedStyle(sidebarContent);
                console.log('Sidebar computed styles:', {
                    display: computedStyle.display,
                    position: computedStyle.position,
                    left: computedStyle.left,
                    top: computedStyle.top,
                    width: computedStyle.width,
                    height: computedStyle.height,
                    zIndex: computedStyle.zIndex,
                    transform: computedStyle.transform
                });
            } else {
                console.error('No sidebar content found after loading!');
                
                // Add fallback test content
                console.log('Adding fallback test content...');
                this.sidebarContainer.innerHTML = `
                    <div class="sidebar" style="background: blue; color: white; padding: 20px; width: 280px; height: 100vh;">
                        <h2>TEST SIDEBAR</h2>
                        <p>This is test content to see if sidebar container is working.</p>
                        <ul>
                            <li>Dashboard</li>
                            <li>Reward Snapshot</li>
                            <li>Wallet Lookup</li>
                        </ul>
                    </div>
                `;
                console.log('Fallback test content added');
            }
        } catch (error) {
            console.error('Error loading sidebar:', error);
            console.error('Error details:', {
                name: error.name,
                message: error.message,
                stack: error.stack
            });
            
            // Add fallback test content on error
            console.log('Adding fallback test content due to error...');
            this.sidebarContainer.innerHTML = `
                <div class="sidebar" style="background: orange; color: white; padding: 20px; width: 280px; height: 100vh;">
                    <h2>ERROR SIDEBAR</h2>
                    <p>Sidebar failed to load. This is fallback content.</p>
                    <p>Error: ${error.message}</p>
                    <button onclick="location.reload()">Reload Page</button>
                </div>
            `;
            console.log('Fallback error content added');
        }
    }

    // Setup sidebar functionality - Enhanced Modern Interactions
    setupSidebar() {
        console.log('Setting up sidebar functionality...');
        
        const navLinks = this.sidebarContainer.querySelectorAll('.nav-link');
        console.log('Found nav links:', navLinks.length);
        
        navLinks.forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault(); // Prevent default link behavior
                
                const allNavItems = this.sidebarContainer.querySelectorAll('.nav-item');
                allNavItems.forEach(item => item.classList.remove('active'));
                const parentNavItem = link.closest('.nav-item');
                if (parentNavItem) {
                    parentNavItem.classList.add('active');
                    this.animateActiveItem(parentNavItem);
                }
                
                // Handle navigation based on data-page attribute
                const targetPage = parentNavItem.getAttribute('data-page');
                if (targetPage) {
                    this.navigateToPage(targetPage);
                }
                
                // Close mobile menu after navigation
                if (window.innerWidth <= 768) {
                    this.closeMobileMenu();
                }
                
                console.log('Navigation clicked to page:', targetPage);
            });
        });
        
        // Setup mobile menu functionality
        this.setupMobileMenu();
        
        console.log('Enhanced sidebar setup complete - Modern Financial Design');
    }
    
    // Navigate to page with proper path handling
    navigateToPage(targetPage) {
        const currentPath = window.location.pathname;
        let targetUrl;
        
        // Determine the correct URL based on current location and target
        if (targetPage === 'dashboard') {
            // Always go to root for dashboard
            targetUrl = '/';
        } else if (currentPath.includes('/harvesting/') || currentPath.includes('/distribution/') || 
                   currentPath.includes('/walletlookup/') || currentPath.includes('/rewardcalculator/') || 
                   currentPath.includes('/stocktwits/')) {
            // We're in a subfolder, construct relative path
            if (targetPage === 'harvesting') {
                targetUrl = '../harvesting/';
            } else if (targetPage === 'distribution') {
                targetUrl = '../distribution/';
            } else if (targetPage === 'stocktwits') {
                targetUrl = '../stocktwits/';
            } else if (targetPage === 'wallet-lookup') {
                targetUrl = '../walletlookup/';
            } else if (targetPage === 'reward-calculator') {
                targetUrl = '../rewardcalculator/';
            }
        } else {
            // We're in the root website folder
            if (targetPage === 'harvesting') {
                targetUrl = './harvesting/';
            } else if (targetPage === 'distribution') {
                targetUrl = './distribution/';
            } else if (targetPage === 'stocktwits') {
                targetUrl = './stocktwits/';
            } else if (targetPage === 'wallet-lookup') {
                targetUrl = './walletlookup/';
            } else if (targetPage === 'reward-calculator') {
                targetUrl = './rewardcalculator/';
            }
        }
        
        if (targetUrl) {
            console.log(`Navigating from ${currentPath} to ${targetPage} via ${targetUrl}`);
            window.location.href = targetUrl;
        } else {
            console.error(`Could not determine target URL for page: ${targetPage}`);
        }
    }

    // Animate active item with minimal effects
    animateActiveItem(navItem) {
        // Minimal glow effect only
        const link = navItem.querySelector('.nav-link');
        if (link) {
            link.style.boxShadow = '0 0 20px rgba(16, 185, 129, 0.2)';
            setTimeout(() => {
                link.style.boxShadow = '';
            }, 500);
        }
    }

    // Set the active tab based on current page
    setActiveTab() {
        // Remove active class from all nav items
        const allNavItems = this.sidebarContainer.querySelectorAll('.nav-item');
        allNavItems.forEach(item => item.classList.remove('active'));

        // Add active class to current page nav item
        const currentNavItem = this.sidebarContainer.querySelector(`[data-page="${this.currentPage}"]`);
        if (currentNavItem) {
            currentNavItem.classList.add('active');
            console.log(`Active tab set to: ${this.currentPage}`);
        } else {
            console.warn(`Nav item not found for page: ${this.currentPage}`);
        }
    }

    // Add loaded class to prevent flicker
    addLoadedClass() {
        this.sidebarContainer.classList.add('loaded');
        console.log('Sidebar loaded successfully');
    }

    // Setup enhanced interactions without animations
    setupEnhancedInteractions() {
        // Add subtle hover effects to logo
        const logo = this.sidebarContainer.querySelector('.logo');
        if (logo) {
            logo.addEventListener('mouseenter', () => {
                logo.style.transform = 'scale(1.01)';
            });
            
            logo.addEventListener('mouseleave', () => {
                logo.style.transform = 'scale(1)';
            });
        }

        // No entrance animations - instant display
        console.log('Enhanced interactions setup complete - instant display');
    }

    // Setup mobile menu functionality
    setupMobileMenu() {
        this.setupBurgerButton();
        this.setupMobileCloseButton();
        
        // Close menu when clicking outside
        document.addEventListener('click', (e) => {
            if (this.sidebarContainer.classList.contains('mobile-open')) {
                // Check if click is outside sidebar and not on burger button
                const isOutsideSidebar = !this.sidebarContainer.contains(e.target);
                const isNotBurgerButton = !e.target.closest('#burger-menu-btn');
                
                if (isOutsideSidebar && isNotBurgerButton) {
                    console.log('Click outside sidebar detected, closing mobile menu');
                    this.closeMobileMenu();
                }
            }
        });
        
        // Close menu on escape key
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && this.sidebarContainer.classList.contains('mobile-open')) {
                this.closeMobileMenu();
            }
        });
        
        // Force mobile layout on mobile devices
        this.forceMobileLayout();
        
        // Handle window resize
        window.addEventListener('resize', () => {
            this.forceMobileLayout();
        });
    }
    
    // Force mobile layout on mobile devices
    forceMobileLayout() {
        const isMobile = this.isMobileDevice();
        const isSmallScreen = window.innerWidth <= 768;
        const isRealMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
        
        console.log('Force mobile layout called:', { 
            isMobile, 
            isSmallScreen, 
            isRealMobile,
            userAgent: navigator.userAgent,
            windowWidth: window.innerWidth,
            devicePixelRatio: window.devicePixelRatio
        });
        
        if (isSmallScreen || isRealMobile) {
            console.log('Mobile device detected, forcing mobile layout');
            document.body.classList.add('mobile-device');
            
            // Force mobile header visibility with extra checks
            const mobileHeader = document.querySelector('.mobile-header');
            if (mobileHeader) {
                // Force all mobile header styles
                mobileHeader.style.cssText = `
                    display: flex !important;
                    visibility: visible !important;
                    opacity: 1 !important;
                    position: fixed !important;
                    top: 0 !important;
                    left: 0 !important;
                    right: 0 !important;
                    height: 60px !important;
                    z-index: 999 !important;
                    background: #0f172a !important;
                    border-bottom: 1px solid #374151 !important;
                    padding: 0 16px !important;
                    box-sizing: border-box !important;
                `;
                
                console.log('Mobile header styles forced:', mobileHeader.style.cssText);
                console.log('Mobile header made visible');
                
                // Check if mobile header is actually visible
                const rect = mobileHeader.getBoundingClientRect();
                console.log('Mobile header position:', rect);
                console.log('Mobile header computed styles:', {
                    display: window.getComputedStyle(mobileHeader).display,
                    visibility: window.getComputedStyle(mobileHeader).visibility,
                    opacity: window.getComputedStyle(mobileHeader).opacity,
                    position: window.getComputedStyle(mobileHeader).position,
                    zIndex: window.getComputedStyle(mobileHeader).zIndex
                });
            } else {
                console.error('Mobile header not found!');
                
                // List all elements with mobile-header class
                const allHeaders = document.querySelectorAll('.mobile-header');
                console.log('All mobile headers found:', allHeaders);
            }
            
            // Force burger button visibility
            const burgerBtn = document.getElementById('burger-menu-btn');
            if (burgerBtn) {
                burgerBtn.style.cssText = `
                    display: flex !important;
                    visibility: visible !important;
                    opacity: 1 !important;
                    position: relative !important;
                    z-index: 1000 !important;
                    min-width: 48px !important;
                    min-height: 48px !important;
                    padding: 12px !important;
                    font-size: 24px !important;
                    pointer-events: auto !important;
                    touch-action: manipulation !important;
                    transform: none !important;
                    transition: none !important;
                `;
                
                console.log('Burger button styles forced:', burgerBtn.style.cssText);
            }
            
            // Ensure sidebar is hidden by default and stays hidden
            this.sidebarContainer.classList.remove('mobile-open');
            
            console.log('Mobile sidebar hidden');
            
            // Force main content spacing for mobile
            const mainContent = document.querySelector('.main-content');
            if (mainContent) {
                mainContent.style.cssText = `
                    margin-left: 0 !important;
                    margin-top: 80px !important;
                    padding: 20px 16px !important;
                `;
                console.log('Main content spacing forced for mobile');
            }
        } else {
            // Remove mobile-device class on desktop
            document.body.classList.remove('mobile-device');
            console.log('Desktop layout - mobile styles disabled');
        }
    }
    
    // Detect mobile device
    isMobileDevice() {
        const userAgent = navigator.userAgent;
        const isMobileUA = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(userAgent);
        const isSmallScreen = window.innerWidth <= 768;
        const hasTouch = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
        
        console.log('Mobile detection:', {
            userAgent: userAgent,
            isMobileUA: isMobileUA,
            isSmallScreen: isSmallScreen,
            hasTouch: hasTouch,
            windowWidth: window.innerWidth
        });
        
        return isMobileUA || isSmallScreen || hasTouch;
    }
    
    // Toggle mobile menu
    toggleMobileMenu() {
        console.log('Toggle mobile menu called');
        console.log('Sidebar container element:', this.sidebarContainer);
        console.log('Sidebar container HTML:', this.sidebarContainer.innerHTML.substring(0, 200));
        console.log('Current sidebar classes:', this.sidebarContainer.classList.toString());
        console.log('Current sidebar transform:', this.sidebarContainer.style.transform);
        console.log('Current sidebar position:', this.sidebarContainer.style.position);
        
        if (this.sidebarContainer.classList.contains('mobile-open')) {
            console.log('Sidebar is already open, closing...');
            this.closeMobileMenu();
        } else {
            console.log('Sidebar is closed, opening...');
            this.openMobileMenu();
        }
    }
    
    // Open mobile menu
    openMobileMenu() {
        console.log('Opening mobile menu...');
        console.log('Sidebar container before:', this.sidebarContainer);
        console.log('Sidebar classes before:', this.sidebarContainer.classList.toString());
        
        // Simply add the mobile-open class - CSS handles the rest
        this.sidebarContainer.classList.add('mobile-open');
        
        // Prevent background scrolling
        document.body.style.overflow = 'hidden';
        
        console.log('Sidebar classes after:', this.sidebarContainer.classList.toString());
        console.log('Sidebar computed styles after:', {
            left: window.getComputedStyle(this.sidebarContainer).left,
            position: window.getComputedStyle(this.sidebarContainer).position,
            zIndex: window.getComputedStyle(this.sidebarContainer).zIndex
        });
        console.log('Mobile menu opened');
        
        // Verify sidebar is actually visible
        setTimeout(() => {
            const rect = this.sidebarContainer.getBoundingClientRect();
            console.log('Sidebar position after opening:', rect);
        }, 100);
    }
    
    // Close mobile menu
    closeMobileMenu() {
        console.log('Closing mobile menu...');
        console.log('Sidebar classes before closing:', this.sidebarContainer.classList.toString());
        
        // Simply remove the mobile-open class - CSS handles the rest
        this.sidebarContainer.classList.remove('mobile-open');
        
        // Restore scrolling
        document.body.style.overflow = '';
        
        console.log('Sidebar classes after closing:', this.sidebarContainer.classList.toString());
        console.log('Mobile menu closed');
        
        // Verify sidebar is actually hidden
        setTimeout(() => {
            const rect = this.sidebarContainer.getBoundingClientRect();
            console.log('Sidebar position after closing:', rect);
        }, 100);
    }
    
    // Show error if sidebar fails to load
    showSidebarError() {
        this.sidebarContainer.innerHTML = `
            <div class="sidebar-error">
                <h3>⚠️ Sidebar Error</h3>
                <p>Failed to load navigation menu</p>
                <button onclick="location.reload()">Retry</button>
            </div>
        `;
    }

    // Setup burger button for mobile menu
    setupBurgerButton() {
        const burgerBtn = document.getElementById('burger-menu-btn');
        if (!burgerBtn) {
            console.log('Burger button not found');
            return;
        }
        
        console.log('Burger button found:', burgerBtn);
        
        // SIMPLE: Only use click event, no touch events to avoid conflicts
        burgerBtn.addEventListener('click', (e) => {
            console.log('Burger button clicked!');
            e.preventDefault();
            e.stopPropagation();
            this.toggleMobileMenu();
        });
        
        console.log('Burger button event listeners added and mobile styles forced');
    }

    // Setup mobile close button
    setupMobileCloseButton() {
        const mobileCloseBtn = document.getElementById('mobile-close-btn');
        if (!mobileCloseBtn) {
            console.log('Mobile close button not found');
            return;
        }
        
        console.log('Mobile close button found:', mobileCloseBtn);
        
        // SIMPLE: Only use click event, no touch events to avoid conflicts
        mobileCloseBtn.addEventListener('click', (e) => {
            console.log('Mobile close button clicked!');
            e.preventDefault();
            e.stopPropagation();
            this.closeMobileMenu();
        });
        
        console.log('Mobile close button event listeners added and styles forced');
    }
}

// No CSS animations - instant display
const style = document.createElement('style');
style.textContent = `
    /* Animations removed for instant display */
            opacity: 0;
        }
        100% {
            transform: translateY(0);
            opacity: 1;
        }
    }
    
    /* Subtle hover states for professional tabs */
    .nav-link:hover {
        transform: none;
    }
    
    .social-link:hover {
        transform: translateY(-1px) scale(1.01);
    }
    
    /* Minimal transitions for interactive elements */
    .nav-link, .social-link, .logo, .sidebar-footer .nav-link {
        transition: transform 0.15s ease;
    }
`;
document.head.appendChild(style);

// Token Metrics Data Fetcher
class TokenMetricsFetcher {
    constructor() {
        this.coinId = 'infinite-money-glitch';
        this.coingeckoUrl = `https://api.coingecko.com/api/v3/coins/${this.coinId}?localization=false&tickers=false&community_data=false&developer_data=false&sparkline=false&market_data=true`;
        this.dexScreenerUrl = 'https://api.dexscreener.com/latest/dex/tokens/znv3FZt2HFAvzYf5LxzVyryh3mBXWuTRRng25gEZAjh';
        this.totalSupply = 998959466; // Hardcoded total supply as per documentation
        this.updateInterval = 300000; // Update every 5 minutes
        this.init();
    }

    async init() {
        // Don't show fallback values immediately - wait for real data
        console.log('🔄 Initializing token metrics...');
        await this.fetchAllData();
        this.startAutoUpdate();
    }

    async fetchAllData() {
        console.log('🔄 Fetching all token metrics...');
        
        // Fetch DexScreener data (liquidity, volume, price)
        const dexData = await this.fetchDexScreenerData();
        if (dexData) {
            this.updateMetricsFromDexScreener(dexData);
        }
        
        // Set static IMG HOLDERS value
        this.updateHoldersMetric();
    }

    async fetchDexScreenerData() {
        try {
            console.log('📊 Fetching DexScreener data...');
            const response = await fetch(this.dexScreenerUrl, {
                cache: 'no-store',
                headers: {
                    'Accept': 'application/json',
                    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'
                }
            });

            if (!response.ok) {
                console.error(`DexScreener API error: ${response.status}`);
                return null;
            }

            const data = await response.json();
            console.log('✅ DexScreener data received:', data);
            return data;
        } catch (error) {
            console.error('❌ DexScreener fetch error:', error);
            return null;
        }
    }

    updateMetricsFromDexScreener(data) {
        try {
            if (data && data.pairs && data.pairs.length > 0) {
                const pair = data.pairs[0]; // Get the first (main) pair
                console.log('📈 Processing pair data:', pair);

                // Update IMG Price USD
                if (pair.priceUsd) {
                    const price = parseFloat(pair.priceUsd);
                    const formattedPrice = this.formatCurrency(price, 4);
                    this.updateElement('price-value', formattedPrice);
                    console.log('💰 Price updated:', formattedPrice);

                    // Calculate and update Market Cap
                    const marketCap = price * this.totalSupply;
                    const formattedMarketCap = this.formatCurrency(marketCap, 1);
                    this.updateElement('mcap-value', formattedMarketCap);
                    console.log('📊 Market Cap calculated:', formattedMarketCap);
                }

                // Update 24H Volume
                if (pair.volume && pair.volume.h24) {
                    const volume = parseFloat(pair.volume.h24);
                    const formattedVolume = this.formatCurrency(volume, 1);
                    this.updateElement('volume-value', formattedVolume);
                    console.log('📊 Volume updated:', formattedVolume);
                }

                // Update Liquidity
                if (pair.liquidity && pair.liquidity.usd) {
                    const liquidity = parseFloat(pair.liquidity.usd);
                    const formattedLiquidity = this.formatCurrency(liquidity, 1);
                    this.updateElement('liquidity-value', formattedLiquidity);
                    console.log('💧 Liquidity updated:', formattedLiquidity);
                }

                // Update 24H Change
                if (pair.priceChange && pair.priceChange.h24 !== undefined) {
                    const change = parseFloat(pair.priceChange.h24);
                    const changePercent = change.toFixed(1);
                    const changeText = change >= 0 ? `+${changePercent}%` : `${changePercent}%`;
                    this.updateElement('change-value', changeText);
                    console.log('📈 24H Change updated:', changeText);
                }
            } else {
                console.log('⚠️ No valid pair data found in DexScreener response');
            }
        } catch (error) {
            console.error('❌ Error updating metrics from DexScreener:', error);
        }
    }

    updateHoldersMetric() {
        console.log('=== UPDATE HOLDERS METRIC ===');
        console.log('Setting static IMG HOLDERS value: 22.80k');
        
        // Set static placeholder value for IMG HOLDERS
        this.updateElement('holders-value', '22.80k');
        
        console.log('✅ IMG HOLDERS updated to static value');
        console.log('=== END HOLDERS UPDATE ===');
    }

    formatCurrency(value, decimals = 2) {
        if (isNaN(value) || value === 0) return '$0.00';
        
        if (value >= 1000000) {
            return `$${(value / 1000000).toFixed(decimals)}M`;
        } else if (value >= 1000) {
            return `$${(value / 1000).toFixed(decimals)}K`;
        } else {
            return `$${value.toFixed(decimals)}`;
        }
    }

    formatNumber(value) {
        if (isNaN(value) || value === 0) return '0';
        
        if (value >= 1000000) {
            return `${(value / 1000000).toFixed(1)}M`;
        } else if (value >= 1000) {
            return `${(value / 1000).toFixed(1)}K`;
        } else {
            return value.toLocaleString();
        }
    }

    updateElement(elementId, value) {
        const element = document.getElementById(elementId);
        if (element) {
            element.textContent = value;
        } else {
            console.warn(`Element with ID '${elementId}' not found`);
        }
    }

    startAutoUpdate() {
        setInterval(() => {
            console.log('🔄 Auto-updating token metrics...');
            this.fetchAllData();
        }, this.updateInterval);
    }
}

// Chart Manager for Dashboard Charts
class ChartManager {
    constructor() {
        this.charts = {};
        this.init();
    }

    async init() {
        // Wait for DOM to be ready
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', () => this.createCharts());
        } else {
            this.createCharts();
        }
    }

    createCharts() {
        console.log('📊 Initializing dashboard charts...');
        
        // Create Weekly Rewards Chart
        this.createWeeklyRewardsChart();
        
        // Create Monthly Rewards Chart
        this.createMonthlyRewardsChart();
        
        // Create Process Line Chart
        this.createProcessLineChart();
        
        // Create Reward Distribution Pie Chart
        this.createRewardDistributionChart();
        
        console.log('✅ All charts initialized');
    }

    createWeeklyRewardsChart() {
        const ctx = document.getElementById('weekly-rewards-canvas');
        if (!ctx) {
            console.warn('Weekly rewards canvas not found');
            return;
        }

        // Placeholder data for August 2025
        const data = {
            labels: ['W1', 'W2', 'W3', 'W4'],
            datasets: [{
                label: 'Weekly Rewards',
                data: [20000, 28000, 25000, 32000], // 20k, 28k, 25k, 32k
                backgroundColor: [
                    'linear-gradient(180deg, rgba(59, 130, 246, 0.4) 0%, rgba(255, 255, 255, 0.2) 100%)',   // More transparent blue to white gradient
                    'linear-gradient(180deg, rgba(59, 130, 246, 0.4) 0%, rgba(255, 255, 255, 0.2) 100%)',   // More transparent blue to white gradient
                    'linear-gradient(180deg, rgba(59, 130, 246, 0.4) 0%, rgba(255, 255, 255, 0.2) 100%)',   // More transparent blue to white gradient
                    'linear-gradient(180deg, rgba(59, 130, 246, 0.4) 0%, rgba(255, 255, 255, 0.2) 100%)'   // More transparent blue to white gradient
                ],
                borderColor: [
                    'rgba(59, 130, 246, 0.6)',   // More transparent blue border
                    'rgba(59, 130, 246, 0.6)',   // More transparent blue border
                    'rgba(59, 130, 246, 0.6)',   // More transparent blue border
                    'rgba(59, 130, 246, 0.6)'   // More transparent blue border
                ],
                borderWidth: 1,
                borderRadius: 0, // Remove rounded corners for professional look
                borderSkipped: false,
            }]
        };

        const config = {
            type: 'bar',
            data: data,
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: {
                        display: false
                    },
                    tooltip: {
                        backgroundColor: 'rgba(15, 23, 42, 0.98)',
                        titleColor: '#f8fafc',
                        bodyColor: '#f8fafc',
                        borderColor: '#374151',
                        borderWidth: 1,
                        cornerRadius: 8,
                        displayColors: false,
                        callbacks: {
                            label: function(context) {
                                return `${context.parsed.y.toLocaleString()} $SOL`;
                            }
                        }
                    }
                },
                scales: {
                    y: {
                        beginAtZero: true,
                        grid: {
                            color: 'rgba(55, 65, 81, 0.3)',
                            drawBorder: false
                        },
                        ticks: {
                            color: '#94a3b8',
                            font: {
                                size: 11
                            },
                            callback: function(value) {
                                if (value >= 1000000) {
                                    return (value / 1000000).toFixed(1) + 'M';
                                } else if (value >= 1000) {
                                    return (value / 1000).toFixed(0) + 'k';
                                }
                                return value;
                            }
                        }
                    },
                    x: {
                        grid: {
                            display: false
                        },
                        ticks: {
                            color: '#94a3b8',
                            font: {
                                size: 12,
                                weight: '600'
                            }
                        }
                    }
                }
            },
            plugins: [{
                id: 'imgWatermark',
                afterDraw: function(chart) {
                    const ctx = chart.ctx;
                    ctx.save();
                    ctx.globalAlpha = 0.05; // Slightly more visible
                    ctx.font = 'bold 64px Inter, sans-serif'; // Increased from 36px to 64px
                    ctx.fillStyle = '#ffffff';
                    ctx.textAlign = 'center';
                    ctx.textBaseline = 'middle';
                    
                    // Position IMG text in center of chart
                    const centerX = chart.chartArea.left + (chart.chartArea.right - chart.chartArea.left) / 2;
                    const centerY = chart.chartArea.top + (chart.chartArea.bottom - chart.chartArea.top) / 2;
                    
                    ctx.fillText('IMG', centerX, centerY);
                    ctx.restore();
                }
            }]
        };

        this.charts.weeklyRewards = new Chart(ctx, config);
    }

    createMonthlyRewardsChart() {
        const ctx = document.getElementById('monthly-rewards-canvas');
        if (!ctx) {
            console.warn('Monthly rewards canvas not found');
            return;
        }

        // Placeholder data for Q3 2025
        const data = {
            labels: ['May', 'Jun', 'Jul', 'Aug'],
            datasets: [{
                label: 'Monthly Rewards',
                data: [58000, 74000, 50000, 105000], // 58k, 74k, 50k, 105k
                backgroundColor: [
                    'linear-gradient(180deg, rgba(59, 130, 246, 0.4) 0%, rgba(255, 255, 255, 0.2) 100%)',   // More transparent blue to white gradient
                    'linear-gradient(180deg, rgba(59, 130, 246, 0.4) 0%, rgba(255, 255, 255, 0.2) 100%)',   // More transparent blue white gradient
                    'linear-gradient(180deg, rgba(59, 130, 246, 0.4) 0%, rgba(255, 255, 255, 0.2) 100%)',   // More transparent blue to white gradient
                    'linear-gradient(180deg, rgba(59, 130, 246, 0.4) 0%, rgba(255, 255, 255, 0.2) 100%)'   // More transparent blue to white gradient
                ],
                borderColor: [
                    'rgba(59, 130, 246, 0.6)',   // More transparent blue border
                    'rgba(59, 130, 246, 0.6)',   // More transparent blue border
                    'rgba(59, 130, 246, 0.6)',   // More transparent blue border
                    'rgba(59, 130, 246, 0.6)'   // More transparent blue border
                ],
                borderWidth: 1,
                borderRadius: 0, // Remove rounded corners for professional look
                borderSkipped: false,
            }]
        };

        const config = {
            type: 'bar',
            data: data,
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: {
                        display: false
                    },
                    tooltip: {
                        backgroundColor: 'rgba(15, 23, 42, 0.98)',
                        titleColor: '#f8fafc',
                        bodyColor: '#f8fafc',
                        borderColor: '#374151',
                        borderWidth: 1,
                        cornerRadius: 8,
                        displayColors: false,
                        callbacks: {
                            label: function(context) {
                                return `${context.parsed.y.toLocaleString()} $SOL`;
                            }
                        }
                    }
                },
                scales: {
                    y: {
                        beginAtZero: true,
                        grid: {
                            color: 'rgba(55, 65, 81, 0.3)',
                            drawBorder: false
                        },
                        ticks: {
                            color: '#94a3b8',
                            font: {
                                size: 11
                            },
                            callback: function(value) {
                                if (value >= 1000000) {
                                    return (value / 1000000).toFixed(1) + 'M';
                                } else if (value >= 1000) {
                                    return (value / 1000).toFixed(0) + 'k';
                                }
                                return value;
                            }
                        }
                    },
                    x: {
                        grid: {
                            display: false
                        },
                        ticks: {
                            color: '#94a3b8',
                            font: {
                                size: 12,
                                weight: '600'
                            }
                        }
                    }
                }
            },
            plugins: [{
                id: 'imgWatermark',
                afterDraw: function(chart) {
                    const ctx = chart.ctx;
                    ctx.save();
                    ctx.globalAlpha = 0.05; // Slightly more visible
                    ctx.font = 'bold 64px Inter, sans-serif'; // Increased from 36px to 64px
                    ctx.fillStyle = '#ffffff';
                    ctx.textAlign = 'center';
                    ctx.textBaseline = 'middle';
                    
                    // Position IMG text in center of chart
                    const centerX = chart.chartArea.left + (chart.chartArea.right - chart.chartArea.left) / 2;
                    const centerY = chart.chartArea.top + (chart.chartArea.bottom - chart.chartArea.top) / 2;
                    
                    ctx.fillText('IMG', centerX, centerY);
                    ctx.restore();
                }
            }]
        };

        this.charts.monthlyRewards = new Chart(ctx, config);
    }

    createProcessLineChart() {
        const ctx = document.getElementById('process-line-canvas');
        if (!ctx) {
            console.warn('Process line canvas not found');
            return;
        }

        // Placeholder data for Q3 2025
        const data = {
            labels: ['May', 'Jun', 'Jul', 'Aug'],
            datasets: [{
                label: 'Process Value',
                data: [30000, 35000, 45000, 52000], // 30k, 35k, 45k, 52k
                borderColor: 'rgba(37, 99, 235, 0.6)', // More transparent blue
                backgroundColor: 'rgba(37, 99, 235, 0.1)', // Very light blue fill
                borderWidth: 2,
                fill: true,
                tension: 0, // Remove curve for straight professional lines
                pointBackgroundColor: 'rgba(37, 99, 235, 0.6)', // More transparent blue
                pointBorderColor: '#ffffff',
                pointBorderWidth: 2,
                pointRadius: 4, // Smaller points for professional look
                pointHoverRadius: 6,
                pointHoverBackgroundColor: 'rgba(37, 99, 235, 1)', // Solid blue on hover
                pointHoverBorderColor: '#ffffff'
            }]
        };

        const config = {
            type: 'line',
            data: data,
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: {
                        display: false
                    },
                    tooltip: {
                        backgroundColor: 'rgba(15, 23, 42, 0.98)',
                        titleColor: '#f8fafc',
                        bodyColor: '#f8fafc',
                        borderColor: '#374151',
                        borderWidth: 1,
                        cornerRadius: 8,
                        displayColors: false,
                        callbacks: {
                            label: function(context) {
                                return `${context.parsed.y.toLocaleString()} $SOL`;
                            }
                        }
                    }
                },
                scales: {
                    y: {
                        beginAtZero: true,
                        grid: {
                            color: 'rgba(55, 65, 81, 0.3)',
                            drawBorder: false
                        },
                        ticks: {
                            color: '#94a3b8',
                            font: {
                                size: 11
                            },
                            callback: function(value) {
                                if (value >= 1000000) {
                                    return (value / 1000000).toFixed(1) + 'M';
                                } else if (value >= 1000) {
                                    return (value / 1000).toFixed(0) + 'k';
                                }
                                return value;
                            }
                        }
                    },
                    x: {
                        grid: {
                            display: false
                        },
                        ticks: {
                            color: '#94a3b8',
                            font: {
                                size: 12,
                                weight: '600'
                            }
                        }
                    }
                }
            },
            plugins: [{
                id: 'imgWatermark',
                afterDraw: function(chart) {
                    const ctx = chart.ctx;
                    ctx.save();
                    ctx.globalAlpha = 0.05; // Slightly more visible
                    ctx.font = 'bold 64px Inter, sans-serif'; // Increased from 36px to 64px
                    ctx.fillStyle = '#ffffff';
                    ctx.textAlign = 'center';
                    ctx.textBaseline = 'middle';
                    
                    // Position IMG text in center of chart
                    const centerX = chart.chartArea.left + (chart.chartArea.right - chart.chartArea.left) / 2;
                    const centerY = chart.chartArea.top + (chart.chartArea.bottom - chart.chartArea.top) / 2;
                    
                    ctx.fillText('IMG', centerX, centerY);
                    ctx.restore();
                }
            }]
        };

        this.charts.processLine = new Chart(ctx, config);
    }

    createRewardDistributionChart() {
        const ctx = document.getElementById('rewardDistributionChart');
        if (!ctx) {
            console.warn('Reward distribution chart canvas not found');
            return;
        }

        // Backend-ready data structure for Daily Distribution
        this.dailyDistributionData = {
            // Column 1: Date and Financial Details
            date: 'Aug 20, 2025',
            totalHarvest: 12847.32,
            totalDistribution: 12847.32,
            totalRewards: 11562.59,
            
            // Column 2: Pie Chart Data (SOL values)
            treasuryInflow: 0.22441,
            holderEarnings: 0.17742,
            infraWallet: 0.02191,
            netBalance: 0.00500
        };

        // Data for the 4-segment donut chart - linked to backend data
        const data = {
            labels: ['Treasury Inflow', 'Holder Earnings', 'Infra Wallet', 'Net Balance'],
            datasets: [{
                data: [
                    this.dailyDistributionData.treasuryInflow,
                    this.dailyDistributionData.holderEarnings,
                    this.dailyDistributionData.infraWallet,
                    this.dailyDistributionData.netBalance
                ],
                backgroundColor: [
                    '#10b981', // Green for Treasury Inflow
                    '#3b82f6', // Blue for Holder Earnings
                    '#f59e0b', // Orange for Infra Wallet
                    '#ef4444'  // Red for Net Balance
                ],
                borderColor: [
                    '#10b981', // Green border
                    '#3b82f6', // Blue border
                    '#f59e0b', // Orange border
                    '#ef4444'  // Red border
                ],
                borderWidth: 0,
                hoverBackgroundColor: [
                    '#10b981', // Green on hover
                    '#3b82f6', // Blue on hover
                    '#f59e0b', // Orange on hover
                    '#ef4444'  // Red on hover
                ],
                hoverBorderColor: '#ffffff',
                hoverBorderWidth: 2
            }]
        };

        const config = {
            type: 'doughnut',
            data: data,
            options: {
                responsive: true,
                maintainAspectRatio: false,
                cutout: '65%', // Larger cutout for modern donut look
                plugins: {
                    legend: {
                        display: false // Hide legend since we have custom legend
                    },
                    tooltip: {
                        backgroundColor: '#0f172a',
                        titleColor: '#f8fafc',
                        bodyColor: '#f8fafc',
                        borderColor: '#374151',
                        borderWidth: 1,
                        cornerRadius: 8,
                        displayColors: true,
                        position: 'nearest',
                        yAlign: 'top',
                        xAlign: 'center',
                        callbacks: {
                            label: function(context) {
                                const value = context.parsed;
                                const total = context.dataset.data.reduce((a, b) => a + b, 0);
                                const percentage = ((value / total) * 100).toFixed(1);
                                return `${context.label}: ${value.toFixed(5)} SOL (${percentage}%)`;
                            }
                        }
                    }
                },
                elements: {
                    arc: {
                        borderWidth: 0
                    }
                },
                animation: {
                    animateRotate: true,
                    animateScale: true,
                    duration: 1500,
                    easing: 'easeOutQuart'
                }
            }
        };

        this.charts.rewardDistribution = new Chart(ctx, config);
        
        // Initialize the display with current data
        this.updateDailyDistributionDisplay();
    }

    // Method to update Daily Distribution data from backend
    updateDailyDistributionData(newData) {
        // Update the data structure
        this.dailyDistributionData = {
            ...this.dailyDistributionData,
            ...newData
        };

        // Update the pie chart data
        if (this.charts.rewardDistribution) {
            const chart = this.charts.rewardDistribution;
            chart.data.datasets[0].data = [
                this.dailyDistributionData.treasuryInflow,
                this.dailyDistributionData.holderEarnings,
                this.dailyDistributionData.infraWallet,
                this.dailyDistributionData.netBalance
            ];
            chart.update('active');
        }

        // Update the display
        this.updateDailyDistributionDisplay();
        
        console.log('✅ Daily Distribution data updated:', this.dailyDistributionData);
    }

    // Demo method to simulate backend data updates (remove when backend is ready)
    demoUpdateDailyDistribution() {
        const newData = {
            date: 'Aug 21, 2025',
            totalHarvest: 13500.00,
            totalDistribution: 13500.00,
            totalRewards: 12150.00,
            treasuryInflow: 0.24500,
            holderEarnings: 0.18900,
            infraWallet: 0.02350,
            netBalance: 0.00550
        };
        
        this.updateDailyDistributionData(newData);
        console.log('🎯 Demo: Daily Distribution updated with new data');
    }

    // Initialize Snapshots functionality
    initializeSnapshots() {
        // Distribution Snapshot refresh button
        const refreshDistributionBtn = document.getElementById('refresh-distribution-snapshot');
        if (refreshDistributionBtn) {
            refreshDistributionBtn.addEventListener('click', () => {
                this.refreshDistributionSnapshot();
            });
        }

        // Harvesting Snapshot refresh button
        const refreshHarvestingBtn = document.getElementById('refresh-harvesting-snapshot');
        if (refreshHarvestingBtn) {
            refreshHarvestingBtn.addEventListener('click', () => {
                this.refreshHarvestingSnapshot();
            });
        }
    }

    // Refresh Distribution Snapshot data
    async refreshDistributionSnapshot() {
        try {
            console.log('🔄 Refreshing Distribution Snapshot...');
            
            // Show loading state
            const refreshBtn = document.getElementById('refresh-distribution-snapshot');
            if (refreshBtn) {
                refreshBtn.style.opacity = '0.5';
                refreshBtn.style.pointerEvents = 'none';
            }

            // Simulate API call delay
            await new Promise(resolve => setTimeout(resolve, 800));

            // TODO: Replace with actual backend API call
            // const response = await fetch('/api/distribution-snapshot');
            // const data = await response.json();

            // For now, simulate new data (FIFO - First In, First Out)
            const newData = [
                { id: 'DS-007', date: 'Aug 21, 2025', time: '16:45 EST', imgSold: '2,500 IMG', txId: '0x1f2e3d...', status: 'completed' },
                { id: 'DS-008', date: 'Aug 21, 2025', time: '15:30 EST', imgSold: '1,800 IMG', txId: '0x4a5b6c...', status: 'pending' },
                { id: 'DS-009', date: 'Aug 21, 2025', time: '14:15 EST', imgSold: '950 IMG', txId: '0x7d8e9f...', status: 'completed' },
                { id: 'DS-010', date: 'Aug 21, 2025', time: '13:00 EST', imgSold: '1,200 IMG', txId: '0x0a1b2c...', status: 'completed' },
                { id: 'DS-011', date: 'Aug 21, 2025', time: '11:45 EST', imgSold: '2,800 IMG', txId: '0x3d4e5f...', status: 'completed' },
                { id: 'DS-012', date: 'Aug 21, 2025', time: '10:30 EST', imgSold: '750 IMG', txId: '0x6a7b8c...', status: 'failed' }
            ];

            this.updateDistributionSnapshotTable(newData);
            console.log('✅ Distribution Snapshot refreshed successfully');

        } catch (error) {
            console.error('❌ Error refreshing Distribution Snapshot:', error);
        } finally {
            // Restore button state
            const refreshBtn = document.getElementById('refresh-distribution-snapshot');
            if (refreshBtn) {
                refreshBtn.style.opacity = '1';
                refreshBtn.style.pointerEvents = 'auto';
            }
        }
    }

    // Refresh Harvesting Snapshot data
    async refreshHarvestingSnapshot() {
        try {
            console.log('🔄 Refreshing Harvesting Snapshot...');
            
            // Show loading state
            const refreshBtn = document.getElementById('refresh-harvesting-snapshot');
            if (refreshBtn) {
                refreshBtn.style.opacity = '0.5';
                refreshBtn.style.pointerEvents = 'none';
            }

            // Simulate API call delay
            await new Promise(resolve => setTimeout(resolve, 800));

            // TODO: Replace with actual backend API call
            // const response = await fetch('/api/harvesting-snapshot');
            // const data = await response.json();

            // For now, simulate new data (FIFO - First In, First Out)
            const newData = [
                { id: 'HS-007', date: 'Aug 21, 2025', time: '17:00 EST', rewardPool: '250.3 SOL', txId: '0x2e3f4a...', status: 'completed' },
                { id: 'HS-008', date: 'Aug 21, 2025', time: '15:45 EST', rewardPool: '180.7 SOL', txId: '0x5b6c7d...', status: 'pending' },
                { id: 'HS-009', date: 'Aug 21, 2025', time: '14:30 EST', rewardPool: '95.2 SOL', txId: '0x8e9f0a...', status: 'completed' },
                { id: 'HS-010', date: 'Aug 21, 2025', time: '13:15 EST', rewardPool: '125.8 SOL', txId: '0x1b2c3d...', status: 'completed' },
                { id: 'HS-011', date: 'Aug 21, 2025', time: '12:00 EST', rewardPool: '210.5 SOL', txId: '0x4e5f6a...', status: 'completed' },
                { id: 'HS-012', date: 'Aug 21, 2025', time: '10:45 EST', rewardPool: '75.9 SOL', txId: '0x7b8c9d...', status: 'failed' }
            ];

            this.updateHarvestingSnapshotTable(newData);
            console.log('✅ Harvesting Snapshot refreshed successfully');

        } catch (error) {
            console.error('❌ Error refreshing Harvesting Snapshot:', error);
        } finally {
            // Restore button state
            const refreshBtn = document.getElementById('refresh-harvesting-snapshot');
            if (refreshBtn) {
                refreshBtn.style.opacity = '1';
                refreshBtn.style.pointerEvents = 'auto';
            }
        }
    }

    // Update Distribution Snapshot table
    updateDistributionSnapshotTable(data) {
        const tbody = document.getElementById('distribution-snapshot-tbody');
        if (!tbody) return;

        // Clear existing rows
        tbody.innerHTML = '';

        // Add new rows (FIFO - most recent at top)
        data.forEach(item => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${item.id}</td>
                <td>${item.date}</td>
                <td>${item.time}</td>
                <td>${item.imgSold}</td>
                <td>${item.txId}</td>
                <td><span class="status-badge ${item.status}">${item.status}</span></td>
            `;
            tbody.appendChild(row);
        });
    }

    // Update Harvesting Snapshot table
    updateHarvestingSnapshotTable(data) {
        const tbody = document.getElementById('harvesting-snapshot-tbody');
        if (!tbody) return;

        // Clear existing rows
        tbody.innerHTML = '';

        // Add new rows (FIFO - most recent at top)
        data.forEach(item => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${item.id}</td>
                <td>${item.date}</td>
                <td>${item.time}</td>
                <td>${item.rewardPool}</td>
                <td>${item.txId}</td>
                <td><span class="status-badge ${item.status}">${item.status}</span></td>
            `;
            tbody.appendChild(row);
        });
    }

    // Method to update the HTML display
    updateDailyDistributionDisplay() {
        // Update Column 1: Date and Financial Details
        const dateElement = document.querySelector('.overview-data .data-item:nth-child(1) .data-value');
        const harvestElement = document.querySelector('.overview-data .data-item:nth-child(2) .data-value');
        const distributionElement = document.querySelector('.overview-data .data-item:nth-child(3) .data-value');
        const rewardsElement = document.querySelector('.overview-data .data-item:nth-child(4) .data-value');

        if (dateElement) dateElement.textContent = this.dailyDistributionData.date;
        if (harvestElement) harvestElement.textContent = `$${this.dailyDistributionData.totalHarvest.toLocaleString()}`;
        if (distributionElement) distributionElement.textContent = `$${this.dailyDistributionData.totalDistribution.toLocaleString()}`;
        if (rewardsElement) rewardsElement.textContent = `$${this.dailyDistributionData.totalRewards.toLocaleString()}`;

        // Update Column 2: Pie Chart Data
        const treasuryElement = document.querySelector('.overview-data .data-item:nth-child(5) .data-value');
        const holderElement = document.querySelector('.overview-data .data-item:nth-child(6) .data-value');
        const infraElement = document.querySelector('.overview-data .data-item:nth-child(7) .data-value');
        const balanceElement = document.querySelector('.overview-data .data-item:nth-child(8) .data-value');

        if (treasuryElement) treasuryElement.textContent = `${this.dailyDistributionData.treasuryInflow} SOL`;
        if (holderElement) holderElement.textContent = `${this.dailyDistributionData.holderEarnings} SOL`;
        if (infraElement) infraElement.textContent = `${this.dailyDistributionData.infraWallet} SOL`;
        if (balanceElement) balanceElement.textContent = `${this.dailyDistributionData.netBalance} SOL`;

        // Update center value in pie chart
        const centerValue = document.querySelector('.donut-center .center-value');
        if (centerValue) {
            const total = this.dailyDistributionData.treasuryInflow + this.dailyDistributionData.holderEarnings + 
                         this.dailyDistributionData.infraWallet + this.dailyDistributionData.netBalance;
            centerValue.textContent = `$${(total * 50).toFixed(1)}K`; // Approximate USD value
        }
    }

    // Method to update chart data from backend
    updateChartData(chartType, newData) {
        if (this.charts[chartType]) {
            const chart = this.charts[chartType];
            chart.data.datasets[0].data = newData;
            chart.update('active');
            console.log(`✅ Updated ${chartType} chart with new data:`, newData);
        }
    }

    // Method to handle period changes
    handlePeriodChange(chartType, period) {
        console.log(`🔄 Period changed for ${chartType}: ${period}`);
        // Here you would typically fetch new data from backend based on period
        // For now, we'll just log the change
    }
}

// Initialize Chart Manager when script loads
let chartManager;
document.addEventListener('DOMContentLoaded', () => {
    chartManager = new ChartManager();
    
    // Add event listeners for period dropdowns
    const periodDropdowns = document.querySelectorAll('.period-dropdown');
    periodDropdowns.forEach(dropdown => {
        dropdown.addEventListener('change', (e) => {
            const chartType = e.target.id.replace('-period', '');
            const period = e.target.value;
            if (chartManager) {
                chartManager.handlePeriodChange(chartType, period);
            }
        });
    });
    
    // Initialize refresh functionality
    initializeRefreshButtons();
});

// Refresh Button Functionality
function initializeRefreshButtons() {
    console.log('🔄 Initializing refresh buttons...');
    
    // Refresh Snapshots Button
    const refreshSnapshotsBtn = document.getElementById('refresh-snapshots');
    if (refreshSnapshotsBtn) {
        refreshSnapshotsBtn.addEventListener('click', () => {
            console.log('🔄 Refreshing reward snapshots...');
            refreshSnapshotsData();
        });
    }
    
    // Refresh Distribution Button
    const refreshDistributionBtn = document.getElementById('refresh-distribution');
    if (refreshDistributionBtn) {
        refreshDistributionBtn.addEventListener('click', () => {
            console.log('🔄 Refreshing reward distribution...');
            refreshDistributionData();
        });
    }
}

// Refresh Snapshots Data
async function refreshSnapshotsData() {
    try {
        console.log('📊 Refreshing reward snapshots list...');
        
        // Show loading state
        const refreshBtn = document.getElementById('refresh-snapshots');
        if (refreshBtn) {
            refreshBtn.style.opacity = '0.5';
            refreshBtn.style.pointerEvents = 'none';
        }
        
        // Simulate refresh delay
        await new Promise(resolve => setTimeout(resolve, 500));
        
        // Simple refresh - just reload the existing data
        const tbody = document.querySelector('.snapshots-table tbody');
        if (tbody) {
            // Add visual feedback
            tbody.style.opacity = '0.7';
            setTimeout(() => {
                tbody.style.opacity = '1';
            }, 200);
        }
        
        console.log('✅ Reward snapshots list refreshed successfully');
        
    } catch (error) {
        console.error('❌ Error refreshing snapshots:', error);
    } finally {
        // Restore button state
        const refreshBtn = document.getElementById('refresh-snapshots');
        if (refreshBtn) {
            refreshBtn.style.opacity = '1';
            refreshBtn.style.pointerEvents = 'auto';
        }
    }
}

// Refresh Distribution Data
async function refreshDistributionData() {
    try {
        console.log('💰 Refreshing reward distribution list...');
        
        // Show loading state
        const refreshBtn = document.getElementById('refresh-distribution');
        if (refreshBtn) {
            refreshBtn.style.opacity = '0.5';
            refreshBtn.style.pointerEvents = 'none';
        }
        
        // Simulate refresh delay
        await new Promise(resolve => setTimeout(resolve, 500));
        
        // Simple refresh - just reload the existing data
        const statItems = document.querySelectorAll('.stat-item');
        if (statItems.length > 0) {
            // Add visual feedback
            statItems.forEach(item => {
                item.style.opacity = '0.7';
                setTimeout(() => {
                    item.style.opacity = '1';
                }, 200);
            });
        }
        
        console.log('✅ Reward distribution list refreshed successfully');
        
    } catch (error) {
        console.error('❌ Error refreshing distribution:', error);
    } finally {
        // Restore button state
        const refreshBtn = document.getElementById('refresh-distribution');
        if (refreshBtn) {
            refreshBtn.style.opacity = '1';
            refreshBtn.style.pointerEvents = 'auto';
        }
    }
}

// Create Hourly Activity Chart
function createHourlyActivityChart() {
    const ctx = document.getElementById('hourlyActivityChart');
    if (!ctx) {
        console.warn('Hourly activity chart canvas not found');
        return;
    }

    // Sample data for 24-hour period (you can replace with real data)
    const hours = ['12AM', '1AM', '2AM', '3AM', '4AM', '5AM', '6AM', '7AM', '8AM', '9AM', '10AM', '11AM', '12PM', '1PM', '2PM', '3PM', '4PM', '5PM', '6PM', '7PM', '8PM', '9PM', '10PM', '11PM'];
    const activityData = [15, 8, 5, 3, 2, 4, 45, 62, 78, 85, 92, 88, 95, 87, 76, 68, 55, 42, 38, 45, 52, 48, 35, 22]; // Sample activity values for 24 hours

    const config = {
        type: 'bar',
        data: {
            labels: hours,
            datasets: [{
                label: 'Hourly Activity',
                data: activityData,
                backgroundColor: 'rgba(59, 130, 246, 0.8)',
                borderColor: 'rgba(59, 130, 246, 1)',
                borderWidth: 1,
                borderRadius: 4,
                borderSkipped: false,
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            indexAxis: 'y', // This makes it a horizontal bar chart
            plugins: {
                legend: {
                    display: false
                },
                tooltip: {
                    backgroundColor: 'rgba(15, 23, 42, 0.98)',
                    titleColor: '#f8fafc',
                    bodyColor: '#f8fafc',
                    borderColor: '#374151',
                    borderWidth: 1,
                    cornerRadius: 8,
                    callbacks: {
                        label: function(context) {
                            return `Activity: ${context.parsed.x}`;
                        }
                    }
                }
            },
            scales: {
                x: {
                    display: false, // Hide X-axis (no numbers below)
                    grid: {
                        display: false
                    }
                },
                y: {
                    position: 'left', // Hours on the left side
                    grid: {
                        display: false // No grid lines
                    },
                    ticks: {
                        color: '#9ca3af',
                        font: {
                            size: 11
                        }
                    }
                }
            },
            elements: {
                bar: {
                    backgroundColor: 'rgba(59, 130, 246, 0.8)',
                    borderColor: 'rgba(59, 130, 246, 1)',
                    borderWidth: 1,
                    borderRadius: 4,
                }
            }
        }
    };

    new Chart(ctx, config);
    console.log('✅ Hourly activity chart created successfully');
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    console.log('=== DOM CONTENT LOADED ===');
    console.log('Creating SidebarLoader...');
    window.sidebarLoader = new SidebarLoader();
    
            // Initialize token metrics fetcher after sidebar is loaded
        setTimeout(() => {
            console.log('Initializing token metrics fetcher...');
            const tokenFetcher = new TokenMetricsFetcher();
        }, 500);

        // Initialize snapshots functionality
        setTimeout(() => {
            console.log('Initializing snapshots...');
            if (chartManager) {
                chartManager.initializeSnapshots();
            }
        }, 1000);
        
        // Initialize wallet manager
        setTimeout(() => {
            console.log('Initializing Solana wallet manager...');
            walletManager = new SolanaWalletManager();
        }, 1200);
        

    

    
    // Force mobile layout check after initialization
    setTimeout(() => {
        if (window.sidebarLoader) {
            console.log('=== FORCING MOBILE LAYOUT AFTER INIT ===');
            window.sidebarLoader.forceMobileLayout();
            
            // Additional mobile check
            const isRealMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
            if (isRealMobile) {
                console.log('Real mobile device detected, forcing layout again...');
                window.sidebarLoader.forceMobileLayout();
                
                // Force mobile header visibility one more time
                const mobileHeader = document.querySelector('.mobile-header');
                if (mobileHeader) {
                    mobileHeader.style.display = 'flex';
                    mobileHeader.style.visibility = 'visible';
                    mobileHeader.style.opacity = '1';
                    console.log('Mobile header visibility forced again');
                }
            }
        }
    }, 1000);
});

// Solana Wallet Connection System
class SolanaWalletManager {
    constructor() {
        this.connection = null;
        this.wallet = null;
        this.isConnected = false;
        this.imgTokenAddress = 'znv3FZt2HFAvzYf5LxzVyryh3mBXWuTRRng25gEZAjh';
        this.requiredImgAmount = 47500; // 47.5k IMG tokens required for testing (UI still shows 50k)
        
        this.init();
    }
    
    init() {
        this.setupEventListeners();
        this.checkExistingConnection();
    }
    
    setupEventListeners() {
        // Connect wallet button
        const connectBtn = document.getElementById('connect-wallet-btn');
        if (connectBtn) {
            connectBtn.addEventListener('click', (e) => {
                e.preventDefault();
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
            phantomBtn.addEventListener('click', () => this.connectPhantom());
        }
        
        if (solflareBtn) {
            solflareBtn.addEventListener('click', () => this.connectSolflare());
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
    
    async connectPhantom() {
        try {
            if (!window.solana || !window.solana.isPhantom) {
                this.showError('Phantom wallet not found. Please install Phantom wallet extension.');
                return;
            }
            
            await this.connectWallet('phantom');
        } catch (error) {
            console.error('Phantom connection error:', error);
            this.showError('Failed to connect Phantom wallet: ' + error.message);
        }
    }
    
    async connectSolflare() {
        try {
            if (!window.solflare) {
                this.showError('Solflare wallet not found. Please install Solflare wallet extension.');
                return;
            }
            
            await this.connectWallet('solflare');
        } catch (error) {
            console.error('Solflare connection error:', error);
            this.showError('Failed to connect Solflare wallet: ' + error.message);
        }
    }
    
    async connectWallet(provider) {
        try {
            this.showStatus('Connecting to ' + provider + '...');
            
            let wallet;
            if (provider === 'phantom') {
                wallet = window.solana;
            } else if (provider === 'solflare') {
                wallet = window.solflare;
            }
            
            if (!wallet) {
                throw new Error('Wallet provider not available');
            }
            
            // Connect to wallet
            const response = await wallet.connect();
            this.wallet = wallet;
            this.walletPublicKey = response.publicKey.toString();
            
            this.showStatus('Checking wallet for IMG tokens...');
            
            // Check for IMG tokens
            const hasImgTokens = await this.checkImgTokens();
            
            if (hasImgTokens) {
                this.isConnected = true;
                this.showResult('success', '', 'Your wallet contains sufficient IMG tokens. Premium features are now unlocked.');
                setTimeout(() => {
                    this.updateUI();
                    this.hideWalletModal();
                }, 3000);
            } else {
                this.showResult('error', '', 'Insufficient IMG tokens found. You need at least 50k IMG to unlock premium features.');
                await this.disconnectWallet();
            }
            
        } catch (error) {
            console.error('Wallet connection error:', error);
            this.showResult('error', '❌ Connection Failed', 'Failed to connect wallet: ' + error.message);
        }
    }
    
    async checkImgTokens() {
        try {
            if (!this.wallet || !this.walletPublicKey) {
                return false;
            }
            
            // For demo purposes, we'll simulate checking IMG tokens
            // In production, you would use Solana RPC to check actual token balance
            console.log('Checking IMG tokens for wallet:', this.walletPublicKey);
            
            // Simulate API call delay
            await new Promise(resolve => setTimeout(resolve, 2000));
            
            // For demo: randomly determine if user has enough tokens
            // In production: check actual Solana token balance
            const hasEnoughTokens = Math.random() > 0.3; // 70% chance of having enough tokens
            
            if (hasEnoughTokens) {
                console.log('✅ User has sufficient IMG tokens');
                return true;
            } else {
                console.log('❌ User has insufficient IMG tokens');
                return false;
            }
            
        } catch (error) {
            console.error('Error checking IMG tokens:', error);
            return false;
        }
    }
    
    async disconnectWallet() {
        try {
            if (this.wallet && this.wallet.disconnect) {
                await this.wallet.disconnect();
            }
            
            this.wallet = null;
            this.walletPublicKey = null;
            this.isConnected = false;
            
            this.updateUI();
            console.log('Wallet disconnected');
            
        } catch (error) {
            console.error('Error disconnecting wallet:', error);
        }
    }
    
    showStatus(message) {
        const statusEl = document.getElementById('wallet-status');
        const resultEl = document.getElementById('wallet-result');
        
        if (statusEl) {
            statusEl.style.display = 'block';
            const statusText = statusEl.querySelector('.status-text');
            if (statusText) {
                statusText.textContent = message;
            }
        }
        
        if (resultEl) {
            resultEl.style.display = 'none';
        }
    }
    
    showResult(type, title, message) {
        const statusEl = document.getElementById('wallet-status');
        const resultEl = document.getElementById('wallet-result');
        
        if (statusEl) {
            statusEl.style.display = 'none';
        }
        
        if (resultEl) {
            resultEl.className = `wallet-result ${type}`;
            resultEl.style.display = 'block';
            
            const resultIcon = resultEl.querySelector('.result-icon');
            const resultText = resultEl.querySelector('.result-text');
            
            if (resultIcon) {
                resultIcon.textContent = title;
            }
            
            if (resultText) {
                resultText.textContent = message;
            }
        }
    }
    
    showSuccess(message) {
        this.showResult('success', '✅ Success', message);
    }
    
    showError(message) {
        this.showResult('error', '❌ Error', message);
    }
    
    updateUI() {
        // Update connect wallet button
        const connectBtn = document.getElementById('connect-wallet-btn');
        if (connectBtn) {
            if (this.isConnected) {
                connectBtn.innerHTML = `<span class="nav-text connect-wallet-text">DISCONNECT WALLET</span>`;
                connectBtn.style.background = 'linear-gradient(135deg, rgba(220, 38, 38, 0.15) 0%, rgba(185, 28, 28, 0.15) 100%)';
                connectBtn.style.borderColor = 'rgba(239, 68, 68, 0.3)';
            } else {
                connectBtn.innerHTML = `<span class="nav-text connect-wallet-text">CONNECT WALLET</span>`;
                connectBtn.style.background = '';
                connectBtn.style.borderColor = '';
            }
        }
        
        // Update premium menu items
        this.updatePremiumMenuAccess();
    }
    
    updatePremiumMenuAccess() {
        const premiumItems = document.querySelectorAll('.nav-item[data-page="harvesting"], .nav-item[data-page="distribution"], .nav-item[data-page="wallet-lookup"], .nav-item[data-page="reward-calculator"]');
        
        premiumItems.forEach(item => {
            const link = item.querySelector('.nav-link');
            if (link) {
                if (this.isConnected) {
                    // Enable premium tabs
                    link.style.opacity = '1';
                    link.style.cursor = 'pointer';
                    link.style.pointerEvents = 'auto';
                    link.style.filter = 'none';
                    
                    // Remove disabled styling
                    link.classList.remove('disabled');
                    item.classList.remove('disabled');
                } else {
                    // Disable premium tabs
                    link.style.opacity = '0.4';
                    link.style.cursor = 'not-allowed';
                    link.style.pointerEvents = 'none';
                    link.style.filter = 'grayscale(100%)';
                    
                    // Add disabled styling
                    link.classList.add('disabled');
                    item.classList.add('disabled');
                }
            }
        });
    }
    
    checkExistingConnection() {
        // Check if wallet is already connected
        if (window.solana && window.solana.isConnected) {
            this.wallet = window.solana;
            this.isConnected = true;
            this.updateUI();
        } else if (window.solflare && window.solflare.isConnected) {
            this.wallet = window.solflare;
            this.isConnected = true;
            this.updateUI();
        }
    }
}

// Initialize wallet manager when DOM is loaded
let walletManager;

// Connect Wallet Function (legacy support)
function connectWallet() {
    if (walletManager) {
        walletManager.showWalletModal();
    } else {
        console.log('🔗 Wallet manager not initialized');
    }
}


