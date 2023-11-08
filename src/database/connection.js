const {Sequelize} = require('sequelize')

const sequelize = new Sequelize({
    username: 'sqlserver',
    password: 'sqlserver',
    database: 'gatsbyFrontEnd',
    host: '/cloudsql/adept-stage-404518:southamerica-east1:servergatsby',
    dialect: 'mssql',
    port: 1433,
    define: {        
        freezeTableName: true
    }
})

try{
    sequelize.authenticate()
    console.log('Connection Succefully')    
}
catch(err)
{
    console.log('Connection error')
}


module.exports = sequelize
