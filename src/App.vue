<template>
  <n-config-provider :theme-overrides="themeOverrides">
    <n-layout-content class="main">
      <router-view />
    </n-layout-content>
  </n-config-provider>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue';

const themeOverrides = ref({
  "common": {
    "primaryColor": "#df1036",
    "primaryColorHover": "#860920",
    "primaryColorPressed": "#690719",
  }
});

// Detecta o idioma preferido do navegador
const detectedLocale = navigator.language.split('-')[0];
const locale = ref(detectedLocale);

onMounted(() => {
  locale.value = detectedLocale || 'pt';
});
</script>

<style>
::-webkit-scrollbar {
  width: 4px;
}

::-webkit-scrollbar-thumb {
  background-color: #df1036;
  border-radius: 10px;
} 

::-webkit-scrollbar-thumb:hover {
  background-color: rgba(255, 1, 5, 0.5);
}
</style>