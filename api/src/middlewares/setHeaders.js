function setHeaders (req, res, next) {
    // update to match the domain you will make the request from - Se le da un header que permita recibir metodos del dominio provisto, en este caso el localhost
    res.header('Access-Control-Allow-Origin', 'http://localhost:3000'); 
    res.header('Access-Control-Allow-Credentials', 'true');
    // Se le dice que tipos de archivos puede recibir
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept'); 
    // Se le informa que metodos puede recibir
    res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE'); 
    // Para que la ejecución no muera aca, se le debe dar un next, para que pueda avanzar a las otra rutas
    next();
};

  module.exports = setHeaders;