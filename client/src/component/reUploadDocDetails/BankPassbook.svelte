<script>
  import { api } from "$api/api";
  import { createEventDispatcher, onMount } from "svelte";
  export let application;
  export let documentsUrl;
  export let fileIsAvalable;
  const dispatch = createEventDispatcher();
  let passbookDetails = {};
  let details;
  let disableButton = false;
   const fileUrl = import.meta.env.VITE_FILE_URL;
  let url = `${fileUrl}${documentsUrl}`;
  console.log("file Url isss", url);
  const init = async () => {

    let {
      error,
      errorMsg,
      details: ldetails,
    } = await api.getAadharDetails({
      application_id: application.personalDetails.id,
    });
    details = ldetails;
    console.log("details", details);

    if (details.find((e) => e.field_name == "account_number")?.value) {
      passbookDetails = {
        account_number: details.find((e) => e.field_name == "account_number")
          ?.value,
        bank_name: details.find((e) => e.field_name == "bank_name")?.value,
        ifsc_code: details.find((e) => e.field_name == "ifsc_code")?.value,
        branch_name: details.find((e) => e.field_name == "branch_name")?.value,
        bank_address: details.find((e) => e.field_name == "bank_address")
          ?.value,
      };
    } else {
      passbookDetails = {
        account_number: application.businessDetails.account_number,
        bank_name: application.businessDetails.bank_name,
        ifsc_code: application.businessDetails.ifsc_code,
        branch_name: application.businessDetails.branch_name,
        bank_address: application.businessDetails.bank_address,
      };
    }
  };

  onMount(async () => {
    await init();
  });
  let data = {};

  let misMatchDetails = {};
  function areDetailsEqual(passbookDetails, businessDetails) {
    console.log("deatails", details);

    if (details.find((e) => e.field_name == "account_number")?.value) {
      //  for (const key in passbookDetails) {
      if (
        passbookDetails["account_number"] !==
        details.find((e) => e.field_name == "account_number")?.value
      ) {
        return false; // Return false if any value is different
      }
      if (
        passbookDetails["bank_name"] !==
        details.find((e) => e.field_name == "bank_name")?.value
      ) {
        return false; // Return false if any value is different
      }

      if (
        passbookDetails["ifsc_code"] !==
        details.find((e) => e.field_name == "ifsc_code")?.value
      ) {
        return false; // Return false if any value is different
      }

      if (
        passbookDetails["branch_name"] !==
        details.find((e) => e.field_name == "branch_name")?.value
      ) {
        return false; // Return false if any value is different
      }
      if (
        passbookDetails["bank_address"] !==
        details.find((e) => e.field_name == "bank_address")?.value
      ) {
        return false; // Return false if any value is different
      }
      return true;
      // }
    } else {
      for (const key in passbookDetails) {
        if (passbookDetails[key] !== businessDetails[key]) {
          return false; // Return false if any value is different
        }
      }
      return true; // Return true if all values match
    }
  }
let saveMessage=""
  const onSubmit = async () => {
    try {
      console.log("aadhardDetails", passbookDetails);
      const isEqual = areDetailsEqual(
        passbookDetails,
        application.businessDetails
      );

      console.log("isEqual is", isEqual);
      if (isEqual) {
        return;
      }
      disableButton = true;
      console.log("mismatch", misMatchDetails);
      let { error, errorMsg } = await api.saveReuploadDocsData({
        application_id: application.businessDetails.id,
        iteration: 1,
        tableName: "business_details",
        data: passbookDetails,
      });
      saveMessage = "Data Save Successfully!";
    setTimeout(()=> {
      saveMessage=""
    },3000)

      await init();
      disableButton = false;
    } catch (e) {
      console.log("error in onSubmit", e);
    }
  };
</script>

<div
  class="border border-gray-300 rounded-xl shadow-lg p-6 w-full mt-5 bg-white"
