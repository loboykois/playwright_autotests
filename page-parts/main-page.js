const { expect } = require("@playwright/test");

exports.MainPage = class MainPage {
  constructor(page, browserName) {
    this.page = page;
    this.adsLink = page.locator('a[href="/site/Reklama"]');
    // locators for mobile site version
    this.mobileNavigationBtn = page.locator("nav > a > img");
    this.mobileSearch = page.locator("a[href='/search/']");
    this.mobileSearchInput = page.locator("input[class='sfield']");
    this.mobileSearchBtn = page.locator("input[class='sbutton']");
    // locators for Desktop site version
    this.desktopSiteSearch = page.getByPlaceholder("Пошук");
    this.desktopSiteSearchInput = page.locator("input[id='first']");
    this.desktopSiteSearchBtn = page.locator("input[src='/i/enter.png']");
  }
  // go to base testing URL
  async visitMainPage() {
    await this.page.goto("https://dumskaya.net/");
  }
  // find and click on 'Реклама' link on main page
  async clickOnAdsLink() {
    await this.adsLink.first().click();
  }
  // check does text match in paragraph with expected text in test-case or not
  async checkTextAfterAdsLinkPress() {
    await expect(
      this.page.locator(".content > div > p:nth-child(3)")
    ).toContainText(
      "Мы предлагаем размещение рекламных баннеров на нашем сайте."
    );
  }
  // check behavior with wrong base testing URL
  async checkWrongMainPageUrl() {
    await expect(this.page).toHaveURL("https://dumskaya.not/");
  }
  // check search work with 'test' request on mobile site version
  async checkSearchResultsOnMobileSiteVersion() {
    await this.mobileNavigationBtn.tap();
    await this.mobileSearch.tap();
    await this.mobileSearchInput.fill("test");
    await this.mobileSearchBtn.tap();
  }

  // check search work with 'test' request on desktop site version
  async checkSearchResultsOnDesktopSiteVersion(searchText) {
    if (!searchText) {
      throw new Error("search text cannot be empty");
    }
    await this.desktopSiteSearch.click();
    await this.desktopSiteSearchInput.fill(searchText);
    await this.desktopSiteSearchBtn.click();
  }
  // check search results at desktop and mobile site versions
  async checkSearchingResultsBothVersions() {
    const results = this.page.locator(".results:first-of-type li");
    await expect(results).toHaveCount(6);
  }

  async getSearchResults() {
    const pageCollection = await this.page.$$(".results:first-of-type li");
    return pageCollection;
  }
};
