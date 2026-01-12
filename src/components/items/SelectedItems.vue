<script setup lang="ts">
import { t } from '@/i18n/t'
import type { TItem } from '@/types/TItem'
import { computed } from 'vue'

type Props = {
  items: TItem[]
  placeholder?: string
}

const props = defineProps<Props>()

const placeholder = computed(() => {
  if (props.items.length > 0) return null
  return props.placeholder ?? t('placeholder.emptyList')
})
</script>

<template>
  <div class="selected-items">
    <Transition name="list-switch" mode="out-in">
      <p v-if="placeholder" class="selected-items__placeholder">
        {{ placeholder }}
      </p>

      <template v-else>
        <TransitionGroup name="slide-up" tag="ul" class="selected-items__list">
          <li v-for="item in props.items" :key="item.id" class="selected-items__item">
            <span class="selected-items__id">{{ item.id }}</span>
            <span class="selected-items__name">{{ item.name }}</span>
          </li>
        </TransitionGroup>
      </template>
    </Transition>
  </div>
</template>

<style lang="scss" scoped>
.selected-items {
  --item-bg: #f1f1f1;
  --item-id-bg: #dcdcdc;
  --item-text: #1f1f1f;
  --placeholder-text: #262626;

  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.selected-items__list {
  position: relative;
  display: flex;
  flex-direction: column;
  gap: 1rem;
  margin: 0;
  padding: 0;
  list-style: none;
}

.selected-items__item {
  display: flex;
  flex-direction: row;
  border-radius: 0.375rem;
  overflow: hidden;

  background-color: var(--item-bg);
  color: var(--item-text);

  cursor: default;
  user-select: text;
}

.selected-items__id {
  display: flex;
  align-items: center;
  justify-content: center;

  padding: 0.35rem 0.75rem;
  background-color: var(--item-id-bg);

  min-width: 2.625rem;
  white-space: nowrap;
}

.selected-items__name {
  padding: 0.35rem 0.75rem;
  width: 100%;
}

.selected-items__placeholder {
  margin: 0;
  padding: 0.5rem 0.75rem;
  color: var(--placeholder-text);
}
</style>
