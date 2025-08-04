import React, { useState } from 'react'
import Style from './login.module.css'
import { Link, useNavigate } from 'react-router-dom'
import { auth } from '../../../utility/firebase'
import { signInWithEmailAndPassword } from 'firebase/auth'
import Navigation from '../../components/Navigation'


export default function Login() {

  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const handleToggleShowPassword = () => {
    setShowPassword(prevShowPassword => !prevShowPassword);
  };

  const [email, setEmail] = useState<string>("")
  const [password, setPassword] = useState<string>("")
  const [error, setError] = useState<string>("")


  const authHandeler = (e: any) => {
    e.preventDefault()

    signInWithEmailAndPassword(auth, email, password).then((userInfo) => {
      console.log(userInfo)
      navigate('/dashboard') // Navigate to dashboard after successful login
    }).catch((err) => {
      console.log(err)
      setError(err.message)
    })

  }
  return (
    <div className={Style.bg} >
      <Navigation />
      <div className="bg-white p-4 mt-[] rounded-[15px] shadow-xl max-w-[330px] w-full   h-[650px]  flex flex-col md:flex-row md:max-w-[1040px] md:ml-[10%] md:mr-[10%] md:max-h-[587px] mt-44">
        <section className='md:p-[14%] '  >
          <p className="font-[700] mb-[30px] md:mt-[50%]" >Musically</p>
        </section>
        <div className="hidden md:flex items-center justify-center">
          <div className="w-px bg-gray-300 h-[85%] mx-4"></div>
        </div>
        <hr />
        <section className='md:ml-5 '>
          <div>
            <p className='text-lg font-bold'>Welcome</p>
            <p className={Style.welcome}> Back</p>
            <small className='text-[14px]' >Enter your credential to continue</small>
          </div>
          <form action="" method="post" className='mt-[30px] ml-2'>
            <input type="email" name="email" placeholder='phone number, username or email' size={30} className={Style.field} value={email} onChange={(e) => setEmail(e.target.value)} /> <br />
            <input type={showPassword ? 'text' : 'password'} name='password' placeholder='password' className={Style.field} size={30} value={password} onChange={(e) => setPassword(e.target.value)} /> <br />
            <div className='flex flex-row gap-2'>
              <input
                checked={showPassword}
                onChange={handleToggleShowPassword}
                type="checkbox"
                id="showPasswordCheckbox" // Unique ID for the checkbox
                className="mr-2 h-5 w-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
              />
              <label htmlFor="showPasswordCheckbox" className="text-gray-5700 text-sm">Show password</label>
              <a href="http://" className="text-gray-700 text-sm font-bold " >forgot password?</a>
            </div>
            <button type="submit" className={Style.login} onClick={authHandeler} name='login'>Log in</button>
          </form>
          <p className='ml-[25px]'>Don't have an account? <span><Link to="/signup" className='font-bold underline'>Sign Up</Link></span></p>
        </section>
      </div>
    </div>
  )
}
