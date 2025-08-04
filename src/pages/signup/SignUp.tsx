import React,{useState} from 'react'
import Style from './signup.module.css'
import { Link, useNavigate } from 'react-router-dom'
import {auth} from '../../../utility/firebase'
import {createUserWithEmailAndPassword} from 'firebase/auth'
import Navigation from '../../components/Navigation'

export default function SignUp() {

  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState<boolean>(false);
    const handleToggleShowPassword = () => {
    setShowPassword(prevShowPassword => !prevShowPassword); // Toggle the state
  };

  const [email,setEmail]=useState<string>("")
  const [password,setPassword]=useState<string>("")
  const [error,setError]=useState<string>("")
  
   
  const authHandeler=(e: any)=>{
   e.preventDefault()
   
   createUserWithEmailAndPassword(auth,email,password).then((userInfo)=>{
    console.log(userInfo)
    navigate('/dashboard') // Navigate to dashboard after successful signup
   }).catch((err)=>{
    console.log(err)
    setError(err.message)
   })
  }
  return (
   <div className={Style.bg} >
     <Navigation />
     <div className="bg-white p-4  rounded-[15px] shadow-xl max-w-[330px] w-full   h-[650px]  flex flex-col md:flex-row md:max-w-[1040px] md:ml-[10%] md:mr-[10%] md:max-h-[587px] mt-16">
      <section className='md:p-[14%] '  >
       <p className="font-[700] text-[48px] mb-[15px] md:mt-[50%]" >Taskify</p>
      </section>
       <div className="hidden md:flex items-center justify-center"> 
    <div className="w-px bg-gray-300 h-[85%] mx-4"></div> 
  </div>
      <hr  />
      <section className='md:ml-5 '>
        <div>
         <p className={Style.welcome}>Welcom </p>
         <small className='text-[17px]'>Enter your info to get started with taskify </small>
        </div>
        <form action="" method="post" className='mt-[30px] ml-2'>
          <input type="text" name="name"  placeholder='Name'  size={30} className={Style.field}/> <br />
          <input type="email" name="email"  placeholder='Email'  size={30} className={Style.field} value={email} onChange={(e)=>setEmail(e.target.value)}/> <br />
          <input type="email" name="email"  placeholder='phone number, username or email'  size={30} className={Style.field}/> <br />
          <input type={showPassword ? 'text' : 'password'} name='password'  placeholder=' Confirm Password' className={Style.field} size={30} value={password} onChange={(e)=>setPassword(e.target.value)}/> <br />
           <div className='flex flex-row gap-2'>             
               <input
               checked={showPassword} 
               onChange={handleToggleShowPassword}
                type="checkbox"
                id="showPasswordCheckbox" 
                className="mr-2 h-5 w-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500" 
              />            
            <label htmlFor="showPasswordCheckbox" className="text-gray-5700 text-sm">Show password</label>
            
           </div>
           <button type="submit" className={Style.login} onClick={authHandeler}>signup</button>
        </form>
        <p className='ml-[25px]'>Don't have an account? <span><Link to="/login" className='font-bold underline'>log in</Link></span></p>
      </section>
    </div>
    </div>
  )
}
