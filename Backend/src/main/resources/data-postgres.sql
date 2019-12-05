INSERT INTO AUTHORITY (name) VALUES ('ROLE_CLINICAL_CENTRE_ADMIN');
INSERT INTO AUTHORITY (name) VALUES ('ROLE_CLINIC_ADMIN');
INSERT INTO AUTHORITY (name) VALUES ('ROLE_PATIENT');
INSERT INTO AUTHORITY (name) VALUES ('ROLE_DOCTOR');
INSERT INTO AUTHORITY (name) VALUES ('ROLE_NURSE');

/* password: 1st.Admin */
insert into clinical_centre_administrator (email, password, first_name, last_name, phone_number, status) values
('1st.admin@maildrop.cc', '$2a$10$0fX3yNqeWX3O/f0HtZRtVOA/6SA1Jq2vqARolGgJjRu47FX4AE/Y.', 'Marko', 'Marković', '064123456', 'ACTIVE');
insert into clinical_centre_admin_authority (user_id, authority_id) values (1,1);

/*CLINIC*/
insert into clinic (address, description, name,clinic_rating) values ('3.Oktobar 73', 'Savremena klinika u Beogradu', 'VMA',0);
insert into clinic (address, description, name,clinic_rating) values ('Marsala Tita 9c', 'Savremena klinika u Novom Sadu', 'Klinika mira',0);

/*CLINIC ADMIN*/
/* Password: Admin.01 */
insert into clinic_administrator (email, password, first_name, last_name, phone_number, status,clinic_id) values
 ('Admin.01@maildrop.cc', '$2a$10$2FpM8YtFb.xVHejeWG8AsufRlbO9lL.YjI3OFsgq5dBHOXcgBkXSO', 'Marko', 'Marković', '064123456', 'ACTIVE',1);
insert into clinic_admin_authority(user_id, authority_id) values (1,2);
/* Password: Admin.02 */
insert into clinic_administrator (email, password, first_name, last_name, phone_number, status,clinic_id) values
 ('example2@maildrop.cc', '$2a$10$tSSrg2pGJrulxcsYIPfQkusLZfwDKslf76oP8at5BQPbaAQl4Ixpq', 'Mario', 'Simic', '0652561980', 'ACTIVE',1);
insert into clinic_admin_authority(user_id, authority_id) values (2,2);
/* Password: Admin.03 */
insert into clinic_administrator (email, password, first_name, last_name, phone_number, status,clinic_id) values
('example3@maildrop.cc', '$2a$10$hFfDWwXv6Ad6CS/eHyhVuefHgWGdYiJpTmfelv7JKhohKBuayn15K', 'Petar', 'Peric', '064123276', 'ACTIVE',1);
insert into clinic_admin_authority(user_id, authority_id) values (3,2);
/* Password: Admin.04 */
insert into clinic_administrator (email, password, first_name, last_name, phone_number, status,clinic_id) values
 ('example4@maildrop.cc', '$2a$10$/.0cmhd2AYDGBQHGJn2RPel.sOUmjTe1f7DCUyGwW31NBh0bollBS', 'Aleksa', 'Aleksic', '0652539280', 'ACTIVE',2);
insert into clinic_admin_authority(user_id, authority_id) values (4,2);

/*EXAMINATION TYPE*/
insert into examination_type (label, price,status,clinic_id) values ('Ginekolog', '5000','EXISTING' ,1);
insert into examination_type (label, price,status,clinic_id) values ('Zubar', '2000','EXISTING',1);

/*ROOM*/
/*insert into room (label, kind,status,clinic_id) values ('Room 1', 'OPERATION','EXISTING' ,1);
insert into room (label, kind,status,clinic_id) values ('Room 2', 'EXAMINATION','EXISTING' ,1);
insert into room (label, kind,status,clinic_id) values ('Room 3', 'OPERATION','DELETED' ,1);
insert into room (label, kind,status,clinic_id) values ('Room 4', 'OPERATION','EXISTING' ,1);
insert into room (label, kind,status,clinic_id) values ('Room 5', 'OPERATION','EXISTING' ,1);
insert into room (label, kind,status,clinic_id) values ('Room 6', 'OPERATION','EXISTING' ,1);
insert into room (label, kind,status,clinic_id) values ('Room 7', 'OPERATION','EXISTING' ,1);
insert into room (label, kind,status,clinic_id) values ('Room 8', 'OPERATION','DELETED' ,1);
insert into room (label, kind,status,clinic_id) values ('Room 9', 'OPERATION','EXISTING' ,1);
insert into room (label, kind,status,clinic_id) values ('Room 10', 'OPERATION','EXISTING' ,1);*/

