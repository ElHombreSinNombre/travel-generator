import { useState } from "react";
import { Destination } from "../../models/destination";
import { Options } from "@/app/models/options";
import IconResolver from "../IconResolver";

interface SelectProps {
  name?: string;
  items: (Destination | Options)[];
  value?: Options;
  onChange?: (selected: Destination | Options) => void;
}

function Select({ name, items, onChange, value }: SelectProps) {
  const [selectedValue, setSelected] = useState<Destination | Options>();

  const selectedName = value?.id ?? selectedValue?.id;

  const change = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedTarget = parseInt(event.target.value);
    const selected =
      items.find((item) => item.id === selectedTarget) || items[0];
    setSelected(selected);
    if (onChange) onChange(selected);
  };

  return (
    <select
      name={name}
      value={selectedName}
      onChange={change}
      className="select focus:outline-none focus:shadow-outline"
    >
      <option hidden>Select option</option>
      {items.map((item) => (
        <option key={item.id} value={item.id}>
          {"icon" in item && item.icon ? (
            <div className="absolute inset-y-0 left-0 flex items-center pl-2 pointer-events-none pa-5">
              <IconResolver icon={item.icon} />
            </div>
          ) : null}
          {item.name}
        </option>
      ))}
    </select>
  );
}

export default Select;
