import { useContext } from "react";
import { UserContext } from "../context/UserContext";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import Toastify from "../components/Toastify";
import { useEffect } from "react";

export const Auth = () => {
  const { user, signInUser, msg, setMsg, signUpUser } = useContext(UserContext);

  const location = useLocation();
  console.log(location.pathname);
  const isSignIn = location.pathname == "/auth/in";

  useEffect(() => {
    setMsg(null);
  }, []);

  console.log(msg);

  const handleSubmit = (event) => {
    event.preventDefault();
    setMsg({ err: null });
    const data = new FormData(event.currentTarget);
    if (isSignIn) {
      signInUser(data.get("email"), data.get("password"));
    } else {
      signUpUser(
        data.get("email"),
        data.get("password"),
        data.get("displayName"),
      );
      setMsg({ signin: "sikeres" });
    }
  };

  console.log(user);

  return (
    <div className="flex min-h-screen items-start justify-center pt-10 font-main">
      <div className="h-[450px] rounded-[15px] border border-stone-600 bg-black p-6 pt-16 shadow-md shadow-stone-800">
        <h1 className="text-center font-main text-3xl font-extralight uppercase tracking-wide text-white">
          {isSignIn ? "Login" : "Register"}
        </h1>
        <form
          className="mb-2 mt-6 flex h-fit w-fit flex-col items-center justify-center"
          onSubmit={handleSubmit}
        >
          <div className="mb-1 flex flex-col gap-6">
            <input
              name="email"
              placeholder="Email"
              className="placeholder:text-md mx-4 rounded-[40px] border border-stone-600 bg-[#1f1f1f] p-2 text-center text-xl font-extralight uppercase tracking-wide text-white placeholder-white shadow-md shadow-stone-800 outline-none focus:placeholder-transparent"
            />
            {!isSignIn && (
              <input
                name="displayName"
                placeholder="Nickname"
                className="placeholder:text-md mx-4 rounded-[40px] border border-stone-600 bg-[#1f1f1f] p-2 text-center text-xl font-extralight uppercase tracking-wide text-white placeholder-white shadow-md shadow-stone-800 outline-none focus:placeholder-transparent"
              />
            )}
            <input
              type="password"
              name="password"
              placeholder="********"
              className="mx-4 flex items-center justify-center rounded-[40px] border border-stone-600 bg-[#1f1f1f] p-2 text-center text-xl text-white placeholder-white shadow-md shadow-stone-800 outline-none focus:placeholder-transparent"
            />
          </div>
          <button className="font-lonely mt-4 w-[80%] rounded-[20px] border border-stone-600 bg-[#101010] py-1 text-center text-lg font-extralight uppercase tracking-wide text-white shadow-md shadow-stone-800 transition-all hover:scale-y-105">
            {isSignIn ? "Login" : "Register"}
          </button>
          {isSignIn ? (
            <div className="mt-4 flex flex-col items-center justify-center gap-2">
              <div className="jstify-center flex flex-row items-center gap-2 font-main">
                <p className="font-extralight uppercase tracking-wide text-white">
                  Don't have account?
                </p>
                <NavLink to={"/auth/up"}>
                  <p className="font-extralight uppercase tracking-wide text-stone-400 transition-all hover:text-stone-500">
                    Register
                  </p>
                </NavLink>
              </div>
              <NavLink
                className="font-lonely font-extralight uppercase tracking-wide text-stone-400 transition-all hover:text-stone-500"
                to={"/pwreset"}
              >
                Forgot password?
              </NavLink>
            </div>
          ) : (
            <div className="font-lonely mt-4 flex flex-row items-center justify-center gap-2">
              <p className="font-extralight uppercase tracking-wide text-white">
                Already have an account?
              </p>
              <NavLink to={"/auth/in"}>
                <p className="font-extralight uppercase tracking-wide text-stone-400 hover:text-stone-500">
                  Login
                </p>
              </NavLink>
            </div>
          )}
        </form>
        {msg && <Toastify {...msg} />}
      </div>
    </div>
  );
};
