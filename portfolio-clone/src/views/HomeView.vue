<script setup>
import { useI18n } from 'vue-i18n'
import LanguageSwitcher from '../components/LanguageSwitcher.vue'
import { ref, computed, onMounted, onUnmounted, nextTick, watch } from 'vue'
import { 
  ArrowDown, 
  ExternalLink, 
  Download,
  Menu,
  X as CloseIcon
} from 'lucide-vue-next'

const { t, tm, locale } = useI18n()

const cvLink = computed(() => {
  return locale.value === 'es'
    ? { href: '/Ingeniero_de_Software_Sebastián_Cardona.pdf', download: 'Ingeniero_de_Software_Sebastián_Cardona.pdf' }
    : { href: '/CV_Sebastian_Cardona_EN.pdf', download: 'Software_Engineer_Sebastian_Cardona.pdf' }
})

const isMenuOpen = ref(false)
const toggleMenu = () => {
  isMenuOpen.value = !isMenuOpen.value
}
const closeMenu = () => {
  isMenuOpen.value = false
}

const scrollY = ref(0)
const onScroll = () => {
  scrollY.value = window.scrollY
}

const mouseX = ref(0)
const mouseY = ref(0)
const activeHoverImg = ref('')
const hoverImgX = ref(0)
const hoverImgY = ref(0)
let hoverImgVelocityX = 0
let hoverImgVelocityY = 0
let imgFrameId = null

const onMouseMove = (e) => {
  mouseX.value = e.clientX
  mouseY.value = e.clientY
}

const updateHoverImgPos = () => {
  const targetX = mouseX.value + 25
  const targetY = mouseY.value + 25
  
  const dx = targetX - hoverImgX.value
  const dy = targetY - hoverImgY.value
  
  hoverImgVelocityX = (hoverImgVelocityX + dx * 0.12) * 0.72
  hoverImgVelocityY = (hoverImgVelocityY + dy * 0.12) * 0.72
  
  hoverImgX.value += hoverImgVelocityX
  hoverImgY.value += hoverImgVelocityY
  
  imgFrameId = requestAnimationFrame(updateHoverImgPos)
}

const showHoverImage = (img) => {
  activeHoverImg.value = img
}
const hideHoverImage = () => {
  activeHoverImg.value = ''
}

let observer = null
const initScrollReveal = () => {
  if (observer) {
    observer.disconnect()
  }
  
  observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('revealed')
      }
    })
  }, {
    threshold: 0.05,
    rootMargin: '0px 0px -30px 0px'
  })
  
  document.querySelectorAll('.blur-reveal, .scroll-reveal').forEach((el) => {
    observer.observe(el)
  })
}

onMounted(() => {
  window.addEventListener('scroll', onScroll, { passive: true })
  window.addEventListener('mousemove', onMouseMove, { passive: true })
  updateHoverImgPos()
  initScrollReveal()
})

onUnmounted(() => {
  window.removeEventListener('scroll', onScroll)
  window.removeEventListener('mousemove', onMouseMove)
  if (imgFrameId) {
    cancelAnimationFrame(imgFrameId)
  }
  if (observer) {
    observer.disconnect()
  }
})

watch(locale, () => {
  nextTick(() => {
    initScrollReveal()
  })
})
</script>

