function notFound (req, res, next) {  

    console.log('Error 404: page not found');

    res.status(404).json({ 

        status: 404,
        error: "Not Found", 
        message: "Page not found"
    });
}; 

module.exports = notFound;