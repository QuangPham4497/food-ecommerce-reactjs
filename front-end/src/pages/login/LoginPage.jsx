import React, { useContext, useState } from "react";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { Form, Input, Button, message } from "antd";
import { ArrowLeftOutlined } from "@ant-design/icons";
import axios from "axios";
import { UserContext } from "UserContext";

const LoginPage = () => {
  //
  const [redirect, setRedirect] = useState(false);
  const { setUserInfo } = useContext(UserContext);

  //antd
  const navigate = useNavigate();
  const [loginForm] = Form.useForm();

  async function login(values) {
    const response = await fetch("http://localhost:5000/login", {
      method: "POST",
      body: JSON.stringify({
        username: values.username,
        password: values.password,
      }),
      headers: { "Content-Type": "application/json" },
      credentials: "include",
    });

    if (response.ok) {
      response.json().then((userInfo) => {
        setUserInfo(userInfo);
        setRedirect(true);
        message.success("Success");
      });
    } else {
      message.error("fail");
    }
  }

  if (redirect) {
    return <Navigate to="/" />;
  }

  return (
    <div className="flex flex-col justify-start items-center w-full h-screen px-16 pt-10 bg-red-100">
      <h3>Login Form</h3>
      <Form
        form={loginForm}
        name="loginForm"
        labelCol={{
          span: 10,
        }}
        wrapperCol={{
          span: 16,
        }}
        initialValues={{
          remember: true,
        }}
        onFinish={(values) => login(values)}
        autoComplete="off"
        className="p-2 rounded-lg border-solid border-red-400 border-2 bg-red-100"
      >
        <Form.Item
          label="Họ và tên"
          name="username"
          rules={[
            {
              required: true,
              whitespace: true,
              message: "Please input your name!",
            },
          ]}
        >
          <Input className="border-1 border-solid border-red-300  focus:shadow-none" />
        </Form.Item>

        <Form.Item
          label="Mật khẩu"
          name="password"
          rules={[
            {
              required: true,
              message: "Please input your password!",
            },
          ]}
        >
          <Input.Password className="border-1 border-solid border-red-300 hover:border-red-300 focus:border-red-300 focus:shadow-none" />
        </Form.Item>

        <Form.Item
          wrapperCol={{
            offset: 8,
            span: 16,
          }}
        >
          <Button type="primary" danger htmlType="submit" className="">
            Đăng nhập
          </Button>
        </Form.Item>
      </Form>
      <h5 className="register-yet">
        <span>Chưa có tài khoản? </span>
        <Link to="/register">
          <i>
            <u>Đăng kí ngay</u>
          </i>
        </Link>
      </h5>
      <div style={{ textAlign: "center", marginTop: "10px" }}>
        <Button type="primary" danger ghost onClick={() => navigate("/")}>
          <ArrowLeftOutlined />
        </Button>
      </div>
    </div>
  );
};

export default LoginPage;