<template>
  <div class="page-wrapper font-inter" :class="{ 'menu-lock': isMenuOpen }">
    <!-- Mouse hover image follower (desktop only) -->
    <div 
      class="hover-image-follower" 
      :class="{ active: activeHoverImg }"
      :style="{ transform: `translate3d(${hoverImgX}px, ${hoverImgY}px, 0)` }"
      aria-hidden="true"
    >
      <img v-if="activeHoverImg" :src="activeHoverImg" alt="Project Preview" />
    </div>

    <!-- Header Navigation -->
    <header class="top-header" role="banner">
      <div class="header-left-spacer" aria-hidden="true"></div>
      
      <!-- Desktop Centered Navigation -->
      <nav class="header-nav-center desktop-nav" aria-label="Main Navigation">
        <a href="#about" class="nav-link">About</a>
        <a href="#architecture" class="nav-link">Architecture</a>
        <a href="#projects" class="nav-link">Projects</a>
        <a href="#contact" class="nav-link">Contact</a>
      </nav>
      
      <div class="header-actions-right">
        <div class="desktop-lang">
          <LanguageSwitcher />
        </div>
        
        <!-- Mobile Burger Menu Toggle -->
        <button 
          class="mobile-menu-btn" 
          @click="toggleMenu" 
          :aria-expanded="isMenuOpen"
          :aria-label="isMenuOpen ? 'Close navigation menu' : 'Open navigation menu'"
        >
          <CloseIcon v-if="isMenuOpen" size="22" />
          <Menu v-else size="22" />
        </button>
      </div>
    </header>

    <!-- Mobile Drawer / Overlay Navigation -->
    <transition name="mobile-menu">
      <div v-if="isMenuOpen" class="mobile-nav-overlay" @click.self="closeMenu">
        <div class="mobile-nav-content">
          <nav class="mobile-nav-links" aria-label="Mobile Navigation">
            <a href="#about" class="mobile-nav-link" @click="closeMenu">About</a>
            <a href="#architecture" class="mobile-nav-link" @click="closeMenu">Architecture</a>
            <a href="#projects" class="mobile-nav-link" @click="closeMenu">Projects</a>
            <a href="#contact" class="mobile-nav-link" @click="closeMenu">Contact</a>
          </nav>
          
          <div class="mobile-nav-footer">
            <LanguageSwitcher />
          </div>
        </div>
      </div>
    </transition>

    <!-- Hero Section -->
    <section id="hero" class="hero-section" aria-label="Introduction">
      <div class="hero-top-row">
        <h1 class="hero-huge-text-top blur-reveal">
          SOFTWARE<br>ENGINEER
        </h1>
      </div>

      <div class="hero-center-row">
        <div class="hero-bio-container blur-reveal">
          <ArrowDown stroke-width="2" size="36" class="hero-arrow" aria-hidden="true" />
          <p class="hero-bio-text">{{ t('bio') }}</p>
        </div>
      </div>

      <div class="hero-bottom-row">
        <div 
          class="hero-huge-text-bottom blur-reveal" 
          :style="{ transform: `translate3d(0, ${scrollY * -0.015}px, 0)` }"
          aria-label="Sebastián Cardona"
        >
          SEBASTIÁN<br>CARDONA
        </div>
      </div>
    </section>

    <!-- Main Content Flowing Directly with Background Color -->
    <main class="main-content">
      
      <!-- About Me Section -->
      <section id="about" class="section about-section" aria-labelledby="about-heading">
        <div class="section-header-block">
          <h2 id="about-heading" class="section-title blur-reveal">{{ t('aboutTitle') }}</h2>
        </div>
        
        <div class="about-grid">
          <!-- Text Paragraphs -->
          <div class="about-text-col scroll-reveal">
            <p class="summary-paragraph leading-para">{{ t('aboutP1') }}</p>
            <p class="summary-paragraph">{{ t('aboutP2') }}</p>
            <p class="summary-paragraph">{{ t('aboutP3') }}</p>
          </div>

          <!-- Education & Credentials -->
          <div class="about-meta-col scroll-reveal" style="transition-delay: 0.1s;">
            <div class="meta-subgroup">
              <h3 class="meta-label">{{ t('educationTitle') }}</h3>
              <p class="meta-value">{{ t('educationText') }}</p>
            </div>

            <div class="meta-subgroup">
              <h3 class="meta-label">{{ t('certificationsTitle') }}</h3>
              <ul class="meta-list">
                <li v-for="(cert, cIdx) in tm('certifications')" :key="cIdx">
                  {{ cert }}
                </li>
              </ul>
            </div>

            <div class="meta-subgroup">
              <h3 class="meta-label">{{ t('locationText') }}</h3>
              <p class="meta-value">Santa Marta, Colombia · Remote & Relocation</p>
            </div>
          </div>
        </div>
      </section>

      <!-- Architecture Levels & Principles Section (Clean Diagram) -->
      <section id="architecture" class="section architecture-section" aria-labelledby="architecture-heading">
        <div class="section-header-block">
          <h2 id="architecture-heading" class="section-title blur-reveal">{{ t('skillsTitle') }}</h2>
          <p class="section-subtitle">{{ t('skillsDiagramSubtitle') }}</p>
        </div>

        <div class="levels-diagram-list scroll-reveal">
          <article 
            v-for="layer in tm('skillLayers')" 
            :key="layer.level"
            class="level-row-item"
          >
            <div class="level-indicator-col">
              <span class="level-code-tag">{{ layer.level }}</span>
              <div class="level-titles">
                <h3 class="level-name">{{ layer.name }}</h3>
                <span class="level-role-sub">{{ layer.roleType }}</span>
              </div>
            </div>

            <div class="level-tags-col">
              <span 
                v-for="(tag, tIdx) in layer.tags" 
                :key="tIdx" 
                class="minimal-tech-tag"
              >
                {{ tag }}
              </span>
            </div>
          </article>
        </div>
      </section>

      <!-- Featured Projects Section (Single Frame View per Project) -->
      <section id="projects" class="section projects-section" aria-labelledby="projects-heading">
        <div class="section-header-block">
          <h2 id="projects-heading" class="section-title blur-reveal">{{ t('projectsTitle') }}</h2>
          <p class="section-subtitle">{{ t('projectsSubtitle') }}</p>
        </div>

        <div class="projects-editorial-list">
          <article 
            v-for="project in tm('projects')" 
            :key="project.id" 
            class="project-frame-row scroll-reveal"
            @mouseenter="project.preview ? showHoverImage(project.preview) : null"
            @mouseleave="hideHoverImage"
          >
            <!-- Project Content Left / Top Side -->
            <div class="project-info-side">
              <div class="project-row-topline">
                <span class="proj-num">{{ project.num }}</span>
                <span class="proj-badge">{{ project.badge }}</span>
              </div>

              <h3 class="proj-heading">{{ project.title }}</h3>
              <p class="proj-subheading">{{ project.subtitle }}</p>
              <p class="proj-summary">{{ project.description }}</p>
              
              <ul class="proj-bullet-list">
                <li v-for="(bullet, bIdx) in project.bullet_points" :key="bIdx">
                  <span class="bullet-dot" aria-hidden="true">—</span>
                  <span>{{ bullet }}</span>
                </li>
              </ul>

              <div class="proj-footer-bar">
                <div class="proj-tags-wrap">
                  <span 
                    v-for="(tech, techIdx) in project.technologies" 
                    :key="techIdx" 
                    class="proj-inline-tag"
                  >
                    {{ tech }}
                  </span>
                </div>
                
                <a 
                  v-if="project.github_link" 
                  :href="project.github_link" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  class="proj-github-action interactive"
                  :aria-label="`${t('github')} - ${project.title}`"
                >
                  {{ t('github') }} <ExternalLink size="13" class="action-icon" />
                </a>
              </div>
            </div>

            <!-- Project Image Preview Right / Bottom Side -->
            <div v-if="project.preview" class="project-preview-side">
              <div class="project-thumbnail-wrapper">
                <img :src="project.preview" :alt="`${project.title} Preview`" loading="lazy" />
              </div>
            </div>
          </article>
        </div>
      </section>

      <!-- Contact Section -->
      <section id="contact" class="section contact-section" aria-labelledby="contact-heading">
        <div class="section-header-block">
          <h2 id="contact-heading" class="section-title blur-reveal">{{ t('contactTitle') }}</h2>
        </div>

        <div class="contact-editorial-grid">
          <div class="contact-left-col scroll-reveal">
            <p class="contact-sub-text">{{ t('contactSub') }}</p>
            
            <div class="huge-email-wrapper">
              <a 
                href="mailto:scarrdona@gmail.com" 
                class="huge-email-link interactive"
                aria-label="Email scarrdona@gmail.com"
              >
                scarrdona@gmail.com
              </a>
            </div>

            <div class="cv-download-wrapper">
              <a 
                :href="cvLink.href"
                :download="cvLink.download"
                class="cv-btn interactive"
                :aria-label="`${t('downloadCV')} (${locale.toUpperCase()})`"
              >
                <span>{{ t('downloadCV') }}</span>
                <Download size="16" stroke-width="2.2" class="cv-icon" />
              </a>
            </div>
          </div>

          <div class="contact-right-col scroll-reveal" style="transition-delay: 0.1s;">
            <div class="social-links-flow">
              <div class="social-row">
                <span class="social-label">{{ t('phoneLabel') }}</span>
                <a href="tel:+573152052580" class="social-link interactive">+57 315 205 2580</a>
              </div>
              
              <div class="social-row">
                <span class="social-label">{{ t('linkedinLabel') }}</span>
                <a 
                  href="https://linkedin.com/in/sebastiansaintt" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  class="social-link interactive"
                >
                  linkedin.com/in/sebastiansaintt 
                  <ExternalLink size="13" class="social-icon" />
                </a>
              </div>
              
              <div class="social-row">
                <span class="social-label">{{ t('githubLabel') }}</span>
                <a 
                  href="https://github.com/sebastiansaintt" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  class="social-link interactive"
                >
                  github.com/sebastiansaintt 
                  <ExternalLink size="13" class="social-icon" />
                </a>
              </div>

              <div class="social-row">
                <span class="social-label">{{ t('xLabel') }}</span>
                <a 
                  href="https://x.com/sebastiansaintt" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  class="social-link interactive"
                >
                  x.com/sebastiansaintt 
                  <ExternalLink size="13" class="social-icon" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

    </main>

    <!-- Page Footer -->
    <footer class="footer scroll-reveal" role="contentinfo">
      <div class="footer-inner">
        <p>© 2026 {{ t('name') }} — {{ t('footer') }}</p>
        <p class="location-tag">{{ t('locationText') }}</p>
      </div>
    </footer>
  </div>
