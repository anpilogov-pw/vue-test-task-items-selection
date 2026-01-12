import { computed, ref, type ComputedRef, type Ref } from 'vue'
import { defineStore } from 'pinia'
import { USER_ITEMS, AVAILABLE_ITEMS } from '@/data'
import type { TItem, TItemId } from '@/types/TItem'
import { CONFIG } from '@/constants/config'

type SelectionMode = 'single' | 'multi'

type CollectionState = {
  items: Ref<TItem[]>
  selectedIds: Ref<TItemId[]>
  selectionMode: SelectionMode
  selectionLimit?: number
}

export const useItemsStore = defineStore('items', () => {
  const collections = {
    user: {
      items: ref<TItem[]>(USER_ITEMS),
      selectedIds: ref<TItemId[]>([]),
      selectionMode: 'multi',
      selectionLimit: CONFIG.MAX_USER_SELECTED,
    },
    available: {
      items: ref<TItem[]>(AVAILABLE_ITEMS),
      selectedIds: ref<TItemId[]>([]),
      selectionMode: 'single',
      selectionLimit: 1,
    },
  } as const satisfies Record<string, CollectionState>

  type CollectionType = keyof typeof collections

  const collectionKeys: readonly CollectionType[] = ['user', 'available']

  const itemIndexByCollection: Record<CollectionType, ComputedRef<Map<TItemId, TItem>>> = {
    user: computed(() => {
      return new Map(collections.user.items.value.map((item) => [item.id, item] as const))
    }),
    available: computed(() => {
      return new Map(collections.available.items.value.map((item) => [item.id, item] as const))
    }),
  }

  const getSelectedItems = (collectionType: CollectionType) =>
    computed<TItem[]>(() => {
      const itemIndex = itemIndexByCollection[collectionType].value
      const selectedIds = collections[collectionType].selectedIds.value

      return selectedIds
        .map((selectedId) => itemIndex.get(selectedId))
        .filter((item): item is TItem => Boolean(item))
    })

  const selectedUserItems = getSelectedItems('user')
  const selectedAvailableItems = getSelectedItems('available')

  const toggleItemSelection = (collectionType: CollectionType, TItemId: TItemId) => {
    const collectionState = collections[collectionType]
    const currentSelectedIds = collectionState.selectedIds.value
    const isAlreadySelected = currentSelectedIds.includes(TItemId)

    if (collectionState.selectionMode === 'single') {
      collectionState.selectedIds.value = isAlreadySelected ? [] : [TItemId]
      return
    }

    if (isAlreadySelected) {
      collectionState.selectedIds.value = currentSelectedIds.filter(
        (selectedTItemId) => selectedTItemId !== TItemId,
      )
      return
    }

    const selectionLimit = collectionState.selectionLimit ?? Infinity
    if (currentSelectedIds.length >= selectionLimit) return

    collectionState.selectedIds.value = [...currentSelectedIds, TItemId]
  }

  const clearSelections = () => {
    collectionKeys.forEach((collectionType) => {
      collections[collectionType].selectedIds.value = []
    })
  }

  return {
    // collections
    collections,

    // aliases for existing UI
    userItems: collections.user.items,
    availableItems: collections.available.items,

    selectedUserIds: collections.user.selectedIds,
    selectedAvailableIds: collections.available.selectedIds,

    // derived
    selectedUserItems,
    selectedAvailableItems,

    // actions
    toggleItemSelection,
    clearSelections,
  }
})
