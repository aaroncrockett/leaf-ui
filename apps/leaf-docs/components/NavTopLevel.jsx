import Link from 'next/link'

export default function NavTopLevel() {
  return (
    <ul className="flex space-x-3">
      <li>
        <Link href="/">Home</Link>
      </li>
      <li>
        <Link href="/docs">Docs</Link>
      </li>
      <li>
        <Link href="/theme-generator">Theme Generator</Link>
      </li>
    </ul>
  )
}
