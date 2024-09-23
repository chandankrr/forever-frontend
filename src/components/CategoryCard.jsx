import { MoveRight } from "lucide-react";

const CategoryCard = ({ image, title, description }) => {
  return (
    <div className="text-black">
      <div className="overflow-hidden">
        <img src={image} alt={title} />
      </div>
      <div className="flex items-center justify-between pr-2">
        <div>
          <p className="pt-3 pb-1 text-base">{title}</p>
          <p className="text-xs font-medium text-gray-400">{description}</p>
        </div>
        <div>
          <MoveRight className="text-gray-400" />
        </div>
      </div>
    </div>
  );
};

export default CategoryCard;
