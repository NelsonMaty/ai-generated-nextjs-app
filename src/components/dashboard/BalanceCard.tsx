interface BalanceCardProps {
  balance: number | null;
}

export default function BalanceCard({ balance }: BalanceCardProps) {
  return (
    <div>
      <h1 className="text-3xl font-bold mb-2 text-gray-800">Balance</h1>
      <p className="text-gray-600 mb-6">Quick access to your account</p>
      <h2 className="text-4xl font-bold mb-6 text-gray-800">
        ${balance !== null ? balance.toFixed(2) : '0.00'}
      </h2>
    </div>
  );
}