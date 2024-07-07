/*
|--------------------------------------------------------------------------
| Routes file
|--------------------------------------------------------------------------
|
| The routes file is used for defining the HTTP routes.
|
*/

import router from '@adonisjs/core/services/router'

router.on('/').renderInertia('home')

const PostsController = () => import('#controllers/posts_controller')
router.get('posts', [PostsController, 'index']).as('posts.index')
router.post('posts', [PostsController, 'create'])
router.patch('posts/:id', [PostsController, 'update'])
router.delete('posts/:id', [PostsController, 'destroy'])
