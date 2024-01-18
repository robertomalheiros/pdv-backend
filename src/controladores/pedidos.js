const knex = require('../conexao');
const envioDeEmail = require('../funcoes/envioDeEmail');
module.exports = {
    cadastrarPedido: async (req, res) => {
        const { cliente_id, pedido_produtos, produto_id, quantidade_produto, observacao } = req.body;
        let valorTotal = 0;
        try {
            const clienteExistente = await knex('clientes').where({ id: cliente_id }).first();
            if (!clienteExistente) {
                return res.status(400).json({ mensagem: 'O cliente não existe' });
            }
            for (let pedido of pedido_produtos) {
                const produtoExistente = await knex('produtos').where({ id: pedido.produto_id }).first();
                if (!produtoExistente) {
                    return res.status(400).json({ mensagem: 'O produto não existe' });
                }
                const { quantidade_estoque, valor, ...dados } = produtoExistente;
                if (pedido.quantidade_produto > quantidade_estoque) {
                    return res.status(400).json({ mensage: 'A quantidade em estoque não existe' });
                }
                const quantidadeRestante = quantidade_estoque - pedido.quantidade_produto;
                valorTotal += valor * pedido.quantidade_produto;
                const produtosSelecionados = await knex('produtos').update({ quantidade_estoque: quantidadeRestante }).where({ id: pedido.produto_id });
            }
            const cadastrarPedido = await knex('pedidos').insert({ cliente_id: clienteExistente.id, observacao, valor_total: valorTotal }).returning('id');
            for (let pedido of pedido_produtos) {
                const produtoExistente = await knex('produtos').where({ id: pedido.produto_id }).first();
                const { id, quantidade_estoque, valor, ...dados } = produtoExistente;
                const cadastroPedidoProdutos = await knex('pedido_produtos').insert({ pedido_id: cadastrarPedido[0].id, produto_id: id, quantidade_produto: pedido.quantidade_produto, valor_produto: valor });
            }
            await envioDeEmail(clienteExistente.email, clienteExistente.nome);
            return res.status(201).json({ mensagem: 'Pedido cadastrado com sucesso!' });
        } catch (error) {
            return res.status(500).json({ mensagem: `${error.message}` });
    }
  },
  listarPedidos: async (req, res) => {
    const { cliente_id } = req.query;
    try {
      let pedidos = [];
      let resultPedidos = [];
      if (cliente_id) {
        const clienteExistente = await knex("clientes").where({ id: cliente_id }).first();
        if (!clienteExistente) {
          return res.status(404).json({ mensagem: "O cliente não existe" });
        }
        resultPedidos = await knex("pedidos").where({ cliente_id: cliente_id });
      } else {
        resultPedidos = await knex("pedidos").orderBy("id", "asc");
      }
        for (let linhaPedidos of resultPedidos) {
          let pedidosProdutos = [];
          const resultPedidosProdutos = await knex("pedido_produtos").where({
            pedido_id: linhaPedidos.id,
          });
          for (let linhaPedidosProdutos of resultPedidosProdutos) {
            pedidosProdutos.push({
              id: linhaPedidosProdutos.id,
              pedido_id: linhaPedidosProdutos.pedido_id,
              produto_id: linhaPedidosProdutos.produto_id,
              quantidade_produto: linhaPedidosProdutos.quantidade_produto,
              valor_produto: linhaPedidosProdutos.valor_produto,
            });
          }
          pedidos.push({
            pedido: {
              id: linhaPedidos.id,
              cliente_id: linhaPedidos.cliente_id,
              observacao: linhaPedidos.observacao,
              valor_total: linhaPedidos.valor_total,
            },
            pedido_produtos: [].concat(pedidosProdutos),
          });
        }
      return res.status(200).json(pedidos);
    } catch (error) {
      return res.status(500).json({ mensagem: `${error.message}` });
    }
  }
};
