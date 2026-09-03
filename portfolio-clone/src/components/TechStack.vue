<script setup>
import { useI18n } from 'vue-i18n'

const { t } = useI18n()

const techItems = [
  { name: 'Python', slug: 'python', category: 'Backend' },
  { name: 'FastAPI', slug: 'fastapi', category: 'Backend' },
  { name: 'JavaScript', slug: 'javascript', category: 'Language' },
  { name: 'TypeScript', slug: 'typescript', category: 'Language' },
  { name: 'React', slug: 'react', category: 'Frontend' },
  { name: 'React Native', slug: 'react', category: 'Mobile' },
  { name: 'Vue.js', slug: 'vuedotjs', category: 'Frontend' },
  { name: 'Node.js', slug: 'nodedotjs', category: 'Backend' },
  { name: 'PostgreSQL', slug: 'postgresql', category: 'Database' },
  { name: 'Redis', slug: 'redis', category: 'Cache / DB' },
  { name: 'Docker', slug: 'docker', category: 'DevOps' },
  { name: 'GitHub Actions', slug: 'githubactions', category: 'CI/CD' },
  { name: 'Git', slug: 'git', category: 'Tooling' },
  { name: 'GitHub', slug: 'github', category: 'Tooling' },
  { name: 'Supabase', slug: 'supabase', category: 'Cloud DB' },
  { name: 'MQTT', slug: 'eclipsemosquitto', category: 'IoT Protocol' },
  { name: 'Tailwind CSS', slug: 'tailwindcss', category: 'CSS' },
  { name: 'Postman', slug: 'postman', category: 'Testing' }
]
</script>

<template>
  <section id="stack" class="animate-in-up-on-view container mx-auto max-w-3xl px-5 sm:px-6 py-6" aria-labelledby="tech-stack-heading">
    <div class="mb-4">
      <div class="mb-3 inline-flex items-center gap-2 rounded-xl border border-border/80 bg-card/60 px-3 py-2 text-xs font-medium text-foreground shadow-xl backdrop-blur-md">
        <span class="relative flex size-2">
          <span class="absolute inline-flex size-full animate-ping rounded-full bg-emerald-500 opacity-75"></span>
          <span class="relative inline-flex size-2 rounded-full bg-emerald-500"></span>
        </span>
        <span><strong>{{ t('workingOnLabel') }}</strong> {{ t('workingOnText') }}</span>
      </div>
      <h2 id="tech-stack-heading" class="font-bold text-xs uppercase tracking-[0.2em] text-secondary">
        {{ t('techStackHeading') }}
      </h2>
    </div>

    <!-- Dashed 52x52px Grid -->
    <div class="flex flex-wrap gap-3">
      <div
        v-for="tech in techItems"
        :key="tech.name"
        :title="`${tech.name} (${tech.category})`"
        class="group relative flex size-[52px] cursor-pointer items-center justify-center rounded-xl border border-dashed border-border/80 bg-card/60 transition-all duration-200 hover:border-foreground/30 hover:bg-card hover:scale-105 dark:border-border/60 dark:bg-neutral-900/60 dark:hover:bg-neutral-900"
      >
        <img 
          :src="`https://cdn.simpleicons.org/${tech.slug}`" 
          :alt="tech.name" 
          loading="lazy" 
          class="size-6 shrink-0 transition-transform duration-200 group-hover:scale-110 opacity-85 group-hover:opacity-100"
        />
        
        <!-- Subtle Floating Tooltip on Hover -->
        <span class="pointer-events-none absolute -bottom-7 left-1/2 -translate-x-1/2 whitespace-nowrap rounded bg-foreground text-background px-1.5 py-0.5 font-mono text-[10px] font-medium opacity-0 transition-opacity group-hover:opacity-100 z-20 shadow-md">
          {{ tech.name }}
        </span>
      </div>
    </div>
  </section>
</template>
