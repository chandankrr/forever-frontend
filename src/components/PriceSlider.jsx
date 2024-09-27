import { useState } from "react";
import RangeSlider from "react-range-slider-input";
import "react-range-slider-input/dist/style.css";

const PriceSlider = () => {
  const [range, setRange] = useState({
    min: 10,
    max: 250,
  });

  return (
    <div>
      <p className="mt-4 mb-2 text-lg">Price</p>
      <div className="flex flex-col gap-4">
        <RangeSlider
          className="custom-range-slider"
          min={0}
          max={400}
          defaultValue={[range.min, range.max]}
          onInput={(values) =>
            setRange({
              min: values[0],
              max: values[1],
            })
          }
        />
        <div className="flex justify-between">
          <input
            className="w-1/4 px-1 py-1 text-sm text-gray-600 border outline-none"
            type="text"
            disabled
            value={`$ ${range.min}`}
          />
          <input
            className="w-1/4 px-1 py-1 text-sm text-gray-600 border outline-none"
            type="text"
            disabled
            value={`$ ${range.max}`}
          />
        </div>
      </div>
    </div>
  );
};

export default PriceSlider;
