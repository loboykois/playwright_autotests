const { test, expect } = require("@playwright/test");


class MainPage {
  sitePage = "https://dumskaya.net/";

  constructor({ page }) {
    this.page = page;
  }

  visitSite() {
    this.page.goto(this.sitePage);
  }
}

class BottomHud extends MainPage {
  clickOnReklamaLinkOnBottomHud() {
    this.page.locator('a[href="/site/Reklama"]').first().click();
  }
}

const firstPage = new BottomHud ()


test("go to Dymskaya site and click on Reklama link on the bottom hud", async ({firstPage})) {
   await visitSite ();
   await clickOnReklamaLinkOnBottomHud();
   
}