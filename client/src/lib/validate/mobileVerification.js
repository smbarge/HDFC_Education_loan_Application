import { create, test, enforce, only, include } from "vest";
// import "vest/enforce/email";
// import isMobilePhone from 'validator/es/lib/isMobilePhone';

const suite = create((data = {}, fieldName) => {
  only(fieldName);
  include("mobileNumber").when("submit");
  include("name").when("submit");

  test("mobileNumber", "mobile is required", () => {
    enforce(data.mobile).isNotBlank();
  });
  test(
    "mobileNumber",
    "First Digit Of mobile no Shoud be one of 9,8,7,6 ",
    () => {
      enforce(data.mobile).matches(/^[6-9]/);
    }
  );
  test("mobileNumber", "mobile no should be 10 digit", () => {
    enforce(data.mobile).lengthEquals(10);
  });
  test("mobileNumber", "only digits", () => {
    enforce(data.mobile).isNumeric();
  });

  // test("mobileNoVerificationCode", "mobile verification code is required", () => {
  //   enforce(data.mobileNoVerificationCode).isNotBlank();
  // });

  // test(
  //   "mobileNoVerificationCode",
  //   "mobile verification code should be 6 digit code",
  //   () => {
  //     enforce(data.mobileNoVerificationCode).lengthEquals(6);
  //     enforce(data.mobileNoVerificationCode.trim()).matches(/^[0-9]*$/);
  //   }
  // );
});

export default suite;
