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
  min-height: 100vh;
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
  display: grid;
  grid-template-columns: 1fr auto 1fr;
  align-items: center;
  padding: 1.1rem 2.5rem;
  background: rgba(236, 235, 233, 0.95);
  backdrop-filter: blur(10px);
  -webkit-backdrop-filter: blur(10px);
  border-bottom: 0.5px solid var(--border-color);
  z-index: 100;
}


.header-nav-center {
  display: flex;
  align-items: center;
  gap: 2.2rem;
  justify-content: center;
}

.nav-link {
  font-size: 0.8rem;
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
  top: 56px;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(236, 235, 233, 0.98);
  backdrop-filter: blur(16px);
  -webkit-backdrop-filter: blur(16px);
  z-index: 99;
  display: flex;
  flex-direction: column;
  padding: 2.5rem 1.8rem;
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
  gap: 1.8rem;
}

.mobile-nav-link {
  font-size: 1.7rem;
  font-weight: 500;
  letter-spacing: -0.02em;
  text-transform: uppercase;
  color: var(--text-color);
  border-bottom: 0.5px solid var(--border-color);
  padding-bottom: 0.8rem;
}

.mobile-nav-footer {
  padding-top: 2rem;
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
  padding: 2.5rem 2.5rem;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: calc(100vh - 60px);
  min-height: 560px;
  max-height: 980px;
  box-sizing: border-box;
  position: relative;
  z-index: 2;
}

.hero-top-row {
  width: 100%;
  text-align: left;
}

.hero-huge-text-top {
  font-size: clamp(3.2rem, 8.5vw, 7.5rem);
  font-weight: 500;
  line-height: 0.9;
  letter-spacing: -0.04em;
  color: var(--text-color);
  text-align: left;
}

.hero-center-row {
  width: 100%;
  display: flex;
  justify-content: flex-start;
  margin: 1.5rem 0;
}

.hero-bio-container {
  display: flex;
  gap: 1.2rem;
  align-items: flex-start;
  max-width: 440px;
}

.hero-arrow {
  flex-shrink: 0;
  color: var(--text-color);
  margin-top: 3px;
}

.hero-bio-text {
  font-size: 1.02rem;
  font-weight: 400;
  line-height: 1.5;
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
  font-size: clamp(3.2rem, 8.5vw, 7.5rem);
  font-weight: 500;
  line-height: 0.9;
  letter-spacing: -0.04em;
  color: var(--text-color);
}

/* Main Content */
.main-content {
  padding: 0 2.5rem;
  display: flex;
  flex-direction: column;
  gap: 6rem;
  position: relative;
  z-index: 2;
}

.section {
  width: 100%;
  max-width: 1350px;
  margin: 0 auto;
  padding-top: 3rem;
}

.section-header-block {
  margin-bottom: 2rem;
  padding-bottom: 0.8rem;
  border-bottom: 0.5px solid var(--border-color);
}

.section-title {
  font-size: clamp(1.8rem, 3.5vw, 2.8rem);
  font-weight: 500;
  letter-spacing: -0.03em;
  line-height: 1.1;
  text-transform: uppercase;
  color: var(--text-color);
}

.section-subtitle {
  font-size: 0.92rem;
  color: var(--text-muted);
  margin-top: 0.35rem;
}

/* About Section */
.about-grid {
  display: grid;
  grid-template-columns: 1.4fr 1fr;
  gap: 3.5rem;
}

.summary-paragraph {
  font-size: 0.96rem;
  line-height: 1.7;
  color: var(--text-light);
  margin-bottom: 1.4rem;
}

.summary-paragraph.leading-para {
  font-size: 1.04rem;
  color: var(--text-color);
  font-weight: 450;
}

.about-meta-col {
  display: flex;
  flex-direction: column;
  gap: 2rem;
}

.meta-subgroup {
  display: flex;
  flex-direction: column;
  gap: 0.35rem;
}

.meta-label {
  font-size: 0.72rem;
  font-weight: 700;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: var(--text-muted);
}

.meta-value {
  font-size: 0.92rem;
  color: var(--text-color);
  line-height: 1.5;
}

.meta-list {
  list-style: none;
  display: flex;
  flex-direction: column;
  gap: 0.35rem;
}

.meta-list li {
  font-size: 0.88rem;
  color: var(--text-light);
  line-height: 1.45;
}

.meta-list li::before {
  content: "— ";
  color: var(--text-muted);
}

/* Architecture Levels Diagram */
.levels-diagram-list {
  display: flex;
  flex-direction: column;
}

.level-row-item {
  display: grid;
  grid-template-columns: 360px 1fr;
  gap: 2rem;
  align-items: baseline;
  padding: 1.3rem 0;
  border-bottom: 0.5px solid var(--border-color);
}

.level-indicator-col {
  display: flex;
  align-items: baseline;
  gap: 1rem;
}

