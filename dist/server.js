"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const morgan_1 = __importDefault(require("morgan"));
const path_1 = __importDefault(require("path"));
const app = (0, express_1.default)();
require("./database");
// Settings
app.set('PORT', process.env.PORT || 3000);
app.set('views', path_1.default.join(__dirname, 'public/views'));
app.set('view engine', 'pug');
// Middlewares
app.use((0, morgan_1.default)('short'));
app.use(express_1.default.urlencoded({ extended: false }));
express_1.default.json();
// Routes
app.use(require('./routes/index'));
app.use(require('./routes/login'));
app.use(require('./routes/register'));
// Application port is setted, then it shows message
app.listen(app.get('PORT'), () => {
    console.log(`Server running on port ${app.get('PORT')}`);
});
