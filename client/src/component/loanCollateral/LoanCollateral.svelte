<script>
  import AlertMsg from "$lib/forgotPassword/AlertMsg.svelte";
  import { FloatingLabelInput, Helper } from "flowbite-svelte";

  import Fa from "svelte-fa";
  import { faTrash, faEdit, faAdd } from "@fortawesome/free-solid-svg-icons";
  import CollateralPropertyCard from "./CollateralPropertyCard.svelte";
  import CollateralFDCard from "./CollateralFDCard.svelte";
  import CollateralLICPolicyCard from "./CollateralLICPolicyCard.svelte";

  import AddCollateralProperty from "./AddCollateralProperty.svelte";
  import EditCollateralProperty from "./EditCollateralProperty.svelte";
  import DeleteCollateralProperty from "./DeleteCollateralProperty.svelte";

  import AddCollateralFdLic from "./AddCollateralFdLic.svelte";

  import EditCollateralFD from "./EditCollateralFD.svelte";
  import DeleteCollateralFD from "./DeleteCollateralFD.svelte";

  import EditCollateralLICPolicy from "./EditCollateralLICPolicy.svelte";
  import DeleteCollateralLICPolicy from "./DeleteCollateralLICPolicy.svelte";

  import { masters } from "$appstore/store";
  import { onMount } from "svelte";
  import { browser } from "$app/environment";
  import AddCollateralLic from "./AddCollateralLic.svelte";

  let isAddPropertyModalOpen = false;
  let isEditPropertyModalOpen = false;
  let isDeletePropertyModalOpen = false;

  let isFdLicModalOpen = false;

  let isEditFDModalOpen = false;
  let isDeleteFDModalOpen = false;

  let isEditLICPolicyModalOpen = false;
  let isDeleteLICPolicyModalOpen = false;
  export let properties;
  export let fds = [];
  export let licPolicies;
  export let handleBackButtonClick;
  export let onSubmit;
  let isLicModalOpen = false;

  // export let data;
  // export let errors;
  // export let onInput;

  export let alertMsg;

  let propertyTypes = [];
  let fdLicTypes = [];

  const onAddCollateralProperty = () => {
    isAddPropertyModalOpen = !isAddPropertyModalOpen;
  };
  const onAddCollateralFdLic = () => {
    isFdLicModalOpen = !isFdLicModalOpen;
  };
  const onAddCollateralLic = () => {
    isLicModalOpen = !isLicModalOpen;
  };
  let districts = [];
  let talukas = [];
  let dataLoaded = false;
  onMount(() => {
    if (browser) {
      propertyTypes = [...$masters.m_property_type];
      fdLicTypes = [...$masters.m_fd_lic_type];
      districts = [...$masters.m_district];
      talukas = [...$masters.m_taluka];
      // properties = properties.sort((a, b) => a - b);
    }
    dataLoaded = true;
  });
  let currentProperty = {};
  let currentFD = {};
  let currentLICPolicy = {};

  const onPropertyEditClicked = (e) => {
    const id = e.detail.id;
    console.log("current property id is: ", id);
    currentProperty = properties.find((p) => p.id == id);
    console.log("currentProperty: ", currentProperty);
    isEditPropertyModalOpen = !isEditPropertyModalOpen;
  };
  const onPropertyDeleteClicked = (e) => {
    const id = e.detail.id;
    console.log("current property id is: ", id);
    currentProperty = properties.find((p) => p.id == id);
    console.log("found property: ", currentProperty);
    isDeletePropertyModalOpen = !isDeletePropertyModalOpen;
  };
  const onFDEditClicked = (e) => {
    const id = e.detail.id;
    console.log("current property id is: ", id);
    currentFD = fds.find((p) => p.id == id);
    console.log("current fds: ", currentFD);
    isEditFDModalOpen = !isEditFDModalOpen;
  };
  const onFDDeleteClicked = (e) => {
    const id = e.detail.id;
    console.log("current property id is: ", id);
    currentFD = fds.find((p) => p.id == id);
    console.log("current fds: ", currentFD);
    isDeleteFDModalOpen = !isDeleteFDModalOpen;
  };
  const onLICPolicyEditClicked = (e) => {
    const id = e.detail.id;
    console.log("current lic policy id is: ", id);
    currentLICPolicy = licPolicies.find((p) => p.id == id);
    console.log("current lic policy: ", currentLICPolicy);
    isEditLICPolicyModalOpen = !isEditLICPolicyModalOpen;
  };
  const onLICPolicyDeleteClicked = (e) => {
    const id = e.detail.id;
    console.log("current lic policy id is: ", id);
    currentLICPolicy = licPolicies.find((p) => p.id == id);
    console.log("current lic policy: ", currentLICPolicy);
    isDeleteLICPolicyModalOpen = !isDeleteLICPolicyModalOpen;
  };
</script>

