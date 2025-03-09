const sendGrid = require('@sendgrid/mail');

const apiKey = process.env.SEND_GRID_API_KEY

sendGrid.setApiKey(apiKey);

const mailSender = async(email, subject, html) => {
    try {
        const msg = {
            to: email,
            from: process.env.EMAIL,
            subject,
            html
        };

        const info = await sendGrid.send(msg);
        console.log('Email sent successfully!');
    } catch(e) {
        console.log('Error happened!', e.message);
    }
}

module.exports = mailSender;