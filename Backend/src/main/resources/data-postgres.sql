INSERT INTO AUTHORITY (name) VALUES ('ROLE_CLINICAL_CENTRE_ADMIN');
INSERT INTO AUTHORITY (name) VALUES ('ROLE_CLINIC_ADMIN');
INSERT INTO AUTHORITY (name) VALUES ('ROLE_PATIENT');
INSERT INTO AUTHORITY (name) VALUES ('ROLE_DOCTOR');
INSERT INTO AUTHORITY (name) VALUES ('ROLE_NURSE');
/*
insert into clinical_centre_administrator (email, password, first_name, last_name, phone_number, status) values
('1st.Admin@maildrop.cc', '$2a$10$JA.M/IQm9r29csrRlkNSteO/k4q3MclGtWfW/MjVqKFMVKb9T.F0i', 'Stefan', 'Stefanovic', '061123456', 'NEVER_LOGGED_IN');
insert into clinical_centre_admin_authority (user_id, authority_id) values (1,1);
*/
insert into clinical_centre_administrator (email, password, first_name, last_name, phone_number, status) values
('2nd.Admin@maildrop.cc', '$2a$10$EdmtVAmmfTwJfHg7tZk4U.a5GJSoptQRFUSCIPl8b6iw1xXctVi7e', 'Petar', 'Petrovic', '062123456', 'ACTIVE');
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
insert into examination_type (label, price,status,clinic_id,version) values ('Oftamolog', '1800','DELETED',1,0);
insert into examination_type (label, price,status,clinic_id,version) values ('Zubar', '1500','EXISTING',2,0);

/*DOCTORS*/
 insert into doctor (email, password, first_name, last_name, phone_number,work_hours_from,work_hours_to,clinic_id,status,specialized_id, doctor_rating)
 values ('ClinicDoctor1@maildrop.cc', '$2a$10$E1K7MZ9u5TkTZtESLfc8lOulf9/aPXKXhsFxtZQYMAeRnk9ezZ42q', 'Misa1', 'Percic', '065256856','07:30','20:00',1,'ACTIVE',1,4);
insert into doctor_authority(user_id, authority_id) values (1,4);

 insert into doctor (email, password, first_name, last_name, phone_number,work_hours_from,work_hours_to,clinic_id,status,specialized_id,doctor_rating)
 values ('ClinicDoctor2@maildrop.cc', '$2a$10$0X7DgfIVxh1.MJoKeIp6juCEkrfYplqYrnUI7oB/LyElZ7dSZ2Z1a', 'Miodrag2', 'Simic', '065257165','00:01','07:30',1,'NEVER_LOGGED_IN',1,2.5);
insert into doctor_authority(user_id, authority_id) values (2,4);

 insert into doctor (email, password, first_name, last_name, phone_number,work_hours_from,work_hours_to,clinic_id,status,specialized_id,doctor_rating)
 values ('ClinicDoctor3@maildrop.cc', '$2a$10$E1K7MZ9u5TkTZtESLfc8lOulf9/aPXKXhsFxtZQYMAeRnk9ezZ42q', 'Miodrag3', 'Simic', '065257175','10:00','20:00',1,'ACTIVE',1,2.5);
insert into doctor_authority(user_id, authority_id) values (3,4);

 insert into doctor (email, password, first_name, last_name, phone_number,work_hours_from,work_hours_to,clinic_id,status,specialized_id,doctor_rating)
 values ('ClinicDoctor4@maildrop.cc', '$2a$10$E1K7MZ9u5TkTZtESLfc8lOulf9/aPXKXhsFxtZQYMAeRnk9ezZ42q', 'Miodrag4', 'Simic', '065287175','06:00','20:00',1,'ACTIVE',2,2.5);
insert into doctor_authority(user_id, authority_id) values (4,4);

 insert into doctor (email, password, first_name, last_name, phone_number,work_hours_from,work_hours_to,clinic_id,status,specialized_id,doctor_rating)
 values ('ClinicDoctor5@maildrop.cc', '$2a$10$E1K7MZ9u5TkTZtESLfc8lOulf9/aPXKXhsFxtZQYMAeRnk9ezZ42q', 'Miodrag5', 'Simic', '075287175','00:01','08:00',1,'ACTIVE',2,2.5);
