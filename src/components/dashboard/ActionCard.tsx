import Link from 'next/link';
import Button from '@/components/common/Button';

interface ActionCardProps {
  title: string;
  description: string;
  buttonText: string;
  href: string;
}

export default function ActionCard({ title, description, buttonText, href }: ActionCardProps) {
  return (
    <div className="bg-white p-4 rounded-lg shadow flex justify-between items-center">
      <div>
        <h3 className="font-bold text-gray-800">{title}</h3>
        <p className="text-sm text-gray-600">{description}</p>
      </div>
      <Link href={href}>
        <Button>{buttonText}</Button>
      </Link>
    </div>
  );
}