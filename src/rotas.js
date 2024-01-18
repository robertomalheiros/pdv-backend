const rotas = require("express").Router();
const usuarios = require("./controladores/usuarios");
const login = require("./controladores/login");
const produtos = require("./controladores/produtos");
const { listarCategorias } = require("./controladores/categorias");
const autenticacaoJWT = require("./intermediarios/autenticacaoJWT");
const schemaLogin = require("./schema/schemaLogin");
const schemaUsuario = require("./schema/schemaUsuario");
const schemaProduto = require("./schema/schemaProduto");
const validarRequisicao = require("./intermediarios/validacoes");
const schemaCliente = require("./schema/schemaCliente");
const clientes = require("./controladores/clientes");
const verificacaoParamsId = require("./intermediarios/verificacaoParamsID");
const pedidos = require("./controladores/pedidos");
const schemaPedido = require("./schema/schemaPedido");
const multer = require("./intermediarios/multer");
const validarFile = require('./intermediarios/validacoesFile');

rotas.post(
  "/usuario",
  validarRequisicao(schemaUsuario),
  usuarios.cadastrarUsuario
);
rotas.post("/login", validarRequisicao(schemaLogin), login.loginUsuario);
rotas.get("/categoria", listarCategorias);
rotas.use(autenticacaoJWT.autenticaçãoUsuario);
rotas.get("/usuario", usuarios.detalharUsuario);
rotas.put("/usuario", validarRequisicao(schemaUsuario), usuarios.editarUsuario);
rotas.post(
  "/produto",
  validarFile(schemaProduto),
  multer.single("produto_imagem"),
  produtos.cadastrarProduto
);
rotas.put(
  "/produto/:id",
  validarFile(schemaProduto),
  multer.single("produto_imagem"),
  produtos.editarDadosProduto
);
rotas.get("/produto", produtos.listarProdutos);
rotas.get("/produto/:id", produtos.detalharProduto);
rotas.delete("/produto/:id", verificacaoParamsId, produtos.excluirProduto);
rotas.post(
  "/cliente",
  validarRequisicao(schemaCliente),
  clientes.cadastrarCliente
);
rotas.put(
  "/cliente/:id",
  validarRequisicao(schemaCliente),
  clientes.editarCliente
);
rotas.get("/cliente", clientes.listarClientes);
rotas.get("/cliente/:id", clientes.detalharCliente);
rotas.post("/pedido", validarRequisicao(schemaPedido), pedidos.cadastrarPedido);
rotas.get('/usuario', usuarios.detalharUsuario);
rotas.put('/usuario', validarRequisicao(schemaUsuario), usuarios.editarUsuario);
rotas.post('/produto', validarRequisicao(schemaProduto), produtos.cadastrarProduto);
rotas.put('/produto/:id', validarRequisicao(schemaProduto), produtos.editarDadosProduto);
rotas.get('/produto', produtos.listarProdutos);
rotas.get('/produto/:id', produtos.detalharProduto);
rotas.delete('/produto/:id', verificacaoParamsId, produtos.excluirProduto);
rotas.post('/cliente', validarRequisicao(schemaCliente), clientes.cadastrarCliente);
rotas.put("/cliente/:id", validarRequisicao(schemaCliente), clientes.editarCliente);
rotas.get('/cliente', clientes.listarClientes);
rotas.get('/cliente/:id', clientes.detalharCliente);
rotas.post('/pedido', validarRequisicao(schemaPedido), pedidos.cadastrarPedido);
rotas.get('/pedido', pedidos.listarPedidos);

module.exports = rotas;
