
$(document).ready(function() {
    console.log("Document loaded");

    try {
        $('#about').ripples({
			resolution: 512,
			dropRadius: 20,
            perturbance: 0.1
		});
    } catch (e) {
        $('.error').show().text(e);
    }
});
