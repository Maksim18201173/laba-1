// Данные приложения
let currentUser = null;
const adminCredentials = {
    email: "dorofeewo18@gmail.com",
    password: "dorofeewo18201173"
};

// Инициализация данных
if (!localStorage.getItem('users')) {
    localStorage.setItem('users', JSON.stringify([]));
}

if (!localStorage.getItem('products')) {
    const initialProducts = [
        {
            id: 1,
            name: "Яблоки",
            description: "Свежие яблоки сорта Голден",
            price: 89.99,
            image: "https://via.placeholder.com/300x200?text=Яблоки"
        },
        {
            id: 2,
            name: "Бананы",
            description: "Спелые бананы из Эквадора",
            price: 129.99,
            image: "https://via.placeholder.com/300x200?text=Бананы"
        },
        {
            id: 3,
            name: "Молоко",
            description: "Молоко 3.2% жирности, 1 литр",
            price: 75.50,
            image: "https://via.placeholder.com/300x200?text=Молоко"
        },
        {
            id: 4,
            name: "Хлеб",
            description: "Белый хлеб нарезной",
            price: 45.00,
            image: "https://via.placeholder.com/300x200?text=Хлеб"
        },
        {
            id: 5,
            name: "Яйца",
            description: "Яйца куриные, 10 штук",
            price: 95.00,
            image: "https://via.placeholder.com/300x200?text=Яйца"
        },
        {
            id: 6,
            name: "Картофель",
            description: "Картофель молодой, 1 кг",
            price: 39.99,
            image: "https://via.placeholder.com/300x200?text=Картофель"
        }
    ];
    localStorage.setItem('products', JSON.stringify(initialProducts));
}

if (!localStorage.getItem('orders')) {
    localStorage.setItem('orders', JSON.stringify([]));
}

// Функции для работы с данными
function getUsers() {
    return JSON.parse(localStorage.getItem('users'));
}

function getProducts() {
    return JSON.parse(localStorage.getItem('products'));
}

function getOrders() {
    return JSON.parse(localStorage.getItem('orders'));
}

function saveUsers(users) {
    localStorage.setItem('users', JSON.stringify(users));
}

function saveProducts(products) {
    localStorage.setItem('products', JSON.stringify(products));
}

function saveOrders(orders) {
    localStorage.setItem('orders', JSON.stringify(orders));
}

// Функции для работы с пользователем
function loginUser(email, password) {
    const users = getUsers();
    
    // Проверка админских учетных данных
    if (email === adminCredentials.email && password === adminCredentials.password) {
        currentUser = {
            name: "Администратор",
            email: adminCredentials.email,
            isAdmin: true
        };
        localStorage.setItem('currentUser', JSON.stringify(currentUser));
        return true;
    }
    
    const user = users.find(u => u.email === email && u.password === password);
    if (user) {
        currentUser = user;
        localStorage.setItem('currentUser', JSON.stringify(currentUser));
        return true;
    }
    return false;
}

function logoutUser() {
    currentUser = null;
    localStorage.removeItem('currentUser');
}

function registerUser(userData) {
    const users = getUsers();
    
    // Проверка, что пользователь с таким email уже не существует
    if (users.some(u => u.email === userData.email)) {
        return false;
    }
    
    // Генерируем ID для нового пользователя
    const newId = users.length > 0 ? Math.max(...users.map(u => u.id)) + 1 : 1;
    
    const newUser = {
        id: newId,
        ...userData
    };
    
    users.push(newUser);
    saveUsers(users);
    
    // Автоматически входим после регистрации
    currentUser = newUser;
    localStorage.setItem('currentUser', JSON.stringify(currentUser));
    return true;
}

// Функции для работы с DOM
function loadPage(page) {
    window.location.href = `${page}.html`;
}

