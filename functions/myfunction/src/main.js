import { fetch } from 'undici';

// Define the function
 async function sendSMSWithMsg91({ req, res, log, error }) {
    // const MSG91_API_KEY = '422647AWRRh9VldHq6650826aP1';
    // const MSG91_SENDER_ID = 'MSCIENCE';

    const s = await fetch("https://google.com");
   

   log(s);

    // const url = 'https://api.msg91.com/api/v5/flow/';

    // const requestBody = {
    //     flow_id: "66508446d6fc057e543529d2", 
    //     sender: MSG91_SENDER_ID,
    //     recipients: [
    //         {
    //             mobiles: "+919651260202",
    //             VAR1: "jesdfbnsdkjfbs",
    //         }
    //     ]
    // };

    // try {
    //     const response = await axios.post(url, requestBody, {
    //         headers: {
    //             'authkey': MSG91_API_KEY,
    //             'Content-Type': 'application/json'
    //         }
    //     });

    //     return response.data;
    // } catch (error) {
    //     console.error('Error sending SMS:', error);
    //     throw error;
    // }
    log('Hello, Logs!');

        // Send a response with the res object helpers
        // `res.send()` dispatches a string back to the client
        return res.send('Hello, World!');
      
    
}

export default sendSMSWithMsg91


