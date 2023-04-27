const { test, expect } = require("@playwright/test");

test.describe("https://dumskaya.net/ site test suit", () => {
  const sitePage = "https://dumskaya.net/";

  test.beforeEach(async ({ page }) => {
    await page.goto(sitePage);
  });

  test("when 'Реклама' link was click page should contain text", async ({
    page,
  }) => {
    await page.locator('a[href="/site/Reklama"]').first().click();
    await expect(
      page.locator("body > div.content > div > p:nth-child(3)")
    ).toContainText(
      "Мы предлагаем размещение рекламных баннеров на нашем сайте. "
    );
  });

  test("when filled incorrect URL test case should be fail", async ({
    page,
  }) => {
    await expect(page).toHaveURL("https://dumskaya.not/");
  });

  test("when 'test' entered in search should display 6 results in first type of ordered list", async ({
    page,
    browserName,
  }) => {
    if (browserName === "webkit") {
      await page.locator("nav > a > img").tap();
      await page.locator("a[href='/search/']").tap();
      await page.locator("input[class='sfield']").fill("test");
      await page.locator("input[class='sbutton']").tap();
    } else {
      await page.getByPlaceholder("Пошук").click();
      await page.locator("input[id='first']").fill("test");
      await page.locator("input[src='/i/enter.png']").click();
      const results = page.locator(".results:first-of-type li");
      await expect(results).toHaveCount(7);
      await expect(results).toHaveCount(5);
    }
  });
});
