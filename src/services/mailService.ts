import nodemailer from 'nodemailer';
import {google} from 'googleapis';

const OAuth2 = google.auth.OAuth2;

export const sendMail= async(email: string, asunto: string, cuerpo: string) => {
    const oauth2Client = new OAuth2(process.env.ID_CLIENTE, process.env.SECRETO_CLIENTE, process.env.REDIRECT_URL);

    oauth2Client.setCredentials({
        refresh_token: process.env.REFRESH_TOKEN,
    });

    const accessToken = await oauth2Client.getAccessToken();

    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            type: 'OAuth2',
            user: process.env.EMAIL,
            clientId: process.env.ID_CLIENTE,
            clientSecret: process.env.SECRETO_CLIENTE,
            refreshToken: process.env.REFRESH_TOKEN,
            accessToken: JSON.stringify(accessToken.token)
        }
    });

    const mailOptions = {
        from: process.env.EMAIL,
        to: email,
        subject: asunto,
        text: cuerpo
    };

    try{
        await transporter.sendMail(mailOptions);
        return true;
    }catch(error){
        console.log(error);
        return false;
    }
}