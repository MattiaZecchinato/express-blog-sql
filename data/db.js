const mysql = require('mysql2');

const connection = mysql.createConnection({

    host: 'localhost',
    user: 'root',
    password: '1q2w3e4r5t@@',
    database: 'blog'
});

connection.connect(err => {

    if(err) throw err;
    console.log('Successful connection');
});

module.exports = connection;