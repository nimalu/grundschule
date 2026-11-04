<script setup lang="ts">
import { onMounted, ref, watch } from 'vue'

const STORAGE_KEY = 'leseroboter-einstellungen'

const leftLetter = ref('A')
const rightLetter = ref('b')
const animationKey = ref(0)
const arrowSwung = ref(false)
const settingsOpen = ref(false)
const animationDuration = ref(2200)

onMounted(() => {
  const saved = localStorage.getItem(STORAGE_KEY)
  if (!saved) return

  try {
    const settings = JSON.parse(saved)
    if (typeof settings.leftLetter === 'string') leftLetter.value = settings.leftLetter
    if (typeof settings.rightLetter === 'string') rightLetter.value = settings.rightLetter
    if (typeof settings.animationDuration === 'number') animationDuration.value = settings.animationDuration
  } catch {
    localStorage.removeItem(STORAGE_KEY)
  }
})

watch([leftLetter, rightLetter, animationDuration], ([left, right, duration]) => {
  localStorage.setItem(STORAGE_KEY, JSON.stringify({
    leftLetter: left,
    rightLetter: right,
    animationDuration: duration,
  }))
})

function swingArrow() {
  arrowSwung.value = true
  animationKey.value += 1
}

function resetArrow() {
  arrowSwung.value = false
  animationKey.value += 1
}

function setRightLetter(event: Event) {
  rightLetter.value = (event.target as HTMLInputElement).value.toLocaleLowerCase('de-DE')
}
</script>

<template>
  <main class="reader-page">

    <section class="robot-card" aria-label="Leseroboter einstellen">
      <div class="robot-stage">
        <img class="robot-image" src="/Robo.webp" width="1600" height="1131" alt="Ein freundlicher Roboter mit zwei großen Augen" />

        <input
          v-model="leftLetter"
          class="eye-input eye-input-left"
          type="text"
          maxlength="3"
          aria-label="Buchstaben im linken Auge"
          autocomplete="off"
          spellcheck="false"
        />
        <input
          :value="rightLetter"
          class="eye-input eye-input-right"
          @input="setRightLetter"
          type="text"
          maxlength="3"
          aria-label="Buchstaben im rechten Auge"
          autocomplete="off"
          spellcheck="false"
        />


        <img
          :key="animationKey"
          class="nose-arrow"
          :class="{ 'swing-right': arrowSwung }"
          src="/Pfeil.webp"
          alt="Pfeil schwenkt zwischen den Augen von links nach rechts"
          :style="{ animationDuration: `${animationDuration}ms` }"
        />

        <div class="button-row">
          <button
            class="back-button"
            type="button"
            aria-label="Pfeil zurück nach links springen lassen"
            title="Pfeil zurück nach links springen lassen"
            @click="resetArrow"
          >
            <svg viewBox="0 0 24 24" aria-hidden="true">
              <path d="M20 12H5m6-6-6 6 6 6" />
            </svg>
          </button>

          <button
            class="swing-button"
            type="button"
            aria-label="Pfeil von links nach rechts schwenken"
            title="Pfeil von links nach rechts schwenken"
            @click="swingArrow"
          >
            <svg viewBox="0 0 24 24" aria-hidden="true">
              <path d="M4 12h15m-6-6 6 6-6 6" />
            </svg>
          </button>
        </div>
      </div>
    </section>

    <button
      class="settings-toggle"
      type="button"
      aria-controls="settings-panel"
      :aria-expanded="settingsOpen"
      aria-label="Einstellungen öffnen"
      title="Einstellungen"
      @click="settingsOpen = !settingsOpen"
    >
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <path d="M4 7h9m4 0h3M4 17h3m4 0h9" />
        <circle cx="15" cy="7" r="2" />
        <circle cx="9" cy="17" r="2" />
      </svg>
    </button>

    <section
      v-if="settingsOpen"
      id="settings-panel"
      class="settings-panel"
      aria-label="Einstellungen"
    >
      <label class="settings-field">
        <span>Buchstabe links</span>
        <input
          v-model="leftLetter"
          type="text"
          maxlength="3"
          autocomplete="off"
          spellcheck="false"
        />
      </label>

      <label class="settings-field">
        <span>Buchstabe rechts</span>
        <input
          :value="rightLetter"
          type="text"
          maxlength="3"
          autocomplete="off"
          spellcheck="false"
          @input="setRightLetter"
        />
      </label>

      <label class="settings-field">
        <span>Dauer der Animation: {{ (animationDuration / 1000).toFixed(1) }} s</span>
        <input
          v-model.number="animationDuration"
          type="range"
          min="300"
          max="5000"
          step="100"
        />
      </label>
    </section>
  </main>
</template>

<style>
.reader-page {
  width: min(100%, 1300px);
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 28px;
}

