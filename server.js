const express = require("express");
const http = require("http");
const axios = require("axios");
const db = require('./db/db_connection.js');
const app = express();
const port = 3000 || process.env.PORT;
const server = http.createServer(app);
app.use(express.urlencoded({ extended: true }));

app.use(express.static(__dirname + "/public"));
app.use(express.static("views"));
app.set( "views",  __dirname + "/views");
app.set( "view engine", "ejs" );

let userna = null;
let userid = null;

server.listen(port, () => console.log(`App server listening on ${port}. (Go to http://localhost:${port})`));

app.get("/", (req, res) => {
    res.render("login", {user_id: userid, username: userna});
});

app.get("/databases", (req, res) => {
    res.render("databases", {user_id: userid, username: userna});
})
app.get("/index", (req, res) => {
    res.render("index", {user_id: userid, username: userna});
})

app.get("/gc", (req, res) => {
    res.render("gc", {user_id: userid, username: userna});
})

app.get("/index", (req, res) => {
    res.render("index", {user_id: userid, username: userna});
})

app.get("/linkhub", (req, res) => {
    res.render("linkhub", {user_id: userid, username: userna});
})

app.get("/multitrivia", (req, res) => {
    res.render("multitrivia", {user_id: userid, username: userna});
})

app.get("/pomodoro", (req, res) => {
    res.render("pomodoro", {user_id: userid, username: userna});
})

app.get("/solo_trivia", (req, res) => {
    res.render("solo_trivia", {user_id: userid, username: userna});
})

app.get("/summarize", (req, res) => {
    res.render("summarize", {user_id: userid, username: userna});
})

app.get("/test", (req, res) => {
    res.render("test", {user_id: userid, username: userna});
})

app.get("/todo", (req, res) => {
    res.render("todo", {user_id: userid, username: userna});
})

app.get("/triviaselect", (req, res) => {
    res.render("triviaselect", {user_id: userid, username: userna});
})

app.get("/uploadnotes", (req, res) => {
    res.render("uploadnotes", {user_id: userid, username: userna});
})

app.get("/createaccount", (req, res) => {
    res.render("createaccount", {user_id: userid, username: userna});
})


app.post('/register', (req, res) => {
    const {first_name, last_name, username, password, email} = req.body;

    const query = 'INSERT INTO user (first_name, last_name, username, password, email) VALUES (?, ?, ?, ?, ?)';
    db.query(query, [first_name, last_name, username, password, email], (err, results) => {
        if (err) {
            console.error('Error registering user: ' + err.message);
            return res.status(500).json({ error: 'Internal Server Error' });
        }
        db.query('SELECT user_id, username FROM user WHERE username = ? AND password = ?', [username, password], (err, results) => {
            if (err) {
                console.error('Error executing login query: ' + err.message);
                return res.status(500).json({ error: 'Internal Server Error' });
            }

            if (results.length === 1) {
                userid = results[0].user_id;
                userna = results[0].username;
                res.render('index', { user_id: userid, username: userna });
            } else {
                res.render('login');
            }
        });
    });
});
  
app.post('/dologin', (req, res) => {
    const { username, password } = req.body;
  
    const query = 'SELECT user_id, username FROM user WHERE username = ? AND password = ?';
    db.query(query, [username, password], (err, results) => {
      if (err) {
        console.error('Error executing query: ' + err.message);
        return res.status(500).json({ error: 'Internal Server Error' });
      }

      if (results.length === 1) {
        userid = results[0].user_id;
        userna = results[0].username;
        res.render('index', {user_id: userid, username: userna});
      } else {
        res.render("login");
      }
    });
});


app.post('/addTask', (req, res) => {
    const { taskName } = req.body;

    if (!taskName || taskName.trim() === '') {
        return res.status(400).json({ error: 'Task name cannot be empty' });
    }

    console.log('Received taskName:', taskName);
    const insertTaskQuery = 'INSERT INTO tasks (user_id, task_name) VALUES (?, ?)';
    db.query(insertTaskQuery, [userid, taskName], (insertErr, insertResults) => {
        if (insertErr) {
            console.error('Error saving task: ' + insertErr.message);
            return res.status(500).json({ error: 'Internal Server Error' });
        }
        console.log('Received taskName:', taskName);
    });
});

app.post('/deleteTask', (req, res) => {
    const { taskName } = req.body; 

    if (!userid) {
        return res.status(401).json({ error: 'Unauthorized' });
    }

    const deleteTaskQuery = 'DELETE FROM tasks WHERE task_name = ? AND user_id = ?';
    db.query(deleteTaskQuery, [taskName, userid], (deleteErr, deleteResults) => {
        if (deleteErr) {
            console.error('Error deleting task: ' + deleteErr.message);
            return res.status(500).json({ error: 'Internal Server Error' });
        }
        if (deleteResults.affectedRows > 0) {
            res.json({ message: 'Task deleted successfully' });
        } else {
            res.status(404).json({ error: 'Task not found' });
        }
    });
});

app.get('/getUserTasks', (req, res) => {

    if (!userid) {
        return res.status(401).json({ error: 'Unauthorized' });
    }


    const getUserTasksQuery = 'SELECT task_name FROM tasks WHERE user_id = ?';
    db.query(getUserTasksQuery, [userid], (err, results) => {
        if (err) {
            console.error('Error fetching user tasks:', err);
            return res.status(500).json({ error: 'Internal Server Error' });
        }

        const tasks = results.map(result => ({ task_name: result.task_name }));

        res.json({ tasks: tasks });
    });
});

// Add a route for handling logout requests
app.get("/logout", (req, res) => {
    // Clear user session or authentication token
    userid = null;
    userna = null;
    // Redirect the user to the login page
    res.redirect("/");
});
