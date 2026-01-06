<script>
  import { api } from "$api/api";
  import { createEventDispatcher, onMount } from "svelte";
  export let application;
  export let masters;
  let details;
  let aadharDetails = {};
  let disableButton = false;
  export let documentsUrl;
  export let fileIsAvalable;
  const dispatch = createEventDispatcher();
  const fileUrl = import.meta.env.VITE_FILE_URL;
  let url = `${fileUrl}${documentsUrl}`;
  console.log("file Url isss", url);

  const init = async () => {
    let {
      error,
      errorMsg,
      details: lDetails,
    } = await api.getAadharDetails({
      application_id: application.guarantorPersonalDetails.id,
    });
    details = lDetails;
    console.log("details", details);
    const formatDate = (dateString) => {
      if (!dateString) return "";
      return dateString.split("T")[0].split("-").reverse().join("/");
    };

    if (
      details.find(
        (e) =>
          e.field_name == "aadhar" &&
          e.table_name == "guarantor_personal_details"
      )?.value
    ) {
      aadharDetails = {
        aadhar: details.find((e) => e.field_name == "aadhar")?.value,
        name: details.find((e) => e.field_name == "name")?.value,
        // dob: application.guarantorPersonalDetails.dob.split("T")[0],
        dob:formatDate(details.find((e) => e.field_name == "dob")?.value),
        permanent_address: details.find(
          (e) => e.field_name == "permanent_address"
        )?.value,
        permanent_taluka: details.find(
          (e) => e.field_name == "permanent_taluka"
        )?.value,
        permanent_district: details.find(
          (e) => e.field_name == "permanent_district"
        )?.value,
        permanent_place: details.find((e) => e.field_name == "permanent_place")
          ?.value,
        permanent_pincode: details.find(
          (e) => e.field_name == "permanent_pincode"
        )?.value,
      };
    } else {
      aadharDetails = {
        aadhar: application.guarantorPersonalDetails.aadhar,
        name: application.guarantorPersonalDetails.name,
        // dob: application.guarantorPersonalDetails.dob.split("T")[0],
        dob:formatDate( application.guarantorPersonalDetails.dob),
        permanent_address:
          application.guarantorPersonalDetails.permanent_address,
        permanent_taluka: application.guarantorPersonalDetails.permanent_taluka,
        permanent_district:
          application.guarantorPersonalDetails.permanent_district,
        permanent_place: application.guarantorPersonalDetails.permanent_place,
        permanent_pincode:
          application.guarantorPersonalDetails.permanent_pincode,
      };
    }
  };
  onMount(async () => {
    await init();
  });
  let data = {};

  let misMatchDetails = {};
  function areDetailsEqual(aadharDetails, guarantorPersonalDetails) {
    if (
      details.find(
        (e) =>
          e.field_name == "aadhar" &&
          e.table_name == "guarantor_personal_details"
      )?.value
    ) {
      if (
        aadharDetails["aadhar"] !==
        details.find(
          (e) =>
            e.field_name == "aadhar" &&
            e.table_name == "guarantor_personal_details"
        )?.value
      ) {
        return false;
      }
      if (
        aadharDetails["name"] !==
        details.find(
          (e) =>
            e.field_name == "name" &&
            e.table_name == "guarantor_personal_details"
        )?.value
      ) {
        return false;
      }

      if (
        aadharDetails["dob"] !==
        details.find(
          (e) =>
            e.field_name == "dob" &&
            e.table_name == "guarantor_personal_details"
        )?.value
      ) {
        return false;
      }

      if (
        aadharDetails["permanent_address"] !==
        details.find(
          (e) =>
            e.field_name == "permanent_address" &&
            e.table_name == "guarantor_personal_details"
        )?.value
      ) {
        return false;
      }
      if (
        aadharDetails["permanent_taluka"] !==
        details.find(
          (e) =>
            e.field_name == "permanent_taluka" &&
            e.table_name == "guarantor_personal_details"
        )?.value
      ) {
        return false;
      }
      if (
        aadharDetails["permanent_district"] !==
        details.find(
          (e) =>
            e.field_name == "permanent_district" &&
            e.table_name == "guarantor_personal_details"
        )?.value
      ) {
        return false;
      }
      if (
        aadharDetails["permanent_place"] !==
        details.find(
          (e) =>
            e.field_name == "permanent_place" &&
            e.table_name == "guarantor_personal_details"
        )?.value
      ) {
        return false;
      }
      if (
        aadharDetails["permanent_pincode"] !==
        details.find(
          (e) =>
            e.field_name == "permanent_pincode" &&
            e.table_name == "guarantor_personal_details"
        )?.value
      ) {
        return false;
      }
      return true;
    } else {
      for (const key in aadharDetails) {
        if (aadharDetails[key] !== guarantorPersonalDetails[key]) {
          return false; // Return false if any value is different
        }
      }
      return true; // Return true if all values match
    }
  }
  let saveMessage = "";
  const onSubmit = async () => {
    console.log("aadhardDetails", aadharDetails);
    const isEqual = areDetailsEqual(
      aadharDetails,
      application.guarantorPersonalDetails
    );

    console.log("isEqual is", isEqual);
    if (isEqual) {
      return;
    }
    console.log("mismatch", misMatchDetails);
    disableButton = true;
    let { error, errorMsg } = await api.saveReuploadDocsData({
      application_id: application.guarantorPersonalDetails.id,
      iteration: 1,
      tableName: "guarantor_personal_details",
      data: aadharDetails,
    });
    saveMessage = "Data Save Successfully!";
    setTimeout(() => {
      saveMessage = "";
    }, 3000);
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
        class="group relative flex items-center gap-4 w-full py-3 px-5 border-b-2 border-Calypso-500"
      >
        <h1 class="text-xl font-semibold text-left text-Calypso-500">
          1. Guarantor Aadhar Card Details
        </h1>
      </button>
      <div class="mt-6">
        <div class="grid grid-cols-1 gap-6">
          <div>
            <label
              for="responseInput1"
              class="block text-lg font-medium text-gray-700"
              >Aadhar Number</label
            >
            <input
              id="responseInput1"
              type="text"
              bind:value={aadharDetails.aadhar}
              class="border border-gray-300 rounded-lg w-full p-3 mt-2 focus:ring-2 focus:ring-Calypso-500 focus:border-Calypso-500"
              placeholder="Type your answer here"
            />
          </div>

          <div>
            <label
              for="responseInput2"
              class="block text-lg font-medium text-gray-700"
              >Full Name (As Per Aadhar)</label
            >
            <input
              id="responseInput2"
              type="text"
              bind:value={aadharDetails.name}
              class="border border-gray-300 rounded-lg w-full p-3 mt-2 focus:ring-2 focus:ring-Calypso-500 focus:border-Calypso-500"
              placeholder="Type your answer here"
            />
          </div>

          <div>
            <label
              for="responseInput3"
              class="block text-lg font-medium text-gray-700"
              >Date of Birth</label
            >
            <input
              id="responseInput3"
              type="text"
              value={aadharDetails.dob}
              class="border border-gray-300 rounded-lg w-full p-3 mt-2 focus:ring-2 focus:ring-Calypso-500 focus:border-Calypso-500"
              placeholder="Type your answer here"
            />
          </div>

          <div>
            <label
              for="responseInput4"
              class="block text-lg font-medium text-gray-700">Address</label
            >
            <input
              id="responseInput4"
              type="text"
              bind:value={aadharDetails.permanent_address}
              class="border border-gray-300 rounded-lg w-full p-3 mt-2 focus:ring-2 focus:ring-Calypso-500 focus:border-Calypso-500"
              placeholder="Type your answer here"
            />
          </div>

          <div>
            <label
              for="responseInput5"
              class="block text-lg font-medium text-gray-700"
              >Permanent Taluka</label
            >
            <input
              id="responseInput5"
              type="text"
              value={masters.m_taluka.find(
                (e) => e.taluka_id == aadharDetails.permanent_taluka
              )?.eng_name}
              class="border border-gray-300 rounded-lg w-full p-3 mt-2 focus:ring-2 focus:ring-Calypso-500 focus:border-Calypso-500"
              placeholder="Type your answer here"
            />
          </div>

          <div>
            <label
              for="responseInput6"
              class="block text-lg font-medium text-gray-700"
              >Permanent District</label
            >
            <input
              id="responseInput6"
              type="text"
              value={masters.m_district.find(
                (e) => e.dist_id == aadharDetails.permanent_district
              )?.eng_name}
              class="border border-gray-300 rounded-lg w-full p-3 mt-2 focus:ring-2 focus:ring-Calypso-500 focus:border-Calypso-500"
              placeholder="Type your answer here"
            />
          </div>

          <div>
            <label
              for="responseInput7"
              class="block text-lg font-medium text-gray-700"
              >Permanent Place</label
            >
            <input
              id="responseInput7"
              type="text"
              bind:value={aadharDetails.permanent_place}
              class="border border-gray-300 rounded-lg w-full p-3 mt-2 focus:ring-2 focus:ring-Calypso-500 focus:border-Calypso-500"
              placeholder="Type your answer here"
            />
          </div>

          <div>
            <label
              for="responseInput8"
              class="block text-lg font-medium text-gray-700"
              >Permanent pinCode</label
            >
            <input
              id="responseInput8"
              type="text"
              bind:value={aadharDetails.permanent_pincode}
              class="border border-gray-300 rounded-lg w-full p-3 mt-2 focus:ring-2 focus:ring-Calypso-500 focus:border-Calypso-500"
              placeholder="Type your answer here"
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
            class="bg-Calypso-500 cursor-not-allowed text-white px-5 py-1.5 rounded shadow-md uppercase"
            >Save</button
          >
        {:else}
          <button
            on:click={() => onSubmit()}
            class="bg-Calypso-500 hover:bg-Calypso-700 text-white px-5 py-1.5 rounded shadow-md uppercase"
            >Save</button
          >
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
          class="w-full h-[800px] border border-gray-300 rounded-lg"
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
      1.Guarantor Aadhar Card Details
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
            class="block text-lg font-medium text-gray-700">Aadhar Number</label
          >
          <input
            id="responseInput1"
            type="text"
            bind:value={aadharDetails.aadhar}
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
            >Full Name (As Per Aadhar)</label
          >
          <input
            id="responseInput2"
            type="text"
            bind:value={aadharDetails.name}
            class="border border-gray-300 rounded-lg w-full p-3 mt-2 focus:ring-2 focus:ring-Calypso-500 focus:border-Calypso-500"
            placeholder="Type your answer here"
          />
        </div>
      </div>

      <div>
        <div class="pb-4">
          <label
            for="responseInput3"
            class="block text-lg font-medium text-gray-700">Date of Birth</label
          >
          <input
            id="responseInput3"
            type="text"
            value={aadharDetails.dob}
            class="border border-gray-300 rounded-lg w-full p-3 mt-2 focus:ring-2 focus:ring-Calypso-500 focus:border-Calypso-500"
            placeholder="Type your answer here"
          />
        </div>
      </div>

      <div>
        <div class="pb-4">
          <label
            for="responseInput4"
            class="block text-lg font-medium text-gray-700">Address</label
          >
          <input
            id="responseInput4"
            type="text"
            bind:value={aadharDetails.permanent_address}
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
            >Permanent Taluka</label
          >
          <input
            id="responseInput4"
            type="text"
            value={masters.m_taluka.find(
              (e) => e.taluka_id == aadharDetails.permanent_taluka
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
            >Permanent District</label
          >
          <input
            id="responseInput4"
            type="text"
            value={masters.m_district.find(
              (e) => e.dist_id == aadharDetails.permanent_district
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
            >Permanent Place</label
          >
          <input
            id="responseInput4"
            type="text"
            bind:value={aadharDetails.permanent_place}
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
            >Permanent pinCode</label
          >
          <input
            id="responseInput4"
            type="text"
            bind:value={aadharDetails.permanent_pincode}
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