/*NURSE*/
insert into nurse (email, password, first_name, last_name, phone_number,work_hours_from,work_hours_to,clinic_id,status)
values ('Nurse.01@maildrop.cc', '$2a$10$dT.7xoRoI338DdVr0E19EOj4/xrYSFyRLF6CAWphlBEONNnX22WfK', 'Milica', 'Milić', '065432432','06:00','14:00',1,'ACTIVE');
insert into nurse_authority(user_id, authority_id) values (1,5);
insert into nurse (email, password, first_name, last_name, phone_number,work_hours_from,work_hours_to,clinic_id,status)
values ('Nurse.02@maildrop.cc', '$2a$10$FlH31vL5240t9Oma09cgQO8G9Cf1EoyB/dCXTFEvaYN7iGFQ573dW', 'Slavica', 'Slavić', '065523523','08:00','16:00',2,'ACTIVE');
insert into nurse_authority(user_id, authority_id) values (2,5);
insert into nurse (email, password, first_name, last_name, phone_number,work_hours_from,work_hours_to,clinic_id,status)
values ('Nurse.03@maildrop.cc', '$2a$10$/Kndy0c0LUvadXeiwa.4GufWSkf7/cEI6.KPJMAka4uX1q72kQ2Qi', 'Katarina', 'Katić', '069696966','12:00','20:00',1,'ACTIVE');
insert into nurse_authority(user_id, authority_id) values (3,5);
insert into nurse (email, password, first_name, last_name, phone_number,work_hours_from,work_hours_to,clinic_id,status)
values ('Nurse.04@maildrop.cc', '$2a$10$cajIba6Xp0xg/eSfn6hg4.ABWo8RMLoW7UCrW4.kPUuxlctwyVlg6', 'Vesna', 'Vesnić', '066362514','13:00','21:00',1,'NEVER_LOGGED_IN');
insert into nurse_authority(user_id, authority_id) values (4,5);
insert into nurse (email, password, first_name, last_name, phone_number,work_hours_from,work_hours_to,clinic_id,status)
values ('Nurse.05@maildrop.cc', '$2a$10$67QWz/90ckUxSykeElYqGejD/qe1ddvyKaUS20/BVE8e7nn/V.mPG', 'Mirna', 'Miric', '0615646455','13:00','21:00',1,'ACTIVE');
insert into nurse_authority(user_id, authority_id) values (5,5);
insert into nurse (email, password, first_name, last_name, phone_number,work_hours_from,work_hours_to,clinic_id,status)
values ('Nurse.06@maildrop.cc', '$2a$10$OU5wBEkGLQydL.scmjRxku5pmkjWTc5g1dujk7XqZPW6B4bQtUlzK', 'Tijana', 'Tijanic', '0663625119','11:00','19:00',1,'NEVER_LOGGED_IN');
insert into nurse_authority(user_id, authority_id) values (6,5);
insert into nurse (email, password, first_name, last_name, phone_number,work_hours_from,work_hours_to,clinic_id,status)
values ('Nurse.07@maildrop.cc', '$2a$10$bKaCAUMqyrYHqL9y2CDXE.L1nFdlZdkj/ew2ZjzgGfITqMwVoCzu.', 'Danica', 'Danicic', '0663698914','13:00','21:00',1,'ACTIVE');
insert into nurse_authority(user_id, authority_id) values (7,5);

insert into room (label, kind,status,clinic_id) values ('Room 1 soba', 'EXAMINATION','EXISTING' ,1);
insert into room (label, kind,status,clinic_id) values ('Room 2', 'EXAMINATION','EXISTING' ,1);
/*insert into room (label, kind,status,clinic_id) values ('Room 3', 'EXAMINATION','DELETED' ,1);
insert into room (label, kind,status,clinic_id) values ('Room 4', 'EXAMINATION','EXISTING' ,1);
insert into room (label, kind,status,clinic_id) values ('Room 5', 'EXAMINATION','EXISTING' ,1);
insert into room (label, kind,status,clinic_id) values ('Room 6', 'EXAMINATION','EXISTING' ,1);
insert into room (label, kind,status,clinic_id) values ('Room 7', 'EXAMINATION','EXISTING' ,1);
insert into room (label, kind,status,clinic_id) values ('Room 8', 'EXAMINATION','DELETED' ,1);
insert into room (label, kind,status,clinic_id) values ('Room 9', 'EXAMINATION','EXISTING' ,1);
insert into room (label, kind,status,clinic_id) values ('Room 10', 'EXAMINATION','EXISTING' ,1);*/

