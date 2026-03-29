// Subscription Tracker - Main JavaScript

// State management
let subscriptions = [];
let filteredSubscriptions = []; // For search/filter results
let currentLanguage = 'en'; // 'en' or 'es'
let darkMode = false; // Dark mode state
let editingId = null; // Track which subscription is being edited
let currentSearchTerm = '';
let currentCategoryFilter = 'all';

// Budget tracker state
let monthlyIncome = 0;
let spendingEntries = [];
let currentTab = 'subscriptions';
let overviewPieChart = null;
let overviewBarChart = null;
let editingSpendingId = null;

// Chart instances
let pieChart = null;
let barChart = null;

// Currency settings
const currencies = {
    USD: { symbol: '$', code: 'USD', rate: 1, locale: 'en-US' },
    COP: { symbol: '$', code: 'COP', rate: 4150, locale: 'es-CO' } // ~4150 COP per USD
};

// Get current currency based on language
function getCurrentCurrency() {
    return currentLanguage === 'es' ? currencies.COP : currencies.USD;
}

// Format currency based on current language
function formatCurrency(amountUSD) {
    const currency = getCurrentCurrency();
    const convertedAmount = amountUSD * currency.rate;

    if (currency.code === 'COP') {
        // Format COP with thousands separator, no decimals
        return currency.symbol + Math.round(convertedAmount).toLocaleString('es-CO');
    } else {
        // Format USD with 2 decimals
        return currency.symbol + convertedAmount.toFixed(2);
    }
}

// Category definitions with emojis
const categories = {
    entertainment: { emoji: '🎬', en: 'Entertainment', es: 'Entretenimiento', color: '#ef4444' },
    software: { emoji: '💻', en: 'Software', es: 'Software', color: '#6366f1' },
    utilities: { emoji: '🔌', en: 'Utilities', es: 'Servicios', color: '#f59e0b' },
    health: { emoji: '💪', en: 'Health & Fitness', es: 'Salud y Fitness', color: '#10b981' },
    education: { emoji: '📚', en: 'Education', es: 'Educación', color: '#8b5cf6' },
    news: { emoji: '📰', en: 'News & Media', es: 'Noticias y Medios', color: '#f97316' },
    gaming: { emoji: '🎮', en: 'Gaming', es: 'Videojuegos', color: '#ec4899' },
    other: { emoji: '📦', en: 'Other', es: 'Otro', color: '#6b7280' }
};

// Spending categories for the Budget tab (different from subscription categories)
const spendingCategories = {
    housing:       { emoji: '🏠', en: 'Housing',       es: 'Vivienda',        color: '#64748b' },
    food:          { emoji: '🍕', en: 'Food & Dining', es: 'Comida',          color: '#f97316' },
    transport:     { emoji: '🚗', en: 'Transport',     es: 'Transporte',      color: '#3b82f6' },
    health:        { emoji: '🏥', en: 'Health',        es: 'Salud',           color: '#10b981' },
    shopping:      { emoji: '🛍️', en: 'Shopping',      es: 'Compras',         color: '#ec4899' },
    entertainment: { emoji: '🎉', en: 'Fun & Hobbies', es: 'Entretenimiento', color: '#ef4444' },
    bills:         { emoji: '📄', en: 'Bills',         es: 'Facturas',        color: '#f59e0b' },
    tech:          { emoji: '📱', en: 'Technology',    es: 'Tecnología',      color: '#6366f1' },
    travel:        { emoji: '✈️', en: 'Travel',        es: 'Viajes',          color: '#8b5cf6' },
    other:         { emoji: '📦', en: 'Other',         es: 'Otro',            color: '#6b7280' }
};

// Budget-specific translations (separate object so we don't break existing t() usage)
const budgetTranslations = {
    en: {
        subscriptionsTab: '📋 Subscriptions',
        budgetTab:        '💰 Budget',
        overviewTab:      '📊 Overview',
        monthlyIncome:    'Monthly Income',
        incomeDesc:       'Set your monthly take-home pay to track cash flow.',
        saveIncome:       'Save',
        incomeConfirm:    '✅ Income set: ',
        addExpenseTitle:  'Add Expense',
        expenseName:      'Expense Name',
        expenseAmount:    'Amount ($)',
        expenseCategory:  'Category',
        expenseDate:      'Date',
        expenseNote:      'Note (optional)',
        addExpenseBtn:    'Add Expense',
        updateExpenseBtn: 'Update Expense',
        noExpenses:       '💸 No expenses yet',
        noExpensesDesc:   'Add your first expense to start tracking your spending habits.',
        confirmDelExp:    'Delete this expense?',
        editBtn:          'Edit',
        deleteBtn:        'Delete',
        cashFlowTitle:    'Monthly Cash Flow',
        cashFlowGood:     "You're in the green! 💚",
        cashFlowBad:      "You're over budget! 🔴",
        cashFlowNeutral:  'Set your income to see cash flow',
        totalIncome:      'Income',
        subsCosts:        'Subscriptions',
        otherSpending:    'Other Spending',
        netCashFlow:      'Net Cash Flow',
        overviewChart:    'Spending Breakdown',
        noOverviewData:   'Add expenses and subscriptions to see the overview',
        thisMonth:        'This Month',
        remaining:        'Remaining',
        spent:            'Total Spent',
        setIncomeFirst:   'Go to Budget tab and set your monthly income',
        perMonth:         '/mo',
        spentOf:          'spent of',
    },
    es: {
        subscriptionsTab: '📋 Suscripciones',
        budgetTab:        '💰 Presupuesto',
        overviewTab:      '📊 Resumen',
        monthlyIncome:    'Ingreso Mensual',
        incomeDesc:       'Configura tu ingreso mensual para rastrear tu flujo de caja.',
        saveIncome:       'Guardar',
        incomeConfirm:    '✅ Ingreso: ',
        addExpenseTitle:  'Agregar Gasto',
        expenseName:      'Nombre del Gasto',
        expenseAmount:    'Monto ($)',
        expenseCategory:  'Categoría',
        expenseDate:      'Fecha',
        expenseNote:      'Nota (opcional)',
        addExpenseBtn:    'Agregar Gasto',
        updateExpenseBtn: 'Actualizar Gasto',
        noExpenses:       '💸 Sin gastos aún',
        noExpensesDesc:   'Agrega tu primer gasto para comenzar a rastrear.',
        confirmDelExp:    '¿Eliminar este gasto?',
        editBtn:          'Editar',
        deleteBtn:        'Eliminar',
        cashFlowTitle:    'Flujo de Caja Mensual',
        cashFlowGood:     '¡Estás en positivo! 💚',
        cashFlowBad:      '¡Te pasaste del presupuesto! 🔴',
        cashFlowNeutral:  'Configura tu ingreso para ver el flujo de caja',
        totalIncome:      'Ingreso',
        subsCosts:        'Suscripciones',
        otherSpending:    'Otros Gastos',
        netCashFlow:      'Flujo Neto',
        overviewChart:    'Desglose de Gastos',
        noOverviewData:   'Agrega gastos y suscripciones para ver el resumen',
        thisMonth:        'Este Mes',
        remaining:        'Restante',
        spent:            'Total Gastado',
        setIncomeFirst:   'Ve a Presupuesto y configura tu ingreso mensual',
        perMonth:         '/mes',
        spentOf:          'gastado de',
    }
};

// Budget translation helper (bt = budget translate)
function bt(key) {
    return (budgetTranslations[currentLanguage] && budgetTranslations[currentLanguage][key])
        || (budgetTranslations['en'] && budgetTranslations['en'][key])
        || key;
}

