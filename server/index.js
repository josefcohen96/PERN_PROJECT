const express = require("express");
const app = express();
const cors = require("cors");
const pool = require("./db");


//middleware
app.use(cors());
app.use(express.json());

//ROUTES//

// create a TODO
app.post("/todos", async (req, res) => {
    try {
        const { first_name } = req.body;
        const { last_name } = req.body;
        const { email } = req.body;
        const { phone_number} = req.body;
        const { id } = req.body;


        const newTodo = await pool.query("INSERT INTO users (first_name, last_name, email, phone_number, id) VALUES($1,$2,$3,$4,$5) RETURNING *",
            [first_name, last_name, email, phone_number,id ]);
        res.json(newTodo.rows[0]);
    } catch (err) {
        console.error(err.message);
    }
})
//GETS ALL TODOS 

app.get("/todos", async (req, res) => {
    try {
        const allTodos = await pool.query("SELECT * FROM users");
        res.json(allTodos.rows);
    } catch (err) {
        console.error(err.message);
    }
})

//GET A TODO 

app.get("/todos/:id", async (req, res) => { // looking for specific id 
    try {
        console.log(req.params);
        const { id } = req.params; // save the id 
        const todo = await pool.query("SELECT * FROM users  WHERE  id=$1", [id]) // search for the id in the specific table 

        res.json(todo.rows[0]) // print the first row in the table 
    } catch (err) {
        console.error(err.message);
    }
})
//UPDATE TODO

app.put("/todos/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const { phone_number } = req.body;
        const updateTodo = await pool.query(
            "UPDATE users SET phone_number = $1 WHERE id = $2",
            [phone_number, id]
        );
        res.json("Users was updated ")
    } catch (err) {
        console.error(err.message)
        console.error("jet")

    }
})

// DELETE TODO
app.delete("/todos/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const deleteTodo = await pool.query("DELETE FROM users WHERE id= $1", [id]);

    } catch (err) {
        console.error(err.message)
    }
    res.json("User was deleted")
})
app.listen(5000, () => {
    try {

        console.log("server has started on port 5000");
    } catch (err) {
        console.error(err.message);
    }
});