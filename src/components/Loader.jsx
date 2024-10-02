import { LoaderCircle } from "lucide-react";

const Loader = () => {
  return (
    <div
      className="fixed top-0 left-0 flex flex-col items-center justify-center w-full h-full gap-2 bg-white"
      style={{
        zIndex: "10000",
      }}
    >
      <LoaderCircle className="text-gray-500 size-12 animate-spin" />
      <p className="text-gray-600">Loading...</p>
    </div>
  );
};

export default Loader;
