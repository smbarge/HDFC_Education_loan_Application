<script>
  import { goto } from "$app/navigation";
  import { slide } from "svelte/transition";
  import { api } from "$api/api";
  import { browser } from "$app/environment";
  import { Alert } from "flowbite-svelte";
  import { InfoCircleSolid } from "flowbite-svelte-icons";

  import {
    token,
    refreshToken,
    username,
    applications,
    given_name,
    preferred_username,
    masters,
  } from "$appstore/store";
  import { onMount } from "svelte";
  import Applications from "../../component/finalDashboard/Applications.svelte";
  import {
    Table,
    TableBody,
    TableBodyCell,
    TableBodyRow,
    TableHead,
    TableHeadCell,
  } from "flowbite-svelte";
  import VerificationStepBar from "../../component/VerificationStepBar.svelte";
  import ApplicationStatus from "$lib/finalDashboard/ApplicationStatus.svelte";

  let documentMaster = $masters.m_upload_documents;

  let validApplications = [];
  let dataLoaded = false;

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
    concent_for_aadhar_verification: 0,
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
    loan_amount: 0.0, // Default: 0.00 (numeric(15,2))
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
    past_surety_commitment_detail: "", // Default: "" (string)
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
          contacts: [],
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
  let alertMsg;
  let answerArray = [];
  onMount(async () => {
    {
      console.log("in onmount");
      if (!browser) return;

      const { error, errorMsg, masters: lMasters } = await api.getMasters();
      if (error) {
        console.log("error in masters: ", error);
        alertMsg = errorMsg;
        return;
      }
      $masters = { ...lMasters };
      console.log("masters is:", $masters);
    }
    let {
      error,
      errorMsg,
      applications: lApplications,
    } = await api.getApplications();
    $applications = [...lApplications];

    lApplications = initApplications(lApplications);
    console.log("error: ", error);
    console.log("errorMsg: ", errorMsg);
    console.log("applications: ", lApplications);
    $applications = lApplications;

    validApplications = lApplications.filter((a) => {
      if (a.personalDetails.id) return true;
      return false;
    });

    {
      let { error, errorMsg, iteration, application_id, status, answers } =
        await api.getAnswers({
          application_id: lApplications[0].personalDetails.id,
          status: lApplications[0].personalDetails.verification_status,
        });
      console.log(
        "answers",
        answers,
        "Statuss",
        lApplications[0].personalDetails.verification_status
      );
      if (answerArray.length) {
        answerArray = answers.filter((e) => e.answer == "2");
      }
      answerArray = answers?.filter(
        (e) =>
          e.answer == "2" && ![146, 147, 148, 149, 150].includes(e.question_id)
      );
    }
    dataLoaded = true;
  });

  const onDocumentsUpload = () => {
    goto("/termloan/trial");
  };

  const onNewApplication = () => {
    goto("/termloan/termLoan");
  };
  // validApplications = [...validApplications, validApplications[0]];

  // let selectedButton = "application status";
  let selectedButton = "dashboard";
  let applicationDetailsOpen = false;
  let sidebarMenuOpen = false;
  // Variable to control the visibility of the table

  $: sidebarMenu = [
    {
      name: "dashboard",
      disabled: false,
      icon: "M120-520v-320h320v320H120Zm0 400v-320h320v320H120Zm400-400v-320h320v320H520Zm0 400v-320h320v320H520ZM200-600h160v-160H200v160Zm400 0h160v-160H600v160Zm0 400h160v-160H600v160Zm-400 0h160v-160H200v160Zm400-400Zm0 240Zm-240 0Zm0-240Z",
    },
    {
      name: "application status", 
      disabled: validApplications.length == 0,
      icon: "M120-120v-80l80-80v160h-80Zm160 0v-240l80-80v320h-80Zm160 0v-320l80 81v239h-80Zm160 0v-239l80-80v319h-80Zm160 0v-400l80-80v480h-80ZM120-327v-113l280-280 160 160 280-280v113L560-447 400-607 120-327Z",
    },
    // {
    //   name: "My loans",
    //   icon: "M120-120v-80l80-80v160h-80Zm160 0v-240l80-80v320h-80Zm160 0v-320l80 81v239h-80Zm160 0v-239l80-80v319h-80Zm160 0v-400l80-80v480h-80ZM120-327v-113l280-280 160 160 280-280v113L560-447 400-607 120-327Z",
    // },
    // {
    //   name: "change password",
    //   icon: "M240-640h360v-80q0-50-35-85t-85-35q-50 0-85 35t-35 85h-80q0-83 58.5-141.5T480-920q83 0 141.5 58.5T680-720v80h40q33 0 56.5 23.5T800-560v400q0 33-23.5 56.5T720-80H240q-33 0-56.5-23.5T160-160v-400q0-33 23.5-56.5T240-640Zm0 480h480v-400H240v400Zm240-120q33 0 56.5-23.5T560-360q0-33-23.5-56.5T480-440q-33 0-56.5 23.5T400-360q0 33 23.5 56.5T480-280ZM240-160v-400 400Z",
    // },
    // {
    //   name: "request for affidavit",
    //   icon: "M240-80q-50 0-85-35t-35-85v-120h120v-560l60 60 60-60 60 60 60-60 60 60 60-60 60 60 60-60 60 60 60-60v680q0 50-35 85t-85 35H240Zm480-80q17 0 28.5-11.5T760-200v-560H320v440h360v120q0 17 11.5 28.5T720-160ZM360-600v-80h240v80H360Zm0 120v-80h240v80H360Zm320-120q-17 0-28.5-11.5T640-640q0-17 11.5-28.5T680-680q17 0 28.5 11.5T720-640q0 17-11.5 28.5T680-600Zm0 120q-17 0-28.5-11.5T640-520q0-17 11.5-28.5T680-560q17 0 28.5 11.5T720-520q0 17-11.5 28.5T680-480ZM240-160h360v-80H200v40q0 17 11.5 28.5T240-160Zm-40 0v-80 80Z",
    // },
  ];

  let ApplicantStatus = [
    {
      id: "1",
      activity: "Applicant Registration",
      status: "done",
      applicationDate: "14/08/2024",
    },
    {
      id: "2",
      activity: "Application Form Fillup",
      status: "pending",
      applicationDate: "",
    },
    {
      id: "3",
      activity: "Upload Supporting Documents",
      status: "pending",
      applicationDate: "",
    },
    {
      id: "4",
      activity: "Application Submission Status",
      status: "pending",
      applicationDate: "",
    },
  ];

  let loanDetails = [
    {
      applicationDate: "14/08/2024",
      businessName: "Amir Khan Enterprises",
      appliedLoanAmount: "₹12,00,000",
      approvedLoanAmount: "₹8,00,000",
      status: "Pending", // Options: Approved, Pending, Rejected, Totally Paid
      isPaid: false, // Indicates whether the loan is fully paid
    },
    {
      applicationDate: "23/11/2013",
      businessName: "Amir Khan Enterprises",
      appliedLoanAmount: "₹15,00,000",
      approvedLoanAmount: "₹10,00,000",
      status: "Approved", // Options: Approved, Pending, Rejected, Totally Paid
      isPaid: true, // Indicates whether the loan is fully paid
    },
  ];

  let steps = [
    {
      name: "Aadhar Verification",
      status: "completed",
    },
    { name: "Personal Details", status: "completed" },
    { name: "Business Details", status: "completed" },
    {
      name: "Guarantor Personal Details",
      status: "completed",
    },
    { name: "Investments", status: "completed" },
    {
      name: "Upload Of Documents",
      status: "to be done by applicant",
    },
  ];

  async function logoutKeycloakUser() {
    const url =
      "https://keycloak.chanakyasoft.com/realms/fat/protocol/openid-connect/logout";

    const params = new URLSearchParams();
    params.append("client_id", clientId);
    // params.append("client_secret", clientSecret);
    console.log("refresh token is--", $refreshToken);
    params.append("refresh_token", $refreshToken);

    try {
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body: params,
      });

      if (response.ok) {
        console.log("Logout successful");
      } else {
        console.error("Logout failed", response.status);
      }
      goto("/termloan/");
    } catch (error) {
      console.error("An error occurred during logout:", error);
    }
  }

  // Example usage:
  const clientId = "loan_application"; // Replace with your client ID
  // const clientSecret = "your-client-secret"; // Replace with your client secret

  // function selectButton(button) {
  //   selectedButton = button;
  //   if (button === "application") {
  //     applicationDetailsOpen = !applicationDetailsOpen;
  //   } else {
  //     applicationDetailsOpen = false;
  //   }
  // }

  // Handler for changing the active page
  function selectButton(page) {
    selectedButton = page;
    sidebarMenuOpen = false;
  }

  function togglesidebarMenu() {
    sidebarMenuOpen = !sidebarMenuOpen;
  }

  function getStatusClass(status) {
    if (status === "Totally Paid") {
      return "bg-blue-100 text-blue-700";
    } else if (status === "Approved") {
      return "bg-green-100 text-green-700";
    } else if (status === "Pending") {
      return "bg-yellow-100 text-yellow-700";
    } else {
      return "bg-red-100 text-red-700";
    }
  }

  // Function to handle the download button click
  function openPDF(pdfUrl) {
    window.open(pdfUrl, "_blank"); // Open the PDF in a new tab
  }
