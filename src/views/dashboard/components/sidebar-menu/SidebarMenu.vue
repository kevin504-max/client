<template>
  <n-layout-sider bordered collapse-mode="width" :collapsed-width="64">
    <div class="logo-container">
      <img
        :src="theme === 'dark' ? 'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIxZW0iIGhlaWdodD0iMWVtIiB2aWV3Qm94PSIwIDAgMTI4IDEyOCI+PHBhdGggZmlsbD0iI2U1MzIyZSIgZD0iTTg4LjA0IDQ0LjI2Qzc1LjQ0IDI4LjgxIDY5Ljg3IDE1LjY3IDY2LjY4IDcuODNjLTEuMDEtMi40Ny00LjM2LTIuNDctNS4zNiAwYy0zLjE5IDcuODQtOC43NiAyMC45OC0yMS4zNiAzNi40M2MtNy44OSA5LjY4LTE1LjY3IDIzLjg1LTE1LjY3IDM3LjgxYzAgMjMuODIgMTcuMTkgMzkuOTUgMzkuNzEgMzkuOTVzMzkuNzEtMTYuMTQgMzkuNzEtMzkuOTVjMC0xNC41MS03Ljc4LTI4LjEzLTE1LjY3LTM3LjgxIi8+PHBhdGggZmlsbD0iI2ZmNjA1MCIgZD0iTTc0Ljk4IDc5Ljg0YzYuMzUtMTIuMDggNS40NS0yMy45IDEwLjQ3LTIxLjc3YzYuODIgMi45MSAxNC4zNyAxNy44NiAxMS41NCAzMS40MWMtMi4wMiA5LjY2LTguNTQgMTUuNTEtMTYuODUgMTIuNzJjLTYuNzEtMi4yNS0xMC44OC0xMS40OC01LjE2LTIyLjM2Ii8+PC9zdmc+' : 'https://flashvolve.com/images/Logo-growth_baixa.svg'"
        alt="Logo"
        class="logo"
      />

      <n-text strong>
        {{ t('menu.logo_text') }}
      </n-text>
    </div>

    <div>
      <n-menu
        :options="menuOptions"
        v-model:value="selectedKey"
        @update:value="navigate"
      />
    </div>

    <!-- Opções de admin públicas -->
    <div>
      <n-divider title-placement="left">
        Admin
      </n-divider>

      <n-menu
        :options="adminMenuOptions"
        v-model:value="selectedKey"
        @update:value="navigate"
      />
    </div>

  </n-layout-sider>
</template>

<script setup>
import { h, ref, computed, defineProps } from 'vue';
import { useRouter } from 'vue-router';
import { useI18n } from 'vue-i18n';

const { t } = useI18n();
const router = useRouter();
const selectedKey = ref('/dashboard');

const props = defineProps({
  user: {
    type: Object,
    required: true,
  },
  theme: {
    type: String,
    required: true,
  },
});

/**
 * Define as opções de menu como reativas
 */
const menuOptions = computed(() => [
  {
    label: t('menu.dashboard'),
    key: '/dashboard/dashboard',
    icon: () => h('i', { class: 'fa fa-gauge' }),
  },
  {
    label: t('menu.settings'),
    key: '/dashboard/settings',
    icon: () => h('i', { class: 'fa fa-cogs' }),
  },
]);

/**
 * Define as opções de menu do administrador como reativas
 */

const adminMenuOptions = computed(() => [
  {
    label: t('menu.cities'),
    key: '/dashboard/admin/cities',
    icon: () => h('i', { class: 'fa fa-building' }),
  },  
  {
    label: t('menu.donations'),
    key: '/dashboard/admin/donations',
    icon: () => h('i', { class: 'fa fa-heart-pulse' }),
  },
  {
    label: t('menu.states'),
    key: '/dashboard/admin/states',
    icon: () => h('i', { class: 'fa fa-flag' }),
  },
  {
    label: t('menu.collection_locations'),
    key: '/dashboard/admin/collection_locations',
    icon: () => h('i', { class: 'fa fa-location-dot' }),
  },
  {
    label: t('menu.users'),
    key: '/dashboard/admin/users',
    icon: () => h('i', { class: 'fa fa-users' }),
  },
  {
    label: t('menu.types'),
    key: '/dashboard/admin/types',
    icon: () => h('i', { class: 'fa fa-droplet' }),
  },
]);

/**
 * Navega para a rota selecionada
 */
function navigate(key) {
  if (key) {
    router.push(key);
  } else {
    console.error('Chave de navegação inválida:', key);
  }
}
</script>

<style scoped>
.logo-container {
  display: flex;
  justify-content: space-between;
  padding: 20px;
  text-align: center;
}

.n-text {
  margin-top: 10px;
  font-size: 16px;
}

.logo {
  width: 50px;
  height: 50px;
  height: auto;
}

.n-button {
  display: flex;
  align-items: center;
}
</style>
