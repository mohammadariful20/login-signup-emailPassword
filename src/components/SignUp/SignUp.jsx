import { createUserWithEmailAndPassword, sendEmailVerification } from "firebase/auth";
import { useState } from "react";
import { LuEye } from "react-icons/lu";
import { FaRegEyeSlash } from "react-icons/fa6";
import { NavLink } from "react-router-dom";
import auth from '../../Firebase/Firebase.config';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function SignUp() {
    const [signupUser, setSignupUser] = useState(null)
    const [error, setError] = useState(null)
    const [showPassWord, setShowPassword] = useState(true)

    const handleSubmit = (e) => {
        e.preventDefault();

        const email = e.target.email.value
        const password = e.target.password.value
        const checked = e.target.checked.checked
        // console.log(checked)

        let regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@.#$!%*?&^])[A-Za-z\d@.#$!%*?&]{8,15}$/;

        if (password.length < 6) {
            setError("Password must be at least 6 characters")
            return
        } else if (regex.test(password)) {
            setError("Password must contain at least 1 lowercase, uppercase,number and special character")
            console.log(password)
            return
        } else if (!checked) {
            setError("Please Accept Our Terms and Conditions")
            return
        }


        setError('')
        setSignupUser('')

        createUserWithEmailAndPassword(auth, email, password)
            .then(result => {
                const user = result.user;
                setSignupUser(user)
                console.log(user)


                sendEmailVerification(auth.currentUser)
                    .then(() => {
                        toast.success('Email verification sent!', {
                            position: "top-center",
                            autoClose: 5000,
                            hideProgressBar: false,
                            closeOnClick: true,
                            pauseOnHover: true,
                            draggable: true,
                            progress: undefined,
                            theme: "light",
                        });
                    })

            })
            .catch((error) => alert(error.message))


    }

    const handleShowpassword = () => {
        setShowPassword(!showPassWord)
    }

    return (
        <div className="flex flex-col  items-center justify-center h-screen">
            <h2 className="text-3xl my-4">Please Sign Up</h2>
            {
                signupUser &&
                <p className="text-green-400 text-center text-xl" >SignUp Sucessfully</p>
            }
            <div className="card shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
                <form className="card-body" onSubmit={handleSubmit}>
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
                    <div className="">
                        <input type="checkbox" name="checked" id="" />
                        <label className="ml-3" htmlFor="checked">Terms and Conditions</label>
                    </div>
                    <div className="form-control mt-6 gap-3">
                        <button className="btn btn-primary">Sign Up</button>
                        <NavLink to='/singin'>You Have an Account <span className="text-blue-400">SignIn</span> </NavLink>
                    </div>
                </form>
                {
                    error &&
                    <p className="text-red-400 text-center text-xl" >{error}</p>
                }
                <ToastContainer
                    position="top-center"
                    autoClose={5000}
                    hideProgressBar={false}
                    newestOnTop={false}
                    closeOnClick
                    rtl={false}
                    pauseOnFocusLoss
                    draggable
                    pauseOnHover
                    theme="light"
                    transition:Bounce
                />
            </div>
        </div>
    )
}
