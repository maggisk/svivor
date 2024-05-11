export default function Select({
  label,
  selectProps,
  children,
}: {
  label?: string;
  selectProps: React.ComponentProps<"select">;
  children: React.ReactNode;
}) {
  return (
    <div>
      {label ? (
        <label
          className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
          htmlFor={selectProps.id}
        >
          {label}
        </label>
      ) : null}
      <select
        {...selectProps}
        className="block appearance-none w-full bg-gray-200 border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
      >
        {children}
      </select>
    </div>
  );
}