function updateNavMenu() {
    const navMenu = document.getElementById('nav-menu');
    if (!navMenu) return;
    
    navMenu.innerHTML = '';
    const ul = document.createElement('ul');
    
    // Всегда показываем эти пункты
    const pages = [
        { id: 'index', name: 'Главная' },
        { id: 'about', name: 'О нас' },
        { id: 'products', name: 'Продукты' }
    ];
    
    // Добавляем основные страницы
    pages.forEach(page => {
        const li = document.createElement('li');
        const a = document.createElement('a');
        a.href = '#';
        a.textContent = page.name;
        a.onclick = () => loadPage(page.id);
        li.appendChild(a);
        ul.appendChild(li);
    });
    
    // Проверяем, авторизован ли пользователь
    const user = JSON.parse(localStorage.getItem('currentUser'));
    
    if (user) {
        // Если пользователь администратор, добавляем ссылку на админ панель
        if (user.isAdmin) {
            const li = document.createElement('li');
            const a = document.createElement('a');
            a.href = '#';
            a.textContent = 'Админ';
            a.onclick = () => loadPage('admin');
            li.appendChild(a);
            ul.appendChild(li);
        }
        
        // Добавляем корзину и выход
        const cartLi = document.createElement('li');
        const cartA = document.createElement('a');
        cartA.href = '#';
        cartA.textContent = 'Корзина';
        cartA.onclick = () => loadPage('cart');
        cartLi.appendChild(cartA);
        ul.appendChild(cartLi);
        
        const logoutLi = document.createElement('li');
        const logoutA = document.createElement('a');
        logoutA.href = '#';
        logoutA.textContent = 'Выход';
        logoutA.onclick = logout;
        logoutLi.appendChild(logoutA);
        ul.appendChild(logoutLi);
    } else {
        // Если пользователь не авторизован, показываем вход и регистрацию
        const loginLi = document.createElement('li');
        const loginA = document.createElement('a');
        loginA.href = '#';
        loginA.textContent = 'Вход';
        loginA.onclick = () => loadPage('login');
        loginLi.appendChild(loginA);
        ul.appendChild(loginLi);
        
        const registerLi = document.createElement('li');
        const registerA = document.createElement('a');
        registerA.href = '#';
        registerA.textContent = 'Регистрация';
        registerA.onclick = () => loadPage('register');
        registerLi.appendChild(registerA);
        ul.appendChild(registerLi);
    }
    
    navMenu.appendChild(ul);
}

function logout() {
    logoutUser();
    updateNavMenu();
    loadPage('index');
}

// Функции для страницы продуктов
function loadProducts() {
    const productsContainer = document.getElementById('products-list');
    if (!productsContainer) return;
    
    const products = getProducts();
    productsContainer.innerHTML = '';
    
    products.forEach(product => {
        const productCard = document.createElement('div');
        productCard.className = 'product-card';
        
        productCard.innerHTML = `
            <div class="product-image" style="background-image: url('${product.image}')"></div>
            <div class="product-info">
                <h3>${product.name}</h3>
                <p>${product.description}</p>
                <span class="product-price">${product.price.toFixed(2)} руб.</span>
                <button class="add-to-cart" onclick="addToCart(${product.id})">В корзину</button>
            </div>
        `;
        
        productsContainer.appendChild(productCard);
    });
    
    // Проверяем, является ли пользователь администратором
    const user = JSON.parse(localStorage.getItem('currentUser'));
    const adminControls = document.getElementById('admin-controls');
    
    if (adminControls) {
        if (user && user.isAdmin) {
            adminControls.style.display = 'block';
        } else {
            adminControls.style.display = 'none';
        }
    }
}

function showAddProductForm() {
    const modal = document.getElementById('add-product-form');
    if (modal) modal.style.display = 'block';
}

function hideAddProductForm() {
    const modal = document.getElementById('add-product-form');
    if (modal) modal.style.display = 'none';
}

function addNewProduct(event) {
    event.preventDefault();
    
    const name = document.getElementById('product-name').value;
    const description = document.getElementById('product-description').value;
    const price = parseFloat(document.getElementById('product-price').value);
    const image = document.getElementById('product-image').value || 'https://via.placeholder.com/300x200?text=No+Image';
    
    const products = getProducts();
    const newId = products.length > 0 ? Math.max(...products.map(p => p.id)) + 1 : 1;
    
    const newProduct = {
        id: newId,
        name,
        description,
        price,
        image
    };
    
    products.push(newProduct);
    saveProducts(products);
    
    hideAddProductForm();
    loadProducts();
    document.getElementById('new-product-form').reset();
}

