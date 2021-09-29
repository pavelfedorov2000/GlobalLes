$('.slider').slick({
    slidesToShow: 1,
    slidesToScroll: 1,
    prevArrow: '<button class="slider__btn slider__btn--prev"></button>',
    nextArrow: '<button class="slider__btn slider__btn--next"></button>',
    dots: true,
    //centerMode: true,
    //centerPadding: '60px',
    //variableWidth: true,
    //autoplay: true,
    //autoplaySpeed: 2000,
    //fade: true,
    //appendArrows: ,
    //appendDots: ,
    //rtl: true,
    //mobileFirst: true,
    //rows: 2,
    //slidesPerRow: 1,
    responsive: [
        {
            //breakpoint: ,
            settings: {

            }
        },
    ]
});

$(window).on('resize', function (e) {
        // Переменная, по которой узнаем запущен слайдер или нет.
        // Храним её в data
        var init = $(".").data('init-slider');
        // Если мобильный
        if (window.innerWidth < 991) {
            // Если слайдер не запущен
            if (init != 1) {
                // Запускаем слайдер и записываем в data init-slider = 1
                $('.').slick({
                    slidesToShow: 1,
                    arrows: false,
                    dots: true,
                    variableWidth: true,
                    responsive: [
                        {
                            breakpoint: 575,
                            settings: {
                                centerMode: true,
                            },
                        }
                    ]
                }).data({ 'init-slider': 1 });
            }
        }
        // Если не мобайл
        else {
            // Если слайдер запущен
            if (init == 1) {
                // Разрушаем слайдер и записываем в data init-slider = 0
                $('.').slick('unslick').data({ 'init-slider': 0 });
            }
        }
    }).trigger('resize');