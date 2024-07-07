<script setup lang="ts">
import { Head, Link } from '@inertiajs/vue3'
</script>

<template>
  <Head title="Homepage" />

  <div class="max-w-[800px] mx-auto py-8">
    <div class="h1 mb-2">Homepage</div>

    <Link href="/posts" class="link">Posts</Link>
  </div>
</template>
