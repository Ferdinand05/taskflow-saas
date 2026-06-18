<script setup lang="ts">
definePageMeta({
  layout: "main",
});

const columns = [
  {
    title: "Todo",
    count: 4,
    tasks: ["Wireframe approval", "Setup project permissions", "Review backlog"],
  },
  {
    title: "Doing",
    count: 2,
    tasks: ["Implement API schema", "Prepare design tokens"],
  },
  {
    title: "In Progress",
    count: 5,
    tasks: ["Refine kanban layout", "Draft task detail panel", "Sync workspace header"],
  },
];
</script>

<template>
  <div class="space-y-6">
    <section class="rounded-3xl border border-default bg-elevated p-6 shadow-sm">
      <div class="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
        <div class="space-y-2">
          <div class="flex items-center gap-2">
            <UBadge color="neutral" variant="soft">Project board</UBadge>
            <span class="text-sm text-muted">Workspace / Project</span>
          </div>
          <h1 class="text-3xl font-semibold tracking-tight">Marketing website</h1>
          <p class="max-w-2xl text-sm text-muted">Minimal kanban board preview with dummy tasks. Drag and drop will be added later.</p>
        </div>
        <div class="flex gap-3">
          <UButton icon="i-lucide-plus" label="Add task" color="neutral" />
          <UButton icon="i-lucide-filter" label="Filter" color="neutral" variant="soft" />
        </div>
      </div>
    </section>

    <UAlert v-if="!columns.length" title="Board is empty" description="Add tasks to populate the kanban board." icon="i-lucide-circle-alert" color="neutral" variant="soft" />

    <div v-else class="grid gap-4 xl:grid-cols-3">
      <div v-for="column in columns" :key="column.title" class="rounded-3xl border border-default bg-default p-4 shadow-sm">
        <div class="mb-4 flex items-center justify-between">
          <div>
            <h2 class="font-semibold">{{ column.title }}</h2>
            <p class="text-sm text-muted">{{ column.count }} tasks</p>
          </div>
          <UBadge color="neutral" variant="soft">{{ column.count }}</UBadge>
        </div>
        <div class="space-y-3">
          <div v-for="task in column.tasks" :key="task" class="rounded-2xl border border-default bg-elevated p-4">
            <div class="flex items-start justify-between gap-3">
              <div class="space-y-2">
                <p class="font-medium">{{ task }}</p>
                <p class="text-sm text-muted">Add assignee, estimate, and priority later.</p>
              </div>
              <UIcon name="i-lucide-grip-vertical" class="size-5 text-muted" />
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
