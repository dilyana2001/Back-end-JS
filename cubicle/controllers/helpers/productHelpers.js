function validateProduct(req, res, next) {
    let isValid = true;
    if (req.body.name.trim().length < 1) {
        isValid = false;
    }
    if (!req.body.imageUrl) {
        isValid = false;
    }
    if (isValid) {
        next();
    }
}

module.exports = {
    validateProduct
}