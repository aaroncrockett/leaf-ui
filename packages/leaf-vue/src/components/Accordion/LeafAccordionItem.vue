<script lang="ts" setup>
import { useAccordionStore } from './store.ts'
import { computed, inject, ref, watch, withDefaults } from 'vue'
import classNames from 'classnames'

if (!useAccordionStore) {
  throw new Error('useAccordionStore is undefined')
}
const autocollapse = inject<boolean>('autocollapse')

const { isActive, setActiveItem } = useAccordionStore()!

const emit = defineEmits(['toggle'])

interface AccordionItemProps {
  isOpened?: boolean
  accordionClasses?: string
  accordionHeaderClasses?: string
  headerControlClasses?: string
  accordionSectionWrapper?: string
  accordionSection?: string
}

const props = withDefaults(defineProps<AccordionItemProps>(), {
  isOpened: false,
  accordionClasses: 'l3f_accordion',
  accordionHeaderClasses: 'l3f_accordion-header',
  headerControlClasses: 'l3f_header-control',
  accordionSectionWrapper: 'l3f_accordion-section-wrapper',
  accordionSection: 'l3f_accordion-section',
})

const isOpenedRef = ref<boolean>(props.isOpened)
const currentOpenState = ref(isOpenedRef.value)
const itemId = ref(String(Math.random()))

const openedItemClass = computed(() => currentOpenState.value && 'opened')

const mergedAccordionClasses = computed(() => classNames([props.accordionClasses, openedItemClass.value]))

function onToggle(event?: MouseEvent) {
  currentOpenState.value = autocollapse ? isActive(itemId.value).value : isOpenedRef.value

  const toggleEvent = {
    event,
    id: `accordion-control-${itemId.value}`,
    isOpened: currentOpenState.value,
  }

  emit('toggle', toggleEvent)
}

async function determineToggle(event?: MouseEvent) {
  if (autocollapse === true) {
    // Active item is set to indicate a single active item at once.
    setActiveItem(itemId.value)
  } else {
    // if autocollapse, toggle
    isOpenedRef.value = !isOpenedRef.value
  }
  onToggle(event)
}
// immediate: true so we cheeck when isActive has changed since next tick.
watch(
  () => isActive(itemId.value).value,
  (isActiveValue) => {
    // When isActive changes, if autocollapse, all items need to be notified and closed if not active item.
    currentOpenState.value = autocollapse ? isActiveValue : isOpenedRef.value
  },
  { immediate: true },
)

// if isOpenedRef is set by passing in a prop, and we have autocollapse, setActiveItem and trigger the watch to ensure multiple init items aren't open.
if (autocollapse && isOpenedRef.value) setActiveItem(itemId.value)
</script>
<template>
  <div :class="mergedAccordionClasses">
    <button :class="accordionHeaderClasses" @click="determineToggle">
      <slot name="header"></slot><span class="l3f_header-control"></span>
    </button>

    <div :class="accordionSectionWrapper">
      <div :class="accordionSection"><slot></slot></div>
    </div>
  </div>
</template>
