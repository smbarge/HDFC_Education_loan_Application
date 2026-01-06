import { create, test, enforce, only, include } from "vest";

const suite = create((guarantorData = {}, fieldName) => {
  only(fieldName);

  include("property_address").when("submit");
  include("property_district").when("submit");
  include("property_taluka").when("submit");
  include("property_pincode").when("submit");
  include("property_value").when("submit");
  include("property_place").when("submit");
  include("property_area").when("submit");
  include("purchase_date").when("submit");



  include("policy_number").when("submit");
  include("policy_type").when("submit");
  include("policy_amount").when("submit");
  include("premium_amount").when("submit");
  include("premium_frequency").when("submit");
  include("policy_term").when("submit");


  include("fd_account_number").when("submit");
  include("fd_amount").when("submit");
  include("tenure").when("submit");
  include("interest_rate").when("submit");
  

  // Property

  // property_address
  test("property_address", "Property address is required", () => {
    enforce(guarantorData.property_address).isNotEmpty();
});

test('property_address', 'Property address must be between 10 and 200 characters', () => {
  enforce(guarantorData.property_address).longerThanOrEquals(5).shorterThanOrEquals(200);
});


test('property_address', 'Property address must start with a letter or number', () => {
  enforce(guarantorData.property_address).matches(/^[a-zA-Z0-9]/);
});

// property_district
test("property_district", "Property district is required", () => {
  enforce(guarantorData.property_district).isNotEmpty();
});

test('property_district', 'Property district must be between 3 and 50 characters', () => {
  enforce(guarantorData.property_district).longerThanOrEquals(3).shorterThanOrEquals(50);
});

test('property_district', 'Property district cannot contain numbers or special characters', () => {
  enforce(guarantorData.property_district).matches(/^[a-zA-Z\s]+$/);
});

// property_taluka
test("property_taluka", "Property taluka is required", () => {
  enforce(guarantorData.property_taluka).isNotEmpty();
});

test('property_taluka', 'Property taluka must be between 3 and 50 characters', () => {
  enforce(guarantorData.property_taluka).longerThanOrEquals(3).shorterThanOrEquals(50);
});

test('property_taluka', 'Property taluka cannot contain numbers or special characters', () => {
  enforce(guarantorData.property_taluka).matches(/^[a-zA-Z\s]+$/);
});

 // property_place
 test("property_place", "Property place is required", () => {
  enforce(guarantorData.property_place).isNotEmpty();
});

test('property_place', 'Property place must be between 3 and 50 characters', () => {
  enforce(guarantorData.property_place).longerThanOrEquals(3).shorterThanOrEquals(50);
});

test('property_place', 'Property place cannot contain numbers or special characters', () => {
  enforce(guarantorData.property_place).matches(/^[a-zA-Z\s]+$/);
});

// property_pincode
test("property_pincode", "Property pincode is required", () => {
    enforce(guarantorData.property_pincode).isNotEmpty();
  });

  test('property_pincode', 'Property pincode must contain only numbers', () => {
    enforce(guarantorData.property_pincode).matches(/^\d+$/);
  });
  
   test("property_pincode", "Property pincode must be a valid 6-digit code", () => {
     enforce(guarantorData.property_pincode).matches(/^[1-9][0-9]{5}$/);
  });
  
  // property_value
  test("property_value", "Property value is required", () => {
    enforce(guarantorData.property_value).isNotEmpty();
  });

  test('property_value', 'Property value must be a valid number', () => {
    enforce(guarantorData.property_value).matches(/^\d+(\.\d{1,2})?$/);
  });

  test('property_value', 'Property value must be between 10,000 and 100,000,000', () => {
    enforce(Number(guarantorData.property_value)).greaterThan(10000).lessThan(100000000);
  });

  test('property_value', 'Property value cannot be negative', () => {
    enforce(Number(guarantorData.property_value)).greaterThan(0);
  });
  
  // property_area
  test("property_area", "Property area is required", () => {
    enforce(guarantorData.property_area).isNotEmpty();
  });

   test('property_area', 'Property area must be a valid number', () => {
    enforce(guarantorData.property_area).matches(/^\d+(\.\d{1,2})?$/);
  });

  test('property_area', 'Property area must be between 100 and 1,000,000 sqft', () => {
    enforce(Number(guarantorData.property_area)).greaterThan(100).lessThan(1000000);
  });

  test('property_area', 'Property area cannot be negative', () => {
    enforce(Number(guarantorData.property_area)).greaterThan(0);
  });

  // purchase_date
   test('purchase_date', 'purchase date is required', () => {
    enforce(guarantorData.purchase_date).isNotEmpty();
  });

  test("purchase_date", "Purchase date must be a valid date in the format yyyy-mm-dd", () => {
    const isValidDate = (date) => {
      const regex = /^\d{4}-\d{2}-\d{2}$/;
      return regex.test(date);
    };
    enforce(isValidDate(guarantorData.purchase_date)).isTruthy();
  });

  // LIC

  // policy_number
  test('policy_number', 'Policy number is required', () => {
    enforce(guarantorData.policy_number).isNotEmpty();
  });

  test('policy_number', 'Policy number must contain only letters and numbers', () => {
    enforce(guarantorData.policy_number).matches(/^[a-zA-Z0-9]+$/);
  });

  test('policy_number', 'Policy number must be between 6 and 12 characters', () => {
    enforce(guarantorData.policy_number).longerThanOrEquals(6).shorterThanOrEquals(12);
  });

  // policy_amount
   test("policy_amount", "Policy number is required", () => {
    enforce(guarantorData.policy_amount).isNotEmpty();

  });

  test('policy_amount', 'Policy amount must be a valid number', () => {
    enforce(guarantorData.policy_amount).matches(/^\d+(\.\d+)?$/);
  });

  test('policy_amount', 'Policy amount must be greater than zero', () => {
    enforce(Number(guarantorData.policy_amount)).greaterThan(0);
  });

  test('policy_amount', 'Policy amount must be less than or equal to 10,000,000', () => {
    enforce(Number(guarantorData.policy_amount)).lessThanOrEquals(10000000);
  });

  // premium_amount
  test("premium_amount", "premium amount is required  ", () => {
    enforce(guarantorData.premium_amount).isNotEmpty();
  });

  test('premium_amount', 'Premium amount must be a valid number', () => {
    enforce(guarantorData.premium_amount).matches(/^\d+(\.\d+)?$/);
  });

  test('premium_amount', 'Premium amount must be greater than zero', () => {
    enforce(Number(guarantorData.premium_amount)).greaterThan(0);
  });

  test('premium_amount', 'Premium amount must be less than or equal to 1,000,000', () => {
    enforce(Number(guarantorData.premium_amount)).lessThanOrEquals(1000000);
  });

  // premium_frequency
  test("premium_frequency", "premium frequency is reuired", () => {
    enforce(guarantorData.premium_frequency).isNotEmpty();
  });

  test("premium_frequency", "Premium frequency must be valid (e.g., 12 for monthly)", () => {
    enforce(guarantorData.premium_frequency).greaterThan(0);
  });

    test('premium_frequency', 'Premium frequency must be one of the following: Monthly, Quarterly, Yearly', () => {
      enforce(guarantorData.premium_frequency).isOneOf(['Monthly', 'Quarterly', 'Yearly']);
    });
  
    test('premium_frequency', 'Premium frequency must be a valid string', () => {
      enforce(guarantorData.premium_frequency).isString();
    });

    test("premium_frequency", "Please select a premium frequency.", () => {
      enforce(guarantorData.premium_frequency).notEquals(0); // Ensure a taluka is selected
      enforce(guarantorData.premium_frequency).notEquals("0"); // Ensure a taluka is selected
      enforce(guarantorData.premium_frequency).isNotBlank(); // Ensure a taluka is selected
    });

    // policy_term
  test("policy_term", "policy term is required", () => {
    enforce(guarantorData.policy_term).isNotEmpty();
  });

  test('policy_term', 'Policy term must be a valid number', () => {
    enforce(guarantorData.policy_term).matches(/^\d+$/);
  });

  test('policy_term', 'Policy term must be greater than zero', () => {
    enforce(Number(guarantorData.policy_term)).greaterThan(0);
  });

  test('policy_term', 'Policy term must be less than or equal to 30 Years', () => {
    enforce(Number(guarantorData.policy_term)).lessThanOrEquals(30);
  });

  // FD Information

  // fd_account_number
  test("fd_account_number", "FD account number is required", () => {
    enforce(guarantorData.fd_account_number).isNotEmpty();

  });

    test('fd_account_number', 'FD account number must be between 6 and 15 characters', () => {
      enforce(guarantorData.fd_account_number).longerThanOrEquals(6).shorterThanOrEquals(15);
    });
  
    test('fd_account_number', 'FD account number cannot contain special characters', () => {
      enforce(guarantorData.fd_account_number).matches(/^[a-zA-Z0-9]+$/);
    });
  
    test('fd_account_number', 'FD account number must be numeric', () => {
      enforce(guarantorData.fd_account_number).matches(/^\d+$/);
    });

    // fd_amount
  test("fd_amount", "FD amount is required", () => {
    enforce(guarantorData.fd_amount).isNotEmpty();
  });

   test('fd_amount', 'FD amount must be a valid number', () => {
    enforce(guarantorData.fd_amount).matches(/^\d+(\.\d+)?$/);
  });

  test('fd_amount', 'FD amount must be greater than zero', () => {
    enforce(Number(guarantorData.fd_amount)).greaterThan(0);
  });

  test('fd_amount', 'FD amount must be less than or equal to 1,000,000', () => {
    enforce(Number(guarantorData.fd_amount)).lessThanOrEquals(1000000);
  });

  // tenure
  test("tenure", "tenure is required", () => {
    enforce(guarantorData.tenure).isNotEmpty();
  });

   test('tenure', 'tenure must be a valid integer', () => {
    enforce(guarantorData.tenure).matches(/^\d+$/);
  });

  test('tenure', 'tenure must be greater than zero', () => {
    enforce(Number(guarantorData.tenure)).greaterThan(0);
  });

  test('tenure', 'tenure must be less than or equal to 120 months', () => {
    enforce(Number(guarantorData.tenure)).lessThanOrEquals(120);
  });

  // interest_rate
  test("interest_rate", "interest rate is required", () => {
    enforce(guarantorData.interest_rate).isNotEmpty();
  });

  test('interest_rate', 'Interest rate must be a valid number', () => {
    enforce(guarantorData.interest_rate).matches(/^\d+(\.\d+)?$/);
  });

  test('interest_rate', 'Interest rate must be greater than zero', () => {
    enforce(Number(guarantorData.interest_rate)).greaterThan(0);
  });

  test('interest_rate', 'Interest rate must be less than or equal to 15 %', () => {
    enforce(Number(guarantorData.interest_rate)).lessThanOrEquals(15);
  });

  test('interest_rate', 'Interest rate can have up to 2 decimal places', () => {
    enforce(guarantorData.interest_rate).matches(/^\d+(\.\d{1,2})?$/);
  });

  // // Fields for properties
  // include("properties").when("submit");

  // // Fields for LIC policies
  // include("licPolicies").when("submit");

  // // Fields for FDs
  // include("fds").when("submit");

  // // Property fields validation
  // test("properties", "Property type is required", () => {
  //   guarantorData.properties.forEach((property) => {
  //     enforce(property.property_type).notEquals(0);
  //   });
  // });

  // test("properties", "Property address is required", () => {
  //   guarantorData.properties.forEach((property) => {
  //     enforce(property.property_address).isNotEmpty();
  //   });
  // });

  // test("properties", "Property address must be at least 5 characters long", () => {
  //   guarantorData.properties.forEach((property) => {
  //     enforce(property.property_address).longerThanOrEquals(5);
  //   });
  // });

  // test("properties", "Property district is required", () => {
  //   guarantorData.properties.forEach((property) => {
  //     enforce(property.property_district).notEquals(0);
  //   });
  // });

  // test("properties", "Property taluka is required", () => {
  //   guarantorData.properties.forEach((property) => {
  //     enforce(property.property_taluka).notEquals(0);
  //   });
  // });

  // test("properties", "Property pincode must be a valid 6-digit code", () => {
  //   guarantorData.properties.forEach((property) => {
  //     enforce(property.property_pincode).matches(/^[1-9][0-9]{5}$/);
  //   });
  // });

  // test("properties", "Property value must be a number greater than 0", () => {
  //   guarantorData.properties.forEach((property) => {
  //     enforce(Number(property.property_value)).greaterThan(0);
  //   });
  // });

  // // LIC policies validation
  // test("licPolicies", "Policy number is required", () => {
  //   guarantorData.licPolicies.forEach((policy) => {
  //     enforce(policy.policy_number).isNotEmpty();
  //   });
  // });

  // test("licPolicies", "Policy number must be exactly 12 characters long", () => {
  //   guarantorData.licPolicies.forEach((policy) => {
  //     enforce(policy.policy_number).lengthEquals(12);
  //   });
  // });

  // test("licPolicies", "Policy type is required", () => {
  //   guarantorData.licPolicies.forEach((policy) => {
  //     enforce(policy.policy_type).notEquals(0);
  //   });
  // });

  // test("licPolicies", "Policy amount must be greater than 0", () => {
  //   guarantorData.licPolicies.forEach((policy) => {
  //     enforce(Number(policy.policy_amount)).greaterThan(0);
  //   });
  // });

  // test("licPolicies", "Premium frequency must be valid (e.g., 12 for monthly)", () => {
  //   guarantorData.licPolicies.forEach((policy) => {
  //     enforce(policy.premium_frequency).greaterThan(0);
  //   });
  // });

  // test("licPolicies", "Policy term must be a positive integer", () => {
  //   guarantorData.licPolicies.forEach((policy) => {
  //     enforce(policy.policy_term).greaterThan(0);
  //   });
  // });

  // // FD fields validation
  // test("fds", "FD account number is required", () => {
  //   guarantorData.fds.forEach((fd) => {
  //     enforce(fd.fd_account_number).isNotEmpty();
  //   });
  // });

  // test("fds", "FD account number must be between 9 and 20 digits", () => {
  //   guarantorData.fds.forEach((fd) => {
  //     enforce(fd.fd_account_number).matches(/^\d{9,20}$/);
  //   });
  // });

  // test("fds", "FD amount must be greater than 0", () => {
  //   guarantorData.fds.forEach((fd) => {
  //     enforce(Number(fd.fd_amount)).greaterThan(0);
  //   });
  // });

  // test("fds", "Tenure must be a positive integer", () => {
  //   guarantorData.fds.forEach((fd) => {
  //     enforce(fd.tenure).greaterThan(0);
  //   });
  // });

  // test("fds", "Interest rate must be a valid number", () => {
  //   guarantorData.fds.forEach((fd) => {
  //     enforce(Number(fd.interest_rate)).greaterThan(0);
  //   });
  // });
});

export default suite;
