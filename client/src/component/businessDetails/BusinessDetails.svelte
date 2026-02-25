
<script>
  import { slide } from "svelte/transition";
  import { Helper } from "flowbite-svelte";
  import { token, refreshToken, username, id, masters } from "$appstore/store.js";
  import { onMount } from "svelte";
  import { browser } from "$app/environment";

  export let onInput;
  export let onSubmit;
  export let data;
  export let errors;
  export let alertMsg = "";
  export let handleBackButtonClick;

  let dataLoaded = false;
  let districts = [];
  let talukas = [];

  let isInstituteDistrictOpen = false;
  let isInstituteTalukaOpen = false;
  let isCourseTypeOpen = false;
  let isStreamOpen = false;
  let isModeOfStudyOpen = false;
  let isAdmissionStatusOpen = false;
  let isLoanPurposeOpen = false;

  let courseTypes = [
    { id: 1, eng_name: "UG (Undergraduate)", dev_name: "पदवी" },
    { id: 2, eng_name: "PG (Postgraduate)", dev_name: "पदव्युत्तर" },
    { id: 3, eng_name: "PhD", dev_name: "पीएचडी" },
    { id: 4, eng_name: "Diploma", dev_name: "डिप्लोमा" },
    { id: 5, eng_name: "Certificate", dev_name: "प्रमाणपत्र" }
  ];

  let streamOptions = [
    { id: 1, eng_name: "Engineering", dev_name: "अभियांत्रिकी" },
    { id: 2, eng_name: "Medical", dev_name: "वैद्यकीय" },
    { id: 3, eng_name: "Commerce", dev_name: "वाणिज्य" },
    { id: 4, eng_name: "Arts", dev_name: "कला" },
    { id: 5, eng_name: "Science", dev_name: "विज्ञान" },
    { id: 6, eng_name: "Law", dev_name: "कायदा" },
    { id: 7, eng_name: "Management", dev_name: "व्यवस्थापन" },
    { id: 8, eng_name: "Other", dev_name: "इतर" }
  ];

  let modeOfStudyOptions = [
    { id: 1, eng_name: "Full-time", dev_name: "पूर्णवेळ" },
    { id: 2, eng_name: "Part-time", dev_name: "अर्धवेळ" },
    { id: 3, eng_name: "Distance Learning", dev_name: "दूरस्थ शिक्षण" }
  ];

  let admissionStatusOptions = [
    { id: 1, eng_name: "Confirmed", dev_name: "पुष्टी केलेली" },
    { id: 2, eng_name: "Provisional", dev_name: "तात्पुरती" }
  ];

  let loanPurposeOptions = [
    { id: 1, eng_name: "Tuition Fee", dev_name: "शिकवणी शुल्क" },
    { id: 2, eng_name: "Hostel Fee", dev_name: "वसतिगृह शुल्क" },
    { id: 3, eng_name: "Books & Study Material", dev_name: "पुस्तके आणि अभ्यास साहित्य" },
    { id: 4, eng_name: "Equipment/Laptop", dev_name: "उपकरणे/लॅपटॉप" },
    { id: 5, eng_name: "Other", dev_name: "इतर" }
  ];

  let showStreamDetails = false;
  let showLoanPurposeDetails = false;

  onMount(() => {
    if (browser) {
      districts = [...$masters.m_district.sort((a, b) => a.eng_name.localeCompare(b.eng_name))];
      
      if (data.institute_district) {
        talukas = $masters.m_taluka
          .filter((t) => t.dist_id == data.institute_district)
          .sort((a, b) => a.eng_name.localeCompare(b.eng_name));
      }

      if (data.stream == 8) {
        showStreamDetails = true;
      }

      if (data.loan_purpose == 5) {
        showLoanPurposeDetails = true;
      }

      dataLoaded = true;
    }
  });

  function toggleInstituteDistrictDropdown() {
    isInstituteDistrictOpen = !isInstituteDistrictOpen;
  }

  function toggleInstituteTalukaDropdown() {
    isInstituteTalukaOpen = !isInstituteTalukaOpen;
  }

  function selectInstituteDistrict(district) {
    talukas = [];
    data.institute_taluka = 0;
    data.institute_district = district.dist_id;
    talukas = $masters.m_taluka
      .filter((t) => t.dist_id == district.dist_id)
      .sort((a, b) => a.eng_name.localeCompare(b.eng_name));
    isInstituteDistrictOpen = false;
    onInput("institute_district");
  }

  function selectInstituteTaluka(taluka) {
    data.institute_taluka = taluka.taluka_id;
    isInstituteTalukaOpen = false;
    onInput("institute_taluka");
  }

  function selectCourseType(type) {
    data.course_type = type.id;
    isCourseTypeOpen = false;
    onInput("course_type");
  }

  function selectStream(stream) {
    data.stream = stream.id;
    if (stream.id == 8) {
      showStreamDetails = true;
    } else {
      data.stream_details = "";
      showStreamDetails = false;
    }
    isStreamOpen = false;
    onInput("stream");
  }

  function selectModeOfStudy(mode) {
    data.mode_of_study = mode.id;
    isModeOfStudyOpen = false;
    onInput("mode_of_study");
  }

  function selectAdmissionStatus(status) {
    data.admission_status = status.id;
    isAdmissionStatusOpen = false;
    onInput("admission_status");
  } 

  function selectLoanPurpose(purpose) {
    data.loan_purpose = purpose.id;
    if (purpose.id == 5) {
      showLoanPurposeDetails = true;
    } else {
      data.loan_purpose_details = "";
      showLoanPurposeDetails = false;
    }
    isLoanPurposeOpen = false;
    onInput("loan_purpose");
  }
</script>

