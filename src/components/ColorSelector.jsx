import { useCallback, useState } from "react";
import { Check } from "lucide-react";

const colorSelector = {
  Purple: "#8434E1",
  Black: "#252525",
  White: "#FFFFFF",
  Gray: "#808080",
  Blue: "#0000FF",
  Red: "#FF0000",
  Orange: "#FFA500",
  Navy: "#000080",
  Grey: "#808080",
  Yellow: "#FFFF00",
  Pink: "#FFC0CB",
  Green: "#008000",
};

const ColorSelector = ({ colors }) => {
  const [appliedColors, setAppliedColors] = useState([]);

  const onClickDiv = useCallback((item) => {
    setAppliedColors((prevColors) =>
      prevColors.includes(item)
        ? prevColors.filter((color) => color !== item)
        : [...prevColors, item]
    );
  }, []);

  return (
    <div>
      <p className="mt-4 mb-2 text-lg">Colors</p>
      <div className="flex flex-wrap gap-4">
        {colors.map((color, index) => {
          const isSelected = appliedColors.includes(color);
          return (
            <div className="flex flex-col items-center gap-1" key={index}>
              <div
                className="relative border cursor-pointer size-7 hover:scale-105"
                style={{
                  backgroundColor: colorSelector[color],
                }}
                onClick={() => onClickDiv(color)}
              >
                {isSelected && (
                  <div className="absolute top-0 right-0 flex items-center justify-center size-7">
                    <Check className="text-white size-5" />
                  </div>
                )}
              </div>
              <p
                className="text-xs text-gray-600"
                style={{
                  color: isSelected ? "black" : "",
                  fontWeight: isSelected ? "500" : "",
                }}
              >
                {color}
              </p>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ColorSelector;