</template>

<style scoped>
.page-wrapper {
  position: relative;
  min-height: 100%;
  width: 100%;
  z-index: 1;
  background-color: var(--bg-color);
  color: var(--text-color);
  overflow-x: hidden;
}

.menu-lock {
  overflow: hidden;
}

.font-inter {
  font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif !important;
}

/* Header */
.top-header {
  position: sticky;
  top: 0;
  left: 0;
  width: 100%;
  height: var(--header-h);
  box-sizing: border-box;
  display: grid;
  grid-template-columns: 1fr auto 1fr;
  align-items: center;
  padding: 0 clamp(1rem, 3.5vw, 2.5rem);
  background: rgba(236, 235, 233, 0.95);
  backdrop-filter: blur(10px);
  -webkit-backdrop-filter: blur(10px);
  border-bottom: 0.5px solid var(--border-color);
  z-index: 100;
}

.header-nav-center {
  display: flex;
  align-items: center;
  gap: clamp(1rem, 2.2vw, 2.2rem);
  justify-content: center;
}

.nav-link {
  font-size: clamp(0.75rem, 0.4vw + 0.35vh, 0.82rem);
  font-weight: 500;
  letter-spacing: 0.04em;
  text-transform: uppercase;
  color: var(--text-light);
  transition: color 0.2s ease;
}

