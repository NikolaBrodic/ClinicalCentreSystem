INSERT INTO AUTHORITY (name) VALUES ('ROLE_CLINICAL_CENTRE_ADMIN');
INSERT INTO AUTHORITY (name) VALUES ('ROLE_CLINIC_ADMIN');
INSERT INTO AUTHORITY (name) VALUES ('ROLE_PATIENT');
INSERT INTO AUTHORITY (name) VALUES ('ROLE_DOCTOR');
INSERT INTO AUTHORITY (name) VALUES ('ROLE_NURSE');

/* password: 1st.Admin */
insert into clinical_centre_administrator (email, password, first_name, last_name, phone_number, status) values
('1st.admin@maildrop.cc', '$2a$10$0fX3yNqeWX3O/f0HtZRtVOA/6SA1Jq2vqARolGgJjRu47FX4AE/Y.', 'Marko', 'Marković', '064123456', 'ACTIVE');
insert into clinical_centre_admin_authority (user_id, authority_id) values (1,1);

insert into clinical_centre_administrator (email, password, first_name, last_name, phone_number, status) values
('2st.admin@maildrop.cc', '$2a$10$0fX3yNqeWX3O/f0HtZRtVOA/6SA1Jq2vqARolGgJjRu47FX4AE/Y.', 'Goran', 'Krunic', '044123456', 'ACTIVE');
insert into clinical_centre_admin_authority (user_id, authority_id) values (2,1);

insert into clinical_centre_administrator (email, password, first_name, last_name, phone_number, status) values
('3st.admin@maildrop.cc', '$2a$10$0fX3yNqeWX3O/f0HtZRtVOA/6SA1Jq2vqARolGgJjRu47FX4AE/Y.', 'Tihomir', 'Jovelic', '041123456', 'ACTIVE');
insert into clinical_centre_admin_authority (user_id, authority_id) values (3,1);

/*CLINIC*/
insert into clinic (address, description, name,clinic_rating) values ('3.Oktobar 73', 'Savremena klinika u Beogradu', 'VMA',2.25);
insert into clinic (address, description, name,clinic_rating) values ('Marsala Tita 9c', 'Savremena klinika u Novom Sadu', 'Klinika mira',4.5);

/*CLINIC ADMIN*/
/* Password: adminC.0 */
insert into clinic_administrator (email, password, first_name, last_name, phone_number, status,clinic_id) values
 ('admin1@maildrop.cc', '$2a$10$VGG0KuDEe.M7Q8x9hWsXEuWWGaLGz9cDHjTa6bXyOXr25VzIP/sIO', 'Marko', 'Marković', '064153456', 'ACTIVE',1);
insert into clinic_admin_authority(user_id, authority_id) values (1,2);

insert into clinic_administrator (email, password, first_name, last_name, phone_number, status,clinic_id) values
 ('admin2@maildrop.cc', '$2a$10$VGG0KuDEe.M7Q8x9hWsXEuWWGaLGz9cDHjTa6bXyOXr25VzIP/sIO', 'Mario', 'Simic', '0652561980', 'ACTIVE',1);
insert into clinic_admin_authority(user_id, authority_id) values (2,2);

insert into clinic_administrator (email, password, first_name, last_name, phone_number, status,clinic_id) values
('admin3@maildrop.cc', '$2a$10$VGG0KuDEe.M7Q8x9hWsXEuWWGaLGz9cDHjTa6bXyOXr25VzIP/sIO', 'Petar', 'Peric', '064123276', 'ACTIVE',1);
insert into clinic_admin_authority(user_id, authority_id) values (3,2);

insert into clinic_administrator (email, password, first_name, last_name, phone_number, status,clinic_id) values
 ('admin4@maildrop.cc', '$2a$10$VGG0KuDEe.M7Q8x9hWsXEuWWGaLGz9cDHjTa6bXyOXr25VzIP/sIO', 'Aleksa', 'Aleksic', '0652539280', 'ACTIVE',2);
insert into clinic_admin_authority(user_id, authority_id) values (4,2);

/*EXAMINATION TYPE*/
insert into examination_type (label, price,status,clinic_id) values ('Ginekolog', '5000','EXISTING' ,1);
insert into examination_type (label, price,status,clinic_id) values ('Zubar', '2000','EXISTING',1);

insert into examination_type (label, price,status,clinic_id) values ('Opsta praksa', '1000','EXISTING' ,1);
insert into examination_type (label, price,status,clinic_id) values ('Dermatolog', '1500','EXISTING',1);
insert into examination_type (label, price,status,clinic_id) values ('Dermatolog 2', '1500','EXISTING',2);
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
values ('Nurse.03@maildrop.cc', '$2a$10$/Kndy0c0LUvadXeiwa.4GufWSkf7/cEI6.KPJMAka4uX1q72kQ2Qi', 'Katarina', 'Katić', '069696966','00:00','20:00',1,'ACTIVE');
insert into nurse_authority(user_id, authority_id) values (3,5);

insert into nurse (email, password, first_name, last_name, phone_number,work_hours_from,work_hours_to,clinic_id,status)
values ('Nurse.04@maildrop.cc', '$2a$10$cajIba6Xp0xg/eSfn6hg4.ABWo8RMLoW7UCrW4.kPUuxlctwyVlg6', 'Vesna', 'Vesnić', '066362514','13:00','21:00',1,'NEVER_LOGGED_IN');
insert into nurse_authority(user_id, authority_id) values (4,5);

