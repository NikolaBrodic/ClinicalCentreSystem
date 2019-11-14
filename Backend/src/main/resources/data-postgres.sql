insert into clinical_centre_administrator (email, password, first_name, last_name, phone_number, status) values ('example@gmail.com', 'sifra', 'Marko', 'Marković', '064123456', 'ACTIVE');
insert into clinic (address, description, name) values ('3.Oktobar 73', 'Savremena klinika u Beogradu', 'VMA');
insert into clinic (address, description, name) values ('Marsala Tita 9c', 'Savremena klinika u Novom Sadu', 'Klinika mira');
insert into clinic_administrator (email, password, first_name, last_name, phone_number, status,clinic_id) values ('example@gmail.com', 'sifra', 'Marko', 'Marković', '064123456', 'ACTIVE',1);
insert into clinic_administrator (email, password, first_name, last_name, phone_number, status,clinic_id) values ('example2@gmail.com', 'sifra', 'Mario', 'Simic', '0652561980', 'ACTIVE',2);
insert into examination_type (label, price,status,clinic_id) values ('Ginekolog', '5000','EXISTING' ,1);
insert into examination_type (label, price,status,clinic_id) values ('Zubar', '2000','EXISTING',1);
insert into doctor (email, password, first_name, last_name, phone_number,work_hours_from,work_hours_to,clinic_id,status,specialized_id) values
  ('popov2@gmail.com', '280510556', 'Doca', 'Docic', '0652561980','08:00','10:00',1,'ACTIVE',1);
 insert into doctor (email, password, first_name, last_name, phone_number,work_hours_from,work_hours_to,clinic_id,status,specialized_id)
 values ('popov5@gmail.com', '280510556', 'Sima', 'Docic', '065256155','06:00','19:00',1,'DELETED',2);
