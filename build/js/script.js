'strict mode';

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

let buttonPopup = document.querySelectorAll('.button--popup');
let popupForm = document.querySelector('.popup-form__form');
let success = document.querySelector('.popup-success');
let popupClose = document.querySelectorAll('.popup-form__close');


let onFormEscKeydown = (evt) => {
    if (evt.key === 'Escape' || evt.key === 'Esc') {
        evt.preventDefault();
        popupForm.style.display = 'none';
        succsess.style.display = 'none';
    }
};

buttonPopup.forEach((item) =>  {
    item.addEventListener('click', () => {
        popupForm.style.display = 'block';
    })
});

popupClose.forEach((item) => {
    item.addEventListener('click', () => {
        popupForm.style.display = 'none';
        success.style.display = 'none';
    })
})

document.addEventListener('keydown', onFormEscKeydown);

popupForm.addEventListener('submit', (evt) => {
    evt.preventDefault();
    popupForm.style.display = 'none';
    success.style.display = 'flex';
})
