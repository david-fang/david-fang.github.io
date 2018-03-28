
$(document).ready(function() {
    typeText();
});

function typeText() {
    $('#typewriter > h1').typeIt({
        strings: ['CONTENT COMING SOON'],
        startDelay: 1000,
        speed: 90
    });
};
