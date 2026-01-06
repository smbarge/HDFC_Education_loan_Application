import { create, test, enforce, only, include } from "vest";

const suite = create((data = {}, fieldName) => {
  only(fieldName);
  include("policy_name").when("submit");
  include("policy_type").when("submit");
  include("policy_receipt_no").when("submit");
  include("surrender_value").when("submit");
  include("start_date").when("submit");
  include("maturity_date").when("submit");

  test("policy_name", "Please provide policy name.", () => {
    enforce(data.policy_name).isNotBlank();
  });
  test("policy_name", "Policy name must be at least 3 characters long", () => {
    enforce(data.policy_name).longerThanOrEquals(3);
  });

  test("policy_type", "Please provide policy type.", () => {
    enforce(data.policy_type).isNotBlank();
  });
  test("policy_type", "Policy type be at least 3 characters long", () => {
    enforce(data.policy_type).longerThanOrEquals(3);
  });
  test("policy_receipt_no", "Please provide policy receipt no", () => {
    enforce(data.policy_receipt_no).isNotBlank();
  });
  test(
    "policy_receipt_no",
    "Policy receipt no be at least 3 characters long",
    () => {
      enforce(data.policy_receipt_no).longerThanOrEquals(3);
    }
  );

  test("surrender_value", "surrender value should be numaric", () => {
    enforce(data.surrender_value).isNumeric();
  });
  test("surrender_value", "Please provide policy surrender value", () => {
    enforce(data.surrender_value).isNotBlank();
  });
  test(
    "surrender_value",
    "surrender value should be between 10000 and 5000000",
    () => {
      enforce(data.surrender_value).isBetween(10000, 5000000);
    }
  );

  const isValidDate = (dateString) => {
    const date = new Date(dateString);
    return date instanceof Date && !isNaN(date);
  };
  test("start_date", "start date should be earlier than today", () => {
    const startDate = new Date(data.start_date);
    startDate.setHours(0, 0, 0, 0);
    const today = new Date();
    // Ensure only the date part is compared, ignoring time
    today.setHours(0, 0, 0, 0); // Set time to 00:00:00 for accurate comparison
    enforce(startDate <= today).isTruthy();
  });
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
});

export default suite;
