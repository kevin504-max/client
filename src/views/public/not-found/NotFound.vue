<template>
<n-result
  status="404"
  :title="$t('notfound.title')"
  :description="$t('notfound.description')"
>
  <template #footer>
    <n-button type="primary" @click="goHome">{{ $t('notfound.go_home') }}</n-button>
  </template>
</n-result>
</template>

<script setup>
import { useI18n } from 'vue-i18n';
import { useRouter } from 'vue-router';
import { NButton } from 'naive-ui';

const { t } = useI18n();
const router = useRouter();

// Função para redirecionar o usuário de volta à página inicial
function goHome() {
router.push('/');
}
</script>

<style scoped>
.n-result {
    padding: 20px;
    text-align: center;
}
</style>