insert into nurse (email, password, first_name, last_name, phone_number,work_hours_from,work_hours_to,clinic_id,status)
values ('Nurse.05@maildrop.cc', '$2a$10$67QWz/90ckUxSykeElYqGejD/qe1ddvyKaUS20/BVE8e7nn/V.mPG', 'Mirna', 'Miric', '0615646455','13:00','21:00',1,'ACTIVE');
insert into nurse_authority(user_id, authority_id) values (5,5);

insert into nurse (email, password, first_name, last_name, phone_number,work_hours_from,work_hours_to,clinic_id,status)
values ('Nurse.06@maildrop.cc', '$2a$10$OU5wBEkGLQydL.scmjRxku5pmkjWTc5g1dujk7XqZPW6B4bQtUlzK', 'Tijana', 'Tijanic', '0663625119','00:00','23:59',1,'NEVER_LOGGED_IN');
insert into nurse_authority(user_id, authority_id) values (6,5);
insert into nurse (email, password, first_name, last_name, phone_number,work_hours_from,work_hours_to,clinic_id,status)
values ('Nurse.07@maildrop.cc', '$2a$10$bKaCAUMqyrYHqL9y2CDXE.L1nFdlZdkj/ew2ZjzgGfITqMwVoCzu.', 'Danica', 'Danicic', '0663698914','00:00','23:59',1,'ACTIVE');
insert into nurse_authority(user_id, authority_id) values (7,5);

insert into room (label, kind,status,clinic_id) values ('Room 1', 'EXAMINATION','EXISTING' ,1);
insert into room (label, kind,status,clinic_id) values ('Room 2', 'EXAMINATION','EXISTING' ,1);
insert into room (label, kind,status,clinic_id) values ('Room 3', 'EXAMINATION','EXISTING' ,1);
insert into room (label, kind,status,clinic_id) values ('Room 4', 'OPERATION','EXISTING' ,1);

insert into room (label, kind,status,clinic_id) values ('Room 5', 'EXAMINATION','EXISTING' ,1);
insert into room (label, kind,status,clinic_id) values ('Room 6', 'EXAMINATION','EXISTING' ,1);

insert into room (label, kind,status,clinic_id) values ('Room 7', 'EXAMINATION','EXISTING' ,1);


/*
insert into room (label, kind,status,clinic_id) values ('Room 8', 'EXAMINATION','DELETED' ,1);
insert into room (label, kind,status,clinic_id) values ('Room 9', 'EXAMINATION','EXISTING' ,1);
insert into room (label, kind,status,clinic_id) values ('Room 10', 'EXAMINATION','EXISTING' ,1);*/

/*NURSE*/

 insert into nurse (email, password, first_name, last_name, phone_number,work_hours_from,work_hours_to,clinic_id,status)
 values ('nurse@maildrop.cc', '$2a$10$Hef/d2ZrMjGXUFE60xUVU.u0up/nV2cIJMg9GDevEgnv5cCcJpTpW', 'Sima', 'Docic', '065256155','06:00','19:00',1,'ACTIVE');
insert into nurse_authority(user_id, authority_id) values (8,5);

/*PATIENT*/
  insert into patient (email, password, first_name, last_name, phone_number,address,city,country,health_insurance_id,status)
 values ('milovan.milic@maildrop.cc', '$2a$10$/.0cmhd2AYDGBQHGJn2RPel.sOUmjTe1f7DCUyGwW31NBh0bollBS', 'Milovan', 'Milic', '065258255','Marsala tita 13','Novi Sad',
 'Srbija','0625351236915','APPROVED');
insert into patient_authority(user_id, authority_id) values (1,3);

  insert into patient (email, password, first_name, last_name, phone_number,address,city,country,health_insurance_id,status)
 values ('stefan.lazarevic@maildrop.cc', '$2a$10$/.0cmhd2AYDGBQHGJn2RPel.sOUmjTe1f7DCUyGwW31NBh0bollBS', 'Stefan', 'Lazarevic', '065258355','Gogoljeva 42','Novi Sad',
 'Srbija','0625352236915','APPROVED');
insert into patient_authority(user_id, authority_id) values (2,3);

 insert into patient (email, password, first_name, last_name, phone_number,address,city,country,health_insurance_id,status)
 values ('marko.stefanovic@maildrop.cc', '$2a$10$/.0cmhd2AYDGBQHGJn2RPel.sOUmjTe1f7DCUyGwW31NBh0bollBS', 'Marko', 'Stefanovic', '065258455','Marsala tita 12','Beograd',
 'Srbija','0625342236915','APPROVED');
insert into patient_authority(user_id, authority_id) values (3,3);

 insert into patient (email, password, first_name, last_name, phone_number,address,city,country,health_insurance_id,status)
 values ('dragan.simic@maildrop.cc', '$2a$10$/.0cmhd2AYDGBQHGJn2RPel.sOUmjTe1f7DCUyGwW31NBh0bollBS', 'Dragan', 'Simic', '065258655','Dalmatinksa 7','Novi Sad',
 'Srbija','0625352237915','APPROVED');
insert into patient_authority(user_id, authority_id) values (4,3);

 insert into patient (email, password, first_name, last_name, phone_number,address,city,country,health_insurance_id,status)
 values ('tamara.lazarevic@maildrop.cc', '$2a$10$/.0cmhd2AYDGBQHGJn2RPel.sOUmjTe1f7DCUyGwW31NBh0bollBS', 'Tamara', 'Lazarevic', '067258755','Ive Andrica 17','Subotica',
 'Srbija','0625352737919','APPROVED');
