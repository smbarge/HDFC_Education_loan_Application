import { create, test, enforce, only, include } from "vest";

const suite = create((data = {}, fieldName) => {
  only(fieldName);

  include("street_address").when("submit");
  include("property_district").when("submit");
  include("property_taluka").when("submit");
  include("pincode").when("submit");
  include("property_value").when("submit");
  include("place").when("submit");
  include("area").when("submit");
  include("purchase_date").when("submit");
  include("unit_no").when("submit");


  // Property

  // street_address
  test("street_address", "Property address is required", () => {
    enforce(data.street_address).isNotEmpty();
});

test('street_address', 'Property address must be between 10 and 200 characters', () => {
  enforce(data.street_address).longerThanOrEquals(5).shorterThanOrEquals(200);
});


test('street_address', 'Property address must start with a letter or number', () => {
  enforce(data.street_address).matches(/^[a-zA-Z0-9]/);
});

// property_district
test("property_district", "Property district is required", () => {
  enforce(data.property_district).isNotEmpty();
});

test('property_district', 'Property district must be between 3 and 50 characters', () => {
  enforce(data.property_district).longerThanOrEquals(3).shorterThanOrEquals(50);
});

test('property_district', 'Property district cannot contain numbers or special characters', () => {
  enforce(data.property_district).matches(/^[a-zA-Z\s]+$/);
});

// property_taluka
test("property_taluka", "Property taluka is required", () => {
  enforce(data.property_taluka).isNotEmpty();
});

test('property_taluka', 'Property taluka must be between 3 and 50 characters', () => {
  enforce(data.property_taluka).longerThanOrEquals(3).shorterThanOrEquals(50);
});

test('property_taluka', 'Property taluka cannot contain numbers or special characters', () => {
  enforce(data.property_taluka).matches(/^[a-zA-Z\s]+$/);
});

 // place
 test("place", "Property place is required", () => {
  enforce(data.place).isNotEmpty();
});

test('place', 'Property place must be between 3 and 50 characters', () => {
  enforce(data.place).longerThanOrEquals(3).shorterThanOrEquals(50);
});

test('place', 'Property place cannot contain numbers or special characters', () => {
  enforce(data.place).matches(/^[a-zA-Z\s]+$/);
});

// pincode
test("pincode", "Property pincode is required", () => {
    enforce(data.pincode).isNotEmpty();
  });

  test('pincode', 'Property pincode must contain only numbers', () => {
    enforce(data.pincode).matches(/^\d+$/);
  });
  
   test("pincode", "Property pincode must be a valid 6-digit code", () => {
     enforce(data.pincode).matches(/^[1-9][0-9]{5}$/);
  });
  
  // property_value
  test("property_value", "Property value is required", () => {
    enforce(data.property_value).isNotEmpty();
  });

  test('property_value', 'Property value must be a valid number', () => {
    enforce(data.property_value).matches(/^\d+(\.\d{1,2})?$/);
  });

  test('property_value', 'Property value must be between 10,000 and 100,000,000', () => {
    enforce(Number(data.property_value)).greaterThan(10000).lessThan(100000000);
  });

  test('property_value', 'Property value cannot be negative', () => {
    enforce(Number(data.property_value)).greaterThan(0);
  });
  
  // area
  test("area", "Property area is required", () => {
    enforce(data.area).isNotEmpty();
  });

   test('area', 'Property area must be a valid number', () => {
    enforce(data.area).matches(/^\d+(\.\d{1,2})?$/);
  });

  test('area', 'Property area must be between 100 and 1,000,000 sqft', () => {
    enforce(Number(data.area)).greaterThan(100).lessThan(1000000);
  });

  test('area', 'Property area cannot be negative', () => {
    enforce(Number(data.area)).greaterThan(0);
  });

  // purchase_date
   test('purchase_date', 'purchase date is required', () => {
    enforce(data.purchase_date).isNotEmpty();
  });

  test("purchase_date", "Purchase date must be a valid date in the format yyyy-mm-dd", () => {
    const isValidDate = (date) => {
      const regex = /^\d{4}-\d{2}-\d{2}$/;
      return regex.test(date);
    };
    enforce(isValidDate(data.purchase_date)).isTruthy();
  });

  // unit_no

  test('unit_no', 'Unit number is required', () => {
    enforce(data.unit_no).isNotEmpty();
  });

  test('unit_no', 'Unit number must be between 1 and 10 characters', () => {
    enforce(data.unit_no).longerThan(0).shorterThanOrEquals(10);
  });

  test('unit_no', 'Unit number must be alphanumeric', () => {
    enforce(data.unit_no).matches(/^[a-zA-Z0-9]+$/);
  });
  

  // survey_no

  test('survey_no', 'Survey number is required', () => {
    enforce(data.survey_no).isNotEmpty();
  });

  test('survey_no', 'Survey number must be between 3 and 15 characters', () => {
    enforce(data.survey_no).longerThan(2).shorterThanOrEquals(15);
  });

  test('survey_no', 'Survey number must be alphanumeric with optional slashes or hyphens', () => {
    enforce(data.survey_no).matches(/^[a-zA-Z0-9/-]+$/);
  });
  
});

export default suite;
