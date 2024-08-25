const nodemailer = require('nodemailer');
const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 465,
    secure: true,
    auth: {
        user: 'faruuq.aiesec@gmail.com',
        pass: 'mgle dwyn blxb dfve'
    }
});

class NodemailerRepository {
    sendEmail = async () => {
        const info = await transporter.sendMail({
            from: '"Damn Cool Guy 👻" <faruuq.aiesc@gmail.com>',
            to: 'm.faruuq.q@gmail.com',
            subject: 'Testing Nodemailer',
            text: 'This is just a test using nodemailer. Do ignore...',
            html: "<b>Do ignore...</b>",
        });
        return info
    }
}

module.exports = NodemailerRepository;