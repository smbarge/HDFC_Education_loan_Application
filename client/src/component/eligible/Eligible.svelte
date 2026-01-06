<script>
  import { slide } from "svelte/transition";
  import DatePicker from "../datePicker/DatePicker.svelte";
  import AlertMsg from "$lib/forgotPassword/AlertMsg.svelte";
  import { Input, Helper } from "flowbite-svelte";
  import { masters } from "$appstore/store";
  import { browser } from "$app/environment";
  import { createEventDispatcher, onMount } from "svelte";
  import { Target } from "lucide-svelte";

  export let errors;
  export let data;
  export let alertMsg = "";
  export let onInput;
  export let onSubmit;
  export let aadharVerify;
  $: if (data.gender) {
    onInput("gender");
  }
  let selectedResident = "0";
  let isCurrentDistrictOpen = false;
  const dispatch = createEventDispatcher();
  let showDatePicker = false;
  let residentAnswer = "";

  let religions = [];
  let genders = [];
  let searchQuery = ""; // Holds the current search input

  let district = [];
  if (browser) {
    religions = [...$masters.m_religion];
    genders = [...$masters.m_gender];
    district = [
      ...$masters.m_district.sort((a, b) =>
        a.eng_name.localeCompare(b.eng_name),
      ),
    ];
  }
  let districts = ["Pune", "Satara", "Sangli", "Solapur", "Kolhapur"];
  let cardNames = [
    {
      id: "1",
      src: `/termloan/aadharcard.svg`,
      name: "Aadhar (Mandatory)",
      marathi_name: "आधार (अनिवार्य)",
      subtitle:
        "keep Aadhar card with you along with the Mobile Number registered in Aadhar.",
      marathi_subtitle:
        "आधार कार्डमध्ये नोंदणीकृत मोबाईल क्रमांकासह आधार कार्ड सोबत ठेवा.",
    },
  ];

  function handleInput(event, index) {
    const parts = ["part1", "part2", "part3"];
    if (event.target.value.length === 4 && index < 2) {
      const nextInput = document.getElementById(parts[index + 1]);
      if (nextInput) nextInput.focus();
    }
  }
  function selectDistrictOfApplication(district) {
    data.district_id = district.dist_id;
    isCurrentDistrictOpen = false; // Close the dropdown after selection
    onInput("district_id");
  }

  onMount(() => {
    if (browser) {
      district = [
        ...$masters.m_district.sort((a, b) =>
          a.eng_name.localeCompare(b.eng_name),
        ),
      ];
      console.log("district data is", data);
    }
  });
  $: filteredDistricts = district.filter(
    (d) =>
      d.eng_name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      d.dev_name.includes(searchQuery),
  );
  function handleKeyDown(event, index) {
    const parts = ["part1", "part2", "part3"];
    if (
      event.key === "Backspace" &&
      event.target.value.length === 0 &&
      index > 0
    ) {
      const prevInput = document.getElementById(parts[index - 1]);
      if (prevInput) prevInput.focus();
    }
  }
  function toggleCurrentDistrictDropdown() {
    searchQuery = "";
    isCurrentDistrictOpen = !isCurrentDistrictOpen;
  }
  const handleDateSelect = (date) => {
    // let showDatePicker = false;
    data.dob = date; // Update dob when a date is selected
    showDatePicker = false;
    onInput("dob");
  };

  const onProceed = () => {
    // personalDetails.name = data.name;
    // personalDetails.dob = data.dob.toLocaleDateString();
    // personalDetails.religion = data.religion;
    // personalDetails.gender = data.gender;
    // personalDetails.aadhar =
    //   data.aadharPart1 + data.aadharPart2 + data.aadharPart3;
    dispatch("saveAndNext", {});
  };

  //  let showDatePicker = false;
  // let data = { dob: new Date() };
  // let errors = { dob: null };

  // function handleDateSelect(date) {
  //   data.dob = date;
  //   showDatePicker = false; // Close the DatePicker after date selection
  // }
</script>

<!-- {JSON.stringify(data),null,2)} -->

