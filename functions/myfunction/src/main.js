const sdk = require('node-appwrite');

// Init SDK
const client = new sdk.Client();

const messaging = new sdk.Messaging(client);

client
    .setEndpoint('https://cloud.appwrite.io/v1') // Your API Endpoint
    .setProject('6650338c002663d9f2ce')                 // Your project ID
    .setKey('665034f20017de8170fb') // Your secret API key
;

// Assuming you have retrieved the phone number and message content from somewhere
const phoneNumber = '+919651260202';
const messageContent = 'data is updated';

// Send SMS using Appwrite's Messaging API
const message = await messaging.createSMS(
    'msg91',                                    // SMS provider (Msg91)
    messageContent,                             // Message content
    [],                                         // Topics (optional)
    [phoneNumber],                              // Recipient phone numbers
    [],                                         // Targets (optional)
    true,                                       // Draft (optional)
    ''                                          // Scheduled at (optional)
);

console.log('SMS sent successfully:', message);
