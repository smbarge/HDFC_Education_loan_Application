<script>
  import { Alert } from "flowbite-svelte";
  import { goto } from "$app/navigation";
  import logInSuite from "$lib/validate/logIn.js";
  import { Button, Checkbox, Card, Avatar } from "flowbite-svelte";
  import { Input, Helper } from "flowbite-svelte";
  import {
    token,
    refreshToken,
    userId,
    username,
    applications,
    given_name,
    preferred_username,
  } from "$appstore/store";
  import { api } from "$api/api";
  import BusinessDetails from "../../component/businessDetails/BusinessDetails.svelte";

  let res = logInSuite.get();
  let alertMsg = "";

  let viewPassword = false;

  let data = {
    password: "",
    mobile: "",
  };

  let errors = {
    password: "",
    mobile: "",
  };

  // Validate input for mobile field to allow only numbers (no spaces or characters)
  const validateMobile = (mobile) => {
    const mobileNumberPattern = /^[0-9]+$/;
    return mobileNumberPattern.test(mobile);
  };

  const onInput = (fieldName) => {
    // Trim the mobile input field
    if (fieldName === "mobile") {
      data.mobile = data.mobile.trim(); // Remove any surrounding spaces
    }

    // Validate mobile field
    if (fieldName === "mobile" && !validateMobile(data.mobile)) {
      errors.mobile = "Mobile number should contain only digits.";
      return;
    } else {
      errors.mobile = "";
    }

    res = logInSuite(data, fieldName);

    const keys = Object.keys(errors);
    keys.forEach((key) => {
      errors[key] = "";
    });

    res.errors.forEach((e) => {
      errors[e.fieldName] = e.message;
    });
  };

  const onSubmit = () => {
    // Validate mobile on submit
    if (!validateMobile(data.mobile)) {
      errors.mobile = "Registered mobile number is required";
      return;
    } else {
      errors.mobile = "";
    }

    res = logInSuite(data, "submit");
    const keys = Object.keys(errors);
    keys.forEach((key) => {
      errors[key] = "";
    });

    res.errors.forEach((e) => {
      errors[e.fieldName] = e.message;
    });
  };

  function getUserIdFromToken(token) {
    if (!token) return null;

    const payload = token.split(".")[1];
    const decodedPayload = JSON.parse(atob(payload));

    return decodedPayload.sub;
  }
  const personalDetailsDefault = {
    id: 0,
    religion: 0, // Default: 0 (integer)
    name: "", // Default: "" (string)
    dob: "2024-01-01", // Default: "" (string, should be in YYYY-MM-DD format)
    gender: 0, // Default: 0 (integer)
    address: "", // Default: "" (string)
    mobile: "", // Default: "" (string)
    email: "", // Default: "" (string)
    pan: "", // Default: "" (string)
    current_address: "", // Default: "" (string)
    current_district: 0, // Default: 0 (integer)
    current_taluka: 0, // Default: 0 (integer)
    current_place: "", // Default: "" (string)
    current_area: "",
    current_pincode: "", // Default: "" (string)
    permanent_address: "", // Default: "" (string)
    permanent_district: 0, // Default: 0 (integer)
    permanent_taluka: 0, // Default: 0 (integer)
    permanent_place: "", // Default: "" (string)
    permanent_area: "",
    permanent_pincode: "", // Default: "" (string)
    marital_status: 0, // Default: 0 (integer)
    education_qualification: 0, // Default: 0 (integer)
    details: "", // Default: "" (string)
    guardian: 0, // Default: 0 (integer)
    occupation: 0, // Default: 0 (integer)
    income: "", // Default: "" (string)
    past_surety_commitment: "", // Default: "" (string)
    aadhar: "", // Default: "" (string)
    occupationtype: "", // Default: "" (string)
    riot_victim: 0, // Default: 0 (integer)
    natural_calamity_victim: 0, // Default: 0 (integer)
    disabled_person: 0, // Default: 0 (integer)
    guarantor: 0, // Default: 0 (integer)
    ration_card_number: "",
    district_id: 0, // Default: 0 (integer)
    resident: 0,
    literate: 0,
  };

  const businessDetailsDefault = {
    id: 0, // Default: 0 (integer)
    business_name: "", // Default: "" (string)
    business_details: "", // Default: "" (text)
    business_address: "", // Default: "" (text)
    business_district: 0, // Default: 0 (integer)
    business_taluka: 0, // Default: 0 (integer)
    business_place: "", // Default: "" (string)
    business_pincode: "", // Default: "" (string, length 6)
    quotation_name: "", // Default: "" (string)
    quotation_gst_number: "", // Default: "" (string, length 15)
    quotation_amount: 0.0, // Default: 0.00 (numeric(15,2))
    bank_id: 0, // Default: 0 (integer)
    ifsc_code: "", // Default: "" (string, length 11)
    bank_name: "", // Default: "" (string)
    branch_name: "", // Default: "" (string)
    account_number: "", // Default: "" (string, length 20)
    bank_address: "", // Default: "" (text)
    nic_code: "", // Default: "" (string)
    business_type: 0, // Default: 0 (integer)
    org_type: 0, // Default: 0 (integer)
  };
  const guarantorPersonalDetailsDefault = {
    id: 0, // Default: 0 (integer)
    name: "", // Default: "" (string)
    dob: "", // Default: "" (string, should be in YYYY-MM-DD format)
    gender: 0, // Default: 0 (integer)
    religion: 0, // Default: 0 (integer)
    aadhar: "", // Default: "" (string, length 12)
    mobile: "", // Default: "" (string)
    email: "", // Default: "" (string)
    pan: "", // Default: "" (string)
    current_address: "", // Default: "" (string)
    current_district: 0, // Default: 0 (integer)
    current_taluka: 0, // Default: 0 (integer)
    current_place: "", // Default: "" (string)
    current_area: "",
    current_pincode: "", // Default: "" (string)
    permanent_address: "", // Default: "" (string)
    permanent_district: 0, // Default: 0 (integer)
    permanent_taluka: 0, // Default: 0 (integer)
    permanent_place: "", // Default: "" (string)
    permanent_area: "",
    permanent_pincode: "", // Default: "" (string)
    marital_status: 0, // Default: 0 (integer)
    education_qualification: 0, // Default: 0 (integer)
    details: "", // Default: "" (string)
    guardian: 0, // Default: 0 (integer)
    occupation: 0, // Default: 0 (integer)
    occupation_type: "", // Default: "" (string)
    income: "", // Default: "" (string)
    past_surety_commitment: "", // Default: "" (string)
    riot_victim: false, // Default: false (boolean)
    natural_calamity_victim: false, // Default: false (boolean)
    disable_person: false, // Default: false (boolean)
  };

  const initApplications = (applications) => {
    console.log("init applications called: ", applications.length);
    if (applications.length == 0) {
      applications = [
        {
          personalDetails: personalDetailsDefault,
          businessDetails: businessDetailsDefault,
          guarantorPersonalDetails: guarantorPersonalDetailsDefault,
          properties: [],
          licPolicies: [],
          fds: [],
          uploadedDocs: [],
        },
      ];
    }
    // if business details is not added, add default business details with id=0
    // if guarantor personal details is not added, add default guarantor personal details with id=0

    applications = applications.map((a) => {
      if (!a.businessDetails.id) {
        a = {
          ...a,
          businessDetails: businessDetailsDefault,
        };
      }
      if (!a.guarantorPersonalDetails.id) {
        a = {
          ...a,
          guarantorPersonalDetails: guarantorPersonalDetailsDefault,
        };
      }
      return { ...a };
    });

    return applications;
  };

  async function loginApplicant() {
    alertMsg = ""; // Clear previous error messages
    // Trim the mobile and password inputs before validation
    data.mobile = data.mobile.trim();
    data.password = data.password.trim();
    console.log("will attempt to login");
    // Ensure inputs are valid
    onSubmit();
    if (errors.mobile || errors.password) {
      alertMsg = "Please provide valid inputs";
      return;
    }

    try {
      const { mobile, password } = data;
      const response = await fetch(
        "https://keycloak.chanakyasoft.com/realms/fat/protocol/openid-connect/token",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
          },
          body: new URLSearchParams({
            client_id: "loan_application", // Your client ID
            grant_type: "password",
            username: mobile,
            password,
            scope: "openid",
          }),
        }
      );

      if (response.ok) {
        const data = await response.json();
        $token = data.access_token;
        $refreshToken = data.refresh_token;
        $userId = getUserIdFromToken($token);
        $username = mobile;
        {
          let {
            error,
            errorMsg,
            applications: lApplications,
          } = await api.getApplications();
          lApplications = initApplications(lApplications);
          console.log("error: ", error);
          console.log("errorMsg: ", errorMsg);
          console.log("applications: ", lApplications);
          $applications = lApplications;
        }
        console.log("userId: ", $userId);

        // user Info:
        {
          const url =
            "https://keycloak.chanakyasoft.com/realms/fat/protocol/openid-connect/userinfo";
          const response = await fetch(url, {
            method: "GET",
            headers: {
              "Content-Type": "application/x-www-form-urlencoded",
              Authorization: `Bearer ${$token}`,
            },
          });
          if (response.ok) {
            const data = await response.json();
            console.log("User Info is: ", data);
            $given_name = data.given_name;
            $preferred_username = data.preferred_username;
          } else {
            console.log("failed to get user info for token: ", $token);
          }
        }

        goto("/termloan/finalDashboard");
      } else {
        const errorData = await response.json();
        alertMsg = errorData.error_description || "Login failed";
      }
    } catch (error) {
      console.log("exception in login: ", error);
      alertMsg = "An error occurred during login";
    }
  }

  // Function to trigger login on 'Enter' key press
  const handleKeyPress = (event) => {
    if (event.key === "Enter") {
      loginApplicant();
    }
  };
