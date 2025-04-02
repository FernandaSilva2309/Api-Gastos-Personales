import app from './app.js';
import { APP_NAME } from './config.js';
import { PORT } from "./config.js";
import { CASE_SENSITIVE_ROUTING } from './config.js';
import { connectDB } from './db.js'

app.set('appName', APP_NAME);
app.set('port', PORT);
app.set('case sensitive routing', CASE_SENSITIVE_ROUTING);

connectDB();

app.listen(app.get('port'));
console.log(`Aplicacion ${app.get('appName')} corriendo en el puerto ${app.get('port')}`);