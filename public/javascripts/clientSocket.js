var theQ = [];
var favorites = [];
var rewind = [];



$(document).ready(function(){

    

    
    $('.collapsible').collapsible();
    $('#collapse').onclick = function() {
        $('about-text').html("Click To View");
    }

    document.getElementById("info-box").onclick = function(){
        // $('#about-text').html("Create queues of music for others to listen to simply by entering YouTube links through the chat box. Users will go through their queues at different times, depending on when they finish videos. Enjoy! <br><br> <div id=&#34;collapse&#34;>Collapse</div>");
    }
        
    


    $('#nickname').focus(function(){
        if ($(this).val() != ""){
            $(this).removeAttr('placeholder');
        }
    });
   
    // CLIENT-SIDE JS

    $('.main-container').hide();

    

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

    
    var socket = io.connect(':8000/');
    // var socket = io();
    socket.emit('index page');
    $('#setUsername').submit(function(e) {
        e.preventDefault();
        socket.emit('new user', $('#nickname').val(), function(data) {
            
            if (data) {
                    
                $('#first-page').slideUp();
                $('.main-container').show();



            }
            else {
                alert("That username has already been chosen! Please enter another.");
            }
        });
        $('#nickname').val('');
    });
    


    $('form').submit(function(){
      socket.emit('chat message', $('#m').val());
      $('#m').val('');
      return false;
    });


    socket.on('index page', function(data){
        // $('#users-in-queue').html(data.nicknames));
    });


   
    socket.on('usernames', function(data){
        var html = '';
        for (i = 0; i < data.nicknames.length; i++){
            html += '&bull; &nbsp;' + data.nicknames[i] + '<br>'
        }
        $('#users-count').html(html);
        $('#all-users').html(html);
        $('#messages').append($('<li>').text(data.user + " " + "has entered the Q."));


    });

    socket.on('user left', function(data){
        $('#messages').append($('<li>').text(data.user + " " + "has left the Q."));
        var html = '';
        for (i = 0; i < data.nicknames.length; i++){
            html += '&bull; &nbsp;' + data.nicknames[i] + '<br>'
        }
        $('#users-count').html(html);
    });

    socket.on('chat message', function(msg){
        

      if (msg.msg.search("youtube") === 12) {  
        
        var firstHalfUrl = "<iframe width=\u0022100%\u0022 height=\u0022400\u0022src=\u0022http://www.youtube.com/embed/"
        var equalIndex = msg.msg.indexOf("=");
        var videoId = msg.msg.slice(equalIndex+1)
        var secondHalfUrl = "?autoplay=1\u0022></iframe>";
        var fullUrl = (firstHalfUrl + videoId + secondHalfUrl);
        theQ.push("" + videoId);
        $('#song-title').html("Title (Songs in the Q: " + theQ.length + ")");
      
        $('#messages').append($('<li>').html('<b>' + msg.user + '</b>' + " has just added a YouTube video to the q."));
        updateScroll();
        return false;
      }
     
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
