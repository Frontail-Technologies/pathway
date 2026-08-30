import Link from 'next/link'

export function AdminHeader() { return <header className="border-b bg-brand-blue-dark text-primary-foreground"><div className="container-shell flex h-14 items-center justify-between"><Link href="/" className="font-heading text-lg font-extrabold">pathway<span className="text-cta">.</span></Link><span className="text-sm opacity-80">Operations console</span></div></header> }
