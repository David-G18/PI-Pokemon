const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
    sequelize.define('type', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true
        },
        name: {
            type: DataTypes.STRING,
        }
    }, {
        // Hace que las marcas de tiempo no se creen en la base de datos
        timestamps: false,
    })
};