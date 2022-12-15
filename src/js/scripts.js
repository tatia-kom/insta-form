const dataText = {
    'blockType': {
        'limits': 'Несоблюдение лимитов. Не приходит код из СМС',
        'age': 'Неправильно указан возраст',
        'author': 'Нарушение авторских прав',
        'deactive': 'Аккаунт деактивирован',
        'break': 'Аккаунт взломали',
        'fish': 'Фишинг',
        'other': 'Причина не понятна',
    },
    'limitBlock': {
        'yes': 'Бан на 24 получен',
        'no': 'Не было бана на 24',
    },
    'deactiveTerm': {
        'lessMonth': 'Деактивация менее 30 дней назад',
        'moreMonth': 'Деактивация более 30 дней назад',
    },
    'subsCount': {
        'less1000': 'Подписчиков до 1000',
        'less10000': 'Подписчиков до 10000',
        'more10000': 'Подписчиков больше 10000',
    },
    'login': {
        'yes': 'Помню данные для входа',
        'noPass': 'Пароль не помню',
        'no': 'Не уверен, что помню данные для входа',
    },
};

$(document).ready(function() {
    var form = $('.panel__form');
    var questionsAmount = 4;
    var questionsStep = 1;

    function setProgressBar(val) {
        $('.panel-progress__value').text(val + '%');
        $('.panel-progress__bar span').css({width: val + '%'});
    }

    function goToStart() {
        $('.panel-progress').addClass('hidden');
        $('.reviews__image').removeClass('move');
        $('.reviews__block').removeClass('hidden');
        $('.reviews__text').removeClass('hidden');
        $('.reviews__title').removeClass('hidden');
        $('.panel__sale').removeClass('active');
        $('.reviews').removeClass('mobile-hidden');
    }

    // carousel

    var owl = $('.owl-carousel');
    owl.owlCarousel({
        items: 1,
    });

    $('.prev').click(function() {
        owl.trigger('prev.owl.carousel');
    });
    $('.next').click(function() {
        owl.trigger('next.owl.carousel');
    });
    $('.to').click(function() {
        var step = $(this).attr('data-step');
        owl.trigger('to.owl.carousel', step);
    });

    owl.on('change.owl.carousel', function() {
        $('.panel__scroll').scrollTop(0);
    });

    owl.on('changed.owl.carousel', function(event) {
        var current = event.item.index;

        switch (current) {
            case 0: {
                $('.panel__sale').text('Ваша скидка 0%');
                goToStart();
                break;
            }
            case 1: {
                setProgressBar(0);
                $('.panel__sale').text('Ваша скидка 0%');
                $('.mobilePrev').attr('data-step', '0');
                break;
            }
            case 2:
            case 3: {
                setProgressBar(parseInt(100/questionsAmount));
                $('.panel__sale').text('Ваша скидка 2%');
                $('.mobilePrev').attr('data-step', '1');
                $('.mobileNext').attr('data-step', '4');
                break;
            }
            case 4: {
                setProgressBar(parseInt(100/questionsAmount*questionsStep));
                $('.panel__sale').text('Ваша скидка 4%');
                $('.mobilePrev').attr('data-step', $('.prevVar').attr('data-step'));
                $('.mobileNext').attr('data-step', '5');
                break;
            }
            case 5: {
                setProgressBar(parseInt(100/questionsAmount*(questionsStep + 1)));
                $('.panel__sale').text('Ваша скидка 6%');
                $('.mobilePrev').attr('data-step', '4');
                $('.panel-progress__mobile .formList').hide();
                $('.mobileNext').removeClass('formList').addClass('to').attr('data-step', '6').show();
                break;
            }
            case 6: {
                setProgressBar(parseInt(100/questionsAmount*(questionsStep + 2)));
                $('.panel__sale').text('Ваша скидка 8%').removeClass('mobile-show');
                $('.panel__time').removeClass('mobile-hidden');
                $('.panel__soc').removeClass('mobile-hidden');
                $('.panel-progress__mobile .panel__sale').show();
                $('.mobilePrev').attr('data-step', '5');
                $('.mobileNext').hide();
                $('.panel-progress__mobile .send').hide();
                $('.panel-progress__mobile .formList').show();
                break;
            }
            case 7: {
                $('.panel__sale').text('Ваша скидка 10%').addClass('mobile-show');
                $('.panel__time').addClass('mobile-hidden');
                $('.panel__soc').addClass('mobile-hidden');
                $('.panel-progress__mobile .panel__sale').hide();
                $('.mobilePrev').attr('data-step', '6');
                $('.panel-progress__mobile .formList').hide();
                $('.panel-progress__mobile .send').show();
                setProgressBar(99);
                break;
            }
        }
    });

    $('.start').click(function() {
        $('.reviews__title').addClass('hidden');
        $('.reviews__text').addClass('hidden');
        $('.reviews__block').addClass('hidden');
        $('.reviews__image').addClass('move');
        $('.panel-progress').removeClass('hidden');
        $('.panel__sale').addClass('active');
        $('.reviews').addClass('mobile-hidden');
    });

    $('.goToStart').click(function() {
        goToStart();
    });

    form.find('input[type=radio]').change(function() {
        var inputName = $(this).attr('name');

        if (inputName == 'blockType') {
            var blockTypeValue = $(this).val();

            setTimeout(function() {
                switch (blockTypeValue) {
                    case 'limits': {
                        questionsAmount = 5;
                        questionsStep = 2;
                        owl.trigger('to.owl.carousel', 2);
                        $('.toVar').attr('data-step', '2');
                        $('.prevVar').attr('data-step', '2');
                        break;
                    }
                    case 'deactive': {
                        questionsAmount = 5;
                        questionsStep = 2;
                        owl.trigger('to.owl.carousel', 3);
                        $('.toVar').attr('data-step', '3');
                        $('.prevVar').attr('data-step', '3');
                        break;
                    }
                    default: {
                        questionsAmount = 5;
                        questionsStep = 1;
                        owl.trigger('to.owl.carousel', 4);
                        $('.toVar').attr('data-step', '4');
                        $('.prevVar').attr('data-step', '1');
                    }
                }
            }, 300);
        }
        else {
            if (inputName == 'limitBlock') {
                owl.trigger('to.owl.carousel', 4);
            }
            else {
                setTimeout(function() {
                    owl.trigger('next.owl.carousel');
                }, 300);
            }
        }
    });

    $('.panel-content__input').on('keyup', '.error', function() {
        $('.panel-content__input input').removeClass('error');
    });

    $('body').on('click', '.formList', function() {
        var formData = form.serializeArray().reduce(function(obj, item) {
            obj[item.name] = item.value;
            return obj;
        }, {});

        if (!formData.tgName && !formData.vkLink && !formData.waNumber) {
            $('.panel-content__input input').addClass('error');
            return;
        }

        $('.form-list').html('');
        Object.keys(formData).forEach(function (key) {
            var value = formData[key];
            if (key !== 'tgName' && key !== 'vkLink' && key !== 'waNumber') {
                $('.form-list').append('<div class="panel-content__radio"><input type="radio" disabled checked /><label>' + dataText[key][value] + '</label></div>');
            }
            else {
                if (value)
                    $('.form-list').append('<div class="panel-content__radio"><input type="radio" disabled checked /><label>Связь: ' + value + '</label></div>');
            }
        });

        owl.trigger('next.owl.carousel');
    });

    $('body').on('click', '.send', function() {
        var formData = form.serializeArray().reduce(function(obj, item) {
            obj[item.name] = item.value;
            return obj;
        }, {});
        var message = 'Заявка:%0A%0A';

        Object.keys(formData).forEach(function (key) {
            var value = formData[key];

            switch (key) {
                case 'tgName': {
                    if (value)
                        message += '%0AТелеграмм для связи: <b>' + value + '</b>%0A';
                    break;
                }
                case 'vkLink': {
                    if (value)
                        message += '%0AVK для связи: <b>' + value + '</b>%0A';
                    break;
                }
                case 'waNumber': {
                    if (value)
                        message += '%0AWhatsApp для связи: <b>' + value + '</b>%0A';
                    break;
                }
                default: {
                    message += dataText[key][value] + '%0A';
                }
            }
        });

        $.ajax({
            method: 'GET',
            url: 'https://api.telegram.org/bot5880236205:AAEiBhp8Rk8FWKAd3SdNdg0VAjsK_0ReQok/sendMessage?chat_id=5426515959&parse_mode=html&text='+message,
            success: function(response) {
                if (response.ok) {
                    $('.panel-progress__mobile .mobilePrev').hide();
                    $('.panel-progress__mobile .send').hide();
                    setProgressBar(100);
                    owl.trigger('to.owl.carousel', 8);
                }
            }
        });
    });
});