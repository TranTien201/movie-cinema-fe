import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { signUpAccount } from "../../redux/accountSlice";

const SignUp = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { isLoading, error, account } = useSelector((state) => state.account);

  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
    agreement: true,
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const { username, email, password } = formData;
    dispatch(signUpAccount({ username, email, password }));
    navigate("/");
    // setFormData({
    //   displayName: "",
    //   email: "",
    //   password: "",
    //   confirmPassword: "",
    //   agreement: true,
    // });
  };

  return (
    <section
      className="account-section bg_img"
      data-background="./assets/images/account/account-bg.jpg"
    >
      <div className="container">
        <div className="padding-top padding-bottom">
          <div className="account-area">
            <div className="section-header-3">
              <span className="cate">Chào mừng bạn đến</span>
              <h2 className="title">Dream Cinema</h2>
            </div>
            <form className="account-form" onSubmit={handleSubmit}>
              <div className="form-group">
                <label htmlFor="displayName">
                  Tên hiển thị<span>*</span>
                </label>
                <input
                  type="text"
                  placeholder="Nhập tên hiển thị"
                  id="username"
                  name="username"
                  value={formData.username}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="email1">
                  Email<span>*</span>
                </label>
                <input
                  type="email"
                  placeholder="Nhập email"
                  id="email1"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="pass1">
                  Password<span>*</span>
                </label>
                <input
                  type="password"
                  placeholder="Nhập mật khẩu"
                  id="pass1"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="pass2">
                  Nhập lại mật khẩu<span>*</span>
                </label>
                <input
                  type="password"
                  placeholder="Nhập lại mật khẩu"
                  id="pass2"
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="form-group checkgroup">
                <input
                  type="checkbox"
                  id="agreement"
                  name="agreement"
                  checked={formData.agreement}
                  onChange={handleChange}
                  required
                />
                <label htmlFor="agreement">
                  Tôi đồng ý với{" "}
                  <a href="#0">các điều khoản và chính sách bảo mật</a>
                </label>
              </div>
              <div className="form-group text-center">
                <input
                  type="submit"
                  value={isLoading ? "Đang đăng ký..." : "Đăng ký"}
                  disabled={isLoading || !formData.agreement}
                />
              </div>
              {error && <p className="error-text">Đăng ký thất bại: {error}</p>}
            </form>
            <div className="option">
              Bạn đã có tài khoản? <Link to={"/signin"}>Đăng nhập</Link>
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

export default SignUp;
