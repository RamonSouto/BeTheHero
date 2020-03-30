conneconstction = require('../database/connection')

module.exports = {

    async create (req,res){
        
        //Pegadno ID que e passado pela body da requisição
        const { id } = req.body;

        //Pesquisando se exite esse ID na tabela.
        const ong = await conneconstction('ongs').select('name')
                                                 .where('id', id)
                                                 .first()

        // Se nao retornar ONG apresentar erro
        if (!ong){
            return res.status(400)
                      .json({error : 'No ONG found with this ID'})
        }
        
        //Retornar ONG
        return res.json(ong)
    }

}