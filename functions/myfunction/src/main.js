const axios = require('axios');

module.exports = async function (req, res) {
    const payload = JSON.parse(req.payload);
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

        res.json({
            success: true,
            message: 'SMS sent successfully',
            data: response.data,
        });
    } catch (error) {
        console.error('Error sending SMS:', error);
        res.json({
            success: false,
            message: 'Error sending SMS',
            error: error.response ? error.response.data : error.message,
        });
    }
};
