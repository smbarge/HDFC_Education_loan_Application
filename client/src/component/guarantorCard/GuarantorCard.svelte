<script>
  import { slide } from "svelte/transition";
  import DatePicker from "../datePicker/DatePicker.svelte";
  import { createEventDispatcher } from "svelte";
  import { authApi } from "$api/authApi";
  import { token, refreshToken, username, id } from "$appstore/store.js";
  import AlertMsg from "$lib/forgotPassword/AlertMsg.svelte";
  import { FloatingLabelInput, Helper } from "flowbite-svelte";


  export let InvestmentGuarantorDetails;
  export let handleButtonClick;

  export let guarantorData;
  export let guarantorErrors;
  export let onGuarantorInput;
  export let onGuarantorSubmit;

  console.log("guarantorData", guarantorData);
  console.log("guarantorErrors", guarantorErrors);

  let showDatePicker = false;

  let dob = new Date(); // Initialize with current date or any other default date

  const dispatch = createEventDispatcher();

  // let inputData = {
  //   propertyDetails: [
  //     {
  //       investmentGuarantorId: "",
  //       property_type: "",
  //       ownership_status: "",
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
  //       investmentGuarantorId: "",
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
  //       investmentGuarantorId: "",
  //       fd_account_number: "",
  //       bank_name: "",
  //       fd_amount: "",
  //       tenure: "",
  //       interest_rate: "",
  //     },
  //   ],
  // };

  let isPropertyTypeOpen = false;
  let isOwnershipStatusOpen = false;
  let isPolicyTypeOpen = false;
  let isPremiumOpen = false;

  let propertyTypes = ["Residential", "Commercial", "Land"];
  let ownershipStatus = ["Owned", "Rented", "Leased"];
  let policyTypes = ["Endowment", "Term", "Whole Life", "Money Back"];
  let policyFrequencies = ["Monthly", "Quarterly", "Yearly"];

  function guarantorAddPropertyCard() {
    guarantorData.properties = [
      ...guarantorData.properties,
      {
        id: "",
        property_id:"",
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

  function guarantorAddLicCard() {
    guarantorData.licPolicies = [
      ...guarantorData.licPolicies,
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

  function guarantorAddFdCard() {
    guarantorData.fds = [
      ...guarantorData.fds,
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

  function handleBack() {
    window.scrollTo({ top: 0, behavior: "smooth" });

    dispatch("backToApplicant");
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

  function guarantorDeletePropertyCard(index) {
    if (guarantorData.properties.length > 1) {
      guarantorData.properties = guarantorData.properties.filter(
        (_, i) => i !== index
      );
    }
  }

  function guarantorDeleteLicCard(index) {
    if (guarantorData.licPolicies.length > 1) {
      guarantorData.licPolicies = guarantorData.licPolicies.filter((_, i) => i !== index);
    }
  }

  function guarantorDeleteFdCard(index) {
    if (guarantorData.fds.length > 1) {
      guarantorData.fds = guarantorData.fds.filter((_, i) => i !== index);
    }
  }

  const handleDateSelect = (date) => {
    dob = date; // Update dob when a date is selected
    showDatePicker = false;
  };
</script>

<div class="md:mx-10 mx-5 lg:my-10 my-5 space-y-5">
  <div class="border border-deepPurple-300 shadow-lg py-2 bg-deepPurple-100">
    <h1
      class="block md:text-xl text-base text-center capitalize font-semibold font-inter text-gray-700"
    >
      Guarantor Summary
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

    {#each guarantorData.properties as card, index}
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
                  Property Type
                </h1>
              </div>
              <div class="hidden lg:block col-span-1">:</div>
              <div
                class="lg:col-span-7 col-span-12 relative inline-block text-left w-full xl:mt-0 mt-1"
              >
                <button
                  class="flex text-sm justify-between items-center w-full px-4 md:py-2 py-1.5 bg-white border border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 text-left"
                  on:click={togglePropertyDropdown}
                >
                  {card.property_type || "-- Select property type --"}
                  <div>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 -960 960 960"
                      class="xl:size-5 size-4 fill-gray-500 {isPropertyTypeOpen
                        ? '-rotate-90'
                        : 'rotate-90'}"
                    >
                      <path
                        d="m321-80-71-71 329-329-329-329 71-71 400 400L321-80Z"
                      />
                    </svg>
                  </div>
                </button>
                {#if isPropertyTypeOpen}
                  <div
                    transition:slide={{ duration: 400 }}
                    class="absolute z-10 w-full mt-0.5 bg-white border border-gray-300"
                  >
                    {#each propertyTypes as type}
                      <button
                        class="w-full text-sm text-gray-500 font-lato px-4 py-1 text-left hover:bg-gray-100 border-b border-gray-300 last:border-none"
                        on:click={() => {
                          card.property_type = type;
                          isPropertyTypeOpen = false;
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
              <div class="lg:col-span-3 col-span-12">
                <h1
                  class="block xl:text-base text-sm font-roboto text-gray-500 text-start xl:pr-5 xl:font-medium font-semibold"
                >
                  Ownership Status
                </h1>
              </div>
              <div class="hidden lg:block col-span-1">:</div>
              <div
                class="lg:col-span-7 col-span-12 relative inline-block text-left w-full xl:mt-0 mt-1"
              >
                <button
                  class="flex text-sm justify-between items-center w-full px-4 md:py-2 py-1.5 bg-white border border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 text-left"
                  on:click={toggleOwnershipDropdown}
                >
                  {card.owner_type ||
                    "-- Select ownership status --"}
                  <div>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 -960 960 960"
                      class="xl:size-5 size-4 fill-gray-500 {isOwnershipStatusOpen
                        ? '-rotate-90'
                        : 'rotate-90'}"
                    >
                      <path
                        d="m321-80-71-71 329-329-329-329 71-71 400 400L321-80Z"
                      />
                    </svg>
                  </div>
                </button>
                {#if isOwnershipStatusOpen}
                  <div
                    transition:slide={{ duration: 400 }}
                    class="absolute z-10 w-full mt-0.5 bg-white border border-gray-300"
                  >
                    {#each ownershipStatus as status}
                      <button
                        class="w-full text-sm text-gray-500 font-lato px-4 py-1 text-left hover:bg-gray-100 border-b border-gray-300 last:border-none"
                        on:click={() => {
                          card.owner_type = status;
                          isOwnershipStatusOpen = false;
                        }}
                      >
                        {status}
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
              Property Address :<span class="text-red-500">*</span>
            </h1>
          </div>
          <div class="grid grid-cols-12 gap-5 py-5">
            <div class="col-span-12">
              <div class="relative">
                <input
                on:input={(e) => {
                  guarantorData.property_address = e.target.value;
                  onGuarantorInput("property_address");
                }}
                  type="text"
                  id="address"
                  class="block w-full px-2.5 pb-2 pt-4 text-sm text-gray-900 bg-gray-50 rounded-t-lg border-b border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                  placeholder=" "
                  bind:value={guarantorData.property_address}
                />
                {#if guarantorErrors["property_address"]}
                {#if guarantorErrors.property_address}
                  <Helper color="red" class="absolute">
                    {guarantorErrors.property_address}
                  </Helper>
                {/if}
              {/if}
                <label
                  for="mobile"
                  class="absolute capitalize text-sm text-gray-500 duration-300 transform -translate-y-4 scale-75 top-3 z-10 origin-[0] px-2 peer-focus:px-2 peer-focus:text-blue-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-5 left-1"
                >
                  Enter street address <span class="text-red-100">*</span>
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
                  guarantorData.property_district = e.target.value.toUpperCase();
                  onGuarantorInput("property_district");
                }}
                  type="text"
                  id="District"
                  class="block w-full px-2.5 pb-2 pt-4 text-sm text-gray-900 bg-gray-50 rounded-t-lg border-b border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                  placeholder=" "
                  bind:value={guarantorData.property_district}
                />
                {#if guarantorErrors["property_district"]}
                  {#if guarantorErrors.property_district}
                    <Helper color="red" class="absolute">
                      {guarantorErrors.property_district}
                    </Helper>
                  {/if}
                {/if}
                <label
                  for="mobile"
                  class="absolute capitalize text-sm text-gray-500 duration-300 transform -translate-y-4 scale-75 top-3 z-10 origin-[0] px-2 peer-focus:px-2 peer-focus:text-blue-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-5 left-1"
                >
                  District <span class="text-red-100">*</span>
                </label>
              </div>
            </div>
            <div class="lg:col-span-3 md:col-span-6 col-span-12">
              <div class="relative">
                <input
                on:input={(e) => {
                  guarantorData.property_taluka = e.target.value.toUpperCase();
                  onGuarantorInput("property_taluka");
                }}
                  type="text"
                  id="Taluka"
                  class="block w-full px-2.5 pb-2.5 pt-4 text-sm text-gray-900 bg-gray-50 rounded-t-lg border-b border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                  placeholder=" "
                  bind:value={guarantorData.property_taluka}
                />
                {#if guarantorErrors["property_taluka"]}
                {#if guarantorErrors.property_taluka}
                  <Helper color="red" class="absolute">
                    {guarantorErrors.property_taluka}
                  </Helper>
                {/if}
              {/if}
                <label
                  for="mobile"
                  class="absolute capitalize text-sm text-gray-500 duration-300 transform -translate-y-4 scale-75 top-3 z-10 origin-[0] px-2 peer-focus:px-2 peer-focus:text-blue-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-5 left-1"
                >
                  Taluka <span class="text-red-100">*</span>
                </label>
              </div>
            </div>
            <div class="lg:col-span-3 md:col-span-6 col-span-12">
              <div class="relative">
                <input
                on:input={(e) => {
                  guarantorData.property_place = e.target.value;
                  onGuarantorInput("property_place");
                }}
                  type="text"
                  id="Place"
                  class="block w-full px-2.5 pb-2.5 pt-4 text-sm text-gray-900 bg-gray-50 rounded-t-lg border-b border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                  placeholder=" "
                  bind:value={guarantorData.property_place}
                />
                {#if guarantorErrors["property_place"]}
                {#if guarantorErrors.property_place}
                  <Helper color="red" class="absolute">
                    {guarantorErrors.property_place}
                  </Helper>
                {/if}
              {/if}
                <label
                  for="mobile"
                  class="absolute capitalize text-sm text-gray-500 duration-300 transform -translate-y-4 scale-75 top-3 z-10 origin-[0] px-2 peer-focus:px-2 peer-focus:text-blue-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-5 left-1"
                >
                  Place <span class="text-red-100">*</span>
                </label>
              </div>
            </div>
            <div class="lg:col-span-3 md:col-span-6 col-span-12">
              <div class="relative">
                <input
                on:input={(e) => {
                  guarantorData.property_pincode = e.target.value.toUpperCase();
                  onGuarantorInput("property_pincode");
                }}
                  type="text"
                  id="Pin Code"
                  class="block w-full px-2.5 pb-2.5 pt-4 text-sm text-gray-900 bg-gray-50 rounded-t-lg border-b border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                  placeholder=" "
                  bind:value={guarantorData.property_pincode}
                />
                {#if guarantorErrors["property_pincode"]}
                {#if guarantorErrors.property_pincode}
                  <Helper color="red" class="absolute">
                    {guarantorErrors.property_pincode}
                  </Helper>
                {/if}
              {/if}
                <label
                  for="mobile"
                  class="absolute capitalize text-sm text-gray-500 duration-300 transform -translate-y-4 scale-75 top-3 z-10 origin-[0] px-2 peer-focus:px-2 peer-focus:text-blue-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-5 left-1"
                >
                  Pin Code <span class="text-red-100">*</span>
                </label>
              </div>
            </div>
          </div>
          <div class="grid grid-cols-12 gap-5 border-t border-gray-300 py-5">
            <div class="xl:col-span-3 lg:col-span-4 md:col-span-6 col-span-12">
              <label
                for="PropertyValue"
                class="block text-sm font-semibold font-roboto text-gray-500"
                >Property Value <span class="text-red-100">*</span>
              </label>
              <div class="mt-1">
                <input
                on:input={(e) => {
                  guarantorData.property_value = e.target.value;
                  onGuarantorInput("property_value");
                }}
                  type="text"
                  id="PropertyValue"
                  bind:value={guarantorData.property_value}
                  class="block w-full px-4 lg:py-2 py-1.5 border border-gray-300 placeholder:text-gray-400 xl:placeholder:text-base placeholder:text-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  placeholder="Enter Property Value..."
                />
                {#if guarantorErrors["property_value"]}
                  {#if guarantorErrors.property_value}
                    <Helper color="red" class="absolute">
                      {guarantorErrors.property_value}
                    </Helper>
                  {/if}
                {/if}
              </div>
            </div>
            <div class="xl:col-span-3 lg:col-span-4 md:col-span-6 col-span-12">
              <label
                for="Area"
                class="block text-sm font-semibold font-roboto text-gray-500"
                >Area <span class="text-red-100">*</span>
              </label>
              <div class="mt-1">
                <input
                on:input={(e) => {
                  guarantorData.property_area = e.target.value;
                  onGuarantorInput("property_area");
                }}
                  type="text"
                  id="Area"
                  bind:value={guarantorData.property_area}
                  class="block w-full px-4 lg:py-2 py-1.5 border border-gray-300 placeholder:text-gray-400 xl:placeholder:text-base placeholder:text-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  placeholder="Enter Area (sq.ft)..."
                />
                {#if guarantorErrors["property_area"]}
                  {#if guarantorErrors.property_area}
                    <Helper color="red" class="absolute">
                      {guarantorErrors.property_area}
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
                class="block text-sm font-semibold font-roboto text-gray-500"
                >Purchase Date <span class="text-red-100">*</span>
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
                  value={dob.toLocaleDateString()}
                  on:click={() => (showDatePicker = !showDatePicker)}
                  class="block w-full pl-16 pr-3 lg:py-2 py-1.5 text-sm cursor-pointer border border-gray-300 uppercase font-roboto focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                />
              </div>
              <DatePicker
                selectedDate={dob}
                onDateSelect={handleDateSelect}
                showPicker={showDatePicker}
              /> -->

              
              <input
              on:input={(e) => {
                guarantorData.purchase_date = e.target.value;
                onGuarantorInput("purchase_date");
              }}
                type="date"
                name="dob"
                id="dob"
                bind:value={guarantorData.purchase_date}
                class="block w-full px-5 lg:py-2 py-1.5 border border-gray-300 uppercase font-roboto focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 text-sm"
              />
              {#if guarantorErrors["purchase_date"]}
              {#if guarantorErrors.purchase_date}
                <Helper color="red" class="absolute">
                  {guarantorErrors.purchase_date}
                </Helper>
              {/if}
            {/if}
              <!-- <div
class="absolute inset-y-0 left-0 px-3 flex items-center pointer-events-none border-r border-gray-300"
>
<svg
xmlns="http://www.w3.org/2000/svg"
viewBox="0 -960 960 960"
class="size-6 fill-gray-500"
>
<path
d="M480-400q-17 0-28.5-11.5T440-440q0-17 11.5-28.5T480-480q17 0 28.5 11.5T520-440q0 17-11.5 28.5T480-400Zm-160 0q-17 0-28.5-11.5T280-440q0-17 11.5-28.5T320-480q17 0 28.5 11.5T360-440q0 17-11.5 28.5T320-400Zm320 0q-17 0-28.5-11.5T600-440q0-17 11.5-28.5T640-480q17 0 28.5 11.5T680-440q0 17-11.5 28.5T640-400ZM480-240q-17 0-28.5-11.5T440-280q0-17 11.5-28.5T480-320q17 0 28.5 11.5T520-280q0 17-11.5 28.5T480-240Zm-160 0q-17 0-28.5-11.5T280-280q0-17 11.5-28.5T320-320q17 0 28.5 11.5T360-280q0 17-11.5 28.5T320-240Zm320 0q-17 0-28.5-11.5T600-280q0-17 11.5-28.5T640-320q17 0 28.5 11.5T680-280q0 17-11.5 28.5T640-240ZM200-80q-33 0-56.5-23.5T120-160v-560q0-33 23.5-56.5T200-800h40v-80h80v80h320v-80h80v80h40q33 0 56.5 23.5T840-720v560q0 33-23.5 56.5T760-80H200Zm0-80h560v-400H200v400Z"
/>
</svg>
</div>
<input
type="date"
name="dob"
id="dob"
bind:value={card.selectedDate}
class="block w-full pl-16 pr-3 py-2 border border-gray-300 uppercase font-roboto focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 text-sm"
/> -->
            </div>
          </div>
          {#if index > 0}
            <a
              href="#"
              on:click|preventDefault={() => guarantorDeletePropertyCard(index)}
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
        on:click={guarantorAddPropertyCard}
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
    {#each guarantorData.licPolicies as card, index}
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
                  LIC Policy Number <span class="text-red-100">*</span>
                </h1>
              </div>
              <div class="hidden lg:block col-span-1">:</div>
              <div class="lg:col-span-6 col-span-12 lg:mt-0 mt-1">
                <input
                on:input={(e) => {
                  guarantorData.policy_number = e.target.value;
                  onGuarantorInput("policy_number");
                }}
                  type="text"
                  id="policyNumber"
                  bind:value={guarantorData.policy_number}
                  class="block w-full px-4 lg:py-2 py-1.5 border border-gray-300 placeholder:text-gray-400 xl:placeholder:text-base placeholder:text-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  placeholder="Enter LIC policy number..."
                />
                {#if guarantorErrors["policy_number"]}
                {#if guarantorErrors.policy_number}
                  <Helper color="red" class="absolute">
                    {guarantorErrors.policy_number}
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
                  Policy Type <span class="text-red-100">*</span>
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
                        class="w-full text-sm text-gray-500 font-lato px-4 py-1 text-left hover:bg-gray-100 border-b border-gray-300 last:border-none"
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
                  Policy Amount <span class="text-red-100">*</span>
                </h1>
              </div>
              <div class="hidden lg:block col-span-1">:</div>
              <div class="lg:col-span-6 col-span-12 lg:mt-0 mt-1">
                <input
                on:input={(e) => {
                  guarantorData.policy_amount = e.target.value;
                  onGuarantorInput("policy_amount");
                }}
                  type="text"
                  id="policyAmount"
                  bind:value={guarantorData.policy_amount}
                  class="block w-full px-4 lg:py-2 py-1.5 border border-gray-300 placeholder:text-gray-400 xl:placeholder:text-base placeholder:text-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  placeholder="sum assured..."
                />
                {#if guarantorErrors["policy_amount"]}
                {#if guarantorErrors.policy_amount}
                  <Helper color="red" class="absolute">
                    {guarantorErrors.policy_amount}
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
                  Premium Amount <span class="text-red-100">*</span>
                </h1>
              </div>
              <div class="hidden lg:block col-span-1">:</div>
              <div class="lg:col-span-6 col-span-12 lg:mt-0 mt-1">
                <input
                on:input={(e) => {
                  guarantorData.premium_amount = e.target.value;
                  onGuarantorInput("premium_amount");
                }}
                  type="text"
                  id="policyAmount"
                  bind:value={guarantorData.premium_amount}
                  class="block w-full px-4 lg:py-2 py-1.5 border border-gray-300 placeholder:text-gray-400 xl:placeholder:text-base placeholder:text-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  placeholder="premium amount..."
                />
                {#if guarantorErrors["premium_amount"]}
                {#if guarantorErrors.premium_amount}
                  <Helper color="red" class="absolute">
                    {guarantorErrors.premium_amount}
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
                  Premium Frequency <span class="text-red-100">*</span>
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
          </div>
          <div class="md:col-span-6 col-span-12">
            <div class="grid grid-cols-12 justify-start items-center">
              <div class="lg:col-span-4 col-span-12">
                <h1
                  class="block lg:text-base text-sm font-marvel text-gray-500 text-start xl:pr-5 font-semibold lg:font-medium"
                >
                  Policy Term <span class="text-red-100">*</span>
                </h1>
              </div>
              <div class="hidden lg:block col-span-1">:</div>
              <div class="lg:col-span-6 col-span-12 lg:mt-0 mt-1">
                <input
                on:input={(e) => {
                  guarantorData.policy_term = e.target.value;
                  onGuarantorInput("policy_term");
                }}
                  type="text"
                  id="policyTerm"
                  bind:value={guarantorData.policy_term}
                  class="block w-full px-4 lg:py-2 py-1.5 border border-gray-300 placeholder:text-gray-400 xl:placeholder:text-base placeholder:text-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  placeholder="term (year)..."
                />
                {#if guarantorErrors["policy_term"]}
                {#if guarantorErrors.policy_term}
                  <Helper color="red" class="absolute">
                    {guarantorErrors.policy_term}
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
            on:click|preventDefault={() => guarantorDeleteLicCard(index)}
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
        on:click={guarantorAddLicCard}
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
    {#each guarantorData.fds as card, index}
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
                  FD Account Number <span class="text-red-100">*</span>
                </h1>
              </div>
              <div class="hidden lg:block col-span-1">:</div>
              <div class="lg:col-span-6 col-span-12 lg:mt-0 mt-1">
                <input
                on:input={(e) => {
                  guarantorData.fd_account_number = e.target.value;
                  onGuarantorInput("fd_account_number");
                }}
                  type="text"
                  id="accountNumber"
                  bind:value={guarantorData.fd_account_number}
                  class="block w-full px-4 lg:py-2 py-1.5 border border-gray-300 placeholder:text-gray-400 xl:placeholder:text-base placeholder:text-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  placeholder="Enter account number..."
                />
                {#if guarantorErrors["fd_account_number"]}
                {#if guarantorErrors.fd_account_number}
                  <Helper color="red" class="absolute">
                    {guarantorErrors.fd_account_number}
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
                  Bank Name <span class="text-red-100">*</span>
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
                  FD Amount <span class="text-red-100">*</span>
                </h1>
              </div>
              <div class="hidden lg:block col-span-1">:</div>
              <div class="lg:col-span-6 col-span-12 lg:mt-0 mt-1">
                <input
                on:input={(e) => {
                  guarantorData.fd_amount = e.target.value;
                  onGuarantorInput("fd_amount");
                }}
                  type="text"
                  id="fdAmount"
                  bind:value={guarantorData.fd_amount}
                  class="block w-full px-4 lg:py-2 py-1.5 border border-gray-300 placeholder:text-gray-400 xl:placeholder:text-base placeholder:text-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  placeholder="Enter FD amount..."
                />
                {#if guarantorErrors["fd_amount"]}
                {#if guarantorErrors.fd_amount}
                  <Helper color="red" class="absolute">
                    {guarantorErrors.fd_amount}
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
                  Tenure <span class="text-red-100">*</span>
                </h1>
              </div>
              <div class="hidden lg:block col-span-1">:</div>
              <div class="lg:col-span-6 col-span-12 lg:mt-0 mt-1">
                <input
                on:input={(e) => {
                  guarantorData.tenure = e.target.value;
                  onGuarantorInput("tenure");
                }}
                  type="text"
                  id="tenure"
                  bind:value={guarantorData.tenure}
                  class="block w-full px-4 lg:py-2 py-1.5 border border-gray-300 placeholder:text-gray-400 xl:placeholder:text-base placeholder:text-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  placeholder="Enter tenure (months)..."
                />
                {#if guarantorErrors["tenure"]}
                {#if guarantorErrors.tenure}
                  <Helper color="red" class="absolute">
                    {guarantorErrors.tenure}
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
                  Interest Rate <span class="text-red-100">*</span>
                </h1>
              </div>
              <div class="hidden lg:block col-span-1">:</div>
              <div class="lg:col-span-6 col-span-12 lg:mt-0 mt-1">
                <input
                on:input={(e) => {
                  guarantorData.interest_rate = e.target.value.toUpperCase();
                  onGuarantorInput("interest_rate");
                }}
                  type="text"
                  id="interestRate"
                  bind:value={guarantorData.interest_rate}
                  class="block w-full px-4 lg:py-2 py-1.5 border border-gray-300 placeholder:text-gray-400 xl:placeholder:text-base placeholder:text-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  placeholder="Enter interest rate (%)..."
                />
                {#if guarantorErrors["interest_rate"]}
                {#if guarantorErrors.interest_rate}
                  <Helper color="red" class="absolute">
                    {guarantorErrors.interest_rate}
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
            on:click|preventDefault={() => guarantorDeleteFdCard(index)}
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
        on:click={guarantorAddFdCard}
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
  <div class="flex justify-center items-center py-5 gap-4">
    <button
      on:click={handleBack}
      class="relative px-6 py-2 overflow-hidden group bg-Calypso-400 hover:bg-gradient-to-r hover:from-Cbg-Calypso-500 hover:to-Cbg-Calypso-400 text-white hover:ring-2 hover:ring-offset-2 hover:ring-Cbg-Calypso-400 transition-all ease-out duration-300"
    >
      <span
        class="absolute right-0 w-8 h-32 -mt-12 transition-all duration-1000 transform translate-x-12 bg-white opacity-10 rotate-12 group-hover:-translate-x-60 ease"
      />

      <span
        class="relative lg:text-lg md:text-base text-sm text-gray-800 font-roboto font-semibold"
      >
        Back to Applicant
      </span>
    </button>
    <button
      on:click={onGuarantorSubmit}
      class="group relative flex items-center justify-center gap-3 border border-gray-300 md:w-[200px] w-[150px] py-2 overflow-hidden bg-Calypso-400"
    >
      <span
        class="absolute w-0 h-0 transition-all duration-500 ease-out bg-Calypso-500 group-hover:w-[300px] group-hover:h-56"
      />
      <span class="absolute inset-0 w-full h-full opacity-30" />

      <h1
        class="relative font-roboto capitalize font-semibold lg:text-xl md:text-base text-sm text-gray-800 group-hover:text-white"
      >
        Proceed
      </h1>
      <span class="relative">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 -960 960 960"
          class="md:size-7 size-5 fill-gray-800 group-hover:fill-white"
        >
          <path
            d="m700-300-57-56 84-84H120v-80h607l-83-84 57-56 179 180-180 180Z"
          />
        </svg>
      </span>
    </button>
  </div>
</div>
