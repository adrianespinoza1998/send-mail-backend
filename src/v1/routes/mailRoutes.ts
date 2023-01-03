import {Router, Request, Response} from 'express';
import { check } from 'express-validator';

const router = Router();

router.post('/send', [
    check('email', 'El email es obligatoria').not().isEmpty(),
    check('email', 'El email debe ser un string').isString(),
    check('email', 'El email debe ser un email válido').isEmail(),
], (req: Request, res: Response) => {
    
    const {email, asunto, cuerpo} = req.body;
    res.status(200).json({
        email,
        asunto,
        cuerpo
    });
});

export default router;