// Hide Header on on scroll down
var didScroll;
var lastScrollTop = 0;
var delta = 5;
var navbarHeight = $('header').outerHeight();

$(window).scroll(function(event){
    didScroll = true;
});

setInterval(function() {
    if (didScroll) {
        hasScrolled();
        didScroll = false;
    }
}, 250);

function hasScrolled() {
    var st = $(this).scrollTop();
    
    // Make sure they scroll more than delta
    if(Math.abs(lastScrollTop - st) <= delta)
        return;
    
    // If they scrolled down and are past the navbar, add class .nav-up.
    // This is necessary so you never see what is "behind" the navbar.
    if (st > lastScrollTop && st > navbarHeight){
        // Scroll Down
        $('header').removeClass('top-bar').addClass('nav-up');
    } else {
        // Scroll Up
        if(st + $(window).height() < $(document).height()) {
            $('header').removeClass('nav-up').addClass('top-bar');
        }
    }
    
    lastScrollTop = st;
}
// Navbar appear when scroll
$(document).ready(function() {
  $(window).scroll(function() {
    var x = $(window).scrollTop();

    if (x >= 300) {
      $("#navbar").show(200);
    } else {
      $("#navbar").hide(200);
    }

  });
});

// Dynamically active class in menu
$(document).ready(function(){
  $('ul li a').click(function(){
    $('li a').removeClass("active");
    $(this).addClass("active");
});
});

/* ---- particles.js config ---- */

