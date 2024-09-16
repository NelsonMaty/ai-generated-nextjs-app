'use client'

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import Image from 'next/image';

interface SidebarLinkProps {
  href: string;
  label: string;
  icon: string;
}

function SidebarLink({ href, label, icon }: SidebarLinkProps) {
  const pathname = usePathname();
  const isActive = pathname === href;

  return (
    <Link
      href={href}
      className={`flex items-center py-2 px-4 rounded-lg ${
        isActive ? 'bg-blue-100 text-blue-600' : 'text-gray-700 hover:bg-gray-100'
      }`}
    >
      <span className="mr-3 text-xl">{icon}</span>
      {label}
    </Link>
  );
}

export function Sidebar() {
  return (
    <aside className="w-64 bg-white text-gray-800 p-4 border-r border-gray-200">      
    <div className="mb-8 flex items-center">
        <div className="w-10 h-10 rounded-full bg-gray-300 mr-3 overflow-hidden">
          <Image
            src="/avatar-placeholder.png"
            alt="Avatar"
            width={40}
            height={40}
            className="object-cover"
          />
        </div>
        <div>
          <h1 className="text-xl font-semibold">FinanceCo</h1>
          <p className="text-sm text-gray-500">Manage your money</p>
        </div>
      </div>
      <nav className="space-y-1">
        <SidebarLink href="/dashboard" label="Home" icon="🏠" />
        <SidebarLink href="/deposit" label="Deposit" icon="↓" />
        <SidebarLink href="/withdraw" label="Withdraw" icon="↑" />
        <SidebarLink href="/settings" label="Settings" icon="⚙️" />
      </nav>
    </aside>
  );
}
