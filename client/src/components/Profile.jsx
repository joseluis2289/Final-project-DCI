import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import { userLogout } from "../redux/actions";
import ModalBox from "./ModalBox";
import { Form, Button, Header } from "semantic-ui-react";
import "react-toastify/dist/ReactToastify.css";

export default function Profile() {
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const history = useHistory();
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
    <div
      style={{
        width: "300px",
        margin: "auto",
        marginTop: "20px",
      }}
      className="ui fluid card"
    >
      <Header size="large" style={{ margin: "auto", padding: "10px" }}>
        Profile Update
      </Header>
      <Form
        style={{ margin: "auto" }}
        onSubmit={handleSubmit((e) => {
          updateHandler(e);
        })}
      >
        <Form.Field>
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
        </Form.Field>
        <Form.Field>
          <label htmlFor="userName">Username</label>
          <input
            type="text"
            name="userName"
            id="username"
            value={updateData.userName}
            onChange={profileHandler}
          />
        </Form.Field>
        <Form.Field>
          <label htmlFor="email">Email</label>
          <input
            type="email"
            name="email"
            id="email"
            value={updateData.email}
            onChange={profileHandler}
          />
        </Form.Field>
        <Form.Field>
          <label htmlFor="password">Enter new password</label>
          <input
            type="password"
            name="password"
            id="password"
            //value={updateData.password}
            onChange={profileHandler}
            ref={register({ required: true, maxLength: 15, minLength: 3 })}
          />
        </Form.Field>
        {errors.password && errors.password.type === "maxLength" && (
          <span className="errorsMsg">Max length exceeded</span>
        )}
        {errors.password && errors.password.type === "minLength" && (
          <span className="errorsMsg">Must be more than 3 character</span>
        )}
        <Form.Field>
          <label htmlFor="confirm-password">Confirm new Password</label>
          <input
            type="password"
            name="confirmPassword"
            id="confirm-password"
            onChange={profileHandler}
            ref={register({ required: true, maxLength: 15, minLength: 3 })}
          />
        </Form.Field>
        {errors.confirmPassword &&
          errors.confirmPassword.type === "required" && (
            <span className="errorsMsg">Please confirm your password</span>
          )}
        {errors.confirmPassword &&
          errors.confirmPassword.type === "maxLength" && (
            <span className="errorsMsg">Max length exceeded</span>
          )}

        <Button
          style={{ width: "130px", alignItems: "center" }}
          className="ui primary labeled icon button"
          type="submit"
        >
          <i class="edit icon"></i>Update
        </Button>
      </Form>
      <ModalBox function={delProfile} text="DELETE PROFILE" />
    </div>
  );
}
