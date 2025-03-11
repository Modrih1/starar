document.addEventListener('DOMContentLoaded', function() {
    // Функція для отримання даних з localStorage або за замовчуванням
    function getLocalData(key, defaultValue) {
        const data = localStorage.getItem(key);
        return data ? JSON.parse(data) : defaultValue;
    }
    
    // Функція для збереження даних в localStorage
    function saveLocalData(key, data) {
        localStorage.setItem(key, JSON.stringify(data));
    }
    
    // Обробка форми редагування текстів сайту
    const editTextsForm = document.getElementById('edit-texts-form');
    if (editTextsForm) {
        // Завантаження збережених даних з localStorage або використання значень за замовчуванням
        const siteTexts = getLocalData('siteTexts', {
            heroTitle1: 'Pre-Fall 2022',
            heroSubtitle1: 'Bold & practical coats',
            heroTitle2: 'Second sales',
            heroSubtitle2: 'up to 60% off',
            collectionTitle: 'New Collection from',
            collectionSubtitle: '2022 - 2023',
            reviewerName1: 'Rodrigo Menezes',
            reviewText1: 'Artfinder is an excellent website to view and purchase beautiful paintings from around the world. I have bought some beautiful paintings and the whole process is seamless and stress free. I would highly recommend.',
            reviewerName2: 'Lyssa Gagnon',
            reviewText2: 'It\'s great. A dream for my skinny jeans. With an easy-to-remove card … A dream. I collect both coins and cash. I also saved information on the NFC chip. I strongly recommend it.',
            reviewerName3: 'Jeff Ellaway',
            reviewText3: 'Recently I bought two paintings from Artfinder. Their system for displaying art works is easy to use. Once I ordered, the transactions were confirmed immediately.',
            blogTitle: 'Your go-to',
            blogSubtitle: 'guide to summer gifting',
            blogText: 'Find the freshest gift ideas for your summer festivities.'
        });
        
        // Заповнення форми збереженими даними
        for (const key in siteTexts) {
            const input = document.getElementById(key);
            if (input) {
                input.value = siteTexts[key];
            }
        }
        
        // Обробка відправки форми
        editTextsForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Збір даних з форми
            const formData = new FormData(this);
            const newTexts = {};
            
            for (const [key, value] of formData.entries()) {
                newTexts[key] = value;
            }
            
            // Збереження даних
            saveLocalData('siteTexts', newTexts);
            
            // Відображення повідомлення про успіх
            const successMessage = document.getElementById('success-message');
            if (successMessage) {
                successMessage.textContent = 'Тексти успішно збережено!';
                setTimeout(() => {
                    successMessage.textContent = '';
                }, 3000);
            }
        });
    }
    
    // Обробка форми завантаження зображень
    const imageUploadForm = document.getElementById('image-upload-form');
    if (imageUploadForm) {
        const imageInputs = document.querySelectorAll('.image-input');
        
        // Попередній перегляд зображень перед завантаженням
        imageInputs.forEach(input => {
            const preview = document.getElementById(`${input.id}-preview`);
            
            // Відображення поточного зображення, якщо воно є
            const currentImage = localStorage.getItem(`image_${input.id}`);
            if (currentImage && preview) {
                preview.src = currentImage;
                preview.style.display = 'block';
            }
            
            input.addEventListener('change', function() {
                const file = this.files[0];
                if (file && preview) {
                    const reader = new FileReader();
                    
                    reader.onload = function(e) {
                        preview.src = e.target.result;
                        preview.style.display = 'block';
                    };
                    
                    reader.readAsDataURL(file);
                }
            });
        });
        
        // Обробка відправки форми
        imageUploadForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            imageInputs.forEach(input => {
                const file = input.files[0];
                if (file) {
                    const reader = new FileReader();
                    
                    reader.onload = function(e) {
                        localStorage.setItem(`image_${input.id}`, e.target.result);
                    };
                    
                    reader.readAsDataURL(file);
                }
            });
            
            // Відображення повідомлення про успіх
            const successMessage = document.getElementById('success-message');
            if (successMessage) {
                successMessage.textContent = 'Зображення успішно збережено!';
                setTimeout(() => {
                    successMessage.textContent = '';
                }, 3000);
            }
        });
    }
    
    // Обробка форми редагування товарів
    const productForm = document.getElementById('product-form');
    if (productForm) {
        // Завантаження списку товарів
        const products = getLocalData('products', []);
        const productId = new URLSearchParams(window.location.search).get('id');
        
        if (productId) {
            // Редагування існуючого товару
            const product = products.find(p => p.id === productId);
            
            if (product) {
                document.getElementById('product-name').value = product.name;
                document.getElementById('product-price').value = product.price;
                document.getElementById('product-old-price').value = product.oldPrice || '';
                document.getElementById('product-description').value = product.description;
                document.getElementById('product-is-new').checked = product.isNew;
                document.getElementById('product-is-sale').checked = product.isSale;
                
                // Відображення поточного зображення
                const imagePreview = document.getElementById('product-image-preview');
                if (product.image && imagePreview) {
                    imagePreview.src = product.image;
                    imagePreview.style.display = 'block';
                }
            }
        }
        
        // Попередній перегляд зображення
        const imageInput = document.getElementById('product-image');
        const imagePreview = document.getElementById('product-image-preview');
        
        if (imageInput && imagePreview) {
            imageInput.addEventListener('change', function() {
                const file = this.files[0];
                if (file) {
                    const reader = new FileReader();
                    
                    reader.onload = function(e) {
                        imagePreview.src = e.target.result;
                        imagePreview.style.display = 'block';
                    };
                    
                    reader.readAsDataURL(file);
                }
            });
        }
        
        // Обробка відправки форми
        productForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const name = document.getElementById('product-name').value;
            const price = document.getElementById('product-price').value;
            const oldPrice = document.getElementById('product-old-price').value;
            const description = document.getElementById('product-description').value;
            const isNew = document.getElementById('product-is-new').checked;
            const isSale = document.getElementById('product-is-sale').checked;
            
            // Збір даних товару
            const productData = {
                name,
                price,
                oldPrice,
                description,
                isNew,
                isSale
            };
            
            // Обробка зображення
            const imageInput = document.getElementById('product-image');
            if (imageInput.files.length > 0) {
                const file = imageInput.files[0];
                const reader = new FileReader();
                
                reader.onload = function(e) {
                    productData.image = e.target.result;
                    saveProduct(productData);
                };
                
                reader.readAsDataURL(file);
            } else {
                // Якщо зображення не змінилося, використовуємо попереднє
                if (productId) {
                    const product = products.find(p => p.id === productId);
                    if (product && product.image) {
                        productData.image = product.image;
                    }
                }
                saveProduct(productData);
            }
        });
        
        // Функція для збереження товару
        function saveProduct(productData) {
            const products = getLocalData('products', []);
            const productId = new URLSearchParams(window.location.search).get('id');
            
            if (productId) {
                // Оновлення існуючого товару
                const index = products.findIndex(p => p.id === productId);
                if (index !== -1) {
                    productData.id = productId;
                    products[index] = productData;
                }
            } else {
                // Додавання нового товару
                productData.id = Date.now().toString();
                products.push(productData);
            }
            
            // Збереження змін
            saveLocalData('products', products);
            
            // Перенаправлення на список товарів
            window.location.href = 'products.html';
        }
    }
    
    // Відображення списку товарів
    const productsTable = document.getElementById('products-table');
    if (productsTable) {
        const products = getLocalData('products', []);
        const tbody = productsTable.querySelector('tbody');
        
        if (tbody) {
            // Очищення таблиці
            tbody.innerHTML = '';
            
            // Заповнення таблиці
            products.forEach(product => {
                const row = document.createElement('tr');
                
                // Мініатюра
                const thumbCell = document.createElement('td');
                if (product.image) {
                    const img = document.createElement('img');
                    img.src = product.image;
                    img.alt = product.name;
                    img.style.width = '50px';
                    img.style.height = '50px';
                    img.style.objectFit = 'cover';
                    thumbCell.appendChild(img);
                }
                
                // Назва
                const nameCell = document.createElement('td');
                nameCell.textContent = product.name;
                
                // Ціна
                const priceCell = document.createElement('td');
                priceCell.textContent = `$${product.price}`;
                if (product.oldPrice) {
                    const oldPrice = document.createElement('span');
                    oldPrice.textContent = ` (Стара ціна: $${product.oldPrice})`;
                    oldPrice.style.textDecoration = 'line-through';
                    oldPrice.style.color = '#777';
                    priceCell.appendChild(oldPrice);
                }
                
                // Статус
                const statusCell = document.createElement('td');
                if (product.isNew) {
                    const newBadge = document.createElement('span');
                    newBadge.textContent = 'Новинка';
                    newBadge.className = 'badge-new';
                    statusCell.appendChild(newBadge);
                }
                if (product.isSale) {
                    const saleBadge = document.createElement('span');
                    saleBadge.textContent = 'Знижка';
                    saleBadge.className = 'badge-sale';
                    statusCell.appendChild(saleBadge);
                }
                
                // Дії
                const actionsCell = document.createElement('td');
                
                // Кнопка редагування
                const editButton = document.createElement('a');
                editButton.href = `edit-product.html?id=${product.id}`;
                editButton.className = 'btn-secondary';
                editButton.textContent = 'Редагувати';
                actionsCell.appendChild(editButton);
                
                // Кнопка видалення
                const deleteButton = document.createElement('button');
                deleteButton.className = 'btn-danger';
                deleteButton.textContent = 'Видалити';
                deleteButton.dataset.id = product.id;
                deleteButton.addEventListener('click', function() {
                    if (confirm('Ви впевнені, що хочете видалити цей товар?')) {
                        deleteProduct(this.dataset.id);
                    }
                });
                actionsCell.appendChild(deleteButton);
                
                // Додавання всіх комірок до рядка
                row.appendChild(thumbCell);
                row.appendChild(nameCell);
                row.appendChild(priceCell);
                row.appendChild(statusCell);
                row.appendChild(actionsCell);
                
                // Додавання рядка до таблиці
                tbody.appendChild(row);
            });
        }
    }
    
    // Функція видалення товару
    function deleteProduct(id) {
        let products = getLocalData('products', []);
        products = products.filter(p => p.id !== id);
        saveLocalData('products', products);
        
        // Перезавантаження сторінки для оновлення списку
        window.location.reload();
    }
}); 