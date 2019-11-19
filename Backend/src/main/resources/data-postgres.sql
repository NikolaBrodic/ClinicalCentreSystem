INSERT INTO AUTHORITY (name) VALUES ('ROLE_CLINICAL_CENTRE_ADMIN');
INSERT INTO AUTHORITY (name) VALUES ('ROLE_CLINIC_ADMIN');
INSERT INTO AUTHORITY (name) VALUES ('ROLE_PATIENT');
INSERT INTO AUTHORITY (name) VALUES ('ROLE_DOCTOR');
INSERT INTO AUTHORITY (name) VALUES ('ROLE_NURSE');

/* password: 1st.Admin */
insert into clinical_centre_administrator (email, password, first_name, last_name, phone_number, status) values ('1st.admin@maildrop.cc', '$2a$10$0fX3yNqeWX3O/f0HtZRtVOA/6SA1Jq2vqARolGgJjRu47FX4AE/Y.', 'Marko', 'Marković', '064123456', 'ACTIVE');
insert into clinical_centre_admin_authority (user_id, authority_id) values (1,1);

insert into clinic (address, description, name) values ('3.Oktobar 73', 'Savremena klinika u Beogradu', 'VMA');
insert into clinic (address, description, name) values ('Marsala Tita 9c', 'Savremena klinika u Novom Sadu', 'Klinika mira');

/* password: Jelena062! */
insert into clinic_administrator (email, password, first_name, last_name, phone_number, status,clinic_id) values ('example@gmail.com', '$2a$10$t/y9GLOzYq0JI7YY06ull.rQ1g.WN6g1/.qoc/Vt5ssUheNcAmEzy', 'Marko', 'Marković', '064123456', 'ACTIVE',1);
insert into clinic_administrator (email, password, first_name, last_name, phone_number, status,clinic_id) values ('example2@gmail.com', '$2a$10$t3Zfe7cCr8AwnPNikiCSX.c4c7a382z8WhpSUznkLgaqK5SZUqX12', 'Mario', 'Simic', '0652561980', 'ACTIVE',2);
insert into clinic_admin_authority(user_id, authority_id) values (1,2);
insert into clinic_admin_authority(user_id, authority_id) values (2,2);

insert into clinic_administrator (email, password, first_name, last_name, phone_number, status,clinic_id) values ('example22@gmail.com', '$2a$10$t3Zfe7cCr8AwnPNikiCSX.c4c7a382z8WhpSUznkLgaqK5SZUqX12', 'Mario', 'Simic', '0642561980', 'NEVER_LOGGED_IN',1);
insert into clinic_admin_authority(user_id, authority_id) values (3,2);

insert into examination_type (label, price,status,clinic_id) values ('Ginekolog', '5000','EXISTING' ,1);
insert into examination_type (label, price,status,clinic_id) values ('Zubar', '2000','EXISTING',1);

insert into room (label, kind,status,clinic_id) values ('Room1', 'OPERATION','EXISTING' ,1);
insert into room (label, kind,status,clinic_id) values ('Room2', 'EXAMINATION','EXISTING' ,1);
insert into room (label, kind,status,clinic_id) values ('Room3', 'EXAMINATION','DELETED' ,1);
insert into room (label, kind,status,clinic_id) values ('Room4', 'OPERATION','EXISTING' ,2);
insert into room (label, kind,status,clinic_id) values ('Room5', 'EXAMINATION','EXISTING' ,2);

 insert into nurse (email, password, first_name, last_name, phone_number,work_hours_from,work_hours_to,clinic_id,status)
 values ('popov5@gmail.com', '$2a$10$Hef/d2ZrMjGXUFE60xUVU.u0up/nV2cIJMg9GDevEgnv5cCcJpTpW', 'Sima', 'Docic', '065256155','06:00','19:00',1,'ACTIVE');
insert into nurse_authority(user_id, authority_id) values (1,5);