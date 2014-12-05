var theQ = [];
var firstHalfUrl = "<iframe width=\u0022100%\u0022 height=\u0022400\u0022src=\u0022http://www.youtube.com/embed/";
var secondHalfUrl = "?autoplay=0\u0022></iframe>";


$(document).ready(function(){
    
    $('#nickname').focus(function(){
        if ($(this).val() != ""){
            $(this).removeAttr('placeholder');
        }
    });
   
    // CLIENT-SIDE JS

    $('.main-container').hide();
    $('#nickWrap').hide();
    
    document.getElementById("new-room").onclick = function(){
        $('#first-page').slideToggle();
        $('#nickWrap').show();

    }
    



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
    var nickForm = $('#setNickname');
    var nickError = $('#nickError');
    var nickBox = $('#nickname');
    $('#setNickname').submit(function(e) {
        e.preventDefault();
        socket.emit('new user', $('#nickname').val(), function(data) {
            if (data) {
                // console.log('successful nickname');
                // alert(JSON.stringify(nickBox));

                $('#nickWrap').slideUp();
                $('.main-container').show();

            }
            else {
                console.log('unsuccessful nickname');
            }
        });
        $('#nickname').val('');
    });


    $('form').submit(function(){
      socket.emit('chat message', $('#m').val());
      $('#m').val('');
      return false;
    });

   
    socket.on('usernames', function(data){
        var html = '';
        for (i = 0; i < data.length; i++){
            html += data[i] + '<br>'
        }
        $('#users').html(html);
    });

    socket.on('user left', function(data){
        $('#messages').append($('<li>').text(data.user + " " + "has left the Q."));
    });

    socket.on('chat message', function(msg){
    

      if (msg.msg.search("youtube") === 12) {  
        
        var firstHalfUrl = "<iframe width=\u0022100%\u0022 height=\u0022400\u0022src=\u0022http://www.youtube.com/embed/"
        var equalIndex = msg.msg.indexOf("=");
        var videoId = msg.msg.slice(equalIndex+1)
        var secondHalfUrl = "?autoplay=1\u0022></iframe>";
        var fullUrl = (firstHalfUrl + videoId + secondHalfUrl);
        theQ.push("" + videoId);
        $('#queue-count').html("(Songs in the Q: " + theQ.length + ")");
        // alert(fullUrl);
        // $('#media').html(firstHalfUrl + videoId + secondHalfUrl);
        // $('#show-queue').html(theQ);
        $('#messages').append($('<li>').html('<b>' + msg.user + '</b>' + " has just added a YouTube video to the q."));
        updateScroll();
        return false;
      }
     
      // if (msg.msg.search("soundcloud") === 8) {
      //   console.log("sound cloud event was hit");
      //   $('#messages').append($('<li>').text(msg.user + " " + "has just added a SoundCloud song to your queue."));
      //   updateScroll();
      //   var track_url = msg.msg;
      //   SC.oEmbed(track_url, { auto_play: true }, function(oEmbed) {
            
      //       console.log(oEmbed.title);
      //       // var changeSize = oEmbed.html;

      //       $('#media').html(sanitizeSoundObject(oEmbed.html));
      //       // sanitizeSoundObject(oEmbed.html)
      //     // console.log('oEmbed response: ' + sanitizeSoundObject(oEmbed.html));
      //   });


       
      // }
      else {
        
        if (msg.msg) {
            $('#messages').append($('<li>').html('<b>' + msg.user + '</b>' + ": " + msg.msg));
            updateScroll();
        }

      } 
      
      return false;
    });


    // END SOCKET WORK
});
