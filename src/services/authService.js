import axios from "axios";

const registerService = async (
  userName,
  userEmail,
  userPassword,
  userConfirmPassword
) => {
  try {
    const { data } = await axios.post(
      `http://localhost:5000/api/auth/register`,
      {
        userName,
        userEmail,
        userPassword,
        userConfirmPassword,
      }
    );
    console.log(data.data, "This is registered user data");
    return data;
  } catch (error) {
    return error;
  }
};

export { registerService };
