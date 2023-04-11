const { test, expect } = require("@playwright/test");

test.describe("Dymaskaya site / test suit 1", () => {
  const sitePage = "https://dumskaya.net/";

  test.beforeEach(async ({ page }) => {
    await page.goto(sitePage);
  });

  test("Visit site / test case 1", async ({ page }) => {
    await page.locator('a[href="/site/Reklama"]').first().click();
    await expect(
      page.locator("body > div.content > div > p:nth-child(3)")
    ).toContainText(
      "Мы предлагаем размещение рекламных баннеров на нашем сайте. "
    );
  });

  test("Visit site failed URL / test case 2", async ({ page }) => {
    await expect(page).toHaveURL("https://dumskaya.not/");
  });

  test("Fill 'test' text in search / test case 3", async ({ page }) => {
    await page.getByPlaceholder("Пошук").click();
    await page.locator("input[id='first']").fill("test");
    // for mobile safari browser check mobile version of site, goto, press on burger menu, choose Пошук, fill test in search input, press Найти button
   //  bla bla bla
  });
});