insert into doctor_authority(user_id, authority_id) values (5,4);

 insert into doctor (email, password, first_name, last_name, phone_number,work_hours_from,work_hours_to,clinic_id,status,specialized_id,doctor_rating)
 values ('ClinicDoctor6@maildrop.cc', '$2a$10$E1K7MZ9u5TkTZtESLfc8lOulf9/aPXKXhsFxtZQYMAeRnk9ezZ42q', 'Miodrag6', 'Simic', '076287175','12:00','22:00',1,'ACTIVE',2,2.5);
insert into doctor_authority(user_id, authority_id) values (6,4);

 insert into doctor (email, password, first_name, last_name, phone_number,work_hours_from,work_hours_to,clinic_id,status,specialized_id,doctor_rating)
 values ('ClinicDoctor7@maildrop.cc', '$2a$10$E1K7MZ9u5TkTZtESLfc8lOulf9/aPXKXhsFxtZQYMAeRnk9ezZ42q', 'Miodrag7', 'Simic', '076288275','00:01','23:00',1,'ACTIVE',1,2.5);
insert into doctor_authority(user_id, authority_id) values (7,4);

 insert into doctor (email, password, first_name, last_name, phone_number,work_hours_from,work_hours_to,clinic_id,status,specialized_id,doctor_rating)
 values ('ClinicDoctor8@maildrop.cc', '$2a$10$E1K7MZ9u5TkTZtESLfc8lOulf9/aPXKXhsFxtZQYMAeRnk9ezZ42q', 'Miodrag8', 'Simic', '076288675','00:01','23:00',1,'ACTIVE',2,2.5);
insert into doctor_authority(user_id, authority_id) values (8,4);

insert into nurse (email, password, first_name, last_name, phone_number,work_hours_from,work_hours_to,clinic_id,status)
values ('Nurse.01@maildrop.cc', '$2a$10$dT.7xoRoI338DdVr0E19EOj4/xrYSFyRLF6CAWphlBEONNnX22WfK', 'Milica1', 'Milić', '065432432','07:30','20:00',1,'ACTIVE');
insert into nurse_authority(user_id, authority_id) values (1,5);

insert into nurse (email, password, first_name, last_name, phone_number,work_hours_from,work_hours_to,clinic_id,status)
values ('Nurse.02@maildrop.cc', '$2a$10$dT.7xoRoI338DdVr0E19EOj4/xrYSFyRLF6CAWphlBEONNnX22WfK', 'Milica2', 'Milić', '065432433','00:01','07:30',1,'NEVER_LOGGED_IN');
insert into nurse_authority(user_id, authority_id) values (2,5);

insert into nurse (email, password, first_name, last_name, phone_number,work_hours_from,work_hours_to,clinic_id,status)
values ('Nurse.03@maildrop.cc', '$2a$10$dT.7xoRoI338DdVr0E19EOj4/xrYSFyRLF6CAWphlBEONNnX22WfK', 'Milica3', 'Milić', '065432434','10:00','20:00',1,'ACTIVE');
insert into nurse_authority(user_id, authority_id) values (3,5);

insert into nurse (email, password, first_name, last_name, phone_number,work_hours_from,work_hours_to,clinic_id,status)
values ('Nurse.04@maildrop.cc', '$2a$10$dT.7xoRoI338DdVr0E19EOj4/xrYSFyRLF6CAWphlBEONNnX22WfK', 'Milica4', 'Milić', '065432435','06:00','20:00',1,'ACTIVE');
insert into nurse_authority(user_id, authority_id) values (4,5);

insert into nurse (email, password, first_name, last_name, phone_number,work_hours_from,work_hours_to,clinic_id,status)
values ('Nurse.05@maildrop.cc', '$2a$10$dT.7xoRoI338DdVr0E19EOj4/xrYSFyRLF6CAWphlBEONNnX22WfK', 'Milica5', 'Milić', '065432436','00:01','08:00',1,'ACTIVE');
insert into nurse_authority(user_id, authority_id) values (5,5);

insert into nurse (email, password, first_name, last_name, phone_number,work_hours_from,work_hours_to,clinic_id,status)
values ('Nurse.06@maildrop.cc', '$2a$10$dT.7xoRoI338DdVr0E19EOj4/xrYSFyRLF6CAWphlBEONNnX22WfK', 'Milica6', 'Milić', '065432437','12:00','22:00',1,'ACTIVE');
insert into nurse_authority(user_id, authority_id) values (6,5);

