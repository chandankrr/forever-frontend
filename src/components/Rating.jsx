import { Star, StarHalf } from "lucide-react";
import { MessageSquareText } from "lucide-react";

const Rating = ({ rating }) => {
  const roundedRating = Math.round(rating * 2) / 2;

  return (
    <div className="flex items-center gap-1 mt-2">
      {[1, 2, 3, 4, 5].map((i) => {
        if (i <= Math.floor(roundedRating)) {
          return (
            <Star key={i} className="text-yellow-400 fill-yellow-400 size-4" />
          );
        } else if (
          i === Math.ceil(roundedRating) &&
          !Number.isInteger(roundedRating)
        ) {
          return (
            <StarHalf
              key={i}
              className="text-yellow-400 fill-yellow-400 size-4"
            />
          );
        } else {
          return <Star key={i} className="text-gray-300 size-4" />;
        }
      })}
      <p className="pl-2 text-sm text-gray-600">{rating?.toFixed(1)}</p>
      <MessageSquareText className="ml-5 text-gray-600 size-4" />
      <p className="pl-2 text-sm text-gray-600">120 comments</p>
    </div>
  );
};

export default Rating;
