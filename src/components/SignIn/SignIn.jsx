import { useState } from 'react'
import { LuEye } from "react-icons/lu";
import { FaRegEyeSlash } from "react-icons/fa6";
import { NavLink } from 'react-router-dom';
import { sendPasswordResetEmail, signInWithEmailAndPassword } from 'firebase/auth';
import auth from '../../Firebase/Firebase.config';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function SignIn() {
    const [showPassWord, setShowPassword] = useState(true)
    const [signInUser, setSignInUser] = useState(null)
    const [error, setError] = useState(null)
    const [email,setEmail]=useState('')

    const handleSignIn = (e) => {
        e.preventDefault()

        const email = e.target.email.value
        const password = e.target.password.value
        setEmail(email)

        setError('')
        setSignInUser('')
        // setEmail('')

        signInWithEmailAndPassword(auth, email, password)
            .then(result => {
                const user = result.user;
                setSignInUser(user)
                // console.log(user)
            })
            .catch((error) => setError(error.message))

    }

    const handleShowpassword = () => {
        setShowPassword(!showPassWord)
    }

    const handleForgetPassword = () => {
        sendPasswordResetEmail(auth, email)
            .then(() =>
                toast.success('Check you Email')
            )
            .catch((error) => toast(error.message))
    }

    return (
        <div className="flex flex-col  items-center justify-center h-screen">
            <ToastContainer />
            <h2 className="text-3xl my-4">Please SignIn</h2>
            {
                signInUser &&
                <p className="text-green-400 text-center text-xl" >SignUp Sucessfully</p>
            }
            <div className="card shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
                <form className="card-body" onSubmit={handleSignIn}>
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text">Email</span>
                        </label>
                        <input name="email" type="email" placeholder="email" className="input input-bordered" required />
                    </div>
                    <div className="form-control relative">
                        <label className="label">
                            <span className="label-text">Password</span>
                        </label>
                        <input name="password" type={showPassWord ? "password" : "text"} placeholder="password" className="input input-bordered" required />
                        <div className="absolute top-2/3 right-2">
                            {
                                showPassWord ? <LuEye onClick={handleShowpassword} /> : <FaRegEyeSlash onClick={handleShowpassword} />
                            }
                        </div>
                    </div>
                    <p onClick={handleForgetPassword} className='mt-4'>Forget Your Password</p>

                    <div className="form-control mt-6 gap-3">
                        <button className="btn btn-primary">Sign Up</button>
                        <NavLink to='/signup'>You Dont Have an Account <span className="text-blue-400">SignUp</span> </NavLink>
                    </div>
                </form>
                {
                    error &&
                    <p className="text-red-400 text-center text-xl" >{error}</p>
                }

            </div>
        </div>
    )
}
