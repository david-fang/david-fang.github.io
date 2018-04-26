
function Utils() {}

Utils.prototype = {
    constructor: Utils,
    isElementInView: function (element, fullyInView) {
        var pageTop = $(window).scrollTop();
        var pageBottom = pageTop + $(window).height();
        var elementTop = $(element).offset().top;
        var elementBottom = elementTop + $(element).height();

        if (fullyInView === true) {
            return ((pageTop < elementTop) && (pageBottom > elementBottom));
        } else {
            return ((elementTop <= pageBottom) && (elementBottom >= pageTop));
        }
    }
};

var Utils = new Utils();

var navigationComplete = true;
var mediaButtonsAnimated = false;

$(document).ready(function() {
    $('html, body').css('overflow', 'hidden');
    $('body').prepend('<div class="loading-screen">' 
            +   '<div class="spinner">'
            +       '<div class="dot1"></div>'
            +       '<div class="dot2"></div>'
            +   '</div>'
            + '</div>');

    initNavigatorPosition();
    refreshScrollListener();
    setupNavigationHandlers();

    $(window).resize(function() {
        refreshScrollListener();
    });
});

$(window).on("load", function() {
    setTimeout(function() {
        $('html, body').css('overflow', 'visible');
        $('.loading-screen').fadeOut(function() {
            initNavigatorPosition();    
        });
    }, 500);
    animateTitle();
});

function animateTitle() {    
    $('.ml12').each(function() {
        $(this).html($(this).text().replace(/([^\x00-\x80]|\w)/g, "<span class='letter'>$&</span>"));
    });

    anime.timeline({loop: false})
    .add({
        update: function(anim) {
            $('.slogan').css('opacity', '0');
            $('.logo').css('opacity', '0');
        }
    }).add({
        targets: '.ml12 .letter',
        translateX: [40,0],
        translateZ: 0,
        opacity: [0,1],
        easing: "easeOutQuad",
        duration: 1200,
        delay: function(el, i) {
            return 500 + 30 * i;
        }
    }).add({
        targets: '.slogan, .logo',
        easing: "linear",
        opacity: [0,1],
        duration: 400,
        offset: '-=400'
    });
}

function animateMediaButtons() {
    anime.timeline({loop: false})
    .add({
        targets: '#linkedin-button',
        scale: 1.0,
        easing: "easeInExpo",
        duration: 600
    }).add({
        targets: '#github-button',
        scale: 1.0,
        easing: "easeInExpo",
        duration: 600,
        offset: "-=50"
    }).add({
        targets: '#resume-button',
        scale: 1.0,
        easing: "easeInExpo",
        duration: 600,
        offset: "-=50"
    }).add({
        targets: '#spotify-button',
        scale: 1.0,
        easing: "easeInExpo",
        duration: 600,
        offset: "-=50"
    })
}

function initNavigatorPosition() {
    let projectsPosition = $('#projects').offset();                             // jQuery Function Number #1 -- offset()
    if ($(window).scrollTop() > projectsPosition.top){                          // jQuery Function Number #2 -- scrollTop()
        $('#projects-navigator').css('position', 'fixed').css('top', '0');      // jQuery Function Number #3 -- css()
    } else {
        $('#projects-navigator').css('position', 'absolute');
    }
    
    if (Utils.isElementInView($('#projects'), false)) {
        var active_id = $('.active-button').attr('id');

        if (Utils.isElementInView($('#intro-container'), false)) {
            if (active_id != 'intro-button') {
                $('#' + active_id).removeClass('active-button');                // jQuery Function Number #4 -- removeClass() 
                $('#intro-button').addClass('active-button');                   // jQuery Function Number #5 -- addClass() 
            }
        } else if (Utils.isElementInView($('#gpctrl-container'), false)) {
            if (active_id != 'gpctrl-button') {
                $('#' + active_id).removeClass('active-button');
                $('#gpctrl-button').addClass('active-button');
            }
        } else if (Utils.isElementInView($('#azlyrics-container'), false)) {
            if (active_id != 'azlyrics-button') {
                $('#' + active_id).removeClass('active-button');
                $('#azlyrics-button').addClass('active-button');
            }
        } else if (Utils.isElementInView($('#moss-container'), false)) {
            if (active_id != 'moss-button') {
                $('#' + active_id).removeClass('active-button');
                $('#moss-button').addClass('active-button');
            }
        }
    }

}

function setupNavigationHandlers() {
    let prefixes = ["gpctrl", "azlyrics", "moss"];

    for (i in prefixes) {
        let prefix = prefixes[i];
        let button_id = "#" + prefix + "-button";
        let container_id = "#" + prefix + "-container";

        $(button_id).click(function() {                                         // jQuery Function Number #6 -- click()
            let active_id = '#' + $('.active-button').attr('id');
            if (active_id === button_id || !navigationComplete) {
                return
            }

            navigationComplete = false;
            $('html, body').animate({
                scrollTop: $(container_id).offset().top - ((window.innerHeight - $(container_id).height()) / 2)
            }, 1000, function() {
                navigationComplete = true;
            });
        });
    }

    $('#intro-button').click(function() {
        $('html, body').animate({
            scrollTop: $('#intro-container').offset().top
        }, 500);
    });
}

function refreshScrollListener() {
    $(window).scroll(function() {
        initNavigatorPosition();
    });
}
