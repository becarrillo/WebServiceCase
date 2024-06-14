import mongoose from 'mongoose';
require('dotenv/config');


const MONGOURL = process.env.MONGODB_URL;
/*  (es): Si la cadena de conexión a BD en archivo .env exis-
    te o no es 'undefined' el programa intentará de conectarse*/
if (MONGOURL) {
    (async () => {
        try {
            // asynchronous connection
            await mongoose.connect(MONGOURL, {
                serverSelectionTimeoutMS: 5000
            });
            console.log("BD conectada exitosamente");
        } catch (error) {
            console.log(error);
        }
    })();
}