// Translations
const translations = {
    en: {
        pageTitle: 'Subscription Tracker',
        pageSubtitle: 'Your subscription budget — see where your money goes',
        formTitle: 'Add New Subscription',
        formTitleEdit: 'Edit Subscription',
        labelName: 'Subscription Name',
        labelCost: 'Cost (USD)',
        labelCycle: 'Billing Cycle',
        labelCategory: 'Category',
        placeholderName: 'Netflix, Spotify, etc.',
        placeholderSearch: 'Search subscriptions...',
        monthly: 'Monthly',
        yearly: 'Yearly',
        weekly: 'Weekly',
        addButton: 'Add Subscription',
        updateButton: 'Update Subscription',
        cancelButton: 'Cancel',
        deleteButton: 'Delete',
        editButton: 'Edit',
        exportButton: 'Export CSV',
        allCategories: 'All Categories',
        confirmDelete: 'Are you sure you want to delete this subscription?',
        noSubscriptions: '💰 No subscriptions yet',
        noSubscriptionsDesc: 'Most people have 8–12. Start with the ones you pay every month — Netflix, Spotify, iCloud, ChatGPT.',
        noResults: '🔍 No results found',
        noResultsDesc: 'Try adjusting your search or filter criteria',
        totalSpending: 'Monthly Budget Impact',
        monthlyTotal: 'Monthly Budget',
        yearlyTotal: 'Yearly Total',
        perMonth: 'per month',
        perYear: 'from your annual budget',
        activeSubscription: 'active subscription',
        activeSubscriptions: 'active subscriptions',
        showing: 'Showing',
        of: 'of',
        added: 'Added',
        loading: 'Loading your subscriptions...',
        langText: 'English',
        langFlag: '🇺🇸',
        validationName: 'Please enter a subscription name',
        validationCost: 'Please enter a valid cost',
        today: 'today',
        yesterday: 'yesterday',
        daysAgo: 'days ago',
        weeksAgo: 'weeks ago',
        monthsAgo: 'months ago',
        exportSuccess: 'CSV file downloaded!',
        exportEmpty: 'No subscriptions to export',
        darkMode: 'Dark',
        lightMode: 'Light',
        chartsTitle: 'Spending by Category',
        chartsEmpty: 'Add subscriptions to see spending charts',
        currency: 'USD'
    },
    es: {
        pageTitle: 'Rastreador de Suscripciones',
        pageSubtitle: 'Administra y rastrea todas tus suscripciones en un solo lugar',
        formTitle: 'Agregar Nueva Suscripción',
        formTitleEdit: 'Editar Suscripción',
        labelName: 'Nombre de Suscripción',
        labelCost: 'Costo (USD)',
        labelCycle: 'Ciclo de Facturación',
        labelCategory: 'Categoría',
        placeholderName: 'Netflix, Spotify, etc.',
        placeholderSearch: 'Buscar suscripciones...',
        monthly: 'Mensual',
        yearly: 'Anual',
        weekly: 'Semanal',
        addButton: 'Agregar Suscripción',
        updateButton: 'Actualizar Suscripción',
        cancelButton: 'Cancelar',
        deleteButton: 'Eliminar',
        editButton: 'Editar',
        exportButton: 'Exportar CSV',
        allCategories: 'Todas las Categorías',
        confirmDelete: '¿Estás seguro de que quieres eliminar esta suscripción?',
        noSubscriptions: '📋 No hay suscripciones todavía',
        noSubscriptionsDesc: '¡Agrega tu primera suscripción arriba para comenzar a rastrear tus gastos!',
        noResults: '🔍 Sin resultados',
        noResultsDesc: 'Intenta ajustar tu búsqueda o filtros',
        totalSpending: 'Gasto Total',
        monthlyTotal: 'Total Mensual',
        yearlyTotal: 'Total Anual',
        perMonth: 'por mes',
        perYear: 'por año',
        activeSubscription: 'suscripción activa',
        activeSubscriptions: 'suscripciones activas',
        showing: 'Mostrando',
        of: 'de',
        added: 'Agregado',
        loading: 'Cargando tus suscripciones...',
        langText: 'Español',
        langFlag: '🇨🇴',
        validationName: 'Por favor ingresa un nombre de suscripción',
        validationCost: 'Por favor ingresa un costo válido',
        today: 'hoy',
        yesterday: 'ayer',
        daysAgo: 'días atrás',
        weeksAgo: 'semanas atrás',
        monthsAgo: 'meses atrás',
        exportSuccess: '¡Archivo CSV descargado!',
        exportEmpty: 'No hay suscripciones para exportar',
        darkMode: 'Oscuro',
        lightMode: 'Claro',
        chartsTitle: 'Gastos por Categoría',
        chartsEmpty: 'Agrega suscripciones para ver los gráficos',
        currency: 'COP'
    }
};

// Get translation helper
function t(key) {
    return translations[currentLanguage][key] || translations['en'][key] || key;
}

// Get category name in current language
function getCategoryName(categoryKey) {
    const cat = categories[categoryKey];
    return cat ? `${cat.emoji} ${cat[currentLanguage]}` : categoryKey;
}

// DOM elements
const form = document.getElementById('subscription-form');
const nameInput = document.getElementById('subscription-name');
const costInput = document.getElementById('subscription-cost');
const billingCycleInput = document.getElementById('billing-cycle');
const categoryInput = document.getElementById('subscription-category');
const subscriptionsList = document.getElementById('subscriptions-list');
const totalDisplay = document.getElementById('total-display');
const searchInput = document.getElementById('search-input');
const filterCategory = document.getElementById('filter-category');

// Show loading state
function showLoading() {
    subscriptionsList.innerHTML = `
        <div class="bg-white rounded-xl shadow-lg p-12 text-center border border-gray-100">
            <div class="inline-block animate-spin rounded-full h-8 w-8 border-4 border-blue-500 border-t-transparent mb-4"></div>
            <p class="text-gray-500">${t('loading')}</p>
        </div>
    `;
}

// Initialize app
function init() {
    // Check URL parameter for language override first (e.g. app.html?lang=es)
    // This lets the Spanish landing page open the app already in Spanish mode
    const urlParams = new URLSearchParams(window.location.search);
    const langParam = urlParams.get('lang');
    if (langParam === 'es' || langParam === 'en') {
        currentLanguage = langParam;
        localStorage.setItem('language', langParam); // persist the choice
    } else {
        // No URL param — fall back to whatever was saved in localStorage
        const savedLang = localStorage.getItem('language');
        if (savedLang) {
            currentLanguage = savedLang;
        }
    }

    const savedDarkMode = localStorage.getItem('darkMode');
    if (savedDarkMode === 'true') {
        darkMode = true;
    }

    // Show loading state briefly
    showLoading();

    // Small delay to show loading state (better UX)
    setTimeout(() => {
        // Step 1: Load data from localStorage FIRST
        loadFromLocalStorage();
        // Step 2: Apply filters (initially shows all)
        applyFilters();
        // Step 3: Apply language, theme, and dark mode
        applyLanguage();
        applyDarkMode();
        // Step 4: Render charts
        renderCharts();
        // Step 5: Load budget data and restore tab
        loadBudgetFromLocalStorage();
    }, 300);

    setupEventListeners();
    setupSpendingFormListeners();
}

// Setup event listeners
function setupEventListeners() {
    form.addEventListener('submit', handleFormSubmit);
}

// Toggle language
function toggleLanguage() {
    currentLanguage = currentLanguage === 'en' ? 'es' : 'en';
    localStorage.setItem('language', currentLanguage);
    applyLanguage();
    applyFilters();
    renderCharts();
    updateTabLabels();
    updateBudgetLanguage();
    if (currentTab === 'budget') { renderBudgetMonthStats(); renderSpendingList(); }
    if (currentTab === 'overview') { renderOverview(); }
    console.log(`Language switched to: ${currentLanguage}`);
}

// Toggle dark mode
function toggleDarkMode() {
    darkMode = !darkMode;
    localStorage.setItem('darkMode', darkMode);
    applyDarkMode();
    renderCharts(); // Re-render charts with new colors
    console.log(`Dark mode: ${darkMode}`);
}

// Apply dark mode
function applyDarkMode() {
    const body = document.getElementById('app-body');
    const darkModeIcon = document.getElementById('dark-mode-icon');
    const darkModeText = document.getElementById('dark-mode-text');
    const darkModeToggle = document.getElementById('dark-mode-toggle');

    if (darkMode) {
        darkModeIcon.textContent = '☀️';
        darkModeText.textContent = t('lightMode');
        darkModeToggle.className = 'flex items-center gap-2 px-4 py-2 bg-gray-800 rounded-full shadow-md hover:shadow-lg transition-all duration-200 border border-gray-700 hover:border-gray-600';

        // Only apply dark background if not in Spanish/Comuna 13 mode
        if (currentLanguage !== 'es') {
            body.className = 'bg-gray-900 min-h-screen py-8 px-4 sm:py-12 transition-all duration-500';
        }
    } else {
        darkModeIcon.textContent = '🌙';
        darkModeText.textContent = t('darkMode');
        darkModeToggle.className = 'flex items-center gap-2 px-4 py-2 bg-white rounded-full shadow-md hover:shadow-lg transition-all duration-200 border border-gray-200 hover:border-gray-300';
    }

    // Re-apply theme to update all components
    applyTheme(currentLanguage === 'es');
}

// Apply language to all UI elements
function applyLanguage() {
    const isSpanish = currentLanguage === 'es';

    // Update language toggle button
    document.getElementById('lang-flag').textContent = t('langFlag');
    document.getElementById('lang-text').textContent = t('langText');

    // Update dark mode button text
    document.getElementById('dark-mode-text').textContent = darkMode ? t('lightMode') : t('darkMode');

    // Update page title and subtitle
    document.getElementById('page-title').textContent = t('pageTitle');
    document.getElementById('page-subtitle').textContent = t('pageSubtitle');

    // Update form
    document.getElementById('form-title').textContent = editingId ? t('formTitleEdit') : t('formTitle');
    document.getElementById('label-name').textContent = t('labelName');
    document.getElementById('label-cost').textContent = t('labelCost');
    document.getElementById('label-cycle').textContent = t('labelCycle');
    document.getElementById('label-category').textContent = t('labelCategory');
    nameInput.placeholder = t('placeholderName');

    // Update billing cycle options
    const cycleOptions = billingCycleInput.options;
    cycleOptions[0].textContent = t('monthly');
    cycleOptions[1].textContent = t('yearly');
    cycleOptions[2].textContent = t('weekly');

    // Update category options in form
    updateCategoryOptions(categoryInput);

    // Update search placeholder
    searchInput.placeholder = t('placeholderSearch');

    // Update filter dropdown
    document.getElementById('filter-all').textContent = t('allCategories');
    updateCategoryOptions(filterCategory, true);

    // Update export button
    document.getElementById('export-btn-text').textContent = t('exportButton');

    // Update charts title
    document.getElementById('charts-title').textContent = t('chartsTitle');
    document.getElementById('charts-empty').textContent = t('chartsEmpty');

    // Update submit button
    const submitBtnText = document.getElementById('submit-btn-text');
    const icon = editingId ?
        '<svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path></svg>' :
        '<svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"></path></svg>';
    submitBtnText.innerHTML = icon + (editingId ? t('updateButton') : t('addButton'));

    // Update cancel button
    document.getElementById('cancel-btn').textContent = t('cancelButton');

    // Update tab labels and budget UI text
    updateTabLabels();
    updateBudgetLanguage();

    // Apply Comuna 13 theme for Spanish
    applyTheme(isSpanish);
}