.robot-card {
  width: min(100%, 1200px);
  container-type: inline-size;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 22px;
}

.robot-stage {
  position: relative;
  width: 100%;
  overflow: hidden;
  line-height: 0;
}

.robot-image {
  display: block;
  width: 100%;
  height: auto;
}

.eye-input {
  position: absolute;
  top: 14.7%;
  width: 18%;
  height: 34.7%;
  padding: 0 2px;
  border: 0;
  border-radius: 1.67cqw;
  outline: none;
  background: transparent;
  color: #0f2340;
  font-size: 13.33cqw;
  font-weight: 700;
  line-height: 1;
  text-align: center;
  caret-color: #ff6b35;
}

.eye-input:focus-visible {
  outline: 4px dashed #ff8fab;
  outline-offset: -6px;
  background: rgb(255 210 63 / 35%);
}

.eye-input-left {
  left: 25.2%;
}

.eye-input-right {
  left: 59.9%;
}

.nose-arrow {
  position: absolute;
  top: 32%;
  left: 51.55%;
  width: 22.1%;
  height: auto;
  transform: translate(-2.6%, -50%) rotate(144.5deg);
  transform-origin: 2.6% 50%;
  pointer-events: none;
}

.nose-arrow.swing-right {
  animation: swing-right 2200ms cubic-bezier(0.42, 0, 0.58, 1) both;
}

@keyframes swing-right {
  from {
    transform: translate(-2.6%, -50%) rotate(144.5deg);
  }

  to {
    transform: translate(-2.6%, -50%) rotate(35.5deg);
  }
}

.button-row {
  position: absolute;
  z-index: 1;
  top: 77%;
  left: 47%;
  display: flex;
  align-items: center;
  gap: 2cqw;
}

.back-button {
  background: linear-gradient(180deg, #ffe066, #ffb703);
  color: #1f3b63;
}

.swing-button,
.back-button {
  width: 10cqw;
  height: 10cqw;
  padding: 0;
  display: grid;
  place-items: center;
  border: 0;
  background: url("/Knopf.webp") center / 180% auto no-repeat;
  color: #fff;
  cursor: pointer;
  transition: transform 120ms ease, filter 120ms ease;
}

.swing-button svg,
.back-button svg {
  width: 3.33cqw;
  height: 3.33cqw;
  fill: none;
  stroke: currentColor;
  stroke-linecap: round;
  stroke-linejoin: round;
  stroke-width: 3.5;
  filter: drop-shadow(0 2px 0 #1f3b63);
}

.swing-button:hover,
.back-button:hover {
  filter: brightness(1.06);
  transform: translateY(-2px);
}

.swing-button:active,
.back-button:active {
  transform: translateY(4px);
}

.swing-button:focus-visible,
.back-button:focus-visible {
  outline: 4px dashed #ff8fab;
  outline-offset: 4px;
}

.settings-toggle {
  position: fixed;
  right: 24px;
  bottom: 24px;
  width: 72px;
  height: 72px;
  padding: 0;
  display: grid;
  place-items: center;
  border: 0;
  background: url("/Knopf.webp") center / 180% auto no-repeat;
  color: #fff;
  cursor: pointer;
  transition: transform 120ms ease, filter 120ms ease;
}

.settings-toggle svg {
  width: 30px;
  height: 30px;
  fill: none;
  stroke: currentColor;
  stroke-linecap: round;
  stroke-width: 2.5;
  filter: drop-shadow(0 2px 0 #1f3b63);
}

.settings-toggle:hover {
  filter: brightness(1.06);
  transform: translateY(-2px);
}

.settings-toggle:active {
  transform: translateY(4px);
}

.settings-toggle:focus-visible {
  outline: 4px dashed #ff8fab;
  outline-offset: 4px;
}

.settings-panel {
  position: fixed;
  right: 24px;
  bottom: 110px;
  width: min(calc(100vw - 48px), 300px);
  padding: 20px;
  display: flex;
  flex-direction: column;
  gap: 16px;
  border-radius: 20px;
  background: #fff8e1;
  box-shadow: 0 8px 24px rgb(31 59 99 / 25%);
  color: #1f3b63;
}

.settings-field {
  display: flex;
  flex-direction: column;
  gap: 6px;
  font-weight: 700;
}

.settings-field input[type="text"] {
  padding: 8px 10px;
  border: 2px solid #ffb703;
  border-radius: 10px;
  font: inherit;
  color: #1f3b63;
  background: #fff;
}

.settings-field input[type="range"] {
  width: 100%;
  accent-color: #ffb703;
}

@media (max-width: 540px) {
  .reader-page {
    gap: 22px;
  }

  .robot-card {
    gap: 14px;
  }
}
</style>
