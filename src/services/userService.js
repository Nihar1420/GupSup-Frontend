import axios from "axios";

const getAllContactsService = async (userId) => {
  try {
    const { data } = await axios.post(
      `http://localhost:5000/api/users/getAllContacts`,
      {
        userId,
      }
    );
    return data.data;
  } catch (err) {
    return err;
  }
};

export const userService = {
  getAllContactsService,
};
