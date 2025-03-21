const axios = require("axios");
const { totp } = require("otplib");

const api = axios.create({
  baseURL: "https://notify.eskiz.uz/api/",
  headers: {
    Authorization:
      "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE3NDUwNzg5NTUsImlhdCI6MTc0MjQ4Njk1NSwicm9sZSI6InRlc3QiLCJzaWduIjoiMTZmM2Y1OTVlZjAyZjBiOWNjYmQ2ODBjZWRkMmU0MWJjOWUyZjk1MDlkMGNhN2I0NDg0NmMwZmU1NjNiMzY0YiIsInN1YiI6IjEwMTQyIn0.8uvxo3b2tIILEwqmWKeoWMpF-QkUEMkdGaZ83vZ0IvQ",
  },
});

async function sendSms(tel) {
  try {
    const otp = totp.generate(tel + process.env.ESKIZ_KEY || "eskizSecret");
    await api.post("/message/sms/send", {
      mobile_phone: tel,
      message: "Bu eskiz dan test",
    });
    console.log(otp);
    return otp;
  } catch (e) {
    console.log(e);
  }
}

module.exports = sendSms;
