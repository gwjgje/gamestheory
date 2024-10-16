import { useCallback, useState } from 'react';
import style from '../styles/Auth.module.css';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { IoEyeOffOutline, IoEyeOutline } from 'react-icons/io5';
import { signinAction, signupAction } from '../redux/auth/auth.actions';


function Auth() {
     const [showPassword, setShowPassword] = useState(false);
     const [signin, setSignin] = useState(true);
     const navigate = useNavigate();

     const dispatch = useDispatch();
     const { loading } = useSelector(store => store.authManager);

     const handleSubmit = useCallback((e) => {
          e.preventDefault();
          const cred = {
               username: e.target.username.value,
               password: e.target.password.value
          }

          if (signin) {
               dispatch(signinAction(cred, navigate));
          } else {
               dispatch(signupAction(cred, setSignin));
          }
     }, [signin])


     return (
          <div className={style.box}>
               <h2>{signin ? "Sign in" : "Sign up"}</h2>
               <form onSubmit={handleSubmit}>
                    <div className={style.inputBox}>
                         <input id="username" type="text" required />
                         <label>Username</label>
                    </div>
                    <div className={style.inputBox}>
                         <input id="password" type={showPassword ? "text" : "password"} required />
                         <span
                              role='button'
                              onClick={() => {
                                   setShowPassword(!showPassword)
                              }}>
                              {
                                   showPassword ? <IoEyeOffOutline /> : <IoEyeOutline />
                              }
                         </span>
                         <label>Password</label>
                    </div>
                    <div>
                         <input type="submit" value={loading ? "Wait..." : signin ? "Sign in" : "Sign up"} disabled={loading} />
                         <span onClick={() => setSignin(!signin)}>{signin ? "Create an acount!" : "Already have an account?"}</span>
                    </div>
               </form>
          </div>
     )
}

export default Auth