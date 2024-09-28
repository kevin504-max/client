<template>
  <n-card class="dashboard-card">
    <div class="dashboard-header">
      <n-space vertical>
        <n-h1>{{ t('pages.dashboard.title') }}</n-h1>
        <n-h3>{{ 
          new Date().toLocaleDateString(`${locale}-BR`, {
            weekday: 'long',
            year: 'numeric',
            month: 'long',
            day: 'numeric',
          }).toUpperCase()
        }}</n-h3>
      </n-space>
    </div>
    
    <n-space wrap justify="space-between">
      <n-card :title="t('pages.dashboard.schedule')" class="statistics-card">
        <n-space>
          <n-statistic :label="t('pages.dashboard.statistics.this_week')" :value="fetchedDonations.byPeriod?.essaSemana || 0" suffix="Doações" />
          <img 
            :src="'https://api.iconify.design/bxs/bar-chart-alt-2.svg?color=%23' + (fetchedDonations.byPeriod?.essaSemana > fetchedDonations.byPeriod?.ultimaSemana ? '00a89c' : 'ff4d4f')" 
            alt="statistic" 
          />
          <n-statistic :label="t('pages.dashboard.statistics.last_week')" :value="fetchedDonations.byPeriod?.ultimaSemana || 0" suffix="Doações" />
          <img 
            :src="'https://api.iconify.design/bxs/bar-chart-alt-2.svg?color=%23' + (fetchedDonations.byPeriod?.ultimaSemana > fetchedDonations.byPeriod?.essaSemana ? '00a89c' : 'ff4d4f')"
            alt="statistic" 
          />
          <n-statistic :label="t('pages.dashboard.statistics.this_month')" :value="fetchedDonations.byPeriod?.esseMes || 0" suffix="Doações" />
          <img 
            :src="'https://api.iconify.design/bxs/bar-chart-alt-2.svg?color=%23' + (fetchedDonations.byPeriod?.esseMes > fetchedDonations.byPeriod?.ultimoMes ? '00a89c' : 'ff4d4f')"
            alt="statistic" 
          />
          <n-statistic :label="t('pages.dashboard.statistics.last_month')" :value="fetchedDonations.byPeriod?.ultimoMes || 0" suffix="Doações" />
          <img 
            :src="'https://api.iconify.design/bxs/bar-chart-alt-2.svg?color=%23' + (fetchedDonations.byPeriod?.ultimoMes > fetchedDonations.byPeriod?.esseAno ? '00a89c' : 'ff4d4f')"
            alt="statistic" 
          />
        </n-space>
      </n-card>
      
      <n-card :title="t('pages.dashboard.meetings')">
        <n-space vertical>
          <n-statistic :value="t('pages.dashboard.meetings_proportion', {total: fetchedDonations.length, avg: fetchedDonations.length / 2 || '-'})
          " :label="t('pages.dashboard.meetings_count')" />
          <div class="progress-bar-background">
            <n-progress :percentage="Math.round((fetchedDonations?.length / (fetchedDonations.length / 2)) * 100)" />
          </div>
          <div class="status-section">
            <img
            alt="status"
            src="https://res.cloudinary.com/dd9puomgu/image/upload/v1695141867/d1caokjvqllbn3uweqim.svg"
            class="status-image"
            />
            <n-text>
              {{ t('pages.dashboard.meetings_description') }}
            </n-text>
          </div>
        </n-space>
      </n-card>
    </n-space>
    
    <n-card v-if="paginatedDonations.length" :title="t('pages.dashboard.last_contacts')" class="last-meetings-card">
      <n-space vertical>
        <n-card v-for="donation in paginatedDonations" :key="donation" class="contact-card">
          <n-space>
            <n-avatar
            round
            :size="45"
            src="data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIxZW0iIGhlaWdodD0iMWVtIiB2aWV3Qm94PSIwIDAgMTI4IDEyOCI+PHBhdGggZmlsbD0iI2U1MzIyZSIgZD0iTTg4LjA0IDQ0LjI2Qzc1LjQ0IDI4LjgxIDY5Ljg3IDE1LjY3IDY2LjY4IDcuODNjLTEuMDEtMi40Ny00LjM2LTIuNDctNS4zNiAwYy0zLjE5IDcuODQtOC43NiAyMC45OC0yMS4zNiAzNi40M2MtNy44OSA5LjY4LTE1LjY3IDIzLjg1LTE1LjY3IDM3LjgxYzAgMjMuODIgMTcuMTkgMzkuOTUgMzkuNzEgMzkuOTVzMzkuNzEtMTYuMTQgMzkuNzEtMzkuOTVjMC0xNC41MS03Ljc4LTI4LjEzLTE1LjY3LTM3LjgxIi8+PHBhdGggZmlsbD0iI2ZmNjA1MCIgZD0iTTc0Ljk4IDc5Ljg0YzYuMzUtMTIuMDggNS40NS0yMy45IDEwLjQ3LTIxLjc3YzYuODIgMi45MSAxNC4zNyAxNy44NiAxMS41NCAzMS40MWMtMi4wMiA5LjY2LTguNTQgMTUuNTEtMTYuODUgMTIuNzJjLTYuNzEtMi4yNS0xMC44OC0xMS40OC01LjE2LTIyLjM2Ii8+PC9zdmc+"
            />
            <n-space vertical>
              <n-text strong>{{ donation.pessoa?.nome || ' - ' }}</n-text>
              <n-text strong>{{ donation.localColeta?.nome || ' - ' }}</n-text>
              <n-text secondary>
                {{ 
                  new Date(donation.data).toLocaleDateString(`en-BR`, {
                    weekday: 'long',
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric',
                  }) 
                }}
              </n-text>
            </n-space>
          </n-space>
        </n-card>
      </n-space>
      
      <n-space justify="flex-end">
        <n-pagination
        v-model:page="currentPage"
        :page-size="pageSize"
        :item-count="fetchedDonations.length"
        @update:page="handlePageChange"  
        />
      </n-space>
    </n-card>
  </n-card>
</template>

<script setup>
import { inject, ref, computed } from 'vue';
import { useI18n } from 'vue-i18n';
const { t } = useI18n();

const { locale, fetchedDonations } = inject('dashboard');

const currentPage = ref(1);
const pageSize = ref(5);

const paginatedDonations = computed(async () => {
  const start = (currentPage.value - 1) * pageSize.value;
  const end = start + pageSize.value;
  
  return fetchedDonations.value.slice(start, end);
});

const handlePageChange = (page) => currentPage.value = page;
</script>

<style scoped>
.n-card {
  margin-bottom: 20px;
  overflow-y: auto;
  height: 100%;
}

.status-section {
  display: flex;
  align-items: center;
  gap: 20px;
}
</style>