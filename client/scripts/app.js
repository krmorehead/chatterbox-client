//YOUR CODE HERE:
var message = {
  username: 'shawndrost',
  text: 'trololo',
  roomname: '4chan'
};

var userName = "us"
var app = {};
app.init = function(){};
var messages = false;
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
      messages = data.results;
    },
    error: function (data) {
      // See: https://developer.mozilla.org/en-US/docs/Web/API/console.error
      console.error('chatterbox: Failed to send message');
    }
  });

  $(document).ajaxSuccess(function() {
    //$( ".log" ).text( "Triggered ajaxSuccess handler." );
    displayMessages(messages)
    console.log(messages)
  });
}

app.clearMessages = function() {
  $("#chats").empty()
}

app.addMessage = function(message) {
  $("#chats div:last-child").append("<span class = chat>" + message+"</span>")
  //displayMessages();
}
app.addUsername = function(message) {
  $("#chats").append("<div class = username>" + message+"</div>")
  //displayMessages();
}

app.addRoom = function(roomName){ 
  $("#roomSelect").append("<div class = room>"+roomName+ "</div>");
}

app.addFriend = function() {};




var addToFriendsList = function() {

}

var displayMessages = function(msgObj) {

  //check
  if(messages !== undefined){
    msgObj = msgObj || messages;
    app.clearMessages();
    for (var i = 0; i < msgObj.length; i++) {
      if(msgObj[i].text){
        var text = escapeHtml(msgObj[i].text)
        var username = escapeHtml(msgObj[i].username);
        app.addUsername(username)
        app.addMessage(text)
      }
    }
  }
}

function escapeHtml(str) {
    var div = document.createElement('div');
    div.appendChild(document.createTextNode(str));
    return div.innerHTML;
};


$('.username').on("click",app.addFriend());
app.fetch()