/*NURSE*/
 insert into nurse (email, password, first_name, last_name, phone_number,work_hours_from,work_hours_to,clinic_id,status)
 values ('nurse@maildrop.cc', '$2a$10$Hef/d2ZrMjGXUFE60xUVU.u0up/nV2cIJMg9GDevEgnv5cCcJpTpW', 'Sima', 'Docic', '065256155','06:00','19:00',1,'ACTIVE');
insert into nurse_authority(user_id, authority_id) values (1,5);

/*PATIENT*/
  insert into patient (email, password, first_name, last_name, phone_number,address,city,country,health_insuranceid,status)
 values ('patient@maildrop.cc', '$2a$10$/.0cmhd2AYDGBQHGJn2RPel.sOUmjTe1f7DCUyGwW31NBh0bollBS', 'Milovan 1', 'Milic', '065258255','Marsala tita','Novi Sad',
 'Srbija','0625351236915','APPROVED');
insert into patient_authority(user_id, authority_id) values (1,3);

  insert into patient (email, password, first_name, last_name, phone_number,address,city,country,health_insuranceid,status)
 values ('patient2@maildrop.cc', '$2a$10$/.0cmhd2AYDGBQHGJn2RPel.sOUmjTe1f7DCUyGwW31NBh0bollBS', 'Stefan 2', 'Lazarevic', '065258355','Marsala tita','Novi Sad',
 'Srbija','0625352236915','APPROVED');
insert into patient_authority(user_id, authority_id) values (2,3);

 insert into patient (email, password, first_name, last_name, phone_number,address,city,country,health_insuranceid,status)
 values ('patient3@maildrop.cc', '$2a$10$/.0cmhd2AYDGBQHGJn2RPel.sOUmjTe1f7DCUyGwW31NBh0bollBS', 'Marko 3', 'Stefanovic', '065258455','Marsala tita','Novi Sad',
 'Srbija','0625342236915','APPROVED');
insert into patient_authority(user_id, authority_id) values (3,3);

 insert into patient (email, password, first_name, last_name, phone_number,address,city,country,health_insuranceid,status)
 values ('patient4@maildrop.cc', '$2a$10$/.0cmhd2AYDGBQHGJn2RPel.sOUmjTe1f7DCUyGwW31NBh0bollBS', 'Dragan 4', 'Simic', '065258655','Marsala tita','Novi Sad',
 'Srbija','0625352237915','APPROVED');
insert into patient_authority(user_id, authority_id) values (4,3);

 insert into patient (email, password, first_name, last_name, phone_number,address,city,country,health_insuranceid,status)
 values ('patient5@maildrop.cc', '$2a$10$/.0cmhd2AYDGBQHGJn2RPel.sOUmjTe1f7DCUyGwW31NBh0bollBS', 'Tamara 5', 'Lazarevic', '067258755','Marsala tita','Novi Sad',
 'Srbija','0625352737919','APPROVED');
insert into patient_authority(user_id, authority_id) values (5,3);

 insert into patient (email, password, first_name, last_name, phone_number,address,city,country,health_insuranceid,status)
 values ('patient6@maildrop.cc', '$2a$10$/.0cmhd2AYDGBQHGJn2RPel.sOUmjTe1f7DCUyGwW31NBh0bollBS', 'Jelena 6', 'Stankovic', '065258756','Marsala tita','Novi Sad',
 'Srbija','0625352737916','APPROVED');
insert into patient_authority(user_id, authority_id) values (6,3);

 insert into patient (email, password, first_name, last_name, phone_number,address,city,country,health_insuranceid,status)
 values ('patient7@maildrop.cc', '$2a$10$/.0cmhd2AYDGBQHGJn2RPel.sOUmjTe1f7DCUyGwW31NBh0bollBS', 'Tamara 7', 'Jovic', '065258757','Marsala tita','Novi Sad',
 'Srbija','0625352737918','APPROVED');