.nav-link:hover, .nav-link:focus-visible {
  color: var(--text-color);
}

.header-actions-right {
  display: flex;
  justify-content: flex-end;
  align-items: center;
  gap: 1rem;
}

.mobile-menu-btn {
  display: none;
  background: transparent;
  border: none;
  color: var(--text-color);
  padding: 0.25rem;
  cursor: pointer;
  align-items: center;
  justify-content: center;
}

/* Mobile Drawer / Overlay */
.mobile-nav-overlay {
  position: fixed;
  top: var(--header-h);
  left: 0;
  right: 0;
  bottom: 0;
  height: calc(100vh - var(--header-h));
  height: calc(100svh - var(--header-h));
  height: calc(100dvh - var(--header-h));
  background: rgba(236, 235, 233, 0.98);
  backdrop-filter: blur(16px);
  -webkit-backdrop-filter: blur(16px);
  z-index: 99;
  display: flex;
  flex-direction: column;
  padding: clamp(1.5rem, 4vh, 2.5rem) clamp(1.25rem, 4vw, 1.8rem);
  box-sizing: border-box;
}

.mobile-nav-content {
  display: flex;
  flex-direction: column;
  height: 100%;
  justify-content: space-between;
}

.mobile-nav-links {
  display: flex;
  flex-direction: column;
  gap: clamp(1.2rem, 3vh, 1.8rem);
}

.mobile-nav-link {
  font-size: clamp(1.3rem, 3.5vw + 1vh, 1.7rem);
  font-weight: 500;
  letter-spacing: -0.02em;
  text-transform: uppercase;
  color: var(--text-color);
  border-bottom: 0.5px solid var(--border-color);
  padding-bottom: 0.8rem;
}

.mobile-nav-footer {
  padding-top: 1.5rem;
  display: flex;
  justify-content: flex-start;
}

/* Transition for mobile menu */
.mobile-menu-enter-active,
.mobile-menu-leave-active {
  transition: opacity 0.25s ease, transform 0.25s ease;
}

.mobile-menu-enter-from,
.mobile-menu-leave-to {
  opacity: 0;
  transform: translateY(-8px);
}

/* Hero Section */
.hero-section {
  padding: clamp(0.8rem, 2.2vh, 2.2rem) clamp(1rem, 3.5vw, 2.5rem);
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: calc(100vh - var(--header-h));
  height: calc(100svh - var(--header-h));
  height: calc(100dvh - var(--header-h));
  min-height: calc(100vh - var(--header-h));
  min-height: calc(100svh - var(--header-h));
  min-height: calc(100dvh - var(--header-h));
  max-height: calc(100vh - var(--header-h));
  max-height: calc(100svh - var(--header-h));
  max-height: calc(100dvh - var(--header-h));
  box-sizing: border-box;
  position: relative;
  z-index: 2;
  scroll-snap-align: start;
  scroll-snap-stop: always;
  scroll-margin-top: var(--header-h);
  overflow: hidden;
}

.hero-top-row {
  width: 100%;
  text-align: left;
}

.hero-huge-text-top {
  font-size: clamp(2rem, 3.8vw + 3.2vh, 6.8rem);
  font-weight: 500;
  line-height: 0.88;
  letter-spacing: -0.04em;
  color: var(--text-color);
  text-align: left;
}

.hero-center-row {
  width: 100%;
  display: flex;
  justify-content: flex-start;
  margin: clamp(0.35rem, 1.2vh, 1.2rem) 0;
}

.hero-bio-container {
  display: flex;
  gap: clamp(0.6rem, 1.2vw, 1.2rem);
  align-items: flex-start;
  max-width: clamp(280px, 32vw + 100px, 440px);
}

.hero-arrow {
  flex-shrink: 0;
  color: var(--text-color);
  margin-top: 2px;
  width: clamp(22px, 1.5vw + 10px, 32px);
  height: clamp(22px, 1.5vw + 10px, 32px);
}

.hero-bio-text {
  font-size: clamp(0.78rem, 0.5vw + 0.4vh, 0.98rem);
  font-weight: 400;
  line-height: 1.45;
  color: var(--text-light);
  letter-spacing: -0.01em;
}

