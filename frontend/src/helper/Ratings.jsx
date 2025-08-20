import React from "react";
import { FullStar } from "./FullStar";
import { HalfStar } from "./HalfStar";
import { CircleStar } from "./CircleStar";

const Rating = ({ value, max = 5, showValue = true }) => {
  const stars = [];

  for (let i = 1; i <= max; i++) {
    if (value === max) {
      stars.push(
        <CircleStar key={i} className="w-5 h-5 mr-1 text-yellow-400" />
      );
    } else if (i <= Math.floor(value)) {
      stars.push(<FullStar key={i} className="w-5 h-5 mr-1 text-yellow-400" />);
    } else if (i === Math.ceil(value) && value % 1 >= 0.5) {
      stars.push(<HalfStar key={i} className="w-5 h-5 mr-1 text-yellow-400" />);
    } else {
      stars.push(<FullStar key={i} className="w-5 h-5 mr-1 text-gray-400" />);
    }
  }

  return (
    <div className="flex items-center">
      {stars}
      {showValue && (
        <span className="ml-2 text-sm text-gray-300">{value.toFixed(1)}</span>
      )}
    </div>
  );
};

export default Rating;
export { Rating };