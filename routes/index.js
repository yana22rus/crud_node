import {Router} from 'express';
import sqlite3 from 'sqlite3'

export const routes = Router();

const db = new sqlite3.Database('db_test.db');

routes.get('/', (req, res) => {

    db.all('SELECT * FROM users ORDER by first_name', (err, results) => {
        if (err) {
            console.log(err)
        }
        res.render("index", {"results": results})
    });
});

routes.post('/add', (req, res) => {

    let data = [req.body.first_name, req.body.experience, req.body.profession, req.body.sex, req.body.salary]
    db.run('INSERT INTO users (first_name,experience,profession,sex,salary) VALUES (?,?,?,?,?)', data);
    res.redirect('/posts/')
});

routes.post('/delete', (req, res) => {

    db.run('DELETE FROM users WHERE ID=(?)', req.body.delete);
    res.redirect('/posts/')

})

routes.get('/edit/:id', (req, res) => {

    let params = req.params.id
    let sql = "select * from users where id = ?"
    db.get(sql, params, (err, row) => {
        if (err) {
            console.log(err)
        }

        res.render("id", {"data": row})
    });

})

routes.post('/edit/:id', (req, res) => {

    console.log(req.params.id)

    let data = [req.body.first_name, req.body.experience, req.body.profession, req.body.sex, req.body.salary, req.params.id]
    let sql = `UPDATE users SET first_name = ?, experience = ?, profession = ?, sex = ?, salary = ? WHERE id = ?`


    db.run(sql, data, (err, results) => {
        if (err) {
            console.log(err)
        }
        res.redirect(`/posts/edit/${req.params.id}`)

    })

})




