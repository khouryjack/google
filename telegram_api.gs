// Telegram bot token and chat ID
var TELEGRAM_BOT_TOKEN = 'XXXXXXXXXXXXXX'; 
var TELEGRAM_CHAT_ID = 'XXXXXX';

function doGet(e) {
  
  // Get command text
  var command = e.parameter.command;

  // Handle /checkforbills command
  if (command == "/checkforbills") {

    var response = checkUnreadBills(); 

    // Build Telegram response
    var data = {
      method: "sendMessage",
      chat_id: TELEGRAM_CHAT_ID,
      text: response
    };
    
    // Return to Telegram    
    return ContentService
          .createTextOutput(JSON.stringify(data))
          .setMimeType(ContentService.MimeType.JSON); 
  } else if (command) {

    // Invalid command  
    return ContentService.createTextOutput(JSON.stringify({
      method: "sendMessage",
      chat_id: TELEGRAM_CHAT_ID,
      text: "Invalid command: " + command
    })).setMimeType(ContentService.MimeType.JSON);

  }
  
}

function checkUnreadBills() {

  // Search for unread messages  
  var query = 'is:unread subject:"החשבון שלך"';
  var threads = GmailApp.search(query);
 
  // Build response text
  var response = "No unread bills found.";
  
  if (threads.length > 0) {
   response = "Found " + threads.length + " unread bills:";
  }
  for (var i = 0; i < threads.length; i++) {
      response += '\n- ' + threads[i].getFirstMessageSubject();
    }

  return response;

}
