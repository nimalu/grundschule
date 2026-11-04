<template>
  <div class="page-shell">
    <NuxtRouteAnnouncer />
    <NuxtPage />
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
