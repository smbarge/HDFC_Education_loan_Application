<script>
  import { createEventDispatcher } from "svelte";
  import { Checkbox } from "flowbite-svelte";
  import AlertMsg from "$lib/forgotPassword/AlertMsg.svelte";
  import passwordVerificationSuite from "$lib/validate/passwordVerification";
  import { create } from "vest";
  let res = passwordVerificationSuite.get();

  let viewPassword = false;
  let viewConfirmPassword = false;

  // let alertMsg = "";
  const dispatch = createEventDispatcher();
  // let data = {
  //   password: "",
  //   confirmPassword: "",
  // };
  // let errors = {
  //   password: "",
  //   confirmPassword: "",
  // };
  export let mobile;
  export let data;
  export let errors;
  export let onInputConfirmPass;
  export let alertMsg;

  const handleChange = (fieldName) => {
    console.log("handleChange called for :", fieldName);
    res = passwordVerificationSuite(data, fieldName);

    console.log("res.formErrors", res.errors);
    const keys = Object.keys(errors);

    keys.forEach((key) => {
      errors[key] = "";
    });

    res.errors.forEach((e) => {
      errors[e.fieldName] = e.message;
    });
  };

  const changePassword = async () => {
    console.log("changePassword callled");
    dispatch("newPassword", { password: data.password });
  };
</script>

<!-- {JSON.stringify(data)} -->
<div class=" flex items-center justify-center">
  <div class="bg-white px-8 p-8 rounded-lg border w-full max-w-md">
    <!-- Title -->
    <!-- <div class="flex justify-center border-b pb-4 mb-6">
      <h2 class="text-3xl font-semibold text-gray-700">Change Password</h2>
    </div> -->

    <!-- Username/Phone Display -->
    <div class="mb-6">
      <label class="text-gray-500 text-sm font-medium">Your Username</label>
      <div
        class="flex items-center gap-2 p-3 w-full rounded-lg bg-gray-100 text-gray-700 text-lg font-medium"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke-width="1.5"
          stroke="currentColor"
          class="w-6 h-6 text-green-500"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            d="M9 12.75L11.25 15 15 9.75M21 12c0 1.268-.63 2.39-1.593 3.068a3.745 3.745 0 0 1-1.043 3.296 3.745 3.745 0 0 1-3.296 1.043A3.745 3.745 0 0 1 12 21c-1.268 0-2.39-.63-3.068-1.593a3.746 3.746 0 0 1-3.296-1.043 3.745 3.745 0 0 1-1.043-3.296A3.745 3.745 0 0 1 3 12c0-1.268.63-2.39 1.593-3.068a3.745 3.745 0 0 1 1.043-3.296A3.746 3.746 0 0 1 12 3c1.268 0 2.39.63 3.068 1.593a3.746 3.746 0 0 1 3.296 1.043 3.746 3.746 0 0 1 1.043 3.296A3.745 3.745 0 0 1 21 12Z"
          />
        </svg>
        <span>{mobile}</span>
      </div>
    </div>

    <!-- Create Password Section -->
    <div class="mb-6">
      <label class="text-gray-700 font-semibold">Create Your Password</label>
      <div class="relative mt-3">
        <label class="text-gray-500 text-sm">Password</label>
        <Checkbox
          class="absolute right-0 top-1.5 text-gray-800"
          bind:checked={viewPassword}
        >
          View
        </Checkbox>
        {#if viewPassword}
          <input
            on:input={(e) => {
              data.password = e.target.value;
              onInputConfirmPass("password");
            }}
            type="text"
            class="w-full p-3 mt-2 border rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
            placeholder="Enter Password"
            bind:value={data.password}
          />
        {:else}
          <input
            on:input={(e) => {
              data.password = e.target.value;
              onInputConfirmPass("password");
            }}
            type="password"
            class="w-full p-3 mt-2 border rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
            placeholder="Enter Password"
            bind:value={data.password}
          />
        {/if}
        {#if errors.password}
          <span class="text-red-500 text-sm mt-1">{errors.password}</span>
        {/if}
      </div>
    </div>

    <!-- Confirm Password Section -->
    <div class="mb-6">
      <label class="text-gray-600 text-sm">Confirm Password</label>

      <div class="relative">
        <Checkbox
          class="flex justify-end right-0  text-gray-800"
          bind:checked={viewConfirmPassword}
        >
          View
        </Checkbox>
        {#if viewConfirmPassword}
          <input
            on:input={(e) => {
              data.confirmPassword = e.target.value;
              onInputConfirmPass("confirmPassword");
            }}
            type="text"
            class="w-full p-3 mt-2 border rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
            placeholder="Confirm Password"
            bind:value={data.confirmPassword}
          />
        {:else}
          <input
            on:input={(e) => {
              data.confirmPassword = e.target.value;
              onInputConfirmPass("confirmPassword");
            }}
            type="password"
            class="w-full p-3 mt-2 border rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
            placeholder="Confirm Password"
            bind:value={data.confirmPassword}
          />
        {/if}
        {#if errors.confirmPassword}
          <span class="text-red-500 text-sm mt-1">{errors.confirmPassword}</span
          >
        {/if}
      </div>
    </div>

    <!-- Change Password Button -->
    <div class="flex justify-center mt-6 p-2">
      <button
        class="bg-purple-600 text-white py-3 px-6 rounded-lg hover:bg-purple-700 focus:ring-4 focus:ring-purple-300 transition-colors"
        on:click={changePassword}
      >
        Change Password
      </button>
    </div>
  </div>
</div>

{#if alertMsg}
  <AlertMsg {alertMsg} />
{/if}
