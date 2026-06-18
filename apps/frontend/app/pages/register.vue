<script setup lang="ts">
import type { AuthFormField } from "@nuxt/ui";

const fields = ref<AuthFormField[]>([
  {
    name: "name",
    type: "text",
    label: "Name",
    required: true,
  },
  {
    name: "email",
    type: "text",
    label: "Email",
    required: true,
  },
  {
    name: "password",
    type: "password",
    label: "Password",
    required: true,
  },
  {
    name: "password_confirmation",
    type: "password",
    label: "Password Confirmation",
    required: true,
  },
]);
</script>

<template>
  <div class="min-h-dvh bg-neutral-50 px-4 py-6 dark:bg-neutral-950">
    <div class="mx-auto flex min-h-[calc(100dvh-3rem)] max-w-5xl items-center">
      <div class="grid w-full gap-8 lg:grid-cols-[0.95fr_1.05fr] lg:items-center">
        <section class="order-2 lg:order-1">
          <UPageCard class="w-full border border-default bg-elevated/90 p-2 shadow-sm backdrop-blur">
            <UAuthForm title="Register" description="Please enter your information in the fields below" icon="i-lucide-circle-user" :fields="fields" class="max-w-none" />
          </UPageCard>
        </section>

        <section class="order-1 space-y-6 rounded-3xl border border-default bg-gradient-to-br from-neutral-950 via-neutral-900 to-neutral-800 p-8 text-white shadow-sm dark:from-neutral-100 dark:via-neutral-50 dark:to-white dark:text-neutral-950 lg:order-2">
          <UBadge color="neutral" variant="soft">TaskFlow SaaS</UBadge>
          <div class="space-y-3">
            <h1 class="text-4xl font-semibold tracking-tight">Create your account</h1>
            <p class="max-w-xl text-sm text-white/70 dark:text-neutral-600">Start a clean workspace for project planning, task tracking, and team collaboration.</p>
          </div>
          <p class="text-sm text-white/55 dark:text-neutral-500">Simple onboarding, focused design, and ready for your workflow.</p>
        </section>
      </div>
    </div>
  </div>
</template>