.level-code-tag {
  font-size: 0.75rem;
  font-weight: 700;
  color: var(--text-muted);
  font-variant-numeric: tabular-nums;
  min-width: 24px;
}

.level-titles {
  display: flex;
  flex-direction: column;
  gap: 0.15rem;
}

.level-name {
  font-size: 0.94rem;
  font-weight: 600;
  color: var(--text-color);
}

.level-role-sub {
  font-size: 0.72rem;
  font-weight: 500;
  color: var(--text-muted);
  text-transform: uppercase;
  letter-spacing: 0.03em;
}

.level-tags-col {
  display: flex;
  flex-wrap: wrap;
  gap: 0.45rem;
  align-items: center;
}

.minimal-tech-tag {
  font-size: 0.78rem;
  color: var(--text-light);
  padding: 0.22rem 0.55rem;
  border: 0.5px solid var(--border-color-dark);
  border-radius: 4px;
  background: rgba(17, 17, 17, 0.02);
  white-space: nowrap;
}

/* Projects Section */
.projects-editorial-list {
  display: flex;
  flex-direction: column;
  gap: 3.5rem;
}

.project-frame-row {
  display: grid;
  grid-template-columns: 1.3fr 1fr;
  gap: 2.5rem;
  align-items: center;
  padding: 2rem 0;
  border-bottom: 0.5px solid var(--border-color);
}

