<script>
  import { slide } from "svelte/transition";
  import { createEventDispatcher } from "svelte";
  import DatePicker from "../datePicker/DatePicker.svelte";
  import { authApi } from "$api/authApi";
  import { token, refreshToken, username, id } from "$appstore/store.js";
  import AlertMsg from "$lib/forgotPassword/AlertMsg.svelte";
  import { FloatingLabelInput, Helper } from "flowbite-svelte";
  import { masters } from "$appstore/store";
  import { onMount } from "svelte";
  import { CaretDownOutline } from "flowbite-svelte-icons";
  // export let InvestmentApplicantDetails;

  export let data;
  export let errors;
  export let onInput;
  export let onSubmit;
  export let alertMsg = "";
  export let handleBackButtonClick;



  console.log("data", data);
  console.log("errors", errors);
  let property_types = [];
  onMount(() => {
    console.log("data: ", data);
    property_types = [...$masters.m_property_type];
    console.log("property_types in investment: ", property_types);
  });
  let showDatePicker = false;

  let dob = new Date(); // Initialize with current date or any other default date

  const dispatch = createEventDispatcher();

  function handleProceed() {
    window.scrollTo({ top: 0, behavior: "smooth" });

    dispatch("proceedToGuarantor");
  }

  // let inputData = {
  //   propertyDetails: [
  //     {
  //       applicantId: "",
  //       property_type: "",
  //       owner_type: "",
  //       property_address: "",
  //       property_district: "",
  //       property_taluka: "",
  //       property_place: "",
  //       property_pincode: "",
  //       property_value: "",
  //       property_area: "",
  //       purchase_date: "",
  //     },
  //   ],
  //   licDetails: [
  //     {
  //       applicantId: "",
  //       policy_number: "",
  //       policy_type: "",
  //       policy_amount: "",
  //       premium_amount: "",
  //       premium_frequency: "",
  //       policy_term: "",
  //     },
  //   ],
  //   fdDetails: [
  //     {
  //       applicantId: "",
  //       fd_account_number: "",
  //       bank_name: "",
  //       fd_amount: "",
  //       tenure: "",
  //       interest_rate: "",
  //     },
  //   ],
  // };

  const formatDate = (date) => {
    // Check if the date is in a valid format; return null if invalid
    if (!date || isNaN(Date.parse(date))) {
      return null;
    }
    return new Date(date).toISOString().split("T")[0]; // Format as YYYY-MM-DD
  };

  let isPropertyTypeOpen = false;
  let isOwnershipStatusOpen = false;
  let isPolicyTypeOpen = false;
  let isPremiumOpen = false;

  // let propertyTypes = ["Residential", "Commercial", "Land"];
  let propertyTypes = ["Residential", "Commercial", "Land"];
  let ownershipStatus = ["Owned", "Rented", "Leased"];
  let policyTypes = ["Endowment", "Term", "Whole Life", "Money Back"];
  let policyFrequencies = ["Monthly", "Quarterly", "Yearly"];

  function addPropertyCardApplicant() {
    data.properties = [
      ...data.properties,
      {
        id: "",
        property_id: "",
        property_type: "",
        owner_type: "",
        property_address: "",
        property_district: "",
        property_taluka: "",
        property_place: "",
        property_pincode: "",
        property_value: "",
        property_area: "",
        purchase_date: "",
      },
    ];
  }

  function addLicCardApplicant() {
    data.licPolicies = [
      ...data.licPolicies,
      {
        id: "",
        policy_id: "",
        policy_number: "",
        policy_type: "",
        policy_amount: "",
        premium_amount: "",
        premium_frequency: "",
        policy_term: "",
        owner_type: "",
      },
    ];
  }

  function addFdCardApplicant() {
    data.fds = [
      ...data.fds,
      {
        id: "",
        fd_id: "",
        fd_account_number: "",
        bank_name: "",
        fd_amount: "",
        tenure: "",
        interest_rate: "",
        owner_type: "",
      },
    ];
  }

  function togglePropertyDropdown() {
    isPropertyTypeOpen = !isPropertyTypeOpen;
  }

  function toggleOwnershipDropdown() {
    isOwnershipStatusOpen = !isOwnershipStatusOpen;
  }

  function togglePolicyDropdown() {
    isPolicyTypeOpen = !isPolicyTypeOpen;
  }

  function togglePremiumDropdown() {
    isPremiumOpen = !isPremiumOpen;
  }

  function deletePropertyCardApplicant(index) {
    if (data.properties.length > 1) {
      data.properties = data.properties.filter((_, i) => i !== index);
    }
  }

  function deleteLicCardApplicant(index) {
    if (data.licPolicies.length > 1) {
      data.licPolicies = data.licPolicies.filter((_, i) => i !== index);
    }
  }

  function deleteFdCardApplicant(index) {
    if (data.fds.length > 1) {
      data.fds = data.fds.filter((_, i) => i !== index);
    }
  }

  const handleDateSelect = (date) => {
    data.properties[0].purchase_date = date; // Update dob when a date is selected
    showDatePicker = false;
  };
</script>

