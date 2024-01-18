const joi = require('joi');

const schemaUsuario = joi.object({
    nome: joi.string().trim().required().messages({
        "string.empty": "O campo nome não pode estar vazio",
        "any.required": "O campo nome é obrigatório",
        "string.base": "O campo nome deve ser um texto"
    }),
    email: joi.string().trim().email().required().messages({
        "string.email": "O campo email deve ser um e-mail válido",
        "string.empty": "O campo email não pode estar vazio",
        "any.required": "O campo email é obrigatório",
        "string.base": "O campo email deve ser um texto",
    }),
    senha: joi.string().trim().min(6).required().messages({
        "string.min": "O campo senha deve ter no mínimo 6 caracteres",
        "any.required": "O campo senha é obrigatório",
        "string.empty": "O campo senha não pode estar vazio",
        "string.base": "O campo senha deve ser um texto"
    })

})

module.exports = schemaUsuario;