.hero-bottom-row {
  width: 100%;
  display: flex;
  justify-content: flex-end;
  text-align: right;
}

.hero-huge-text-bottom {
  text-align: right;
  font-size: clamp(2rem, 3.8vw + 3.2vh, 6.8rem);
  font-weight: 500;
  line-height: 0.88;
  letter-spacing: -0.04em;
  color: var(--text-color);
  width: 100%;
}

/* Main Content */
.main-content {
  padding: 0;
  display: flex;
  flex-direction: column;
  gap: 0;
  position: relative;
  z-index: 2;
}

.section {
  width: 100%;
  max-width: 1350px;
  margin: 0 auto;
  height: calc(100vh - var(--header-h));
  height: calc(100svh - var(--header-h));
  height: calc(100dvh - var(--header-h));
  min-height: calc(100vh - var(--header-h));
  min-height: calc(100svh - var(--header-h));
  min-height: calc(100dvh - var(--header-h));
  max-height: calc(100vh - var(--header-h));
  max-height: calc(100svh - var(--header-h));
  max-height: calc(100dvh - var(--header-h));
  padding: clamp(0.8rem, 2.2vh, 2.2rem) clamp(1rem, 3.5vw, 2.5rem);
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  scroll-snap-align: start;
  scroll-snap-stop: always;
  scroll-margin-top: var(--header-h);
  overflow: hidden;
}

.section-header-block {
  flex-shrink: 0;
  margin-bottom: clamp(0.6rem, 1.4vh, 1.5rem);
  padding-bottom: clamp(0.3rem, 0.7vh, 0.6rem);
  border-bottom: 0.5px solid var(--border-color);
}

.section-title {
  font-size: clamp(1.3rem, 1.8vw + 1vh, 2.4rem);
  font-weight: 500;
  letter-spacing: -0.03em;
  line-height: 1.1;
  text-transform: uppercase;
  color: var(--text-color);
}

.section-subtitle {
  font-size: clamp(0.76rem, 0.5vw + 0.3vh, 0.88rem);
  color: var(--text-muted);
  margin-top: 0.2rem;
  line-height: 1.3;
}

/* Subtle custom scrollbars for inner scrollable containers */
.about-grid::-webkit-scrollbar,
.levels-diagram-list::-webkit-scrollbar,
.projects-editorial-list::-webkit-scrollbar,
.contact-editorial-grid::-webkit-scrollbar {
  width: 4px;
}
.about-grid::-webkit-scrollbar-thumb,
.levels-diagram-list::-webkit-scrollbar-thumb,
.projects-editorial-list::-webkit-scrollbar-thumb,
.contact-editorial-grid::-webkit-scrollbar-thumb {
  background: rgba(17, 17, 17, 0.16);
  border-radius: 4px;
}

/* About Section */
.about-grid {
  display: grid;
  grid-template-columns: 1.35fr 1fr;
  gap: clamp(1.2rem, 2.5vw + 1vh, 3rem);
  flex: 1;
  min-height: 0;
  overflow-y: auto;
  padding-right: 0.35rem;
  align-items: start;
}

.about-text-col {
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
}

.summary-paragraph {
  font-size: clamp(0.8rem, 0.5vw + 0.35vh, 0.94rem);
  line-height: clamp(1.4, 1.45vh, 1.65);
  color: var(--text-light);
  margin-bottom: clamp(0.5rem, 1vh, 1.1rem);
}

.summary-paragraph:last-child {
  margin-bottom: 0;
}

.summary-paragraph.leading-para {
  font-size: clamp(0.85rem, 0.55vw + 0.4vh, 1rem);
  color: var(--text-color);
  font-weight: 450;
}

.about-meta-col {
  display: flex;
  flex-direction: column;
  gap: clamp(0.6rem, 1.4vh, 1.4rem);
}

.meta-subgroup {
  display: flex;
  flex-direction: column;
  gap: 0.2rem;
}

.meta-label {
  font-size: clamp(0.66rem, 0.35vw + 0.25vh, 0.72rem);
  font-weight: 700;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: var(--text-muted);
}

.meta-value {
  font-size: clamp(0.78rem, 0.45vw + 0.3vh, 0.88rem);
  color: var(--text-color);
  line-height: 1.4;
}

.meta-list {
  list-style: none;
  display: flex;
  flex-direction: column;
  gap: 0.2rem;
}

.meta-list li {
  font-size: clamp(0.76rem, 0.45vw + 0.3vh, 0.85rem);
  color: var(--text-light);
  line-height: 1.35;
}

.meta-list li::before {
  content: "— ";
  color: var(--text-muted);
}

/* Architecture Levels Diagram */
.levels-diagram-list {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  flex: 1;
  min-height: 0;
  overflow-y: auto;
  padding-right: 0.35rem;
}

