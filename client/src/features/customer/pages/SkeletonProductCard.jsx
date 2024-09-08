const SkeletonProductCard = () => {
  return (
    <div className="h-72 w-full overflow-hidden rounded-lg border border-gray-300 bg-gray-200 shadow-md">
      <div className="h-52 w-full bg-gray-300" />
      <div className="p-4">
        <div className="mb-2 h-6 w-3/5 bg-gray-300" />
        <div className="mb-2 h-5 w-2/5 bg-gray-300" />
        <div className="h-4 w-4/5 bg-gray-300" />
      </div>
    </div>
  );
};

export default SkeletonProductCard;
