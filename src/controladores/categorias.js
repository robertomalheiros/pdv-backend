const knex = require('../conexao');

module.exports={listarCategorias: async(req,res)=>{
    try{
        const categorias = await knex('categorias');
        return res.status(200).json(categorias);
    }catch(error){
        return res.status(500).json({ mensagem: `${error.message}`});
    }
}}