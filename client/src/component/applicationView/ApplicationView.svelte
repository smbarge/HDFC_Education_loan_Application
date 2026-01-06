<script>
  import { applications, masters } from "$appstore/store";
  import { onMount } from "svelte";

  let checked = false;
  let submitting = false;
  let submitted = false;

  const handleSubmit = async () => {
    if (!checked) return;

    submitting = true;

    // Simulate form submission
    await new Promise((resolve) => setTimeout(resolve, 1000));

    submitted = true;
    submitting = false;
  };
  let date1 = "";
  let currentApplication;
  let dataLoaded = false;

  let guardian = "";
  let occupation = "";
  let occupationGuarantor = "";
  let occupationtype = "";
  let past_surety_commitment = "";
  let dob_guarantor = "";
  let guarantorPersonalDetails = {};

  $: district_name = (id) =>
    $masters.m_district.find((d) => d.dist_id == id).eng_name;
  $: taluka_name = (id) =>
    $masters.m_taluka.find((t) => t.taluka_id == id).eng_name;
  $: date_formatted = (dt) => new Date(dt).toISOString().split("T")[0];
  onMount(() => {
    currentApplication = $applications[0];
    if (currentApplication.personalDetails.guarantor == 2) {
      guarantorPersonalDetails = currentApplication.personalDetails;
    } else {
      guarantorPersonalDetails = currentApplication.guarantorPersonalDetails;
    }

    console.log("masters: ", $masters);
    date1 = new Date(currentApplication.personalDetails.dob)
      .toISOString()
      .split("T")[0];

    console.log("date1 is", date1);

    console.log("current Application is", currentApplication);
    let entry = $masters.m_guardian.find(
      (e) => e.id == currentApplication.personalDetails.guardian
    );
    guardian = `${entry.eng_name} - ${entry.dev_name}`;
    entry = $masters.m_occupation.find(
      (e) => e.id == currentApplication.personalDetails.occupation
    );
    if (entry.id != 11) {
      occupation = `${entry.eng_name} - ${entry.dev_name}`;
    } else {
      occupation = currentApplication.personalDetails.occupationtype;
    }

    entry = $masters.m_occupation.find(
      (e) => e.id == guarantorPersonalDetails.occupation
    );
    console.log("entry is", entry);
    if (entry?.id != 11) {
      occupationGuarantor = `${entry?.eng_name} - ${entry?.dev_name}`;
    } else {
      occupationGuarantor = guarantorPersonalDetails.occupationtype;
    }

    past_surety_commitment =
      currentApplication.personalDetails.past_surety_commitment == 1
        ? "Yes"
        : "No";

    dob_guarantor = new Date(guarantorPersonalDetails.dob)
      .toISOString()
      .split("T")[0];
    dataLoaded = true;
  });
</script>

