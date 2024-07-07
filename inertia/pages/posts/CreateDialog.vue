<template>
  <dialog ref="dialog" class="p-8 shadow-lg rounded-lg w-full max-w-96" aria-label="create-post-dialog">
    <div class="flex justify-between items-start mb-4">
      <h2 class="h2">Create Post</h2>
      <button @click="close" class="text-red-700">✕</button>
    </div>

    <form @submit.prevent="createPost">
      <div class="mb-4">
        <label for="title" class="block mb-2 text-sm font-medium text-gray-900">Title</label>
        <input
          type="text"
          name="title"
          id="title"
          placeholder="Title"
          required
          v-model="form.title"
          class="input"
        />
        <p class="mt-2 text-xs text-red-600" v-if="errors.title">{{ errors.title.join(', ') }}</p>
      </div>

      <div class="mb-4">
        <label for="description" class="block mb-2 text-sm font-medium text-gray-900">Description</label>
        <textarea
          type="text"
          name="description"
          id="description"
          placeholder="Description"
          v-model="form.description"
          class="input"
        />
        <p class="mt-2 text-xs text-red-600" v-if="errors.description">{{ errors.description.join(', ') }}</p>
      </div>

      <button type="submit" role="button" class="btn-primary w-full">Create</button>
    </form>
  </dialog>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { router } from '@inertiajs/vue3'
import { CreatePostData } from '#validators/post';

defineExpose({ open })

const dialog = ref();
const form = ref<CreatePostData>({
  title: '',
  description: '',
})
let errors = ref<Partial<Record<keyof CreatePostData, string[]>>>({});

function open() {
  errors.value = {};
  form.value = {
    title: '',
    description: '',
  }

  dialog.value.showModal();
}

function close() {
  dialog.value.close();
}

function createPost() {
  router.post('/posts', form.value, {
    preserveScroll: true,
    onSuccess: close,
    onError: (newErrors) => errors.value = newErrors,
  })
}
</script>
