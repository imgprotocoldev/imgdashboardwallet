// Sidebar Loader for Reward Snapshot Page
class SidebarLoader {
    constructor() {
        this.sidebarContainer = document.getElementById('sidebar-container');
        this.init();
    }

    async init() {
        try {
            console.log('🔄 Loading sidebar for Reward Snapshot page...');
            const response = await fetch('../sidebar.html');
            
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            
            const sidebarHtml = await response.text();
            this.sidebarContainer.innerHTML = sidebarHtml;
            
            // Add loaded class to prevent flicker
            this.sidebarContainer.classList.add('loaded');
            
            // Set active tab for reward-snapshot
            this.setActiveTab();
            
            // Setup mobile menu functionality
            this.setupMobileMenu();
            
            console.log('✅ Sidebar loaded successfully');
            
        } catch (error) {
            console.error('❌ Sidebar failed to load:', error);
            this.showFallbackContent();
        }
    }

    setActiveTab() {
        const rewardSnapshotTab = document.querySelector('[data-page="reward-snapshot"]');
        if (rewardSnapshotTab) {
            rewardSnapshotTab.classList.add('active');
        }
    }

    setupMobileMenu() {
        const burgerBtn = document.getElementById('burger-menu-btn');
        const sidebarContainer = document.getElementById('sidebar-container');
        
        if (burgerBtn && sidebarContainer) {
            burgerBtn.addEventListener('click', () => {
                sidebarContainer.classList.toggle('open');
                console.log('🍔 Mobile menu toggled');
            });
            
            // Close sidebar when clicking outside
            document.addEventListener('click', (e) => {
                if (!sidebarContainer.contains(e.target) && !burgerBtn.contains(e.target)) {
                    sidebarContainer.classList.remove('open');
                }
            });
        }
    }

    showFallbackContent() {
        this.sidebarContainer.innerHTML = `
            <div class="sidebar-error">
                <h3>ERROR SIDEBAR</h3>
                <p>Sidebar failed to load. This is fallback content.</p>
                <p>Error: ${error.message}</p>
            </div>
        `;
    }
}

// Refresh Button Functionality for Reward Snapshot Page
function initializeRefreshButtons() {
    console.log('🔄 Initializing refresh buttons for Reward Snapshot page...');
    
    // Refresh Snapshots Button
    const refreshSnapshotsBtn = document.getElementById('refresh-snapshots');
    if (refreshSnapshotsBtn) {
        refreshSnapshotsBtn.addEventListener('click', () => {
            console.log('🔄 Refreshing reward snapshots...');
            refreshSnapshotsData();
        });
    }
}

// Reward Snapshots Data Management
class RewardSnapshotsManager {
    constructor() {
        this.snapshots = [];
        this.isLoading = false;
        this.currentPage = 1;
        this.itemsPerPage = 50; // Show more items per page for dedicated page
        this.totalItems = 0;
    }

    // Fetch snapshots from backend (can be replaced with actual API call)
    async fetchSnapshots(page = 1, limit = this.itemsPerPage) {
        try {
            this.isLoading = true;
            console.log(`📊 Fetching reward snapshots page ${page}, limit ${limit}...`);
            
            // Simulate API call delay
            await new Promise(resolve => setTimeout(resolve, 800));
            
            // For now, return mock data - replace with actual API call
            const mockData = this.generateMockData(page, limit);
            
            this.snapshots = mockData.data;
            this.totalItems = mockData.total;
            this.currentPage = page;
            
            console.log(`✅ Fetched ${this.snapshots.length} snapshots (Total: ${this.totalItems})`);
            return this.snapshots;
            
        } catch (error) {
            console.error('❌ Error fetching snapshots:', error);
            throw error;
        } finally {
            this.isLoading = false;
        }
    }