insert into patient_authority(user_id, authority_id) values (5,3);

 insert into patient (email, password, first_name, last_name, phone_number,address,city,country,health_insurance_id,status)
 values ('jelena.stankovic@maildrop.cc', '$2a$10$/.0cmhd2AYDGBQHGJn2RPel.sOUmjTe1f7DCUyGwW31NBh0bollBS', 'Jelena', 'Stankovic', '065258756','Tolstojeva 5','Novi Sad',
 'Srbija','0625352737916','APPROVED');
insert into patient_authority(user_id, authority_id) values (6,3);

 insert into patient (email, password, first_name, last_name, phone_number,address,city,country,health_insurance_id,status)
 values ('tamara.jovic@maildrop.cc', '$2a$10$/.0cmhd2AYDGBQHGJn2RPel.sOUmjTe1f7DCUyGwW31NBh0bollBS', 'Tamara', 'Jovic', '065258757','Dositejeva 8','Nis',
 'Srbija','0625352737918','APPROVED');
insert into patient_authority(user_id, authority_id) values (7,3);

 insert into patient (email, password, first_name, last_name, phone_number,address,city,country,health_insurance_id,status)
 values ('nevena.milovanovic@maildrop.cc', '$2a$10$/.0cmhd2AYDGBQHGJn2RPel.sOUmjTe1f7DCUyGwW31NBh0bollBS', 'Nevena', 'Milovanovic', '075258755','Danila Kisa','Sabac',
 'Srbija','0625352748915','APPROVED');
insert into patient_authority(user_id, authority_id) values (8,3);

 insert into patient (email, password, first_name, last_name, phone_number,address,city,country,health_insurance_id,status)
 values ('teodora.stojkovic@maildrop.cc', '$2a$10$/.0cmhd2AYDGBQHGJn2RPel.sOUmjTe1f7DCUyGwW31NBh0bollBS', 'Tedora', 'Stojkovic', '065256955','Gogoljeva 8','Novi Sad',
 'Srbija','0625352737985','APPROVED');
insert into patient_authority(user_id, authority_id) values (9,3);

 insert into patient (email, password, first_name, last_name, phone_number,address,city,country,health_insurance_id,status)
 values ('jovana.bodiroga@maildrop.cc', '$2a$10$/.0cmhd2AYDGBQHGJn2RPel.sOUmjTe1f7DCUyGwW31NBh0bollBS', 'Jovana', 'Bodiroga', '065255555','Ive Lole Ribara 8','Sabac',
 'Srbija','0625352737965','APPROVED');
insert into patient_authority(user_id, authority_id) values (10,3);

 insert into patient (email, password, first_name, last_name, phone_number,address,city,country,health_insurance_id,status)
 values ('marko.markovic@maildrop.cc', '$2a$10$/.0cmhd2AYDGBQHGJn2RPel.sOUmjTe1f7DCUyGwW31NBh0bollBS', 'Marko', 'Markovic', '069058755','Marsala tita 9','Novi Sad',
 'Srbija','0625352737915','APPROVED');
insert into patient_authority(user_id, authority_id) values (11,3);

/*DOCTOR*/
/* Password: Admin.04*/
 insert into doctor (email, password, first_name, last_name, phone_number,work_hours_from,work_hours_to,clinic_id,status,specialized_id, doctor_rating)
 values ('doca2@maildrop.cc', '$2a$10$/.0cmhd2AYDGBQHGJn2RPel.sOUmjTe1f7DCUyGwW31NBh0bollBS', 'Misa', 'Percic', '065256856','00:30','23:59',1,'ACTIVE',1,4);
insert into doctor_authority(user_id, authority_id) values (1,4);

 insert into doctor (email, password, first_name, last_name, phone_number,work_hours_from,work_hours_to,clinic_id,status,specialized_id,doctor_rating)
 values ('doca3@maildrop.cc', '$2a$10$/.0cmhd2AYDGBQHGJn2RPel.sOUmjTe1f7DCUyGwW31NBh0bollBS', 'Miodrag', 'Simic', '065257165','06:00','20:00',2,'ACTIVE',2,0);
insert into doctor_authority(user_id, authority_id) values (2,4);

 insert into doctor (email, password, first_name, last_name, phone_number,work_hours_from,work_hours_to,clinic_id,status,specialized_id, doctor_rating)
 values ('doca4@maildrop.cc', '$2a$10$Hef/d2ZrMjGXUFE60xUVU.u0up/nV2cIJMg9GDevEgnv5cCcJpTpW', 'Vlastimir', 'Popovic', '065256886','06:00','22:00',1,'ACTIVE',1,3.5);
insert into doctor_authority(user_id, authority_id) values (3,4);

 insert into doctor (email, password, first_name, last_name, phone_number,work_hours_from,work_hours_to,clinic_id,status,specialized_id,doctor_rating)
 values ('doca5@maildrop.cc', '$2a$10$/.0cmhd2AYDGBQHGJn2RPel.sOUmjTe1f7DCUyGwW31NBh0bollBS', 'Tamara', 'Lazarevic', '075256886','00:00','20:00',1,'ACTIVE',2,4.5);
insert into doctor_authority(user_id, authority_id) values (4,4);

 insert into doctor (email, password, first_name, last_name, phone_number,work_hours_from,work_hours_to,clinic_id,status,specialized_id)
 values ('doca6@gmail.com', '$2a$10$Hef/d2ZrMjGXUFE60xUVU.u0up/nV2cIJMg9GDevEgnv5cCcJpTpW', 'Nikolina', 'Simic', '078256886','02:00','10:00',1,'ACTIVE',1);
