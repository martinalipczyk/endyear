const db = require("./db_connection");


/**** Read the subjects table ****/

const select_user_sql = "SELECT * FROM user";

db.execute(select_user_sql, 
    (error, results) => {
        if (error) 
            throw error;

        console.log("Table 'user' contents:")
        console.log(results);
    }
);

db.end();
