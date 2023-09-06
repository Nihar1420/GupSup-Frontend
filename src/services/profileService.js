import axios from "axios";

const setAvatarService = async (avatarImage, userId) => {
  try {
    const { data } = await axios.post(
      `http://localhost:5000/api/profile/set-avatar`,
      {
        avatarImage,
        userId,
      }
    );
    console.log(data,'Image upload data');
    return data;
  } catch (error) {
    return error;
  }
};

export {
    setAvatarService
}