insert into doctor_authority(user_id, authority_id) values (5,4);

 insert into doctor (email, password, first_name, last_name, phone_number,work_hours_from,work_hours_to,clinic_id,status,specialized_id,doctor_rating)
 values ('doca7@gmail.com', '$2a$10$Hef/d2ZrMjGXUFE60xUVU.u0up/nV2cIJMg9GDevEgnv5cCcJpTpW', 'Marko', 'Popov', '079256886','12:00','20:00',1,'ACTIVE',1,5);
insert into doctor_authority(user_id, authority_id) values (6,4);


insert into date_time_interval (start_date_time, end_date_time) values ('31.12.2019 08:00','31.01.2020 10:00');
insert into time_off_doctor (status, type, doctor_id, interval_id)
 values ('APPROVED', 'HOLIDAY', 3, 1);

insert into time_off_doctor (status, type, doctor_id, interval_id)
 values ('REJECTED', 'HOLIDAY', 2, 1);

insert into time_off_nurse (status, type, nurse_id, interval_id)
 values ('APPROVED', 'HOLIDAY', 3, 1);

insert into date_time_interval (start_date_time, end_date_time) values ('25.12.2019 06:00','25.12.2019 11:00');
insert into examination (kind,interval_id,status,examination_type_id,clinic_id,clinic_administrator_id,room_id,patient_id,nurse_id)
 values ('EXAMINATION',2,'APPROVED',1,1,1,1,1,1);
insert into examining (examination_id,doctor_id) values (1,1);

insert into date_time_interval (start_date_time, end_date_time) values ('08.11.2019 00:01','08.11.2019 02:00');
insert into examination (kind,interval_id,status,examination_type_id,clinic_id,clinic_administrator_id,patient_id)
 values ('EXAMINATION',3,'APPROVED',1,1,1,3);
insert into examining (examination_id,doctor_id) values (2,1);

insert into date_time_interval (start_date_time, end_date_time) values ('15.11.2019 23:01','15.11.2019 23:59');
insert into examination (kind,interval_id,status,examination_type_id,clinic_id,clinic_administrator_id,patient_id)
 values ('EXAMINATION',4,'APPROVED',1,1,1,2);
insert into examining (examination_id,doctor_id) values (3,1);


insert into date_time_interval (start_date_time, end_date_time) values ('21.11.2019 10:15','21.11.2019 11:15');
insert into examination (kind,interval_id,status,examination_type_id,clinic_id,clinic_administrator_id,patient_id)
 values ('EXAMINATION',5,'APPROVED',2,1,1,4);
insert into examining (examination_id,doctor_id) values (4,2);

insert into examination (kind,interval_id,status,examination_type_id,clinic_id,clinic_administrator_id,patient_id)
values ('EXAMINATION',5,'APPROVED',2,1,1,5);
insert into examining (examination_id,doctor_id) values (5,4);

insert into date_time_interval (start_date_time, end_date_time) values ('18.11.2019 00:01','18.11.2019 06:00');
insert into examination (kind,interval_id,status,examination_type_id,clinic_id,clinic_administrator_id,patient_id)
values ('EXAMINATION',6,'APPROVED',2,1,1,6);
insert into examining (examination_id,doctor_id) values (6,4);

insert into date_time_interval (start_date_time, end_date_time) values ('28.11.2019 08:00','28.11.2019 12:00');
insert into examination (kind,interval_id,status,examination_type_id,clinic_id,clinic_administrator_id,patient_id,discount)
values ('EXAMINATION',7,'PREDEF_BOOKED',1,1,1,7,10);
insert into examining (examination_id,doctor_id) values (7,1);

insert into date_time_interval (start_date_time, end_date_time) values ('31.10.2019 08:00','31.10.2019 11:00');
insert into examination (kind,interval_id,status,examination_type_id,clinic_id,clinic_administrator_id,room_id,patient_id)
values ('EXAMINATION',8,'APPROVED',2,1,1,4,8);
insert into examining (examination_id,doctor_id) values (8,4);

insert into date_time_interval (start_date_time, end_date_time) values ('23.11.2019 08:00','23.11.2019 12:00');
insert into examination (kind,interval_id,status,examination_type_id,clinic_id,clinic_administrator_id,patient_id)
values ('EXAMINATION',9,'APPROVED',1,1,1,1);
insert into examining (examination_id,doctor_id) values (9,1);

insert into date_time_interval (start_date_time, end_date_time) values ('26.11.2019 08:00','26.11.2019 12:00');
insert into examination (kind,interval_id,status,examination_type_id,clinic_id,clinic_administrator_id,patient_id)
values ('EXAMINATION',10,'APPROVED',1,1,1,1);

insert into date_time_interval (start_date_time, end_date_time) values ('26.10.2019 08:00','26.10.2019 12:00');
insert into examination (kind,interval_id,status,examination_type_id,clinic_id,clinic_administrator_id,patient_id)
values ('EXAMINATION',11,'APPROVED',1,1,1,1);

insert into date_time_interval (start_date_time, end_date_time) values ('09.11.2019 08:00','09.11.2019 12:00');
insert into examination (kind,interval_id,status,examination_type_id,clinic_id,clinic_administrator_id,patient_id)
values ('EXAMINATION',12,'APPROVED',1,1,1,1);

insert into date_time_interval (start_date_time, end_date_time) values ('03.06.2019 08:00','03.06.2019 12:00');
insert into examination (kind,interval_id,status,examination_type_id,clinic_id,clinic_administrator_id,patient_id)
values ('EXAMINATION',13,'APPROVED',1,1,1,1);

insert into date_time_interval (start_date_time, end_date_time) values ('28.01.2019 08:00','28.01.2019 12:00');
insert into examination (kind,interval_id,status,examination_type_id,clinic_id,clinic_administrator_id,patient_id)
values ('EXAMINATION',14,'APPROVED',1,1,1,1);

