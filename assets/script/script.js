
$(document).ready(function() {
    typeText()
});

function typeText() {
    $('#typewriter > h1').typeIt({
        strings: ['CONTENT COMING SOON'],
        speed: 100
    });
}