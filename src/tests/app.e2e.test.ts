import puppeteer, { Browser, Page } from "puppeteer"

describe("App", () => {
  let browser: Browser
  let page: Page

  beforeAll(async () => {
    browser = await puppeteer.launch()
    page = await browser.newPage()
  })

  afterAll(() => {
    browser.close()
  })

  test("Login page should shown.", async () => {
    await page.goto("http://localhost:3000/")
    await page.waitForSelector('div[class*="App_app__"]')
    const loginPage = await page.$eval(
      'div[class*="App_app__"]',
      (e) => e.textContent
    )
    expect(loginPage).toContain("Логин:")
  })

  test("Login by user should open chat window", async () => {
    await page.type('input[name="login"]', "admin")
    await page.type('input[name="password"]', "admin")
    await page.click('button[type="submit"]')
    await page.waitForSelector('div[class*="Channels_new_channel__"')
    const content = await page.content()
    expect(content).toMatch(/Создать новый канал/i)
  })

  test("Send message should add message to chat", async () => {
    const randomMessage = `Test Suit Message Hello: ${Math.random() * 1000000}`
    await page.type('input[class*="Send_text__"]', randomMessage)
    await page.focus('input[class*="Send_text__"]')
    await page.keyboard.press("Enter")
    await new Promise((resolve) => setTimeout(resolve, 2000))
    const content = await page.content()
    expect(content).toMatch(randomMessage)
  })
})
