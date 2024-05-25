import axios from 'axios';

export default async function(req, res) {
    try {
        // Check if req.body is undefined
        if (!req.body) {
            return res.status(400).json({
                success: false,
                message: 'Request body is empty or not properly formatted',
            });
        }

        // Parse the payload
        const { name, email, phone, message } = req.body;

        // Check if all required fields are present
        if (!name || !email || !phone || !message) {
            return res.status(400).json({
                success: false,
                message: 'Missing required fields in the request body',
            });
        }

        // Prepare the data for MSG91 API
        const data = {
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
        };

        // Send the request to MSG91 API
        const response = await axios.post(
            'https://api.msg91.com/api/v5/flow/',
            data,
            {
                headers: {
                    authkey: process.env.MSG91_AUTH_KEY,
                    'Content-Type': 'application/json',
                },
            }
        );

        // Check the response status from MSG91 API
        if (response.status === 200) {
            return res.status(200).json({
                success: true,
                message: 'SMS sent successfully',
                data: response.data,
            });
        } else {
            return res.status(500).json({
                success: false,
                message: 'Failed to send SMS',
            });
        }
    } catch (error) {
        console.error("Error sending SMS:", error);

        return res.status(500).json({
            success: false,
            message: 'Error sending SMS',
            error: error.message,
        });
    }
}
