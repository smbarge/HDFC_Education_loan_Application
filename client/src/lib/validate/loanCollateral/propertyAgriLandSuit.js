import { create, test, enforce, only, include } from "vest";

const suite = create((data = {}, fieldName) => {
  only(fieldName);

  include("pincode").when("submit");
  include("property_value").when("submit");
  include("village").when("submit");
  include("maj_unit").when("submit");
  include("min_unit").when("submit");
  include("survey_no").when("submit");

  // include("property_district").when("submit");
  // include("property_taluka").when("submit");

  // property_district
  test("property_district", "Property district is required", () => {
    enforce(data.property_district).isNotEmpty();
  });

  test(
    "property_district",
    "Property district must be between 3 and 50 characters",
    () => {
      enforce(data.property_district)
        .longerThanOrEquals(3)
        .shorterThanOrEquals(50);
    }
  );

  test(
    "property_district",
    "Property district cannot contain numbers or special characters",
    () => {
      enforce(data.property_district).matches(/^[a-zA-Z\s]+$/);
    }
  );

  // property_taluka
  test("property_taluka", "Property taluka is required", () => {
    enforce(data.property_taluka).isNotEmpty();
  });

  test(
    "property_taluka",
    "Property taluka must be between 3 and 50 characters",
    () => {
      enforce(data.property_taluka)
        .longerThanOrEquals(3)
        .shorterThanOrEquals(50);
    }
  );

  test(
    "property_taluka",
    "Property taluka cannot contain numbers or special characters",
    () => {
      enforce(data.property_taluka).matches(/^[a-zA-Z\s]+$/);
    }
  );

  // village
  test("village", "Property village is required", () => {
    enforce(data.village).isNotEmpty();
  });

  test(
    "village",
    "Property village must be between 3 and 50 characters",
    () => {
      enforce(data.village).longerThanOrEquals(3).shorterThanOrEquals(50);
    }
  );

  test(
    "village",
    "Property village cannot contain numbers or special characters",
    () => {
      enforce(data.village).matches(/^[a-zA-Z\s]+$/);
    }
  );

  // pincode
  test("pincode", "Property pincode is required", () => {
    enforce(data.pincode).isNotEmpty();
  });

  test("pincode", "Property pincode must contain only numbers", () => {
    enforce(data.pincode).matches(/^\d+$/);
  });

  test("pincode", "Property pincode must be a valid 6-digit code", () => {
    enforce(data.pincode).matches(/^[1-9][0-9]{5}$/);
  });

  // property_value
  test("property_value", "Property value is required", () => {
    enforce(data.property_value).isNotEmpty();
  });

  test("property_value", "Property value must be a valid number", () => {
    enforce(data.property_value).matches(/^\d+(\.\d{1,2})?$/);
  });

  test(
    "property_value",
    "Property value must be between 10,000 and 100,000,000",
    () => {
      enforce(Number(data.property_value))
        .greaterThan(10000)
        .lessThan(100000000);
    }
  );

  test("property_value", "Property value cannot be negative", () => {
    enforce(Number(data.property_value)).greaterThan(0);
  });

  // maj_unit
  test("maj_unit", "Property area is required", () => {
    enforce(data.maj_unit).isNotEmpty();
  });

  test("maj_unit", "Property area must be a valid number", () => {
    enforce(data.maj_unit).matches(/^\d+(\.\d{1,2})?$/);
  });

  test("maj_unit", "Property area must between 0 and less than 100", () => {
    enforce(Number(data.maj_unit)).greaterThanOrEquals(0).lessThan(100);
  });

  test("maj_unit", "Property area cannot be negative", () => {
    enforce(Number(data.maj_unit)).greaterThanOrEquals(0);
  });

  // min_unit
  test("min_unit", "Property area is required", () => {
    enforce(data.min_unit).isNotEmpty();
  });

  test("min_unit", "Property area must be a valid number", () => {
    enforce(data.min_unit).matches(/^\d+(\.\d{1,2})?$/);
  });

  test(
    "min_unit",
    "Property area must be between 100 and 1,000,000 sqft",
    () => {
      enforce(Number(data.min_unit)).greaterThanOrEquals(0).lessThan(1000);
    }
  );

  test("min_unit", "Property area cannot be negative", () => {
    enforce(Number(data.min_unit)).greaterThan(0);
  });

  // purchase_date
  test("purchase_date", "purchase date is required", () => {
    enforce(data.purchase_date).isNotEmpty();
  });

  test(
    "purchase_date",
    "Purchase date must be a valid date in the format yyyy-mm-dd",
    () => {
      const isValidDate = (date) => {
        const regex = /^\d{4}-\d{2}-\d{2}$/;
        return regex.test(date);
      };
      enforce(isValidDate(data.purchase_date)).isTruthy();
    }
  );

  // survey_no

  test("survey_no", "Survey number is required", () => {
    enforce(data.survey_no).isNotEmpty();
  });

  test("survey_no", "Survey number must be between 3 and 15 characters", () => {
    enforce(data.survey_no).longerThan(2).shorterThanOrEquals(15);
  });

  test(
    "survey_no",
    "Survey number must be alphanumeric with optional slashes or hyphens",
    () => {
      enforce(data.survey_no).matches(/^[a-zA-Z0-9/-]+$/);
    }
  );
});

export default suite;
