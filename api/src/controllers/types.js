const { Type } = require('../db');
const ModelCrud = require('./index');
const axios = require('axios').default;
const { TYPE_URL } = process.env;

class TypeModel extends ModelCrud {
    constructor (model) {
        super(model);
    }
    // Llena la base de datos con los resultados de la api y posteriormente devuelve los datos de 
    // la base de datos 
    getType = async (req, res, next) => {
        try {
            // Cuando la DB no se ha reseteado por cambios y se intenta recargar, el codigo intenta volver 
            // a crear elementos en la base de datos con los mismos y no va a dejar, ya que el id es la PK
            // Para solucionar esto si la base de datos ya esta rellenada solo se vuelven a entregar los
            // mismos datos para no volverlos a crear
            const myTypesA = await this.model.findAll();

            if (!myTypesA.length) {
                const apiTypes = await axios(TYPE_URL);
                await Promise.all(apiTypes.data.results.map(async (t, i) => {
                    await Type.create({
                    id: i +1,
                    name: t.name
                    });
                }));
            } 
            const myTypesB = myTypesA.length ? myTypesA : await this.model.findAll(); 

            res.send(myTypesB);

        } catch (error) {
            next(error);
        }
    };
}

const typeController = new TypeModel(Type);

module.exports = typeController;