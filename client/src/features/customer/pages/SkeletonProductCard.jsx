const SkeletonProductCard = () => {
  return (
    <div className="border border-gray-300 rounded-lg overflow-hidden w-full h-72 bg-gray-200 shadow-md">
      <div className="w-full h-52 bg-gray-300" />
      <div className="p-4">
        <div className="w-3/5 h-6 bg-gray-300 mb-2" />
        <div className="w-2/5 h-5 bg-gray-300 mb-2" />
        <div className="w-4/5 h-4 bg-gray-300" />
      </div>
    </div>
  );
};

export default SkeletonProductCard;