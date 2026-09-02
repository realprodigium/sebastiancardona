<script setup>
import { ref, onMounted } from 'vue'
import { useI18n } from 'vue-i18n'

const { t, locale } = useI18n()
const emit = defineEmits(['open-command-palette'])

// Theme Switcher Logic
const isDark = ref(true)

const toggleTheme = () => {
  isDark.value = !isDark.value
  if (isDark.value) {
    document.documentElement.classList.add('dark')
    localStorage.setItem('theme', 'dark')
  } else {
    document.documentElement.classList.remove('dark')
    localStorage.setItem('theme', 'light')
  }
}

// Language Switcher Logic
const toggleLanguage = () => {
  locale.value = locale.value === 'es' ? 'en' : 'es'
  localStorage.setItem('user-lang', locale.value)
}

onMounted(() => {
  const savedTheme = localStorage.getItem('theme')
  if (savedTheme === 'light') {
    isDark.value = false
    document.documentElement.classList.remove('dark')
  } else {
    isDark.value = true
    document.documentElement.classList.add('dark')
  }

  const savedLang = localStorage.getItem('user-lang')
  if (savedLang) {
    locale.value = savedLang
  }
})
</script>

<template>
  <header class="sticky top-0 z-50 w-full glass-header" role="banner">
    <div class="container mx-auto flex h-14 max-w-3xl items-center justify-between gap-4 px-4 sm:px-6">
      <!-- Monogram SC -->
      <a 
        href="#hero" 
        class="font-mono text-lg font-bold tracking-tight text-foreground hover:opacity-80 transition-opacity" 
        aria-label="Sebastián Cardona Home"
      >
        SC
      </a>

      <!-- Center & Right Navigation Group -->
      <div class="flex items-center gap-3 sm:gap-5">
        <nav class="hidden sm:flex items-center gap-4 text-sm font-medium sm:gap-5">
          <a href="#hero" class="text-secondary transition-colors hover:text-foreground">
            {{ t('navHome') }}
          </a>
          <a href="#about" class="text-secondary transition-colors hover:text-foreground">
            {{ t('navAbout') }}
          </a>
          <a href="#stack" class="text-secondary transition-colors hover:text-foreground">
            {{ t('navStack') }}
          </a>
          <a href="#projects" class="text-secondary transition-colors hover:text-foreground">
            {{ t('navProjects') }}
          </a>
          <a href="#activity" class="text-secondary transition-colors hover:text-foreground">
            {{ t('navActivity') }}
          </a>
        </nav>

        <!-- Command Palette Trigger Chip -->
        <button 
          type="button" 
          aria-label="Open command palette" 
          class="inline-flex h-8 items-center gap-2 rounded-full border border-border/70 bg-card/80 px-2.5 sm:px-3 text-xs sm:text-sm text-secondary shadow-sm transition-colors hover:border-foreground/20 hover:text-foreground"
          @click="emit('open-command-palette')"
        >
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256" fill="currentColor" class="size-3.5 sm:size-4">
            <path d="M232.49,215.51,185,168a92.12,92.12,0,1,0-17,17l47.53,47.54a12,12,0,0,0,17-17ZM44,112a68,68,0,1,1,68,68A68.07,68.07,0,0,1,44,112Z"/>
          </svg>
          <span class="hidden items-center gap-1 sm:inline-flex">
            <kbd class="inline-flex h-5 min-w-5 items-center justify-center rounded border border-border/80 bg-muted px-1 font-mono text-[10px]">⌘</kbd>
            <kbd class="inline-flex h-5 min-w-5 items-center justify-center rounded border border-border/80 bg-muted px-1 font-mono text-[10px]">K</kbd>
          </span>
        </button>

        <div class="h-4 w-px bg-border/60 hidden sm:block"></div>

        <!-- Language Switcher Pill Button -->
        <button 
          type="button" 
          class="inline-flex h-8 items-center justify-center rounded-lg border border-border/70 bg-card/70 px-2 font-mono text-xs font-semibold text-secondary transition-colors hover:bg-muted hover:text-foreground"
          @click="toggleLanguage"
          :title="locale === 'es' ? 'Switch to English' : 'Cambiar a Español'"
        >
          {{ locale.toUpperCase() }}
        </button>

        <!-- Theme Toggle (Dark / Light) -->
        <button 
          type="button" 
          class="inline-flex size-8 items-center justify-center rounded-lg border border-border/70 text-secondary transition-colors hover:bg-muted hover:text-foreground"
          @click="toggleTheme"
          aria-label="Toggle dark/light mode"
        >
          <!-- Moon Icon (Dark Mode Active) -->
          <svg v-if="isDark" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256" fill="currentColor" class="size-4">
            <path d="M233.54,142.23a8,8,0,0,0-8-2,88.08,88.08,0,0,1-109.8-109.8,8,8,0,0,0-10-10,104.84,104.84,0,0,0-52.91,37A104,104,0,0,0,136,224a103.09,103.09,0,0,0,62.52-21.12,104.75,104.75,0,0,0,37-52.92A8,8,0,0,0,233.54,142.23Z"/>
          </svg>
          <!-- Sun Icon (Light Mode Active) -->
          <svg v-else xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256" fill="currentColor" class="size-4">
            <path d="M120,40V16a8,8,0,0,1,16,0V40a8,8,0,0,1-16,0Zm72,88a64,64,0,1,1-64-64A64.07,64.07,0,0,1,192,128Zm-16,0a48,48,0,1,0-48,48A48.05,48.05,0,0,0,176,128ZM58.34,69.66a8,8,0,0,0,11.32-11.32l-16-16A8,8,0,0,0,42.34,53.66Zm0,116.68-16,16a8,8,0,0,0,11.32,11.32l16-16a8,8,0,0,0-11.32-11.32ZM197.66,58.34a8,8,0,0,0-11.32,11.32l16,16a8,8,0,0,0,11.32-11.32Zm-11.32,128a8,8,0,0,0,11.32,11.32l16-16a8,8,0,0,0-11.32-11.32ZM136,216a8,8,0,0,0-16,0v24a8,8,0,0,0,16,0Zm-96-88a8,8,0,0,0-8-8H8a8,8,0,0,0,0,16H32A8,8,0,0,0,40,128Zm208-8H224a8,8,0,0,0,0,16h24a8,8,0,0,0,0-16Z"/>
          </svg>
        </button>
      </div>
    </div>
  </header>
</template>