// Update category options in a select element
function updateCategoryOptions(selectElement, includeAll = false) {
    const currentValue = selectElement.value;
    const startIndex = includeAll ? 1 : 0; // Skip "All Categories" if present

    for (let i = startIndex; i < selectElement.options.length; i++) {
        const option = selectElement.options[i];
        const catKey = option.value;
        if (categories[catKey]) {
            option.textContent = getCategoryName(catKey);
        }
    }

    selectElement.value = currentValue;
}

// Apply Comuna 13 theme (vibrant, graffiti-inspired, reggaeton vibes)
function applyTheme(isSpanish) {
    const body = document.getElementById('app-body');
    const formCard = document.getElementById('form-card');
    const filterSection = document.getElementById('filter-section');
    const chartsSection = document.getElementById('charts-section');
    const iconContainer = document.getElementById('icon-container');
    const pageTitle = document.getElementById('page-title');
    const pageSubtitle = document.getElementById('page-subtitle');
    const submitBtn = document.getElementById('submit-btn');
    const exportBtn = document.getElementById('export-btn');
    const langToggle = document.getElementById('lang-toggle');

    if (isSpanish) {
        // Comuna 13 Theme - Vibrant graffiti colors
        body.className = 'min-h-screen py-8 px-4 sm:py-12 transition-all duration-500 bg-gradient-to-br from-orange-400 via-pink-500 to-purple-600';

        // Add animated background pattern (graffiti-style)
        body.style.backgroundImage = `
            linear-gradient(135deg, rgba(255,107,53,0.9) 0%, rgba(236,64,122,0.9) 50%, rgba(123,31,162,0.9) 100%),
            url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")
        `;

        formCard.className = 'bg-white/95 backdrop-blur-sm rounded-xl shadow-2xl p-6 sm:p-8 mb-8 border-2 border-yellow-400 transition-all duration-300';
        filterSection.className = 'bg-white/95 backdrop-blur-sm rounded-xl shadow-lg p-4 sm:p-6 mb-6 border-2 border-yellow-400 transition-all duration-300';
        chartsSection.className = 'mt-6 bg-white/95 backdrop-blur-sm rounded-xl shadow-lg p-6 sm:p-8 border-2 border-yellow-400 transition-all duration-300';
        iconContainer.className = 'inline-block p-3 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full mb-4 transition-all duration-300 shadow-lg';
        pageTitle.className = 'text-4xl sm:text-5xl font-bold text-white mb-2 transition-colors duration-300 drop-shadow-lg';
        pageSubtitle.className = 'text-white/90 transition-colors duration-300 font-medium';
        submitBtn.className = 'flex-1 bg-gradient-to-r from-yellow-400 via-orange-500 to-pink-500 hover:from-yellow-500 hover:via-orange-600 hover:to-pink-600 text-white font-semibold py-3.5 px-6 rounded-lg transition-all duration-200 ease-in-out transform hover:scale-[1.02] hover:shadow-lg active:scale-[0.98] shadow-xl';
        exportBtn.className = 'px-4 py-2.5 bg-gradient-to-r from-yellow-400 to-orange-500 hover:from-yellow-500 hover:to-orange-600 text-white font-medium rounded-lg transition-all duration-200 ease-in-out transform hover:scale-105 active:scale-95 shadow-md hover:shadow-lg whitespace-nowrap';
        langToggle.className = 'flex items-center gap-2 px-4 py-2 bg-white/95 rounded-full shadow-md hover:shadow-lg transition-all duration-200 border-2 border-yellow-400';
    } else if (darkMode) {
        // Dark mode theme
        body.className = 'bg-gray-900 min-h-screen py-8 px-4 sm:py-12 transition-all duration-500';
        body.style.backgroundImage = '';

        formCard.className = 'bg-gray-800 rounded-xl shadow-lg p-6 sm:p-8 mb-8 border border-gray-700 transition-all duration-300';
        filterSection.className = 'bg-gray-800 rounded-xl shadow-lg p-4 sm:p-6 mb-6 border border-gray-700 transition-all duration-300';
        chartsSection.className = 'mt-6 bg-gray-800 rounded-xl shadow-lg p-6 sm:p-8 border border-gray-700 transition-all duration-300';
        iconContainer.className = 'inline-block p-3 bg-blue-900 rounded-full mb-4 transition-all duration-300';
        pageTitle.className = 'text-4xl sm:text-5xl font-bold text-white mb-2 transition-colors duration-300';
        pageSubtitle.className = 'text-gray-400 transition-colors duration-300';
        submitBtn.className = 'flex-1 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-semibold py-3.5 px-6 rounded-lg transition-all duration-200 ease-in-out transform hover:scale-[1.02] hover:shadow-lg active:scale-[0.98]';
        exportBtn.className = 'px-4 py-2.5 bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 text-white font-medium rounded-lg transition-all duration-200 ease-in-out transform hover:scale-105 active:scale-95 shadow-md hover:shadow-lg whitespace-nowrap';
        langToggle.className = 'flex items-center gap-2 px-4 py-2 bg-gray-800 rounded-full shadow-md hover:shadow-lg transition-all duration-200 border border-gray-700 hover:border-gray-600';
    } else {
        // Default Light Theme - Clean and professional
        body.className = 'bg-gradient-to-br from-gray-50 to-gray-100 min-h-screen py-8 px-4 sm:py-12 transition-all duration-500';
        body.style.backgroundImage = '';

        formCard.className = 'bg-white rounded-xl shadow-lg p-6 sm:p-8 mb-8 border border-gray-100 transition-all duration-300';
        filterSection.className = 'bg-white rounded-xl shadow-lg p-4 sm:p-6 mb-6 border border-gray-100 transition-all duration-300';
        chartsSection.className = 'mt-6 bg-white rounded-xl shadow-lg p-6 sm:p-8 border border-gray-100 transition-all duration-300';
        iconContainer.className = 'inline-block p-3 bg-blue-100 rounded-full mb-4 transition-all duration-300';
        pageTitle.className = 'text-4xl sm:text-5xl font-bold text-gray-800 mb-2 transition-colors duration-300';
        pageSubtitle.className = 'text-gray-600 transition-colors duration-300';
        submitBtn.className = 'flex-1 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-semibold py-3.5 px-6 rounded-lg transition-all duration-200 ease-in-out transform hover:scale-[1.02] hover:shadow-lg active:scale-[0.98]';
        exportBtn.className = 'px-4 py-2.5 bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white font-medium rounded-lg transition-all duration-200 ease-in-out transform hover:scale-105 active:scale-95 shadow-md hover:shadow-lg whitespace-nowrap';
        langToggle.className = 'flex items-center gap-2 px-4 py-2 bg-white rounded-full shadow-md hover:shadow-lg transition-all duration-200 border border-gray-200 hover:border-gray-300';
    }

    // Update charts title color
    const chartsTitle = document.getElementById('charts-title');
    if (darkMode && !isSpanish) {
        chartsTitle.className = 'text-xl font-semibold text-white mb-6 text-center';
    } else {
        chartsTitle.className = 'text-xl font-semibold text-gray-800 mb-6 text-center';
    }
}

// Render charts
function renderCharts() {
    const pieCtx = document.getElementById('category-pie-chart');
    const barCtx = document.getElementById('category-bar-chart');
    const chartsEmpty = document.getElementById('charts-empty');

    // Destroy existing charts
    if (pieChart) {
        pieChart.destroy();
        pieChart = null;
    }
    if (barChart) {
        barChart.destroy();
        barChart = null;
    }

    // If no subscriptions, show empty message
    if (subscriptions.length === 0) {
        pieCtx.style.display = 'none';
        barCtx.style.display = 'none';
        chartsEmpty.classList.remove('hidden');
        return;
    }

    pieCtx.style.display = 'block';
    barCtx.style.display = 'block';
    chartsEmpty.classList.add('hidden');

    // Calculate spending by category
    const categoryTotals = {};
    subscriptions.forEach(sub => {
        const cat = sub.category || 'other';
        const monthlyAmount = getMonthlyEquivalent(sub.cost, sub.billingCycle || 'monthly');
        categoryTotals[cat] = (categoryTotals[cat] || 0) + monthlyAmount;
    });

    // Prepare chart data
    const labels = Object.keys(categoryTotals).map(cat => {
        const catData = categories[cat];
        return catData ? `${catData.emoji} ${catData[currentLanguage]}` : cat;
    });
    const data = Object.values(categoryTotals);
    const colors = Object.keys(categoryTotals).map(cat => categories[cat]?.color || '#6b7280');

    // Chart text color based on theme
    const textColor = darkMode && currentLanguage !== 'es' ? '#fff' : '#374151';
    const gridColor = darkMode && currentLanguage !== 'es' ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.1)';

    // Create pie chart
    pieChart = new Chart(pieCtx, {
        type: 'doughnut',
        data: {
            labels: labels,
            datasets: [{
                data: data,
                backgroundColor: colors,
                borderWidth: 2,
                borderColor: darkMode && currentLanguage !== 'es' ? '#1f2937' : '#fff'
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    position: 'bottom',
                    labels: {
                        color: textColor,
                        padding: 15,
                        usePointStyle: true
                    }
                },
                tooltip: {
                    callbacks: {
                        label: function(context) {
                            const value = context.raw;
                            return ` ${formatCurrency(value)}/${t('monthly').toLowerCase()}`;
                        }
                    }
                }
            }
        }
    });

    // Create bar chart
    barChart = new Chart(barCtx, {
        type: 'bar',
        data: {
            labels: labels,
            datasets: [{
                label: `${t('monthlyTotal')} (${getCurrentCurrency().code})`,
                data: data.map(d => d * getCurrentCurrency().rate),
                backgroundColor: colors,
                borderWidth: 0,
                borderRadius: 8
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
                    callbacks: {
                        label: function(context) {
                            const valueUSD = context.raw / getCurrentCurrency().rate;
                            return ` ${formatCurrency(valueUSD)}`;
                        }
                    }
                }
            },
            scales: {
                y: {
                    beginAtZero: true,
                    grid: {
                        color: gridColor
                    },
                    ticks: {
                        color: textColor,
                        callback: function(value) {
                            const currency = getCurrentCurrency();
                            if (currency.code === 'COP') {
                                return '$' + Math.round(value).toLocaleString('es-CO');
                            }
                            return '$' + value.toFixed(0);
                        }
                    }
                },
                x: {
                    grid: {
                        display: false
                    },
                    ticks: {
                        color: textColor
                    }
                }
            }
        }
    });
}