particlesJS("particles-js", {
  "particles": {
    "number": {
      "value": 80,
      "density": {
        "enable": true,
        "value_area": 800
      }
    },
    "color": {
      "value": "#ffffff"
    },
    "shape": {
      "type": "circle",
      "stroke": {
        "width": 0,
        "color": "#000000"
      },
      "polygon": {
        "nb_sides": 5
      },
      "image": {
        "src": "img/github.svg",
        "width": 100,
        "height": 100
      }
    },
    "opacity": {
      "value": 0.5,
      "random": false,
      "anim": {
        "enable": false,
        "speed": 0.2,
        "opacity_min": 0.1,
        "sync": false
      }
    },
    "size": {
      "value": 3,
      "random": true,
      "anim": {
        "enable": false,
        "speed": 20,
        "size_min": 0.1,
        "sync": false
      }
    },
    "line_linked": {
      "enable": true,
      "distance": 150,
      "color": "#ffffff",
      "opacity": 0.4,
      "width": 1
    },
    "move": {
      "enable": true,
      "speed": 1,
      "direction": "none",
      "random": false,
      "straight": false,
      "out_mode": "out",
      "bounce": false,
      "attract": {
        "enable": false,
        "rotateX": 600,
        "rotateY": 1200
      }
    }
  },
  "interactivity": {
    "detect_on": "canvas",
    "events": {
      "onhover": {
        "enable": true,
        "mode": "grab"
      },
      "onclick": {
        "enable": true,
        "mode": "push"
      },
      "resize": true
    },
    "modes": {
      "grab": {
        "distance": 140,
        "line_linked": {
          "opacity": 1
        }
      },
      "bubble": {
        "distance": 400,
        "size": 40,
        "duration": 2,
        "opacity": 8,
        "speed": 2
      },
      "repulse": {
        "distance": 200,
        "duration": 0.4
      },
      "push": {
        "particles_nb": 4
      },
      "remove": {
        "particles_nb": 2
      }
    }
  },
  "retina_detect": true
});
/* ---- particles.js ends ---- */

		// portfolio filter
	$(window).load(function(){'use strict';
		var $portfolio_selectors = $('.portfolio-filter >li>a');
		var $portfolio = $('.portfolio-items');
		$portfolio.isotope({
			itemSelector : '.portfolio-item',
			layoutMode : 'fitRows'
		});
		
		$portfolio_selectors.on('click', function(){
			$portfolio_selectors.removeClass('active');
			$(this).addClass('active');
			var selector = $(this).attr('data-filter');
			$portfolio.isotope({ filter: selector });
			return false;
		});
	});


	//Home
	var moduleName = 'js-intro',

		selector = '.' + moduleName,

		artBoardSelector = selector + '-art-board',

		titleSelector = selector + '-title',

		captionSelector = selector + '-caption',

		itemClassName = moduleName + '-art-board-item',

		itemSelector = '.' + itemClassName,

		$els = $(selector),

		imageSize = [50, 50], // width, height

		images = [
			'https://s3-us-west-2.amazonaws.com/s.cdpn.io/133956/image-01.png',
			'https://s3-us-west-2.amazonaws.com/s.cdpn.io/133956/image-02.png',
			'https://s3-us-west-2.amazonaws.com/s.cdpn.io/133956/image-03.png',
			'https://s3-us-west-2.amazonaws.com/s.cdpn.io/133956/image-04.png',
			'https://s3-us-west-2.amazonaws.com/s.cdpn.io/133956/image-05.png',
			'https://s3-us-west-2.amazonaws.com/s.cdpn.io/133956/image-06.png',
			'https://s3-us-west-2.amazonaws.com/s.cdpn.io/133956/image-07.png',
			'https://s3-us-west-2.amazonaws.com/s.cdpn.io/133956/image-08.png',
			'https://s3-us-west-2.amazonaws.com/s.cdpn.io/133956/image-09.png'
		],

		coords = [
			'n', 'ne', 'e', 'se', 's', 'sw', 'w', 'nw'
		],

		positions = {},

		startScale = 5,

		gridFragment = '',

		latest = 0,

		startTimeout,

		endTimeout,

		bezier = 'cubic-bezier(.17,.5,.83,.5)';

	function setStyling() {
		var $el = $(this),
			index = _.random(images.length - 1),
			imageUrl = images[index];

		var coord = coords[_.random(coords.length - 1)],
			position = positions[coord],
			delay = _.random(0, 8) / 10,
			speed = _.random(12, 20) / 10,
			rotate = _.random(-30, 30);

		$el.css({
			transform: 'translate(' + position[0] + 'px, ' + position[1] + 'px) scale(' + startScale + ') rotate(' + rotate + 'deg)',
			opacity: 0,
			transition: 'all ' + speed + 's ' + delay + 's ' + bezier,
			backgroundImage: 'url(' + imageUrl + ')',
			zIndex: delay + (speed * 10)
		});

		if((delay + speed) > latest) {
			latest = (delay + speed);
		}
	}

	function fillArtBoard($el) {
		var width = $el.width(),
			height = $el.height(),
			itemsAxis = {
				x: Math.ceil(width / imageSize[0]),
				y: Math.ceil(height / imageSize[1])
			},
			itemsAmount = itemsAxis.x * itemsAxis.y;

		function createFragment(i) {
			gridFragment += '<div class="art-board__item ' + itemClassName + '"></div>';
		}

		_.times(itemsAmount, createFragment);
		$el.html(gridFragment);
		$(itemSelector).css({
			width: imageSize[0],
			height: imageSize[1]
		});

		$(itemSelector).each(setStyling);

		// reset width art board
		$el.css({
			width: itemsAxis.x * imageSize[0],
			height: itemsAxis.y * imageSize[1]
		});

		startTimeout = setTimeout(function() {
			$(itemSelector).addClass('animate');
		}, 300)

		endTimeout = setTimeout(function() {
			$(captionSelector).addClass('animate');
		}, (latest * 1000) - 50);
	}

	function sizeArtBoard($el, $helper) {
		var $artBoard = $el.find(artBoardSelector),
			$title = $el.find(titleSelector);

		$el.css({
			top: $helper.offset().top,
			left: $helper.offset().left,
			width: $helper.width(),
			height: $helper.height()
		});
	}

	function setup() {
		var $el = $(this),
			$artBoard = $el.find(artBoardSelector),
			$title = $el.find(titleSelector);

		positions = {
			n: [
				$el.width() / 2,
				0 - (imageSize[1] * startScale)
			],
			ne: [
				$el.width() + (imageSize[1] * startScale),
				0 - (imageSize[1] * startScale)
			],
			e: [
				$el.width() + (imageSize[1] * startScale),
				$el.height() / 2
			],
			se: [
				$el.width() + (imageSize[1] * startScale),
				$el.height()
			],
			s: [
				$el.width() / 2,
				$el.height()
			],
			sw: [
				0 - (imageSize[0] * startScale),
				$el.height()
			],
			w: [
				0 - (imageSize[0] * startScale),
				$el.height() / 2
			],
			nw: [
				0 - (imageSize[0] * startScale),
				0 - (imageSize[1] * startScale)
			]
		}

		sizeArtBoard($artBoard, $title);
		fillArtBoard($artBoard);
	}

	function init() {
		clearTimeout(startTimeout);
		clearTimeout(endTimeout);

		$(itemSelector).removeClass('animate');
		$(captionSelector).removeClass('animate');

		if($els.length) {
			$els.each(setup);
		}
	}

	$(window).on('resize', init);

	init();
	/*
	//Geolocation Code

    if(navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(success);
		
        function success(position){
		    alert(position.coords.latitude + ", "+ position.coords.longitude )
        }
    }
    else
    {
		alert("Geolocation is not supported")
    }
    */
  
   
