import SignUpForm from "./components/register/SignUpForm";
import brandLogo from "./assets/images/ventmoir.png";
import rightSvg from "./assets/svgs/right.svg";
import leftSvg from "./assets/svgs/left.svg";
import bottomSvg from "./assets/svgs/bottom.svg";
import LoginForm from "./components/login/LoginForm";
import OtpField from "./components/otp/OtpField";
import otpImage from "./components/otp/assets/svgs/otpImg.svg";
import dventmoir from "./assets/images/dventmoir.png";
import useWindowWidth from "../../hooks/useWindowWidth";
import useFetchData from "../../hooks/useFetchData";
import { API_URL } from "../../services/api";
import { getFetch } from "../../libs/fetch";
import Logout from "./components/logout/Logout";

export {
  SignUpForm,
  brandLogo,
  rightSvg,
  leftSvg,
  bottomSvg,
  LoginForm,
  OtpField,
  otpImage,
  dventmoir,
  useWindowWidth,
  useFetchData,
  API_URL,
  getFetch,
  Logout,
};