insert into nurse (email, password, first_name, last_name, phone_number,work_hours_from,work_hours_to,clinic_id,status)
values ('Nurse.07@maildrop.cc', '$2a$10$dT.7xoRoI338DdVr0E19EOj4/xrYSFyRLF6CAWphlBEONNnX22WfK', 'Milica7', 'Milić', '065432467','00:01','23:00',1,'ACTIVE');
insert into nurse_authority(user_id, authority_id) values (7,5);

insert into nurse (email, password, first_name, last_name, phone_number,work_hours_from,work_hours_to,clinic_id,status)
values ('Nurse.08@maildrop.cc', '$2a$10$dT.7xoRoI338DdVr0E19EOj4/xrYSFyRLF6CAWphlBEONNnX22WfK', 'Milica8', 'Milić', '065432457','00:01','23:00',1,'ACTIVE');
insert into nurse_authority(user_id, authority_id) values (8,5);

insert into nurse (email, password, first_name, last_name, phone_number,work_hours_from,work_hours_to,clinic_id,status)
values ('Nurse.09@maildrop.cc', '$2a$10$dT.7xoRoI338DdVr0E19EOj4/xrYSFyRLF6CAWphlBEONNnX22WfK', 'Milica9', 'Milić', '065432447','00:01','23:00',1,'ACTIVE');
insert into nurse_authority(user_id, authority_id) values (9,5);

insert into nurse (email, password, first_name, last_name, phone_number,work_hours_from,work_hours_to,clinic_id,status)
values ('Nurse.10@maildrop.cc', '$2a$10$dT.7xoRoI338DdVr0E19EOj4/xrYSFyRLF6CAWphlBEONNnX22WfK', 'Milica10', 'Milić', '065432438','00:01','23:00',1,'ACTIVE');
insert into nurse_authority(user_id, authority_id) values (10,5);

insert into date_time_interval (start_date_time, end_date_time) values ('07.01.2020 08:00','15.01.2020 10:00');
insert into time_off_doctor (status, type, doctor_id, interval_id)
 values ('APPROVED', 'HOLIDAY', 1, 1);

insert into time_off_doctor (status, type, doctor_id, interval_id)
 values ('REJECTED', 'HOLIDAY', 2, 1);

insert into time_off_nurse (status, type, nurse_id, interval_id)
 values ('APPROVED', 'HOLIDAY', 1, 1);

insert into time_off_nurse (status, type, nurse_id, interval_id)
 values ('REJECTED', 'HOLIDAY', 2, 1);

insert into room (label, kind,status,clinic_id,version) values ('Room 1', 'EXAMINATION','EXISTING' ,1,0);
insert into room (label, kind,status,clinic_id,version) values ('Room 2', 'EXAMINATION','EXISTING' ,1,0);
insert into room (label, kind,status,clinic_id,version) values ('Room 3', 'EXAMINATION','EXISTING' ,1,0);
insert into room (label, kind,status,clinic_id,version) values ('Room 4', 'EXAMINATION','EXISTING' ,1,0);
insert into room (label, kind,status,clinic_id,version) values ('Room 5', 'OPERATION','EXISTING' ,1,0);
insert into room (label, kind,status,clinic_id,version) values ('Room 6', 'OPERATION','EXISTING' ,1,0);
insert into room (label, kind,status,clinic_id,version) values ('Room 7', 'OPERATION','DELETED' ,1,0);
insert into room (label, kind,status,clinic_id,version) values ('Room 8', 'EXAMINATION','DELETED' ,1,0);
insert into room (label, kind,status,clinic_id,version) values ('Room 9', 'OPERATION','EXISTING' ,2,0);
insert into room (label, kind,status,clinic_id,version) values ('Room 10', 'EXAMINATION','EXISTING' ,2,0);
  insert into patient (email, password, first_name, last_name, phone_number,address,city,country,health_insurance_id,status,version)
 values ('Patient1@maildrop.cc', '$2a$10$ItcRjGVnH26jIqw7GRXOBeM5Wu3sGxkSdvSgTRWSjEpPno4J9T4kS', 'Milovan', 'Milic', '065258255','Marsala tita 13','Novi Sad',
 'Srbija','0625351236915','ACTIVATED',0);

 insert into medical_record(height, weight, blood_type, allergies, patient_id) values (186, 80, 'B-', 'Lorem ipsum dolor sit amet, ' ||
  'consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis ' ||
   'nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate ' ||
    'velit esse cillum dolore eu fugiat nulla pariatur. ', 1);