// Handle search input
function handleSearch() {
    currentSearchTerm = searchInput.value.toLowerCase().trim();
    applyFilters();
}

// Handle category filter
function handleFilter() {
    currentCategoryFilter = filterCategory.value;
    applyFilters();
}

// Apply search and filter
function applyFilters() {
    filteredSubscriptions = subscriptions.filter(sub => {
        // Search filter
        const matchesSearch = currentSearchTerm === '' ||
            sub.name.toLowerCase().includes(currentSearchTerm) ||
            (sub.category && getCategoryName(sub.category).toLowerCase().includes(currentSearchTerm));

        // Category filter
        const matchesCategory = currentCategoryFilter === 'all' ||
            sub.category === currentCategoryFilter;

        return matchesSearch && matchesCategory;
    });

    renderSubscriptions();
    renderTotal();
}

// Export to CSV
function exportToCSV() {
    if (subscriptions.length === 0) {
        alert(t('exportEmpty'));
        return;
    }

    const currency = getCurrentCurrency();

    // CSV headers
    const headers = ['Name', 'Cost (USD)', `Cost (${currency.code})`, 'Billing Cycle', 'Category', 'Monthly (USD)', `Monthly (${currency.code})`, 'Added Date'];

    // CSV rows
    const rows = subscriptions.map(sub => {
        const monthlyEquiv = getMonthlyEquivalent(sub.cost, sub.billingCycle || 'monthly');
        const categoryName = sub.category ? categories[sub.category][currentLanguage] : 'Other';
        const date = new Date(sub.createdAt).toLocaleDateString();

        return [
            `"${sub.name}"`,
            sub.cost.toFixed(2),
            Math.round(sub.cost * currency.rate),
            sub.billingCycle || 'monthly',
            categoryName,
            monthlyEquiv.toFixed(2),
            Math.round(monthlyEquiv * currency.rate),
            date
        ].join(',');
    });

    // Calculate totals
    const monthlyTotal = subscriptions.reduce((sum, sub) => {
        return sum + getMonthlyEquivalent(sub.cost, sub.billingCycle || 'monthly');
    }, 0);

    // Add totals row
    rows.push(''); // Empty row
    rows.push(`"MONTHLY TOTAL",${monthlyTotal.toFixed(2)},${Math.round(monthlyTotal * currency.rate)},,,,`);
    rows.push(`"YEARLY TOTAL",${(monthlyTotal * 12).toFixed(2)},${Math.round(monthlyTotal * 12 * currency.rate)},,,,`);

    // Combine headers and rows
    const csv = [headers.join(','), ...rows].join('\n');

    // Create download link
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    const url = URL.createObjectURL(blob);

    link.setAttribute('href', url);
    link.setAttribute('download', `subscriptions_${new Date().toISOString().split('T')[0]}.csv`);
    link.style.visibility = 'hidden';

    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    console.log('CSV exported successfully');
}

// Handle form submission (add or edit)
function handleFormSubmit(e) {
    e.preventDefault();

    const name = nameInput.value.trim();
    const cost = parseFloat(costInput.value);
    const billingCycle = billingCycleInput.value;
    const category = categoryInput.value;

    // Validation
    if (!name) {
        alert(t('validationName'));
        return;
    }

    if (isNaN(cost) || cost <= 0) {
        alert(t('validationCost'));
        return;
    }

    if (editingId) {
        // Update existing subscription
        updateSubscription(editingId, name, cost, billingCycle, category);
    } else {
        // Add new subscription
        addSubscription(name, cost, billingCycle, category);
    }

    // Clear form and reset edit mode
    clearForm();
}

// Add new subscription
function addSubscription(name, cost, billingCycle = 'monthly', category = 'other') {
    const subscription = {
        id: Date.now(),
        name: name,
        cost: cost,
        billingCycle: billingCycle,
        category: category,
        createdAt: new Date().toISOString()
    };

    subscriptions.push(subscription);

    // Debug logging
    console.log('Added:', subscription);
    console.log('All subscriptions:', subscriptions);

    // Save to localStorage after adding
    saveToLocalStorage();
    applyFilters();
    renderCharts();
}

// Edit subscription - populate form with existing data
function editSubscription(id) {
    const sub = subscriptions.find(s => s.id === id);
    if (!sub) return;

    editingId = id;

    // Populate form
    nameInput.value = sub.name;
    costInput.value = sub.cost;
    billingCycleInput.value = sub.billingCycle || 'monthly';
    categoryInput.value = sub.category || 'other';

    // Show cancel button
    document.getElementById('cancel-btn').classList.remove('hidden');

    // Update form title and button
    document.getElementById('form-title').textContent = t('formTitleEdit');
    const submitBtnText = document.getElementById('submit-btn-text');
    submitBtnText.innerHTML = `
        <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
        </svg>
        ${t('updateButton')}
    `;

    // Scroll to form
    document.getElementById('form-card').scrollIntoView({ behavior: 'smooth' });
    nameInput.focus();

    console.log('Editing subscription:', sub);
}

// Update existing subscription
function updateSubscription(id, name, cost, billingCycle, category) {
    const index = subscriptions.findIndex(s => s.id === id);
    if (index === -1) return;

    subscriptions[index] = {
        ...subscriptions[index],
        name: name,
        cost: cost,
        billingCycle: billingCycle,
        category: category
    };

    console.log('Updated:', subscriptions[index]);

    saveToLocalStorage();
    applyFilters();
    renderCharts();
}

// Cancel edit mode
function cancelEdit() {
    clearForm();
}

// Clear form and reset edit state
function clearForm() {
    editingId = null;
    nameInput.value = '';
    costInput.value = '';
    billingCycleInput.value = 'monthly';
    categoryInput.value = 'entertainment';

    // Hide cancel button
    document.getElementById('cancel-btn').classList.add('hidden');

    // Reset form title and button
    document.getElementById('form-title').textContent = t('formTitle');
    const submitBtnText = document.getElementById('submit-btn-text');
    submitBtnText.innerHTML = `
        <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"></path>
        </svg>
        ${t('addButton')}
    `;

    nameInput.focus();
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
    const key = cycle || 'monthly';
    return t(key);
}

// Get billing cycle badge color (Comuna 13 colors for Spanish)
function getBillingCycleBadge(cycle) {
    if (currentLanguage === 'es') {
        const badges = {
            'monthly': 'bg-gradient-to-r from-pink-400 to-pink-500 text-white',
            'yearly': 'bg-gradient-to-r from-purple-400 to-purple-500 text-white',
            'weekly': 'bg-gradient-to-r from-yellow-400 to-orange-400 text-white'
        };
        return badges[cycle] || badges['monthly'];
    }

    if (darkMode) {
        const badges = {
            'monthly': 'bg-blue-900 text-blue-200',
            'yearly': 'bg-purple-900 text-purple-200',
            'weekly': 'bg-green-900 text-green-200'
        };
        return badges[cycle] || badges['monthly'];
    }

    const badges = {
        'monthly': 'bg-blue-100 text-blue-800',
        'yearly': 'bg-purple-100 text-purple-800',
        'weekly': 'bg-green-100 text-green-800'
    };
    return badges[cycle] || badges['monthly'];
}

// Get category badge color
function getCategoryBadge(category) {
    if (currentLanguage === 'es') {
        const badges = {
            'entertainment': 'bg-gradient-to-r from-red-400 to-pink-400 text-white',
            'software': 'bg-gradient-to-r from-blue-400 to-indigo-400 text-white',
            'utilities': 'bg-gradient-to-r from-yellow-400 to-amber-400 text-white',
            'health': 'bg-gradient-to-r from-green-400 to-emerald-400 text-white',
            'education': 'bg-gradient-to-r from-purple-400 to-violet-400 text-white',
            'news': 'bg-gradient-to-r from-orange-400 to-red-400 text-white',
            'gaming': 'bg-gradient-to-r from-indigo-400 to-purple-400 text-white',
            'other': 'bg-gradient-to-r from-gray-400 to-gray-500 text-white'
        };
        return badges[category] || badges['other'];
    }

    if (darkMode) {
        const badges = {
            'entertainment': 'bg-red-900 text-red-200',
            'software': 'bg-indigo-900 text-indigo-200',
            'utilities': 'bg-yellow-900 text-yellow-200',
            'health': 'bg-emerald-900 text-emerald-200',
            'education': 'bg-violet-900 text-violet-200',
            'news': 'bg-orange-900 text-orange-200',
            'gaming': 'bg-pink-900 text-pink-200',
            'other': 'bg-gray-700 text-gray-200'
        };
        return badges[category] || badges['other'];
    }

    const badges = {
        'entertainment': 'bg-red-100 text-red-800',
        'software': 'bg-indigo-100 text-indigo-800',
        'utilities': 'bg-yellow-100 text-yellow-800',
        'health': 'bg-emerald-100 text-emerald-800',
        'education': 'bg-violet-100 text-violet-800',
        'news': 'bg-orange-100 text-orange-800',
        'gaming': 'bg-pink-100 text-pink-800',
        'other': 'bg-gray-100 text-gray-800'
    };
    return badges[category] || badges['other'];
}

