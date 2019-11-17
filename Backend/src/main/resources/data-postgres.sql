INSERT INTO AUTHORITY (name) VALUES ('ROLE_CLINICAL_CENTRE_ADMIN');
INSERT INTO AUTHORITY (name) VALUES ('ROLE_CLINIC_ADMIN');
INSERT INTO AUTHORITY (name) VALUES ('ROLE_PATIENT');
INSERT INTO AUTHORITY (name) VALUES ('ROLE_DOCTOR');
INSERT INTO AUTHORITY (name) VALUES ('ROLE_NURSE');

insert into clinical_centre_administrator (email, password, first_name, last_name, phone_number, status) values ('example1@gmail.com', '$2a$10$vItHuDDoGhFDiFKvsJbQoO0YtTCyo2mqRA9yZTO3NFwi5omW8bkrS', 'Marko', 'Marković', '064123456', 'ACTIVE');
insert into clinical_centre_admin_authority (user_id, authority_id) values (1,1);

insert into clinic (address, description, name) values ('3.Oktobar 73', 'Savremena klinika u Beogradu', 'VMA');
insert into clinic (address, description, name) values ('Marsala Tita 9c', 'Savremena klinika u Novom Sadu', 'Klinika mira');
insert into clinic_administrator (email, password, first_name, last_name, phone_number, status,clinic_id) values ('example@gmail.com', 'sifraA135!', 'Marko', 'Marković', '064123456', 'ACTIVE',1);
insert into clinic_administrator (email, password, first_name, last_name, phone_number, status,clinic_id) values ('example2@gmail.com', 'sifr78A125!', 'Mario', 'Simic', '0652561980', 'ACTIVE',2);
insert into examination_type (label, price,status,clinic_id) values ('Ginekolog', '5000','EXISTING' ,1);
insert into examination_type (label, price,status,clinic_id) values ('Zubar', '2000','EXISTING',1);
insert into doctor (email, password, first_name, last_name, phone_number,work_hours_from,work_hours_to,clinic_id,status,specialized_id) values
  ('popov2@gmail.com', '2805Aa!10556', 'Doca', 'Docic', '0652561980','08:00','10:00',1,'ACTIVE',1);
 insert into doctor (email, password, first_name, last_name, phone_number,work_hours_from,work_hours_to,clinic_id,status,specialized_id)
 values ('popov5@gmail.com', '28051005Aa!556', 'Sima', 'Docic', '065256155','06:00','19:00',1,'DELETED',2);
insert into patient (email, password, first_name, last_name, phone_number,address,city,country,health_insuranceid,status)
 values ('popov585@gmail.com', 'jelen05Aa!aJel', 'Sima', 'Docic', '065256155','Oktobar ','Grad','Drazva','1252525252525','APPROVED');
 insert into nurse (email, password, first_name, last_name, phone_number,work_hours_from,work_hours_to,clinic_id,status)
 values ('popov5@gmail.com', '28051005Aa!556', 'Sima', 'Docic', '065256155','06:00','19:00',1,'ACTIVE');
insert into patient (email, password, first_name, last_name, phone_number, address, city, country, health_insuranceid, status) values ('pera.peric@maildrop.cc', 'pera.05Aa!peric', 'Pera', 'Peric', '064123456', 'Gogoljeva 32','Novi Sad','Srbija','1234567890123','AWAITING_APPROVAL');
insert into patient (email, password, first_name, last_name, phone_number, address, city, country, health_insuranceid, status) values ('djole.djolic@maildrop.cc', 'djole05Aa!.djolic', 'Djole', 'Djolic', '063123456', 'Gogoljeva 32','Novi Sad','Srbija','0123456789012','AWAITING_APPROVAL');
