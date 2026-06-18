<script setup lang="ts">
definePageMeta({
  layout: "main",
});
</script>

<template>
  <div class="space-y-6">
    <section class="rounded-3xl border border-default bg-elevated p-6 shadow-sm">
      <UBadge color="neutral" variant="soft">Task list</UBadge>
      <h1 class="mt-3 text-3xl font-semibold tracking-tight">Tasks</h1>
      <p class="mt-2 text-sm text-muted">Task ownership, status, and priority overview.</p>
    </section>

    <UAlert title="No tasks yet" description="Tasks will appear here after creating a project board." icon="i-lucide-circle-alert" color="neutral" variant="soft" />
  </div>
</template>
