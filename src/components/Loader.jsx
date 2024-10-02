import { LoaderCircle } from "lucide-react";

const Loader = () => {
  return (
    <div className="fixed top-0 left-0 z-10 flex flex-col items-center justify-center w-full h-full gap-2 bg-white">
      <LoaderCircle className="text-gray-500 size-12 animate-spin" />
      <p className="text-gray-600">Loading...</p>
    </div>
  );
};

export default Loader;