insert into patient_authority(user_id, authority_id) values (7,3);

 insert into patient (email, password, first_name, last_name, phone_number,address,city,country,health_insuranceid,status)
 values ('patient8@maildrop.cc', '$2a$10$/.0cmhd2AYDGBQHGJn2RPel.sOUmjTe1f7DCUyGwW31NBh0bollBS', 'Nevena 8', 'Sarenac', '075258755','Marsala tita','Novi Sad',
 'Srbija','0625352748915','APPROVED');
insert into patient_authority(user_id, authority_id) values (8,3);

 insert into patient (email, password, first_name, last_name, phone_number,address,city,country,health_insuranceid,status)
 values ('patient9@maildrop.cc', '$2a$10$/.0cmhd2AYDGBQHGJn2RPel.sOUmjTe1f7DCUyGwW31NBh0bollBS', 'Tedora 9', 'Stojkovic', '065256955','Marsala tita','Novi Sad',
 'Srbija','0625352737985','APPROVED');
insert into patient_authority(user_id, authority_id) values (9,3);

 insert into patient (email, password, first_name, last_name, phone_number,address,city,country,health_insuranceid,status)
 values ('patient10@maildrop.cc', '$2a$10$/.0cmhd2AYDGBQHGJn2RPel.sOUmjTe1f7DCUyGwW31NBh0bollBS', 'Jovana 10', 'Bodiroga', '065255555','Marsala tita','Novi Sad',
 'Srbija','0625352737965','APPROVED');
insert into patient_authority(user_id, authority_id) values (10,3);

 insert into patient (email, password, first_name, last_name, phone_number,address,city,country,health_insuranceid,status)
 values ('patient11@maildrop.cc', '$2a$10$/.0cmhd2AYDGBQHGJn2RPel.sOUmjTe1f7DCUyGwW31NBh0bollBS', 'Marko 11', 'Markovic', '069058755','Marsala tita','Novi Sad',
 'Srbija','0625352737915','AWAITING');
insert into patient_authority(user_id, authority_id) values (11,3);

/*DOCTOR*/
/* Password: Admin.04*/
 insert into doctor (email, password, first_name, last_name, phone_number,work_hours_from,work_hours_to,clinic_id,status,specialized_id, doctor_rating)
 values ('doca2@gmail.com', '$2a$10$/.0cmhd2AYDGBQHGJn2RPel.sOUmjTe1f7DCUyGwW31NBh0bollBS', 'Doca', 'Docic', '065256856','10:30','18:00',1,'ACTIVE',1,4);
insert into doctor_authority(user_id, authority_id) values (1,4);

 insert into doctor (email, password, first_name, last_name, phone_number,work_hours_from,work_hours_to,clinic_id,status,specialized_id)
 values ('doca3@gmail.com', '$2a$10$/.0cmhd2AYDGBQHGJn2RPel.sOUmjTe1f7DCUyGwW31NBh0bollBS', 'Doca', 'Docic', '065257165','08:00','20:00',1,'ACTIVE',2);
insert into doctor_authority(user_id, authority_id) values (2,4);

 insert into doctor (email, password, first_name, last_name, phone_number,work_hours_from,work_hours_to,clinic_id,status,specialized_id, doctor_rating)
 values ('doca4@gmail.com', '$2a$10$Hef/d2ZrMjGXUFE60xUVU.u0up/nV2cIJMg9GDevEgnv5cCcJpTpW', 'Doca', 'Docic', '065256886','06:00','19:00',1,'ACTIVE',1,3);
insert into doctor_authority(user_id, authority_id) values (3,4);

 insert into doctor (email, password, first_name, last_name, phone_number,work_hours_from,work_hours_to,clinic_id,status,specialized_id)
 values ('doca5@gmail.com', '$2a$10$/.0cmhd2AYDGBQHGJn2RPel.sOUmjTe1f7DCUyGwW31NBh0bollBS', 'Doca', 'Docic', '075256886','05:00','19:00',1,'ACTIVE',1);
