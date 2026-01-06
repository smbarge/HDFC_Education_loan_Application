<script>
  export let alertMsg = '';

  // Function to show the alert message with a delay
  function showErrorMessage(message) {
    // Delay of 3 seconds (3000 ms) before showing the alert
    setTimeout(() => {
      alertMsg = message;

      // Automatically hide the message after 3 seconds
      setTimeout(() => {
        alertMsg = '';
      }, 3000);
    }, 3000);
  }

  // Example usage (triggering an error message)
  showErrorMessage(alertMsg); // You can replace this with dynamic error messages
</script>

<!-- Alert message structure with Tailwind CSS -->
<div class="w-auto">
  {#if alertMsg}
    <div
      class="flex items-center bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-lg shadow-md mt-6"
      role="alert"
    >
      <svg
        class="flex-shrink-0 inline w-4 h-4 me-3"
        aria-hidden="true"
        xmlns="http://www.w3.org/2000/svg"
        fill="currentColor"
        viewBox="0 0 20 20"
      >
        <path
          d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM9.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM12 15H8a1 1 0 0 1 0-2h1v-3H8a1 1 0 0 1 0-2h2a1 1 0 0 1 1 1v4h1a1 1 0 0 1 0 2Z"
        />
      </svg>
      <span class="text-sm font-semibold">
        {alertMsg}
      </span>
    </div>
  {/if}
</div>
