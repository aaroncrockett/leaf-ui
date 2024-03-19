<script setup lang="ts">
import { ref, withDefaults } from 'vue'

export interface AppShellProps {
  appShellCls?: string
  siteHeaderCls?: string
  siteCentralWrapperCls?: string
  siteSidebarLeftCls?: string
  siteSidebarRightCls?: string
  pageCls?: string
  pageHeaderCls?: string
  pageMainCls?: string
  pageFooterCls?: string
  siteFooterCls?: string
}

withDefaults(defineProps<AppShellProps>(), {
  appShellCls: 'l3f__app-shell',
  siteHeaderCls: 'l3f_site-header l3f_site-header-opts',
  siteCentralWrapperCls: 'l3f_site-central-wrapper',
  siteSidebarLeftCls: 'l3f_site-sidebar-left l3f_site-sidebar-left-opts',
  siteSidebarRightCls: 'l3f_site-sidebar-right l3f_site-sidebar-right-opts',
  pageCls: 'l3f_page',
  pageHeaderCls: 'l3f_page-header',
  pageMainCls: 'l3f_page-main',
  pageFooterCls: 'l3f_page-footer',
  siteFooterCls: 'l3f_site-footer',
})
</script>
<template>
  <div :class="appShellCls">
    <header v-if="$slots['header']" id="site-header" :class="siteHeaderCls"><slot name="header" /></header>
    <div :class="siteCentralWrapperCls">
      <aside v-if="$slots['sidebar-left']" id="site-sidebar-left" :class="siteSidebarLeftCls">
        <slot name="sidebar-left" />
      </aside>
      <div id="page" :class="pageCls">
        <header v-if="$slots['page-header']" id="page-header" :class="pageHeaderCls">
          <slot name="page-header" />
        </header>
        <main id="page-main" :class="pageMainCls"><slot /></main>
        <footer v-if="$slots['page-footer']" id="page-footer" :class="pageFooterCls">
          <slot name="page-footer" />
        </footer>
      </div>
      <aside v-if="$slots['sidebar-right']" id="site-sidebar-right" :class="siteSidebarLeftCls">
        <slot name="sidebar-right" />
      </aside>
    </div>
    <footer v-if="$slots['footer']" id="site-footer" :class="siteFooterCls"></footer>
  </div>
</template>
