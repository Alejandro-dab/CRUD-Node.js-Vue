drop database IF EXISTS  suministros;
CREATE database suministros; 
USE suministros;      
        
CREATE TABLE Existencias(
	id INT UNSIGNED AUTO_INCREMENT NOT NULL PRIMARY KEY,
    descripcion VARCHAR (50) NOT NULL,
    precio DECIMAL(10,2)NOT NULL,
    stock INT NOT NULL
);

INSERT INTO Existencias (id, descripcion, precio, stock)
VALUES ('1', 'Cemento', 350.5, 112);


Use suministros; 
SELECT * FROM Existencias; 



