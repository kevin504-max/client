<template>
    <n-layout-header>
        <div class="header-menu">
            <div class="language-switcher">
                <n-dropdown
                :options="languageOptions"
                trigger="click"
                @select="changeLanguage"
                >
                <n-button>
                    <img
                    :src="currentFlagUrl"
                    class="flag-icon"
                    alt="Current Language Flag"
                    />
                </n-button>
            </n-dropdown>
        </div>
        
        <div class="theme-switcher" :key="theme">
            <n-dropdown :options="themeOptions" trigger="click" @select="changeTheme">
                <n-button>
                    <i :class="currentThemeIcon" style="margin-right: 8px;"></i> {{ currentThemeLabel }}
                </n-button>
            </n-dropdown>
        </div>
        
        <div class="profile-content" v-if="props.user">
            <n-space align="center">
                <n-avatar size="large">{{ props.user.email.charAt(0).toUpperCase() }}</n-avatar>
                
                <n-space vertical>
                    <n-text strong>
                        {{ t('menu.welcome', { name: props.user.name }) }}
                    </n-text>
                    <n-text type="secondary">{{ props.user.email }}</n-text>
                </n-space>
                
                <n-space>
                    <n-button circle size="small" @click="handleLogout">
                        <i class="fa fa-sign-out"></i>
                    </n-button>
                </n-space>
            </n-space>
        </div>
    </div>
</n-layout-header>
</template>

<script setup>
import { h, computed, ref, defineEmits, defineProps } from 'vue';
import { darkTheme } from 'naive-ui';
import { useRouter } from 'vue-router';
import { useI18n } from 'vue-i18n';

const { t, locale } = useI18n();

const router = useRouter();

const emit = defineEmits(['updateTheme, updateLanguage']);

const props = defineProps({
    initialLocale: {
        type: String,
        required: true,
    },
    user: {
        type: Object,
        required: true,
    },
});

locale.value = props.initialLocale;

const languages = {
    en: {
        label: 'English',
        flagUrl: 'https://goodies.icons8.com/web/common/header/flags/us.svg',
    },
    pt: {
        label: 'Português',
        flagUrl: 'https://goodies.icons8.com/web/common/header/flags/br.svg',
    },
    es: {
        label: 'Español',
        flagUrl: 'https://goodies.icons8.com/web/common/header/flags/es.svg',
    },
};

const languageOptions = Object.keys(languages).map((key) => ({
    label: languages[key].label,
    key,
}));

const changeLanguage = (lang) => {
    if (languages[lang]) {
        locale.value = lang;
        emit('updateLanguage', lang); // Emite o evento para o App.vue
    } else {
        console.error(`Idioma desconhecido: ${lang}`);
    }
};

const currentFlagUrl = computed(() => {
    return languages[locale.value]?.flagUrl || '';
});

const currentLanguageLabel = computed(() => {
    return languages[locale.value]?.label || '';
});

const theme = ref(null);

const changeTheme = (themeKey) => {
    if (themeKey === 'dark' || themeKey === 'light') {
        theme.value = themeKey === 'dark' ? darkTheme : null;
        emit('updateTheme', themeKey); // Emite o evento para o App.vue
    } else {
        console.error(`Tema desconhecido: ${themeKey}`);
    }
}

const currentThemeIcon = computed(() =>
theme.value?.name === darkTheme.name ? 'fa fa-moon' : 'fa fa-sun'
);

const currentThemeLabel = computed(() =>
theme.value?.name === darkTheme.name ? t('menu.dark_theme') : t('menu.light_theme')
);

const themeOptions = [
{
    label: t('menu.light_theme'),
    key: 'light',
    icon: () => h('i', { class: 'fa fa-sun' }),
},
{
    label: t('menu.dark_theme'),
    key: 'dark',
    icon: () => h('i', { class: 'fa fa-moon' }),
},
];

const handleLogout = () => console.log('Logout');
</script>

<style scoped>
.header-menu {
    display: flex;
    justify-content: flex-end;
    align-items: center;
}

.language-switcher {
    margin: 16px;
}

.theme-switcher {
    margin: 16px;
}

.profile-content {
    display: flex;
    justify-content: flex-end;
    align-items: flex-end;
    margin: 16px;
}

.flag-icon {
    width: 20px;
    height: 20px;
}
</style>