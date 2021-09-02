import { Card } from "antd";
import { Container, Col, Row } from "react-bootstrap";

import NavBar from "../../components/NavBar/index";

const Home = () => {
  return (
    <>
      <NavBar />
      <Container>
        <Row>
          <Col>
            <Card>Movie</Card>
          </Col>
          <Col>
            <Card>Movie</Card>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default Home;
