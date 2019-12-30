CREATE DATABASE queveo;
USE queveo;

CREATE TABLE pelicula (
  id int auto_increment,
  titulo varchar(100),
  duracion int(5),
  director varchar(400),
  anio int(5),
  fecha_lanzamiento date,
  puntuacion int(2),
  poster varchar(300),
  trama varchar(700),
  PRIMARY KEY(id)
);

CREATE TABLE genero (
  id int auto_increment,
  nombre varchar(30),
  PRIMARY KEY(id)
);

ALTER TABLE pelicula ADD COLUMN genero_id int;

ALTER TABLE pelicula ADD FOREIGN KEY (genero_id) REFERENCES genero(id);