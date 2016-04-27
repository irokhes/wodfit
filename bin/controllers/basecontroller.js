module.exports = function() {
    this.getRequestDataObject = function(req, res, next) {
        if (req.body._data) return JSON.parse(req.body._data);
        return null;
    };
    this.renderPage = function(res,url, model) {
        if (!res.headersSent) {
            return res.render(url, model);
        }
    };
    this.responseJSON = function(res, jsonObject) {
        if (!res.headerSent) {
            return res.status(200).json(jsonObject);
        }
        return next();
    };
    this.responseError = function(res, err, statusCode) {
        statusCode = statusCode ? statusCode : 400;
        var httpStatusCode = err.status ? err.status : statusCode;
        
        if (!res.headerSent) {
            var errJson = {
                error: err.message ? err.message : err
            };
            res.status(httpStatusCode).json(errJson);
        }
    };
    this.responseEmptyString = function(res, errorMessage) {
        if (errorMessage) {
            var msg = JSON.stringify(errorMessage);
            //logger.error(msg);
        }
        if (!res.headerSent) {
            res.send('');
        }
    };
    this.responseNotModified = function(res) {
        if (!res.headerSent) {
            res.status(304).send('');
        }
    };

    this.responseHeader = function(res, header, value){
        res.header(header,value);
    };
};