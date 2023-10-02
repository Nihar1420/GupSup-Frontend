import axios from "axios";

const sendMessageService = async (senderId, getterId, message) => {
  try {
    const { data } = await axios.post(
      `http://localhost:5000/api/message/send-message`,
      {
        senderId,
        getterId,
        message,
      }
    );
    return data;
  } catch (error) {
    return error;
  }
};

const getUserMessageService = async (senderId, getterId) => {
  try {
    const { data } = await axios.post(
      `http://localhost:5000/api/message/get-user-messages`,
      {
        senderId,
        getterId,
      }
    );
    return data.data;
  } catch (error) {
    return error;
  }
};

const messageService = {
  sendMessageService,
  getUserMessageService,
};

export default messageService;
