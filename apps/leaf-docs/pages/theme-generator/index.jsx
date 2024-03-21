import withLayout from '@providers/withLayOut'
import ThemeGenerator from '../../features/theme-generator/ThemeGenerator'

const ThemeGeneratorPage = ({ user = {}, cat = 'cat' }) => {
  return (
    <div className="p-4">
      <ThemeGenerator />
    </div>
  )
}

const ThemeGeneratorPageWithProviders = withLayout({ options: { showSidebarLeft: true } })(ThemeGeneratorPage)

export default ThemeGeneratorPageWithProviders
