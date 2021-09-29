$('.accordion__item-summary').on('click', function () {
    $(this).parent().siblings().removeClass('accordion__item--active');
    $(this).parent().siblings().find('div.accordion__item-details').slideUp('300');
    $(this).parent().toggleClass('accordion__item--active');
    $(this).next().slideToggle('300');
});