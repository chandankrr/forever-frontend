import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import CategoryCard from "./CategoryCard";

const responsive = {
  desktop: {
    breakpoint: { max: 3000, min: 1024 },
    items: 5,
    slidesToSlide: 3,
  },
  tablet: {
    breakpoint: { max: 1024, min: 464 },
    items: 3,
    slidesToSlide: 2,
  },
  mobile: {
    breakpoint: { max: 464, min: 0 },
    items: 2,
    slidesToSlide: 1,
  },
};

const Category = ({ title, data }) => {
  return (
    <div className="my-10">
      <div className="py-8 text-3xl font-medium text-left text-gray-700">
        <p className="mb-3 uppercase">| {title}</p>
        <Carousel responsive={responsive}>
          {data.map((item, index) => (
            <div className="mr-4" key={index}>
              <CategoryCard
                image={item.image}
                title={item.title}
                description={item.description}
              />
            </div>
          ))}
        </Carousel>
      </div>
    </div>
  );
};

export default Category;