insert into doctor_authority(user_id, authority_id) values (4,4);

 insert into doctor (email, password, first_name, last_name, phone_number,work_hours_from,work_hours_to,clinic_id,status,specialized_id)
 values ('doca6@gmail.com', '$2a$10$Hef/d2ZrMjGXUFE60xUVU.u0up/nV2cIJMg9GDevEgnv5cCcJpTpW', 'Doca', 'Docic', '078256886','05:00','19:00',1,'ACTIVE',1);
insert into doctor_authority(user_id, authority_id) values (5,4);

 insert into doctor (email, password, first_name, last_name, phone_number,work_hours_from,work_hours_to,clinic_id,status,specialized_id,doctor_rating)
 values ('doca7@gmail.com', '$2a$10$Hef/d2ZrMjGXUFE60xUVU.u0up/nV2cIJMg9GDevEgnv5cCcJpTpW', 'Doca', 'Docic', '079256886','05:00','19:00',1,'ACTIVE',1,5);
insert into doctor_authority(user_id, authority_id) values (6,4);

insert into room (label, kind,clinic_id,status) values ('Operacijska soba1', 'EXAMINATION',1,'EXISTING');
insert into date_time_interval (start_date_time, end_date_time) values ('13.12.2019 09:00','13.12.2019 10:00');
insert into examination (kind,interval_id,status,examination_type_id,clinic_id,clinic_administrator_id,room_id,patient_id)
 values ('EXAMINATION',1,'APPROVED',1,1,1,2,1);
insert into examining (examination_id,doctor_id) values (1,4);

insert into date_time_interval (start_date_time, end_date_time) values ('13.12.2019 09:00','13.12.2019 10:00');
insert into examination (kind,interval_id,status,examination_type_id,clinic_id,clinic_administrator_id,patient_id)
 values ('EXAMINATION',2,'AWAITING',1,1,1,1);
insert into examining (examination_id,doctor_id) values (2,3);

insert into date_time_interval (start_date_time, end_date_time) values ('14.12.2019 10:00','13.12.2019 11:00');
insert into examination (kind,interval_id,status,examination_type_id,clinic_id,clinic_administrator_id,patient_id)
 values ('EXAMINATION',3,'AWAITING',1,1,1,1);
insert into examining (examination_id,doctor_id) values (3,3);

insert into date_time_interval (start_date_time, end_date_time) values ('15.12.2019 09:00','15.12.2019 10:00');
insert into examination (kind,interval_id,status,examination_type_id,clinic_id,clinic_administrator_id,patient_id)
values ('EXAMINATION',4,'AWAITING',2,1,1,1);
insert into examining (examination_id,doctor_id) values (4,2);

insert into date_time_interval (start_date_time, end_date_time) values ('15.12.2019 10:00','13.12.2019 11:00');
insert into examination (kind,interval_id,status,examination_type_id,clinic_id,clinic_administrator_id,patient_id)
values ('EXAMINATION',5,'AWAITING',1,1,1,1);
insert into examining (examination_id,doctor_id) values (5,4);

insert into date_time_interval (start_date_time, end_date_time) values ('13.12.2019 08:00','13.12.2019 09:00');
insert into examination (kind,interval_id,status,examination_type_id,clinic_id,clinic_administrator_id,patient_id,nurse_id)
values ('EXAMINATION',6,'AWAITING',2,1,1,1,1);
insert into examining (examination_id,doctor_id) values (6,4);

insert into date_time_interval (start_date_time, end_date_time) values ('12.11.2019 12:00','12.11.2019 13:00');
insert into examination (kind,interval_id,status,examination_type_id,clinic_id,clinic_administrator_id,patient_id)
values ('EXAMINATION',7,'AWAITING',1,1,1,1);
insert into examining (examination_id,doctor_id) values (7,4);

insert into date_time_interval (start_date_time, end_date_time) values ('13.12.2019 09:00','13.12.2019 10:00');
insert into examination (kind,interval_id,status,examination_type_id,clinic_id,clinic_administrator_id,room_id,patient_id)
values ('EXAMINATION',8,'APPROVED',2,1,1,1,1);
insert into examining (examination_id,doctor_id) values (8,5);

insert into date_time_interval (start_date_time, end_date_time) values ('13.12.2019 11:00','13.12.2019 12:00');
insert into examination (kind,interval_id,status,examination_type_id,clinic_id,clinic_administrator_id,room_id,patient_id)
values ('EXAMINATION',9,'APPROVED',2,1,1,1,1);
insert into examining (examination_id,doctor_id) values (9,5);

