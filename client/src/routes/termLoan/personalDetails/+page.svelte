
<script>
  import { slide } from "svelte/transition";

  let gender = "";
  let marital = "";
  let hasGivenSurety = "";
  let suretyDetails = "";

  let currentAddress = {
    street: "",
    district: "",
    place: "",
    pincode: "",
  };

  let permanentAddress = {
    street: "",
    district: "",
    place: "",
    pincode: "",
  };

  let sameAsCurrent = false;

  function toggleSameAsCurrent() {
    if (sameAsCurrent) {
      permanentAddress = { ...currentAddress };
    } else {
      permanentAddress = {
        street: "",
        district: "",
        place: "",
        pincode: "",
      };
    }
  }

  let isCurrentDistrictOpen = false;
  let isPermanentDistrictOpen = false;

  let districts = ["District 1", "District 2", "District 3", "District 4"];

  function toggleCurrentDropdown() {
    isCurrentDistrictOpen = !isCurrentDistrictOpen;
  }

  function selectCurrentDistrict(district) {
    currentAddress.district = district;
    isCurrentDistrictOpen = false;
    if (sameAsCurrent) {
      permanentAddress.district = district;
    }
  }

  function togglePermanentDropdown() {
    isPermanentDistrictOpen = !isPermanentDistrictOpen;
  }

  function selectPermanentDistrict(district) {
    permanentAddress.district = district;
    isPermanentDistrictOpen = false;
  }

  function handleSuretyChange(value) {
    hasGivenSurety = value;
  }
</script>

