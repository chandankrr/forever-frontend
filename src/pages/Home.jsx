import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setLoading } from "../store/features/common";
import { getAllProducts } from "../api/fetchProducts";
import Category from "../components/Category";
import LatestCollection from "../components/LatestCollection";
import Loader from "../components/Loader";
import NewsLetterBox from "../components/NewsLetterBox";
import OurPolicy from "../components/OurPolicy";
import Slider from "../components/Slider";
import section from "../data/section.json";

const Home = () => {
  const dispatch = useDispatch();
  const isLoading = useSelector((state) => state.commonState.loading);
  const [latestProducts, setLatestProducts] = useState([]);

  useEffect(() => {
    const latestProduct = async () => {
      try {
        dispatch(setLoading(true));
        const res = await getAllProducts();
        const filteredProducts = res
          .filter((product) => product.is_new_arrival === true)
          .slice(0, 10);
        setLatestProducts(filteredProducts);
      } catch (err) {
        console.error("Failed to fetch products:", err);
      } finally {
        dispatch(setLoading(false));
      }
    };

    latestProduct();
  }, []);

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
