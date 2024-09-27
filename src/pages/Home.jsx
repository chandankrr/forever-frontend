import Category from "../components/Category";
import LatestCollection from "../components/LatestCollection";
import NewsLetterBox from "../components/NewsLetterBox";
import OurPolicy from "../components/OurPolicy";
import Slider from "../components/Slider";
import section from "../data/section.json";

const Home = () => {
  return (
    <div className="mt-24">
      <Slider />
      <LatestCollection />
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
  );
};

export default Home;
