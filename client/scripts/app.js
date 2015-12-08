//YOUR CODE HERE:
var message = {
  username: 'shawndrost',
  text: 'trololo',
  roomname: '4chan'
};

var friends = {};
var app = {};
app.init = function(){};
var messages;
app.server = 'https://api.parse.com/1/classes/chatterbox'

app.send = function(message , user){
  if(typeof message !== "object"){
    message = {
      text: message,
      userName: user || userName
    }
  }

  $.ajax({
    // This is the url you should use to communicate with the parse API server.
    url: app.server,
    type: 'POST',
    data: JSON.stringify(message),
    contentType: 'application/json',
    success: function (data) {
      console.log('chatterbox: Message sent');
    },
    error: function (data) {
      // See: https://developer.mozilla.org/en-US/docs/Web/API/console.error
      console.error('chatterbox: Failed to send message');
    }
  });
};

app.fetch = function(){

  $.ajax({
    // This is the url you should use to communicate with the parse API server.
    url: app.server,
    type: 'GET',
    data: JSON.stringify(message),
    contentType: 'application/json',
    success: function (data) {
      console.log('chatterbox: Message recieved');
      //console.log(data);
      messages = data;
    },
    error: function (data) {
      // See: https://developer.mozilla.org/en-US/docs/Web/API/console.error
      console.error('chatterbox: Failed to send message');
    }
  });

  $(document).ajaxSuccess(function() {
    //$( ".log" ).text( "Triggered ajaxSuccess handler." );
    displayMessages()
    console.log(messages,"AJAX SUCCESS")
  });
}

app.clearMessages = function() {
  $("#chats").empty()
}

app.addMessage = function(message) {
  app.send(message);
  app.fetch();
}


app.addRoom = function(roomName){ 
  $("#roomSelect").append("<div class = room>"+roomName+ "</div>");
}

app.addFriend = function(friend) {
  friends[friend] = true
  console.log("Frand")
};





var displayMessages = function() {
  app.clearMessages();
  console.log(messages, "AJAX FETCH");
  for (var i = 0; i < messages.results.length; i++) {
    if(messages.results[i].text){
      var text = escapeHtml(messages.results[i].text)
      var username = escapeHtml(messages.results[i].username);
      if(friends[username]){
        $("#chats:last-child").append("<span class = username>" + username+"</span>")
        $("#chats").append("<div class = chat><strong>"+text+"</strong></div>")      
      }
      else{
        $("#chats:last-child").append("<span class = username>" + username+"</span>")
        $("#chats").append("<div class = chat>" + text +"</div>")
      }
    }
  }
}


function escapeHtml(str) {
    var div = document.createElement('div');
    div.appendChild(document.createTextNode(str));
    return div.innerHTML;
};

$(document).ready(function(){
  console.log("READY");
  $('#main').on('click','.username',function(){
    // console.log(this.textContent)
    var friend = this.textContent; 
    app.addFriend(friend)
  });
  app.fetch();
});
