import NavBar from "../../components/NavBar/NavBar";

import { Container } from "react-bootstrap";
import { Button, Card, Col, Row } from "antd";
import { useEffect, useState } from "react";
import axiosApiIntances from "../../utils/axios";
import Swal from "sweetalert2";

const Movies = (props) => {
  const [data, setData] = useState({});

  useEffect(() => {
    const { id } = props.match.params;
    getId(id);
    console.log(data);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const getId = (id) => {
    axiosApiIntances.get(`movie/${id}`).then((res) => {
      setData(res.data.data[0]);
      console.log(res);
    });
  };

  const formatRupiah = (money) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0,
    }).format(money);
  };

  const handleBuy = () => {
    Swal.fire({
      title: `Are You Sure To Buy it ?`,
      icon: "warning",
      showCancelButton: true,

      cancelButtonText: "Cancel",
      confirmButtonText: "Yes",
      confirmButtonColor: "green",
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire({
          icon: "success",
          title: `Success To Buy Movie`,
          showConfirmButton: false,
          timer: 1500,
        });
        const setData = {
          userId: parseInt(localStorage.getItem("userId")),
          moviesId: data.movies_id,
          price: data.movies_price,
          isMembership:
            parseInt(localStorage.getItem("membership")) <= 0 ? false : true,
        };
        axiosApiIntances.post("transaction", setData).then((res) => {
          props.history.push("/home");
        });
      }
    });
  };

  return (
    <>
      <NavBar />
      <Container fluid style={{ backgroundColor: "#354e80", height: "100%" }}>
        <Container style={{ paddingTop: "70px" }}>
          <Card
            style={{ borderRadius: "10px", height: "100%" }}
            title="Information Film"
          >
            <Row>
              <Col sm={12}>
                <Card
                  style={{
                    borderRadius: "10px",
                    height: "100%",
                    width: "70%",
                    textAlign: "center",
                    margin: "0 auto",
                  }}
                >
                  <img
                    alt=""
                    src={data.movie_image}
                    style={{
                      borderRadius: "10px",
                      height: "100%",
                      margin: "0 auto",
                    }}
                  />
                  <span>{data.movies_name}</span>
                </Card>
              </Col>
              <Col sm={12} style={{ fontFamily: "Noto Sans JP" }}>
                <h1 style={{ marginBottom: "10px" }}>{data.movies_name}</h1>
                <p>{data.movies_category}</p>
                <p>{data.movies_duration}</p>
                <p>{data.movies_release}</p>
                <p>{formatRupiah(data.movies_price)}</p>
                <p>{data.movies_description}</p>
                <Button
                  style={{
                    padding: " 0px 50px",
                    borderRadius: "10px",
                    backgroundColor: "#354e80",
                    color: "#fff",
                    float: "right",
                    marginTop: "170px",
                  }}
                  onClick={handleBuy}
                >
                  Buy
                </Button>
              </Col>
            </Row>
          </Card>
        </Container>
      </Container>
    </>
  );
};
export default Movies;
