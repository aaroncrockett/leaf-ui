import NavTopLevel from '@components/NavTopLevel.jsx'
import Logo from '@components/Logo.jsx'

export default function Header() {
  return (
    <div className="w-full bg-neutral p-4 flex space-x-6">
      <Logo />
      <NavTopLevel />
    </div>
  )
}
