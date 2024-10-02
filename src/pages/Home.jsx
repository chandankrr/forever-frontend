import { useMemo } from "react";
import { useSelector } from "react-redux";
import Category from "../components/Category";
import LatestCollection from "../components/LatestCollection";
import Loader from "../components/Loader";
import NewsLetterBox from "../components/NewsLetterBox";
import OurPolicy from "../components/OurPolicy";
import Slider from "../components/Slider";
import section from "../data/section.json";

const Home = () => {
  const products = useSelector((state) => state.productState.products);
  const isLoading = useSelector((state) => state.commonState.loading);

  const latestProducts = useMemo(() => {
    return products
      .filter((product) => product.is_new_arrival === true)
      .slice(0, 10);
  }, [products]);

  return (
    <div>
      {isLoading && <Loader />}
      <div className="mt-24">
        <Slider />
        <LatestCollection latestProducts={latestProducts} />
        <Category
          title={section?.sections[0]?.title}
          data={section?.sections[0]?.data}
        />
        <Category
          title={section?.sections[1]?.title}
          data={section?.sections[1]?.data}
        />
        <OurPolicy />
        <NewsLetterBox />
      </div>
    </div>
  );
};

export default Home;
