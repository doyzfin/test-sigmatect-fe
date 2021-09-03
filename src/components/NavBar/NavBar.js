import React, { useState, useEffect } from "react";
import {
  Space,
  Layout,
  Menu,
  Card,
  Row,
  Col,
  Dropdown,
  message,
  Badge,
} from "antd";

import Modal from "antd/lib/modal/Modal";
import axiosApiIntances from "../../utils/axios";
import Swal from "sweetalert2";

const NavBar = (props) => {
  const { Header } = Layout;
  const [background, setBackground] = useState("transparent");
  const [linkColor, setLinkColor] = useState("black");
  const [isModal, setIsModal] = useState(false);
  const [isModal2, setIsModal2] = useState(false);
  const [data, setData] = useState([]);
  const [userMovie, setUserMovie] = useState([]);

  useEffect(() => {
    const handleScroll = () => {
      const show = window.scrollY > 90;
      if (show) {
        setBackground("#354e80");
        setLinkColor("white");
      } else {
        setBackground("transparent");
        setLinkColor("white");
      }
    };

    document.addEventListener("scroll", handleScroll);
    // return () => {
    //   document.removeEventListener("scroll", handleScroll);
    // };

    axiosApiIntances
      .get(`transaction/${parseInt(localStorage.getItem("userId"))}`)
      .then((res) => {
        // setData2(res.data.data[0]);
      });
  }, []);

  const styles = {
    p: {
      color: `${linkColor}`,
      fontFamily: "Noto Sans JP",
    },
    p1: {
      cursor: "pointer",
      color: `${linkColor}`,
      fontFamily: "Noto Sans JP",
      backgroundColor: `${background}`,
    },
  };

  const handleLogout = () => {
    Swal.fire({
      title: `Are You Sure To Logout ?`,
      icon: "warning",
      showCancelButton: true,

      cancelButtonText: "Cancel",
      confirmButtonText: "Yes",
      confirmButtonColor: "green",
    }).then((result) => {
      if (result.isConfirmed) {
        localStorage.clear();
        window.location.reload();
      }
      message.success("Succcess Logout");
    });
  };

  const handleModal = () => {
    parseInt(localStorage.getItem("membership")) <= 0
      ? axiosApiIntances.get("membership").then((res) => {
          setData(res.data.data);
        })
      : axiosApiIntances
          .get(`membership/${parseInt(localStorage.getItem("membership"))}`)
          .then((res) => {
            setData(res.data.data);
          });
    setIsModal(true);
  };

  const Cancel = () => {
    setIsModal(false);
  };

  const handleModal2 = () => {
    axiosApiIntances
      .get(`users/movie/${parseInt(localStorage.getItem("userId"))}`)
      .then((res) => {
        setUserMovie(res.data.data);
      });
    setIsModal2(true);
  };

  const Cancel2 = () => {
    setIsModal2(false);
  };

  const formatRupiah = (money) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0,
    }).format(money);
  };

  const handleBuy = (values) => {
    Swal.fire({
      title: `Are You Sure To Buy this Membership ?`,
      icon: "warning",
      showCancelButton: true,

      cancelButtonText: "Cancel",
      confirmButtonText: "Yes",
      confirmButtonColor: "green",
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire({
          icon: "success",
          title: `Success To Buy Membership, Please Login Again`,
          showConfirmButton: false,
          timer: 1500,
        });
        const setData = {
          userId: parseInt(localStorage.getItem("userId")),
          membershipId: values.membership_id,
          transactionAmount: values.membership_price,
          isMembership: true,
        };
        axiosApiIntances
          .post("membership", setData)
          .then((res) => {
            localStorage.clear();
            window.location.reload();
          })
          .catch((err) => {
            console.log(err);
          });
        setIsModal(false);
      }
    });
  };

  const menu = (
    <Menu>
      <Menu.Item>
        <p
          style={{
            textAlign: "center",

            fontWeight: "bold",
            fontFamily: "Noto Sans JP",
          }}
          onClick={handleModal2}
        >
          My Film
        </p>
      </Menu.Item>
      <Menu.Item>
        <p
          style={{
            textAlign: "center",

            fontWeight: "bold",
            fontFamily: "Noto Sans JP",
          }}
          onClick={handleModal}
        >
          {parseInt(localStorage.getItem("membership")) <= 0
            ? "Membership"
            : "My Membership"}
        </p>
      </Menu.Item>
      <Menu.Item>
        <p
          style={{
            textAlign: "center",

            fontWeight: "bold",
            fontFamily: "Noto Sans JP",
          }}
          onClick={handleLogout}
        >
          Log out
        </p>
      </Menu.Item>
    </Menu>
  );

  return (
    <>
      <Header
        style={{
          backgroundColor: `${background}`,
          position: "fixed",
          zIndex: 1,
          width: "100%",
        }}
      >
        <Space size={1140}>
          <p style={styles.p}>BMov</p>
          <Dropdown overlay={menu}>
            <p style={styles.p1}>Profile</p>
          </Dropdown>
        </Space>
        <Modal visible={isModal} onCancel={Cancel} onOk={Cancel} footer={false}>
          <Row style={{ padding: "20px" }}>
            {parseInt(localStorage.getItem("membership")) > 0 && (
              <p
                style={{
                  textAlign: "center",

                  fontWeight: "bold",
                  fontFamily: "Noto Sans JP",
                }}
              >
                Membership Active :
              </p>
            )}
            {data.map((item, index) => {
              return (
                <>
                  <Col sm={24} key={index}>
                    {parseInt(localStorage.getItem("membership")) > 0 ? (
                      <Badge.Ribbon text="Active Now">
                        <Card
                          style={{
                            marginBottom: "15px",
                            width: "100%",
                            borderRadius: "10px",
                            boxShadow: "3px 3px 3px #000",
                          }}
                        >
                          <Row>
                            <Col sm={12}>
                              <h1>{item.membership_name}</h1>
                              <p>{item.membership_description}</p>
                            </Col>
                            <Col sm={12}></Col>
                          </Row>
                        </Card>
                      </Badge.Ribbon>
                    ) : (
                      <Card
                        style={{
                          marginBottom: "15px",
                          width: "100%",
                          borderRadius: "10px",
                          boxShadow: "3px 3px 3px #000",
                          cursor: "pointer",
                        }}
                        onClick={() => handleBuy(item)}
                      >
                        <Row>
                          <Col sm={12}>
                            <h1>{item.membership_name}</h1>
                            <p>{item.membership_description}</p>
                          </Col>
                          <Col sm={12}>
                            <p
                              style={{
                                textAlign: "center",
                                fontSize: "20px",
                                fontWeight: "bold",
                                fontFamily: "Noto Sans JP",
                                marginTop: "40px",
                              }}
                            >
                              {formatRupiah(item.membership_price)}
                            </p>
                          </Col>
                        </Row>
                      </Card>
                    )}
                  </Col>
                </>
              );
            })}
          </Row>
        </Modal>

        <Modal
          visible={isModal2}
          onCancel={Cancel2}
          onOk={Cancel2}
          title="My Film"
          footer={false}
          width={1000}
        >
          <Row>
            {userMovie.map((item, index) => {
              return (
                <>
                  <Col key={index} sm={6}>
                    <Card style={{ margin: "5px", borderRadius: "10px" }}>
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
        </Modal>
      </Header>
    </>
  );
};

export default NavBar;
