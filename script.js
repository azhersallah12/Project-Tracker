import { initializeApp } from "https://www.gstatic.com/firebasejs/9.23.0/firebase-app.js";
import { getDatabase, ref, onValue, set, push, remove, off } from "https://www.gstatic.com/firebasejs/9.23.0/firebase-database.js";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, onAuthStateChanged, sendPasswordResetEmail, updateProfile } from "https://www.gstatic.com/firebasejs/9.23.0/firebase-auth.js";

const firebaseConfig = {
    apiKey: "AIzaSyD5OsLRbBc8l5PXWw9vozwdye96FarFDIE",
    authDomain: "project-tracker-22bc4.firebaseapp.com",
    databaseURL: "https://project-tracker-22bc4-default-rtdb.firebaseio.com",
    projectId: "project-tracker-22bc4",
    storageBucket: "project-tracker-22bc4.appspot.com",
    messagingSenderId: "147357551717",
    appId: "1:147357551717:web:472f8dca4d1ab67085ca8c",
    measurementId: "G-5TKFL1SY7D"
};
const app = initializeApp(firebaseConfig);
const db = getDatabase(app);
const auth = getAuth(app);

const translations = {
    en: { dashboard_title: "Dashboard", charts_title: "Charts", profile_title: "Profile", settings_title: "Settings", search_placeholder: "Search projects...", cat_all: "All Categories", sort_by: "Sort by:", sort_date: "Date Added", sort_name: "Name", sort_amount: "Amount", sort_due_date: "Due Date", empty_state_title: "No projects found.", empty_state_subtitle: "Add your first project to get started!", total_earnings_label: "Total Earnings", earnings_chart_title: "Earnings by Month", modal_new_project: "New Project", modal_edit_project: "Edit Project", modal_project_title: "Project Title", modal_amount: "Amount ($)", modal_due_date: "Due Date", status_in_progress: "In Progress", status_completed: "Completed", status_on_hold: "On Hold", add_project_button: "Add Project", save_changes_button: "Save Changes", delete_modal_title: "Delete Project?", cancel_button: "Cancel", delete_button: "Delete", card_due_label: "Due:", card_no_date: "No date", no_file_chosen: "No file chosen", choose_file_button: "Choose File", nav_explore: "Explore", nav_charts: "Charts", nav_settings: "Settings", nav_profile: "Profile", profile_total_projects: "Total Projects", profile_completed: "Completed", profile_avg_value: "Avg. Project Value", login_title: "Login", auth_email: "Email", auth_password: "Password", login_button: "Login", no_account: "Don't have an account?", register_link: "Register", register_title: "Create Account", register_button: "Register", has_account: "Already have an account?", login_link: "Login", sign_out_button: "Sign Out", profile_member_since: "Member since", forgot_password_link: "Forgot Password?", forgot_password_title: "Reset Password", forgot_password_instructions: "Enter your email to receive a password reset link.", reset_button: "Send Reset Link", back_to_login: "Back to Login", auth_full_name: "Full Name", auth_confirm_password: "Confirm Password", settings_theme_title: "Theme", settings_dark_mode: "Dark Mode", settings_categories_title: "Manage Categories", settings_add_category_placeholder: "New category name...", add_button: "Add", toast_login_success: "Welcome back!", toast_register_success: "Account created successfully!", toast_project_added: "Project added!", toast_project_updated: "Project updated!", toast_project_deleted: "Project deleted!", toast_category_added: "Category added!", toast_category_deleted: "Category deleted!", toast_reset_sent: "Password reset email sent!", toast_error: "An error occurred." },
    ar: { dashboard_title: "لوحة التحكم", charts_title: "الرسوم البيانية", profile_title: "الملف الشخصي", settings_title: "الإعدادات", search_placeholder: "ابحث عن المشاريع...", cat_all: "كل الفئات", sort_by: "فرز حسب:", sort_date: "تاريخ الإضافة", sort_name: "الاسم", sort_amount: "المبلغ", sort_due_date: "تاريخ الاستحقاق", empty_state_title: "لم يتم العثور على مشاريع.", empty_state_subtitle: "أضف مشروعك الأول للبدء!", total_earnings_label: "إجمالي الأرباح", earnings_chart_title: "الأرباح حسب الشهر", modal_new_project: "مشروع جديد", modal_edit_project: "تعديل المشروع", modal_project_title: "عنوان المشروع", modal_amount: "المبلغ ($)", modal_due_date: "تاريخ الاستحقاق", status_in_progress: "قيد التنفيذ", status_completed: "مكتمل", status_on_hold: "معلق", add_project_button: "إضافة مشروع", save_changes_button: "حفظ التغييرات", delete_modal_title: "هل تريد حذف المشروع؟", cancel_button: "إلغاء", delete_button: "حذف", card_due_label: "مستحق:", card_no_date: "لا يوجد تاريخ", no_file_chosen: "لم يتم اختيار ملف", choose_file_button: "اختر ملف", nav_explore: "استكشاف", nav_charts: "الرسوم", nav_settings: "الإعدادات", nav_profile: "الملف الشخصي", profile_total_projects: "إجمالي المشاريع", profile_completed: "مكتمل", profile_avg_value: "متوسط قيمة المشروع", login_title: "تسجيل الدخول", auth_email: "البريد الإلكتروني", auth_password: "كلمة المرور", login_button: "تسجيل الدخول", no_account: "ليس لديك حساب؟", register_link: "إنشاء حساب", register_title: "إنشاء حساب", register_button: "إنشاء حساب", has_account: "لديك حساب بالفعل؟", login_link: "تسجيل الدخول", sign_out_button: "تسجيل الخروج", profile_member_since: "عضو منذ", forgot_password_link: "نسيت كلمة المرور؟", forgot_password_title: "إعادة تعيين كلمة المرور", forgot_password_instructions: "أدخل بريدك الإلكتروني لتلقي رابط إعادة تعيين كلمة المرور.", reset_button: "إرسال الرابط", back_to_login: "العودة لتسجيل الدخول", auth_full_name: "الاسم الكامل", auth_confirm_password: "تأكيد كلمة المرور", settings_theme_title: "المظهر", settings_dark_mode: "الوضع الداكن", settings_categories_title: "إدارة الفئات", settings_add_category_placeholder: "اسم فئة جديد...", add_button: "إضافة", toast_login_success: "مرحبا بعودتك!", toast_register_success: "تم إنشاء الحساب بنجاح!", toast_project_added: "تمت إضافة المشروع!", toast_project_updated: "تم تحديث المشروع!", toast_project_deleted: "تم حذف المشروع!", toast_category_added: "تمت إضافة الفئة!", toast_category_deleted: "تم حذف الفئة!", toast_reset_sent: "تم إرسال بريد إعادة تعيين كلمة المرور!", toast_error: "حدث خطأ ما." },
    ku: { dashboard_title: "داشبۆرد", charts_title: "چارتەکان", profile_title: "پڕۆفایل", settings_title: "ڕێکخستنەکان", search_placeholder: "گەڕان بۆ پڕۆژە...", cat_all: "هەمووی", sort_by: "ڕیزکردن بەپێی:", sort_date: "بەرواری زیادکردن", sort_name: "ناو", sort_amount: "بڕ", sort_due_date: "بەرواری کۆتایی", empty_state_title: "هیچ پڕۆژەیەک نەدۆزرایەوە.", empty_state_subtitle: "یەکەم پڕۆژەی خۆت زیاد بکە بۆ دەستپێکردن!", total_earnings_label: "کۆی گشتی داهات", earnings_chart_title: "داهاتی مانگانە", modal_new_project: "پڕۆژەی نوێ", modal_edit_project: "دەستکاریکردنی پڕۆژە", modal_project_title: "ناونیشانی پڕۆژە", modal_amount: "بڕی پارە ($)", modal_due_date: "بەرواری کۆتایی", status_in_progress: "لە جێبەجێکردندایە", status_completed: "تەواوبووە", status_on_hold: "ڕاگیراوە", add_project_button: "زیادکردنی پڕۆژە", save_changes_button: "پاشەکەوتکردن", delete_modal_title: "دڵنیایت لە سڕینەوە؟", cancel_button: "پاشگەزبوونەوە", delete_button: "سڕینەوە", card_due_label: "کاتی کۆتایی:", card_no_date: "بێ بەروار", no_file_chosen: "هیچ فایلێک هەڵنەبژێردراوە", choose_file_button: "فایل هەڵبژێرە", nav_explore: "گەڕان", nav_charts: "چارتەکان", nav_settings: "ڕێکخستنەکان", nav_profile: "پڕۆفایل", profile_total_projects: "کۆی پڕۆژەکان", profile_completed: "تەواوبوو", profile_avg_value: "تێکڕای بەهای پڕۆژە", login_title: "چوونەژوورەوە", auth_email: "ئیمەیڵ", auth_password: "وشەی نهێنی", login_button: "چوونەژوورەوە", no_account: "هەژمارت نییە؟", register_link: "هەژمار دروست بکە", register_title: "هەژمار دروست بکە", register_button: "هەژمار دروست بکە", has_account: "پێشتر هەژمارت هەیە؟", login_link: "چوونەژوورەوە", sign_out_button: "چوونەدەرەوە", profile_member_since: "ئەندامە لە", forgot_password_link: "وشەی نهێنیت لەبیرچووە؟", forgot_password_title: "دانانەوەی وشەی نهێنی", forgot_password_instructions: "ئیمەیڵەکەت بنووسە بۆ وەرگرتنی لینکی دانانەوەی وشەی نهێنی.", reset_button: "ناردنی لینک", back_to_login: "گەڕانەوە بۆ چوونەژوورەوە", auth_full_name: "ناوی تەواو", auth_confirm_password: "دووبارە نووسینەوەی وشەی نهێنی", settings_theme_title: "شێواز", settings_dark_mode: "شێوازی تاریک", settings_categories_title: "بەڕێوەبردنی بەشەکان", settings_add_category_placeholder: "ناوی بەشی نوێ...", add_button: "زیادکردن", toast_login_success: "بەخێربێیتەوە!", toast_register_success: "هەژمارەکەت بە سەرکەوتوویی دروستکرا!", toast_project_added: "پڕۆژەکە زیادکرا!", toast_project_updated: "پڕۆژەکە نوێکرایەوە!", toast_project_deleted: "پڕۆژەکە سڕایەوە!", toast_category_added: "بەشەکە زیادکرا!", toast_category_deleted: "بەشەکە سڕایەوە!", toast_reset_sent: "لینکی دانانەوەی وشەی نهێنی بۆ ئیمەیڵەکەت نێردرا!", toast_error: "هەڵەیەک ڕوویدا." }
};

