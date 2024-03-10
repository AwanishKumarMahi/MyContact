const {constants} = require("../constants")

const errorHandler = (err,req,res,next) =>{
    const statusCode = res.statusCode;
    switch(statusCode){
        case constants.VALIDATION_ERROR:
            res.json({
                title: "Validation Failed",
                message: err.msg,
                stackTrace: err.stack
            })
            break
        case constants.FORBIDDEN:
            res.json({
                title: "Forbidden",
                message: err.msg,
                stackTrace: err.stack
            })
            break
        case constants.UNAUTHORIZED:
            res.json({
                title: "Unauthorize",
                message: err.msg,
                stackTrace: err.stack
            })
            break
        case constants.REQUEST_TIMEOUT:
            res.json({
                title: "Request Timeout",
                message: err.msg,
                stackTrace: err.stack
            })
            break
        case constants.SERVER_ERROR:
            res.json({
                title: "Server Error",
                message: err.msg,
                stackTrace: err.stack
            })
            break
        default:
            console.log("No error!")
            break
    }
}

module.exports = errorHandler