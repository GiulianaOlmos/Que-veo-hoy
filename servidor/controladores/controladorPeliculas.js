var connection = require('../lib/conexionbd');

function buscarPeliculas (req, res) {
    let sql = 'SELECT * FROM pelicula';
    let sql_;
    let titulo = req.query.titulo;
    let anio = req.query.anio;
    let genero = req.query.genero;
    let orden =req.query.columna_orden; 
    let tipoDeOrden = req.query.tipo_orden;
    let pagina = req.query.pagina;
    let cantidad = req.query.cantidad;
    let total;
      
      
    //TOTAL DE PELÍCULAS
    connection.query(sql, function(error, resultado) {
        if (error) {
            console.log("Hubo un error en la consulta", error.message);
            return res.status(404).send("Hubo un error en la consulta");       
        }
        total = resultado.length;
        console.log(total);

        var response = {
            'peliculas': resultado,
            'total': total
        };

        res.send(JSON.stringify(response));   
    });
  
    };
  

module.exports = {
    buscarPeliculas: buscarPeliculas,
};