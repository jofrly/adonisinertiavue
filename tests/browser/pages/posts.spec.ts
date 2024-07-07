import { PostFactory } from '#database/factories/post_factory'
import testUtils from '@adonisjs/core/services/test_utils'
import { test } from '@japa/runner'
import { expect } from 'playwright/test'

test.group('Pages posts', (group) => {
  group.each.setup(() => testUtils.db().withGlobalTransaction())

  test('List posts', async ({ visit, route }) => {
    const posts = await PostFactory.createMany(7)

    const page = await visit(route('posts.index'))

    await page.assertElementsCount(page.locator('[aria-label=post]'), posts.length)

    for (let [index, post] of posts.entries()) {
      await page.assertTextContains(
        page.locator('[aria-label=post]').nth(posts.length - 1 - index),
        post.title
      )
      await page.assertTextContains(
        page.locator('[aria-label=post]').nth(posts.length - 1 - index),
        post.description!
      )
    }
  })

  test('Create post', async ({ visit, route }) => {
    const page = await visit(route('posts.index'))

    await page.locator('role=button', { hasText: 'New' }).click()
    await page.locator('[aria-label=create-post-dialog] input[name=title]').clear()
    await page
      .locator('[aria-label=create-post-dialog] input[name=title]')
      .fill('Post title goes here')
    await page.locator('[aria-label=create-post-dialog] textarea[name=description]').clear()
    await page
      .locator('[aria-label=create-post-dialog] textarea[name=description]')
      .fill('Post description goes here')
    await page.locator('role=button', { hasText: 'Create' }).click()

    await expect(page.locator('[aria-label=post]')).toHaveCount(1)
  })

  test('Update post', async ({ visit, route }) => {
    await PostFactory.merge({
      title: 'Post title',
      description: 'Post description',
    }).create()

    const page = await visit(route('posts.index'))

    await page.locator('[aria-label=post] [role=button][aria-label=edit]').click()
    await page.locator('[aria-label=update-post-dialog] input[name=title]').clear()
    await page.locator('[aria-label=update-post-dialog] input[name=title]').fill('New post title')
    await page.locator('[aria-label=update-post-dialog] textarea[name=description]').clear()
    await page
      .locator('[aria-label=update-post-dialog] textarea[name=description]')
      .fill('New post description')
    await page.locator('role=button', { hasText: 'Save' }).click()

    await expect(page.locator('[aria-label=post]')).toHaveCount(1)
    await expect(page.locator('[aria-label=post]')).toContainText('New post title')
    await expect(page.locator('[aria-label=post]')).toContainText('New post description')
  })

  test('Delete post', async ({ visit, route }) => {
    await PostFactory.createMany(3)

    const page = await visit(route('posts.index'))

    await page
      .locator('[aria-label=post]')
      .first()
      .locator('[role=button][aria-label=delete]')
      .click()
    await expect(page.locator('[aria-label=post]')).toHaveCount(2)
  })
})
