import { Link } from "react-router-dom";
import GoogleIcon from "../components/Icon/GoogleIcon";
import registerImage from "../assets/images/register-image.jpg";

const Register = () => {
  return (
    <div className="flex h-[calc(100vh-80px)] overflow-hidden mt-20">
      <div className="flex justify-center w-2/5 p-10">
        <div className="flex flex-col w-full max-w-xs gap-6 float-end">
          <p className="text-2xl font-semibold ">Sign Up</p>
          <form className="flex flex-col gap-4">
            <input
              className="px-4 py-2 border outline-none"
              type="text"
              placeholder="Firstname"
              required
            />
            <input
              className="px-4 py-2 border outline-none"
              type="text"
              placeholder="Lastname"
              required
            />
            <input
              className="px-4 py-2 border outline-none"
              type="email"
              placeholder="Email address"
              required
            />
            <input
              className="px-4 py-2 border outline-none"
              type="text"
              placeholder="Password"
              required
            />
            <button className="px-4 py-2 mt-4 text-white bg-black active:bg-gray-700">
              Sign Up
            </button>
          </form>

          <div className="relative flex items-center justify-center my-3">
            <div className="w-full border-t" />
            <p className="absolute p-1 text-sm -translate-x-1/2 bg-white text-gray-600/60 left-1/2">
              OR
            </p>
          </div>

          <button className="inline-flex items-center justify-center gap-2 px-4 py-2 border bg-gray-50">
            <GoogleIcon />
            <p>Continue with Google</p>
          </button>
          <Link
            className="text-sm text-center text-gray-600/80 hover:underline"
            to="/login"
          >
            Already have an account? Log in
          </Link>
        </div>
      </div>
      <div className="w-3/5">
        <img
          className="object-contain w-full"
          src={registerImage}
          alt="Login image"
        />
      </div>
    </div>
  );
};

export default Register;
