// update bot after deployment https://api.telegram.org/botYOUR_BOT_TOKEN_HERE/setWebhook?url=https://script.google.com/macros/s/XXXXXXXXXXXXXXX/exec
// update bot after deployment https://api.telegram.org/botXXXXXXXXXX:XXXXXXX/setWebhook?url=https://script.google.com/macros/s/XXXXXXXXXXXXXXX/exec
// Replace 'YOUR_BOT_TOKEN' with your actual Telegram bot token.
var botToken = 'XXXXXXXXXX:XXXXXXX';


var updates = {};
function doPost(e) {
  var data = JSON.parse(e.postData.contents);

  var updateId = data.update_id;

  if (updates[updateId]) {
    return; // already processed
  }

  updates[updateId] = true;  
  
  var chatId = data.message.chat.id;
  var text = data.message.text;

  if (text === '/checkforbills') {
    sendText(chatId, 'Success!');
  } else if (text === '/othercommand') {
      sendText(chatId, 'Other command');
} else {
  sendText(chatId, 'Unknown command');
  return;
}

  //return ContentService.createTextOutput(''); 

}

function sendText(chatId, text) {

  var url = 'https://api.telegram.org/bot' + botToken + '/sendMessage';

  var options = {
    'method' : 'post',
    'contentType' : 'application/json',
    'payload' : JSON.stringify({
      'chat_id' : chatId,
      'text' : text
    })
  };

  UrlFetchApp.fetch(url, options);

}
