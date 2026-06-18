<script setup lang="ts">
definePageMeta({
  layout: "main",
});

const workspaces = [
  {
    id: "alpha-studio",
    name: "Alpha Studio",
    description: "Design system dan delivery operasional.",
    projects: 4,
    members: 12,
    updatedAt: "2 jam lalu",
  },
  {
    id: "nova-ops",
    name: "Nova Ops",
    description: "Automation untuk workflow internal.",
    projects: 7,
    members: 19,
    updatedAt: "1 hari lalu",
  },
  {
    id: "zen-product",
    name: "Zen Product",
    description: "Roadmap produk dan iterasi fitur.",
    projects: 3,
    members: 8,
    updatedAt: "4 hari lalu",
  },
];

const formCreateWorkspace = reactive({
  name: "",
  description: "",
  slug: "",
});
</script>

<template>
  <div class="space-y-6">
    <section class="rounded-3xl border border-default bg-linear-to-br from-neutral-950 via-neutral-900 to-neutral-800 p-6 text-white shadow-sm dark:from-neutral-100 dark:via-neutral-50 dark:to-white dark:text-neutral-950">
      <div class="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
        <div class="space-y-3">
          <UBadge color="neutral" variant="soft">Workspaces</UBadge>
          <div class="space-y-2">
            <h1 class="text-3xl font-semibold tracking-tight">Manage everything in one workspace</h1>
            <p class="max-w-2xl text-sm text-white/70 dark:text-neutral-600">Create workspace, browse projects, and move into boards with a clean overview first.</p>
          </div>
        </div>
        <UModal title="Modal with description" description="Lorem ipsum dolor sit amet, consectetur adipiscing elit.">
          <UButton icon="i-lucide-plus" label="New workspace" color="primary" class="self-start md:self-auto" />

          <template #body>
            <form class="space-y-3 w-full">
              <div>
                <UFormField label="Workspace">
                  <UInput placeholder="Nama workspace" highlight v-model="formCreateWorkspace.name" class="w-full" />
                </UFormField>
              </div>
              <div>
                <UFormField label="Description">
                  <UTextarea v-model="formCreateWorkspace.description" class="w-full" />
                </UFormField>
              </div>
              <div>
                <UButton label="Create" type="submit" />
              </div>
            </form>
          </template>
        </UModal>
      </div>
    </section>

    <UAlert v-if="!workspaces.length" title="No workspace yet" description="Create your first workspace to start organizing projects." icon="i-lucide-circle-alert" color="neutral" variant="soft" />

    <div v-else class="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
      <NuxtLink v-for="workspace in workspaces" :key="workspace.id" :to="`/workspaces/${workspace.id}`" class="group rounded-3xl border border-default bg-elevated p-5 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md">
        <div class="flex items-start justify-between gap-3">
          <div class="space-y-2">
            <div class="flex items-center gap-2">
              <h2 class="text-lg font-semibold">{{ workspace.name }}</h2>
              <UBadge color="neutral" variant="soft">{{ workspace.projects }} projects</UBadge>
            </div>
            <p class="text-sm text-muted">{{ workspace.description }}</p>
          </div>
          <UIcon name="i-lucide-arrow-up-right" class="size-5 text-muted transition group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
        </div>
        <div class="mt-6 flex items-center justify-between text-sm text-muted">
          <span>{{ workspace.members }} members</span>
          <span>Updated {{ workspace.updatedAt }}</span>
        </div>
      </NuxtLink>
    </div>
  </div>
</template>
