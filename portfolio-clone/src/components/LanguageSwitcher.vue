<script setup>
import { useI18n } from 'vue-i18n'

const { locale } = useI18n()

const toggleLanguage = () => {
  locale.value = locale.value === 'en' ? 'es' : 'en'
}
</script>

<template>
  <button 
    @click="toggleLanguage" 
    class="lang-btn magnetic interactive" 
    aria-label="Toggle language"
  >
    <span :class="{ active: locale === 'en' }">EN</span>
    <span class="divider">/</span>
    <span :class="{ active: locale === 'es' }">ES</span>
  </button>
</template>

<style scoped>
.lang-btn {
  background: rgba(255, 255, 255, 0.03);
  border: 1px solid var(--border-color);
  border-radius: var(--radius-sm);
  padding: 0.3rem 0.6rem;
  color: var(--text-dim);
  cursor: pointer;
  font-family: inherit;
  font-size: 0.72rem;
  font-weight: 600;
  letter-spacing: 0.04em;
  display: inline-flex;
  align-items: center;
  gap: 0.3rem;
  transition: border-color 0.15s ease, color 0.15s ease, background 0.15s ease;
}

.lang-btn:hover {
  border-color: var(--border-focus);
  background: rgba(255, 255, 255, 0.06);
  color: var(--text-color);
}

.active {
  color: #ffffff;
  font-weight: 700;
}

.divider {
  opacity: 0.25;
  font-weight: 400;
}
</style>
