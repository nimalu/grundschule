<template>
  <main class="home-page">
    <NuxtLink class="home-link" to="/leseroboter">Leseroboter</NuxtLink>
  </main>
</template>

<style scoped>
.home-page {
  display: flex;
  justify-content: center;
}

.home-link {
  padding: 16px 32px;
  border-radius: 20px;
  background: linear-gradient(180deg, #ffe066, #ffb703);
  color: #1f3b63;
  font-size: 1.5rem;
  font-weight: 700;
  text-decoration: none;
  box-shadow: 0 4px 0 #1f3b63;
}

.home-link:hover {
  filter: brightness(1.06);
}

.home-link:focus-visible {
  outline: 4px dashed #ff8fab;
  outline-offset: 4px;
}
</style>
