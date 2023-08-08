// Telegram bot token and chat ID
var telegramToken = 'XXXXXXX:XXXXXXXXXXXX'; 
var chatId = 'XXXXXXXXXX';

function sendDailyReport() {

  // Search for unread messages  
  var query = 'is:unread subject:"XXXXXXXXXX"';
  var threads = GmailApp.search(query);

  // Build Telegram message
  var message = '';
  if (threads.length > 0) {
    // Build message
    var message = threads.length + ' unread messages found:';
    for (var i = 0; i < threads.length; i++) {
      message += '\n- ' + threads[i].getFirstMessageSubject();
    }
    
    // Send report to Telegram
    sendTelegramMessage(message);

  } else {
    message = 'No unread messages found';
  }
}

function sendTelegramMessage(message) {

  // Build request
  var url = 'https://api.telegram.org/bot' + telegramToken + '/sendMessage?chat_id=' + chatId + '&text=' + encodeURIComponent(message);

  var response = UrlFetchApp.fetch(url);

  // Check for errors
  if (response.getResponseCode() != 200) {
    Logger.log('Telegram error: ' + response.getContentText());
  }  

}

function createDailyTrigger() {

  // Jerusalem time zone
  var jerusalemTimeZone = "Asia/Jerusalem";

  // Set trigger to run at 8pm daily
  ScriptApp.newTrigger('sendDailyReport')
    .timeBased()
    .atHour(09) 
    .nearMinute(14)
    .inTimezone(jerusalemTimeZone)
    .everyDays(1)
    .create();

// Jerusalem time zone
  var jerusalemTimeZone = "Asia/Jerusalem";

  // Set trigger to run at 8pm daily
  ScriptApp.newTrigger('sendDailyReport')
    .timeBased()
    .atHour(11) 
    .nearMinute(14)
    .inTimezone(jerusalemTimeZone)
    .everyDays(1)
    .create();

}
