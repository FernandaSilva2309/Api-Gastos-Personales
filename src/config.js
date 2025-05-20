//Configuraciones del servidor
//Nombre de la aplicacion
export const APP_NAME = "SazonITO";
//Puerto del servidor
export const PORT = process.env.PORT || 3000;
//Ruteo sensible a mayusculas
export const CASE_SENSITIVE_ROUTING = true;
//Secret Key
export const TOKEN_SECRET = 'fernandatokensecreto';
//Stripe Secret Key
export const STRIPE_SECRET_KEY = '';
export const STRIPE_WEBHOOK_SECRET = "";

//Base de datos
export const DB_HOST = 'localhost';
export const DB_USER = 'root';
export const DB_PASSWORD = '20161261';
export const DB_NAME = 'sazon';
export const DB_PORT = 3306;