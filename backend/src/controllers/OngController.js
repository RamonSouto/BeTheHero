const connection = require('../database/connection');
const generateUniqueId = require('../utils/generateUniqueId');

module.exports = {
    
    async index (req, res){

        //Pesquisar no banco de dados os registros de todas as ONG
        const ongs = await connection('ongs').select('*');

        //retonar todas as ONGS
        return res.json(ongs);
    
    },

    async create (req, res) {
        //Desestruturando parametros vindo na requisição
        const {name, email, whatsapp, city, uf} = req.body;

        //função que retorna um número de ID
        const id = generateUniqueId();

        //inserir o dado da ONG no banco de dados
        await connection('ongs').insert({
            id,
            name,
            email,
            whatsapp,
            city,
            uf
        })

        //retornar o id da ONG inserida
        return res.json({id}).status(200)
    }


}