import InputField from '@/components/common/InputField';

interface AmountInputProps {
  value: string;
  onChange: (value: string) => void;
  id?: string;
  name?: string;
  placeholder?: string;
}

export default function AmountInput({
  value,
  onChange,
  id = 'amount',
  name = 'amount',
  placeholder = '0.00'
}: AmountInputProps) {
  return (
    <div className="relative">
      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
        <span className="text-gray-500 sm:text-sm">$</span>
      </div>
      <InputField
        type="text"
        name={name}
        id={id}
        className="pl-7 pr-3 py-2 w-full border border-gray-300 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />
    </div>
  );
}