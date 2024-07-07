import vine from '@vinejs/vine'
import { Infer } from '@vinejs/vine/types'

export const createPostValidator = vine.compile(
  vine.object({
    title: vine.string().minLength(3),
    description: vine.string().minLength(1).nullable(),
  })
)
export type CreatePostData = Infer<typeof createPostValidator>

export const updatePostValidator = vine.compile(
  vine.object({
    title: vine.string().minLength(3),
    description: vine.string().minLength(1).nullable(),
  })
)
export type UpdatePostData = Infer<typeof updatePostValidator>
