import { create, test, enforce, only, include } from "vest";
// import "vest/enforce/email";
// import isMobilePhone from 'validator/es/lib/isMobilePhone';

const suite = create((data = {}, fieldName) => {
  console.log("field is: ", fieldName);
  // console.log("length is", data.otp.length)
  only(fieldName);
  include("otp").when("submit");
  test("otp", "mobile verification code is required", () => {
    enforce(data.otp).isNotBlank();
  });

  test("otp", "mobile verification code should be 6 digit code", () => {
    enforce(data.otp).lengthEquals(6);
    // enforce(data.otp.trim()).matches(/^[0-9]$/);
  });
});

export default suite;
