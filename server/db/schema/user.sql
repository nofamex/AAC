create table users (
	id serial not null constraint users_pk primary key,
	first_name varchar(50) not null,
	last_name varchar(50) not null,
	username varchar(20) not null,
	password varchar(60) not null,
  refresh_token varchar(320)
);

create unique index users_username_uindex
	on users (username);