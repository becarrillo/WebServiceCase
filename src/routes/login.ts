import { Request, Response, Router } from "express";

import User from "../models/User";
import IUser from "src/models/IUser";

const bcrypt = require('bcryptjs');
const router = Router();
/*  When '/registro' route is accesed then renderize the template
    the view "index" (program automatically
    takes either with this name, because 'public/views' directory was assigned
    for view templates; this case is a .pug template).
    (es): Cuando la ruta '/registro' sea accedida, entonces el programa
    renderiza la plantilla de la vista "register" (el toma cualquiera
    con este nombre ya que en el servidor se ha asignado la ruta
    view para las plantillas; en este caso es una plantilla .pug)
*/
router.get('/login', (req, res) => {
    res.render("login");
});

router.post('/login/autenticar', async (req : Request<IUser>, res : Response<string>) => {
    const { password } = req.body;
    const { username } = req.body;
    const query = User.findOne({'username': username})
    const foundUserByUsername = await query.exec();
    if (!foundUserByUsername) {
        res.status(401).send("Información incorrecta, verifique nuevamente")
    }
    /*  After loading the hash from your password DB try to compare it with the
        input (same of original put by user at registry).
        (es): Luego de cargada la contraseña encriptada desde la BD trata de com-
        pararla con la original que fue ingresada por el usuario al registrarse */
    try {   
        const passwordIsAuth = bcrypt.compareSync(password, foundUserByUsername?.password);
        passwordIsAuth ? res.status(201).send(
            `Autenticación exitosa, tiene permisos para acceder a los recursos`
        ) : res.status(401).send(
            `Querido usuario '${foundUserByUsername?.username}', la contraseña es incorrecta, por favor verifique`
        );
    }
    catch (error) {
        console.error(error);
        res.status(500).send("Error: " + error).redirect("/login");
    }
});
module.exports = router;