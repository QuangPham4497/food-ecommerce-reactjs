import axios from "axios";
import React, { useEffect, useState } from "react";
import { Form, Input, Button, message } from "antd";
import { ArrowLeftOutlined } from "@ant-design/icons";
import { Link, useNavigate } from "react-router-dom";

const RegisterPage = () => {
  //
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  //antd
  const navigate = useNavigate();
  const [registerForm] = Form.useForm();

  useEffect(() => {}, []);

  async function register(values) {
    try {
      const response = await axios.post("http://localhost:5000/register", {
        username: values.username,
        password: values.password,
      });

      if (response.status === 200) {
        message.success(response?.data.message);
      }
    } catch (error) {
      message.error(error.response?.data.message);
    }
  }

  return (
    <div className="flex flex-col justify-start items-center w-full h-screen px-16 pt-10 bg-red-100">
      {/* <form
        className="flex flex-col justify-center items-center gap-2 w-72 h-72 p-2 rounded-lg border-solid border-red-500 border-2 bg-red-100"
        onSubmit={register}
      >
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className="block p-1 rounded-lg"
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="block p-1 rounded-lg"
        />
        {username && password ? (
          <button className="text-center p-1 rounded-lg border-2 border-solid border-red-500 bg-red-100 hover:bg-red-200 active:bg-red-300">
            Register
          </button>
        ) : (
          <button className="text-center p-1 rounded-lg border-2 border-solid border-red-500 bg-red-100 disabled:opacity-75">
            Register
          </button>
        )}
      </form> */}

      <h3>Register Form</h3>
      <Form
        form={registerForm}
        name="registerForm"
        labelCol={{
          span: 10,
        }}
        wrapperCol={{
          span: 16,
        }}
        initialValues={{
          remember: true,
        }}
        onFinish={(values) => register(values)}
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
          label="Xác nhận mật khẩu"
          name="confirm"
          dependencies={["password"]}
          hasFeedback
          rules={[
            {
              required: true,
              message: "Please confirm your password!",
            },
            ({ getFieldValue }) => ({
              validator(_, value) {
                if (!value || getFieldValue("password") === value) {
                  return Promise.resolve();
                }
                return Promise.reject(
                  new Error("Confirm Password is not correct!")
                );
              },
            }),
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
            Đăng kí
          </Button>
        </Form.Item>
      </Form>
      <h5 className="register-yet">
        <span>Đã có tài khoản? </span>
        <Link to="/login">
          <i>
            <u>Đăng nhập ngay</u>
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

export default RegisterPage;
