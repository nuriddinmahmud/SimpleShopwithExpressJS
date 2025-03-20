const axios = require('axios');
const {totp} = require("otplib")

const api =  axios.create({
    baseURL: "https://notify.eskiz.uz/api/",
    headers: {
        'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE3NDUwNjgxNDgsImlhdCI6MTc0MjQ3NjE0OCwicm9sZSI6InRlc3QiLCJzaWduIjoiMTZmM2Y1OTVlZjAyZjBiOWNjYmQ2ODBjZWRkMmU0MWJjOWUyZjk1MDlkMGNhN2I0NDg0NmMwZmU1NjNiMzY0YiIsInN1YiI6IjEwMTQyIn0.fKStf2VWMqw0fI7wrcCh5bI6X9cYxjP1gQW4BVLfq6I'
    }
})

async function sendSms(tel) {
    try{
        const otp = totp.generate(tel+process.env.ESKIZ_KEY || "eskizSecret")
        api.post("/message/sms/send", {
            mobile_phone: tel,
            message: "Bu eskiz dan test"
        })
        console.log(`SMS sent`);
    }catch(e){
        console.log(e);
        
    }
}

module.exports = sendSms