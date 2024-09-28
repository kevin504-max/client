<template>
  <n-config-provider :theme="theme" :theme-overrides="themeOverrides">
    <n-layout has-sider v-if="!hideSidebar">
      <SidebarMenu :initial-locale="locale" :user="currentUser" :theme="theme?.name" />
      <n-layout-content class="main">
        <HeaderMenu :key="currentUser" :initial-locale="locale" :user="currentUser"  @update-theme="updateTheme" @update-language="changeLanguage" />
        <router-view />
      </n-layout-content>
    </n-layout>
    <router-view v-else />
    <!-- Exibe o conteúdo sem o sidebar -->
  </n-config-provider>
</template>

<script setup>
import { computed, onMounted, provide, ref } from 'vue';

import { useRoute } from 'vue-router'; // Importa o useRoute para acessar as rotas
import { darkTheme } from 'naive-ui';

import HeaderMenu from './components/header-menu/HeaderMenu.vue';
import SidebarMenu from './components/sidebar-menu/SidebarMenu.vue';

import useDashboard from './hooks/useDashboard'
const { 
  registerType,
  updateType,
  removeType,
  fetchTypes,
  fetchUsers,
  registerUser,
  updateUser,
  removeUser,
  fetchCities,
  registerCity,
  updateCity,
  removeCity,
  fetchStates,
  registerState,
  updateState,
  removeState,
  fetchCollectionLocations,
  registerCollectionLocation,
  updateCollectionLocation,
  removeCollectionLocation,
  fetchDonations,
  registerDonation,
  updateDonation,
  removeDonation,
} = useDashboard()

const themeOverrides = ref({
  "common": {
    "primaryColor": "#df1036",
    "primaryColorHover": "#860920",
    "primaryColorPressed": "#690719",
  },
  "Progress": {
    "fillColor": "#df1036"
  },
});

// Detecta o idioma preferido do navegador
const detectedLocale = navigator.language.split('-')[0];
const locale = ref(detectedLocale);

// Definindo o tema padrão como claro
const theme = ref(null);

// Função para determinar se o sidebar deve ser oculto
const route = useRoute();
const hideSidebar = computed(() => route.meta.hideSidebar);

const currentUser = ref({
  name: 'Fernando Henrique',
  displayName: 'Fernando Henrique',
  email: 'fernando@aluno.ufop.edu.br',
});
const fetchedUsers = ref([]);
const fetchedTypes = ref([]);
const fetchedCities = ref([]);
const fetchedStates = ref([]);
const fetchedCollectionLocations = ref([]);
const fetchedDonations = ref([]);

onMounted(async () => {
  updateTheme('dark');

  locale.value = detectedLocale || 'pt';
  fetchedUsers.value = await fetchUsers();
  fetchedTypes.value = await fetchTypes();
  fetchedCities.value = await fetchCities();
  fetchedStates.value = await fetchStates();
  fetchedCollectionLocations.value = await fetchCollectionLocations();
  fetchedDonations.value = await fetchDonations();
});

provide('dashboard', {
  locale,
  currentUser,
  fetchedTypes,
  registerType,
  updateType,
  removeType,
  fetchedUsers,
  registerUser,
  updateUser,
  removeUser,
  updateUser,
  removeUser,
  fetchedCities,
  registerCity,
  updateCity,
  removeCity,
  fetchedStates,
  registerState,
  updateState,
  removeState,
  fetchedCollectionLocations,
  registerCollectionLocation,
  updateCollectionLocation,
  removeCollectionLocation,
  fetchedDonations,
  registerDonation,
  updateDonation,
  removeDonation,
});

/**
 * Função para atualizar o tema com base no evento emitido pelo SidebarMenu
 */
function updateTheme(selectedTheme) {
  theme.value = selectedTheme === 'dark' ? darkTheme : null;
}

/**
 * Função para alterar o idioma da aplicação
 */
function changeLanguage(lang) {
  locale.value = lang;
}
</script>

<style>
.n-layout-scroll-container {
  overflow-y: hidden;
}
.n-config-provider {
  height: 100vh;
  margin: 0;
  padding: 0;
}
.n-layout {
  height: 100%;
  margin: 0;
  padding: 0;
}
.main {
  padding: 0px;
}

.button {
  padding: 10px 20px;
  border: none;
  border-radius: 5px;
  background-color: #14d085;
  color: #fff;
  cursor: pointer;
  transition: background-color 0.3s;
}

.button:hover {
  background-color: #0e9e6f;
}

.button-primary {
  background-color: #14d085;
  transition: background-color 0.3s;
}

.button-primary:hover {
  background-color: #0e9e6f;
}

.button-secondary {
  background-color: #f5f5f5;
  border: 1.5px solid #14d085;
  color: #14d085;
  transition: background-color 0.3s;
}

.button-secondary:hover {
  background-color: #14d085;
  color: #fff;
}

.button-danger {
  background-color: #f44336;
  transition: background-color 0.3s;
}

.button-danger:hover {
  background-color: #d32f2f;
}
</style>