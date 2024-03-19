<script lang="ts" setup>
import classNames from 'classnames'

import { type ComputedRef, computed, inject, ref, withDefaults } from 'vue'

const emit = defineEmits([
  'blur',
  'change',
  'click',
  'focus',
  'keydown',
  'keypress',
  'keyup',
  'mouseleave',
  'mouseover',
  'update:modelValue',
])
export interface AppRailButtonProps {
  modelValue: string
  name: string
  title: string
  value: string
  selected?: boolean
  railTileWrapperClasses?: string
  railTileContentWrapperClasses?: string
  railItemClasses?: string
  railLabelClasses?: string
}

const props = withDefaults(defineProps<AppRailButtonProps>(), {
  selected: false,
  railTileWrapperClasses: 'l3f_rail-toggle-wrapper l3f_rail-toggle-wrapper-opts',
  railTileContentWrapperClasses: 'l3f_rail-toggle-text-wrapper',
  railItemClasses: 'l3f_rail-item l3f_rail-item-opts',
  railLabelClasses: 'l3f_rail-label',
})

const activeClass = inject<ComputedRef<string>>('active')

const modelValueRef = ref(props.modelValue)

// Computed classes
const selectedActiveClass = computed(() => `${props.selected ? activeClass?.value : ''}`)

const mergedWrapperClasses = computed(() => classNames([props.railTileWrapperClasses, selectedActiveClass.value]))

function handleInput(e: any) {
  modelValueRef.value = e?.target?.value
  emit('update:modelValue', modelValueRef.value)
}
</script>

<template>
  <label :class="mergedWrapperClasses" :title="title">
    <div class="l3f_app-rail-inner hidden-radio">
      <input
        type="radio"
        :value="value"
        :name="name"
        @change="(e) => handleInput(e)"
        @input="(e) => handleInput(e)"
        @click="(e) => handleInput(e)"
        :checked="selected"
      />
    </div>
    <div :class="railItemClasses">
      <div :class="railTileContentWrapperClasses">
        <slot name="lead"></slot>

        <span :class="railLabelClasses"><slot name="label"></slot></span>
      </div>
    </div>
  </label>
</template>
