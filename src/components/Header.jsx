// src/components/Header.js
import React, { useState } from "react";
import {
  Col,
  Container,
  FormControl,
  InputGroup,
  ListGroup,
  Nav,
  Navbar,
  Row,
} from "react-bootstrap";
import { Link } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { Button, Drawer, Space } from "antd";

function Header() {
  const [open, setOpen] = useState(false);
  const showDrawer = () => {
    setOpen(true);
  };

  const onClose = () => {
    setOpen(false);
  };
  const { setCart, cart, cartQuantity, totalPrice } = useCart();
  const updateCart = (newCart) => {
    setCart(newCart);
  };

  const removeFromCart = (product) => {
    const newCart = cart.filter((item) => item.id !== product.id);
    updateCart(newCart);
  };

  const increaseQuantity = (product) => {
    const newCart = cart.map((item) => {
      if (item.id === product.id) {
        return { ...item, quantity: item.quantity + 1 };
      }
      return item;
    });
    updateCart(newCart);
  };

  const decreaseQuantity = (product) => {
    setCart(
      cart
        .map((item) => {
          if (item.id === product.id) {
            const newQty = item.quantity - 1;
            // Kiểm tra nếu số lượng mới vẫn lớn hơn 0, thì trừ đi 1, ngược lại, loại bỏ sản phẩm khỏi giỏ hàng.
            return { ...item, quantity: newQty };
          }
          return item;
        })
        .filter((e) => e.quantity > 0) // Loại bỏ các sản phẩm có số lượng là 0.
    );
  };

  return (
    <>
      <Navbar
        expand="lg"
        className="bg-body-tertiary"
        style={{ height: "120px", fontSize: 40 }}
      >
        <Container fluid>
          <Navbar.Brand as={Link} to="/">
            MyShop
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="navbarScroll" />
          <Navbar.Collapse id="navbarScroll">
            <Nav
              className="me-auto my-2 my-lg-0"
              style={{ maxHeight: "100px" }}
              navbarScroll
            >
              <Nav.Link as={Link} to="/home">
                Home
              </Nav.Link>
              <Nav.Link as={Link} to="/products">
                Products
              </Nav.Link>
              <Nav.Link as={Link} to="/about">
                About
              </Nav.Link>
            </Nav>
            <Navbar.Brand onClick={showDrawer}>
              <i className="text-2xl fa-solid fa-cart-shopping relative">
                <span className="text-sm absolute bg-red-600 px-2 rounded-xl">
                  {cartQuantity}
                </span>
              </i>
            </Navbar.Brand>
          </Navbar.Collapse>
        </Container>
      </Navbar>

      <Drawer
        fontSize="300"
        title="Cart"
        width={1000}
        onClose={onClose}
        open={open}
        extra={
          <Space>
            <Button type="primary" onClick={onClose} danger>
              Đóng
            </Button>
          </Space>
        }
      >
        {" "}
        <ListGroup.Item as="ol" numbered>
          {cart.map((cartItem, index) => {
            return (
              <Row key={cartItem.id} style={{ minHeight: "100px" }}>
                <Col>{index + 1}</Col>
                <Col>
                  <img width={80} height={80} src={cartItem.image} alt="" />
                </Col>
                <Col>{cartItem.name}</Col>
                <Col>{cartItem.price.toLocaleString()}$</Col>
                <Col>
                  <InputGroup className="d-flex align-items-center">
                    <Button onClick={() => increaseQuantity(cartItem)}>
                      +
                    </Button>
                    <FormControl value={cartItem.quantity} />
                    <Button onClick={() => decreaseQuantity(cartItem)}>
                      -
                    </Button>
                  </InputGroup>
                </Col>
                <Col onClick={() => removeFromCart(cartItem)}>
                  <i className="fa-solid fa-trash-can"></i>
                </Col>
              </Row>
            );
          })}
        </ListGroup.Item>{" "}
        <h5>Tông tiền :{totalPrice.toLocaleString()}$</h5>
      </Drawer>
    </>
  );
}

export default Header;
