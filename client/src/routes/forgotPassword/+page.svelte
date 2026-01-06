<script>
  import { onDestroy } from "svelte";
  import ChangePassword from "$lib/forgotPassword/ChangePassword.svelte";
  import AlertMsg from "$lib/forgotPassword/AlertMsg.svelte";
  import VerifyOtp from "$lib/forgotPassword/VerifyOtp.svelte";
  import OtpNotSend from "$lib/forgotPassword/OTP_Not_Send.svelte";
  import { authApi } from "$api/authApi";
  import sendOtpSuite from "$lib/validate/sendOtpSuit";
  import verifyOtpSuit from "$lib/validate/verifyOtpSuit";
  import confirmPasswordSuit from "$lib/validate/confirmPasswordSuit";
  import { goto } from "$app/navigation";
  import SuccessMessage from "$lib/forgotPassword/SuccessMessage.svelte";
    import { json } from "@sveltejs/kit";

  let resOtp = sendOtpSuite.get();
  let resenterOtp = verifyOtpSuit.get();
  let resConfirmPassword = confirmPasswordSuit.get();

  let verifyOtpData = {
    otp: "",
  };
  let verifyOtpErrors = {
    otp: "",
  };

  let otpData = {
    mobileNumber: "",
  };
  let otpErrors = {
    mobileNumber: "",
  };

  let confirmPasswordData = {
    password: "",
    confirmPassword: "",
  };
  let confirmPasswordErrors = {
    password: "",
    confirmPassword: "",
  };

  const onInputConfirmPass = (fieldName) => {
    // Trim the mobile input field
    if (fieldName === "password") {
      confirmPasswordData.password = confirmPasswordData.password.trim(); // Remove any surrounding spaces
    }
    if (fieldName === "confirmPassword") {
      confirmPasswordData.confirmPassword =
        confirmPasswordData.confirmPassword.trim(); // Remove any surrounding spaces
    }

    resConfirmPassword = confirmPasswordSuit(confirmPasswordData, fieldName);
    const keys = Object.keys(confirmPasswordErrors);
    keys.forEach((key) => {
      confirmPasswordErrors[key] = "";
    });

    resConfirmPassword.errors.forEach((e) => {
      confirmPasswordErrors[e.fieldName] = e.message;
    });
  };

  const onInput = (fieldName) => {
    // Trim the mobile input field
    if (fieldName === "mobileNumber") {
      otpData.mobileNumber = otpData.mobileNumber.trim(); // Remove any surrounding spaces
    }

    resOtp = sendOtpSuite(otpData, fieldName);
    const keys = Object.keys(otpErrors);
    keys.forEach((key) => {
      otpErrors[key] = "";
    });

    resOtp.errors.forEach((e) => {
      otpErrors[e.fieldName] = e.message;
    });
  };

  const onInputOTP = (fieldName) => {
    if (fieldName === "otp") {
      verifyOtpData.otp = verifyOtpData.otp.trim(); // Remove any surrounding spaces
    }
    resenterOtp = verifyOtpSuit(verifyOtpData, fieldName);

    const keys = Object.keys(verifyOtpErrors);
    keys.forEach((key) => {
      verifyOtpErrors[key] = "";
    });
    resenterOtp.errors.forEach((e) => {
      verifyOtpErrors[e.fieldName] = e.message;
    });
  };

  let mobileNumber = "";
  let otp = "";
  let uid = "";
  let currentState = "OTP-NOT-SENT";
  let countdown = 0;
  let isCounting = false;
  let alertMsg = "";
  let timer;
  let userId = "";
  // Function to start the countdown timer
  const startTimer = () => {
    countdown = 1 * 60; // 15 minutes in seconds
    isCounting = true;

    timer = setInterval(() => {
      if (countdown > 0) {
        countdown--;
      } else {
        clearInterval(timer);
        isCounting = false;
        currentState = "OTP-NOT-SENT";
      }
    }, 1000);
  };

  // Function to format the time (MM:SS)

  // Handle sending OTP and start the countdown timer
  const onSendOTP = async () => {
    alertMsg = "";
    resOtp = sendOtpSuite(otpData, "submit");
    const keys = Object.keys(otpErrors);
    keys.forEach((key) => {
      otpErrors[key] = "";
    });

    resOtp.errors.forEach((e) => {
      otpErrors[e.fieldName] = e.message;
    });
    if (resOtp.errors.length > 0) {
      alertMsg = "Please attend to errors";
      return;
    }
    console.log("otpErrors is: ", resOtp.errors);
    let name;
    try {
      {
        const {
          error,
          errorMsg,
          userId: lUserId,
          name:lname
        } = await authApi.getUserId({ mobile: otpData.mobileNumber });
        if (error) {
          alertMsg = errorMsg;
          return;
        }
        userId = lUserId;
        name=lname
      }
      currentState = "OTP-SENT";

      const params = { mobileNumber: otpData.mobileNumber,name };

      let url = `/termloan/api/sendOTP`;
      let response = await fetch(url.toString(), {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(params),
      });
      const { error, errorMsg, uid: luid } = await response.json();
      if (error) {
        alertMsg = errorMsg;
        return;
      }
      console.log("error: ", error);
      console.log("errorMsg: ", errorMsg);
      console.log("uid: ", luid);
      uid = luid;
      startTimer();
    } catch (e) {}
  };
  const verifyOTP = async () => {
    alertMsg = "";
    resenterOtp = verifyOtpSuit(verifyOtpData, "submit");
    const keys = Object.keys(verifyOtpErrors);
    keys.forEach((key) => {
      verifyOtpErrors[key] = "";
    });

    resenterOtp.errors.forEach((e) => {
      verifyOtpErrors[e.fieldName] = e.message;
    });
    if (resenterOtp.errors.length > 0) {
      alertMsg = "Please attend to errors";
      return;
    }

    try {
      const response = await fetch("/termloan/api/verifyOTP", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          otp: verifyOtpData.otp,
          uid,
          mobile: mobileNumber,
        }),
      });
      const { error, errorMsg } = await response.json();
      if (error) {
        alertMsg = errorMsg;
        return;
      }
      currentState = "OTP-VERIFIED";

      console.log("error: ", error);
      console.log("errorMsg: ", errorMsg);
    } catch (e) {}
  };
 
  const onNewPassword = async (e) => {
    try {
      alertMsg = "";
      resConfirmPassword = confirmPasswordSuit(confirmPasswordData, "submit");
      const keys = Object.keys(confirmPasswordErrors);
      keys.forEach((key) => {
        confirmPasswordErrors[key] = "";
      });

      resConfirmPassword.errors.forEach((e) => {
        confirmPasswordErrors[e.fieldName] = e.message;
      });
      if (resConfirmPassword.errors.length > 0) {
        alertMsg = "Please attend to errors";
        return;
      }

      const { password } = e.detail;

      // Call the API to change the password
      const { error, errorMsg } = await authApi.changePassword({
        mobile: mobileNumber,
        uid,
        password: confirmPasswordData.password,
        userId,
      });

      // Log error information if present
      if (error) {
        console.error("API error: ", errorMsg);
        // You can also add any logic here for handling the error,
        // like showing an error message to the user.
      } else {
        console.log("Password changed successfully");
        // Redirect to success page or show success message here
      }
      currentState = "SUCCESS";
      //   goto("/");
    } catch (err) {
      // Handle any other errors that might occur during the API call
      console.error("An unexpected error occurred: ", err);
      // Optionally, display a user-friendly error message here.
    }
  };

  // Clean up the timer when the component is destroyed
  onDestroy(() => {
    if (timer) {
      clearInterval(timer);
    }
  });
