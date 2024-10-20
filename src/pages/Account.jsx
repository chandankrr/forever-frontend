import { useNavigate } from "react-router-dom";
import { logout } from "../utils/jwtHelper";
import { useDispatch } from "react-redux";
import { clearCart } from "../store/features/cart";
import { toast } from "sonner";

const Account = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const onLogout = () => {
    logout();
    dispatch(clearCart());
    toast.success("User logout!");
    navigate("/");
  };
  return (
    <div className="flex flex-col mt-24">
      <h1 className="mt-10 mb-5 text-3xl font-medium text-left text-gray-700 uppercase">
        | Account Details
      </h1>
      <button
        className="float-right px-8 py-3 mt-10 text-sm text-white bg-black active:bg-gray-700"
        onClick={onLogout}
      >
        LOGOUT
      </button>
    </div>
  );
};

export default Account;
