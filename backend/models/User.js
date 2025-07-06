// Importation des types de données Sequelize pour définir les champs du modèle
const DataTypes = require("sequelize").DataTypes;

// Importation de l'instance Sequelize connectée à la base de données
const sequelize = require('../config/database');

// Importation de la fonction pour hasher les mots de passe
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
