const { Type } = require('../db');
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
}

const typeController = new TypeModel(Type);

module.exports = typeController;