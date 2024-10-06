import { useNavigate } from "react-router-dom";
import { useCallback, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { LoaderCircle } from "lucide-react";
import { setLoading } from "../store/features/common";
import { verifyAPI } from "../api/authentication";
import toast from "react-hot-toast";

const VerifyCode = ({ email }) => {
  const [values, setValues] = useState({
    email: email,
    code: "",
  });
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const isLoading = useSelector((state) => state.commonState.loading);

  const onSubmit = useCallback(
    async (e) => {
      e.preventDefault();
      dispatch(setLoading(true));

      try {
        const res = await verifyAPI(values);
        toast.success("Email verified successfully!");
        navigate("/");
        setValues((prevValues) => ({
          ...prevValues,
          code: "",
        }));
      } catch (err) {
        toast.error("Invalid verification code!");
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
    <div className="flex flex-col w-full max-w-xs gap-6">
      <p className="text-2xl font-semibold ">Verify Email</p>
      <p className="text-gray-600/80">Check your email for verifcation code.</p>
      <form className="flex flex-col gap-4" onSubmit={onSubmit}>
        <input
          className="px-4 py-2 border outline-none"
          type="text"
          onChange={onChangeHandler}
          value={values?.code}
          name="code"
          maxLength={6}
          placeholder="6-digit code"
          required
          autoComplete="off"
        />
        <button
          className="flex items-center justify-center px-4 py-2 mt-4 text-white bg-black active:bg-gray-700"
          disabled={isLoading}
        >
          {isLoading ? (
            <LoaderCircle className="animate-spin" />
          ) : (
            <p>Verify</p>
          )}
        </button>
      </form>
    </div>
  );
};

export default VerifyCode;