insert into date_time_interval (start_date_time, end_date_time) values ('13.12.2019 10:30','13.12.2019 11:00');
insert into examination (kind,interval_id,status,examination_type_id,clinic_id,clinic_administrator_id,room_id,patient_id)
values ('EXAMINATION',10,'APPROVED',2,1,1,1,1);
insert into examining (examination_id,doctor_id) values (10,6);

insert into date_time_interval (start_date_time, end_date_time) values ('13.12.2019 15:00','13.12.2019 16:00');
insert into examination (kind,interval_id,status,examination_type_id,clinic_id,clinic_administrator_id,room_id,patient_id)
values ('EXAMINATION',11,'APPROVED',2,1,1,1,1);
insert into examining (examination_id,doctor_id) values (11,6);

insert into date_time_interval (start_date_time, end_date_time) values ('13.12.2019 14:00','13.12.2019 14:30');
insert into examination (kind,interval_id,status,examination_type_id,clinic_id,clinic_administrator_id,room_id,patient_id)
values ('EXAMINATION',12,'APPROVED',2,1,1,1,1);
insert into examining (examination_id,doctor_id) values (12,6);

insert into date_time_interval (start_date_time, end_date_time) values ('13.12.2019 08:30','13.12.2019 09:00');
insert into examination (kind,interval_id,status,examination_type_id,clinic_id,clinic_administrator_id,patient_id )
 values ('EXAMINATION',13,'AWAITING',1,1,1,1);

 insert into date_time_interval (start_date_time, end_date_time) values ('12.11.2019 08:30','13.12.2019 09:00');
insert into examination (kind,interval_id,status,examination_type_id,clinic_id,clinic_administrator_id,patient_id )
 values ('EXAMINATION',14,'AWAITING',1,1,1,1);

/*Patient with id 3 */
  insert into date_time_interval (start_date_time, end_date_time) values ('12.11.2019 08:30','13.12.2019 09:00');
insert into examination (kind,interval_id,status,examination_type_id,clinic_id,clinic_administrator_id,patient_id )
 values ('EXAMINATION',15,'APPROVED',1,1,1,3);

/*Patient with id 5 */
insert into date_time_interval (start_date_time, end_date_time) values ('12.11.2019 08:30','13.12.2019 09:00');
insert into examination (kind,interval_id,status,examination_type_id,clinic_id,clinic_administrator_id,patient_id )
 values ('EXAMINATION',16,'APPROVED',1,1,1,5);

/*Patient with id 6 */
insert into examination (kind,interval_id,status,examination_type_id,clinic_id,clinic_administrator_id,patient_id )
 values ('EXAMINATION',16,'APPROVED',1,1,1,6);

/*Patient with id 7 */
insert into examination (kind,interval_id,status,examination_type_id,clinic_id,clinic_administrator_id,patient_id )
 values ('EXAMINATION',15,'PREDEF_BOOKED',1,1,1,7);

/*Patient with id 8 */
insert into examination (kind,interval_id,status,examination_type_id,clinic_id,clinic_administrator_id,patient_id )
 values ('EXAMINATION',16,'PREDEF_BOOKED',1,1,1,8);

/*Patient with id 9 */
insert into examination (kind,interval_id,status,examination_type_id,clinic_id,clinic_administrator_id,patient_id )
 values ('EXAMINATION',16,'PREDEF_BOOKED',1,1,1,9);


/*Patient with id 2 */
 insert into date_time_interval (start_date_time, end_date_time) values ('12.11.2019 08:30','13.12.2019 09:00');
insert into examination (kind,interval_id,status,examination_type_id,clinic_id,clinic_administrator_id,patient_id )
 values ('EXAMINATION',17,'AWAITING',1,1,1,2);

/*Patient with id 4*/
  insert into date_time_interval (start_date_time, end_date_time) values ('12.11.2019 08:30','13.12.2019 09:00');
insert into examination (kind,interval_id,status,examination_type_id,clinic_id,clinic_administrator_id,patient_id )
 values ('EXAMINATION',18,'APPROVED',1,2,4,4);

 /* Examinations for calendar */
 /*****************************/
 insert into doctor (email, password, first_name, last_name, phone_number,work_hours_from,work_hours_to,clinic_id,status,specialized_id)
 values ('DocaKalendar@maildrop.cc', '$2a$10$/.0cmhd2AYDGBQHGJn2RPel.sOUmjTe1f7DCUyGwW31NBh0bollBS', 'Milan', 'Milanovic', '019256886','07:00','19:00',1,'ACTIVE',1);
