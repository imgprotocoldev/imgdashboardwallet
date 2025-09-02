// Harvesting Dashboard JavaScript
class HarvestingDashboard {
    constructor() {
        this.harvestingHistoryChart = null;
        this.rewardsDistributionChart = null;
        this.currentPeriod = '7d';
        
        this.init();
    }
    
    init() {
        this.setupEventListeners();
        this.initializeCharts();
        this.loadHarvestingData();
        this.loadActivityData();
    }
    
    setupEventListeners() {
        // Period selector
        const periodSelector = document.getElementById('harvesting-period');
        if (periodSelector) {
            periodSelector.addEventListener('change', (e) => {
                this.currentPeriod = e.target.value;
                this.updateHarvestingHistoryChart();
            });
        }
        
        // Refresh button
        const refreshBtn = document.getElementById('refresh-activity');
        if (refreshBtn) {
            refreshBtn.addEventListener('click', () => {
                this.loadActivityData();
            });
        }
        
        // Settings controls
        this.setupSettingsControls();
    }
    
    setupSettingsControls() {
        const autoHarvest = document.getElementById('auto-harvest');
        const harvestThreshold = document.getElementById('harvest-threshold');
        const notificationEmail = document.getElementById('notification-email');
        
        if (autoHarvest) {
            autoHarvest.addEventListener('change', (e) => {
                this.updateSetting('autoHarvest', e.target.checked);
            });
        }
        
        if (harvestThreshold) {
            harvestThreshold.addEventListener('change', (e) => {
                this.updateSetting('harvestThreshold', e.target.value);
            });
        }
        
        if (notificationEmail) {
            notificationEmail.addEventListener('change', (e) => {
                this.updateSetting('notificationEmail', e.target.value);
            });
        }
    }
    
    updateSetting(key, value) {
        console.log(`Setting updated: ${key} = ${value}`);
        // In production, this would save to backend
        localStorage.setItem(`harvesting_${key}`, JSON.stringify(value));
    }
    
    initializeCharts() {
        this.createHarvestingHistoryChart();
        this.createRewardsDistributionChart();
    }
    
    createHarvestingHistoryChart() {
        const ctx = document.getElementById('harvesting-history-canvas');
        if (!ctx) return;
        
        const config = {
            type: 'line',
            data: {
                labels: [],
                datasets: [{
                    label: 'IMG Harvested',
                    data: [],
                    borderColor: '#10b981',
                    backgroundColor: 'rgba(16, 185, 129, 0.1)',
                    borderWidth: 2,
                    fill: true,
                    tension: 0.4,
                    pointBackgroundColor: '#10b981',
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
        
        this.harvestingHistoryChart = new Chart(ctx, config);
    }
    
    createRewardsDistributionChart() {
        const ctx = document.getElementById('rewards-distribution-canvas');
        if (!ctx) return;
        
        const config = {
            type: 'doughnut',
            data: {
                labels: ['Staking Rewards', 'Liquidity Rewards', 'Governance Rewards', 'Other'],
                datasets: [{
                    data: [65, 20, 10, 5],
                    backgroundColor: [
                        '#10b981',
                        '#3b82f6',
                        '#f59e0b',
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
        
        this.rewardsDistributionChart = new Chart(ctx, config);
    }
    
    updateHarvestingHistoryChart() {
        if (!this.harvestingHistoryChart) return;
        
        const data = this.getHarvestingDataForPeriod(this.currentPeriod);
        
        this.harvestingHistoryChart.data.labels = data.labels;
        this.harvestingHistoryChart.data.datasets[0].data = data.values;
        this.harvestingHistoryChart.update();
    }
    
    getHarvestingDataForPeriod(period) {
        // Mock data - in production this would come from backend
        const mockData = {
            '7d': {
                labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
                values: [120, 150, 180, 200, 175, 220, 190]
            },
            '30d': {
                labels: ['Week 1', 'Week 2', 'Week 3', 'Week 4'],
                values: [850, 920, 1050, 980]
            },
            '90d': {
                labels: ['Month 1', 'Month 2', 'Month 3'],
                values: [3200, 3800, 3500]
            },
            '1y': {
                labels: ['Q1', 'Q2', 'Q3', 'Q4'],
                values: [9500, 11200, 10800, 12500]
            }
        };
        
        return mockData[period] || mockData['7d'];
    }
    
    loadHarvestingData() {
        // Mock data - in production this would come from backend
        const mockData = {
            totalHarvested: '45,250 IMG',
            currentRewards: '1,250 IMG',
            harvestingRate: '125 IMG/day',
            lastHarvest: '2 hours ago'
        };
        
        this.updateOverviewCards(mockData);
    }
    
    updateOverviewCards(data) {
        const totalHarvested = document.getElementById('total-harvested');
        const currentRewards = document.getElementById('current-rewards');
        const harvestingRate = document.getElementById('harvesting-rate');
        const lastHarvest = document.getElementById('last-harvest');
        
        if (totalHarvested) totalHarvested.textContent = data.totalHarvested;
        if (currentRewards) currentRewards.textContent = data.currentRewards;
        if (harvestingRate) harvestingRate.textContent = data.harvestingRate;
        if (lastHarvest) lastHarvest.textContent = data.lastHarvest;
    }
    
    loadActivityData() {
        // Mock data - in production this would come from backend
        const mockActivity = [
            {
                date: '2025-01-20 14:30',
                amount: '250 IMG',
                type: 'Staking Reward',
                status: 'Completed',
                transaction: 'DvJ5...z2X9'
            },
            {
                date: '2025-01-20 10:15',
                amount: '180 IMG',
                type: 'Liquidity Reward',
                status: 'Completed',
                transaction: 'KpL8...mN3Q'
            },
            {
                date: '2025-01-19 16:45',
                amount: '320 IMG',
                type: 'Governance Reward',
                status: 'Completed',
                transaction: 'RfT2...vB7H'
            }
        ];
        
        this.updateActivityTable(mockActivity);
    }
    
    updateActivityTable(activityData) {
        const tbody = document.getElementById('activity-tbody');
        if (!tbody) return;
        
        if (activityData.length === 0) {
            tbody.innerHTML = '<tr><td colspan="5" class="no-data">No harvesting activity found</td></tr>';
            return;
        }
        
        const rows = activityData.map(activity => `
            <tr>
                <td>${activity.date}</td>
                <td>${activity.amount}</td>
                <td>${activity.type}</td>
                <td><span class="status-badge completed">${activity.status}</span></td>
                <td><code class="transaction-id">${activity.transaction}</code></td>
            </tr>
        `).join('');
        
        tbody.innerHTML = rows;
    }
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    console.log('=== HARVESTING DASHBOARD LOADING ===');
    
    // Wait for sidebar to load
    setTimeout(() => {
        console.log('Initializing Harvesting Dashboard...');
        window.harvestingDashboard = new HarvestingDashboard();
    }, 1000);
});
