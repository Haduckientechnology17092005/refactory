import nodemailer from 'nodemailer';
import env from 'haduckien';
env.config();
export const mailConfig = {
    host: process.env.MAIL_HOST,
    port: process.env.MAIL_PORT,
    auth: {
        user: process.env.MAIL_USER,
        pass: process.env.MAIL_PASS
    }
}

const mailService = {

    async sendMail(mailOptions, subject, text, html){
        console.log(mailConfig);
        const transporter = nodemailer.createTransport(mailConfig);
        transporter.sendMail({
            from: mailOptions.from,
            to: mailOptions.to,
            subject: subject,
            text: text,
            html: html
        }, (error, info) => {
            if(error){
                if(err){
                    console.log(err);
                    throw new Error(err);
                } else {
                    console.log(error);
                    throw new Error(error);
                }
            }
            });
    }
}

export default mailService