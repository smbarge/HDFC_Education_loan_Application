import { create, test, enforce, only, include } from "vest";

const suite = create((data = {}, fieldName) => {
  only(fieldName);
  include("name").when("submit");
  include("gender").when("submit");
  include("religion").when("submit");
  include("aadhar").when("submit");
  include("dob").when("submit");
  include("district_id").when("submit");
  include("resident").when("submit");
  include("concent_for_aadhar_verification").when("submit");

  test("district_id", "Please select a district.", () => {
    enforce(data.district_id).isNotBlank();
    enforce(data.district_id).notEquals(0);
  });

  
  // test("name", "Please provide your name.", () => {
  //   enforce(data.name).isNotBlank();
  // });
  test("name", "Please provide a valid name", () => {
    enforce(data.name)
      .isNotBlank()
      .matches(/^[A-Za-z\s]+$/); // Only allows letters and spaces
  });
  

  test("resident", "Please indicate if you are a resident.", () => {
    enforce(data.resident).isNotBlank();
  });

  test("resident", "You must be a resident of Maharashtra.", () => {
    enforce(data.resident).numberEquals(1);
  });

  test("name", "Name should be at least 3 characters long.", () => {
    enforce(data.name).longerThan(3);
  });

  test("religion", "Please select your community.", () => {
    enforce(data.religion).isNotBlank();
    enforce(data.religion).numberNotEquals(0);
  });

  test("aadhar", "Please provide your Aadhar number.", () => {
    enforce(data.aadhar).isNotBlank();
  });

  test("aadhar", "Aadhar number must be exactly 12 digits.", () => {
    return data.aadhar.length === 12;
  });

  test("aadhar", "Aadhar number should contain only digits.", () => {
    return /^\d{12}$/.test(data.aadhar);
  });

  test("gender","Please select your gender.", () => {
    enforce(data.gender).isNotEmpty(); // Ensures gender is not blank
    // enforce(data.gender).isIn(["Male", "Female", "Other"]); // Ensure a valid gender is selected
  });

  // test("gender", "Please select your gender.", () => {
  //   enforce(data.gender).isNotBlank();
  // });

  test("dob", "Please provide your date of birth.", () => {
    enforce(data.dob).isNotBlank();
  });

  test("dob", "You must be at least 18 years old.", () => {
    const today = new Date();
    const age = today.getFullYear() - data.dob.getFullYear();
    const monthDiff = today.getMonth() - data.dob.getMonth();

    if (
      monthDiff < 0 ||
      (monthDiff === 0 && today.getDate() < data.dob.getDate())
    ) {
      return age >= 18;
    }

    return age > 18;
  });

  test("dob", "You must be under 60 years old.", () => {
    const today = new Date();
    const age = today.getFullYear() - data.dob.getFullYear();
    const monthDiff = today.getMonth() - data.dob.getMonth();

    if (
      monthDiff < 0 ||
      (monthDiff === 0 && today.getDate() < data.dob.getDate())
    ) {
      return age <= 60;
    }

    return age <= 60;
  });

  test(
    "concent_for_aadhar_verification",
    "Please provide consent for Aadhar verification.",
    () => {
      enforce(data.concent_for_aadhar_verification).equals(1);
    }
  );
});

export default suite;
