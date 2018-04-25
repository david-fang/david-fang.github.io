
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

var nav_index = 0;

$(document).ready(function() {

    refreshScrollListener();
    initNavigatorPosition();
    setupNavigationHandlers();

    $(window).resize(function() {
        refreshScrollListener();
    });
});

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
            $('html, body').animate({
                scrollTop: $(container_id).offset().top - ((window.innerHeight - $(container_id).height()) / 2)
            }, 1000);
        });
    }

    $('#intro-button').click(function() {
        $('html, body').animate({
            scrollTop: $('#intro-container').offset().top
        }, 1000);
    });
}

function refreshScrollListener() {
    $(window).scroll(function() {
        initNavigatorPosition();

        
    });
}

