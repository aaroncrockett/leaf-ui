import Header from '@components/layout/Header.jsx'
import SiteFooter from '@components/layout/Footer.jsx'
import AppShell from 'leaf-react/lib/AppShell'
import SidebarLeft from '@components/layout/SidebarLeft.jsx'

const withLayout =
  ({ options }) =>
  (WrappedComponent) => {
    const SidebarLeftComponent = options?.showSidebarLeft ? SidebarLeft : null

    const shellProps = {
      SiteFooter: SiteFooter,
      SidebarLeft: SidebarLeftComponent,
      SiteHeader: Header,
    }

    return function LayoutProvider({ ...props }) {
      return (
        <AppShell {...shellProps}>
          <WrappedComponent {...props} />
        </AppShell>
      )
    }
  }

export default withLayout
