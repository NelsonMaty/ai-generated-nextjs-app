export default function TransactionTable() {
  return (
    <div className="bg-white rounded-lg overflow-hidden shadow">
      <table className="w-full">
        <thead className="bg-gray-100">
          <tr>
            <th className="py-2 px-4 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">Date</th>
            <th className="py-2 px-4 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">Description</th>
            <th className="py-2 px-4 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">Category</th>
            <th className="py-2 px-4 text-right text-xs font-medium text-gray-600 uppercase tracking-wider">Amount</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200">
          {/* Add transaction rows here */}
        </tbody>
      </table>
    </div>
  );
}