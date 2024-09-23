import Category from "../components/Category";
import LatestCollection from "../components/LatestCollection";
import NewsLetterBox from "../components/NewsLetterBox";
import OurPolicy from "../components/OurPolicy";
import Slider from "../components/Slider";
import content from "../data/content.json";

const Home = () => {
  return (
    <div>
      <Slider />
      <LatestCollection />
      <Category
        title={content?.categories[0]?.title}
        data={content?.categories[0]?.data}
      />
      <Category
        title={content?.categories[1]?.title}
        data={content?.categories[1]?.data}
      />
      <Category
        title={content?.categories[2]?.title}
        data={content?.categories[2]?.data}
      />
      <OurPolicy />
      <NewsLetterBox />
    </div>
  );
};

export default Home;
