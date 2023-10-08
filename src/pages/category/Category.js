import React, { useEffect, useState } from "react";
import Header from "../../components/layout/Header";
import { Col, Container, Row } from "react-bootstrap";
import { Link, useParams } from "react-router-dom";
import ItemBox from "../../components/categories/Item-box";
import { getCatBySlugAction } from "../../components/categories/categoryAction";

const Category = () => {
  const { slug, _id } = useParams();
  const [items, setItems] = useState([]);

  const fetchItems = async () => {
    const result = await getCatBySlugAction({ slug, _id });
    if (result) setItems(result);
    console.log(result);
  };
  useEffect(() => {
    fetchItems();
  }, [slug, _id]);
  return (
    <div className="items-box-container">
      <Header />
      <Container>
        <div className="d-flex gap-2 mt-3 catNavLink">
          <Link className="nav-link" to="/">
            Home
          </Link>
          <span>/</span>
          <Link className="nav-link">Category</Link>
          <span>/</span>
          <span>{slug}</span>
        </div>
        <div className="w-100 h-100 item-cat-container">
          <Row className="w-100">
            {items?.map((item, index) => (
              <Col lg="3">
                <ItemBox key={index} {...item} catSlug={slug} catId={_id} />
              </Col>
            ))}
          </Row>
        </div>
      </Container>
    </div>
  );
};

export default Category;