insert into doctor_authority(user_id, authority_id) values (7,4);

insert into doctor (email, password, first_name, last_name, phone_number,work_hours_from,work_hours_to,clinic_id,status,specialized_id)
 values ('Doca2Kalendar@maildrop.cc', '$2a$10$/.0cmhd2AYDGBQHGJn2RPel.sOUmjTe1f7DCUyGwW31NBh0bollBS', 'Srdjan', 'Srdjanic', '029256886','08:00','20:00',1,'ACTIVE',1);
insert into doctor_authority(user_id, authority_id) values (8,4);

insert into doctor (email, password, first_name, last_name, phone_number,work_hours_from,work_hours_to,clinic_id,status,specialized_id)
 values ('Doca3Kalendar@maildrop.cc', '$2a$10$/.0cmhd2AYDGBQHGJn2RPel.sOUmjTe1f7DCUyGwW31NBh0bollBS', 'Goran', 'Goranic', '039256886','06:00','18:00',1,'ACTIVE',1);
insert into doctor_authority(user_id, authority_id) values (9,4);

insert into nurse (email, password, first_name, last_name, phone_number,work_hours_from,work_hours_to,clinic_id,status)
 values ('SestraKalendar@maildrop.cc', '$2a$10$/.0cmhd2AYDGBQHGJn2RPel.sOUmjTe1f7DCUyGwW31NBh0bollBS', 'Ivana', 'Ivanic', '045256159','06:00','19:00',1,'ACTIVE');
insert into nurse_authority(user_id, authority_id) values (9,5);

 insert into patient (email, password, first_name, last_name, phone_number,address,city,country,health_insuranceid,status)
 values ('patient12@maildrop.cc', '$2a$10$/.0cmhd2AYDGBQHGJn2RPel.sOUmjTe1f7DCUyGwW31NBh0bollBS', 'Bojan', 'Stojkovic', '090589556','Marsala tita','Novi Sad',
 'Srbija','0737985669595','APPROVED');
insert into patient_authority(user_id, authority_id) values (12,3);

 insert into patient (email, password, first_name, last_name, phone_number,address,city,country,health_insuranceid,status)
 values ('patient13@maildrop.cc', '$2a$10$/.0cmhd2AYDGBQHGJn2RPel.sOUmjTe1f7DCUyGwW31NBh0bollBS', 'Slavica', 'Katic', '090589557','Marsala tita','Novi Sad',
 'Srbija','0737985669596','APPROVED');
insert into patient_authority(user_id, authority_id) values (13,3);

 insert into patient (email, password, first_name, last_name, phone_number,address,city,country,health_insuranceid,status)
 values ('patient14@maildrop.cc', '$2a$10$/.0cmhd2AYDGBQHGJn2RPel.sOUmjTe1f7DCUyGwW31NBh0bollBS', 'Zivko', 'Simonovic', '090589558','Marsala tita','Novi Sad',
 'Srbija','0737985669597','APPROVED');
insert into patient_authority(user_id, authority_id) values (14,3);

insert into date_time_interval (start_date_time, end_date_time) values ('03.12.2019 11:00','03.12.2019 12:30');
insert into examination (kind,interval_id,status,examination_type_id,clinic_id,clinic_administrator_id,patient_id)
 values ('OPERATION',19,'APPROVED',1,1,1,14);
insert into examining (examination_id,doctor_id) values (23,7);
insert into examining (examination_id,doctor_id) values (23,8);
insert into examining (examination_id,doctor_id) values (23,9);

insert into date_time_interval (start_date_time, end_date_time) values ('05.12.2019 13:00','05.12.2019 14:30');
insert into examination (kind,interval_id,status,examination_type_id,clinic_id,clinic_administrator_id,patient_id)
 values ('OPERATION',20,'AWAITING',1,1,1,12);
insert into examining (examination_id,doctor_id) values (24,7);
insert into examining (examination_id,doctor_id) values (24,8);
insert into examining (examination_id,doctor_id) values (24,9);

