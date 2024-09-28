<template>
  <n-space vertical size="large" class="settings-container">
    <n-card :title="t('pages.settings.title')" size="large">
      <!-- Foto e informações do usuário -->
      <n-space vertical size="medium" class="contedo-settings-box" v-if="currentUser">
        <n-space align="center">
          <n-avatar size="large">{{ currentUser.email.charAt(0).toUpperCase() }}</n-avatar>
          <n-button circle size="small">
            <i class="fa fa-camera"></i>
          </n-button>
          <n-space vertical>
            <n-text strong>{{ currentUser.name }}</n-text>
            <n-text type="secondary"> {{ currentUser.email }} </n-text>
          </n-space>
        </n-space>

        <n-spin 
          size="large"
          v-show="true" 
        />

        <!-- Alteração de informações pessoais -->
        <n-space vertical>
          <n-input label="Nome" v-model:value="userName" placeholder="Nome" />
          <n-input label="E-mail" v-model:value="userEmail" placeholder="Email" />
          <!-- Senha -->
          <n-button type="info" ghost icon="lock" @click="console.log('Alterar senha')">
            {{ t('pages.settings.reset_password') }}
          </n-button>

          <!-- Botão de salvar alterações -->
          <n-button type="primary" class="footer-button" @click="showModal = true">
            {{ t('pages.settings.save_changes') }}
          </n-button>
        </n-space>
      </n-space>
    </n-card>
    
    <!-- Modal de confirmação de alterações -->
    <n-modal
      v-model:show="showModal"
      :title="t('pages.settings.modal_title')"
      preset="dialog"
      style="width: 50%"
      :positive-text="t('pages.settings.modal_confirm')"
      :negative-text="t('pages.settings.modal_cancel')"
      @positive-click="showModal = false"
      @negative-click="showModal = false"
    >
      <n-space vertical>
        <n-label>{{ t('pages.settings.modal_email') }}</n-label>
        <n-input v-model:value="currentUser.email" placeholder="E-mail" disabled />
        <n-label>{{ t('pages.settings.modal_password') }}</n-label>
        <n-input type="password" v-model:value="confirmPassword" placeholder="Senha" />
      </n-space>
    </n-modal>
  </n-space>

</template>

<script setup>
import { inject, ref } from 'vue';
import { useI18n } from 'vue-i18n';

const { t } = useI18n();

const { currentUser } = inject('dashboard');

const showModal = ref(false);

const oportunitiesByCompany = ref([]);

const userName = ref('');
const userEmail = ref('');
const confirmPassword = ref('');
</script>

<style scoped>
.settings-container {
  padding: 16px;
  height: 90%;
  overflow-y: auto;
}
.contedo-settings-box {
  padding: 16px;
}

.user-config-plano {
  margin-top: 24px;
}

.footer-button {
  margin-top: 24px;
  float: right;
}
</style>