conneconstction = require('../database/connection')

module.exports = {

    async index (req,res){

        //pega o ID da ONG passado no cabeçalho no campo de authorization
        const ong_id = req.headers.authorization;

        //Pesquisar todos os incidentes da ONG
        const incidents = await conneconstction('incidents').select('*').where('ong_id', ong_id)

        //retorna todos os incidentes
        return res.status(200).json(incidents);
    }
}