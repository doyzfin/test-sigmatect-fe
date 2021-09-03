import { Col, Row } from "antd";
import { Container } from "react-bootstrap";
import dki from "../../assets/img/Group 15.png";
import styles from "../../pages/Home/Home.module.css";

const Video = () => {
  return (
    <>
      <Container fluid style={{ backgroundColor: "#354e80" }}>
        <center>
          <Row>
            <Col sm={12}>
              <div className={styles.box1}>
                <p className={styles.titleHome}>
                  Nearest Cinema, Newest Movie,
                </p>
                <br />
                <p className={styles.titleHome1}>Checkout out now!</p>{" "}
              </div>
            </Col>
            <Col sm={12}>
              <img alt="" src={dki} className={styles.imgHome} />
            </Col>
          </Row>
        </center>
      </Container>
    </>
  );
};
export default Video;
