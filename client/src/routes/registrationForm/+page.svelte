<script>
  import { authApi } from "$api/authApi";
  import { registrationInfo } from "$appstore/store";

  import { Alert, Helper } from "flowbite-svelte";
  import { goto } from "$app/navigation";
  import verifyMobileSuit from "$lib/validate/verifyMobileSuit";
  import AlertMsg from "$lib/forgotPassword/AlertMsg.svelte";
  let res = verifyMobileSuit.get();
  let alertMsg = "";
  import { onMount } from "svelte";
  // import { registrationInfo } from "../../store/store";

  onMount(() => {
    $registrationInfo.name = "";
    $registrationInfo.mobile = "";
    $registrationInfo.mobileVerificationId = "";
    $registrationInfo.mobileConfirmationCode = "";
  });

  const verifyApplicantAndSendOTP = async () => {
    console.log("verifyApplicantAndSendOTP");
    onSubmit();
    if (res.errors.length) return;
    const { name, mobile } = data;
    const { error, errorMsg, mobileVerificationId } =
      await authApi.verifyApplicantAndSendOtp({ name, mobile });
    if (error) {
      alertMsg = errorMsg;
      console.log("error: ", error);
      console.log("errMsg: ", errorMsg);
      console.log("alertMsg: ", alertMsg);
      console.log("mobileVerificationId: ", mobileVerificationId);
      return;
    }
    $registrationInfo.name = name;
    $registrationInfo.mobile = mobile;
    $registrationInfo.mobileVerificationId = mobileVerificationId;

    console.log("resitrationInfo from stores: ", $registrationInfo);
    goto("/termloan/verifyMobileNumber");
  };

  let data = {
    name: "",
    mobile: "",
  };
  let errors = {
    name: "",
    mobile: "",
  };

  const onInput = (fieldName) => {
    console.log("handleChange called for :", fieldName);
    res = verifyMobileSuit(data, fieldName);

    console.log("res.formErrors", res.errors);
    const keys = Object.keys(errors);

    keys.forEach((key) => {
      errors[key] = "";
    });
    console.log("errors: ", res.errors);
    console.log("data:", data);
    res.errors.forEach((e) => {
      errors[e.fieldName] = e.message;
    });
  };

  const onSubmit = (fieldName) => {
    console.log("handleChange called for :", "submit");
    res = verifyMobileSuit(data, "submit");

    console.log("res.formErrors", res.errors);
    const keys = Object.keys(errors);

    keys.forEach((key) => {
      errors[key] = "";
    });

    console.log("errors: ", res.errors);
    console.log("data:", data);
    res.errors.forEach((e) => {
      errors[e.fieldName] = e.message;
    });
    if (res.errors.length > 0) {
      alertMsg = "Please Attend To Errors";
      return;
    }
  };

  // Function to trigger login on 'Enter' key press
  const handleKeyPress = (event) => {
    if (event.key === "Enter") {
      verifyApplicantAndSendOTP();
    }
  };
</script>

<div class="p-6 mt-6 flex justify-center items-center lg:px-0">
  <div
    class="bg-white p-6 lg:p-10 rounded-lg shadow-lg border-b-4 border-purple-700 w-full max-w-lg"
  >
    <div class="flex border-b py-3 gap-3 font-semibold justify-center">
      <div class="text-lg lg:text-3xl font-bold">Verify Your Mobile Number</div>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        stroke-width="1.5"
        stroke="currentColor"
        class="w-6 h-6 lg:w-8 lg:h-8"
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 0 0 2.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 0 1-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 0 0-1.091-.852H4.5A2.25 2.25 0 0 0 2.25 4.5v2.25Z"
        />
      </svg>
    </div>

    <div class="grid gap-1 mt-5">
      <h1 class="text-gray-600 text-sm lg:text-base font-semibold">
        Full Name
      </h1>
      <input
        class="py-2 lg:py-3 px-2 w-full lg:w-96 rounded-md border border-gray-300 text-xs lg:text-sm bg-gray-50"
        placeholder="Enter full name"
        bind:value={data.name}
        on:input={() => {
          onInput("name");
        }}
        type="text"
        on:keypress={handleKeyPress}
      />
    </div>
    {#if errors["name"]}
      <Helper color="red" class="absolute">
        {errors.name}
      </Helper>
    {/if}
    <div class="grid gap-1 mt-5">
      <h1 class="text-gray-600 text-sm lg:text-base font-medium">Mobile no.</h1>
      <input
        class="py-2 lg:py-3 px-2 w-full lg:w-96 rounded-md border border-gray-300 text-xs lg:text-sm bg-gray-50"
        type="text"
        placeholder="Enter Mobile No."
        bind:value={data.mobile}
        on:input={() => {
          onInput("mobile");
        }}
        maxlength="10"
        on:keypress={handleKeyPress}
      />
    </div>

    {#if errors["mobile"]}
      <Helper color="red" class="absolute">
        {errors.mobile}
      </Helper>
    {/if}

    <div class="mt-5 w-full flex justify-center">
      <button
        class="bg-purple-700 hover:bg-purple-500 px-4 py-2 rounded-lg text-white font-medium"
        on:click={verifyApplicantAndSendOTP}
      >
        Send Verification Code
      </button>
    </div>
    <div class="mt-5 text-sm text-gray-500 text-center">
      Already have an account?
      <a href="/termloan/LogInForm" class="text-purple-700 hover:underline">Login</a>
    </div>
    <div class="flex justify-center items-center mt-4">
      {#if alertMsg}
        <AlertMsg {alertMsg} color="red" class="flex">
          <svg
            class="w-6 h-6 text-red-800 dark:text-white"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="currentColor"
            viewBox="0 0 20 20"
          >
            <path
              d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5Zm3.707 11.793a1 1 0 1 1-1.414 1.414L10 11.414l-2.293 2.293a1 1 0 0 1-1.414-1.414L8.586 10 6.293 7.707a1 1 0 0 1 1.414-1.414L10 8.586l2.293-2.293a1 1 0 0 1 1.414 1.414L11.414 10l2.293 2.293Z"
            />
          </svg>
          {alertMsg}
        </AlertMsg>
      {/if}
    </div>
  </div>
</div>
