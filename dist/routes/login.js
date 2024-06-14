"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const User_1 = __importDefault(require("../models/User"));
const bcrypt = require('bcryptjs');
const router = (0, express_1.Router)();
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
router.post('/login/autenticar', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { password } = req.body;
    const { username } = req.body;
    const query = User_1.default.findOne({ 'username': username });
    const foundUserByUsername = yield query.exec();
    if (!foundUserByUsername) {
        res.status(401).send("Información incorrecta, verifique nuevamente");
    }
    /*  After loading the hash from your password DB try to compare it with the
        input (same of original put by user at registry).
        (es): Luego de cargada la contraseña encriptada desde la BD trata de com-
        pararla con la original que fue ingresada por el usuario al registrarse */
    try {
        const passwordIsAuth = bcrypt.compareSync(password, foundUserByUsername === null || foundUserByUsername === void 0 ? void 0 : foundUserByUsername.password);
        passwordIsAuth ? res.status(201).send(`Autenticación exitosa, tiene permisos para acceder a los recursos`) : res.status(401).send(`Querido usuario '${foundUserByUsername === null || foundUserByUsername === void 0 ? void 0 : foundUserByUsername.username}', la contraseña es incorrecta, por favor verifique`);
    }
    catch (error) {
        console.error(error);
        res.status(500).send("Error: " + error).redirect("/login");
    }
}));
module.exports = router;
