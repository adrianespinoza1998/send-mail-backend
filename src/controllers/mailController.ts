import { sendMail } from '../services/mailService';
type RequestBody = {
    email: string;
    asunto: string;
    cuerpo: string;
}

export const enviarEmail = async(req: any, res: any) => {
    const { email, asunto, cuerpo } = req.body as RequestBody;

    const mailService = await sendMail(email, asunto, cuerpo);

    if(mailService){
        res.status(200).json({
            message: 'Email enviado'
        });
    }else{
        res.status(500).json({
            message: 'Error al enviar el email'
        });
    }
}