// require posts array
const posts = require('../data/posts.js');

//require connection to blog db
const connection = require('../data/db.js');

// index
function index(req, res) {

    const sql = 'SELECT * FROM posts';

    connection.query(sql, (err, result) => {

        if(err) {

            return res.status(500).json({status: '500', error: 'Query error'});
        }

        res.status(200).json(result);
    })
}

// show
function show(req, res) {

    // catch the parameter of the request
    const id = parseInt(req.params.id);

    console.log(id);

    const sql = 'SELECT * FROM posts WHERE id = ?';

    connection.query(sql, [id], (err, result) => {

        if(err) {

            return res.status(500).json({status: '500', error: 'Query error'});
        }

        if(result.length === 0) {

            return res.status(404).json({status: '404', error: 'Posts not found'});
        }

        res.json(result);
    })

    // const currentPost = posts.find(elem => parseInt(elem.id) === id);

    // // error catch
    // if (!currentPost) {

    //     // return a response with json format
    //     return res.status(404).json({

    //         status: 404,
    //         error: "Not Found",
    //         message: "Post not found"
    //     });
    // }

    // // return a response with json format
    // res.send(currentPost);

    // console.log('show test');
}

// store
function store(req, res) {

    console.log(req.body);

    // error catch if req.body is empty 
    if (Object.keys(req.body).length === 0) {

        // return a response with json format
        return res.status(404).json({

            status: 404,
            error: "Not Found",
            message: "Post not found"
        });
    }

    const newPostId = posts[posts.length - 1].id + 1;

    const newPost = {

        "id": newPostId,
        "title": req.body.title,
        "content": req.body.content,
        "image": req.body.image,
        "tags": req.body.tags
    }

    console.log(newPost);

    posts.push(newPost);

    // return response status code
    res.sendStatus(204);

    console.log('store test');
}

// update
function update(req, res) {

    // catch the parameter of the request
    const id = parseInt(req.params.id);

    const findId = posts.findIndex(elem => parseInt(elem.id) === id);

    // error catch
    if (findId === -1) {

        // return a response with json format
        return res.status(404).json({

            status: 404,
            error: "Not Found",
            message: "Post not found"
        });
    }

    console.log('Body request');
    console.log(req.body);

    const updatePost = {

        id,
        "title": req.body.title,
        "content": req.body.content,
        "image": req.body.image,
        "tags": req.body.tags
    }

    posts.splice(findId, 1, updatePost);

    res.json(posts[findId]);

    console.log('update test');
}

// modify
function modify(req, res) {

    // catch the parameter of the request
    const id = parseInt(req.params.id);
    res.send(`modify test id ${id}`);
    console.log('modify test');
}

// destroy
function destroy(req, res) {

    // catch the parameter of the request
    const id = parseInt(req.params.id);

    console.log(id);

    const sql = `DELETE FROM posts WHERE id = ?`

    connection.query(sql, [id], err => {

        if(err) {

            return res.status(500).json({status: '500', error: 'Query error'});
        }

        res.sendStatus(204);
    })
}

// export all controllers
module.exports = {index, show, store, update, modify, destroy};