    // Generate mock data for testing (replace with actual data source)
    generateMockData(page, limit) {
        const totalItems = 150; // Total available snapshots
        const startIndex = (page - 1) * limit;
        const endIndex = Math.min(startIndex + limit, totalItems);
        
        const data = [];
        for (let i = startIndex; i < endIndex; i++) {
            const snapshotId = 848 - i;
            const date = new Date();
            date.setDate(date.getDate() - i);
            
            data.push({
                id: snapshotId,
                date: date.toLocaleDateString('en-US', { 
                    month: '2-digit', 
                    day: '2-digit', 
                    year: 'numeric' 
                }),
                time: '16:00 PM',
                imgSold: Math.floor(Math.random() * 5000000) + 1000000,
                rewardPool: (Math.random() * 5 + 0.5).toFixed(3) + ' SOL',
                distributed: (Math.random() * 5 + 0.5).toFixed(3) + ' SOL',
                status: 'COMPLETE'
            });
        }
        
        return {
            data,
            total: totalItems,
            page,
            limit,
            hasMore: endIndex < totalItems
        };
    }

               // Render snapshots to table
           renderSnapshots() {
               const tbody = document.querySelector('.snapshots-table tbody');
               if (!tbody) return;
               
               tbody.innerHTML = '';
               
               this.snapshots.forEach(snapshot => {
                   const row = document.createElement('tr');
                   row.innerHTML = `
                       <td>#${snapshot.id}</td>
                       <td>${snapshot.date}</td>
                       <td>${snapshot.time}</td>
                       <td>${snapshot.imgSold.toLocaleString()}</td>
                       <td>${snapshot.rewardPool}</td>
                       <td>${snapshot.distributed}</td>
                       <td><span class="status-badge complete">${snapshot.status}</span></td>
                   `;
                   tbody.appendChild(row);
               });
           }