.level-row-item {
  display: grid;
  grid-template-columns: minmax(200px, 280px) 1fr;
  gap: clamp(0.8rem, 1.8vw, 1.8rem);
  align-items: center;
  padding: clamp(0.3rem, 0.6vh, 0.75rem) 0;
  border-bottom: 0.5px solid var(--border-color);
}

.level-row-item:last-child {
  border-bottom: none;
}

.level-indicator-col {
  display: flex;
  align-items: baseline;
  gap: clamp(0.4rem, 0.8vw, 0.8rem);
}

.level-code-tag {
  font-size: clamp(0.68rem, 0.35vw + 0.25vh, 0.74rem);
  font-weight: 700;
  color: var(--text-muted);
  font-variant-numeric: tabular-nums;
  min-width: 20px;
}

.level-titles {
  display: flex;
  flex-direction: column;
  gap: 0.05rem;
}

.level-name {
  font-size: clamp(0.8rem, 0.5vw + 0.3vh, 0.9rem);
  font-weight: 600;
  color: var(--text-color);
  line-height: 1.2;
}

.level-role-sub {
  font-size: clamp(0.64rem, 0.35vw + 0.2vh, 0.7rem);
  font-weight: 500;
  color: var(--text-muted);
  text-transform: uppercase;
  letter-spacing: 0.03em;
}

.level-tags-col {
  display: flex;
  flex-wrap: wrap;
  gap: clamp(0.2rem, 0.35vw, 0.4rem);
  align-items: center;
}

.minimal-tech-tag {
  font-size: clamp(0.68rem, 0.4vw + 0.25vh, 0.75rem);
  color: var(--text-light);
  padding: clamp(0.1rem, 0.25vh, 0.18rem) clamp(0.3rem, 0.45vw, 0.5rem);
  border: 0.5px solid var(--border-color-dark);
  border-radius: 4px;
  background: rgba(17, 17, 17, 0.02);
  white-space: nowrap;
}

/* Projects Section */
.projects-editorial-list {
  display: flex;
  flex-direction: column;
  gap: clamp(1rem, 2vh, 2.2rem);
  flex: 1;
  min-height: 0;
  overflow-y: auto;
  padding-right: 0.4rem;
}

.project-frame-row {
  display: grid;
  grid-template-columns: 1.25fr 1fr;
  gap: clamp(1rem, 2vw, 2.2rem);
  align-items: center;
  padding: clamp(0.7rem, 1.3vh, 1.4rem) 0;
  border-bottom: 0.5px solid var(--border-color);
}

.project-frame-row:last-child {
  border-bottom: none;
}

.project-info-side {
  display: flex;
  flex-direction: column;
  gap: clamp(0.18rem, 0.4vh, 0.35rem);
}

.project-row-topline {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.proj-num {
  font-size: clamp(0.68rem, 0.35vw + 0.25vh, 0.72rem);
  font-weight: 700;
  color: var(--text-muted);
  font-variant-numeric: tabular-nums;
}

.proj-badge {
  font-size: clamp(0.62rem, 0.3vw + 0.2vh, 0.66rem);
  font-weight: 700;
  letter-spacing: 0.06em;
  text-transform: uppercase;
  padding: 0.1rem 0.4rem;
  border: 0.5px solid var(--border-color-dark);
  border-radius: 99px;
  color: var(--text-color);
}

.proj-heading {
  font-size: clamp(0.98rem, 1vw + 0.5vh, 1.35rem);
  font-weight: 600;
  letter-spacing: -0.02em;
  color: var(--text-color);
  line-height: 1.18;
  margin-top: 0.05rem;
}

.proj-subheading {
  font-size: clamp(0.72rem, 0.45vw + 0.2vh, 0.78rem);
  font-weight: 500;
  color: var(--text-muted);
}

.proj-summary {
  font-size: clamp(0.78rem, 0.5vw + 0.3vh, 0.86rem);
  line-height: 1.45;
  color: var(--text-light);
  margin-top: 0.1rem;
}

.proj-bullet-list {
  list-style: none;
  display: flex;
  flex-direction: column;
  gap: clamp(0.15rem, 0.3vh, 0.28rem);
  margin: clamp(0.15rem, 0.35vh, 0.35rem) 0;
}

.proj-bullet-list li {
  display: flex;
  align-items: flex-start;
  gap: 0.4rem;
  font-size: clamp(0.74rem, 0.45vw + 0.25vh, 0.82rem);
  line-height: 1.38;
  color: var(--text-light);
}

.bullet-dot {
  color: var(--text-muted);
  font-weight: bold;
}

.proj-footer-bar {
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-wrap: wrap;
  gap: 0.6rem;
  margin-top: clamp(0.2rem, 0.45vh, 0.45rem);
  padding-top: clamp(0.2rem, 0.45vh, 0.45rem);
  border-top: 0.5px dashed var(--border-color);
}

.proj-tags-wrap {
  display: flex;
  flex-wrap: wrap;
  gap: 0.25rem;
}

.proj-inline-tag {
  font-size: clamp(0.64rem, 0.35vw + 0.2vh, 0.7rem);
  font-weight: 500;
  padding: 0.1rem 0.35rem;
  border: 0.5px solid var(--border-color);
  border-radius: 4px;
  color: var(--text-muted);
}

.proj-github-action {
  font-size: clamp(0.68rem, 0.35vw + 0.25vh, 0.74rem);
  font-weight: 600;
  letter-spacing: 0.04em;
  text-transform: uppercase;
  color: var(--text-color);
  display: inline-flex;
  align-items: center;
  gap: 0.25rem;
  border-bottom: 1px solid var(--text-color);
  padding-bottom: 1px;
  transition: opacity 0.2s ease;
}

.proj-github-action:hover {
  opacity: 0.6;
}

.action-icon {
  margin-bottom: 1px;
}

.project-preview-side {
  width: 100%;
  display: flex;
  justify-content: center;
}

.project-thumbnail-wrapper {
  width: 100%;
  max-width: 380px;
  aspect-ratio: 16/10;
  border-radius: 6px;
  overflow: hidden;
  border: 0.5px solid var(--border-color-dark);
  background: #ffffff;
}

.project-thumbnail-wrapper img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
}

