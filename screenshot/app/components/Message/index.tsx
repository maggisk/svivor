interface Props {
  type: "error";
  children: React.ReactNode;
}

export default function Message({ children }: Props) {
  return (
    <div className="bg-red-500 border border-red-700 text-red-200 rounded py-2 px-5">
      {children}
    </div>
  );
}
