<script setup lang="ts">
definePageMeta({
  layout: "main",
});

const projects = [
  {
    id: "website-redesign",
    name: "Website Redesign",
    description: "Landing page refresh and conversion improvements.",
    status: "In progress",
    progress: 68,
    dueDate: "12 Jul",
  },
  {
    id: "mobile-app",
    name: "Mobile App",
    description: "Task intake and workspace collaboration.",
    status: "Planning",
    progress: 24,
    dueDate: "28 Jul",
  },
  {
    id: "ops-automation",
    name: "Ops Automation",
    description: "Internal process automation and approval flow.",
    status: "Review",
    progress: 91,
    dueDate: "30 Jun",
  },
];

const formCreateProject = reactive({
  name: "",
  description: "",
  workspaceId: "",
});
</script>

<template>
  <div class="space-y-6">
    <div class="flex items-end justify-between gap-4">
      <div class="space-y-2">
        <UBadge color="neutral" variant="soft">Workspace</UBadge>
        <h1 class="text-3xl font-semibold tracking-tight">Projects</h1>
        <p class="text-sm text-muted">Projects inside the selected workspace.</p>
      </div>
      <UModal title="Modal with description" description="Lorem ipsum dolor sit amet, consectetur adipiscing elit.">
        <UButton icon="i-lucide-plus" label="New project" color="neutral" />

        <template #body>
          <form class="space-y-3 w-full">
            <div>
              <UFormField label="Project">
                <UInput placeholder="Nama Project" highlight v-model="formCreateProject.name" class="w-full" />
              </UFormField>
            </div>
            <div>
              <UFormField label="Description">
                <UTextarea v-model="formCreateProject.description" class="w-full" />
              </UFormField>
            </div>
            <div>
              <UButton label="Create" type="submit" />
            </div>
          </form>
        </template>
      </UModal>
    </div>

    <UAlert v-if="!projects.length" title="No project yet" description="Add a project inside this workspace to continue." icon="i-lucide-circle-alert" color="neutral" variant="soft" />

    <div v-else class="grid gap-4 lg:grid-cols-2 xl:grid-cols-3">
      <NuxtLink v-for="project in projects" :key="project.id" :to="`/workspaces/demo/${project.id}`" class="rounded-3xl border border-default bg-elevated p-5 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md">
        <div class="space-y-4">
          <div class="flex items-start justify-between gap-3">
            <div>
              <h2 class="text-lg font-semibold">{{ project.name }}</h2>
              <p class="mt-1 text-sm text-muted">{{ project.description }}</p>
            </div>
            <UBadge color="neutral" variant="soft">{{ project.status }}</UBadge>
          </div>
          <div class="space-y-2">
            <div class="flex items-center justify-between text-sm text-muted">
              <span>Progress</span>
              <span>{{ project.progress }}%</span>
            </div>
            <UProgress :model-value="project.progress" />
          </div>
          <div class="flex items-center justify-between text-sm text-muted">
            <span>Due {{ project.dueDate }}</span>
            <span class="inline-flex items-center gap-1"><span class="size-2 rounded-full bg-emerald-500" />Open board</span>
          </div>
        </div>
      </NuxtLink>
    </div>
  </div>
</template>
