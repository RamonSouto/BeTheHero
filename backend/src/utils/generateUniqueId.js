const crypto = require('crypto');

module.exports = function generateUniqueId(){
    //pegando um valor randomico de 4 posições no formato hexadecimal
    return crypto.randomBytes(4).toString('HEX');
}