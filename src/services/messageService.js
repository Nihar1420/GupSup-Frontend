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
    console.log(data, "This is data");
    return data;
  } catch (error) {
    return error;
  }
};

const messageService = {
  sendMessageService,
};

export default messageService;
