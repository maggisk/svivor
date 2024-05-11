export default function Input({
  label,
  className,
  caption,
  inputProps,
}: {
  label?: string;
  className?: string;
  caption?: React.ReactNode;
  inputProps?: React.ComponentProps<"input">;
}) {
  return (
    <div className={className}>
      {label ? (
        <label
          htmlFor="email"
          className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
        >
          {label}
        </label>
      ) : null}

      <input
        {...inputProps}
        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
      />

      {caption ? (
        <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
          {caption}
        </p>
      ) : null}
    </div>
  );
}
