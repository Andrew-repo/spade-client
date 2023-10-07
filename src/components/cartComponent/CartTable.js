import react, { useEffect, useState } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { Container, Form } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { RiDeleteBin5Line } from "react-icons/ri";
import { deleteCartItem, setCart, updateCartItem } from "./cartSlice";
import { FormControl, TextField } from "@mui/material";

const CartTable = () => {
  const { cart } = useSelector((state) => state.cartStore);
  const [carts, setCarts] = useState([]);
  const dispatch = useDispatch();

  const qtyHandle = (e, id) => {
    const { name, value } = e;
    console.log(e);
    let item = carts.find((item) => item?._id === id) || {};
    if (item) {
      item = {
        ...item,
        [name]: value,
        totalPrice: value * item?.price,
      };

      dispatch(updateCartItem(item));
    }
  };

  useEffect(() => {
    setCarts(cart);
    console.log(cart);
  }, [cart]);

  return (
    <Container>
      <TableContainer component={Paper} className="border">
        <Table sx={{ minWidth: 700 }} aria-label="customized table">
          <TableHead>
            <TableRow>
              <TableCell>Num</TableCell>
              <TableCell></TableCell>
              <TableCell>Item Name</TableCell>
              <TableCell>Price</TableCell>
              <TableCell>Subtotal</TableCell>
              <TableCell>QTY</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {carts?.length > 0 &&
              carts.map((item, index) => (
                <TableRow>
                  <TableCell>{index + 1}</TableCell>
                  <TableCell>
                    <img
                      src={
                        process.env.REACT_APP_CMS + item?.thumbnail.slice(10)
                      }
                      className="w-50"
                    />
                  </TableCell>
                  <TableCell>{item?.name}</TableCell>
                  <TableCell>${item?.price}</TableCell>

                  <TableCell>${item?.totalPrice}</TableCell>
                  <TableCell>
                    <FormControl size="medium">
                      <TextField
                        label="Qty"
                        type="number"
                        variant="outlined"
                        value={item?.qty}
                        name="qty"
                        sx={{ minWidth: "25px" }}
                        onChange={(e) => {
                          qtyHandle(e.target, item._id);
                        }}
                        InputProps={{
                          inputProps: {
                            min: 1, // Minimum value allowed
                            // max: 100, // Maximum value allowed
                            max: item.numAvailable,
                          },
                        }}
                      />
                    </FormControl>
                  </TableCell>
                  <TableCell>
                    <div
                      onClick={() => dispatch(deleteCartItem(item._id))}
                      className="cursor-style"
                    >
                      remove
                      <RiDeleteBin5Line />
                    </div>
                  </TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Container>
  );
};

export default CartTable;
