<script>
  import { api } from "$api/api";
  import { createEventDispatcher, onMount } from "svelte";
  export let application;
  export let masters;
  const dispatch = createEventDispatcher();
  let shopActDetails = {};
  let details;
  let disableButton = false;
  export let documentsUrl;
  export let fileIsAvalable;
  const fileUrl = import.meta.env.VITE_FILE_URL;
  let url = `${fileUrl}${documentsUrl}`;
  console.log("file Url isss", url);

  const init = async () => {
    console.log("masters", masters);
    let orgTypes = masters.m_organization_type.map((item) => ({
      id: item.id,
      eng_name: item.eng_name,
    }));
    let {
      error,
      errorMsg,
      details: ldetails,
    } = await api.getAadharDetails({
      application_id: application.personalDetails.id,
    });
    details = ldetails;
    console.log("details", details);

    if (details.find((e) => e.field_name == "business_name")?.value) {
      let orgTypeId = details.find((e) => e.field_name == "org_type")?.value;

      let selectedOrgType =
        orgTypes.find((item) => item.id === orgTypeId)?.eng_name || "";

      shopActDetails = {
        business_name: details.find((e) => e.field_name == "business_name")
          ?.value,
        org_type: selectedOrgType,
        business_details: details.find(
          (e) => e.field_name == "business_details"
        )?.value,
        business_address: details.find(
          (e) => e.field_name == "business_address"
        )?.value,
        business_district: details.find(
          (e) => e.field_name == "business_district"
        )?.value,
        business_taluka: details.find((e) => e.field_name == "business_taluka")
          ?.value,
        business_place: details.find((e) => e.field_name == "business_place")
          ?.value,
        business_pincode: details.find(
          (e) => e.field_name == "business_pincode"
        )?.value,
      };
    } else {
      let orgTypeId = application.businessDetails.org_type;

      let selectedOrgType =
        orgTypes.find((item) => item.id === orgTypeId)?.eng_name || "";

      shopActDetails = {
        business_name: application.businessDetails.business_name,
        org_type: selectedOrgType,
        business_details: application.businessDetails.business_details,
        business_address: application.businessDetails.business_address,
        business_district: application.businessDetails.business_district,
        business_taluka: application.businessDetails.business_taluka,
        business_place: application.businessDetails.business_place,
        business_pincode: application.businessDetails.business_pincode,
      };
    }

    console.log("shopActDetails:", shopActDetails);
  };

  onMount(async () => {
    await init();
  });
  let data = {};

  let misMatchDetails = {};
  function areDetailsEqual(shopActDetails, businessDetails) {
    if (details.find((e) => e.field_name == "business_name")?.value) {
      if (
        shopActDetails["business_name"] !==
        details.find((e) => e.field_name == "business_name")?.value
      )
        return false;
      if (
        shopActDetails["org_type"] !==
        details.find((e) => e.field_name == "org_type")?.value
      )
        return false;
      if (
        shopActDetails["business_details"] !==
        details.find((e) => e.field_name == "business_details")?.value
      )
        return false;
      if (
        shopActDetails["business_address"] !==
        details.find((e) => e.field_name == "business_address")?.value
      )
        return false;
      if (
        shopActDetails["business_district"] !==
        details.find((e) => e.field_name == "business_district")?.value
      )
        return false;
      if (
        shopActDetails["business_taluka"] !==
        details.find((e) => e.field_name == "business_taluka")?.value
      )
        return false;
      if (
        shopActDetails["business_place"] !==
        details.find((e) => e.field_name == "business_place")?.value
      )
        return false;
      if (
        shopActDetails["business_pincode"] !==
        details.find((e) => e.field_name == "business_pincode")?.value
      )
        return false;

      return true;
    } else {
      for (const key in shopActDetails) {
        if (shopActDetails[key] !== businessDetails[key]) {
          return false; // Return false if any value is different
        }
      }
      return true;
    }
    // Return true if all values match
  }
let saveMessage=""
  const onSubmit = async () => {
    console.log("aadhardDetails", shopActDetails);
    const isEqual = areDetailsEqual(
      shopActDetails,
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
      data: shopActDetails,
    });
    saveMessage = "Data Save Successfully!";