insert into patient_authority(user_id, authority_id) values (1,3);

  insert into patient (email, password, first_name, last_name, phone_number,address,city,country,health_insurance_id,status,version)
 values ('Patient2@maildrop.cc', '$2a$10$ItcRjGVnH26jIqw7GRXOBeM5Wu3sGxkSdvSgTRWSjEpPno4J9T4kS', 'Adam', 'Bah', '065298255','Marsala tita 14','Beograd',
 'Srbija','0625351286915','ACTIVATED',0);
 insert into medical_record(height, weight, blood_type, allergies, patient_id) values (176, 80, 'B-', 'Prasina, jaja', 2);
insert into patient_authority(user_id, authority_id) values (2,3);

  insert into patient (email, password, first_name, last_name, phone_number,address,city,country,health_insurance_id,status,version)
 values ('Patient3@maildrop.cc', '$2a$10$ItcRjGVnH26jIqw7GRXOBeM5Wu3sGxkSdvSgTRWSjEpPno4J9T4kS', 'Srdjan', 'Stanojevic', '065898255','Marsala tita 17','Kikinda',
 'Srbija','0625351286815','ACTIVATED',0);
 insert into medical_record(height, weight, blood_type, allergies, patient_id) values (176, 75, 'B-', 'Prasina, jaja', 3);
insert into patient_authority(user_id, authority_id) values (3,3);

  insert into patient (email, password, first_name, last_name, phone_number,address,city,country,health_insurance_id,status,version)
 values ('Patient4@maildrop.cc', '$2a$10$ItcRjGVnH26jIqw7GRXOBeM5Wu3sGxkSdvSgTRWSjEpPno4J9T4kS', 'Pavle', 'Milivojevic', '065568255','Marsala tita 17','Zrenjanin',
 'Srbija','0725351286815','ACTIVATED',0);
 insert into medical_record(height, weight, blood_type, allergies, patient_id) values (176, 75, 'B-', 'Prasina, jaja', 4);
insert into patient_authority(user_id, authority_id) values (4,3);

  insert into patient (email, password, first_name, last_name, phone_number,address,city,country,health_insurance_id,status,version)
 values ('Patient5@maildrop.cc', '$2a$10$ItcRjGVnH26jIqw7GRXOBeM5Wu3sGxkSdvSgTRWSjEpPno4J9T4kS', 'Tamara', 'Bozic', '068868255','Marsala tita 17','Paracin',
 'Srbija','0725351286842','ACTIVATED',0);
 insert into medical_record(height, weight, blood_type, allergies, patient_id) values (176, 75, 'B-', 'Prasina, jaja', 5);
insert into patient_authority(user_id, authority_id) values (5,3);

  insert into patient (email, password, first_name, last_name, phone_number,address,city,country,health_insurance_id,status,version)
 values ('Patient6@maildrop.cc', '$2a$10$ItcRjGVnH26jIqw7GRXOBeM5Wu3sGxkSdvSgTRWSjEpPno4J9T4kS', 'Nikola', 'Lazarevic', '069878255','Marsala tita 17','Sremska mitrovica',
 'Srbija','0725353386842','ACTIVATED',0);
 insert into medical_record(height, weight, blood_type, allergies, patient_id) values (176, 75, 'B-', 'Prasina, jaja', 6);
insert into patient_authority(user_id, authority_id) values (6,3);

  insert into patient (email, password, first_name, last_name, phone_number,address,city,country,health_insurance_id,status,version)
 values ('Patient7@maildrop.cc', '$2a$10$ItcRjGVnH26jIqw7GRXOBeM5Wu3sGxkSdvSgTRWSjEpPno4J9T4kS', 'Milovan', 'Lazarevic', '075878255','Marsala tita 17','Sremska mitrovica',
 'Srbija','0825353386842','ACTIVATED',0);
 insert into medical_record(height, weight, blood_type, allergies, patient_id) values (176, 75, 'B-', 'Prasina, jaja', 7);
insert into patient_authority(user_id, authority_id) values (7,3);


insert into date_time_interval (start_date_time, end_date_time) values ('01.02.2020 08:00','01.02.2020 10:00');
insert into examination (kind,interval_id,status,examination_type_id,clinic_id,clinic_administrator_id,patient_id,version,nurse_id,room_id )
 values ('EXAMINATION',2,'APPROVED',2,1,1,1,0,1,1);
insert into examining (examination_id,doctor_id) values (1,4);

 insert into date_time_interval (start_date_time, end_date_time) values ('10.01.2020 06:00','10.01.2020 07:00');
