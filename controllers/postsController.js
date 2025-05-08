// require posts array
const posts = require('../data/posts.js');

// index
function index(req, res) {

    // catch the query of the request
    const tag = req.query.tag;

    console.log(tag);

    if (tag) {

        const tagPosts = posts.filter(elem => 

            elem.tags.find(currentTag => currentTag.toLowerCase() === tag.toLowerCase()) !== undefined
        );

        console.log(tagPosts);

        // return a response with json format
        return res.json(tagPosts);
    }

    // return a response with json format
    res.json(posts);
    console.log('index test');
}

// show
function show(req, res) {

    // catch the parameter of the request
    const id = parseInt(req.params.id);

    const currentPost = posts.find(elem => parseInt(elem.id) === id);

    // error catch
    if (!currentPost) {

        // return a response with json format
        return res.status(404).json({

            status: 404,
            error: "Not Found",
            message: "Post not found"
        });
    }

    // return a response with json format
    res.send(currentPost);

    console.log('show test');
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

    const currentPost = posts.findIndex(elem => parseInt(elem.id) === id);

    if (currentPost === -1) {

        // return a response with json format
        return res.status(404).json({

            status: 404,
            error: "Not Found",
            message: "Post not found"
        });
    }

    posts.splice(currentPost, 1);

    // return response status code
    res.sendStatus(204);
    console.log('destroy test');
    console.log('Updated posts');
    console.log(posts);
}

// export all controllers
module.exports = {index, show, store, update, modify, destroy};