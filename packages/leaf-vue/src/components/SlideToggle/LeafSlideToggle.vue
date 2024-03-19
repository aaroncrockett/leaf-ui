<script lang="ts" setup>
import { computed, ref, withDefaults } from 'vue'
import classNames from 'classnames'

defineEmits(['click', 'keydown'])

interface SlideToggleProps {
  isToggleOn?: boolean
  label: string
  text?: string
  slideToggleClasses?: string
  trackClasses?: string
  thumbClasses?: string
}

const props = withDefaults(defineProps<SlideToggleProps>(), {
  isToggleOn: false,
  text: '',
  slideToggleClasses: 'l3f__slide-toggle l3f_slide-toggle-opts',
  trackClasses: 'l3f_track l3f_track-small bg-neutral-300',
  thumbClasses: 'l3f_thumb bg-neutral',
})

const isToggleOnRef = ref(props.isToggleOn)

const onToggle = () => {
  isToggleOnRef.value = !isToggleOnRef.value
}

const onClass = computed(() => `${isToggleOnRef.value ? 'l3f_is-toggle-on' : ''}`)

const mergedThumbClasses = computed(() => classNames([props.thumbClasses, onClass.value]))
</script>

<template>
  <div :class="slideToggleClasses" role="switch" data-testid="slide-toggle" tabindex="0" aria-label="{label}">
    <button :class="trackClasses" :aria-pressed="isToggleOnRef" @click="onToggle" @keydown="$emit('keydown', $event)">
      <span aria-hidden="true" :class="mergedThumbClasses"></span>
    </button>
  </div>

  <p v-if="$slots['text']"><slot name="text" /></p>
</template>
