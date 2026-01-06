import { create, test, enforce, only, include } from "vest";

const suite = create((data = {}, fieldName) => {
  only(fieldName);
  include("bank_name").when("submit");
  include("branch_name").when("submit");
  include("street_address").when("submit");
  include("place").when("submit");
  include("pincode").when("submit");

  include("fd_acc_no").when("submit");
  include("interest_rate").when("submit");
  include("amount").when("submit");

  test("bank_name", "Please provide bank name.", () => {
    enforce(data.bank_name).isNotBlank();
  });
  test("bank_name", "Bank name must be at least 3 characters long", () => {
    enforce(data.bank_name).longerThanOrEquals(3);
  });

  test("branch_name", "Please provide branch name.", () => {
    enforce(data.branch_name).isNotBlank();
  });
  test("branch_name", "Branch name must be at least 3 characters long", () => {
    enforce(data.branch_name).longerThanOrEquals(3);
  });

  test("street_address", "Please provide street address", () => {
    enforce(data.street_address).isNotBlank();
  });
  test("street_address", "street address must be more than 5 chars", () => {
    enforce(data.street_address).longerThanOrEquals(5);
  });

  test("place", "Please provide place.", () => {
    enforce(data.place).isNotBlank();
  });
  test("place", "Place must be at least 3 chars long", () => {
    enforce(data.place).longerThanOrEquals(3);
  });

  test("pincode", "Please provide PIN code.", () => {
    enforce(data.pincode).isNotBlank();
  });
  test("pincode", "PIN code must be exactly 6 digits", () => {
    enforce(data.pincode).matches(/^\d{6}$/); // Must contain only digits
  });

  test("fd_acc_no", "Please provide fd account no.", () => {
    enforce(data.fd_acc_no).isNotBlank();
  });
  test("fd_acc_no", "FD account number must be 6-14 digits", () => {
    enforce(data.fd_acc_no).matches(/^\d{6,14}$/); // Must contain only digits
  });

  test("start_date", "start date should be earlier than today", () => {
    const startDate = new Date(data.start_date);
    startDate.setHours(0, 0, 0, 0);
    const today = new Date();
    // Ensure only the date part is compared, ignoring time
    today.setHours(0, 0, 0, 0); // Set time to 00:00:00 for accurate comparison
    enforce(startDate <= today).isTruthy();
  });
  const isValidDate = (dateString) => {
    const date = new Date(dateString);
    return date instanceof Date && !isNaN(date);
  };
  test("maturity_date", "maturity date should be later than start date", () => {
    if (isValidDate(data.start_date)) {
      const startDate = new Date(data.start_date);
      startDate.setHours(0, 0, 0, 0);
      const maturityDate = new Date(data.maturity_date);
      // Ensure only the date part is compared, ignoring time
      maturityDate.setHours(0, 0, 0, 0); // Set time to 00:00:00 for accurate comparison
      enforce(maturityDate > startDate).isTruthy();
    }
  });

  test("interest_rate", "Please provide interest rate", () => {
    enforce(data.interest_rate).isNotBlank();
  });
  test("interest_rate", "interest rate must be between 4% - 15%", () => {
    enforce(data.interest_rate).isBetween(4, 15);
  });

  test("amount", "Please provided FD amount", () => {
    enforce(data.amount).isNotBlank();
  });
  test("amount", "FD amount should be between 10,000 and 5,00,00,000", () => {
    enforce(data.amount).isBetween(10000, 50000000);
  });
});

export default suite;
