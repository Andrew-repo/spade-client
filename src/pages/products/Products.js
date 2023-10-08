import React from "react";
import { Col, Container, Row } from "react-bootstrap";
import ItemBox from "../../components/categories/Item-box";
import { useSelector } from "react-redux";
import Header from "../../components/layout/Header";

const Products = () => {
  const { products } = useSelector((state) => state.productsInfo);
  return (
    <React.Fragment>
      <Header />
      <Container>
        <div className="w-100 h-100 item-cat-container">
          <Row className="w-100 pt-5 ">
            {products?.map((item, index) => (
              <Col lg="3">
                <ItemBox key={index} {...item} />
              </Col>
            ))}
            <ItemBox {...products[1]} />
            <ItemBox {...products[1]} />
          </Row>
        </div>
      </Container>
    </React.Fragment>
  );
};

export default Products;