</script>

<!-- <div>
  <pre>
  {JSON.stringify(validApplications, null, 2)}
</pre>
</div> -->
{#if dataLoaded}
  <!-- <pre>
  {JSON.stringify($applications, null, 2)}
</pre> -->

  <pre>
 <!-- this is answerArray: {JSON.stringify(answerArray, null, 2)} -->
</pre>
  <div class="min-h-screen">
    <div class="grid grid-cols-12 border-b-2">
      <div
        class="hidden col-span-3 border-r-2 bg-deepPurple-300 md:flex justify-start items-center"
      >
        <div
          class="flex justify-stretch items-center gap-3 py-3 xl:py-5 lg:px-7 px-5"
        >
          <img
            src="/termloan/MaulanaAzad.jpg"
            alt="mainLogo"
            class="xl:size-10 lg:size-8 size-6 shadow-lg"
          />
          <h1
            class="text-white xl:text-2xl lg:text-xl text-base font-bold uppercase"
          >
            Mamfdc
          </h1>
        </div>
      </div>
      <div class="md:col-span-9 col-span-12 bg-deepPurple-300">
        <div
          class="flex justify-between items-center lg:px-7 px-3 py-4 xl:py-6"
        >
          <div class="flex justify-start items-center md:gap-3 gap-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 -960 960 960"
              class="xl:size-7 lg:size-6 size-5 fill-white"
            >
              <path
                d="M320-360h320v-22q0-45-44-71.5T480-480q-72 0-116 26.5T320-382v22Zm160-160q33 0 56.5-23.5T560-600q0-33-23.5-56.5T480-680q-33 0-56.5 23.5T400-600q0 33 23.5 56.5T480-520ZM320-120v-80H160q-33 0-56.5-23.5T80-280v-480q0-33 23.5-56.5T160-840h640q33 0 56.5 23.5T880-760v480q0 33-23.5 56.5T800-200H640v80H320ZM160-280h640v-480H160v480Zm0 0v-480 480Z"
              />
            </svg>
            <h1
              class="text-white xl:text-2xl lg:text-xl md:text-base text-sm capitalize font-roboto font-semibold"
            >
              applicant profile system
            </h1>
          </div>
          <div class="lg:hidden flex justify-start items-center gap-2.5">
            <img
              src="/termloan/userNew.jpg"
              alt="user"
              class="md:size-6 size-5 rounded-full"
            />
            <div class="grid justify-start items-center">
              <h1
                class="text-white md:text-xs text-[10px] font-robotoMono capitalize"
              >
                welcome,
              </h1>
              <h1
                class="text-white md:text-xs text-[10px] font-semibold font-roboto capitalize"
              >
                {$given_name}
              </h1>
            </div>
            <button on:click={logoutKeycloakUser}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 -960 960 960"
                class="md:size-6 size-5 fill-white hover:fill-rose-500"
              >
                <path
                  d="M200-120q-33 0-56.5-23.5T120-200v-560q0-33 23.5-56.5T200-840h280v80H200v560h280v80H200Zm440-160-55-58 102-102H360v-80h327L585-622l55-58 200 200-200 200Z"
                />
              </svg>
            </button>
          </div>
          <button
            on:click={logoutKeycloakUser}
            class="hidden lg:flex justify-start items-center gap-1 bg-purple-600 p-2 rounded-md hover:bg-purple-500"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 -960 960 960"
              class="size-5 xl:size-6 fill-white"
            >
              <path
                d="M200-120q-33 0-56.5-23.5T120-200v-560q0-33 23.5-56.5T200-840h280v80H200v560h280v80H200Zm440-160-55-58 102-102H360v-80h327L585-622l55-58 200 200-200 200Z"
              />
            </svg>
            <h1
              class="text-white text-lg font-bold xl:text-lg capitalize font-roboto"
            >
              logout
            </h1>
          </button>
        </div>
      </div>
    </div>
    <div class="grid grid-cols-12">
      <div
        class="lg:hidden block col-span-12 bg-purple-200 border-b border-purple-500"
      >
        <!-- Hamburger Icon -->
        <button
          class="col-span-12 text-gray-800 focus:outline-none flex justify-end items-center md:px-7 px-4 w-full py-2"
          on:click={togglesidebarMenu}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 -960 960 960"
            class="size-7 fill-gray-600"
          >
            <path
              d="M120-240v-80h720v80H120Zm0-200v-80h720v80H120Zm0-200v-80h720v80H120Z"
            />
          </svg>
        </button>
        {#if sidebarMenuOpen}
          <div
            transition:slide={{ duration: 500 }}
            class="col-span-12 w-full grid grid-cols-1 md:flex justify-start items-center md:gap-2 md:px-5 md:py-2 border-t border-purple-500"
          >
            {#each sidebarMenu as menu}
            {#if !menu.disabled}
              <button
                on:click={() => selectButton(menu.name)}
                class="col-span-1 w-full flex md:justify-center justify-start items-center gap-5 px-7 py-2 hover:border-r-4 border-rose-400
      {selectedButton === menu.name
                  ? 'bg-deepPurple-500'
                  : 'hover:bg-deepPurple-200 bg-deepPurple-300'}"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 -960 960 960"
                  class="size-5 fill-white"
                >
                  <path d={menu.icon} />
                </svg>
                <h1
                  class="text-white xl:text-lg text-base capitalize font-roboto"
                >
                  {menu.name}
                </h1>
              </button>
            {/if}
            {/each}
          </div>
        {/if}
      </div>

      <div class="hidden lg:block col-span-3 bg-deepPurple-300 min-h-screen">
        <div class="flex justify-start items-center gap-3 px-7 py-3">
          <img
            src="/termloan/userNew.jpg"
            alt="user"
            class="size-10 rounded-full"
          />
          <div>
            <h1 class="text-white text-base font-robotoMono capitalize">
              welcome,
            </h1>
            <h1 class="text-white text-xl font-semibold font-roboto capitalize">
              {$given_name}
            </h1>
          </div>
        </div>
        <div class="w-full col-span-3 mt-5">
          {#each sidebarMenu as menu}
          {#if !menu.disabled}
            <button
              on:click={() => selectButton(menu.name)}
              class="w-full flex justify-start items-center gap-5 px-7 py-2 hover:border-r-4 border-rose-400
            {selectedButton === menu.name
                ? 'bg-deepPurple-500 text-white border-r-4 border-rose-400'
                : 'hover:bg-deepPurple-200 text-white'}
            "
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 -960 960 960"
                class="size-5 fill-white"
              >
                <path d={menu.icon} />
              </svg>
              <h1
                class="text-white xl:text-lg text-base capitalize font-roboto"
              >
                {menu.name}
              </h1>
            </button>
            {/if}
          {/each}
        </div>
      </div>
      <div class="lg:col-span-9 col-span-12 xl:px-7 px-5 py-7">
        {#if selectedButton === "dashboard"}
          <div
            class="flex justify-between items-center bg-deepPurple-400 py-2 md:px-7 px-5 mb-3"
          >
            <h1
              class="md:text-xl text-base font-semibold font-roboto uppercase text-white"
            >
              DASHBOARD
            </h1>
            {#if validApplications.length == 0}
              <button
                class="text-white font-semibold bg-Calypso-500 py-2 px-3 rounded"
                on:click={onNewApplication}
              >
                + New Application
              </button>
            {:else}
              <div></div>
            {/if}
          </div>
          <Applications applications={validApplications} masters={$masters}
          ></Applications>
        {:else if selectedButton === "application status"}
          <ApplicationStatus
            {onDocumentsUpload}
            application={validApplications[0]}
            {steps}
            {documentMaster}
            {answerArray}
          ></ApplicationStatus>
        {:else if selectedButton === "My loans"}
          <div class="bg-deepPurple-400 py-2 md:px-7 px-5 mb-3">
            <h1
              class="md:text-xl text-base font-semibold font-roboto uppercase text-white"
            >
              {selectedButton}
            </h1>
          </div>
          <div class="border-b border-gray-300 pb-3">
            <h1 class="text-xl text-gray-600 font-roboto font-semibold">
              Previous Term Loan Details
            </h1>
          </div>
          <div class="border border-gray-300 shadow-md mt-4">
            <div
              class="grid grid-cols-12 justify-center items-center py-1.5 border-b border-gray-300 bg-gray-100"
            >
              <div
                class="col-span-2 text-xs uppercase text-center text-gray-500 font-marvel font-semibold"
              >
                Created On
              </div>

              <div
                class="col-span-4 text-xs uppercase text-center text-gray-500 font-marvel font-semibold"
              >
                business name
              </div>
              <div
                class="col-span-2 text-xs uppercase text-center text-gray-500 font-marvel font-semibold"
              >
                applied amount
              </div>
              <div
                class="col-span-2 text-xs uppercase text-center text-gray-500 font-marvel font-semibold"
              >
                approved amt.
              </div>
              <div
                class="col-span-2 text-xs uppercase text-center text-gray-500 font-marvel font-semibold"
              >
                Status
              </div>
            </div>
            {#each loanDetails as loan}
              <div
                class="grid grid-cols-12 justify-center items-center py-2 border-b border-gray-300 hover:bg-gray-50"
              >
                <div
                  class="col-span-2 text-xs capitalize text-center text-gray-500 font-inter"
                >
                  {loan.applicationDate}
                </div>

                <div
                  class="col-span-4 text-xs capitalize text-center text-gray-500 font-inter"
                >
                  {loan.businessName}
                </div>
                <div
                  class="col-span-2 text-xs capitalize text-center text-gray-500 font-inter"
                >
                  {loan.appliedLoanAmount}
                </div>
                <div
                  class="col-span-2 text-xs capitalize text-center text-gray-500 font-inter"
                >
                  {loan.approvedLoanAmount}
                </div>
                <div
                  class="col-span-2 text-xs capitalize text-center font-inter"
                >
                  <span
                    class={`px-3 py-1  rounded-full ${getStatusClass(
                      loan.isPaid ? "Totally Paid" : loan.status
                    )}`}
                  >
                    {loan.isPaid ? "Totally Paid" : loan.status}
                  </span>
                </div>
              </div>
            {/each}
          </div>
        {:else if selectedButton === "change password"}
          <div class="bg-deepPurple-400 py-2 md:px-7 px-5 mb-3">
            <h1
              class="md:text-xl text-base font-semibold font-roboto uppercase text-white"
            >
              {selectedButton}
            </h1>
          </div>
          <div>this is change password page</div>
        {:else if selectedButton === "request for affidavit"}
          <div class="bg-deepPurple-400 py-2 md:py-3 md:px-7 px-5 mb-3">
            <h1
              class="md:text-xl text-base font-semibold font-roboto uppercase text-white"
            >
              {selectedButton}
            </h1>
          </div>
          <div
            class="grid grid-cols-2 justify-center items-center gap-10 mt-16 mx-10"
          >
            <div
              class="relative border-b-4 border-morpankhi shadow-lg rounded-lg bg-gray-100 p-5"
            >
              <div
                class="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2 p-4 rounded-full bg-Calypso-400"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 -960 960 960"
                  class="size-10 fill-white"
                >
                  <path
                    d="M480-480q-66 0-113-47t-47-113q0-66 47-113t113-47q66 0 113 47t47 113q0 66-47 113t-113 47ZM160-160v-112q0-34 17.5-62.5T224-378q62-31 126-46.5T480-440q66 0 130 15.5T736-378q29 15 46.5 43.5T800-272v112H160Z"
                  />
                </svg>
              </div>
              <div class="grid justify-center items-center gap-3 mt-12">
                <h1
                  class="text-center font-josefin text-xl font-semibold text-slate-700"
                >
                  For the Applicant (अर्जदारासाठी)
                </h1>
                <p class="text-center font-marvel text-base text-gray-500">
                  टर्म लोन शपथपत्र म्हणजे अर्जदाराने आपल्या आर्थिक तपशीलांची आणि
                  कर्जाच्या अटींची पुष्टी करणारे एक कायदेशीर विधान, जे
                  कर्जदाराला त्यांच्या पुनर्भरण क्षमतेची खात्री देते.
                </p>

                <button
                  on:click={() => openPDF("/termloan/blank.pdf")}
                  class="relative mx-auto mt-3 rounded px-5 py-2.5 overflow-hidden group bg-Calypso-500 hover:bg-gradient-to-r hover:from-Calypso-500 hover:to-Calypso-400 text-white hover:ring-2 hover:ring-offset-2 hover:ring-Calypso-400 transition-all ease-out duration-300"
                >
                  <span
                    class="absolute right-0 w-8 h-32 -mt-12 transition-all duration-1000 transform translate-x-12 bg-white opacity-10 rotate-12 group-hover:-translate-x-40 ease"
                  ></span>
                  <span class="relative">Download</span>
                </button>
              </div>
            </div>
            <div
              class="relative border-b-4 border-morpankhi shadow-lg rounded-lg bg-gray-100 p-5"
            >
              <div
                class="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2 p-4 rounded-full bg-Calypso-400"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 -960 960 960"
                  class="size-10 fill-white"
                >
                  <path
                    d="M480-480q-66 0-113-47t-47-113q0-66 47-113t113-47q66 0 113 47t47 113q0 66-47 113t-113 47ZM160-160v-112q0-34 17.5-62.5T224-378q62-31 126-46.5T480-440q66 0 130 15.5T736-378q29 15 46.5 43.5T800-272v112H160Z"
                  />
                </svg>
              </div>
              <div class="grid justify-center items-center gap-3 mt-12">
                <h1
                  class="text-center font-josefin text-xl font-semibold text-slate-700"
                >
                  For the Guarantor (गारंटरसाठी):
                </h1>
                <p class="text-center font-marvel text-base text-gray-500">
                  टर्म लोन शपथपत्र म्हणजे गारंटरने अर्जदार असफल झाल्यास कर्ज
                  परतफेड करण्यास सहमत होण्याचे एक कायदेशीर दस्तऐवज, जो कर्जाच्या
                  अटी आणि जबाबदाऱ्या समजून घेतल्याची पुष्टी करतो.
                </p>

                <button
                  on:click={() => openPDF("/termloan/blank.pdf")}
                  class="relative mx-auto mt-3 rounded px-5 py-2.5 overflow-hidden group bg-Calypso-500 hover:bg-gradient-to-r hover:from-Calypso-500 hover:to-Calypso-400 text-white hover:ring-2 hover:ring-offset-2 hover:ring-Calypso-400 transition-all ease-out duration-300"
                >
                  <span
                    class="absolute right-0 w-8 h-32 -mt-12 transition-all duration-1000 transform translate-x-12 bg-white opacity-10 rotate-12 group-hover:-translate-x-40 ease"
                  ></span>
                  <span class="relative">Download</span>
                </button>
              </div>
            </div>
          </div>
        {/if}
      </div>
    </div>
  </div>
{:else}
  ...Loading
{/if}
