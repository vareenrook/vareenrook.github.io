
//remember, $ as a function is equal to window.onload


$(function() {
  //should be a promise
  loadThumbnails();

  $(".loader").removeClass("fade-out");

  //note that our data manip refreshes the carousel
  $(".carousel").slick({
    arrows: true,
    draggable: true,
    nextArrow:
      '<a href="#" class="control-button right"><span>Right</span></a>',
    prevArrow: '<a href="#" class="control-button left"><span>Left</span></a>',
    dots: true,
    infinite: false,
    speed: 600,
    slidesToShow: 4,
    slidesToScroll: 1,
    adaptiveHeight: false,
    swipeToSlide: true,

    // You can unslick at a give n breakpoint now by adding:
    // settings: "unslick"
    // instead of a settings object

    responsive: [
      {
        breakpoint: 1355,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1
        }
      },
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1
        }
      },
      {
        breakpoint: 760,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1
        }
        // You can unslick at a given breakpoint now by adding:
        // settings: "unslick"
        // instead of a settings object
      }
    ]
  });
});

var stHeight = "265";
(timeout = false), // holder for timeout id
  (delay = 250); // delay after event is "complete" to run callback

function refreshSlickHeight() {
  $(".slick-slide").css("height", stHeight + "px");
}

// window.resize event listener
window.addEventListener("resize", function() {
  // clear the timeout
  clearTimeout(timeout);
  // start timing for event "completion"
  timeout = setTimeout(refreshSlickHeight, delay);
});

$(".carousel").on("setPosition", function() {
  $(this)
    .find(".slick-slide")
    .height("auto");
  var slickTrack = $(this).find(".slick-track");
  var slickTrackHeight = $(slickTrack).height();
  $(this)
    .find(".slick-slide")
    .css("height", slickTrackHeight + "px");
});
