<script setup lang="ts">
definePageMeta({
  layout: "main",
});

const workspaces = ["All workspaces", "Alpha Studio", "Nova Ops", "Zen Product"];
const selectedWorkspace = ref(workspaces[0]);

const boards = [
  {
    name: "Website Redesign",
    workspace: "Alpha Studio",
    project: "Landing Page",
    columns: ["Todo", "In Progress", "Review"],
    tasks: 12,
    updatedAt: "2 hours ago",
  },
  {
    name: "Mobile App",
    workspace: "Nova Ops",
    project: "Task Flow",
    columns: ["Todo", "In Progress", "Review"],
    tasks: 18,
    updatedAt: "1 day ago",
  },
  {
    name: "Ops Automation",
    workspace: "Zen Product",
    project: "Internal Tools",
    columns: ["Todo", "In Progress", "Review"],
    tasks: 9,
    updatedAt: "4 days ago",
  },
];

const filteredBoards = computed(() => {
  if (selectedWorkspace.value === "All workspaces") {
    return boards;
  }

  return boards.filter((board) => board.workspace === selectedWorkspace.value);
});
</script>

<template>
  <div class="space-y-6">
    <section class="rounded-3xl border border-default bg-elevated p-6 shadow-sm">
      <div class="flex flex-col gap-4 xl:flex-row xl:items-end xl:justify-between">
        <div class="space-y-2">
          <UBadge color="neutral" variant="soft">Board catalog</UBadge>
          <h1 class="text-3xl font-semibold tracking-tight">Boards</h1>
          <p class="text-sm text-muted">Board overview by project and workspace.</p>
        </div>

        <div class="flex flex-col gap-3 sm:flex-row sm:items-center">
          <USelectMenu v-model="selectedWorkspace" :items="workspaces" class="w-full sm:w-56" />
          <UButton icon="i-lucide-plus" label="Create board" color="neutral" />
        </div>
      </div>
    </section>

    <UAlert
      v-if="!filteredBoards.length"
      title="No boards match this workspace"
      description="Try another workspace filter or create a new board."
      icon="i-lucide-circle-alert"
      color="neutral"
      variant="soft"
    />

    <div v-else class="grid gap-4 lg:grid-cols-2 xl:grid-cols-3">
      <div v-for="board in filteredBoards" :key="board.name" class="rounded-3xl border border-default bg-default p-5 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md">
        <div class="space-y-4">
          <div class="space-y-1">
            <p class="text-sm text-muted">{{ board.workspace }}</p>
            <h2 class="text-lg font-semibold">{{ board.name }}</h2>
            <p class="text-sm text-muted">{{ board.project }}</p>
          </div>

          <div class="flex flex-wrap gap-2 text-sm text-muted">
            <UBadge v-for="column in board.columns" :key="column" color="neutral" variant="soft">{{ column }}</UBadge>
          </div>

          <div class="flex items-center justify-between text-sm text-muted">
            <span>{{ board.tasks }} tasks</span>
            <span>Updated {{ board.updatedAt }}</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
