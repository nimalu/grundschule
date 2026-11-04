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
      <header class="page-heading">
        <h1>Leseroboter</h1>
      </header>

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

          <svg
            :key="animationKey"
            class="nose-arrow"
            :class="{ 'swing-right': arrowSwung }"
            viewBox="0 0 240 50"
            role="img"
            aria-label="Pfeil schwenkt zwischen den Augen von links nach rechts"
          >
            <path d="M 120 25 H 8 M 8 25 L 26 9 M 8 25 L 26 41" />
          </svg>
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
  background: linear-gradient(180deg, #b8e6ff 0%, #e6f7ff 55%, #fff6d1 100%);
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
  width: min(100%, 1100px);
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 28px;
}

.page-heading {
  text-align: center;
}


.page-heading h1 {
  margin: 0;
  color: #000;
  font-size: clamp(2.6rem, 6vw, 3.8rem);
  font-weight: 700;
  line-height: 1.1;

}


.robot-card {
  width: min(100%, 1000px);
  padding: clamp(14px, 3vw, 28px);
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 22px;
  border: 5px solid #1f3b63;
  border-radius: 40px;
  background: #fff;
  box-shadow: 0 12px 0 #1f3b63;
}

.robot-stage {
  position: relative;
  width: 100%;
  overflow: hidden;
  line-height: 0;
  border-radius: 28px;
  background: #fff;
}

.robot-image {
  display: block;
  width: 100%;
  height: auto;
}

.eye-input {
  position: absolute;
  top: 17%;
  width: 16%;
  height: 34%;
  padding: 0 2px;
  border: 0;
  border-radius: 20px;
  outline: none;
  background: transparent;
  color: #1f3b63;
  font-size: clamp(2.2rem, 11vw, 5.2rem);
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
  left: 28.7%;
}

.eye-input-right {
  left: 57.3%;
}

.nose-arrow {
  position: absolute;
  top: 35.5%;
  left: 50%;
  width: 32%;
  height: auto;
  overflow: visible;
  transform: translateX(-50%) rotate(-45deg);
  transform-origin: 50% 50%;
  pointer-events: none;
  filter: drop-shadow(3px 0 0 #1f3b63) drop-shadow(-3px 0 0 #1f3b63) drop-shadow(0 3px 0 #1f3b63) drop-shadow(0 -3px 0 #1f3b63);
}

.nose-arrow path {
  fill: none;
  stroke: #ff9f1c;
  stroke-linecap: round;
  stroke-linejoin: round;
  stroke-width: 26;
}

.nose-arrow.swing-right {
  animation: swing-right 2200ms cubic-bezier(0.42, 0, 0.58, 1) both;
}

@keyframes swing-right {
  from {
    transform: translateX(-50%) rotate(-45deg);
  }

  to {
    transform: translateX(-50%) rotate(-135deg);
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
  width: 84px;
  height: 84px;
  padding: 0;
  display: grid;
  place-items: center;
  border: 5px solid #1f3b63;
  border-radius: 50%;
  background: linear-gradient(180deg, #8ff07f, #2fb85b);
  box-shadow: 0 9px 0 #1f3b63;
  color: #fff;
  cursor: pointer;
  transition: transform 120ms ease, box-shadow 120ms ease, filter 120ms ease;
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
  transform: translateY(7px);
  box-shadow: 0 2px 0 #1f3b63;
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
    border-radius: 30px;
  }

  .eye-input {
    border-radius: 14px;
    font-size: clamp(1.7rem, 12vw, 3.4rem);
  }

  .swing-button,
  .back-button {
    width: 76px;
    height: 76px;
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
