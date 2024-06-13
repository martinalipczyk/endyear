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

app.use(express.json()); // Add this line to parse JSON payloads

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
    db.execute(get_all_task_items,[userid], (error, results) => {
        if (error) {
            res.status(500).send(error); // Internal Server Error
        } else {
            // res.send(results);
            res.render("todo", {user_id: userid, username: userna, taskitems: results});        }
    });
    
});

app.get("/triviaselect", (req, res) => {
    res.render("triviaselect", {user_id: userid, username: userna});
})

app.get("/flashcards", (req, res) => {
    res.render("flashcards", {user_id: userid, username: userna});
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






const create_task = `
    INSERT INTO tasks (user_id, task_name)
    VALUES(?, ?)
`;

const get_all_task_items = `
        SELECT task_name
        FROM tasks
        WHERE user_id = ?
`

app.post("/addTask", (req, res)=>{
    db.execute(create_task, [userid, req.body.task], (error, results)=> {
        if(error){
            res.status(500).send(error);
        }
        else{
            res.redirect("todo");
        }
    });
});

const delete_task = `
    DELETE FROM tasks
    WHERE task_name = ? AND user_id = ?
`;

app.get("/todo/:id/delete", (req, res) => {
    const taskName = req.params.id; 
    const userId = userid; 

    db.execute(delete_task, [taskName, userId], (error, results) => {
        if (error) {
            console.error('Error deleting task:', error);
            res.status(500).send(error);
        } else {
            if (results.affectedRows > 0) {
                console.log('Task deleted successfully');
                res.redirect("/todo"); 
            } else {
                console.log('Task not found');
                res.status(404).json({ error: 'Task not found' });
            }
        }
    });
});

// app.post('/addTask', (req, res) => {
//     console.log("req.body is " +req.body);
//     const { task_name } = req.body;

//     if (!task_name || task_name.trim() === '') {
//         return res.status(400).json({ error: 'Task name cannot be empty' });
//     }

//     console.log('Received taskName:', task_name);
//     const insertTaskQuery = 'INSERT INTO tasks (user_id, task_name) VALUES (?, ?)';
//     db.query(insertTaskQuery, [userid, task_name], (insertErr, insertResults) => {
//         if (insertErr) {
//             console.error('Error saving task: ' + insertErr.message);
//             return res.status(500).json({ error: 'Internal Server Error' });
//         }
//         console.log('Received taskName:', task_name);
//         res.status(200).json({ message: 'Task saved successfully' });
//     });
// });

// app.get('/getUserTasks', (req, res) => {

//         if (!userid) {
//             return res.status(401).json({ error: 'Unauthorized' });
//         }
    
    
//         const getUserTasksQuery = 'SELECT task_name FROM tasks WHERE user_id = ?';
//         db.query(getUserTasksQuery, [userid], (err, results) => {
//             if (err) {
//                 console.error('Error fetching user tasks:', err);
//                 return res.status(500).json({ error: 'Internal Server Error' });
//             }
    
//             const tasks = results.map(result => ({ task_name: result.task_name }));
    
//             res.json({ tasks: tasks });
//         });
// });


const setAdd = `
    INSERT INTO sets (set_name, set_string)
    VALUES(?, ?)
`;

app.post("/insertSet", (req, res)=>{
    console.log(req.body);
    db.execute(setAdd, [req.body.setname, req.body.setstring], (error, results)=> {

        if(error){
            res.status(500).send(error);
        }
        else{
            res.redirect("flashcards");
        }
    });
});

const showSets = `
    SELECT set_name
        FROM sets
        WHERE set_string = ?
`;

app.get("/getSets", (req, res)=> {
    db.execute(showSets, (error, results) => {
        if(error){
            res.status(500).send(error);
        }
        else{
            res.render("setdisplay", {sets: results})
        }
    })
})

// Add a route for handling logout requests
app.get("/logout", (req, res) => {
    // Clear user session or authentication token
    userid = null;
    userna = null;
    // Redirect the user to the login page
    res.redirect("/");
});
