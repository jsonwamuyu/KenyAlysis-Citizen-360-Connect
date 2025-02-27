const nodemailer = require('nodemailer');

// Create a transport
const transport = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.GMAIL_USER,
        pass: process.env.GMAIL_PASSWORD,
    }
});


const sendEmail = async (to, subject, text, html = '') => {
    try {
        const info = await transport.sendMail({
            from: `"KenyAlysis App" <${process.env.GMAIL_USER}>`, // Sender name & email
            to,
            subject,
            text,
            html
        });

        console.log(`📧 Email sent: ${info.messageId}`);
        return info;
    } catch (error) {
        console.error('❌ Error sending email:', error);
        throw error;
    }
};


module.exports = sendEmail;
