<script setup lang="ts">
import { computed } from 'vue'
import type { TItem, TItemId } from '@/types/TItem'
import { t } from '@/i18n/t'

type Props = {
  items: TItem[]
  selectedIds: TItemId[]
  placeholder?: string
}

const props = defineProps<Props>()

const emit = defineEmits<{
  (event: 'select', id: number): void
}>()

const selectedSet = computed(() => new Set(props.selectedIds))
const placeholder = computed(() => {
  if (props.items.length > 0) return null
  return props.placeholder ?? t('placeholder.emptyList')
})

const isSelected = (id: number) => selectedSet.value.has(id)
const onItemClick = (id: number) => {
  emit('select', id)
}
</script>

<template>
  <div class="item-selector">
    <p v-if="placeholder" class="item-selector__placeholder">
      {{ placeholder }}
    </p>

    <ul v-else class="item-selector__list">
      <li
        v-for="item in props.items"
        :key="item.id"
        class="item-selector__item"
        :class="{ 'item-selector__item--selected': isSelected(item.id) }"
        @click="onItemClick(item.id)"
        @keydown.enter.prevent="onItemClick(item.id)"
        @keydown.space.prevent="onItemClick(item.id)"
      >
        <span class="item-selector__id">{{ item.id }}</span>
        <span class="item-selector__name">{{ item.name }}</span>
      </li>
    </ul>
  </div>
</template>

<style lang="scss" scoped>
.item-selector {
  --item-bg: #f1f1f1;
  --item-bg-hover: #e6e6e6;
  --item-bg-focus: #dedede;
  --item-bg-active: #d8d8d8;

  --item-bg-selected: #d2d2d2;
  --item-bg-selected-hover: #c8c8c8;
  --item-bg-selected-focus: #bfbfbf;
  --item-bg-selected-active: #b5b5b5;

  --item-text: #1f1f1f;
  --item-text-selected: #111;
  --placeholder-text: #262626;
}

.item-selector__list {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  margin: 0;
  padding: 0;
  list-style: none;
}

.item-selector__item {
  display: flex;
  flex-direction: row;
  border-radius: 0.375rem;
  overflow: hidden;

  background-color: var(--item-bg);
  color: var(--item-text);

  cursor: pointer;
  user-select: none;
  transition:
    background-color 0.15s ease,
    color 0.15s ease;

  &:hover {
    background-color: var(--item-bg-hover);
  }

  &:focus-visible {
    background-color: var(--item-bg-focus);
    outline: none;
  }

  &:active {
    background-color: var(--item-bg-active);
  }
}

.item-selector__id {
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0.35rem 0.75rem;
  background-color: var(--item-bg-selected);
  min-width: 2.625rem;
  width: auto;
  text-wrap: nowrap;
  white-space: nowrap;
}

.item-selector__name {
  padding: 0.35rem 0.75rem;
  width: 100%;
}

.item-selector__item--selected {
  background-color: var(--item-bg-selected);
  color: var(--item-text-selected);

  &:hover {
    background-color: var(--item-bg-selected-hover);
  }

  &:focus-visible {
    background-color: var(--item-bg-selected-focus);
  }

  &:active {
    background-color: var(--item-bg-selected-active);
  }
}

.item-selector__placeholder {
  margin: 0;
  padding: 0.5rem 0.75rem;
  color: var(--placeholder-text);
}
</style>
