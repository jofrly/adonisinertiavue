import Post from '#models/post'
import { createPostValidator, updatePostValidator } from '#validators/post'
import type { HttpContext } from '@adonisjs/core/http'

export default class PostsController {
  async index({ inertia }: HttpContext) {
    const posts = await Post.all()
    const postReadModels = posts.map((post) => ({
      id: post.id,
      title: post.title,
      description: post.description,
    }))

    return inertia.render('posts/index', {
      posts: postReadModels,
    })
  }

  async create({ request, response }: HttpContext) {
    const createPostData = await request.validateUsing(createPostValidator)
    await Post.create(createPostData)

    return response.redirect().toRoute('posts.index')
  }

  async update({ params, request, response }: HttpContext) {
    const updatePostData = await request.validateUsing(updatePostValidator)
    const post = await Post.findByOrFail({ id: params.id })
    await post.merge(updatePostData).save()

    return response.redirect().toRoute('posts.index')
  }

  async destroy({ params, response }: HttpContext) {
    const post = await Post.findByOrFail({ id: params.id })
    await post.delete()

    return response.redirect().toRoute('posts.index')
  }
}
