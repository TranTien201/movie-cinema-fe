import React, { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { loginAccount } from "../../redux/accountSlice";
import ReactLoading from "react-loading";

const SignIn = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const { isLoading, error, account } = useSelector((state) => state.account);

  const [email, setEmail] = useState(location.state?.email || "");
  const [password, setPassword] = useState(location.state?.password || "");

  const handleSubmit = (e) => {
    e.preventDefault();
    const accountData = { email, password };
    dispatch(loginAccount(accountData));
  };

  useEffect(() => {
    console.log("Vào đây", account);

    if (account) {
      if (account.roles.includes("ROLE_CUSTOMER")) {
        navigate("/"); // Redirect to home for customers
      } else {
        navigate("/admin"); // Redirect to admin for admins
      }
    }
  }, [account, navigate]);
  return (
    <section
      className="account-section bg_img"
      data-background="./assets/images/account/account-bg.jpg"
    >
      <div className="container">
        <div className="padding-top padding-bottom">
          <div className="account-area">
            <div className="section-header-3">
              <span className="cate">Xin chào quý khách</span>
              <h2 className="title">Đăng nhập</h2>
            </div>
            <form className="account-form" onSubmit={handleSubmit}>
              <div className="form-group">
                <label for="email2">
                  Email<span>*</span>
                </label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Nhập email"
                  id="email2"
                  required
                />
              </div>
              <div className="form-group" style={{ marginBottom: "0px" }}>
                <label for="pass3">
                  mật khẩu<span>*</span>
                </label>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Nhập mật khẩu"
                  id="pass3"
                  required
                />
              </div>
              {error && <small className="text-danger">{error}</small>}
              <div
                className="form-group checkgroup"
                style={{ marginTop: "12px" }}
              >
                <input type="checkbox" id="bal2" required checked />
                <label for="bal2">ghi nhớ mật khẩu</label>
                <a href="#0" className="forget-pass">
                  Tìm lại mật khẩu
                </a>
              </div>
              <div className="form-group text-center">
                <button
                  type="submit"
                  disabled={isLoading}
                  className="login-button"
                >
                  {isLoading ? (
                    <ReactLoading
                      type="spin"
                      color="#ffffff"
                      height={24}
                      width={24}
                    />
                  ) : (
                    "Đăng nhập"
                  )}
                </button>
              </div>
            </form>
            <div className="option">
              Nếu bạn chưa có tài khoản?{" "}
              <Link to={"/signup"}>đăng ký ngay</Link>
            </div>
            <div className="or">
              <span>Hoặc</span>
            </div>
            <ul className="social-icons">
              <li>
                <a href="#0">
                  <i className="fab fa-facebook-f"></i>
                </a>
              </li>
              <li>
                <a href="#0" className="active">
                  <i className="fab fa-twitter"></i>
                </a>
              </li>
              <li>
                <a href="#0">
                  <i className="fab fa-google"></i>
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SignIn;
