<script setup lang="ts">
definePageMeta({
  layout: "main",
});

const workspaces = ["All workspaces", "Alpha Studio", "Nova Ops", "Zen Product"];
const selectedWorkspace = ref(workspaces[0]);

const projects = [
  {
    name: "Landing Page",
    workspace: "Alpha Studio",
    status: "In progress",
    progress: 68,
    tasks: 12,
    updatedAt: "2 hours ago",
  },
  {
    name: "Task Flow",
    workspace: "Nova Ops",
    status: "Planning",
    progress: 24,
    tasks: 18,
    updatedAt: "1 day ago",
  },
  {
    name: "Internal Tools",
    workspace: "Zen Product",
    status: "Review",
    progress: 91,
    tasks: 9,
    updatedAt: "4 days ago",
  },
];

const filteredProjects = computed(() => {
  if (selectedWorkspace.value === "All workspaces") {
    return projects;
  }

  return projects.filter((project) => project.workspace === selectedWorkspace.value);
});
</script>

<template>
  <div class="space-y-6">
    <section class="rounded-3xl border border-default bg-elevated p-6 shadow-sm">
      <div class="flex flex-col gap-4 xl:flex-row xl:items-end xl:justify-between">
        <div class="space-y-2">
          <UBadge color="neutral" variant="soft">Project catalog</UBadge>
          <h1 class="text-3xl font-semibold tracking-tight">Projects</h1>
          <p class="text-sm text-muted">Project list filtered by workspace.</p>
        </div>

        <div class="flex flex-col gap-3 sm:flex-row sm:items-center">
          <USelectMenu v-model="selectedWorkspace" :items="workspaces" class="w-full sm:w-56" />
          <UButton icon="i-lucide-plus" label="Create project" color="neutral" />
        </div>
      </div>
    </section>

    <UAlert
      v-if="!filteredProjects.length"
      title="No projects match this workspace"
      description="Try another workspace filter or create a new project."
      icon="i-lucide-circle-alert"
      color="neutral"
      variant="soft"
    />

    <div v-else class="grid gap-4 lg:grid-cols-2 xl:grid-cols-3">
      <div v-for="project in filteredProjects" :key="project.name" class="rounded-3xl border border-default bg-default p-5 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md">
        <div class="space-y-4">
          <div class="space-y-1">
            <p class="text-sm text-muted">{{ project.workspace }}</p>
            <h2 class="text-lg font-semibold">{{ project.name }}</h2>
            <p class="text-sm text-muted">{{ project.status }}</p>
          </div>

          <div class="space-y-2">
            <div class="flex items-center justify-between text-sm text-muted">
              <span>Progress</span>
              <span>{{ project.progress }}%</span>
            </div>
            <UProgress :model-value="project.progress" />
          </div>

          <div class="flex items-center justify-between text-sm text-muted">
            <span>{{ project.tasks }} tasks</span>
            <span>Updated {{ project.updatedAt }}</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
