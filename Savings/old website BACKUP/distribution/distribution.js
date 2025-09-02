// Distribution Dashboard JavaScript
class DistributionDashboard {
    constructor() {
        this.distributionTimelineChart = null;
        this.walletDistributionChart = null;
        this.currentPeriod = '24h';
        
        this.init();
    }
    
    init() {
        this.setupEventListeners();
        this.initializeCharts();
        this.loadDistributionData();
        this.loadActivityData();
    }
    
    setupEventListeners() {
        // Period selector
        const periodSelector = document.getElementById('distribution-period');
        if (periodSelector) {
            periodSelector.addEventListener('change', (e) => {
                this.currentPeriod = e.target.value;
                this.updateDistributionTimelineChart();
            });
        }
        
        // Refresh button
        const refreshBtn = document.getElementById('refresh-distribution');
        if (refreshBtn) {
            refreshBtn.addEventListener('click', () => {
                this.loadActivityData();
            });
        }
    }
    
    initializeCharts() {
        this.createDistributionTimelineChart();
        this.createWalletDistributionChart();
    }
    
    createDistributionTimelineChart() {
        const ctx = document.getElementById('distribution-timeline-canvas');
        if (!ctx) return;
        
        const config = {
            type: 'line',
            data: {
                labels: [],
                datasets: [{
                    label: 'IMG Distributed',
                    data: [],
                    borderColor: '#3b82f6',
                    backgroundColor: 'rgba(59, 130, 246, 0.1)',
                    borderWidth: 2,
                    fill: true,
                    tension: 0.4,
                    pointBackgroundColor: '#3b82f6',
                    pointBorderColor: '#ffffff',
                    pointBorderWidth: 2,
                    pointRadius: 4
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
                        backgroundColor: '#1e293b',
                        titleColor: '#f8fafc',
                        bodyColor: '#e2e8f0',
                        borderColor: '#475569',
                        borderWidth: 1,
                        cornerRadius: 8,
                        displayColors: false
                    }
                },
                scales: {
                    x: {
                        grid: {
                            display: false
                        },
                        ticks: {
                            color: '#9ca3af',
                            font: {
                                size: 11
                            }
                        }
                    },
                    y: {
                        grid: {
                            color: 'rgba(148, 163, 184, 0.1)'
                        },
                        ticks: {
                            color: '#9ca3af',
                            font: {
                                size: 11
                            }
                        }
                    }
                }
            }
        };
        
        this.distributionTimelineChart = new Chart(ctx, config);
    }
    
    createWalletDistributionChart() {
        const ctx = document.getElementById('wallet-distribution-canvas');
        if (!ctx) return;
        
        const config = {
            type: 'doughnut',
            data: {
                labels: ['Whales (100k+)', 'Large (10k-100k)', 'Medium (1k-10k)', 'Small (100-1k)'],
                datasets: [{
                    data: [2.1, 8.7, 24.3, 64.9],
                    backgroundColor: [
                        '#fbbf24',
                        '#3b82f6',
                        '#10b981',
                        '#8b5cf6'
                    ],
                    borderColor: '#1e293b',
                    borderWidth: 2
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: {
                        position: 'bottom',
                        labels: {
                            color: '#e2e8f0',
                            font: {
                                size: 12
                            },
                            padding: 15
                        }
                    },
                    tooltip: {
                        backgroundColor: '#1e293b',
                        titleColor: '#f8fafc',
                        bodyColor: '#e2e8f0',
                        borderColor: '#475569',
                        borderWidth: 1,
                        cornerRadius: 8
                    }
                }
            }
        };
        
        this.walletDistributionChart = new Chart(ctx, config);
    }
    
    updateDistributionTimelineChart() {
        if (!this.distributionTimelineChart) return;
        
        const data = this.getDistributionDataForPeriod(this.currentPeriod);
        
        this.distributionTimelineChart.data.labels = data.labels;
        this.distributionTimelineChart.data.datasets[0].data = data.values;
        this.distributionTimelineChart.update();
    }
    
    getDistributionDataForPeriod(period) {
        // Mock data - in production this would come from backend
        const mockData = {
            '24h': {
                labels: ['00:00', '04:00', '08:00', '12:00', '16:00', '20:00', '24:00'],
                values: [1200, 980, 1450, 2100, 1800, 1650, 1400]
            },
            '7d': {
                labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
                values: [8500, 9200, 10500, 9800, 11200, 10800, 12500]
            },
            '30d': {
                labels: ['Week 1', 'Week 2', 'Week 3', 'Week 4'],
                values: [65000, 72000, 68000, 75000]
            },
            '90d': {
                labels: ['Month 1', 'Month 2', 'Month 3'],
                values: [280000, 320000, 350000]
            }
        };
        
        return mockData[period] || mockData['24h'];
    }
    
    loadDistributionData() {
        // Mock data - in production this would come from backend
        const mockData = {
            totalDistributed: '2,450,000 IMG',
            activeWallets: '15,847',
            avgDistribution: '154.6 IMG',
            distributionRate: '45.2 IMG/hr'
        };
        
        this.updateOverviewCards(mockData);
    }
    
    updateOverviewCards(data) {
        const totalDistributed = document.getElementById('total-distributed');
        const activeWallets = document.getElementById('active-wallets');
        const avgDistribution = document.getElementById('avg-distribution');
        const distributionRate = document.getElementById('distribution-rate');
        
        if (totalDistributed) totalDistributed.textContent = data.totalDistributed;
        if (activeWallets) activeWallets.textContent = data.activeWallets;
        if (avgDistribution) avgDistribution.textContent = data.avgDistribution;
        if (distributionRate) distributionRate.textContent = data.distributionRate;
    }
    
    loadActivityData() {
        // Mock data - in production this would come from backend
        const mockActivity = [
            {
                date: '2025-01-20 14:30',
                wallet: 'DvJ5...z2X9',
                amount: '250 IMG',
                type: 'Staking Reward',
                status: 'Completed'
            },
            {
                date: '2025-01-20 10:15',
                wallet: 'KpL8...mN3Q',
                amount: '180 IMG',
                type: 'Liquidity Reward',
                status: 'Completed'
            },
            {
                date: '2025-01-19 16:45',
                wallet: 'RfT2...vB7H',
                amount: '320 IMG',
                type: 'Governance Reward',
                status: 'Completed'
            },
            {
                date: '2025-01-19 12:20',
                wallet: 'XyZ9...pQ4R',
                amount: '150 IMG',
                type: 'Community Reward',
                status: 'Completed'
            }
        ];
        
        this.updateActivityTable(mockActivity);
    }
    
    updateActivityTable(activityData) {
        const tbody = document.getElementById('distribution-tbody');
        if (!tbody) return;
        
        if (activityData.length === 0) {
            tbody.innerHTML = '<tr><td colspan="5" class="no-data">No distribution activity found</td></tr>';
            return;
        }
        
        const rows = activityData.map(activity => `
            <tr>
                <td>${activity.date}</td>
                <td><code class="wallet-address">${activity.wallet}</code></td>
                <td>${activity.amount}</td>
                <td>${activity.type}</td>
                <td><span class="status-badge completed">${activity.status}</span></td>
            </tr>
        `).join('');
        
        tbody.innerHTML = rows;
    }
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    console.log('=== DISTRIBUTION DASHBOARD LOADING ===');
    
    // Wait for sidebar to load
    setTimeout(() => {
        console.log('Initializing Distribution Dashboard...');
        window.distributionDashboard = new DistributionDashboard();
    }, 1000);
});
