import React, { useState } from 'react';
import "./myAccount.scss";
import Newsletter from '../../components/newsletter/newsletter';
import { useQuery } from '@tanstack/react-query';
import newRequest from '../../utils/newRequest';
import { useNavigate } from 'react-router-dom';

const MyAccount = () => {
  const currentUser = JSON.parse(localStorage.getItem("currentUser"));

  const { isLoading, error, data } = useQuery({
    queryKey: ["users"],
    queryFn: () =>
      newRequest.get(`/users/${currentUser._id}`).then((res) => {
        return res.data;
      }),
  });

  console.log(error)

  const [firstName, setFirstName] = useState(data.firstName || '');
  const [lastName, setLastName] = useState(data?.lastName || '');
  const [email, setEmail] = useState(data?.email || '');

  const handleChangeFirstName = (e) => {
    setFirstName(e.target.value);
  }

  const handleChangeLastName = (e) => {
    setLastName(e.target.value);
  }

  const handleChangeEmail = (e) => {
    setEmail(e.target.value);
  }

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault(false);
    try {
      const response = await newRequest.put(`/users/${currentUser?._id}`, {
        firstName,
        lastName,
        email
      });

      console.log(response);
      navigate("/");
    } catch (error) {
      console.error("Error updating user:", error);
      // Handle error as needed
    }
  }

  return (
    <div>
      <div className="myAccount">
        <div className="container">
          <div className="wrapper">
            <h1>MY ACCOUNT</h1>
            {currentUser && data &&
              <form action="" onSubmit={handleSubmit}>
                <div className="name">
                  <label htmlFor="">First Name</label>
                  <input type="text" value={firstName} onChange={(e) => handleChangeFirstName(e)} placeholder="first name" />
                </div>
                <div className="name">
                  <label htmlFor="">Last Name</label>
                  <input type="text" value={lastName} onChange={(e) => handleChangeLastName(e)} placeholder="last name" />
                </div>
                <div className="email">
                  <label htmlFor="">Email</label>
                  <input type="email" value={email} onChange={(e) => handleChangeEmail(e)} placeholder="email" />
                </div>
                <button>Update</button>
              </form>
            }
          </div>
        </div>
      </div>
      <Newsletter />
    </div>
  );
}

export default MyAccount;
