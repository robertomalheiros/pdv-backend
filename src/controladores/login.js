const knex = require('../conexao');
const bcrypt = require('bcrypt');
const { sign } = require('jsonwebtoken');
require('dotenv').config();

module.exports = {
    loginUsuario: async (req, res) => {
        const { email, senha } = req.body;
        try {
            const usuario = await knex('usuarios').where({ email }).first();
            if (!usuario) {
                return res.status(400).json({ messagem: 'Usuário ou senha incorreta(o)' });
            }
            const verificacaoSenha = await bcrypt.compare(senha, usuario.senha)
            if (!verificacaoSenha) {
                return res.status(400).json({ mensagem: 'Usuário ou senha incorreta(o)' });
            }
            const token = sign({ id: usuario.id }, process.env.JWT_PASSWORD, { expiresIn: '8h' });
            const { senha: _, ...dadosUsuario } = usuario;
            return res.status(200).json({ ...dadosUsuario, token });
        } catch (error) {
            return res.status(500).json({ mensagem: `${error.message}` });
        }
    }
}   