function verificacaoParamsId(req, res, next) {
    const { id } = req.params;
    try {
        if (isNaN(Number(id)) || Number(id) === 0) {
            return res.status(400).json({ mensagem: "O id passado é inválido!" });
        }
        next();
    } catch (error) {
        return res.status(500).json({ mensagem: `${error.message}` });
    }
}

module.exports = verificacaoParamsId;