INSERT INTO AUTHORITY (name) VALUES ('ROLE_CLINICAL_CENTRE_ADMIN');
INSERT INTO AUTHORITY (name) VALUES ('ROLE_CLINIC_ADMIN');
INSERT INTO AUTHORITY (name) VALUES ('ROLE_PATIENT');
INSERT INTO AUTHORITY (name) VALUES ('ROLE_DOCTOR');
INSERT INTO AUTHORITY (name) VALUES ('ROLE_NURSE');

insert into clinical_centre_administrator (email, password, first_name, last_name, phone_number, status) values
('1st.Admin@maildrop.cc', '$2a$10$0fX3yNqeWX3O/f0HtZRtVOA/6SA1Jq2vqARolGgJjRu47FX4AE/Y.', 'Marko', 'Marković', '064123456', 'ACTIVE');
insert into clinical_centre_admin_authority (user_id, authority_id) values (1,1);

insert into clinic (address, description, name,clinic_rating,version) values ('Novi sad Grbavica', 'Savremena klinika u Novom Sadu', 'Klinika mira',2.5,0);
insert into clinic (address, description, name,clinic_rating,version) values ('Novi sad Tolstojeva', 'VMA', 'Klinika',3.7,0);

insert into clinic_administrator (email, password, first_name, last_name, phone_number, status,clinic_id,last_password_reset_date) values
 ('ClinicAdmin1@maildrop.cc', '$2a$10$O2sRY6wvf0lpUu/mF5RN2u9dSW3AAzEplF4g9RpzwDOfSCFRhad6C', 'Marko', 'Marković', '064153456', 'ACTIVE',1,'2020-01-05 16:33:14');
insert into clinic_admin_authority(user_id, authority_id) values (1,2);

insert into clinic_administrator (email, password, first_name, last_name, phone_number, status,clinic_id) values
 ('ClinicAdmin2@maildrop.cc', '$2a$10$O2sRY6wvf0lpUu/mF5RN2u9dSW3AAzEplF4g9RpzwDOfSCFRhad6C', 'Marko2', 'Marković', '064153459', 'ACTIVE',1);
insert into clinic_admin_authority(user_id, authority_id) values (2,2);

insert into examination_type (label, price,status,clinic_id,version) values ('Opsta praksa', '1000','EXISTING' ,1,0);
insert into examination_type (label, price,status,clinic_id,version) values ('Dermatolog', '2000','EXISTING',1,0);
insert into examination_type (label, price,status,clinic_id,version) values ('Oftamolog', '1000','EXISTING',1,0);
insert into examination_type (label, price,status,clinic_id,version) values ('Psiholog', '1500','EXISTING',1,0);
insert into examination_type (label, price,status,clinic_id,version) values ('Zubar', '1500','EXISTING',2,0);
insert into examination_type (label, price,status,clinic_id,version) values ('Zubarka', '1500','EXISTING',1,0);
insert into examination_type (label, price,status,clinic_id,version) values ('Logoped', '1500','EXISTING',1,0);
insert into examination_type (label, price,status,clinic_id,version) values ('Sportski lekar', '1500','EXISTING',1,0);
insert into examination_type (label, price,status,clinic_id,version) values ('Sportski lekar 1111', '1500','EXISTING',1,0);

 insert into doctor (email, password, first_name, last_name, phone_number,work_hours_from,work_hours_to,clinic_id,status,specialized_id, doctor_rating)
 values ('ClinicDoctor1@maildrop.cc', '$2a$10$E1K7MZ9u5TkTZtESLfc8lOulf9/aPXKXhsFxtZQYMAeRnk9ezZ42q', 'Misa1', 'Percic', '065256856','07:30','20:00',1,'ACTIVE',1,4);
insert into doctor_authority(user_id, authority_id) values (1,4);

 insert into doctor (email, password, first_name, last_name, phone_number,work_hours_from,work_hours_to,clinic_id,status,specialized_id,doctor_rating)
 values ('ClinicDoctor2@maildrop.cc', '$2a$10$0X7DgfIVxh1.MJoKeIp6juCEkrfYplqYrnUI7oB/LyElZ7dSZ2Z1a', 'Miodrag2', 'Simic', '065257165','06:00','20:00',1,'ACTIVE',2,2.5);
insert into doctor_authority(user_id, authority_id) values (2,4);


