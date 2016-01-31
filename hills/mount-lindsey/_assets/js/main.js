// JavaScript Document

// codekit pre-prends

// set initial variables
var $showMenu,
	$header,
	$content;

$(function() {
	firstLoad();
});

function firstLoad() {
	initVars();
	showMenu();
	checkScreenSize();
	initPlaceholders();
}

// function to set dom vars, etc that will not change
function initVars() {
	$nav 	= $('header.main nav.main-nav ul');
	$showMenu 	= $('a#showMenu');
}

$(window).resize(function() {
	checkScreenSize();
});

// checks to see if screen size requires mobile menu
function checkScreenSize(){
	if ($(window).width() < 950) {
		$nav.removeClass('expand');
	} else {
		$nav.removeClass('expand');
	}
}

// show hide left menu
function showMenu(){
	$showMenu.click(function(){
		if ($nav.hasClass('expand')) {
			menuOut();
		} else {
			menuIn();
		}
		return false;
	});
}
function menuOut() {
	$nav.removeClass('expand');
	//$content.unbind('click',menuOut);
}
function menuIn() {
	$nav.addClass('expand');
	//$content.bind('click',menuOut);
}

// this function fixes placeholders in browsers that don't support it
function initPlaceholders() {
	if ($('input[placeholder]').length > 0) {
		if (!placeholderSupported()) {
			$('input[placeholder]').focus(function() {
				var input = $(this);
				if (input.val() == input.attr('placeholder')) {
					input.val('');
					input.removeClass('placeholder');
				}
			}).blur(function() {
				var input = $(this);
				if (input.val() == '' || input.val() == input.attr('placeholder')) {
					input.addClass('placeholder');
					input.val(input.attr('placeholder'));
				}
			}).blur();
			$('input[placeholder]').parents('form').submit(function() {
				$(this).find('[placeholder]').each(function() {
					var input = $(this);
					if (input.val() == input.attr('placeholder')) {
						input.val('');
					}
				})
			});
		}
	}
}
function placeholderSupported() {
    test = document.createElement('input');
    return ('placeholder' in test);
}