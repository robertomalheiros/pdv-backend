const validarReq = Schema => async (req, res, next) => {
    try {
        await Schema.validateAsync(req.body);
        next();
    } catch (error) {
        return res.status(400).json({ mensagem: `${error.message}` });
    }
}

module.exports = validarReq;