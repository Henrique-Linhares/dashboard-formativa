

USE dashboard_formativa;

CREATE TABLE IF NOT EXISTS dados (
    id INT NOT NULL AUTO_INCREMENT,
    data_hora VARCHAR(50) NOT NULL,
    temperatura FLOAT NOT NULL,
    umidade FLOAT NOT NULL,
    entry INT,
    PRIMARY KEY(id)
);
