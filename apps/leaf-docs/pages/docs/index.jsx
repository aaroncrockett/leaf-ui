import withLayout from '@providers/withLayOut'
// Next
// import Image from 'next/image'
// import { Inter } from 'next/font/google'

// const inter = Inter({ subsets: ['latin'] })

const DocsPage = ({ user = {}, cat = 'cat' }) => {
  return <div className="p-4">Docs</div>
}

const DocsPageWithProviders = withLayout({ options: { showSidebarLeft: true } })(DocsPage)

export default DocsPageWithProviders
