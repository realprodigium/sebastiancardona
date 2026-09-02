<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import { useI18n } from 'vue-i18n'
import { Clock } from 'lucide-vue-next'

const { t } = useI18n()

const visitorTime = ref('')
const colombiaTime = ref('')
let timer = null

const updateTimes = () => {
  const now = new Date()
  
  // Format visitor's local time
  visitorTime.value = new Intl.DateTimeFormat('en-US', {
    hour: 'numeric',
    minute: '2-digit',
    second: '2-digit',
    hour12: true
  }).format(now)

  // Format Colombia time (America/Bogota, UTC-5)
  colombiaTime.value = new Intl.DateTimeFormat('en-US', {
    timeZone: 'America/Bogota',
    hour: 'numeric',
    minute: '2-digit',
    second: '2-digit',
    hour12: true
  }).format(now)
}

onMounted(() => {
  updateTimes()
  timer = setInterval(updateTimes, 1000)
})

onUnmounted(() => {
  if (timer) clearInterval(timer)
})
</script>

<template>
  <div class="timezone-widget" role="region" aria-label="Timezone Comparison">
    <div class="tz-item">
      <div class="tz-header">
        <span class="tz-pulse-dot" aria-hidden="true"></span>
        <span class="tz-label">{{ t('tzYourTime') }}</span>
      </div>
      <div class="tz-time">{{ visitorTime || '--:--:--' }}</div>
    </div>

    <div class="tz-divider" aria-hidden="true"></div>

    <div class="tz-item">
      <div class="tz-header">
        <Clock size="12" class="tz-clock-icon" aria-hidden="true" />
        <span class="tz-label">{{ t('tzMyTime') }}</span>
      </div>
      <div class="tz-time">{{ colombiaTime || '--:--:--' }}</div>
    </div>
  </div>
</template>

<style scoped>
.timezone-widget {
  display: inline-flex;
  align-items: center;
  gap: 1rem;
  padding: 0.65rem 1rem;
  border: 1px solid var(--border-color);
  border-radius: var(--radius-md);
  background: rgba(255, 255, 255, 0.02);
  backdrop-filter: blur(8px);
  -webkit-backdrop-filter: blur(8px);
  width: fit-content;
  transition: border-color 0.2s ease, background-color 0.2s ease;
}

.timezone-widget:hover {
  border-color: var(--border-focus);
  background: rgba(255, 255, 255, 0.035);
}

.tz-item {
  display: flex;
  flex-direction: column;
  gap: 0.2rem;
}

.tz-header {
  display: flex;
  align-items: center;
  gap: 0.35rem;
}

.tz-pulse-dot {
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background-color: var(--accent-green);
  box-shadow: 0 0 6px rgba(34, 197, 94, 0.6);
  animation: pulseGreen 2s infinite ease-in-out;
}

@keyframes pulseGreen {
  0%, 100% {
    transform: scale(1);
    opacity: 0.8;
  }
  50% {
    transform: scale(1.3);
    opacity: 1;
  }
}

.tz-clock-icon {
  color: var(--text-muted);
}

.tz-label {
  font-size: 0.64rem;
  font-weight: 600;
  letter-spacing: 0.06em;
  text-transform: uppercase;
  color: var(--text-muted);
}

.tz-time {
  font-size: 0.95rem;
  font-weight: 600;
  color: var(--text-color);
  font-variant-numeric: tabular-nums;
  letter-spacing: -0.01em;
}

.tz-divider {
  width: 1px;
  height: 28px;
  background-color: var(--border-color);
}

@media (max-width: 480px) {
  .timezone-widget {
    gap: 0.75rem;
    padding: 0.5rem 0.75rem;
  }
  .tz-time {
    font-size: 0.84rem;
  }
  .tz-label {
    font-size: 0.58rem;
  }
}
</style>
