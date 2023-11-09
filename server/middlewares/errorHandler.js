module.exports = async (err, req, res, next) => {
    console.log(err);
    
    const code = err.status || 500;
    return res.status(code).send(err.message);
}