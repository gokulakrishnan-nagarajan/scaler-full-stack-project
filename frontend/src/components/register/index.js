import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import { register } from "../../store/user";
import { HOME, LOGIN } from "../../constants/path";

import styles from "./index.module.scss";

function Register() {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const isRegisterProcessing = useSelector(
        (state) => state.user.isRegistering
    );

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    useEffect(() => {
        const authToken = localStorage.getItem("authToken");

        if (authToken) {
            navigate(HOME);
        }
    }, []);

    const onNameChange = (e) => {
        const newName = e.target.value;

        setName(newName);
    };

    const onEmailChange = (e) => {
        const newEmail = e.target.value;

        setEmail(newEmail);
    };

    const onPasswordChange = (e) => {
        const newPassword = e.target.value;

        setPassword(newPassword);
    };

    const onSubmit = (e) => {
        e.preventDefault();

        const formData = new FormData(e.target);
        const data = Object.fromEntries(formData.entries());

        dispatch(register(data))
            .then(() => {
                navigate(LOGIN);
            })
            .catch((err) => {});
    };

    const onLogInClick = () => {
        navigate(LOGIN);
    };

    return (
        <div
            className={`${styles["container"]} flex-column flex-align-center flex-justify-center`}
        >
            <form
                className={`${styles["form"]} flex-column flex-align-center`}
                onSubmit={onSubmit}
            >
                <h3>Register</h3>
                <input
                    className="text-field"
                    name="name"
                    placeholder="Name"
                    value={name}
                    onChange={onNameChange}
                    required
                />
                <input
                    className="text-field"
                    name="email"
                    placeholder="email"
                    type="email"
                    value={email}
                    onChange={onEmailChange}
                    required
                />
                <input
                    className="text-field"
                    name="password"
                    placeholder="Password"
                    type="password"
                    value={password}
                    onChange={onPasswordChange}
                    required
                />
                <button
                    className={`${styles["submit-btn"]} btn-outlined blue-btn`}
                    type="submit"
                    disabled={isRegisterProcessing}
                >
                    Submit
                </button>
            </form>
            <div className={styles["login-container"]}>
                Already have an account ?{" "}
                <span className="cursor-pointer" onClick={onLogInClick}>
                    Log in
                </span>
            </div>
        </div>
    );
}

export default Register;
