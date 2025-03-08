import clsx from "clsx";
import type { ChangeEventHandler } from "react";

interface IProps {
  color: string[];
  name: string;
  value: string;
  onChange: (val: string) => void;
  className?: string;
}

export default function ColorPicker({
  name,
  color,
  value,
  onChange,
  className,
}: IProps) {
  const handleColorSelected: ChangeEventHandler<HTMLInputElement> = (e) => {
    onChange(e.target.value);
  };
  return (
    <fieldset>
      <div className={clsx("flex-row-center gap-3", className)}>
        {color.map((color) => (
          <label
            key={`${name}-${color}`}
            id={`${name}-${color}`}
            title={color}
            className="h-full aspect-square rounded-full block has-[:checked]:outline outline-offset-1 cursor-pointer"
            style={{ backgroundColor: color }}
          >
            <input
              type="radio"
              name={name}
              id={`${name}-${color}`}
              value={color}
              checked={value === color}
              onChange={handleColorSelected}
              className="sr-only"
            />
          </label>
        ))}
      </div>
    </fieldset>
  );
}
