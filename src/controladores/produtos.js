const knex = require("../conexao");
const { uploadImagem, excluirImagem } = require("../servicos/uploads");

module.exports = {
  cadastrarProduto: async (req, res) => {
    const { descricao, quantidade_estoque, valor, categoria_id } = req.body;
    const { file } = req;
    let upload = null;
    let cadastrarProduto;
    try {
      const categoriaExistente = await knex("categorias")
        .where({ id: categoria_id })
        .first();
      if (!categoriaExistente) {
        return res
          .status(404)
          .json({ mensagem: "A categoria informada não existe" });
      }
      if (file) {
        upload = await uploadImagem(file.originalname, file.buffer, file.mimetype);
        cadastrarProduto = await knex("produtos").insert({ descricao, quantidade_estoque, valor, categoria_id, produto_imagem: upload.url }).returning("*");
      } else {
        cadastrarProduto = await knex("produtos").insert({ descricao, quantidade_estoque, valor, categoria_id }).returning("*");
      }
      return res.status(201).json(cadastrarProduto[0]);
    } catch (error) {
      return res.status(500).json({ mensagem: `${error.message}` });
    }
  },

  listarProdutos: async (req, res) => {
    const { categoria_id } = req.query;
    let produtos = [];
    try {
      if (categoria_id) {
        const categoriaExistente = await knex("categorias")
          .where({ id: categoria_id })
          .first();
        if (!categoriaExistente) {
          return res
            .status(404)
            .json({ mensagem: "A categoria informada não existe" });
        }
        const result = await knex
          .column(
            "produtos.id",
            "quantidade_estoque",
            "produtos.descricao as nome",
            "valor",
            "categoria_id",
            "categorias.descricao"
          )
          .select()
          .from("produtos")
          .join("categorias", function () {
            this.on("categorias.id", "=", "produtos.categoria_id");
          })
          .where("categorias.id", categoria_id);
        if (result.length) {
          result.forEach((row) => {
            produtos.push({
              id: row.id,
              descricao_produto: row.nome,
              quantidade_estoque: row.quantidade_estoque,
              valor: row.valor,
              categoria_id: row.categoria_id,
              descricao_categoria: row.descricao,
            });
          });
        }
      } else {
        produtos = await knex("produtos").orderBy("id", "asc");
      }
      return res.status(200).json(produtos);
    } catch (error) {
      return res.status(500).json({ mensagem: `${error.message}` });
    }
  },

  editarDadosProduto: async (req, res) => {
    const { descricao, quantidade_estoque, valor, categoria_id } = req.body;
    const { id } = req.params;
    const { file } = req;
    let upload = null;
    let editarDadosProduto;
    try {
      const produtoExistente = await knex("produtos").where({ id }).first();
      if (!produtoExistente) {
        return res
          .status(404)
          .json({ mensagem: "O produto informado não existe" });
      }
      const categoriaExistente = await knex("categorias")
        .where({ id: categoria_id })
        .first();
      if (!categoriaExistente) {
        return res
          .status(404)
          .json({ mensagem: "A categoria informada não existe" });
      }
      if (file) {
        upload = await uploadImagem(file.originalname, file.buffer, file.mimetype);
        editarDadosProduto = await knex("produtos")
          .update({ descricao, quantidade_estoque, valor, categoria_id, produto_imagem: upload.url })
          .where({ id })
          .returning("*");
      } else {
        editarDadosProduto = await knex("produtos").update({ descricao, quantidade_estoque, valor, categoria_id }).where({ id }).returning('*');
      }
      return res.status(201).json(editarDadosProduto[0]);
    } catch (error) {
      return res.status(500).json({ mensagem: `${error.message}` });
    }
  },

  detalharProduto: async (req, res) => {
    const { id } = req.params;
    try {
      const produtoExistente = await knex("produtos").where({ id }).first();
      if (!produtoExistente) {
        return res
          .status(404)
          .json({ mensagem: "O produto informado não existe" });
      }
      return res.status(200).json(produtoExistente);
    } catch (error) {
      return res.status(500).json({ mensagem: `${error.message}` });
    }
  },

  excluirProduto: async (req, res) => {
    const { id } = req.params;
    try {
      const produtoExistente = await knex("produtos").where({ id }).first();
      if (!produtoExistente) {
        return res.status(404).json({ mensagem: "O produto não existe!" });
      }
      const produtoVinculadoPedido = await knex("pedido_produtos")
        .where({ produto_id: id })
        .first();
      if (produtoVinculadoPedido) {
        return res.status(400).json({
          mensagem:
            "O produto não pode ser excluído, pois, está vinculado a algum pedido",
        });
      }
      if (produtoExistente.produto_imagem) {
        await excluirImagem(produtoExistente.produto_imagem);
      }
      const excluirProduto = await knex("produtos").del().where({ id });
      return res.status(204).json([]);
    } catch (error) {
      return res.status(500).json({ mensagem: `${error.message}` });
    }
  },
};