let chartInstance, currentLanguage = 'en', allProjects = [], userCategories = [];
let projectsDbRef, categoriesDbRef;
let state = { searchTerm: '', sortBy: 'createdAt', sortDirection: 'desc', filterByCategory: 'all', activeTab: 'explore', currentUserId: null };

const dom = {
    html: document.documentElement,
    loadingScreen: document.getElementById('loading-screen'),
    authContainer: document.getElementById('auth-container'),
    authCard: document.getElementById('auth-card'),
    appContainer: document.getElementById('app-container'),
    signOutBtn: document.getElementById('sign-out-btn'),
    languageSwitcher: document.getElementById('language-switcher'),
    headerTitle: document.getElementById('header-title'),
    projectList: document.getElementById('project-list'),
    totalEarningsEl: document.getElementById('total-earnings'),
    emptyState: document.getElementById('empty-state'),
    addProjectBtnNav: document.getElementById('add-project-btn-nav'),
    projectModal: document.getElementById('project-modal'),
    deleteModal: document.getElementById('delete-modal'),
    closeModalBtn: document.getElementById('close-modal-btn'),
    cancelDeleteBtn: document.getElementById('cancel-delete-btn'),
    confirmDeleteBtn: document.getElementById('confirm-delete-btn'),
    projectForm: document.getElementById('project-form'),
    searchInput: document.getElementById('search-input'),
    categoryFilter: document.getElementById('category-filter'),
    modalTitle: document.getElementById('modal-title'),
    formSubmitBtn: document.getElementById('form-submit-btn'),
    projectIdInput: document.getElementById('project-id'),
    projectImageInput: document.getElementById('project-image'),
    fileNameDisplay: document.getElementById('file-name-display'),
    dueDateInput: document.getElementById('project-due-date'),
    projectCategorySelect: document.getElementById('project-category'),
    imageViewerModal: document.getElementById('image-viewer-modal'),
    closeViewerBtn: document.getElementById('close-viewer-btn'),
    fullscreenImage: document.getElementById('fullscreen-image'),
    navItems: document.querySelectorAll('.nav-item'),
    tabViews: document.querySelectorAll('.tab-view'),
    profileName: document.getElementById('profile-name'),
    profileEmail: document.getElementById('profile-email'),
    profileAvatar: document.getElementById('profile-avatar'),
    profileTotalProjects: document.getElementById('profile-total-projects'),
    profileCompletedProjects: document.getElementById('profile-completed-projects'),
    profileAvgValue: document.getElementById('profile-avg-value'),
    themeToggle: document.getElementById('theme-toggle'),
    categoryForm: document.getElementById('category-form'),
    categoryInput: document.getElementById('category-input'),
    categoryList: document.getElementById('category-list'),
    toastContainer: document.getElementById('toast-container'),
};

