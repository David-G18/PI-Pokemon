const { DataTypes } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define('pokemon', {
    id: {
      type: DataTypes.UUID, // UUID Es una manera de mas "cool", de generar un id
      allowNull: false,
      primaryKey: true
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
    },
    hp: {
      type: DataTypes.INTEGER,
    },
    attack: {
      type: DataTypes.INTEGER,
    },
    defense: {
      type: DataTypes.INTEGER,
    },
    speed: {
      type: DataTypes.INTEGER,
    },
    height: {
      type: DataTypes.FLOAT,
    },
    weight: {
      type: DataTypes.FLOAT,
    },
    image: {
      type: DataTypes.STRING,
      defaultValue: "https://www.freepnglogos.com/uploads/pokeball-png/pokeball-icon-download-icons-32.png"
    }
  }, {
    // Hace que las marcas de tiempo no se creen en la base de datos
    timestamps: false,
  });
};
