import { Request, Response, Router } from "express";

import User from "../models/User";
import IUser from "src/models/IUser";

const bcrypt = require('bcryptjs');
const router = Router();
/*  When '/registro' route is accesed then renderize the template
    the view "index" (program automatically
    takes either with this name, because view directory was assigned
    for view templates; this case is a .pug template).
    (es): Cuando la ruta '/registro' sea accedida, entonces el programa
    renderiza la plantilla de la vista "register" (el toma cualquiera
    con este nombre ya que en el servidor se ha asignado la ruta
    view para las plantillas; en este caso es una plantilla .pug)
*/
router.get('/registro', (req, res) => {
    res.render("register");
});

router.post('/registro/guardar', async (req : Request<IUser>, res : Response<string>) => {
    let register;
    const { password } = req.body;
    const salt = bcrypt.genSaltSync(10);
    // To create synchronously a hash (encrypted password)
    const hash = bcrypt.hashSync(password, salt);
    // To assign hash to request body and to store it in DB
    req.body['password'] = hash;
    try {
        register = await User.create(req.body);
    }
    catch (error) {
        res.status(500).send("Error: " + error);
        console.error(error);
        res.redirect("/registro");
    }
    res.status(201).send(`Usuario ${register?.firstname} ${register?.lastname} con documento de ID No. ${register?.documentId} fue GUARDADO con éxito`);
});
module.exports = router;
