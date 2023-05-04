const { test, expect } = require("@playwright/test");
const { MainPage } = require("../page-parts/main-page");

test.describe("https://dumskaya.net/ site test suit", async () => {
  test.beforeEach(async ({ page }) => {
    const mainPage = new MainPage(page);
    await mainPage.visitMainPage();
  });

  test("when 'Реклама' link was click page should contain text", async ({
    page,
  }) => {
    const mainPage = new MainPage(page);
    await mainPage.clickOnAdsLink();
    await mainPage.checkTextAfterAdsLinkPress();
  });

  test("when filled incorrect URL test case should be fail", async ({
    page,
  }) => {
    const mainPage = new MainPage(page);
    await mainPage.checkWrongMainPageUrl();
  });

  test("when 'test' entered in search should display 6 results in first type of ordered list", async ({
    page,
    browserName,
  }) => {
    const mainPage = new MainPage(page);

    if (browserName === "webkit") {
      await mainPage.checkSearchResultsOnMobileSiteVersion();
    }

    try {
      await mainPage.checkSearchResultsOnDesktopSiteVersion();
      console.info("test");
    } catch (error) {
      console.error(error);
      await mainPage.checkSearchResultsOnDesktopSiteVersion("test");
      console.info("test");
    } finally {
      console.info("some text");
    }
    await mainPage.checkSearchingResultsBothVersions();
    //  const searchResults = await mainPage.getSearchResults().count();
    //  expect(searchResults).toBe(6);

    const searchResults = await mainPage.getSearchResults();
    expect(searchResults.length).toBe(6);
  });
});
