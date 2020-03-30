const connection = require('../database/connection')

module.exports = {

    async index (req, res){
        
        //Paginação no resultado
        const {page = 1} = req.query;

        // retorna um quantidade ex.: { 'count(*)': 14 }
        const [count] = await connection('incidents').count();

        //Lista os incidentes com um join na tabela de ONGS trazendo  Nome, Email, WhatsApp, City e UF
        const incidents = await connection('incidents').select(['incidents.*', 'ongs.name', 'ongs.email', 'ongs.whatsapp', 'ongs.city', 'ongs.uf']) //Todos os dados da tabela incidentes
                                                       .limit(5)
                                                       .offset((page-1)*5)
                                                       .join('ongs', 'ongs.id', '=', 'incidents.ong_id'); //tabela do join campos de igualdade nas duas tabelas
        
                                                       //Retorna para o header a quantidade de itens na tebela
        res.header('X-Total-Count',count['count(*)']);
        return res.json(incidents).status(200);
        
    },

    
    async create (req, res) {

        //Faz uma descontrução dos dados passados pelo corpo da requisição
        const {title, description, value} = req.body;

        //pega o ID da ONG passado no cabeçalho no campo de authorization
        const ong_id = req.headers.authorization;
        
        //Cria um novo registro no banco de dados com os dados que foram descontruidos
        const [id] = await connection('incidents').insert({
            title,
            description,
            value,
            ong_id,
        })

        //retorna ID do registro que foi inserido no banco
        return res.json({id}).status(200);
    },

    async delete(req,res) {

        //Faz uma descontrução dos dados passados como paramatros na URL -> /:id 
        const { id } = req.params;
        
        //pega o ID da ONG passado no cabeçalho no campo de authorization
        const ong_id = req.headers.authorization;

        //Pesquisa no banco de dados se o ID da ONG na tabela de incidente foi gerado para o ID do incidente
        const incidents = await connection('incidents').select('ong_id').where('id', id).first(); //First -> Aguarda o retorno de somente um ID

        //Verifica se o ID da ONG e o mesmo ID passado como paramentro na URL, se não for apresenta mensagem de erro
        if (incidents.ong_id !== ong_id) {
            return res.status(401).json({ error: 'Operation not permitted.'})
        }

        //Executa a exclusão do registro no banco de dados
        await connection('incidents').where('id', id).delete();

        return res.status(204).send();
    }
}