const joi = require('joi');

const schemaProduto = joi.object({
    descricao: joi.string().trim().required().messages({
        'any.required': 'O campo descricao é obrigatório',
        'string.empty': 'O campo descricao é obrigatório',
        'string.base': 'O campo descricao deve ser um texto'
    }),
    quantidade_estoque: joi.number().positive().required().messages({
        'any.required': 'O campo quantidade_estoque é obrigatório',
        'number.positive': 'O campo quantidade_estoque deve possuir um valor positivo',
        'number.base': 'O campo quantidade_estoque deve ser um número'
    }),
    valor: joi.number().positive().required().messages({
        'any.required': 'O campo valor é obrigatório',
        'number.positive': 'O campo valor deve possuir um valor positivo',
        'number.base': 'O campo valor deve ser um número'
    }),
    categoria_id: joi.number().positive().required().messages({
        'any.required': 'O campo categoria_id é obrigatório',
        'number.positive': 'O campo categoria_id deve possuir um valor positivo',
        'number.base': 'O campo categoria_id deve ser um número'
    })
});

module.exports = schemaProduto;