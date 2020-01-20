package ftn.tim16.ClinicalCentreSystem.e2e;

import org.openqa.selenium.By;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.support.FindBy;
import org.openqa.selenium.support.ui.ExpectedConditions;
import org.openqa.selenium.support.ui.WebDriverWait;

public class RoomPage {
    private WebDriver driver;

    @FindBy(xpath = "//*[@id=\"list-examinations-request-table\"]")
    private WebElement tableForExaminationRequests;

    @FindBy(xpath = "//*[@id=\"assign-room-table\"]")
    private WebElement tableForRooms;

    public RoomPage() {
    }

    public RoomPage(WebDriver driver) {
        this.driver = driver;
    }

    public void ensureIsDisplayedTableForRequests() {
        (new WebDriverWait(driver, 10)).until(ExpectedConditions.elementToBeClickable(tableForExaminationRequests));
    }

    public void ensureIsDisplayedTableForRooms() {
        (new WebDriverWait(driver, 10)).until(ExpectedConditions.elementToBeClickable(tableForRooms));
    }

    public void ensureIsDisplayedTableForRequests1stElement() {
        (new WebDriverWait(driver, 10)).until(ExpectedConditions.elementToBeClickable(By.cssSelector(".mat-row:nth-child(1) .mat-button-wrapper")));
    }

    public void ensureIsNotVisibleTableForRooms() {
        (new WebDriverWait(driver, 10))
                .until(ExpectedConditions.invisibilityOfElementLocated(By.id("assign-room-table")));
    }

    public void ensureIsNotVisibleTableForRequests() {
        (new WebDriverWait(driver, 10))
                .until(ExpectedConditions.invisibilityOfElementLocated(By.id("list-examinations-request-table")));
    }

    public WebElement getTableForExaminationRequests() {
        return tableForExaminationRequests;
    }

    public WebElement getTableForRooms() {
        return tableForRooms;
    }
}
