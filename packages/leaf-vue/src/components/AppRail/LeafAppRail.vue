<script lang="ts" setup>
import { withDefaults, computed, provide } from 'vue'

export interface AppRailProps {
  appRailCls?: string
  activeTokenClass?: string
  regionLeadCls?: string
  regionDefaultCls?: string
  regionTailCls?: string
}

const props = withDefaults(defineProps<AppRailProps>(), {
  appRailCls: 'l3f__app-rail l3f_app-rail-opts',
  activeTokenClass: 'bg-primary',
  regionLeadCls: '',
  regionDefaultCls: '',
  regionTailCls: '',
})

const activeClass = computed(() => `${props.activeTokenClass}`)

provide('active', activeClass)
const name = ''
const value = ''
</script>
<template>
  <div :class="appRailCls">
    <div :class="regionLeadCls"><slot name="lead" /></div>
    <div :class="regionDefaultCls"><slot /></div>
    <div :class="regionTailCls"><slot name="tail" /></div>
  </div>
</template>