insert into nurse (email, password, first_name, last_name, phone_number,work_hours_from,work_hours_to,clinic_id,status)
values ('Nurse.01@maildrop.cc', '$2a$10$dT.7xoRoI338DdVr0E19EOj4/xrYSFyRLF6CAWphlBEONNnX22WfK', 'Milica', 'Milić', '065432432','06:00','14:00',1,'ACTIVE');
insert into nurse_authority(user_id, authority_id) values (1,5);

  insert into patient (email, password, first_name, last_name, phone_number,address,city,country,health_insurance_id,status,version)
 values ('Patient1@maildrop.cc', '$2a$10$ItcRjGVnH26jIqw7GRXOBeM5Wu3sGxkSdvSgTRWSjEpPno4J9T4kS', 'Milovan', 'Milic', '065258255','Marsala tita 13','Novi Sad',
 'Srbija','0625351236915','ACTIVATED',0);
 insert into medical_record(height, weight, blood_type, allergies, patient_id) values (186, 80, 'B-', 'Prasina, jaja', 1);
insert into patient_authority(user_id, authority_id) values (1,3);

insert into room (label, kind,status,clinic_id,version) values ('Room 1', 'EXAMINATION','EXISTING' ,1,0);
insert into room (label, kind,status,clinic_id,version) values ('Room 2', 'EXAMINATION','EXISTING' ,1,0);
insert into room (label, kind,status,clinic_id,version) values ('Room 4', 'OPERATION','EXISTING' ,1,0);
insert into room (label, kind,status,clinic_id,version) values ('Room 3', 'EXAMINATION','EXISTING' ,1,0);

insert into date_time_interval (start_date_time, end_date_time) values ('02.12.2019 08:00','02.12.2019 10:00');
insert into examination (kind,interval_id,status,examination_type_id,clinic_id,clinic_administrator_id,patient_id,version )
 values ('EXAMINATION',1,'APPROVED',2,1,1,1,0);

insert into date_time_interval (start_date_time, end_date_time) values ('10.12.2019 10:00','10.12.2019 11:00');
insert into examination (kind,interval_id,status,examination_type_id,clinic_id,clinic_administrator_id,patient_id,version )
 values ('EXAMINATION',2,'APPROVED',1,1,1,1,0);

insert into date_time_interval (start_date_time, end_date_time) values ('02.12.2019 10:00','02.12.2019 11:00');
insert into examination (kind,interval_id,status,examination_type_id,clinic_id,clinic_administrator_id,patient_id,version )
 values ('EXAMINATION',3,'APPROVED',2,1,1,1,0);

insert into date_time_interval (start_date_time, end_date_time) values ('23.12.2019 08:00','23.12.2019 10:00');
insert into examination (kind,interval_id,status,examination_type_id,clinic_id,clinic_administrator_id,patient_id,version )
 values ('EXAMINATION',4,'APPROVED',1,1,1,1,0);

 insert into date_time_interval (start_date_time, end_date_time) values ('18.12.2019 08:00','18.12.2019 10:00');
insert into examination (kind,interval_id,status,examination_type_id,clinic_id,clinic_administrator_id,patient_id,version )
 values ('EXAMINATION',5,'APPROVED',1,1,1,1,0);

  insert into date_time_interval (start_date_time, end_date_time) values ('13.11.2019 08:00','13.11.2019 10:00');
insert into examination (kind,interval_id,status,examination_type_id,clinic_id,clinic_administrator_id,patient_id,version )
 values ('EXAMINATION',6,'APPROVED',1,1,1,1,0);

   insert into date_time_interval (start_date_time, end_date_time) values ('08.11.2019 08:00','08.11.2019 10:00');
insert into examination (kind,interval_id,status,examination_type_id,clinic_id,clinic_administrator_id,patient_id,version )
 values ('EXAMINATION',7,'APPROVED',1,1,1,1,0);

   insert into date_time_interval (start_date_time, end_date_time) values ('29.11.2019 08:00','29.11.2019 10:00');
insert into examination (kind,interval_id,status,examination_type_id,clinic_id,clinic_administrator_id,patient_id,version )
 values ('EXAMINATION',8,'APPROVED',1,1,1,1,0);

    insert into date_time_interval (start_date_time, end_date_time) values ('09.11.2019 08:00','09.11.2019 10:00');
