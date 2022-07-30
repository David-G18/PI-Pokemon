const axios = require('axios').default;
const { TYPE_URL } = process.env;
const { Type } = require('../db');

class ModelCrud {
    constructor (model) {
        this.model = model;
    }
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
    
    // Busca un pokemon o un tipo (dependiendo el modelo que se le pase) por su respectivo id
    getById = async (req, res, next) => {
        try {
            const { id } = req.params;
        
            const element = await this.model.findByPk(id);

            res.send(element);
        } catch (error) {
            next(error);
        }
    };

    // Se actualiza el/los dato/s que se les pase por body al elemento con el id que 
    // se le pase por parametro
    update = async (req, res, next) => {
        try {
            const { id } = req.params;
            const element = req.body;

            await this.model.update(element, {
                where: {
                    id,
                }
            });

            res.send('The element has been modified successfully');
        } catch (error) {
            next(error);
        }
    };

    // Elimina el elemento con el id que se le pase por parametro
    delete = async (req, res, next) => {
        try {
            const { id } = req.params;

            this.model.destroy({
                where: {
                    id
                }
            });

            res.send('The element has been deleted successfully');
        } catch (error) {
            next(error);
        }
    };
}

module.exports = ModelCrud;