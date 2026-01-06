<script>
  import { page } from "$app/stores";
  let formNo = $page.params.formNo;
  let successMessage = "Your Term application  was successfully submitted!";
  let details = `your application id is: ${formNo} `;
</script>

<div class="min-h-screen flex flex-col justify-center items-center bg-gray-50">
  <!-- Card container -->
  <div class="bg-white p-6 mt-2 rounded-lg shadow-lg max-w-md text-center">
    <!-- Success Icon -->
    <div class="flex justify-center items-center mb-4">
      <svg xmlns="http://www.w3.org/2000/svg"  viewBox="0 0 48 48" width="48px" height="48px"><path fill="#c8e6c9" d="M44,24c0,11.045-8.955,20-20,20S4,35.045,4,24S12.955,4,24,4S44,12.955,44,24z"/><path fill="#4caf50" d="M34.586,14.586l-13.57,13.586l-5.602-5.586l-2.828,2.828l8.434,8.414l16.395-16.414L34.586,14.586z"/></svg>
    </div>
    <!-- Success Message -->
    <h1 class="text-2xl font-bold text-gray-900 mb-2">{successMessage}</h1>
    <p class="text-gray-600 mb-6">{details}</p>

    <!-- Action buttons -->
    <div class="space-x-4">
      <a
        href="/termloan/finalDashboard"
        class="inline-bloc$ px-6 py-2 text-white bg-green-500 hover:bg-green-600 rounded-full focus:outline-none focus:ring-2 focus:ring-green-300 focus:ring-offset-2 transition duration-150"
      >
        DASHBOARD
      </a>
    </div>
  </div>
</div>
