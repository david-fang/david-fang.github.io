
var Utils = new Utils();

$(document).ready(function() {
    refreshScrollListener();
    initNavigatorPosition();
    setupNavigationHandlers();

    $(window).resize(function() {
        refreshScrollListener();
    });

    // var aboutInView = Utils.isElementInView($('#about'), false);

    // if (aboutInView) {
    //     try {
    //         $('#about').ripples({
    //             resolution: 512,
    //             dropRadius: 20,
    //             perturbance: 0.1
    //         });
    //     } catch (e) {
    //         $('.error').show().text(e);
    //     }
    // }

});

function initNavigatorPosition() {
    let projectsPosition = $('#projects').offset();                             // jQuery Function Number #1 -- offset()
    if ($(window).scrollTop() > projectsPosition.top){                          // jQuery Function Number #2 -- scrollTop()
        $('#projects-navigator').css('position', 'fixed').css('top', '0');      // jQuery Function Number #3 -- css()
    } else {
        $('#projects-navigator').css('position', 'absolute');                   // jQuery Function Number #4 -- css()
    }    
}

function setupNavigationHandlers() {
    let prefixes = ["intro", "gpctrl", "azlyrics", "moss"];

    for (i in prefixes) {
        let prefix = prefixes[i];
        let button_id = "#" + prefix + "-button";
        let container_id = "#" + prefix + "-container";

        $(button_id).click(function() {                                         // jQuery Function Number #5 -- click()
            console.log("Called");
            $('html, body').animate({
                scrollTop: $(container_id).offset().top - ((window.innerHeight - $(container_id).height()) / 2)
            }, 1000);
        });
    }
}

function refreshScrollListener() {
    $(window).scroll(function() {
        initNavigatorPosition(); 
    });
}

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
