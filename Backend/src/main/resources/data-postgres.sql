insert into clinical_centre_administrator (email, password, first_name, last_name, phone_number, status) values ('example@gmail.com', 'sifra', 'Marko', 'Marković', '064123456', 'ACTIVE');
insert into clinic (address, description, name) values ('3.Oktobar 73', 'Savremena klinika u Beogradu', 'VMA');
insert into clinic (address, description, name) values ('Marsala Tita 9c', 'Savremena klinika u Novom Sadu', 'Klinika mira');
insert into clinic_administrator (email, password, first_name, last_name, phone_number, status,clinic_id) values ('example@gmail.com', 'sifra', 'Marko', 'Marković', '064123456', 'ACTIVE',1);
insert into clinic_administrator (email, password, first_name, last_name, phone_number, status,clinic_id) values ('example2@gmail.com', 'sifra', 'Mario', 'Simic', '0652561980', 'ACTIVE',2);
insert into examination_type (label, price,status,clinic_id) values ('Ginekolog', '5000','EXISTING' ,1);
insert into examination_type (label, price,status,clinic_id) values ('Zubar', '2000','EXISTING',1);