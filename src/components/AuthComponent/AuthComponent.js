import React, { useState, Fragment } from 'react';
import coverWalking from '../../assets/imgs/omioCovers/cover-walking.svg'
import google from '../../assets/imgs/otherSvg/google.svg'
import './AuthComponent.scss'

const AuthComponent = props => {

  const [isSignIn, setIsSignIn] = useState(true)



  let validationError = (
    <p className="validationError">
      This field can't be blank
    </p>
    // Invalid email format.
    // Must contain at least 8 characters

  )

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
                  <input type="email" id="email" name="email" />
                  {validationError}
                </div>
                <div className="password">
                  <label htmlFor="password">Your password</label>
                  <input type="password" id="password" name="password" />
                  {validationError}
                </div>
                <button className="submitButton">Sign in</button>
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
                    <input type="text" id="fname" name="fname" />
                    {validationError}
                  </div>
                  <div className="lastName">
                    <label htmlFor="lname">Last name</label>
                    <input type="text" id="lname" name="lname" />
                    {validationError}
                  </div>
                </div>
                <div className="email">
                  <label htmlFor="email">Your email address</label>
                  <input type="email" id="email" name="email" />
                  {validationError}
                </div>
                <div className="password">
                  <label htmlFor="password">Your password</label>
                  <input type="password" id="password" name="password" />
                  {validationError}
                </div>
                <button className="submitButton">Sign up</button>
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