// Функции для работы с корзиной
function getCart() {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    return cart;
}

function saveCart(cart) {
    localStorage.setItem('cart', JSON.stringify(cart));
}

function addToCart(productId) {
    const products = getProducts();
    const product = products.find(p => p.id === productId);
    
    if (!product) return;
    
    const cart = getCart();
    const existingItem = cart.find(item => item.productId === productId);
    
    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        cart.push({
            productId,
            quantity: 1,
            name: product.name,
            price: product.price,
            image: product.image
        });
    }
    
    saveCart(cart);
    updateCartCount();
    alert(`${product.name} добавлен в корзину!`);
}

function updateCartCount() {
    const cart = getCart();
    const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
    
    const cartCountElements = document.querySelectorAll('.cart-count');
    cartCountElements.forEach(el => {
        el.textContent = totalItems > 0 ? `(${totalItems})` : '';
    });
}

function loadCart() {
    const cartContainer = document.getElementById('cart-items');
    if (!cartContainer) return;
    
    const cart = getCart();
    cartContainer.innerHTML = '';
    
    if (cart.length === 0) {
        cartContainer.innerHTML = '<p>Ваша корзина пуста</p>';
        document.getElementById('total-price').textContent = '0';
        return;
    }
    
    let total = 0;
    
    cart.forEach(item => {
        const itemTotal = item.price * item.quantity;
        total += itemTotal;
        
        const cartItem = document.createElement('div');
        cartItem.className = 'cart-item';
        
        cartItem.innerHTML = `
            <div class="cart-item-info">
                <div class="cart-item-image" style="background-image: url('${item.image}')"></div>
                <div class="cart-item-details">
                    <h3>${item.name}</h3>
                    <p>${item.price.toFixed(2)} руб. x ${item.quantity} = ${itemTotal.toFixed(2)} руб.</p>
                </div>
            </div>
            <div class="cart-item-actions">
                <div class="quantity-control">
                    <button onclick="updateCartItemQuantity(${item.productId}, ${item.quantity - 1})">-</button>
                    <span>${item.quantity}</span>
                    <button onclick="updateCartItemQuantity(${item.productId}, ${item.quantity + 1})">+</button>
                </div>
                <span class="remove-item" onclick="removeFromCart(${item.productId})">&times;</span>
            </div>
        `;
        
        cartContainer.appendChild(cartItem);
    });
    
    document.getElementById('total-price').textContent = total.toFixed(2);
}

function updateCartItemQuantity(productId, newQuantity) {
    if (newQuantity < 1) {
        removeFromCart(productId);
        return;
    }
    
    const cart = getCart();
    const item = cart.find(i => i.productId === productId);
    
    if (item) {
        item.quantity = newQuantity;
        saveCart(cart);
        loadCart();
        updateCartCount();
    }
}

function removeFromCart(productId) {
    const cart = getCart();
    const newCart = cart.filter(item => item.productId !== productId);
    saveCart(newCart);
    loadCart();
    updateCartCount();
}

function checkout() {
    const cart = getCart();
    if (cart.length === 0) {
        alert('Ваша корзина пуста!');
        return;
    }
    
    const user = JSON.parse(localStorage.getItem('currentUser'));
    if (!user) {
        alert('Пожалуйста, войдите в систему для оформления заказа.');
        loadPage('login');
        return;
    }
    
    const orders = getOrders();
    const newOrderId = orders.length > 0 ? Math.max(...orders.map(o => o.id)) + 1 : 1;
    
    const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    
    const newOrder = {
        id: newOrderId,
        userId: user.id,
        userName: user.name,
        date: new Date().toISOString(),
        items: cart,
        total: total,
        status: 'Новый'
    };
    
    orders.push(newOrder);
    saveOrders(orders);
    
    // Очищаем корзину
    saveCart([]);
    updateCartCount();
    
    alert(`Заказ #${newOrderId} успешно оформлен! Сумма: ${total.toFixed(2)} руб.`);
    loadPage('index');
}

