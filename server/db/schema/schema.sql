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

  type varchar(5) not null,
  verified varchar(10) default 'menunggu' not null,
  verified_prelim varchar(10) default 'menunggu' not null,
  status_prelim varchar(10) default 'kosong' not null,
  status_elim varchar(10) default 'kosong' not null
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

-- soal
CREATE TABLE prelim_unac_pg (
  id SERIAL PRIMARY KEY,
  soal text not null,
  pilihan1 text not null,
  pilihan2 text not null,
  pilihan3 text not null,
  pilihan4 text not null,
  jawaban int not null,
  bobot int not null,
  paket int not null
);

CREATE TABLE prelim_unac_isian (
  id SERIAL PRIMARY KEY,
  soal text not null,
  jawaban text not null,
  bobot int not null,
  paket int not null
);

CREATE TABLE prelim_tac_pg (
  id SERIAL PRIMARY KEY,
  soal text not null,
  pilihan1 text not null,
  pilihan2 text not null,
  pilihan3 text not null,
  pilihan4 text not null,
  jawaban int not null,
  bobot int not null,
  paket int not null
);

CREATE TABLE elim_unac_battle_of_sandwich (
  id SERIAL PRIMARY KEY,
  soal text not null,
  pilihan1 text not null,
  pilihan2 text not null,
  pilihan3 text not null,
  pilihan4 text not null,
  jawaban int not null,
  bobot int not null,
  paket int not null
);

CREATE TABLE elim_unac_rescue_the_number (
  id SERIAL PRIMARY KEY,
  soal text not null,
  jawaban text not null,
  bobot int not null
);

-- logic
CREATE TABLE prelim_unac_master (
  id SERIAL PRIMARY KEY,
  team_id int UNIQUE not null,
  token varchar not null,
  orders varchar not null,
  paket int not null,
  score int not null default 0,
  last_page int not null default 1,
  submited timestamp,
  benar int not null default 0,
  salah int not null default 0,
  kosong int default 15,
  FOREIGN KEY (team_id) REFERENCES team (id)
);

CREATE TABLE prelim_tac_master (
  id SERIAL PRIMARY KEY,
  team_id int UNIQUE not null,
  token varchar not null,
  orders varchar not null,
  paket int not null,
  score int not null default 0,
  last_page int not null default 1,
  submited timestamp,
  benar int not null default 0,
  salah int not null default 0,
  kosong int default 15,
  FOREIGN KEY (team_id) REFERENCES team (id)
);

-- jawaban
CREATE TABLE prelim_unac_pg_jawaban (
  id SERIAL PRIMARY KEY,
  team_id int not null,
  soal_id int not null,
  jawaban int not null,
  FOREIGN KEY (team_id) REFERENCES prelim_unac_master (team_id),
  FOREIGN KEY (soal_id) REFERENCES prelim_unac_pg (id),
  UNIQUE(team_id, soal_id)
);


CREATE TABLE prelim_unac_isian_jawaban (
  id SERIAL PRIMARY KEY,
  team_id int not null,
  soal_id int not null,
  jawaban text not null,
  FOREIGN KEY (team_id) REFERENCES prelim_unac_master (team_id),
  FOREIGN KEY (soal_id) REFERENCES prelim_unac_isian (id),
  UNIQUE(team_id, soal_id)
);


CREATE TABLE prelim_tac_pg_jawaban (
  id SERIAL PRIMARY KEY,
  team_id int not null,
  soal_id int not null,
  jawaban int not null,
  FOREIGN KEY (team_id) REFERENCES prelim_tac_master (team_id),
  FOREIGN KEY (soal_id) REFERENCES prelim_tac_pg (id),
  UNIQUE(team_id, soal_id)
);

create table statistics (
  id serial not null primary key,
  tac_daftar integer,
  tac_verif integer,
  unac_daftar integer,
  unac_verif integer
);

CREATE TABLE config (
  id SERIAL PRIMARY KEY,
  prelim_unac_start timestamp,
  prelim_unac_stop timestamp,
  prelim_tac_start timestamp,
  prelim_tac_stop timestamp
);