insert into date_time_interval (start_date_time, end_date_time) values ('05.04.2019 08:00','05.04.2019 12:00');
insert into examination (kind,interval_id,status,examination_type_id,clinic_id,clinic_administrator_id,patient_id)
values ('EXAMINATION',15,'APPROVED',1,1,1,1);

insert into date_time_interval (start_date_time, end_date_time) values ('05.12.2019 08:00','05.12.2019 12:00');
insert into examination (kind,interval_id,status,examination_type_id,clinic_id,clinic_administrator_id,patient_id)
values ('EXAMINATION',16,'APPROVED',1,1,1,1);

insert into date_time_interval (start_date_time, end_date_time) values ('05.09.2019 08:00','05.09.2019 12:00');
insert into examination (kind,interval_id,status,examination_type_id,clinic_id,clinic_administrator_id,patient_id)
values ('EXAMINATION',17,'APPROVED',1,1,1,1);

insert into date_time_interval (start_date_time, end_date_time) values ('05.03.2019 08:00','05.03.2019 12:00');
insert into examination (kind,interval_id,status,examination_type_id,clinic_id,clinic_administrator_id,patient_id)
values ('EXAMINATION',18,'APPROVED',1,1,1,1);

insert into date_time_interval (start_date_time, end_date_time) values ('05.07.2019 08:00','05.07.2019 12:00');
insert into examination (kind,interval_id,status,examination_type_id,clinic_id,clinic_administrator_id,patient_id)
values ('EXAMINATION',19,'APPROVED',1,1,1,1);

insert into date_time_interval (start_date_time, end_date_time) values ('05.11.2019 08:00','05.11.2019 12:00');
insert into examination (kind,interval_id,status,examination_type_id,clinic_id,clinic_administrator_id,patient_id)
values ('EXAMINATION',20,'APPROVED',1,1,1,1);
/*

insert into date_time_interval (start_date_time, end_date_time) values ('13.12.2019 10:30','13.12.2019 11:00');
insert into examination (kind,interval_id,status,examination_type_id,clinic_id,clinic_administrator_id,room_id,patient_id)
values ('EXAMINATION',10,'APPROVED',2,1,1,1,10);
insert into examining (examination_id,doctor_id) values (10,1);

insert into date_time_interval (start_date_time, end_date_time) values ('13.12.2019 15:00','13.12.2019 16:00');
insert into examination (kind,interval_id,status,examination_type_id,clinic_id,clinic_administrator_id,room_id,patient_id)
values ('EXAMINATION',11,'APPROVED',2,1,1,3,11);
insert into examining (examination_id,doctor_id) values (11,1);

insert into date_time_interval (start_date_time, end_date_time) values ('13.12.2019 14:00','13.12.2019 14:30');
insert into examination (kind,interval_id,status,examination_type_id,clinic_id,clinic_administrator_id,room_id,patient_id)
values ('EXAMINATION',12,'APPROVED',2,1,1,2,1);
insert into examining (examination_id,doctor_id) values (12,6);

insert into date_time_interval (start_date_time, end_date_time) values ('13.12.2019 08:30','13.12.2019 09:00');
insert into examination (kind,interval_id,status,examination_type_id,clinic_id,clinic_administrator_id,patient_id )
 values ('EXAMINATION',13,'AWAITING',1,1,1,1);

 insert into date_time_interval (start_date_time, end_date_time) values ('12.11.2019 08:30','13.12.2019 09:00');
insert into examination (kind,interval_id,status,examination_type_id,clinic_id,clinic_administrator_id,patient_id )
 values ('EXAMINATION',14,'AWAITING',1,1,1,1);
*/

/* PATIENTS*/
/*
  insert into date_time_interval (start_date_time, end_date_time) values ('13.12.2019 08:30','13.12.2019 09:00');
insert into examination (kind,interval_id,status,examination_type_id,clinic_id,clinic_administrator_id,patient_id )
 values ('EXAMINATION',15,'AWAITING',1,1,1,3);

insert into date_time_interval (start_date_time, end_date_time) values ('12.11.2019 08:30','13.12.2019 09:00');
insert into examination (kind,interval_id,status,examination_type_id,clinic_id,clinic_administrator_id,patient_id )
 values ('EXAMINATION',16,'AWAITING',1,1,1,4);

insert into examination (kind,interval_id,status,examination_type_id,clinic_id,clinic_administrator_id,patient_id )
 values ('EXAMINATION',16,'AWAITING',1,1,1,6);

insert into examination (kind,interval_id,status,examination_type_id,clinic_id,clinic_administrator_id,patient_id,discount)
 values ('EXAMINATION',15,'AWAITING',1,1,1,7,0);

insert into examination (kind,interval_id,status,examination_type_id,clinic_id,clinic_administrator_id,patient_id,discount)
 values ('EXAMINATION',16,'AWAITING',1,1,1,8,0);

insert into examination (kind,interval_id,status,examination_type_id,clinic_id,clinic_administrator_id,patient_id,discount)
 values ('EXAMINATION',16,'AWAITING',1,1,1,9,0);


 insert into date_time_interval (start_date_time, end_date_time) values ('14.12.2019 08:30','14.12.2019 09:00');
insert into examination (kind,interval_id,status,examination_type_id,clinic_id,clinic_administrator_id,patient_id )
 values ('EXAMINATION',17,'AWAITING',1,1,1,2);

  insert into date_time_interval (start_date_time, end_date_time) values ('16.12.2019 08:30','16.12.2019 09:00');
insert into examination (kind,interval_id,status,examination_type_id,clinic_id,clinic_administrator_id,patient_id )
 values ('EXAMINATION',18,'AWAITING',1,2,4,4);
*/

 /* Examinations for calendar */
 /*****************************/
