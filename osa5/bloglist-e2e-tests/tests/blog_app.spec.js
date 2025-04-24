const { test, describe, expect, beforeEach } = require('@playwright/test')


describe('Blog app', () => {
    beforeEach(async ({ page, request }) => {
        await request.post('http://localhost:3001/api/testing/reset')
        await request.post('http://localhost:3001/api/users', {
          data: {
            name: 'Testi Käyttäjä',
            username: 'testiuser',
            password: 'salasana123'
          }
        })
        await page.goto('http://localhost:3000')
    })

    test('Login form is shown', async ({ page }) => {
        const locator = await page.getByText(/blogs/i)
        await expect(locator).toBeVisible()
        await expect(page.getByText('Blog App A!')).toBeVisible()
    })
    describe('Login', () => {
      const data = {
        name: 'Testi Käyttäjä',
        username: 'testiuser',
        password: 'salasana123'
      }
        test('succeeds with correct credentials', async ({ page }) => {
            await page.getByRole('button', { name: 'show login' }).click()
            await page.getByTestId('username').fill(data.username)
            await page.getByTestId('password').fill(data.password)
            await page.getByRole('button', { name: 'login' }).click()
            await expect(page.getByText(`${data.name} logged in`)).toBeVisible()
        })
    
        test('fails with wrong credentials', async ({ page }) => {
            await page.getByRole('button', { name: 'show login' }).click()
            await page.getByTestId('username').fill('testuseri')
            await page.getByTestId('password').fill('salasana1234')
            await page.getByRole('button', { name: 'login' }).click()
            await expect(page.getByText('Wrong username or password')).toBeVisible()
        })
      })
    describe('When logged in', () => {
        const data = {
            name: 'Testi Käyttäjä',
            username: 'testiuser',
            password: 'salasana123'
          }          
          beforeEach(async ({ page, request }) => {
            await request.post('http://localhost:3001/api/testing/reset')
            await request.post('http://localhost:3001/api/users', {
              data
            })
        
            await page.goto('http://localhost:3000')
            await page.getByRole('button', { name: 'show login' }).click()
            await page.getByTestId('username').fill(data.username)
            await page.getByTestId('password').fill(data.password)
            await page.getByRole('button', { name: 'login' }).click()
          })
      
        test('a new blog can be created', async ({ page }) => {
          await page.getByRole('button', { name: 'new blog' }).click()
          await page.getByTestId('title-input').fill('Testi blogi')
          await page.getByTestId('author-input').fill('Testi kirjoittaja')
          await page.getByTestId('url-input').fill('https://testi.fi')
          await page.getByRole('button', { name: 'create' }).click()
          await expect(page.getByText('Testi blogi')).toBeVisible()
        })

        test('a blog can be liked', async ({ page }) => {
            await page.getByRole('button', { name: 'new blog' }).click()
            await page.getByTestId('title-input').fill('Testi blogi')
            await page.getByTestId('author-input').fill('Testi kirjoittaja')
            await page.getByTestId('url-input').fill('https://testi.fi')
            await page.getByRole('button', { name: 'create' }).click()
            await page.getByRole('button', { name: 'view' }).last().click()
            await page.getByRole('button', { name: 'like' }).click()
            await expect(page.getByText('1 likes')).toBeVisible()
        })
        test('only the creator can delete a blog', async ({ page }) => {
            await page.getByRole('button', { name: /new blog/i }).click()
            await page.getByTestId('title-input').fill('Testi blogi')
            await page.getByTestId('author-input').fill('Testi kirjoittaja')
            await page.getByTestId('url-input').fill('https://testi.fi')
            await page.getByRole('button', { name: 'create' }).click()
            await page.getByRole('button' , { name: 'view' }).first().click()
            await expect(page.getByRole('button', { name: /remove/i })).toBeVisible()
            page.on('dialog', async dialog => {
              await dialog.accept();
            });
            await page.getByRole('button', { name: 'remove' }).click()
            await expect(page.getByText('Testi blogi')).not.toBeVisible();
        })
        test('blogs are ordered by likes', async ({ page }) => {
            const viewboxes = await page.getByRole('button', { name: 'view' }).all()

            const viewButtons = await page.getByRole('button', { name: 'view' }).all()

            for (let i = 0; i < viewButtons.length; i++) {
                await viewButtons[i].click()
                await page.getByRole('button', { name: 'like' }).nth(i).click()
            }
            const likeElements = await page.locator('[data-testid="like-count"]').allTextContents()
            const likeNumbers = likeElements.map(text => parseInt(text))
            const sortedLikes = [...likeNumbers].sort((a, b) => b - a)
            expect(likeNumbers).toEqual(sortedLikes)
        })
      })


})