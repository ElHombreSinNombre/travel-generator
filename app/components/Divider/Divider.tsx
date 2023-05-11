type DividerProps = {
  borderColor?: string;
};

function Divider({ borderColor = "border-gray-100" }: DividerProps) {
  return <div className={`flex border-t-2 ${borderColor}`}></div>;
}

export default Divider;
