import { useEffect, useState } from "react";

const slides = [
  {
    id: 1,
    title: "Latest Arrivals",
    description: "Enjoy discounts up to 10%!",
    img: "https://images.pexels.com/photos/1926769/pexels-photo-1926769.jpeg?auto=compress&cs=tinysrgb&w=800",
    url: "/",
    bg: "bg-gradient-to-r from-yellow-50 to-pink-50",
  },
  {
    id: 2,
    title: "End of Season Clearance",
    description: "Discounts up to 60%!",
    img: "https://images.pexels.com/photos/1021693/pexels-photo-1021693.jpeg?auto=compress&cs=tinysrgb&w=800",
    url: "/",
    bg: "bg-gradient-to-r from-pink-50 to-blue-50",
  },
  {
    id: 3,
    title: "Weekend Flash Sale",
    description: "Grab up to 30% off on latest products!",
    img: "https://images.unsplash.com/photo-1695194058369-ef222dba8176?q=80&w=800",
    url: "/",
    bg: "bg-gradient-to-r from-blue-50 to-yellow-50",
  },
];

const Slider = () => {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
    }, 6000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="h-[calc(80vh)] mt-24 overflow-hidden border relative">
      <div
        className="flex h-full transition-all duration-1000 ease-in-out border-gray-400 w-max"
        style={{
          transform: `translateX(-${current * 100}vw)`,
        }}
      >
        {slides.map((slide) => (
          <div
            className={`${slide.bg} w-screen h-full flex flex-row`}
            key={slide.id}
          >
            {/* text container */}
            <div className="flex items-center justify-center w-1/2">
              <div className="text-[#414141]">
                <div className="flex items-center gap-2">
                  <p className="w-11 h-[2px] bg-[#414141]" />
                  <p className="text-base font-medium ">{slide.description}</p>
                </div>
                <h1 className="py-3 text-5xl leading-relaxed prata-regular">
                  {slide.title}
                </h1>
                <div className="flex items-center gap-2">
                  <p className="text-base font-semibold">SHOP NOW</p>
                  <p className="w-11 h-[2px] bg-[#414141]" />
                </div>
              </div>
            </div>

            {/* image container */}
            <div className="w-1/2">
              <img src={slide.img} className="object-cover" />
            </div>
          </div>
        ))}
      </div>

      <div className="absolute flex gap-4 m-auto -translate-x-1/2 left-1/2 bottom-8">
        {slides.map((slide, index) => (
          <div
            className={`size-3 rounded-full ring-1 ring-gray-600 cursor-pointer flex items-center justify-center ${
              current === index ? "scale-150" : ""
            }`}
            key={slide.id}
            onClick={() => setCurrent(index)}
          >
            {current === index && (
              <div className="w-[6px] h-[6px] bg-gray-600 rounded-full"></div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Slider;
