const express = require("express");
const app = express();
const cors = require("cors");
const pool = require("./db");


//middleware
app.use(cors());
app.use(express.json());

//ROUTES//

// create a USER
app.post("/InputUser", async (req, res) => {
    try {
        const { first_name } = req.body;
        const { last_name } = req.body;
        const { email } = req.body;
        const { phone_number } = req.body;
        const { permission } = req.body;
        const { work_area } = req.body;
        const { speciality_product } = req.body;
        const { id } = req.body;


        const newUser = await pool.query("INSERT INTO users (first_name, last_name, email, phone_number, id, permission, work_area, speciality_product) VALUES($1,$2,$3,$4,$5,$6,$7,$8) RETURNING *",
            [first_name, last_name, email, phone_number, id, permission, work_area, speciality_product]);
        res.json(newUser.rows[0]);
    } catch (err) {
        console.error(err.message);
    }
})
//GETS HOMEPAGE

app.get("/", async (req, res) => {
    console.log("HEY")
})
//GETS ALL USERS 

app.get("/users", async (req, res) => {
    try {
        const allUsers = await pool.query("SELECT * FROM users");
        res.json(allUsers.rows);
    } catch (err) {
        console.error(err.message);
    }
})

//GET A USER 

app.get("/users/:id", async (req, res) => { // looking for specific id 
    try {
        console.log(req.params);
        const { id } = req.params; // save the id 
        const user = await pool.query("SELECT * FROM users  WHERE  id=$1", [id]) // search for the id in the specific table 

        res.json(user.rows[0]) // print the first row in the table 
    } catch (err) {
        console.error(err.message);
    }
})
//UPDATE USER

app.put("/EditUser/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const { phone_number } = req.body;
        const updateUser = await pool.query(
            "UPDATE users SET phone_number = $1 WHERE id = $2",
            [phone_number, id]
        );
        res.json("Users was updated ")
    } catch (err) {
        console.error(err.message)
        console.error("jet")

    }
})

// DELETE USER
app.delete("/users/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const deleteUser = await pool.query("DELETE FROM users WHERE id= $1", [id]);
        res.json("user was deleted")
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


app.get("/users/:id", async (req, res) => { // looking for specific id 
    try {
        console.log(req.params);
        const { id } = req.params; // save the id 
        const user = await pool.query("SELECT * FROM users  WHERE  id=$1", [id]) // search for the id in the specific table 

        res.json(user.rows[0]) // print the first row in the table 
    } catch (err) {
        console.error(err.message);
    }
})

app.get("/works", async (req, res) => {
    try {
        console.log(req.params);
        const allWorks = await pool.query("SELECT * FROM works");
        res.json(allWorks.rows);
    } catch (err) {
        console.error(err.message);
    }
});
app.post('/works', async (req, res) => {
    try {
        const { task_name } = req.body;
        const { task_id } = req.body;
        const { product_id } = req.body;
        const { frequency } = req.body;

        const newWork = await pool.query("INSERT INTO works (task_name, task_id, product_id, frequency) VALUES($1,$2,$3,$4) RETURNING *",
            [task_name, task_id, product_id, frequency]);
        res.json(newWork.rows[0]);

    } catch (err) {
        console.error(err.message);
    }

});

