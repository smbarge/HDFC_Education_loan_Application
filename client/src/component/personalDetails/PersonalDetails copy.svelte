<script>
  import AlertMsg from "$lib/forgotPassword/AlertMsg.svelte";
  import { slide } from "svelte/transition";
  import { FloatingLabelInput, Helper } from "flowbite-svelte";
  import { authApi } from "$api/authApi";
  import sendOtpSuite from "$lib/validate/sendOtpSuit";
  import verifyOtpSuit from "$lib/validate/verifyOtpSuit";
  import VerifyOtp from "$lib/forgotPassword/VerifyOtp.svelte";

  import {
    token,
    refreshToken,
    username,
    id,
    masters,
  } from "$appstore/store.js";
  import { browser, dev } from "$app/environment";
  import { onMount } from "svelte";

  // export let handleButtonClick;
  export let handleBackButtonClick;
  // export let personalDetails;

  export let onInput;
  export let onSubmit;
  export let alertMsg = "";
  export let errors;
  export let data;
  let dataLoaded = false;
  let district = [];
  let guardian = [];
  let occupation = [];
  let allTaluka = [];
  let verificationDetails = {};
  let current_taluka_dropdown = [];
  let permanent_taluka_dropdown = [];
  let select_marital_status = [];
  let select_education_qualification = [];
  let current_area_dropdown = [];
  let permanent_area_dropdown = [];
  let sameAsCurrent = false;

  onMount(() => {
    console.log("Data isss", data);

    verifiedDetails();
    if (browser) {
      allTaluka = [...$masters.m_taluka];
      guardian = [...$masters.m_guardian];
      district = [
        ...$masters.m_district.sort((a, b) =>
          a.eng_name.localeCompare(b.eng_name)
        ),
      ];
      select_marital_status = [...$masters.m_marital_status];
      select_education_qualification = [
        ...$masters.m_educational_qualification,
      ];
      occupation = [...$masters.m_occupation];

      current_taluka_dropdown = data.current_district
        ? allTaluka.filter((t) => t.dist_id == data.current_district)
        : [];
      permanent_taluka_dropdown = data.permanent_district
        ? allTaluka.filter((t) => t.dist_id == data.permanent_district)
        : [];

      current_area_dropdown = data.current_area
        ? ["RURAL", "URBAN"]
        : ["RURAL", "URBAN"];
      permanent_area_dropdown = data.permanent_area
        ? ["RURAL", "URBAN"]
        : ["RURAL", "URBAN"];
      console.log("district is-", district);
      console.log("tauka is ", current_taluka_dropdown);
      if (data.education_qualification && data.education_qualification > 4) {
        showQualificationDetails = true;
      }

      dataLoaded = true;
    }
    let permanent_taluka_dropdown1 = allTaluka.filter((e) => e.dist_id == data.permanent_district);
   

    if (
      data.permanent_address === data.current_address &&
      data.permanent_district === data.current_district &&
      data.permanent_taluka === data.current_taluka &&
      data.permanent_place === data.current_place &&
      data.permanent_area === data.current_area &&
      data.permanent_pincode === data.current_pincode &&
      permanent_taluka_dropdown1.length > 0
    ) {
      sameAsCurrent = true;
      toggleSameAsCurrent();
    }
  });
  let literacySelectedAnswer = "";

  let hasGivenSurety = "";
  let suretyDetails = "";
  let isMobileOpen = false;
  let isemailOpen = false;
  let isCurrentDistrictOpen = false;
  let isCurrentTalukaOpen = false;
  let isCurrentAreaOpen = false;
  let isPermanentDistrictOpen = false;
  let isPermanentTalukaOpen = false;
  let isPermanentAreaOpen = false;
  let selectedMaritalStatus = "";
  let selectedQualificationlStatus = "";
  let showQualificationDetails = false;
  let showQualificationDropdown = false;
  let showMaritalStatusDropdown = false;
  let relationshipStatus = "";
  let occupationStatus = "";
  let occupationType = "";
  let showRelationshipDropdown = false;
  let showOccupationsDropdown = false;
  let showOccupationDetails = false;
  let mobileNumber = "";
  let isValidNumber = false;

  function toggleSameAsCurrent() {
    if (sameAsCurrent) {
      data.permanent_address = data.current_address;
      data.permanent_district = data.current_district;
      data.permanent_taluka = data.current_taluka;
      data.permanent_place = data.current_place;
      data.permanent_area = data.current_area;
      data.permanent_pincode = data.current_pincode;
      permanent_taluka_dropdown = allTaluka.filter(
        (t) => t.dist_id == data.permanent_district
      );
    } else {
      data.permanent_address = "";
      data.permanent_district = "";
      data.permanent_taluka = "";
      data.permanent_place = "";
      data.permanent_area = "";
      data.permanent_pincode = "";
    }
  }

  let originalPermanentData = {
    address: "",
    district: "",
    taluka: "",
    place: "",
    pincode: "",
  };

  let otp = ["", "", "", "", "", ""];
  let emailOtp = ["", "", "", "", "", ""];

  let districts = ["Pune", "Satara", "Sangli", "Solapur", "Kolhapur"];
  let talukas = ["Haveli", "Punecity", "Maval", "Mulshi", "Shirur"];
  let maritalStatuses = [
    "Married",
    "Unmarried",
    "Divorced",
    "Widowed",
    "Separated",
  ];
  let Qualifications = [
    "8TH Pass",
    "Under 8TH",
    "10TH Pass",
    "12TH Pass",
    "Graduate",
    "Post Graduate",
    "PHD",
    "Diploma",
  ];

  let Relationships = ["Father", "Husband"];
  let Occupations = [
    "Engineer",
    "Doctor",
    "Teacher",
    "Farmer",
    "Shopkeeper",
    "Retired",
    "Other",
  ];

  function toggleMaritalDropdown() {
    showMaritalStatusDropdown = !showMaritalStatusDropdown;
  }

  function toggleQualificationDropdown() {
    showQualificationDropdown = !showQualificationDropdown;
  }

  function toggleCurrentDistrictDropdown() {
    searchQuery = "";
    isCurrentDistrictOpen = !isCurrentDistrictOpen;
  }

  function toggleCurrentTalukaDropdown() {
    isCurrentTalukaOpen = !isCurrentTalukaOpen;
  }
  function toggleCurrentAreaDropdown() {
    isCurrentAreaOpen = !isCurrentAreaOpen;
  }
  function toggleRelationDropdown() {
    showRelationshipDropdown = !showRelationshipDropdown;
  }

  function toggleOccupationDropdown() {
    showOccupationsDropdown = !showOccupationsDropdown;
  }

  function selectCurrentDistrict(district) {
    data.current_district = district.dist_id;
    data.current_taluka = 0;
    current_taluka_dropdown = data.current_district
      ? allTaluka.filter((t) => t.dist_id == data.current_district)
      : [];
    isCurrentDistrictOpen = false; // Close the dropdown after selection
    onInput("current_district");
  }

  function selectCurrentTaluka(taluka) {
    data.current_taluka = taluka.taluka_id;
    isCurrentTalukaOpen = false; // Close the dropdown after selection
    onInput("current_taluka");
  }
  function selectCurrentArea(area) {
    data.current_area = area;
    isCurrentAreaOpen = false;
    onInput("current_area");
  }

  function selectPermanentArea(area) {
    data.permanent_area = area;
    isPermanentAreaOpen = false;
    onInput("permanent_area");
  }
  function selectPermanentDistrict(district) {
    data.permanent_district = district.dist_id;
    data.permanent_taluka = 0;
    permanent_taluka_dropdown = data.permanent_district
      ? allTaluka.filter((t) => t.dist_id == data.permanent_district)
      : [];

    isPermanentDistrictOpen = false; // Close the dropdown after selection
    onInput("permanent_district");
  }

  function selectPermanentTaluka(taluka) {
    data.permanent_taluka = taluka.taluka_id;
    isPermanentTalukaOpen = false; // Close the dropdown after selection
    onInput("permanent_taluka");
  }

  function selectMaritalStatus(status) {
    data.marital_status = status.id;
    showMaritalStatusDropdown = false; // Close the dropdown after selection
    onInput("marital_status");
  }
  function selectQualification(q) {
    data.education_qualification = q.id;
    if (q.id > 4) {
      showQualificationDetails = true;
    } else {
      data.details = "";
      showQualificationDetails = false;
    }
    showQualificationDropdown = false; // Close the dropdown after selection
    onInput("education_qualification");
  }

  function selectGuardian(g) {
    data.guardian = g.id;
    showRelationshipDropdown = false; // Close the dropdown after selection
    onInput("guardian");
  }
  function selectOccupation(o) {
    data.occupation = o.id;
    if (o.id == 11) {
      showOccupationDetails = true;
    } else {
      showOccupationDetails = false;
    }
    showOccupationsDropdown = false; // Close the dropdown after selection
    onInput("occupation");
  }

  function togglePermanentDistrictDropdown() {
    searchQuery1 = "";
    isPermanentDistrictOpen = !isPermanentDistrictOpen;
  }

  function togglePermanentTalukaDropdown() {
    isPermanentTalukaOpen = !isPermanentTalukaOpen;
  }

  function togglePermanentAreaDropdown() {
    isPermanentAreaOpen = !isPermanentAreaOpen;
  }

  function handleSuretyChange(value) {
    hasGivenSurety = value;
    data.past_surety_commitment = value == "yes" ? 1 : 2;
    onInput("past_surety_commitment");
  }Select

  function handleChange(event, index) {
    const value = event.target.value;

    // Update OTP array with new value
    otp[index] = value;
    console.log("otp", otp);

    if (value.length === 1 && index < otp.length - 1) {
      // Move focus to the next input if the current one is filled
      document.querySelector(`#otp-${index + 1}`).focus();
    } else if (value.length === 0 && index > 0) {
      // Move focus to the previous input if the current one is empty
      document.querySelector(`#otp-${index - 1}`).focus();
    }
  }

  function handleChange1(event, index) {
    const value = event.target.value;

    // Update OTP array with new value
    emailOtp[index] = value;
    console.log("otp", emailOtp);

    if (value.length === 1 && index < emailOtp.length - 1) {
      // Move focus to the next input if the current one is filled
      document.querySelector(`#otp-${index + 1}`).focus();
    } else if (value.length === 0 && index > 0) {
      // Move focus to the previous input if the current one is empty
      document.querySelector(`#otp-${index - 1}`).focus();
    }
  }

  function validateMobileNumber() {
    // Check if the mobile number is exactly 10 digits
    isValidNumber = /^\d{10}$/.test(mobileNumber);
  }

  const verifiedDetails = async () => {
    try {
      let alertMsg = "";
      let url = `/termloan/api/verifiedDetails/${data.id}`;
      let response = await fetch(url, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      const { error, errorMsg, verified } = await response.json();
      if (error) {
        alertMsg = errorMsg;
        return;
      }
      console.log("error: ", error);
      console.log("errorMsg: ", errorMsg);
      console.log("verifiedDetails are: ", verified);
      verificationDetails = verified;
    } catch (e) {
      console.log("Error while fetching verified details", e);
    }
  };

  let uid = "";
  const onSendOTP = async () => {
    try {
      alertMsg = "";
      console.log("Mobile Number is ", data.mobile);

      const params = { mobileNumber: data.mobile, id: data.id };

      let url = `/termloan/api/sendOTP`;
      let response = await fetch(url.toString(), {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(params),
      });
      const { error, errorMsg, uid: luid } = await response.json();
      if (error) {
        alertMsg = errorMsg;
        return;
      }
      console.log("error: ", error);
      console.log("errorMsg: ", errorMsg);
      console.log("uid: ", luid);
      uid = luid;
    } catch (e) {
      console.log("Error while sending otp ", e);
    }
  };
  const verifyOTP = async () => {
    console.log("Otp isss", otp);
    let otpString = otp.join("");
    console.log("OTPString is ", otpString);

    alertMsg = "";

    try {
      const response = await fetch("/termloan/api/verifyOTP", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          otp: otpString,
          uid,
          mobile: data.mobile,
          dataName: "applicant",
        }),
      });
      const { error, errorMsg } = await response.json();
      if (error) {
        alertMsg = errorMsg;
        return;
      } else {
        isMobileOpen = false;
      }

      console.log("error: ", error);
      console.log("errorMsg: ", errorMsg);
      verifiedDetails();
    } catch (e) {
      console.log("Error while verifying otp ", e);
    }
  };
  let emailUid = "";
  const onSendEmailOTP = async () => {
    try {
      console.log("Mobile Number is ", data);
      alertMsg = "";
      const params = { email: data.email, id: data.id };

      let url = `/termloan/api/sendemailOTP`;
      let response = await fetch(url.toString(), {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(params),
      });
      const { error, errorMsg, uid: luid } = await response.json();
      if (error) {
        alertMsg = errorMsg;
        return;
      }
      console.log("error: ", error);
      console.log("errorMsg: ", errorMsg);
      console.log("uid: ", uid);
      emailUid = luid;
    } catch (e) {
      console.log("Error while sending otp ", e);
    }
  };
  const verifyEmailOTP = async () => {
    console.log("Otp isss", emailOtp);
    let otpString = emailOtp.join("");
    console.log("OTPString is ", uid);

    alertMsg = "";

    try {
      const response = await fetch("/termloan/api/verifyEmailOTP", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          otp: otpString,
          uid: emailUid,
          email: data.email,
          dataName: "applicant",
        }),
      });
      const { error, errorMsg } = await response.json();
      if (error) {
        alertMsg = errorMsg;
        return;
      } else {
        isemailOpen = false;
      }

      console.log("error: ", error);
      console.log("errorMsg: ", errorMsg);
      verifiedDetails();
    } catch (e) {
      console.log("Error while verifying otp ", e);
    }
  };
  let searchQuery = "";
  let filteredDistricts;
  let filteredDistricts1;

  $: filteredDistricts = district.filter(
    (d) =>
      d.eng_name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      d.dev_name.includes(searchQuery)
  );

  let searchQuery1 = "";

  $: filteredDistricts1 = district.filter(
    (d) =>
      d.eng_name.toLowerCase().includes(searchQuery1.toLowerCase()) ||
      d.dev_name.includes(searchQuery1)
  );

  let selectedOption = ""; // Default selection
