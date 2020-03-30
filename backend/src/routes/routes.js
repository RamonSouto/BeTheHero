const express = require('express');
const {celebrate, Segments, Joi} = require('celebrate');

const routes = express.Router();

const ongController = require('../controllers/OngController');
const incidentController = require('../controllers/IncidentController');
const profileController = require('../controllers/ProfileController');
const sessionController = require('../controllers/SessionController');

//Faze Validação
routes.post('/sessions', sessionController.create)

//Faze Validação
routes.get('/ongs', ongController.index);

//Validando os campos que esta vindo no Body com Clebrate
routes.post('/ongs', celebrate({
    [Segments.BODY]: Joi.object().keys({
        name: Joi.string().required(),
        email: Joi.string().required().email(),
        whatsapp: Joi.string().required().min(10).max(11),
        city: Joi.string().required(),
        uf: Joi.string().required().length(2),
    })
}), ongController.create);

//Validando os campos que esta vindo no Params com Clebrate
routes.get('/profile', celebrate({
    [Segments.HEADERS]: Joi.object({
        authorization: Joi.string().required(),
    }).unknown(),
}),profileController.index);


//Validando os campos que esta vindo no Query com Clebrate
routes.post('/incidents',celebrate({
    [Segments.QUERY]: Joi.object().keys({
        page: Joi.number(),
    }) 
}),incidentController.create);

//Faze Validação
routes.get('/incidents', incidentController.index);

//Validando os campos que esta vindo no Route com Clebrate
routes.delete('/incidents/:id', celebrate({
    [Segments.PARAMS]: Joi.object().keys({
        id: Joi.number().required(),
    }),
}),incidentController.delete);

module.exports = routes;