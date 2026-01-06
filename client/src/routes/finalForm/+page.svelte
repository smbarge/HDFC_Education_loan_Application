<script>
  import { goto } from "$app/navigation";
  import SubmitConfirm from "../../component/loanCollateral/SubmitConfirm.svelte";
  import { api } from "$api/api";
  import { applications } from "$appstore/store";
  import ApplicationView from "../../component/applicationView/ApplicationView.svelte";

  let submitModalOpen = false;
  let finalConfirmation
  const onConfirm = async () => {
    
    let application_id = $applications[0].businessDetails.id;
    console.log("application_id is: ", application_id);
    let { error, errorMsg, formNo } = await api.confirmForm({
      application_id,
      final_confirmation:finalConfirmation ? 1 :""
    });
    console.log("error: ", error);
    console.log("errorMsg: ", errorMsg);
    console.log("formNo: ", formNo);
    formNo = formNo?.replace(/\//g, "-");
    {
      let { error, errorMsg } = await api.sendSubmitEmail({
        id: "1234",
        email: "omkarpatil0424@gmail.com",
        applicantName: "Omkar Patil",
        applicationDate: "22/02/2025",
        quotationAmount: "12345.00",
        buisnessName: "Chanakya",
        districtName: "Kolhapur",
      });
    }
    goto(`/termloan/formSubmittedSuccess/${formNo}`);
  };

  const onEdit = () => {
    goto("/termloan/termLoan");
  };

  const onCancel = () => {};

  let checked = false;
</script>

<ApplicationView />
<div class="max-w-7xl mx-auto my-4 p-6 bg-white rounded-lg shadow-lg">
  <h2 class="font-poppins text-2xl font-bold text-gray-800 mb-4 text-center">
    Submission Confirmation / सबमिशनची पुष्टी
  </h2>
  <div class="mb-6 text-gray-700 text-justify leading-relaxed">
    <p class="font-poppins mb-3">
      I hereby confirm that all documents and information submitted in this
      application are true, accurate, and original. I understand that any false
      or misleading information may lead to disqualification or further action
      as per the application guidelines.
      <br />
      मी जाहीर करतो की या अर्जामध्ये सादर केलेली सर्व कागदपत्रे आणि माहिती खरी, अचूक
      आणि मूळ आहेत. कोणतीही खोटी किंवा दिशाभूल करणारी माहिती दिल्यास अर्ज फेटाळला
      जाऊ शकतो किंवा मार्गदर्शक सूचनांनुसार पुढील कारवाई होऊ शकते.
    </p>

    <p class="font-poppins mb-3">
      I have reviewed all the submitted documents carefully and take full
      responsibility for their accuracy. If any further details are required, I
      will provide them without delay.
      <br />
      मी सर्व सादर केलेली कागदपत्रे काळजीपूर्वक तपासली आहेत आणि त्याच्या अचूकतेची
      पूर्ण जबाबदारी घेतो. आवश्यक असल्यास, मी तात्काळ अतिरिक्त माहिती पुरवीन.
    </p>
  </div>

  <div class="mb-6">
    <label class="flex items-start cursor-pointer">
      <div class="flex items-center h-6">
        <input
          type="checkbox"
          bind:checked={finalConfirmation}
          class="w-5 h-5 text-Calypso-600 border-gray-300 rounded focus:ring-Calypso-500"
        />
      </div>
   
      <div class="font-poppins ml-3 text-gray-700">
        <span>
          I confirm that all information and documents uploaded are correct and
          original. I am aware of the consequences of providing false
          information.
          <br />
          मी पुष्टी करतो की सादर केलेली सर्व माहिती व कागदपत्रे खरी व मूळ आहेत. खोटी
          माहिती दिल्यास होणाऱ्या परिणामांची मला पूर्ण जाणीव आहे.
        </span>
      </div>
    </label>
  </div>

  <div
    class="bg-green-100 border-l-4 border-green-500 text-green-700 p-4 mb-6 hidden"
    role="alert"
  >
    <p class="font-medium">
      Application submitted successfully! Thank you. You will receive an email
      confirmation shortly.
      <br />
      अर्ज यशस्वीरित्या सबमिट झाला आहे! धन्यवाद. लवकरच तुम्हाला पुष्टीकरणाचा ईमेल
      प्राप्त होईल.
    </p>
  </div>
</div>

<div class="flex justify-center items-center gap-5">
  <button
    on:click={() => goto("/termloan/termLoan")}
    class="relative rounded md:px-6 px-2 py-2 overflow-hidden group bg-Calypso-500 hover:bg-gradient-to-r hover:from-Cbg-Calypso-500 hover:to-Cbg-Calypso-400 text-white hover:ring-2 hover:ring-offset-2 hover:ring-Cbg-Calypso-400 transition-all ease-out duration-300"
  >
    <span
      class="absolute right-0 w-8 h-32 -mt-12 transition-all duration-1000 transform translate-x-12 bg-white opacity-10 rotate-12 group-hover:-translate-x-56 ease"
    ></span>

    <div class="flex justify-start items-center gap-2">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 -960 960 960"
        class="size-4 fill-white relative hidden md:block"
      >
        <path
          d="M120-120v-170l528-527q12-11 26.5-17t30.5-6q16 0 31 6t26 18l55 56q12 11 17.5 26t5.5 30q0 16-5.5 30.5T817-647L290-120H120Zm584-528 56-56-56-56-56 56 56 56Z"
        />
      </svg>
      <span
        class="relative uppercase text-white font-robotoMono lg:text-sm text-xs"
        >Edit Application</span
      >
    </div>
  </button>
  <button
    on:click={() => {
      if (finalConfirmation) {
        submitModalOpen = true;
        console.log("onSubmit called");
      }
    }}
    disabled={!finalConfirmation}
    class="relative rounded md:px-6 px-2 py-2 overflow-hidden group bg-Calypso-500 hover:bg-gradient-to-r hover:from-Cbg-Calypso-500 hover:to-Cbg-Calypso-400 text-white hover:ring-2 hover:ring-offset-2 hover:ring-Cbg-Calypso-400 transition-all ease-out duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
  >
    <span
      class="absolute right-0 w-8 h-32 -mt-12 transition-all duration-1000 transform translate-x-12 bg-white opacity-10 rotate-12 group-hover:-translate-x-56 ease"
    ></span>
    <div class="flex justify-start items-center gap-2">
      <span
        class="relative uppercase text-white font-robotoMono lg:text-sm text-xs"
        >submit Application</span
      >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 -960 960 960"
        class="size-4 fill-white relative hidden md:block"
      >
        <path
          d="m700-300-57-56 84-84H120v-80h607l-83-84 57-56 179 180-180 180Z"
        />
      </svg>
    </div>
  </button>
</div>
<div class="mb-4">
  {#if submitModalOpen}
    <SubmitConfirm
      bind:isModalOpen={submitModalOpen}
      on:cancel={onCancel}
      on:edit={onEdit}
      on:confirm={onConfirm}
    />
  {/if}
</div>
<!-- <script>
  import { goto } from "$app/navigation";
  import SubmitConfirm from "../../component/loanCollateral/SubmitConfirm.svelte";
  import { api } from "$api/api";
  import { applications } from "$appstore/store";
  import ApplicationView from "../../component/applicationView/ApplicationView.svelte";

  let submitModalOpen = false;

  const onConfirm = async () => {
    let application_id = $applications[0].businessDetails.id;
    console.log("application_id is: ", application_id);
    let { error, errorMsg, formNo } = await api.confirmForm({
      application_id,
    });
    console.log("error: ", error);
    console.log("errorMsg: ", errorMsg);
    console.log("formNo: ", formNo);
    formNo = formNo?.replace(/\//g, "-");
    {
      let { error, errorMsg } = await api.sendSubmitEmail({
        id: "1234",
        email: "omkarpatil0424@gmail.com",
        applicantName: "Omkar Patil",
        applicationDate: "22/02/2025",
        quotationAmount: "12345.00",
        buisnessName: "Chanakya",
        districtName: "Kolhapur",
      });
    }
    goto(`/termloan/formSubmittedSuccess/${formNo}`);
  };

  const onEdit = () => {
    goto("/termloan/termLoan");
  };

  const onCancel = () => {};

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
</script>

<ApplicationView />
<div>
  <h1
    class="text-gray-600 lg:text-lg text-base capitalize text-center font-medium py-2 border-b border-gray-300"
  >
    <div class="max-w-2xl mx-auto my-8 p-6 bg-white rounded-lg shadow-lg">
      <h2 class="text-2xl font-bold text-gray-800 mb-4">
        Submission Confirmation
      </h2>

      <div class="mb-6 text-gray-700">
        <p class="mb-3">
          I hereby confirm that all documents and information provided in this
          application are correct and original. I understand that any incorrect
          or falsified documents may result in my application being rejected and
          may lead to further penalties as outlined in the application
          guidelines.
        </p>

        <p class="mb-3">
          I acknowledge that I have thoroughly reviewed all submitted materials
          for accuracy and completeness before finalizing this submission. If
          any additional information is required, I will provide it promptly
          upon request.
        </p>
      </div>

      <div class="mb-6">
        <label class="flex items-start cursor-pointer">
          <div class="flex items-center h-6">
            <input
              type="checkbox"
              bind:checked
              class="w-5 h-5 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
            />
          </div>
          <div class="ml-3 text-gray-700">
            <span
              >I confirm that all information and documents I have uploaded with
              this application are correct and original. I understand that
              providing false information may result in penalties as described
              in the application guidelines.</span
            >
          </div>
        </label>
      </div>

      {#if submitted}
        <div
          class="bg-green-100 border-l-4 border-green-500 text-green-700 p-4 mb-6"
          role="alert"
        >
          <p class="font-medium">Application submitted successfully!</p>
          <p>
            Thank you for your submission. You will receive a confirmation email
            shortly.
          </p>
        </div>
      {:else}
        <button
          on:click={handleSubmit}
          disabled={!checked || submitting}
          class="w-full md:w-auto px-6 py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-4 focus:ring-blue-300 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {#if submitting}
            <span class="inline-block animate-spin mr-2">↻</span>
            Submitting...
          {:else}
            Submit Application
          {/if}
        </button>
      {/if}
    </div>
  </h1>
</div>
<div class="flex justify-center items-center gap-5">
  <button
    on:click={() => goto("/termloan/termLoan")}
    class="relative rounded md:px-6 px-2 py-2 overflow-hidden group bg-Calypso-500 hover:bg-gradient-to-r hover:from-Cbg-Calypso-500 hover:to-Cbg-Calypso-400 text-white hover:ring-2 hover:ring-offset-2 hover:ring-Cbg-Calypso-400 transition-all ease-out duration-300"
  >
    <span
      class="absolute right-0 w-8 h-32 -mt-12 transition-all duration-1000 transform translate-x-12 bg-white opacity-10 rotate-12 group-hover:-translate-x-56 ease"
    ></span>

    <div class="flex justify-start items-center gap-2">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 -960 960 960"
        class="size-4 fill-white relative hidden md:block"
      >
        <path
          d="M120-120v-170l528-527q12-11 26.5-17t30.5-6q16 0 31 6t26 18l55 56q12 11 17.5 26t5.5 30q0 16-5.5 30.5T817-647L290-120H120Zm584-528 56-56-56-56-56 56 56 56Z"
        />
      </svg>
      <span
        class="relative uppercase text-white font-robotoMono lg:text-sm text-xs"
        >Edit Application</span
      >
    </div>
  </button>
  <button
    on:click={() => {
      submitModalOpen = true;
      console.log("onSubmit called");
    }}
    class="relative rounded md:px-6 px-2 py-2 overflow-hidden group bg-Calypso-500 hover:bg-gradient-to-r hover:from-Cbg-Calypso-500 hover:to-Cbg-Calypso-400 text-white hover:ring-2 hover:ring-offset-2 hover:ring-Cbg-Calypso-400 transition-all ease-out duration-300"
  >
    <span
      class="absolute right-0 w-8 h-32 -mt-12 transition-all duration-1000 transform translate-x-12 bg-white opacity-10 rotate-12 group-hover:-translate-x-56 ease"
    ></span>
    <div class="flex justify-start items-center gap-2">
      <span
        class="relative uppercase text-white font-robotoMono lg:text-sm text-xs"
        >submit Application</span
      >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 -960 960 960"
        class="size-4 fill-white relative hidden md:block"
      >
        <path
          d="m700-300-57-56 84-84H120v-80h607l-83-84 57-56 179 180-180 180Z"
        />
      </svg>
    </div>
  </button>
</div>
<div class="mb-4">
  {#if submitModalOpen}
    <SubmitConfirm
      bind:isModalOpen={submitModalOpen}
      on:cancel={onCancel}
      on:edit={onEdit}
      on:confirm={onConfirm}
    />
  {/if}
</div> -->
