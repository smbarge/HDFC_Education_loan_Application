import { create, test, enforce, only, include } from "vest";
// import "vest/enforce/email";
// import isMobilePhone from 'validator/es/lib/isMobilePhone';

const suite = create((data = {}, fieldName) => {
  only(fieldName);
  include("mobile").when("submit");
  include("password").when("submit");
  
  // test("name", "name is required", () => {
  //   enforce(data.name).isNotBlank();
  // });
  
  // test("name", "length of name should be atleast 3", () => {
  //   enforce(data.name).longerThan(3);
  // });

  test("mobile", "mobile is required", () => {
    enforce(data.mobile).isNotBlank();
  });
  test("mobile", "First Digit Of mobile no Shoud be one of 9,8,7,6 ", () => {
    enforce(data.mobile).matches(/^[6-9]/);
  });
  test("mobile", "mobile no should be 10 digit", () => {
    enforce(data.mobile).lengthEquals(10);
  });
  test("mobile", "only digits", () => {
    enforce(data.mobile).isNumeric();
  });

  test("password", "Password is required", () => {
    enforce(data.password).isNotBlank();
  });
  test("password", "Password must be at least 6 characters long", () => {
    enforce(data.password).longerThanOrEquals(6);
  });

  // test(
  //   "password",
  //   "need at least one special char [!@#$%^&*()_+{}[]:;<>,.?~\\/-]",
  //   () => {
  //     enforce(data.password).matches(/.*[!@#$%^&*()_+{}\[\]:;<>,.?~\\/-].*/);
  //   }
  // );
  // test("password", "need at least one number", () => {
  //   enforce(data.password).matches(/.*[0-9].*/);
  // });


  

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
