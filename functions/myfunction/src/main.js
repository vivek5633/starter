import axios from 'axios';

// Your Msg91 API credentials
const authKey = '422647AWRRh9VldHq6650826aP1';
const senderId = 'MSCIENCE'; // 6 characters

// Function to send SMS
async function sendSMS(mobileNumber, message) {
    try {
        const response = await axios.post('https://api.msg91.com/api/v5/flow/', {
            "flow_id": "YourFlowId",
            "recipients": {
                "mobiles": [+919651260202]
            },
            "global_vars": {
                "message": message
            }
        }, {
            headers: {
                'authkey': authKey,
                'Content-Type': 'application/json'
            }
        });

        console.log('Message sent successfully:', response.data);
    } catch (error) {
        console.error('Error sending message:', error.response.data);
    }
}

// Example usage
const mobileNumber = '+919651260202'; // Include country code without leading '+'
const message = 'hey someone send a feedback form';

sendSMS(mobileNumber, message);
