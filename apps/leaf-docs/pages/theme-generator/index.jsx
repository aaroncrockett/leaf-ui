import withLayout from '@providers/withLayOut'
// Next
// import Image from 'next/image'
// import { Inter } from 'next/font/google'

// const inter = Inter({ subsets: ['latin'] })

const ThemeGeneratorPage = ({ user = {}, cat = 'cat' }) => {
  return <div className="p-4">Theme Generator</div>
}

const ThemeGeneratorPageWithProviders = withLayout({ options: { showSidebarLeft: true } })(ThemeGeneratorPage)

export default ThemeGeneratorPageWithProviders
