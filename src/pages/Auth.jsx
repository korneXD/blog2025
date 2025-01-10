import { useContext } from 'react';
import { UserContext } from '../context/UserContext';
import { NavLink, useLocation, useNavigate } from 'react-router-dom';
import Toastify from '../components/Toastify';
import { useEffect } from 'react';

export const Auth = () => {

  const { user, signInUser, msg, setMsg, signUpUser } = useContext(UserContext)

  const location = useLocation()
  console.log(location.pathname);
  const isSignIn = location.pathname == '/auth/in'

  useEffect(() => {
    setMsg(null)
  }, [])

  console.log(msg);

  const handleSubmit = (event) => {
    event.preventDefault()
    setMsg({err: null })
    const data = new FormData(event.currentTarget)
    if (isSignIn) {
      signInUser(data.get('email'), data.get('password'))
    } else {
      signUpUser(data.get('email'), data.get('password'), data.get('displayName'))
      setMsg({signin:"sikeres"})
    }
  }

  console.log(user);

  return (
    <div className='flex justify-center items-start font-main pt-10 min-h-screen'>
      <div className='p-6 rounded-[15px] shadow-sm shadow-stone-600 bg-black h-[450px] pt-16'>
        <h1 className='text-3xl font-bold text-center text-white font-lonely'>{isSignIn ? 'Login' : 'Register'}</h1>
        <form className="mt-6 mb-2 w-fit h-fit flex flex-col justify-center items-center" onSubmit={handleSubmit}>
          <div className="mb-1 flex flex-col gap-6">
            <input
              name='email'
              placeholder="Email"
              className="shadow-sm shadow-stone-600 placeholder:text-md p-2 text-center mx-4 rounded-[40px] text-xl outline-none focus:placeholder-transparent bg-[#1f1f1f] text-white placeholder-white"
            />
            {!isSignIn &&
              <input
                name='displayName'
                placeholder="Nickname"
                className="shadow-sm shadow-stone-600 placeholder:text-md p-2 text-center mx-4 rounded-[40px] text-xl outline-none focus:placeholder-transparent bg-[#1f1f1f] text-white placeholder-white"
              />
            }
            <input
              type="password"
              name='password'
              placeholder="********"
              className="shadow-sm shadow-stone-600 flex p-2 text-center mx-4 rounded-[40px] text-xl outline-none focus:placeholder-transparent bg-[#1f1f1f] text-white placeholder-white"
            />
          </div>
          <button className='py-1 bg-[#101010] font-lonely font-bold shadow-sm shadow-stone-600 text-lg text-white text-center rounded-[20px] w-[80%] hover:scale-y-105 transition-all mt-4'>
            {isSignIn ? "Login" : "Register"}
          </button>
          {isSignIn ?
            <div className="flex justify-center items-center flex-col gap-2 mt-4">
              <div className="flex jstify-center items-center flex-row gap-2 font-lonely">
              <p className='text-white'>Don't have account?</p>
              <NavLink to={'/auth/up'}>
                <p className='text-white font-bold'>Register</p>
              </NavLink>
              </div>
              <NavLink className='text-white font-lonely' to={'/pwreset'}>Forgot password?</NavLink>
            </div>
            :
            <div className="flex justify-center items-center flex-row gap-2 mt-4 font-lonely">
              <p className='text-white'>Already have an account?</p>
              <NavLink to={'/auth/in'}>
                <p className='text-white font-bold'>Login</p>
              </NavLink>
            </div>
          }
        </form>
        {msg && <Toastify {...msg} />}
      </div>
    </div>
  )
}