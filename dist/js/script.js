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

    function DynamicAdapt(type) {
    this.type = type;
}

DynamicAdapt.prototype.init = function () {
    const _this = this;
    // массив объектов
    this.оbjects = [];
    this.daClassname = "_dynamic_adapt_";
    // массив DOM-элементов
    this.nodes = document.querySelectorAll("[data-da]");

    // наполнение оbjects объктами
    for (let i = 0; i < this.nodes.length; i++) {
        const node = this.nodes[i];
        const data = node.dataset.da.trim();
        const dataArray = data.split(",");
        const оbject = {};
        оbject.element = node;
        оbject.parent = node.parentNode;
        оbject.destination = document.querySelector(dataArray[0].trim());
        оbject.breakpoint = dataArray[1] ? dataArray[1].trim() : "767";
        оbject.place = dataArray[2] ? dataArray[2].trim() : "last";
        оbject.index = this.indexInParent(оbject.parent, оbject.element);
        this.оbjects.push(оbject);
    }

    this.arraySort(this.оbjects);

    // массив уникальных медиа-запросов
    this.mediaQueries = Array.prototype.map.call(this.оbjects, function (item) {
        return '(' + this.type + "-width: " + item.breakpoint + "px)," + item.breakpoint;
    }, this);
    this.mediaQueries = Array.prototype.filter.call(this.mediaQueries, function (item, index, self) {
        return Array.prototype.indexOf.call(self, item) === index;
    });

    // навешивание слушателя на медиа-запрос
    // и вызов обработчика при первом запуске
    for (let i = 0; i < this.mediaQueries.length; i++) {
        const media = this.mediaQueries[i];
        const mediaSplit = String.prototype.split.call(media, ',');
        const matchMedia = window.matchMedia(mediaSplit[0]);
        const mediaBreakpoint = mediaSplit[1];

        // массив объектов с подходящим брейкпоинтом
        const оbjectsFilter = Array.prototype.filter.call(this.оbjects, function (item) {
            return item.breakpoint === mediaBreakpoint;
        });
        matchMedia.addListener(function () {
            _this.mediaHandler(matchMedia, оbjectsFilter);
        });
        this.mediaHandler(matchMedia, оbjectsFilter);
    }
};

DynamicAdapt.prototype.mediaHandler = function (matchMedia, оbjects) {
    if (matchMedia.matches) {
        for (let i = 0; i < оbjects.length; i++) {
            const оbject = оbjects[i];
            оbject.index = this.indexInParent(оbject.parent, оbject.element);
            this.moveTo(оbject.place, оbject.element, оbject.destination);
        }
    } else {
        for (let i = 0; i < оbjects.length; i++) {
            const оbject = оbjects[i];
            if (оbject.element.classList.contains(this.daClassname)) {
                this.moveBack(оbject.parent, оbject.element, оbject.index);
            }
        }
    }
};

// Функция перемещения
DynamicAdapt.prototype.moveTo = function (place, element, destination) {
    element.classList.add(this.daClassname);
    if (place === 'last' || place >= destination.children.length) {
        destination.insertAdjacentElement('beforeend', element);
        return;
    }
    if (place === 'first') {
        destination.insertAdjacentElement('afterbegin', element);
        return;
    }
    destination.children[place].insertAdjacentElement('beforebegin', element);
}

// Функция возврата
DynamicAdapt.prototype.moveBack = function (parent, element, index) {
    element.classList.remove(this.daClassname);
    if (parent.children[index] !== undefined) {
        parent.children[index].insertAdjacentElement('beforebegin', element);
    } else {
        parent.insertAdjacentElement('beforeend', element);
    }
}

// Функция получения индекса внутри родителя
DynamicAdapt.prototype.indexInParent = function (parent, element) {
    const array = Array.prototype.slice.call(parent.children);
    return Array.prototype.indexOf.call(array, element);
};

// Функция сортировки массива по breakpoint и place 
// по возрастанию для this.type = min
// по убыванию для this.type = max
DynamicAdapt.prototype.arraySort = function (arr) {
    if (this.type === "min") {
        Array.prototype.sort.call(arr, function (a, b) {
            if (a.breakpoint === b.breakpoint) {
                if (a.place === b.place) {
                    return 0;
                }

                if (a.place === "first" || b.place === "last") {
                    return -1;
                }

                if (a.place === "last" || b.place === "first") {
                    return 1;
                }

                return a.place - b.place;
            }

            return a.breakpoint - b.breakpoint;
        });
    } else {
        Array.prototype.sort.call(arr, function (a, b) {
            if (a.breakpoint === b.breakpoint) {
                if (a.place === b.place) {
                    return 0;
                }

                if (a.place === "first" || b.place === "last") {
                    return 1;
                }

                if (a.place === "last" || b.place === "first") {
                    return -1;
                }

                return b.place - a.place;
            }

            return b.breakpoint - a.breakpoint;
        });
        return;
    }
};

const da = new DynamicAdapt("max");
da.init();
});