setTimeout(()=> {
saveMessage=""
},3000)
    await init();
    disableButton = false;
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
          1. Applicant Shop Act Details
        </h1>
      </button>
      <div class="mt-6">
        <div class="grid grid-cols-1 sm:grid-cols-1 gap-6">
          <div>
            <div class="pb-4">
              <label
                for="responseInput1"
                class="block text-lg font-medium text-gray-700"
                >Business Name</label
              >
              <input
                id="responseInput1"
                type="text"
                bind:value={shopActDetails.business_name}
                class="border border-gray-300 rounded-lg w-full p-3 mt-2 focus:ring-2 focus:ring-Calypso-500 focus:border-Calypso-500"
                placeholder="Type your answer here"
              />
            </div>
          </div>

          <div>
            <div class="pb-4">
              <label
                for="responseInput2"
                class="block text-lg font-medium text-gray-700"
                >Business Type</label
              >
              <input
                id="responseInput2"
                type="text"
                bind:value={shopActDetails.org_type}
                class="border border-gray-300 rounded-lg w-full p-3 mt-2 focus:ring-2 focus:ring-Calypso-500 focus:border-Calypso-500"
                placeholder="Type your answer here"
              />
            </div>
          </div>

          <div>
            <div class="pb-4">
              <label
                for="responseInput4"
                class="block text-lg font-medium text-gray-700"
                >Business Details</label
              >
              <input
                id="responseInput4"
                type="text"
                bind:value={shopActDetails.business_details}
                class="border border-gray-300 rounded-lg w-full p-3 mt-2 focus:ring-2 focus:ring-Calypso-500 focus:border-Calypso-500"
                placeholder="Type your answer here"
              />
            </div>
          </div>
          <div>
            <div class="pb-4">
              <label
                for="responseInput4"
                class="block text-lg font-medium text-gray-700"
                >Business Address</label
              >
              <input
                id="responseInput4"
                type="text"
                bind:value={shopActDetails.business_address}
                class="border border-gray-300 rounded-lg w-full p-3 mt-2 focus:ring-2 focus:ring-Calypso-500 focus:border-Calypso-500"
                placeholder="Type your answer here"
              />
            </div>
          </div>
          <div>
            <div class="pb-4">
              <label
                for="responseInput4"
                class="block text-lg font-medium text-gray-700"
                >Business District</label
              >
              <input
                id="responseInput4"
                type="text"
                value={masters.m_district.find(
                  (e) => e.dist_id == shopActDetails.business_district
                )?.eng_name}
                class="border border-gray-300 rounded-lg w-full p-3 mt-2 focus:ring-2 focus:ring-Calypso-500 focus:border-Calypso-500"
                placeholder="Type your answer here"
              />
            </div>
          </div>
          <div>
            <div class="pb-4">
              <label
                for="responseInput4"
                class="block text-lg font-medium text-gray-700"
                >Business Taluka</label
              >
              <input
                id="responseInput4"
                type="text"
                value={masters.m_taluka.find(
                  (e) => e.taluka_id == shopActDetails.business_taluka
                )?.eng_name}
                class="border border-gray-300 rounded-lg w-full p-3 mt-2 focus:ring-2 focus:ring-Calypso-500 focus:border-Calypso-500"
                placeholder="Type your answer here"
              />
            </div>
          </div>
          <div>
            <div class="pb-4">
              <label
                for="responseInput4"
                class="block text-lg font-medium text-gray-700"
                >Business place</label
              >
              <input
                id="responseInput4"
                type="text"
                bind:value={shopActDetails.business_place}
                class="border border-gray-300 rounded-lg w-full p-3 mt-2 focus:ring-2 focus:ring-Calypso-500 focus:border-Calypso-500"
                placeholder="Type your answer here"
              />
            </div>
          </div>
          <div>
            <div class="pb-4">
              <label
                for="responseInput4"
                class="block text-lg font-medium text-gray-700"
                >Business Pincode</label
              >
              <input
                id="responseInput4"
                type="text"
                bind:value={shopActDetails.business_pincode}
                class="border border-gray-300 rounded-lg w-full p-3 mt-2 focus:ring-2 focus:ring-Calypso-500 focus:border-Calypso-500"
                placeholder="Type your answer here"
              />
            </div>
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
          class="w-full h-60 md:h-[450px] lg:h-[800px] border border-gray-300 rounded-lg"
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

<!-- <div
  class="border border-gray-300 rounded-xl shadow-lg p-6 w-full mt-5 bg-white"
