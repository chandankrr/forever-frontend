import { Link, useNavigate } from "react-router-dom";
import { useCallback, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setLoading } from "../store/features/common.js";
import { loginAPI } from "../api/authentication.js";
import { saveToken } from "../utils/jwtHelper.js";
import { LoaderCircle } from "lucide-react";
import loginImage from "../assets/images/login-image.jpg";
import toast from "react-hot-toast";
import GoogleSignIn from "../components/GoogleSignIn.jsx";

const Login = () => {
  const [values, setValues] = useState({
    email: "",
    password: "",
  });
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const isLoading = useSelector((state) => state.commonState.loading);

  const onSubmit = useCallback(
    async (e) => {
      e.preventDefault();
      dispatch(setLoading(true));

      try {
        const res = await loginAPI(values);

        if (res?.token) {
          saveToken(res.token);
          toast.success("Login successful");
          navigate("/");
        } else {
          toast.error("Something went wrong!");
        }
      } catch (err) {
        // TODO: check response status
        toast.error("Invalid Credentials!");
      } finally {
        dispatch(setLoading(false));
      }
    },
    [dispatch, navigate, values]
  );

  const onChangeHandler = useCallback((e) => {
    setValues((prevValues) => ({
      ...prevValues,
      [e.target.name]: e.target.value,
    }));
  }, []);

  return (
    <div className="flex h-[calc(100vh-80px)] overflow-hidden mt-20">
      <div className="w-3/5">
        <img
          className="object-contain w-full"
          src={loginImage}
          alt="Login image"
        />
      </div>
      <div className="flex justify-center w-2/5 p-10">
        <div className="flex flex-col w-full max-w-xs gap-6">
          <p className="text-2xl font-semibold ">Sign In</p>
          <form className="flex flex-col gap-4" onSubmit={onSubmit}>
            <input
              className="px-4 py-2 border outline-none"
              type="email"
              name="email"
              value={values.email}
              onChange={onChangeHandler}
              placeholder="Email address"
              required
            />
            <input
              className="px-4 py-2 border outline-none"
              type="password"
              name="password"
              value={values.password}
              onChange={onChangeHandler}
              placeholder="Password"
              required
              autoComplete="off"
            />
            <Link
              className="w-full -mt-1 text-sm text-right text-gray-500 underline hover:text-black"
              to="/forgot-password"
            >
              Forgot Password
            </Link>
            <button
              className="flex items-center justify-center px-4 py-2 mt-4 text-white bg-black active:bg-gray-700"
              disabled={isLoading}
            >
              {isLoading ? (
                <LoaderCircle className="animate-spin" />
              ) : (
                <p>Sign In</p>
              )}
            </button>
          </form>

          <div className="relative flex items-center justify-center my-3">
            <div className="w-full border-t" />
            <p className="absolute p-1 text-sm -translate-x-1/2 bg-white text-gray-600/60 left-1/2">
              OR
            </p>
          </div>

          <GoogleSignIn />
          <Link
            className="text-sm text-center text-gray-600/80 hover:underline"
            to="/register"
          >
            Don&apos;t have an account? Sign up
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Login;
