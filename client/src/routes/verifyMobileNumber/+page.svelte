<script>
  import { authApi } from "$api/authApi";
  import { registrationInfo } from "$appstore/store";

  import { Alert, Helper } from "flowbite-svelte";
  import { goto } from "$app/navigation";
  import mobileVerificationSuite from "$lib/validate/otpVerification.js";
  import AlertMsg from "$lib/forgotPassword/AlertMsg.svelte";
    import { DivideCircleIcon } from "lucide-svelte";
  let res = mobileVerificationSuite.get();
  let alertMsg = "";
  let verificationCodeSixDigitsEntered = false;
  let showNotification = false;

  let data = {
    otp: "",
  };
  let errors = {
    otp: "",
  };

  const handleChange = (fieldName, e) => {
    data[fieldName] = e.target.value;
    console.log(
      "handleChange called for :",
      fieldName,
      "length is: ",
      data[fieldName].length
    );
    res = mobileVerificationSuite(data, fieldName);

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

  const handleSubmit = async () => {
    console.log("handleSubmit called");
    res = mobileVerificationSuite(data, "submit");

    console.log("emailVerificationResult.errors", res.errors);
    const keys = Object.keys(errors);

    keys.forEach((key) => {
      errors[key] = "";
    });

    res.errors.forEach((e) => {
      errors[e.fieldName] = e.message;
    });

    errors = errors;
    if (res.errors.length > 0) {
      alertMsg = "Please attend to errors";
      return;
    }
  };
  const verifyOtp = async () => {
    handleSubmit();
    if (res.errors.length) {
      return;
    }

    const { error, errorMsg, mobileConfirmationId } = await authApi.verifyOtp({
      mobileVerificationId: $registrationInfo.mobileVerificationId,
      otp: data.otp,
      mobileNumber: $registrationInfo.mobile,
    });
    if (error) {
      alertMsg = errorMsg;
      return;
    }
    $registrationInfo.mobileConfirmationCode = mobileConfirmationId;
    goto("/termloan/createAccount");
  };
  const verifyApplicantAndSendOTP = async () => {

    console.log("verifyApplicantAndSendOTP");
    const{name,mobile}=$registrationInfo
    if (res.errors.length) return;
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
    sendOtp();
  };
  function sendOtp() {
    // Simulate OTP sending logic

    // Show the notification
    showNotification = true;

    // Hide the notification after 3 seconds
    setTimeout(() => {
      showNotification = false;
    }, 3000);
  }
</script>
<!-- <pre>{JSON.stringify($registrationInfo,2,null)}</pre> -->

<div class="flex justify-center items-center mt-8 md:mt-20 mx-5 md:mx-0">
  <div
    class="flex justify-center items-center w-full max-w-md lg:max-w-lg mx-auto"
  >
    <div
      class="bg-white p-6 sm:p-8 lg:p-10 rounded-lg shadow-lg border-b-4 border-purple-500 w-full"
    >
      <!-- OTP title and icon -->
      <div class="flex justify-center items-center gap-2 mb-4">
        <div class="text-2xl text-center font-semibold">Enter OTP</div>
        <img src="/termloan/otp.svg" class="w-6" alt="OTP Icon" />
      </div>

      <!-- Information text -->
      <div class="text-sm text-center my-4 text-gray-500 font-semibold">
        A 6 digit code has been sent to <span class="text-purple-700"
          >XXXXXX{$registrationInfo?.mobile.slice(6)}</span
        >
      </div>

      <!-- OTP input centered -->
      <div class="flex justify-center mt-3">
        <input
          on:input={(e) => handleChange("otp", e)}
          bind:value={data.otp}
          class="py-3 px-2 w-full sm:w-72 lg:w-96 rounded-md border border-gray-400 text-xs bg-gray-50 mx-auto"
          placeholder="Enter Verification Code"
          type="text"
        />
      </div>

      <!-- Error message -->
      {#if errors.otp}
        <Helper color="red" class="absolute">
          {errors.otp}
        </Helper>
      {/if}

      <!-- Resend link -->
      <div  class="mt-5 text-sm text-center font-semibold text-gray-500">
        Didn't receive the code? <button on:click={()=>verifyApplicantAndSendOTP()} class="text-purple-700"
          >Click to resend</button
        >
      </div>

      <!-- Verify button -->
      <div class="mt-4 flex justify-center">
        <button
          class="bg-purple-500 p-2 px-6 rounded-md text-white"
          on:click={verifyOtp}
        >
          Verify & Next
        </button>
      </div>
      {#if showNotification}
  <div class="mt-5 bg-green-500 text-white p-4 rounded-lg shadow-lg">
    OTP sent successfully!
  </div>
{/if}

      <!-- Alert message (optional) -->
      <div class="flex justify-center items-center mt-4">
        {#if alertMsg}
          <AlertMsg {alertMsg} color="red" class="flex">
            <svg
              class="w-6 h-6 text-red-800"
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
</div>
