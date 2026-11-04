<script setup lang="ts">
import { ref } from 'vue'

const leftLetter = ref('A')
const rightLetter = ref('b')
const animationKey = ref(0)
const arrowSwung = ref(false)

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
  <div class="page-shell">
    <NuxtRouteAnnouncer />

    <main class="reader-page">

      <section class="robot-card" aria-label="Leseroboter einstellen">
        <div class="robot-stage">
          <img class="robot-image" src="/Robo.png" alt="Ein freundlicher Roboter mit zwei großen Augen" />

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
            src="/Pfeil.png"
            alt="Pfeil schwenkt zwischen den Augen von links nach rechts"
          />
        </div>

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
      </section>
    </main>
  </div>
</template>

<style>
:root {
  font-family: Grundschrift, "Comic Neue", "Comic Sans MS", "Trebuchet MS", sans-serif;
  color: #1f3b63;
  background-color: #fffef8;
  background-image:
    url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='200' height='200'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='3' stitchTiles='stitch'/%3E%3CfeColorMatrix values='0 0 0 0 0.25  0 0 0 0 0.3  0 0 0 0 0.35  0 0 0 0.16 0'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E"),
    linear-gradient(rgb(150 195 230 / 55%) 1px, transparent 1px),
    linear-gradient(90deg, rgb(150 195 230 / 55%) 1px, transparent 1px);
  background-size: 200px 200px, 28px 28px, 28px 28px;
  font-synthesis: none;
  text-rendering: optimizeLegibility;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

* {
  box-sizing: border-box;
}

body {
  min-width: 320px;
  min-height: 100vh;
  margin: 0;
}

button,
input {
  font: inherit;
}

.page-shell {
  min-height: 100vh;
  padding: clamp(24px, 5vh, 56px) 20px;
  display: grid;
  place-items: center;
}

.reader-page {
  width: min(100%, 1300px);
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 28px;
}

.robot-card {
  width: min(100%, 1200px);
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
  border-radius: 20px;
  outline: none;
  background: transparent;
  color: #1f3b63;
  font-size: clamp(4.2rem, 21vw, 10rem);
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
  display: flex;
  align-items: center;
  gap: 24px;
}

.back-button {
  background: linear-gradient(180deg, #ffe066, #ffb703);
  color: #1f3b63;
}

.swing-button,
.back-button {
  width: 120px;
  height: 120px;
  padding: 0;
  display: grid;
  place-items: center;
  border: 0;
  background: url("/Knopf.png") center / 180% auto no-repeat;
  color: #fff;
  cursor: pointer;
  transition: transform 120ms ease, filter 120ms ease;
}

.swing-button svg,
.back-button svg {
  width: 40px;
  height: 40px;
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


@media (max-width: 540px) {
  .page-shell {
    padding-right: 12px;
    padding-left: 12px;
  }

  .reader-page {
    gap: 22px;
  }

  .robot-card {
    gap: 14px;
  }

  .eye-input {
    border-radius: 14px;
    font-size: clamp(3.3rem, 22vw, 6.4rem);
  }

  .swing-button,
  .back-button {
    width: 104px;
    height: 104px;
  }
}

@media (prefers-reduced-motion: reduce) {
  *,
  *::before,
  *::after {
    scroll-behavior: auto !important;
    transition-duration: 0.01ms !important;
    animation-duration: 0.01ms !important;
  }
}
</style>
