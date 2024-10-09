import { Plus } from "lucide-react";
import { Minus } from "lucide-react";
import { useCallback, useState } from "react";

const NumberInput = ({ quantity, max = 1, min = 1, onChangeQuantity }) => {
  const [value, setValue] = useState(quantity ?? min);

  const onIncreaseQuantity = useCallback(() => {
    if (value < max) {
      const newValue = value + 1;
      setValue(newValue);
      onChangeQuantity && onChangeQuantity(newValue);
    }
  }, [max, value, onChangeQuantity]);

  const onReduceQuantity = useCallback(() => {
    if (value > min) {
      const newValue = value - 1;
      setValue(newValue);
      onChangeQuantity && onChangeQuantity(newValue);
    }
  }, [min, value, onChangeQuantity]);

  const handleInputChange = (e) => {
    const newValue = parseInt(e.target.value, 10);
    if (!isNaN(newValue) && newValue >= min && newValue <= max) {
      setValue(newValue);
      onChangeQuantity && onChangeQuantity(newValue);
    }
  };

  return (
    <div className="flex items-center justify-center gap-2">
      <button
        className={`px-2 py-1 bg-gray-200/50 ${
          value <= min ? "opacity-50 cursor-not-allowed" : ""
        }`}
        onClick={onReduceQuantity}
        disabled={value <= min}
      >
        <Minus className="size-4" />
      </button>
      <input
        className="px-2 py-1 text-sm bg-gray-100 outline-none max-w-12"
        type="number"
        value={value}
        onChange={handleInputChange}
      />
      <button
        className={`px-2 py-1 bg-gray-200/50 ${
          value >= max ? "opacity-50 cursor-not-allowed" : ""
        }`}
        onClick={onIncreaseQuantity}
        disabled={value >= max}
      >
        <Plus className="size-4" />
      </button>
    </div>
  );
};

export default NumberInput;
