'use strict';

(function (window) {

    'use strict';

    var puppetmaster = {
        init: function init(container) {
            var _this = this;

            // bind event handlers
            $(container).on('slid.bs.carousel', function (e) {
                _this.animateSlide(e.relatedTarget);
            });

            // wait 2 seconds then start the show
            setTimeout(function () {
                console.log('go!');
                var firstSlide = $(container).find('.item.active')[0];
                _this.animateSlide(firstSlide);
            }, 2000);
        },
        animateSlide: function animateSlide(slide) {
            var _this2 = this;

            var puppets = [];

            $(slide).find('[data-animate="true"]').each(function (idx, el) {
                puppets.push(el);
            });

            puppets.sort(function (a, b) {
                return $(a).data('animateOrder') > $(b).data('animateOrder');
            }).forEach(function (puppet) {
                _this2.animateElement(puppet);
            });
        },
        animateElement: function animateElement(el) {
            var ms = Math.floor(Math.random() * 1000) + 100;
            var style = $(el).data('animateStyle') || 'dropBounce';
            var easing = 'easeOutBounce';
            var props = { top: 0 };

            switch (style) {
                case 'dropBounce':
                    easing = 'easeOutBounce';
                    $(el).delay(ms).animate(props, 2000, easing);
                    break;
                case 'slideRight':
                    easing = 'linear';
                    props = { left: 0 };
                    $(el).delay(ms).animate(props, 2000);
                    break;

            }
        },
        stopAllAnimation: function stopAllAnimation() {
            console.log('stop');
        }
    };

    $(document).ready(function () {

        var context = document.querySelector('#carousel');

        puppetmaster.init(context);
    });
})(window);