import Image from 'next/image';
import Link from 'next/link';

interface SidebarProps {
  activePage: 'dashboard' | 'deposit' | 'withdraw' | 'settings';
}

export function Sidebar({ activePage }: SidebarProps) {
  return (
    <div className="w-64 bg-white shadow-md">
      <div className="p-4 flex items-center">
        <Image src="/path-to-logo.jpg" alt="FinanceCo Logo" width={40} height={40} className="rounded-full" />
        <div className="ml-2">
          <h2 className="font-bold text-gray-800">FinanceCo</h2>
          <p className="text-sm text-gray-600">Manage your money</p>
        </div>
      </div>
      <nav className="mt-4">
        <SidebarLink href="/dashboard" icon={HomeIcon} text="Home" isActive={activePage === 'dashboard'} />
        <SidebarLink href="/deposit" icon={DepositIcon} text="Deposit" isActive={activePage === 'deposit'} />
        <SidebarLink href="/withdraw" icon={WithdrawIcon} text="Withdraw" isActive={activePage === 'withdraw'} />
        <SidebarLink href="/settings" icon={SettingsIcon} text="Settings" isActive={activePage === 'settings'} />
      </nav>
    </div>
  );
}

interface SidebarLinkProps {
  href: string;
  icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
  text: string;
  isActive: boolean;
}

function SidebarLink({ href, icon: Icon, text, isActive }: SidebarLinkProps) {
  return (
    <Link href={href} className={`flex items-center py-2 px-4 ${isActive ? 'bg-gray-200 text-gray-800' : 'text-gray-700 hover:bg-gray-100'}`}>
      <Icon className="w-5 h-5 mr-3" />
      {text}
    </Link>
  );
}

function HomeIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg {...props} fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
    </svg>
  );
}

function DepositIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg {...props} fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
    </svg>
  );
}

function WithdrawIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg {...props} fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
  );
}

function SettingsIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg {...props} fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
    </svg>
  );
}