const express = require("express");
const app = express();
const cors = require("cors");
const pool = require("./db");
const locations = require("../client/src/components/map/locations.json");//middleware
app.use(cors());
app.use(express.json());
// todo : get locations from db 
// updated app.patch function

app.put("/locations/:id", async (req, res) => {
    try {
        const today = new Date();
        const dateString = today.toISOString().slice(0, 10);
        const { id } = req.params;
        const updateLastVisit = await pool.query(
            "UPDATE locations SET lastvisit = $1 WHERE locationid = $2", [dateString, id]
        );
        console.log(updateLastVisit)
        res.json({ message: 'Location updated successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Location was not updated successfully' });
    }
});

//UPDATE USER
app.put("/EditUser/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const { phone_number } = req.body;
        const updateUser = await pool.query(
            "UPDATE users SET phone_number = $1 WHERE id = $2",
            [phone_number, id]
        );
        console.log(id, phone_number)
        res.json("Users was updated ")
    } catch (err) {
        console.error(err.message)
        console.error("jet")
    }
})
//ROUTES//

app.get("/location/:id", async (req, res) => {
    console.log("location selected by id")
    const id = req.params.id;
    const location = locations.find((loc) => loc.id === id);
    console.log(location)
    if (location) {
        res.json(location);
    } else {
        res.sendStatus(404);
    }
});

// DELETE USER
app.delete("/users/:id", async (req, res) => {
    try {
        console.log("user deleted")
        const id = req.params.id;
        await pool.query("DELETE FROM users WHERE id= $1", [id])
        res.json({ message: "user was deleted" });
    } catch (err) {
        console.error(err.message);
        res.json({ message: "Error deleting user" });
    }
});

//GET A USER 

app.get('/users/:id', async (req, res) => {
    try {
        console.log(req.params);
        const { id } = req.params;
        const result = await pool.query('SELECT * FROM users WHERE id = $1', [id]);
        // console.log(result);
        res.json(result);
    } catch (err) {
        return res.status(500).json({ message: 'Internal server error' });
    }
});

app.get("/works", async (req, res) => {
    try {
        // console.log(req.params);
        const allWorks = await pool.query("SELECT * FROM works");
        res.json(allWorks.rows);
    } catch (err) {
        console.error(err.message);
    }
});


async function validateUser(user_name, password) {
    try {
        // Query the database for a user with the given user_name
        const result = await pool.query("SELECT password FROM passwords WHERE user_name = $1", [user_name]);

        // If no user is found, return false
        if (result.rowCount === 0) {
            return false;
        }

        // Get the hashed password for the user
        const hashedPassword = result.rows[0].password;

        // Compare the given plain text password with the hashed password
        if (password === hashedPassword) {
            return true;
        } else {
            console.error("Incorrect user_name or password. Please try again");
            return false;
        }
    } catch (error) {
        console.error(error);
        return false;
    }
};

app.post("/login", async (req, res) => {
    const { user_name, password } = req.body;
    console.log(user_name, password)
    const isValid = await validateUser(user_name, password);
    if (isValid) {
        console.log("currect details");
        res.sendStatus(200);
    } else {
        // User's credentials are invalid, send an error messagea
        console.log("Wrong details")
        res.sendStatus(401)
    }
});


// create a USER
app.post("/InputUser", async (req, res) => {
    try {
        const { first_name } = req.body;
        const { last_name } = req.body;
        const { email } = req.body;
        const { phone_number } = req.body;
        const { permission } = req.body;
        const { work_area } = req.body;
        const { id } = req.body;
        const { product_id } = req.body;
        const { user_name } = req.body;
        const { is_admin } = req.body;


        const newUser = await pool.query("INSERT INTO users (first_name, last_name, email, phone_number,  permission, work_area, id, product_id, is_admin, user_name) VALUES($1,$2,$3,$4,$5,$6,$7,$8,$9,$10 ) RETURNING *",
            [first_name, last_name, email, phone_number, permission, work_area, id, product_id, is_admin, user_name]);
        res.json(newUser.rows[0]);
    } catch (err) {
        console.error(err.message);
    }
});
app.get("/Active_jobs", async (req, res) => {
    try {
        console.log("Active_jobs back")
        const result = await pool.query('SELECT * FROM to_do');
        res.json(result.rows);
    } catch (err) {
        return res.status(500).json({ message: 'Internal server error' });
    }

});
app.post("/Locations", async (req, res) => {
    try {
        console.log("/locations");
        console.log(req.body);
        const { id } = req.body;
        const { name } = req.body;
        const { lastvisit } = req.body;
        const { coordinates } = req.body;
        const newLocation = await pool.query("INSERT INTO locations (id, name, lastvisit,  coordinates) VALUES($1,$2,DATE($3),$4) RETURNING *",
            [id, name, lastvisit, coordinates]);
        res.json(newLocation.rows[0]);
    } catch (err) {
        console.error(err.message);
    }
});

app.post('/works', async (req, res) => {
    try {
        const { task_name } = req.body;
        const { task_id } = req.body;
        const { frequency } = req.body;

        const newWork = await pool.query("INSERT INTO works (task_name, task_id,  frequency) VALUES($1,$2,$3) RETURNING *",
            [task_name, task_id, frequency]);
        res.json(newWork.rows[0]);

    } catch (err) {
        console.error(err.message);
    }

});
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

//UPDATE USER
app.put("/EditUser/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const { phone_number } = req.body;
        const updateUser = await pool.query(
            "UPDATE users SET phone_number = $1 WHERE id = $2",
            [phone_number, id]
        );
        console.log(id, phone_number)
        res.json("Users was updated ")
    } catch (err) {
        console.error(err.message)
        console.error("jet")

    }
})


app.listen(5000)