const DataTypes = require("sequelize").DataTypes;
const sequelize = require('../config/database');
const User = require('./User')

const Title = sequelize.define('Title', {
    title: {
        type: DataTypes.STRING,
        defaultValue: "Title not available"
    },
    imdbId: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    synopsis: {
        type: DataTypes.TEXT,
    },
    imageurls: {
        type: DataTypes.ARRAY(DataTypes.STRING),
        defaultValue: []
    },
    imdbrating: {
        type: DataTypes.FLOAT,
        defaultValue: -1
    },
    released: {
        type: DataTypes.INTEGER,
        defaultValue: -1
    },
    type: {
        type: DataTypes.STRING
    },
    genres: {
        type: DataTypes.ARRAY(DataTypes.STRING),
        defaultValue: []
    }
});

// Définition de deux modèles Sequelize représentant les tables intermédiaires (sans colonnes supplémentaires)
const UserFavorites = sequelize.define('UserFavorites', {}, {});  // Table pivot pour les favoris
const UserWatchLater = sequelize.define('UserWatchLater', {}, {});  // Table pivot pour les titres à voir plus tard

// Définition de la relation Many-to-Many entre User et Title via UserFavorites
User.belongsToMany(Title, {
  as: 'favorite',               // Alias utilisé pour accéder aux titres favoris d'un utilisateur (user.getFavorite(), user.addFavorite(), etc.)
  through: "UserFavorites"      // Spécifie la table de jointure intermédiaire
});

// Définition de la relation Many-to-Many entre User et Title via UserWatchLater
User.belongsToMany(Title, {
  as: 'watchLater',             // Alias utilisé pour accéder aux titres à voir plus tard (user.getWatchLater(), etc.)
  through: "UserWatchLater"     // Table de jointure
});

// Inverse des relations ci-dessus : chaque titre peut être favori pour plusieurs utilisateurs
Title.belongsToMany(User, {
  as: 'favorite',               // Alias utilisé pour accéder aux utilisateurs qui ont favori ce titre
  through: "UserFavorites"      // Même table de jointure que précédemment
});

// Inverse de la watchlist : chaque titre peut être dans la watchlist de plusieurs utilisateurs
Title.belongsToMany(User, {
  as: 'watchLater',             // Alias utilisé pour accéder aux utilisateurs qui veulent regarder ce titre plus tard
  through: "UserWatchLater"     // Table de jointure correspondante
});


module.exports = { Title, UserFavorites, UserWatchLater };