// --- Utility & UI Functions ---
const showToast = (key, type = 'info') => {
    const t = translations[currentLanguage];
    const message = t[key] || t['toast_error'];
    const toast = document.createElement('div');
    toast.className = `toast ${type}`;
    toast.textContent = message;
    dom.toastContainer.appendChild(toast);
    setTimeout(() => toast.classList.add('show'), 10);
    setTimeout(() => {
        toast.classList.remove('show');
        toast.addEventListener('transitionend', () => toast.remove());
    }, 3000);
};

const setLanguage = (lang) => {
    currentLanguage = lang;
    const t = translations[lang];
    document.querySelectorAll('[data-key]').forEach(el => el.textContent = t[el.dataset.key]);
    document.querySelectorAll('[data-key-placeholder]').forEach(el => el.placeholder = t[el.dataset.keyPlaceholder]);
    dom.html.setAttribute('dir', (lang === 'ar' || lang === 'ku') ? 'rtl' : 'ltr');
    localStorage.setItem('projectTrackerLang', lang);
    dom.languageSwitcher.value = lang;
    if(state.currentUserId) renderAll();
};

const applyTheme = (theme) => {
    localStorage.setItem('theme', theme);
    dom.themeToggle.checked = theme === 'dark';
    if (theme === 'dark') {
        dom.html.classList.add('dark');
    } else {
        dom.html.classList.remove('dark');
    }
};

