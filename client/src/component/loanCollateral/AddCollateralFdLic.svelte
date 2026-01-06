<script>
  import FD from "./forms/FD.svelte";
  import LICPolicy from "./forms/LICPolicy.svelte";
  import { createEventDispatcher } from "svelte";
  export let isModalOpen = false;
  import { onMount } from "svelte";
  import { masters } from "$appstore/store";
  import FDSuite from "$lib/validate/loanCollateral/FDSuite.js";
  import LICSuite from "$lib/validate/loanCollateral/LICSuite.js";

  let resFDValidate = FDSuite.get();
  let resLICValidate = LICSuite.get();

  let licFdTypes = [];
  onMount(() => {
    licFdTypes = [...$masters.m_fd_lic_type].sort((a, b) => a.id - b.id);
  });
  let fd_lic_type = 0;
  const dispatch = createEventDispatcher();

  const getFD = () => {
    console.log("fd_lic_type: ", fd_lic_type);
    console.log("fd: ", fd);
    const {
      bank_name,
      branch_name,
      street_address,
      dist_id,
      taluka_id,
      place,
      pincode,
      fd_acc_no,
      start_date,
      maturity_date,
      amount,
      interest_rate,
    } = fd;
    console.log("interest_rate is: ", interest_rate);
    // reset saved values
    fd = {
      bank_name: "",
      branch_name: "",
      street_address: "",
      dist_id: 0,
      taluka_id: 0,
      place: "",
      pincode: "",
      fd_acc_no: "",
      start_date: "",
      maturity_date: "",
      amount: "",
      interest_rate: 0.0,
    };
    return {
      bank_name,
      branch_name,
      street_address,
      dist_id,
      taluka_id,
      place,
      pincode,
      fd_acc_no,
      start_date,
      maturity_date,
      amount,
      interest_rate,
    };
  };
  const getLICPolicy = () => {
    const {
      policy_name,
      policy_type,
      policy_receipt_no,
      surrender_value,
      start_date,
      maturity_date,
    } = lic;

    // reset agriProperty
    lic = {
      policy_name: "",
      policy_type: "",
      policy_receipt_no: "",
      surrender_value: "",
      start_date: "",
      maturity_date: "",
    };
    return {
      policy_name,
      policy_type,
      policy_receipt_no,
      surrender_value,
      start_date,
      maturity_date,
    };
  };
  const onAdd = () => {
    let data = {};
    if (fd_lic_type == 1) {
      clearErrors(fdErrors);
      if (!onSubmit("FD")) return false;
      data = getFD();
      console.log("dispatch called");
      dispatch("addFD", data);
    } else if (fd_lic_type == 2) {
      clearErrors(licErrors);
      if (!onSubmit("LIC")) return false;
      data = getLICPolicy();
      dispatch("addLICPolicy", data);
    }
    isModalOpen = !isModalOpen;
  };

  const toggleModal = () => {
    fd_lic_type = 0;
    isModalOpen = !isModalOpen;
  };
  // Commercial

  let fd = {
    bank_name: "",
    branch_name: "",
    street_address: "",
    dist_id: 0,
    taluka_id: 0,
    place: "",
    pincode: "",
    fd_acc_no: "",
    start_date: "",
    maturity_date: "",
    amount: "",
    interest_rate: 0,
  };

  let fdErrors = {
    bank_name: "",
    branch_name: "",
    street_address: "",
    dist_id: "",
    taluka_id: "",
    place: "",
    pincode: "",
    fd_acc_no: "",
    start_date: "",
    maturity_date: "",
    amount: "",
    interest_rate: "",
  };
  let lic = {
    policy_name: "",
    policy_type: "",
    policy_receipt_no: "",
    surrender_value: "",
    start_date: "",
    maturity_date: "",
  };
  let licErrors = {
    policy_name: "",
    policy_type: "",
    policy_receipt_no: "",
    surrender_value: "",
    start_date: "",
    maturity_date: "",
  };

  const onSubmit = (type) => {
    if (type == "LIC") {
      clearErrors(licErrors);
      resLICValidate = LICSuite(lic, "submit");
      console.log("licErrors: ", resLICValidate.errors);

      resLICValidate.errors.forEach((e) => {
        licErrors[e.fieldName] = e.message;
      });
      if (resLICValidate.errors.length) return false;
      return true;
    } else if (type == "FD") {
      clearErrors(fdErrors);
      resFDValidate = FDSuite(fd, "submit");
      console.log("fdErrors: ", resFDValidate.errors);

      resFDValidate.errors.forEach((e) => {
        fdErrors[e.fieldName] = e.message;
      });
      if (resFDValidate.errors.length) return false;
      return true;
    }
  };
  const clearErrors = (errors) => {
    const keys = Object.keys(errors);
    keys.forEach((key) => {
      errors[key] = "";
    });
  };
  const onInput = (field, type) => {
    if (type == "FD") {
      clearErrors(fdErrors);
      console.log("FD field : ", field, "value: ", fd[field]);

      resFDValidate = FDSuite(fd, field);
      console.log("fdErrors: ", resFDValidate.errors);

      resFDValidate.errors.forEach((e) => {
        fdErrors[e.fieldName] = e.message;
      });
    } else if (type == "LIC") {
      clearErrors(licErrors);
      console.log("LIC field : ", field, "value: ", lic[field]);

      resLICValidate = LICSuite(lic, field);
      console.log("licErrors: ", resLICValidate.errors);

      resLICValidate.errors.forEach((e) => {
        licErrors[e.fieldName] = e.message;
      });
      console.log("LIC field : ", field);
    } else {
      console.log("unexpected type : ", field);
    }
  };
