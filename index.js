const express = require("express");
const app = new express();
const bodyParser = require("body-parser");
const connection = require("./database/database")

//importando o controller 
const categoriesController = require("./categories/CategoriesController")
const articlesController = require("./articles/ArticlesController")

//importantando model do bando de dados
const Article = require("./articles/Article")
const Category = require("./categories/Category")

//configurando o view engine
app.set('view engine', 'ejs');

// configurando o bory parser
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

//configurando os arquivos staticos
app.use(express.static('public'))

//autenticando a conexao e testando
connection.authenticate().then(() => {
    console.log("conectado com sucess")
}).catch(err => {
    console.log(err)
})

//usando as rotas do controllers
app.use("/", categoriesController);

app.use("/", articlesController);

app.get("/", (req, res) => {
    res.render("index")
})

// rodando servidor
app.listen(8080, () => {
    console.log('servidor rodando')
});