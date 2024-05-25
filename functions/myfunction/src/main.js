import axios from 'axios';

export default async function(req, res) {
    let payload;

    
    console.log("Received payload:", req.payload);

    try {
        payload = JSON.parse(req.payload);
    } catch (error) {
        return res.json({
            success: false,
            message: 'Invalid payload format: ' + error.message,
        });
    }

    const { name, email, phone, message } = payload;

    // Debugging: log the parsed values
    console.log("Parsed payload:", payload);

    try {
        const response = await axios.post(
            'https://api.msg91.com/api/v5/flow/',
            {
                flow_id: "66508446d6fc057e543529d2",
                sender: "MSCIENCE",
                recipients: [
                    {
                        mobiles: "+91919651260202",
                        VAR1: name,
                        VAR2: email,
                        VAR3: phone,
                        VAR4: message,
                    },
                ],
            },
            {
                headers: {
                    authkey: "422647AWRRh9VldHq6650826aP1",
                    'Content-Type': 'application/json',
                },
            }
        );

        // Debugging: log the response from MSG91
        console.log("MSG91 response:", response.data);

        return res.json({
            success: true,
            message: 'SMS sent successfully',
            data: response.data,
        });
    } catch (error) {
        // Debugging: log the error
        console.error("Error sending SMS:", error);

        return res.json({
            success: false,
            message: 'Error sending SMS',
            error: error.message,
        });
    }
}
