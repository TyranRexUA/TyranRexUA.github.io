$(document).ready(function () {

    //============= fullPageScroll ============================

    $('.wrapper').pagepiling({
        anchors: ['home', 'skills', 'portfolio', 'contact'],
        scrollingSpeed: 1000,
        menu: '.menu',
        navigation: false,
        touchSensitivity: 15,
        animateAnchor: false,
        css3: true,
    });

    //====================== TYPE IT =========================

    $('.typeIt').typeIt({
        strings: ["Front-end Developer (React)"],
        speed: 200,
        loop: true,
        autoStart: false
    }).tiPause(3000).tiDelete(30).tiType('HTML-coder').tiPause(3000);

    //===================== ПОЯВАЛЕНИЕ ЕЛЕМЕНТОВ =================

    let activeWindowHeight = Math.floor($(window).innerHeight() - 60 - $('.skills__title').outerHeight(true));
    let tagCloudSize = window.innerWidth < activeWindowHeight ? window.innerWidth : activeWindowHeight;
    let tagWidth = tagCloudSize / 8;
    let tagHeight = tagCloudSize / 8;

    //========================================================

    $('.tagCloud').svg3DTagCloud({
        entries: [

            { image: './img/icons/html.svg', url: '', width: tagWidth / 1.15, height: tagHeight / 1.15, target: '_top', tooltip: 'HTML' },
            { image: './img/icons/nextjs.svg', url: '', width: tagWidth / 1.15, height: tagHeight / 1.25, target: '_top', tooltip: 'next.js' },
            { image: './img/icons/css.svg', url: '', width: tagWidth / 1.15, height: tagHeight / 1.15, target: '_top', tooltip: 'CSS' },
            { image: './img/icons/javascript.svg', url: '', width: tagWidth / 1.15, height: tagHeight / 1.15, target: '_top', tooltip: 'Javascript' },
            { image: './img/icons/jquery.svg', url: '', width: tagWidth * 1.5, height: tagHeight, target: '_top', tooltip: 'jQuery' },
            { image: './img/icons/bootstrap.svg', url: '', width: tagWidth / 1.5, height: tagHeight / 1.5, target: '_top', tooltip: 'Bootstrap' },
            { image: './img/icons/sass.svg', url: '', width: tagWidth, height: tagHeight, target: '_top', tooltip: 'SCSS (SASS)' },
            { image: './img/icons/pug.svg', url: '', width: tagWidth, height: tagHeight, target: '_top', tooltip: 'Pug' },
            { image: './img/icons/bem.svg', url: '', width: tagWidth, height: tagHeight, target: '_top', tooltip: 'BEM' },
            { image: './img/icons/gulp.svg', url: '', width: tagWidth, height: tagHeight, target: '_top', tooltip: 'Gulp' },
            { image: './img/icons/git.svg', url: '', width: tagWidth / 1.25, height: tagHeight / 1.25, target: '_top', tooltip: 'Git' },
            { image: './img/icons/react.svg', url: '', width: tagWidth / 1.15, height: tagHeight / 1.15, target: '_top', tooltip: 'ReactJs' },
            { image: './img/icons/redux.svg', url: '', width: tagWidth / 1.25, height: tagHeight / 1.25, target: '_top', tooltip: 'Redux' },
            { image: './img/icons/typescript.svg', url: '', width: tagWidth / 1.5, height: tagHeight / 1.5, target: '_top', tooltip: 'TypeScript' }

        ],
        width: tagCloudSize,
        height: tagCloudSize,
        speed: 0.2,
        bgDraw: false,
        opacityOut: .2,
        tooltipDiffY: 20,
        tooltipTextAnchor: 'start',
        tooltipFontWeight: 'bold',
    });

    $('.tagCloud a').on('click', (event) => event.preventDefault());

    //======================================== 3D Cards ==============================
    let currentSlideNum = 0,
        slideItemsCount,
        slideCount,
        delayDbc = 1000;


    (function () {
        let colsInSlideCount = Math.floor($('.slider').width() / $('.card').outerWidth(true));
        let rowsInSlideCount = Math.floor(($(window).innerHeight() - $('.slider').offset().top - $('.nav').height()) / ($('.card').outerHeight(true)));
        if (colsInSlideCount == 1 || colsInSlideCount == 0) {
            slideItemsCount = rowsInSlideCount;
        } else if (rowsInSlideCount == 1 || rowsInSlideCount == 0) {
            slideItemsCount = colsInSlideCount;
        } else {
            slideItemsCount = rowsInSlideCount * colsInSlideCount;
        }

        slideCount = Math.ceil($('.card').length / slideItemsCount);

        $('.card').hide();
        $(`.card:lt(${slideItemsCount})`).show();

        if (slideCount == 1) {
            $('.nav__prevBtn').hide();
            $('.nav__nextBtn').hide();
        } else {
            for (let i = 0; i < slideCount; i++) {
                $('.nav__nextBtn').before(`<div class="nav__dot" data-targetPos="${i}"></div>`);
                if (i == currentSlideNum) {
                    $(`.nav__dot[data-targetPos="${i}"]`).addClass('nav__dot_active');
                }
            }
        }

        $('.nav__prevBtn').addClass('_disable');
    })()

    let debounceCardAnimation = debounce(cardAnimation, delayDbc + Math.round(delayDbc / slideItemsCount));

    var hammertime = new Hammer(document.querySelector('.slider'));
    hammertime.on('swipeleft', function (ev) {
        checkPos({ toSlideNum: currentSlideNum + 1 });
    });

    hammertime.on('swiperight', function (ev) {
        checkPos({ toSlideNum: currentSlideNum - 1 });
    });

    $('.nav__dot').on('click', function () {
        let toSlide = +$(this).attr('data-targetPos');
        checkPos({ toSlideNum: toSlide });
    })

    $('.nav__nextBtn').on('click', function () {
        checkPos({ toSlideNum: currentSlideNum + 1 });
    })

    $('.nav__prevBtn').on('click', function () {
        checkPos({ toSlideNum: currentSlideNum - 1 });
    })

    function checkPos(settings) {

        if (settings.toSlideNum == currentSlideNum) {
            return false
        } else if (settings.toSlideNum > slideCount - 1) {
            return false
        } else if (settings.toSlideNum < 0) {
            return false
        }

        debounceCardAnimation(settings);
    }

    function cardAnimation(settings) {

        let {
            delay = Math.floor(delayDbc / slideItemsCount),
            animationSpeed = Math.floor(delayDbc / slideItemsCount),
            toSlideNum,
        } = settings;

        let delayPos = 0;

        $('.nav__dot_active').removeClass('nav__dot_active');
        $(`.nav__dot[data-targetPos="${toSlideNum}"]`).addClass('nav__dot_active');

        if (toSlideNum == 0) {
            $('.nav__prevBtn').addClass('_disable');
            $('.nav__nextBtn').removeClass('_disable');
        } else if (toSlideNum == slideCount - 1) {
            $('.nav__nextBtn').addClass('_disable');
            $('.nav__prevBtn').removeClass('_disable');
        } else {
            $('.nav__nextBtn').removeClass('_disable');
            $('.nav__prevBtn').removeClass('_disable');
        }

        if (toSlideNum < currentSlideNum) {
            for (let i = 0; i < slideItemsCount; i++) {
                $(`.card:eq(${i + currentSlideNum * slideItemsCount})`).delay(delayPos * delay).fadeOut(animationSpeed);
                delayPos++;
                $(`.card:eq(${i + toSlideNum * slideItemsCount})`).delay(delayPos * delay).fadeIn(animationSpeed);
            }
        }

        if (toSlideNum > currentSlideNum) {
            for (let i = slideItemsCount - 1; i >= 0; i--) {
                $(`.card:eq(${i + currentSlideNum * slideItemsCount})`).delay(delayPos * delay).fadeOut(animationSpeed);
                delayPos++;
                $(`.card:eq(${i + toSlideNum * slideItemsCount})`).delay(delayPos * delay).fadeIn(animationSpeed);
            }
        }
        currentSlideNum = toSlideNum;
    }

    $(window).resize(() => {
        if (!$('.contact').hasClass('active')) {
            location.reload();
        }
    });

    function debounce(f, ms) {

        let isCooldown = false;

        return function () {

            if (isCooldown) return;
            f.apply(this, arguments);
            isCooldown = true;
            setTimeout(() => isCooldown = false, ms);
        };
    }

    //===================================== ЗАПРОС В ГУГЛ ТАБЛИЦУ ====================================

    $('form').submit(function () {
        let srcHTML = $('form').html();
        let defaultHeight = $('form').css('height')
        $.ajax({
            type: "POST",
            url: "https://script.google.com/macros/s/AKfycbwcNzUW-PunhhFQEKO4qFWipC-dV5lUChVeV5fF0BmmIF7TcOE/exec",
            data: $('form').serialize(),
            success: function (data) {
                $('form').html(`<div style="height: calc(${defaultHeight} - 20px)" class="response"><p>${data}</p></div>`);
                setTimeout(() => {
                    $('form').html(srcHTML);
                }, 5000);
            },
            error: function (err) {
                $('form').html(`<div style="height: calc(${defaultHeight} - 20px)" class="response"><p>An error occurred while sending the message. Please try again<br>Erorr: ${err}</p></div>`);
                setTimeout(() => {
                    $('form').html(srcHTML);
                }, 10000);
            }
        });
        return false;
    })

    window.onload = function () {
        $('.preloader').hide();
    }

});