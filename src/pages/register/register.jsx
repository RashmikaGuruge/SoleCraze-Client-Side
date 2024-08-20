import { useState } from "react";
import newRequest from "../../utils/newRequest";
import "./register.scss";
import { useNavigate } from 'react-router-dom';

const Register = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("null");

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
      e.preventDefault();
      if(confirmPassword !== password ) return console.log("Confirm Your Password Again!");
      try {
      const res = await newRequest.post("/auth/register", {firstName,lastName,email,password});

      navigate("/login"); 
  } catch (err) {
    setError(err.response.data);
    console.log(err.response.data);
  }
};
  return (
    <div className="register">
      <div className="container">
        <div className="wrapper">
          <h1>CREATE AN ACCOUNT</h1>
          <form action="" onSubmit={handleSubmit}>
            <div className="name">
              <input type="text" placeholder="First Name" onChange={(e) => setFirstName(e.target.value)}/>
              <input type="text" placeholder="Last Name" onChange={(e) => setLastName(e.target.value)}/>
            </div>
            <div className="email">
              <input type="email" placeholder="Email" onChange={(e) => setEmail(e.target.value)}/>
            </div>
            <div className="password">
              <input type="password" placeholder="Password" onChange={(e) => setPassword(e.target.value)}/>
              <input type="password" placeholder="Confirm Password" onChange={(e) => setConfirmPassword(e.target.value)}/>
            </div>
            <span>
            By creating an account, I consent to the processing of my personal
            data in accordance with the <b>PRIVACY POLICY</b>
            </span>
            <button>CREATE</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Register;
