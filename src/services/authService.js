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
    localStorage.setItem("userId", data?.data?._id);
    return data;
  } catch (error) {
    return error;
  }
};

const loginService = async (userEmail, userPassword) => {
  try {
    const { data } = await axios.post(`http://localhost:5000/api/auth/login`, {
      userEmail,
      userPassword,
    });
    console.log(data, "This is login data");
    localStorage.setItem("loggedInId", data?.data?._id);
    localStorage.setItem("loggedUserData", JSON.stringify(data?.data));
    return data;
  } catch (error) {
    return error;
  }
};

export { registerService, loginService };
