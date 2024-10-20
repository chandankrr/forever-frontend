import { Link } from "react-router-dom";
import { useCallback, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { LoaderCircle } from "lucide-react";
import { registerAPI } from "../api/authentication";
import { setLoading } from "../store/features/common";
import { toast } from "sonner";
import VerifyCode from "../components/VerifyCode";
import registerImage from "../assets/images/register-image.jpg";
import GoogleSignIn from "../components/GoogleSignIn";

const Register = () => {
  const [values, setValues] = useState({
    first_name: "",
    last_name: "",
    email: "",
    password: "",
  });
  const [enableVerify, setEnableVerify] = useState(false);
  const dispatch = useDispatch();

  const isLoading = useSelector((state) => state.commonState.loading);

  const onSubmit = useCallback(
    async (e) => {
      e.preventDefault();
      dispatch(setLoading(true));

      try {
        const res = await registerAPI(values);
        if (res?.code === 200) {
          setEnableVerify(true);
          toast.success("User created!");
        }
      } catch (err) {
        toast.error("Email already exist!");
      } finally {
        dispatch(setLoading(false));
      }
    },
    [dispatch, values]
  );

  const onChangeHandler = useCallback((e) => {
    setValues((prevValues) => ({
      ...prevValues,
      [e.target.name]: e.target.value,
    }));
  }, []);

  return (
    <div className="flex h-[calc(100vh-80px)] overflow-hidden mt-20">
      <div className="flex justify-center w-2/5 p-10">
        {!enableVerify && (
          <div className="flex flex-col w-full max-w-xs gap-6">
            <p className="text-2xl font-semibold ">Sign Up</p>
            <form className="flex flex-col gap-4" onSubmit={onSubmit}>
              <input
                className="px-4 py-2 border outline-none"
                type="text"
                name="first_name"
                value={values.first_name}
                onChange={onChangeHandler}
                placeholder="Firstname"
                required
              />
              <input
                className="px-4 py-2 border outline-none"
                type="text"
                name="last_name"
                value={values.last_name}
                onChange={onChangeHandler}
                placeholder="Lastname"
                required
              />
              <input
                className="px-4 py-2 border outline-none"
                type="email"
                name="email"
                value={values.email}
                onChange={onChangeHandler}
                placeholder="Email Address"
                required
              />
              <input
                className="px-4 py-2 border outline-none"
                type="password"
                name="password"
                value={values.password}
                onChange={onChangeHandler}
                placeholder="Password"
                autoComplete="off"
                required
              />
              <button
                className="flex items-center justify-center px-4 py-2 mt-4 text-white bg-black active:bg-gray-700"
                disabled={isLoading}
              >
                {isLoading ? (
                  <LoaderCircle className="animate-spin" />
                ) : (
                  <p>Sign Up</p>
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
            <Link className="text-sm text-center text-gray-600/80" to="/login">
              Already have an account?{" "}
              <span className="hover:underline">Log in</span>
            </Link>
          </div>
        )}

        {enableVerify && <VerifyCode email={values?.email} />}
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
