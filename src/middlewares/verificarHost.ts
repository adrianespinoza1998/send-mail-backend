import { Request, Response, NextFunction } from 'express';

const verificarHost = (req: Request, res: Response, next: NextFunction) => {
    if(req.hostname === process.env.HOST || req.hostname === process.env.HOST_DEV){
        next();
    }else{
        res.status(403).json({
            error: 'No tiene permiso para realizar esta acción',
            hostname: req.hostname
        });
    }
};

export default verificarHost;