// Delete subscription
function deleteSubscription(id) {
    // Find the subscription we're about to delete (for logging)
    const subToDelete = subscriptions.find(sub => sub.id === id);

    if (confirm(t('confirmDelete'))) {
        // Remove subscription with matching id
        subscriptions = subscriptions.filter(sub => sub.id !== id);

        // Debug logging
        console.log('Deleted:', subToDelete);
        console.log('Remaining subscriptions:', subscriptions);

        // If we were editing this subscription, cancel edit
        if (editingId === id) {
            cancelEdit();
        }

        // Save to localStorage after deleting
        saveToLocalStorage();
        applyFilters();
        renderCharts();
    }
}

// Render subscriptions list
function renderSubscriptions() {
    const isSpanish = currentLanguage === 'es';
    const cardBg = darkMode && !isSpanish ? 'bg-gray-800' : (isSpanish ? 'bg-white/95 backdrop-blur-sm' : 'bg-white');
    const cardBorder = isSpanish ? 'border-pink-200 hover:border-yellow-400' : (darkMode ? 'border-gray-700 hover:border-gray-600' : 'border-gray-100 hover:border-blue-200');
    const priceColor = isSpanish ? 'text-pink-600' : (darkMode ? 'text-blue-400' : 'text-blue-600');
    const textColor = darkMode && !isSpanish ? 'text-white' : 'text-gray-800';
    const subTextColor = darkMode && !isSpanish ? 'text-gray-400' : 'text-gray-500';

    // Show "no subscriptions" if empty
    if (subscriptions.length === 0) {
        subscriptionsList.innerHTML = `
            <div class="${isSpanish ? 'bg-white/95 backdrop-blur-sm border-2 border-yellow-400' : (darkMode ? 'bg-gray-800 border border-gray-700' : 'bg-white border border-gray-100')} rounded-xl shadow-lg p-12 text-center">
                <div class="inline-block p-4 ${isSpanish ? 'bg-gradient-to-r from-yellow-400 to-orange-500' : (darkMode ? 'bg-gray-700' : 'bg-gray-100')} rounded-full mb-4">
                    <svg class="w-12 h-12 ${isSpanish ? 'text-white' : (darkMode ? 'text-gray-400' : 'text-gray-400')}" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4"></path>
                    </svg>
                </div>
                <h3 class="text-xl font-semibold ${textColor} mb-2">${t('noSubscriptions')}</h3>
                <p class="${subTextColor}">${t('noSubscriptionsDesc')}</p>
            </div>
        `;
        return;
    }

    // Show "no results" if filtered list is empty
    if (filteredSubscriptions.length === 0) {
        subscriptionsList.innerHTML = `
            <div class="${isSpanish ? 'bg-white/95 backdrop-blur-sm border-2 border-yellow-400' : (darkMode ? 'bg-gray-800 border border-gray-700' : 'bg-white border border-gray-100')} rounded-xl shadow-lg p-12 text-center">
                <div class="inline-block p-4 ${isSpanish ? 'bg-gradient-to-r from-yellow-400 to-orange-500' : (darkMode ? 'bg-gray-700' : 'bg-gray-100')} rounded-full mb-4">
                    <svg class="w-12 h-12 ${isSpanish ? 'text-white' : (darkMode ? 'text-gray-400' : 'text-gray-400')}" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
                    </svg>
                </div>
                <h3 class="text-xl font-semibold ${textColor} mb-2">${t('noResults')}</h3>
                <p class="${subTextColor}">${t('noResultsDesc')}</p>
            </div>
        `;
        return;
    }

    // Show filter count if filtering
    let filterInfo = '';
    if (filteredSubscriptions.length < subscriptions.length) {
        filterInfo = `
            <div class="text-sm ${subTextColor} mb-4 text-center">
                ${t('showing')} <span class="font-semibold">${filteredSubscriptions.length}</span> ${t('of')} <span class="font-semibold">${subscriptions.length}</span> ${subscriptions.length === 1 ? t('activeSubscription') : t('activeSubscriptions')}
            </div>
        `;
    }

    const html = filteredSubscriptions.map(sub => {
        const billingCycle = sub.billingCycle || 'monthly';
        const category = sub.category || 'other';
        const badgeClass = getBillingCycleBadge(billingCycle);
        const categoryBadgeClass = getCategoryBadge(category);
        const monthlyEquiv = getMonthlyEquivalent(sub.cost, billingCycle);

        return `
        <div class="${cardBg} ${isSpanish ? 'border-2' : 'border'} rounded-xl shadow-md hover:shadow-xl p-5 sm:p-6 mb-4 ${cardBorder} transition-all duration-300 hover:scale-[1.01]">
            <div class="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-3 mb-3">
                <div class="flex-1">
                    <div class="flex items-center gap-2 mb-1">
                        <h3 class="text-lg sm:text-xl font-bold ${textColor} truncate max-w-[200px] sm:max-w-[300px]" title="${escapeHtml(sub.name)}">${escapeHtml(sub.name)}</h3>
                    </div>
                    <p class="text-xs sm:text-sm ${subTextColor}">${t('added')} ${formatDate(sub.createdAt)}</p>
                </div>
                <div class="flex flex-wrap gap-2">
                    <span class="${categoryBadgeClass} px-3 py-1 rounded-full text-xs font-semibold whitespace-nowrap shadow-sm">
                        ${getCategoryName(category)}
                    </span>
                    <span class="${badgeClass} px-3 py-1 rounded-full text-xs font-semibold whitespace-nowrap shadow-sm">
                        ${formatBillingCycle(billingCycle)}
                    </span>
                </div>
            </div>
            <div class="flex flex-col sm:flex-row sm:justify-between sm:items-end gap-4">
                <div class="flex-1">
                    <p class="text-2xl sm:text-3xl font-bold ${priceColor}" style="font-variant-numeric: tabular-nums;">
                        ${formatCurrency(sub.cost)}
                        <span class="text-sm sm:text-base ${subTextColor} font-normal">/${billingCycle}</span>
                    </p>
                    ${billingCycle !== 'monthly' ? `<p class="text-sm ${subTextColor} mt-1" style="font-variant-numeric: tabular-nums;">≈ ${formatCurrency(monthlyEquiv)}/${t('monthly').toLowerCase()}</p>` : ''}
                </div>
                <div class="flex gap-2">
                    <button
                        onclick="editSubscription(${sub.id})"
                        class="${isSpanish ? 'bg-gradient-to-r from-yellow-400 to-orange-500 hover:from-yellow-500 hover:to-orange-600' : 'bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700'} text-white font-medium px-4 py-2.5 rounded-lg transition-all duration-200 ease-in-out transform hover:scale-105 active:scale-95 shadow-md hover:shadow-lg whitespace-nowrap"
                    >
                        <span class="flex items-center justify-center">
                            <svg class="w-4 h-4 mr-1.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"></path>
                            </svg>
                            ${t('editButton')}
                        </span>
                    </button>
                    <button
                        onclick="deleteSubscription(${sub.id})"
                        class="bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white font-medium px-4 py-2.5 rounded-lg transition-all duration-200 ease-in-out transform hover:scale-105 active:scale-95 shadow-md hover:shadow-lg whitespace-nowrap"
                    >
                        <span class="flex items-center justify-center">
                            <svg class="w-4 h-4 mr-1.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path>
                            </svg>
                            ${t('deleteButton')}
                        </span>
                    </button>
                </div>
            </div>
        </div>
        `;
    }).join('');

    subscriptionsList.innerHTML = filterInfo + html;
}

