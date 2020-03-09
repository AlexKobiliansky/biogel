$(document).ready(function(){



    //*** mobile-mnu customization *****//
    var mmenu = $('#mobile-mnu');
    var menuLogo = mmenu.data("logo");
    var $mmenu = mmenu.mmenu({
        navbars: [{
            content: [ "<img src=" + menuLogo + " class=\"img-responsive mm-logo\" alt=\"alt\"/>" ],
            height: 3
        }],
        "pageScroll": true,

        "navbar": {
            "title" : "",
        },
        "extensions": [
            "theme-dark",
            "pagedim-black",
            "position-front",
            "fx-listitems-slide",
        ],
    }, {
        offCanvas: {
            pageSelector: "#page-container"
        },
    });

    var mmenuBtn = $("#mmenu-btn");
    var API = $mmenu.data("mmenu");

    mmenuBtn.click(function() {
        API.open();
        $(this).addClass('is-active')
    });


    API.bind( "close:start", function() {
        setTimeout(function() {
            mmenuBtn.removeClass( "is-active" );
        }, 300);
    });
    //***** end mobile-mnu customization *****//

    $('img.svg').each(function(){
        var $img = jQuery(this);
        var imgID = $img.attr('id');
        var imgClass = $img.attr('class');
        var imgURL = $img.attr('src');

        jQuery.get(imgURL, function(data) {
            // Get the SVG tag, ignore the rest
            var $svg = jQuery(data).find('svg');

            // Add replaced image's ID to the new SVG
            if(typeof imgID !== 'undefined') {
                $svg = $svg.attr('id', imgID);
            }
            // Add replaced image's classes to the new SVG
            if(typeof imgClass !== 'undefined') {
                $svg = $svg.attr('class', imgClass+' replaced-svg');
            }

            // Remove any invalid XML tags as per http://validator.w3.org
            $svg = $svg.removeAttr('xmlns:a');

            // Check if the viewport is set, if the viewport is not set the SVG wont't scale.
            if(!$svg.attr('viewBox') && $svg.attr('height') && $svg.attr('width')) {
                $svg.attr('viewBox', '0 0 ' + $svg.attr('height') + ' ' + $svg.attr('width'))
            }

            // Replace image with new SVG
            $img.replaceWith($svg);
        }, 'xml');
    });

    $('.catalog-container').tabs();

    $('.nova-slider').owlCarousel({
        loop:false,
        nav: true,
        margin: 30,
        dots: false,
        navText: ["",""],
        responsive : {
            0 : {
                items: 1,
                autoWidth: true
            },
            480 : {
                items: 2,
                autoWidth: false
            },
            768 : {
                items: 3
            },
            992: {
                items: 4
            }
        }
    });

    $('.product-slider').owlCarousel({
        loop:false,
        nav:false,
        autoHeight: true,
        items: 1,
        thumbs: true,
        dots: false,
        thumbsPrerendered: true,
        thumbItemClass: 'product-nav',
        animateIn: "fadeIn",
        animateOut: "fadeOut",
        mouseDrag: false,
    });

    $('.preloader').fadeOut();



    var filterCheck = $('.filter-item-list input[type="checkbox"]');

    filterCheck.styler();

    filterCheck.change(function(){
        var name = $(this).attr('name');

        if ($(this).is(":checked")) {
            $('.filters-active').append('<div class="filter" data-name="'+ name +'">'+ name +'<a href="#0" class="reset"></a></div>');
            removeFilter();
        } else {
            $('.filters-active .filter[data-name="'+name+'"]').remove();
        }
    });

    $('.filter-item').on('click', '.filter-item-head', function(){
        var parent = $(this).parents('.filter-item');
       parent.toggleClass('active');
       parent.find('.filter-item-list').slideToggle();
    });


    $('.filters-reset').on('click', function(e){
        e.preventDefault();

        $('.filters-active').html("");

        $('.filter-item-list label').each(function(){
            $(this).find('.jq-checkbox').removeClass('checked');
            $(this).find('input').prop('checked', false);
        })
    });

    function removeFilter() {
        $('.filters-active .filter').each(function(){
            var th = $(this),
                name = th.data('name'),
                reset = th.find('.reset');

            reset.on('click', function(e){
                e.preventDefault();
                th.remove();
                $('.filter-item-list input[name="'+ name +'"]').prop('checked', false);
                $('.filter-item-list input[name="'+ name +'"]').parents('.jq-checkbox').removeClass('checked');
            });
        });
    }

    $('.show-sidebar').click(function () {
        $(this).toggleClass('active');
        $('.sidebar').slideToggle();

        $(this).text(function(i, text){
            return text === "Развернуть фильтры" ? "Свернуть фильтры" : "Развернуть фильтры";
        })
    });

    $('.features-link').click(function(e) {
        e.preventDefault();
        $('.features-desc').toggleClass('active');

        $(this).text(function(i, text){
            return text === "Подробнее" ? "Свернуть" : "Подробнее";
        })
    });

    if ($(window).width()<992) {
        $('.foot-item h3').click(function(){
            var parent = $(this).parents('.foot-item');

            parent.toggleClass('active');
            parent.find('.foot-item-content').slideToggle();
        })
    }


    /** FORMS START*/

    $('.checkbox-label input, .map-topline select, .map-topline input').styler();

    $.validate({
        form : '.contact-form',
        scrollToTopOnError: false
    });

    var uPhone = $('.user-phone');
    uPhone.mask("+7 (999) 999-99-99",{autoclear: false});

    uPhone.on('click', function (ele) {
        var needelem = ele.target || event.srcElement;
        needelem.setSelectionRange(4,4);
        needelem.focus();
    });

    //E-mail Ajax Send
    $("form").submit(function() { //Change
        var th = $(this);

        $.ajax({
            type: "POST",
            url: "mail.php", //Change
            data: th.serialize()
        }).done(function() {

        });
        return false;
    });

    /** FORMS END */


    /** YOUTUBE SCRIPT */
    var tag = document.createElement('script');
    tag.src = "//www.youtube.com/iframe_api";
    var firstScriptTag = document.getElementsByTagName('script')[0];
    firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

    var vp;

    // var $videoID = 'yu5TPBX8290';
    var $playerID = 'videoPlayer-0';

    onYouTubeIframeAPIReady = function () {



        $("a[href='#video-popup']").on('click', function(){

            var $videoID = $(this).data("video");

            vp = new YT.Player($playerID, {
                videoId: $videoID,
                playerVars: {
                    'autoplay': 1,
                    'rel': 0,
                    'showinfo': 0
                },
                events: {
                    'onStateChange': onPlayerStateChange
                }
            });
        });
    };

    onPlayerStateChange = function (event) {
        if (event.data == YT.PlayerState.ENDED) {
            console.log('ended');
            $.magnificPopup.close();
        }
    };

    $(function () {
        $("a[href='#video-popup']").magnificPopup({
            type: "inline",
            fixedContentPos: !1,
            fixedBgPos: !0,
            overflowY: "auto",
            closeBtnInside: !0,
            preloader: !1,
            midClick: !0,
            removalDelay: 300,
            mainClass: "popup-zoom-in",

            callbacks: {
                close: function(){
                    vp.stopVideo();
                    vp.destroy();
                }
            }
        })
    });
    /** end YOUTUBE SCRIPT */

    $('.product-size').click(function(){
        var th = $(this);

        th.addClass('active');
        th.siblings('.product-size').removeClass('active');
    });


    function heightses() {
        if ($(window).width()<480) {
            $('.nova-slide-title').equalHeights();
        }
        $('.block-product-title').equalHeights();
    }

    $(window).resize(function() {
        heightses();
    });

    setTimeout(function(){
        heightses()
    }, 200);

    /** MAPS START */
    function loadScript(url, callback){
        var script = document.createElement("script");

        if (script.readyState){  // IE
            script.onreadystatechange = function(){
                if (script.readyState == "loaded" ||
                    script.readyState == "complete"){
                    script.onreadystatechange = null;
                    callback();
                }
            };
        } else {  // Другие браузеры
            script.onload = function(){
                callback();
            };
        }

        script.src = url;
        document.getElementsByTagName("head")[0].appendChild(script);
    }


    function initMap() {
        ymaps.ready(function(){
            var mapId = $('#map'),
                attitude = mapId.data("att"),
                longtitude = mapId.data("long"),
                zoom = mapId.data("zoom"),
                marker = mapId.data("marker"),
                map = new ymaps.Map("map", {
                    center: [attitude, longtitude],
                    controls: ['zoomControl'],
                    zoom: zoom
                });


            var i;
            var placemark;
            var dataObjects = [];



            $('#objectslist .om-item').each(function(){
                var  omAtt = $(this).data('att'),
                     omLong = $(this).data('long'),
                     omTitle = $(this).data('title'),
                     omAddress = $(this).data('address'),
                     omType = $(this).data('type'),
                     omData = [omAtt, omLong, omTitle, omAddress, omType];

                dataObjects.push(omData);
            });


            for (i = 0; i < dataObjects.length; ++i) {
                placemark = new ymaps.Placemark([[dataObjects[i][0]], dataObjects[i][1]], {
                    balloonContent: '<div class="baloon-item"><div class="baloon-title">'+dataObjects[i][2]+'</div><div class="baloon-address">'+dataObjects[i][3]+'</div><div class="baloon-type">'+dataObjects[i][4]+'</div></div>'
                }, {
                    iconLayout: 'default#image',
                    // Своё изображение иконки метки.
                    iconImageHref: marker,
                    // Размеры метки.
                    iconImageSize: [23, 23],
                    // Смещение левого верхнего угла иконки относительно
                    // её "ножки" (точки привязки).
                    iconImageOffset: [0, 0],
                    // Балун будем открывать и закрывать кликом по иконке метки.
                    hideIconOnBalloonOpen: false,
                    // Отключаем кнопку закрытия балуна.
                    balloonCloseButton: false,
                });
                map.geoObjects.add(placemark);
            }







        });
    }

    if( $('#map').length )         // use this if you are using id to check
    {
        setTimeout(function(){
            loadScript("https://api-maps.yandex.ru/2.1/?apikey=e470b388-a1d0-4edf-acdc-34b4bc5bedee&lang=ru_RU&loadByRequire=1", function(){
                initMap();
            });
        }, 2000);
    }
    /** MAPS END */
});