insert into date_time_interval (start_date_time, end_date_time) values ('01.12.2019 10:00','01.12.2019 11:00');
insert into examination (kind,interval_id,status,examination_type_id,clinic_id,clinic_administrator_id,patient_id,nurse_id)
 values ('EXAMINATION',21,'APPROVED',1,1,1,12,9);
insert into examining (examination_id,doctor_id) values (25,7);

insert into date_time_interval (start_date_time, end_date_time) values ('03.12.2019 17:00','03.12.2019 17:30');
insert into examination (kind,interval_id,status,examination_type_id,clinic_id,clinic_administrator_id,patient_id,nurse_id)
 values ('EXAMINATION',22,'AWAITING',1,1,1,13,9);
insert into examining (examination_id,doctor_id) values (26,7);

insert into date_time_interval (start_date_time, end_date_time) values ('08.12.2019 17:00','08.12.2019 17:30');
insert into examination (kind,interval_id,status,examination_type_id,clinic_id,clinic_administrator_id,patient_id,nurse_id,room_id)
 values ('EXAMINATION',23,'PREDEF_BOOKED',1,1,1,13,9,2);
insert into examining (examination_id,doctor_id) values (27,7);

insert into date_time_interval (start_date_time, end_date_time) values ('08.12.2019 09:00','08.12.2019 10:00');
insert into examination (kind,interval_id,status,examination_type_id,clinic_id,clinic_administrator_id,nurse_id)
 values ('EXAMINATION',24,'PREDEF_AVAILABLE',1,1,1,9);
insert into examining (examination_id,doctor_id) values (28,7);

/* This shouldn't be displayed in calendar */
insert into date_time_interval (start_date_time, end_date_time) values ('09.12.2019 09:00','09.12.2019 10:00');
insert into examination (kind,interval_id,status,examination_type_id,clinic_id,clinic_administrator_id,patient_id,nurse_id)
 values ('EXAMINATION',25,'CANCELED',1,1,1,14,9);
insert into examining (examination_id,doctor_id) values (29,7);

insert into date_time_interval (start_date_time, end_date_time) values ('15.11.2019 09:00','17.11.2019 10:00');
insert into time_off_doctor (status, type, doctor_id, interval_id)
 values ('APPROVED', 'HOLIDAY', 7, 26);

/* This shouldn't be displayed in calendar */
insert into date_time_interval (start_date_time, end_date_time) values ('20.11.2019 09:00','25.11.2019 17:00');
insert into time_off_doctor (status, type, doctor_id, interval_id)
 values ('REJECTED', 'HOLIDAY', 7, 27);

 /* Doctor should be able to request holiday/time off if the examination on that time was canceled */
insert into date_time_interval (start_date_time, end_date_time) values ('09.11.2019 09:00','09.11.2019 11:00');
insert into time_off_doctor (status, type, doctor_id, interval_id)
 values ('APPROVED', 'TIME_OFF', 7, 28);

/* This shouldn't be displayed in calendar */
insert into date_time_interval (start_date_time, end_date_time) values ('10.11.2019 09:00','10.1.2019 11:00');
insert into time_off_doctor (status, type, doctor_id, interval_id)
 values ('REJECTED', 'TIME_OFF', 7, 29);

 insert into date_time_interval (start_date_time, end_date_time) values ('14.11.2019 09:30','16.11.2019 13:30');
insert into time_off_nurse (status, type, nurse_id, interval_id)
 values ('APPROVED', 'HOLIDAY', 9, 30);

/* This shouldn't be displayed in calendar */
insert into date_time_interval (start_date_time, end_date_time) values ('20.11.2019 09:00','25.11.2019 17:00');
insert into time_off_nurse (status, type, nurse_id, interval_id)
 values ('REJECTED', 'HOLIDAY', 9, 31);

 /* Nurse should be able to request holiday/time off if the examination on that time was canceled */
insert into date_time_interval (start_date_time, end_date_time) values ('09.11.2019 12:00','09.11.2019 16:00');
insert into time_off_nurse (status, type, nurse_id, interval_id)
 values ('APPROVED', 'TIME_OFF', 9, 32);

/* This shouldn't be displayed in calendar */
insert into date_time_interval (start_date_time, end_date_time) values ('10.11.2019 09:00','10.11.2019 11:00');
insert into time_off_nurse (status, type, nurse_id, interval_id)
 values ('REJECTED', 'TIME_OFF', 7, 33);
