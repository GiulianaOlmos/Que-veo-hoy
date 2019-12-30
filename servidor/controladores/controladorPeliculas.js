var connection = require('../lib/conexionbd');

function buscarPeliculas (req, res) {
    let sql = 'SELECT * FROM pelicula WHERE true';
    let titulo = req.query.titulo;
    let anio = req.query.anio;
    let genero = req.query.genero;
    let orden =req.query.columna_orden; 
    let tipoDeOrden = req.query.tipo_orden;
    let cantidad = req.query.cantidad;
    let pagina = (req.query.pagina -1)*cantidad;

    let total;
      
    //FILTROS
    if(titulo){
        sql += ' AND titulo LIKE "%'+ titulo +'%"';
    }
    if(anio){
        sql += ' AND anio =' + anio;
    }  
    if(genero){
        sql += ' AND genero_id =' + genero;
    }

    //ORDEN Y PAGINACION
    sql += " ORDER BY " + orden +" "+ tipoDeOrden + " LIMIT "+ pagina + ","+ cantidad;


    //TODAS LAS PELICULAS
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
  
    function buscarGenero(req, res){
        var sql = "SELECT * FROM genero";
        
        connection.query(sql, function(error, resultado){
            if (error) {
              console.log('Hubo un error en la consulta', error.message);
              return res.status(404).send('Hubo un error en la consulta');
            }
            var response = {
              'generos': resultado
            };
    
            res.send(JSON.stringify(response));
        });
    }

module.exports = {
    buscarPeliculas: buscarPeliculas,
    buscarGenero: buscarGenero,
};

