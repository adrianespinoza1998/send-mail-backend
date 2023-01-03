import {Router, Request, Response} from 'express';
import { check } from 'express-validator';
import { enviarEmail } from '../../controllers/mailController';

const router = Router();

router.post('/send', [
    check('email', 'El email es obligatoria').not().isEmpty(),
    check('email', 'El email debe ser un string').isString(),
    check('email', 'El email debe ser un email válido').isEmail(),
], enviarEmail);

export default router;