// Функции для страницы администратора
function loadAdminUsers() {
    const usersTable = document.getElementById('users-table');
    if (!usersTable) return;
    
    const tbody = usersTable.querySelector('tbody');
    tbody.innerHTML = '';
    
    const users = getUsers();
    
    users.forEach(user => {
        const tr = document.createElement('tr');
        
        tr.innerHTML = `
            <td>${user.id}</td>
            <td>${user.name}</td>
            <td>${user.email}</td>
            <td>${user.address || '-'}</td>
            <td>${user.phone || '-'}</td>
            <td>
                <button class="action-btn edit-btn" onclick="editUser(${user.id})">Редактировать</button>
                <button class="action-btn delete-btn" onclick="deleteUser(${user.id})">Удалить</button>
            </td>
        `;
        
        tbody.appendChild(tr);
    });
}

function loadAdminProducts() {
    const productsContainer = document.getElementById('admin-products-list');
    if (!productsContainer) return;
    
    const products = getProducts();
    productsContainer.innerHTML = '';
    
    products.forEach(product => {
        const productCard = document.createElement('div');
        productCard.className = 'product-card';
        
        productCard.innerHTML = `
            <div class="product-image" style="background-image: url('${product.image}')"></div>
            <div class="product-info">
                <h3>${product.name}</h3>
                <p>${product.description}</p>
                <span class="product-price">${product.price.toFixed(2)} руб.</span>
                <button class="action-btn edit-btn" onclick="editProduct(${product.id})">Редактировать</button>
                <button class="action-btn delete-btn" onclick="deleteProduct(${product.id})">Удалить</button>
            </div>
        `;
        
        productsContainer.appendChild(productCard);
    });
}

function loadAdminOrders() {
    const ordersTable = document.getElementById('orders-table');
    if (!ordersTable) return;
    
    const tbody = ordersTable.querySelector('tbody');
    tbody.innerHTML = '';
    
    const orders = getOrders();
    
    orders.forEach(order => {
        const tr = document.createElement('tr');
        
        tr.innerHTML = `
            <td>${order.id}</td>
            <td>${order.userName} (ID: ${order.userId})</td>
            <td>${new Date(order.date).toLocaleDateString()}</td>
            <td>${order.total.toFixed(2)} руб.</td>
            <td>${order.status}</td>
            <td>
                <button class="action-btn edit-btn" onclick="editOrder(${order.id})">Изменить статус</button>
            </td>
        `;
        
        tbody.appendChild(tr);
    });
}

function openAdminTab(tabName) {
    // Скрываем все вкладки
    document.querySelectorAll('.admin-tab-content').forEach(tab => {
        tab.style.display = 'none';
    });
    
    // Убираем активный класс у всех кнопок
    document.querySelectorAll('.tab-btn').forEach(btn => {
        btn.classList.remove('active');
    });
    
    // Показываем выбранную вкладку
    document.getElementById(`${tabName}-tab`).style.display = 'block';
    
    // Добавляем активный класс к выбранной кнопке
    event.target.classList.add('active');
    
    // Загружаем данные для вкладки
    if (tabName === 'users') {
        loadAdminUsers();
    } else if (tabName === 'products') {
        loadAdminProducts();
    } else if (tabName === 'orders') {
        loadAdminOrders();
    }
}

function editUser(userId) {
    const users = getUsers();
    const user = users.find(u => u.id === userId);
    
    if (!user) return;
    
    const newName = prompt('Введите новое имя:', user.name);
    if (newName === null) return;
    
    const newEmail = prompt('Введите новый email:', user.email);
    if (newEmail === null) return;
    
    const newAddress = prompt('Введите новый адрес:', user.address || '');
    const newPhone = prompt('Введите новый телефон:', user.phone || '');
    
    user.name = newName;
    user.email = newEmail;
    user.address = newAddress;
    user.phone = newPhone;
    
    saveUsers(users);
    loadAdminUsers();
}

