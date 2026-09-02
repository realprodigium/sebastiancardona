<script setup>
import { useI18n } from 'vue-i18n'

const { t, tm } = useI18n()
</script>

<template>
  <section id="projects" class="animate-in-up-on-view container mx-auto max-w-3xl px-5 sm:px-6 py-6" aria-labelledby="projects-heading">
    <div class="mb-4 flex items-end justify-between gap-4">
      <div>
        <h2 id="projects-heading" class="font-bold text-xs uppercase tracking-[0.2em] text-secondary">
          {{ t('projectsHeading') }}
        </h2>
      </div>
      <a 
        href="https://github.com/sebastiansaintt" 
        target="_blank" 
        rel="noopener noreferrer" 
        class="shrink-0 font-mono text-xs uppercase tracking-wider text-secondary transition-colors hover:text-foreground inline-flex items-center gap-1"
      >
        <span>{{ t('viewGithub') }}</span>
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256" class="size-3.5" fill="currentColor">
          <path d="M200,64V168a8,8,0,0,1-16,0V83.31L69.66,197.66a8,8,0,0,1-11.32-11.32L172.69,72H88a8,8,0,0,1,0-16H192A8,8,0,0,1,200,64Z"/>
        </svg>
      </a>
    </div>

    <!-- 2-Column Responsive Card Grid -->
    <div class="grid gap-5 sm:grid-cols-2">
      <article 
        v-for="project in tm('projects')" 
        :key="project.id" 
        class="group flex flex-col overflow-hidden rounded-2xl border border-border/80 bg-card/80 shadow-sm transition-all duration-300 hover:border-foreground/25 backdrop-blur-sm"
      >
        <!-- Project Screenshot Container with Hover Zoom -->
        <div class="relative mx-4 mt-4 flex aspect-[16/10] sm:aspect-[2/1] items-center justify-center overflow-hidden rounded-xl bg-muted">
          <img 
            :src="project.preview" 
            :alt="project.title" 
            loading="lazy" 
            class="size-full object-cover object-top transition-transform duration-300 group-hover:scale-[1.02]"
          />
        </div>

        <!-- Project Details -->
        <div class="flex flex-1 flex-col p-4 pt-3">
          <div class="flex items-start justify-between gap-3">
            <div>
              <span class="font-mono text-[10px] font-semibold text-secondary uppercase tracking-wider block mb-0.5">
                {{ project.badge }}
              </span>
              <h3 class="text-base font-bold tracking-tight text-foreground sm:text-lg">
                {{ project.title }}
              </h3>
            </div>

            <!-- GitHub Repo Action -->
            <a 
              v-if="project.github_link" 
              :href="project.github_link" 
              target="_blank" 
              rel="noopener noreferrer" 
              class="rounded-md p-1.5 text-secondary transition-colors hover:bg-muted hover:text-foreground shrink-0"
              :aria-label="`${project.title} on GitHub`"
            >
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256" fill="currentColor" class="size-4">
                <path d="M208.31,75.68A59.78,59.78,0,0,0,202.93,28,8,8,0,0,0,196,24a59.75,59.75,0,0,0-48,24H124A59.75,59.75,0,0,0,76,24a8,8,0,0,0-6.93,4,59.78,59.78,0,0,0-5.38,47.68A58.14,58.14,0,0,0,56,104v8a56.06,56.06,0,0,0,48.44,55.47A39.8,39.8,0,0,0,96,192v8H72a24,24,0,0,1-24-24A40,40,0,0,0,8,136a8,8,0,0,0,0,16,24,24,0,0,1,24,24,40,40,0,0,0,40,40H96v16a8,8,0,0,0,16,0V192a24,24,0,0,1,48,0v40a8,8,0,0,0,16,0V192a39.8,39.8,0,0,0-8.44-24.53A56.06,56.06,0,0,0,216,112v-8A58.14,58.14,0,0,0,208.31,75.68ZM200,112a40,40,0,0,1-40,40H112a40,40,0,0,1-40-40v-8a41.74,41.74,0,0,1,6.9-22.48A8,8,0,0,0,80,73.83a43.81,43.81,0,0,1,.79-33.58,43.88,43.88,0,0,1,32.32,20.06A8,8,0,0,0,119.82,64h32.35a8,8,0,0,0,6.74-3.69,43.87,43.87,0,0,1,32.32-20.06A43.81,43.81,0,0,1,192,73.83a8.09,8.09,0,0,0,1,7.65A41.72,41.72,0,0,1,200,104Z"/>
              </svg>
            </a>
          </div>

          <p class="mt-2 flex-1 text-xs sm:text-sm leading-relaxed text-secondary line-clamp-3">
            {{ project.description }}
          </p>

          <!-- Tech Tag Badges -->
          <div class="mt-4 flex flex-wrap gap-1.5 pt-1">
            <span 
              v-for="(tech, tIdx) in project.technologies" 
              :key="tIdx"
              class="inline-flex items-center gap-1 rounded-md border border-border/70 bg-background/50 px-2 py-0.5 font-mono text-[10px] text-secondary"
            >
              {{ tech }}
            </span>
          </div>
        </div>
      </article>
    </div>
  </section>
</template>
