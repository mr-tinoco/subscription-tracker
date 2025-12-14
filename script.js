// Subscription Tracker - Main JavaScript

// State management
let subscriptions = [];

// DOM elements
const form = document.getElementById('subscription-form');
const nameInput = document.getElementById('subscription-name');
const costInput = document.getElementById('subscription-cost');
const billingCycleInput = document.getElementById('billing-cycle');
const subscriptionsList = document.getElementById('subscriptions-list');
const totalDisplay = document.getElementById('total-display');

// Initialize app
function init() {
    loadSubscriptions();
    renderSubscriptions();
    renderTotal();
    setupEventListeners();
}

// Setup event listeners
function setupEventListeners() {
    form.addEventListener('submit', handleFormSubmit);
}

// Handle form submission
function handleFormSubmit(e) {
    e.preventDefault();

    const name = nameInput.value.trim();
    const cost = parseFloat(costInput.value);
    const billingCycle = billingCycleInput.value;

    // Validation
    if (!name) {
        alert('Please enter a subscription name');
        return;
    }

    if (isNaN(cost) || cost <= 0) {
        alert('Please enter a valid cost');
        return;
    }

    // Add subscription
    addSubscription(name, cost, billingCycle);

    // Clear form
    nameInput.value = '';
    costInput.value = '';
    billingCycleInput.value = 'monthly';
    nameInput.focus();
}

// Add new subscription
function addSubscription(name, cost, billingCycle = 'monthly') {
    const subscription = {
        id: Date.now(),
        name: name,
        cost: cost,
        billingCycle: billingCycle,
        createdAt: new Date().toISOString()
    };

    subscriptions.push(subscription);

    // Debug logging
    console.log('Added:', subscription);
    console.log('All subscriptions:', subscriptions);

    saveSubscriptions();
    renderSubscriptions();
    renderTotal();
}

// Convert any billing cycle cost to monthly equivalent
function getMonthlyEquivalent(cost, billingCycle) {
    switch (billingCycle) {
        case 'weekly':
            return cost * 52 / 12; // 52 weeks per year / 12 months
        case 'yearly':
            return cost / 12;
        case 'monthly':
        default:
            return cost;
    }
}

// Format billing cycle display
function formatBillingCycle(cycle) {
    const cycles = {
        'monthly': 'Monthly',
        'yearly': 'Yearly',
        'weekly': 'Weekly'
    };
    return cycles[cycle] || 'Monthly';
}

// Get billing cycle badge color
function getBillingCycleBadge(cycle) {
    const badges = {
        'monthly': 'bg-blue-100 text-blue-800',
        'yearly': 'bg-purple-100 text-purple-800',
        'weekly': 'bg-green-100 text-green-800'
    };
    return badges[cycle] || badges['monthly'];
}

// Delete subscription
function deleteSubscription(id) {
    if (confirm('Are you sure you want to delete this subscription?')) {
        subscriptions = subscriptions.filter(sub => sub.id !== id);
        saveSubscriptions();
        renderSubscriptions();
        renderTotal();
    }
}

// Render subscriptions list
function renderSubscriptions() {
    if (subscriptions.length === 0) {
        subscriptionsList.innerHTML = `
            <div class="bg-white rounded-xl shadow-lg p-12 text-center border border-gray-100">
                <div class="inline-block p-4 bg-gray-100 rounded-full mb-4">
                    <svg class="w-12 h-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4"></path>
                    </svg>
                </div>
                <h3 class="text-xl font-semibold text-gray-800 mb-2">No subscriptions yet</h3>
                <p class="text-gray-500">Add your first subscription above to get started tracking your expenses!</p>
            </div>
        `;
        return;
    }

    const html = subscriptions.map(sub => {
        const billingCycle = sub.billingCycle || 'monthly';
        const badgeClass = getBillingCycleBadge(billingCycle);
        const monthlyEquiv = getMonthlyEquivalent(sub.cost, billingCycle);

        return `
        <div class="bg-white rounded-xl shadow-md hover:shadow-xl p-5 sm:p-6 mb-4 border border-gray-100 transition-all duration-300 hover:scale-[1.01] hover:border-blue-200">
            <div class="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-3 mb-3">
                <div class="flex-1">
                    <div class="flex items-center gap-2 mb-1">
                        <h3 class="text-lg sm:text-xl font-bold text-gray-800">${escapeHtml(sub.name)}</h3>
                    </div>
                    <p class="text-xs sm:text-sm text-gray-500">Added ${formatDate(sub.createdAt)}</p>
                </div>
                <span class="${badgeClass} px-3 py-1 rounded-full text-xs font-semibold whitespace-nowrap">
                    ${formatBillingCycle(billingCycle)}
                </span>
            </div>
            <div class="flex flex-col sm:flex-row sm:justify-between sm:items-end gap-4">
                <div class="flex-1">
                    <p class="text-2xl sm:text-3xl font-bold text-blue-600">
                        $${sub.cost.toFixed(2)}
                        <span class="text-sm sm:text-base text-gray-500 font-normal">/${billingCycle}</span>
                    </p>
                    ${billingCycle !== 'monthly' ? `<p class="text-sm text-gray-500 mt-1">≈ $${monthlyEquiv.toFixed(2)}/month</p>` : ''}
                </div>
                <button
                    onclick="deleteSubscription(${sub.id})"
                    class="bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white font-medium px-5 py-2.5 rounded-lg transition-all duration-200 ease-in-out transform hover:scale-105 active:scale-95 shadow-md hover:shadow-lg whitespace-nowrap"
                >
                    <span class="flex items-center justify-center">
                        <svg class="w-4 h-4 mr-1.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path>
                        </svg>
                        Delete
                    </span>
                </button>
            </div>
        </div>
        `;
    }).join('');

    subscriptionsList.innerHTML = html;
}

