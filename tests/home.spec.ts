import { test, expect } from '@playwright/test';

test.describe('Basic Test', () => {
    test('verify get started button and match the url', async ({ page }) => {
        
        await page.goto('https://practice.automationbro.com')

        await page.locator('#get-started').click()

        await expect(page).toHaveURL(/.*#get-started/)
    })

    test('verify H1 text is visible using text selector', async ({ page }) => {
        
        await page.goto('https://practice.automationbro.com')

        // should be unique for now
        // text="" double string for case sensitive
        const headingText = page.locator('text="Think different. Make different."')

        await expect(headingText).toBeVisible();
    })
    

    test('verify an element using css selector and text', async ({ page }) => {
        
        await page.goto('https://practice.automationbro.com')

        // 1st way
        // const homeText = await page.locator('#primary-menu >> text=Home')
        // 2nd way
        const homeText = page.locator('#primary-menu:has-text("Home")')

        await expect(homeText).toBeEnabled();
    })

    
    test('verify search icon using xpath selector', async ({ page }) => {
        
        await page.goto('https://practice.automationbro.com')

        const searchIcon = page.locator('//*[@id="header-action"]//*[@class="tg-icon tg-icon-search"]')

        await expect(searchIcon).toBeVisible();
    })

    test('verify text of all nav links', async ({ page }) => {

        const expectedLinks = [
            "Home",
            "About",
            "Shop",
            "Blog",
            "Contact",
            "My account"
        ]
        
        await page.goto('https://practice.automationbro.com')

        // find all match selector
        const navLinks = page.locator('#primary-menu li[id*=menu]')

        // print out all the links
        for (const x of await navLinks.elementHandles()) {
            console.log(await x.textContent());
        }

        // find all match index 4th selector
        // const navLinks = page.locator('#primary-menu li[id*=menu]').nth(3)

        // verify navLinks text
        expect(await navLinks.allTextContents()).toEqual(expectedLinks);

        // just verify "Blog" text
        // expect(await navLinks.textContent()).toEqual(expectedLinks[3])
    })

    test('#exercise1 verify success messages after filling forms', async ({ page }) => {
        
        await page.goto('https://practice.automationbro.com/contact/')

        await page.getByLabel('Name').fill('Arif')
        await page.locator('.evf-field-email input').fill('arif@test.com')
        await page.getByLabel('Phone').fill('123')
        await page.getByLabel('Message').fill('hello world!')

        await page.locator('#evf-submit-277').click();

        const resultText = page.locator('text=Thanks for contacting us! We will be in touch with you shortly')

        await expect(resultText).toBeVisible();

    })

    test('#exercise1 verify length of blog posts and character of each post', async ({ page }) => {
        
        await page.goto('https://practice.automationbro.com/blog/')

        // get ul element on blog posts
        const blogs = page.locator('#recent-posts-3 ul li')

        // validate the length of characters eact post
        for (const x of await blogs.allTextContents()) {
            expect(x.trim().length).toBeGreaterThan(10)
        }

        expect(await blogs.count()).toEqual(5)
    })
})