{#if dataLoaded}
  <!-- <pre>
    application: {JSON.stringify(currentApplication.personalDetails, null, 2)}
</pre> -->
  <!-- <pre>
    application: {JSON.stringify(currentApplication.businessDetails, null, 2)}
</pre> -->
  <!-- <pre>
    application: {JSON.stringify(
      currentApplication.guarantorPersonalDetails,
      null,
      2
    )}
</pre> -->
  <!-- <pre>
    properties: {JSON.stringify(currentApplication.properties, null, 2)}
</pre> -->
  <div class="min-h-screen lg:px-10 px-5 py-10">
    <div class="space-y-5 border-2 border-gray-300 p-5">
      <div class="border border-deepPurple-300 shadow-md py-4 bg-violet px-3">
        <div class="flex justify-start md:items-center items-start pb-2">
          <div class="flex justify-start items-center pr-3">
            <img
              src="/termloan/maulanaAzad1.png"
              alt="mainLOgo"
              class="w-[100px]"
            />
          </div>
          <h1
            class="xl:text-2xl lg:text-xl md:text-base text-sm uppercase font-roboto text-deepPurple-600 font-medium"
          >
            Maulana Azad Minorities Financial Development Corporation Limited
            <div class="xl:text-sm text-[10px] text-left">
              A Govt. of Maharashtra Undertaking
            </div>
          </h1>
        </div>
        <div
          class="xl:text-3xl lg:text-2xl md:text-xl text-lg uppercase font-marvel text-deepPurple-600 font-semibold text-center"
        >
          Term Loan application
        </div>
      </div>
      <div
        class="bg-gray-200 lg:text-lg text-base text-gray-600 font-medium capitalize text-center py-3 border border-gray-500 shadow-lg"
      >
        Applicant's application view
      </div>
      <div class="border border-gray-300">
        <h1
          class="text-gray-600 lg:text-lg text-base uppercase text-center font-medium py-2 border-b border-gray-300 bg-gray-200"
        >
          Photograph
        </h1>
        <div class="grid grid-cols-12">
          <div class="col-span-6 border-r border-gray-300">
            <h1
              class="text-gray-600 lg:text-lg text-base capitalize text-center font-medium py-2 border-b border-gray-300"
            >
              Applicant Photo
            </h1>
            <div class="my-5 flex justify-center items-center">
              <img
                src={`/termloan/api/upload/${currentApplication.personalDetails.id}/1/1`}
                alt="applicantImage"
                class="md:size-[150px] size-[120px] border border-gray-300"
              />
            </div>
          </div>
          <div class="col-span-6">
            <h1
              class="text-gray-600 lg:text-lg text-base capitalize text-center font-medium py-2 border-b border-gray-300"
            >
              Guarantor Photo
            </h1>
            <div class="my-5 flex justify-center items-center">
              <img
                src={`/termloan/api/upload/${currentApplication.personalDetails.id}/${currentApplication.personalDetails.guarantor == 1 ? "2" : "1"}/1`}
                alt="applicantImage"
                class="md:size-[150px] size-[120px] border border-gray-300"
              />
            </div>
          </div>
        </div>
      </div>
      <div class="border border-gray-300">
        <h1
          class="text-gray-600 lg:text-lg text-base uppercase text-center font-medium py-2 border-b border-gray-300 bg-gray-200"
        >
          Applicant Personal Details
        </h1>
        <div class="grid grid-cols-12 border-b border-gray-300">
          <div
            class="lg:col-span-2 md:col-span-4 col-span-5 border-r border-gray-300 py-2 xl:px-5 px-2 bg-gray-100"
          >
            <h1 class="text-left xl:text-lg lg:text-sm text-xs capitalize">
              Application ID :
            </h1>
          </div>
          <div
            class="lg:col-span-10 md:col-span-8 col-span-7 py-2 xl:px-5 px-2"
          >
            <h1 class="text-left xl:text-lg lg:text-sm text-xs uppercase">
              {currentApplication.personalDetails.form_no == null
                ? "--"
                : currentApplication.personalDetails.form_no}
            </h1>
          </div>
        </div>
        <div class="grid grid-cols-12 border-b border-gray-300">
          <div
            class="lg:col-span-2 md:col-span-4 col-span-5 border-r border-b lg:border-b-0 border-gray-300 py-2 xl:px-5 px-2"
          >
            <h1 class="text-left xl:text-lg lg:text-sm text-xs capitalize">
              Aadhar Number :
            </h1>
          </div>
          <div
            class="lg:col-span-4 md:col-span-8 col-span-7 lg:border-r border-b lg:border-b-0 border-gray-300 py-2 xl:px-5 px-2"
          >
            <h1 class="text-left xl:text-lg lg:text-sm text-xs">
              {currentApplication.personalDetails.aadhar}
            </h1>
          </div>
          <div
            class="lg:col-span-2 md:col-span-4 col-span-5 border-r border-gray-300 py-2 xl:px-5 px-2"
          >
            <h1 class="text-left xl:text-lg lg:text-sm text-xs capitalize">
              Pancard Number :
            </h1>
          </div>
          <div class="lg:col-span-4 md:col-span-8 col-span-7 py-2 xl:px-5 px-2">
            <h1 class="text-left xl:text-lg lg:text-sm text-xs">
              {currentApplication.personalDetails.pan}
            </h1>
          </div>
        </div>
        <div class="grid grid-cols-12 border-b border-gray-300">
          <div
            class="lg:col-span-2 md:col-span-4 col-span-5 border-r border-gray-300 py-2 xl:px-5 px-2"
          >
            <h1 class="text-left xl:text-lg lg:text-sm text-xs capitalize">
              Name Of Applicant :
            </h1>
          </div>
          <div
            class="lg:col-span-10 md:col-span-8 col-span-7 py-2 xl:px-5 px-2"
          >
            <h1 class="text-left xl:text-lg lg:text-sm text-xs capitalize">
              {currentApplication.personalDetails.name}
            </h1>
          </div>
        </div>
        <div class="grid grid-cols-12 border-b border-gray-300">
          <div
            class="lg:col-span-2 md:col-span-4 col-span-5 border-r border-b lg:border-b-0 border-gray-300 py-2 xl:px-5 px-2"
          >
            <h1 class="text-left xl:text-lg lg:text-sm text-xs capitalize">
              Gender :
            </h1>
          </div>
          <div
            class="lg:col-span-4 md:col-span-8 col-span-7 lg:border-r border-b lg:border-b-0 border-gray-300 py-2 xl:px-5 px-2"
          >
            <h1 class="text-left xl:text-lg lg:text-sm text-xs">
              {$masters.m_gender.find(
                (e) => e.id == currentApplication.personalDetails.gender
              )?.eng_name}
            </h1>
          </div>
          <div
            class="lg:col-span-2 md:col-span-4 col-span-5 border-r border-gray-300 py-2 xl:px-5 px-2"
          >
            <h1 class="text-left xl:text-lg lg:text-sm text-xs capitalize">
              Date Of Birth :
            </h1>
          </div>
          <div class="lg:col-span-4 md:col-span-8 col-span-7 py-2 xl:px-5 px-2">
            <h1 class="text-left xl:text-lg lg:text-sm text-xs">
              {date1}
            </h1>
          </div>
        </div>

        <div class="grid grid-cols-12 border-b border-gray-300">
          <div
            class="lg:col-span-2 md:col-span-4 col-span-5 border-r border-b lg:border-b-0 border-gray-300 py-2 xl:px-5 px-2"
          >
            <h1 class="text-left xl:text-lg lg:text-sm text-xs capitalize">
              Mobile Number :
            </h1>
          </div>
          <div
            class="lg:col-span-4 md:col-span-8 col-span-7 lg:border-r border-b lg:border-b-0 border-gray-300 py-2 xl:px-5 px-2"
          >
            <h1 class="text-left xl:text-lg lg:text-sm text-xs">
              {currentApplication.personalDetails.mobile}
            </h1>
          </div>
          <div
            class="lg:col-span-2 md:col-span-4 col-span-5 border-r border-gray-300 py-2 xl:px-5 px-2"
          >
            <h1 class="text-left xl:text-lg lg:text-sm text-xs capitalize">
              Email ID :
            </h1>
          </div>
          <div class="lg:col-span-4 md:col-span-8 col-span-7 py-2 xl:px-5 px-2">
            <h1 class="text-left xl:text-lg lg:text-sm text-xs">
              {currentApplication.personalDetails.email}
            </h1>
          </div>
        </div>
        <div class="grid grid-cols-12 border-b border-gray-300">
          <div
            class="lg:col-span-2 md:col-span-4 col-span-5 border-r border-b lg:border-b-0 border-gray-300 py-2 xl:px-5 px-2"
          >
            <h1 class="text-left xl:text-lg lg:text-sm text-xs capitalize">
              Marital Status :
            </h1>
          </div>
          <div
            class="lg:col-span-4 md:col-span-8 col-span-7 lg:border-r border-b lg:border-b-0 border-gray-300 py-2 xl:px-5 px-2"
          >
            <h1 class="text-left xl:text-lg lg:text-sm text-xs">
              {$masters.m_marital_status.find(
                (e) => e.id == currentApplication.personalDetails.marital_status
              )?.eng_name}
            </h1>
          </div>
          <div
            class="lg:col-span-2 md:col-span-4 col-span-5 border-r border-gray-300 py-2 xl:px-5 px-2"
          >
            <h1 class="text-left xl:text-lg lg:text-sm text-xs capitalize">
              Community :
            </h1>
          </div>
          <div class="lg:col-span-4 md:col-span-8 col-span-7 py-2 xl:px-5 px-2">
            <h1 class="text-left xl:text-lg lg:text-sm text-xs">
              {$masters.m_religion.find(
                (e) => e.id == currentApplication.personalDetails.religion
              )?.eng_name}
            </h1>
          </div>
        </div>
        <div class="grid grid-cols-12 border-b border-gray-300">
          <div
            class="lg:col-span-2 md:col-span-4 col-span-5 border-r border-b lg:border-b-0 border-gray-300 py-2 xl:px-5 px-2"
          >
            <h1 class="text-left xl:text-lg lg:text-sm text-xs capitalize">
              Educational Qualifications :
            </h1>
          </div>
          <div
            class="lg:col-span-4 md:col-span-8 col-span-7 lg:border-r border-b lg:border-b-0 border-gray-300 py-2 xl:px-5 px-2"
          >
            <h1 class="text-left xl:text-lg lg:text-sm text-xs">
              {$masters.m_educational_qualification.find(
                (e) =>
                  e.id ==
                  currentApplication.personalDetails.education_qualification
              )?.eng_name}
            </h1>
          </div>
          <div
            class="lg:col-span-2 md:col-span-4 col-span-5 border-r border-gray-300 py-2 xl:px-5 px-2"
          >
            <h1 class="text-left xl:text-lg lg:text-sm text-xs capitalize">
              Qualification Details :
            </h1>
          </div>
          <div class="lg:col-span-4 md:col-span-8 col-span-7 py-2 xl:px-5 px-2">
            <h1 class="text-left xl:text-lg lg:text-sm text-xs">
              {currentApplication.personalDetails.education_qualification > 4
                ? currentApplication.personalDetails.details
                : "NA"}
            </h1>
          </div>
        </div>
        <div class="grid grid-cols-12 border-b border-gray-300">
          <div
            class="lg:col-span-2 md:col-span-4 col-span-5 border-r border-gray-300 py-2 xl:px-5 px-2"
          >
            <h1 class="text-left xl:text-lg lg:text-sm text-xs capitalize">
              current address :
            </h1>
          </div>
          <div
            class="lg:col-span-10 md:col-span-8 col-span-7 py-2 xl:px-5 px-2"
          >
            <h1 class="text-left xl:text-lg lg:text-sm text-xs capitalize">
              {currentApplication.personalDetails.current_address}
              <span class="font-medium pl-1"> District : </span><span>
                {$masters.m_district.find(
                  (e) =>
                    e.dist_id ==
                    currentApplication.personalDetails.current_district
                )?.eng_name}
              </span>
              <span class="font-medium pl-1"> taluka : </span><span>
                {$masters.m_taluka.find(
                  (e) =>
                    e.taluka_id ==
                    currentApplication.personalDetails.current_taluka
                )?.eng_name}
              </span>
              <span class="font-medium pl-1"> place : </span><span>
                {currentApplication.personalDetails.current_place}
              </span>
              <span class="font-medium pl-1"> pincode : </span><span>
                {currentApplication.personalDetails.current_pincode}
              </span>
            </h1>
          </div>
        </div>
        <div class="grid grid-cols-12 border-b border-gray-300">
          <div
            class="lg:col-span-2 md:col-span-4 col-span-5 border-r border-gray-300 py-2 xl:px-5 px-2"
          >
            <h1 class="text-left xl:text-lg lg:text-sm text-xs capitalize">
              Permanent address :
            </h1>
          </div>
          <div
            class="lg:col-span-10 md:col-span-8 col-span-7 py-2 xl:px-5 px-2"
          >
            <h1 class="text-left xl:text-lg lg:text-sm text-xs capitalize">
              {currentApplication.personalDetails.permanent_address}
              <span class="font-medium pl-1"> District : </span><span>
                {$masters.m_district.find(
                  (e) =>
                    e.dist_id ==
                    currentApplication.personalDetails.permanent_district
                )?.eng_name}
              </span>
              <span class="font-medium pl-1"> taluka : </span><span>
                {$masters.m_taluka.find(
                  (e) =>
                    e.taluka_id ==
                    currentApplication.personalDetails.permanent_taluka
                )?.eng_name}
              </span>
              <span class="font-medium pl-1"> place : </span><span>
                {currentApplication.personalDetails.permanent_place}
              </span>
              <span class="font-medium pl-1"> pincode : </span><span>
                {currentApplication.personalDetails.permanent_pincode}
              </span>
            </h1>
          </div>
        </div>
        <div class="grid grid-cols-12 border-b border-gray-300">
          <div
            class="lg:col-span-2 md:col-span-4 col-span-5 border-r border-b lg:border-b-0 border-gray-300 py-2 xl:px-5 px-2"
          >
            <h1 class="text-left xl:text-lg lg:text-sm text-xs capitalize">
              Guardian:
            </h1>
          </div>
          <div
            class="lg:col-span-4 md:col-span-8 col-span-7 lg:border-r border-b lg:border-b-0 border-gray-300 py-2 xl:px-5 px-2"
          >
            <h1 class="text-left xl:text-lg lg:text-sm text-xs">{guardian}</h1>
          </div>
          <div
            class="lg:col-span-2 md:col-span-4 col-span-5 border-r border-gray-300 py-2 xl:px-5 px-2"
          >
            <h1 class="text-left xl:text-lg lg:text-sm text-xs capitalize">
              Select Occupation :
            </h1>
          </div>
          <div class="lg:col-span-4 md:col-span-8 col-span-7 py-2 xl:px-5 px-2">
            <h1 class="text-left xl:text-lg lg:text-sm text-xs">
              {occupation}
            </h1>
          </div>
        </div>

        <div class="grid grid-cols-12 border-b border-gray-300">
          <div
            class="lg:col-span-6 md:col-span-4 col-span-5 border-r border-gray-300 py-2 xl:px-5 px-2"
          >
            <h1 class="text-left xl:text-lg lg:text-sm text-xs capitalize">
              Has the applicant or guarantor previously provided surety for
              anyone else? <div
                class="xl:text-sm md:text-[10px] text-[8px] font-robotoMono"
              >
                (If yes, please provide details)
              </div>
            </h1>
          </div>
          <div class="lg:col-span-6 md:col-span-8 col-span-7 py-2 xl:px-5 px-2">
            <h1 class="text-left xl:text-lg lg:text-sm text-xs">
              <span class="font-semibold">{past_surety_commitment}</span>
              <!-- <span class="pl-1">
                the applicant provided surety for a 1,00,000 rs. personal loan
                taken by Amir Khan from ABC Bank in January 2022, and the loan
                is currently active with regular payments.
              </span> -->
            </h1>
          </div>
        </div>
        <!-- <div class="grid grid-cols-12">
          <div
            class="lg:col-span-6 md:col-span-4 col-span-5 border-r border-gray-300 py-2 xl:px-5 px-2"
          >
            <h1 class="text-left xl:text-lg lg:text-sm text-xs capitalize">
              Is The Applicant A Riot Victim/Natural Calamity Victim/Disabled
              Person?
            </h1>
          </div>
          <div class="lg:col-span-6 md:col-span-8 col-span-7 py-2 xl:px-5 px-2">
            <h1 class="text-left xl:text-lg lg:text-sm text-xs capitalize">
              Riot Victim, Disabled Person
            </h1>
          </div>
        </div> -->
      </div>
      <div class="border border-gray-300">
        <h1
          class="text-gray-600 lg:text-lg text-base uppercase text-center font-medium py-2 border-b border-gray-300 bg-gray-200"
        >
          Business Details
        </h1>
        <div class="grid grid-cols-12 border-b border-gray-300">
          <div
            class="lg:col-span-2 md:col-span-4 col-span-5 border-r border-b lg:border-b-0 border-gray-300 py-2 xl:px-5 px-2"
          >
            <h1 class="text-left xl:text-lg lg:text-sm text-xs capitalize">
              Applicant Business Name :
            </h1>
          </div>
          <div
            class="lg:col-span-4 md:col-span-8 col-span-7 lg:border-r border-b lg:border-b-0 border-gray-300 py-2 xl:px-5 px-2"
          >
            <h1 class="text-left xl:text-lg lg:text-sm text-xs">
              {currentApplication.businessDetails.business_name}
            </h1>
          </div>
          <div
            class="lg:col-span-2 md:col-span-4 col-span-5 border-r border-gray-300 py-2 xl:px-5 px-2"
          >
            <h1 class="text-left xl:text-lg lg:text-sm text-xs capitalize">
              Applicant Business Details :
            </h1>
          </div>
          <div class="lg:col-span-4 md:col-span-8 col-span-7 py-2 xl:px-5 px-2">
            <h1 class="text-left xl:text-lg lg:text-sm text-xs">
              {currentApplication.businessDetails.business_details}
            </h1>
          </div>
        </div>
        <div class="grid grid-cols-12 border-b border-gray-300">
          <div
            class="lg:col-span-2 md:col-span-4 col-span-5 border-r border-gray-300 py-2 xl:px-5 px-2"
          >
            <h1 class="text-left xl:text-lg lg:text-sm text-xs capitalize">
              current address :
            </h1>
          </div>
          <div
            class="lg:col-span-10 md:col-span-8 col-span-7 py-2 xl:px-5 px-2"
          >
            <h1 class="text-left xl:text-lg lg:text-sm text-xs capitalize">
              {currentApplication.businessDetails.business_address}
              <span class="font-medium pl-1"> District : </span><span>
                {$masters.m_district.find(
                  (e) =>
                    e.dist_id ==
                    currentApplication.businessDetails.business_district
                )?.eng_name}
              </span>
              <span class="font-medium pl-1"> taluka : </span><span>
                {$masters.m_taluka.find(
                  (e) =>
                    e.taluka_id ==
                    currentApplication.businessDetails.business_taluka
                )?.eng_name}
              </span>
              <span class="font-medium pl-1"> place : </span><span>
                {currentApplication.businessDetails.business_place}
              </span>
              <span class="font-medium pl-1"> pincode : </span><span>
                {currentApplication.businessDetails.business_pincode}
              </span>
            </h1>
          </div>
        </div>
        <div class="grid grid-cols-12 border-b border-gray-300">
          <div
            class="lg:col-span-2 md:col-span-4 col-span-5 border-r border-b lg:border-b-0 border-gray-300 py-2 xl:px-5 px-2"
          >
            <h1 class="text-left xl:text-lg lg:text-sm text-xs capitalize">
              Quotation Name :
            </h1>
          </div>
          <div
            class="lg:col-span-4 md:col-span-8 col-span-7 lg:border-r border-b lg:border-b-0 border-gray-300 py-2 xl:px-5 px-2"
          >
            <h1 class="text-left xl:text-lg lg:text-sm text-xs">
              {currentApplication.businessDetails.quotation_name}
            </h1>
          </div>
          <div
            class="lg:col-span-2 md:col-span-4 col-span-5 border-r border-gray-300 py-2 xl:px-5 px-2"
          >
            <h1 class="text-left xl:text-lg lg:text-sm text-xs capitalize">
              Quotation GST Number :
            </h1>
          </div>
          <div class="lg:col-span-4 md:col-span-8 col-span-7 py-2 xl:px-5 px-2">
            <h1 class="text-left xl:text-lg lg:text-sm text-xs">
              {currentApplication.businessDetails.quotation_gst_number
                ? currentApplication.businessDetails.quotation_gst_number
                : "NA"}
            </h1>
          </div>
        </div>
        <div class="grid grid-cols-12 border-b border-gray-300">
          <div
            class="lg:col-span-2 md:col-span-4 col-span-5 border-r border-b lg:border-b-0 border-gray-300 py-2 xl:px-5 px-2"
          >
            <h1 class="text-left xl:text-lg lg:text-sm text-xs capitalize">
              Quotation Amount :
            </h1>
          </div>
          <div
            class="lg:col-span-4 md:col-span-8 col-span-7 lg:border-r border-b lg:border-b-0 border-gray-300 py-2 xl:px-5 px-2"
          >
            <h1 class="text-left xl:text-lg lg:text-sm text-xs">
              {currentApplication.businessDetails.quotation_amount}
            </h1>
          </div>
          <div
            class="lg:col-span-2 md:col-span-4 col-span-5 border-r border-gray-300 py-2 xl:px-5 px-2"
          >
            <h1 class="text-left xl:text-lg lg:text-sm text-xs capitalize">
              Loan Amount:
            </h1>
          </div>
          <div class="lg:col-span-4 md:col-span-8 col-span-7 py-2 xl:px-5 px-2">
            <h1 class="text-left xl:text-lg lg:text-sm text-xs">
              {currentApplication.businessDetails.loan_amount}
            </h1>
          </div>
        </div>
      </div>
      <div class="border border-gray-300">
        <h1
          class="text-gray-600 lg:text-lg text-base uppercase text-center font-medium py-2 border-b border-gray-300 bg-gray-200"
        >
          Bank Details
        </h1>

        <div class="grid grid-cols-12 border-b border-gray-300">
          <div
            class="lg:col-span-2 md:col-span-4 col-span-5 border-r border-b lg:border-b-0 border-gray-300 py-2 xl:px-5 px-2"
          >
            <h1 class="text-left xl:text-lg lg:text-sm text-xs capitalize">
              Nationalized Bank Name :
            </h1>
          </div>
          <div
            class="lg:col-span-4 md:col-span-8 col-span-7 lg:border-r border-b lg:border-b-0 border-gray-300 py-2 xl:px-5 px-2"
          >
            <h1 class="text-left xl:text-lg lg:text-sm text-xs">
              {currentApplication.businessDetails.bank_name}
            </h1>
          </div>
          <div
            class="lg:col-span-2 md:col-span-4 col-span-5 border-r border-gray-300 py-2 xl:px-5 px-2"
          >
            <h1 class="text-left xl:text-lg lg:text-sm text-xs capitalize">
              IFSC Code :
            </h1>
          </div>
          <div class="lg:col-span-4 md:col-span-8 col-span-7 py-2 xl:px-5 px-2">
            <h1 class="text-left xl:text-lg lg:text-sm text-xs">
              {currentApplication.businessDetails.ifsc_code}
            </h1>
          </div>
        </div>
        <div class="grid grid-cols-12 border-b border-gray-300">
          <div
            class="lg:col-span-2 md:col-span-4 col-span-5 border-r border-b lg:border-b-0 border-gray-300 py-2 xl:px-5 px-2"
          >
            <h1 class="text-left xl:text-lg lg:text-sm text-xs capitalize">
              Branch Name :
            </h1>
          </div>
          <div
            class="lg:col-span-4 md:col-span-8 col-span-7 lg:border-r border-b lg:border-b-0 border-gray-300 py-2 xl:px-5 px-2"
          >
            <h1 class="text-left xl:text-lg lg:text-sm text-xs">
              {currentApplication.businessDetails.branch_name}
            </h1>
          </div>
          <div
            class="lg:col-span-2 md:col-span-4 col-span-5 border-r border-gray-300 py-2 xl:px-5 px-2"
          >
            <h1 class="text-left xl:text-lg lg:text-sm text-xs capitalize">
              Account Number :
            </h1>
          </div>
          <div class="lg:col-span-4 md:col-span-8 col-span-7 py-2 xl:px-5 px-2">
            <h1 class="text-left xl:text-lg lg:text-sm text-xs">
              {currentApplication.businessDetails.account_number}
            </h1>
          </div>
        </div>
        <div class="grid grid-cols-12">
          <div
            class="lg:col-span-2 md:col-span-4 col-span-5 border-r border-gray-300 py-2 xl:px-5 px-2"
          >
            <h1 class="text-left xl:text-lg lg:text-sm text-xs capitalize">
              Bank Address :
            </h1>
          </div>
          <div
            class="lg:col-span-10 md:col-span-8 col-span-7 py-2 xl:px-5 px-2"
          >
            <!-- <h1 class="text-left xl:text-lg lg:text-sm text-xs capitalize">
              Hinjawadi Rajiv Gandhi Infotech Park, Hinjawadi,
              <span class="font-medium pl-1"> District : </span><span>
                pune,
              </span>
              <span class="font-medium pl-1"> taluka : </span><span>
                haveli,
              </span>
              <span class="font-medium pl-1"> place : </span><span>
                pune,
              </span>
              <span class="font-medium pl-1"> pincode : </span><span>
                411057.
              </span>
            </h1> -->
            {currentApplication.businessDetails.bank_address}
          </div>
        </div>
      </div>
      <div class="border border-gray-300">
        <h1
          class="text-gray-600 lg:text-lg text-base uppercase text-center font-medium py-2 border-b border-gray-300 bg-gray-200"
        >
          Guarantor Personal Details
        </h1>
        <div class="grid grid-cols-12 border-b border-gray-300">
          <div
            class="lg:col-span-2 md:col-span-4 col-span-5 border-r border-b lg:border-b-0 border-gray-300 py-2 xl:px-5 px-2"
          >
            <h1 class="text-left xl:text-lg lg:text-sm text-xs capitalize">
              Aadhar Number :
            </h1>
          </div>
          <div
            class="lg:col-span-4 md:col-span-8 col-span-7 lg:border-r border-b lg:border-b-0 border-gray-300 py-2 xl:px-5 px-2"
          >
            <h1 class="text-left xl:text-lg lg:text-sm text-xs">
              {guarantorPersonalDetails.aadhar}
            </h1>
          </div>
          <div
            class="lg:col-span-2 md:col-span-4 col-span-5 border-r border-gray-300 py-2 xl:px-5 px-2"
          >
            <h1 class="text-left xl:text-lg lg:text-sm text-xs capitalize">
              Pancard Number :
            </h1>
          </div>
          <div class="lg:col-span-4 md:col-span-8 col-span-7 py-2 xl:px-5 px-2">
            <h1 class="text-left xl:text-lg lg:text-sm text-xs">
              {guarantorPersonalDetails.pan}
            </h1>
          </div>
        </div>
        <div class="grid grid-cols-12 border-b border-gray-300">
          <div
            class="lg:col-span-2 md:col-span-4 col-span-5 border-r border-gray-300 py-2 xl:px-5 px-2"
          >
            <h1 class="text-left xl:text-lg lg:text-sm text-xs capitalize">
              Name Of Guarantor :
            </h1>
          </div>
          <div
            class="lg:col-span-10 md:col-span-8 col-span-7 py-2 xl:px-5 px-2"
          >
            <h1 class="text-left xl:text-lg lg:text-sm text-xs capitalize">
              {guarantorPersonalDetails.name}
            </h1>
          </div>
        </div>
        <div class="grid grid-cols-12 border-b border-gray-300">
          <div
            class="lg:col-span-2 md:col-span-4 col-span-5 border-r border-b lg:border-b-0 border-gray-300 py-2 xl:px-5 px-2"
          >
            <h1 class="text-left xl:text-lg lg:text-sm text-xs capitalize">
              Gender :
            </h1>
          </div>
          <div
            class="lg:col-span-4 md:col-span-8 col-span-7 lg:border-r border-b lg:border-b-0 border-gray-300 py-2 xl:px-5 px-2"
          >
            <h1 class="text-left xl:text-lg lg:text-sm text-xs">
              {$masters.m_gender.find(
                (e) => e.id == guarantorPersonalDetails.gender
              )?.eng_name}
            </h1>
          </div>
          <div
            class="lg:col-span-2 md:col-span-4 col-span-5 border-r border-gray-300 py-2 xl:px-5 px-2"
          >
            <h1 class="text-left xl:text-lg lg:text-sm text-xs capitalize">
              Date Of Birth :
            </h1>
          </div>
          <div class="lg:col-span-4 md:col-span-8 col-span-7 py-2 xl:px-5 px-2">
            <h1 class="text-left xl:text-lg lg:text-sm text-xs">
              {dob_guarantor}
            </h1>
          </div>
        </div>

        <div class="grid grid-cols-12 border-b border-gray-300">
          <div
            class="lg:col-span-2 md:col-span-4 col-span-5 border-r border-b lg:border-b-0 border-gray-300 py-2 xl:px-5 px-2"
          >
            <h1 class="text-left xl:text-lg lg:text-sm text-xs capitalize">
              Mobile Number :
            </h1>
          </div>
          <div
            class="lg:col-span-4 md:col-span-8 col-span-7 lg:border-r border-b lg:border-b-0 border-gray-300 py-2 xl:px-5 px-2"
          >
            <h1 class="text-left xl:text-lg lg:text-sm text-xs">
              {guarantorPersonalDetails.mobile}
            </h1>
          </div>
          <div
            class="lg:col-span-2 md:col-span-4 col-span-5 border-r border-gray-300 py-2 xl:px-5 px-2"
          >
            <h1 class="text-left xl:text-lg lg:text-sm text-xs capitalize">
              Email ID :
            </h1>
          </div>
          <div class="lg:col-span-4 md:col-span-8 col-span-7 py-2 xl:px-5 px-2">
            <h1 class="text-left xl:text-lg lg:text-sm text-xs">
              {guarantorPersonalDetails.email}
            </h1>
          </div>
        </div>
        <div class="grid grid-cols-12 border-b border-gray-300">
          <div
            class="lg:col-span-2 md:col-span-4 col-span-5 border-r border-b lg:border-b-0 border-gray-300 py-2 xl:px-5 px-2"
          >
            <h1 class="text-left xl:text-lg lg:text-sm text-xs capitalize">
              Marital Status :
            </h1>
          </div>
          <div
            class="lg:col-span-4 md:col-span-8 col-span-7 lg:border-r border-b lg:border-b-0 border-gray-300 py-2 xl:px-5 px-2"
          >
            <h1 class="text-left xl:text-lg lg:text-sm text-xs">
              {$masters.m_marital_status.find(
                (e) => e.id == guarantorPersonalDetails.marital_status
              )?.eng_name}
            </h1>
          </div>
          <div
            class="lg:col-span-2 md:col-span-4 col-span-5 border-r border-gray-300 py-2 xl:px-5 px-2"
          >
            <h1 class="text-left xl:text-lg lg:text-sm text-xs capitalize">
              Community :
            </h1>
          </div>
          <div class="lg:col-span-4 md:col-span-8 col-span-7 py-2 xl:px-5 px-2">
            <h1 class="text-left xl:text-lg lg:text-sm text-xs">
              {$masters.m_religion.find(
                (e) => e.id == guarantorPersonalDetails.religion
              )?.eng_name}
            </h1>
          </div>
        </div>
        <div class="grid grid-cols-12 border-b border-gray-300">
          <div
            class="lg:col-span-2 md:col-span-4 col-span-5 border-r border-b lg:border-b-0 border-gray-300 py-2 xl:px-5 px-2"
          >
            <h1 class="text-left xl:text-lg lg:text-sm text-xs capitalize">
              Educational Qualifications :
            </h1>
          </div>
          <div
            class="lg:col-span-4 md:col-span-8 col-span-7 lg:border-r border-b lg:border-b-0 border-gray-300 py-2 xl:px-5 px-2"
          >
            <h1 class="text-left xl:text-lg lg:text-sm text-xs">
              <h1 class="text-left xl:text-lg lg:text-sm text-xs">
                {$masters.m_educational_qualification.find(
                  (e) =>
                    e.id == guarantorPersonalDetails.education_qualification
                )?.eng_name}
              </h1>
            </h1>
          </div>
          <div
            class="lg:col-span-2 md:col-span-4 col-span-5 border-r border-gray-300 py-2 xl:px-5 px-2"
          >
            <h1 class="text-left xl:text-lg lg:text-sm text-xs capitalize">
              Qualification Details :
            </h1>
          </div>
          <div class="lg:col-span-4 md:col-span-8 col-span-7 py-2 xl:px-5 px-2">
            <h1 class="text-left xl:text-lg lg:text-sm text-xs">
              {guarantorPersonalDetails.education_qualification > 4
                ? guarantorPersonalDetails.details
                : "NA"}
            </h1>
          </div>
        </div>
        <div class="grid grid-cols-12 border-b border-gray-300">
          <div
            class="lg:col-span-2 md:col-span-4 col-span-5 border-r border-gray-300 py-2 xl:px-5 px-2"
          >
            <h1 class="text-left xl:text-lg lg:text-sm text-xs capitalize">
              current address :
            </h1>
          </div>
          <div
            class="lg:col-span-10 md:col-span-8 col-span-7 py-2 xl:px-5 px-2"
          >
            <h1 class="text-left xl:text-lg lg:text-sm text-xs capitalize">
              {guarantorPersonalDetails.current_address}
              <span class="font-medium pl-1"> District : </span><span>
                {$masters.m_district.find(
                  (e) => e.dist_id == guarantorPersonalDetails.current_district
                )?.eng_name}
              </span>
              <span class="font-medium pl-1"> taluka : </span><span>
                {$masters.m_taluka.find(
                  (e) => e.taluka_id == guarantorPersonalDetails.current_taluka
                )?.eng_name}
              </span>
              <span class="font-medium pl-1"> place : </span><span>
                {guarantorPersonalDetails.current_place}
              </span>
              <span class="font-medium pl-1"> pincode : </span><span>
                {guarantorPersonalDetails.current_pincode}
              </span>
            </h1>
          </div>
        </div>
        <div class="grid grid-cols-12 border-b border-gray-300">
          <div
            class="lg:col-span-2 md:col-span-4 col-span-5 border-r border-gray-300 py-2 xl:px-5 px-2"
          >
            <h1 class="text-left xl:text-lg lg:text-sm text-xs capitalize">
              Permanent address :
            </h1>
          </div>
          <div
            class="lg:col-span-10 md:col-span-8 col-span-7 py-2 xl:px-5 px-2"
          >
            <h1 class="text-left xl:text-lg lg:text-sm text-xs capitalize">
              {guarantorPersonalDetails.permanent_address}
              <span class="font-medium pl-1"> District : </span><span>
                {$masters.m_district.find(
                  (e) =>
                    e.dist_id == guarantorPersonalDetails.permanent_district
                )?.eng_name}
              </span>
              <span class="font-medium pl-1"> taluka : </span><span>
                {$masters.m_taluka.find(
                  (e) =>
                    e.taluka_id == guarantorPersonalDetails.permanent_taluka
                )?.eng_name}
              </span>
              <span class="font-medium pl-1"> place : </span><span>
                {guarantorPersonalDetails.permanent_place}
              </span>
              <span class="font-medium pl-1"> pincode : </span><span>
                {guarantorPersonalDetails.permanent_pincode}
              </span>
            </h1>
          </div>
        </div>
        <div class="grid grid-cols-12 border-b border-gray-300">
          <div
            class="lg:col-span-2 md:col-span-4 col-span-5 border-r border-b lg:border-b-0 border-gray-300 py-2 xl:px-5 px-2"
          >
            <h1 class="text-left xl:text-lg lg:text-sm text-xs capitalize">
              Guardian:
            </h1>
          </div>
          <div
            class="lg:col-span-4 md:col-span-8 col-span-7 lg:border-r border-b lg:border-b-0 border-gray-300 py-2 xl:px-5 px-2"
          >
            <h1 class="text-left xl:text-lg lg:text-sm text-xs">--</h1>
          </div>
          <div
            class="lg:col-span-2 md:col-span-4 col-span-5 border-r border-gray-300 py-2 xl:px-5 px-2"
          >
            <h1 class="text-left xl:text-lg lg:text-sm text-xs capitalize">
              Select Occupation :
            </h1>
          </div>
          <div class="lg:col-span-4 md:col-span-8 col-span-7 py-2 xl:px-5 px-2">
            <h1 class="text-left xl:text-lg lg:text-sm text-xs">
              {occupationGuarantor}
            </h1>
          </div>
        </div>

        <div class="grid grid-cols-12 border-b border-gray-300">
          <div
            class="lg:col-span-6 md:col-span-4 col-span-5 border-r border-gray-300 py-2 xl:px-5 px-2"
          >
            <h1 class="text-left xl:text-lg lg:text-sm text-xs capitalize">
              Has the guarantor previously provided surety for anyone else? <div
                class="xl:text-sm md:text-[10px] text-[8px] font-robotoMono"
              >
                (If yes, please provide details)
              </div>
            </h1>
          </div>
          <div class="lg:col-span-6 md:col-span-8 col-span-7 py-2 xl:px-5 px-2">
            <h1 class="text-left xl:text-lg lg:text-sm text-xs">
              <span class="font-semibold"
                >{guarantorPersonalDetails.past_surety_commitment == 1
                  ? "Yes"
                  : "No"}</span
              >
            </h1>
          </div>
        </div>
      </div>

      <div class="border border-gray-300">
        <h1
          class="text-gray-600 lg:text-lg text-base uppercase text-center font-medium py-2 border-b border-gray-300 bg-gray-200"
        >
          Collateral Summary
        </h1>
        {#each currentApplication.properties as property, i}
          <div>
            <h1
              class="text-gray-600 lg:text-lg text-base capitalize text-center font-medium py-2 border-b border-gray-300"
            >
              Property Description
            </h1>
            <div>
              <h1
                class="text-gray-600 lg:text-lg md:text-base text-sm capitalize text-left font-medium py-2 border-b border-gray-300 px-5"
              >
                Property {i + 1} :
              </h1>
              <div class="grid grid-cols-12 border-b border-gray-300">
                <div
                  class="lg:col-span-2 md:col-span-4 col-span-5 border-r border-b lg:border-b-0 border-gray-300 py-2 xl:px-5 px-2"
                >
                  <h1
                    class="text-left xl:text-lg lg:text-sm text-xs capitalize"
                  >
                    Property Type :
                  </h1>
                </div>
                <div
                  class="lg:col-span-4 md:col-span-8 col-span-7 lg:border-r border-b lg:border-b-0 border-gray-300 py-2 xl:px-5 px-2"
                >
                  <h1
                    class="text-left xl:text-lg lg:text-sm text-xs capitalize"
                  >
                    {$masters.m_property_type.find(
                      (e) => e.id == property.property_type
                    ).eng_name}
                  </h1>
                </div>
                <div
                  class="lg:col-span-2 md:col-span-4 col-span-5 border-r border-gray-300 py-2 xl:px-5 px-2"
                >
                  <h1
                    class="text-left xl:text-lg lg:text-sm text-xs capitalize"
                  >
                    Ownership Status :
                  </h1>
                </div>
                <div
                  class="lg:col-span-4 md:col-span-8 col-span-7 py-2 xl:px-5 px-2"
                >
                  <h1
                    class="text-left xl:text-lg lg:text-sm text-xs capitalize"
                  >
                    Owned
                  </h1>
                </div>
              </div>
              <div class="grid grid-cols-12 border-b border-gray-300">
                <div
                  class="lg:col-span-2 md:col-span-4 col-span-5 border-r border-gray-300 py-2 xl:px-5 px-2"
                >
                  <h1
                    class="text-left xl:text-lg lg:text-sm text-xs capitalize"
                  >
                    Property address :
                  </h1>
                </div>
                <div
                  class="lg:col-span-10 md:col-span-8 col-span-7 py-2 xl:px-5 px-2"
                >
                  <h1
                    class="text-left xl:text-lg lg:text-sm text-xs capitalize"
                  >
                    {property.street_address}
                    <span class="font-medium pl-1"> District : </span><span>
                      {district_name(property.dist_id)}
                    </span>
                    <span class="font-medium pl-1"> taluka : </span><span>
                      {taluka_name(property.taluka_id)}
                    </span>
                    <span class="font-medium pl-1"> place : </span><span>
                      {property.place}
                    </span>
                    <span class="font-medium pl-1"> pincode : </span><span>
                      {property.pincode}
                    </span>
                  </h1>
                </div>
              </div>
              <div class="grid grid-cols-12 border-b border-gray-300">
                <div
                  class="lg:col-span-2 md:col-span-4 col-span-5 border-r border-b lg:border-b-0 border-gray-300 py-2 xl:px-5 px-2"
                >
                  <h1
                    class="text-left xl:text-lg lg:text-sm text-xs capitalize"
                  >
                    Property Value :
                  </h1>
                </div>
                <div
                  class="lg:col-span-4 md:col-span-8 col-span-7 lg:border-r border-b lg:border-b-0 border-gray-300 py-2 xl:px-5 px-2"
                >
                  <h1
                    class="text-left xl:text-lg lg:text-sm text-xs capitalize"
                  >
                    {property.property_value}
                  </h1>
                </div>
                <div
                  class="lg:col-span-2 md:col-span-4 col-span-5 border-r border-gray-300 py-2 xl:px-5 px-2"
                >
                  <h1
                    class="text-left xl:text-lg lg:text-sm text-xs capitalize"
                  >
                    Area :
                  </h1>
                </div>
                <div
                  class="lg:col-span-4 md:col-span-8 col-span-7 py-2 xl:px-5 px-2"
                >
                  <h1
                    class="text-left xl:text-lg lg:text-sm text-xs capitalize"
                  >
                    {JSON.parse(property.description).area} sqft
                  </h1>
                </div>
              </div>
            </div>
          </div>
        {/each}

        <div>
          <h1
            class="text-gray-600 lg:text-lg text-base capitalize text-center font-medium py-2 border-b border-gray-300"
          >
            LIC Information
          </h1>
          {#each currentApplication.licPolicies as lic, i}
            <div>
              <h1
                class="text-gray-600 lg:text-lg md:text-base text-sm capitalize text-left font-medium py-2 border-b border-gray-300 px-5"
              >
                LIC {i + 1} :
              </h1>
              <div class="grid grid-cols-12 border-b border-gray-300">
                <div
                  class="lg:col-span-2 md:col-span-4 col-span-5 border-r border-b lg:border-b-0 border-gray-300 py-2 xl:px-5 px-2"
                >
                  <h1
                    class="text-left xl:text-lg lg:text-sm text-xs capitalize"
                  >
                    LIC Policy Number :
                  </h1>
                </div>
                <div
                  class="lg:col-span-4 md:col-span-8 col-span-7 lg:border-r border-b lg:border-b-0 border-gray-300 py-2 xl:px-5 px-2"
                >
                  <h1 class="text-left xl:text-lg lg:text-sm text-xs">
                    {lic.policy_receipt_no}
                  </h1>
                </div>
                <div
                  class="lg:col-span-2 md:col-span-4 col-span-5 border-r border-gray-300 py-2 xl:px-5 px-2"
                >
                  <h1
                    class="text-left xl:text-lg lg:text-sm text-xs capitalize"
                  >
                    Policy Type :
                  </h1>
                </div>
                <div
                  class="lg:col-span-4 md:col-span-8 col-span-7 py-2 xl:px-5 px-2"
                >
                  <h1 class="text-left xl:text-lg lg:text-sm text-xs">
                    {lic.policy_type}
                  </h1>
                </div>
              </div>
              <div class="grid grid-cols-12 border-b border-gray-300">
                <div
                  class="lg:col-span-2 md:col-span-4 col-span-5 border-r border-b lg:border-b-0 border-gray-300 py-2 xl:px-5 px-2"
                >
                  <h1
                    class="text-left xl:text-lg lg:text-sm text-xs capitalize"
                  >
                    Surrender Value:
                  </h1>
                </div>
                <div
                  class="lg:col-span-4 md:col-span-8 col-span-7 lg:border-r border-b lg:border-b-0 border-gray-300 py-2 xl:px-5 px-2"
                >
                  <h1 class="text-left xl:text-lg lg:text-sm text-xs">
                    {lic.surrender_value}
                  </h1>
                </div>
                <div
                  class="lg:col-span-2 md:col-span-4 col-span-5 border-r border-gray-300 py-2 xl:px-5 px-2"
                >
                  <h1
                    class="text-left xl:text-lg lg:text-sm text-xs capitalize"
                  >
                    Start Date:
                  </h1>
                </div>
                <div
                  class="lg:col-span-4 md:col-span-8 col-span-7 py-2 xl:px-5 px-2"
                >
                  <h1 class="text-left xl:text-lg lg:text-sm text-xs">
                    {date_formatted(lic.start_date)}
                  </h1>
                </div>
              </div>

              <div class="grid grid-cols-12 border-b border-gray-300">
                <div
                  class="lg:col-span-2 md:col-span-4 col-span-5 border-r border-b lg:border-b-0 border-gray-300 py-2 xl:px-5 px-2"
                >
                  <h1
                    class="text-left xl:text-lg lg:text-sm text-xs capitalize"
                  >
                    Maturity Date:
                  </h1>
                </div>
                <div
                  class="lg:col-span-4 md:col-span-8 col-span-7 lg:border-r border-b lg:border-b-0 border-gray-300 py-2 xl:px-5 px-2"
                >
                  <h1 class="text-left xl:text-lg lg:text-sm text-xs">
                    {date_formatted(lic.maturity_date)}
                  </h1>
                </div>
                <div
                  class="lg:col-span-2 md:col-span-4 col-span-5 border-r border-gray-300 py-2 xl:px-5 px-2"
                >
                  <h1
                    class="text-left xl:text-lg lg:text-sm text-xs capitalize"
                  >
                    --
                  </h1>
                </div>
                <div
                  class="lg:col-span-4 md:col-span-8 col-span-7 py-2 xl:px-5 px-2"
                >
                  <h1 class="text-left xl:text-lg lg:text-sm text-xs">--</h1>
                </div>
              </div>
            </div>
          {/each}
        </div>
        <div>
          <h1
            class="text-gray-600 lg:text-lg text-base capitalize text-center font-medium py-2 border-b border-gray-300"
          >
            FD Information
          </h1>
          {#each currentApplication.fds as fd, i}
            <div>
              <h1
                class="text-gray-600 lg:text-lg md:text-base text-sm capitalize text-left font-medium py-2 border-b border-gray-300 px-5"
              >
                FD {i + 1} :
              </h1>
              <div class="grid grid-cols-12 border-b border-gray-300">
                <div
                  class="lg:col-span-2 md:col-span-4 col-span-5 border-r border-b lg:border-b-0 border-gray-300 py-2 xl:px-5 px-2"
                >
                  <h1
                    class="text-left xl:text-lg lg:text-sm text-xs capitalize"
                  >
                    FD Account Number :
                  </h1>
                </div>
                <div
                  class="lg:col-span-4 md:col-span-8 col-span-7 lg:border-r border-b lg:border-b-0 border-gray-300 py-2 xl:px-5 px-2"
                >
                  <h1 class="text-left xl:text-lg lg:text-sm text-xs">
                    {fd.fd_acc_no}
                  </h1>
                </div>
                <div
                  class="lg:col-span-2 md:col-span-4 col-span-5 border-r border-gray-300 py-2 xl:px-5 px-2"
                >
                  <h1
                    class="text-left xl:text-lg lg:text-sm text-xs capitalize"
                  >
                    Bank Name :
                  </h1>
                </div>
                <div
                  class="lg:col-span-4 md:col-span-8 col-span-7 py-2 xl:px-5 px-2"
                >
                  <h1 class="text-left xl:text-lg lg:text-sm text-xs">
                    {fd.bank_name}
                  </h1>
                </div>
              </div>
              <div class="grid grid-cols-12 border-b border-gray-300">
                <div
                  class="lg:col-span-2 md:col-span-4 col-span-5 border-r border-b lg:border-b-0 border-gray-300 py-2 xl:px-5 px-2"
                >
                  <h1
                    class="text-left xl:text-lg lg:text-sm text-xs capitalize"
                  >
                    FD Amount :
                  </h1>
                </div>
                <div
                  class="lg:col-span-4 md:col-span-8 col-span-7 lg:border-r border-b lg:border-b-0 border-gray-300 py-2 xl:px-5 px-2"
                >
                  <h1 class="text-left xl:text-lg lg:text-sm text-xs">
                    {fd.amount}
                  </h1>
                </div>
                <div
                  class="lg:col-span-2 md:col-span-4 col-span-5 border-r border-gray-300 py-2 xl:px-5 px-2"
                >
                  <h1
                    class="text-left xl:text-lg lg:text-sm text-xs capitalize"
                  >
                    Maturity Date
                  </h1>
                </div>
                <div
                  class="lg:col-span-4 md:col-span-8 col-span-7 py-2 xl:px-5 px-2"
                >
                  <h1 class="text-left xl:text-lg lg:text-sm text-xs">
                    {date_formatted(fd.maturity_date)}
                  </h1>
                </div>
              </div>
              <div class="grid grid-cols-12">
                <div
                  class="lg:col-span-2 md:col-span-4 col-span-5 border-r border-gray-300 py-2 xl:px-5 px-2"
                >
                  <h1
                    class="text-left xl:text-lg lg:text-sm text-xs capitalize"
                  >
                    Interest Rate :
                  </h1>
                </div>
                <div
                  class="lg:col-span-4 md:col-span-8 col-span-7 lg:border-r border-gray-300 py-2 xl:px-5 px-2"
                >
                  <h1 class="text-left xl:text-lg lg:text-sm text-xs">5.5%</h1>
                </div>
              </div>
            </div>
          {/each}
        </div>
      </div>
    </div>
  </div>
{:else}
  ....loading
{/if}
