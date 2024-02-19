import React, { useEffect, useState } from "react";
import { confirmSlot, getBookingByDetail } from "../requests/dataRequest";
import { Box, Button, TextField, Typography } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { resetBackDrop, showBackDrop } from "../store/models/backDrop";
import { showMessage } from "../store/models/messageBar";
import ROUTES from "../config/routes";

const Confirmation = () => {
  const { bookingID } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [bookingDetail, setBookingDetail] = useState(null);
  const [remarks, setRemarks] = useState("");

  useEffect(() => {
    dispatch(showBackDrop());
    const getBookingDetails = async () => {
      const { data, status } = await getBookingByDetail(bookingID);
      if (status) {
        console.log(data);
        setBookingDetail(data);
      }
      dispatch(resetBackDrop());
    };
    getBookingDetails();
  }, []);

  const handleSubmit = async () => {
    dispatch(showBackDrop());
    const { message, status } = await confirmSlot({ bookingID, remarks });
    if (status) {
      dispatch(
        showMessage({
          message: message ?? "Successfully Created",
          type: "success",
          duration: 3000,
          active: true,
        })
      );
      navigate(ROUTES.sales);
    } else {
      dispatch(
        showMessage({
          message: message ?? "Something went wrong, please try again!",
          type: "error",
          duration: 3000,
          active: true,
        })
      );
    }
    dispatch(resetBackDrop());
  };

  return (
    <Box m={"20px"}>
      <Box
        display={"flex"}
        flexDirection={"column"}
        justifyContent={"center"}
        alignItems={"center"}
        width={"100%"}
        // height={"80vh"}
        gap={3}
      >
        <Typography variant="h6">Slot Confirmation</Typography>
        <TextField
          value={remarks}
          rows={4}
          multiline
          sx={{
            width: {
              sx: "100%",
              xs: "60%",
            },
          }}
          label={"Add Remarks"}
          onChange={(e) => setRemarks(e.target.value)}
        />
        <Button
          variant="contained"
          color="success"
          onClick={() => handleSubmit()}
        >
          Confirm Slot
        </Button>
      </Box>
    </Box>
  );
};

export default Confirmation;
