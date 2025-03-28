document.addEventListener('DOMContentLoaded', function() {
    // Проверка прав администратора
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));
    
    if (!currentUser || !currentUser.isAdmin) {
        alert('Доступ запрещен! Требуются права администратора.');
        window.location.href = '../index.html';
        return;
    }

    // Обработка выхода из системы
    const logoutBtn = document.getElementById('logout');
    if (logoutBtn) {
        logoutBtn.addEventListener('click', function(e) {
            e.preventDefault();
            localStorage.removeItem('currentUser');
            window.location.href = '../index.html';
        });
    }

    // Обновление года в футере
    const yearElement = document.getElementById('year');
    if (yearElement) {
        yearElement.textContent = new Date().getFullYear();
    }

    // Подсветка активной ссылки
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    const navLinks = document.querySelectorAll('nav a');
    
    navLinks.forEach(link => {
        const linkPage = link.getAttribute('href');
        if (currentPage === linkPage) {
            link.classList.add('active');
        } else {
            link.classList.remove('active');
        }
    });

    // Управление товарами (для страницы products.html в админке)
    if (document.getElementById('productsContainer')) {
        // Загрузка товаров
        let products = JSON.parse(localStorage.getItem('products')) || [];
        const productsContainer = document.getElementById('productsContainer');
        
        // Отображение товаров
        function displayProducts() {
            productsContainer.innerHTML = '';
            
            products.forEach(product => {
                const productElement = document.createElement('div');
                productElement.className = 'product';
                productElement.dataset.id = product.id;
                
                productElement.innerHTML = `
                    <h3>${product.name}</h3>
                    <p>Категория: ${product.category}</p>
                    <p>Описание: ${product.description}</p>
                    <p>Вес: ${product.weight}</p>
                    <p class="price">${product.price} руб.</p>
                    <button class="btn edit-product">Редактировать</button>
                    <button class="btn delete-product">Удалить</button>
                `;
                
                productsContainer.appendChild(productElement);
            });
            
            // Кнопка добавления нового товара
            const addBtn = document.createElement('button');
            addBtn.className = 'btn add-product';
            addBtn.textContent = 'Добавить товар';
            addBtn.style.marginTop = '20px';
            productsContainer.appendChild(addBtn);
        }
        
        // Отображаем товары
        displayProducts();
        
        // Обработчики событий
        productsContainer.addEventListener('click', function(e) {
            const productId = parseInt(e.target.closest('.product')?.dataset.id);
            
            if (e.target.classList.contains('delete-product')) {
                if (confirm('Вы уверены, что хотите удалить этот товар?')) {
                    products = products.filter(p => p.id !== productId);
                    localStorage.setItem('products', JSON.stringify(products));
                    displayProducts();
                }
            } else if (e.target.classList.contains('edit-product')) {
                const product = products.find(p => p.id === productId);
                editProduct(product);
            } else if (e.target.classList.contains('add-product')) {
                addProduct();
            }
        });
        
        // Функция редактирования товара
        function editProduct(product) {
            const formHtml = `
                <div class="product-form">
                    <h3>Редактирование товара</h3>
                    <form id="editProductForm">
                        <input type="hidden" id="edit-id" value="${product.id}">
                        <div class="form-group">
                            <label for="edit-name">Название:</label>
                            <input type="text" id="edit-name" value="${product.name}" required>
                        </div>
                        <div class="form-group">
                            <label for="edit-category">Категория:</label>
                            <select id="edit-category" required>
                                <option value="meat" ${product.category === 'meat' ? 'selected' : ''}>Мясные продукты</option>
                                <option value="dairy" ${product.category === 'dairy' ? 'selected' : ''}>Молочные продукты</option>
                                <option value="grocery" ${product.category === 'grocery' ? 'selected' : ''}>Бакалея</option>
                            </select>
                        </div>
                        <div class="form-group">
                            <label for="edit-price">Цена:</label>
                            <input type="number" id="edit-price" value="${product.price}" required>
                        </div>
                        <div class="form-group">
                            <label for="edit-weight">Вес:</label>
                            <input type="text" id="edit-weight" value="${product.weight}" required>
                        </div>
                        <div class="form-group">
                            <label for="edit-description">Описание:</label>
                            <textarea id="edit-description" required>${product.description}</textarea>
                        </div>
                        <button type="submit" class="btn">Сохранить</button>
                        <button type="button" class="btn cancel-edit">Отмена</button>
                    </form>
                </div>
            `;
            
            const formContainer = document.createElement('div');
            formContainer.innerHTML = formHtml;
            productsContainer.innerHTML = '';
            productsContainer.appendChild(formContainer);
            
            // Обработка формы
            document.getElementById('editProductForm').addEventListener('submit', function(e) {
                e.preventDefault();
                
                const updatedProduct = {
                    id: product.id,
                    name: document.getElementById('edit-name').value,
                    category: document.getElementById('edit-category').value,
                    price: parseFloat(document.getElementById('edit-price').value),
                    weight: document.getElementById('edit-weight').value,
                    description: document.getElementById('edit-description').value
                };
                
                products = products.map(p => p.id === product.id ? updatedProduct : p);
                localStorage.setItem('products', JSON.stringify(products));
                displayProducts();
            });
            
            // Отмена редактирования
            document.querySelector('.cancel-edit').addEventListener('click', function() {
                displayProducts();
            });
        }
        
        // Функция добавления товара
        function addProduct() {
            const formHtml = `
                <div class="product-form">
                    <h3>Добавление товара</h3>
                    <form id="addProductForm">
                        <div class="form-group">
                            <label for="add-name">Название:</label>
                            <input type="text" id="add-name" required>
                        </div>
                        <div class="form-group">
                            <label for="add-category">Категория:</label>
                            <select id="add-category" required>
                                <option value="meat">Мясные продукты</option>
                                <option value="dairy">Молочные продукты</option>
                                <option value="grocery">Бакалея</option>
                            </select>
                        </div>
                        <div class="form-group">
                            <label for="add-price">Цена:</label>
                            <input type="number" id="add-price" required>
                        </div>
                        <div class="form-group">
                            <label for="add-weight">Вес:</label>
                            <input type="text" id="add-weight" required>
                        </div>
                        <div class="form-group">
                            <label for="add-description">Описание:</label>
                            <textarea id="add-description" required></textarea>
                        </div>
                        <button type="submit" class="btn">Добавить</button>
                        <button type="button" class="btn cancel-add">Отмена</button>
                    </form>
                </div>
            `;
            
            const formContainer = document.createElement('div');
            formContainer.innerHTML = formHtml;
            productsContainer.innerHTML = '';
            productsContainer.appendChild(formContainer);
            
            // Обработка формы
            document.getElementById('addProductForm').addEventListener('submit', function(e) {
                e.preventDefault();
                
                const newProduct = {
                    id: Date.now(),
                    name: document.getElementById('add-name').value,
                    category: document.getElementById('add-category').value,
                    price: parseFloat(document.getElementById('add-price').value),
                    weight: document.getElementById('add-weight').value,
                    description: document.getElementById('add-description').value
                };
                
                products.push(newProduct);
                localStorage.setItem('products', JSON.stringify(products));
                displayProducts();
            });
            
            // Отмена добавления
            document.querySelector('.cancel-add').addEventListener('click', function() {
                displayProducts();
            });
        }
    }

    // Управление пользователями (для страницы users.html)
    if (document.getElementById('usersList')) {
        let users = JSON.parse(localStorage.getItem('users')) || [];
        const usersList = document.getElementById('usersList');
        
        // Отображение пользователей
        function displayUsers() {
            usersList.innerHTML = '';
            
            users.forEach(user => {
                const row = document.createElement('tr');
                row.innerHTML = `
                    <td>${user.id}</td>
                    <td>${user.name}</td>
                    <td>${user.email}</td>
                    <td>${user.phone}</td>
                    <td>${user.isAdmin ? 'Администратор' : 'Пользователь'}</td>
                    <td>
                        <button class="btn edit-user" data-id="${user.id}">Редактировать</button>
                        ${!user.isAdmin ? `<button class="btn delete-user" data-id="${user.id}">Удалить</button>` : ''}
                    </td>
                `;
                usersList.appendChild(row);
            });
            
            // Добавляем кнопку "Добавить пользователя"
            const addUserBtn = document.createElement('button');
            addUserBtn.className = 'btn';
            addUserBtn.textContent = 'Добавить пользователя';
            addUserBtn.style.marginTop = '20px';
            addUserBtn.addEventListener('click', addUser);
            usersList.parentElement.parentElement.appendChild(addUserBtn);
        }
        
        // Отображаем пользователей
        displayUsers();
        
        // Обработчики событий
        usersList.addEventListener('click', function(e) {
            const userId = parseInt(e.target.dataset.id);
            
            if (e.target.classList.contains('delete-user')) {
                if (confirm('Вы уверены, что хотите удалить этого пользователя?')) {
                    users = users.filter(u => u.id !== userId);
                    localStorage.setItem('users', JSON.stringify(users));
                    displayUsers();
                }
            } else if (e.target.classList.contains('edit-user')) {
                const user = users.find(u => u.id === userId);
                editUser(user);
            }
        });
        
        // Функция редактирования пользователя
        function editUser(user) {
            const formHtml = `
                <div class="user-form">
                    <h3>Редактирование пользователя</h3>
                    <form id="editUserForm">
                        <input type="hidden" id="edit-user-id" value="${user.id}">
                        <div class="form-group">
                            <label for="edit-user-name">Имя:</label>
                            <input type="text" id="edit-user-name" value="${user.name}" required>
                        </div>
                        <div class="form-group">
                            <label for="edit-user-email">Email:</label>
                            <input type="email" id="edit-user-email" value="${user.email}" required>
                        </div>
                        <div class="form-group">
                            <label for="edit-user-phone">Телефон:</label>
                            <input type="tel" id="edit-user-phone" value="${user.phone}" required>
                        </div>
                        <div class="form-group">
                            <label for="edit-user-admin">Роль:</label>
                            <select id="edit-user-admin" ${user.id === 1 ? 'disabled' : ''}>
                                <option value="false" ${!user.isAdmin ? 'selected' : ''}>Пользователь</option>
                                <option value="true" ${user.isAdmin ? 'selected' : ''}>Администратор</option>
                            </select>
                        </div>
                        <div class="form-group">
                            <label for="edit-user-password">Новый пароль (оставьте пустым, чтобы не менять):</label>
                            <input type="password" id="edit-user-password">
                        </div>
                        <button type="submit" class="btn">Сохранить</button>
                        <button type="button" class="btn cancel-edit-user">Отмена</button>
                    </form>
                </div>
            `;
            
            const formContainer = document.createElement('div');
            formContainer.innerHTML = formHtml;
            usersList.innerHTML = '';
            usersList.appendChild(formContainer);
            
            // Обработка формы
            document.getElementById('editUserForm').addEventListener('submit', function(e) {
                e.preventDefault();
                
                const updatedUser = {
                    ...user,
                    name: document.getElementById('edit-user-name').value,
                    email: document.getElementById('edit-user-email').value,
                    phone: document.getElementById('edit-user-phone').value,
                    isAdmin: document.getElementById('edit-user-admin').value === 'true',
                };
                
                const newPassword = document.getElementById('edit-user-password').value;
                if (newPassword) {
                    updatedUser.password = newPassword;
                }
                
                users = users.map(u => u.id === user.id ? updatedUser : u);
                localStorage.setItem('users', JSON.stringify(users));
                
                // Если редактируем текущего пользователя, обновляем данные в currentUser
                const currentUser = JSON.parse(localStorage.getItem('currentUser'));
                if (currentUser && currentUser.id === user.id) {
                    localStorage.setItem('currentUser', JSON.stringify({
                        id: updatedUser.id,
                        name: updatedUser.name,
                        email: updatedUser.email,
                        isAdmin: updatedUser.isAdmin
                    }));
                }
                
                displayUsers();
            });
            
            // Отмена редактирования
            document.querySelector('.cancel-edit-user').addEventListener('click', function() {
                displayUsers();
            });
        }
        
        // Функция добавления пользователя
        function addUser() {
            const formHtml = `
                <div class="user-form">
                    <h3>Добавление пользователя</h3>
                    <form id="addUserForm">
                        <div class="form-group">
                            <label for="add-user-name">Имя:</label>
                            <input type="text" id="add-user-name" required>
                        </div>
                        <div class="form-group">
                            <label for="add-user-email">Email:</label>
                            <input type="email" id="add-user-email" required>
                        </div>
                        <div class="form-group">
                            <label for="add-user-phone">Телефон:</label>
                            <input type="tel" id="add-user-phone" required>
                        </div>
                        <div class="form-group">
                            <label for="add-user-admin">Роль:</label>
                            <select id="add-user-admin">
                                <option value="false">Пользователь</option>
                                <option value="true">Администратор</option>
                            </select>
                        </div>
                        <div class="form-group">
                            <label for="add-user-password">Пароль:</label>
                            <input type="password" id="add-user-password" required>
                        </div>
                        <div class="form-group">
                            <label for="add-user-confirm">Подтвердите пароль:</label>
                            <input type="password" id="add-user-confirm" required>
                        </div>
                        <button type="submit" class="btn">Добавить</button>
                        <button type="button" class="btn cancel-add-user">Отмена</button>
                    </form>
                </div>
            `;
            
            const formContainer = document.createElement('div');
            formContainer.innerHTML = formHtml;
            usersList.innerHTML = '';
            usersList.appendChild(formContainer);
            
            // Обработка формы
            document.getElementById('addUserForm').addEventListener('submit', function(e) {
                e.preventDefault();
                
                const password = document.getElementById('add-user-password').value;
                const confirmPassword = document.getElementById('add-user-confirm').value;
                
                if (password !== confirmPassword) {
                    alert('Пароли не совпадают!');
                    return;
                }
                
                const newUser = {
                    id: Date.now(),
                    name: document.getElementById('add-user-name').value,
                    email: document.getElementById('add-user-email').value,
                    phone: document.getElementById('add-user-phone').value,
                    isAdmin: document.getElementById('add-user-admin').value === 'true',
                    password: password
                };
                
                // Проверяем, есть ли уже пользователь с таким email
                if (users.some(u => u.email === newUser.email)) {
                    alert('Пользователь с таким email уже существует!');
                    return;
                }
                
                users.push(newUser);
                localStorage.setItem('users', JSON.stringify(users));
                displayUsers();
            });
            
            // Отмена добавления
            document.querySelector('.cancel-add-user').addEventListener('click', function() {
                displayUsers();
            });
        }
    }
});