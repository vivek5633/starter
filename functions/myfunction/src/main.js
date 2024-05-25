import axios from 'axios';

class Msg91 {
    constructor(senderId, authKey) {
        this.senderId = "MSCIENCE";
        this.authKey = "422647AWRRh9VldHq6650826aP1";
    }

    getName() {
        return 'Msg91';
    }

    getMaxMessagesPerRequest() {
        // TODO: Find real limit
        return 1000;
    }

    async process(message) {
        const to = message.getTo().map(to => ({ mobiles: to.replace('+', '') }));

        const response = await axios.post('https://api.msg91.com/api/v5/flow/', {
            sender: this.senderId,
            otp: message.getContent(),
            flow_id: message.getFrom(),
            recipients: [to],
        }, {
            headers: {
                'Content-Type': 'application/json',
                'authkey': this.authKey,
            }
        });

        return response.data;
    }

    async addTemplate(content, templateName, smsType = 'NORMAL') {
        const response = await axios.post('https://control.msg91.com/api/v5/sms/addTemplate', {
            template: content,
            sender_id: this.senderId,
            template_name: templateName,
            smsType: smsType,
        }, {
            headers: {
                'Content-Type': 'application/json',
                'authkey': this.authKey,
            }
        });

        return response.data;
    }
}

export default Msg91;