// --- Auth UI & Logic ---
const renderAuthForm = (formType) => {
    const t = translations[currentLanguage];
    let formHtml;
    if (formType === 'login') {
        formHtml = `
            <form id="login-form">
                <h2 class="text-3xl font-bold text-primary text-center mb-6" data-key="login_title">${t.login_title}</h2>
                <div id="auth-error" class="text-red-400 text-sm mb-4 text-center hidden"></div>
                <div class="space-y-4">
                    <input type="email" id="auth-email" class="w-full bg-primary rounded-lg px-4 py-3 text-primary" data-key-placeholder="auth_email" placeholder="${t.auth_email}" required>
                    <input type="password" id="auth-password" class="w-full bg-primary rounded-lg px-4 py-3 text-primary" data-key-placeholder="auth_password" placeholder="${t.auth_password}" required>
                </div>
                <div class="text-right mt-2"><a href="#" data-action="show-forgot" class="text-sm font-semibold text-blue-400 hover:underline" data-key="forgot_password_link">${t.forgot_password_link}</a></div>
                <button type="submit" class="w-full mt-6 bg-blue-600 hover:bg-blue-500 text-white font-bold py-3 rounded-lg" data-key="login_button">${t.login_button}</button>
                <p class="text-center text-sm text-secondary mt-6">
                    <span data-key="no_account">${t.no_account}</span>
                    <a href="#" data-action="show-register" class="font-semibold text-blue-400 hover:underline" data-key="register_link">${t.register_link}</a>
                </p>
            </form>`;
    } else if (formType === 'register') {
        formHtml = `
            <form id="register-form">
                <h2 class="text-3xl font-bold text-primary text-center mb-6" data-key="register_title">${t.register_title}</h2>
                <div id="auth-error" class="text-red-400 text-sm mb-4 text-center hidden"></div>
                <div class="space-y-4">
                    <input type="text" id="auth-name" class="w-full bg-primary rounded-lg px-4 py-3 text-primary" data-key-placeholder="auth_full_name" placeholder="${t.auth_full_name}" required>
                    <input type="email" id="auth-email" class="w-full bg-primary rounded-lg px-4 py-3 text-primary" data-key-placeholder="auth_email" placeholder="${t.auth_email}" required>
                    <input type="password" id="auth-password" class="w-full bg-primary rounded-lg px-4 py-3 text-primary" data-key-placeholder="auth_password" placeholder="${t.auth_password}" required>
                    <input type="password" id="auth-confirm-password" class="w-full bg-primary rounded-lg px-4 py-3 text-primary" data-key-placeholder="auth_confirm_password" placeholder="${t.auth_confirm_password}" required>
                </div>
                <button type="submit" class="w-full mt-8 bg-green-600 hover:bg-green-500 text-white font-bold py-3 rounded-lg" data-key="register_button">${t.register_button}</button>
                <p class="text-center text-sm text-secondary mt-6">
                    <span data-key="has_account">${t.has_account}</span>
                    <a href="#" data-action="show-login" class="font-semibold text-blue-400 hover:underline" data-key="login_link">${t.login_link}</a>
                </p>
            </form>`;
    } else { // forgot password
        formHtml = `
              <form id="forgot-form">
                <h2 class="text-3xl font-bold text-primary text-center mb-6" data-key="forgot_password_title">${t.forgot_password_title}</h2>
                <p class="text-center text-sm text-secondary mb-4" data-key="forgot_password_instructions">${t.forgot_password_instructions}</p>
                <div id="auth-error" class="text-red-400 text-sm mb-4 text-center hidden"></div>
                <div class="space-y-4">
                    <input type="email" id="auth-email" class="w-full bg-primary rounded-lg px-4 py-3 text-primary" data-key-placeholder="auth_email" placeholder="${t.auth_email}" required>
                </div>
                <button type="submit" class="w-full mt-8 bg-blue-600 hover:bg-blue-500 text-white font-bold py-3 rounded-lg" data-key="reset_button">${t.reset_button}</button>
                <p class="text-center text-sm text-secondary mt-6">
                    <a href="#" data-action="show-login" class="font-semibold text-blue-400 hover:underline" data-key="back_to_login">${t.back_to_login}</a>
                </p>
            </form>`;
    }
    dom.authCard.innerHTML = formHtml;
};