    // Initialize chart
    initializeChart() {
        const ctx = document.getElementById('rewardChart');
        if (!ctx) return;
        
        // Generate sample chart data
        this.generateChartData();
        
        // Create Chart.js chart
        this.chart = new Chart(ctx, {
            type: 'line',
            data: {
                labels: this.chartData['30d'].map(item => item.date),
                datasets: [{
                    label: 'Daily Rewards (SOL)',
                    data: this.chartData['30d'].map(item => item.value),
                    borderColor: '#10b981',
                    backgroundColor: 'rgba(16, 185, 129, 0.1)',
                    borderWidth: 2,
                    fill: true,
                    tension: 0.4,
                    pointBackgroundColor: '#10b981',
                    pointBorderColor: '#ffffff',
                    pointBorderWidth: 2,
                    pointRadius: 4,
                    pointHoverRadius: 6
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: {
                        display: false
                    },
                    tooltip: {
                        backgroundColor: 'rgba(31, 41, 55, 0.9)',
                        titleColor: '#f8fafc',
                        bodyColor: '#f8fafc',
                        borderColor: '#374151',
                        borderWidth: 1,
                        cornerRadius: 8,
                        displayColors: false,
                        callbacks: {
                            label: function(context) {
                                return `Rewards: ${context.parsed.y.toFixed(3)} SOL`;
                            }
                        }
                    }
                },
                scales: {
                    x: {
                        grid: {
                            color: 'rgba(55, 65, 81, 0.2)',
                            drawBorder: false
                        },
                        ticks: {
                            color: '#94a3b8',
                            font: {
                                size: 10
                            },
                            maxTicksLimit: 8
                        }
                    },
                    y: {
                        grid: {
                            color: 'rgba(55, 65, 81, 0.2)',
                            drawBorder: false
                        },
                        ticks: {
                            color: '#94a3b8',
                            font: {
                                size: 10
                            },
                            callback: function(value) {
                                return value.toFixed(2) + ' SOL';
                            }
                        }
                    }
                },
                interaction: {
                    intersect: false,
                    mode: 'index'
                },
                elements: {
                    point: {
                        hoverBackgroundColor: '#10b981'
                    }
                }
            }
        });
    }
    
    // Generate sample chart data
    generateChartData() {
        const periods = {
            '7d': 7,
            '30d': 30,
            '90d': 90
        };
        
        Object.keys(periods).forEach(period => {
            const days = periods[period];
            const data = [];
            
            for (let i = days - 1; i >= 0; i--) {
                const date = new Date();
                date.setDate(date.getDate() - i);
                const value = (Math.random() * 3 + 0.5).toFixed(3);
                
                data.push({
                    date: date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
                    value: parseFloat(value)
                });
            }
            
            this.chartData[period] = data;
        });
    }
    
    // Update chart based on selected period
    updateChart(period) {
        if (!this.chart) return;
        
        this.chart.data.labels = this.chartData[period].map(item => item.date);
        this.chart.data.datasets[0].data = this.chartData[period].map(item => item.value);
        this.chart.update('none');
        
        // Update stats
        this.updateChartStats(period);
    }
    
    // Update chart statistics
    updateChartStats(period) {
        const data = this.chartData[period];
        const total = data.reduce((sum, item) => sum + item.value, 0);
        const avg = total / data.length;
        const peak = Math.max(...data.map(item => item.value));
        
        // Update DOM elements
        const totalEl = document.querySelector('.stat-value');
        const avgEl = document.querySelectorAll('.stat-value')[1];
        const peakEl = document.querySelectorAll('.stat-value')[2];
        
        if (totalEl) totalEl.textContent = total.toFixed(1) + ' SOL';
        if (avgEl) avgEl.textContent = avg.toFixed(2) + ' SOL';
        if (peakEl) peakEl.textContent = peak.toFixed(2) + ' SOL';
    }

    // Load more snapshots (pagination)
    async loadMore() {
        if (this.isLoading) return;
        
        const nextPage = this.currentPage + 1;
        const hasMore = (nextPage - 1) * this.itemsPerPage < this.totalItems;
        
        if (!hasMore) {
            console.log('📋 No more snapshots to load');
            return;
        }
        
        try {
            await this.fetchSnapshots(nextPage, this.itemsPerPage);
            this.renderSnapshots();
        } catch (error) {
            console.error('❌ Error loading more snapshots:', error);
        }
    }

    // Refresh snapshots data
    async refresh() {
        try {
            console.log('🔄 Refreshing reward snapshots...');
        const refreshBtn = document.getElementById('refresh-snapshots');
        if (refreshBtn) {
            refreshBtn.style.opacity = '0.5';
            refreshBtn.style.pointerEvents = 'none';
        }
        
            // Reset to first page and fetch fresh data
            this.currentPage = 1;
            await this.fetchSnapshots(1, this.itemsPerPage);
            this.renderSnapshots();
            
            console.log('✅ Reward snapshots refreshed successfully');
    } catch (error) {
        console.error('❌ Error refreshing snapshots:', error);
    } finally {
        const refreshBtn = document.getElementById('refresh-snapshots');
        if (refreshBtn) {
            refreshBtn.style.opacity = '1';
            refreshBtn.style.pointerEvents = 'auto';
        }
        }
    }
}

// Initialize Reward Snapshots Manager
const snapshotsManager = new RewardSnapshotsManager();

// Refresh Snapshots Data (enhanced)
async function refreshSnapshotsData() {
    await snapshotsManager.refresh();
}

// Initialize page
async function initializeRewardSnapshots() {
    try {
        console.log('🚀 Initializing Reward Snapshots page...');
        await snapshotsManager.fetchSnapshots();
        snapshotsManager.renderSnapshots();
        

        
        console.log('✅ Reward Snapshots page initialized successfully');
    } catch (error) {
        console.error('❌ Error initializing Reward Snapshots page:', error);
    }
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    console.log('🚀 Reward Snapshot page initializing...');
    
    // Initialize sidebar
    new SidebarLoader();
    
    // Initialize refresh functionality
    initializeRefreshButtons();
    
    // Initialize Reward Snapshots data
    initializeRewardSnapshots();
    
    console.log('✅ Reward Snapshot page initialized successfully');
});