</script>

<div class="rounded-lg">
  <div class="grid grid-cols-1 lg:grid-cols-12 m-5 lg:m-20 gap-5">
    <!-- Left Image Section -->
    <div
      class="hidden col-span-6 bg-white p-5 lg:flex justify-center items-center"
    >
      <img
        src="/termloan/loanImage.jpg"
        alt="loanLogo"
        class=" w-full max-w-[650px] h-auto object-cover"
      />
    </div>
    <!-- Right Form Section -->
    <div
      class="lg:col-span-6 bg-white lg:my-16 my-8 p-8 lg:p-14 rounded-lg shadow-2xl border-b-4 border-purple-800 w-full md:w-[450px] mx-auto lg:mx-0 h-fit"
    >
      <!-- Logo and Title -->
      <!-- <div class="flex gap-3 border-b-2 border-gray-400 py-5">
        <img
          src="/MaulanaAzad.jpg"
          alt="logo"
          class="w-14 h-14 rounded shadow-lg"
        />
        <div>
          <h1 class="text-lg font-semibold text-left text-deepPurple-700 leading-5">
            Maulana Azad Minorities <br /> Financial Development Corporation Limited
          </h1>
          <h1 class="text-md mt-2 font-semibold text-left text-gray-500 leading-3">
            A Govt. of Maharashtra Undertaking
          </h1>
        </div>
      </div> -->
      <!-- Login Title -->
      <div class="text-4xl font-semibold mb-5 text-purple-700">Login</div>

      <!-- Mobile Number Input -->
      <div class="relative grid gap-1">
        <h1 class="text-gray-600 text-xl font-semibold">Mobile No</h1>
        <Input
          on:input={() => {
            onInput("mobile");
          }}
          style="outlined"
          id="mobile"
          name="mobile"
          type="text"
          label="mobile"
          placeholder="Enter Mobile No."
          bind:value={data.mobile}
          on:keypress={handleKeyPress}
        />
        {#if errors["mobile"]}
          {#if errors.mobile}
            <Helper color="red" class="">
              {errors.mobile}
            </Helper>
          {/if}
        {/if}
      </div>

      <!-- Password Input -->
      <div class="grid gap-1 mt-2">
        <h1 class="text-gray-600 text-xl font-semibold">Password</h1>
        <div class="relative pb-4">
          <Checkbox
            class="absolute right-0 -top-6 flex justify-end mb-2 text-gray-800"
            bind:checked={viewPassword}
          >
            View
          </Checkbox>
          {#if viewPassword}
            <Input
              on:input={() => {
                onInput("password");
              }}
              style="outlined"
              id="password"
              name="password"
              type="text"
              label="Password"
              placeholder="Password"
              bind:value={data.password}
              on:keypress={handleKeyPress}
            />
          {:else}
            <Input
              on:input={() => {
                onInput("password");
              }}
              style="outlined"
              id="password"
              name="password"
              type="password"
              label="Password"
              placeholder="Password"
              bind:value={data.password}
              on:keypress={handleKeyPress}
            />
          {/if}
          {#if errors.password}
            <Helper color="red" class="absolute">
              {errors.password}
            </Helper>
          {/if}
        </div>
      </div>

      <!-- Forgot Password Link -->
      <div class="mt-2 text-purple-700 underline font-medium text-md">
        <a href="/termloan/forgotPassword"> Forgot Password?</a>
      </div>

      <!-- Login Button -->
      <button
        on:click={loginApplicant}
        tabindex="0"
        class="mt-5 bg-purple-700 p-2 w-full rounded-md border border-1 border-gray-400 text-center font-medium text-white"
      >
        <h1 class="text-md font-bold">Login</h1>
      </button>

      <!-- Registration Link -->
      <div class="mt-5 text-md text-gray-500">
        Don't have an account yet?
        <a href="/termloan/registrationForm" class="text-purple-700 hover:underline"
          >Register Here</a
        >
      </div>

      <!-- <div class="mt-5 text-md text-gray-500">
        Don't have an account yet?
        <a
          href="/termloan/LogInForm"
          class="text-purple-700 hover:underline">Register Here</a
        >
      </div> -->

      <!-- Alert Message -->
      <div class="mt-5 flex justify-center items-center">
        {#if alertMsg}
          <Alert color="red" class="flex">
            <svg
              class="w-6 h-6 text-red-800"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path
                d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5Zm3.707 11.793a1 1 0 1 1-1.414 1.414L10 11.414l-2.293 2.293a1 1 0 0 1-1.414-1.414L8.586 10 6.293 7.707a1 1 0 0 1 1.414-1.414L10 8.586l2.293-2.293a1 1 0 0 1 1.414 1.414L11.414 10l2.293 2.293Z"
              />
            </svg>
            {alertMsg}
          </Alert>
        {/if}
      </div>
    </div>
  </div>
</div>