{#if dataLoaded}
  <div class="lg:mx-10 mx-5 my-10 space-y-5">
    <!-- Student Details Section -->
    <div class="border bg-white shadow-lg rounded-lg py-5 xl:px-10 px-5">
      <div>
        <h1 class="xl:text-3xl lg:text-2xl md:text-xl text-lg capitalize font-bold font-roboto py-1 text-gray-700 border-b-2 border-gray-300">
          Student Education Details :
          <h1 class="xl:text-1xl lg:text-1xl md:text-xl text-lg capitalize font-bold font-roboto py-1 text-gray-700">
             विद्यार्थ्याचे शैक्षणिक माहिती
          </h1>
        </h1>
      </div>

      <!-- 1. Student Details -->
      <div class="py-5">
        <h1 class="md:text-xl text-lg font-semibold font-inter text-gray-700 border-b-2 border-gray-300 pb-2 mb-5">
          Student Details / विद्यार्थ्याचे तपशील
        </h1>

        <div class="grid grid-cols-12 gap-5">
          <!-- Student Name -->
          <div class="col-span-12 md:col-span-6">
            <div class="grid grid-cols-12 justify-start items-center">
              <div class="lg:col-span-4 col-span-12">
                <h1 class="block xl:text-base text-sm font-marvel text-gray-500 xl:text-end pr-5 xl:font-medium font-semibold">
                  Student Name <span class="text-red-500">*</span> <br />
                  विद्यार्थ्याचे नाव
                </h1>
              </div>
              <div class="hidden xl:block col-span-1">:</div>
              <div class="xl:col-span-7 col-span-12 xl:mt-0 mt-1 relative">
                <div class="absolute inset-y-0 left-0 px-3 flex items-center pointer-events-none border-r border-gray-300">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 -960 960 960" class="size-5 fill-gray-500">
                    <path d="M480-480q-66 0-113-47t-47-113q0-66 47-113t113-47q66 0 113 47t47 113q0 66-47 113t-113 47ZM160-160v-112q0-34 17.5-62.5T224-378q62-31 126-46.5T480-440q66 0 130 15.5T736-378q29 15 46.5 43.5T800-272v112H160Z" />
                  </svg>
                </div>
                <input type="text" name="student_name" id="student_name"
                  class="block w-full pl-14 pr-3 md:py-2 py-1.5 text-sm border border-gray-300 placeholder:text-gray-400 placeholder:text-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                  placeholder="Enter student name..."
                  bind:value={data.student_name}
                  on:input={(e) => {
                    data.student_name = e.target.value.toUpperCase();
                    onInput("student_name");
                  }} />
                <div class="ml-8 mt-1">
                  {#if errors.student_name}
                    <Helper color="red" class="absolute">{errors.student_name}</Helper>
                  {/if}
                </div>
              </div>
            </div>
          </div>

          <!-- Course Name -->
          <div class="col-span-12 md:col-span-6">
            <div class="grid grid-cols-12 justify-start items-center">
              <div class="lg:col-span-4 col-span-12">
                <h1 class="block xl:text-base text-sm font-marvel text-gray-500 xl:font-medium font-semibold xl:text-end pr-5">
                  Course Name <span class="text-red-500">*</span> <br />
                  अभ्यासक्रमाचे नाव
                </h1>
              </div>
              <div class="hidden xl:block col-span-1">:</div>
              <div class="xl:col-span-7 col-span-12 xl:mt-0 mt-1 relative">
                <div class="absolute inset-y-0 left-0 px-3 flex items-center pointer-events-none border-r border-gray-300">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 -960 960 960" class="size-5 fill-gray-500">
                    <path d="M480-120 200-272v-240L40-600l440-240 440 240v320h-80v-276l-80 44v240L480-120Zm0-332 274-148-274-148-274 148 274 148Zm0 241 200-108v-151L480-360 280-470v151l200 108Zm0-241Zm0 90Zm0 0Z" />
                  </svg>
                </div>
                <input type="text" name="course_name" id="course_name"
                  class="block w-full pl-14 pr-3 md:py-2 py-1.5 text-sm border border-gray-300 placeholder:text-gray-400 placeholder:text-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                  placeholder="e.g., B.Tech, MBA, MBBS..."
                  bind:value={data.course_name}
                  on:input={(e) => {
                    data.course_name = e.target.value.toUpperCase();
                    onInput("course_name");
                  }} />
                <div class="ml-8 mt-1">
                  {#if errors.course_name}
                    <Helper color="red" class="absolute">{errors.course_name}</Helper>
                  {/if}
                </div>
              </div>
            </div>
          </div>

          <!-- Course Type -->
          <div class="col-span-12 md:col-span-6">
            <div class="grid grid-cols-12 justify-start items-center">
              <div class="lg:col-span-4 col-span-12">
                <h1 class="block capitalize lg:text-base text-sm font-marvel text-gray-500 lg:font-medium font-semibold xl:text-end pr-5">
                  Course Type <span class="text-red-500">*</span> <br />
                  अभ्यासक्रमाचा प्रकार
                </h1>
              </div>
              <div class="hidden lg:block col-span-1">:</div>
              <div class="lg:col-span-7 col-span-12 lg:mt-0 mt-1 relative">
                <button on:click={() => (isCourseTypeOpen = !isCourseTypeOpen)}
                  class="flex text-sm justify-between items-center w-full px-4 md:py-2 py-1.5 bg-white border border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 text-left">
                  {#if data.course_type}
                    {courseTypes.find((c) => c.id == data.course_type).eng_name}
                  {:else}
                    <h1 class="text-gray-500 text-sm">-- Select Course Type --</h1>
                  {/if}
                  <svg xmlns="http://www.w3.org/2000/svg" class="size-5 text-gray-500 {isCourseTypeOpen ? 'rotate-180' : ''}"
                    fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
                <div class="ml-8 mt-1">
                  {#if errors.course_type}
                    <Helper color="red" class="absolute">{errors.course_type}</Helper>
                  {/if}
                </div>
                {#if isCourseTypeOpen}
                  <div transition:slide={{ duration: 400 }} class="absolute z-10 w-full mt-0.5 bg-white border border-gray-300">
                    {#each courseTypes as type, index}
                      <button on:click={() => selectCourseType(type)}
                        class="w-full text-sm text-gray-500 font-lato px-4 py-1 text-left hover:bg-gray-100 {index !== courseTypes.length - 1 ? 'border-b' : ''}">
                        {type.eng_name} - {type.dev_name}
                      </button>
                    {/each}
                  </div>
                {/if}
              </div>
            </div>
          </div>

          <!-- Stream/Specialization -->
          <div class="col-span-12 md:col-span-6">
            <div class="grid grid-cols-12 justify-start items-center">
              <div class="lg:col-span-4 col-span-12">
                <h1 class="block capitalize lg:text-base text-sm font-marvel text-gray-500 lg:font-medium font-semibold xl:text-end pr-5">
                  Stream / Specialization <span class="text-red-500">*</span> <br />
                  प्रवाह / विशेषीकरण
                </h1>
              </div>
              <div class="hidden lg:block col-span-1">:</div>
              <div class="lg:col-span-7 col-span-12 lg:mt-0 mt-1 relative">
                <button on:click={() => (isStreamOpen = !isStreamOpen)}
                  class="flex text-sm justify-between items-center w-full px-4 md:py-2 py-1.5 bg-white border border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 text-left">
                  {#if data.stream}
                    {streamOptions.find((s) => s.id == data.stream).eng_name}
                  {:else}
                    <h1 class="text-gray-500 text-sm">-- Select Stream --</h1>
                  {/if}
                  <svg xmlns="http://www.w3.org/2000/svg" class="size-5 text-gray-500 {isStreamOpen ? 'rotate-180' : ''}"
                    fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
                <div class="ml-8 mt-1">
                  {#if errors.stream}
                    <Helper color="red" class="absolute">{errors.stream}</Helper>
                  {/if}
                </div>
                {#if isStreamOpen}
                  <div transition:slide={{ duration: 400 }} class="absolute z-10 w-full mt-0.5 bg-white border border-gray-300">
                    {#each streamOptions as stream, index}
                      <button on:click={() => selectStream(stream)}
                        class="w-full text-sm text-gray-500 font-lato px-4 py-1 text-left hover:bg-gray-100 {index !== streamOptions.length - 1 ? 'border-b' : ''}">
                        {stream.eng_name} - {stream.dev_name}
                      </button>
                    {/each}
                  </div>
                {/if}
              </div>
            </div>
          </div>

          {#if showStreamDetails}
            <div class="col-span-12 md:col-span-6">
              <div class="grid grid-cols-12 justify-start items-center">
                <div class="lg:col-span-4 col-span-12">
                  <h1 class="block capitalize lg:text-base text-sm font-marvel text-gray-500 lg:font-medium font-semibold xl:text-end pr-5">
                    Specify Stream <br />
                    प्रवाह तपशील
                  </h1>
                </div>
                <div class="hidden lg:block col-span-1">:</div>
                <div class="lg:col-span-7 col-span-12 lg:mt-0 mt-1 relative">
                  <input type="text" name="stream_details"
                    class="block w-full px-4 md:py-2 py-1.5 text-sm border border-gray-300 placeholder:text-gray-400 placeholder:text-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                    placeholder="Enter stream details..."
                    bind:value={data.stream_details}
                    on:input={() => onInput("stream_details")} />
                </div>
              </div>
            </div>
          {/if}

          <!-- Course Duration -->
          <div class="col-span-12 md:col-span-6">
            <div class="grid grid-cols-12 justify-start items-center">
              <div class="lg:col-span-4 col-span-12">
                <h1 class="block capitalize lg:text-base text-sm font-marvel text-gray-500 lg:font-medium font-semibold xl:text-end pr-5">
                  Course Duration <span class="text-red-500">*</span> <br />
                  अभ्यासक्रम कालावधी (वर्षांमध्ये)
                </h1>
              </div>
              <div class="hidden lg:block col-span-1">:</div>
              <div class="lg:col-span-7 col-span-12 lg:mt-0 mt-1 relative">
                <input type="number" name="course_duration" min="1" max="10"
                  class="block w-full px-4 md:py-2 py-1.5 text-sm border border-gray-300 placeholder:text-gray-400 placeholder:text-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                  placeholder="Enter duration in years..."
                  bind:value={data.course_duration}
                  on:input={() => onInput("course_duration")} />
                <div class="ml-8 mt-1">
                  {#if errors.course_duration}
                    <Helper color="red" class="absolute">{errors.course_duration}</Helper>
                  {/if}
                </div>
              </div>
            </div>
          </div>

          <!-- Mode of Study -->
          <div class="col-span-12 md:col-span-6">
            <div class="grid grid-cols-12 justify-start items-center">
              <div class="lg:col-span-4 col-span-12">
                <h1 class="block capitalize lg:text-base text-sm font-marvel text-gray-500 lg:font-medium font-semibold xl:text-end pr-5">
                  Mode of Study <span class="text-red-500">*</span> <br />
                  अभ्यासाची पद्धत
                </h1>
              </div>
              <div class="hidden lg:block col-span-1">:</div>
              <div class="lg:col-span-7 col-span-12 lg:mt-0 mt-1 relative">
                <button on:click={() => (isModeOfStudyOpen = !isModeOfStudyOpen)}
                  class="flex text-sm justify-between items-center w-full px-4 md:py-2 py-1.5 bg-white border border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 text-left">
                  {#if data.mode_of_study}
                    {modeOfStudyOptions.find((m) => m.id == data.mode_of_study).eng_name}
                  {:else}
                    <h1 class="text-gray-500 text-sm">-- Select Mode --</h1>
                  {/if}
                  <svg xmlns="http://www.w3.org/2000/svg" class="size-5 text-gray-500 {isModeOfStudyOpen ? 'rotate-180' : ''}"
                    fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
                <div class="ml-8 mt-1">
                  {#if errors.mode_of_study}
                    <Helper color="red" class="absolute">{errors.mode_of_study}</Helper>
                  {/if}
                </div>
                {#if isModeOfStudyOpen}
                  <div transition:slide={{ duration: 400 }} class="absolute z-10 w-full mt-0.5 bg-white border border-gray-300">
                    {#each modeOfStudyOptions as mode, index}
                      <button on:click={() => selectModeOfStudy(mode)}
                        class="w-full text-sm text-gray-500 font-lato px-4 py-1 text-left hover:bg-gray-100 {index !== modeOfStudyOptions.length - 1 ? 'border-b' : ''}">
                        {mode.eng_name} - {mode.dev_name}
                      </button>
                    {/each}
                  </div>
                {/if}
              </div>
            </div>
          </div>
        </div>
      </div>

     <!-- 2. Institution Details -->
      <div class="py-5 border-t border-gray-300">
        <h1 class="md:text-xl text-lg font-semibold font-inter text-gray-700 border-b-2 border-gray-300 pb-2 mb-5">
          Institution Details / संस्थेचे तपशील
        </h1>

        <div class="grid grid-cols-12 gap-5">
          <!-- Institute Name -->
          <div class="col-span-12 md:col-span-6">
            <div class="grid grid-cols-12 justify-start items-center">
              <div class="lg:col-span-4 col-span-12">
                <h1 class="block xl:text-base text-sm font-marvel text-gray-500 xl:text-end pr-5 xl:font-medium font-semibold">
                  Institute / College Name <span class="text-red-500">*</span> <br />
                  संस्था / महाविद्यालयाचे नाव
                </h1>
              </div>
              <div class="hidden xl:block col-span-1">:</div>
              <div class="xl:col-span-7 col-span-12 xl:mt-0 mt-1 relative">
                <input
                  type="text"
                  name="institute_name"
                  class="block w-full px-4 md:py-2 py-1.5 text-sm border border-gray-300 placeholder:text-gray-400 placeholder:text-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                  placeholder="Enter institute name..."
                  bind:value={data.institute_name}
                  on:input={(e) => {
                    data.institute_name = e.target.value.toUpperCase();
                    onInput("institute_name");
                  }}
                />
                <div class="ml-8 mt-1">
                  {#if errors.institute_name}
                    <Helper color="red" class="absolute">{errors.institute_name}</Helper>
                  {/if}
                </div>
              </div>
            </div>
          </div>

          <!-- University/Board Name -->
          <div class="col-span-12 md:col-span-6">
            <div class="grid grid-cols-12 justify-start items-center">
              <div class="lg:col-span-4 col-span-12">
                <h1 class="block xl:text-base text-sm font-marvel text-gray-500 xl:font-medium font-semibold xl:text-end pr-5">
                  University / Board Name <span class="text-red-500">*</span> <br />
                  विद्यापीठ / बोर्डाचे नाव
                </h1>
              </div>
              <div class="hidden xl:block col-span-1">:</div>
              <div class="xl:col-span-7 col-span-12 xl:mt-0 mt-1 relative">
                <input
                  type="text"
                  name="university_name"
                  class="block w-full px-4 md:py-2 py-1.5 text-sm border border-gray-300 placeholder:text-gray-400 placeholder:text-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                  placeholder="Enter university/board name..."
                  bind:value={data.university_name}
                  on:input={(e) => {
                    data.university_name = e.target.value.toUpperCase();
                    onInput("university_name");
                  }}
                />
                <div class="ml-8 mt-1">
                  {#if errors.university_name}
                    <Helper color="red" class="absolute">{errors.university_name}</Helper>
                  {/if}
                </div>
              </div>
            </div>
          </div>

          <!-- Institute Address (Full Width) -->
          <div class="col-span-12 gap-5">
            <div class="grid grid-cols-12 justify-start items-center">
              <div class="lg:col-span-2 col-span-12">
                <h1 class="block xl:text-base text-sm font-marvel text-gray-500 xl:text-end pr-5 xl:font-medium font-semibold">
                  Institute Address <span class="text-red-500">*</span> <br />
                  संस्थेचा पत्ता
                </h1>
              </div>
              <div class="hidden xl:block col-span-1">:</div>
              <div class="xl:col-span-9 col-span-12 xl:mt-0 mt-1 relative">
                <input
                  type="text"
                  name="institute_address"
                  class="block w-full px-4 md:py-2 py-1.5 text-sm border border-gray-300 placeholder:text-gray-400 placeholder:text-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                  placeholder="Enter complete institute address..."
                  bind:value={data.institute_address}
                  on:input={(e) => {
                    data.institute_address = e.target.value.toUpperCase();
                    onInput("institute_address");
                  }}
                />
                <div class="ml-8 mt-1">
                  {#if errors.institute_address}
                    <Helper color="red" class="absolute">{errors.institute_address}</Helper>
                  {/if}
                </div>
              </div>
            </div>
          </div>

          <!-- District -->
          <div class="col-span-12 md:col-span-6">
            <div class="grid grid-cols-12 justify-start items-center">
              <div class="lg:col-span-4 col-span-12">
                <h1 class="block capitalize lg:text-base text-sm font-marvel text-gray-500 lg:font-medium font-semibold xl:text-end pr-5">
                  District <span class="text-red-500">*</span> <br />
                  जिल्हा
                </h1>
              </div>
              <div class="hidden lg:block col-span-1">:</div>
              <div class="lg:col-span-7 col-span-12 lg:mt-0 mt-1 relative">
                <button on:click={toggleInstituteDistrictDropdown}
                  class="flex text-sm justify-between items-center w-full px-4 md:py-2 py-1.5 bg-white border border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 text-left">
                  {#if data.institute_district}
                    {districts.find((d) => d.dist_id == data.institute_district).eng_name} - 
                    {districts.find((d) => d.dist_id == data.institute_district).dev_name}
                  {:else}
                    <h1 class="text-gray-500 text-sm">-- Select District --</h1>
                  {/if}
                  <svg xmlns="http://www.w3.org/2000/svg" class="size-5 text-gray-500 {isInstituteDistrictOpen ? 'rotate-180' : ''}"
                    fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
                <div class="ml-8 mt-1">
                  {#if errors.institute_district}
                    <Helper color="red" class="absolute">{errors.institute_district}</Helper>
                  {/if}
                </div>
                {#if isInstituteDistrictOpen}
                  <div transition:slide={{ duration: 400 }} class="absolute z-10 w-full mt-0.5 bg-white border border-gray-300 max-h-60 overflow-y-auto">
                    {#each districts as district, index}
                      <button on:click={() => selectInstituteDistrict(district)}
                        class="w-full text-sm text-gray-500 font-lato px-4 py-1 text-left hover:bg-gray-100 {index !== districts.length - 1 ? 'border-b' : ''}">
                        {district.eng_name} - {district.dev_name}
                      </button>
                    {/each}
                  </div>
                {/if}
              </div>
            </div>
          </div>

          <!-- Taluka -->
          <div class="col-span-12 md:col-span-6">
            <div class="grid grid-cols-12 justify-start items-center">
              <div class="lg:col-span-4 col-span-12">
                <h1 class="block capitalize lg:text-base text-sm font-marvel text-gray-500 lg:font-medium font-semibold xl:text-end pr-5">
                  Taluka <span class="text-red-500">*</span> <br />
                  तालुका
                </h1>
              </div>
              <div class="hidden lg:block col-span-1">:</div>
              <div class="lg:col-span-7 col-span-12 lg:mt-0 mt-1 relative">
                <button on:click={toggleInstituteTalukaDropdown}
                  class="flex text-sm justify-between items-center w-full px-4 md:py-2 py-1.5 bg-white border border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 text-left">
                  {#if data.institute_taluka && talukas.length}
                    {talukas.find((t) => t.taluka_id == data.institute_taluka).eng_name} - 
                    {talukas.find((t) => t.taluka_id == data.institute_taluka).dev_name}
                  {:else}
                    <h1 class="text-gray-500 text-sm">-- Select Taluka --</h1>
                  {/if}
                  <svg xmlns="http://www.w3.org/2000/svg" class="size-5 text-gray-500 {isInstituteTalukaOpen ? 'rotate-180' : ''}"
                    fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
                <div class="ml-8 mt-1">
                  {#if errors.institute_taluka}
                    <Helper color="red" class="absolute">{errors.institute_taluka}</Helper>
                  {/if}
                </div>
                {#if isInstituteTalukaOpen}
                  <div transition:slide={{ duration: 400 }} class="absolute z-10 w-full mt-0.5 bg-white border border-gray-300 max-h-60 overflow-y-auto">
                    {#each talukas as taluka, index}
                      <button on:click={() => selectInstituteTaluka(taluka)}
                        class="w-full text-sm text-gray-500 font-lato px-4 py-1 text-left hover:bg-gray-100 {index !== talukas.length - 1 ? 'border-b' : ''}">
                        {taluka.eng_name} - {taluka.dev_name}
                      </button>
                    {/each}
                  </div>
                {/if}
              </div>
            </div>
          </div>

          <!-- Place -->
          <div class="col-span-12 md:col-span-6">
            <div class="grid grid-cols-12 justify-start items-center">
              <div class="lg:col-span-4 col-span-12">
                <h1 class="block capitalize lg:text-base text-sm font-marvel text-gray-500 lg:font-medium font-semibold xl:text-end pr-5">
                  Place <span class="text-red-500">*</span> <br />
                  ठिकाण
                </h1>
              </div>
              <div class="hidden lg:block col-span-1">:</div>
              <div class="lg:col-span-7 col-span-12 lg:mt-0 mt-1 relative">
                <input type="text" name="institute_place"
                  class="block w-full px-4 md:py-2 py-1.5 text-sm border border-gray-300 placeholder:text-gray-400 placeholder:text-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                  placeholder="Enter place..."
                  bind:value={data.institute_place}
                  on:input={(e) => {
                    data.institute_place = e.target.value.toUpperCase();
                    onInput("institute_place");
                  }} />
                <div class="ml-8 mt-1">
                  {#if errors.institute_place}
                    <Helper color="red" class="absolute">{errors.institute_place}</Helper>
                  {/if}
                </div>
              </div>
            </div>
          </div>

          <!-- Pin Code -->
          <div class="col-span-12 md:col-span-6">
            <div class="grid grid-cols-12 justify-start items-center">
              <div class="lg:col-span-4 col-span-12">
                <h1 class="block capitalize lg:text-base text-sm font-marvel text-gray-500 lg:font-medium font-semibold xl:text-end pr-5">
                  Pin Code <span class="text-red-500">*</span> <br />
                  पिन कोड
                </h1>
              </div>
              <div class="hidden lg:block col-span-1">:</div>
              <div class="lg:col-span-7 col-span-12 lg:mt-0 mt-1 relative">
                <input type="text" name="institute_pincode" maxlength="6"
                  class="block w-full px-4 md:py-2 py-1.5 text-sm border border-gray-300 placeholder:text-gray-400 placeholder:text-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                  placeholder="Enter pincode..."
                  bind:value={data.institute_pincode}
                  on:input={() => onInput("institute_pincode")} />
                <div class="ml-8 mt-1">
                  {#if errors.institute_pincode}
                    <Helper color="red" class="absolute">{errors.institute_pincode}</Helper>
                  {/if}
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>

      <!-- 3. Admission & Fee Details -->
      <div class="py-5 border-t border-gray-300">
        <h1 class="md:text-xl text-lg font-semibold font-inter text-gray-700 border-b-2 border-gray-300 pb-2 mb-5">
          Admission & Fee Details / प्रवेश आणि फी तपशील
        </h1>

        <div class="grid grid-cols-12 gap-5">
          <!-- Admission Status -->
          <div class="col-span-12 md:col-span-6">
            <div class="grid grid-cols-12 justify-start items-center">
              <div class="lg:col-span-4 col-span-12">
                <h1 class="block capitalize lg:text-base text-sm font-marvel text-gray-500 lg:font-medium font-semibold xl:text-end pr-5">
                  Admission Status <span class="text-red-500">*</span> <br />
                  प्रवेश स्थिती
                </h1>
              </div>
              <div class="hidden lg:block col-span-1">:</div>
              <div class="lg:col-span-7 col-span-12 lg:mt-0 mt-1 relative">
                <button on:click={() => (isAdmissionStatusOpen = !isAdmissionStatusOpen)}
                  class="flex text-sm justify-between items-center w-full px-4 md:py-2 py-1.5 bg-white border border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 text-left">
                  {#if data.admission_status}
                    {admissionStatusOptions.find((s) => s.id == data.admission_status).eng_name}
                  {:else}
                    <h1 class="text-gray-500 text-sm">-- Select Status --</h1>
                  {/if}
                  <svg xmlns="http://www.w3.org/2000/svg" class="size-5 text-gray-500 {isAdmissionStatusOpen ? 'rotate-180' : ''}"
                    fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
                <div class="ml-8 mt-1">
                  {#if errors.admission_status}
                    <Helper color="red" class="absolute">{errors.admission_status}</Helper>
                  {/if}
                </div>
                {#if isAdmissionStatusOpen}
                  <div transition:slide={{ duration: 400 }} class="absolute z-10 w-full mt-0.5 bg-white border border-gray-300">
                    {#each admissionStatusOptions as status, index}
                      <button on:click={() => selectAdmissionStatus(status)}
                        class="w-full text-sm text-gray-500 font-lato px-4 py-1 text-left hover:bg-gray-100 {index !== admissionStatusOptions.length - 1 ? 'border-b' : ''}">
                        {status.eng_name} - {status.dev_name}
                      </button>
                    {/each}
                  </div>
                {/if}
              </div>
            </div>
          </div>

          <!-- Admission Year -->
          <div class="col-span-12 md:col-span-6">
            <div class="grid grid-cols-12 justify-start items-center">
              <div class="lg:col-span-4 col-span-12">
                <h1 class="block capitalize lg:text-base text-sm font-marvel text-gray-500 lg:font-medium font-semibold xl:text-end pr-5">
                  Admission Year <span class="text-red-500">*</span> <br />
                  प्रवेश वर्ष
                </h1>
              </div>
              <div class="hidden lg:block col-span-1">:</div>
              <div class="lg:col-span-7 col-span-12 lg:mt-0 mt-1 relative">
                <input type="number" name="admission_year" min="2000" max="2030"
                  class="block w-full px-4 md:py-2 py-1.5 text-sm border border-gray-300 placeholder:text-gray-400 placeholder:text-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                  placeholder="e.g., 2024"
                  bind:value={data.admission_year}
                  on:input={() => onInput("admission_year")} />
                <div class="ml-8 mt-1">
                  {#if errors.admission_year}
                    <Helper color="red" class="absolute">{errors.admission_year}</Helper>
                  {/if}
                </div>
              </div>
            </div>
          </div>

          <!-- Total Course Fee -->
          <div class="col-span-12 md:col-span-6">
            <div class="grid grid-cols-12 justify-start items-center">
              <div class="lg:col-span-4 col-span-12">
                <h1 class="block capitalize lg:text-base text-sm font-marvel text-gray-500 lg:font-medium font-semibold xl:text-end pr-5">
                  Total Course Fee <span class="text-red-500">*</span> <br />
                  एकूण अभ्यासक्रम फी
                </h1>
              </div>
              <div class="hidden lg:block col-span-1">:</div>
              <div class="lg:col-span-7 col-span-12 lg:mt-0 mt-1 relative">
                <input type="number" name="total_course_fee" min="0"
                  class="block w-full px-4 md:py-2 py-1.5 text-sm border border-gray-300 placeholder:text-gray-400 placeholder:text-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                  placeholder="Enter total fee..."
                  bind:value={data.total_course_fee}
                  on:input={() => onInput("total_course_fee")} />
                <div class="ml-8 mt-1">
                  {#if errors.total_course_fee}
                    <Helper color="red" class="absolute">{errors.total_course_fee}</Helper>
                  {/if}
                </div>
              </div>
            </div>
          </div>

          <!-- Fee Paid -->
          <div class="col-span-12 md:col-span-6">
            <div class="grid grid-cols-12 justify-start items-center">
              <div class="lg:col-span-4 col-span-12">
                <h1 class="block capitalize lg:text-base text-sm font-marvel text-gray-500 lg:font-medium font-semibold xl:text-end pr-5">
                  Fee Paid (if any) <br />
                  भरलेली फी (असल्यास)
                </h1>
              </div>
              <div class="hidden lg:block col-span-1">:</div>
              <div class="lg:col-span-7 col-span-12 lg:mt-0 mt-1 relative">
                <input type="number" name="fee_paid" min="0"
                  class="block w-full px-4 md:py-2 py-1.5 text-sm border border-gray-300 placeholder:text-gray-400 placeholder:text-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                  placeholder="Enter paid amount..."
                  bind:value={data.fee_paid}
                  on:input={() => onInput("fee_paid")} />
              </div>
            </div>
          </div>

          <!-- Remaining Fee -->
          <div class="col-span-12 md:col-span-6">
            <div class="grid grid-cols-12 justify-start items-center">
              <div class="lg:col-span-4 col-span-12">
                <h1 class="block capitalize lg:text-base text-sm font-marvel text-gray-500 lg:font-medium font-semibold xl:text-end pr-5">
                  Remaining Fee Amount <span class="text-red-500">*</span> <br />
                  उर्वरित फी रक्कम
                </h1>
              </div>
              <div class="hidden lg:block col-span-1">:</div>
              <div class="lg:col-span-7 col-span-12 lg:mt-0 mt-1 relative">
                <input type="number" name="remaining_fee" min="0"
                  class="block w-full px-4 md:py-2 py-1.5 text-sm border border-gray-300 placeholder:text-gray-400 placeholder:text-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                  placeholder="Enter remaining amount..."
                  bind:value={data.remaining_fee}
                  on:input={() => onInput("remaining_fee")} />
                <div class="ml-8 mt-1">
                  {#if errors.remaining_fee}
                    <Helper color="red" class="absolute">{errors.remaining_fee}</Helper>
                  {/if}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- 4. Loan Requirement Details -->
      <div class="py-5 border-t border-gray-300">
        <h1 class="md:text-xl text-lg font-semibold font-inter text-gray-700 border-b-2 border-gray-300 pb-2 mb-5">
          Loan Requirement Details / कर्जाची आवश्यकता तपशील
        </h1>

        <div class="grid grid-cols-12 gap-5">
          <!-- Loan Required Amount -->
          <div class="col-span-12 md:col-span-6">
            <div class="grid grid-cols-12 justify-start items-center">
              <div class="lg:col-span-4 col-span-12">
                <h1 class="block capitalize lg:text-base text-sm font-marvel text-gray-500 lg:font-medium font-semibold xl:text-end pr-5">
                  Loan Required Amount <span class="text-red-500">*</span> <br />
                  आवश्यक कर्ज रक्कम
                </h1>
              </div>
              <div class="hidden lg:block col-span-1">:</div>
              <div class="lg:col-span-7 col-span-12 lg:mt-0 mt-1 relative">
                <input type="number" name="loan_amount" min="0"
                  class="block w-full px-4 md:py-2 py-1.5 text-sm border border-gray-300 placeholder:text-gray-400 placeholder:text-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                  placeholder="Enter loan amount..."
                  bind:value={data.loan_amount}
                  on:input={() => onInput("loan_amount")} />
                <div class="ml-8 mt-1">
                  {#if errors.loan_amount}
                    <Helper color="red" class="absolute">{errors.loan_amount}</Helper>
                  {/if}
                </div>
              </div>
            </div>
          </div>

          <!-- Purpose of Loan -->
          <div class="col-span-12 md:col-span-6">
            <div class="grid grid-cols-12 justify-start items-center">
              <div class="lg:col-span-4 col-span-12">
                <h1 class="block capitalize lg:text-base text-sm font-marvel text-gray-500 lg:font-medium font-semibold xl:text-end pr-5">
                  Purpose of Loan <span class="text-red-500">*</span> <br />
                  कर्जाचा उद्देश
                </h1>
              </div>
              <div class="hidden lg:block col-span-1">:</div>
              <div class="lg:col-span-7 col-span-12 lg:mt-0 mt-1 relative">
                <button on:click={() => (isLoanPurposeOpen = !isLoanPurposeOpen)}
                  class="flex text-sm justify-between items-center w-full px-4 md:py-2 py-1.5 bg-white border border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 text-left">
                  {#if data.loan_purpose}
                    {loanPurposeOptions.find((p) => p.id == data.loan_purpose).eng_name}
                  {:else}
                    <h1 class="text-gray-500 text-sm">-- Select Purpose --</h1>
                  {/if}
                  <svg xmlns="http://www.w3.org/2000/svg" class="size-5 text-gray-500 {isLoanPurposeOpen ? 'rotate-180' : ''}"
                    fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
                <div class="ml-8 mt-1">
                  {#if errors.loan_purpose}
                    <Helper color="red" class="absolute">{errors.loan_purpose}</Helper>
                  {/if}
                </div>
                {#if isLoanPurposeOpen}
                  <div transition:slide={{ duration: 400 }} class="absolute z-10 w-full mt-0.5 bg-white border border-gray-300">
                    {#each loanPurposeOptions as purpose, index}
                      <button on:click={() => selectLoanPurpose(purpose)}
                        class="w-full text-sm text-gray-500 font-lato px-4 py-1 text-left hover:bg-gray-100 {index !== loanPurposeOptions.length - 1 ? 'border-b' : ''}">
                        {purpose.eng_name} - {purpose.dev_name}
                      </button>
                    {/each}
                  </div>
                {/if}
              </div>
            </div>
          </div>

          {#if showLoanPurposeDetails}
            <div class="col-span-12 md:col-span-6">
              <div class="grid grid-cols-12 justify-start items-center">
                <div class="lg:col-span-4 col-span-12">
                  <h1 class="block capitalize lg:text-base text-sm font-marvel text-gray-500 lg:font-medium font-semibold xl:text-end pr-5">
                    Specify Purpose <br />
                    उद्देश तपशील
                  </h1>
                </div>
                <div class="hidden lg:block col-span-1">:</div>
                <div class="lg:col-span-7 col-span-12 lg:mt-0 mt-1 relative">
                  <input type="text" name="loan_purpose_details"
                    class="block w-full px-4 md:py-2 py-1.5 text-sm border border-gray-300 placeholder:text-gray-400 placeholder:text-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                    placeholder="Enter purpose details..."
                    bind:value={data.loan_purpose_details}
                    on:input={() => onInput("loan_purpose_details")} />
                </div>
              </div>
            </div>
          {/if}

          <!-- GST Number -->
          <div class="col-span-12 md:col-span-6">
            <div class="grid grid-cols-12 justify-start items-center">
              <div class="lg:col-span-4 col-span-12">
                <h1 class="block capitalize lg:text-base text-sm font-marvel text-gray-500 lg:font-medium font-semibold xl:text-end pr-5">
                  GST Number (Optional) <br />
                  जीएसटी क्रमांक (ऐच्छिक)
                </h1>
              </div>
              <div class="hidden lg:block col-span-1">:</div>
              <div class="lg:col-span-7 col-span-12 lg:mt-0 mt-1 relative">
                <input type="text" name="quotation_gst_number"
                  class="block w-full px-4 md:py-2 py-1.5 text-sm border border-gray-300 placeholder:text-gray-400 placeholder:text-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                  placeholder="Enter GST number if applicable..."
                  bind:value={data.quotation_gst_number}
                  on:input={() => onInput("quotation_gst_number")} />
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- 5. Bank Details -->
      <div class="py-5 border-t border-gray-300">
        <h1 class="md:text-xl text-lg font-semibold font-inter text-gray-700 border-b-2 border-gray-300 pb-2 mb-5">
          Bank Details / बँक तपशील
        </h1>

        <div class="grid grid-cols-12 gap-5">
          <!-- Bank Name -->
          <div class="col-span-12 md:col-span-6">
            <div class="grid grid-cols-12 justify-start items-center">
              <div class="lg:col-span-4 col-span-12">
                <h1 class="block capitalize lg:text-base text-sm font-marvel text-gray-500 lg:font-medium font-semibold xl:text-end pr-5">
                  Nationalized Bank Name <br />
                  राष्ट्रीयीकृत बँकेचे नाव
                </h1>
              </div>
              <div class="hidden lg:block col-span-1">:</div>
              <div class="lg:col-span-7 col-span-12 lg:mt-0 mt-1 relative">
                <input type="text" name="bank_name"
                  class="block w-full px-4 md:py-2 py-1.5 text-sm border border-gray-300 placeholder:text-gray-400 placeholder:text-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                  placeholder="Enter bank name..."
                  bind:value={data.bank_name}
                  on:input={() => onInput("bank_name")} />
              </div>
            </div>
          </div>

          <!-- IFSC Code -->
          <div class="col-span-12 md:col-span-6">
            <div class="grid grid-cols-12 justify-start items-center">
              <div class="lg:col-span-4 col-span-12">
                <h1 class="block capitalize lg:text-base text-sm font-marvel text-gray-500 lg:font-medium font-semibold xl:text-end pr-5">
                  IFSC Code <br />
                  IFSC कोड
                </h1>
              </div>
              <div class="hidden lg:block col-span-1">:</div>
              <div class="lg:col-span-7 col-span-12 lg:mt-0 mt-1 relative">
                <input type="text" name="ifsc_code"
                  class="block w-full px-4 md:py-2 py-1.5 text-sm border border-gray-300 placeholder:text-gray-400 placeholder:text-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                  placeholder="Enter IFSC code..."
                  bind:value={data.ifsc_code}
                  on:input={() => onInput("ifsc_code")} />
              </div>
            </div>
          </div>

          <!-- Branch Name -->
          <div class="col-span-12 md:col-span-6">
            <div class="grid grid-cols-12 justify-start items-center">
              <div class="lg:col-span-4 col-span-12">
                <h1 class="block capitalize lg:text-base text-sm font-marvel text-gray-500 lg:font-medium font-semibold xl:text-end pr-5">
                  Branch Name <br />
                  शाखेचे नाव
                </h1>
              </div>
              <div class="hidden lg:block col-span-1">:</div>
              <div class="lg:col-span-7 col-span-12 lg:mt-0 mt-1 relative">
                <input type="text" name="branch_name"
                  class="block w-full px-4 md:py-2 py-1.5 text-sm border border-gray-300 placeholder:text-gray-400 placeholder:text-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                  placeholder="Enter branch name..."
                  bind:value={data.branch_name}
                  on:input={() => onInput("branch_name")} />
              </div>
            </div>
          </div>

          <!-- Account Number -->
          <div class="col-span-12 md:col-span-6">
            <div class="grid grid-cols-12 justify-start items-center">
              <div class="lg:col-span-4 col-span-12">
                <h1 class="block capitalize lg:text-base text-sm font-marvel text-gray-500 lg:font-medium font-semibold xl:text-end pr-5">
                  Account Number <br />
                  खाते क्रमांक
                </h1>
              </div>
              <div class="hidden lg:block col-span-1">:</div>
              <div class="lg:col-span-7 col-span-12 lg:mt-0 mt-1 relative">
                <input type="text" name="account_number"
                  class="block w-full px-4 md:py-2 py-1.5 text-sm border border-gray-300 placeholder:text-gray-400 placeholder:text-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                  placeholder="Enter account number..."
                  bind:value={data.account_number}
                  on:input={() => onInput("account_number")} />
              </div>
            </div>
          </div>

          <!-- Bank Address -->
          <div class="col-span-12">
            <div class="grid grid-cols-12 justify-start items-center">
              <div class="lg:col-span-2 col-span-12">
                <h1 class="block capitalize lg:text-base text-sm font-marvel text-gray-500 lg:font-medium font-semibold xl:text-end pr-5">
                  Bank Address <br />
                  बँक पत्ता
                </h1>
              </div>
              <div class="hidden lg:block col-span-1">:</div>
              <div class="lg:col-span-9 col-span-12 lg:mt-0 mt-1 relative">
                <input type="text" name="bank_address"
                  class="block w-full px-4 md:py-2 py-1.5 text-sm border border-gray-300 placeholder:text-gray-400 placeholder:text-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                  placeholder="Enter bank address..."
                  bind:value={data.bank_address}
                  on:input={() => onInput("bank_address")} />
              </div>
            </div>
          </div>
        </div>
      </div>
      
     
    </div>
  </div>

  <div class="w-auto">
    {#if alertMsg}
      <AlertMsg {alertMsg} />
    {/if}
  </div>

  <!-- navigation button -->
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

    <!-- on:click={() => handleButtonClick("Business_Banking")} -->
    <button
      class="group relative flex items-center justify-center gap-3 border border-gray-300 md:w-[200px] w-[150px] py-2 overflow-hidden bg-Calypso-400"
      on:click={(e) => {
        // if (!verificationDetails.mobile_no_applicant) {
        //   alertMsg = "Your mobile number is not verified";
        //   return;
        // }
        onSubmit(e);
      }}
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
          _
        </svg>
      </span>
    </button>
  </div>
{:else}
  ...Loading
{/if}