</script>

{#if currentState == "OTP-NOT-SENT"}
  <div class="max-w-md mx-auto p-6 bg-white shadow-lg rounded-lg mt-12">
    <div class="flex justify-center border-b pb-4 mb-6">
      <h2 class="text-3xl font-semibold text-gray-700">Change Password</h2>
    </div>

    <!-- Mobile Input -->
    <!-- <OtpNotSend bind:mobileNumber bind:countdown {onSendOTP} bind:isCounting /> -->
    <OtpNotSend
      bind:data={otpData}
      bind:errors={otpErrors}
      bind:countdown
      {alertMsg}
      {onInput}
      {onSendOTP}
      bind:isCounting
    />
  </div>
{:else if currentState == "OTP-SENT"}
  <div class="max-w-md mx-auto p-6 bg-white shadow-lg rounded-lg mt-12">
    <div class="flex justify-center border-b pb-4 mb-6">
      <h2 class="text-3xl font-semibold text-gray-700">Change Password</h2>
    </div>

    <VerifyOtp
      bind:data={verifyOtpData}
      bind:errors={verifyOtpErrors}
      {onInputOTP}
      {verifyOTP}
      {alertMsg}
      bind:countdown
    />
  </div>
{:else if currentState == "OTP-VERIFIED"}
  <div class="max-w-md mx-auto p-6 bg-white shadow-lg rounded-lg mt-12">
    <div class="flex justify-center border-b pb-4 mb-6">
      <h2 class="text-3xl font-semibold text-gray-700">Change Password</h2>
    </div>
    <ChangePassword
      bind:data={confirmPasswordData}
      bind:errors={confirmPasswordErrors}
      {onInputConfirmPass}
      {alertMsg}
      mobile={otpData.mobileNumber}
      on:newPassword={onNewPassword}
    ></ChangePassword>
  </div>
{:else if currentState == "SUCCESS"}
  <SuccessMessage />
{/if}

<!-- {#if alertMsg}
  <AlertMsg {alertMsg} />
{/if} -->
