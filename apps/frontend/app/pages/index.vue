<script setup lang="ts">
definePageMeta({
  layout: "main",
});

const projects = [
  { name: "Website Redesign", workspace: "Alpha Studio" },
  { name: "Mobile App", workspace: "Nova Ops" },
  { name: "Ops Automation", workspace: "Zen Product" },
];
</script>

<template>
  <div class="space-y-6">
    <section class="rounded-3xl border border-default bg-elevated p-6 shadow-sm">
      <div class="space-y-2">
        <UBadge color="neutral" variant="soft">Dashboard</UBadge>
        <h1 class="text-3xl font-semibold tracking-tight">Overview</h1>
        <p class="text-sm text-muted">Workspace, project, board, task, and activity preview.</p>
      </div>
    </section>

    <UAlert v-if="!projects.length" title="Nothing to show" description="Start by creating a workspace and project." icon="i-lucide-circle-alert" color="neutral" variant="soft" />

    <div v-else class="grid gap-4 md:grid-cols-3">
      <div v-for="project in projects" :key="project.name" class="rounded-3xl border border-default bg-default p-5 shadow-sm">
        <p class="text-sm text-muted">{{ project.workspace }}</p>
        <h2 class="mt-2 text-lg font-semibold">{{ project.name }}</h2>
      </div>
    </div>
  </div>
</template>
