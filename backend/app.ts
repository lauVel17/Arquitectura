import dotenv from 'dotenv';
import server from './models/server';

dotenv.config();

/* configuracion dotenv para**/
const serve = new server();
serve.listen();