// Render total cost
function renderTotal() {
    const isSpanish = currentLanguage === 'es';

    // Calculate total from filtered subscriptions for display context
    const displaySubs = filteredSubscriptions.length > 0 ? filteredSubscriptions : [];
    const monthlyTotal = displaySubs.reduce((sum, sub) => {
        const billingCycle = sub.billingCycle || 'monthly';
        return sum + getMonthlyEquivalent(sub.cost, billingCycle);
    }, 0);

    const yearlyTotal = monthlyTotal * 12;
    const subscriptionWord = displaySubs.length === 1 ? t('activeSubscription') : t('activeSubscriptions');
    const currency = getCurrentCurrency();

    // Different gradient for Spanish (Comuna 13 vibes) or dark mode
    let gradientClass, borderColor;
    if (isSpanish) {
        gradientClass = 'bg-gradient-to-br from-pink-500 via-purple-600 to-indigo-700';
        borderColor = 'border-yellow-400';
    } else if (darkMode) {
        gradientClass = 'bg-gradient-to-br from-gray-800 via-gray-900 to-black';
        borderColor = 'border-gray-700';
    } else {
        gradientClass = 'bg-gradient-to-br from-blue-600 via-blue-700 to-purple-700';
        borderColor = 'border-blue-500';
    }

    totalDisplay.innerHTML = `
        <div class="${gradientClass} rounded-xl shadow-2xl p-6 sm:p-8 text-white border-2 ${borderColor} relative overflow-hidden">
            <!-- Decorative background pattern -->
            <div class="absolute top-0 right-0 -mt-4 -mr-4 opacity-10">
                <svg class="w-32 h-32" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm.31-8.86c-1.77-.45-2.34-.94-2.34-1.67 0-.84.79-1.43 2.1-1.43 1.38 0 1.9.66 1.94 1.64h1.71c-.05-1.34-.87-2.57-2.49-2.97V5H10.9v1.69c-1.51.32-2.72 1.3-2.72 2.81 0 1.79 1.49 2.69 3.66 3.21 1.95.46 2.34 1.15 2.34 1.87 0 .53-.39 1.39-2.1 1.39-1.6 0-2.23-.72-2.32-1.64H8.04c.1 1.7 1.36 2.66 2.86 2.97V19h2.34v-1.67c1.52-.29 2.72-1.16 2.73-2.77-.01-2.2-1.9-2.96-3.66-3.42z"></path>
                </svg>
            </div>

            ${isSpanish ? `
            <!-- Comuna 13 decorative element -->
            <div class="absolute bottom-0 left-0 opacity-20">
                <svg class="w-24 h-24" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 3v10.55c-.59-.34-1.27-.55-2-.55-2.21 0-4 1.79-4 4s1.79 4 4 4 4-1.79 4-4V7h4V3h-6z"/>
                </svg>
            </div>
            ` : ''}

            <div class="relative">
                <!-- Header with icon and currency -->
                <div class="flex items-center justify-center mb-2">
                    <div class="p-2 bg-white bg-opacity-20 rounded-full mr-3">
                        <svg class="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1.41 16.09V20h-2.67v-1.93c-1.71-.36-3.16-1.46-3.27-3.4h1.96c.1 1.05.82 1.87 2.65 1.87 1.96 0 2.4-.98 2.4-1.59 0-.83-.44-1.61-2.67-2.14-2.48-.6-4.18-1.62-4.18-3.67 0-1.72 1.39-2.84 3.11-3.21V4h2.67v1.95c1.86.45 2.79 1.86 2.85 3.39H14.3c-.05-1.11-.64-1.87-2.22-1.87-1.5 0-2.4.68-2.4 1.64 0 .84.65 1.39 2.67 1.91s4.18 1.39 4.18 3.91c-.01 1.83-1.38 2.83-3.12 3.16z"></path>
                        </svg>
                    </div>
                    <h2 class="text-xl sm:text-2xl font-bold">${t('totalSpending')}</h2>
                </div>
                <p class="text-center text-sm opacity-75 mb-6">${isSpanish ? '🇨🇴' : '🇺🇸'} ${currency.code}</p>

                <!-- Totals Grid -->
                <div class="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-6">
                    <div class="bg-white bg-opacity-10 backdrop-blur-sm rounded-xl p-5 text-center border border-white border-opacity-20">
                        <p class="text-sm uppercase tracking-wide opacity-90 mb-2 font-semibold">${t('monthlyTotal')}</p>
                        <p class="text-3xl sm:text-4xl font-bold mb-1" style="font-variant-numeric: tabular-nums;">${formatCurrency(monthlyTotal)}</p>
                        <p class="text-xs opacity-75">${t('perMonth')}</p>
                    </div>
                    <div class="bg-white bg-opacity-10 backdrop-blur-sm rounded-xl p-5 text-center border border-white border-opacity-20">
                        <p class="text-sm uppercase tracking-wide opacity-90 mb-2 font-semibold">${t('yearlyTotal')}</p>
                        <p class="text-3xl sm:text-4xl font-bold mb-1" style="font-variant-numeric: tabular-nums;">${formatCurrency(yearlyTotal)}</p>
                        <p class="text-xs opacity-75">${t('perYear')}</p>
                    </div>
                </div>

                <!-- Summary -->
                <div class="text-center py-3 bg-white bg-opacity-10 backdrop-blur-sm rounded-lg border border-white border-opacity-20">
                    <p class="text-sm font-medium">
                        <span class="font-bold text-lg">${displaySubs.length}</span>
                        ${subscriptionWord}
                    </p>
                </div>
            </div>
        </div>
    `;
}

// Save to localStorage
function saveToLocalStorage() {
    try {
        // Convert subscriptions array to JSON string and save
        localStorage.setItem('subscriptions', JSON.stringify(subscriptions));
        console.log('Saved to localStorage');
    } catch (error) {
        console.error('Error saving to localStorage:', error);
    }
}

// Load from localStorage
function loadFromLocalStorage() {
    try {
        // Get data from localStorage
        const saved = localStorage.getItem('subscriptions');

        if (saved) {
            // Parse JSON back to array
            subscriptions = JSON.parse(saved);

            // Data migration: Add billingCycle and category to old subscriptions
            let needsSave = false;
            subscriptions = subscriptions.map(sub => {
                let updated = { ...sub };
                if (!sub.billingCycle) {
                    needsSave = true;
                    updated.billingCycle = 'monthly';
                }
                if (!sub.category) {
                    needsSave = true;
                    updated.category = 'other';
                }
                return updated;
            });

            // Save if we migrated data
            if (needsSave) {
                saveToLocalStorage();
            }

            console.log(`Loaded ${subscriptions.length} subscriptions from localStorage`);
        } else {
            // No data exists, start with empty array
            subscriptions = [];
            console.log('Loaded 0 subscriptions from localStorage');
        }
    } catch (error) {
        // If error, set subscriptions to empty array
        console.error('Error loading from localStorage:', error);
        subscriptions = [];
    }
}

// Utility: Escape HTML to prevent XSS
function escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
}

// Utility: Format date with translations
function formatDate(dateString) {
    const date = new Date(dateString);
    const now = new Date();
    const diffTime = Math.abs(now - date);
    const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));

    if (diffDays === 0) return t('today');
    if (diffDays === 1) return t('yesterday');
    if (diffDays < 7) return `${diffDays} ${t('daysAgo')}`;
    if (diffDays < 30) return `${Math.floor(diffDays / 7)} ${t('weeksAgo')}`;
    if (diffDays < 365) return `${Math.floor(diffDays / 30)} ${t('monthsAgo')}`;
    return date.toLocaleDateString();
}

// =============================================
// TAB SYSTEM
// =============================================

function switchTab(tabName) {
    currentTab = tabName;
    localStorage.setItem('currentTab', tabName);

    ['subscriptions', 'budget', 'overview'].forEach(tab => {
        document.getElementById(`tab-content-${tab}`).classList.add('hidden');
        const btn = document.getElementById(`tab-btn-${tab}`);
        if (tab === tabName) {
            btn.className = 'flex-1 py-2.5 px-2 rounded-lg font-semibold text-sm transition-all duration-200 bg-blue-600 text-white shadow-md';
        } else {
            btn.className = 'flex-1 py-2.5 px-2 rounded-lg font-semibold text-sm transition-all duration-200 text-gray-600 hover:bg-gray-100';
        }
    });

    document.getElementById(`tab-content-${tabName}`).classList.remove('hidden');

    if (tabName === 'budget')   { renderBudgetMonthStats(); renderSpendingList(); }
    if (tabName === 'overview') { renderOverview(); }
}

function updateTabLabels() {
    const s = document.getElementById('tab-label-subscriptions');
    const b = document.getElementById('tab-label-budget');
    const o = document.getElementById('tab-label-overview');
    if (s) s.textContent = bt('subscriptionsTab');
    if (b) b.textContent = bt('budgetTab');
    if (o) o.textContent = bt('overviewTab');
}

function updateBudgetLanguage() {
    const el = (id) => document.getElementById(id);
    if (el('income-card-title')) el('income-card-title').textContent = '💵 ' + bt('monthlyIncome');
    if (el('income-card-desc'))  el('income-card-desc').textContent  = bt('incomeDesc');
    if (el('income-save-text'))  el('income-save-text').textContent  = bt('saveIncome');
    if (el('label-expense-name'))     el('label-expense-name').textContent     = bt('expenseName');
    if (el('label-expense-amount'))   el('label-expense-amount').textContent   = bt('expenseAmount');
    if (el('label-expense-category')) el('label-expense-category').textContent = bt('expenseCategory');
    if (el('label-expense-date'))     el('label-expense-date').textContent     = bt('expenseDate');
    if (el('label-expense-note'))     el('label-expense-note').textContent     = bt('expenseNote');
    if (el('overview-chart-title'))   el('overview-chart-title').textContent   = bt('overviewChart');
    // Update income display if visible
    if (monthlyIncome > 0 && el('income-display-text')) {
        el('income-display-text').textContent = bt('incomeConfirm') + formatCurrency(monthlyIncome) + bt('perMonth');
    }
}

// =============================================
// BUDGET — INCOME
// =============================================

function saveIncome() {
    const input = document.getElementById('income-input');
    const value = parseFloat(input.value);
    if (isNaN(value) || value < 0) { alert('Please enter a valid income amount'); return; }

    monthlyIncome = value;
    localStorage.setItem('monthlyIncome', value);

    const display = document.getElementById('income-display');
    const displayText = document.getElementById('income-display-text');
    if (display && displayText) {
        display.classList.remove('hidden');
        displayText.textContent = bt('incomeConfirm') + formatCurrency(value) + bt('perMonth');
    }
    renderBudgetMonthStats();
    console.log('Income saved:', monthlyIncome);
}

// =============================================
// BUDGET — SPENDING ENTRIES (CRUD)
// =============================================

function setupSpendingFormListeners() {
    const form = document.getElementById('spending-form');
    if (form) form.addEventListener('submit', handleSpendingFormSubmit);
    // Default date = today
    const dateInput = document.getElementById('spending-date');
    if (dateInput) dateInput.value = new Date().toISOString().split('T')[0];
}

