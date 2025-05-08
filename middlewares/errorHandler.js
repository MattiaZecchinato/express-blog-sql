function errorsHandler(err, req, res, next) {  

    console.log(`Error 500: ${err.message}`);
  
    res.status(500).json({ 
        
        status: 500,
        error: err.name,
        message: err.message
    });
}; 

module.exports = errorsHandler;