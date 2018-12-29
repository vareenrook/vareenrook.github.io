

var videoThumbs = [];

//collect data for the videos on display based on vimeo ID attribute given to them in HTML
function collectvideoIDs() {
  var videos = document.getElementsByClassName("thumbnail");

  Array.prototype.forEach.call(videos, function (video) {
    var imgID = video.getAttribute("thumbnail_id");
    videoThumbs.push(imgID);
  });
}

function obtainVideoData(callback) {

  var processing = videoThumbs.length;

  videoThumbs.forEach(function (videoID, index) {
    $.getJSON("https://www.vimeo.com/api/v2/video/" + videoID + ".json?callback=?", { format: "json" }).done(function (data) {
      videoThumbs[index] = data[0]; //save all data for this element
    }).fail(function (error) {
      console.log(error);
    }).always(function () {
      //processed an item
      finishElement();
    });
  });

  function finishElement() {
    processing--;

    //done with all video loading
    if (processing === 0) {
      $(".loader").removeClass("fade-out");     //show videos
      callback();
    }
  }
}

function paintVideos() {

  videoThumbs.forEach(function (videoData, index) {

    // console.log(videoData);

    var imageField = $('img[thumbnail_id="' + videoData.id + '"]');
    var titleField = $(imageField).siblings('span:first');
    var aTagField = $(imageField).parent();
    var container = $(imageField).parents('div:first');

    // console.log(titleField);

    imageField.attr('src', videoData.thumbnail_large);
    titleField.html(videoData.title);
    // aTagField.attr('href', videoData.url);
    aTagField.attr('href', 'javascript:openModal(' + videoData.id + ')');
  });

  //refresh the slick carousels -- bad location to do it here but it'll do the job
  try {
    $('.carousel').slick('refresh');
  } catch (err) {
    console.log("Tried to refresh a non-existing slick carousel");
  }
}

function loadThumbnails() {

  //collect data
  collectvideoIDs();

  //load in data and paint the elements on screen
  obtainVideoData(paintVideos);
}