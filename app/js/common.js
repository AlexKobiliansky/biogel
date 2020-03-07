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
});