/*
 insert into doctor (email, password, first_name, last_name, phone_number,work_hours_from,work_hours_to,clinic_id,status,specialized_id)
 values ('DocaKalendar@maildrop.cc', '$2a$10$/.0cmhd2AYDGBQHGJn2RPel.sOUmjTe1f7DCUyGwW31NBh0bollBS', 'Milan', 'Milanovic', '019256886','07:00','23:59',1,'ACTIVE',1);
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

insert into patient (email, password, first_name, last_name, phone_number,address,city,country,health_insurance_id,status)
 values ('patient12@maildrop.cc', '$2a$10$/.0cmhd2AYDGBQHGJn2RPel.sOUmjTe1f7DCUyGwW31NBh0bollBS', 'Bojan', 'Stojkovic', '090589556','Marsala tita','Novi Sad',
 'Srbija','0737985669595','APPROVED');
insert into medical_record(height, weight, blood_type, allergies, patient_id) values (186, 80, 'B-', 'Prasina, jaja', 12);
insert into patient_authority(user_id, authority_id) values (12,3);

insert into patient (email, password, first_name, last_name, phone_number,address,city,country,health_insurance_id,status)
 values ('patient13@maildrop.cc', '$2a$10$/.0cmhd2AYDGBQHGJn2RPel.sOUmjTe1f7DCUyGwW31NBh0bollBS', 'Slavica', 'Katic', '090589557','Marsala tita','Novi Sad',
 'Srbija','0737985669596','APPROVED');
insert into medical_record(height, weight, blood_type, allergies, patient_id) values (166, 59, '0', 'Kikiriki, ambrozija', 13);
insert into patient_authority(user_id, authority_id) values (13,3);

insert into patient (email, password, first_name, last_name, phone_number,address,city,country,health_insurance_id,status)
 values ('patient14@maildrop.cc', '$2a$10$/.0cmhd2AYDGBQHGJn2RPel.sOUmjTe1f7DCUyGwW31NBh0bollBS', 'Zivko', 'Simonovic', '090589558','Marsala tita','Novi Sad',
 'Srbija','0737985669597','APPROVED');
insert into medical_record(height, weight, blood_type, allergies, patient_id) values (177, 74, 'A+', 'Nema', 14);
-- insert into medical_record(patient_id) values (14);
insert into patient_authority(user_id, authority_id) values (14,3);

insert into date_time_interval (start_date_time, end_date_time) values ('19.12.2019 14:00','19.12.2019 14:30');
insert into examination (kind,interval_id,status,examination_type_id,clinic_id,clinic_administrator_id,patient_id,room_id)
 values ('OPERATION',19,'APPROVED',1,1,1,14,4);
insert into examining (examination_id,doctor_id) values (23,7);
insert into examining (examination_id,doctor_id) values (23,8);
insert into examining (examination_id,doctor_id) values (23,9);

insert into date_time_interval (start_date_time, end_date_time) values ('15.12.2019 13:00','15.12.2019 14:30');
insert into examination (kind,interval_id,status,examination_type_id,clinic_id,clinic_administrator_id,patient_id)
 values ('OPERATION',20,'AWAITING',1,1,1,12);
insert into examining (examination_id,doctor_id) values (24,7);
insert into examining (examination_id,doctor_id) values (24,8);
insert into examining (examination_id,doctor_id) values (24,9);

insert into date_time_interval (start_date_time, end_date_time) values ('25.12.2019 10:30','25.12.2019 18:00');
insert into examination (kind,interval_id,status,examination_type_id,clinic_id,clinic_administrator_id,patient_id,nurse_id,room_id)
 values ('EXAMINATION',21,'APPROVED',1,1,1,14,9,5);
insert into examining (examination_id,doctor_id) values (25,7);

insert into date_time_interval (start_date_time, end_date_time) values ('13.12.2019 17:00','13.12.2019 18:30');
insert into examination (kind,interval_id,status,examination_type_id,clinic_id,clinic_administrator_id,patient_id,nurse_id)
 values ('EXAMINATION',22,'AWAITING',1,1,1,13,9);
insert into examining (examination_id,doctor_id) values (26,7);

insert into date_time_interval (start_date_time, end_date_time) values ('20.12.2019 09:00','20.12.2019 12:00');
insert into examination (kind,interval_id,status,examination_type_id,clinic_id,clinic_administrator_id,patient_id,nurse_id,room_id,discount)
 values ('EXAMINATION',23,'PREDEF_BOOKED',1,1,1,14,9,2,50);
insert into examining (examination_id,doctor_id) values (27,7);

insert into date_time_interval (start_date_time, end_date_time) values ('18.12.2019 16:00','18.12.2019 17:00');
insert into examination (kind,interval_id,status,examination_type_id,clinic_id,clinic_administrator_id,nurse_id,discount,room_id)
 values ('EXAMINATION',24,'PREDEF_AVAILABLE',1,1,1,9,10,5);
insert into examining (examination_id,doctor_id) values (28,7);
*/

