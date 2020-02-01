# Clinical Centre System

This web application allows a clinical centre to organize work of its clinics. The main purpose of this application is keeping record of the employees, registered clinics, examination and operation rooms of a clinic, patients and their medical records, as well as scheduling appointments. Users of the system are patients, doctors, nurses, clinic administrators and clinical centre administrators. 

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes.

To get started, clone the project to your local directory:
```
$ git clone https://github.com/NikolaBrodic/ClinicalCentreSystem.git
```

### Prerequisites

You need to install following software to be able to run the application:
* [Java SDK v1.8](https://www.oracle.com/technetwork/java/javase/downloads/jdk8-downloads-2133151.html)
* [Apache Maven v3.6.3](https://maven.apache.org/download.cgi) (or use IDE of your choice, such as IntelliJ Idea, Eclipse etc.)
* [NodeJS v12.13.0](https://nodejs.org/en/blog/release/v12.13.0/)
* [PostgreSQL v12.0](https://www.postgresql.org/download/)

### Installing and configuring

1. Start pgAdmin and create a database with name `ClinicalCentreDatabase`

2. Go to the Frontend directory inside the application's root directory, open a console and type:
```
npm install
```
to install all dependencies.

### Using

#### Starting backend

If you are using Apache Maven to run the backend, go to the Backend directory inside the application's root directory, open a console and type:
```
mvn spring-boot:run
```
This command will start the backend.

If you are using IDE, just open/import the Backend directory in it and run the project.

#### Starting frontend

Go to the Frontend directory inside the application's root directory, open a console and type:
```
ng serve
```
or alternatively
```
npm start
```
to start the frontend.

## Deployment

Add additional notes about how to deploy this on a live system

## Built with

* [Angular 8](https://angular.io) - Frontend framework
* [Spring Boot](https://spring.io/) - Backend framework
* [Maven](https://maven.apache.org/) - Dependency management

## Authors

* **[Nikola Brodić](https://github.com/NikolaBrodic)**
* **[Jelena Popov](https://github.com/JelenaPopov)**


