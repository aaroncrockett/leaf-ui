import withLayout from '@providers/withLayOut'
// Next
// import Image from 'next/image'
// import { Inter } from 'next/font/google'

// const inter = Inter({ subsets: ['latin'] })

const HomePage = ({ user = {}, cat = 'cat' }) => {
  return <div className="p-4">HomePage</div>
}

const HomePageWithProviders = withLayout({ options: { showSidebarLeft: true } })(HomePage)

export default HomePageWithProviders
