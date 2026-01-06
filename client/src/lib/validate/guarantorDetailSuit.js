import { create, test, enforce, only, include } from "vest";
// import "vest/enforce/email";
// import isMobilePhone from 'validator/es/lib/isMobilePhone';

const suite = create((data = {}, fieldName) => {
  only(fieldName);
  include("mobile").when("submit");
  include("pan").when("submit");
  // include("email").when("submit");
  include("name").when("submit");
  include("religion").when("submit");
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
  include("education_qualification").when("submit");
  include("details").when("education_qualification");
  include("details").when("submit");
  include("aadhar").when("submit");

  // include("guardian").when("submit");

  // include("guardian").when("submit");
  include("occupation").when("submit");
  // include("occupationtype").when("occupation");
  // include("occupationtype").when("submit");
  include("income").when("submit");
  include("past_surety_commitment").when("submit");
  include("past_surety_commitment_detail").when("submit");
  include("riot_victim").when("submit");
  include("natural_calamity_victim").when("submit");
  include("disabled_person").when("submit");
  // if(data.guarantor=="guarantor"){
  test("mobile", "mobile is required", () => {
    enforce(data.mobile).isNotBlank();
  });
  test("mobile", "mobile should be 10 digits", () => {
    enforce(data.mobile).lengthEquals(10);
  });
  // test("email", "Please provide a valid email.", () => {
  //   enforce(data.email).matches(/^[^\s@]+@[^\s@]+\.[^\s@]+$/);
  // });
  test("religion", "Please select your community.", () => {
    enforce(data.religion).isNotBlank();
    enforce(data.religion).numberNotEquals(0);
  });
  // test("pan", "pan is required", () => {
  //   enforce(data.pan).isNotBlank();
  // });

  // test("pan", "length of name should be atleast 10 digit", () => {
  //   enforce(data.pan).longerThan(10);
  // });
  if(data.pan){
  test("pan", "Invalid PAN card number", () => {
    enforce(data.pan).matches(/^[A-Z]{5}[0-9]{4}[A-Z]{1}$/);
  });
  }
  test("mobile", "First Digit Of mobile no Should be one of 9,8,7,6 ", () => {
    enforce(data.mobile).matches(/^[6-9]/);
  });

  // test("aadhar", "Please provide your Aadhar number.", () => {
  //   enforce(data.aadhar).isNotBlank();
  // });
if(data.aadhar){
  test("aadhar", "Aadhar number must be exactly 12 digits.", () => {
    return data.aadhar.length === 12;
  });

  test("aadhar", "Aadhar number should contain only digits.", () => {
    return /^\d{12}$/.test(data.aadhar);
  });
}
  test("current_address", "Address is required", () => {
    enforce(data.current_address).isNotEmpty();
  });

  test(
    "current_address",
    "Address must be between 10 and 200 characters",
    () => {
      enforce(data.current_address)
        .longerThanOrEquals(5)
        .shorterThanOrEquals(200);
    }
  );

  test("current_address", "Address must start with a letter or number", () => {
    enforce(data.current_address).matches(/^[a-zA-Z0-9]/);
  });

  test("current_district", "Please select a district.", () => {
    enforce(data.current_district).notEquals(0); // Ensure a district is selected
    enforce(data.current_district).notEquals("0"); // Ensure a district is selected
  });
  test("current_taluka", "Please select a taluka.", () => {
    console.log("data.current_taluka: ", data.current_taluka);
    // enforce(data.current_taluka).isEmpty(); // Ensure a taluka is selected
    enforce(data.current_taluka).notEquals(0); // Ensure a taluka is selected
    enforce(data.current_taluka).notEquals("0"); // Ensure a taluka is selected
  });

  test("current_pincode", "Please enter a valid 6-digit pincode.", () => {
    enforce(data.current_pincode).matches(/^[1-9][0-9]{5}$/);
  });

  test("name", "length of name should be at least 3", () => {
    console.log("name: ", data.name);
    enforce(data.name).longerThan(3);
  });
  test("current_place", "current place  is required", () => {
    enforce(data.current_place).isNotBlank();
  });

  test("current_area", "current area  is required", () => {
    enforce(data.current_area).isNotBlank();
  });

  test("permanent_address", "length of name should be atleast 3", () => {
    enforce(data.permanent_address).longerThan(3);
  });
  test("permanent_district", "Please select a district.", () => {
    enforce(data.permanent_district).notEquals(0); // Ensure a district is selected
    enforce(data.permanent_district).notEquals("0"); // Ensure a district is selected
  });
  test("permanent_taluka", "Please select a taluka.", () => {
    // enforce(data.permanent_taluka).isEmpty(); // Ensure a taluka is selected
    enforce(data.permanent_taluka).notEquals(0); // Ensure a taluka is selected
    enforce(data.permanent_taluka).notEquals("0"); // Ensure a taluka is selected
  });
  test("permanent_place", "permanent place  is required", () => {
    enforce(data.permanent_place).isNotBlank();
  });

  test("permanent_area", "permanent area  is required", () => {
    enforce(data.permanent_area).isNotBlank();
  });
  test("permanent_pincode", "Please enter a valid 6-digit pincode.", () => {
    enforce(data.permanent_pincode).matches(/^[1-9][0-9]{5}$/);
  });

  test("marital_status", "Please select a marital status.", () => {
    enforce(data.marital_status).notEquals(0); // Ensure a taluka is selected
    enforce(data.marital_status).notEquals("0"); // Ensure a taluka is selected
    enforce(data.marital_status).isNotBlank(); // Ensure a taluka is selected
  });
  test(
    "education_qualification",
    "Please select a educational qualifications.",
    () => {
      enforce(data.education_qualification).notEquals(0); // Ensure a taluka is selected
      enforce(data.education_qualification).notEquals("0"); // Ensure a taluka is selected
      enforce(data.education_qualification).isNotBlank(); // Ensure a taluka is selected
    }
  );
  test("guardian", "Please select father/husband", () => {
    enforce(data.guardian).notEquals(0); // Ensure a taluka is selected
    enforce(data.guardian).notEquals("0"); // Ensure a taluka is selected
    enforce(data.guardian).isNotBlank(); // Ensure a taluka is selected
  });
  test("occupation", "Please select occupation of guardian", () => {
    enforce(data.occupation).notEquals(0); // Ensure a taluka is selected
    enforce(data.occupation).notEquals("0"); // Ensure a taluka is selected
    enforce(data.occupation).isNotBlank(); // Ensure a taluka is selected
    if (data.occupation == 11) {
      test("occupationtype", "Please type occupation", () => {
        enforce(data.occupationtype).notEquals(0); // Ensure a taluka is selected
        enforce(data.occupationtype).notEquals("0"); // Ensure a taluka is selected
        enforce(data.occupationtype).isNotBlank(); // Ensure a taluka is selected
      });
    }
  });

  test(
    "past_surety_commitment",
    "Please select past surety commitment yes/no",
    () => {
      enforce(data.past_surety_commitment).notEquals(0); // Ensure a taluka is selected
      enforce(data.past_surety_commitment).notEquals("0"); // Ensure a taluka is selected
      enforce(data.past_surety_commitment).isNotBlank(); // Ensure a taluka is selected
    }
  );
  if (data.past_surety_commitment == 1) {
    test("past_surety_commitment_detail", "Please provide details", () => {
      enforce(data.past_surety_commitment_detail).isNotBlank(); // Ensure a taluka is selected
    });
  }
  test("income", "Income is required", () => {
    enforce(data.income).isNotBlank(); // Ensure a taluka is selected
  });
  test("income", "only digits", () => {
    enforce(data.income).isNumeric(); // Ensure a taluka is selected
  });

  // include("marital_status").when("submit");
  // include("educational_qualification").when("submit");
  // include("educational_qualification").when("submit");
  // include("detail").when("educational_qualification");
  // include("detail").when("submit");

  // include("guardian").when("submit");
  // include("guardian").when("submit");
  // include("occupation").when("submit");
  // include("occupationtype").when("occupation");
  // include("occupationtype").when("submit");
  // include("past_surety_commitment").when("submit");
  // include("riot_victim").when("submit");
  // include("natural_calamity_victim").when("submit");
  // include("disabled_person").when("submit");

  // test(
  //   "mobileNoVerificationCode",
  //   "mobile verification code is required",
  //   () => {
  //     enforce(data.mobileNoVerificationCode).isNotBlank();
  //   }
  // );
  // test("religion", "Please select a religion.", () => {
  //   enforce(data.religion).isNotEmpty(); // Check if a religion is selected
  // });

  // test(
  //   "mobileNoVerificationCode",
  //   "mobile verification code should be 6 digit code",
  //   () => {
  //     enforce(data.mobileNoVerificationCode).lengthEquals(6);
  //     enforce(data.mobileNoVerificationCode.trim()).matches(/^[0-9]*$/);
  //   }
  // );
  if (data.education_qualification > 4) {
    test("details", "details is required", () => {
      enforce(data.details).isNotBlank();
    });
    test("details", "length of details should be atleast 3", () => {
      enforce(data.details).longerThan(3);
    });
  }
  // }
});

export default suite;