const handleAuthFormSubmit = async (e) => {
    e.preventDefault();
    const formId = e.target.id;
    const email = e.target.querySelector('#auth-email').value;
    const password = e.target.querySelector('#auth-password')?.value;
    const errorEl = e.target.querySelector('#auth-error');
    errorEl.classList.add('hidden');

    try {
        if (formId === 'login-form') {
            await signInWithEmailAndPassword(auth, email, password);
            showToast('toast_login_success', 'success');
        } else if (formId === 'register-form') {
            const name = e.target.querySelector('#auth-name').value;
            const confirmPassword = e.target.querySelector('#auth-confirm-password').value;
            if(password !== confirmPassword) throw new Error("Passwords do not match.");
            if(!name) throw new Error("Full name is required.");
            const userCredential = await createUserWithEmailAndPassword(auth, email, password);
            await updateProfile(userCredential.user, { displayName: name });
            showToast('toast_register_success', 'success');
        } else if (formId === 'forgot-form') {
            await sendPasswordResetEmail(auth, email);
            showToast('toast_reset_sent', 'info');
            renderAuthForm('login');
        }
    } catch (error) {
        errorEl.textContent = error.message;
        errorEl.classList.remove('hidden');
        showToast(null, 'error');
    }
};

// --- Data & App Logic ---
const switchTab = (tabName) => {
    state.activeTab = tabName;
    dom.tabViews.forEach(view => view.classList.add('hidden'));
    document.getElementById(`${tabName}-view`).classList.remove('hidden');
    dom.navItems.forEach(item => item.classList.toggle('active', item.dataset.tab === tabName));
    const t = translations[currentLanguage];
    const titleKey = tabName === 'explore' ? 'dashboard_title' : `${tabName}_title`;
    dom.headerTitle.textContent = t[titleKey] || t['dashboard_title'];
    if(tabName === 'charts') renderEarningsChart(allProjects);
    if(tabName === 'profile') renderProfileStats();
};

const renderAll = () => {
    renderProjects();
    renderCategories();
    const totalEarnings = allProjects.reduce((sum, p) => sum + parseFloat(p.amount || 0), 0);
    dom.totalEarningsEl.textContent = formatCurrency(totalEarnings);
    switchTab(state.activeTab);
};

const renderProjects = () => {
    let filtered = allProjects
        .filter(p => p.title.toLowerCase().includes(state.searchTerm.toLowerCase()) && (state.filterByCategory === 'all' || p.category === state.filterByCategory))
        .sort((a, b) => {
            let valA = a[state.sortBy], valB = b[state.sortBy];
            if (state.sortBy === 'title') { valA = valA.toLowerCase(); valB = valB.toLowerCase(); }
            let comp = valA > valB ? 1 : (valA < valB ? -1 : 0);
            return state.sortDirection === 'desc' ? comp * -1 : comp;
        });
    
    dom.projectList.innerHTML = '';
    filtered.forEach(p => dom.projectList.appendChild(createProjectCard(p)));
    dom.emptyState.classList.toggle('hidden', filtered.length > 0);
};

