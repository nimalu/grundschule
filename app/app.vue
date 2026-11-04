<script setup lang="ts">
import { ref } from 'vue'

const leftLetter = ref('A')
const rightLetter = ref('b')
const animationKey = ref(0)

function swingArrow() {
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
        <span class="eyebrow">Dein Lesehelfer</span>
        <h1>Leseroboter</h1>
        <p>Klicke auf die Buchstaben, um sie zu ändern.</p>
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
            :class="{ 'swing-right': animationKey > 0 }"
            viewBox="0 0 240 50"
            role="img"
            aria-label="Pfeil schwenkt zwischen den Augen von links nach rechts"
          >
            <path d="M 120 25 H 30 M 30 25 L 48 9 M 30 25 L 48 41" />
          </svg>
        </div>

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
      </section>
    </main>
  </div>
</template>

<style>
:root {
  font-family: Inter, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;
  color: #202a39;
  background: #f4f6f8;
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
  width: min(100%, 900px);
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 26px;
}

.page-heading {
  text-align: center;
}

.eyebrow {
  color: #62738b;
  font-size: 0.75rem;
  font-weight: 700;
  letter-spacing: 0.16em;
  text-transform: uppercase;
}

.page-heading h1 {
  margin: 7px 0 5px;
  font-size: clamp(2rem, 5vw, 3rem);
  line-height: 1.1;
  letter-spacing: -0.04em;
}

.page-heading p {
  margin: 0;
  color: #687588;
  font-size: clamp(0.9rem, 2vw, 1rem);
}

.robot-card {
  width: min(100%, 800px);
  padding: clamp(12px, 3vw, 26px);
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;
  border: 1px solid #e4e9ef;
  border-radius: 28px;
  background: #fff;
  box-shadow: 0 20px 60px rgb(36 51 72 / 9%);
}

.robot-stage {
  position: relative;
  width: 100%;
  overflow: hidden;
  line-height: 0;
  border-radius: 18px;
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
  border-radius: 12px;
  outline: none;
  background: transparent;
  color: #314c70;
  font-size: clamp(2rem, 11vw, 5rem);
  font-weight: 750;
  line-height: 1;
  text-align: center;
  caret-color: #436a9e;
}

.eye-input:focus-visible {
  outline: 3px solid #8eb6e7;
  outline-offset: -5px;
  background: rgb(225 237 251 / 45%);
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
}

.nose-arrow path {
  fill: none;
  stroke: #e47b45;
  stroke-linecap: round;
  stroke-linejoin: round;
  stroke-width: 18;
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

.swing-button {
  width: 68px;
  height: 68px;
  padding: 0;
  display: grid;
  place-items: center;
  border: 4px solid #b95432;
  border-radius: 50%;
  background: linear-gradient(145deg, #ffb27c, #ed7044);
  box-shadow: 0 7px 0 #9f4328, 0 12px 18px rgb(89 50 37 / 20%), inset 0 2px 3px rgb(255 255 255 / 65%);
  color: #fff;
  cursor: pointer;
  transition: transform 120ms ease, box-shadow 120ms ease, filter 120ms ease;
}

.swing-button svg {
  width: 30px;
  height: 30px;
  fill: none;
  stroke: currentColor;
  stroke-linecap: round;
  stroke-linejoin: round;
  stroke-width: 2.5;
}

.swing-button:hover {
  filter: brightness(1.05);
  transform: translateY(-1px);
}

.swing-button:active {
  transform: translateY(5px);
  box-shadow: 0 2px 0 #9f4328, 0 4px 8px rgb(89 50 37 / 18%), inset 0 2px 3px rgb(255 255 255 / 55%);
}

.swing-button:focus-visible {
  outline: 3px solid #8eb6e7;
  outline-offset: 3px;
}


@media (max-width: 540px) {
  .page-shell {
    padding-right: 12px;
    padding-left: 12px;
  }

  .reader-page {
    gap: 20px;
  }

  .robot-card {
    gap: 14px;
    border-radius: 20px;
  }

  .eye-input {
    border-radius: 8px;
    font-size: clamp(1.5rem, 12vw, 3.2rem);
  }

  .swing-button {
    width: 64px;
    height: 64px;
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
