<template>
  <main class="layout">
    <slot />
  </main>
</template>

<style lang="scss" scoped>
.layout {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  grid-template-rows: repeat(2, 1fr);
  max-width: 48rem;
  height: 100dvh;
  margin: 0 auto;
}
</style>