const createProjectCard = (p) => {
    const card = document.createElement('div');
    card.className = 'bg-secondary rounded-2xl shadow-lg overflow-hidden flex flex-col animate-fade-in';
    const t = translations[currentLanguage];
    const placeholderImg = `https://placehold.co/400x300/1a1c1e/475569?text=${encodeURIComponent(p.title)}`;
    const statusColors = { "In Progress": "bg-yellow-500", "Completed": "bg-green-500", "On Hold": "bg-gray-500" };
    const dueDateText = p.dueDate 
        ? `${t.card_due_label} ${new Date(p.dueDate + 'T00:00:00').toLocaleDateString(currentLanguage === 'en' ? 'en-US' : 'ar-EG', { year: 'numeric', month: 'short', day: 'numeric' })}`
        : t.card_no_date;

    card.innerHTML = `
        <img src="${p.imageBase64 || placeholderImg}" class="h-40 w-full object-cover cursor-pointer" data-action="view-image" onerror="this.src='${placeholderImg}'">
        <div class="p-4 flex-grow flex flex-col">
            <div class="flex justify-between items-start mb-2">
                <span class="text-xs font-medium bg-blue-900/50 text-blue-300 py-1 px-2 rounded-full">${p.category || 'N/A'}</span>
                <div class="flex items-center gap-2 text-xs text-secondary">
                    <div class="w-2 h-2 rounded-full ${statusColors[p.status]}"></div>
                    <span>${t[`status_${p.status.toLowerCase().replace(' ','_')}`]}</span>
                </div>
            </div>
            <h3 class="font-bold text-primary text-lg flex-grow">${p.title}</h3>
            <p class="text-sm text-secondary mt-1">${dueDateText}</p>
            <div class="mt-4 flex justify-between items-center">
                <p class="font-bold text-xl text-green-400">${formatCurrency(p.amount)}</p>
                <div class="flex items-center gap-1">
                    <button data-action="edit" data-id="${p.id}" class="text-secondary p-2 rounded-full hover:bg-primary"><svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M17 3a2.828 2.828 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5L17 3z"></path></svg></button>
                    <button data-action="delete" data-id="${p.id}" class="text-secondary p-2 rounded-full hover:bg-primary"><svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="3 6 5 6 21 6"></polyline><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path></svg></button>
                </div>
            </div>
        </div>`;
    return card;
};

