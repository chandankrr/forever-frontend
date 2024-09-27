const CatergoryFilter = ({ categoryType }) => {
  return (
    <div>
      <p className="mt-4 mb-2 text-lg">Categories</p>
      <div>
        {categoryType.map((type, index) => (
          <div className="mb-1 text-gray-600" key={index}>
            <div className="flex flex-row items-center gap-2">
              <input
                className="cursor-pointer size-4 accent-gray-600"
                type="checkbox"
                name={type?.code}
              />
              <label className="text-base" htmlFor={type?.code}>
                {type?.name}
              </label>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CatergoryFilter;
