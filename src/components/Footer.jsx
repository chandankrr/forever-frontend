import logo from "../assets/images/logo-black.png";

const Footer = () => {
  return (
    <div>
      <div className="flex flex-col sm:grid grid-cols-[3fr_1fr_1fr] gap-14 my-10 mt-40 text-sm">
        <div>
          <img src={logo} className="w-32 mb-5" alt="logo" />
          <p className="w-full text-gray-600 md:w-2/3">
            At Forever, discover the latest fashion trends with a focus on style
            and quality. Explore our curated selection of apparel and
            accessories that celebrate individuality, from casual wear to formal
            attire. Shop confidently and start your fashion journey with us.
          </p>
        </div>

        <div>
          <p className="mb-5 text-xl font-medium">COMPANY</p>
          <ul className="flex flex-col gap-1 text-gray-600">
            <li>Home</li>
            <li>About us</li>
            <li>Delivery</li>
            <li>Privacy policy</li>
          </ul>
        </div>

        <div>
          <p className="mb-5 text-xl font-medium">GET IN TOUCH</p>
          <ul className="flex flex-col gap-1 text-gray-600">
            <li>+91 111-222-3333</li>
            <li>contact@foreveryou.com</li>
          </ul>
        </div>
      </div>

      <div>
        <hr />
        <p className="py-5 text-sm text-center">
          Copyright 2024 Forever - All Right Reserve
        </p>
      </div>
    </div>
  );
};

export default Footer;
