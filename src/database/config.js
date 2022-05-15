const mongoose = require('mongoose');

const dbConnection = async () => {
    
    try {
        await mongoose.connect(process.env.MONGODB_CNN, {
            useNewUrlParser: true
        });
    } catch (error) {
        console.log(error);
        throw new Error('Error a la hora de iniciar la base de datos.');
    }

    console.log('Base de datos online.');
};

module.exports = {
    dbConnection
}