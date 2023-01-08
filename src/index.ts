import express from 'express';
import cors from 'cors';
import cluster from "cluster";
import { cpus } from "os";
import 'dotenv/config';
import path from 'path';

import mailRoutes from './v1/routes/mailRoutes';
import verificarHost from './middlewares/verificarHost';

const numCPUs = cpus().length;

const app = express();

app.use(express.static('public'));
app.use(cors());
app.use(express.json());
app.use(verificarHost);

app.use('/api/v1/mail', mailRoutes);

app.all("*", (req, res) => {
    res.sendFile(path.join(__dirname, "./public/index.html"));
});

const port = process.env.PORT || 3000;

let server = null;

if(process.env.NODE_ENV === 'production') {
    if (cluster.isMaster) {
        for (let i = 0; i < numCPUs; i++) {
          // Create a worker
          cluster.fork();
        }
    }   else {
        app.listen(port, () => {
            console.log(`Server running on port ${port}`);
        });
    }
}else{
    server = app.listen(port, () => {
        console.log(`Server running on port ${port}`);
    });
}

module.exports = {
    app,
    server
}