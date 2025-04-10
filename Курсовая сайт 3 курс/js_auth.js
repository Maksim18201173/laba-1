// Инициализация администратора по умолчанию
document.addEventListener('DOMContentLoaded', function() {
    // Проверяем, есть ли уже пользователи в LocalStorage
    if (!localStorage.getItem('users')) {
        const defaultAdmin = {
            id: 1,
            name: 'Максим',
            email: 'dorofeewo18@gmail.com',
            phone: '79636901826',
            password: 'dorofeewo18201173',
            isAdmin: true
        };
        localStorage.setItem('users', JSON.stringify([defaultAdmin]));
    }
    
    // Проверяем авторизацию
    checkAuth();
    
    // Обработка форм регистрации и входа
    initAuthForms();
    
    // Инициализация кнопки выхода
    initLogoutButton();
    
    // Инициализация модального окна выхода
    initLogoutModal();
});

// Инициализация кнопки выхода
function initLogoutButton() {
    const logoutBtn = document.getElementById('logout');
    if (logoutBtn) {
        logoutBtn.addEventListener('click', function(e) {
            e.preventDefault();
            const confirmLogout = confirm('Вы уверены, что хотите выйти из аккаунта?');
            if (confirmLogout) {
                localStorage.removeItem('currentUser');
                // Перенаправляем на главную страницу (index.html)
                // Если мы в админ-панели, используем ../index.html
                // Если на обычном сайте, просто index.html
                const isAdminPage = window.location.pathname.includes('/admin/');
                window.location.href = isAdminPage ? '../index.html' : 'index.html';
            }
        });
    }
}

// Инициализация модального окна выхода
function initLogoutModal() {
    // Подтверждение выхода
    const confirmLogout = document.getElementById('confirmLogout');
    if (confirmLogout) {
        confirmLogout.addEventListener('click', function() {
            localStorage.removeItem('currentUser');
            // Аналогично для модального окна
            const isAdminPage = window.location.pathname.includes('/admin/');
            window.location.href = isAdminPage ? '../index.html' : 'index.html';
        });
    }

    // Отмена выхода
    const cancelLogout = document.getElementById('cancelLogout');
    if (cancelLogout) {
        cancelLogout.addEventListener('click', hideLogoutModal);
    }
}

// Показать модальное окно выхода
function showLogoutModal() {
    const confirmModal = document.getElementById('confirmModal');
    if (confirmModal) {
        confirmModal.style.display = 'flex';
        document.body.style.overflow = 'hidden';
    }
}

// Скрыть модальное окно выхода
function hideLogoutModal() {
    const confirmModal = document.getElementById('confirmModal');
    if (confirmModal) {
        confirmModal.style.display = 'none';
        document.body.style.overflow = '';
    }
}

// Проверка авторизации
function checkAuth() {
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));
    updateAuthUI(currentUser);
    protectAdminPages(currentUser);
}

// Обновление интерфейса в зависимости от авторизации
function updateAuthUI(currentUser) {
    const authLink = document.getElementById('auth-link');
    const regLink = document.getElementById('reg-link');
    const adminLink = document.getElementById('admin-link');
    const logoutBtn = document.getElementById('logout');
    
    if (currentUser) {
        if (authLink) authLink.textContent = currentUser.name;
        if (regLink) regLink.style.display = 'none';
        if (currentUser.isAdmin && adminLink) {
            adminLink.style.display = 'inline-block';
        }
        if (logoutBtn) logoutBtn.style.display = 'inline-block';
    } else {
        if (logoutBtn) logoutBtn.style.display = 'none';
    }
}

// Защита админских страниц
function protectAdminPages(currentUser) {
    if (window.location.pathname.includes('/admin/')) {
        if (!currentUser || !currentUser.isAdmin) {
            alert('Доступ запрещен! Требуются права администратора.');
            window.location.href = '../index.html';
        }
    }
}

// Инициализация форм авторизации
function initAuthForms() {
    // Форма регистрации
    if (document.getElementById('registerForm')) {
        document.getElementById('registerForm').addEventListener('submit', function(e) {
            e.preventDefault();
            handleRegistration();
        });
    }
    
    // Форма входа
    if (document.getElementById('loginForm')) {
        document.getElementById('loginForm').addEventListener('submit', function(e) {
            e.preventDefault();
            handleLogin();
        });
    }
}

// Обработка регистрации
function handleRegistration() {
    const name = document.getElementById('reg-name').value;
    const email = document.getElementById('reg-email').value;
    const phone = document.getElementById('reg-phone').value;
    const password = document.getElementById('reg-password').value;
    const confirmPassword = document.getElementById('reg-confirm').value;
    
    if (password !== confirmPassword) {
        alert('Пароли не совпадают!');
        return;
    }
    
    const users = JSON.parse(localStorage.getItem('users')) || [];
    
    if (users.some(u => u.email === email)) {
        alert('Пользователь с таким email уже существует!');
        return;
    }
    
    const newUser = {
        id: Date.now(),
        name,
        email,
        phone,
        password,
        isAdmin: false
    };
    
    users.push(newUser);
    localStorage.setItem('users', JSON.stringify(users));
    alert('Регистрация прошла успешно! Теперь вы можете войти.');
    window.location.href = 'login.html';
}

// Обработка входа
function handleLogin() {
    const email = document.getElementById('login-email').value;
    const password = document.getElementById('login-password').value;
    
    const users = JSON.parse(localStorage.getItem('users')) || [];
    const user = users.find(u => u.email === email && u.password === password);
    
    if (user) {
        localStorage.setItem('currentUser', JSON.stringify({
            id: user.id,
            name: user.name,
            email: user.email,
            isAdmin: user.isAdmin
        }));
        alert('Вход выполнен успешно!');
        window.location.href = 'index.html';
    } else {
        alert('Неверный email или пароль!');
    }
}