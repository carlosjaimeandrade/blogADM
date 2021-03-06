const express = require("express");
const app = new express();
const bodyParser = require("body-parser");
const connection = require("./database/database")

//importando o controller 
const categoriesController = require("./categories/CategoriesController")
const articlesController = require("./articles/ArticlesController")
const userController = require("./user/UserController")

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

app.use("/", userController)

app.get("/", (req, res) => {
    Article.findAll({
        order: [['id', 'DESC']],
        limit: 4
    }).then(articles => {
        
        Category.findAll().then(categories => {
            res.render('index', { articles: articles, categories: categories })
        })

    })

})

app.get("/article/:slug", (req, res) => {
    const slug = req.params.slug
    Article.findOne({
        where: {
            slug: slug
        }
    }).then(article => {
        if (article != undefined) {
            Category.findAll().then(categories => {
                res.render('article', { article: article, categories: categories })
            })

        } else {
            res.redirect('/')
        }
    }).catch(err => {
        res.redirect('/')
    })
})

app.get("/category/:categoryid",(req,res)=>{
    const categoryId = req.params.categoryid

    Article.findAll({
        where: { categoryid: categoryId },
        include:[{model: Category}]
    }).then(articles => {
        console.log(articles)
        Category.findAll().then(categories =>{
            res.render('index', { articles: articles, categories: categories})
        })

       
    })
    
})

// rodando servidor
app.listen(8081, () => {
    console.log('servidor rodando')
})