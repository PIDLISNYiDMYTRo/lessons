document.addEventListener('click', function (e) {
   const targetElement = e.target;
   const isMenuIcon = targetElement.closest('.menu-icon'); // Перевіряємо, чи натиснули на іконку меню
   const isMenuOpen = document.documentElement.classList.contains('menu-open'); // Перевіряємо, чи відкрите меню
   const isInsideMenu = targetElement.closest('.header__nav-bar'); // Перевіряємо, чи натиснули всередині меню

   if (isMenuIcon) {
      // Якщо натиснули на іконку меню, переключаємо стан меню
      document.documentElement.classList.toggle('menu-open');
   } else if (isMenuOpen && !isInsideMenu) {
      // Якщо меню відкрите і натиснули за межами іконки та меню, закриваємо меню
      document.documentElement.classList.remove('menu-open');
   }
});

document.addEventListener('click', function (e) {
   const targetElement = e.target;
   const isButton = targetElement.closest('.search-top-bar__button');
   const isMenuOpen = document.documentElement.classList.contains('search-top-bar__button-open');
   const isInsideMenu = targetElement.closest('.search-top-bar__form');

   if (isButton) {
      // Якщо клікнули на кнопку, то переключаємо стан меню
      document.documentElement.classList.toggle('search-top-bar__button-open');
   } else if (isMenuOpen && !isInsideMenu) {
      // Якщо меню відкрите і клікнули за межами кнопки і меню, закриваємо меню
      document.documentElement.classList.remove('search-top-bar__button-open');
   }
});

// Функція для Popular styles
// Отримуємо контейнер
const container = document.querySelector('.popular-styles__wrapper-cards');

// Отримуємо всі елементи всередині контейнера
const items = container.querySelectorAll('.popular-styles__card');

// Перевіряємо, чи є всього два елементи
if (items.length === 2) {
   // Функція для застосування стилів при розширенні більше 1193.98px
   const applyStyles = () => {
      if (window.innerWidth > 1193.98) {
         items[1].style.gridColumn = 'span 2';
         items[1].style.gridRow = 'span 2';
      } else {
         // Якщо ширина менше або дорівнює 1193.98px, прибираємо стилі
         items[1].style.gridColumn = '';
         items[1].style.gridRow = '';
      }
   };


   // Викликаємо функцію один раз при завантаженні сторінки
   applyStyles();

   // Додаємо обробник події на зміну розміру вікна
   window.addEventListener('resize', applyStyles);
}

// Функція для видалення або додавання атрибута 'open'
function toggleAutocomplete() {
   document.querySelectorAll('.menu-footer__details').forEach(function (input) {
      if (window.innerWidth <= 409.98) {
         input.removeAttribute('open');
      } else {
         input.setAttribute('open', 'on');
      }
   });
}
// Викликати функцію при завантаженні сторінки
toggleAutocomplete();
// Викликати функцію при зміні розміру вікна
window.addEventListener('resize', function () {
   toggleAutocomplete();
});


let selectedCategories = ['all-products'];

// знаходимо всі кнопки фільтрів
document.querySelectorAll('.filter__button').forEach(button => {
   button.addEventListener('click', () => {
      let category = button.dataset.filter;
      if (category === 'all-products') {
         selectedCategories = ['all-products'];
         setActiveButtons(selectedCategories);
      } else {
         let index = selectedCategories.indexOf(category);
         if (index > -1) {
            selectedCategories.splice(index, 1);
         } else {
            selectedCategories.push(category);
         }
         if (selectedCategories.length > 0) {
            let allIndex = selectedCategories.indexOf('all-products');
            if (allIndex > -1) {
               selectedCategories.splice(allIndex, 1);
            }
         }
         setActiveButtons(selectedCategories);
      }
      filterProducts(selectedCategories);
   });
});

function filterProducts(categories) {
   // знаходимо всі елементи з класом card-product (картка товару)
   let products = document.querySelectorAll('.card-product');
   products.forEach(product => {
      let productCategories = product.dataset.category.split(' ');

      if (categories.includes('all-products') || categories.some(category => productCategories.includes(category))) {
         product.classList.add('card-product--show');
      } else {
         product.classList.remove('card-product--show');
      }
   });
}

// функція для додавання та видалення класу active до вибраних кнопок filter__button
function setActiveButtons(categories) {
   let buttons = document.querySelectorAll('.filter__button');
   buttons.forEach(button => {
      if (categories.includes(button.dataset.filter)) {
         button.classList.add('filter__button--active');
      } else {
         button.classList.remove('filter__button--active');
      }
   });
}