insert into examination (kind,interval_id,status,examination_type_id,clinic_id,clinic_administrator_id,patient_id,room_id,nurse_id,version)
 values ('EXAMINATION',3,'CANCELED',1,1,1,7,1,1,0);
insert into examining (examination_id,doctor_id) values (2,2);

insert into date_time_interval (start_date_time, end_date_time) values ('06.01.2020 08:00','06.01.2020 20:00');
insert into examination (kind,interval_id,status,examination_type_id,clinic_id,clinic_administrator_id,patient_id,version,nurse_id,room_id )
 values ('EXAMINATION',4,'APPROVED',2,1,1,1,0,1,1);
insert into examining (examination_id,doctor_id) values (3,4);

insert into date_time_interval (start_date_time, end_date_time) values ('15.02.2020 09:00','15.02.2020 10:00');
insert into examination (kind,interval_id,status,examination_type_id,clinic_id,clinic_administrator_id,patient_id,version,nurse_id,room_id )
 values ('EXAMINATION',5,'PREDEF_AVAILABLE',1,1,1,1,0,1,1);
insert into examining (examination_id,doctor_id) values (4,1);

insert into date_time_interval (start_date_time, end_date_time) values ('14.02.2020 08:00','14.02.2020 11:00');
insert into examination (kind,interval_id,status,examination_type_id,clinic_id,clinic_administrator_id,patient_id,version,room_id )
 values ('OPERATION',6,'APPROVED',1,1,1,1,0,5);
insert into examining (examination_id,doctor_id) values (5,7);

insert into date_time_interval (start_date_time, end_date_time) values ('14.02.2020 10:00','14.02.2020 11:00');
insert into examination (kind,interval_id,status,examination_type_id,clinic_id,clinic_administrator_id,patient_id,version,room_id )
 values ('OPERATION',7,'APPROVED',1,1,1,1,0,6);
insert into examining (examination_id,doctor_id) values (6,1);
insert into examining (examination_id,doctor_id) values (6,3);

insert into date_time_interval (start_date_time, end_date_time) values ('14.02.2020 07:00','14.02.2020 10:28');
insert into examination (kind,interval_id,status,examination_type_id,clinic_id,clinic_administrator_id,patient_id,version )
 values ('OPERATION',8,'AWAITING',2,1,1,1,0);

