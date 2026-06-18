<script setup lang="ts">
import type { AuthFormField } from "@nuxt/ui";

const fields = ref<AuthFormField[]>([
  {
    name: "email",
    type: "text",
    label: "Email",
  },
  {
    name: "password",
    type: "password",
    label: "Password",
  },
]);
</script>

<template>
  <div class="min-h-dvh bg-neutral-50 px-4 py-6 dark:bg-neutral-950">
    <div class="mx-auto flex min-h-[calc(100dvh-3rem)] max-w-5xl items-center">
      <div class="grid w-full gap-8 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
        <section class="space-y-6 rounded-3xl border border-default bg-gradient-to-br from-neutral-950 via-neutral-900 to-neutral-800 p-8 text-white shadow-sm dark:from-neutral-100 dark:via-neutral-50 dark:to-white dark:text-neutral-950">
          <UBadge color="neutral" variant="soft">TaskFlow SaaS</UBadge>
          <div class="space-y-3">
            <h1 class="text-4xl font-semibold tracking-tight">Sign in to your workspace</h1>
            <p class="max-w-xl text-sm text-white/70 dark:text-neutral-600">A minimal entry point for managing workspaces, projects, and boards.</p>
          </div>
          <p class="text-sm text-white/55 dark:text-neutral-500">Modern project management, clean UI, and focused workflow.</p>
        </section>

        <section>
          <UPageCard class="w-full border border-default bg-elevated/90 p-2 shadow-sm backdrop-blur">
            <UAuthForm title="Login" description="Enter your credentials to access your account." icon="i-lucide-user" :fields="fields" class="max-w-none" />
          </UPageCard>
        </section>
      </div>
    </div>
  </div>
</template>
