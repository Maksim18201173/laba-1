// Общие функции для всех страниц
document.addEventListener('DOMContentLoaded', function() {
    // Добавляем текущий год в футер
    document.getElementById('year').textContent = new Date().getFullYear();
    
    // Подсветка активной ссылки в навигации
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
});