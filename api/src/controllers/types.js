const axios = require('axios').default;
const { Type } = require('../db');
const TYPE_URL = "https://pokeapi.co/api/v2/type";
const ModelCrud = require('./index');

class TypeModel extends ModelCrud {
    constructor (model) {
        super(model);
    }
    // Llena la base de datos con los resultados de la api y posteriormente devuelve los datos de 
    // la base de datos 
    getType = async (req, res, next) => {
        try {
            await this.fillDB();

            const myTypes = await this.model.findAll();
            
            res.send(myTypes);
            
        } catch (error) {
            next(error);
        }
    };

    // Llena la base de datos "Type" con los datos de la api
    fillDB = async () => {
        const myTypes = await this.model.findAll();

        if (!myTypes.length) {
            const apiTypes = await axios(TYPE_URL);
            await Promise.all(apiTypes.data.results.map(async (t, i) => {
                await Type.create({
                id: i +1,
                name: t.name
                });
            }));
        }
    };
}

const typeController = new TypeModel(Type);

module.exports = typeController;