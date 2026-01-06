<script>
  import { createEventDispatcher } from "svelte";
  import FD from "./forms/FD.svelte";
  import FDSuite from "$lib/validate/loanCollateral/FDSuite.js";
  import { masters } from "$appstore/store";

  let resFDValidate = FDSuite.get();
  export let isModalOpen = false;
  export let fd;

  let dataLoaded = false;

  const dispatch = createEventDispatcher();

  const onDelete = () => {
    console.log("fd being deleted is: ", fd);
    dispatch("deleteFD", fd.id);
    isModalOpen = !isModalOpen;
  };
  const toggleModal = () => {
    // property.property_type = 0;
    isModalOpen = !isModalOpen;
  };
  // Commercial
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
          <h3 class="text-xl font-semibold text-gray-900">
            Delete Collateral Bank Fixed Deposit
          </h3>
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
              <FD data={fd} errors={fdErrors} readonly={true} />
            </fieldset>
          </form>
        </div>
        <!-- Modal footer -->
        <div
          class="flex items-center justify-center p-4 md:p-5 border-t border-gray-200 rounded-b"
        >
          <button
            on:click={onDelete}
            type="button"
            class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
          >
            Delete
          </button>
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
