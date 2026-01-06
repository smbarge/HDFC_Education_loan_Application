import { create, test, enforce, only, include } from "vest";

const suite = create((data = {}, fieldName) => {
  only(fieldName);

  include("password").when("submit");
  include("confirmPassword").when("submit");

  test("password", "Password is required", () => {
    enforce(data.password).isNotBlank();
  });

  test("confirmPassword", "Confirm Password is required", () => {
    enforce(data.confirmPassword).isNotBlank();
  });

  test("password", "Password must be at least 6 characters long", () => {
    enforce(data.password).longerThanOrEquals(6);
  });

  test(
    "password",
    "Password must contain at least one special character [!@#$%^&*()_+{}[]:;<>,.?~\\/-]",
    () => {
      enforce(data.password).matches(/.*[!@#$%^&*()_+{}\[\]:;<>,.?~\\/-].*/);
    }
  );

  test("password", "Password must contain at least one number", () => {
    enforce(data.password).matches(/.*[0-9].*/);
  });

  test(
    "confirmPassword",
    "Confirm Password must be at least 6 characters long",
    () => {
      enforce(data.confirmPassword).longerThanOrEquals(6);
    }
  );
  if (data.confirmPassword) {
    test("password", "Password and Confirm Password must match", () => {
      enforce(data.confirmPassword).equals(data.password);
    });
  }

  test("confirmPassword", "Confirm Password does not match Password", () => {
    enforce(data.confirmPassword).equals(data.password);
  });
});

export default suite;
