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
  <div class="min-h-dvh flex items-center justify-center p-4">
    <UPageCard class="w-full max-w-md">
      <UAuthForm title="Register" description="Please enter your information in the fields below" icon="i-lucide-circle-user" :fields="fields" class="max-w-md" />
    </UPageCard>
  </div>
</template>
