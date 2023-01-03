type RequestBody = {
    email: string;
    asunto: string;
    cuerpo: string;
}

export const enviarEmail = async (req: any, res: any) => {
    const { email, asunto, cuerpo } = req.body as RequestBody;

    res.status(200).json({
        email, asunto, cuerpo
    });
}