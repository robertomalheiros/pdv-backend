const validarFile = (Schema) => async (req, res, next) => {
    try {
        await Schema.validateAsync(req.file);
        next();
    } catch (error) {
        return res.status(400).json({ mensagem: `${error.message}` });
    }
};

module.exports = validarFile;