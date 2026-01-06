<script>
  import { Input, Helper } from "flowbite-svelte";
  import AlertMsg from "$lib/forgotPassword/AlertMsg.svelte";
  export let onSendOTP;
  export let isCounting;
  export let countdown;
  export let data;
  export let errors;
  export let onInput;
  export let alertMsg;
  console.log("data is: ", data);
  function formatTime(seconds) {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${String(minutes).padStart(2, "0")}:${String(remainingSeconds).padStart(2, "0")}`;
  }
</script>

<div class="mb-6">
  <label for="mobile" class="block text-gray-700 font-semibold">
    Enter Mobile Number
  </label>
  <input
    on:input={(e) => {
      data.mobileNumber = e.target.value;
      onInput("mobileNumber");
    }}
    id="mobile"
    type="text"
    bind:value={data.mobileNumber}
    placeholder="Mobile number"
    class="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-shadow duration-300"
  />
  {#if errors["mobileNumber"]}
    {#if errors.mobileNumber}
      <Helper color="red" class="absolute">
        {errors.mobileNumber}
      </Helper>
    {/if}
  {/if}
</div>

<!-- Send OTP Button with Timer -->
<button
  class="w-full bg-purple-500 text-white py-3 rounded-lg hover:bg-purple-600 focus:outline-none focus:ring-4 focus:ring-purple-300 transition-colors duration-300 disabled:bg-gray-300 disabled:cursor-not-allowed"
  on:click={onSendOTP}
  disabled={isCounting}
>
  {#if isCounting}
    Resend OTP in {formatTime(countdown)}
  {:else}
    Send OTP
  {/if}
</button>

{#if alertMsg}
  <AlertMsg {alertMsg} />
{/if}
<a
  href="/termloan/registrationForm"
  class="ml-2 mt-4 flex justify-center items-center text-purple-600"
>
  Register here
</a>
