<template>
  <Head title="All posts" />

  <div class="max-w-[800px] mx-auto py-8">
    <div class="flex justify-between">
      <h1 class="h1 mb-2">All Posts</h1>

      <button @click="openCreateDialog" class="btn-primary">New</button>
    </div>

    <div class="flex flex-col gap-4 mb-2">
      <div v-for="post in posts" :key="post.id" class="shadow p-4 rounded-md border relative">
        <h2 class="h2">{{ post.title }}</h2>
        <p>{{ post.description || '-' }}</p>
        <button @click="openUpdateDialog(post)" class="absolute top-4 right-4">✎</button>
        <button @click="deletePost(post)" class="absolute bottom-4 right-4 text-red-700">✕</button>
      </div>
    </div>

    <Link href="/" class="link">Home</Link>
  </div>

  <CreateDialog ref="createDialog" />

  <UpdateDialog ref="updateDialog" />
</template>

<script setup lang="ts">
import { Head, Link, router } from '@inertiajs/vue3'
import CreateDialog from './CreateDialog.vue'
import UpdateDialog from './UpdateDialog.vue'
import { ref } from 'vue';
import { PostReadModel } from './types';

defineProps<{ posts: PostReadModel[] }>()

const createDialog = ref();
const updateDialog = ref();

function openCreateDialog() {
  createDialog.value.open();
}

function openUpdateDialog(post: PostReadModel) {
  updateDialog.value.open(post);
}

function deletePost(post: PostReadModel) {
  router.delete(`/posts/${post.id}`, {
    preserveScroll: true,
  })
}
</script>