<div class="md:mx-10 mx-5 lg:my-10 my-5 space-y-5">
  <div class="border border-deepPurple-300 shadow-lg py-2 bg-deepPurple-100">
    <h1
      class="block md:text-xl text-base text-center capitalize font-semibold font-inter text-gray-700"
    >
      Applicant Summary
    </h1>
  </div>
  <div class="border border-gray-300 rounded-lg shadow-lg md:p-5 p-3">
    <div class="border-b-2 border-gray-300 pb-2">
      <h1
        class="block xl:text-3xl lg:text-2xl md:text-xl text-lg capitalize font-semibold font-inter text-gray-700"
      >
        Property Description :
      </h1>
    </div>

    {#each data.properties as property, index}
      <div
        class="border border-deepPurple-300 shadow-lg rounded-md md:mx-5 my-5 md:px-5 px-3 py-5"
      >
        <div class="border-b-2 border-gray-300 pb-2">
          <h1
            class="block lg:text-xl md:text-base text-sm capitalize font-semibold font-inter text-gray-700"
          >
            Property {index + 1} :
          </h1>
        </div>
        <div class="grid grid-cols-12 py-5 lg:gap-0 gap-5 justify-center">
          <div class="md:col-span-6 col-span-12">
            <div class="grid grid-cols-12 justify-start items-center">
              <div class="lg:col-span-3 col-span-12">
                <h1
                  class="block xl:text-base text-sm font-roboto text-gray-500 text-start xl:pr-5 xl:font-medium font-semibold"
                >
                  Property Type <span class="text-red-500">*</span>
                </h1>
              </div>
              <div class="hidden lg:block col-span-1">:</div>

              <div
                class="lg:col-span-7 col-span-12 relative inline-block text-left w-full xl:mt-0 mt-1"
              >
                <button
                  on:click={togglePropertyDropdown}
                  class="inline-flex justify-between w-full border border-gray-300 shadow-sm px-4 md:py-2 py-1.5 bg-white text-sm text-gray-700 hover:bg-gray-50 focus:outline-none items-center focus:ring-indigo-500 focus:border-indigo-500 text-left"
                >
                  {#if property.property_id}
                    {property_types.find((p) => p.id == property.property_id)
                      ?.eng_name}-{property_types.find(
                      (p) => p.id == property.property_id
                    )?.dev_name}
                  {:else}
                    {"-- Select property type --"}
                  {/if}
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 -960 960 960"
                    class="lg:size-5 size-4 fill-gray-500 {isPropertyTypeOpen
                      ? '-rotate-90'
                      : 'rotate-90'}"
                  >
                    <path
                      d="m321-80-71-71 329-329-329-329 71-71 400 400L321-80Z"
                    />
                  </svg>
                </button>
                {#if isPropertyTypeOpen}
                  <div
                    transition:slide={{ duration: 400 }}
                    class="origin-top-right absolute right-0 mt-1 z-20 w-full shadow-lg bg-white ring-1 ring-black ring-opacity-5 border border-gray-300"
                  >
                    {#each property_types as option}
                      <button
                        on:click={() => {
                          property.property_id = option.id;
                          isPropertyTypeOpen = false;
                        }}
                        class="block w-full text-sm text-gray-500 font-lato px-4 py-1 text-left hover:bg-gray-100 border-b border-gray-300 last:border-none"
                      >
                        {option.eng_name}-{option.dev_name}
                      </button>
                    {/each}
                  </div>
                {/if}
              </div>
            </div>
          </div>
        </div>
        <div>
          <div class="border-b-2 border-gray-300 pb-2">
            <h1
              class="block lg:text-xl md:text-base text-sm capitalize font-semibold font-inter text-gray-700"
            >
              Property Address :
            </h1>
          </div>
          <div class="grid grid-cols-12 justify-center items-center gap-5 py-5">
            <div class="col-span-12">
              <div class="relative">
                <input
                  on:input={(e) => {
                    data.property_address = e.target.value.toUpperCase();
                    onInput("property_address");
                  }}
                  type="text"
                  id="address"
                  class="block w-full px-2.5 pb-2 pt-4 text-sm text-gray-900 bg-gray-50 rounded-t-lg border-b border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                  placeholder=" "
                  bind:value={data.property_address}
                />
                {#if errors["property_address"]}
                  {#if errors.property_address}
                    <Helper color="red" class="absolute">
                      {errors.property_address}
                    </Helper>
                  {/if}
                {/if}
                <label
                  for="mobile"
                  class="absolute capitalize text-sm text-gray-500 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] px-2 peer-focus:px-2 peer-focus:text-blue-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-5 left-1"
                >
                  Enter street address <span class="text-red-500">*</span>
                </label>
              </div>
            </div>
            <!-- <div class="col-span-4">
<div class="relative">
<input
type="text"
id="state"
class="block w-full px-2.5 pb-2.5 pt-4 text-sm text-gray-900 bg-gray-50 rounded-t-lg border-b border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer"
placeholder=" "
bind:value={card.state}
/>
<label
for="mobile"
class="absolute capitalize text-sm text-gray-500 duration-300 transform -translate-y-4 scale-75 top-3 z-10 origin-[0] px-2 peer-focus:px-2 peer-focus:text-blue-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-5 left-1"
>
state
</label>
</div>
</div> -->
            <div class="lg:col-span-3 md:col-span-6 col-span-12">
              <div class="relative">
                <input
                  on:input={(e) => {
                    data.property_district = e.target.value.toUpperCase();
                    onInput("property_district");
                  }}
                  type="text"
                  id="District"
                  class="block w-full px-2.5 pb-2 pt-4 text-sm text-gray-900 bg-gray-50 rounded-t-lg border-b border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                  placeholder=" "
                  bind:value={data.property_district}
                />
                {#if errors["property_district"]}
                  {#if errors.property_district}
                    <Helper color="red" class="absolute">
                      {errors.property_district}
                    </Helper>
                  {/if}
                {/if}
                <label
                  for="mobile"
                  class="absolute capitalize text-sm text-gray-500 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] px-2 peer-focus:px-2 peer-focus:text-blue-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-5 left-1"
                >
                  District <span class="text-red-500">*</span>
                </label>
              </div>
            </div>
            <div class="lg:col-span-3 md:col-span-6 col-span-12">
              <div class="relative">
                <input
                  on:input={(e) => {
                    data.property_taluka = e.target.value.toUpperCase();
                    onInput("property_taluka");
                  }}
                  type="text"
                  id="Taluka"
                  class="block w-full px-2.5 pb-2 pt-4 text-sm text-gray-900 bg-gray-50 rounded-t-lg border-b border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                  placeholder=" "
                  bind:value={data.property_taluka}
                />
                {#if errors["property_taluka"]}
                  {#if errors.property_taluka}
                    <Helper color="red" class="absolute">
                      {errors.property_taluka}
                    </Helper>
                  {/if}
                {/if}
                <label
                  for="mobile"
                  class="absolute capitalize text-sm text-gray-500 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] px-2 peer-focus:px-2 peer-focus:text-blue-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-5 left-1"
                >
                  Taluka <span class="text-red-500">*</span>
                </label>
              </div>
            </div>
            <div class="lg:col-span-3 md:col-span-6 col-span-12">
              <div class="relative">
                <input
                  on:input={(e) => {
                    data.property_place = e.target.value.toUpperCase();
                    onInput("property_place");
                  }}
                  type="text"
                  id="Place"
                  class="block w-full px-2.5 pb-2 pt-4 text-sm text-gray-900 bg-gray-50 rounded-t-lg border-b border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                  placeholder=" "
                  bind:value={data.property_place}
                />
                {#if errors["property_place"]}
                  {#if errors.property_place}
                    <Helper color="red" class="absolute">
                      {errors.property_place}
                    </Helper>
                  {/if}
                {/if}
                <label
                  for="mobile"
                  class="absolute capitalize text-sm text-gray-500 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] px-2 peer-focus:px-2 peer-focus:text-blue-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-5 left-1"
                >
                  Place <span class="text-red-500">*</span>
                </label>
              </div>
            </div>
            <div class="lg:col-span-3 md:col-span-6 col-span-12">
              <div class="relative">
                <input
                  on:input={(e) => {
                    data.property_pincode = e.target.value.toUpperCase();
                    onInput("property_pincode");
                  }}
                  type="text"
                  id="Pin Code"
                  class="block w-full px-2.5 pb-2 pt-4 text-sm text-gray-900 bg-gray-50 rounded-t-lg border-b border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                  placeholder=" "
                  bind:value={data.property_pincode}
                />
                {#if errors["property_pincode"]}
                  {#if errors.property_pincode}
                    <Helper color="red" class="absolute">
                      {errors.property_pincode}
                    </Helper>
                  {/if}
                {/if}
                <label
                  for="mobile"
                  class="absolute capitalize text-sm text-gray-500 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] px-2 peer-focus:px-2 peer-focus:text-blue-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-5 left-1"
                >
                  Pin Code <span class="text-red-500">*</span>
                </label>
              </div>
            </div>
          </div>
          <div class="grid grid-cols-12 gap-5 border-t border-gray-300 py-5">
            <div class="xl:col-span-3 lg:col-span-4 md:col-span-6 col-span-12">
              <label
                for="PropertyValue"
                class="block text-sm font-semibold font-roboto text-gray-500"
                >Property Value (in Rs)
              </label>
              <div class="mt-1">
                <input
                  on:input={(e) => {
                    data.property_value = e.target.value.toUpperCase();
                    onInput("property_value");
                  }}
                  type="text"
                  id="PropertyValue"
                  bind:value={data.property_value}
                  class="block w-full px-4 lg:py-2 py-1.5 border border-gray-300 placeholder:text-gray-400 xl:placeholder:text-base placeholder:text-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  placeholder="Enter Property Value..."
                />
                {#if errors["property_value"]}
                  {#if errors.property_value}
                    <Helper color="red" class="absolute">
                      {errors.property_value}
                    </Helper>
                  {/if}
                {/if}
              </div>
            </div>
            <div class="xl:col-span-3 lg:col-span-4 md:col-span-6 col-span-12">
              <label
                for="Area"
                class="block text-sm font-semibold font-roboto text-gray-500"
                >Area <span class="text-red-500">*</span>
              </label>
              <div class="mt-1">
                <input
                  on:input={(e) => {
                    data.property_area = e.target.value.toUpperCase();
                    onInput("property_area");
                  }}
                  type="text"
                  id="Area"
                  bind:value={data.property_area}
                  class="block w-full px-4 lg:py-2 py-1.5 border border-gray-300 placeholder:text-gray-400 xl:placeholder:text-base placeholder:text-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  placeholder="Enter Area (sq.ft)..."
                />
                {#if errors["property_area"]}
                  {#if errors.property_area}
                    <Helper color="red" class="absolute">
                      {errors.property_area}
                    </Helper>
                  {/if}
                {/if}
              </div>
            </div>
            <div
              class="xl:col-span-3 lg:col-span-4 md:col-span-6 col-span-12 relative"
            >
              <label
                for="dob"
                class="block text-sm font-semibold font-roboto text-gray-500 mb-1"
                >Purchase Date <span class="text-red-500">*</span>
              </label>
              <!-- <div class="mt-1 relative">
                <div
                  class="absolute inset-y-0 left-0 px-3 flex items-center pointer-events-none border-r border-gray-300"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 -960 960 960"
                    class="md:size-6 size-5 fill-gray-500"
                  >
                    <path
                      d="M480-400q-17 0-28.5-11.5T440-440q0-17 11.5-28.5T480-480q17 0 28.5 11.5T520-440q0 17-11.5 28.5T480-400Zm-160 0q-17 0-28.5-11.5T280-440q0-17 11.5-28.5T320-480q17 0 28.5 11.5T360-440q0 17-11.5 28.5T320-400Zm320 0q-17 0-28.5-11.5T600-440q0-17 11.5-28.5T640-480q17 0 28.5 11.5T680-440q0 17-11.5 28.5T640-400ZM480-240q-17 0-28.5-11.5T440-280q0-17 11.5-28.5T480-320q17 0 28.5 11.5T520-280q0 17-11.5 28.5T480-240Zm-160 0q-17 0-28.5-11.5T280-280q0-17 11.5-28.5T320-320q17 0 28.5 11.5T360-280q0 17-11.5 28.5T320-240Zm320 0q-17 0-28.5-11.5T600-280q0-17 11.5-28.5T640-320q17 0 28.5 11.5T680-280q0 17-11.5 28.5T640-240ZM200-80q-33 0-56.5-23.5T120-160v-560q0-33 23.5-56.5T200-800h40v-80h80v80h320v-80h80v80h40q33 0 56.5 23.5T840-720v560q0 33-23.5 56.5T760-80H200Zm0-80h560v-400H200v400Z"
                    />
                  </svg>
                </div>
                <input
                  type="text"
                  readonly
                  value={card.purchase_date.toLocaleDateString()}
                  on:click={() => (showDatePicker = !showDatePicker)}
                  class="block w-full pl-16 pr-3 lg:py-2 py-1.5 text-sm cursor-pointer border border-gray-300 uppercase font-roboto focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                />
              </div>
              <DatePicker
                selectedDate={card.purchase_date}
                onDateSelect={handleDateSelect}
                showPicker={showDatePicker}
              /> -->

              <input
                on:input={(e) => {
                  data.purchase_date = e.target.value;
                  onInput("purchase_date");
                }}
                type="date"
                name="dob"
                id="dob"
                bind:value={data.purchase_date}
                class="block w-full px-5 lg:py-2 py-1.5 border border-gray-300 uppercase font-roboto focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 text-sm"
              />
              {#if errors["purchase_date"]}
                {#if errors.purchase_date}
                  <Helper color="red" class="absolute">
                    {errors.purchase_date}
                  </Helper>
                {/if}
              {/if}
            </div>
          </div>
          {#if index > 0}
            <a
              href="#"
              on:click|preventDefault={() => deletePropertyCardApplicant(index)}
              class="flex justify-start items-center gap-2"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 -960 960 960"
                class="size-5 fill-rose-600 relative"
              >
                <path
                  d="M280-120q-33 0-56.5-23.5T200-200v-520h-40v-80h200v-40h240v40h200v80h-40v520q0 33-23.5 56.5T680-120H280Zm400-600H280v520h400v-520ZM360-280h80v-360h-80v360Zm160 0h80v-360h-80v360ZM280-720v520-520Z"
                />
              </svg>
              <span
                class="text-rose-600 font-robotoMono lg:text-base text-sm hover:underline hover:text-rose-700"
              >
                Remove Property
              </span>
            </a>
          {/if}
        </div>
      </div>
    {/each}

    <div class="md:px-10">
      <button
        on:click={addPropertyCardApplicant}
        class="relative rounded px-6 py-2 overflow-hidden group bg-Calypso-500 hover:bg-gradient-to-r hover:from-Cbg-Calypso-500 hover:to-Cbg-Calypso-400 text-white hover:ring-2 hover:ring-offset-2 hover:ring-Cbg-Calypso-400 transition-all ease-out duration-300"
      >
        <span
          class="absolute right-0 w-8 h-32 -mt-12 transition-all duration-1000 transform translate-x-12 bg-white opacity-10 rotate-12 group-hover:-translate-x-56 ease"
        />
        <div class="flex justify-start items-center gap-2">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 -960 960 960"
            class="size-4 fill-white relative"
          >
            <path
              d="M412-412H154v-136h258v-259h136v259h258v136H548v258H412v-258Z"
            />
          </svg>
          <span
            class="relative text-white font-robotoMono lg:text-base md:text-sm text-xs"
            >Add Property</span
          >
        </div>
      </button>
    </div>
  </div>
  <div class="border border-gray-300 rounded-lg shadow-lg md:p-5 p-3">
    <div class="border-b-2 border-gray-300 pb-2">
      <h1
        class="block xl:text-3xl lg:text-2xl md:text-xl text-lg capitalize font-semibold font-inter text-gray-700"
      >
        LIC Information :
      </h1>
    </div>
    {#each data.licPolicies as card, index}
      <div
        class="border border-deepPurple-300 shadow-lg rounded-md md:mx-5 my-5 md:px-5 px-3 py-5"
      >
        <div class="border-b-2 border-gray-300 pb-2">
          <h1
            class="block lg:text-xl md:text-base text-sm capitalize font-semibold font-inter text-gray-700"
          >
            LIC {index + 1} :
          </h1>
        </div>
        <div class="grid grid-cols-12 py-5 gap-5">
          <div class="md:col-span-6 col-span-12">
            <div class="grid grid-cols-12 justify-start items-center">
              <div class="lg:col-span-4 col-span-12">
                <h1
                  class="block lg:text-base text-sm font-roboto text-gray-500 text-start pr-5 font-semibold lg:font-medium"
                >
                  LIC Policy Number<span class="text-red-500">*</span>
                </h1>
              </div>
              <div class="hidden lg:block col-span-1">:</div>
              <div class="lg:col-span-6 col-span-12 lg:mt-0 mt-1">
                <input
                  on:input={(e) => {
                    data.policy_number = e.target.value.toUpperCase();
                    onInput("policy_number");
                  }}
                  type="text"
                  id="policyNumber"
                  bind:value={data.policy_number}
                  class="block w-full px-4 lg:py-2 py-1.5 border border-gray-300 placeholder:text-gray-400 xl:placeholder:text-base placeholder:text-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  placeholder="Enter LIC policy number..."
                />
                {#if errors["policy_number"]}
                  {#if errors.policy_number}
                    <Helper color="red" class="absolute">
                      {errors.policy_number}
                    </Helper>
                  {/if}
                {/if}
              </div>
            </div>
          </div>
          <div class="md:col-span-6 col-span-12">
            <div class="grid grid-cols-12 justify-start items-center">
              <div class="lg:col-span-4 col-span-12">
                <h1
                  class="block lg:text-base text-sm font-roboto text-gray-500 text-start pr-5 font-semibold lg:font-medium"
                >
                  Policy Type <span class="text-red-500">*</span>
                </h1>
              </div>
              <div class="hidden lg:block col-span-1">:</div>
              <div
                class="lg:col-span-6 col-span-12 lg:mt-0 mt-1 relative w-full"
              >
                <button
                  class="flex text-sm justify-between items-center w-full px-4 lg:py-2 py-1.5 bg-white border border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 text-left"
                  on:click={togglePolicyDropdown}
                >
                  {card.policy_type || "-- Select policy type --"}
                  <div>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 -960 960 960"
                      class="xl:size-5 size-4 fill-gray-500 {isPolicyTypeOpen
                        ? '-rotate-90'
                        : 'rotate-90'}"
                    >
                      <path
                        d="m321-80-71-71 329-329-329-329 71-71 400 400L321-80Z"
                      />
                    </svg>
                  </div>
                </button>
                {#if isPolicyTypeOpen}
                  <div
                    transition:slide={{ duration: 400 }}
                    class="absolute z-10 w-full mt-0.5 bg-white border border-gray-300"
                  >
                    {#each policyTypes as type}
                      <button
                        class="block w-full text-sm text-gray-500 font-lato px-4 py-1 text-left hover:bg-gray-100 border-b border-gray-300 last:border-none"
                        on:click={() => {
                          card.policy_type = type;
                          isPolicyTypeOpen = false;
                        }}
                      >
                        {type}
                      </button>
                    {/each}
                  </div>
                {/if}
              </div>
            </div>
          </div>
          <div class="md:col-span-6 col-span-12">
            <div class="grid grid-cols-12 justify-start items-center">
              <div class="lg:col-span-4 col-span-12">
                <h1
                  class="block lg:text-base text-sm font-marvel text-gray-500 text-start xl:pr-5 font-semibold lg:font-medium"
                >
                  Policy Amount <span class="text-red-500">*</span>
                </h1>
              </div>
              <div class="hidden lg:block col-span-1">:</div>
              <div class="lg:col-span-6 col-span-12 lg:mt-0 mt-1">
                <input
                  on:input={(e) => {
                    data.policy_amount = e.target.value;
                    onInput("policy_amount");
                  }}
                  type="text"
                  id="policyAmount"
                  bind:value={data.policy_amount}
                  class="block w-full px-4 lg:py-2 py-1.5 border border-gray-300 placeholder:text-gray-400 xl:placeholder:text-base placeholder:text-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  placeholder="sum assured..."
                />
                {#if errors["policy_amount"]}
                  {#if errors.policy_amount}
                    <Helper color="red" class="absolute">
                      {errors.policy_amount}
                    </Helper>
                  {/if}
                {/if}
              </div>
            </div>
          </div>
          <div class="md:col-span-6 col-span-12">
            <div class="grid grid-cols-12 justify-start items-center">
              <div class="lg:col-span-4 col-span-12">
                <h1
                  class="block lg:text-base text-sm font-marvel text-gray-500 text-start xl:pr-5 font-semibold lg:font-medium"
                >
                  Premium Amount <span class="text-red-500">*</span>
                </h1>
              </div>
              <div class="hidden lg:block col-span-1">:</div>
              <div class="lg:col-span-6 col-span-12 lg:mt-0 mt-1">
                <input
                  on:input={(e) => {
                    data.premium_amount = e.target.value;
                    onInput("premium_amount");
                  }}
                  type="text"
                  id="premium_amount"
                  bind:value={data.premium_amount}
                  class="block w-full px-4 lg:py-2 py-1.5 border border-gray-300 placeholder:text-gray-400 xl:placeholder:text-base placeholder:text-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  placeholder="premium amount..."
                />
                {#if errors["premium_amount"]}
                  {#if errors.premium_amount}
                    <Helper color="red" class="absolute">
                      {errors.premium_amount}
                    </Helper>
                  {/if}
                {/if}
              </div>
            </div>
          </div>
          <div class="md:col-span-6 col-span-12">
            <div class="grid grid-cols-12 justify-start items-center">
              <div class="lg:col-span-4 col-span-12">
                <h1
                  class="block lg:text-base text-sm font-marvel text-gray-500 text-start xl:pr-5 font-semibold lg:font-medium"
                >
                  Premium Frequency <span class="text-red-500">*</span>
                </h1>
              </div>
              <div class="hidden lg:block col-span-1">:</div>
              <div
                class="lg:col-span-6 col-span-12 lg:mt-0 mt-1 relative w-full"
              >
                <button
                  class="flex text-sm justify-between items-center w-full px-4 lg:py-2 py-1.5 bg-white border border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 text-left"
                  on:click={togglePremiumDropdown}
                >
                  {card.premium_frequency || "-- Select Premium --"}
                  <div>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 -960 960 960"
                      class="xl:size-5 size-4 fill-gray-500 {isPremiumOpen
                        ? '-rotate-90'
                        : 'rotate-90'}"
                    >
                      <path
                        d="m321-80-71-71 329-329-329-329 71-71 400 400L321-80Z"
                      />
                    </svg>
                  </div>
                </button>
                {#if isPremiumOpen}
                  <div
                    transition:slide={{ duration: 400 }}
                    class="absolute z-10 w-full mt-0.5 bg-white border border-gray-300"
                  >
                    {#each policyFrequencies as frequency}
                      <button
                        class="block w-full text-sm text-gray-500 font-lato px-4 py-1 text-left hover:bg-gray-100 border-b border-gray-300 last:border-none"
                        on:click={() => {
                          card.premium_frequency = frequency;
                          isPremiumOpen = false;
                        }}
                      >
                        {frequency}
                      </button>
                    {/each}
                  </div>
                {/if}
              </div>
            </div>
            <div class="grid grid-cols-12 justify-start items-center mt-4">
              <div class="lg:col-span-4 col-span-12">
                <h1
                  class="block lg:text-base text-sm font-marvel text-gray-500 text-start xl:pr-5 font-semibold lg:font-medium"
                >
                  LIC Policy Start date
                </h1>
              </div>
              <div class="hidden lg:block col-span-1">:</div>
              <div class="lg:col-span-6 col-span-12 lg:mt-0 mt-1">
                <input
                  on:input={(e) => {
                    data.purchase_date = e.target.value;
                    onInput("purchase_date");
                  }}
                  type="date"
                  name="dob"
                  id="dob"
                  bind:value={data.purchase_date}
                  class="block w-full px-5 lg:py-2 py-1.5 border border-gray-300 uppercase font-roboto focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 text-sm"
                />
                {#if errors["purchase_date"]}
                  {#if errors.purchase_date}
                    <Helper color="red" class="absolute">
                      {errors.purchase_date}
                    </Helper>
                  {/if}
                {/if}
              </div>
            </div>
          </div>
          <div class="md:col-span-6 col-span-12">
            <div class="grid grid-cols-12 justify-start items-center">
              <div class="lg:col-span-4 col-span-12">
                <h1
                  class="block lg:text-base text-sm font-marvel text-gray-500 text-start xl:pr-5 font-semibold lg:font-medium"
                >
                  Policy Term <span class="text-red-500">*</span>
                </h1>
              </div>
              <div class="hidden lg:block col-span-1">:</div>
              <div class="lg:col-span-6 col-span-12 lg:mt-0 mt-1">
                <input
                  on:input={(e) => {
                    data.policy_term = e.target.value;
                    onInput("policy_term");
                  }}
                  type="text"
                  id="policyTerm"
                  bind:value={data.policy_term}
                  class="block w-full px-4 lg:py-2 py-1.5 border border-gray-300 placeholder:text-gray-400 xl:placeholder:text-base placeholder:text-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  placeholder="term (year)..."
                />
                {#if errors["policy_term"]}
                  {#if errors.policy_term}
                    <Helper color="red" class="absolute">
                      {errors.policy_term}
                    </Helper>
                  {/if}
                {/if}
              </div>
            </div>
            <div class="grid grid-cols-12 justify-start items-center mt-4">
              <div class="lg:col-span-4 col-span-12">
                <h1
                  class="block lg:text-base text-sm font-marvel text-gray-500 text-start xl:pr-5 font-semibold lg:font-medium"
                >
                  Maturity start date
                </h1>
              </div>
              <div class="hidden lg:block col-span-1">:</div>
              <div class="lg:col-span-6 col-span-12 lg:mt-0 mt-1">
                <input
                  on:input={(e) => {
                    data.purchase_date = e.target.value;
                    onInput("purchase_date");
                  }}
                  type="date"
                  name="dob"
                  id="dob"
                  bind:value={data.purchase_date}
                  class="block w-full px-5 lg:py-2 py-1.5 border border-gray-300 uppercase font-roboto focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 text-sm"
                />
                {#if errors["purchase_date"]}
                  {#if errors.purchase_date}
                    <Helper color="red" class="absolute">
                      {errors.purchase_date}
                    </Helper>
                  {/if}
                {/if}
              </div>
            </div>
          </div>
        </div>
        {#if index > 0}
          <a
            href="#"
            on:click|preventDefault={() => deleteLicCardApplicant(index)}
            class="flex justify-start items-center gap-2"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 -960 960 960"
              class="size-5 fill-rose-600 relative"
            >
              <path
                d="M280-120q-33 0-56.5-23.5T200-200v-520h-40v-80h200v-40h240v40h200v80h-40v520q0 33-23.5 56.5T680-120H280Zm400-600H280v520h400v-520ZM360-280h80v-360h-80v360Zm160 0h80v-360h-80v360ZM280-720v520-520Z"
              />
            </svg>
            <span
              class="text-rose-600 font-robotoMono lg:text-base text-sm hover:underline hover:text-rose-700"
            >
              Remove LIC
            </span>
          </a>
        {/if}
      </div>
    {/each}
    <div class="md:px-10">
      <button
        on:click={addLicCardApplicant}
        class="relative rounded px-6 py-2 overflow-hidden group bg-Calypso-500 hover:bg-gradient-to-r hover:from-Cbg-Calypso-500 hover:to-Cbg-Calypso-400 text-white hover:ring-2 hover:ring-offset-2 hover:ring-Cbg-Calypso-400 transition-all ease-out duration-300"
      >
        <span
          class="absolute right-0 w-8 h-32 -mt-12 transition-all duration-1000 transform translate-x-12 bg-white opacity-10 rotate-12 group-hover:-translate-x-56 ease"
        />
        <div class="flex justify-start items-center gap-2">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 -960 960 960"
            class="size-4 fill-white relative"
          >
            <path
              d="M412-412H154v-136h258v-259h136v259h258v136H548v258H412v-258Z"
            />
          </svg>
          <span
            class="relative text-white font-robotoMono lg:text-base md:text-sm text-xs"
            >Add LIC</span
          >
        </div>
      </button>
    </div>
  </div>
  <div class="border border-gray-300 rounded-lg shadow-lg md:p-5 p-3">
    <div class="border-b-2 border-gray-300 pb-2">
      <h1
        class="block xl:text-3xl lg:text-2xl md:text-xl text-lg capitalize font-semibold font-inter text-gray-700"
      >
        FD Information :
      </h1>
    </div>
    {#each data.fds as card, index}
      <div
        class="border border-deepPurple-300 shadow-lg rounded-md md:mx-5 my-5 md:px-5 px-3 py-5"
      >
        <div class="border-b-2 border-gray-300 pb-2">
          <h1
            class="block lg:text-xl md:text-base text-sm capitalize font-semibold font-inter text-gray-700"
          >
            FD {index + 1}:
          </h1>
        </div>
        <div class="grid grid-cols-12 py-5 gap-5">
          <div class="md:col-span-6 col-span-12">
            <div class="grid grid-cols-12 justify-start items-center">
              <div class="lg:col-span-4 col-span-12">
                <h1
                  class="block lg:text-base text-sm font-roboto text-gray-500 text-start pr-5 font-semibold lg:font-medium"
                >
                  FD Account Number <span class="text-red-500">*</span>
                </h1>
              </div>
              <div class="hidden lg:block col-span-1">:</div>
              <div class="lg:col-span-6 col-span-12 lg:mt-0 mt-1">
                <input
                  on:input={(e) => {
                    data.fd_account_number = e.target.value;
                    onInput("fd_account_number");
                  }}
                  type="text"
                  id="accountNumber"
                  bind:value={data.fd_account_number}
                  class="block w-full px-4 lg:py-2 py-1.5 border border-gray-300 placeholder:text-gray-400 xl:placeholder:text-base placeholder:text-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  placeholder="Enter account number..."
                />
                {#if errors["fd_account_number"]}
                  {#if errors.fd_account_number}
                    <Helper color="red" class="absolute">
                      {errors.fd_account_number}
                    </Helper>
                  {/if}
                {/if}
              </div>
            </div>
          </div>
          <div class="md:col-span-6 col-span-12">
            <div class="grid grid-cols-12 justify-start items-center">
              <div class="lg:col-span-4 col-span-12">
                <h1
                  class="block lg:text-base text-sm font-roboto text-gray-500 text-start pr-5 font-semibold lg:font-medium"
                >
                  Bank Name <span class="text-red-500">*</span>
                </h1>
              </div>
              <div class="hidden lg:block col-span-1">:</div>
              <div class="lg:col-span-6 col-span-12 lg:mt-0 mt-1">
                <input
                  type="text"
                  id="bankName"
                  bind:value={card.bank_name}
                  class="block w-full px-4 lg:py-2 py-1.5 border border-gray-300 placeholder:text-gray-400 xl:placeholder:text-base placeholder:text-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  placeholder="Enter bank name..."
                />
              </div>
            </div>
          </div>
          <div class="md:col-span-6 col-span-12">
            <div class="grid grid-cols-12 justify-start items-center">
              <div class="lg:col-span-4 col-span-12">
                <h1
                  class="block lg:text-base text-sm font-roboto text-gray-500 text-start pr-5 font-semibold lg:font-medium"
                >
                  FD Amount <span class="text-red-500">*</span>
                </h1>
              </div>
              <div class="hidden lg:block col-span-1">:</div>
              <div class="lg:col-span-6 col-span-12 lg:mt-0 mt-1">
                <input
                  on:input={(e) => {
                    data.fd_amount = e.target.value;
                    onInput("fd_amount");
                  }}
                  type="text"
                  id="fdAmount"
                  bind:value={data.fd_amount}
                  class="block w-full px-4 lg:py-2 py-1.5 border border-gray-300 placeholder:text-gray-400 xl:placeholder:text-base placeholder:text-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  placeholder="Enter FD amount..."
                />
                {#if errors["fd_amount"]}
                  {#if errors.fd_amount}
                    <Helper color="red" class="absolute">
                      {errors.fd_amount}
                    </Helper>
                  {/if}
                {/if}
              </div>
            </div>
          </div>

          <div class="md:col-span-6 col-span-12">
            <div class="grid grid-cols-12 justify-start items-center">
              <div class="lg:col-span-4 col-span-12">
                <h1
                  class="block lg:text-base text-sm font-roboto text-gray-500 text-start pr-5 font-semibold lg:font-medium"
                >
                  Tenure <span class="text-red-500">*</span>
                </h1>
              </div>
              <div class="hidden lg:block col-span-1">:</div>
              <div class="lg:col-span-6 col-span-12 lg:mt-0 mt-1">
                <input
                  on:input={(e) => {
                    data.tenure = e.target.value;
                    onInput("tenure");
                  }}
                  type="text"
                  id="tenure"
                  bind:value={data.tenure}
                  class="block w-full px-4 lg:py-2 py-1.5 border border-gray-300 placeholder:text-gray-400 xl:placeholder:text-base placeholder:text-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  placeholder="Enter tenure (months)..."
                />
                {#if errors["tenure"]}
                  {#if errors.tenure}
                    <Helper color="red" class="absolute">
                      {errors.tenure}
                    </Helper>
                  {/if}
                {/if}
              </div>
            </div>
          </div>
          <div class="md:col-span-6 col-span-12">
            <div class="grid grid-cols-12 justify-start items-center">
              <div class="lg:col-span-4 col-span-12">
                <h1
                  class="block lg:text-base text-sm font-roboto text-gray-500 text-start pr-5 font-semibold lg:font-medium"
                >
                  Interest Rate <span class="text-red-500">*</span>
                </h1>
              </div>
              <div class="hidden lg:block col-span-1">:</div>
              <div class="lg:col-span-6 col-span-12 lg:mt-0 mt-1">
                <input
                  on:input={(e) => {
                    data.interest_rate = e.target.value;
                    onInput("interest_rate");
                  }}
                  type="text"
                  id="interestRate"
                  bind:value={data.interest_rate}
                  class="block w-full px-4 lg:py-2 py-1.5 border border-gray-300 placeholder:text-gray-400 xl:placeholder:text-base placeholder:text-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  placeholder="Enter interest rate (%)..."
                />
                {#if errors["interest_rate"]}
                  {#if errors.interest_rate}
                    <Helper color="red" class="absolute">
                      {errors.interest_rate}
                    </Helper>
                  {/if}
                {/if}
              </div>
            </div>
          </div>
          <div class="md:col-span-6 col-span-12">
            <div class="grid grid-cols-12 justify-start items-center">
              <div class="lg:col-span-4 col-span-12">
                <h1
                  class="block capitalize lg:text-base text-sm font-roboto text-gray-500 text-start pr-5 font-semibold lg:font-medium"
                >
                  FD start date
                </h1>
              </div>
              <div class="hidden lg:block col-span-1">:</div>
              <div class="lg:col-span-6 col-span-12 lg:mt-0 mt-1">
                <input
                  on:input={(e) => {
                    data.purchase_date = e.target.value;
                    onInput("purchase_date");
                  }}
                  type="date"
                  name="dob"
                  id="dob"
                  bind:value={data.purchase_date}
                  class="block w-full px-5 lg:py-2 py-1.5 border border-gray-300 uppercase font-roboto focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 text-sm"
                />
                {#if errors["purchase_date"]}
                  {#if errors.purchase_date}
                    <Helper color="red" class="absolute">
                      {errors.purchase_date}
                    </Helper>
                  {/if}
                {/if}
              </div>
            </div>
          </div>

          <div class="md:col-span-6 col-span-12">
            <div class="grid grid-cols-12 justify-start items-center">
              <div class="lg:col-span-4 col-span-12">
                <h1
                  class="block capitalize lg:text-base text-sm font-roboto text-gray-500 text-start pr-5 font-semibold lg:font-medium"
                >
                  FD Maturity date
                </h1>
              </div>
              <div class="hidden lg:block col-span-1">:</div>
              <div class="lg:col-span-6 col-span-12 lg:mt-0 mt-1">
                <input
                  on:input={(e) => {
                    data.purchase_date = e.target.value;
                    onInput("purchase_date");
                  }}
                  type="date"
                  name="dob"
                  id="dob"
                  bind:value={data.purchase_date}
                  class="block w-full px-5 lg:py-2 py-1.5 border border-gray-300 uppercase font-roboto focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 text-sm"
                />
                {#if errors["purchase_date"]}
                  {#if errors.purchase_date}
                    <Helper color="red" class="absolute">
                      {errors.purchase_date}
                    </Helper>
                  {/if}
                {/if}
              </div>
            </div>
          </div>
        </div>
        {#if index > 0}
          <a
            href="#"
            on:click|preventDefault={() => deleteFdCardApplicant(index)}
            class="flex justify-start items-center gap-2"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 -960 960 960"
              class="size-5 fill-rose-600 relative"
            >
              <path
                d="M280-120q-33 0-56.5-23.5T200-200v-520h-40v-80h200v-40h240v40h200v80h-40v520q0 33-23.5 56.5T680-120H280Zm400-600H280v520h400v-520ZM360-280h80v-360h-80v360Zm160 0h80v-360h-80v360ZM280-720v520-520Z"
              />
            </svg>
            <span
              class="text-rose-600 font-robotoMono lg:text-base text-sm hover:underline hover:text-rose-700"
            >
              Remove FD
            </span>
          </a>
        {/if}
      </div>
    {/each}
    <div class="md:px-10">
      <button
        on:click={addFdCardApplicant}
        class="relative rounded px-6 py-2 overflow-hidden group bg-Calypso-500 hover:bg-gradient-to-r hover:from-Cbg-Calypso-500 hover:to-Cbg-Calypso-400 text-white hover:ring-2 hover:ring-offset-2 hover:ring-Cbg-Calypso-400 transition-all ease-out duration-300"
      >
        <span
          class="absolute right-0 w-8 h-32 -mt-12 transition-all duration-1000 transform translate-x-12 bg-white opacity-10 rotate-12 group-hover:-translate-x-56 ease"
        />
        <div class="flex justify-start items-center gap-2">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 -960 960 960"
            class="size-4 fill-white relative"
          >
            <path
              d="M412-412H154v-136h258v-259h136v259h258v136H548v258H412v-258Z"
            />
          </svg>
          <span
            class="relative text-white font-robotoMono lg:text-base md:text-sm text-xs"
            >Add FD</span
          >
        </div>
      </button>
    </div>
  </div>

  <div class="w-auto">
    {#if alertMsg}
      <AlertMsg {alertMsg} />
    {/if}
  </div>

  <div class="flex justify-center items-center md:pt-5 gap-4">
    <button
    on:click={() => handleBackButtonClick()}
      class="group relative flex items-center justify-center gap-3 border border-gray-300 md:w-[200px] w-[150px] py-2 overflow-hidden bg-Calypso-400"
      on:click={handleBackButtonClick}
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
</div>
