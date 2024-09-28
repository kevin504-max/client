<template>
  <n-layout-sider bordered collapse-mode="width" :collapsed-width="64">
    <div class="logo-container">
      <img
        :src="theme === 'dark' ? 'https://growth.flashvolve.com.br/logo_growth.svg' : 'https://flashvolve.com/images/Logo-growth_baixa.svg'"
        alt="Logo"
        class="logo"
      />
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
  padding: 20px;
  text-align: center;
}

.logo {
  max-width: 100%;
  height: auto;
}

.n-button {
  display: flex;
  align-items: center;
}
</style>
