$.validator.addMethod("minlenghtphone", function (value, element) {
    return value.replace(/\D+/g, '').length > 10;
});
$.validator.addMethod("requiredphone", function (value, element) {
    return value.replace(/\D+/g, '').length > 1;
});


function validateForms(form) {
    $(form).validate({
        rules: {
            name: "required",
            phone: {
                requiredphone: true,
                minlenghtphone: true,
            },
            email: "required",
            password: "required",
            repeat_password: {
                required: true,
                equalTo: "#reg_pass",
            }
        },
        submitHandler: function () {
            $.magnificPopup.open({
                items: {
                    src: '#success',
                }
            });
        },
    });
}

validateForms('#order-popup form');
validateForms('#product-card form');


$('form').submit(function (e) {
    e.preventDefault();

    $.ajax({
        type: "POST",
        url: "send.php",
        data: $(this).serialize(),
    });
    $('.form__input').removeClass('valid');
    $(this).find("input").val("");
    $('form').trigger('reset');
    return false;
});

$.fn.setCursorPosition = function (pos) {
    if ($(this).get(0).setSelectionRange) {
        $(this).get(0).setSelectionRange(pos, pos);
    } else if ($(this).get(0).createTextRange) {
        var range = $(this).get(0).createTextRange();
        range.collapse(true);
        range.moveEnd('character', pos);
        range.moveStart('character', pos);
        range.select();
    }
};

$("input[name=phone]").click(function () {
    $(this).setCursorPosition(4);
}).mask("+7 (999) 999-99-99");