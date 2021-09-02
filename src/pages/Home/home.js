import { Card } from "antd";
import { Container, Col, Row } from "react-bootstrap";

import NavBar from "../../components/NavBar/NavBar";
import Hero from "../../components/Hero/index";
import { useEffect, useState } from "react";
import axiosApiIntances from "../../utils/axios";

const Home = (props) => {
  const [data, setData] = useState([]);
  const [data2, setData2] = useState([]);

  useEffect(() => {
    axiosApiIntances.get("movie").then((res) => {
      setData(res.data.data);
    });

    axiosApiIntances
      .get(`users/movie/${parseInt(localStorage.getItem("userId"))}`)
      .then((res) => {
        setData2(res.data.data);
      });
  }, []);

  const handleDetail = (event, values) => {
    event.preventDefault();
    props.history.push(`movie/${values}`);
  };

  return (
    <>
      <NavBar />
      <Hero />
      <Container
        fluid
        style={{
          backgroundImage: `linear-gradient(to top, rgba(255,0,0,0), #354e80)`,
          paddingTop: "30px",
          position: "absolute",
        }}
      >
        <Container
          style={{
            backgroundColor: "#fff",
            padding: "40px",

            borderRadius: "15px 15px 0px 0px",
            boxShadow: "5px 5px #000",
          }}
        >
          <h4 style={{ fontFamily: "Noto Sans JP", marginBottom: "20px" }}>
            Recommended For You
          </h4>
          <Row
            style={{
              display: "flex",
              flexWrap: "nowrap",
              overflowX: "auto",
              padding: "20px",
            }}
          >
            {data.map((item, index) => {
              return (
                <>
                  <Col key={index} sm={2}>
                    <Card
                      title={item.movies_name}
                      style={{
                        borderRadius: "10px",
                        height: "100%",
                        marginBottom: "15px",
                        cursor: "pointer",
                        boxShadow: "2px 2px #9e9e9e",
                      }}
                      onClick={(event) => handleDetail(event, item.movies_id)}
                    >
                      <img
                        src={item.movie_image}
                        alt=""
                        width="100%"
                        height="100%"
                      />
                    </Card>
                  </Col>
                </>
              );
            })}
          </Row>
          <h4
            style={{
              fontFamily: "Noto Sans JP",
              marginBottom: "20px",
              marginTop: "50px",
            }}
          >
            My Movies
          </h4>
          <Row
            style={{
              display: "flex",
              flexWrap: "nowrap",
              overflowX: "scroll",
              padding: "20px",
            }}
          >
            {data2.map((item, index) => {
              return (
                <>
                  <Col key={index} sm={2}>
                    <Card
                      title={item.movies_name}
                      style={{
                        borderRadius: "10px",
                        height: "100%",
                        marginBottom: "15px",
                        cursor: "pointer",
                        boxShadow: "2px 2px #9e9e9e",
                      }}
                      onClick={(event) => handleDetail(event, item.movies_id)}
                    >
                      <img
                        src={item.movie_image}
                        alt=""
                        width="100%"
                        height="100%"
                      />
                    </Card>
                  </Col>
                </>
              );
            })}
          </Row>
        </Container>
      </Container>
    </>
  );
};

export default Home;
