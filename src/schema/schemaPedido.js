const joi = require('joi');

const schemaPedido = joi.object({
    cliente_id: joi.number().positive().required().messages({
        'any.required': 'O campo cliente_id é obrigatório',
        'number.positive': 'O campo cliente_id deve possuir um valor positivo',
        'number.base': 'O campo cliente_id deve ser um número'
    }),
    pedido_produtos: joi.array().min(1).required().messages({
        'any.required': 'O campo pedido_produtos é obrigatório',
        'array.base': 'O campo pedido_produtos deve ser um array',
        'array.min': 'O campo pedido_produtos deve ter no mínimo 1 pedido'
    }).items(joi.object({
        produto_id: joi.number().positive().required().messages({
            'any.required': 'O campo produto_id é obrigatório',
            'number.positive': 'O campo produto_id deve possuir um valor positivo',
            'number.base': 'O campo produto_id deve ser um número'
        }),
        quantidade_produto: joi.number().positive().required().messages({
            'any.required': 'O campo quantidade_produtos é obrigatório',
            'number.positive': 'O campo quantidade_produtos deve possuir um valor positivo',
            'number.base': 'O campo  quantidade_produtos deve ser um número'
        })
    })),
    observacao: joi.string().messages({
        'string.base': 'O campo descrição deve ser um texto',
    })
});

module.exports = schemaPedido;