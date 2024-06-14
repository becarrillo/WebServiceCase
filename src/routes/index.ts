import { Router } from "express";

const router = Router();
/*  When index route is accessed then renderize the template
    the view "index" (program automatically
    takes either with this name, because view directory was assigned
    for view templates; this case is a .pug template).
    (es): Cuando la ruta raíz sea accedida, entonces el programa
    renderiza la plantilla de la vista "index" (el toma cualquiera
    con este nombre ya que en el servidor se ha asignado la ruta
    view para las plantillas; en este caso es una plantilla .pug)
*/
router.get('/', (req, res) => {
    res.render("index");
});

module.exports = router;