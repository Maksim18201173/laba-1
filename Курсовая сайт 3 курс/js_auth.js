// Инициализация администратора по умолчанию
document.addEventListener('DOMContentLoaded', function() {
    // Проверяем, есть ли уже пользователи в LocalStorage
    if (!localStorage.getItem('users')) {
        const defaultAdmin = {
            id: 1,
            name: 'Максим',
            email: 'dorofeewo18@gmail.com',
            phone: '79636901826',
            password: 'dorofeewo18201173', // В реальном приложении пароль должен быть хеширован!
            isAdmin: true
        };
        
        localStorage.setItem('users', JSON.stringify([defaultAdmin]));
    }
    
    // Проверяем, авторизован ли пользователь
    checkAuth();
    
    // Обработка формы регистрации
    if (document.getElementById('registerForm')) {
        document.getElementById('registerForm').addEventListener('submit', function(e) {
            e.preventDefault();
            
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
            
            // Проверяем, есть ли уже пользователь с таким email
            if (users.some(u => u.email === email)) {
                alert('Пользователь с таким email уже существует!');
                return;
            }
            
            const newUser = {
                id: Date.now(),
                name,
                email,
                phone,
                password, // В реальном приложении пароль должен быть хеширован!
                isAdmin: false
            };
            
            users.push(newUser);
            localStorage.setItem('users', JSON.stringify(users));
            
            alert('Регистрация прошла успешно! Теперь вы можете войти.');
            window.location.href = 'login.html';
        });
    }
    
    // Обработка формы входа
    if (document.getElementById('loginForm')) {
        document.getElementById('loginForm').addEventListener('submit', function(e) {
            e.preventDefault();
            
            const email = document.getElementById('login-email').value;
            const password = document.getElementById('login-password').value;
            
            const users = JSON.parse(localStorage.getItem('users')) || [];
            const user = users.find(u => u.email === email && u.password === password);
            
            if (user) {
                // Сохраняем информацию о текущем пользователе
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
        });
    }
    
    // Выход из системы
    if (document.getElementById('logout')) {
        document.getElementById('logout').addEventListener('click', function(e) {
            e.preventDefault();
            localStorage.removeItem('currentUser');
            window.location.href = '../index.html';
        });
    }
});

// Проверка авторизации
function checkAuth() {
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));
    const authLink = document.getElementById('auth-link');
    const regLink = document.getElementById('reg-link');
    const adminLink = document.getElementById('admin-link');
    
    if (currentUser) {
        if (authLink) authLink.textContent = currentUser.name;
        if (regLink) regLink.style.display = 'none';
        
        if (currentUser.isAdmin && adminLink) {
            adminLink.style.display = 'inline-block';
        }
    }
    
    // Защита админских страниц
    if (window.location.pathname.includes('/admin/')) {
        if (!currentUser || !currentUser.isAdmin) {
            alert('Доступ запрещен! Требуются права администратора.');
            window.location.href = '../index.html';
        }
    }
}