import axios from 'axios';

export default async function (req, res, context) {
    let payload;

    try {
        payload = JSON.parse(req.payload);
    } catch (error) {
        console.error('Error parsing payload:', error);
        return context.log('Invalid payload format: ' + error.message);
    }

    const { name, email, phone, message } = payload;

    try {
        const response = await axios.post(
            'https://api.msg91.com/api/v5/flow/',
            {
                flow_id: process.env.MSG91_TEMPLATE_ID,
                sender: process.env.MSG91_SENDER_ID,
                recipients: [
                    {
                        mobiles: process.env.MY_PHONE_NUMBER,
                        VAR1: name,
                        VAR2: email,
                        VAR3: phone,
                        VAR4: message,
                    },
                ],
            },
            {
                headers: {
                    authkey: process.env.MSG91_AUTH_KEY,
                    'Content-Type': 'application/json',
                },
            }
        );

        context.log('SMS sent successfully: ' + JSON.stringify(response.data));
        res.json({
            success: true,
            message: 'SMS sent successfully',
            data: response.data,
        });
    } catch (error) {
        console.error('Error sending SMS:', error);
        context.log('Error sending SMS: ' + error.message);
        res.json({
            success: false,
            message: 'Error sending SMS',
            error: error.message,
        });
    }
};
