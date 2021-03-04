import React, { useState, useEffect, Fragment } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import { userLogout } from "../redux/actions";
import Settings from "./settings/Settings";
import ModalBox from "./ModalBox";

export default function Profile() {
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();
  let history = useHistory();
  const [updateData, setUpdateData] = useState({
    email: "",
    name: "",
    password: "",
    userName: "",
    _id: "",
  });

  const notify = () => {
    toast.success(`Successfully Updated!`, {
      position: toast.POSITION.TOP_CENTER,
      autoClose: 2000,
    });
  };

  const notifyError = () => {
    toast.error("Error to Update profile!", {
      position: toast.POSITION.TOP_CENTER,
      autoClose: 2000,
    });
  };

  const { register, handleSubmit, errors } = useForm();

  const profileHandler = (e) => {
    //console.log(e);
    e.preventDefault();
    setUpdateData({ ...updateData, [e.target.name]: e.target.value });
  };

  //GET DATA TO DISPLAY
  useEffect(() => {
    fetch("/profile")
      .then((response) => {
        if (response.status === 200) {
          response.json().then((data) => {
            console.log(data);
            setUpdateData({ ...data, password: "password" });
          });
        } else {
          // connection is lost
        }
      })
      .catch((err) => console.log(err));
  }, []);

  const updateHandler = () => {
    //e.preventDefault();
    axios({
      method: "PUT",
      url: `/update`,
      data: updateData,
    })
      .then((response) => {
        console.log(response.data);
        notify();
        setUpdateData({ ...response.data, password: updateData.password });
      })
      .catch((err) => {
        notifyError();
        console.error("Error to update", err);
      });
  };
  const delProfile = () => {
    axios({
      method: "DELETE",
      url: `delete/${user._id}`,
    })
      .then((res) => {
        history.push("/home");
        dispatch(userLogout());
      })
      .catch((err) => console.log(err));
  };
  return (
    <Fragment>
      <Settings />
      <div>
        <h2>Profile Update</h2>
        <form
          onSubmit={handleSubmit((e) => {
            updateHandler(e);
          })}
        >
          <label htmlFor="name">Name</label>
          <input
            type="text"
            name="name"
            id="name"
            value={updateData.name}
            onChange={(e) => {
              profileHandler(e);
            }}
          />

          <label htmlFor="userName">Username</label>
          <input
            type="text"
            name="userName"
            id="username"
            value={updateData.userName}
            onChange={profileHandler}
          />

          <label htmlFor="email">Email</label>
          <input
            type="email"
            name="email"
            id="email"
            value={updateData.email}
            onChange={profileHandler}
          />

          <label htmlFor="password">Enter new password</label>
          <input
            type="password"
            name="password"
            id="password"
            //value={updateData.password}
            onChange={profileHandler}
            ref={register({ required: true, maxLength: 15, minLength: 3 })}
          />
          {errors.password && errors.password.type === "maxLength" && (
            <span className="errorsMsg">Max length exceeded</span>
          )}
          {errors.password && errors.password.type === "minLength" && (
            <span className="errorsMsg">Must be more than 3 character</span>
          )}
          <label htmlFor="confirm-password">Confirm new Password</label>
          <input
            type="password"
            name="confirmPassword"
            id="confirm-password"
            onChange={profileHandler}
            ref={register({ required: true, maxLength: 15, minLength: 3 })}
          />
          {errors.confirmPassword &&
            errors.confirmPassword.type === "required" && (
              <span className="errorsMsg">Please confirm your password</span>
            )}
          {errors.confirmPassword &&
            errors.confirmPassword.type === "maxLength" && (
              <span className="errorsMsg">Max length exceeded</span>
            )}
          {errors.confirmPassword &&
            errors.confirmPassword.type === "minLength" && (
              <span className="errorsMsg">Must be more than 3 character</span>
            )}
          <button type="submit">Update</button>
        </form>
        <ModalBox function={delProfile} text="DELETE PROFILE" />
      </div>
    </Fragment>
  );
}
