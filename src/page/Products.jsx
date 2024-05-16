import React, { useEffect, useState } from "react";
import { Card, Button, Container, Row, Col } from "react-bootstrap";
import { HeartOutlined } from "@ant-design/icons";
import { useCart } from "../context/CartContext";
import ProductData from "../Data/ProductData.json";

function Products() {
  const { addToCart } = useCart();
  const [products, setProduct] = useState([]);
  useEffect(() => {
    setProduct(ProductData);
  }, []);
  return (
    <Container>
      <Row xs={1} md={2} lg={4}>
        {products.map((product) => (
          <Col key={product.id} className="my-3">
            <Card className="mb-4" style={{ width: "18rem" }}>
              <Card.Img
                variant="top"
                src={product.image}
                style={{ minHeight: "400px" }}
              />
              <Card.Body>
                <Card.Title>{product.name}</Card.Title>
                <Card.Text>Price: ${product.price}</Card.Text>
                <Button variant="primary" onClick={() => addToCart(product)}>
                  Add to Cart
                </Button>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
  );
}

export default Products;
