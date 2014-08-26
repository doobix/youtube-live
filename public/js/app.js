var host = false;
var videoID = "";
var playTime = 0;
var player;
var playTimer;
var playerState = -1;

if (window.location.pathname === "/host") {
  host = true;
}

// FIREBASE
var myDataRef = new Firebase('https://dazzling-inferno-4118.firebaseio.com/');

// Get current play time
myDataRef.child("videoTime").on("value", function(snapshot) {
  playTime = snapshot.val();
  console.log("new playtime:", playTime);
  if (playerState !== 1) {
    player.seekTo(playTime);
  }
});

// Get video ID
myDataRef.child("videoID").on("value", function(snapshot) {
  videoID = snapshot.val();
  $("#url").val("https://www.youtube.com/watch?v="+videoID)
  createPlayer();
});

// Get player state
myDataRef.child("state").on("value", function(snapshot) {
  playerState = snapshot.val();
  console.log("STATE: ", playerState);
  if (!host) {
    if (playerState === 1) {
      seek(playTime);
    } else {
      seek(playTime);
    }
  }
});

// YOUTUBE
// Loads the IFrame Player API code asynchronously.
var tag = document.createElement('script');

tag.src = "https://www.youtube.com/iframe_api";
var firstScriptTag = document.getElementsByTagName('script')[0];
firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

// Create the YouTube player
function createPlayer() {
  myDataRef.child("state").once("value", function(state){
    playerState = state.val();
    myDataRef.child("videoTime").once("value", function(time){
      playTime = time.val();
      player = new YT.Player('player', {
        height: '100%',
        width: '100%',
        videoId: videoID,
        playerVars: {
          start: playTime
        },
        events: {
          'onReady': onPlayerReady,
          'onStateChange': onPlayerStateChange
        }
      });
    });
  });
}

// Seek the video when player is loaded
function onPlayerReady(event) {
  seek(playTime);
}

// Set state when state changes
function onPlayerStateChange(event) {
  if (host) {
    var newState = event.data;
    myDataRef.child("state").set(newState);
  }
}

function seek(time) {
  time = time || 0;
  if (player) {
    if (playerState === 1) {
      player.playVideo();
    } else {
      player.pauseVideo();
    }
    player.seekTo(time);
    console.log("seeked to time:", time);
  }
}
function stop() {
  if (player) {
    player.pauseVideo();
  }
}

function updateTime() {
  playTime = player.getCurrentTime();
  // console.log("PLAY TIME:", playTime);
  if (host) {
    myDataRef.child("videoTime").set(playTime);
  }
}

function loadVideo() {
  var url = $("#url").val();
  var match = /=([A-Za-z0-9_-]+)/g;
  var result = match.exec(url);
  videoID = result[1];
  player.loadVideoById(videoID);

  if (host) {
    myDataRef.child("videoID").set(videoID);
  }
}

playTimer = setInterval(updateTime, 250);

// FLASH YOUTUBE PLAYER
// function createPlayer() {
//   var ytplayer = "";
//   var playTimer;
//   var params = { allowScriptAccess: "always" };
//   var atts = { id: "myytplayer" };
//   swfobject.embedSWF("https://www.youtube.com/v/"+videoID+"?version=3&playerapiid=ytplayer&enablejsapi=1", "ytapiplayer", "100%", "100%", "8", null, null, params, atts);
// }

// function play(time) {
//   time = time || 0;
//   if (ytplayer) {
//     ytplayer.seekTo(time);
//   }
// }
// function pause() {
//   if (ytplayer) {
//     ytplayer.pauseVideo();
//   }
// }
// function stop() {
//   if (ytplayer) {
//     ytplayer.stopVideo();
//   }
// }

// function onYouTubePlayerReady(playerId) {
//   console.log('ready');
//   ytplayer = document.getElementById("myytplayer");
//   ytplayer.addEventListener("onStateChange", "onytplayerStateChange");
// }

// function onytplayerStateChange(newState) {
//   if (host) {
//     myDataRef.child("state").set(newState);
//   }

//   if (newState === 1) {
//     playTimer = setInterval(updateTime, 100);
//   } else {
//     clearInterval(playTimer);
//   }
// }