function handleSpendingFormSubmit(e) {
    e.preventDefault();
    const name     = document.getElementById('spending-name').value.trim();
    const amount   = parseFloat(document.getElementById('spending-amount').value);
    const category = document.getElementById('spending-category').value;
    const date     = document.getElementById('spending-date').value || new Date().toISOString().split('T')[0];
    const note     = document.getElementById('spending-note').value.trim();
    const editId   = document.getElementById('spending-edit-id').value;

    if (!name || isNaN(amount) || amount <= 0) return;

    if (editId) {
        const idx = spendingEntries.findIndex(e => e.id === parseInt(editId));
        if (idx !== -1) spendingEntries[idx] = { ...spendingEntries[idx], name, amount, category, date, note };
        editingSpendingId = null;
    } else {
        spendingEntries.push({ id: Date.now(), name, amount, category, date, note, createdAt: new Date().toISOString() });
    }

    saveBudgetToLocalStorage();
    clearSpendingForm();
    renderBudgetMonthStats();
    renderSpendingList();
}

function editSpendingEntry(id) {
    const entry = spendingEntries.find(e => e.id === id);
    if (!entry) return;
    editingSpendingId = id;
    document.getElementById('spending-edit-id').value    = id;
    document.getElementById('spending-name').value       = entry.name;
    document.getElementById('spending-amount').value     = entry.amount;
    document.getElementById('spending-category').value   = entry.category;
    document.getElementById('spending-date').value       = entry.date;
    document.getElementById('spending-note').value       = entry.note || '';
    document.getElementById('spending-form-title').textContent = '✏️ ' + bt('updateExpenseBtn');
    document.getElementById('spending-submit-text').innerHTML =
        `<svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path></svg>${bt('updateExpenseBtn')}`;
    document.getElementById('spending-cancel-btn').classList.remove('hidden');
    document.getElementById('spending-form-card').scrollIntoView({ behavior: 'smooth' });
}

function deleteSpendingEntry(id) {
    if (!confirm(bt('confirmDelExp'))) return;
    spendingEntries = spendingEntries.filter(e => e.id !== id);
    if (editingSpendingId === id) cancelSpendingEdit();
    saveBudgetToLocalStorage();
    renderBudgetMonthStats();
    renderSpendingList();
}

function cancelSpendingEdit() {
    editingSpendingId = null;
    clearSpendingForm();
}

function clearSpendingForm() {
    document.getElementById('spending-edit-id').value   = '';
    document.getElementById('spending-name').value      = '';
    document.getElementById('spending-amount').value    = '';
    document.getElementById('spending-category').value  = 'food';
    document.getElementById('spending-date').value      = new Date().toISOString().split('T')[0];
    document.getElementById('spending-note').value      = '';
    document.getElementById('spending-form-title').textContent = '➕ ' + bt('addExpenseTitle');
    document.getElementById('spending-submit-text').innerHTML =
        `<svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"></path></svg>${bt('addExpenseBtn')}`;
    document.getElementById('spending-cancel-btn').classList.add('hidden');
}

// =============================================
// BUDGET — LOCALSTORAGE
// =============================================

function saveBudgetToLocalStorage() {
    try { localStorage.setItem('spendingEntries', JSON.stringify(spendingEntries)); }
    catch (err) { console.error('Error saving budget:', err); }
}

function loadBudgetFromLocalStorage() {
    try {
        const savedIncome = localStorage.getItem('monthlyIncome');
        if (savedIncome) {
            monthlyIncome = parseFloat(savedIncome);
            const input = document.getElementById('income-input');
            if (input) input.value = monthlyIncome;
            const display = document.getElementById('income-display');
            const displayText = document.getElementById('income-display-text');
            if (display && displayText) {
                display.classList.remove('hidden');
                displayText.textContent = bt('incomeConfirm') + formatCurrency(monthlyIncome) + bt('perMonth');
            }
        }
        const savedEntries = localStorage.getItem('spendingEntries');
        if (savedEntries) spendingEntries = JSON.parse(savedEntries);

        // Restore last tab
        const savedTab = localStorage.getItem('currentTab');
        if (savedTab && ['subscriptions','budget','overview'].includes(savedTab)) {
            switchTab(savedTab);
        }
    } catch (err) {
        console.error('Error loading budget:', err);
        monthlyIncome = 0; spendingEntries = [];
    }
}

// =============================================
// BUDGET — CALCULATIONS
// =============================================

function getCurrentMonthEntries() {
    const now = new Date();
    return spendingEntries.filter(e => {
        const d = new Date(e.date);
        return d.getFullYear() === now.getFullYear() && d.getMonth() === now.getMonth();
    });
}

function getTotalMonthlySubs() {
    return subscriptions.reduce((sum, sub) => sum + getMonthlyEquivalent(sub.cost, sub.billingCycle || 'monthly'), 0);
}

function calculateCashFlow() {
    const income      = monthlyIncome;
    const subsCost    = getTotalMonthlySubs();
    const otherSpend  = getCurrentMonthEntries().reduce((sum, e) => sum + e.amount, 0);
    const netCashFlow = income - subsCost - otherSpend;
    return { income, subsCost, otherSpend, netCashFlow };
}

// =============================================
// BUDGET TAB — RENDER
// =============================================

function renderBudgetMonthStats() {
    const container = document.getElementById('budget-month-stats');
    if (!container) return;

    const monthEntries  = getCurrentMonthEntries();
    const otherSpend    = monthEntries.reduce((sum, e) => sum + e.amount, 0);
    const subsCost      = getTotalMonthlySubs();
    const totalOut      = otherSpend + subsCost;
    const remaining     = monthlyIncome > 0 ? monthlyIncome - totalOut : null;
    const isSpanish     = currentLanguage === 'es';
    const cardBg        = darkMode && !isSpanish ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-100';
    const textColor     = darkMode && !isSpanish ? 'text-white' : 'text-gray-800';
    const subText       = darkMode && !isSpanish ? 'text-gray-400' : 'text-gray-500';

    let cashFlowBadge = '';
    if (monthlyIncome > 0 && remaining !== null) {
        const isPos = remaining >= 0;
        cashFlowBadge = `
            <div class="${isPos ? 'bg-green-50 border-green-200' : 'bg-red-50 border-red-200'} rounded-lg p-3 border text-center mt-4">
                <p class="${isPos ? 'text-green-600' : 'text-red-600'} font-bold text-xl" style="font-variant-numeric:tabular-nums;">
                    ${remaining >= 0 ? '+' : ''}${formatCurrency(remaining)} ${bt('remaining')}
                </p>
                <p class="text-xs text-gray-500 mt-1">${isPos ? bt('cashFlowGood') : bt('cashFlowBad')}</p>
            </div>`;
    }

    container.innerHTML = `
        <div class="${cardBg} rounded-xl shadow-lg p-5 border transition-all duration-300">
            <h3 class="${textColor} font-semibold text-lg mb-4">📅 ${bt('thisMonth')}</h3>
            <div class="grid grid-cols-3 gap-4 text-center">
                <div>
                    <p class="text-xs font-semibold ${subText} uppercase tracking-wide mb-1">${bt('subsCosts')}</p>
                    <p class="text-xl font-bold text-purple-500" style="font-variant-numeric:tabular-nums;">${formatCurrency(subsCost)}</p>
                </div>
                <div>
                    <p class="text-xs font-semibold ${subText} uppercase tracking-wide mb-1">${bt('otherSpending')}</p>
                    <p class="text-xl font-bold text-orange-500" style="font-variant-numeric:tabular-nums;">${formatCurrency(otherSpend)}</p>
                </div>
                <div>
                    <p class="text-xs font-semibold ${subText} uppercase tracking-wide mb-1">${bt('spent')}</p>
                    <p class="text-xl font-bold ${totalOut > monthlyIncome && monthlyIncome > 0 ? 'text-red-500' : textColor}" style="font-variant-numeric:tabular-nums;">${formatCurrency(totalOut)}</p>
                </div>
            </div>
            ${cashFlowBadge}
        </div>`;
}

function renderSpendingList() {
    const container = document.getElementById('spending-list');
    if (!container) return;

    const isSpanish = currentLanguage === 'es';
    const cardBg    = darkMode && !isSpanish ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-100';
    const textColor = darkMode && !isSpanish ? 'text-white' : 'text-gray-800';
    const subText   = darkMode && !isSpanish ? 'text-gray-400' : 'text-gray-500';

    if (spendingEntries.length === 0) {
        container.innerHTML = `
            <div class="${cardBg} rounded-xl shadow-lg p-12 text-center border">
                <div class="text-5xl mb-4">💸</div>
                <h3 class="text-xl font-semibold ${textColor} mb-2">${bt('noExpenses')}</h3>
                <p class="${subText}">${bt('noExpensesDesc')}</p>
            </div>`;
        return;
    }

    const sorted = [...spendingEntries].sort((a, b) => new Date(b.date) - new Date(a.date));
    const html = sorted.map(entry => {
        const cat = spendingCategories[entry.category] || spendingCategories.other;
        const catName = `${cat.emoji} ${cat[currentLanguage]}`;
        const dateStr = new Date(entry.date + 'T12:00:00').toLocaleDateString(
            currentLanguage === 'es' ? 'es-CO' : 'en-US', { month: 'short', day: 'numeric', year: 'numeric' }
        );
        return `
        <div class="${cardBg} rounded-xl shadow-md hover:shadow-xl p-5 mb-4 border transition-all duration-300 hover:scale-[1.01]">
            <div class="flex justify-between items-start gap-3">
                <div class="flex-1 min-w-0">
                    <div class="flex items-center gap-2 mb-1 flex-wrap">
                        <span class="text-xl">${cat.emoji}</span>
                        <h3 class="text-lg font-bold ${textColor} truncate">${escapeHtml(entry.name)}</h3>
                    </div>
                    <div class="flex items-center gap-2 flex-wrap">
                        <span class="px-2 py-0.5 rounded-full text-xs font-semibold text-white" style="background:${cat.color}">${catName}</span>
                        <span class="text-xs ${subText}">${dateStr}</span>
                        ${entry.note ? `<span class="text-xs ${subText} italic">"${escapeHtml(entry.note)}"</span>` : ''}
                    </div>
                </div>
                <div class="text-right flex-shrink-0">
                    <p class="text-2xl font-bold text-orange-500" style="font-variant-numeric:tabular-nums;">${formatCurrency(entry.amount)}</p>
                    <div class="flex gap-2 mt-2 justify-end">
                        <button onclick="editSpendingEntry(${entry.id})"
                            class="bg-blue-500 hover:bg-blue-600 text-white text-xs font-medium px-3 py-1.5 rounded-lg transition-all transform hover:scale-105">
                            ✏️ ${bt('editBtn')}
                        </button>
                        <button onclick="deleteSpendingEntry(${entry.id})"
                            class="bg-red-500 hover:bg-red-600 text-white text-xs font-medium px-3 py-1.5 rounded-lg transition-all transform hover:scale-105">
                            🗑️ ${bt('deleteBtn')}
                        </button>
                    </div>
                </div>
            </div>
        </div>`;
    }).join('');

    container.innerHTML = html;
}