.project-info-side {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.project-row-topline {
  display: flex;
  align-items: center;
  gap: 0.75rem;
}

.proj-num {
  font-size: 0.75rem;
  font-weight: 700;
  color: var(--text-muted);
  font-variant-numeric: tabular-nums;
}

.proj-badge {
  font-size: 0.68rem;
  font-weight: 700;
  letter-spacing: 0.06em;
  text-transform: uppercase;
  padding: 0.15rem 0.5rem;
  border: 0.5px solid var(--border-color-dark);
  border-radius: 99px;
  color: var(--text-color);
}

.proj-heading {
  font-size: clamp(1.2rem, 2vw, 1.55rem);
  font-weight: 600;
  letter-spacing: -0.02em;
  color: var(--text-color);
  margin-top: 0.2rem;
}

.proj-subheading {
  font-size: 0.8rem;
  font-weight: 500;
  color: var(--text-muted);
}

.proj-summary {
  font-size: 0.92rem;
  line-height: 1.6;
  color: var(--text-light);
  margin-top: 0.2rem;
}

.proj-bullet-list {
  list-style: none;
  display: flex;
  flex-direction: column;
  gap: 0.35rem;
  margin: 0.4rem 0;
}

.proj-bullet-list li {
  display: flex;
  align-items: flex-start;
  gap: 0.5rem;
  font-size: 0.86rem;
  line-height: 1.5;
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
  gap: 1rem;
  margin-top: 0.6rem;
  padding-top: 0.6rem;
  border-top: 0.5px dashed var(--border-color);
}

.proj-tags-wrap {
  display: flex;
  flex-wrap: wrap;
  gap: 0.35rem;
}

.proj-inline-tag {
  font-size: 0.72rem;
  font-weight: 500;
  padding: 0.15rem 0.45rem;
  border: 0.5px solid var(--border-color);
  border-radius: 4px;
  color: var(--text-muted);
}

.proj-github-action {
  font-size: 0.75rem;
  font-weight: 600;
  letter-spacing: 0.04em;
  text-transform: uppercase;
  color: var(--text-color);
  display: inline-flex;
  align-items: center;
  gap: 0.3rem;
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
  max-width: 440px;
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
  width: 320px;
  height: 200px;
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

/* Contact Section */
.contact-editorial-grid {
  display: grid;
  grid-template-columns: 1.3fr 1fr;
  gap: 3.5rem;
}

.contact-sub-text {
  font-size: 1rem;
  color: var(--text-light);
  margin-bottom: 2rem;
  line-height: 1.6;
}

.huge-email-wrapper {
  margin-bottom: 2rem;
  word-break: break-all;
}

.huge-email-link {
  font-size: clamp(1.3rem, 3.2vw, 2.4rem);
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
  gap: 0.5rem;
  font-size: 0.78rem;
  font-weight: 600;
  letter-spacing: 0.06em;
  text-transform: uppercase;
  color: var(--text-color);
  border: 1px solid var(--text-color);
  padding: 0.65rem 1.3rem;
  border-radius: 4px;
  background: transparent;
  transition: background 0.2s ease, color 0.2s ease;
}

.cv-btn:hover {
  background: var(--text-color);
  color: var(--bg-color);
}

.social-links-flow {
  display: flex;
  flex-direction: column;
  gap: 1.4rem;
}

.social-row {
  display: flex;
  flex-direction: column;
  gap: 0.2rem;
}

.social-label {
  font-size: 0.68rem;
  font-weight: 700;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: var(--text-muted);
}

.social-link {
  font-size: 0.95rem;
  font-weight: 500;
  color: var(--text-color);
  display: inline-flex;
  align-items: center;
  gap: 0.35rem;
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
  padding: 2.5rem 0;
  margin-top: 5rem;
  border-top: 0.5px solid var(--border-color);
  position: relative;
  z-index: 2;
}

.footer-inner {
  width: 100%;
  max-width: 1350px;
  margin: 0 auto;
  padding: 0 2.5rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 0.78rem;
  color: var(--text-muted);
  font-weight: 500;
}

/* ──────────────────────────────────────────────────────────────────────────
   RESPONSIVE MEDIA QUERIES (Clean Vertical Flow & High Legibility)
   ────────────────────────────────────────────────────────────────────────── */

@media (max-width: 1024px) {
  .top-header {
    padding: 1.1rem 1.8rem;
  }

  .hero-section {
    padding: 2rem 1.8rem;
  }
  
  .main-content {
    padding: 0 1.8rem;
    gap: 4.5rem;
  }

  .about-grid, .contact-editorial-grid {
    grid-template-columns: 1fr;
    gap: 2.5rem;
  }

  .level-row-item {
    grid-template-columns: 1fr;
    gap: 0.8rem;
  }

  .project-frame-row {
    grid-template-columns: 1fr;
    gap: 1.8rem;
  }

  .footer-inner {
    padding: 0 1.8rem;
  }
}

@media (max-width: 768px) {
  .top-header {
    display: flex;
    justify-content: space-between;
    padding: 0.9rem 1.25rem;
  }
  
  .header-left-spacer,
  .desktop-nav,
  .desktop-lang {
    display: none;
  }

  .mobile-menu-btn {
    display: flex;
  }

  /* Hero on mobile: Strictly aligned left top, center bio, right bottom */
  .hero-section {
    height: auto;
    min-height: calc(100svh - 56px);
    padding: 2rem 1.25rem 2rem 1.25rem;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    box-sizing: border-box;
  }

  .hero-top-row {
    text-align: left;
    width: 100%;
  }

  .hero-huge-text-top {
    font-size: clamp(2.4rem, 11vw, 3.8rem);
    text-align: left;
    line-height: 0.95;
  }

  .hero-center-row {
    margin: 2.2rem 0;
    width: 100%;
  }

  .hero-bio-container {
    max-width: 100%;
    gap: 0.8rem;
  }

  .hero-bio-text {
    font-size: 0.92rem;
    line-height: 1.5;
  }

  .hero-bottom-row {
    text-align: right;
    width: 100%;
    display: flex;
    justify-content: flex-end;
  }

  .hero-huge-text-bottom {
    text-align: right;
    font-size: clamp(2.4rem, 11vw, 3.8rem);
    line-height: 0.95;
    width: 100%;
  }

  /* Main content mobile vertical flow */
  .main-content {
    padding: 0 1.25rem;
    gap: 4rem;
  }

  .section {
    padding-top: 2rem;
  }

  .section-title {
    font-size: 1.6rem;
  }

  .summary-paragraph {
    font-size: 0.92rem;
    line-height: 1.6;
    margin-bottom: 1.1rem;
  }

  /* Architecture levels on mobile */
  .level-row-item {
    padding: 1.1rem 0;
    gap: 0.6rem;
  }

  .level-indicator-col {
    gap: 0.6rem;
  }

  .level-name {
    font-size: 0.9rem;
  }

  .minimal-tech-tag {
    font-size: 0.74rem;
    padding: 0.18rem 0.45rem;
  }

  /* Projects on mobile */
  .projects-editorial-list {
    gap: 2.5rem;
  }

  .project-frame-row {
    padding: 1.5rem 0;
    gap: 1.4rem;
  }

  .proj-heading {
    font-size: 1.25rem;
  }

  .proj-summary {
    font-size: 0.88rem;
    line-height: 1.5;
  }

  .proj-bullet-list li {
    font-size: 0.82rem;
    line-height: 1.4;
  }

  .project-thumbnail-wrapper {
    max-width: 100%;
  }

  /* Contact & Footer on mobile */
  .huge-email-link {
    font-size: 1.25rem;
  }

  .footer {
    margin-top: 3.5rem;
    padding: 1.8rem 0;
  }

  .footer-inner {
    padding: 0 1.25rem;
    flex-direction: column;
    align-items: flex-start;
    gap: 0.5rem;
  }

  .hover-image-follower {
    display: none;
  }
}

@media (max-width: 480px) {
  .hero-huge-text-top {
    font-size: clamp(2.2rem, 11vw, 3.2rem);
    text-align: left;
  }

  .hero-huge-text-bottom {
    font-size: clamp(2.2rem, 11vw, 3.2rem);
    text-align: right;
  }

  .section-title {
    font-size: 1.45rem;
  }

  .proj-footer-bar {
    flex-direction: column;
    align-items: flex-start;
    gap: 0.8rem;
  }

  .proj-github-action {
    align-self: flex-start;
  }
}
</style>