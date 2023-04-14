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

  test.only("Fill 'test' text in search / test case 3", async ({ page }) => {
    await page.getByPlaceholder("Пошук").click();
    await page.locator("input[id='first']").fill("test");
    await page.locator("input[src='/i/enter.png']").click();
    await page.waitForSelector(
      "div[style='padding-left:25px;'] ol li"
    );
   

   //   const olList = await page.locator("div[style='padding-left:25px;'] ol li");
   //   const olItem = await Promise.all(olList.map(async (listItem)=>{
   //     return await listItem;
   //   }))
   //   console.log(olItem);
    //  await expect(page.locator("div[style='padding-left:25px;'] ol >> nth=0 li")).toHaveCount(6);
  });
});
