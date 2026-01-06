<script>
  import { createEventDispatcher } from "svelte";

  const dispatch = createEventDispatcher();
  export let isModalOpen = false;
  const toggleModal = () => {
    isModalOpen = !isModalOpen;
  };
  const onConfirm = () => {
    isModalOpen = !isModalOpen;
    dispatch("confirm", {});
    console.log("confirm submit");
  };
  const onCancel = () => {
    isModalOpen = !isModalOpen;
    console.log("cancel submit");
    dispatch("cancel", {});
  };
  const onEdit = () => {
    isModalOpen = !isModalOpen;
    console.log("edit form");
    dispatch("edit", {});
  };
</script>

<!-- Main modal -->
{#if isModalOpen}
  <div
    id="default-modal"
    tabindex="-1"
    aria-hidden="true"
    class="fixed inset-0 z-50 flex justify-center items-center w-full h-full bg-gray-900 bg-opacity-50 backdrop-blur-sm"
  >
    <div class="relative p-6 w-full max-w-2xl">
      <!-- Modal content -->
      <div class="bg-white rounded-lg shadow-lg">
        <!-- Modal header -->
        <div
          class="flex items-center justify-between p-5 border-b border-gray-300 rounded-t"
        >
          <h3 class="text-lg font-semibold text-gray-800">
            Confirm Your Submission
          </h3>

          <button
            type="button"
            class="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-full text-sm w-8 h-8 inline-flex items-center justify-center"
            on:click={toggleModal}
          >
            <svg
              class="w-4 h-4"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              stroke-width="2"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
            <span class="sr-only">Close</span>
          </button>
        </div>

        <!-- Modal body -->
        <div class="p-6">
          <p class="text-gray-600">
            Are you sure you want to submit your application? <strong
              >Once submitted, no changes can be made to the application
              details.</strong
            > Please confirm to proceed or cancel to make further modifications.
          </p>
        </div>

        <!-- Modal footer -->
        <div class="flex p-6 border-t border-gray-200 justify-between mx-10">
          <button
            on:click={onConfirm}
            class="bg-blue-600 text-white hover:bg-blue-700 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-6 py-2.5 mr-2"
          >
            Confirm
          </button>
          <button
            on:click={onEdit}
            class="bg-gray-400 text-gray-800 border border-gray-300 hover:bg-gray-500 hover:text-gray-900 focus:ring-4 focus:ring-gray-200 font-medium rounded-lg text-sm px-6 py-2.5"
          >
            Edit
          </button>
          <button
            on:click={onCancel}
            class="bg-white text-gray-900 border border-gray-300 hover:bg-gray-100 hover:text-blue-600 focus:ring-4 focus:ring-gray-200 font-medium rounded-lg text-sm px-6 py-2.5"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  </div>
{/if}
