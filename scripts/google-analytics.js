var _gaq = _gaq || [];
_gaq.push(['_setAccount', 'UA-72427321-1']);
_gaq.push(['_trackPageview']);

(function() {
  var ga = document.createElement('script'); ga.type = 'text/javascript'; ga.async = true;
  ga.src = 'https://ssl.google-analytics.com/ga.js';
  var s = document.getElementsByTagName('script')[0]; s.parentNode.insertBefore(ga, s);
})();

function trackClicks(e) {
	_gaq.push(['_trackEvent', (e.target.id || e.target.href), 'clicked']);
};

var buttons = document.querySelectorAll('button');
for (var i = 0; i < buttons.length; i++) {
	buttons[i].addEventListener('click', trackClicks);
}

var anchors = document.querySelectorAll('button');
for (var i = 0; i < anchors.length; i++) {
	anchors[i].addEventListener('click', trackClicks);
}