// People tell about us 
$(document).ready(function(){
  $(".reviews").each(function(){
    var This = $(this) ;
    var Nums = This.find(".panel").size() ;
    This.find(".panel:first").addClass("PanelAct");
    This.append("<div class='control'></div>") ;
    This.find(".panel").not(".PanelAct")
      .css("left","100%")
    for ( i=0 ; i<Nums ; i++) {
      This.find(".control").append("<span></span>") ;
    }
    This.find(".control span:eq(0)").addClass("ContActive");
    
    This.find(".control span").click(Reviews);
    
    function Reviews(){
      var loc = $(this).index();
      var ActivLoc = This.find(".ContActive").index();

      $(this).addClass("ContActive")
        .siblings().removeAttr("class");
      
      if ( loc > ActivLoc ) {
        var Dire = '100%'
        var IDire = '-100%'
      }
      if ( loc < ActivLoc ) {
        var Dire = '-100%'
        var IDire = '100%'
      }

      This.find(".panel").not(".PanelAct")
      .css("left",Dire) ;
      This.find(".panel:eq("+loc+")")
      .animate({'left':'0'},speed)
      .addClass("PanelAct")
      .siblings(".PanelAct")
      .removeClass("PanelAct")
      .animate({'left':IDire},speed);
    }
  });
});

// Sign in & up
$(".email-signup").hide();
$("#signup-box-link").click(function(){
  $(".email-login").fadeOut(100);
  $(".email-signup").delay(100).fadeIn(100);
  $("#login-box-link").removeClass("active");
  $("#signup-box-link").addClass("active");
});
$("#login-box-link").click(function(){
  $(".email-login").delay(100).fadeIn(100);;
  $(".email-signup").fadeOut(100);
  $("#login-box-link").addClass("active");
  $("#signup-box-link").removeClass("active");
});