<div class="grid grid-cols-12 mx-10 my-5">
  <div class="col-span-12 space-y-5">
    <div class="bg-white shadow-lg border rounded-lg">
      <div class="border-b border-gray-300 p-5">
        <div class="border-b-2 border-gray-300 pb-2">
          <h1
            class="block text-xl capitalize font-semibold font-inter text-gray-700"
          >
            current Address :
          </h1>
        </div>
        <div class="grid grid-cols-12 gap-5 p-5">
          <div class="col-span-12">
            <label
              for="streetAddress"
              class="block text-sm font-semibold text-gray-500"
              >Current Street Address</label
            >
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
                type="text"
                id="streetAddress"
                bind:value={currentAddress.street}
                class="block w-full pl-14 pr-3 py-2 placeholder:font-robotoMono border border-gray-300 placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                placeholder="Enter street address ..."
              />
            </div>
          </div>

          <div class="col-span-4">
            <label
              for="city"
              class="block text-sm font-semibold font-roboto text-gray-500"
              >Place</label
            >
            <div class="mt-1">
              <input
                type="text"
                id="city"
                bind:value={currentAddress.place}
                class="block w-full px-4 py-2 placeholder:font-robotoMono border border-gray-300 placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                placeholder="Enter place..."
              />
            </div>
          </div>
          <div class="col-span-4">
            <label
              for="district"
              class="block text-sm font-semibold font-roboto text-gray-500 mb-1"
              >District</label
            >
            <div class="relative">
              <button
                on:click={toggleCurrentDropdown}
                class="flex text-sm justify-between items-center w-full px-4 py-2 bg-white border border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 text-left"
              >
                {#if currentAddress.district}
                  {currentAddress.district}
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

              {#if isCurrentDistrictOpen}
                <div
                  transition:slide={{ duration: 400 }}
                  class="absolute z-10 w-full mt-0.5 bg-white border border-gray-300"
                >
                  {#each districts as district, index}
                    <button
                      on:click={() => selectCurrentDistrict(district)}
                      class="w-full text-sm text-gray-500 font-lato px-4 py-1 text-left hover:bg-gray-100 {index !==
                      districts.length - 1
                        ? 'border-b'
                        : ''}"
                    >
                      {district}
                    </button>
                  {/each}
                </div>
              {/if}
            </div>
          </div>
          <div class="col-span-4">
            <label
              for="pinCode"
              class="block text-sm font-semibold font-roboto text-gray-500"
              >Pin Code</label
            >
            <div class="mt-1">
              <input
                type="text"
                id="pinCode"
                bind:value={currentAddress.pincode}
                class="block w-full px-4 py-2 placeholder:font-robotoMono border border-gray-300 placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                placeholder="Enter pincode..."
              />
            </div>
          </div>
        </div>
      </div>

      <div class="border-b border-gray-300 p-5">
        <div class="flex justify-normal items-center gap-2 mb-5">
          <input
            type="checkbox"
            bind:checked={sameAsCurrent}
            on:change={toggleSameAsCurrent}
            class="cursor-pointer"
          />
          <h1 class="block text-gray-600 font-roboto text-sm">
            Is your current address the same as your permanent address?
          </h1>
        </div>
        <div class="border-b-2 border-gray-300 pb-2">
          <h1
            class="block text-xl capitalize font-semibold font-inter text-gray-600"
          >
            Permanent Address :
          </h1>
        </div>
        <div class="grid grid-cols-12 gap-5 p-5">
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
                type="text"
                id="streetAddress"
                bind:value={permanentAddress.street}
                disabled={sameAsCurrent}
                class="block w-full pl-20 pr-3 py-2 placeholder:font-robotoMono border border-gray-300 placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                placeholder="Enter street address ..."
              />
            </div>
          </div>

          <div class="col-span-4">
            <label
              for="city"
              class="block text-sm font-semibold font-roboto text-gray-500"
              >Place</label
            >
            <div class="mt-1">
              <input
                type="text"
                id="city"
                bind:value={permanentAddress.place}
                disabled={sameAsCurrent}
                class="block w-full px-4 py-2 placeholder:font-robotoMono border border-gray-300 placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                placeholder="Enter city..."
              />
            </div>
          </div>
          <div class="col-span-4">
            <label
              for="district"
              class="block text-sm font-semibold font-roboto text-gray-500 mb-1"
              >District</label
            >
            <div class="relative">
              <button
                on:click={togglePermanentDropdown}
                disabled={sameAsCurrent}
                class="flex text-sm justify-between items-center w-full px-4 py-2 bg-white border border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 text-left"
              >
                {#if permanentAddress.district}
                  {permanentAddress.district}
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

              {#if isPermanentDistrictOpen}
                <div
                  transition:slide={{ duration: 400 }}
                  class="absolute z-10 w-full mt-0.5 bg-white border border-gray-300"
                >
                  {#each districts as district, index}
                    <button
                      on:click={() => selectPermanentDistrict(district)}
                      class="w-full text-sm text-gray-500 font-lato px-4 py-1 text-left hover:bg-gray-100 {index !==
                      districts.length - 1
                        ? 'border-b'
                        : ''}"
                    >
                      {district}
                    </button>
                  {/each}
                </div>
              {/if}
            </div>
          </div>
          <div class="col-span-4">
            <label
              for="pinCode"
              class="block text-sm font-semibold font-roboto text-gray-500"
              >Pin Code</label
            >
            <div class="mt-1">
              <input
                type="text"
                id="pinCode"
                bind:value={permanentAddress.pincode}
                disabled={sameAsCurrent}
                class="block w-full px-4 py-2 placeholder:font-robotoMono border border-gray-300 placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                placeholder="Enter pincode..."
              />
            </div>
          </div>
        </div>
      </div>
      <div class="grid grid-cols-4 gap-5 p-5">
        <div class="col-span-1">
          <h1 class="block text-sm font-medium text-gray-500 capitalize">
            marital status
          </h1>
          <div class="mt-2.5 flex">
            <label class="inline-flex items-center cursor-pointer">
              <input
                type="radio"
                name="marital"
                value="male"
                bind:group={marital}
                class="form-radio size-4"
              />
              <span class="ml-2 text-gray-500 text-sm">Married</span>
            </label>
            <label class="inline-flex items-center ml-6 cursor-pointer">
              <input
                type="radio"
                name="marital"
                value="female"
                bind:group={marital}
                class="form-radio size-4"
              />
              <span class="ml-2 text-gray-500 text-sm">Unmarried</span>
            </label>
          </div>
        </div>
        <div class="col-span-1">
          <label
            for="educational"
            class="block capitalize text-sm font-medium text-gray-500"
            >Educational qualifications
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
                  d="M840-280v-276L480-360 40-600l440-240 440 240v320h-80ZM480-120 200-272v-200l280 152 280-152v200L480-120Z"
                />
              </svg>
            </div>
            <input
              type="text"
              name="educational"
              id="educational"
              class="block w-full pl-12 pr-3 py-2 border border-gray-300 placeholder:text-xs placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              placeholder="Enter educational qualifications..."
            />
          </div>
        </div>
        <div class="col-span-1">
          <label
            for="occupation"
            class="block capitalize text-sm font-medium text-gray-500"
            >occupation of father/husband
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
              class="block w-full pl-[42px] pr-3 py-2 border border-gray-300 placeholder:text-xs placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              placeholder="Enter occupation of father/husband..."
            />
          </div>
        </div>

        <div class="col-span-1">
          <label for="fullName" class="block text-sm font-medium text-gray-500"
            >Annual Income Of Family
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
                <g id="SVGRepo_bgCarrier" stroke-width="0"></g><g
                  id="SVGRepo_tracerCarrier"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                >
                </g>
                <g id="SVGRepo_iconCarrier">
                  <path
                    d="M308 96c6.627 0 12-5.373 12-12V44c0-6.627-5.373-12-12-12H12C5.373 32 0 37.373 0 44v44.748c0 6.627 5.373 12 12 12h85.28c27.308 0 48.261 9.958 60.97 27.252H12c-6.627 0-12 5.373-12 12v40c0 6.627 5.373 12 12 12h158.757c-6.217 36.086-32.961 58.632-74.757 58.632H12c-6.627 0-12 5.373-12 12v53.012c0 3.349 1.4 6.546 3.861 8.818l165.052 152.356a12.001 12.001 0 0 0 8.139 3.182h82.562c10.924 0 16.166-13.408 8.139-20.818L116.871 319.906c76.499-2.34 131.144-53.395 138.318-127.906H308c6.627 0 12-5.373 12-12v-40c0-6.627-5.373-12-12-12h-58.69c-3.486-11.541-8.28-22.246-14.252-32H308z"
                  >
                  </path>
                </g>
              </svg>
            </div>
            <input
              type="text"
              name="annual income"
              id="annual income"
              class="block w-full pl-[42px] pr-3 py-2 border border-gray-300 placeholder:text-xs placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              placeholder="Enter annual income of family..."
            />
          </div>
        </div>
      </div>
      <div class="px-5 space-y-5">
        <div class="grid grid-cols-12 gap-5 justify-start items-center">
          <div class="col-span-5">
            <h1 class="text-sm text-gray-600 font-roboto">
              Has the applicant or guarantor previously provided surety for
              anyone else?
            </h1>
            <label
              for="suretyDetails"
              class="block text-[10px] text-gray-500 font-robotoMono"
              >(If yes, please provide details)</label
            >
          </div>
          <div class="col-span-2 flex items-center gap-5">
            <button
              type="button"
              class={`${
                hasGivenSurety === "yes"
                  ? "bg-primary-400 text-white"
                  : "bg-gray-100 text-gray-500"
              } w-full border border-gray-500 text-sm font-bold px-4`}
              on:click={() => handleSuretyChange("yes")}
            >
              Yes
            </button>
            <button
              type="button"
              class={`${
                hasGivenSurety === "no"
                  ? "bg-rose-400 text-white"
                  : "bg-gray-100 text-gray-500"
              } w-full border border-gray-500 text-sm font-bold px-4`}
              on:click={() => handleSuretyChange("no")}
            >
              No
            </button>
          </div>
          {#if hasGivenSurety == "yes"}
            <div class="col-span-5">
              <input
                type="text"
                id="suretyDetails"
                name="suretyDetails"
                bind:value={suretyDetails}
                class="block w-full px-3 py-2 border border-gray-300 placeholder:text-xs placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                placeholder="Enter details here..."
              />
              <!-- <textarea
                id="suretyDetails"
                name="suretyDetails"
                rows="2"
                bind:value={suretyDetails}
                class="p-3 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 text-sm"
                placeholder="Enter details here..."
              ></textarea> -->
            </div>
          {/if}
        </div>
        <div class="grid grid-cols-12 gap-5 justify-start items-center">
          <div class="col-span-5">
            <h1 class="text-sm text-gray-600 font-roboto">
              Is the applicant a Divorced/Widowed/Riot victim/Natural calamity
              victim/Disabled person?
            </h1>
          </div>
          <div class="col-span-2 flex items-center gap-5">
            <button
              type="button"
              class="bg-gray-100 text-gray-500 text-sm w-full border border-gray-500 font-bold px-4"
            >
              Yes
            </button>
            <button
              type="button"
              class="bg-gray-100 text-gray-500 text-sm w-full border border-gray-500 font-bold px-4"
            >
              No
            </button>
          </div>
        </div>
        <div class="grid grid-cols-12 gap-5 justify-start items-center">
          <div class="col-span-5">
            <h1 class="text-sm text-gray-600 font-roboto">
              Description of the property or any information about LIC/FD.
            </h1>
          </div>
          <div class="col-span-6">
            <input
              type="text"
              id="Name"
              class="block w-full px-3 py-1 border border-gray-300 placeholder:text-xs placeholder:font-robotoMono placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              placeholder="Enter ther information about Property/LIC/FD..."
            />
          </div>
        </div>
      </div>
    </div>
  </div>
</div>
