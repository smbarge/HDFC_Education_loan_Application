<!-- OTP Input -->
<script>
  import { Input, Helper } from "flowbite-svelte";
  import AlertMsg from "$lib/forgotPassword/AlertMsg.svelte";
  export let data;
  export let errors;
  export let onInputOTP;
  export let verifyOTP;
  export let countdown;
  export let alertMsg;
  function formatTime(seconds) {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${String(minutes).padStart(2, "0")}:${String(remainingSeconds).padStart(2, "0")}`;
  }
</script>

<div class="mb-6 mt-4">
  <label for="otp" class="block text-gray-700 text-sm font-medium mb-2">
    Enter OTP
  </label>
  <input
    on:input={(e) => {
      data.otp = e.target.value;
      onInputOTP("otp");
    }}
    id="otp"
    type="text"
    bind:value={data.otp}
    placeholder="Enter OTP"
    class="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-shadow duration-300"
  />
  <!-- {#if errors["otp"]} -->
  {#if errors.otp}
    <Helper color="red" class="absolute">
      {errors.otp}
    </Helper>
  {/if}
  <!-- {/if} -->
</div>

<!-- Verify OTP Button -->
<button
  class="w-full bg-purple-500 text-white py-3 rounded-lg hover:bg-purple-600 focus:outline-none focus:ring-4 focus:ring-purple-300 transition-colors duration-300 flex justify-between items-center px-4"
  on:click={verifyOTP}
>
  <span class="flex-1 text-center">Verify OTP</span>
  <span class="text-right">{formatTime(countdown)}</span>
</button>
{#if alertMsg}
  <AlertMsg {alertMsg} />
{/if}
