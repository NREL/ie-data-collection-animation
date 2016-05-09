'use strict';

(function (window) {

    'use strict';

    var puppetmaster = {
        init: function init(carousel) {
            var _this = this;

            this.checkItem(carousel); // hide the left carousel arrow

            // bind event handlers
            $(carousel).on('slid.bs.carousel', function (e) {
                _this.checkItem(carousel);
                _this.animateSlide(e.relatedTarget);
            });

            // wait 2 seconds then start the show
            setTimeout(function () {
                var firstSlide = $(carousel).find('.item.active')[0];
                _this.animateSlide(firstSlide);
            }, 2000);
        },
        checkItem: function checkItem(carousel) {

            var $this = $(carousel);

            if ($('.carousel-inner .item:first').hasClass('active')) {
                $this.find('.left.carousel-control').hide();
            } else if ($('.carousel-inner .item:last').hasClass('active')) {
                $this.find('.right.carousel-control').hide();
            } else {
                $this.find('.carousel-control').show();
            }
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
            //const ms = 0 // Math.floor(Math.random() * 1000) + 100
            var ms = $(el).data('animateOrder') * 100;
            var pos = $(el).data('slidePercent') || 10;
            var style = $(el).data('animateStyle') || 'dropBounce';

            var easing = 'easeOutBounce';
            var props = { top: 0 };

            switch (style) {

                case 'dropBounce':
                    easing = 'easeOutBounce';
                    $(el).delay(ms).animate(props, 4000, easing);
                    break;

                case 'slideRight':
                    $(el).removeClass('ghost off-stage-left').addClass('delay-' + ms + ' ' + (' move-right-' + pos));

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