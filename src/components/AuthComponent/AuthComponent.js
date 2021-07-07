import React, { useState, Fragment } from 'react';
import coverWalking from '../../assets/imgs/omioCovers/cover-walking.svg'
import google from '../../assets/imgs/otherSvg/google.svg'
import './AuthComponent.scss'
import { emailValidator } from '../../shared/utility'

const AuthComponent = props => {

  const [isSignIn, setIsSignIn] = useState(true)


  //#region validation inputs, then add message error
  const validationErrorBlank = <p className="validationError">This field can't be blank</p>
  const validationErrorEmailNoValid = <p className="validationError">Invalid email format</p>
  const validationErrorPassNotValid = <p className="validationError">Must contain at least 8 characters</p>

  //* signInEmail
  const [signInEmail, setSignInEmail] = useState(null)
  const [isSignInEmailAccess, setIsSignInEmailAccess] = useState(false)
  let signInEmailError = null
  if (isSignInEmailAccess) {
    signInEmailError = !signInEmail ? validationErrorBlank : (!emailValidator(signInEmail) ? validationErrorEmailNoValid : null)
  }

  //* signInPass
  const [signInPass, setSignInPass] = useState(null)
  const [isSignInPassAccess, setIsSignInPassAccess] = useState(false)
  let signInPassError = null
  if (isSignInPassAccess) {
    signInPassError = !signInPass ? validationErrorBlank : (signInPass.length < 8 ? validationErrorPassNotValid : null)
  }

  //* signUpFname
  const [signUpFname, setSignUpFname] = useState(null)
  const [signUpFnameAccess, setSignUpFnameAccess] = useState(false)
  let signUpFnameError = null
  if (signUpFnameAccess) {
    signUpFnameError = !signUpFname ? validationErrorBlank : null
  }

  //* signUpLname
  const [signUpLname, setSignUpLname] = useState(null)
  const [signUpLnameAccess, setSignUpLnameAccess] = useState(false)
  let signUpLnameError = null
  if (signUpLnameAccess) {
    signUpLnameError = !signUpLname ? validationErrorBlank : null
  }

  //* signUpEmail
  const [signUpEmail, setSignUpEmail] = useState(null)
  const [signUpEmailAccess, setSignUpEmailAccess] = useState(false)
  let signUpEmailError = null
  if (signUpEmailAccess) {
    signUpEmailError = !signUpEmail ? validationErrorBlank : (!emailValidator(signUpEmail) ? validationErrorEmailNoValid : null)
  }

  //* signUpPass
  const [signUpPass, setSignUpPass] = useState(null)
  const [isSignUpPassAccess, setIsSignUpPassAccess] = useState(false)
  let signUpPassError = null
  if (isSignUpPassAccess) {
    signUpPassError = !signUpPass ? validationErrorBlank : (signUpPass.length < 8 ? validationErrorPassNotValid : null)
  }
  //#endregion

  const submitSignIn = _ => {
    // if all inputs is not null && no errors, why? (before focus on any inputs no errors yet, so we must check if inputs is null or not)
    if (signInEmail && signInPass && !signInEmailError && !signInPassError) {
      //* push to server
    } else {
      setIsSignInEmailAccess(true)
      setIsSignInPassAccess(true)
    }
  }

  const submitSignUp = _ => {
    if (signUpFname && signUpLname && signUpEmail && signUpPass && !signInEmailError && !signInPassError) {
      //* push to server
    } else {
      setSignUpFnameAccess(true)
      setSignUpLnameAccess(true)
      setSignUpEmailAccess(true)
      setIsSignUpPassAccess(true)
    }
  }


  return (
    <Fragment>
      <div className="closeWhenClick" onClick={_ => props.setOpenAuth(false)}></div>

      <div className="authPopupContent" >
        {isSignIn &&
          <div className="signIn">
            <div className="imgPart">
              <img alt="walking img" src={coverWalking}></img>
              <div className="filterUpperImg">
                <div className="contentUpperImg">
                  <h4>Welcome Back!</h4>
                  <p>To keep connected with us please login with your personal info</p>
                </div>
              </div>
            </div>
            <div className="contentPart">
              <h4>Login in</h4>
              <div className="withGoogle">
                <img alt="google" src={google} />
                <p>Sign in with Google</p>
              </div>
              <div className="or">
                <span>or</span>
              </div>
              <div className="withEmail">
                <div className="email">
                  <label htmlFor="email">Your email address</label>
                  <input className={signInEmailError ? "inputError" : null} type="email" id="email" name="email" onBlur={_ => setIsSignInEmailAccess(true)} onChange={e => setSignInEmail(e.target.value.trim())} />
                  {signInEmailError}
                </div>
                <div className="password">
                  <label htmlFor="password">Your password</label>
                  <input className={signInPassError ? "inputError" : null} type="password" id="password" name="password" onBlur={_ => setIsSignInPassAccess(true)} onChange={e => setSignInPass(e.target.value)} />
                  {signInPassError}
                </div>
                <button className="submitButton" onClick={submitSignIn}>Sign in</button>
              </div>
              <div className="toAnotherSign">
                <p>Don't have an account? <span onClick={_ => setIsSignIn(false)}>Sign up</span></p>
              </div>
            </div>
          </div>
        }

        {!isSignIn &&
          <div className="signUp">
            <div className="contentPart">
              <h4>Create Account</h4>
              <div className="withGoogle">
                <img alt="google" src={google} />
                <p>Sign up with Google</p>
              </div>
              <div className="or">
                <span>or</span>
              </div>
              <div className="withEmail">
                <div className="name">
                  <div className="firstName">
                    <label htmlFor="fname">First name</label>
                    <input className={signUpFnameError ? "inputError" : null} onBlur={_ => setSignUpFnameAccess(true)} onChange={e => setSignUpFname(e.target.value.trim())} type="text" id="fname" name="fname" />
                    {signUpFnameError}
                  </div>
                  <div className="lastName">
                    <label htmlFor="lname">Last name</label>
                    <input className={signUpLnameError ? "inputError" : null} onBlur={_ => setSignUpLnameAccess(true)} onChange={e => setSignUpLname(e.target.value.trim())} type="text" id="lname" name="lname" />
                    {signUpLnameError}
                  </div>
                </div>
                <div className="email">
                  <label htmlFor="email">Your email address</label>
                  <input className={signUpEmailError ? "inputError" : null} onBlur={_ => setSignUpEmailAccess(true)} onChange={e => setSignUpEmail(e.target.value.trim())} type="email" id="email" name="email" />
                  {signUpEmailError}
                </div>
                <div className="password">
                  <label htmlFor="password">Your password</label>
                  <input className={signUpPassError ? "inputError" : null} onBlur={_ => setIsSignUpPassAccess(true)} onChange={e => setSignUpPass(e.target.value)} type="password" id="password" name="password" />
                  {signUpPassError}
                </div>
                <button className="submitButton" onClick={submitSignUp}>Sign up</button>
              </div>
              <div className="toAnotherSign">
                <p>Already have an account? <span onClick={_ => setIsSignIn(true)}>Sign in</span></p>
              </div>
            </div>
            <div className="imgPart">
              <img alt="walking img" src={coverWalking}></img>
              <div className="filterUpperImg">
                <div className="contentUpperImg">
                  <h4>Hello, Friend!</h4>
                  <p>Enter your personal details and start journey with us</p>
                </div>
              </div>
            </div>
          </div>
        }

      </div>

    </Fragment>


  );
}

export default AuthComponent;
