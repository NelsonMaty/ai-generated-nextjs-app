interface DescriptionTextareaProps {
  value: string;
  onChange: (value: string) => void;
  id?: string;
  name?: string;
  placeholder?: string;
  maxLength?: number;
  rows?: number;
}

export default function DescriptionTextarea({
  value,
  onChange,
  id = 'description',
  name = 'description',
  placeholder = 'Optional note for your records',
  maxLength = 150,
  rows = 4
}: DescriptionTextareaProps) {
  return (
    <textarea
      id={id}
      name={name}
      rows={rows}
      className="shadow-sm focus:ring-blue-500 focus:border-blue-500 mt-1 block w-full sm:text-sm border border-gray-300 rounded-md"
      placeholder={placeholder}
      value={value}
      onChange={(e) => onChange(e.target.value)}
      maxLength={maxLength}
    ></textarea>
  );
}