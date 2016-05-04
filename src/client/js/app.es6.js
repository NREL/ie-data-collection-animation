((window) => {

    'use strict'

    const puppetmaster = {

        init( carousel ) {
            this.checkItem( carousel )
            // bind event handlers
            $( carousel ).on( 'slid.bs.carousel', e => {
                this.checkItem( carousel )

                this.animateSlide(e.relatedTarget)
            })


            // wait 2 seconds then start the show
            setTimeout( () => {
                console.log('go!')
                const firstSlide = $(carousel).find('.item.active')[0]
                this.animateSlide( firstSlide )
            }, 2000)

        },

        checkItem(carousel) {
            const $this = $(carousel)

            if ($('.carousel-inner .item:first').hasClass('active')) {
                $this.find('.left.carousel-control').hide();
            } else if ($('.carousel-inner .item:last').hasClass('active')) {
                $this.find('.right.carousel-control').hide();
            } else {
                $this.find('.carousel-control').show();

            }
        },

        animateSlide(slide) {

            const puppets = []

            $(slide).find( '[data-animate="true"]' ).each( ( idx, el ) => {
                puppets.push( el )
            })

            puppets.sort( (a, b) => {
                return $(a).data('animateOrder') > $(b).data('animateOrder')
            })
            .forEach( puppet => {
                this.animateElement( puppet )
            })


        },

        animateElement( el ) {
            //const ms = 0 // Math.floor(Math.random() * 1000) + 100
            const ms = $(el).data('animateOrder') * 100
            const style = $(el).data( 'animateStyle' ) || 'dropBounce'
            let easing = 'easeOutBounce'
            let props = { top: 0 }

            switch ( style ) {

                case 'dropBounce':
                    easing = 'easeOutBounce'
                    $( el ).delay(ms).animate( props, 2000, easing )
                    break

                case 'slideRight':
                    var ph = $(el).parent().height()
                    var h = $(el).css( 'height' ).slice(0,-2)
                    //$(el).offset( {top: ph - h } )
                    $(el).addClass( `delay-${ms}` )
                    $(el).removeClass( 'off-stage-left' )


                    $(el).addClass( 'move-right-10' )



                    // easing = 'linear'
                    // props = { left: 0 }
                    // $( el ).delay(ms).animate( props, 2000 )
                    break

            }
        },

        stopAllAnimation() {
            console.log('stop')
        }
    }


    $(document).ready( function(){

        const context = document.querySelector('#carousel')

        puppetmaster.init(context)

    })

})(window)