<div class="min-h-screen md:mx-10 mx-5 my-5">
  <div class="bg-white shadow-lg rounded-xl p-5 space-y-5 border">
    <div class={data.religion ? "border-b border-gray-300 pb-3" : ""}>
      <div class="grid justify-start items-center">
        <p class="md:text-lg text-sm font-semibold font-roboto text-gray-700">
          Select minority community of the applicant
        </p>
        <p class="text-gray-500 text-sm mb-3">
          अर्जदाराचा अल्पसंख्याक समुदाय निवडा
        </p>
      </div>
      <!-- <div>
        <p
          class="md:text-lg text-sm font-semibold font-roboto mb-3 text-gray-700"
        >
          Select minority community of the applicant
        </p>
        <p class="text-gray-500 text-sm">अर्जदाराचा अल्पसंख्याक समुदाय निवडा</p>
      </div> -->
      <div class="lg:flex grid justify-start items-center lg:gap-10 gap-2">
        {#each religions as religion}
          {#if religion.id !== 8 && religion.id !== 9}
            <label class="flex items-center space-x-2">
              <input
                id={`religionName`}
                type="radio"
                bind:group={data.religion}
                value={religion.id}
                on:input={(e) => {
                  data.religion = e.target.value;
                  onInput("religion");
                }}
                class="form-radio text-blue-500"
              />
              <span
                class="text-gray-700 md:text-lg text-sm font-marvel font-medium"
                >{religion.eng_name}&nbsp;-&nbsp;{religion.dev_name}</span
              >
            </label>
          {/if}
        {/each}
      </div>

      {#if errors.religion}
        <p class="text-red-500">{errors.religion}</p>
      {/if}
    </div>

    <!-- {#each religions as religion}
          <label class="flex items-center space-x-2">
            <input
              id={`religionName`}
              type="radio"
              bind:group={data.religion}
              value={religion.id}
              on:input={(e) => {
                data.religion = e.target.value;
                onInput("religion");
              }}
              class="form-radio text-blue-500"
            />
            <span
              class="text-gray-700 md:text-lg text-sm font-marvel font-medium"
              >{religion.eng_name}&nbsp;-&nbsp;{religion.dev_name}</span
            >
          </label>
        {/each} -->

    <div class="flex justify-start items-start gap-5">
      <div class="grid justify-start items-center">
        <p class="md:text-lg text-sm font-semibold font-roboto text-gray-700">
          Are you a resident of Maharashtra State?
        </p>
        <p class="text-gray-500 text-sm">
          तुम्ही महाराष्ट्र राज्याचे रहिवासी आहात का?
        </p>
      </div>
      <div class="flex items-center">
        <label class="flex items-center mr-4">
          <input
            on:input={(e) => {
              data.resident = e.target.value;
              console.log("onInput fired for resident: ", data.resident);
              onInput("resident");
            }}
            type="radio"
            name="residency"
            value={1}
            checked={data.resident == 1 ? true : false}
            bind:group={data.resident}
            class="form-radio text-blue-600 border-gray-300 focus:ring-blue-500"
          />
          <span
            class="ml-2 text-gray-700 md:text-lg text-sm font-marvel font-medium"
            >Yes</span
          >
        </label>

        <label class="flex items-center">
          <input
            type="radio"
            name="residency"
            value={2}
            checked={data.resident == 2 ? true : false}
            bind:group={data.resident}
            on:input={(e) => {
              data.resident = e.target.value;
              onInput("resident");
            }}
            class="form-radio text-blue-600 border-gray-300 focus:ring-blue-500"
          />
          <span
            class="ml-2 text-gray-700 md:text-lg text-sm font-marvel font-medium"
            >No</span
          >
        </label>

        <div class="ml-4">
          {#if errors.resident}
            <p class="text-red-500">{errors.resident}</p>
          {/if}

          <!-- {#if selectedResident == "2"}
            <p>should have resident</p>
          {/if} -->
        </div>
      </div>
    </div>
    {#if data.religion}
      <div transition:slide={{ duration: 400 }} class="pb-3">
        <div class="lg:col-span-3 md:col-span-6 col-span-12 w-80 mb-4">
          <label for="district">
            <span
              class="md:text-lg text-sm font-semibold font-roboto mb-3 text-gray-700"
            >
              Application for District Office:
            </span>
          </label>
          <div class="relative">
            <button
              on:click={toggleCurrentDistrictDropdown}
              class="flex text-sm justify-between items-center w-full px-4 md:py-2 py-1.5 bg-white border border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 text-left"
            >
              {#if data.district_id}
                <!-- {data.district_id} -->
                {district.find((d) => d.dist_id == data.district_id).eng_name}
                &nbsp; - &nbsp; {district.find(
                  (d) => d.dist_id == data.district_id,
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
            {#if errors.district_id}
              <p class="text-red-500 text-xs">{errors.district_id}</p>
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
                        on:click={() => selectDistrictOfApplication(d)}
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
        <h1
          class="md:text-xl text-left font-semibold font-roboto text-gray-700"
        >
          Identity Verification :
        </h1>

        {#each cardNames as cards, cardIndex}
          <div
            class="border border-deepPurple-300 p-5 rounded-lg shadow-xl my-3 hover:bg-gray-100"
          >
            <div class="flex justify-between items-start">
              <div class="flex justify-start items-start gap-5">
                <img src={cards.src} alt="logo" class="md:size-8 size-6" />
                <div class="grid justify-start">
                  <h1
                    class="md:text-lg text-left font-semibold font-roboto text-gray-600"
                  >
                    {cards.name} / {cards.marathi_name}
                  </h1>
                  <h1
                    class="md:text-sm text-xs text-left font-roboto text-gray-500"
                  >
                    {cards.subtitle} <br />
                    {cards.marathi_subtitle}
                  </h1>
                </div>
              </div>
            </div>
            <div transition:slide={{ duration: 400 }}>
              {#if cardIndex === 0}
                <div
                  class="grid grid-cols-6 gap-5 border-t border-gray-300 mt-5 pt-5"
                >
                  <!-- <div class="lg:col-span-2 md:col-span-4 col-span-6">
                    <label
                      for="aadhaar-number"
                      class="block md:text-base text-sm font-medium text-gray-700 capitalize mb-2"
                      >Aadhaar Number</label
                    >
                    <div class="flex space-x-2">
                       {#each ["aadharPart1", "aadharPart2", "aadharPart3"] as part, index} -->
                  <!-- {#each ["aadharPart1", "aadharPart2", "aadharPart3"] as part, index}
                        <input
                          type="text"
                          id={part}
                          name={part}
                          bind:value={data[part]}
                          maxlength="4"
                          class="block w-full md:p-2 p-1.5 text-sm border border-gray-300 placeholder:text-sm placeholder:font-robotoMono placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 text-center"
                          placeholder="0000"
                          required
                          on:input={(e) => {
                            data[part] = e.target.value;
                            onInput(part);
                          }}
                          on:keydown={(e) => handleKeyDown(e, index)}
                        />
                      {/each} -->
                  <!-- </div> -->
                  <!-- {#if errors.aadharPart1 || errors.aadharPart2 || errors.aadharPart3}
                      <p class="text-red-500">
                        {errors.aadharPart1}-{errors.aadharPart2}-{errors.aadharPart3}
                      </p>
                    {/if} -->
                  <!-- {#if errors.aadharPart1 || errors.aadharPart2 || errors.aadharPart3}
                      <Helper color="red" class="absolute">
                        {errors.aadharPart1},
                        {errors.aadharPart2},
                        {errors.aadharPart3}
                      </Helper>
                    {/if} -->
                  <!-- </div> -->
                  <div class="lg:col-span-3 col-span-6">
                    <label
                      for="aadhar"
                      class="block font-medium text-gray-700 mb-2 md:text-base text-sm"
                      >Aadhar Number/आधार क्रमांक <span class="text-red-500">*</span>
                      <span
                        class="md:text-sm text-xs text-gray-500 font-robotoMono"
                      ></span></label
                    >
                    <div class="relative">
                      <div
                        class="absolute inset-y-0 left-0 md:px-3 px-2 flex items-center pointer-events-none border-r border-gray-300"
                      >
                        <img
                          src={cards.src}
                          alt="logo"
                          class="md:size-8 size-6"
                        />
                      </div>

                      <input
                        on:input={(e) => {
                          data.aadhar = e.target.value;
                          onInput("aadhar");
                        }}
                        type="text"
                        name="aadhar"
                        id="aadhar"
                        class="block w-full md:pl-16 pl-12 pr-3 md:py-2 py-1.5 text-sm border border-gray-300 placeholder:text-sm placeholder-gray-400 placeholder:font-robotoMono focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                        placeholder="Enter Aadhar Number..."
                        bind:value={data.aadhar}
                      />
                      {#if errors["aadhar"]}
                        {#if errors.aadhar}
                          <Helper color="red" class="absolute">
                            {errors.aadhar}
                          </Helper>
                        {/if}
                      {/if}
                    </div>
                  </div>
                  <div class="lg:col-span-3 col-span-6">
                    <label
                      for="fullName"
                      class="block font-medium text-gray-700 mb-2 md:text-base text-sm"
                      >Applicant's Full Name/अर्जदाराचे पूर्ण नाव <span
                        class="md:text-sm text-xs text-gray-500 font-robotoMono"
                        >(Name as Per Aadhaar Card)</span
                      >
                      <span class="text-red-500">*</span>
                    </label>
                    <div class="relative">
                      <div
                        class="absolute inset-y-0 left-0 md:px-3 px-2 flex items-center pointer-events-none border-r border-gray-300"
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 -960 960 960"
                          class="lg:size-7 md:size-5 size-4 fill-gray-500"
                        >
                          <path
                            d="M480-480q-66 0-113-47t-47-113q0-66 47-113t113-47q66 0 113 47t47 113q0 66-47 113t-113 47ZM160-160v-112q0-34 17.5-62.5T224-378q62-31 126-46.5T480-440q66 0 130 15.5T736-378q29 15 46.5 43.5T800-272v112H160Z"
                          />
                        </svg>
                      </div>
                      <input
                        on:input={(e) => {
                          data.name = e.target.value.toUpperCase();
                          onInput("name");
                        }}
                        type="text"
                        name="fullName"
                        id="fullName"
                        class="block w-full md:pl-16 pl-12 pr-3 md:py-2 py-1.5 text-sm border border-gray-300 placeholder:text-sm placeholder-gray-400 placeholder:font-robotoMono focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                        placeholder="Enter full name..."
                        bind:value={data.name}
                      />
                      {#if errors["name"]}
                        {#if errors.name}
                          <Helper color="red" class="absolute">
                            {errors.name}
                          </Helper>
                        {/if}
                      {/if}
                    </div>
                  </div>
                  <div class="lg:col-span-2 md:col-span-3 col-span-6 relative">
                    <label
                      for="dob"
                      class="block font-medium text-gray-700 mb-2 md:text-base text-sm"
                      >Date of Birth/जन्मतारीख
                      <span class="text-red-500">*</span>
                    </label>
                    <div class="relative">
                      <div
                        class="absolute inset-y-0 left-0 px-3 flex items-center pointer-events-none border-r border-gray-300"
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 -960 960 960"
                          class="md:size-6 size-4 fill-gray-500"
                        >
                          <path
                            d="M480-400q-17 0-28.5-11.5T440-440q0-17 11.5-28.5T480-480q17 0 28.5 11.5T520-440q0 17-11.5 28.5T480-400Zm-160 0q-17 0-28.5-11.5T280-440q0-17 11.5-28.5T320-480q17 0 28.5 11.5T360-440q0 17-11.5 28.5T320-400Zm320 0q-17 0-28.5-11.5T600-440q0-17 11.5-28.5T640-480q17 0 28.5 11.5T680-440q0 17-11.5 28.5T640-400ZM480-240q-17 0-28.5-11.5T440-280q0-17 11.5-28.5T480-320q17 0 28.5 11.5T520-280q0 17-11.5 28.5T480-240Zm-160 0q-17 0-28.5-11.5T280-280q0-17 11.5-28.5T320-320q17 0 28.5 11.5T360-280q0 17-11.5 28.5T320-240Zm320 0q-17 0-28.5-11.5T600-280q0-17 11.5-28.5T640-320q17 0 28.5 11.5T680-280q0 17-11.5 28.5T640-240ZM200-80q-33 0-56.5-23.5T120-160v-560q0-33 23.5-56.5T200-800h40v-80h80v80h320v-80h80v80h40q33 0 56.5 23.5T840-720v560q0 33-23.5 56.5T760-80H200Zm0-80h560v-400H200v400Z"
                          />
                        </svg>
                      </div>
                      <input
                        type="text"
                        readonly
                        value={data.dob.toLocaleDateString()}
                        on:click={() => (showDatePicker = !showDatePicker)}
                        class="block w-full md:pl-16 pl-12 pr-3 md:py-2 py-1.5 text-sm cursor-pointer border border-gray-300 uppercase font-roboto focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                      />

                      <!-- {#if errors["dob"]}
                        {#if errors.dob}
                          <Helper color="red" class="absolute">
                            {errors.dob}
                          </Helper>
                        {/if}
                      {/if} -->
                    </div>
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
                      </div> -->
                    <DatePicker
                      selectedDate={data.dob}
                      onDateSelect={handleDateSelect}
                      showPicker={showDatePicker}
                    />
                    {#if errors.dob}
                      <span class="text-red-500 text-sm">{errors.dob}</span>
                    {/if}
                    <!-- <input
                        type="date"
                        name="dob"
                        id="dob"
                        class="block w-full pl-16 pr-3 py-2 border border-gray-300 uppercase font-roboto focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                      /> -->
                  </div>
                  <div class="lg:col-span-2 md:col-span-3 col-span-6">
                    <label
                      for="gender"
                      class="block font-medium text-gray-700 mb-2 md:text-base text-sm"
                      >Gender/लिंग
                      <span class="text-red-500">*</span>
                    </label>
                    <select
                      bind:value={data.gender}
                      id="gender"
                      class="block w-full bg-white px-3 md:py-2 py-1.5 text-sm font-roboto border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                      required
                    >
                      <option value="0" disabled selected
                        >Select your gender</option
                      >
                      {#each genders as gender}
                        <option value={gender.id}>
                          {gender.eng_name}&nbsp;&nbsp;- &nbsp;&nbsp;{gender.dev_name}
                        </option>
                      {/each}
                    </select>
                    {#if errors["gender"]}
                      {#if errors.gender}
                        <Helper color="red" class="absolute">
                          {errors.gender}
                        </Helper>
                      {/if}
                    {/if}
                  </div>

                  <div
                    class="col-span-6 flex justify-start lg:items-center items-start gap-2"
                  >
                    <div class="pt-1 lg:pt-0 flex items-center">
                      <input
                        class="form-checkbox md:size-4 size-3 text-blue-600 transition duration-150 ease-in-out cursor-pointer"
                        id="declaration-checkbox"
                        type="checkbox"
                        checked={data.concent_for_aadhar_verification === 1}
                        on:change={(event) => {
                          data.concent_for_aadhar_verification = event.target
                            .checked
                            ? 1
                            : 2;
                          onInput("concent_for_aadhar_verification");
                        }}
                      />
                    </div>
                    <label for="declaration-checkbox">
                      <h1
                        class="md:text-sm text-xs text-gray-500 font-marvel font-semibold"
                      >
                        I provide my consent to share my details with the issuer
                        for the purpose of fetching my details. <br/>
                        मी माझी माहिती प्राप्त करण्याच्या उद्देशाने ती माहिती जारीकर्त्यासोबत शेअर करण्यास संमती देतो/देते.
                      </h1>
                    </label>
                  </div>
                  <div class="col-span-4">
                    <button
                      class="hidden relative rounded px-7 md:py-2 py-1 overflow-hidden group bg-Calypso-500 hover:bg-gradient-to-r hover:from-Cbg-Calypso-500 hover:to-Cbg-Calypso-400 text-white hover:ring-2 hover:ring-offset-2 hover:ring-Cbg-Calypso-400 transition-all ease-out duration-300"
                    >
                      <button
                        on:click={() => {
                          aadharVerify();
                        }}
                        class="relative text-white font-robotoMono md:text-base text-sm"
                        >Verify</button
                      >
                    </button>
                  </div>
                </div>
                {#if errors.concent_for_aadhar_verification}
                  <p class="text-red-500 text-xs">
                    {errors.concent_for_aadhar_verification}
                  </p>
                {/if}
              {/if}
            </div>
          </div>
        {/each}
      </div>
    {/if}
    <div>
      {#if alertMsg}
        <AlertMsg {alertMsg} />
      {/if}
    </div>
    <div
      class="flex justify-center items-center py-5 border-t-2 border-gray-300"
    >
      <button
        class="group relative flex items-center justify-center gap-3 border border-gray-300 md:w-[200px] w-[150px] py-2 overflow-hidden bg-Calypso-400"
        on:click={onSubmit}
      >
        <span
          class="absolute w-0 h-0 transition-all duration-500 ease-out bg-Calypso-500 group-hover:w-[300px] group-hover:h-56"
        ></span>
        <span class="absolute inset-0 w-full h-full opacity-30"></span>

        <div
          class="relative font-roboto capitalize font-semibold lg:text-xl md:text-base text-sm text-gray-800 group-hover:text-white"
        >
          Proceed
        </div>
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
</div>
