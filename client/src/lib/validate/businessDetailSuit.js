import { create, test, enforce, only, include } from "vest";

const suite = create((data = {}, fieldName) => {
  only(fieldName);

  include("business_name").when("submit");
  include("business_details").when("submit");
  include("business_address").when("submit");
  include("business_district").when("submit");
  include("business_taluka").when("submit");
  include("business_place").when("submit");
  include("business_pincode").when("submit");

  include("quotation_name").when("submit");
  // include("quotation_gst_number").when("submit");
  include("quotation_amount").when("submit");
  include("loan_amount").when("submit");

  include("bank_id").when("submit");
  include("ifsc_code").when("submit");
  include("branch_name").when("submit");
  include("bank_name").when("submit");
  include("account_number").when("submit");
  include("bank_address").when("submit");

  include("nic_code").when("submit");
  include("business_type").when("submit");
  include("org_type").when("submit");

  test("business_name", "Business name is required", () => {
    enforce(data.business_name).isNotBlank();
  });
  test(
    "business_name",
    "Business name must be longer than 3 characters",
    () => {
      enforce(data.business_name).longerThan(3);
    }
  );

  test("business_details", "Business details are required", () => {
    enforce(data.business_details).isNotBlank();
  });
  test(
    "business_details",
    "Business details must be longer than 3 characters",
    () => {
      enforce(data.business_details).longerThan(3);
    }
  );

  test("business_address", "Business address is required", () => {
    enforce(data.business_address).isNotBlank();
  });

  test(
    "business_address",
    "Business address must be between 10 and 200 characters",
    () => {
      enforce(data.business_address)
        .longerThanOrEquals(5)
        .shorterThanOrEquals(200);
    }
  );

  test(
    "business_address",
    "Business address must start with a letter or number",
    () => {
      enforce(data.business_address).matches(/^[a-zA-Z0-9]/);
    }
  );

  test("business_district", "Please select a business district", () => {
    enforce(data.business_district).isNotBlank();
    enforce(data.business_district).notEquals(0);
  });
  test("business_taluka", "Please select a business taluka", () => {
    enforce(data.business_taluka).isNotBlank();
    enforce(data.business_taluka).notEquals(0);
  });

  test("business_place", "Business place is required", () => {
    enforce(data.business_place).isNotBlank();
  });
  test(
    "business_place",
    "Business place must be longer than 3 characters",
    () => {
      enforce(data.business_place).longerThan(3);
    }
  );
  test("org_type", "Please select an organization type", () => {
    enforce(data.org_type).isNotBlank();
    enforce(data.org_type).notEquals(0);
  });
  test("business_pincode", "Pincode is required", () => {
    enforce(data.business_pincode).isNotBlank();
  });
  test("business_pincode", "Enter a valid 6-digit pincode", () => {
    enforce(data.business_pincode).matches(/^[1-9][0-9]{5}$/);
  });

  test("quotation_name", "Quotation name is required", () => {
    enforce(data.quotation_name).isNotBlank();
  });
  test(
    "quotation_name",
    "Quotation name must be longer than 3 characters",
    () => {
      enforce(data.quotation_name).longerThan(3);
    }
  );

  // GST number required validation
  // test(
  //   "quotation_gst_number",
  //   "GST number is required for the quotation",
  //   () => {
  //     enforce(data.quotation_gst_number).isNotBlank();
  //   }
  // );

  // Only check format when GST number is not empty
  // test("quotation_gst_number", "Please enter a valid GST number", () => {
  //   enforce(data.quotation_gst_number).matches(
  //     /^[0-9]{2}[A-Z]{5}[0-9]{4}[A-Z]{1}[1-9A-Z]{1}Z[0-9A-Z]{1}$/
  //   );
  // });
  test("quotation_gst_number", "Please enter a valid GST number", () => {
    if (data.quotation_gst_number && data.quotation_gst_number.trim() !== "") {
      enforce(data.quotation_gst_number).matches(
        /^[0-9]{2}[A-Z]{5}[0-9]{4}[A-Z]{1}[1-9A-Z]{1}Z[0-9A-Z]{1}$/
      );
    }
  });

  // test(
  //   "quotation_gst_number",
  //   "GST number is required for the quotation",
  //   () => {
  //     enforce(data.quotation_gst_number).isNotBlank();
  //   }
  // );
  // test(
  //   "quotation_gst_number",
  //   "GST number must be exactly 15 characters",
  //   () => {
  //     enforce(data.quotation_gst_number).matches(/^[A-Z0-9]{15}$/);
  //   }
  // );

  // test("quotation_gst_number", "Invalid state code in GST number", () => {
  //   const stateCode = data.quotation_gst_number.slice(0, 2);
  //   enforce(stateCode).matches(/^[0-9]{2}$/);
  //   enforce(parseInt(stateCode, 10)).greaterThan(0).lessThanOrEquals(36);
  // });
  // test("quotation_gst_number", "Invalid PAN section in the GST number", () => {
  //   const pan = data.quotation_gst_number.slice(2, 12);
  //   enforce(pan).matches(/^[A-Z]{5}[0-9]{4}[A-Z]$/);
  // });
  // test("quotation_gst_number", "The 14th character of GST must be 'Z'", () => {
  //   const businessCode = data.quotation_gst_number[13];
  //   enforce(businessCode).equals("Z");
  // });
  // test("quotation_gst_number", "Invalid checksum in GST number", () => {
  //   const checksum = data.quotation_gst_number[14];
  //   enforce(checksum).matches(/^[A-Z0-9]$/);
  // });

  test("quotation_amount", "Quotation amount is required", () => {
    enforce(data.quotation_amount).isNotEmpty();
  });
  test("quotation_amount", "Quotation amount must be a valid number", () => {
    enforce(data.quotation_amount).isNumeric();
  });
  test("quotation_amount", "Quotation amount must be greater than zero", () => {
    enforce(Number(data.quotation_amount)).greaterThan(0);
  });
  test(
    "quotation_amount",
    "Quotation amount must not exceed ₹30,00,000",
    () => {
      enforce(Number(data.quotation_amount)).lessThanOrEquals(3000000);
    }
  );
  test(
    "quotation_amount",
    "Quotation amount should be in valid format (up to 2 decimal places)",
    () => {
      enforce(data.quotation_amount).matches(/^\d+(\.\d{1,2})?$/);
    }
  );
  test("loan_amount", "Loan amount is required", () => {
    enforce(data.loan_amount).isNotEmpty();
  });
  test("loan_amount", "Loan amount must be a valid number", () => {
    enforce(data.loan_amount).isNumeric();
  });
  test("loan_amount", "Loan amount must be greater than zero", () => {
    enforce(Number(data.loan_amount)).greaterThan(0);
  });
  test("loan_amount", "Loan amount must not exceed ₹30,00,000", () => {
    enforce(Number(data.loan_amount)).lessThanOrEquals(3000000);
  });
  test(
    "loan_amount",
    "Loan amount should be in valid format (up to 2 decimal places)",
    () => {
      enforce(data.loan_amount).matches(/^\d+(\.\d{1,2})?$/);
    }
  );
  test(
    "loan_amount",
    "Loan amount must not exceed 95% of the quotation amount",
    () => {
      if (data.quotation_amount) {
        const maxLoanAmount = 0.95 * Number(data.quotation_amount);
        enforce(Number(data.loan_amount)).lessThanOrEquals(maxLoanAmount);
      }
    }
  );
  test("bank_name", "Bank name is required", () => {
    enforce(data.bank_name).isNotEmpty();
  });
  test("bank_name", "Bank name must be at least 3 characters", () => {
    enforce(data.bank_name).longerThanOrEquals(3);
  });
  test("bank_name", "Bank name must be less than 255 characters", () => {
    enforce(data.bank_name).shorterThanOrEquals(255);
  });

  test("branch_name", "Branch name is required", () => {
    enforce(data.branch_name).isNotEmpty();
  });
  test("branch_name", "Branch name must be at least 3 characters", () => {
    enforce(data.branch_name).longerThanOrEquals(3);
  });
  test("branch_name", "Branch name must be less than 255 characters", () => {
    enforce(data.branch_name).shorterThanOrEquals(255);
  });

  test("ifsc_code", "IFSC code is required", () => {
    enforce(data.ifsc_code).isNotEmpty();
  });
  test("ifsc_code", "IFSC code must be exactly 11 characters", () => {
    enforce(data.ifsc_code).lengthEquals(11);
  });
  test("ifsc_code", "Enter a valid IFSC code (e.g., ABCD0123456)", () => {
    enforce(data.ifsc_code).matches(/^[A-Z]{4}0[A-Z0-9]{6}$/);
  });

  test("account_number", "Account number is required", () => {
    enforce(data.account_number).isNotEmpty();
  });
  test(
    "account_number",
    "Account number must be between 9 and 20 digits",
    () => {
      enforce(data.account_number).matches(/^\d{9,20}$/);
    }
  );
  test("account_number", "Account number must contain only digits", () => {
    enforce(data.account_number).matches(/^\d+$/);
  });
  test("bank_address", "Bank address is required", () => {
    enforce(data.bank_address).isNotEmpty();
  });
  test("bank_address", "Bank address must be at least 10 characters", () => {
    enforce(data.bank_address).longerThanOrEquals(10);
  });
  test("bank_address", "Bank address must not exceed 500 characters", () => {
    enforce(data.bank_address).shorterThanOrEquals(500);
  });
});

export default suite;
