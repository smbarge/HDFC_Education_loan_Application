import { create, test, enforce, only, include } from "vest";

const suite = create((data = {}, fieldName) => {
  only(fieldName);

  console.log("test is now fired for personalDetailsData", data);
  // Include fields when submitting
  include("literate").when("submit");
  include("mobile").when("submit");
  include("rationcard").when("submit");
  include("current_address").when("submit");
  include("current_district").when("submit");
  include("current_taluka").when("submit");
  include("current_place").when("submit");
  include("current_area").when("submit");
  include("current_pincode").when("submit");
  include("permanent_address").when("submit");
  include("permanent_district").when("submit");
  include("permanent_taluka").when("submit");
  include("permanent_place").when("submit");
  include("permanent_area").when("submit");
  include("permanent_pincode").when("submit");
  include("marital_status").when("submit");
  include("education_qualification").when("submit");
  include("detail").when("education_qualification");
  include("detail").when("submit");
  include("guardian").when("submit");
  include("occupation").when("submit");
  include("occupationtype").when("submit");
  include("past_surety_commitment").when("submit");
  include("riot_victim").when("submit");
  include("natural_calamity_victim").when("submit");
  include("disabled_person").when("submit");
  include("income").when("submit");
  include("guarantor").when("submit");
  include("ration_card_number").when("submit");
  include("past_surety_commitment_detail").when("submit");

  // Mobile validation
  test("mobile", "Mobile Number is mandatory.", () => {
    enforce(data.mobile).isNotBlank();
  });

  test(
    "mobile",
    "Mobile number must start with 6, 7, 8, or 9 and be 10 digits long",
    () => {
      enforce(data.mobile).matches(/^[6-9][0-9]{9}$/);
    }
  );

  // test("guarantor", "Please select the guarantor status.", () => {
  //   enforce(data.guarantor).isNotEmpty(); // Ensures that one option is selected
  //   enforce(data.guarantor).isIn([1, 2]); // Ensure it's either "Applicant" (1) or "Guarantor" (2)
  // });

  // Literacy validation
  // test("literate", "Please select the literacy status.", () => {
  //   enforce(data.literate).isNotBlank();
  // });

  test("mobile", "Mobile Number is mandatory.", () => {
    enforce(data.mobile).isNotBlank();
  });
if(data.past_surety_commitment==1){
  test("past_surety_commitment_detail", "detail is required .", () => {
    enforce(data.past_surety_commitment_detail).isNotBlank();
  });
}
  // Conditional literacy test based on educational qualification
  if (data.education_qualification == 1) {
    test("literate", "Applicant must be literate.", () => {
      enforce(data.literate).numberEquals(1);
    });
  }

  // Email validation only if provided
  test("email", "Please enter a valid email address", () => {
    if (data.email && data.email.trim() !== "") {
      enforce(data.email).matches(/^[^\s@]+@[^\s@]+\.[^\s@]+$/);
    }
  });

  // PAN validation only if provided
  test("pan", "Invalid PAN number format", () => {
    if (data.pan && data.pan.trim() !== "") {
      enforce(data.pan).matches(/^[A-Z]{5}[0-9]{4}[A-Z]{1}$/);
    }
  });

  // Ration Card Number validation
  test("ration_card_number", "Ration card number is required", () => {
    enforce(data.ration_card_number).isNotBlank();
  });

  test(
    "ration_card_number",
    "Ration Card Number must be a 12-digit number",
    () => {
      enforce(data.ration_card_number).matches(/^[0-9]{12}$/);
    }
  );

  // Address validations
  test("current_address", "Address is required", () => {
    enforce(data.current_address).isNotEmpty();
  });

  test(
    "current_address",
    "Address must be between 5 and 200 characters",
    () => {
      enforce(data.current_address)
        .longerThanOrEquals(5)
        .shorterThanOrEquals(200);
    }
  );

  test("current_address", "Address must start with a letter or number", () => {
    enforce(data.current_address).matches(/^[a-zA-Z0-9]/);
  });

  test("current_district", "Please select a district", () => {
    enforce(data.current_district).notEquals("0").isNotEmpty();
  });

  test("current_taluka", "Please select a taluka", () => {
    enforce(data.current_taluka).notEquals("0").isNotEmpty();
  });

  test("current_pincode", "Please enter a valid 6-digit pincode", () => {
    enforce(data.current_pincode).matches(/^[1-9][0-9]{5}$/);
  });

  test("current_place", "Current place is required", () => {
    enforce(data.current_place).isNotBlank();
  });

  test("current_area", "Current area is required", () => {
    enforce(data.current_area).isNotBlank();
  });

  // Permanent address validations
  test(
    "permanent_address",
    "Permanent address must be at least 3 characters long",
    () => {
      enforce(data.permanent_address).longerThan(3);
    }
  );


  test("permanent_district", "Please select a district", () => {
    enforce(data.permanent_district).notEquals("0").isNotEmpty();
  });

  test("permanent_taluka", "Please select a taluka", () => {
    enforce(data.permanent_taluka).notEquals("0").isNotEmpty();
  });

  test("permanent_place", "Permanent place is required", () => {
    enforce(data.permanent_place).isNotBlank();
  });

  test("permanent_area", "Permanent area is required", () => {
    enforce(data.permanent_area).isNotBlank();
  });

  test("permanent_pincode", "Please enter a valid 6-digit pincode", () => {
    enforce(data.permanent_pincode).matches(/^[1-9][0-9]{5}$/);
  });

  // Marital status validation
  test("marital_status", "Please select your marital status", () => {
    enforce(data.marital_status).notEquals("0").isNotEmpty();
  });

  // Educational qualification validation
  test(
    "education_qualification",
    "Please select an educational qualification",
    () => {
      enforce(data.education_qualification).notEquals("0").isNotEmpty();
    }
  );

  // Guardian validation
  test("guardian", "Please select father/husband", () => {
    enforce(data.guardian).notEquals("0").isNotEmpty();
  });

  // Occupation validation
  test("occupation", "Please select the occupation of father/husband", () => {
    enforce(data.occupation).notEquals("0").isNotEmpty();
  });

  // Conditional occupation type validation based on occupation value
  if (data.occupation == 11) {
    test("occupationtype", "Please enter the type of occupation", () => {
      enforce(data.occupationtype).notEquals("0").isNotEmpty();
    });
  }

  // Past surety commitment validation
  test(
    "past_surety_commitment",
    "Please select past surety commitment (Yes/No)",
    () => {
      enforce(data.past_surety_commitment).notEquals("0").isNotBlank();
    }
  );

  // Income validations
  test("income", "Annual income is required", () => {
    enforce(data.income).isNotBlank();
  });

  test("income", "Annual income must be a numeric value", () => {
    enforce(data.income).isNumeric();
  });

  test("income", "Annual income must be a positive number", () => {
    enforce(data.income).greaterThan(0);
  });

  // Conditional income limit based on area (RURAL/URBAN)
  if (["RURAL", "URBAN"].includes(data.current_area)) {
    test("income", "The annual income must be less than 8,00,000", () => {
      enforce(data.income).lessThanOrEquals(800000);
    });
  }

  // Mobile verification code validations
  test(
    "mobileNoVerificationCode",
    "Mobile verification code is required",
    () => {
      enforce(data.mobileNoVerificationCode).isNotBlank();
    }
  );

  test(
    "mobileNoVerificationCode",
    "Mobile verification code must be a 6-digit number",
    () => {
      enforce(data.mobileNoVerificationCode.trim()).matches(/^[0-9]{6}$/);
    }
  );

  // Religion validation
  test("religion", "Please select a religion", () => {
    enforce(data.religion).isNotEmpty();
  });
});

export default suite;
