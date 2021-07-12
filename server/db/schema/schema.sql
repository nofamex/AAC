create type verification AS ENUM ('menunggu', 'ditolak', 'berhasil');
create type competition AS ENUM ('unac', 'tac');

-- team
create table team (
  id serial not null primary key,
  team_name varchar(64) not null unique,
  university varchar(64) not null,

  full_name varchar(64) not null,
  phone varchar(15) not null,
  id_line varchar(64) not null,
  email varchar(64) not null,

  photo_link varchar(255) not null,
  payment_link varchar(255) not null,
  card_link varchar(255) not null,
  sk_link varchar(255),

  type competition not null,
  verified verification default 'menunggu' not null
);

-- user
create table users (
	id serial not null primary key,
	full_name varchar(64) not null,
  email varchar(64) not null unique,
	password varchar(60) not null,
  refresh_token varchar(320),
  team_id integer,

  foreign key (team_id) references team(id),
  role varchar(5)
);

create unique index users_username_uindex
	on users(email); 

-- member
create table member (
  id serial not null primary key,
  full_name varchar(64) not null,
  birth_place varchar(64) not null,
  birth_date date not null,
  nisn varchar(10),
  team_id integer not null,
  member_number integer not null,

  foreign key (team_id) references team(id)
);
