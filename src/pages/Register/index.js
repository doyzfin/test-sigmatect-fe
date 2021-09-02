import { Input, Form, Card, Button } from "antd";
import Background from "../../assets/img/bg.jpg";
import { useEffect, useState } from "react";
import { Container } from "react-bootstrap";
import axiosApiIntances from "../../utils/axios";

const Register = (props) => {
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
      .post("auth/register", values)
      .then((res) => {
        props.history.push("/");
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
          <h1 style={{ fontFamily: "Noto Sans JP" }}>Register</h1>
          <p>Join and Enjoy thousand film</p>
          <br />
          <Form layout="vertical" form={form} onFinish={handleLogin}>
            <Form.Item
              label="Name"
              name="userName"
              rules={[
                {
                  required: true,
                  message: "Please input your name!",
                },
              ]}
              style={{ fontFamily: "Noto Sans JP" }}
            >
              <Input
                type="text"
                placeholder="Input Your Name"
                style={{ fontFamily: "Noto Sans JP", borderRadius: "10px" }}
              />
            </Form.Item>
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
                style={{ fontFamily: "Noto Sans JP", borderRadius: "10px" }}
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
              <Input.Password
                style={{ fontFamily: "Noto Sans JP", borderRadius: "10px" }}
              />
            </Form.Item>
            <Form.Item
              label="Phone"
              name="userPhone"
              rules={[
                {
                  required: true,
                  message: "Please input your phone number!",
                },
              ]}
              style={{ fontFamily: "Noto Sans JP" }}
            >
              <Input
                type="number"
                placeholder="Input Your Phone Number"
                style={{ fontFamily: "Noto Sans JP", borderRadius: "10px" }}
              />
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
              Register
            </Button>
          </Form>
        </Card>
      </Container>
    </>
  );
};
export default Register;
