const joi = require("joi");

const schemaCliente = joi.object({
  nome: joi.string().trim().required().messages({
    "string.empty": "O campo nome não pode estar vazio",
    "any.required": "O campo nome é obrigatório",
    "string.base": "O campo nome deve ser um texto",
  }),
  email: joi.string().trim().email().required().messages({
    "string.email": "O campo email deve ser um e-mail válido",
    "string.empty": "O campo email não pode estar vazio",
    "any.required": "O campo email é obrigatório",
    "string.base": "O campo email deve ser um texto",
  }),
  cpf: joi.string().trim().required().messages({
    "string.empty": "O campo cpf não pode estar vazio",
    "any.required": "O campo cpf é obrigatório",
    "string.base": "O campo cpf deve ser um texto",
  }),
  cep: joi.string().trim().allow("").messages({
    "string.base": "O campo cep deve ser um texto",
    "string.empty": "O campo cep não pode estar vazio",
  }),
  rua: joi.string().trim().allow("").messages({
    "string.base": "O campo rua deve ser um texto",
    "string.empty": "O campo rua não pode estar vazio",
  }),
  numero: joi.string().trim().allow("").messages({
    "string.base": "O campo numero deve ser um texto",
    "string.empty": "O campo numero não pode estar vazio",
  }),
  bairro: joi.string().trim().allow("").messages({
    "string.base": "O campo bairro deve ser um texto",
    "string.empty": "O campo bairro não pode estar vazio",
  }),
  cidade: joi.string().trim().allow("").messages({
    "string.base": "O campo cidade deve ser um texto",
    "string.empty": "O campo cidade não pode estar vazio",
  }),
  estado: joi.string().trim().allow("").messages({
    "string.base": "O campo estado deve ser um texto",
    "string.empty": "O campo estado não pode estar vazio",
  }),
});

module.exports = schemaCliente;