/* This shouldn't be displayed in calendar */
/*
insert into date_time_interval (start_date_time, end_date_time) values ('09.12.2019 09:00','09.12.2019 10:00');
insert into examination (kind,interval_id,status,examination_type_id,clinic_id,clinic_administrator_id,patient_id,nurse_id)
 values ('EXAMINATION',25,'CANCELED',1,1,1,14,9);
insert into examining (examination_id,doctor_id) values (29,7);

insert into date_time_interval (start_date_time, end_date_time) values ('25.11.2019 09:00','27.11.2019 10:00');
insert into time_off_doctor (status, type, doctor_id, interval_id)
 values ('APPROVED', 'HOLIDAY', 7, 26);
*/
/* This shouldn't be displayed in calendar */
/*
insert into date_time_interval (start_date_time, end_date_time) values ('30.11.2019 09:00','05.12.2019 17:00');
insert into time_off_doctor (status, type, doctor_id, interval_id)
 values ('REJECTED', 'HOLIDAY', 7, 27);
*/
 /* Doctor should be able to request holiday/time off if the examination on that time was canceled */
/*
insert into date_time_interval (start_date_time, end_date_time) values ('11.11.2019 09:00','11.11.2019 11:00');
insert into time_off_doctor (status, type, doctor_id, interval_id)
 values ('APPROVED', 'TIME_OFF', 7, 28);
*/
/* This shouldn't be displayed in calendar */
/*
insert into date_time_interval (start_date_time, end_date_time) values ('20.11.2019 09:00','20.1.2019 11:00');
insert into time_off_doctor (status, type, doctor_id, interval_id)
 values ('REJECTED', 'TIME_OFF', 7, 29);

 insert into date_time_interval (start_date_time, end_date_time) values ('24.11.2019 09:30','26.11.2019 13:30');
insert into time_off_nurse (status, type, nurse_id, interval_id)
 values ('APPROVED', 'HOLIDAY', 9, 30);
*/
/* This shouldn't be displayed in calendar */
/*
insert into date_time_interval (start_date_time, end_date_time) values ('30.11.2019 09:00','05.12.2019 17:00');
insert into time_off_nurse (status, type, nurse_id, interval_id)
 values ('REJECTED', 'HOLIDAY', 9, 31);
*/
 /* Nurse should be able to request holiday/time off if the examination on that time was canceled */
/*
insert into date_time_interval (start_date_time, end_date_time) values ('11.11.2019 12:00','11.11.2019 16:00');
insert into time_off_nurse (status, type, nurse_id, interval_id)
 values ('APPROVED', 'TIME_OFF', 9, 32);
*/
/* This shouldn't be displayed in calendar */
/*
insert into date_time_interval (start_date_time, end_date_time) values ('20.11.2019 09:00','20.11.2019 11:00');
insert into time_off_nurse (status, type, nurse_id, interval_id) values ('REJECTED', 'TIME_OFF', 7, 33);
*/

insert into diagnose (title, description) values ('Asthma', 'Asthma is a condition in which hyperreactive airways constrict ' ||
 'and result in symptoms like wheezing, coughing, and shortness of breath. Inhaled corticosteroids (ICS) and long-acting ' ||
  'bronchodilators (LABAs) are used in the treatment of asthma.');
insert into diagnose (title, description) values ('Diabetes', 'Diabetes is a chronic condition characterized by high levels ' ||
 'of sugar (glucose) in the blood. Symptoms of diabetes include increased urine output, thirst, hunger, and fatigue.');

insert into medicine (label, chemical_composition, "usage") values ('Vicodin', 'hydrocodone, acetaminophen, mauris, natoque ',
 'Vicodin is a popular drug for treating acute or chronic moderate to moderately severe pain. Its most common side effects are ' ||
 'lightheadedness, dizziness, sedation, nausea, and vomiting. Vicodin can reduce breathing, impair thinking, reduce ' ||
 'physical abilities, and is habit forming.');

insert into medicine (label, chemical_composition, "usage") values ('Lipitor', 'atorvastatin, auctor, consectetur, dapibus, facilisis',
 'Lipitor is a "statin" (HMG-CoA reductase inhibitors) approved for treating high cholesterol. It also prevents chest pain, ' ||
 'stroke, heart attack in individuals with coronary artery disease. It causes minor side effects such as constipation, ' ||
 'diarrhea, fatigue, gas, heartburn, and headache. Like other statins it can cause muscle pain and muscle break down. ');

insert into medicine (label, chemical_composition, "usage") values ('Amoxicillin', 'percipit, adipisci, urbanitas',
 'Amoxicillin is a penicillin type antibiotic used for treating several types of bacterial infections such as ear, tonsils, throat, larynx, ' ||
 'urinary tract, and skin infections. Its side effects are diarrhea, heartburn, nausea, itching, vomiting, confusion, abdominal pain, rash, ' ||
 'and allergic reactions.');

insert into medicine (label, chemical_composition, "usage") values ('Simvastatin', 'rhoncus, urna, neque, viverra',
 'Simvastatin is one of the first "statins" (HMG-CoA reductase inhibitors) approved for treating high cholesterol and reducing the risk ' ||
 'of stroke, death from heart disease, and risk of heart attacks. ');

insert into medicine (label, chemical_composition, "usage") values ('Lisinopril', 'pbibendum, enim, facilisis, gravida',
 'Lisinopril is an angiotensin converting enzyme (ACE) inhibitor used for treating high blood pressure, congestive heart failure, and for ' ||
 'preventing kidney failure caused by high blood pressure and diabetes.');

insert into medicine (label, chemical_composition, "usage") values ('Metformin', 'vitae, velit, dignissim ',
 'Metformin is used alone or in combination with other drugs for treating type 2 diabetes in adults and children.');

insert into medicine (label, chemical_composition, "usage") values ('Azithromycin', 'amet, mauris, commodo, quis, imperdiet',
 'Azithromycin is an antibiotic used for treating ear, throat, and sinus infections as well as pneumonia, bronchitis, and some sexually ' ||
 'transmitted diseases. Its common side effects include loose stools, nausea, stomach pain, and vomiting. ');