</script>

{#if dataLoaded}
  <!-- {JSON.stringify(data)} -->
  <div class="grid grid-cols-12 lg:mx-10 mx-5 my-5">
    <div class="col-span-12 space-y-5">
      <div class="bg-white shadow-lg border rounded-lg pb-5">
        <div
          class="flex justify-start items-center gap-3 lg:px-10 md:px-7 px-5 md:py-5 py-3 border-b-2 border-gray-300"
        >
          <img src="/termloan/applicant.png" alt="applicant" class="md:size-10 size-7" />
          <h1
            class="xl:text-3xl lg:text-2xl md:text-xl text-lg capitalize font-bold font-roboto text-gray-700"
          >
            Applicant Personal Details :
          </h1>
        </div>
        <div
          class="grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 xl:gap-5 gap-3 py-5 xl:px-10 lg:px-7 px-5"
        >
          <div
            class="col-span-1 grid grid-cols-12 justify-start items-end xl:gap-5 gap-3"
          >
            <div class="col-span-8">
              <div class="relative">
                {#if verificationDetails?.mobile_no_applicant}
                  <input
                    type="tel"
                    id="mobile"
                    maxlength="10"
                    class="block w-full px-2.5 pb-2.5 pt-3 text-sm bg-gray-300 cursor-not-allowed text-gray-900 rounded-t-lg border-b border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                    placeholder=" "
                    value={verificationDetails.mobile_no_applicant}
                    readonly
                  />
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    class="absolute right-3 top-1/2 transform -translate-y-1/2 w-5 h-5 fill-green-500"
                    height="24px"
                    viewBox="0 -960 960 960"
                    width="24px"
                    ><path
                      d="m344-60-76-128-144-32 14-148-98-112 98-112-14-148 144-32 76-128 136 58 136-58 76 128 144 32-14 148 98 112-98 112 14 148-144 32-76 128-136-58-136 58Zm34-102 102-44 104 44 56-96 110-26-10-112 74-84-74-86 10-112-110-24-58-96-102 44-104-44-56 96-110 24 10 112-74 86 74 84-10 114 110 24 58 96Zm102-318Zm-42 142 226-226-56-58-170 170-86-84-56 56 142 142Z"
                    /></svg
                  >
                {:else}
                  <input
                    on:input={(e) => {
                      data.mobile = e.target.value;
                      onInput("mobile");
                    }}
                    type="tel"
                    id="mobile"
                    maxlength="10"
                    class="block w-full px-2.5 pb-2.5 pt-3 text-sm text-gray-900 bg-gray-50 rounded-t-lg border-b border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                    placeholder=" "
                    bind:value={data.mobile}
                  />
                {/if}
                {#if errors["mobile"]}
                  {#if errors.mobile}
                    <Helper color="red" class="absolute">
                      {errors.mobile}
                    </Helper>
                  {/if}
                {/if}
                <label
                  for="mobile"
                  class="absolute text-sm text-gray-500 duration-300 transform -translate-y-4 scale-75 top-3 z-10 origin-[0] px-2 peer-focus:px-2 peer-focus:text-blue-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-5 left-1"
                >
                  Mobile Number <span class="text-red-500">*</span>
                </label>
                {#if isValidNumber}
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 -960 960 960"
                    class="size-6 fill-green-600 absolute top-3 right-0"
                  >
                    <path
                      d="m344-60-76-128-144-32 14-148-98-112 98-112-14-148 144-32 76-128 136 58 136-58 76 128 144 32-14 148 98 112-98 112 14 148-144 32-76 128-136-58-136 58Zm34-102 102-44 104 44 56-96 110-26-10-112 74-84-74-86 10-112-110-24-58-96-102 44-104-44-56 96-110 24 10 112-74 86 74 84-10 114 110 24 58 96Zm102-318Zm-42 142 226-226-56-58-170 170-86-84-56 56 142 142Z"
                    />
                  </svg>
                {/if}
              </div>
            </div>
            <div class="col-span-4">
              {#if verificationDetails?.mobile_no_applicant}
                <button
                  on:click={() =>
                    (verificationDetails.mobile_no_applicant = "")}
                  class="relative w-full rounded xl:px-6 px-3 py-1 overflow-hidden group bg-Calypso-500 hover:bg-gradient-to-r hover:from-Cbg-Calypso-500 hover:to-Cbg-Calypso-400 text-white hover:ring-2 hover:ring-offset-2 hover:ring-Cbg-Calypso-400 transition-all ease-out duration-300"
                >
                  <span
                    class="absolute right-0 w-8 h-32 -mt-12 transition-all duration-1000 transform translate-x-12 bg-white opacity-10 rotate-12 group-hover:-translate-x-48 ease"
                  />
                  <span
                    class="relative text-white xl:text-lg text-sm font-robotoMono"
                    >Edit</span
                  >
                </button>
              {:else}
                <button
                  on:click={() => {
                    otp = ["", "", "", "", "", ""];
                    (isMobileOpen = true), onSendOTP();
                  }}
                  class="relative w-full rounded xl:px-6 px-3 py-1 overflow-hidden group bg-Calypso-500 hover:bg-gradient-to-r hover:from-Cbg-Calypso-500 hover:to-Cbg-Calypso-400 text-white hover:ring-2 hover:ring-offset-2 hover:ring-Cbg-Calypso-400 transition-all ease-out duration-300"
                >
                  <span
                    class="absolute right-0 w-8 h-32 -mt-12 transition-all duration-1000 transform translate-x-12 bg-white opacity-10 rotate-12 group-hover:-translate-x-48 ease"
                  />
                  <span
                    class="relative text-white xl:text-lg text-sm font-robotoMono"
                    >Verify</span
                  >
                </button>
              {/if}
            </div>
          </div>
          {#if isMobileOpen}
            <div
              class="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-75"
            >
              <div
                class="bg-white md:p-8 p-5 rounded-lg shadow-lg lg:w-[700px] md:w-[500px]"
              >
                <div
                  class="flex justify-between items-center border-b border-gray-300 md:pb-5 pb-3"
                >
                  <h2
                    class="md:text-xl text-lg font-semibold font-nanum text-gray-500"
                  >
                    Enter your verification code
                  </h2>
                  <button
                    on:click={() => {
                      isMobileOpen = false;
                    }}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 -960 960 960"
                      class="size-6 fill-gray-500 hover:fill-red-600"
                    >
                      <path
                        d="m256-200-56-56 224-224-224-224 56-56 224 224 224-224 56 56-224 224 224 224-56 56-224-224-224 224Z"
                      />
                    </svg>
                  </button>
                </div>
                <div class="py-5">
                  <img src="/termloan/otp1.png" alt="otplogo" class="size-28 mx-auto" />
                  <h1
                    class="md:text-2xl text-xl font-semibold font-robotoMono text-gray-500 text-center"
                  >
                    Verification code
                  </h1>
                  <h1
                    class="md:text-sm text-xs font-inter text-gray-400 text-center pb-5"
                  >
                    We have sent the verification code to Your Mobile Number
                  </h1>
                  <h1
                    class="md:text-3xl text-2xl font-robotoMono font-semibold text-Calypso-600 text-center"
                  >
                    {data.mobile}
                  </h1>
                </div>

                <div class="flex justify-center items-center space-x-4 mb-4">
                  {#each otp as value, index}
                    <input
                      type="text"
                      id={`otp-${index}`}
                      {value}
                      on:input={(event) => handleChange(event, index)}
                      class="md:size-12 size-10 text-center text-2xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                      maxlength="1"
                    />
                  {/each}
                </div>
                <div class="w-auto">
                  {#if alertMsg}
                    <AlertMsg {alertMsg} />
                  {/if}
                </div>
                <h1
                  class="text-gray-500 md:text-base text-sm font-robotoMono text-center pb-4"
                >
                  If you don't receive a code?
                  <a
                    on:click={() => {
                      otp = ["", "", "", "", "", ""];
                      onSendOTP();
                    }}
                    href="#"
                    class="hover:underline text-Calypso-700"
                  >
                    Resend
                  </a>
                </h1>

                <div
                  class="mt-5 flex justify-between lg::mx-10 md:mx-5 items-center"
                >
                  <button
                    class="bg-blue-500 md:text-base text-sm font-marvel text-white md:px-10 px-7 md:py-2 py-1.5"
                    on:click={() => {
                      isMobileOpen = false;
                    }}>CANCEL</button
                  >
                  <button
                    class="bg-blue-500 md:text-base text-sm font-marvel text-white md:px-10 px-7 md:py-2 py-1.5 uppercase"
                    on:click={() => {
                      verifyOTP();
                    }}>Submit</button
                  >
                </div>
              </div>
            </div>
          {/if}

          <div
            class="col-span-1 grid grid-cols-12 justify-start items-end xl:gap-5 gap-3"
          >
            <div class="col-span-8">
              <div class="relative">
                {#if verificationDetails?.email_id_applicant}
                  <input
                    type="text"
                    name="email"
                    id="email"
                    class="block w-full px-2.5 pb-2.5 pt-3 text-sm text-gray-900 bg-gray-50 rounded-t-lg border-b border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                    placeholder={verificationDetails.email_id_applicant}
                    value={verificationDetails.email_id_applicant}
                    readonly
                  />

                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    class="absolute right-3 top-1/2 transform -translate-y-1/2 w-5 h-5 fill-green-500"
                    height="24px"
                    viewBox="0 -960 960 960"
                    width="24px"
                    ><path
                      d="m344-60-76-128-144-32 14-148-98-112 98-112-14-148 144-32 76-128 136 58 136-58 76 128 144 32-14 148 98 112-98 112 14 148-144 32-76 128-136-58-136 58Zm34-102 102-44 104 44 56-96 110-26-10-112 74-84-74-86 10-112-110-24-58-96-102 44-104-44-56 96-110 24 10 112-74 86 74 84-10 114 110 24 58 96Zm102-318Zm-42 142 226-226-56-58-170 170-86-84-56 56 142 142Z"
                    /></svg
                  >
                {:else}
                  <input
                    on:input={(e) => {
                      data.email = e.target.value;
                      onInput("email");
                    }}
                    type="text"
                    name="email"
                    id="email"
                    class="block w-full px-2.5 pb-2.5 pt-3 text-sm text-gray-900 bg-gray-50 rounded-t-lg border-b border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                    placeholder=" "
                    bind:value={data.email}
                  />
                {/if}
                {#if errors["email"]}
                  {#if errors.email}
                    <Helper color="red" class="absolute">
                      {errors.email}
                    </Helper>
                  {/if}
                {/if}
                <label
                  for="mobile"
                  class="absolute text-sm text-gray-500 duration-300 transform -translate-y-4 scale-75 top-3 z-10 origin-[0] px-2 peer-focus:px-2 peer-focus:text-blue-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-5 left-1"
                >
                  Email ID
                </label>
              </div>
            </div>
            <div class="col-span-4">
              {#if verificationDetails?.email_id_applicant}
                <button
                  on:click={() => (verificationDetails.email_id_applicant = "")}
                  class="relative w-full rounded xl:px-6 px-3 py-1 cursor-not-allowed overflow-hidden group bg-Calypso-500 hover:bg-gradient-to-r hover:from-Cbg-Calypso-500 hover:to-Cbg-Calypso-400 text-white hover:ring-2 hover:ring-offset-2 hover:ring-Cbg-Calypso-400 transition-all ease-out duration-300"
                >
                  <span
                    class="absolute right-0 w-8 h-32 -mt-12 transition-all duration-1000 transform translate-x-12 bg-white opacity-10 rotate-12 group-hover:-translate-x-48 ease"
                  />
                  <span
                    class="relative text-white xl:text-lg text-sm font-robotoMono"
                    >Edit
                  </span>
                </button>
              {:else}
                <button
                  on:click={() => {
                    (isemailOpen = true), onSendEmailOTP();
                  }}
                  class="relative w-full rounded xl:px-6 px-3 py-1 overflow-hidden group bg-Calypso-500 hover:bg-gradient-to-r hover:from-Cbg-Calypso-500 hover:to-Cbg-Calypso-400 text-white hover:ring-2 hover:ring-offset-2 hover:ring-Cbg-Calypso-400 transition-all ease-out duration-300"
                >
                  <span
                    class="absolute right-0 w-8 h-32 -mt-12 transition-all duration-1000 transform translate-x-12 bg-white opacity-10 rotate-12 group-hover:-translate-x-48 ease"
                  />
                  <span
                    class="relative text-white xl:text-lg text-sm font-robotoMono"
                    >Verify</span
                  >
                </button>
              {/if}
            </div>
          </div>

          <!-- <div class="col-span-1">
            <label for="email" class="block text-sm font-semibold text-gray-500"
              >Email ID</label
            >
            <div class="mt-1 relative">
              <div
                class="absolute inset-y-0 left-0 px-2 flex items-center pointer-events-none border-r border-gray-300"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 -960 960 960"
                  class="size-5 fill-gray-500"
                >
                  <path
                    d="M160-160q-33 0-56.5-23.5T80-240v-480q0-33 23.5-56.5T160-800h640q33 0 56.5 23.5T880-720v480q0 33-23.5 56.5T800-160H160Zm320-280 320-200v-80L480-520 160-720v80l320 200Z"
                  />
                </svg>
              </div>
              <input
                on:input={(e) => {
                  data.email = e.target.value;
                  onInput("email");
                }}
                type="text"
                name="email"
                id="email"
                class="block w-full xl:pl-14 pl-12 pr-3 md:py-2 py-1.5 text-sm border border-gray-300 placeholder:text-gray-400 placeholder:text-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                placeholder="Enter email id..."
                bind:value={data.email}
              />
              {#if errors["email"]}
                {#if errors.email}
                  <Helper color="red" class="absolute">
                    {errors.email}
                  </Helper>
                {/if}
              {/if}
            </div>
            <button
              on:click={() => {
                (isemailOpen = true), onSendEmailOTP();
              }}
              class="relative w-full rounded xl:px-6 px-3 py-1 overflow-hidden group bg-Calypso-500 hover:bg-gradient-to-r hover:from-Cbg-Calypso-500 hover:to-Cbg-Calypso-400 text-white hover:ring-2 hover:ring-offset-2 hover:ring-Cbg-Calypso-400 transition-all ease-out duration-300"
            >
              <span
                class="absolute right-0 w-8 h-32 -mt-12 transition-all duration-1000 transform translate-x-12 bg-white opacity-10 rotate-12 group-hover:-translate-x-48 ease"
              />
              <span
                class="relative text-white xl:text-lg text-sm font-robotoMono"
                >Verify</span
              >
            </button>
          </div> -->
          {#if isemailOpen}
            <div
              class="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-75"
            >
              <div
                class="bg-white md:p-8 p-5 rounded-lg shadow-lg lg:w-[700px] md:w-[500px]"
              >
                <div
                  class="flex justify-between items-center border-b border-gray-300 md:pb-5 pb-3"
                >
                  <h2
                    class="md:text-xl text-lg font-semibold font-nanum text-gray-500"
                  >
                    Enter your verification code
                  </h2>
                  <button
                    on:click={() => {
                      isemailOpen = false;
                    }}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 -960 960 960"
                      class="size-6 fill-gray-500 hover:fill-red-600"
                    >
                      <path
                        d="m256-200-56-56 224-224-224-224 56-56 224 224 224-224 56 56-224 224 224 224-56 56-224-224-224 224Z"
                      />
                    </svg>
                  </button>
                </div>
                <div class="py-5">
                  <img src="/termloan/otp1.png" alt="otplogo" class="size-28 mx-auto" />
                  <h1
                    class="md:text-2xl text-xl font-semibold font-robotoMono text-gray-500 text-center"
                  >
                    Verification code
                  </h1>
                  <h1
                    class="md:text-sm text-xs font-inter text-gray-400 text-center pb-5"
                  >
                    We have sent the verification code to Your Email
                  </h1>
                  <h1
                    class="md:text-3xl text-2xl font-robotoMono font-semibold text-Calypso-600 text-center"
                  >
                    {data.email}
                  </h1>
                </div>

                <div class="flex justify-center items-center space-x-4 mb-4">
                  {#each emailOtp as value, index}
                    <input
                      type="text"
                      id={`otp-${index}`}
                      {value}
                      on:input={(event) => handleChange1(event, index)}
                      class="md:size-12 size-10 text-center text-2xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                      maxlength="1"
                    />
                  {/each}
                </div>
                <div class="w-auto">
                  {#if alertMsg}
                    <AlertMsg {alertMsg} />
                  {/if}
                </div>
                <h1
                  class="text-gray-500 md:text-base text-sm font-robotoMono text-center pb-4"
                >
                  If you don't receive a code?
                  <a
                    on:click={() => onSendEmailOTP()}
                    href="#"
                    class="hover:underline text-Calypso-700"
                  >
                    Resend
                  </a>
                </h1>

                <div
                  class="mt-5 flex justify-between lg::mx-10 md:mx-5 items-center"
                >
                  <button
                    class="bg-blue-500 md:text-base text-sm font-marvel text-white md:px-10 px-7 md:py-2 py-1.5"
                    on:click={() => {
                      isemailOpen = false;
                    }}>CANCEL</button
                  >
                  <button
                    class="bg-blue-500 md:text-base text-sm font-marvel text-white md:px-10 px-7 md:py-2 py-1.5 uppercase"
                    on:click={() => {
                      verifyEmailOTP();
                    }}>Submit</button
                  >
                </div>
              </div>
            </div>
          {/if}
          <div class="col-span-1">
            <label
              for="pancard"
              class="block text-sm font-semibold text-gray-500"
              >Pan card number
            </label>
            <div class="mt-1 relative">
              <div
                class="absolute inset-y-0 left-0 px-2 flex items-center pointer-events-none border-r border-gray-300"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 -960 960 960"
                  class="size-5 fill-gray-500"
                >
                  <path
                    d="M560-440h200v-80H560v80Zm0-120h200v-80H560v80ZM200-320h320v-22q0-45-44-71.5T360-440q-72 0-116 26.5T200-342v22Zm160-160q33 0 56.5-23.5T440-560q0-33-23.5-56.5T360-640q-33 0-56.5 23.5T280-560q0 33 23.5 56.5T360-480ZM160-160q-33 0-56.5-23.5T80-240v-480q0-33 23.5-56.5T160-800h640q33 0 56.5 23.5T880-720v480q0 33-23.5 56.5T800-160H160Z"
                  />
                </svg>
              </div>
              <input
                on:input={(e) => {
                  data.pan = e.target.value.toUpperCase();
                  onInput("pan");
                }}
                type="text"
                name="pancard"
                id="pancard"
                class="block w-full xl:pl-14 pl-12 pr-3 md:py-2 py-1.5 text-sm border border-gray-300 placeholder:text-gray-400 placeholder:text-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                placeholder="Enter pancard number..."
                bind:value={data.pan}
              />
              {#if errors["pan"]}
                {#if errors.pan}
                  <Helper color="red" class="absolute">
                    {errors.pan}
                  </Helper>
                {/if}
              {/if}
            </div>
          </div>
          <div class="col-span-1">
            <label
              for="rationCard"
              class="block text-sm font-semibold text-gray-500"
              >Ration Card Number <span class="text-red-500">*</span>
            </label>
            <div class="mt-1 relative">
              <div
                class="absolute inset-y-0 left-0 px-2 flex items-center pointer-events-none border-r border-gray-300"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 -960 960 960"
                  class="size-5 fill-gray-500"
                >
                  <path
                    d="M560-440h200v-80H560v80Zm0-120h200v-80H560v80ZM200-320h320v-22q0-45-44-71.5T360-440q-72 0-116 26.5T200-342v22Zm160-160q33 0 56.5-23.5T440-560q0-33-23.5-56.5T360-640q-33 0-56.5 23.5T280-560q0 33 23.5 56.5T360-480ZM160-160q-33 0-56.5-23.5T80-240v-480q0-33 23.5-56.5T160-800h640q33 0 56.5 23.5T880-720v480q0 33-23.5 56.5T800-160H160Z"
                  />
                </svg>
              </div>
              <input
                on:input={(e) => {
                  data.ration_card_number = e.target.value;
                  onInput("ration_card_number");
                }}
                type="text"
                id="rationCard"
                class="block w-full xl:pl-14 pl-12 pr-3 md:py-2 py-1.5 text-sm border border-gray-300 placeholder:text-gray-400 placeholder:text-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                placeholder="Enter ration card number..."
                bind:value={data.ration_card_number}
              />
              {#if errors["ration_card_number"]}
                {#if errors.ration_card_number}
                  <Helper color="red" class="absolute">
                    {errors.ration_card_number}
                  </Helper>
                {/if}
              {/if}
            </div>
          </div>
        </div>
        <!-- <div class="col-span-1 ml-8">
          <label for="pancard" class="block text-sm font-semibold text-gray-500"
            >Ration Card Number
          </label>
          <div class="mt-1 relative">
            <div
              class="absolute inset-y-0 left-0 px-2 flex items-center pointer-events-none border-r border-gray-300"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 -960 960 960"
                class="size-5 fill-gray-500"
              >
                <path
                  d="M560-440h200v-80H560v80Zm0-120h200v-80H560v80ZM200-320h320v-22q0-45-44-71.5T360-440q-72 0-116 26.5T200-342v22Zm160-160q33 0 56.5-23.5T440-560q0-33-23.5-56.5T360-640q-33 0-56.5 23.5T280-560q0 33 23.5 56.5T360-480ZM160-160q-33 0-56.5-23.5T80-240v-480q0-33 23.5-56.5T160-800h640q33 0 56.5 23.5T880-720v480q0 33-23.5 56.5T800-160H160Z"
                />
              </svg>
            </div>
            <input
              on:input={(e) => {
                data.ration_card_number = e.target.value;
                onInput("ration_card_number");
              }}
              type="text"
              id="rationCard"
              class="block w-80 xl:pl-14 pl-12 pr-3 md:py-2 py-1.5 text-sm border border-gray-300 placeholder:text-gray-400 placeholder:text-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
              placeholder="Enter ration card number..."
              bind:value={data.ration_card_number}
            />
            {#if errors["ration_card_number"]}
              {#if errors.ration_card_number}
                <Helper color="red" class="absolute">
                  {errors.ration_card_number}
                </Helper>
              {/if}
            {/if}
          </div>
        </div> -->
        <div class="border-b border-gray-300 p-5">
          <div class="border-b-2 border-gray-300 pb-2">
            <h1
              class="block md:text-xl text-lg capitalize font-semibold font-inter text-gray-700"
            >
              Current Address :
            </h1>
          </div>
          <div class="grid grid-cols-12 lg:gap-5 gap-3 lg:px-5 py-5">
            <div class="col-span-12">
              <label
                for="streetAddress"
                class="block text-sm font-semibold text-gray-500"
                >Current Street Address
                <span class="text-red-500">*</span>
              </label>
              <div class="mt-1 relative">
                <div
                  class="absolute inset-y-0 left-0 px-3 flex items-center pointer-events-none border-r border-gray-300"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 -960 960 960"
                    class="size-5 fill-gray-500"
                  >
                    <path
                      d="M160-120v-480l320-240 320 240v480H560v-280H400v280H160Z"
                    />
                  </svg>
                </div>
                <input
                  on:input={(e) => {
                    data.current_address = e.target.value.toUpperCase();
                    onInput("current_address");
                  }}
                  type="text"
                  id="streetAddress"
                  bind:value={data.current_address}
                  class="block w-full pl-14 pr-3 md:py-2 py-1.5 md:text-base text-sm border border-gray-300 placeholder:text-gray-400 lg:placeholder:text-base placeholder:text-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  placeholder="Enter street address ..."
                />
                {#if errors["current_address"]}
                  {#if errors.current_address}
                    <Helper color="red" class="absolute">
                      {errors.current_address}
                    </Helper>
                  {/if}
                {/if}
              </div>
            </div>
            <div class="lg:col-span-3 md:col-span-6 col-span-12">
              <label
                for="district"
                class="block text-sm font-semibold font-roboto text-gray-500 mb-1"
                >District
                <span class="text-red-500">*</span>
              </label>
              <div class="relative">
                <button
                  on:click={toggleCurrentDistrictDropdown}
                  class="flex text-sm justify-between items-center w-full px-4 md:py-2 py-1.5 bg-white border border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 text-left"
                >
                  {#if data.current_district}
                    <!-- {data.current_district} -->
                    {district.find((d) => d.dist_id == data.current_district)
                      .eng_name}
                    &nbsp; - &nbsp; {district.find(
                      (d) => d.dist_id == data.current_district
                    ).dev_name}
                  {:else}
                    <h1 class="text-gray-500">Select District</h1>
                  {/if}

                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    class="size-5 text-gray-500 {isCurrentDistrictOpen
                      ? 'rotate-180'
                      : ''}"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M19 9l-7 7-7-7"
                    />
                  </svg>
                </button>
                {#if errors.current_district}
                  <p class="text-red-500 text-xs">{errors.current_district}</p>
                {/if}
                {#if isCurrentDistrictOpen}
                  <div
                    class="absolute w-full bg-white border border-gray-300 mt-1 z-10"
                  >
                    <input
                      type="text"
                      placeholder="Search district..."
                      bind:value={searchQuery}
                      class="w-full px-4 py-2 border-b border-gray-300 focus:outline-none"
                    />

                    {#if filteredDistricts.length > 0}
                      <ul class="max-h-60 overflow-y-auto">
                        {#each filteredDistricts as d}
                          <li
                            class="px-4 py-2 cursor-pointer hover:bg-gray-100"
                            on:click={() => selectCurrentDistrict(d)}
                          >
                            {d.eng_name} - {d.dev_name}
                          </li>
                        {/each}
                      </ul>
                    {:else}
                      <p class="px-4 py-2 text-gray-500">No districts found</p>
                    {/if}
                  </div>
                {/if}
              </div>

              <!-- {#if isCurrentDistrictOpen}
                  <div
                    transition:slide={{ duration: 400 }}
                    class="absolute z-10 w-full mt-0.5 bg-white border border-gray-300"
                  >
                    {#each district as d, index}
                      <button
                        on:click={() => selectCurrentDistrict(d)}
                        class="w-full text-sm text-gray-500 font-lato px-4 py-1 text-left hover:bg-gray-100 {index !==
                        districts.length - 1
                          ? 'border-b'
                          : ''}"
                      >
                        {d.eng_name}&nbsp;&nbsp;- &nbsp;&nbsp;{d.dev_name}
                      </button>
                    {/each}
                  </div>
                {/if}
              </div> -->
            </div>

            <div class="lg:col-span-3 md:col-span-6 col-span-12">
              <label
                for="taluka"
                class="block text-sm font-semibold font-roboto text-gray-500 mb-1 capitalize"
                >taluka
                <span class="text-red-500">*</span>
              </label>
              <div class="relative">
                <button
                  on:click={toggleCurrentTalukaDropdown}
                  class="flex text-sm justify-between items-center w-full px-4 md:py-2 py-1.5 bg-white border border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 text-left"
                >
                  {#if data.current_taluka && current_taluka_dropdown}
                    <!-- {data.currentTaluka} -->
                    {current_taluka_dropdown?.find(
                      (t) => t.taluka_id == data.current_taluka
                    )?.eng_name}
                    &nbsp; - &nbsp {current_taluka_dropdown?.find(
                      (t) => t.taluka_id == data.current_taluka
                    )?.dev_name}
                  {:else}
                    <h1 class="text-gray-500">Select taluka</h1>
                  {/if}

                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    class="size-5 text-gray-500 {isCurrentTalukaOpen
                      ? 'rotate-180'
                      : ''}"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M19 9l-7 7-7-7"
                    />
                  </svg>
                </button>
                {#if errors["current_taluka"]}
                  {#if errors.current_taluka}
                    <Helper color="red" class="absolute">
                      {errors.current_taluka}
                    </Helper>
                  {/if}
                {/if}

                {#if isCurrentTalukaOpen}
                  <div
                    transition:slide={{ duration: 400 }}
                    class="absolute z-10 w-full mt-0.5 bg-white border border-gray-300"
                  >
                    {#each current_taluka_dropdown as t, index}
                      <button
                        on:click={() => selectCurrentTaluka(t)}
                        class="w-full text-sm text-gray-500 font-lato px-4 py-1 text-left hover:bg-gray-100 {index !==
                        talukas.length - 1
                          ? 'border-b'
                          : ''}"
                      >
                        {t.eng_name} &nbsp;-&nbsp;{t.dev_name}
                      </button>
                    {/each}
                  </div>
                {/if}
              </div>
            </div>
            <div class="lg:col-span-3 md:col-span-6 col-span-12">
              <label
                for="city"
                class="block text-sm font-semibold font-roboto text-gray-500"
                >Place

                <span class="text-red-500">*</span></label
              >
              <div class="mt-1">
                <input
                  on:input={(e) => {
                    data.current_place = e.target.value.toUpperCase();
                    onInput("current_place");
                  }}
                  type="text"
                  id="city"
                  bind:value={data.current_place}
                  class="block w-full px-4 md:py-2 py-1.5 border border-gray-300 placeholder:text-gray-400 lg:placeholder:text-base placeholder:text-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  placeholder="Enter place..."
                />
                {#if errors["current_place"]}
                  {#if errors.current_place}
                    <Helper color="red" class="absolute">
                      {errors.current_place}
                    </Helper>
                  {/if}
                {/if}
              </div>
            </div>
            <div class="lg:col-span-3 md:col-span-6 col-span-12">
              <label
                for="taluka"
                class="block text-sm font-semibold font-roboto text-gray-500 mb-1 capitalize"
                >Area
                <span class="text-red-500">*</span>
              </label>
              <div class="relative">
                <button
                  on:click={toggleCurrentAreaDropdown}
                  class="flex text-sm justify-between items-center w-full px-4 md:py-2 py-1.5 bg-white border border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 text-left"
                >
                  {#if data.current_area && current_area_dropdown}
                    <!-- {data.currentTaluka} -->
                    {data.current_area}
                    <!-- &nbsp; - &nbsp {current_taluka_dropdown?.find(
                      (t) => t.taluka_id == data.current_taluka
                    )?.dev_name} -->
                  {:else}
                    <h1 class="text-gray-500">Select Area</h1>
                  {/if}

                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    class="size-5 text-gray-500 {isCurrentAreaOpen
                      ? 'rotate-180'
                      : ''}"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M19 9l-7 7-7-7"
                    />
                  </svg>
                </button>
                {#if errors["current_area"]}
                  {#if errors.current_area}
                    <Helper color="red" class="absolute">
                      {errors.current_area}
                    </Helper>
                  {/if}
                {/if}

                {#if isCurrentAreaOpen}
                  <div
                    transition:slide={{ duration: 400 }}
                    class="absolute z-10 w-full mt-0.5 bg-white border border-gray-300"
                  >
                    {#each current_area_dropdown as t, index}
                      <button
                        on:click={() => selectCurrentArea(t)}
                        class="w-full text-sm text-gray-500 font-lato px-4 py-1 text-left hover:bg-gray-100 {index !==
                        talukas.length - 1
                          ? 'border-b'
                          : ''}"
                      >
                        {t}
                      </button>
                    {/each}
                  </div>
                {/if}
              </div>
            </div>
            <div class="lg:col-span-3 md:col-span-6 col-span-12">
              <label
                for="pinCode"
                class="block text-sm font-semibold font-roboto text-gray-500"
                >Pin Code
                <span class="text-red-500">*</span>
              </label>
              <div class="mt-1">
                <input
                  on:input={(e) => {
                    data.current_pincode = e.target.value;
                    onInput("current_pincode");
                  }}
                  type="text"
                  id="pinCode"
                  bind:value={data.current_pincode}
                  class="block w-full px-4 md:py-2 py-1.5 border border-gray-300 placeholder:text-gray-400 lg:placeholder:text-base placeholder:text-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  placeholder="Enter pincode..."
                />
                {#if errors["current_pincode"]}
                  {#if errors.current_pincode}
                    <Helper color="red" class="absolute">
                      {errors.current_pincode}
                    </Helper>
                  {/if}
                {/if}
              </div>
            </div>
          </div>
        </div>

        <div class="border-b border-gray-300 p-5">
          <div
            class="flex justify-normal md:items-center items-start gap-2 mb-5"
          >
            <label class="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                bind:checked={sameAsCurrent}
                on:change={toggleSameAsCurrent}
                class="cursor-pointer md:mt-0 mt-1.5"
              />
              <h1 class="block text-gray-600 font-roboto text-sm">
                Is your current address the same as your permanent address?
              </h1>
            </label>
          </div>

          <!-- <div
            class="flex justify-normal md:items-center items-start gap-2 mb-5"
          >
            <input
              type="checkbox"
              bind:checked={sameAsCurrent}
              on:change={toggleSameAsCurrent}
              class="cursor-pointer md:mt-0 mt-1.5"
            />
           
              <h1 class="block text-gray-600 font-roboto text-sm"
              >
                Is your current address the same as your permanent address?
              </h1>
            
          </div> -->
          <div class="border-b-2 border-gray-300 pb-2">
            <h1
              class="block md:text-xl text-lg capitalize font-semibold font-inter text-gray-600"
            >
              Permanent Address :
            </h1>
          </div>
          <div class="grid grid-cols-12 lg:gap-5 gap-3 lg:px-5 py-5">
            <div class="col-span-12">
              <label
                for="streetAddress1"
                class="block text-sm font-semibold text-gray-500"
                >Permanent Street Address
              </label>
              <div class="mt-1 relative">
                <div
                  class="absolute inset-y-0 left-0 px-3 flex items-center pointer-events-none border-r border-gray-300"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 -960 960 960"
                    class="size-5 fill-gray-500"
                  >
                    <path
                      d="M160-120v-480l320-240 320 240v480H560v-280H400v280H160Z"
                    />
                  </svg>
                </div>
                <input
                  on:input={(e) => {
                    data.permanent_address = e.target.value;
                    onInput("permanent_address");
                  }}
                  type="text"
                  id="streetAddress"
                  bind:value={data.permanent_address}
                  disabled={sameAsCurrent}
                  class="block w-full pl-14 pr-3 md:py-2 py-1.5 text-sm border border-gray-300 placeholder:text-gray-400 placeholder:text-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  placeholder="Enter street address ..."
                />
                {#if errors["permanent_address"]}
                  {#if errors.permanent_address}
                    <Helper color="red" class="absolute">
                      {errors.permanent_address}
                    </Helper>
                  {/if}
                {/if}
              </div>
            </div>

            <div class="lg:col-span-3 md:col-span-6 col-span-12">
              <label
                for="district"
                class="block text-sm font-semibold font-roboto text-gray-500 mb-1"
                >District
                <span class="text-red-500">*</span>
              </label>
              <div class="relative">
                <button
                  on:click={togglePermanentDistrictDropdown}
                  disabled={sameAsCurrent}
                  class="flex text-sm justify-between items-center w-full px-4 md:py-2 py-1.5 bg-white border border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 text-left"
                >
                  {#if data.permanent_district}
                    {district.find((d) => d.dist_id == data.permanent_district)
                      .eng_name} &nbsp;-&nbsp; {district.find(
                      (d) => d.dist_id == data.permanent_district
                    ).dev_name}
                  {:else}
                    <h1 class="text-gray-500">Select District</h1>
                  {/if}
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    class="size-5 text-gray-500 {isPermanentDistrictOpen
                      ? 'rotate-180'
                      : ''}"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M19 9l-7 7-7-7"
                    />
                  </svg>
                </button>
                {#if errors["permanent_district"]}
                  {#if errors.permanent_district}
                    <Helper color="red" class="absolute">
                      {errors.permanent_district}
                    </Helper>
                  {/if}
                {/if}
                {#if isPermanentDistrictOpen}
                  <div
                    class="absolute w-full bg-white border border-gray-300 mt-1 z-10"
                  >
                    <input
                      type="text"
                      placeholder="Search district..."
                      bind:value={searchQuery1}
                      class="w-full px-4 py-2 border-b border-gray-300 focus:outline-none"
                    />

                    {#if filteredDistricts1.length > 0}
                      <ul class="max-h-60 overflow-y-auto">
                        {#each filteredDistricts1 as d}
                          <li
                            class="px-4 py-2 cursor-pointer hover:bg-gray-100"
                            on:click={() => selectPermanentDistrict(d)}
                          >
                            {d.eng_name} - {d.dev_name}
                          </li>
                        {/each}
                      </ul>
                    {:else}
                      <p class="px-4 py-2 text-gray-500">No districts found</p>
                    {/if}
                  </div>
                {/if}
              </div>
            </div>
            <div class="lg:col-span-3 md:col-span-6 col-span-12">
              <label
                for="taluka"
                class="block text-sm font-semibold font-roboto text-gray-500 mb-1 capitalize"
                >taluka
                <span class="text-red-500">*</span>
              </label>
              <div class="relative">
                <button
                  on:click={togglePermanentTalukaDropdown}
                  disabled={sameAsCurrent}
                  class="flex text-sm justify-between items-center w-full px-4 md:py-2 py-1.5 bg-white border border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 text-left"
                >
                  {#if data.permanent_taluka && permanent_taluka_dropdown.length}
                    {permanent_taluka_dropdown.find(
                      (t) => t.taluka_id == data.permanent_taluka
                    ).eng_name} &nbsp;-&nbsp; {permanent_taluka_dropdown.find(
                      (t) => t.taluka_id == data.permanent_taluka
                    ).dev_name}
                  {:else}
                    <h1 class="text-gray-500">Select taluka</h1>
                  {/if}
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    class="size-5 text-gray-500 {isPermanentTalukaOpen
                      ? 'rotate-180'
                      : ''}"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M19 9l-7 7-7-7"
                    />
                  </svg>
                </button>
                {#if errors["permanent_taluka"]}
                  {#if errors.permanent_taluka}
                    <Helper color="red" class="absolute">
                      {errors.permanent_taluka}
                    </Helper>
                  {/if}
                {/if}

                {#if isPermanentTalukaOpen}
                  <div
                    transition:slide={{ duration: 400 }}
                    class="absolute z-10 w-full mt-0.5 bg-white border border-gray-300"
                  >
                    {#each permanent_taluka_dropdown as t, index}
                      <button
                        on:click={() => selectPermanentTaluka(t)}
                        class="w-full text-sm text-gray-500 font-lato px-4 py-1 text-left hover:bg-gray-100 {index !==
                        talukas.length - 1
                          ? 'border-b'
                          : ''}"
                      >
                        {t.eng_name}&nbsp;-&nbsp;{t.dev_name}
                      </button>
                    {/each}
                  </div>
                {/if}
              </div>
            </div>
            <div class="lg:col-span-3 md:col-span-6 col-span-12">
              <label
                for="city"
                class="block text-sm font-semibold font-roboto text-gray-500"
                >Place
                <span class="text-red-500">*</span>
              </label>
              <div class="mt-1">
                <input
                  on:input={(e) => {
                    data.permanent_place = e.target.value.toUpperCase();
                    onInput("permanent_pincode");
                  }}
                  type="text"
                  id="city"
                  bind:value={data.permanent_place}
                  disabled={sameAsCurrent}
                  class="block w-full px-4 md:py-2 py-1.5 border border-gray-300 placeholder:text-gray-400 placeholder:text-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  placeholder="Enter city..."
                />
                {#if errors["permanent_pincode"]}
                  {#if errors.permanent_place}
                    <Helper color="red" class="absolute">
                      {errors.permanent_place}
                    </Helper>
                  {/if}
                {/if}
              </div>
            </div>
            <div class="lg:col-span-3 md:col-span-6 col-span-12">
              <label
                for="taluka"
                class="block text-sm font-semibold font-roboto text-gray-500 mb-1 capitalize"
                >Area
                <span class="text-red-500">*</span>
              </label>
              <div class="relative">
                <button
                  on:click={togglePermanentAreaDropdown}
                  disabled={sameAsCurrent}
                  class="flex text-sm justify-between items-center w-full px-4 md:py-2 py-1.5 bg-white border border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 text-left"
                >
                  {#if data.permanent_area && permanent_area_dropdown.length}
                    {data.permanent_area}
                  {:else}
                    <h1 class="text-gray-500">Select Area</h1>
                  {/if}
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    class="size-5 text-gray-500 {isPermanentAreaOpen
                      ? 'rotate-180'
                      : ''}"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M19 9l-7 7-7-7"
                    />
                  </svg>
                </button>
                {#if errors["permanent_area"]}
                  {#if errors.permanent_area}
                    <Helper color="red" class="absolute">
                      {errors.permanent_area}
                    </Helper>
                  {/if}
                {/if}

                {#if isPermanentAreaOpen}
                  <div
                    transition:slide={{ duration: 400 }}
                    class="absolute z-10 w-full mt-0.5 bg-white border border-gray-300"
                  >
                    {#each permanent_area_dropdown as t, index}
                      <button
                        on:click={() => selectPermanentArea(t)}
                        class="w-full text-sm text-gray-500 font-lato px-4 py-1 text-left hover:bg-gray-100 {index !==
                        talukas.length - 1
                          ? 'border-b'
                          : ''}"
                      >
                        {t}
                      </button>
                    {/each}
                  </div>
                {/if}
              </div>
            </div>
            <div class="lg:col-span-3 md:col-span-6 col-span-12">
              <label
                for="pinCode"
                class="block text-sm font-semibold font-roboto text-gray-500"
                >Pin Code
                <span class="text-red-500">*</span>
              </label>
              <div class="mt-1">
                <input
                  on:input={(e) => {
                    data.permanent_pincode = e.target.value;
                    onInput("permanent_pincode");
                  }}
                  type="text"
                  id="pinCode"
                  bind:value={data.permanent_pincode}
                  disabled={sameAsCurrent}
                  class="block w-full px-4 md:py-2 py-1.5 border border-gray-300 placeholder:text-gray-400 placeholder:text-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  placeholder="Enter pincode..."
                />
                {#if errors["permanent_pincode"]}
                  {#if errors.permanent_pincode}
                    <Helper color="red" class="absolute">
                      {errors.permanent_pincode}
                    </Helper>
                  {/if}
                {/if}
              </div>
            </div>
          </div>
        </div>

        <div class="grid grid-cols-12 gap-5 px-5 py-5">
          <div class="col-span-12 border-b-2 border-gray-300 pb-2">
            <h1
              class="block md:text-xl text-lg capitalize font-semibold font-inter text-gray-700"
            >
              Life & Education Details :
            </h1>
          </div>

          <div class="lg:col-span-4 col-span-12 lg:px-5">
            <div class="grid grid-cols-12 justify-start items-center">
              <div class="lg:col-span-12 md:col-span-5 col-span-12">
                <h1
                  class="block text-sm font-semibold font-roboto text-gray-500"
                >
                  Select Marital Status <span class="text-red-500">*</span>
                </h1>
              </div>
              <div class="lg:hidden md:block hidden col-span-1">:</div>
              <div
                class="col-span-12 md:col-span-6 lg:col-span-12 relative w-full mt-1"
              >
                <button
                  class="flex text-sm justify-between items-center w-full px-4 md:py-2 py-1.5 bg-white border border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 text-left"
                  on:click={toggleMaritalDropdown}
                >
                  <!-- {selectedMaritalStatus || "-- Select a status --"} -->
                  {#if data.marital_status}
                    {select_marital_status.find(
                      (e) => e.id == data.marital_status
                    ).eng_name}&nbsp;-&nbsp;{select_marital_status.find(
                      (e) => e.id == data.marital_status
                    ).dev_name}
                  {:else}
                    <h1 class="text-gray-500">Select status</h1>
                  {/if}
                  <div>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 -960 960 960"
                      class="size-4 md:size-5 fill-gray-500 {showMaritalStatusDropdown
                        ? '-rotate-90'
                        : 'rotate-90'}"
                    >
                      <path
                        d="m321-80-71-71 329-329-329-329 71-71 400 400L321-80Z"
                      />
                    </svg>
                  </div>
                </button>
                {#if errors["marital_status"]}
                  {#if errors.marital_status}
                    <Helper color="red" class="absolute">
                      {errors.marital_status}
                    </Helper>
                  {/if}
                {/if}
                {#if showMaritalStatusDropdown}
                  <div
                    transition:slide={{ duration: 400 }}
                    class="absolute z-10 w-full mt-0.5 bg-white border border-gray-300"
                  >
                    {#each select_marital_status as s, index}
                      <button
                        on:click={() => selectMaritalStatus(s)}
                        class="w-full text-sm text-gray-500 font-lato px-4 py-1 text-left hover:bg-gray-100 {index !==
                        maritalStatuses.length - 1
                          ? 'border-b'
                          : ''}"
                      >
                        {s.eng_name}&nbsp;-&nbsp;{s.dev_name}
                      </button>
                    {/each}
                  </div>
                {/if}
              </div>
            </div>
          </div>
          <div class="lg:col-span-4 col-span-12 xl:px-5">
            <div class="grid grid-cols-12 justify-start items-center">
              <div class="col-span-12 md:col-span-5 lg:col-span-12">
                <h1
                  class="block text-sm font-semibold font-roboto text-gray-500"
                >
                  Educational Qualifications <span class="text-red-500">*</span>
                </h1>
              </div>
              <div class="lg:hidden md:block hidden col-span-1">:</div>

              <div
                class="col-span-12 md:col-span-6 lg:col-span-12 relative w-full mt-1"
              >
                <button
                  class="flex text-sm justify-between items-center w-full px-4 md:py-2 py-1.5 bg-white border border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 text-left"
                  on:click={toggleQualificationDropdown}
                >
                  <!-- {selectedQualificationlStatus || "-- Select a qualification --"} -->
                  {#if data.education_qualification}
                    {select_education_qualification.find(
                      (e) => e.id == data.education_qualification
                    )
                      .eng_name}&nbsp;-&nbsp;{select_education_qualification.find(
                      (e) => e.id == data.education_qualification
                    ).dev_name}
                  {:else}
                    <h1 class="text-gray-500">Select status</h1>
                  {/if}
                  <div>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 -960 960 960"
                      class="size-4 md:size-5 fill-gray-500 {showQualificationDropdown
                        ? '-rotate-90'
                        : 'rotate-90'}"
                    >
                      <path
                        d="m321-80-71-71 329-329-329-329 71-71 400 400L321-80Z"
                      />
                    </svg>
                  </div>
                </button>
                {#if errors["education_qualification"]}
                  {#if errors.education_qualification}
                    <Helper color="red" class="absolute">
                      {errors.education_qualification}
                    </Helper>
                  {/if}
                {/if}
                {#if showQualificationDropdown}
                  <div
                    transition:slide={{ duration: 400 }}
                    class="absolute z-10 w-full mt-0.5 bg-white border border-gray-300"
                  >
                    {#each select_education_qualification as q, index}
                      <button
                        class="w-full capitalize text-sm text-gray-500 font-lato px-4 py-1 text-left hover:bg-gray-100 {index !==
                        Qualifications.length - 1
                          ? 'border-b'
                          : ''}"
                        on:click={() => selectQualification(q)}
                      >
                        {q.eng_name}&nbsp-&nbsp{q.dev_name}
                      </button>
                    {/each}
                  </div>
                {/if}
              </div>
            </div>
          </div>

          {#if data.education_qualification == "1"}
            <div
              class="col-span-12 flex justify-start items-start gap-5 lg:px-5"
            >
              <div class="grid justify-start items-center">
                <p class="lg:text-base text-sm text-gray-600 font-roboto">
                  Are you at least literate ?
                </p>

                <p
                  class="block md:text-[13px] text-[10px] text-gray-500 font-marathi2"
                >
                  तुम्ही किमान साक्षर आहात का?
                </p>
              </div>
              <div class="flex items-center">
                <label class="flex items-center mr-4">
                  <input
                    on:input={(e) => {
                      data.literate = e.target.value;
                      onInput("literate");
                    }}
                    type="radio"
                    name="literacy"
                    value={1}
                    checked={data.literate == 1 ? true : false}
                    bind:group={data.literate}
                    class="form-radio text-blue-600 border-gray-300 focus:ring-blue-500"
                  />
                  <span
                    class="ml-2 text-gray-700 md:text-base text-sm font-marvel font-medium"
                    >Yes</span
                  >
                </label>
                <label class="flex items-center">
                  <input
                    on:input={(e) => {
                      data.literate = e.target.value;
                      onInput("literate");
                    }}
                    type="radio"
                    name="literacy"
                    value={2}
                    checked={data.literate == 2 ? true : false}
                    bind:group={data.literate}
                    class="form-radio text-blue-600 border-gray-300 focus:ring-blue-500"
                  />
                  <span
                    class="ml-2 text-gray-700 md:text-base text-sm font-marvel font-medium"
                    >No</span
                  >
                </label>
                <div class="ml-4">
                  {#if errors.literate}
                    <p class="text-red-500">{errors.literate}</p>
                  {/if}
                </div>
              </div>
            </div>
          {/if}
          {#if showQualificationDetails}
            <div class="lg:col-span-4 col-span-12 xl:px-5">
              <div class="grid grid-cols-12 justify-start items-center">
                <div class="lg:col-span-12 md:col-span-5 col-span-12">
                  <h1
                    class="block text-sm font-semibold font-roboto text-gray-500"
                  >
                    Enter Details
                  </h1>
                </div>
                <div class="lg:hidden md:block hidden col-span-1">:</div>
                <div
                  class="col-span-12 md:col-span-6 lg:col-span-12 relative w-full mt-1"
                >
                  <div
                    class="absolute inset-y-0 left-0 px-3 flex items-center pointer-events-none border-r border-gray-300"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 -960 960 960"
                      class="size-5 fill-gray-500"
                    >
                      <path
                        d="M480-120 200-272v-240L40-600l440-240 440 240v320h-80v-276l-80 44v240L480-120Zm0-332 274-148-274-148-274 148 274 148Zm0 241 200-108v-151L480-360 280-470v151l200 108Zm0-241Zm0 90Zm0 0Z"
                      />
                    </svg>
                  </div>
                  <input
                    type="text"
                    id="qualification"
                    class="block w-full pl-14 pr-3 md:py-2 py-1.5 border border-gray-300 placeholder:text-gray-400 placeholder:text-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    placeholder="Enter qualification details ..."
                    bind:value={data.details}
                  />
                </div>
              </div>
            </div>
          {/if}
        </div>

        <div class="grid grid-cols-4 gap-5 p-5 border-b border-gray-300">
          <div class="col-span-4">
            <label
              for="name"
              class="block md:text-xl text-lg font-semibold font-inter text-gray-700 border-b-2 border-gray-300 pb-2"
            >
              Occupation of Father/Husband :
            </label>
            <div class="grid grid-cols-12 gap-5 lg:px-5 py-5">
              <div class="col-span-12 md:col-span-6 lg:col-span-3">
                <label
                  for="relation"
                  class="block text-sm font-semibold font-roboto text-gray-500"
                >
                  Select Father/Husband <span class="text-red-500">*</span>
                </label>
                <div class="mt-1 relative w-full">
                  <button
                    class="flex text-sm justify-between items-center w-full px-4 md:py-2 py-1.5 bg-white border border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 text-left"
                    on:click={toggleRelationDropdown}
                  >
                    <!-- {relationshipStatus || "Select Father/Husband"} -->
                    {#if data.guardian}
                      {guardian.find((e) => e.id == data.guardian)
                        .eng_name}&nbsp;-&nbsp;{guardian.find(
                        (e) => e.id == data.guardian
                      ).dev_name}
                    {:else}
                      <h1 class="text-gray-500">Select status</h1>
                    {/if}
                    <div>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 -960 960 960"
                        class="size-4 lg:size-5 fill-gray-500 {showRelationshipDropdown
                          ? '-rotate-90'
                          : 'rotate-90'}"
                      >
                        <path
                          d="m321-80-71-71 329-329-329-329 71-71 400 400L321-80Z"
                        />
                      </svg>
                    </div>
                  </button>
                  {#if errors["guardian"]}
                    {#if errors.guardian}
                      <Helper color="red" class="absolute">
                        {errors.guardian}
                      </Helper>
                    {/if}
                  {/if}
                  {#if showRelationshipDropdown}
                    <div
                      transition:slide={{ duration: 400 }}
                      class="absolute z-10 w-full mt-0.5 bg-white border border-gray-300"
                    >
                      {#each guardian as g, index}
                        <button
                          class="w-full capitalize text-sm text-gray-500 font-lato px-4 py-1 text-left hover:bg-gray-100 {index !==
                          Relationships.length - 1
                            ? 'border-b'
                            : ''}"
                          on:click={() => selectGuardian(g)}
                        >
                          {g.eng_name}&nbsp;-&nbsp;&nbsp;{g.dev_name}
                        </button>
                      {/each}
                    </div>
                  {/if}
                </div>
              </div>
              {#if data.guardian}
                <div class="col-span-12 lg:col-span-4 md:col-span-6">
                  <label
                    for="occupation"
                    class="block text-sm font-semibold font-roboto text-gray-500"
                  >
                    Select Father/Husband (s) Occupation <span
                      class="text-red-500">*</span
                    >
                  </label>
                  <div class="mt-1 relative w-full">
                    <button
                      class="flex text-sm justify-between items-center w-full px-4 md:py-2 py-1.5 bg-white border border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 text-left"
                      on:click={toggleOccupationDropdown}
                    >
                      <!-- {occupationStatus || "Select Occupation"} -->
                      {#if data.occupation}
                        {occupation.find((o) => o.id == data.occupation)
                          .eng_name}&nbsp;&nbsp;-&nbsp;&nbsp;{occupation.find(
                          (o) => o.id == data.occupation
                        ).dev_name}
                      {:else}
                        <h1 class="text-gray-500">Select occupation</h1>
                      {/if}
                      <div>
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 -960 960 960"
                          class="size-4 lg:size-5 fill-gray-500 {showOccupationsDropdown
                            ? '-rotate-90'
                            : 'rotate-90'}"
                        >
                          <path
                            d="m321-80-71-71 329-329-329-329 71-71 400 400L321-80Z"
                          />
                        </svg>
                      </div>
                    </button>
                    {#if errors["occupation"]}
                      {#if errors.occupation}
                        <Helper color="red" class="absolute">
                          {errors.occupation}
                        </Helper>
                      {/if}
                    {/if}
                    {#if showOccupationsDropdown}
                      <div
                        transition:slide={{ duration: 400 }}
                        class="absolute z-10 w-full mt-0.5 bg-white border border-gray-300"
                      >
                        {#each occupation as o, index}
                          <button
                            class="w-full capitalize text-sm text-gray-500 font-lato px-4 py-1 text-left hover:bg-gray-100 {index !==
                            occupation.length - 1
                              ? 'border-b'
                              : ''}"
                            on:click={() => selectOccupation(o)}
                          >
                            {o.eng_name}&nbsp;&nbsp;-&nbsp;&nbsp;{o.dev_name}
                          </button>
                        {/each}
                      </div>
                    {/if}
                  </div>
                </div>
              {/if}
              {#if showOccupationDetails}
                <div class="col-span-12 md:col-span-6 lg:col-span-3">
                  <label
                    for="occupation"
                    class="block text-sm font-semibold font-roboto text-gray-500"
                  >
                    Enter Type of Occupation
                  </label>
                  <div class="mt-1 relative">
                    <div
                      class="absolute inset-y-0 left-0 px-2 flex items-center pointer-events-none border-r border-gray-300"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 -960 960 960"
                        class="size-4 fill-gray-500"
                      >
                        <path
                          d="M160-120q-33 0-56.5-23.5T80-200v-440q0-33 23.5-56.5T160-720h160v-80q0-33 23.5-56.5T400-880h160q33 0 56.5 23.5T640-800v80h160q33 0 56.5 23.5T880-640v440q0 33-23.5 56.5T800-120H160Zm240-600h160v-80H400v80Z"
                        />
                      </svg>
                    </div>
                    <input
                      type="text"
                      name="occupation"
                      id="occupation"
                      class="block w-full pl-[42px] pr-3 md:py-2 py-1.5 text-sm border border-gray-300 placeholder:text-sm placeholder:text-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                      placeholder="Enter occupationType of father/husband..."
                      bind:value={data.occupationtype}
                    />
                  </div>
                </div>
              {/if}
              <div class="col-span-12 md:col-span-6 lg:col-span-3">
                <label
                  for="fullName"
                  class="block text-sm font-semibold font-roboto text-gray-500"
                  >Annual Income of Family <span class="text-red-500">*</span>
                </label>
                <div class="mt-1 relative">
                  <div
                    class="absolute inset-y-0 left-0 px-2 flex items-center pointer-events-none border-r border-gray-300"
                  >
                    <svg
                      viewBox="-96 0 512 512"
                      xmlns="http://www.w3.org/2000/svg"
                      class="size-4 fill-gray-500"
                    >
                      <g id="SVGRepo_bgCarrier" stroke-width="0" /><g
                        id="SVGRepo_tracerCarrier"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      />
                      <g id="SVGRepo_iconCarrier">
                        <path
                          d="M308 96c6.627 0 12-5.373 12-12V44c0-6.627-5.373-12-12-12H12C5.373 32 0 37.373 0 44v44.748c0 6.627 5.373 12 12 12h85.28c27.308 0 48.261 9.958 60.97 27.252H12c-6.627 0-12 5.373-12 12v40c0 6.627 5.373 12 12 12h158.757c-6.217 36.086-32.961 58.632-74.757 58.632H12c-6.627 0-12 5.373-12 12v53.012c0 3.349 1.4 6.546 3.861 8.818l165.052 152.356a12.001 12.001 0 0 0 8.139 3.182h82.562c10.924 0 16.166-13.408 8.139-20.818L116.871 319.906c76.499-2.34 131.144-53.395 138.318-127.906H308c6.627 0 12-5.373 12-12v-40c0-6.627-5.373-12-12-12h-58.69c-3.486-11.541-8.28-22.246-14.252-32H308z"
                        />
                      </g>
                    </svg>
                  </div>
                  <input
                    on:input={(e) => {
                      data.income = e.target.value;
                      onInput("income");
                    }}
                    type="text"
                    name="annual income"
                    id="annual income"
                    class="block w-full pl-[42px] pr-3 md:py-2 py-1.5 text-sm border border-gray-300 placeholder:text-sm placeholder:text-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                    placeholder="Enter annual income of family..."
                    bind:value={data.income}
                  />
                  {#if errors["income"]}
                    {#if errors.income}
                      <Helper color="red" class="absolute">
                        {errors.income}
                      </Helper>
                    {/if}
                  {/if}
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="px-5 py-5">
          <div class="grid grid-cols-12 gap-5 justify-start items-center">
            <div class="xl:col-span-6 md:col-span-9 col-span-12">
              <h1 class="lg:text-base text-sm text-gray-600 font-roboto">
                Has the applicant or guarantor previously provided surety for
                anyone else?
              </h1>
              <label
                for="suretyDetails"
                class="block md:text-[13px] text-[10px] text-gray-500 font-robotoMono"
                >(If yes, please provide details)</label
              >
            </div>
            <div
              class="md:col-span-3 xl:col-span-2 col-span-4 flex items-center gap-5"
            >
              {#if data.past_surety_commitment == 1}
                <button
                  type="button"
                  class={`bg-blue-700 text-white w-full border border-gray-500 md:text-sm text-xs font-bold md:px-4 px-5 py-1`}
                  on:click={() => handleSuretyChange("yes")}
                >
                  Yes
                </button>

                <button
                  type="button"
                  class={`bg-white text-gray-700  w-full border border-gray-500 md:text-sm text-xs font-bold md:px-4 px-5 py-1`}
                  on:click={() => handleSuretyChange("no")}
                >
                  No
                </button>
              {:else if data.past_surety_commitment == 2}
                <button
                  type="button"
                  class={`bg-white text-gray-700  w-full border border-gray-500 md:text-sm text-xs font-bold md:px-4 px-5 py-1`}
                  on:click={() => handleSuretyChange("yes")}
                >
                  Yes
                </button>

                <button
                  type="button"
                  class={`bg-blue-700 text-white w-full border border-gray-500 md:text-sm text-xs font-bold md:px-4 px-5 py-1`}
                  on:click={() => handleSuretyChange("no")}
                >
                  No
                </button>
              {:else}
                <button
                  type="button"
                  class={`bg-white text-gray-700  w-full border border-gray-500 md:text-sm text-xs font-bold md:px-4 px-5 py-1`}
                  on:click={() => handleSuretyChange("yes")}
                >
                  Yes
                </button>

                <button
                  type="button"
                  class={`bg-white text-gray-700  w-full border border-gray-500 md:text-sm text-xs font-bold md:px-4 px-5 py-1`}
                  on:click={() => handleSuretyChange("no")}
                >
                  No
                </button>
              {/if}
                 <div class="mt-5">
              {#if errors["past_surety_commitment"]}
                {#if errors.past_surety_commitment}
                  <Helper color="red" class="absolute">
                    {errors.past_surety_commitment}
                  </Helper>
                {/if}
              {/if}
            </div>
            </div>
         
            {#if hasGivenSurety == "yes"}
              <div class="xl:col-span-5 md:col-span-9 col-span-12">
                <input
                  type="text"
                  id="suretyDetails"
                  name="suretyDetails"
                  bind:value={data.past_surety_commitment_detail}
                  class="block w-full px-3 py-2 border border-gray-300 placeholder:text-xs placeholder:text-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  placeholder="Enter details here..."
                />
              </div>
            {/if}
          </div>
          <!-- <div
            class="grid grid-cols-12 md:gap-5 gap-3 justify-start items-center"
          >
            <div class="xl:col-span-6 col-span-12">
              <h1 class="lg:text-base text-sm text-gray-600 font-roboto">
                Is the applicant a Riot victim/Natural calamity victim/Disabled
                person?
              </h1>
            </div>
            <div
              class="xl:col-span-6 col-span-12 md:flex grid items-center md:gap-5 gap-2"
            >
              <div class="flex items-center space-x-2">
                <input
                  type="checkbox"
                  checked={data.riot_victim == 1 ? true : false}
                  on:change={() =>
                    (data.riot_victim = data.riot_victim == 1 ? 2 : 1)}
                  id="riotVictim"
                  class="form-checkbox size-4 lg:size-5 text-blue-600"
                />
                <label
                  for="riotVictim"
                  class="lg:text-base text-sm text-gray-600 font-roboto"
                  >Riot victim</label
                >
              </div>
              <div class="flex items-center space-x-2">
                <input
                  type="checkbox"
                  checked={data.natural_calamity_victim == 1 ? true : false}
                  on:change={() =>
                    (data.natural_calamity_victim =
                      data.natural_calamity_victim == 1 ? 2 : 1)}
                  id="naturalCalamityVictim"
                  class="form-checkbox size-4 lg:size-5 text-blue-600"
                />
                <label
                  for="naturalCalamityVictim"
                  class="lg:text-base text-sm text-gray-600 font-roboto"
                  >Natural calamity victim</label
                >
              </div>
              <div class="flex items-center space-x-2">
                <input
                  type="checkbox"
                  checked={data.disabled_person == 1 ? true : false}
                  on:change={() =>
                    (data.disabled_person = data.disabled_person == 1 ? 2 : 1)}
                  id="disabledPerson"
                  class="form-checkbox size-4 lg:size-5 text-blue-600"
                />
                <label
                  for="disabledPerson"
                  class="lg:text-base text-sm text-gray-600 font-roboto"
                  >Disabled person</label
                >
              </div>
            </div>
          </div> -->
        </div>
        <div class="grid justify-start items-center gap-3 px-5">
          <h1 class="lg:text-base text-sm text-gray-600 font-roboto">
            Who will be providing the collateral for the loan <span
              class="text-red-600">*</span
            >
          </h1>

          <!-- <div class="flex space-x-4">
          <label class="inline-flex items-center text-lg">
            <input
              type="radio"
              class="form-radio text-blue-600"
              name="option"
              value="Yes"
              bind:group={selectedOption}
            />
            <span class="ml-2">The Applicant</span>
          </label>
    
          <label class="inline-flex items-center text-lg">
            <input
              type="radio"
              class="form-radio text-blue-600"
              name="option"
              value="No"
              bind:group={selectedOption}
            />
            <span class="ml-2">The Guarantor</span>
          </label>
        </div> -->

          <div class="flex space-x-4">
            <label class="inline-flex items-center text-lg">
              <input
                on:input={(e) => {
                      data.guarantor = e.target.value;
                      onInput("guarantor");
                    }}
                type="radio"
                class="form-radio text-blue-600 border-gray-300 focus:ring-blue-500"
                name="option"
                value={1}
                bind:group={selectedOption}
                on:change={() => (data.guarantor = 2)}
              />
              <span
                class="ml-2 text-gray-700 md:text-base text-sm font-marvel font-medium"
                >The Applicant</span
              >
            </label>

            <label class="inline-flex items-center text-lg">
              <input
               on:input={(e) => {
                      data.guarantor = e.target.value;
                      onInput("guarantor");
                    }}
                type="radio"
                class="form-radio text-blue-600 border-gray-300 focus:ring-blue-500"
                name="option"
                value={2}
                bind:group={selectedOption}
                on:change={() => (data.guarantor = 1)}
              />
              <span
                class="ml-2 text-gray-700 md:text-base text-sm font-marvel font-medium"
                >The Guarantor</span
              >
            </label>
          </div>
        </div>
        <div class="ml-4">
{#if errors["guarantor"]}
            {#if errors.guarantor}
              <Helper color="red" class="absolute">
                {errors.guarantor}
              </Helper>
            {/if}
          {/if}
        </div>
         
      </div>
    </div>
  </div>

  <div class="w-auto">
    {#if alertMsg}
      <AlertMsg {alertMsg} />
    {/if}
  </div>
  <div class="flex justify-center items-center py-5 gap-4">
    <button
      on:click={() => handleBackButtonClick()}
      class="group relative flex items-center justify-center gap-3 border border-gray-300 md:w-[200px] w-[150px] py-2 overflow-hidden bg-Calypso-400"
    >
      <span
        class="absolute w-0 h-0 transition-all duration-500 ease-out bg-Calypso-500 group-hover:w-[300px] group-hover:h-56"
      />
      <span class="absolute inset-0 w-full h-full opacity-30" />

      <span class="relative">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke-width="1.5"
          stroke="currentColor"
          class="size-6"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            d="M6.75 15.75 3 12m0 0 3.75-3.75M3 12h18"
          />
        </svg>
      </span>
      <button
        class="relative font-roboto capitalize font-semibold lg:text-xl md:text-base text-sm text-gray-800 group-hover:text-white"
      >
        Back
      </button>
    </button>

    <!-- on:click={() => handleButtonClick("Business_Banking")} -->
    <button
      class="group relative flex items-center justify-center gap-3 border border-gray-300 md:w-[200px] w-[150px] py-2 overflow-hidden bg-Calypso-400"
      on:click={(e) => {
        if (!verificationDetails.mobile_no_applicant) {
          alertMsg = "Your mobile number is not verified";
          return;
        }
        onSubmit(e);
      }}
    >
      <span
        class="absolute w-0 h-0 transition-all duration-500 ease-out bg-Calypso-500 group-hover:w-[300px] group-hover:h-56"
      />
      <span class="absolute inset-0 w-full h-full opacity-30" />

      <div
        class="relative font-roboto capitalize font-semibold lg:text-xl md:text-base text-sm text-gray-800 group-hover:text-white"
      >
        Proceed
      </div>
      <span class="relative">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 -960 960 960"
          class="size-6 fill-gray-800 group-hover:fill-white"
        >
          <path
            d="m700-300-57-56 84-84H120v-80h607l-83-84 57-56 179 180-180 180Z"
          />
          _
        </svg>
      </span>
    </button>
  </div>
{:else}
  ...Loading
{/if}
