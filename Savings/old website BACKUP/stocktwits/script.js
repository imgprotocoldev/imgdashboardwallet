// Reusable Sidebar Loader for IMG Protocol Website - Modern Financial Design
class SidebarLoader {
    constructor() {
        this.sidebarContainer = document.getElementById('sidebar-container');
        this.currentPage = this.getCurrentPage();
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
        try {
            await this.loadSidebar();
            this.setupSidebar();
            this.setActiveTab();
            this.addLoadedClass();
            this.setupEnhancedInteractions();
        } catch (error) {
            console.error('Failed to load sidebar:', error);
            this.showSidebarError();
        }
    }

    // Load sidebar HTML from external file
    async loadSidebar() {
        const response = await fetch('/sidebar.html');
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const sidebarHTML = await response.text();
        this.sidebarContainer.innerHTML = sidebarHTML;
    }

    // Setup sidebar functionality - Enhanced Modern Interactions
    setupSidebar() {
        // Get all navigation links
        const navLinks = this.sidebarContainer.querySelectorAll('.nav-link');
        
        // Add click event listeners for navigation with enhanced feedback
        navLinks.forEach(link => {
            link.addEventListener('click', (e) => {
                // Add click ripple effect
                this.createRippleEffect(e);
                
                // Remove active class from all nav items (not links)
                const allNavItems = this.sidebarContainer.querySelectorAll('.nav-item');
                allNavItems.forEach(item => item.classList.remove('active'));
                
                // Add active class to parent nav-item of clicked link
                const parentNavItem = link.closest('.nav-item');
                if (parentNavItem) {
                    parentNavItem.classList.add('active');
                    
                    // Add subtle animation to active item
                    this.animateActiveItem(parentNavItem);
                }
                
                // Handle navigation (except for external links)
                if (link.getAttribute('href').startsWith('#')) {
                    e.preventDefault();
                    const targetId = link.getAttribute('href').substring(1);
                    const targetSection = document.getElementById(targetId);
                    if (targetSection) {
                        targetSection.scrollIntoView({ behavior: 'smooth' });
                    }
                }
                
                console.log('Navigation clicked:', link.href);
            });
        });

        console.log('Enhanced sidebar setup complete - Modern Financial Design');
    }

    // Create ripple effect on click
    createRippleEffect(event) {
        const button = event.currentTarget;
        const ripple = document.createElement('span');
        const rect = button.getBoundingClientRect();
        const size = Math.max(rect.width, rect.height);
        const x = event.clientX - rect.left - size / 2;
        const y = event.clientY - rect.top - size / 2;
        
        ripple.style.cssText = `
            position: absolute;
            width: ${size}px;
            height: ${size}px;
            left: ${x}px;
            top: ${y}px;
            background: rgba(16, 185, 129, 0.3);
            border-radius: 50%;
            transform: scale(0);
            animation: ripple 0.6s linear;
            pointer-events: none;
        `;
        
        button.style.position = 'relative';
        button.appendChild(ripple);
        
        setTimeout(() => {
            ripple.remove();
        }, 600);
    }

    // Animate active item with subtle effects
    animateActiveItem(navItem) {
        // Add entrance animation
        navItem.style.animation = 'none';
        navItem.offsetHeight; // Trigger reflow
        navItem.style.animation = 'activeItemEntrance 0.4s cubic-bezier(0.4, 0, 0.2, 1)';
        
        // Add glow effect
        const link = navItem.querySelector('.nav-link');
        if (link) {
            link.style.boxShadow = '0 0 30px rgba(16, 185, 129, 0.3)';
            setTimeout(() => {
                link.style.boxShadow = '';
            }, 1000);
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

    // Setup enhanced interactions and animations
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

        // Add subtle entrance animations to social media icons
        const socialLinks = this.sidebarContainer.querySelectorAll('.social-link');
        socialLinks.forEach((link, index) => {
            link.style.animationDelay = `${index * 0.05}s`;
            link.classList.add('social-entrance');
        });

        // Add subtle entrance animation to navigation items
        const navItems = this.sidebarContainer.querySelectorAll('.nav-item');
        navItems.forEach((item, index) => {
            item.style.animationDelay = `${index * 0.02}s`;
            item.classList.add('nav-entrance');
        });
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
}

// Add CSS animations for enhanced interactions
const style = document.createElement('style');
style.textContent = `
    @keyframes ripple {
        to {
            transform: scale(4);
            opacity: 0;
        }
    }
    
    @keyframes activeItemEntrance {
        0% {
            transform: translateX(-5px);
            opacity: 0.9;
        }
        100% {
            transform: translateX(0);
            opacity: 1;
        }
    }
    
    .nav-entrance {
        animation: navItemEntrance 0.4s ease both;
    }
    
    @keyframes navItemEntrance {
        0% {
            transform: translateX(-10px);
            opacity: 0;
        }
        100% {
            transform: translateX(0);
            opacity: 1;
        }
    }
    
    .social-entrance {
        animation: socialEntrance 0.5s ease both;
    }
    
    @keyframes socialEntrance {
        0% {
            transform: translateY(10px);
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
        transform: translateY(-2px) scale(1.02);
    }
    
    /* Smooth transitions for all interactive elements */
    .nav-link, .social-link, .logo, .sidebar-footer .nav-link {
        transition: all 0.2s ease;
    }
`;
document.head.appendChild(style);

// Initialize sidebar when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    console.log('=== MODERN FINANCIAL WEBSITE LOADED ===');
    
    // Check if sidebar container exists
    if (document.getElementById('sidebar-container')) {
        new SidebarLoader();
    } else {
        console.error('Sidebar container not found!');
    }
    
    console.log('🎉 Enhanced sidebar initialization complete!');
});
