
$(document).ready(function(){
    // CLIENT-SIDE JS




    
    






    var scrolled = false;
    function updateScroll(){ //this function will update the messages so that the message at the bottom of the chat is always the most recent
        if(!scrolled){
            var element = document.getElementById("messages");
            element.scrollTop = element.scrollHeight;
        }
    }
    function sanitizeSoundObject(object) {
        return object.replace("/\/", "");
    }

    
    // END CLIENT-SIDE JS



    // ALL SOCKET WORK
    
    var socket = io();
    $('form').submit(function(){
      socket.emit('chat message', $('#m').val());
      $('#m').val('');
      return false;
    });
    socket.on('chat message', function(msg){
      if (msg.search("youtube") === 12) {
        var firstHalfUrl = "<iframe width=\u0022420\u0022 height=\u0022315\u0022src=\u0022http://www.youtube.com/embed/"
        var equalIndex = msg.indexOf("=");
        var videoId = msg.slice(equalIndex+1)
        var secondHalfUrl = "?autoplay=1\u0022></iframe>"
        $('#media').html(firstHalfUrl + videoId + secondHalfUrl);
        $('#messages').append($('<li>').text("User has just added a YouTube video to your queue."));
        updateScroll();
        return false;
      }
      if (msg.search("soundcloud") === 8) {
        console.log("sound cloud event was hit");
        $('#messages').append($('<li>').text("User has just added a SoundCloud song to your queue."));
        updateScroll();

        
        SC.initialize({
          client_id: '9ba845e7851ea5f9edf205e927f90b72'
        });

        var track_url = msg;
        SC.oEmbed(track_url, { auto_play: true }, function(oEmbed) {
            $('#media').html(sanitizeSoundObject(oEmbed.html));
            // sanitizeSoundObject(oEmbed.html)
          // console.log('oEmbed response: ' + sanitizeSoundObject(oEmbed.html));
        });


       
      }
      else {
        $('#messages').append($('<li>').text(msg));
        updateScroll();
      } 
      
      return false;
    });


    
    
    // socket.on('youtube detected', function(msg){
    //   var firstHalfUrl = "<iframe width=\u0022420\u0022 height=\u0022315\u0022src=\u0022http://www.youtube.com/embed/"
    //   var equalIndex = msg.indexOf("=");
    //   var videoId = msg.slice(equalIndex+1)
    //   var secondHalfUrl = "?autoplay=1\u0022></iframe>"
    //   $('#media').html(firstHalfUrl + videoId + secondHalfUrl);

    //   updateScroll();

    //   // MAKE AJAX CALL HERE 
    //   return false;
    //   // CALL A FUNCTION THAT GETS THE YOUTUBE VIDEO (AJAX) (e.g. fetchYoutube())
    // });
    // socket.on('soundcloud detected', function(msg){
    //    // var firstHalfUrl = "<iframe width=\u0022100%\u0022 height=\u0022450\u0022 scrolling=\u0022no\u0022 frameborder=\u0022no\u0022 src=\u0022https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/tracks/"
    //    // var secondHalfUrl = "&amp;auto_play=false&amp;hide_related=false&amp;show_comments=true&amp;show_user=true&amp;show_reposts=false&amp;visual=true\u0022></iframe>"
    //    // var songId =
    //    console.log("sound cloud event was hit");
    //    curl('www.google.com', function(err) {
    //       console.info("hello");
    //     });

    //   $('#media').html($('<li>').text("SOUNDCLOUD DETECTED"));
    //   updateScroll();
    //   // MAKE AJAX CALL HERE 
    //   return false;
    //   // CALL A FUNCTION THAT GETS THE SoundCloud song (AJAX) (e.g. fetchSoundcloud())
    // });
    // END SOCKET WORK
});
