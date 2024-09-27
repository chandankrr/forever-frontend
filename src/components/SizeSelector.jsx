import { useCallback, useState } from "react";

const SizeSelector = ({ sizes }) => {
  const [appliedSizes, setAppliedSizes] = useState([]);

  const onClickDiv = useCallback((item) => {
    setAppliedSizes((prevSizes) =>
      prevSizes.includes(item)
        ? prevSizes.filter((size) => size !== item)
        : [...prevSizes, item]
    );
  }, []);

  return (
    <div>
      <p className="mt-4 mb-2 text-lg">Sizes</p>
      <div className="flex flex-wrap gap-3">
        {sizes.map((size, index) => {
          const isSelected = appliedSizes.includes(size);
          return (
            <div
              className="flex items-center justify-center h-8 text-gray-600 border cursor-pointer w-9 hover:bg-blue-50"
              key={index}
              onClick={() => onClickDiv(size)}
              style={{
                backgroundColor: isSelected ? "#eff6ff" : "transparent",
              }}
            >
              <p className="text-sm">{size}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default SizeSelector;
