import exchangeIcon from "../assets/images/exchange-icon.png";
import qualityIcon from "../assets/images/quality-icon.png";
import supportIcon from "../assets/images/support-icon.png";

const OurPolicy = () => {
  return (
    <div className="flex flex-col justify-around gap-12 py-20 text-xs text-center text-gray-700 sm:flex-row sm:gap-2 sm:text-sm md:text-base">
      <div>
        <img
          src={exchangeIcon}
          className="w-12 m-auto mb-5"
          alt="Exchange icon"
        />
        <p className="font-semibold">Easy Exchange</p>
        <p className="text-gray-400">We offer hassle free exchange policy</p>
      </div>

      <div>
        <img
          src={qualityIcon}
          className="w-12 m-auto mb-5"
          alt="Quality icon"
        />
        <p className="font-semibold">7 Days Return Policy</p>
        <p className="text-gray-400">We provide 7 days free return policy</p>
      </div>

      <div>
        <img
          src={supportIcon}
          className="w-12 m-auto mb-5 scale-90"
          alt="Support icon"
        />
        <p className="font-semibold">Best Customer Support</p>
        <p className="text-gray-400">We provide 24/7 customer support</p>
      </div>
    </div>
  );
};

export default OurPolicy;
