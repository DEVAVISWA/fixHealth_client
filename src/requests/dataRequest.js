import axios from "../config/axiosConfig";

export const getAllSlots = async () => {
  return new Promise((resolve) => {
    axios.get("/slots/get_slots").then((res) => {
      if (res.data.error) {
        return resolve({
          status: false,
          message: res.data.message,
          data: null,
        });
      } else {
        return resolve({
          status: true,
          message: res.data.message,
          data: res.data.data,
        });
      }
    });
  });
};
export const getPhysioList = async () => {
  return new Promise((resolve) => {
    axios.get("/user/get_physio_list").then((res) => {
      if (res.data.error) {
        return resolve({
          status: false,
          message: res.data.message,
          data: null,
        });
      } else {
        return resolve({
          status: true,
          message: res.data.message,
          data: res.data.data,
        });
      }
    });
  });
};
export const getBookingByID = async (email) => {
  return new Promise((resolve) => {
    axios.get("/booking/get_booking_details_by_id/" + email).then((res) => {
      if (res.data.error) {
        return resolve({
          status: false,
          message: res.data.message,
          data: null,
        });
      } else {
        return resolve({
          status: true,
          message: res.data.message,
          data: res.data.data,
        });
      }
    });
  });
};
export const getBookingByDetail = async (bookingID) => {
  return new Promise((resolve) => {
    axios.get("/booking/get_booking_detail/" + bookingID).then((res) => {
      if (res.data.error) {
        return resolve({
          status: false,
          message: res.data.message,
          data: null,
        });
      } else {
        return resolve({
          status: true,
          message: res.data.message,
          data: res.data.data,
        });
      }
    });
  });
};
export const createBooking = async ({ email, name, date, slot }) => {
  return new Promise((resolve) => {
    const data = {
      email,
      name,
      date,
      slot: slot.id,
      slotNo: slot.slotNo,
    };
    axios.post("/booking/create_booking", data).then((res) => {
      if (res.data.error) {
        return resolve({
          status: false,
          data: null,
          message: res.data.message,
        });
      } else {
        return resolve({
          status: true,
          message: res.data.message,
          data: null,
        });
      }
    });
  });
};
export const confirmSlot = async ({ bookingID, remarks }) => {
  return new Promise((resolve) => {
    const data = {
      bookingID,
      remarks,
    };
    axios.post("/booking/confirm_slot", data).then((res) => {
      if (res.data.error) {
        return resolve({
          status: false,
          data: null,
          message: res.data.message,
        });
      } else {
        return resolve({
          status: true,
          message: res.data.message,
          data: null,
        });
      }
    });
  });
};