function deleteUser(userId) {
    if (!confirm('Вы уверены, что хотите удалить этого пользователя?')) return;
    
    const users = getUsers();
    const newUsers = users.filter(u => u.id !== userId);
    
    saveUsers(newUsers);
    loadAdminUsers();
}

function editProduct(productId) {
    const products = getProducts();
    const product = products.find(p => p.id === productId);
    
    if (!product) return;
    
    const newName = prompt('Введите новое название:', product.name);
    if (newName === null) return;
    
    const newDescription = prompt('Введите новое описание:', product.description);
    if (newDescription === null) return;
    
    const newPrice = parseFloat(prompt('Введите новую цену:', product.price));
    if (isNaN(newPrice)) return;
    
    const newImage = prompt('Введите новый URL изображения:', product.image);
    
    product.name = newName;
    product.description = newDescription;
    product.price = newPrice;
    product.image = newImage || product.image;
    
    saveProducts(products);
    loadAdminProducts();
    loadProducts();
}

function deleteProduct(productId) {
    if (!confirm('Вы уверены, что хотите удалить этот продукт?')) return;
    
    const products = getProducts();
    const newProducts = products.filter(p => p.id !== productId);
    
    saveProducts(newProducts);
    loadAdminProducts();
    loadProducts();
}

function editOrder(orderId) {
    const orders = getOrders();
    const order = orders.find(o => o.id === orderId);
    
    if (!order) return;
    
    const newStatus = prompt('Введите новый статус заказа:', order.status);
    if (newStatus === null) return;
    
    order.status = newStatus;
    saveOrders(orders);
    loadAdminOrders();
}

// Обработчики событий
document.addEventListener('DOMContentLoaded', function() {
    // Проверяем, есть ли сохраненный пользователь
    const savedUser = localStorage.getItem('currentUser');
    if (savedUser) {
        currentUser = JSON.parse(savedUser);
    }
    
    // Обновляем меню навигации
    updateNavMenu();
    
    // Загружаем продукты, если находимся на соответствующей странице
    if (document.getElementById('products-list')) {
        loadProducts();
    }
    
    // Загружаем корзину, если находимся на соответствующей странице
    if (document.getElementById('cart-items')) {
        loadCart();
    }
    
    // Обновляем счетчик корзины
    updateCartCount();
    
    // Инициализируем админ панель, если находимся на соответствующей странице
    if (document.getElementById('users-table')) {
        loadAdminUsers();
        // По умолчанию открываем вкладку пользователей
        document.getElementById('users-tab').style.display = 'block';
    }
    
    // Обработчики форм
    if (document.getElementById('login-form')) {
        document.getElementById('login-form').addEventListener('submit', function(e) {
            e.preventDefault();
            
            const email = document.getElementById('login-email').value;
            const password = document.getElementById('login-password').value;
            
            if (loginUser(email, password)) {
                alert('Вход выполнен успешно!');
                updateNavMenu();
                loadPage('index');
            } else {
                alert('Неверный email или пароль!');
            }
        });
    }
    
    if (document.getElementById('register-form')) {
        document.getElementById('register-form').addEventListener('submit', function(e) {
            e.preventDefault();
            
            const name = document.getElementById('register-name').value;
            const email = document.getElementById('register-email').value;
            const password = document.getElementById('register-password').value;
            const confirmPassword = document.getElementById('register-confirm-password').value;
            const address = document.getElementById('register-address').value;
            const phone = document.getElementById('register-phone').value;
            
            if (password !== confirmPassword) {
                alert('Пароли не совпадают!');
                return;
            }
            
            const userData = {
                name,
                email,
                password,
                address,
                phone
            };
            
            if (registerUser(userData)) {
                alert('Регистрация прошла успешно!');
                updateNavMenu();
                loadPage('index');
            } else {
                alert('Пользователь с таким email уже существует!');
            }
        });
    }
    
    if (document.getElementById('new-product-form')) {
        document.getElementById('new-product-form').addEventListener('submit', addNewProduct);
    }
});