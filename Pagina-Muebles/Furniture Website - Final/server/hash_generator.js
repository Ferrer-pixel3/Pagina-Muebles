const bcrypt = require('bcrypt');
const saltRounds = 10;
const password = process.env.PASSWORD || '12345678'; // Cambia esto o exporta PASSWORD

bcrypt.hash(password, saltRounds, function(err, hash) {
    if (err) throw err;
    console.log('----------------------------------------------------');
    console.log('HASH GENERADO (CÓPIALO COMPLETO):');
    console.log(hash);
    console.log('----------------------------------------------------');
});