/* @author: Xavier Damman (@xdamman) - http://github.com/xdamman/selection-sharer - @license: MIT */!function(a){var b=function(b){var c=this;b=b||{},"string"==typeof b&&(b={elements:b}),this.sel=null,this.textSelection="",this.htmlSelection="",this.getSelectionText=function(a){var b="",d="",a=a||window.getSelection();if(a.rangeCount){for(var e=document.createElement("div"),f=0,g=a.rangeCount;g>f;++f)e.appendChild(a.getRangeAt(f).cloneContents());d=e.textContent,b=e.innerHTML}return c.textSelection=d,c.htmlSelection=b||d,d},this.selectionDirection=function(a){var b=a||window.getSelection(),c=document.createRange();if(!b.anchorNode)return 0;c.setStart(b.anchorNode,b.anchorOffset),c.setEnd(b.focusNode,b.focusOffset);var d=c.collapsed?"backward":"forward";return c.detach(),d},this.showPopunder=function(){c.popunder=c.popunder||document.getElementById("selectionSharerPopunder");var a=window.getSelection(),b=c.getSelectionText(a);if(a.isCollapsed||b.length<10||!b.match(/ /))return c.hidePopunder();if(c.popunder.classList.contains("fixed"))return c.popunder.style.bottom=0;var d=a.getRangeAt(0),e=d.endContainer.parentNode;if(c.popunder.classList.contains("show")){if(Math.ceil(c.popunder.getBoundingClientRect().top)==Math.ceil(e.getBoundingClientRect().bottom))return;return c.hidePopunder(c.showPopunder)}if(e.nextElementSibling)c.pushSiblings(e);else{c.placeholder||(c.placeholder=document.createElement("div"),c.placeholder.className="selectionSharerPlaceholder");var f=window.getComputedStyle(e).marginBottom;c.placeholder.style.height=f,c.placeholder.style.marginBottom=-2*parseInt(f,10)+"px",e.parentNode.insertBefore(c.placeholder)}var g=window.pageYOffset+e.getBoundingClientRect().bottom;c.popunder.style.top=Math.ceil(g)+"px",setTimeout(function(){c.placeholder&&c.placeholder.classList.add("show"),c.popunder.classList.add("show")},0)},this.pushSiblings=function(a){for(;a=a.nextElementSibling;)a.classList.add("selectionSharer"),a.classList.add("moveDown")},this.hidePopunder=function(a){if(a=a||function(){},"fixed"==c.popunder)return c.popunder.style.bottom="-50px",a();c.popunder.classList.remove("show"),c.placeholder&&c.placeholder.classList.remove("show");for(var b=document.getElementsByClassName("moveDown");el=b[0];)el.classList.remove("moveDown");setTimeout(function(){c.placeholder&&document.body.insertBefore(c.placeholder),a()},600)},this.show=function(a){setTimeout(function(){var b=window.getSelection(),d=c.getSelectionText(b);if(!b.isCollapsed&&d&&d.length>10&&d.match(/ /)){var e=b.getRangeAt(0),f=e.getBoundingClientRect().top-5,g=f+window.scrollY-c.$popover.height(),h=0;if(a)h=a.pageX;else{var i=b.anchorNode.parentNode;h+=i.offsetWidth/2;do h+=i.offsetLeft;while(i=i.offsetParent)}switch(c.selectionDirection(b)){case"forward":h-=c.$popover.width();break;case"backward":h+=c.$popover.width();break;default:return}c.$popover.removeClass("anim").css("top",g+10).css("left",h).show(),setTimeout(function(){c.$popover.addClass("anim").css("top",g)},0)}},10)},this.hide=function(){c.$popover.hide()},this.smart_truncate=function(a,b){if(!a||!a.length)return a;var c=a.length>b,d=c?a.substr(0,b-1):a;return d=c?d.substr(0,d.lastIndexOf(" ")):d,c?d+"...":d},this.getRelatedTwitterAccounts=function(){var b=[],c=a('meta[name="twitter:creator"]').attr("content")||a('meta[name="twitter:creator"]').attr("value");c&&b.push(c);for(var d=document.getElementsByTagName("a"),e=0,f=d.length;f>e;e++)if(d[e].attributes.href&&"string"==typeof d[e].attributes.href.value){var g=d[e].attributes.href.value.match(/^https?:\/\/twitter\.com\/([a-z0-9_]{1,20})/i);g&&g.length>1&&-1==["widgets","intent"].indexOf(g[1])&&b.push(g[1])}return b.length>0?b.join(","):""},this.shareTwitter=function(b){b.preventDefault(),c.viaTwitterAccount||(c.viaTwitterAccount=a('meta[name="twitter:site"]').attr("content")||a('meta[name="twitter:site"]').attr("value")||"",c.viaTwitterAccount=c.viaTwitterAccount.replace(/@/,"")),c.relatedTwitterAccounts||(c.relatedTwitterAccounts=c.getRelatedTwitterAccounts());var d="“"+c.smart_truncate(c.textSelection.trim(),114)+"”",e="http://twitter.com/intent/tweet?text="+encodeURIComponent(d)+"&related="+c.relatedTwitterAccounts+"&url="+encodeURIComponent(window.location.href);c.viaTwitterAccount&&d.length<114-c.viaTwitterAccount.length&&(e+="&via="+c.viaTwitterAccount);var f=640,g=440,h=screen.width/2-f/2,i=screen.height/2-g/2-100;return window.open(e,"share_twitter","toolbar=no, location=no, directories=no, status=no, menubar=no, scrollbars=no, resizable=no, copyhistory=no, width="+f+", height="+g+",       top="+i+", left="+h),c.hide(),!1},this.shareEmail=function(){var b=c.htmlSelection.replace(/<p[^>]*>/gi,"\n").replace(/<\/p>|  /gi,"").trim(),d={};return d.subject=encodeURIComponent("Quote from "+document.title),d.body=encodeURIComponent("“"+b+"”")+"%0D%0A%0D%0AFrom: "+document.title+"%0D%0A"+window.location.href,a(this).attr("href","mailto:?subject="+d.subject+"&body="+d.body),c.hide(),!0},this.render=function(){var b='<div class="selectionSharer" id="selectionSharerPopover" style="position:absolute;">  <div id="selectionSharerPopover-inner">    <ul>      <li><a class="action tweet" href="" title="Share this selection on Twitter" target="_blank">Tweet</a></li>      <li><a class="action email" href="" title="Share this selection by email" target="_blank"><svg width="20" height="20"><path stroke="#FFF" stroke-width="6" d="m16,25h82v60H16zl37,37q4,3 8,0l37-37M16,85l30-30m22,0 30,30"/></svg></a></li>    </ul>  </div>  <div class="selectionSharerPopover-clip"><span class="selectionSharerPopover-arrow"></span></div></div>',d='<div id="selectionSharerPopunder" class="selectionSharer">  <div id="selectionSharerPopunder-inner">    <label>Share this selection</label>    <ul>      <li><a class="action tweet" href="" title="Share this selection on Twitter" target="_blank">Tweet</a></li>      <li><a class="action email" href="" title="Share this selection by email" target="_blank"><svg width="20" height="20"><path stroke="#FFF" stroke-width="6" d="m16,25h82v60H16zl37,37q4,3 8,0l37-37M16,85l30-30m22,0 30,30"/></svg></a></li>    </ul>  </div></div>';c.$popover=a(b),c.$popover.find("a.tweet").click(c.shareTwitter),c.$popover.find("a.email").click(c.shareEmail),a("body").append(c.$popover),c.$popunder=a(d),c.$popunder.find("a.tweet").click(c.shareTwitter),c.$popunder.find("a.email").click(c.shareEmail),a("body").append(c.$popunder)},this.setElements=function(b){"string"==typeof b&&(b=a(b)),c.$elements=b instanceof a?b:a(b),c.$elements.mouseup(c.show).mousedown(c.hide).addClass("selectionShareable"),c.$elements.bind("touchstart",function(){c.isMobile=!0}),document.onselectionchange=c.selectionChanged},this.selectionChanged=function(a){c.isMobile&&(c.lastSelectionChanged&&clearTimeout(c.lastSelectionChanged),c.lastSelectionChanged=setTimeout(function(){c.showPopunder(a)},300))},this.render(),b.elements&&this.setElements(b.elements)};a.fn.selectionSharer=function(){var a=new b;return a.setElements(this),this},"function"==typeof define?define(function(){return b.load=function(a,c,d){var e=new b;e.setElements("p"),d()},b}):window.SelectionSharer=b}(jQuery);
 $('p,h1,h2,h3,h4,h5,h6').selectionSharer();

