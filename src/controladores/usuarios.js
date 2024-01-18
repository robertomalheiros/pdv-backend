const knex = require('../conexao');
const criptografia = require('../funcoes/criptografia');
module.exports = {
    cadastrarUsuario: async (req, res) => {
        const { nome, email, senha } = req.body;
        try {
            const emailExistente = await knex('usuarios').where({ email }).first();
            if (emailExistente) {
                return res.status(400).json({ mensagem: 'O campo email deve ser único para cada registro, não permitindo dois usuários possuírem mesmo email' });
            }
            const senhaCriptografada = await criptografia(senha);
            const cadastroUsuario = await knex('usuarios').insert({ nome, email, senha: senhaCriptografada }).returning(['id', 'nome', 'email']);
            return res.status(201).json(cadastroUsuario[0]);
        } catch (error) {
            return res.status(500).json({ mensagem: `${error.message}` });
        }
    },

    detalharUsuario: async (req, res) => {
        return res.status(200).json(req.usuario);
    },

    editarUsuario: async (req, res) => {
        const { id } = req.usuario;
        const { nome, email, senha } = req.body;
        try {
            if (email !== req.usuario.email) {
                const emailExistente = await knex('usuarios').where({ email }).first();
                if (emailExistente) {
                    return res.status(400).json({ mensagem: 'O campo email deve ser único para cada registro, não permitindo dois usuários possuírem mesmo email' });
                }
            }
            const senhaCriptografada = await criptografia(senha)
            const editarUsuario = await knex('usuarios').update({ nome, email, senha: senhaCriptografada }).where({ id }).returning(['id', 'nome', 'email']);
            return res.status(201).json(editarUsuario[0]);
        } catch (error) {
            return res.status(500).json({ mensagem: `${error.message}` });
        }
    }
}