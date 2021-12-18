let headerWrapper = document.querySelector('.page-header__wrapper');
let menu = document.querySelector('.page-header__toggle');
let navList = document.querySelector('.main-nav__list');

navList.classList.remove('main-nav__list--nojs');
navList.classList.remove('main-nav__list--opened');
headerWrapper.classList.remove('page-header__wrapper--nojs');

menu.addEventListener('click', function() {
    navList.classList.toggle('main-nav__list--opened');
    menu.classList.toggle('page-header__toggle--closed');
})