insert into examination (kind,interval_id,status,examination_type_id,clinic_id,clinic_administrator_id,patient_id,version )
 values ('EXAMINATION',9,'APPROVED',1,1,1,1,0);

    insert into date_time_interval (start_date_time, end_date_time) values ('22.12.2019 08:00','22.12.2019 10:00');
insert into examination (kind,interval_id,status,examination_type_id,clinic_id,clinic_administrator_id,patient_id,version )
 values ('EXAMINATION',10,'APPROVED',1,1,1,1,0);

 insert into doctor (email, password, first_name, last_name, phone_number,work_hours_from,work_hours_to,clinic_id,status,specialized_id,doctor_rating)
 values ('ClinicDoctor3@maildrop.cc', '$2a$10$E1K7MZ9u5TkTZtESLfc8lOulf9/aPXKXhsFxtZQYMAeRnk9ezZ42q', 'Miodrag3', 'Simic', '065257175','06:00','20:00',1,'ACTIVE',9,2.5);
insert into doctor_authority(user_id, authority_id) values (3,4);

 insert into doctor (email, password, first_name, last_name, phone_number,work_hours_from,work_hours_to,clinic_id,status,specialized_id,doctor_rating)
 values ('ClinicDoctor4@maildrop.cc', '$2a$10$E1K7MZ9u5TkTZtESLfc8lOulf9/aPXKXhsFxtZQYMAeRnk9ezZ42q', 'Miodrag4', 'Simic', '065287175','06:00','20:00',1,'ACTIVE',9,2.5);
insert into doctor_authority(user_id, authority_id) values (4,4);

 insert into doctor (email, password, first_name, last_name, phone_number,work_hours_from,work_hours_to,clinic_id,status,specialized_id,doctor_rating)
 values ('ClinicDoctor5@maildrop.cc', '$2a$10$E1K7MZ9u5TkTZtESLfc8lOulf9/aPXKXhsFxtZQYMAeRnk9ezZ42q', 'Miodrag5', 'Simic', '075287175','06:00','20:00',1,'ACTIVE',9,2.5);
insert into doctor_authority(user_id, authority_id) values (5,4);

 insert into doctor (email, password, first_name, last_name, phone_number,work_hours_from,work_hours_to,clinic_id,status,specialized_id,doctor_rating)
 values ('ClinicDoctor6@maildrop.cc', '$2a$10$E1K7MZ9u5TkTZtESLfc8lOulf9/aPXKXhsFxtZQYMAeRnk9ezZ42q', 'Miodrag6', 'Simic', '076287175','06:00','20:00',1,'ACTIVE',9,2.5);
insert into doctor_authority(user_id, authority_id) values (6,4);

 insert into date_time_interval (start_date_time, end_date_time) values ('27.12.2019 06:00','27.12.2019 23:00');
insert into examination (kind,interval_id,status,examination_type_id,clinic_id,clinic_administrator_id,patient_id,room_id,nurse_id)
 values ('EXAMINATION',11,'APPROVED',7,1,1,1,1,1);
insert into examining (examination_id,doctor_id) values (11,3);

 insert into date_time_interval (start_date_time, end_date_time) values ('27.12.2019 06:00','27.12.2019 23:00');
insert into examination (kind,interval_id,status,examination_type_id,clinic_id,clinic_administrator_id,patient_id,room_id,nurse_id)
 values ('EXAMINATION',12,'APPROVED',8,1,1,1,2,1);
insert into examining (examination_id,doctor_id) values (12,4);

 insert into date_time_interval (start_date_time, end_date_time) values ('27.12.2020 06:00','27.12.2020 23:00');
insert into examination (kind,interval_id,status,examination_type_id,clinic_id,clinic_administrator_id,patient_id,room_id,nurse_id)
 values ('OPERATION',13,'CANCELED',3,1,1,1,3,1);
insert into examining (examination_id,doctor_id) values (13,5);

 insert into date_time_interval (start_date_time, end_date_time) values ('27.12.2020 06:00','27.12.2020 23:00');
insert into examination (kind,interval_id,status,examination_type_id,clinic_id,clinic_administrator_id,patient_id,room_id,nurse_id)
 values ('EXAMINATION',14,'PREDEF_BOOKED',4,2,2,1,4,1);
insert into examining (examination_id,doctor_id) values (14,6);



