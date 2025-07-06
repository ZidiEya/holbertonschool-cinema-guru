// Importation de DataTypes depuis Sequelize, utilisé pour définir les types des champs d'un modèle (ex : STRING, INTEGER, etc.)
const DataTypes = require("sequelize").DataTypes;

// Importation de l'instance Sequelize configurée, permettant d’interagir avec la base de données
const sequelize = require('../config/database');

// Importation de la fonction utilitaire pour hasher les mots de passe (généralement avec bcrypt)
const { hashPassword } = require('../utils/password');

const User = sequelize.define('User', {
    username: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false,
    }
});

User.beforeCreate(async (user, _) => { user.password = await hashPassword(user.password) })

module.exports = User;