>
  <button
    class="group relative flex items-center gap-4 w-full py-3 px-5 border-b-2 border-Calypso-500"
  >
    <h1 class="text-xl font-semibold text-left text-Calypso-500">
      1.Applicant Shop Act Details
    </h1>
    <div class="flex items-center gap-4 ml-auto">
      <div class="flex items-center gap-4 ml-auto">
      <div
        class="border-2 border-gray-400 rounded-full p-2 transition-transform duration-300 transform hover:scale-110"
      >View Old Document
      </div>
    </div>
    </div>
  </button>

  <div class="mt-6">
    <div class="grid grid-cols-1 sm:grid-cols-2 gap-6">
      <div>
        <div class="pb-4">
          <label
            for="responseInput1"
            class="block text-lg font-medium text-gray-700">Business Name</label
          >
          <input
            id="responseInput1"
            type="text"
            bind:value={shopActDetails.business_name}
            class="border border-gray-300 rounded-lg w-full p-3 mt-2 focus:ring-2 focus:ring-Calypso-500 focus:border-Calypso-500"
            placeholder="Type your answer here"
          />
        </div>
      </div>

      <div>
        <div class="pb-4">
          <label
            for="responseInput2"
            class="block text-lg font-medium text-gray-700">Business Type</label
          >
          <input
            id="responseInput2"
            type="text"
            bind:value={shopActDetails.org_type}
            class="border border-gray-300 rounded-lg w-full p-3 mt-2 focus:ring-2 focus:ring-Calypso-500 focus:border-Calypso-500"
            placeholder="Type your answer here"
          />
        </div>
      </div>

      <div>
        <div class="pb-4">
          <label
            for="responseInput4"
            class="block text-lg font-medium text-gray-700"
            >Business Details</label
          >
          <input
            id="responseInput4"
            type="text"
            bind:value={shopActDetails.business_details}
            class="border border-gray-300 rounded-lg w-full p-3 mt-2 focus:ring-2 focus:ring-Calypso-500 focus:border-Calypso-500"
            placeholder="Type your answer here"
          />
        </div>
      </div>
      <div>
        <div class="pb-4">
          <label
            for="responseInput4"
            class="block text-lg font-medium text-gray-700"
            >Business Address</label
          >
          <input
            id="responseInput4"
            type="text"
            bind:value={shopActDetails.business_address}
            class="border border-gray-300 rounded-lg w-full p-3 mt-2 focus:ring-2 focus:ring-Calypso-500 focus:border-Calypso-500"
            placeholder="Type your answer here"
          />
        </div>
      </div>
      <div>
        <div class="pb-4">
          <label
            for="responseInput4"
            class="block text-lg font-medium text-gray-700"
            >Business District</label
          >
          <input
            id="responseInput4"
            type="text"
            value={masters.m_district.find(
              (e) => e.dist_id == shopActDetails.business_district
            )?.eng_name}
            class="border border-gray-300 rounded-lg w-full p-3 mt-2 focus:ring-2 focus:ring-Calypso-500 focus:border-Calypso-500"
            placeholder="Type your answer here"
          />
        </div>
      </div>
      <div>
        <div class="pb-4">
          <label
            for="responseInput4"
            class="block text-lg font-medium text-gray-700"
            >Business Taluka</label
          >
          <input
            id="responseInput4"
            type="text"
            value={masters.m_taluka.find(
              (e) => e.taluka_id == shopActDetails.business_taluka
            )?.eng_name}
            class="border border-gray-300 rounded-lg w-full p-3 mt-2 focus:ring-2 focus:ring-Calypso-500 focus:border-Calypso-500"
            placeholder="Type your answer here"
          />
        </div>
      </div>
      <div>
        <div class="pb-4">
          <label
            for="responseInput4"
            class="block text-lg font-medium text-gray-700"
            >Business place</label
          >
          <input
            id="responseInput4"
            type="text"
            bind:value={shopActDetails.business_place}
            class="border border-gray-300 rounded-lg w-full p-3 mt-2 focus:ring-2 focus:ring-Calypso-500 focus:border-Calypso-500"
            placeholder="Type your answer here"
          />
        </div>
      </div>
      <div>
        <div class="pb-4">
          <label
            for="responseInput4"
            class="block text-lg font-medium text-gray-700"
            >Business Pincode</label
          >
          <input
            id="responseInput4"
            type="text"
            bind:value={shopActDetails.business_pincode}
            class="border border-gray-300 rounded-lg w-full p-3 mt-2 focus:ring-2 focus:ring-Calypso-500 focus:border-Calypso-500"
            placeholder="Type your answer here"
          />
        </div>
      </div>
    </div>
  </div>
  <div class="flex justify-center mt-6">
    {#if disableButton}
      <button
        class="bg-Calypso-500 cursor-not-allowed hover:bg-Calypso-700 text-white text-sm flex justify-center items-center font-robotoMono px-5 py-1.5 rounded shadow-md uppercase"
        disabled
      >
        Save
      </button>
    {:else}
      <button
        on:click={() => onSubmit()}
        class="bg-Calypso-500 hover:bg-Calypso-700 text-white text-sm flex justify-center items-center font-robotoMono px-5 py-1.5 rounded shadow-md uppercase"
      >
        Save
      </button>
    {/if}
  </div>
</div> -->
