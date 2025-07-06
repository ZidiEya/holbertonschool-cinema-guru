// Importation du constructeur Sequelize depuis la bibliothèque 'sequelize'
const Sequelize = require('sequelize').Sequelize;

// Création d'une instance Sequelize pour se connecter à la base de données PostgreSQL
const sequelize = new Sequelize(
    process.env.DB_SCHEMA || 'postgres',    // Nom de la base de données (par défaut : 'postgres')
    process.env.DB_USER || 'postgres',      // Nom d'utilisateur de la BDD (par défaut : 'postgres')
    process.env.DB_PASSWORD || '',          // Mot de passe de l'utilisateur (vide par défaut)
    {
        host: process.env.DB_HOST || 'localhost',  // Hôte de la BDD (par défaut : localhost)
        port: process.env.DB_PORT || 5432,         // Port de la BDD (par défaut : 5432 pour PostgreSQL)
        dialect: 'postgres',                       // Indique que la base de données utilisée est PostgreSQL
        dialectOptions: {
            ssl: process.env.DB_SSL == "true"      // Active le SSL si la variable d'environnement DB_SSL est "true"
