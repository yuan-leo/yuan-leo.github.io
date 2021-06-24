(function() {
    $(document).foundation();
    (function(document, history, location) {
        var HISTORY_SUPPORT = !! (history && history.pushState);
        var anchorScrolls = {
            ANCHOR_REGEX: /^#[^ ]+$/,
            init: function() {
                this.scrollToCurrent();
                $(window).on('hashchange', $.proxy(this, 'scrollToCurrent'));
                $('body').on('click', 'a', $.proxy(this, 'delegateAnchors'));
            },
            getFixedOffset: function() {
                return $('.sticky-header .fixed').height();
            },
            scrollIfAnchor: function(href, pushToHistory) {
                var match, anchorOffset;
                if (!this.ANCHOR_REGEX.test(href)) {
                    return false;
                }
                match = document.getElementById(href.slice(1));
                if (match) {
                    anchorOffset = $(match).offset().top - this.getFixedOffset();
                    $('html, body').scrollTop(anchorOffset);
                    if (HISTORY_SUPPORT && pushToHistory) {
                        history.pushState({}, document.title, location.pathname + href);
                    }
                }
                return !!match;
            },
            scrollToCurrent: function(e) {
                if (this.scrollIfAnchor(window.location.hash) && e) {
                    e.preventDefault();
                }
            },
            delegateAnchors: function(e) {
                var elem = e.target;
                if (this.scrollIfAnchor(elem.getAttribute('href'), true)) {
                    e.preventDefault();
                }
            }
        };
        $(document).ready($.proxy(anchorScrolls, 'init'));
    })(window.document, window.history, window.location);
})();
(function() {
    $(document).foundation();
})();
(function() {
    $(document).ready(function() {
        $('.chord--footer-scroll-to-top__scroll-link').on('click', function(event) {
	      $('html, body').animate({
		scrollTop: 0
	      }, 800, function(){
		window.location.hash = '';
	      });
		
        });
    });
})();
