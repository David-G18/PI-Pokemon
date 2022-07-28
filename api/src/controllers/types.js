const { Type } = require('../db');
const ModelCrud = require('./index');
const axios = require('axios').default;
const { TYPE_URL } = process.env;

class TypeModel extends ModelCrud {
    constructor (model) {
        super(model);
    }
    getType = async (req, res, next) => {
        try {
            let myTypes = await this.model.findAll();

            if (!myTypes.length) {
                const apiTypes = await axios(TYPE_URL);
                await Promise.all(apiTypes.data.results.map(async (t, i) => {
                    await Type.create({
                    id: i +1,
                    name: t.name
                    });
                }));
                myTypes = await this.model.findAll();
            } 
        
            res.send(myTypes);
            
        } catch (error) {
            next(error);
        }
    };
}

const typeController = new TypeModel(Type);

module.exports = typeController;