/* Hover thumbnail follower */
.hover-image-follower {
  position: fixed;
  top: 0;
  left: 0;
  width: 300px;
  height: 190px;
  pointer-events: none;
  z-index: 999;
  border-radius: 6px;
  overflow: hidden;
  opacity: 0;
  box-shadow: 0 16px 40px rgba(0,0,0,0.15);
  border: 0.5px solid var(--border-color-dark);
  transform: scale(0.85);
  transform-origin: center center;
  transition: opacity 0.3s var(--spring-easing), transform 0.3s var(--spring-bounce);
  will-change: transform;
}

.hover-image-follower.active {
  opacity: 1;
  transform: scale(1);
}

.hover-image-follower img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

/* Contact Section & Footer */
.contact-section {
  height: calc(100vh - var(--header-h) - var(--footer-h));
  height: calc(100svh - var(--header-h) - var(--footer-h));
  height: calc(100dvh - var(--header-h) - var(--footer-h));
  min-height: calc(100vh - var(--header-h) - var(--footer-h));
  min-height: calc(100svh - var(--header-h) - var(--footer-h));
  min-height: calc(100dvh - var(--header-h) - var(--footer-h));
  max-height: calc(100vh - var(--header-h) - var(--footer-h));
  max-height: calc(100svh - var(--header-h) - var(--footer-h));
  max-height: calc(100dvh - var(--header-h) - var(--footer-h));
  padding: clamp(0.8rem, 2.2vh, 2.2rem) clamp(1rem, 3.5vw, 2.5rem) 0 clamp(1rem, 3.5vw, 2.5rem);
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  scroll-snap-align: start;
  scroll-snap-stop: always;
  scroll-margin-top: var(--header-h);
  overflow: hidden;
}

.contact-editorial-grid {
  display: grid;
  grid-template-columns: 1.3fr 1fr;
  gap: clamp(1.2rem, 2.5vw + 1vh, 3rem);
  flex: 1;
  min-height: 0;
  align-items: center;
  overflow-y: auto;
  padding-right: 0.35rem;
}

.contact-left-col {
  display: flex;
  flex-direction: column;
  justify-content: center;
}

.contact-sub-text {
  font-size: clamp(0.82rem, 0.55vw + 0.35vh, 0.96rem);
  color: var(--text-light);
  margin-bottom: clamp(0.75rem, 1.5vh, 1.4rem);
  line-height: 1.45;
}

.huge-email-wrapper {
  margin-bottom: clamp(0.75rem, 1.5vh, 1.4rem);
  word-break: break-all;
}

.huge-email-link {
  font-size: clamp(1.1rem, 2vw + 1vh, 2.1rem);
  font-weight: 500;
  letter-spacing: -0.03em;
  color: var(--text-color);
  display: inline-block;
  border-bottom: 1.5px solid var(--text-color);
  padding-bottom: 2px;
  transition: opacity 0.2s ease;
  word-break: break-all;
}

.huge-email-link:hover {
  opacity: 0.6;
}

.cv-download-wrapper {
  display: inline-block;
}

.cv-btn {
  display: inline-flex;
  align-items: center;
  gap: 0.45rem;
  font-size: clamp(0.7rem, 0.38vw + 0.25vh, 0.76rem);
  font-weight: 600;
  letter-spacing: 0.06em;
  text-transform: uppercase;
  color: var(--text-color);
  border: 1px solid var(--text-color);
  padding: clamp(0.4rem, 0.8vh, 0.55rem) clamp(0.8rem, 1.2vw, 1.15rem);
  border-radius: 4px;
  background: transparent;
  transition: background 0.2s ease, color 0.2s ease;
}

.cv-btn:hover {
  background: var(--text-color);
  color: var(--bg-color);
}