</script>

<!-- Main modal -->
{#if isModalOpen}
  <div
    id="default-modal"
    tabindex="-1"
    aria-hidden="true"
    class="overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 bottom-0 z-50 flex justify-center items-center w-full md:inset-0 h-full bg-gray-900 bg-opacity-50 backdrop-blur-sm"
  >
    <div class="relative p-4 w-full max-w-2xl max-h-full">
      <!-- Modal content -->
      <div class="relative bg-white rounded-lg shadow">
        <!-- Modal header -->
        <div
          class="flex items-center justify-between p-4 md:p-5 border-b rounded-t"
        >
          <h3 class="text-xl font-semibold text-gray-900">Add Collateral FD</h3>
          <button
            type="button"
            class="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center"
            on:click={toggleModal}
          >
            <svg
              class="w-3 h-3"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 14 14"
            >
              <path
                stroke="currentColor"
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
              />
            </svg>
            <span class="sr-only">Close modal</span>
          </button>
        </div>
        <!-- Modal body -->
        <div class="px-2 md:px-2 space-y-2">
          <form>
            <fieldset>
              <legend class="text-base font-medium text-gray-900 pb-2">
                <span class="px-4"> Please select the property type: </span>
              </legend>

              <div class="mx-2 mb-4 space-y-2">
                <!-- Commercial Property -->
                <div
                  class="my-2 mx-2 md:mx-4 grid grid-cols-1 md:grid-cols-1 lg:grid-cols-1 gap-2 bg-white border-2 border-gray-200 p-3 rounded"
                >
                  <!-- <pre>
                    {JSON.stringify(licFdTypes, null, 2)}
                  </pre> -->
                  {#each licFdTypes as prop, i}
                    {#if prop.id === 1}
                      <div
                        class={`flex flex-col flex-wrap items-center justify-center px-2 m-2 p-3 rounded shadow ${fd_lic_type == prop.id ? "bg-gray-200" : "bg-gray-100"}`}
                      >
                        <input
                          id={`${prop.id}${prop.eng_name}`}
                          name="property-type"
                          type="radio"
                          value={prop.id}
                          class="w-4 h-4 text-blue-600 border-gray-300 focus:ring-blue-500 mb-2"
                          bind:group={fd_lic_type}
                        />
                        <label
                          for={`${prop.id}${prop.eng_name}`}
                          class="ml-3 block text-sm font-medium text-gray-700"
                        >
                          {prop.eng_name}&nbsp;-&nbsp;{prop.dev_name}
                        </label>
                      </div>
                    {/if}
                  {/each}

                  <!-- {#each licFdTypes as prop, i}
                    <div
                      class={`flex flex-col flex-wrap items-center justify-center px-2 m-2 p-3 rounded shadow ${fd_lic_type == prop.id ? "bg-gray-200" : "bg-gray-100"}`}
                    >
                      <input
                        id={`${prop.id}${prop.eng_name}`}
                        name="property-type"
                        type="radio"
                        value={prop.id}
                        class="w-4 h-4 text-blue-600 border-gray-300 focus:ring-blue-500 mb-2"
                        bind:group={fd_lic_type}
                      />
                      <label
                        for={`${prop.id}${prop.eng_name}`}
                        class="ml-3 block text-sm font-medium text-gray-700"
                      >
                        {prop.eng_name}&nbsp;-&nbsp;{prop.dev_name}
                      </label>
                    </div>
                  {/each} -->
                </div>
              </div>

              {#if fd_lic_type == 1}
                <FD data={fd} errors={fdErrors} {onInput} />
              {:else if fd_lic_type == 2}
                <LICPolicy data={lic} errors={licErrors} {onInput} />
              {/if}
            </fieldset>
          </form>
        </div>
        <!-- Modal footer -->
        <div
          class="flex items-center justify-center p-4 md:p-5 border-t border-gray-200 rounded-b"
        >
          {#if fd_lic_type}
            <button
              on:click={onAdd}
              type="button"
              class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
            >
              Add
            </button>
          {:else}
            <button
              type="button"
              disabled={!fd_lic_type}
              class="text-white bg-gray-700 hover:bg-gray-800 focus:ring-4 focus:outline-none focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
            >
              Add
            </button>
          {/if}
          <button
            on:click={toggleModal}
            type="button"
            class="py-2.5 px-5 ms-3 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  </div>
{/if}
