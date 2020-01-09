INSERT INTO AUTHORITY (name) VALUES ('ROLE_CLINICAL_CENTRE_ADMIN');
INSERT INTO AUTHORITY (name) VALUES ('ROLE_CLINIC_ADMIN');
INSERT INTO AUTHORITY (name) VALUES ('ROLE_PATIENT');
INSERT INTO AUTHORITY (name) VALUES ('ROLE_DOCTOR');
INSERT INTO AUTHORITY (name) VALUES ('ROLE_NURSE');

insert into clinic (address, description, name,clinic_rating,version) values ('Novi sad Grbavica', 'Savremena klinika u Novom Sadu', 'Klinika mira',2.5,0);
insert into clinic (address, description, name,clinic_rating,version) values ('Novi sad Tolstojeva', 'VMA', 'Klinika',3.7,0);

insert into examination_type (label, price,status,clinic_id,version) values ('Opsta praksa', '1000','EXISTING' ,1,0);
insert into examination_type (label, price,status,clinic_id,version) values ('Dermatolog', '2000','EXISTING',1,0);
insert into examination_type (label, price,status,clinic_id,version) values ('Oftamolog', '1800','DELETED',1,0);
insert into examination_type (label, price,status,clinic_id,version) values ('Zubar', '1500','EXISTING',2,0);

 insert into doctor (email, password, first_name, last_name, phone_number,work_hours_from,work_hours_to,clinic_id,status,specialized_id, doctor_rating)
 values ('ClinicDoctor1@maildrop.cc', '$2a$10$E1K7MZ9u5TkTZtESLfc8lOulf9/aPXKXhsFxtZQYMAeRnk9ezZ42q', 'Miodrag', 'Simic', '065256856','07:30','20:00',1,'ACTIVE',1,4);
insert into doctor_authority(user_id, authority_id) values (1,4);

 insert into doctor (email, password, first_name, last_name, phone_number,work_hours_from,work_hours_to,clinic_id,status,specialized_id,doctor_rating)
 values ('ClinicDoctor2@maildrop.cc', '$2a$10$0X7DgfIVxh1.MJoKeIp6juCEkrfYplqYrnUI7oB/LyElZ7dSZ2Z1a', 'Miodrag', 'Lazarevic', '065257165','00:01','07:30',1,'ACTIVE',1,2.5);
insert into doctor_authority(user_id, authority_id) values (2,4);

 insert into doctor (email, password, first_name, last_name, phone_number,work_hours_from,work_hours_to,clinic_id,status,specialized_id, doctor_rating)
 values ('ClinicDoctor3@maildrop.cc', '$2a$10$E1K7MZ9u5TkTZtESLfc8lOulf9/aPXKXhsFxtZQYMAeRnk9ezZ42q', 'Misa', 'Popovic', '065356856','07:30','20:00',1,'ACTIVE',1,4);
insert into doctor_authority(user_id, authority_id) values (3,4);

insert into nurse (email, password, first_name, last_name, phone_number,work_hours_from,work_hours_to,clinic_id,status)
values ('Nurse.01@maildrop.cc', '$2a$10$dT.7xoRoI338DdVr0E19EOj4/xrYSFyRLF6CAWphlBEONNnX22WfK', 'Milica', 'Milić', '065432432','07:30','20:00',1,'ACTIVE');
insert into nurse_authority(user_id, authority_id) values (1,5);

insert into nurse (email, password, first_name, last_name, phone_number,work_hours_from,work_hours_to,clinic_id,status)
values ('Nurse.02@maildrop.cc', '$2a$10$dT.7xoRoI338DdVr0E19EOj4/xrYSFyRLF6CAWphlBEONNnX22WfK', 'Tamara', 'Simic', '065432433','00:01','07:30',1,'ACTIVE');
insert into nurse_authority(user_id, authority_id) values (2,5);

insert into nurse (email, password, first_name, last_name, phone_number,work_hours_from,work_hours_to,clinic_id,status)
values ('Nurse.03@maildrop.cc', '$2a$10$dT.7xoRoI338DdVr0E19EOj4/xrYSFyRLF6CAWphlBEONNnX22WfK', 'Jelena', 'Simic', '075432433','00:01','07:30',1,'ACTIVE');
insert into nurse_authority(user_id, authority_id) values (3,5);

insert into date_time_interval (start_date_time, end_date_time) values ( PARSEDATETIME('07.05.2020 08:00', 'dd.MM.yyyy HH:mm'),PARSEDATETIME('15.05.2020 10:00:00', 'dd.MM.yyyy HH:mm'));
insert into time_off_doctor (status, type, doctor_id, interval_id)
 values ('APPROVED', 'HOLIDAY', 1, 1);

  insert into time_off_doctor (status, type, doctor_id, interval_id)
 values ('AWAITING', 'HOLIDAY', 2, 1);

   insert into time_off_doctor (status, type, doctor_id, interval_id)
 values ('AWAITING', 'TIME_OFF', 3, 1);

insert into time_off_nurse (status, type, nurse_id, interval_id)
 values ('APPROVED', 'HOLIDAY', 1, 1);

 insert into time_off_nurse (status, type, nurse_id, interval_id)
 values ('AWAITING', 'HOLIDAY', 2, 1);

  insert into time_off_nurse (status, type, nurse_id, interval_id)
 values ('REJECTED', 'HOLIDAY', 3, 1);

 insert into date_time_interval (start_date_time, end_date_time) values ( PARSEDATETIME('07.07.2020 08:00', 'dd.MM.yyyy HH:mm'),PARSEDATETIME('15.07.2020 10:00:00', 'dd.MM.yyyy HH:mm'));



