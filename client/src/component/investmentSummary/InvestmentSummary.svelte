<script>
  import ApplicantCard from "../applicantCard/ApplicantCard.svelte";
  import GuarantorCard from "../guarantorCard/GuarantorCard.svelte";
  export let handleButtonClick;
  export let handleBackButtonClick;
  import { masters } from "$appstore/store";
  import { onMount } from "svelte";
  // export let InvestmentApplicantDetails;

  export let data;
  export let errors;
  export let onInput;
  export let onSubmit;
  export let alertMsg = "";


  export let guarantorData;
  export let guarantorErrors;
  export let onGuarantorInput;
  export let onGuarantorSubmit;

  import { fly } from "svelte/transition";

  let currentStep = 1; // 1 for Applicant, 2 for Guarantor

  function proceedToGuarantor() {
    window.scrollTo({ top: 0, behavior: "smooth" });
    currentStep = 2;
  }

  function backToApplicant() {
    window.scrollTo({ top: 0, behavior: "smooth" });
    currentStep = 1;
  }
</script>

<!-- Step Bar -->

<!-- {JSON.stringify(data)} -->
<!-- Form Components -->
{#if currentStep === 1}
  <div
    in:fly={{ x: 1000, duration: 500 }}
    out:fly={{ x: -1000, duration: 500 }}
  >
    <!-- <ApplicantCard
      {data}
      {errors}
      {onInput}
      {onSubmit}
      on:proceedToGuarantor={proceedToGuarantor}
      {handleBackButtonClick}
    /> -->
    <ApplicantCard
      {data}
      {errors}
      {onInput}
      {onSubmit}
      on:proceedToGuarantor={onSubmit}
      {handleBackButtonClick}
      {alertMsg}
    />
  </div>
{:else}
  <div transition:fly={{ x: 1000, duration: 500 }}>
    <GuarantorCard
      {guarantorData}
      {guarantorErrors}
      {onGuarantorInput}
      {onGuarantorSubmit}
      on:backToApplicant={backToApplicant}
      {handleButtonClick}
    />
  </div>
{/if}
