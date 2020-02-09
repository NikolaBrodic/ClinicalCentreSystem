package ftn.tim16.ClinicalCentreSystem.e2e;

import org.junit.jupiter.api.Test;
import org.openqa.selenium.By;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.chrome.ChromeDriver;

public class e2eLogin {

    public static final String BASE_URL = "http://localhost:4200";

    private WebDriver driver;

    @Test
    public void login(){
        System.setProperty("webdriver.chrome.driver", "src/test/res/chromedriver.exe");
        driver = new ChromeDriver();
        driver.navigate().to(BASE_URL + "/user/login");
        WebElement mail = driver.findElement(By.id("email"));
        mail.sendKeys("pera.peric@gmail.com");
        WebElement pass = driver.findElement(By.id("password"));
        pass.sendKeys("123");
        WebElement btnLog = driver.findElement(By.id("log"));
        btnLog.click();

    }
}
