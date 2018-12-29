//remember, $ as a function is equal to window.onload

function modal(id) {

  var modal = $('.modal-content');
  var modalHeight = modal.height();
  var modalWidth = modal.width();

  var spinner = jQuery('<div/>', {
    class: "spinner"
  }).appendTo(".modal-content");

  var data = videoThumbs.find(function (video) {
    return video.id === id;
  });


  $.ajax({
    url: "https://vimeo.com/api/oembed.json?url=https%3A//vimeo.com/" + data.id,
    cache: false,
    dataType: "json",
    success: function (data) {

      $(spinner).remove();

      jQuery('<h3/>', {
        text: data.title,
        class: "text-xl"
      }).appendTo(".modal-content");


      var iFrame = jQuery(data.html);
      //iframe Size
      iFrame.attr("width", modalWidth / 1.2);
      iFrame.attr("height", modalHeight / 1.2);

      //resize the iframe according to modal space available

      $(iFrame).appendTo(".modal-content");

      jQuery('<p/>', {
        text: data.description,
        class: "text-lg textField"
      }).appendTo(".modal-content");


      //video dimensions
      //$(".modal-content").fitVids();  //this shit is buggy
    },
    error: function (request, status, error) {

      console.log(status + ", " + error);

      // on error redirect to vimeo site instead
      window.location.href = "https://vimeo.com/" + data.id;

    }
  });

}


//called when opening a modal
function openModal(videoID) {

  $('.modal-content').focus();
  // var buttonId = $(this).attr('id');
  //pick animation -- one, two, three,  up to seven       @TODO refactor this obviously.
  //open it
  $('#modal-container').removeAttr('class').addClass('two');
  $('body').addClass('modal-active');
  modal(videoID);
}


//close on click on container
$('.modal-background').click(function (e) {
  if (e.target !== this) {
    return;
  }
  modal_close();

});

//@TODO needs animation
$('.modal-close-button').click(function (e) {
  if (e.target !== this) {
    return;
  }
  modal_close();

});


//how to close it
function modal_close() {
  $('#modal-container').addClass('out');
  $('.modal-content').empty();
  $('body').removeClass('modal-active');
}

//fuck IE
$.ajaxSetup({cache: false});

//cross transport
jQuery.support.cors = true;

$(function () {


  //should be a promise
  loadThumbnails();


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
    slidesToShow: 3,
    slidesToScroll: 1,
    adaptiveHeight: false,
    swipeToSlide: true,

    // You can unslick at a give n breakpoint now by adding:
    // settings: "unslick"
    // instead of a settings object

    responsive: [
      {
        breakpoint: 1440,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1
        }
      },
      {
        breakpoint: 992,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1
        }
      }

      // You can unslick at a given breakpoint now by adding:
      // settings: "unslick"
      // instead of a settings object
    ]
  });
});

var stHeight = "265";
(timeout = false), // holder for timeout id
  (delay = 250); // delay after event is "complete" to run callback

function refreshSlickHeight() {
  $('.carousel').slick('refresh');
}

// window.resize event listener
window.addEventListener("resize", function () {
  // clear the timeout
  clearTimeout(timeout);
  // start timing for event "completion"
  timeout = setTimeout(refreshSlickHeight, delay);
  if ($('body').hasClass('modal-active')) {

    //modal needs to refactor video too
    var newHeight = $('.modal-content').height()/1.2;
    var  newWidth = $('.modal-content').width()/1.2;
    $('.modal-content').children('iframe').attr('width', newWidth);
    $('.modal-content').children('iframe').attr('height', newHeight);

  }

});

$(".carousel").on("setPosition", function () {
  $(this)
    .find(".slick-slide")
    .height("auto");
  var slickTrack = $(this).find(".slick-track");
  var slickTrackHeight = $(slickTrack).height();
  $(this)
    .find(".slick-slide")
    .css("height", slickTrackHeight + "px");
});


// https://tc39.github.io/ecma262/#sec-array.prototype.find
if (!Array.prototype.find) {
  Object.defineProperty(Array.prototype, 'find', {
    value: function (predicate) {
      // 1. Let O be ? ToObject(this value).
      if (this == null) {
        throw new TypeError('"this" is null or not defined');
      }

      var o = Object(this);

      // 2. Let len be ? ToLength(? Get(O, "length")).
      var len = o.length >>> 0;

      // 3. If IsCallable(predicate) is false, throw a TypeError exception.
      if (typeof predicate !== 'function') {
        throw new TypeError('predicate must be a function');
      }

      // 4. If thisArg was supplied, let T be thisArg; else let T be undefined.
      var thisArg = arguments[1];

      // 5. Let k be 0.
      var k = 0;

      // 6. Repeat, while k < len
      while (k < len) {
        // a. Let Pk be ! ToString(k).
        // b. Let kValue be ? Get(O, Pk).
        // c. Let testResult be ToBoolean(? Call(predicate, T, « kValue, k, O »)).
        // d. If testResult is true, return kValue.
        var kValue = o[k];
        if (predicate.call(thisArg, kValue, k, o)) {
          return kValue;
        }
        // e. Increase k by 1.
        k++;
      }

      // 7. Return undefined.
      return undefined;
    }
  });
}

