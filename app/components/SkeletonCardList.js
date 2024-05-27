// components/SkeletonCardList.js

import SkeletonCard from "./SkeletonCard";

const SkeletonCardList = ({ count = 6 }) => {
  return (
    <div className="flex flex-wrap gap-8 justify-center">
      {Array.from({ length: count }).map((_, index) => (
        <SkeletonCard key={index} />
      ))}
    </div>
  );
};

export default SkeletonCardList;
