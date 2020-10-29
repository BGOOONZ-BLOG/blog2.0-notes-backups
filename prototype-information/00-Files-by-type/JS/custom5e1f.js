var gameInstance = null;
(function ($) {

    /* ---------------------------------------------- /*
     * Preloader
     /* ---------------------------------------------- */

    $(window).load(function () {
        $('.loader').fadeOut();
        $('.page-loader').delay(350).fadeOut('slow');
    });

    $(document).ready(function () {

        /* ---------------------------------------------- /*
         * Initialization General Scripts for all pages
         /* ---------------------------------------------- */

        var moduleHero = $('.module-hero'),
            module = $('.module-hero, .module, .module-small'),
            navbar = $('.navbar-custom'),
            navHeight = navbar.height(),
            worksgrid = $('#works-grid'),
            width = Math.max($(window).width(), window.innerWidth),
            mobileTest;

        if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
            mobileTest = true;
        }

        buildModuleHero(moduleHero);
        navbarCheck(navbar);
        navbarAnimation(navbar, moduleHero, navHeight);
        navbarSubmenu(width);
        hoverDropdown(width, mobileTest);

        $(window).resize(function () {
            var width = Math.max($(window).width(), window.innerWidth);
            buildModuleHero(moduleHero);
            hoverDropdown(width);
        });

        $(window).scroll(function () {
            effectsModuleHero(moduleHero, this);
            navbarAnimation(navbar, moduleHero, navHeight);
        });

        /* ---------------------------------------------- /*
         * Set module backgrounds
         /* ---------------------------------------------- */

        module.each(function (i) {
            if ($(this).attr('data-background')) {
                $(this).css('background-image', 'url(' + $(this).attr('data-background') + ')');
            }
        });

        /* ---------------------------------------------- /*
         * Full height module
         /* ---------------------------------------------- */

        function buildModuleHero(moduleHero) {
            if (moduleHero.length > 0) {
                if (moduleHero.hasClass('module-full-height')) {
                    moduleHero.height($(window).height());
                } else {
                    moduleHero.height($(window).height() * 0.85);
                }
            }
        };

        /* ---------------------------------------------- /*
         * Hero module parallax, fade
         /* ---------------------------------------------- */

        function effectsModuleHero(moduleHero, scrollTopp) {
            if (moduleHero.length > 0) {
                var homeSHeight = moduleHero.height();
                var topScroll = $(document).scrollTop();
                if ((moduleHero.hasClass('module-parallax')) && ($(scrollTopp).scrollTop() <= homeSHeight)) {
                    moduleHero.css('top', (topScroll * 0.55));
                }
                if (moduleHero.hasClass('module-fade') && ($(scrollTopp).scrollTop() <= homeSHeight)) {
                    moduleHero.css('opacity', (1 - topScroll / moduleHero.height() * 1));
                }
            }
        };

        /* ---------------------------------------------- /*
         * Hero slider setup
         /* ---------------------------------------------- */

        if (mobileTest != true) {
            directionNav = true;
        } else {
            directionNav = false;
        }

        if ($('.hero-slider').length > 0) {
            $('.hero-slider').flexslider({
                                             animation: 'fade',
                                             animationSpeed: 1000,
                                             animationLoop: true,
                                             directionNav: directionNav,
                                             prevText: '',
                                             nextText: '',
                                             start: function (slider) {
                                                 heroSliderLight();
                                             },
                                             before: function (slider) {
                                                 if (mobileTest != true) {
                                                     $('.hs-caption').fadeOut().animate({top: '-80px'}, {queue: false, easing: 'swing', duration: 700});
                                                     slider.slides.eq(slider.currentSlide).delay(500);
                                                     slider.slides.eq(slider.animatingTo).delay(500);
                                                 }
                                             },
                                             after: function (slider) {
                                                 heroSliderLight();
                                                 if (mobileTest != true) {
                                                     $('.hs-caption').fadeIn().animate({top: '0'}, {queue: false, easing: 'swing', duration: 700});
                                                 }
                                             },
                                             useCSS: true
                                         });
        }
        ;

        /* ---------------------------------------------- /*
         * Change color on light slide
         /* ---------------------------------------------- */

        function heroSliderLight() {
            if ($('li.bg-light').hasClass('flex-active-slide')) {
                navbar.addClass('nabar-dark');
                $('.hero-slider').addClass('hero-slider-dark');
            } else {
                navbar.removeClass('nabar-dark');
                $('.hero-slider').removeClass('hero-slider-dark');
            }
        }

        /* ---------------------------------------------- /*
         * Hero slider pause on scroll
         /* ---------------------------------------------- */

        if ($('.hero-slider').length > 0) {
            $(window).scroll(function () {
                var st = $(window).scrollTop();
                if (st > 0) {
                    $('.hero-slider').flexslider('pause');
                }
            });
        }

        /* ---------------------------------------------- /*
         * Transparent navbar animation
         /* ---------------------------------------------- */

        function navbarCheck() {
            if (navbar.length > 0 && navbar.hasClass('navbar-transparent')) {
                navbatTrans = true;
            } else {
                navbatTrans = false;
            }
        }

        function navbarAnimation(navbar, moduleHero, navHeight) {
            var topScroll = $(window).scrollTop();
            if (navbar.length > 0 && navbatTrans != false) {
                if (topScroll >= navHeight) {
                    navbar.removeClass('navbar-transparent');
                } else {
                    navbar.addClass('navbar-transparent');
                }
            }
        };

        /* ---------------------------------------------- /*
         * Navbar collapse on click
         /* ---------------------------------------------- */

        $(document).on('click', '.navbar-collapse.in', function (e) {
            if ($(e.target).is('a') && $(e.target).attr('class') != 'dropdown-toggle') {
                $(this).collapse('hide');
            }
        });

        /* ---------------------------------------------- /*
         * Navbar submenu
         /* ---------------------------------------------- */

        function navbarSubmenu(width) {
            if (width > 767) {
                $('.navbar-custom .navbar-nav > li.dropdown').hover(function () {
                    var MenuLeftOffset = $('.dropdown-menu', $(this)).offset().left;
                    var Menu1LevelWidth = $('.dropdown-menu', $(this)).width();
                    if (width - MenuLeftOffset < Menu1LevelWidth * 2) {
                        $(this).children('.dropdown-menu').addClass('leftauto');
                    } else {
                        $(this).children('.dropdown-menu').removeClass('leftauto');
                    }
                    if ($('.dropdown', $(this)).length > 0) {
                        var Menu2LevelWidth = $('.dropdown-menu', $(this)).width();
                        if (width - MenuLeftOffset - Menu1LevelWidth < Menu2LevelWidth) {
                            $(this).children('.dropdown-menu').addClass('left-side');
                        } else {
                            $(this).children('.dropdown-menu').removeClass('left-side');
                        }
                    }
                });
            }
        };

        /* ---------------------------------------------- /*
         * Navbar hover dropdown on desktop
         /* ---------------------------------------------- */

        function hoverDropdown(width, mobileTest) {
            if ((width > 767) && (mobileTest != true)) {
                $('.navbar-custom .navbar-nav > li.dropdown, .navbar-custom li.dropdown > ul > li.dropdown').removeClass('open');
                var delay = 0;
                var setTimeoutConst;
                $('.navbar-custom .navbar-nav > li.dropdown, .navbar-custom li.dropdown > ul > li.dropdown').hover(function () {
                                                                                                                       var $this = $(this);
                                                                                                                       setTimeoutConst = setTimeout(function () {
                                                                                                                           $this.addClass('open');
                                                                                                                           $this.find('.dropdown-toggle').addClass('disabled');
                                                                                                                       }, delay);
                                                                                                                   },
                                                                                                                   function () {
                                                                                                                       clearTimeout(setTimeoutConst);
                                                                                                                       $(this).removeClass('open');
                                                                                                                       $(this).find('.dropdown-toggle').removeClass('disabled');
                                                                                                                   });
            } else {
                $('.navbar-custom .navbar-nav > li.dropdown, .navbar-custom li.dropdown > ul > li.dropdown').unbind('mouseenter mouseleave');
                $('.navbar-custom [data-toggle=dropdown]').not('.binded').addClass('binded').on('click', function (event) {
                    event.preventDefault();
                    event.stopPropagation();
                    $(this).parent().siblings().removeClass('open');
                    $(this).parent().siblings().find('[data-toggle=dropdown]').parent().removeClass('open');
                    $(this).parent().toggleClass('open');
                });
            }
        };

        /* ---------------------------------------------- /*
         * Youtube video background
         /* ---------------------------------------------- */

        if (mobileTest != true) {
            /*$(function() {
             $(".video-player").mb_YTPlayer();
             });*/

            $('.video-controls-box a').css('visibility', 'visible');
            var vid = document.getElementById("bgvid");

            $('#video-play').click(function (event) {
                event.preventDefault();
                if ($(this).hasClass('fa-play')) {
                    vid.play();
                    //$('.video-player').playYTP();
                } else {
                    //$('.video-player').pauseYTP();
                    vid.pause();
                }
                $(this).toggleClass('fa-play fa-pause');
                return false;
            });

            $('#video-volume').click(function (event) {
                event.preventDefault();

                if ($(this).hasClass('fa-volume-off')) {
                    $("video").prop('muted', false);
                } else {
                    $("video").prop('muted', true);
                }
                $(this).toggleClass('fa-volume-off fa-volume-up');
                return false;
            });

            /*	$('.video-player').on("YTPStart",function(e){
             $('.loader').fadeOut();
             $('.page-loader').delay(350).fadeOut('slow');
             //your code goes here
             });*/
        }

        /* ---------------------------------------------- /*
         * Portfolio
         /* ---------------------------------------------- */
        /*
         var worksgrid_mode;
         if (worksgrid.hasClass('works-grid-masonry')) {
         worksgrid_mode = 'masonry';
         } else {
         worksgrid_mode = 'fitRows';
         }

         worksgrid.imagesLoaded(function() {
         worksgrid.isotope({
         layoutMode: worksgrid_mode,
         itemSelector: '.work-item',
         });
         });

         $('#filters a').click(function() {
         $('#filters .current').removeClass('current');
         $(this).addClass('current');
         var selector = $(this).attr('data-filter');

         worksgrid.isotope({
         filter: selector,
         animationOptions: {
         duration: 750,
         easing: 'linear',
         queue: false
         }
         });

         return false;
         });
         */
        /* ---------------------------------------------- /*
         * Post slider
         /* ---------------------------------------------- */

        $('.post-images-slider').flexslider({
                                                animation: 'slide',
                                                smoothHeight: true,
                                            });


        /* ---------------------------------------------- /*
         * Progress bars, counters animations
         /* ---------------------------------------------- */

        $('.progress-bar').each(function (i) {
            $(this).appear(function () {
                var percent = $(this).attr('aria-valuenow');
                $(this).animate({'width': percent + '%'});
                $(this).find('span').animate({'opacity': 1}, 900);
                $(this).find('span').countTo({from: 0, to: percent, speed: 900, refreshInterval: 30});
            });
        });

        $('.counter-item').each(function (i) {
            $(this).appear(function () {
                var number = $(this).find('.counter-number').data('number');
                $(this).find('.counter-number span').countTo({from: 0, to: number, speed: 1200, refreshInterval: 30});
            });
        });

        /* ---------------------------------------------- /*
         * WOW Animation When You Scroll
         /* ---------------------------------------------- */

        wow = new WOW({
            mobile: false
        });
        wow.init();

        /* ---------------------------------------------- /*
         * Popup images
         /* ---------------------------------------------- */

        $('a.popup').magnificPopup({
                                       type: 'image',
                                       gallery: {
                                           enabled: true,
                                           navigateByImgClick: true,
                                           preload: [0, 1]
                                       },
                                       image: {
                                           titleSrc: 'title',
                                           tError: 'The image could not be loaded.',
                                       }
                                   });

        /* ---------------------------------------------- /*
         * Rotate
         /* ---------------------------------------------- */

        /*$(".rotate").textrotator({
         animation: "dissolve",
         separator: "|",
         speed: 3000
         });*/

        // /* ---------------------------------------------- /*
        //  * A jQuery plugin for fluid width video embeds
        //  /* ---------------------------------------------- */
        //
        // $('body').fitVids();
        //
        // /* ---------------------------------------------- /*
        //  * Scroll Animation
        //  /* ---------------------------------------------- */
        //
        // $('.section-scroll').bind('click', function (e) {
        //     var anchor = $(this);
        //     $('html, body').stop().animate({
        //                                        scrollTop: $(anchor.attr('href')).offset().top
        //                                    }, 1000);
        //     e.preventDefault();
        // });

        /* ---------------------------------------------- /*
         * Scroll top
         /* ---------------------------------------------- */

        $(window).scroll(function () {
            if ($(this).scrollTop() > 100) {
                $('.scroll-up').fadeIn();
            } else {
                $('.scroll-up').fadeOut();
            }
        });

        $('a[href="#totop"]').click(function () {
            $('html, body').animate({scrollTop: 0}, 'slow');
            return false;
        });

        /* ---------------------------------------------- /*
         * Scroll top
         /* ---------------------------------------------- */

        $(".article-image-container").on("mouseenter", function (event) {
            $(event.target).find(".image-description").first().fadeTo(300, 1);
        })

        $(".article-image-container").on("mouseleave", function (event) {
            $(event.target).find(".image-description").first().fadeTo(200, 0);
        })


        /*// Initialize unity on click
        $("#simulation-preview").click(function(){
            $("#simulation-preview").hide();
            $("#simulation-container").show();

            var unityScript = document.createElement('script');
            unityScript.src = '../../../demo/webgl/medical-simulation/Release/UnityLoader.js';
            document.head.appendChild(unityScript);
        });*/


        // Initialize Cancer unity on click
        $("#simulation-preview").click(function () {
            $("#simulation-preview").hide();
            $("#simulation-container").show();

            var unityScript = document.createElement('script');
            unityScript.src = '/webgl/medical-simulation/Release/UnityLoader.js';
            document.head.appendChild(unityScript);
        });

        // Initialize Hepatitis C unity on click
        $("#hepatitis-simulation-preview").click(function () {
            $("#hepatitis-simulation-preview").hide();
            $("#simulation-container").show();

            var unityScript = document.createElement('script');
            unityScript.src = '/webgl/hepatitide-c/Release/UnityLoader.js';
            document.head.appendChild(unityScript);
        });

        // Initialize DM1 unity on click
        $("#insulin-simulation-preview").click(function () {
            $("#insulin-simulation-preview").hide();
            $("#gameContainer").show();
            $("#simulation-container").show();

            gameInstance = UnityLoader.instantiate("gameContainer", "/webgl/insulin_simulation_2_01/Build/insulin_simulation_2.json", {onProgress: UnityProgress});

        });

        // Initialize TNF unity on click
        $("#tnf-simulation-preview").click(function () {
            $("#tnf-simulation-preview").hide();
            $("#gameContainer").show();
            $("#simulation-container").show();

            gameInstance = UnityLoader.instantiate("gameContainer", "/webgl/tn_simulation/Build/tn_simulation.json", {onProgress: UnityProgress});

        });

        // Initialize Bacteriofage unity on click
        $("#bacteriophage-simulation-preview").click(function () {
            $("#bacteriophage-simulation-preview").hide();
            $("#gameContainer").show();
            $("#simulation-container").show();
            gameInstance = UnityLoader.instantiate("gameContainer", "/webgl/bacteriophage/Build/WebGl.json");
        });



        // Test yourself
        $("#resetButton").click(function () {
            $('input:radio').prop('checked', false);
            $(this).blur();

            return true;

        });

        $("#submitButton").click(function (event) {
            event.preventDefault();
            var correct = [2, 1, 1, 3, 3];
            var answers = [];

            answers.push($('input[name=q1]:checked').val());
            answers.push($('input[name=q2]:checked').val());
            answers.push($('input[name=q3]:checked').val());
            answers.push($('input[name=q4]:checked').val());
            answers.push($('input[name=q5]:checked').val());

            $(this).blur();

            if (correct.toString() == answers.toString()) {
                $('#successMessage').show();
                $('#errorMessage').hide();
                $('#resultsModal').modal('show');
            }
            else {
                $('#successMessage').hide();
                $('#errorMessage').show();
                $('#resultsModal').modal('show');
            }
        });

        // Accordion slider
        if (typeof $('.isa-accordion').accordionSlider === "function") {
            $('.isa-accordion').accordionSlider({
                                                    width: 1140,
                                                    height: 600
                                                });

        }
    });

})(jQuery);