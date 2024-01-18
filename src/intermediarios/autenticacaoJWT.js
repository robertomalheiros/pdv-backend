const { verify } = require("jsonwebtoken");
require("dotenv").config();
const knex = require("../conexao");
module.exports = {
  autenticaçãoUsuario: async (req, res, next) => {
    const { authorization } = req.headers;
    if (!authorization) {
      return res.status(401).json({ mensagem: "Usuário não autenticado" });
    }
    const token = authorization.replace("Bearer", " ").trim();
    try {
      const autenticacaoJWT = verify(token, process.env.JWT_PASSWORD);
      const { id } = autenticacaoJWT;
      const usuario = await knex("usuarios")
        .where({ id })
        .first()
        .returning("id");
      if (!usuario) {
        return res.status(404).json({ mensagem: "Usuário não encontrado" });
      }
      const { senha: _, ...dadosUsuario } = usuario;
      req.usuario = dadosUsuario;
      next();
    } catch (error) {
      return res.status(401).json({ mensagem: "Usuário não autenticado" });
    }
  },
};
