<script setup lang="ts">
definePageMeta({
  layout: "main",
});
</script>

<template>
  <div class="space-y-6">
    <section class="rounded-3xl border border-default bg-elevated p-6 shadow-sm">
      <UBadge color="neutral" variant="soft">Activity</UBadge>
      <h1 class="mt-3 text-3xl font-semibold tracking-tight">Activity Logs</h1>
      <p class="mt-2 text-sm text-muted">Audit trail placeholder for project actions.</p>
    </section>

    <UAlert title="No activity yet" description="Activity logs will populate when users create, update, or move tasks." icon="i-lucide-circle-alert" color="neutral" variant="soft" />
  </div>
</template>
