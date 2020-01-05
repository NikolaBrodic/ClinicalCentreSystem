INSERT INTO AUTHORITY (name) VALUES ('ROLE_CLINICAL_CENTRE_ADMIN');
INSERT INTO AUTHORITY (name) VALUES ('ROLE_CLINIC_ADMIN');
INSERT INTO AUTHORITY (name) VALUES ('ROLE_PATIENT');
INSERT INTO AUTHORITY (name) VALUES ('ROLE_DOCTOR');
INSERT INTO AUTHORITY (name) VALUES ('ROLE_NURSE');

insert into clinical_centre_administrator (email, password, first_name, last_name, phone_number, status) values
('1st.Admin@maildrop.cc', '$2a$10$0fX3yNqeWX3O/f0HtZRtVOA/6SA1Jq2vqARolGgJjRu47FX4AE/Y.', 'Marko', 'Marković', '064123456', 'ACTIVE');
insert into clinical_centre_admin_authority (user_id, authority_id) values (1,1);

insert into clinic (address, description, name,clinic_rating,version) values ('Novi sad Grbavica', 'Savremena klinika u Novom Sadu', 'Klinika mira',0,0);

insert into clinic_administrator (email, password, first_name, last_name, phone_number, status,clinic_id) values
 ('ClinicAdmin1@maildrop.cc', '$2a$10$O2sRY6wvf0lpUu/mF5RN2u9dSW3AAzEplF4g9RpzwDOfSCFRhad6C', 'Marko', 'Marković', '064153456', 'ACTIVE',1);
insert into clinic_admin_authority(user_id, authority_id) values (1,2);

insert into examination_type (label, price,status,clinic_id,version) values ('Opsta praksa', '1000','EXISTING' ,1,0);
insert into examination_type (label, price,status,clinic_id,version) values ('Dermatolog', '1500','EXISTING',1,0);

 insert into doctor (email, password, first_name, last_name, phone_number,work_hours_from,work_hours_to,clinic_id,status,specialized_id, doctor_rating)
 values ('ClinicDoctor1@maildrop.cc', '$2a$10$dYGaiAblDscBBR9YERSaXug8OA5skjf96lKndFWvIkkcrnGop6.Z2', 'Misa', 'Percic', '065256856','07:30','20:00',1,'ACTIVE',1,4);
insert into doctor_authority(user_id, authority_id) values (1,4);

 insert into doctor (email, password, first_name, last_name, phone_number,work_hours_from,work_hours_to,clinic_id,status,specialized_id,doctor_rating)
 values ('ClinicDoctor2@maildrop.cc', '$2a$10$NKLDw2XWuf73CpHD.tSdLOS7xIgyI/3DeddI7Ob20DVnEjqcQWhQm', 'Miodrag', 'Simic', '065257165','06:00','20:00',1,'ACTIVE',2,0);
insert into doctor_authority(user_id, authority_id) values (2,4);

  insert into patient (email, password, first_name, last_name, phone_number,address,city,country,health_insurance_id,status,version)
 values ('Patient1@maildrop.cc', '$2a$10$ItcRjGVnH26jIqw7GRXOBeM5Wu3sGxkSdvSgTRWSjEpPno4J9T4kS', 'Milovan', 'Milic', '065258255','Marsala tita 13','Novi Sad',
 'Srbija','0625351236915','ACTIVATED',0);
 insert into medical_record(height, weight, blood_type, allergies, patient_id) values (186, 80, 'B-', 'Prasina, jaja', 1);
insert into patient_authority(user_id, authority_id) values (1,3);

insert into date_time_interval (start_date_time, end_date_time) values ('27.12.2020 08:00','27.12.2020 10:00');
insert into examination (kind,interval_id,status,examination_type_id,clinic_id,clinic_administrator_id,patient_id,version )
 values ('EXAMINATION',1,'APPROVED',1,1,1,1,0);
 insert into examining(doctor_id, examination_id) values (1,1);