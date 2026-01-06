<script>
  import { slide } from "svelte/transition";
  import { Helper } from "flowbite-svelte";
  import {
    token,
    refreshToken,
    username,
    id,
    masters,
  } from "$appstore/store.js";
  import { onMount } from "svelte";

  export let data;
  export let errors;
  export let onInput;
  export let onSubmit;
  export let handleBackButtonClick;
  // console.log("data in buisness",data);

  let isBusinessDistrictOpen = false;
  let isBusinessTalukaOpen = false;

  let districts = $masters.m_district.sort((a, b) =>
    a.eng_name.localeCompare(b.eng_name)
  );
  let talukas = data.business_district
    ? $masters.m_taluka
        .filter((t) => t.dist_id == data.business_district)
        .sort((a, b) => a.eng_name.localeCompare(b.eng_name))
    : [];

  let organization_types = [...$masters.m_organization_type];
  let isOrganizationTypeDropdownOpen = false;
  function toggleOrganizationTypeDropdown() {
    isOrganizationTypeDropdownOpen = !isOrganizationTypeDropdownOpen;
  }
  function toggleBusinessDistrictDropdown() {
    isBusinessDistrictOpen = !isBusinessDistrictOpen;
  }

  function toggleBusinessTalukaDropdown() {
    isBusinessTalukaOpen = !isBusinessTalukaOpen;
  }

  function selectBusinessDistrict(district) {
    data.business_taluka = 0;
    talukas = [];
    data.business_district = district.dist_id;
    talukas = data.business_district
      ? $masters.m_taluka
          .filter((t) => t.dist_id == data.business_district)
          .sort((a, b) => a.eng_name.localeCompare(b.eng_name))
      : [];
    onInput("business_district");
    isBusinessDistrictOpen = false;
  }
  function selectOrganizationType(org) {
    data.org_type = org.id;
    onInput("org_type");
    isOrganizationTypeDropdownOpen = false;
  }

  function selectBusinessTaluka(taluka) {
    data.business_taluka = taluka.taluka_id;
    onInput("business_taluka");
    isBusinessTalukaOpen = false;
  }

  const onProceed = async () => {
    console.log("submitBusinessDetailsAndRedirect called", $id);
  };
</script>

