export default function AppShell({
  PageFooter,
  PageHeader,
  SidebarLeft,
  SidebarRight,
  SiteFooter,
  SiteHeader,
  children,
  appShellCls = 'l3f__app-shell',
  pageCls = 'l3f_page',
  pageFooterCls = 'l3f_page-footer',
  pageHeaderCls = 'l3f_page-header',
  pageMainCls = 'l3f_page-main',
  siteCentralWrapperCls = 'l3f_site-central-wrapper',
  siteFooterCls = 'l3f_site-footer',
  siteHeaderCls = 'l3f_site-header l3f_site-header-opts',
  siteSidebarLeftCls = 'l3f_site-sidebar-left l3f_site-sidebar-left-opts',
  siteSidebarRightCls = 'l3f_site-sidebar-right l3f_site-sidebar-right-opts',
}) {
  return (
    <div className={appShellCls}>
      {SiteHeader && (
        <header className={siteHeaderCls}>
          <SiteHeader />
        </header>
      )}
      <div className={siteCentralWrapperCls}>
        {SidebarLeft && (
          <aside className={siteSidebarLeftCls}>
            <SidebarLeft />
          </aside>
        )}
        <div className={pageCls}>
          {PageHeader && (
            <header className={pageHeaderCls}>
              <PageHeader />
            </header>
          )}
          <main className={pageMainCls}>{children}</main>
          {PageFooter && (
            <footer className={pageFooterCls}>
              <PageFooter />
            </footer>
          )}
        </div>
        {SidebarRight && (
          <aside className={siteSidebarRightCls}>
            <SidebarRight />
          </aside>
        )}
      </div>
      {SiteFooter && (
        <footer className={siteFooterCls}>
          <SiteFooter />
        </footer>
      )}
    </div>
  )
}