.contact-right-col {
  display: flex;
  flex-direction: column;
  justify-content: center;
}

.social-links-flow {
  display: flex;
  flex-direction: column;
  gap: clamp(0.6rem, 1.2vh, 1.1rem);
}

.social-row {
  display: flex;
  flex-direction: column;
  gap: 0.1rem;
}

.social-label {
  font-size: clamp(0.62rem, 0.32vw + 0.2vh, 0.66rem);
  font-weight: 700;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: var(--text-muted);
}

.social-link {
  font-size: clamp(0.8rem, 0.5vw + 0.3vh, 0.9rem);
  font-weight: 500;
  color: var(--text-color);
  display: inline-flex;
  align-items: center;
  gap: 0.3rem;
}

.social-link:hover {
  text-decoration: underline;
  text-underline-offset: 3px;
}

.social-icon {
  color: var(--text-muted);
}

/* Footer */
.footer {
  height: var(--footer-h);
  min-height: var(--footer-h);
  max-height: var(--footer-h);
  box-sizing: border-box;
  padding: 0 clamp(1rem, 3.5vw, 2.5rem);
  margin-top: 0;
  border-top: 0.5px solid var(--border-color);
  display: flex;
  align-items: center;
  position: relative;
  z-index: 2;
}

.footer-inner {
  width: 100%;
  max-width: 1350px;
  margin: 0 auto;
  padding: 0;
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: clamp(0.7rem, 0.38vw + 0.25vh, 0.76rem);
  color: var(--text-muted);
  font-weight: 500;
}

/* ──────────────────────────────────────────────────────────────────────────
   RESPONSIVE MEDIA QUERIES
   ────────────────────────────────────────────────────────────────────────── */

@media (max-width: 1024px) {
  .top-header {
    padding: 0 1.5rem;
  }

  .about-grid, .contact-editorial-grid {
    grid-template-columns: 1fr;
    gap: clamp(1rem, 2vh, 1.8rem);
  }

  .level-row-item {
    grid-template-columns: minmax(180px, 240px) 1fr;
    gap: 0.8rem;
  }

  .project-frame-row {
    grid-template-columns: 1.1fr 1fr;
    gap: 1.2rem;
  }
}

@media (max-width: 768px) {
  .top-header {
    display: flex;
    justify-content: space-between;
    padding: 0 1.25rem;
  }
  
  .header-left-spacer,
  .desktop-nav,
  .desktop-lang {
    display: none;
  }

  .mobile-menu-btn {
    display: flex;
  }

  .hero-section {
    padding: clamp(0.8rem, 2vh, 1.5rem) 1.25rem;
  }

  .hero-center-row {
    margin: clamp(0.5rem, 1.5vh, 1.2rem) 0;
  }

  .hero-bio-container {
    max-width: 100%;
    gap: 0.6rem;
  }

  .section {
    padding: clamp(0.8rem, 2vh, 1.5rem) 1.25rem;
  }

  .contact-section {
    padding: clamp(0.8rem, 2vh, 1.5rem) 1.25rem 0 1.25rem;
  }

  .about-grid {
    gap: 1.2rem;
  }

  .level-row-item {
    grid-template-columns: 1fr;
    gap: 0.35rem;
    padding: 0.45rem 0;
  }

  .level-indicator-col {
    gap: 0.5rem;
  }

  .level-tags-col {
    gap: 0.3rem;
  }

  .project-frame-row {
    grid-template-columns: 1fr;
    gap: 0.8rem;
    padding: 0.8rem 0;
  }

  .project-thumbnail-wrapper {
    max-width: 100%;
    max-height: 180px;
  }

  .footer-inner {
    padding: 0;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    gap: 0.5rem;
  }

  .hover-image-follower {
    display: none;
  }
}

@media (max-width: 480px) {
  .hero-huge-text-top,
  .hero-huge-text-bottom {
    font-size: clamp(1.8rem, 7.5vw + 2vh, 3.2rem);
  }

  .section-title {
    font-size: clamp(1.2rem, 5vw + 0.5vh, 1.55rem);
  }

  .proj-footer-bar {
    flex-direction: column;
    align-items: flex-start;
    gap: 0.5rem;
  }

  .proj-github-action {
    align-self: flex-start;
  }

  .footer-inner {
    flex-direction: column;
    align-items: flex-start;
    gap: 0.15rem;
  }
}

@media (max-height: 700px) {
  .section-header-block {
    margin-bottom: 0.4rem;
    padding-bottom: 0.2rem;
  }

  .level-row-item {
    padding: 0.22rem 0;
  }

  .project-frame-row {
    padding: 0.45rem 0;
  }

  .summary-paragraph {
    margin-bottom: 0.35rem;
  }

  .contact-sub-text,
  .huge-email-wrapper {
    margin-bottom: 0.5rem;
  }

  .social-links-flow {
    gap: 0.4rem;
  }
}
</style>