<div class="lg:mx-10 mx-5 my-10 space-y-5">
  <div class="border bg-white shadow-lg rounded-lg py-5 xl:px-10 px-5">
    <div>
      <h1
        class="xl:text-3xl lg:text-2xl md:text-xl text-lg capitalize font-bold font-roboto py-1 text-gray-700 border-b-2 border-gray-300"
      >
        Applicant business Details :
        <h1
          class="xl:text-1xl lg:text-1xl md:text-xl text-lg capitalize font-bold font-roboto py-1 text-gray-700"
        >
          अर्जदाराचे व्यवसाय माहिती
        </h1>
      </h1>
    </div>

    <div class="grid grid-cols-12 gap-5 md:px-5 py-5">
      <div class="col-span-12 md:col-span-6">
        <div class="grid grid-cols-12 justify-start items-center">
          <div class="col-span-12 xl:col-span-4">
            <h1
              class="block xl:text-base text-sm font-marvel text-gray-500 xl:text-end pr-5 xl:font-medium font-semibold"
            >
              Business Name <span class="text-red-500">*</span> <br />
            </h1>
            <h1
              class="block xl:text-base text-sm font-marvel text-gray-500 xl:text-end pr-8 xl:font-medium font-semibold"
            >
              व्यवसायाचे नाव
            </h1>
          </div>
          <div class="hidden xl:block col-span-1">:</div>
          <div class="xl:col-span-7 col-span-12 xl:mt-0 mt-1 relative">
            <div
              class="absolute inset-y-0 left-0 px-3 flex items-center pointer-events-none border-r border-gray-300"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 -960 960 960"
                class="size-5 fill-gray-500"
              >
                <path
                  d="M40-160v-160q0-34 23.5-57t56.5-23h131q20 0 38 10t29 27q29 39 71.5 61t90.5 22q49 0 91.5-22t70.5-61q13-17 30.5-27t36.5-10h131q34 0 57 23t23 57v160H640v-91q-35 25-75.5 38T480-200q-43 0-84-13.5T320-252v92H40Zm440-160q-38 0-72-17.5T351-386q-17-25-42.5-39.5T253-440q22-37 93-58.5T480-520q63 0 134 21.5t93 58.5q-29 0-55 14.5T609-386q-22 32-56 49t-73 17ZM160-440q-50 0-85-35t-35-85q0-51 35-85.5t85-34.5q51 0 85.5 34.5T280-560q0 50-34.5 85T160-440Zm640 0q-50 0-85-35t-35-85q0-51 35-85.5t85-34.5q51 0 85.5 34.5T920-560q0 50-34.5 85T800-440ZM480-560q-50 0-85-35t-35-85q0-51 35-85.5t85-34.5q51 0 85.5 34.5T600-680q0 50-34.5 85T480-560Z"
                />
              </svg>
            </div>
            <input
              type="text"
              name="bussinessName"
              id="bussinessName"
              class="block w-full pl-14 pr-3 md:py-2 py-1.5 text-sm border border-gray-300 placeholder:text-gray-400 placeholder:text-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
              placeholder="Enter business name..."
              bind:value={data.business_name}
              on:input={(e) => {
                data.business_name = e.target.value.toUpperCase();
                onInput("business_name");
              }}
            />
            <div class="ml-8 mt-1">
              {#if errors.business_name}
                {#if errors.business_name}
                  <Helper color="red" class="absolute">
                    {errors.business_name}
                  </Helper>
                {/if}
              {/if}
            </div>
          </div>
        </div>
      </div>

      <div class="col-span-12 md:col-span-6">
        <div class="grid grid-cols-12 justify-start items-center">
          <div class="col-span-12 xl:col-span-4">
            <h1
              class="block xl:text-base text-sm font-marvel text-gray-500 xl:font-medium font-semibold xl:text-end pr-5"
            >
              Business Details <span class="text-red-500">*</span> <br />
            </h1>
            <h1
              class="block xl:text-base text-sm font-marvel text-gray-500 xl:text-end pr-8 xl:font-medium font-semibold"
            >
              व्यवसायाची माहिती
            </h1>
          </div>
          <div class="hidden xl:block col-span-1">:</div>
          <div class="xl:col-span-7 col-span-12 xl:mt-0 mt-1 relative">
            <div
              class="absolute inset-y-0 left-0 px-3 flex items-center pointer-events-none border-r border-gray-300"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 -960 960 960"
                class="size-5 fill-gray-500"
              >
                <path
                  d="M440-280h80v-240h-80v240Zm40-320q17 0 28.5-11.5T520-640q0-17-11.5-28.5T480-680q-17 0-28.5 11.5T440-640q0 17 11.5 28.5T480-600Zm0 520q-83 0-156-31.5T197-197q-54-54-85.5-127T80-480q0-83 31.5-156T197-763q54-54 127-85.5T480-880q83 0 156 31.5T763-763q54 54 85.5 127T880-480q0 83-31.5 156T763-197q-54 54-127 85.5T480-80Z"
                />
              </svg>
            </div>
            <input
              type="text"
              name="bussinessdetails"
              id="bussinessdetails"
              class="block w-full pl-14 pr-3 md:py-2 py-1.5 text-sm border border-gray-300 placeholder:text-gray-400 placeholder:text-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
              placeholder="Enter business details..."
              bind:value={data.business_details}
              on:input={(e) => {
                data.business_details = e.target.value.toUpperCase();
                onInput("business_details");
              }}
            />
            <div class="ml-8 mt-1">
              {#if errors.business_details}
                {#if errors.business_details}
                  <Helper color="red" class="absolute">
                    {errors.business_details}
                  </Helper>
                {/if}
              {/if}
            </div>
          </div>
        </div>
      </div>
      <div class="md:col-span-6 col-span-12">
        <div class="grid grid-cols-12 justify-start items-center">
          <div class="lg:col-span-4 col-span-12">
            <h1
              class="block capitalize lg:text-base text-sm font-marvel text-gray-500 lg:font-medium font-semibold xl:text-end pr-5"
            >
              Organization type <span class="text-red-500">*</span> <br />
            </h1>
            <h1
              class="block xl:text-base text-sm font-marvel text-gray-500 xl:text-end pr-8 xl:font-medium font-semibold"
            >
              संस्थेचा प्रकार
            </h1>
          </div>
          <div class="hidden lg:block col-span-1">:</div>
          <div class="lg:col-span-7 col-span-12 lg:mt-0 mt-1 relative">
            <button
              on:click={toggleOrganizationTypeDropdown}
              class="flex text-sm justify-between items-center w-full px-4 md:py-2 py-1.5 bg-white border border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 text-left"
            >
              {#if data.org_type}
                {organization_types.find((o) => o.id == data.org_type)
                  .eng_name}&nbsp;&nbsp;-&nbsp;&nbsp;{organization_types.find(
                  (o) => o.id == data.org_type
                ).dev_name}
              {:else}
                <h1 class="text-gray-500 text-sm">
                  -- Select Organization type --
                </h1>
              {/if}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="size-5 text-gray-500 {isOrganizationTypeDropdownOpen
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
            <div class="ml-8 mt-1">
              {#if errors.org_type}
                {#if errors.org_type}
                  <Helper color="red" class="absolute">
                    {errors.org_type}
                  </Helper>
                {/if}
              {/if}
            </div>

            {#if isOrganizationTypeDropdownOpen}
              <div
                transition:slide={{ duration: 400 }}
                class="absolute z-10 w-full mt-0.5 bg-white border border-gray-300"
              >
                {#each organization_types as org, index}
                  <button
                    on:click={() => selectOrganizationType(org)}
                    class="w-full text-sm text-gray-500 font-lato px-4 py-1 text-left hover:bg-gray-100 {index !==
                    organization_types.length - 1
                      ? 'border-b'
                      : ''}"
                  >
                    {org.eng_name}&nbsp;&nbsp;-&nbsp;&nbsp;{org.dev_name}
                  </button>
                {/each}
              </div>
            {/if}
          </div>
        </div>
      </div>
    </div>
    <div class="grid grid-cols-12 gap-5 md:px-5 py-5">
      <div
        class="col-span-12 grid grid-cols-12 items-center border-b border-gray-300 pb-3"
      >
        <div class="col-span-12 flex justify-start items-center">
          <h1
            class="block capitalize md:text-lg text-base font-marvel text-gray-600 font-semibold"
          >
            business Address/व्यवसायाचा पत्ता :
          </h1>
        </div>
      </div>
      <div class="col-span-12 grid grid-cols-12 justify-start items-center">
        <div class="lg:col-span-2 col-span-12 flex lg:justify-end items-center">
          <h1
            class="block capitalize lg:text-base text-sm font-marvel text-gray-500 lg:font-medium font-semibold lg:text-end pr-5"
          >
            Street Address<span class="text-red-500">*</span> <br />

            <span class="pr-2">परिसराचा पत्ता</span>
          </h1>
          <div class="hidden lg:block">:</div>
        </div>
        <div
          class="lg:col-span-10 col-span-12 lg:ml-[50px] xl:ml-[70px] 2xl:ml-[97px] relative lg:mt-0 mt-1"
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
                d="M160-120v-480l320-240 320 240v480H560v-280H400v280H160Z"
              />
            </svg>
          </div>
          <input
            type="text"
            id="streetAddress"
            on:input={(e) => {
              data.business_address = e.target.value.toUpperCase();
              onInput("business_address");
            }}
            bind:value={data.business_address}
            class="block w-full pl-14 pr-3 md:py-2 py-1.5 text-sm border border-gray-300 placeholder:text-gray-400 placeholder:text-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
            placeholder="Enter street address ..."
          />
          <div class="ml-8 mt-1">
            {#if errors.business_address}
              {#if errors.business_address}
                <Helper color="red" class="absolute">
                  {errors.business_address}
                </Helper>
              {/if}
            {/if}
          </div>
        </div>
      </div>
      <div class="col-span-12 space-y-5">
        <div
          class="grid grid-cols-12 justify-start items-center gap-5 lg:gap-0"
        >
          <div class="md:col-span-6 col-span-12">
            <div class="grid grid-cols-12 justify-start items-center">
              <div class="lg:col-span-4 col-span-12">
                <h1
                  class="block capitalize lg:text-base text-sm font-marvel text-gray-500 lg:font-medium font-semibold lg:text-end pr-5"
                >
                  District<span class="text-red-500">*</span> <br />

                  <span class="pr-2">जिल्हा</span>
                </h1>
              </div>
              <div class="hidden lg:block col-span-1">:</div>
              <div class="lg:col-span-7 col-span-12 lg:mt-0 mt-1 relative">
                <button
                  on:click={toggleBusinessDistrictDropdown}
                  class="flex text-sm justify-between items-center w-full px-4 md:py-2 py-1.5 bg-white border border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 text-left"
                >
                  {#if data.business_district}
                    {districts.find((d) => d.dist_id == data.business_district)
                      .eng_name}&nbsp;&nbsp;-&nbsp;&nbsp;{districts.find(
                      (d) => d.dist_id == data.business_district
                    ).dev_name}
                  {:else}
                    <h1 class="text-gray-500 text-sm">-- Select district --</h1>
                  {/if}
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    class="size-5 text-gray-500 {isBusinessDistrictOpen
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
                <div class="ml-8 mt-1">
                  {#if errors.business_district}
                    {#if errors.business_district}
                      <Helper color="red" class="absolute">
                        {errors.business_district}
                      </Helper>
                    {/if}
                  {/if}
                </div>

                {#if isBusinessDistrictOpen}
                  <div
                    transition:slide={{ duration: 400 }}
                    class="absolute z-10 w-full mt-0.5 bg-white border border-gray-300"
                  >
                    {#each districts as district, index}
                      <button
                        on:click={() => selectBusinessDistrict(district)}
                        class="w-full text-sm text-gray-500 font-lato px-4 py-1 text-left hover:bg-gray-100 {index !==
                        districts.length - 1
                          ? 'border-b'
                          : ''}"
                      >
                        {district.eng_name}&nbsp;&nbsp;-&nbsp;&nbsp;{district.dev_name}
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
                <label
                  for="taluka"
                  class="block capitalize lg:text-base text-sm font-marvel text-gray-500 lg:font-medium font-semibold lg:text-end pr-5"
                  >taluka
                  <span class="text-red-500">*</span> <br />

                  <span class="pr-2">तालुका</span>
                </label>
              </div>
              <div class="hidden lg:block col-span-1">:</div>
              <div class="lg:col-span-7 col-span-12 lg:mt-0 mt-1 relative">
                <button
                  on:click={toggleBusinessTalukaDropdown}
                  class="flex text-sm justify-between items-center w-full px-4 md:py-2 py-1.5 bg-white border border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 text-left"
                >
                  {#if data.business_taluka && talukas.length}
                    {talukas.find((t) => t.taluka_id == data.business_taluka)
                      .eng_name}&nbsp;&nbsp;-&nbsp;&nbsp;{talukas.find(
                      (t) => t.taluka_id == data.business_taluka
                    ).dev_name}
                  {:else}
                    <h1 class="text-gray-500 text-sm">-- Select taluka --</h1>
                  {/if}
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    class="size-5 text-gray-500 {isBusinessTalukaOpen
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
                <div class="ml-8 mt-1">
                  {#if errors.business_taluka}
                    {#if errors.business_taluka}
                      <Helper color="red" class="absolute">
                        {errors.business_taluka}
                      </Helper>
                    {/if}
                  {/if}
                </div>

                {#if isBusinessTalukaOpen}
                  <div
                    transition:slide={{ duration: 400 }}
                    class="absolute z-10 w-full mt-0.5 bg-white border border-gray-300"
                  >
                    {#each talukas as taluka, index}
                      <button
                        on:click={() => selectBusinessTaluka(taluka)}
                        class="w-full text-sm text-gray-500 font-lato px-4 py-1 text-left hover:bg-gray-100 {index !==
                        talukas.length - 1
                          ? 'border-b'
                          : ''}"
                      >
                        {taluka.eng_name}&nbsp;&nbsp;-&nbsp;&nbsp;{taluka.dev_name}
                      </button>
                    {/each}
                  </div>
                {/if}
              </div>
            </div>
          </div>
        </div>
        <div
          class="grid grid-cols-12 justify-start items-center gap-5 lg:gap-0"
        >
          <div class="md:col-span-6 col-span-12">
            <div class="grid grid-cols-12 justify-start items-center">
              <div class="lg:col-span-4 col-span-12">
                <label
                  for="city"
                  class="block capitalize lg:text-base text-sm font-marvel text-gray-500 lg:font-medium font-semibold lg:text-end pr-5"
                  >Place<span class="text-red-500">*</span> <br />

                  <span class="pr-2">ठिकाण</span>
                </label>
              </div>
              <div class="hidden lg:block col-span-1">:</div>
              <div class="lg:col-span-7 col-span-12 lg:mt-0 mt-1 relative">
                <div
                  class="absolute inset-y-0 left-0 px-3 flex items-center pointer-events-none border-r border-gray-300"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 -960 960 960"
                    fill="#5f6368"
                    class="size-5 fill-gray-500"
                  >
                    <path
                      d="M120-120v-560h240v-80l120-120 120 120v240h240v400H120Zm80-80h80v-80h-80v80Zm0-160h80v-80h-80v80Zm0-160h80v-80h-80v80Zm240 320h80v-80h-80v80Zm0-160h80v-80h-80v80Zm0-160h80v-80h-80v80Zm0-160h80v-80h-80v80Zm240 480h80v-80h-80v80Zm0-160h80v-80h-80v80Z"
                    />
                  </svg>
                </div>
                <input
                  type="text"
                  id="city"
                  class="block w-full pl-14 pr-3 md:py-2 py-1.5 text-sm border border-gray-300 placeholder:text-gray-400 placeholder:text-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                  placeholder="Enter place..."
                  bind:value={data.business_place}
                  on:input={(e) => {
                    data.business_place = e.target.value.toUpperCase();
                    onInput("business_place");
                  }}
                />
                <div class="ml-8 mt-1">
                  {#if errors.business_place}
                    {#if errors.business_place}
                      <Helper color="red" class="absolute">
                        {errors.business_place}
                      </Helper>
                    {/if}
                  {/if}
                </div>
              </div>
            </div>
          </div>
          <div class="md:col-span-6 col-span-12">
            <div class="grid grid-cols-12 justify-start items-center">
              <div class="lg:col-span-4 col-span-12">
                <label
                  for="pinCode"
                  class="block capitalize lg:text-base text-sm font-marvel text-gray-500 lg:font-medium font-semibold lg:text-end pr-5"
                  >Pin Code <span class="text-red-500">*</span> <br />
                  <span class="pr-2">पिन कोड</span>
                </label>
              </div>
              <div class="hidden lg:block col-span-1">:</div>
              <div class="lg:col-span-7 col-span-12 lg:mt-0 mt-1 relative">
                <div
                  class="absolute inset-y-0 left-0 px-3 flex items-center pointer-events-none border-r border-gray-300"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 -960 960 960"
                    class="size-5 fill-gray-500"
                  >
                    <path
                      d="M480-360q56 0 101-27.5t71-72.5q-35-29-79-44.5T480-520q-49 0-93 15.5T308-460q26 45 71 72.5T480-360Zm0-200q33 0 56.5-23.5T560-640q0-33-23.5-56.5T480-720q-33 0-56.5 23.5T400-640q0 33 23.5 56.5T480-560Zm0 374q122-112 181-203.5T720-552q0-109-69.5-178.5T480-800q-101 0-170.5 69.5T240-552q0 71 59 162.5T480-186Zm0 106Q319-217 239.5-334.5T160-552q0-150 96.5-239T480-880q127 0 223.5 89T800-552q0 100-79.5 217.5T480-80Zm0-480Z"
                    />
                  </svg>
                </div>
                <input
                  type="text"
                  id="pinCode"
                  class="block w-full pl-14 pr-3 md:py-2 py-1.5 text-sm border border-gray-300 placeholder:text-gray-400 placeholder:text-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  placeholder="Enter pincode..."
                  bind:value={data.business_pincode}
                  on:input={(e) => {
                    data.business_pincode = e.target.value;
                    onInput("business_pincode");
                  }}
                />
                <!-- -77h40v-47h-41q-3-15-10 -->

                <div class="ml-8 mt-1">
                  {#if errors.business_pincode}
                    {#if errors.business_pincode}
                      <Helper color="red" class="absolute">
                        {errors.business_pincode}
                      </Helper>
                    {/if}
                  {/if}
                </div>
                <!-- 71-29t29-71q0-42-29-71t-71-29h-60v-80q0-83-58 -->
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="grid grid-cols-12 justify-start items-center md:px-5">
      <div
        class="col-span-12 flex justify-start items-center border-b border-gray-300 py-3"
      >
        <h1
          class="block capitalize md:text-lg text-base font-marvel text-gray-600 font-semibold"
        >
          quotation details/कोटेशन माहिती :
        </h1>
      </div>
      <div
        class="col-span-12 grid grid-cols-12 justify-start items-center py-5 gap-5 lg:gap-5"
      >
        <div class="md:col-span-6 col-span-12">
          <div class="grid grid-cols-12 justify-start items-center">
            <div class="lg:col-span-4 col-span-12">
              <label
                for="quotation"
                class="block capitalize lg:text-base text-sm font-marvel text-gray-500 lg:font-medium font-semibold lg:text-end pr-5"
                >quotation Name <span class="text-red-500">*</span> <br />
                <span class="pr-3">कोटेशनचे नाव</span>
              </label>
            </div>
            <div class="hidden lg:block col-span-1">:</div>
            <div class="lg:col-span-7 col-span-12 lg:mt-0 mt-1 relative">
              <div
                class="absolute inset-y-0 left-0 px-3 flex items-center pointer-events-none border-r border-gray-300"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 -960 960 960"
                  class="size-5 fill-gray-500"
                >
                  <path
                    d="M80-120v-720h400v160h400v560H80Zm80-80h240v-80H160v80Zm0-160h240v-80H160v80Zm0-160h240v-80H160v80Zm0-160h240v-80H160v80Zm320 480h320v-400H480v400Zm80-240v-80h160v80H560Zm0 160v-80h160v80H560Z"
                  />
                </svg>
              </div>
              <input
                type="text"
                name="quotationName"
                id="quotationName"
                class="block w-full pl-14 pr-3 md:py-2 py-1.5 text-sm border border-gray-300 placeholder:text-gray-400 placeholder:text-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                placeholder="Enter quotation name..."
                bind:value={data.quotation_name}
                on:input={(e) => {
                  data.quotation_name = e.target.value.toUpperCase();
                  onInput("quotation_name");
                }}
              />
              <div class="ml-8 mt-1">
                {#if errors.quotation_name}
                  {#if errors.quotation_name}
                    <Helper color="red" class="absolute">
                      {errors.quotation_name}
                    </Helper>
                  {/if}
                {/if}
              </div>
            </div>
          </div>
        </div>

        <div class="md:col-span-6 col-span-12">
          <div class="grid grid-cols-12 justify-start items-center">
            <div class="lg:col-span-4 col-span-12">
              <label
                for="quotation"
                class="block capitalize lg:text-base text-sm font-marvel text-gray-500 lg:font-medium font-semibold lg:text-end pr-5"
              >
                GST Number <br />
                <span class="pr-1">कोटेशनचे नाव</span>
              </label>
            </div>
            <div class="hidden lg:block col-span-1">:</div>
            <div class="lg:col-span-7 col-span-12 lg:mt-0 mt-1 relative">
              <div
                class="absolute inset-y-0 left-0 px-3 flex items-center pointer-events-none border-r border-gray-300"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 -960 960 960"
                  class="size-5 fill-gray-500"
                >
                  <path
                    d="M80-120v-720h400v160h400v560H80Zm80-80h240v-80H160v80Zm0-160h240v-80H160v80Zm0-160h240v-80H160v80Zm0-160h240v-80H160v80Zm320 480h320v-400H480v400Zm80-240v-80h160v80H560Zm0 160v-80h160v80H560Z"
                  />
                </svg>
              </div>
              <input
                type="text"
                name="quotationGSTNumber"
                id="quotationGSTNumber"
                class="block w-full pl-14 pr-3 md:py-2 py-1.5 text-sm border border-gray-300 placeholder:text-gray-400 placeholder:text-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                placeholder="Enter quotation GST number..."
                bind:value={data.quotation_gst_number}
                on:input={(e) => {
                  data.quotation_gst_number = e.target.value.toUpperCase();
                  onInput("quotation_gst_number");
                }}
              />
              <div class="ml-8 mt-1">
                {#if errors.quotation_gst_number}
                  {#if errors.quotation_gst_number}
                    <Helper color="red" class="absolute">
                      {errors.quotation_gst_number}
                    </Helper>
                  {/if}
                {/if}
              </div>
            </div>
          </div>
        </div>

        <div class="md:col-span-6 col-span-12 lg:pt-5">
          <div class="grid grid-cols-12 justify-start items-center">
            <div class="lg:col-span-4 col-span-12">
              <label
                for="quotation"
                class="block capitalize lg:text-base text-sm font-marvel text-gray-500 lg:font-medium font-semibold lg:text-end pr-5"
              >
                Amount <span class="text-red-500">*</span> <br />
                <span class="pr-3">रक्कम</span>
              </label>
            </div>
            <div class="hidden lg:block col-span-1">:</div>
            <div class="lg:col-span-7 col-span-12 lg:mt-0 mt-1 relative">
              <div
                class="absolute inset-y-0 left-0 px-3 flex items-center pointer-events-none border-r border-gray-300"
              >
                <svg
                  viewBox="-96 0 512 512"
                  xmlns="http://www.w3.org/2000/svg"
                  class="size-5 fill-gray-500"
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
                type="text"
                name="quotationAmount"
                id="quotationAmount"
                class="block w-full pl-14 pr-3 md:py-2 py-1.5 text-sm border border-gray-300 placeholder:text-gray-400 placeholder:text-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                placeholder="Enter quotation amount..."
                bind:value={data.quotation_amount}
                on:input={(e) => {
                  data.quotation_amount = e.target.value;
                  onInput("quotation_amount");
                }}
              />

              <div class="ml-8 mt-1">
                {#if errors.quotation_amount}
                  {#if errors.quotation_amount}
                    <Helper color="red" class="absolute">
                      {errors.quotation_amount}
                    </Helper>
                  {/if}
                {/if}
              </div>
            </div>
          </div>
        </div>
        <div class="md:col-span-6 col-span-12">
          <div class="grid grid-cols-12 justify-start items-center">
            <div class="lg:col-span-4 col-span-12">
              <label
                for="loan_amount"
                class="block capitalize lg:text-base text-sm font-marvel text-gray-500 lg:font-medium font-semibold lg:text-end pr-5"
              >
                Loan Require Amount <br />
                <span class="pr-1">कर्ज आवश्यक रक्कम</span>
              </label>
            </div>
            <div class="hidden lg:block col-span-1">:</div>
            <div class="lg:col-span-7 col-span-12 lg:mt-0 mt-1 relative">
              <div
                class="absolute inset-y-0 left-0 px-3 flex items-center pointer-events-none border-r border-gray-300"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 -960 960 960"
                  class="size-5 fill-gray-500"
                >
                  <path
                    d="M80-120v-720h400v160h400v560H80Zm80-80h240v-80H160v80Zm0-160h240v-80H160v80Zm0-160h240v-80H160v80Zm0-160h240v-80H160v80Zm320 480h320v-400H480v400Zm80-240v-80h160v80H560Zm0 160v-80h160v80H560Z"
                  />
                </svg>
              </div>
              <input
                type="text"
                name="loan_amount"
                id="loan_amount"
                class="block w-full pl-14 pr-3 md:py-2 py-1.5 text-sm border border-gray-300 placeholder:text-gray-400 placeholder:text-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                placeholder="Enter loan amount"
                bind:value={data.loan_amount}
                on:input={(e) => {
                  data.loan_amount = e.target.value.toUpperCase();
                  onInput("loan_amount");
                }}
              />
              <div class="ml-8 mt-1">
                {#if errors.loan_amount}
                  {#if errors.loan_amount}
                    <Helper color="red" class="absolute">
                      {errors.loan_amount}
                    </Helper>
                  {/if}
                {/if}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  <div class="border bg-white shadow-lg rounded-lg py-5 xl:px-10 px-5">
    <h1
      class="xl:text-3xl lg:text-2xl md:text-xl text-lg capitalize font-semibold font-roboto py-3 text-gray-700 border-b-2 border-gray-300"
    >
      Bank Details/बँक माहिती :
    </h1>
    <div class=" py-5 md:px-5">
      <div class="grid grid-cols-12 gap-5 lg:gap-0 pb-5">
        <div class="md:col-span-6 col-span-12">
          <div class="grid grid-cols-12 justify-start items-center">
            <div class="lg:col-span-4 col-span-12">
              <h1
                class="block capitalize lg:text-base text-sm font-marvel text-gray-500 lg:font-medium font-semibold xl:text-end xl:pr-5"
              >
                Nationalized Bank Name<span class="text-red-500">*</span>
                <br />
                <span class="pr-2">नॅशनलाइज्ड बँकेचे नाव:</span>
              </h1>
            </div>
            <div class="hidden lg:block col-span-1">:</div>
            <div class="lg:col-span-7 col-span-12 lg:mt-0 mt-1 relative">
              <div
                class="absolute inset-y-0 left-0 px-3 flex items-center pointer-events-none border-r border-gray-300"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 -960 960 960"
                  class="size-5 fill-gray-500"
                >
                  <path
                    d="M200-280v-280h80v280h-80Zm240 0v-280h80v280h-80ZM80-120v-80h800v80H80Zm600-160v-280h80v280h-80ZM80-640v-80l400-200 400 200v80H80Z"
                  />
                </svg>
              </div>
              <input
                type="text"
                name="bankname"
                id="bankname"
                class="block w-full pl-14 pr-3 md:py-2 py-1.5 text-sm border border-gray-300 placeholder:text-gray-400 placeholder:text-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                placeholder="Enter bank name..."
                bind:value={data.bank_name}
                on:input={(e) => {
                  data.bank_name = e.target.value.toUpperCase();
                  onInput("bank_name");
                }}
              />
              <div class="ml-8 mt-1">
                {#if errors.bank_name}
                  {#if errors.bank_name}
                    <Helper color="red" class="absolute">
                      {errors.bank_name}
                    </Helper>
                  {/if}
                {/if}
              </div>
            </div>
          </div>
        </div>
        <div class="md:col-span-6 col-span-12">
          <div class="grid grid-cols-12 justify-start items-center">
            <div class="lg:col-span-4 col-span-12">
              <h1
                class="block capitalize lg:text-base text-sm font-marvel text-gray-500 lg:font-medium font-semibold lg:text-end pr-5"
              >
                IFSC Code <span class="text-red-500">*</span> <br />
                <span class="pr-3">आयएफएससी कोड</span>
              </h1>
            </div>
            <div class="hidden lg:block col-span-1">:</div>
            <div class="lg:col-span-7 col-span-12 lg:mt-0 mt-1 relative">
              <div
                class="absolute inset-y-0 left-0 px-3 flex items-center pointer-events-none border-r border-gray-300"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 -960 960 960"
                  class="size-5 fill-gray-500"
                >
                  <path
                    d="M200-280v-280h80v280h-80Zm240 0v-280h80v280h-80ZM80-120v-80h800v80H80Zm600-160v-280h80v280h-80ZM80-640v-80l400-200 400 200v80H80Z"
                  />
                </svg>
              </div>
              <input
                type="text"
                name="IFSCcode"
                id="IFSCcode"
                class="block w-full pl-14 pr-3 md:py-2 py-1.5 text-sm border border-gray-300 placeholder:text-gray-400 placeholder:text-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                placeholder="Enter bank IFSC code..."
                bind:value={data.ifsc_code}
                on:input={(e) => {
                  data.ifsc_code = e.target.value.toUpperCase();
                  onInput("ifsc_code");
                }}
              />
              <div class="ml-8 mt-1">
                {#if errors.ifsc_code}
                  {#if errors.ifsc_code}
                    <Helper color="red" class="absolute">
                      {errors.ifsc_code}
                    </Helper>
                  {/if}
                {/if}
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="grid grid-cols-12 gap-5 lg:gap-0 pb-5">
        <div class="md:col-span-6 col-span-12">
          <div class="grid grid-cols-12 justify-start items-center">
            <div class="lg:col-span-4 col-span-12">
              <h1
                class="block capitalize lg:text-base text-sm font-marvel text-gray-500 lg:font-medium font-semibold lg:text-end pr-5"
              >
                Branch Name <span class="text-red-500">*</span> <br />
                <span class="pr-3">शाखेचे नाव</span>
              </h1>
            </div>
            <div class="hidden lg:block col-span-1">:</div>
            <div class="lg:col-span-7 col-span-12 lg:mt-0 mt-1 relative">
              <div
                class="absolute inset-y-0 left-0 px-3 flex items-center pointer-events-none border-r border-gray-300"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 -960 960 960"
                  class="size-5 fill-gray-500"
                >
                  <path
                    d="M200-280v-280h80v280h-80Zm240 0v-280h80v280h-80ZM80-120v-80h800v80H80Zm600-160v-280h80v280h-80ZM80-640v-80l400-200 400 200v80H80Z"
                  />
                </svg>
              </div>
              <input
                type="text"
                name="branchName"
                id="branchName"
                class="block w-full pl-14 pr-3 md:py-2 py-1.5 text-sm border border-gray-300 placeholder:text-gray-400 placeholder:text-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                placeholder="Enter bank branch name..."
                bind:value={data.branch_name}
                on:input={(e) => {
                  data.branch_name = e.target.value.toUpperCase();
                  onInput("branch_name");
                }}
              />

              <div class="ml-8 mt-1">
                {#if errors.branch_name}
                  {#if errors.branch_name}
                    <Helper color="red" class="absolute">
                      {errors.branch_name}
                    </Helper>
                  {/if}
                {/if}
              </div>
            </div>
          </div>
        </div>
        <div class="md:col-span-6 col-span-12">
          <div class="grid grid-cols-12 justify-start items-center">
            <div class="lg:col-span-4 col-span-12">
              <h1
                class="block capitalize lg:text-base text-sm font-marvel text-gray-500 lg:font-medium font-semibold lg:text-end pr-5"
              >
                Account Number <span class="text-red-500">*</span> <br />
                <span class="pr-3">खाते नंबर</span>
              </h1>
            </div>
            <div class="hidden lg:block col-span-1">:</div>
            <div class="lg:col-span-7 col-span-12 lg:mt-0 mt-1 relative">
              <div
                class="absolute inset-y-0 left-0 px-3 flex items-center pointer-events-none border-r border-gray-300"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 -960 960 960"
                  class="size-5 fill-gray-500"
                >
                  <path
                    d="M200-280v-280h80v280h-80Zm240 0v-280h80v280h-80ZM80-120v-80h800v80H80Zm600-160v-280h80v280h-80ZM80-640v-80l400-200 400 200v80H80Z"
                  />
                </svg>
              </div>
              <input
                type="text"
                name="accountnumber"
                id="accountnumber"
                class="block w-full pl-14 pr-3 md:py-2 py-1.5 text-sm border border-gray-300 placeholder:text-gray-400 placeholder:text-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                placeholder="Enter bank account number..."
                bind:value={data.account_number}
                on:input={(e) => {
                  data.account_number = e.target.value;
                  onInput("account_number");
                }}
              />
              <div class="ml-8 mt-1">
                {#if errors.account_number}
                  {#if errors.account_number}
                    <Helper color="red" class="absolute">
                      {errors.account_number}
                    </Helper>
                  {/if}
                {/if}
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="grid grid-cols-12 gap-5 lg:gap-0">
        <div class="md:col-span-6 col-span-12">
          <div class="grid grid-cols-12 justify-start items-start">
            <div class="lg:col-span-4 col-span-12">
              <h1
                class="block capitalize text-sm font-marvel text-gray-500 lg:font-medium font-semibold lg:text-end pr-5"
              >
                Bank Address <span class="text-red-500">*</span><br />
                <span class="pr-3">बँकेचा पत्ता</span>
              </h1>
            </div>
            <div class="hidden lg:block col-span-1">:</div>
            <div class="lg:col-span-7 col-span-12 lg:mt-0 mt-1 relative">
              <textarea
                id="bankaddress"
                name="bankaddress"
                rows="3"
                class="py-2 px-3 block w-full text-sm border border-gray-300 placeholder:text-gray-400 placeholder:text-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                placeholder="Enter bank address..."
                bind:value={data.bank_address}
                on:input={(e) => {
                  data.bank_address = e.target.value.toUpperCase();
                  onInput("bank_address");
                }}
              />

              <div class="ml-8 mt-1">
                {#if errors.bank_address}
                  {#if errors.bank_address}
                    <Helper color="red" class="absolute">
                      {errors.bank_address}
                    </Helper>
                  {/if}
                {/if}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
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

    <button
      on:click={() => {
        console.log("Proceed button clicked");
        onSubmit("guarantor");
      }}
      class="group relative flex items-center justify-center gap-3 border border-gray-300 md:w-[200px] w-[150px] py-2 overflow-hidden bg-Calypso-400"
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
        </svg>
      </span>
    </button>
  </div>
</div>
