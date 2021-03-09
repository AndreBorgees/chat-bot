//Importando os modulos da aplicação
var express = require('express');
var consign = require('consign');
var bodyParser = require('body-parser');
var expressValidator = require('express-validator');

//Iniciar o obojeto do express
var app = express();

//Setar as variaveis
app.set('view engie', 'ejs');
app.set('views', './app/views');

//configurar os middlewares
app.use(express.static('./app/public'));
app.use(bodyParser.urlencoded({extended: true}));
app.use(expressValidator());

//Autoload das rotas, models, controllers para o objeto app
consign()
    .include('app/routes')
    .then('app/models')
    .then('app/controllers')
    .into(app);

//Exportar o objeto do app
module.exports = app;