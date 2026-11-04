<script setup lang="ts">
useHead({
  link: [{ rel: 'icon', type: 'image/svg+xml', href: '/favicon.svg' }],
})
</script>

<template>
  <div class="page-shell">
    <NuxtRouteAnnouncer />
    <NuxtPage />
    <p class="font-credit">
      Schrift: <a href="https://www.cdnfonts.com/grundschrift.font" target="_blank" rel="noopener">Grundschrift</a> von Christian Urff, <a href="http://creativecommons.org/licenses/by/3.0/" target="_blank" rel="noopener">CC BY 3.0</a>
    </p>
  </div>
</template>

<style>
@font-face {
  font-family: Grundschrift;
  font-style: normal;
  font-weight: 400;
  font-display: swap;
  src: url("/fonts/Grundschrift-Regular.woff") format("woff");
}

@font-face {
  font-family: Grundschrift;
  font-style: normal;
  font-weight: 700;
  font-display: swap;
  src: url("/fonts/Grundschrift-Bold.woff") format("woff");
}

:root {
  font-family: Grundschrift, "Comic Neue", "Comic Sans MS", "Trebuchet MS", sans-serif;
  color-scheme: light;
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

.font-credit {
  position: fixed;
  left: 16px;
  bottom: 12px;
  margin: 0;
  font-size: 0.8rem;
}

.font-credit a {
  color: inherit;
}

@media (max-width: 540px) {
  .page-shell {
    padding-right: 12px;
    padding-left: 12px;
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
