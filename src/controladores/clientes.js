const knex = require("../conexao");

module.exports = {
  cadastrarCliente: async (req, res) => {
    const { nome, email, cpf, cep, rua, numero, bairro, cidade, estado } =
      req.body;
    try {
      const emailExistente = await knex("clientes").where({ email }).first();
      if (emailExistente) {
        return res
          .status(400)
          .json({
            mensagem:
              "O campo email deve ser único para cada registro, não permitindo dois clientes possuírem mesmo email",
          });
      }
      const cpfExistente = await knex("clientes").where({ cpf }).first();
      if (cpfExistente) {
        return res
          .status(400)
          .json({
            mensagem:
              "O campo cpf deve ser único para cada registro, não permitindo dois clientes possuírem mesmo cpf",
          });
      }
      const cadastrarCliente = await knex("clientes")
        .insert({ nome, email, cpf, cep, rua, numero, bairro, cidade, estado })
        .returning("*");
      return res.status(201).json(cadastrarCliente[0]);
    } catch (error) {
      return res.status(500).json({ mensagem: `${error.message}` });
    }
  },

  detalharCliente: async (req, res) => {
    const { id } = req.params;
    try {
      const clienteExistente = await knex("clientes").where({ id }).first();
      if (!clienteExistente) {
        return res
          .status(404)
          .json({ mensagem: "O cliente informado não existe" });
      }
      return res.status(200).json(clienteExistente);
    } catch (error) {
      return res.status(500).json({ mensagem: `${error.message}` });
    }
  },
  editarCliente: async (req, res) => {
    const { id } = req.params;
    const { nome, email, cpf, cep, rua, numero, bairro, cidade, estado } =
      req.body;
    try {
      const idExistente = await knex("clientes").where({ id }).first();
      if (!idExistente) {
        return res.status(404).json({ mensagem: "Cliente não encontrado" });
      }
      const emailExistente = await knex("clientes")
        .where({ email })
        .whereNot({ id })
        .first();

      if (emailExistente) {
        return res.status(404).json({
          mensagem:
            "O campo email deve ser único para cada registro, não permitindo dois clientes possuírem mesmo email",
        });
      }
      const cpfExistente = await knex("clientes")
        .where({ cpf })
        .whereNot({ id })
        .first();

      if (cpfExistente) {
        return res.status(404).json({
          mensagem:
            "O campo cpf deve ser único para cada registro, não permitindo dois clientes possuírem mesmo cpf",
        });
      }

      const editarcliente = await knex("clientes")
        .update({ nome, email, cpf, cep, rua, numero, bairro, cidade, estado })
        .where({ id })
        .returning("*");
      return res.status(201).json(editarcliente[0]);
    } catch (error) {
      return res.status(500).json({ mensagem: `${error.message}` });
    }
  },

  listarClientes: async (req, res) => {
    try {
      const clientes = await knex("clientes").orderBy("id", "asc");
      return res.status(200).json(clientes);
    } catch (error) {
      return res.status(500).json({ mensagem: `${error.message}` });
    }
  }
}