/*
insert into date_time_interval (start_date_time, end_date_time) values ('14.02.2020 08:00','14.02.2020 11:45');
insert into examination (kind,interval_id,status,examination_type_id,clinic_id,clinic_administrator_id,patient_id,version,nurse_id,room_id )
 values ('OPERATION',9,'APPROVED',2,1,1,1,0,8,4);
insert into examining (examination_id,doctor_id) values (8,4);

insert into date_time_interval (start_date_time, end_date_time) values ('14.02.2020 10:15','14.02.2020 12:00');
insert into examination (kind,interval_id,status,examination_type_id,clinic_id,clinic_administrator_id,patient_id,version)
 values ('OPERATION',10,'AWAITING',1,1,1,1,0);
insert into examining (examination_id,doctor_id) values (9,3);

insert into date_time_interval (start_date_time, end_date_time) values ('15.02.2020 10:15','15.02.2020 12:00');
insert into examination (kind,interval_id,status,examination_type_id,clinic_id,clinic_administrator_id,patient_id,version)
 values ('OPERATION',11,'AWAITING',1,1,1,1,0);
insert into examining (examination_id,doctor_id) values (10,1);

insert into date_time_interval (start_date_time, end_date_time) values ('10.12.2019 10:00','10.12.2019 11:00');
insert into examination (kind,interval_id,status,examination_type_id,clinic_id,clinic_administrator_id,patient_id,version )
 values ('EXAMINATION',2,'APPROVED',1,1,1,2,0);

insert into date_time_interval (start_date_time, end_date_time) values ('02.12.2019 10:00','02.12.2019 11:00');
insert into examination (kind,interval_id,status,examination_type_id,clinic_id,clinic_administrator_id,patient_id,version )
 values ('EXAMINATION',3,'APPROVED',2,1,1,3,0);

insert into date_time_interval (start_date_time, end_date_time) values ('23.12.2019 08:00','23.12.2019 10:00');
insert into examination (kind,interval_id,status,examination_type_id,clinic_id,clinic_administrator_id,patient_id,version )
 values ('EXAMINATION',4,'APPROVED',1,1,1,4,0);

 insert into date_time_interval (start_date_time, end_date_time) values ('18.12.2019 08:00','18.12.2019 10:00');
insert into examination (kind,interval_id,status,examination_type_id,clinic_id,clinic_administrator_id,patient_id,version )
 values ('EXAMINATION',5,'APPROVED',1,1,1,5,0);

  insert into date_time_interval (start_date_time, end_date_time) values ('13.11.2019 08:00','13.11.2019 10:00');
insert into examination (kind,interval_id,status,examination_type_id,clinic_id,clinic_administrator_id,patient_id,version )
 values ('EXAMINATION',6,'APPROVED',1,1,1,6,0);

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


insert into date_time_interval (start_date_time, end_date_time) values ('06.01.2020 00:01','06.01.2020 23:59');
insert into examination (kind,interval_id,status,examination_type_id,clinic_id,clinic_administrator_id,patient_id,room_id,nurse_id,version)
 values ('EXAMINATION',11,'APPROVED',7,1,1,1,1,1,0);
insert into examining (examination_id,doctor_id) values (11,1);

 insert into date_time_interval (start_date_time, end_date_time) values ('27.12.2019 06:00','27.12.2019 23:00');
insert into examination (kind,interval_id,status,examination_type_id,clinic_id,clinic_administrator_id,patient_id,room_id,nurse_id,version)
 values ('EXAMINATION',12,'APPROVED',8,1,1,1,2,1,0);
insert into examining (examination_id,doctor_id) values (12,1);

 insert into date_time_interval (start_date_time, end_date_time) values ('14.12.2019 06:00','14.12.2019 23:00');
insert into examination (kind,interval_id,status,examination_type_id,clinic_id,clinic_administrator_id,patient_id,room_id,nurse_id,version)
 values ('OPERATION',13,'CANCELED',3,1,1,1,3,1,0);
insert into examining (examination_id,doctor_id) values (13,1);

 insert into date_time_interval (start_date_time, end_date_time) values ('27.12.2020 06:00','27.12.2020 23:00');
insert into examination (kind,interval_id,status,examination_type_id,clinic_id,clinic_administrator_id,patient_id,room_id,nurse_id,version)
 values ('EXAMINATION',14,'PREDEF_BOOKED',4,2,2,1,4,1,0);
insert into examining (examination_id,doctor_id) values (14,6);

 insert into date_time_interval (start_date_time, end_date_time) values ('07.01.2020 17:00','07.01.2020 18:00');
insert into examination (kind,interval_id,status,examination_type_id,clinic_id,clinic_administrator_id,room_id,nurse_id,version)
 values ('EXAMINATION',15,'PREDEF_AVAILABLE',1,1,1,1,1,0);
insert into examining (examination_id,doctor_id) values (15,1);

 insert into date_time_interval (start_date_time, end_date_time) values ('06.01.2020 17:00','06.01.2020 18:00');
insert into examination (kind,interval_id,status,examination_type_id,clinic_id,clinic_administrator_id,patient_id,room_id,nurse_id,version)
 values ('EXAMINATION',16,'APPROVED',1,1,1,1,1,1,0);
insert into examining (examination_id,doctor_id) values (16,1);

 insert into date_time_interval (start_date_time, end_date_time) values ('08.01.2020 06:00','08.01.2020 23:00');
insert into examination (kind,interval_id,status,examination_type_id,clinic_id,clinic_administrator_id,patient_id,room_id,nurse_id,version)
 values ('OPERATION',17,'CANCELED',3,1,1,7,3,1,0);
insert into examining (examination_id,doctor_id) values (17,5);

insert into diagnose (title, description) values ('Asthma', 'Asthma is a condition in which hyperreactive airways constrict ' ||
 'and result in symptoms like wheezing, coughing, and shortness of breath. Inhaled corticosteroids (ICS) and long-acting ' ||
  'bronchodilators (LABAs) are used in the treatment of asthma.');
insert into diagnose (title, description) values ('Diabetes', 'Diabetes is a chronic condition characterized by high levels ' ||
 'of sugar (glucose) in the blood. Symptoms of diabetes include increased urine output, thirst, hunger, and fatigue.');

insert into examination_report(comment, time_created, diagnose_id, doctor_id, medical_record_id, examination_id)
 values ('Pacijent ima astmu', '27.12.2019. 12:30', 1, 1, 1, 12);

 insert into examination_report(comment, time_created, diagnose_id, doctor_id, medical_record_id, examination_id)
 values ('Pacijent ima svasta', '14.12.2019. 12:30', 2, 2, 1, 12);

 */