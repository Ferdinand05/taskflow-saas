<script setup lang="ts">
import type { NavigationMenuItem, DropdownMenuItem, SidebarProps } from "@nuxt/ui";

defineProps<Pick<SidebarProps, "variant" | "collapsible" | "side">>();

const open = ref(true);
const items: NavigationMenuItem[] = [
  { label: "Dashboard", icon: "i-lucide-layout-dashboard", to: "/", active: true },
  { label: "Workspaces", icon: "i-lucide-building-2", to: "/workspaces" },
  { label: "Projects", icon: "i-lucide-folder-kanban", to: "/projects" },
  { label: "Boards", icon: "i-lucide-columns-3", to: "/boards" },
  { label: "Tasks", icon: "i-lucide-square-check-big", to: "/tasks" },
  { label: "Activity Logs", icon: "i-lucide-activity", to: "/activity" },
];

const user = ref({
  name: "Benjamin Canac",
  avatar: { src: "https://github.com/benjamincanac.png", alt: "Benjamin Canac" },
});
const colorMode = useColorMode();
const userItems = computed<DropdownMenuItem[][]>(() => [
  [
    {
      label: "Appearance",
      icon: "i-lucide-sun-moon",
      children: [
        {
          label: "Light",
          icon: "i-lucide-sun",
          type: "checkbox",
          checked: colorMode.value === "light",
          onUpdateChecked(checked: boolean) {
            if (checked) colorMode.preference = "light";
          },
          onSelect(e: Event) {
            e.preventDefault();
          },
        },
        {
          label: "Dark",
          icon: "i-lucide-moon",
          type: "checkbox",
          checked: colorMode.value === "dark",
          onUpdateChecked(checked: boolean) {
            if (checked) colorMode.preference = "dark";
          },
          onSelect(e: Event) {
            e.preventDefault();
          },
        },
      ],
    },
  ],
  [{ label: "Log out", icon: "i-lucide-log-out" }],
]);
</script>

<template>
  <div class="flex flex-1" :class="[variant === 'inset' && 'bg-neutral-50 dark:bg-neutral-950', side === 'right' && 'flex-row-reverse']">
    <USidebar v-model:open="open" :variant="variant" collapsible="icon" :side="side" :ui="{ container: 'h-full' }" description="Boost your task flow">
      <template #header>
        <UIcon name="i-logos-nuxt-icon" class="size-8" />
      </template>
      <UNavigationMenu :items="items" orientation="vertical" :ui="{ link: 'p-1.5 overflow-hidden' }" />
      <template #footer>
        <UDropdownMenu :items="userItems" :content="{ align: 'center', collisionPadding: 12 }" :ui="{ content: 'w-(--reka-dropdown-menu-trigger-width) min-w-48' }">
          <UButton
            v-bind="user"
            :label="user?.name"
            trailing-icon="i-lucide-chevrons-up-down"
            color="neutral"
            variant="ghost"
            square
            class="w-full data-[state=open]:bg-elevated overflow-hidden"
            :ui="{ trailingIcon: 'text-dimmed ms-auto' }"
          />
        </UDropdownMenu>
      </template>
    </USidebar>

    <div
      class="flex-1 flex flex-col overflow-hidden lg:peer-data-[variant=floating]:my-4 peer-data-[variant=inset]:m-4 lg:peer-data-[variant=inset]:not-peer-data-[collapsible=offcanvas]:ms-0 peer-data-[variant=inset]:rounded-xl peer-data-[variant=inset]:shadow-sm peer-data-[variant=inset]:ring peer-data-[variant=inset]:ring-default bg-default"
    >
      <div class="h-(--ui-header-height) shrink-0 flex items-center px-4" :class="[variant !== 'floating' && 'border-b border-default', side === 'right' && 'justify-end']">
        <UButton :icon="side === 'left' ? 'i-lucide-panel-left' : 'i-lucide-panel-right'" color="neutral" variant="ghost" aria-label="Toggle sidebar" @click="open = !open" />
      </div>
      <div class="flex-1 overflow-auto p-4 md:p-6">
        <slot />
      </div>
    </div>
  </div>
</template>
