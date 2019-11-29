package ftn.tim16.ClinicalCentreSystem;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.scheduling.annotation.EnableScheduling;

@EnableScheduling
@SpringBootApplication
public class ClinicalCentreSystemApplication {

	public static void main(String[] args) {
		SpringApplication.run(ClinicalCentreSystemApplication.class, args);
	}

}