// Render total cost
function renderTotal() {
    // Calculate total by converting all subscriptions to monthly equivalent
    const monthlyTotal = subscriptions.reduce((sum, sub) => {
        const billingCycle = sub.billingCycle || 'monthly';
        return sum + getMonthlyEquivalent(sub.cost, billingCycle);
    }, 0);

    const yearlyTotal = monthlyTotal * 12;

    totalDisplay.innerHTML = `
        <div class="bg-gradient-to-br from-blue-600 via-blue-700 to-purple-700 rounded-xl shadow-2xl p-6 sm:p-8 text-white border border-blue-500 relative overflow-hidden">
            <!-- Decorative background pattern -->
            <div class="absolute top-0 right-0 -mt-4 -mr-4 opacity-10">
                <svg class="w-32 h-32" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm.31-8.86c-1.77-.45-2.34-.94-2.34-1.67 0-.84.79-1.43 2.1-1.43 1.38 0 1.9.66 1.94 1.64h1.71c-.05-1.34-.87-2.57-2.49-2.97V5H10.9v1.69c-1.51.32-2.72 1.3-2.72 2.81 0 1.79 1.49 2.69 3.66 3.21 1.95.46 2.34 1.15 2.34 1.87 0 .53-.39 1.39-2.1 1.39-1.6 0-2.23-.72-2.32-1.64H8.04c.1 1.7 1.36 2.66 2.86 2.97V19h2.34v-1.67c1.52-.29 2.72-1.16 2.73-2.77-.01-2.2-1.9-2.96-3.66-3.42z"></path>
                </svg>
            </div>

            <div class="relative">
                <!-- Header with icon -->
                <div class="flex items-center justify-center mb-6">
                    <div class="p-2 bg-white bg-opacity-20 rounded-full mr-3">
                        <svg class="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1.41 16.09V20h-2.67v-1.93c-1.71-.36-3.16-1.46-3.27-3.4h1.96c.1 1.05.82 1.87 2.65 1.87 1.96 0 2.4-.98 2.4-1.59 0-.83-.44-1.61-2.67-2.14-2.48-.6-4.18-1.62-4.18-3.67 0-1.72 1.39-2.84 3.11-3.21V4h2.67v1.95c1.86.45 2.79 1.86 2.85 3.39H14.3c-.05-1.11-.64-1.87-2.22-1.87-1.5 0-2.4.68-2.4 1.64 0 .84.65 1.39 2.67 1.91s4.18 1.39 4.18 3.91c-.01 1.83-1.38 2.83-3.12 3.16z"></path>
                        </svg>
                    </div>
                    <h2 class="text-xl sm:text-2xl font-bold">Total Spending</h2>
                </div>

                <!-- Totals Grid -->
                <div class="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-6">
                    <div class="bg-white bg-opacity-10 backdrop-blur-sm rounded-xl p-5 text-center border border-white border-opacity-20">
                        <p class="text-sm uppercase tracking-wide opacity-90 mb-2 font-semibold">Monthly Total</p>
                        <p class="text-4xl sm:text-5xl font-bold mb-1">$${monthlyTotal.toFixed(2)}</p>
                        <p class="text-xs opacity-75">per month</p>
                    </div>
                    <div class="bg-white bg-opacity-10 backdrop-blur-sm rounded-xl p-5 text-center border border-white border-opacity-20">
                        <p class="text-sm uppercase tracking-wide opacity-90 mb-2 font-semibold">Yearly Total</p>
                        <p class="text-4xl sm:text-5xl font-bold mb-1">$${yearlyTotal.toFixed(2)}</p>
                        <p class="text-xs opacity-75">per year</p>
                    </div>
                </div>

                <!-- Summary -->
                <div class="text-center py-3 bg-white bg-opacity-10 backdrop-blur-sm rounded-lg border border-white border-opacity-20">
                    <p class="text-sm font-medium">
                        <span class="font-bold text-lg">${subscriptions.length}</span>
                        active subscription${subscriptions.length !== 1 ? 's' : ''}
                    </p>
                </div>
            </div>
        </div>
    `;
}

// Save to localStorage
function saveSubscriptions() {
    localStorage.setItem('subscriptions', JSON.stringify(subscriptions));
}

// Load from localStorage
function loadSubscriptions() {
    const saved = localStorage.getItem('subscriptions');
    if (saved) {
        try {
            subscriptions = JSON.parse(saved);

            // Data migration: Add billingCycle to old subscriptions
            let needsSave = false;
            subscriptions = subscriptions.map(sub => {
                if (!sub.billingCycle) {
                    needsSave = true;
                    return { ...sub, billingCycle: 'monthly' };
                }
                return sub;
            });

            // Save if we migrated data
            if (needsSave) {
                saveSubscriptions();
            }
        } catch (e) {
            console.error('Error loading subscriptions:', e);
            subscriptions = [];
        }
    }
}

// Utility: Escape HTML to prevent XSS
function escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
}

// Utility: Format date
function formatDate(dateString) {
    const date = new Date(dateString);
    const now = new Date();
    const diffTime = Math.abs(now - date);
    const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));

    if (diffDays === 0) return 'today';
    if (diffDays === 1) return 'yesterday';
    if (diffDays < 7) return `${diffDays} days ago`;
    if (diffDays < 30) return `${Math.floor(diffDays / 7)} weeks ago`;
    if (diffDays < 365) return `${Math.floor(diffDays / 30)} months ago`;
    return date.toLocaleDateString();
}

// Initialize when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
} else {
    init();
}
