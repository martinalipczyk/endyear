const db = require("./db_connection");

/**** Delete *CONTENTS OF* existing tables (but not dropping tables themselves) ****/

const delete_user_table_sql = "DELETE FROM user;"

db.execute(delete_user_table_sql);

const delete_journals_table_sql = "DELETE FROM journals;"

const reset = "ALTER TABLE user AUTO_INCREMENT=0; "

db.execute(delete_journals_table_sql);
db.execute(reset);
db.end();