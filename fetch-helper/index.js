const { default: axios } = require("axios");

const baseUrl = "http://localhost:3000";

const user = {
  email: "mike12@gmail.com",
  password: "mike123",
};

const access_tokenMike =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI3NmEyM2EwMi05OWJlLTRmYzEtYTRkZC1kOTczYzZlNzNiMDAiLCJlbWFpbCI6Im1pa2UxMkBnbWFpbC5jb20iLCJyb2xlIjoiQURNSU4iLCJpYXQiOjE3NzMyNzk2MjUsImV4cCI6MTc3Mzg4NDQyNX0.HXRJyz_0YrEPZIMKCTjJpbIyZj0CxnhpSIMSjPS5WEE";

async function main() {
  const response = await axios.get(`${baseUrl}/categories`, {
    headers: {
      Authorization: `Bearer ${access_tokenMike}`,
    },
  });

  console.log(response.data);
}

main()
  .then()
  .catch((error) => {
    console.error(error);
  });