{#if dataLoaded}
  <!-- <pre>
  properties: {JSON.stringify(properties, null, 2)}
</pre> -->
  <div class="grid grid-cols-12 lg:mx-10 mx-5 my-5">
    <div class="col-span-12 space-y-5">
      <div class="bg-white shadow-lg border rounded-lg pb-5">
        <div
          class="flex justify-start items-center gap-3 lg:px-10 md:px-7 px-5 md:py-5 py-3 border-b-2 border-gray-300"
        >
          <img
            src="/termloan/applicant.png"
            alt="applicant"
            class="md:size-10 size-7"
          />
          <h1
            class="xl:text-3xl lg:text-2xl md:text-xl text-lg capitalize font-bold font-roboto text-gray-700"
          >
            Applicant Collateral for the Loan/कर्जासाठी अर्जदाराचे तारण :
          </h1>
        </div>
      </div>
    </div>
  </div>
  <div class="flex justify-end bg-gray-300 p-5 m-3 rounded gap-3">
    <button
      type="button"
      class="py-3 px-4 inline-flex items-center gap-x-2 text-sm font-medium rounded-lg border border-transparent bg-blue-600 text-white hover:bg-blue-700 focus:outline-none focus:bg-blue-700 disabled:opacity-50 disabled:pointer-events-none"
      on:click={onAddCollateralProperty}
    >
      <Fa icon={faAdd}></Fa>
      Add Collateral Property<br />तारण मालमत्ता जोडा
    </button>
    <button
      type="button"
      class="py-3 px-4 inline-flex items-center gap-x-2 text-sm font-medium rounded-lg border border-transparent bg-blue-600 text-white hover:bg-blue-700 focus:outline-none focus:bg-blue-700 disabled:opacity-50 disabled:pointer-events-none"
      on:click={onAddCollateralFdLic}
    >
      <Fa icon={faAdd}></Fa>
      Add Collateral FD <br />तारण FD जोडा
    </button>
    <button
      type="button"
      class="py-3 px-4 inline-flex items-center gap-x-2 text-sm font-medium rounded-lg border border-transparent bg-blue-600 text-white hover:bg-blue-700 focus:outline-none focus:bg-blue-700 disabled:opacity-50 disabled:pointer-events-none"
      on:click={onAddCollateralLic}
    >
      <Fa icon={faAdd}></Fa>
      Add Collateral LIC <br />तारण LIC जोडा
    </button>
  </div>
  <main
    class="my-8 mx-2 md:mx-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 bg-gray-200 p-3 rounded"
  >
    {#each properties as property, index}
      <CollateralPropertyCard
        {propertyTypes}
        {property}
        {districts}
        {talukas}
        on:editClicked={onPropertyEditClicked}
        on:deleteClicked={onPropertyDeleteClicked}
      />
    {/each}
    {#each fds as fd, index}
      <CollateralFDCard
        {fdLicTypes}
        {fd}
        {districts}
        {talukas}
        on:editClicked={onFDEditClicked}
        on:deleteClicked={onFDDeleteClicked}
      />
    {/each}
    {#each licPolicies as lic, index}
      <CollateralLICPolicyCard
        {fdLicTypes}
        {lic}
        {districts}
        {talukas}
        on:editClicked={onLICPolicyEditClicked}
        on:deleteClicked={onLICPolicyDeleteClicked}
      />
    {/each}
  </main>
  <AddCollateralProperty
    bind:isModalOpen={isAddPropertyModalOpen}
    on:addProperty
  />
  {#if isEditPropertyModalOpen}
    <EditCollateralProperty
      bind:isModalOpen={isEditPropertyModalOpen}
      property={currentProperty}
      on:saveProperty
    />
  {/if}
  {#if isDeletePropertyModalOpen}
    <DeleteCollateralProperty
      bind:isModalOpen={isDeletePropertyModalOpen}
      property={currentProperty}
      on:deleteProperty
    />
  {/if}

  {#if isLicModalOpen}
    <AddCollateralLic
      bind:isModalOpen={isLicModalOpen}
      on:addFD
      on:addLICPolicy
    />
  {/if}
  <AddCollateralFdLic
    bind:isModalOpen={isFdLicModalOpen}
    on:addFD
    on:addLICPolicy
  />

  <!-- <div>
    isEditFDModalOpen :{isEditFDModalOpen}
  </div> -->
  {#if isEditFDModalOpen}
    <EditCollateralFD
      bind:isModalOpen={isEditFDModalOpen}
      fd={currentFD}
      on:saveFD
    />
  {/if}
  {#if isDeleteFDModalOpen}
    <DeleteCollateralFD
      bind:isModalOpen={isDeleteFDModalOpen}
      fd={currentFD}
      on:deleteFD
    />
  {/if}

  {#if isEditLICPolicyModalOpen}
    <EditCollateralLICPolicy
      bind:isModalOpen={isEditLICPolicyModalOpen}
      licPolicy={currentLICPolicy}
      on:saveLICPolicy
    />
  {/if}
  {#if isDeleteLICPolicyModalOpen}
    <DeleteCollateralLICPolicy
      bind:isModalOpen={isDeleteLICPolicyModalOpen}
      licPolicy={currentLICPolicy}
      on:deleteLICPolicy
    />
  {/if}

  <!-- <div class="w-auto">
    {#if alertMsg}
    <div class="m-8 bg-red-200 text-red-800 p-2 rounded-md">
      {alertMsg}
    </div>
    {/if}
  </div> -->

  <div class="w-auto">
    {#if alertMsg}
      <Helper color="red" class="text-lg mx-5 bg-red-50 p-2 rounded">
        {alertMsg}
      </Helper>
    {/if}
  </div>

  <div class="flex justify-center items-center py-8 gap-4">
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

    <button
      class="group relative flex items-center justify-center gap-3 border border-gray-300 md:w-[200px] w-[150px] py-2 overflow-hidden bg-Calypso-400"
      on:click={onSubmit}
    >
      <span
        class="absolute w-0 h-0 transition-all duration-500 ease-out bg-Calypso-500 group-hover:w-[300px] group-hover:h-56"
      />
      <span class="absolute inset-0 w-full h-full opacity-30" />

      <!-- <h1
      class="relative font-roboto capitalize font-semibold text-xl text-gray-800 group-hover:text-white"
    >
      Proceed
    </h1> -->
      <!-- on:click={onProceed} -->
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
        </svg>
      </span>
    </button>
  </div>
{:else}
  ...Loading
{/if}
