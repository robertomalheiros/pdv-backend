const bcrypt = require('bcrypt');
const criptografia = async (senha) => {
    const senhaCriptografada = await bcrypt.hash(senha, 10);
    return senhaCriptografada;
}

module.exports = criptografia;