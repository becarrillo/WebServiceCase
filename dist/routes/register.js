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
router.post('/registro/guardar', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let register;
    const { password } = req.body;
    const salt = bcrypt.genSaltSync(10);
    // To create synchronously a hash (encrypted password)
    const hash = bcrypt.hashSync(password, salt);
    // To assign hash to request body and to store it in DB
    req.body['password'] = hash;
    try {
        register = yield User_1.default.create(req.body);
    }
    catch (error) {
        res.status(500).send("Error: " + error);
        console.error(error);
        res.redirect("/registro");
    }
    res.status(201).send(`Usuario ${register === null || register === void 0 ? void 0 : register.firstname} ${register === null || register === void 0 ? void 0 : register.lastname} con documento de ID No. ${register === null || register === void 0 ? void 0 : register.documentId} fue GUARDADO con éxito`);
}));
module.exports = router;
