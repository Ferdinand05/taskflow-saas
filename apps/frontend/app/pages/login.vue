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
  <div class="min-h-dvh flex items-center justify-center p-4">
    <UPageCard class="w-full max-w-md">
      <UAuthForm title="Login" description="Enter your credentials to access your account." icon="i-lucide-user" :fields="fields" class="max-w-md" />
    </UPageCard>
  </div>
</template>
