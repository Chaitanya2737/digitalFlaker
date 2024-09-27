import React, { useEffect, useState } from "react";
import { image } from "../../assets"; // Ensure you have an image in this path
import { useDispatch, useSelector } from "react-redux";
import { loginUser, registerUser } from "../../api/api";
import { useNavigate } from "react-router-dom";

const Auth = () => {
  const [login, setLogin] = useState(false);

  const toggle = () => {
    setLogin(!login);
  };

  return (
    <>
      {login ? <SignUp toggle={toggle} /> : <Login toggle={toggle} />}
    </>
  );
};

const SignUp = ({ toggle }) => {
  const [user, setUser] = useState({
    name: "",
    email: "",
    password: "",
  });

  const dispatch = useDispatch();
  const { token, isLoading, error } = useSelector((state) => state.Auth);
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      await dispatch(registerUser(user));
    } catch (err) {
      console.error(err);
    }
  };

  const handleChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  useEffect(() => {
    if (token) {
      localStorage.setItem("token", token);
      navigate("/dash/home");
    }
  }, [token, navigate]);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 bg-primary">
      <div className="grid h-screen place-items-center">
        <div className="w-1/2">
          <h4 className="text-lg">Get Started Now</h4>
          {error && <p className="text-red-500">{error}</p>} {/* Display error message */}

          <form onSubmit={handleRegister}>
            <div className="py-3">
              <label className="text-md mt-1" htmlFor="name">
                Name
              </label>
              <input
                type="text"
                placeholder="Enter your name"
                required
                name="name"
                value={user.name}
                onChange={handleChange}
                className="block w-full my-1 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring focus:ring-danger focus:border-danger p-2"
              />

              <label className="text-md font-sans" htmlFor="email">
                Email
              </label>
              <input
                type="email"
                placeholder="Enter your email"
                required
                name="email"
                value={user.email}
                onChange={handleChange}
                className="block w-full my-1 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring focus:ring-danger focus:border-danger p-2"
              />

              <label className="text-md font-sans" htmlFor="password">
                Password
              </label>
              <input
                type="password"
                placeholder="Enter your password"
                required
                name="password"
                value={user.password}
                onChange={handleChange}
                className="block w-full border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring focus:ring-danger focus:border-danger p-2 mt-2"
              />
            </div>

            <button
              disabled={isLoading}
              type="submit" // Change to type="submit" to handle form submission
              className="border w-full p-2 bg-danger text-white rounded-lg hover:bg-gray-400 focus:ring focus:ring-slate-400"
            >
              {isLoading ? "Signing Up..." : "Sign Up"} {/* Show loading text */}
            </button>
          </form>

          <div className="my-8">
            <span>Have an account?</span>
            <span onClick={toggle} className="mx-3 text-danger hover:cursor-pointer">
              Login
            </span>
          </div>
        </div>
      </div>
      <div className="hidden md:block">
        <div className="w-full h-screen rounded-3xl overflow-hidden p-4">
          <img
            src={image}
            className="w-full h-full object-cover rounded-3xl"
            alt="image not found"
          />
        </div>
      </div>
    </div>
  );
};

const Login = ({ toggle }) => {
  const [data, setData] = useState({
    email: "",
    password: "",
  });

  const dispatch = useDispatch();
  const login = useSelector((state) => state.Auth);
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    dispatch(loginUser(data));
  };

  const handleChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  useEffect(() => {
    if (login.token) {
      localStorage.setItem("token", login.token);
      navigate("/dash/home");
    }
  }, [login, navigate]);
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 bg-primary">
      <div className="grid h-screen place-items-center ">
        <div className="w-1/2 ">
          <div>
            <h4 className="text-lg ">Welcome Back!</h4>
            <form onSubmit={handleLogin}>
              <div className="py-3">
                <label className="text-md font-sans" htmlFor="email">
                  Email
                </label>
                <input
                  type="email" // Change to type="email"
                  placeholder="Enter your email"
                  required
                  name="email"
                  value={data.email}
                  onChange={handleChange}
                  className="block w-full my-1 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring focus:ring-danger focus:border-danger p-2"
                />

                <label className="text-md font-sans" htmlFor="password">
                  Password
                </label>
                <input
                  type="password" // Change to type="password"
                  placeholder="Enter your password"
                  required
                  name="password"
                  value={data.password}
                  onChange={handleChange}
                  className="block w-full border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring focus:ring-danger focus:border-danger p-2 mt-2"
                />
              </div>

              <button
                disabled={login.isLoading} // Disable button when loading
                type="submit"
                className="border w-full p-2 bg-danger text-white rounded-lg hover:bg-gray-400 focus:ring focus:ring-slate-400"
              >
                {login.isLoading ? "Logging in..." : "Login"} {/* Show loading text */}
              </button>
            </form>
          </div>

          <div className="my-8">
            <span>Have an account?</span>
            <span onClick={toggle} className="mx-3 text-danger hover:cursor-pointer">
              Sign Up
            </span>
          </div>
        </div>
      </div>
      <div className="hidden md:block">
        <div className="w-full h-screen rounded-3xl overflow-hidden p-4">
          <img
            src={image}
            className="w-full h-full object-cover rounded-3xl"
            alt="image not found"
          />
        </div>
      </div>
    </div>
  );
};

export default Auth;
