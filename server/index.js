import express from "express";
import { sql } from "./db.js";
import { register } from "./controllers/register.js";
import { auth } from "./controllers/auth.js";
import { roleMiddleware } from "./middlewares/roleMiddleware.js";
import cors from 'cors'
import multer from 'multer'
import path from "path"
import jwt from 'jsonwebtoken'


//порт на котором будет работать сервер
const PORT = 3000

//сама переменная сервера
const app = express()

//чтобы сервер понимал json
app.use(express.json())
app.use(cors())
app.use(express.static('uploads'));

var storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, './uploads/')
    },
    filename: function (req, file, cb) {
      cb(null, Date.now() + path.extname(file.originalname))
    }
  })
  
var upload = multer({ storage: storage })


app.get('/', roleMiddleware(["ADMIN"]), async (req, res) => {
    const data = await sql`select * from Users`
    res.send(data)
})

//ветка регистрации
app.post('/reg', register)
//ветка логина
app.post('/auth', auth)

app.get("/masterclasses_all/", roleMiddleware(['USER', 'ADMIN']), async (req, res) => {
    const data = await sql`select * from MasterClasses`
    res.send(data)
})

app.get("/user_info/", roleMiddleware(['USER']), async (req, res) => {
    const token = req.headers.authorization.split(' ')[1]
    const {id} = jwt.verify(token, "SECRET_KEY")
    const data = await sql`select * from users where user_id = ${id}`
    res.send(data)
})

app.get("/admin_info/", roleMiddleware(['ADMIN']), async (req, res) => {
    const token = req.headers.authorization.split(' ')[1]
    const {id} = jwt.verify(token, "SECRET_KEY")
    const data = await sql`select * from users where user_id = ${id}`
    res.send(data)
})

app.post("/add_mk/", roleMiddleware(['ADMIN']), upload.single('image'), async (req, res) => {
    const image = req.file.filename
    const { name, price, date, place, adress, thematic, age_limit} = req.body
    console.log(image)
    console.log(req.headers.authorization);
    const data = await sql`INSERT INTO MasterClasses(name, price, date, image, place, adress, thematic, age_limit) values(${name}, ${price}, ${date}, ${`http://localhost:3000/${image}`}, ${place}, ${adress}, ${thematic}, ${age_limit})`
    res.sendStatus(200)
})

//функция старта приложения
const start = async () => {

    //создаем таблицы
    await sql`create table if not exists Roles(
        role varchar(100) unique primary key
    )`
    await sql`create table if not exists Users(
        user_id SERIAL PRIMARY KEY NOT NULL,
        name varchar(100) NOT NULL,
        email varchar(100),
        phone_number varchar(100),
        password varchar(100),
        role varchar(100),
        FOREIGN KEY (role) REFERENCES Roles(role)
    )`
    await sql`create table if not exists Records(
        record_id SERIAL PRIMARY KEY NOT NULL,
        name varchar(100) NOT NULL,
        email varchar(100),
        phone_number varchar(100),
        fk_user INTEGER REFERENCES users(user_id)
    )`
    await sql`create table if not exists MasterClasses(
        mk_id SERIAL PRIMARY KEY NOT NULL,
        name varchar(100) NOT NULL,
        price varchar(100) NOT NULL,
        date varchar(100) NOT NULL,
        image varchar(100) NOT NULL,
        place varchar(100) NOT NULL,
        adress varchar(100) NOT NULL,
        thematic varchar(100),
        age_limit varchar(100)
    )`

    //запустить в первый раз и больше не запускать
    //чтобы добавить роли в таблицу ролей

    //await sql`insert into Roles(role) values('USER')`
    //await sql`insert into Roles(role) values('ADMIN')`

    //запустить сервак
    //(прослушивать порт на запросы)
    //вторым аргументом функция которая запустится при успешном запуске сервака



    app.listen(PORT, () => {
        console.log(`СЕРВЕР ЗАПУЩЕН НА ПОРТУ http://localhost:${PORT}`);
    })
}

start()
