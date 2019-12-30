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

    
function obtenerInfoPelicula(req, res) {
    var id = req.params.id;
    //Uso el JOIN para poder unir todas las tavlas en una conectandolas por los id creados en el script-inicial
    var sql = "SELECT * FROM pelicula JOIN genero ON pelicula.genero_id = genero.id JOIN actor_pelicula ON pelicula.id = actor_pelicula.pelicula_id JOIN actor ON actor_pelicula.actor_id = actor.id WHERE pelicula.id = '" + id + "'";
        
    connection.query(sql, function(error, resultado){
        if (error) {
            console.log('Hubo un error en la consulta', error.message);
            return res.status(404).send('Hubo un error en la consulta');
        }
        var response = {
            'pelicula': resultado[0],
            'actores' : resultado,
            'genero' : resultado[0]
        };
        res.send(JSON.stringify(response));
    });
}

function buscarPeliRecomendada(req, res){
    var genero = req.query.genero;
    var anioInicio = req.query.anio_inicio;
    var anioFin = req.query.anio_fin;
    var puntuacion = req.query.puntuacion;
    var sql = 'SELECT * FROM pelicula p INNER JOIN genero g ON p.genero_id = g.id WHERE true';

    if(genero){
        sql += ' AND g.nombre = ' + genero;
    }
    if(anioInicio){
        sql += ' AND fecha_lanzamiento >= ' + anioInicio;
    }
    if(anioFin){
        sql += ' AND fecha_lanzamiento <= ' + anioFin;
    }
    if(puntuacion){
        sql += ' AND p.puntuacion >= ' + puntuacion;
    }


    connections.query(sql, function(error, resultado){
      if (error) {
        console.log('Hubo un error en la consulta', error.message);
        return res.status(404).send('Hubo un error en la consulta');
      }
      var response = {
        'peliculas': resultado
      };
      res.send(JSON.stringify(response));
    });
  }
  
    

module.exports = {
    buscarPeliculas: buscarPeliculas,
    buscarGenero: buscarGenero,
    obtenerInfoPelicula: obtenerInfoPelicula,
    buscarPeliRecomendada: buscarPeliRecomendada,
};

