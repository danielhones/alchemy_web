// From this StackOverflow answer - http://stackoverflow.com/a/1063027/3199099
function sort_number(a, b) {
    return a - b;
}

function array_difference(a, b) {
    // Return array of elements that are a but not in b (a - b)
    // from this SO answer - http://stackoverflow.com/a/4026828/3199099
    return a.filter(function(i) { return b.indexOf(i) < 0; });
}

function show_modal(modal_id) {
    document.getElementById("modal-backdrop").style.display = "block";
    document.getElementById("modal-wrapper").style.display = "block";
    document.getElementById(modal_id).style.display = "block";
    var modal_title = document.getElementById(modal_id).getAttribute("data-title");
    if (modal_title) {
	document.getElementById("modal-header-title").innerHTML = modal_title;
    }
}

function hide_modal() {
    document.getElementById("modal-backdrop").style.display = "none";
    document.getElementById("modal-wrapper").style.display = "none";
    document.getElementById("modal-header-title").innerHTML = "";
    var modal_views = document.querySelectorAll("modal-wrapper div.modal-content");
    for (var i = 0; i < modal_views.length; i++) {
	modal_views[i].style.display = "none";
    }
}

(function() {
    document.getElementById("modal-close-button").onclick = hide_modal;
})();

function remove_hover_effect_for_touch_devices(css_name) {
    // From this SO answer - http://stackoverflow.com/a/15439809/3199099
    var is_touch_device = (('ontouchstart' in window) || (navigator.msMaxTouchPoints > 0));

    if (is_touch_device) {
	var stylesheet = false;
	for (var i = 0; i < document.styleSheets.length; i++) {
	    if (document.styleSheets[i].href.endsWith(css_name)) {
		stylesheet = document.styleSheets[i];
		break;
	    }
	}
	if (stylesheet === false) {
	    return false;  // didn't find stylesheet
	}
	for (var i = 0; i < stylesheet.cssRules.length; i++) {
	    var rule_matches = (stylesheet.cssRules[i].selectorText !== undefined &&
				stylesheet.cssRules[i].selectorText.indexOf(":hover") !== -1);
	    if (rule_matches) {
		stylesheet.deleteRule(i);
	    }
	}
    }
}

// Add cookie handler function

