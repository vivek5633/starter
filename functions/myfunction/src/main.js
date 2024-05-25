const express = require('express');
const axios = require('axios');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware to parse JSON bodies
app.use(express.json());

// Route to send SMS
app.post('/send-sms', async (req, res) => {
    const { name, email, phone, message } = req.body;

    try {
        const response = await axios.post(
            'https://api.msg91.com/api/v5/flow/',
            {
                flow_id: process.env.MSG91_TEMPLATE_ID,
                sender: process.env.MSG91_SENDER_ID,
                recipients: [
                    {
                        mobiles: [process.env.MY_PHONE_NUMBER],
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

        if (response.status === 200) {
            res.status(200).json({ message: 'SMS sent successfully' });
        } else {
            res.status(response.status).json({ message: 'Failed to send SMS' });
        }
    } catch (error) {
        console.error('Error sending SMS:', error);
        res.status(500).json({ message: 'Error sending SMS' });
    }
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
