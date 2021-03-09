import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Form, Button, Header } from "semantic-ui-react";

export default function Register() {
  const [registerData, setRegisterData] = useState({});
  const { register, handleSubmit, errors } = useForm();

  const notify = () => {
    toast.success(`Successfully Registered!`, {
      position: toast.POSITION.TOP_CENTER,
      autoClose: 2000,
    });
  };

  const notifyError = () => {
    toast.error("Error to Register", {
      position: toast.POSITION.TOP_CENTER,
      autoClose: 2000,
    });
  };

  const notifyInfo = () => {
    toast.info("Name and password need 3+ characters", {
      position: toast.POSITION.TOP_CENTER,
      autoClose: 2000,
    });
  };
  const NotifyWarn = () => {
    toast.warn("This Email is already taken!", {
      position: toast.POSITION.TOP_CENTER,
      autoClose: 2000,
    });
  };
  function handleChange(e) {
    setRegisterData({ ...registerData, [e.target.name]: e.target.value });
  }
  let history = useHistory();
  return (
    <article
      style={{
        width: "300px",
        margin: "auto",
        marginTop: "20px",
      }}
      className="ui fluid card"
    >
      <Header size="large" style={{ margin: "auto", padding: "10px" }}>
        Register
      </Header>
      <Form
        style={{ margin: "auto" }}
        onSubmit={handleSubmit(() => {
          // e.preventDefault();
          console.log("Login Request!");
          fetch("/register", {
            method: "POST",
            body: JSON.stringify(registerData),
            headers: {
              "Content-Type": "application/json;charset=utf-8",
            },
          })
            .then((result) => result.json())
            .then((response) => {
              console.log(response);
              if (response.msg === false) {
                NotifyWarn();
              } else if (response.validation) {
                setRegisterData({ success: response.success });
                notifyInfo();
              } else {
                history.push("/login");
                response ? notify() : notifyError();
              }
            })
            .catch((err) => console.log(err));
        })}
      >
        <Form.Field>
          <label htmlFor="username">Name</label>
          <input
            type="text"
            name="name"
            id="name"
            onChange={(e) => {
              handleChange(e);
            }}
            ref={register({ required: true, maxLength: 15, minLength: 3 })}
          />
        </Form.Field>
        {errors.name && errors.name.type === "required" && (
          <span className="errorsMsg">Your Name is required</span>
        )}
        {errors.name && errors.name.type === "minLength" && (
          <span className="errorsMsg">
            Your Name Must be more than 3 character
          </span>
        )}
        {errors.name && errors.name.type === "maxLength" && (
          <span className="errorsMsg">Max length exceeded</span>
        )}
        <Form.Field>
          <label htmlFor="username">Username</label>
          <input
            type="text"
            name="userName"
            id="username"
            onChange={(e) => {
              handleChange(e);
            }}
            ref={register({ required: true, maxLength: 15, minLength: 3 })}
          />
        </Form.Field>
        {errors.userName && errors.userName.type === "required" && (
          <span className="errorsMsg">Your Username is required</span>
        )}
        {errors.userName && errors.userName.type === "maxLength" && (
          <span className="errorsMsg">Max length exceeded</span>
        )}
        {errors.userName && errors.userName.type === "minLength" && (
          <span className="errorsMsg">
            Your Username Must be more than 3 character
          </span>
        )}

        <Form.Field>
          <label htmlFor="email">Email</label>
          <input
            type="text"
            name="email"
            id="email"
            onChange={(e) => {
              handleChange(e);
            }}
            ref={register({ required: true })}
          />
        </Form.Field>
        {errors.email && errors.email.type === "required" && (
          <span className="errorsMsg">Your Email is required</span>
        )}

        <Form.Field>
          <label htmlFor="password">Password</label>
          <input
            type="password"
            name="password"
            id="password"
            onChange={(e) => {
              handleChange(e);
            }}
            ref={register({ required: true, maxLength: 15, minLength: 3 })}
          />
        </Form.Field>
        {errors.password && errors.password.type === "required" && (
          <span className="errorsMsg">Your Password is required</span>
        )}
        {errors.password && errors.password.type === "maxLength" && (
          <span className="errorsMsg">Max length exceeded</span>
        )}
        {errors.password && errors.password.type === "minLength" && (
          <span className="errorsMsg">Must be more than 3 character</span>
        )}
        <Form.Field>
          <label htmlFor="confirm-password">Confirm Password</label>
          <input
            type="password"
            name="confirm-password"
            id="confirm-password"
            onChange={(e) => {
              handleChange(e);
            }}
            ref={register({ required: true })}
          />
        </Form.Field>
        {errors.confirmPassword && "Please confirm your password"}

        <Button
          style={{ width: "130px", alignItems: "center" }}
          className="ui primary labeled icon button"
          type="submit"
        >
          <i class="address card icon"></i>
          Register
        </Button>
      </Form>
    </article>
  );
}
