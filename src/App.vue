<script setup lang="ts">
import { storeToRefs } from 'pinia'
import { BaseSection, ItemSelector, SelectedItems } from './components'
import { AppLayout } from './layout'
import { useItemsStore } from './stores/items.store'
import { t } from './i18n/t'

const store = useItemsStore()

const {
  userItems,
  availableItems,
  selectedUserIds,
  selectedAvailableIds,
  selectedUserItems,
  selectedAvailableItems,
} = storeToRefs(store)
</script>

<template>
  <AppLayout>
    <BaseSection :title="t('section.selectedByUser')">
      <SelectedItems :items="selectedUserItems" :placeholder="t('placeholder.nothingSelected')" />
    </BaseSection>

    <BaseSection :title="t('section.selectedAdditional')">
      <SelectedItems
        :items="selectedAvailableItems"
        :placeholder="t('placeholder.nothingSelected')"
      />
    </BaseSection>

    <BaseSection :title="t('section.userChoice')">
      <ItemSelector
        :items="userItems"
        :selected-ids="selectedUserIds"
        @select="(id) => store.toggleItemSelection('user', id)"
      />
    </BaseSection>

    <BaseSection :title="t('section.availableChoice')">
      <ItemSelector
        :items="availableItems"
        :selected-ids="selectedAvailableIds"
        :limit="1"
        @select="(id) => store.toggleItemSelection('available', id)"
      />
    </BaseSection>
  </AppLayout>
</template>
