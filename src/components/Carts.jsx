import { Container, Row, Col, Card, Button } from "react-bootstrap";
import { DeleteOutlined, PlusOutlined, MinusOutlined } from "@ant-design/icons";
import { useCart } from "../context/CartContext";
function Carts() {
  const { setCart, cart } = useCart();
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
    <Container>
      <h1>Giỏ Hàng</h1>
      <Row>
        {cart.map((product) => (
          <Col key={product.id} className="my-3">
            <Card style={{ width: "18rem" }}>
              <Card.Img variant="top" src={product.image} />
              <Card.Body>
                <Card.Title>{product.name}</Card.Title>
                <Card.Text>Price: ${product.price}</Card.Text>
                <Card.Text>Quantity: {product.quantity}</Card.Text>
                <Button
                  variant="danger"
                  onClick={() => removeFromCart(product)}
                >
                  <DeleteOutlined />
                </Button>
                <Button
                  variant="primary"
                  onClick={() => increaseQuantity(product)}
                >
                  <PlusOutlined />
                </Button>
                <Button
                  variant="secondary"
                  onClick={() => decreaseQuantity(product)}
                >
                  <MinusOutlined />
                </Button>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
  );
}

export default Carts;
