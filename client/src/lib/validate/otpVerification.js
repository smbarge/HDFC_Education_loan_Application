import { create, test, enforce, only, include } from "vest";
// import "vest/enforce/email";
// import isMobilePhone from 'validator/es/lib/isMobilePhone';

const suite = create((data = {}, fieldName) => {
  console.log("field is: ", fieldName);
  console.log("length is", data.otp.length);
  only(fieldName);
  include("otp").when("submit");

  test("otp", "OTP is required for mobile number verification", () => {
    enforce(data.otp).isNotBlank();
  });

  test("otp", "Mobile number verification OTP must be a 6-digit code", () => {
    enforce(data.otp).lengthEquals(6);
  });
});

export default suite;