// =============================================
// OVERVIEW TAB — RENDER
// =============================================

function renderOverview() {
    renderCashflowHero();
    renderOverviewBreakdown();
    renderOverviewCharts();
}

function renderCashflowHero() {
    const container = document.getElementById('cashflow-hero');
    if (!container) return;

    const { income, subsCost, otherSpend, netCashFlow } = calculateCashFlow();
    const hasIncome  = income > 0;
    const isPositive = netCashFlow >= 0;
    const totalSpent = subsCost + otherSpend;
    const pct        = hasIncome ? Math.min(100, Math.round((totalSpent / income) * 100)) : 0;

    let grad, statusMsg, statusIcon;
    if (!hasIncome)       { grad = 'from-gray-600 to-gray-800';       statusMsg = bt('cashFlowNeutral'); statusIcon = '💡'; }
    else if (isPositive)  { grad = 'from-green-500 to-emerald-700';   statusMsg = bt('cashFlowGood');    statusIcon = '💚'; }
    else                  { grad = 'from-red-500 to-rose-700';        statusMsg = bt('cashFlowBad');     statusIcon = '🔴'; }

    container.innerHTML = `
        <div class="bg-gradient-to-br ${grad} rounded-xl shadow-2xl p-6 sm:p-8 text-white relative overflow-hidden">
            <div class="absolute top-0 right-0 opacity-10 -mt-6 -mr-6">
                <svg class="w-40 h-40" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1.41 16.09V20h-2.67v-1.93c-1.71-.36-3.16-1.46-3.27-3.4h1.96c.1 1.05.82 1.87 2.65 1.87 1.96 0 2.4-.98 2.4-1.59 0-.83-.44-1.61-2.67-2.14-2.48-.6-4.18-1.62-4.18-3.67 0-1.72 1.39-2.84 3.11-3.21V4h2.67v1.95c1.86.45 2.79 1.86 2.85 3.39H14.3c-.05-1.11-.64-1.87-2.22-1.87-1.5 0-2.4.68-2.4 1.64 0 .84.65 1.39 2.67 1.91s4.18 1.39 4.18 3.91c-.01 1.83-1.38 2.83-3.12 3.16z"/>
                </svg>
            </div>
            <div class="relative">
                <h2 class="text-xl font-bold mb-1">${bt('cashFlowTitle')}</h2>
                <p class="text-sm opacity-75 mb-4">${statusIcon} ${statusMsg}</p>
                <p class="text-5xl sm:text-6xl font-bold mb-2" style="font-variant-numeric:tabular-nums;">
                    ${hasIncome ? (netCashFlow >= 0 ? '+' : '') + formatCurrency(netCashFlow) : '—'}
                </p>
                <p class="text-sm opacity-75 mb-6">${bt('perMonth')}</p>
                ${hasIncome ? `
                    <div class="bg-white bg-opacity-20 rounded-full h-3 mb-2 overflow-hidden">
                        <div class="${isPositive ? 'bg-white' : 'bg-red-300'} h-3 rounded-full transition-all duration-700" style="width:${pct}%"></div>
                    </div>
                    <p class="text-xs opacity-75">${pct}% ${bt('spentOf')} ${formatCurrency(income)} (${formatCurrency(totalSpent)} ${bt('spent').toLowerCase()})</p>
                ` : `<p class="text-sm opacity-75">${bt('setIncomeFirst')}</p>`}
            </div>
        </div>`;
}

function renderOverviewBreakdown() {
    const container = document.getElementById('overview-breakdown');
    if (!container) return;

    const { income, subsCost, otherSpend, netCashFlow } = calculateCashFlow();
    const isSpanish = currentLanguage === 'es';
    const cardBg    = darkMode && !isSpanish ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-100';
    const textColor = darkMode && !isSpanish ? 'text-white' : 'text-gray-800';
    const subText   = darkMode && !isSpanish ? 'text-gray-400' : 'text-gray-500';

    const cards = [
        { label: bt('totalIncome'),   value: income,                icon: '💵', color: 'text-green-500',                          always: true },
        { label: bt('subsCosts'),     value: subsCost,              icon: '📋', color: 'text-purple-500',                         always: true },
        { label: bt('otherSpending'), value: otherSpend,            icon: '💸', color: 'text-orange-500',                        always: true },
        { label: bt('netCashFlow'),   value: Math.abs(netCashFlow), icon: netCashFlow >= 0 ? '📈' : '📉',
          color: netCashFlow >= 0 ? 'text-green-500' : 'text-red-500', always: income > 0 },
    ];

    container.innerHTML = `
        <div class="grid grid-cols-2 sm:grid-cols-4 gap-4">
            ${cards.filter(c => c.always).map(c => `
            <div class="${cardBg} rounded-xl shadow-md p-4 text-center border transition-all duration-300">
                <p class="text-2xl mb-2">${c.icon}</p>
                <p class="text-xs font-semibold ${subText} uppercase tracking-wide mb-1">${c.label}</p>
                <p class="text-xl font-bold ${c.color}" style="font-variant-numeric:tabular-nums;">
                    ${c.label === bt('netCashFlow') && netCashFlow > 0 ? '+' : ''}${formatCurrency(c.value)}
                </p>
            </div>`).join('')}
        </div>`;
}

function renderOverviewCharts() {
    if (overviewPieChart) { overviewPieChart.destroy(); overviewPieChart = null; }
    if (overviewBarChart) { overviewBarChart.destroy(); overviewBarChart = null; }

    const pieCtx   = document.getElementById('overview-spending-pie');
    const barCtx   = document.getElementById('overview-spending-bar');
    const emptyMsg = document.getElementById('overview-chart-empty');
    if (!pieCtx || !barCtx) return;

    // Combine subscriptions (monthly equiv) + this month spending entries by category
    const spending = {};

    subscriptions.forEach(sub => {
        const key = 'sub_' + (sub.category || 'other');
        spending[key] = (spending[key] || 0) + getMonthlyEquivalent(sub.cost, sub.billingCycle || 'monthly');
    });
    getCurrentMonthEntries().forEach(e => {
        const key = 'exp_' + (e.category || 'other');
        spending[key] = (spending[key] || 0) + e.amount;
    });

    if (Object.keys(spending).length === 0) {
        pieCtx.style.display = 'none'; barCtx.style.display = 'none';
        emptyMsg.classList.remove('hidden'); return;
    }

    pieCtx.style.display = 'block'; barCtx.style.display = 'block';
    emptyMsg.classList.add('hidden');

    const labels = [], data = [], colors = [];
    Object.entries(spending).forEach(([key, val]) => {
        const [type, catKey] = key.split('_');
        const cat = type === 'sub' ? categories[catKey] : spendingCategories[catKey];
        const safecat = cat || spendingCategories.other;
        const suffix = type === 'sub' ? ' (sub)' : '';
        labels.push(`${safecat.emoji} ${safecat[currentLanguage]}${suffix}`);
        colors.push(safecat.color || '#6b7280');
        data.push(val);
    });

    const textColor = (darkMode && currentLanguage !== 'es') ? '#fff' : '#374151';
    const gridColor = (darkMode && currentLanguage !== 'es') ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.1)';
    const rate = getCurrentCurrency().rate;

    overviewPieChart = new Chart(pieCtx, {
        type: 'doughnut',
        data: { labels, datasets: [{ data, backgroundColor: colors, borderWidth: 2, borderColor: darkMode ? '#1f2937' : '#fff' }] },
        options: {
            responsive: true, maintainAspectRatio: false,
            plugins: {
                legend: { position: 'bottom', labels: { color: textColor, padding: 12, usePointStyle: true } },
                tooltip: { callbacks: { label: ctx => ` ${formatCurrency(ctx.raw)}` } }
            }
        }
    });

    overviewBarChart = new Chart(barCtx, {
        type: 'bar',
        data: { labels, datasets: [{ label: 'Spending', data: data.map(d => d * rate), backgroundColor: colors, borderWidth: 0, borderRadius: 6 }] },
        options: {
            responsive: true, maintainAspectRatio: false,
            plugins: { legend: { display: false } },
            scales: {
                y: { beginAtZero: true, grid: { color: gridColor }, ticks: { color: textColor, callback: v => '$' + v.toFixed(0) } },
                x: { grid: { display: false }, ticks: { color: textColor } }
            }
        }
    });
}

// Initialize when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
} else {
    init();
}
