document.addEventListener('DOMContentLoaded', function() {
    // Слайдер для hero секції
    const heroSlides = document.querySelectorAll('.hero-slider .slide');
    const heroPrevBtn = document.querySelector('.hero .prev-slide');
    const heroNextBtn = document.querySelector('.hero .next-slide');
    const heroCurrentSlide = document.querySelector('.hero .slider-indicator .current');
    const heroTotalSlides = document.querySelector('.hero .slider-indicator .total');
    
    let heroCurrentIndex = 0;
    heroTotalSlides.textContent = heroSlides.length;
    
    function showHeroSlide(index) {
        // Ховаємо всі слайди
        heroSlides.forEach(slide => {
            slide.classList.remove('current');
        });
        
        // Показуємо поточний слайд
        heroSlides[index].classList.add('current');
        heroCurrentSlide.textContent = index + 1;
    }
    
    // Наступний слайд
    heroNextBtn.addEventListener('click', function() {
        heroCurrentIndex++;
        if (heroCurrentIndex >= heroSlides.length) {
            heroCurrentIndex = 0;
        }
        showHeroSlide(heroCurrentIndex);
    });
    
    // Попередній слайд
    heroPrevBtn.addEventListener('click', function() {
        heroCurrentIndex--;
        if (heroCurrentIndex < 0) {
            heroCurrentIndex = heroSlides.length - 1;
        }
        showHeroSlide(heroCurrentIndex);
    });
    
    // Автоматична зміна слайдів кожні 5 секунд
    setInterval(function() {
        heroCurrentIndex++;
        if (heroCurrentIndex >= heroSlides.length) {
            heroCurrentIndex = 0;
        }
        showHeroSlide(heroCurrentIndex);
    }, 5000);
    
    // Слайдер для відгуків
    const reviewSlides = document.querySelectorAll('.reviews-slider .review-slide');
    const reviewPrevBtn = document.querySelector('.reviews .prev-slide');
    const reviewNextBtn = document.querySelector('.reviews .next-slide');
    const reviewCurrentSlide = document.querySelector('.reviews .slider-indicator .current');
    const reviewTotalSlides = document.querySelector('.reviews .slider-indicator .total');
    
    let reviewCurrentIndex = 0;
    reviewTotalSlides.textContent = reviewSlides.length;
    
    function showReviewSlide(index) {
        // Ховаємо всі слайди
        reviewSlides.forEach(slide => {
            slide.classList.remove('current');
        });
        
        // Показуємо поточний слайд
        reviewSlides[index].classList.add('current');
        reviewCurrentSlide.textContent = index + 1;
    }
    
    // Наступний слайд
    reviewNextBtn.addEventListener('click', function() {
        reviewCurrentIndex++;
        if (reviewCurrentIndex >= reviewSlides.length) {
            reviewCurrentIndex = 0;
        }
        showReviewSlide(reviewCurrentIndex);
    });
    
    // Попередній слайд
    reviewPrevBtn.addEventListener('click', function() {
        reviewCurrentIndex--;
        if (reviewCurrentIndex < 0) {
            reviewCurrentIndex = reviewSlides.length - 1;
        }
        showReviewSlide(reviewCurrentIndex);
    });
    
    // Автоматична зміна слайдів кожні 7 секунд
    setInterval(function() {
        reviewCurrentIndex++;
        if (reviewCurrentIndex >= reviewSlides.length) {
            reviewCurrentIndex = 0;
        }
        showReviewSlide(reviewCurrentIndex);
    }, 7000);
    
    // Форма підписки
    const newsletterForm = document.querySelector('.newsletter-form');
    
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const emailInput = this.querySelector('input[type="email"]');
            const privacyCheckbox = this.querySelector('#privacy-policy');
            
            if (!emailInput.value) {
                alert('Будь ласка, введіть вашу електронну пошту.');
                return;
            }
            
            if (!privacyCheckbox.checked) {
                alert('Будь ласка, прийміть політику конфіденційності.');
                return;
            }
            
            // Імітація відправки форми
            alert('Дякуємо за підписку!');
            emailInput.value = '';
            privacyCheckbox.checked = false;
        });
    }

    // Додаємо функціональність для кнопки кошика
    const cartBtn = document.querySelector('.cart a');
    if (cartBtn) {
        cartBtn.addEventListener('click', function(e) {
            e.preventDefault();
            alert('Функціональність кошика буде додана пізніше.');
        });
    }

    // Підсвічування активних посилань меню
    const navLinks = document.querySelectorAll('.nav-left a');
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            navLinks.forEach(l => l.classList.remove('active'));
            this.classList.add('active');
        });
    });

    // Обробка кліків по карткам товарів
    const productCards = document.querySelectorAll('.product-card');
    productCards.forEach(card => {
        card.addEventListener('click', function() {
            const productName = this.querySelector('h3').textContent;
            alert(`Ви обрали товар: ${productName}. Сторінка товару буде додана пізніше.`);
        });
    });
}); 