insert into examination_report(comment, time_created, diagnose_id, doctor_id, medical_record_id, examination_id)
 values ('Pacijent ima astmu', '17.03.2019. 12:30', 1, 7, 3, 25);
-- examination_id set to 25 just to get right patient for PrescriptionDTO, that not the real examination_id

insert into prescription(status, examination_report_id, medicine_id, nurse_id)
 values ('STAMPED', 1, 1, 9);
insert into prescription(status, examination_report_id, medicine_id, nurse_id)
 values ('STAMPED', 1, 2, 9);
insert into prescription(status, examination_report_id, medicine_id, nurse_id)
 values ('STAMPED', 1, 5, 9);
insert into prescription(status, examination_report_id, medicine_id, nurse_id)
 values ('STAMPED', 1, 7, 9);
 insert into prescription(status, examination_report_id, medicine_id, nurse_id)
 values ('STAMPED', 1, 3, 9);
 insert into prescription(status, examination_report_id, medicine_id, nurse_id)
 values ('STAMPED', 1, 4, 9);
 insert into prescription(status, examination_report_id, medicine_id, nurse_id)
 values ('STAMPED', 1, 6, 9);

insert into examination_report(comment, time_created, diagnose_id, doctor_id, medical_record_id, examination_id)
 values ('Pacijent boluje od sizofrenije', '09.06.2019. 09:30', 2, 7, 3, 25);
-- examination_id set to 25 just to get right patient for PrescriptionDTO, that not the real examination_id

insert into prescription(status, examination_report_id, medicine_id, nurse_id)
 values ('STAMPED', 2, 2, 8);
insert into prescription(status, examination_report_id, medicine_id, nurse_id)
 values ('STAMPED', 2, 3, 8);
insert into prescription(status, examination_report_id, medicine_id, nurse_id)
 values ('STAMPED', 2, 6, 8);

insert into examination_report(comment, time_created, diagnose_id, doctor_id, medical_record_id, examination_id)
 values ('Pacijent ima mucnine', '19.01.2019. 18:00', 1, 8, 3, 25);
-- examination_id set to 25 just to get right patient for PrescriptionDTO, that not the real examination_id

insert into prescription(status, examination_report_id, medicine_id, nurse_id)
 values ('STAMPED', 3, 4, 7);
insert into prescription(status, examination_report_id, medicine_id, nurse_id)
 values ('STAMPED', 3, 5, 7);

insert into examination_report(comment, time_created, diagnose_id, doctor_id, medical_record_id, examination_id)
 values ('Pacijent ima vrtoglavice', '16.04.2019. 18:00', 2, 9, 3, 25);
-- examination_id set to 25 just to get right patient for PrescriptionDTO, that not the real examination_id

insert into prescription(status, examination_report_id, medicine_id, nurse_id)
 values ('STAMPED', 4, 6, 9);


/*
insert into doctor (email, password, first_name, last_name, phone_number,work_hours_from,work_hours_to,clinic_id,status,specialized_id)
 values ('goran.smiljanic@maildrop.cc', '$2a$10$/.0cmhd2AYDGBQHGJn2RPel.sOUmjTe1f7DCUyGwW31NBh0bollBS', 'Goran', 'Smiljanic', '038856886','06:00','18:00',1,'ACTIVE',3);
insert into doctor_authority(user_id, authority_id) values (10,4);

insert into date_time_interval (start_date_time, end_date_time) values ('01.02.2020 09:00','01.02.2020 10:00');
insert into examination (kind,interval_id,status,examination_type_id,clinic_id,clinic_administrator_id,nurse_id,discount,room_id)
 values ('EXAMINATION',34,'PREDEF_AVAILABLE',3,1,1,9,10,5);
insert into examining (examination_id,doctor_id) values (30,10);

insert into doctor (email, password, first_name, last_name, phone_number,work_hours_from,work_hours_to,clinic_id,status,specialized_id)
 values ('milovan.smiljanic@maildrop.cc', '$2a$10$/.0cmhd2AYDGBQHGJn2RPel.sOUmjTe1f7DCUyGwW31NBh0bollBS', 'Milovan', 'Smiljanic', '044856886','06:00','18:00',1,'ACTIVE',4);
insert into doctor_authority(user_id, authority_id) values (11,4);
*/
/*
insert into date_time_interval (start_date_time, end_date_time) values ('31.12.2019 08:00','31.01.2020 10:00');
insert into time_off_doctor (status, type, doctor_id, interval_id)
 values ('AWAITING', 'HOLIDAY', 2, 10);

 insert into date_time_interval (start_date_time, end_date_time) values ('29.12.2019 08:00','30.01.2020 10:00');
insert into time_off_doctor (status, type, doctor_id, interval_id)
 values ('AWAITING', 'TIME_OFF', 4, 11);


  insert into date_time_interval (start_date_time, end_date_time) values ('30.11.2019 08:00','30.01.2020 10:00');
insert into time_off_doctor (status, type, doctor_id, interval_id)
 values ('AWAITING', 'TIME_OFF', 1, 12);



  insert into date_time_interval (start_date_time, end_date_time) values ('30.11.2019 08:00','30.01.2020 10:00');
insert into time_off_nurse (status, type, nurse_id, interval_id)
 values ('AWAITING', 'TIME_OFF', 5, 13);

   insert into date_time_interval (start_date_time, end_date_time) values ('30.12.2019 08:00','30.01.2020 10:00');
insert into time_off_nurse (status, type, nurse_id, interval_id)
 values ('AWAITING', 'HOLIDAY', 4, 14);

*/