const renderEarningsChart = (projects) => {
    const ctx = document.getElementById('earnings-chart').getContext('2d');
    const monthlyData = projects.reduce((acc, p) => {
        if (!p.createdAt) return acc;
        const month = new Date(p.createdAt).toLocaleString('default', { month: 'short', year: '2-digit' });
        acc[month] = (acc[month] || 0) + parseFloat(p.amount || 0);
        return acc;
    }, {});
    if (chartInstance) chartInstance.destroy();
    const isDark = dom.html.classList.contains('dark');
    chartInstance = new Chart(ctx, { type: 'bar', data: { labels: Object.keys(monthlyData), datasets: [{ data: Object.values(monthlyData), backgroundColor: isDark ? '#a8c7fa' : '#3b82f6', borderRadius: 4 }] }, options: { responsive: true, maintainAspectRatio: false, animation: false, scales: { y: { beginAtZero: true, ticks: { color: isDark ? '#94a3b8' : '#64748b' }, grid: { color: isDark ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.1)' } }, x: { ticks: { color: isDark ? '#94a3b8' : '#64748b' }, grid: { display: false } } }, plugins: { legend: { display: false } } } });
};

const renderProfileStats = () => {
    const user = auth.currentUser;
    if(!user) return;
    dom.profileName.textContent = user.displayName || 'User';
    dom.profileEmail.textContent = user.email;
    dom.profileAvatar.src = user.photoURL || `https://placehold.co/128x128/${dom.html.classList.contains('dark') ? '1a1c1e/a8c7fa' : 'e0e7ff/4338ca'}?text=${(user.displayName || 'U').charAt(0).toUpperCase()}`;
    const totalProjects = allProjects.length;
    const completedProjects = allProjects.filter(p => p.status === 'Completed').length;
    const totalValue = allProjects.reduce((sum, p) => sum + parseFloat(p.amount || 0), 0);
    const avgValue = totalProjects > 0 ? totalValue / totalProjects : 0;
    dom.profileTotalProjects.textContent = totalProjects;
    dom.profileCompletedProjects.textContent = completedProjects;
    dom.profileAvgValue.textContent = formatCurrency(avgValue);
};

const renderCategories = () => {
    const t = translations[currentLanguage];
    // Render list in settings
    dom.categoryList.innerHTML = '';
    userCategories.forEach(cat => {
        const li = document.createElement('li');
        li.className = 'flex justify-between items-center bg-secondary p-2 rounded';
        li.innerHTML = `<span>${cat.name}</span><button data-id="${cat.id}" class="text-red-500 p-1">&times;</button>`;
        dom.categoryList.appendChild(li);
    });
    // Populate dropdowns
    const optionsHtml = `<option value="all" data-key="cat_all">${t.cat_all}</option>` + userCategories.map(c => `<option value="${c.name}">${c.name}</option>`).join('');
    dom.categoryFilter.innerHTML = optionsHtml;
    dom.projectCategorySelect.innerHTML = userCategories.map(c => `<option value="${c.name}">${c.name}</option>`).join('');
};

const handleFormSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const id = dom.projectIdInput.value;
    const file = dom.projectImageInput.files[0];
    let imageBase64 = id ? (allProjects.find(p => p.id === id)?.imageBase64 || null) : null;

    if (file) {
        try {
            imageBase64 = await new Promise((resolve, reject) => {
                const reader = new FileReader();
                reader.readAsDataURL(file);
                reader.onload = () => resolve(reader.result);
                reader.onerror = error => reject(error);
            });
        } catch (error) { console.error("Error converting file:", error); setLoading(false); return; }
    }

    const projectData = {
        title: dom.projectForm['project-title'].value.trim(),
        amount: parseFloat(dom.projectForm['project-amount'].value) || 0,
        dueDate: dom.projectForm['project-due-date'].value,
        status: dom.projectForm['project-status'].value,
        category: dom.projectForm['project-category'].value,
        imageBase64: imageBase64,
        createdAt: id ? allProjects.find(p => p.id === id).createdAt : new Date().toISOString()
    };
    
    const projectRef = id ? ref(db, `projects/${state.currentUserId}/${id}`) : push(ref(db, `projects/${state.currentUserId}`));
    await set(projectRef, projectData);
    
    toggleModal('project', false);
    setLoading(false);
    showToast(id ? 'toast_project_updated' : 'toast_project_added', 'success');
};

const openAddModal = () => {
    dom.projectForm.reset();
    const t = translations[currentLanguage];
    dom.modalTitle.textContent = t.modal_new_project;
    dom.formSubmitBtn.innerHTML = t.add_project_button;
    dom.projectIdInput.value = '';
    dom.fileNameDisplay.textContent = t.no_file_chosen;
    dom.dueDateInput.classList.add('text-secondary');
    toggleModal('project', true);
};

const openEditModal = (id) => {
    const project = allProjects.find(p => p.id === id);
    if(project) {
        const t = translations[currentLanguage];
        dom.modalTitle.textContent = t.modal_edit_project;
        dom.formSubmitBtn.innerHTML = t.save_changes_button;
        dom.projectIdInput.value = id;
        dom.projectForm['project-title'].value = project.title || '';
        dom.projectForm['project-amount'].value = project.amount || 0;
        dom.projectForm['project-due-date'].value = project.dueDate || '';
        dom.projectForm['project-status'].value = project.status || 'In Progress';
        dom.projectForm['project-category'].value = project.category || '';
        dom.fileNameDisplay.textContent = project.imageBase64 ? "Image already uploaded" : t.no_file_chosen;
        dom.dueDateInput.classList.toggle('text-secondary', !project.dueDate);
        toggleModal('project', true);
    }
};

const handleDeleteProject = async (e) => {
    const id = e.target.dataset.id;
    await remove(ref(db, `projects/${state.currentUserId}/${id}`));
    toggleModal('delete', false);
    showToast('toast_project_deleted', 'success');
}

const setLoading = (isLoading) => {
    const t = translations[currentLanguage];
    const buttonText = dom.projectIdInput.value ? t.save_changes_button : t.add_project_button;
    dom.formSubmitBtn.disabled = isLoading;
    dom.formSubmitBtn.innerHTML = isLoading ? `<div class="spinner mx-auto"></div>` : buttonText;
};

const toggleModal = (name, show) => document.getElementById(`${name}-modal`).classList.toggle('hidden', !show);
const formatCurrency = (amount) => new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(amount);

// --- Event Listeners ---
dom.languageSwitcher.addEventListener('change', (e) => setLanguage(e.target.value));
dom.addProjectBtnNav.addEventListener('click', openAddModal);
dom.closeModalBtn.addEventListener('click', () => toggleModal('project', false));
dom.projectImageInput.addEventListener('change', () => { dom.fileNameDisplay.textContent = dom.projectImageInput.files[0]?.name || translations[currentLanguage].no_file_chosen; });
dom.projectForm.addEventListener('submit', handleFormSubmit);
dom.dueDateInput.addEventListener('change', (e) => e.target.classList.toggle('text-secondary', !e.target.value));

dom.projectList.addEventListener('click', (e) => {
    const button = e.target.closest('button[data-action]');
    if (button) {
        const { action, id } = button.dataset;
        if (action === 'edit') openEditModal(id);
        if (action === 'delete') { dom.confirmDeleteBtn.dataset.id = id; toggleModal('delete', true); }
        return;
    }
    const image = e.target.closest('img[data-action="view-image"]');
    if (image) { dom.fullscreenImage.src = image.src; dom.imageViewerModal.classList.remove('hidden'); }
});

dom.confirmDeleteBtn.addEventListener('click', handleDeleteProject);
dom.cancelDeleteBtn.addEventListener('click', () => toggleModal('delete', false));
dom.searchInput.addEventListener('input', (e) => { state.searchTerm = e.target.value; renderProjects(); });
dom.categoryFilter.addEventListener('change', (e) => { state.filterByCategory = e.target.value; renderProjects(); });
document.querySelectorAll('.filter-chip').forEach(chip => {
    chip.addEventListener('click', (e) => {
        document.querySelectorAll('.filter-chip').forEach(c => c.classList.remove('active'));
        const chipButton = e.currentTarget;
        chipButton.classList.add('active');
        state.sortBy = chipButton.dataset.sort;
        renderProjects();
    });
});

const closeImageViewer = () => { dom.imageViewerModal.classList.add('hidden'); dom.fullscreenImage.src = ''; };
dom.closeViewerBtn.addEventListener('click', closeImageViewer);
dom.imageViewerModal.addEventListener('click', (e) => { if (e.target.id === 'image-viewer-modal') closeImageViewer(); });

dom.navItems.forEach(item => item.addEventListener('click', (e) => { e.preventDefault(); switchTab(item.dataset.tab); }));

dom.authCard.addEventListener('click', (e) => {
    const action = e.target.dataset.action;
    if (action) { e.preventDefault(); renderAuthForm(action.split('-')[1]); }
});
dom.authCard.addEventListener('submit', handleAuthFormSubmit);

dom.signOutBtn.addEventListener('click', () => signOut(auth));
dom.themeToggle.addEventListener('change', (e) => applyTheme(e.target.checked ? 'dark' : 'light'));

dom.categoryForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const categoryName = dom.categoryInput.value.trim();
    if (categoryName) {
        await push(ref(db, `categories/${state.currentUserId}`), { name: categoryName });
        dom.categoryInput.value = '';
        showToast('toast_category_added', 'success');
    }
});

dom.categoryList.addEventListener('click', async (e) => {
    if (e.target.tagName === 'BUTTON') {
        const id = e.target.dataset.id;
        await remove(ref(db, `categories/${state.currentUserId}/${id}`));
        showToast('toast_category_deleted', 'success');
    }
});

// --- Initial Load & Auth State Change ---
const savedLang = localStorage.getItem('projectTrackerLang') || 'en';
setLanguage(savedLang);
const savedTheme = localStorage.getItem('theme') || 'dark';
applyTheme(savedTheme);

onAuthStateChanged(auth, user => {
    if (user) {
        state.currentUserId = user.uid;
        dom.authContainer.classList.add('hidden');
        dom.appContainer.classList.remove('hidden');
        dom.appContainer.classList.add('flex');
        
        if (projectsDbRef) off(projectsDbRef);
        if (categoriesDbRef) off(categoriesDbRef);

        projectsDbRef = ref(db, `projects/${user.uid}`);
        onValue(projectsDbRef, (snapshot) => {
            const data = snapshot.val() || {};
            allProjects = Object.keys(data).map(key => ({ id: key, ...data[key] }));
            renderAll();
        });
        
        categoriesDbRef = ref(db, `categories/${user.uid}`);
        onValue(categoriesDbRef, (snapshot) => {
            const data = snapshot.val() || {};
            userCategories = Object.keys(data).map(key => ({ id: key, ...data[key] }));
            renderCategories();
        });

    } else {
        state.currentUserId = null;
        allProjects = [];
        userCategories = [];
        if (projectsDbRef) off(projectsDbRef);
        if (categoriesDbRef) off(categoriesDbRef);
        
        dom.appContainer.classList.add('hidden');
        dom.authContainer.classList.remove('hidden');
        dom.authContainer.classList.add('flex');
        renderAuthForm('login');
    }
    dom.loadingScreen.classList.add('hidden');
});
