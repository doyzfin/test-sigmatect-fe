import { Input, Form, Card, Button, message } from "antd";
import Background from "../../assets/img/bg.jpg";
import { useEffect, useState } from "react";
import { Container } from "react-bootstrap";
import axiosApiIntances from "../../utils/axios";
import { Link } from "react-router-dom";

const Login = (props) => {
  const [error, setError] = useState("");
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    axiosApiIntances.get("users").then((res) => {
      console.log(res);
    });
  }, []);

  const [form] = Form.useForm();

  const handleLogin = (values) => {
    console.log(values);
    axiosApiIntances
      .post("auth/login", values)
      .then((res) => {
        console.log(res);
        localStorage.setItem("token", res.data.data.token);
        localStorage.setItem("userId", res.data.data.user_id);
        localStorage.setItem("membership", res.data.data.membership_id);
        props.history.push("/home");
        message.success(`Success Login, Hai ${res.data.data.user_name}`);
      })
      .catch((err) => {
        err.response && setIsError(true);
        err.response && setError(err.response.data.msg);
        setTimeout(() => {
          setIsError(false);
        }, 2000);
      });
  };

  return (
    <>
      <Container
        style={{
          backgroundImage: `url(${Background})`,

          paddingTop: "100px",
          paddingBottom: "210px",
        }}
        fluid
      >
        <Card
          style={{
            width: "30%",
            borderRadius: "20px",
            margin: "0 auto",
            marginTop: "50px",
            boxShadow: "3px 3px 3px #000",
          }}
        >
          <h1 style={{ fontFamily: "Noto Sans JP" }}>Login</h1>
          <p>
            Please Input your email and password to discover thousand of film
          </p>
          <br />
          <Form layout="vertical" form={form} onFinish={handleLogin}>
            <Form.Item
              label="Email"
              name="userEmail"
              rules={[
                {
                  required: true,
                  message: "Please input your email!",
                },
              ]}
              style={{ fontFamily: "Noto Sans JP" }}
            >
              <Input
                type="email"
                placeholder="Input Your Email"
                style={{ fontFamily: "Noto Sans JP" }}
              />
            </Form.Item>
            <Form.Item
              label="Password"
              name="userPassword"
              rules={[
                {
                  required: true,
                  message: "Please input your password!",
                },
              ]}
              style={{ fontFamily: "Noto Sans JP" }}
            >
              <Input.Password />
            </Form.Item>
            {isError && (
              <p
                style={{
                  color: "red",
                  textAlign: "center",
                  fontFamily: "Noto Sans JP",
                }}
              >
                {error}
              </p>
            )}

            <p>
              don't have an account yet ?
              <Link to="/register"> Register Here</Link>
            </p>
            <br />
            <Button
              style={{
                backgroundColor: "#354e80",
                color: "#fff",
                border: "0px",
                borderRadius: "10px",
                float: "right",
                padding: "0px 20px",
                textAlign: "center",
                fontFamily: "Noto Sans JP",
              }}
              htmlType="submit"
            >
              Login
            </Button>
          </Form>
        </Card>
      </Container>
    </>
  );
};
export default Login;
