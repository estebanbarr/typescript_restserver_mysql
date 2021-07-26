create database tsc_restserver;

use tsc_restserver;

create usuario
(
    id        bigint(20) unsigned not null auto_increment,
    nombre    varchar(128) not null,
    email     varchar(128) not null,
    estado    char(1) not null default 'A',
    createdAt timestamp,
    updatedAt timestamp,
    primary key (id),
    unique key (email)
);
