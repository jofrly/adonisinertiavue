import PostsController from '#controllers/posts_controller'
import { InferPageProps } from '@adonisjs/inertia/types'

type PostReadModels = InferPageProps<PostsController, 'index'>['posts']
export type PostReadModel = PostReadModels[number]
