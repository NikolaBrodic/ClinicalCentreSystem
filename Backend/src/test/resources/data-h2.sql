INSERT INTO AUTHORITY (name) VALUES ('ROLE_CLINICAL_CENTRE_ADMIN');
INSERT INTO AUTHORITY (name) VALUES ('ROLE_CLINIC_ADMIN');
INSERT INTO AUTHORITY (name) VALUES ('ROLE_PATIENT');
INSERT INTO AUTHORITY (name) VALUES ('ROLE_DOCTOR');
INSERT INTO AUTHORITY (name) VALUES ('ROLE_NURSE');

insert into clinical_centre_administrator (email, password, first_name, last_name, phone_number, status) values
('1st.Admin@maildrop.cc', '$2a$10$JA.M/IQm9r29csrRlkNSteO/k4q3MclGtWfW/MjVqKFMVKb9T.F0i', 'Stefan', 'Stefanovic', '061123456', 'ACTIVE');
insert into clinical_centre_admin_authority (user_id, authority_id) values (1,1);

insert into patient (email, password, first_name, last_name, phone_number,address,city,country,health_insurance_id,status,version)
 values ('Patient1@maildrop.cc', '$2a$10$ItcRjGVnH26jIqw7GRXOBeM5Wu3sGxkSdvSgTRWSjEpPno4J9T4kS', 'Milovan', 'Milic', '065258255','Marsala tita 13','Novi Sad',
 'Srbija','0625351236915','AWAITING_APPROVAL',0);
insert into patient_authority(user_id, authority_id) values (1,1);

insert into patient (email, password, first_name, last_name, phone_number,address,city,country,health_insurance_id,status,version)
 values ('Patient2@maildrop.cc', '$2a$10$ItcRjGVnH26jIqw7GRXOBeM5Wu3sGxkSdvSgTRWSjEpPno4J9T4kS', 'Adam', 'Bah', '065298255','Marsala tita 14','Beograd',
 'Srbija','0625351286915','AWAITING_APPROVAL',0);
insert into patient_authority(user_id, authority_id) values (1,2);

insert into patient (email, password, first_name, last_name, phone_number,address,city,country,health_insurance_id,status,version)
 values ('Patient3@maildrop.cc', '$2a$10$ItcRjGVnH26jIqw7GRXOBeM5Wu3sGxkSdvSgTRWSjEpPno4J9T4kS', 'Srdjan', 'Stanojevic', '065898255','Marsala tita 17','Kikinda',
 'Srbija','0625351286815','ACTIVATED',0);
insert into patient_authority(user_id, authority_id) values (1,3);