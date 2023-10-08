import React, { useEffect, useState } from "react";

import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { Button, CardActionArea, CardActions, Stack } from "@mui/material";
import { AiOutlineShoppingCart } from "react-icons/ai";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setCart } from "../cartComponent/cartSlice";
import Alert from "@mui/material/Alert";

const ItemBox = ({ thumbnail, name, price, qty, _id, slug }) => {
  const { cart } = useSelector((state) => state.cartStore);
  const [error, setError] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const addCart = async () => {
    const findExist = cart?.find((item) => item._id === _id);
    setError(false);

    if (findExist?._id) {
      return setError(true);
    }

    dispatch(
      setCart({
        name,
        price,
        thumbnail,
        _id,
        totalPrice: price,
        qty: 1,
        numAvailable: qty,
      })
    );

    return navigate("/cart");
  };
  useEffect(() => {
    console.log(thumbnail.slice(10));
    console.log(qty);
  }, [thumbnail, qty]);
  return (
    <>
      <Card sx={{ maxWidth: 345, height: 600, marginTop: 10 }}>
        <Link to={`/landingPage/${slug}/${_id}`} className="nav-link">
          <CardActionArea>
            <CardMedia
              component="img"
              height={250}
              image={`${process.env.REACT_APP_CMS}/${thumbnail.slice(10)}`}
              alt="green iguana"
            />
            <CardContent>
              <Typography gutterBottom variant="h5" component="div">
                {name}
              </Typography>
              <Typography variant="subtitle1" color="text.secondary">
                $ {price}
              </Typography>
              <Typography variant="subtitle1" color="text.secondary">
                Available: {qty}pcs
              </Typography>
            </CardContent>
          </CardActionArea>
        </Link>
        <CardActions>
          <Button
            size="small"
            color="primary"
            variant="contained"
            onClick={addCart}
          >
            Add to Cart <AiOutlineShoppingCart />
          </Button>
        </CardActions>
      </Card>
      {error && (
        <Stack sx={{ width: "100%" }}>
          <Alert severity="error">Item has been on the cart</Alert>
        </Stack>
      )}
    </>
  );
};

export default ItemBox;