>
  <div class="flex flex-col lg:flex-row gap-8">
    <div class="flex-1">
      <button
        class="group relative flex items-center gap-4 w-full py-4 px-5 border-b-2 border-Calypso-500"
      >
        <h1 class="text-xl font-semibold text-left text-Calypso-500">
          1. Applicant Bank Passbook Details
        </h1>
      </button>

      <div class="mt-6">
        <div class="grid grid-cols-1 sm:grid-cols-1 gap-6">
          <div>
            <label
              for="responseInput1"
              class="block text-lg font-medium text-gray-700"
              >Account Number</label
            >
            <input
              id="responseInput1"
              type="text"
              bind:value={passbookDetails.account_number}
              class="border border-gray-300 rounded-lg w-full p-3 mt-2 focus:ring-2 focus:ring-Calypso-500 focus:border-Calypso-500"
              placeholder="Enter account number"
            />
          </div>

          <div>
            <label
              for="responseInput2"
              class="block text-lg font-medium text-gray-700">Bank Name</label
            >
            <input
              id="responseInput2"
              type="text"
              bind:value={passbookDetails.bank_name}
              class="border border-gray-300 rounded-lg w-full p-3 mt-2 focus:ring-2 focus:ring-Calypso-500 focus:border-Calypso-500"
              placeholder="Enter bank name"
            />
          </div>

          <div>
            <label
              for="responseInput3"
              class="block text-lg font-medium text-gray-700">IFSC Code</label
            >
            <input
              id="responseInput3"
              type="text"
              bind:value={passbookDetails.ifsc_code}
              class="border border-gray-300 rounded-lg w-full p-3 mt-2 focus:ring-2 focus:ring-Calypso-500 focus:border-Calypso-500"
              placeholder="Enter IFSC code"
            />
          </div>

          <div>
            <label
              for="responseInput4"
              class="block text-lg font-medium text-gray-700">Branch Name</label
            >
            <input
              id="responseInput4"
              type="text"
              bind:value={passbookDetails.branch_name}
              class="border border-gray-300 rounded-lg w-full p-3 mt-2 focus:ring-2 focus:ring-Calypso-500 focus:border-Calypso-500"
              placeholder="Enter branch name"
            />
          </div>

          <div>
            <label
              for="responseInput5"
              class="block text-lg font-medium text-gray-700"
              >Bank Address</label
            >
            <input
              id="responseInput5"
              type="text"
              bind:value={passbookDetails.bank_address}
              class="border border-gray-300 rounded-lg w-full p-3 mt-2 focus:ring-2 focus:ring-Calypso-500 focus:border-Calypso-500"
              placeholder="Enter bank address"
            />
          </div>
        </div>
      </div>
      {#if saveMessage}
      <div class="text-green-600 flex justify-center"> 
        {saveMessage}
      </div>
    {/if}
      <div class="flex justify-center mt-6">
        {#if disableButton}
          <button
            disabled
            class="bg-Calypso-500 cursor-not-allowed hover:bg-Calypso-700 text-white text-sm flex justify-center items-center font-robotoMono px-5 py-2 rounded shadow-md uppercase"
          >
            Save
          </button>
        {:else}
          <button
            on:click={() => onSubmit()}
            class="bg-Calypso-500 hover:bg-Calypso-700 text-white text-sm flex justify-center items-center font-robotoMono px-5 py-2 rounded shadow-md uppercase"
          >
            Save
          </button>
        {/if}
      </div>
    </div>

    <div class="flex-1">
      <button
        class="group relative flex items-center gap-4 w-full py-4 px-5 border-b-2 border-Calypso-500"
      >
        <h1 class="text-xl font-semibold text-left text-Calypso-500">
          Uploaded Document
        </h1>
      </button>
      <div class="mt-6">
        <iframe
          src={url}
          class="w-full h-60 md:h-[450px] lg:h-[500px] border border-gray-300 rounded-lg"
          title="Uploaded Document Viewer"
        ></iframe>
      </div>
      <div class="flex justify-center mt-5 gap-4">
      {#if !fileIsAvalable}
        <button
          class="px-4 py-2 text-white bg-blue-500 hover:bg-blue-600 rounded-md shadow-md"
          on:click={() => dispatch("onUpload", "")}
        >
          Reupload Document
        </button>
        {:else}
        <button
          class="px-4 py-2 text-sm text-white bg-gray-400 hover:bg-gray-500 rounded-md shadow-md flex items-center gap-2"
          on:click={() => dispatch("onDelete", "")}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 -960 960 960"
            fill="#5f6368"
            class="xl:size-7 size-5 cursor-pointer hover:fill-red-300 mx-auto"
          >
            <path
              d="M280-120q-33 0-56.5-23.5T200-200v-520h-40v-80h200v-40h240v40h200v80h-40v520q0 33-23.5 56.5T680-120H280Zm80-160h80v-360h-80v360Zm160 0h80v-360h-80v360Z"
            />
          </svg>
          Delete
        </button>
        {/if}
      </div>
    </div>
  </div>
</div>
