$('.burger-btn').on('click', function () {
    $('.burger-btn').toggleClass('burger-btn--active');
    $('.burger-menu').toggleClass('burger-menu--active');
});

$('.header__menu-link').on('click', function () {
    $('.burger-menu').removeClass('burger-menu--active');
}); 