<script setup lang="ts">
import { useId } from 'vue'

type Props = {
  title: string
}
const props = defineProps<Props>()

const titleId = useId()
</script>

<template>
  <section class="base-section" :aria-labelledby="titleId">
    <h2 :id="titleId" class="base-section__title">{{ props.title }}</h2>
    <div class="base-section__body">
      <slot />
    </div>
  </section>
</template>

<style lang="scss" scoped>
.base-section {
  --scroll-track: #f2f2f2;
  --scroll-thumb: #c9c9c9;
  --scroll-thumb-hover: #b5b5b5;

  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
  padding: 1.5rem;
  background-color: white;
}

.base-section__title {
  font-size: 1.5rem;
  line-height: 130%;
  margin-bottom: 1rem;
  border-bottom: 0.0625rem solid #d0d0d0;
}

.base-section__body {
  height: 16rem;
  overflow: auto;

  scrollbar-width: thin;
  scrollbar-color: var(--scroll-thumb) var(--scroll-track);

  -webkit-overflow-scrolling: touch;
}

.base-section__body::-webkit-scrollbar {
  width: 0.625rem;
  height: 0.625rem;
}

.base-section__body::-webkit-scrollbar-track {
  background: var(--scroll-track);
  border-radius: 62.4375rem;
}

.base-section__body::-webkit-scrollbar-thumb {
  background: var(--scroll-thumb);
  border-radius: 62.4375rem;
  border: 0.125rem solid var(--scroll-track);
}

.base-section__body::-webkit-scrollbar-thumb:hover {
  background: var(--scroll-thumb-hover);
}
</style>
