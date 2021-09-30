//'use strict';


$(function () {

    const catalogLink = document.querySelector('.header__menu-link--catalog');
    const dropCatalog = document.querySelector('.drop-catalog');
    const body = document.querySelector('body');

    if ($(window).width() < 992) {
        $('.header__menu-link--catalog').on('click', function () {
            $(this).next().slideToggle('300');
        });
    } else {
        catalogLink.addEventListener('mouseenter', () => {
            body.classList.add('_lock');
            catalogLink.classList.add('header__menu-link--active');
            dropCatalog.classList.add('drop-catalog--active');
        });

        dropCatalog.addEventListener('mouseleave', (e) => {
            body.classList.remove('_lock');
            catalogLink.classList.remove('header__menu-link--active');
            dropCatalog.classList.remove('drop-catalog--active');
        });
    }

    $('.burger-btn').on('click', function () {
        $('body').addClass('_lock');
        $('.burger-menu').addClass('burger-menu--active');
    });

    $('.burger-menu__close').on('click', function () {
        $('body').removeClass('_lock');
        $('.burger-menu').removeClass('burger-menu--active');
    });

    $('.header__catalog-btn').on('click', function () {
        $(this).toggleClass('header__catalog-btn--active');
        $('.drop-catalog').fadeToggle('300');
    });
    $('.drop-catalog__close').on('click', function () {
        $('.header__catalog-btn').removeClass('header__catalog-btn--active');
        $(this).parent().fadeOut('300');
    });

    $('.tab').on('click', function (e) {
        e.preventDefault();

        $($(this).siblings()).removeClass('tab--active');
        $('.tabs-content').removeClass('tabs-content--active');

        $(this).addClass('tab--active');
        $($(this).attr('href')).addClass('tabs-content--active');

        //$('.slider').slick('setPosition'); // Инициализация слайдера
    });
    $('.manufacture__item-close').on('click', function () {
        $(this).parent().removeClass('tabs-content--active');
        $('.manufacture__btn').removeClass('tab--active');
    });

    const promoSlider = new Swiper('.promo-slider__body', {
        slidesToShow: 1,
        spaceBetween: 30,
        pagination: {
            clickable: true,
            el: '.swiper-pagination',
        },
        loop: true,
        //freeMode: true,
        speed: 1000,
        autoplay: {
            delay: 5000,
        },
        breakpoints: {
            768: {
                
            },
        },
    });

    const productSlider = new Swiper('.product-card__gallery', {
        spaceBetween: 30,
        loop: true,
        //freeMode: true,
        speed: 500,
        navigation: {
            prevEl: ".swiper-button-prev",
            nextEl: ".swiper-button-next",
        },
    });
    // Mask input
    $('input[name=phone]').mask("+375 (99) 999-99-99");

    @@include('./dinamic-adapt.js')
});


