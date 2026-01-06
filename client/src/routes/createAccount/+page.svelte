<script>
  import { Button, Checkbox, Card, Avatar } from "flowbite-svelte";
  import { Input, Helper } from "flowbite-svelte";
  import { Alert } from "flowbite-svelte";
  import { InfoCircleSolid } from "flowbite-svelte-icons";
  import passwordVerificationSuite from "$lib/validate/passwordVerification";
  import AlertMsg from "$lib/forgotPassword/AlertMsg.svelte";
  import { authApi } from "$api/authApi";
  import { goto } from "$app/navigation";
  import { registrationInfo } from "$appstore/store";

  let res = passwordVerificationSuite.get();

  let viewPassword = false;
  let viewConfirmPassword = false;

  let alertMsg = "";

  let data = {
    password: "",
    confirmPassword: "",
  };
  let errors = {
    password: "",
    confirmPassword: "",
  };

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

  const handleSubmit = async () => {
    console.log("handleSubmit called");
    res = passwordVerificationSuite(data, "submit");

    console.log("handleSubmit.errors", res.errors);
    const keys = Object.keys(errors);

    keys.forEach((key) => {
      errors[key] = "";
    });

    res.errors.forEach((e) => {
      errors[e.fieldName] = e.message;
    });
    if (res.errors.length > 0) {
      alertMsg = "Please attend to errors";
      return;
    }
    errors = errors;
  };

  const verifyApplicant = async () => {
    console.log("verifyApplicantAndSendOTP");
    handleSubmit();
    if (res.errors.length) return;
    const { name, mobile, password } = data;
    console.log("name is ,", name);
    console.log("$registrationInfo: ", $registrationInfo);

    const { error, errorMsg, user, mobileConfirmationCode } =
      await authApi.verifyApplicant({
        name: $registrationInfo.name,
        mobile: $registrationInfo.mobile,
        password: data.password,
        mobileConfirmationCode: $registrationInfo.mobileConfirmationCode,
      });
    if (error) {
      alertMsg = errorMsg;
      console.log("error: ", error);
      console.log("errMsg: ", errorMsg);
      console.log("alertMsg: ", alertMsg);
      console.log("mobileconfirmationcode: ", mobileConfirmationCode);
      return;
    }

    console.log("createAccountInfo from stores: ", $registrationInfo);
    goto("/termloan/successPage");
  };
</script>

<!-- {JSON.stringify(registrationInfo)} -->
<div class="flex justify-center items-center mt-8 md:mt-20">
  <div class="flex justify-center items-center mx-auto">
    <div
      class="bg-white md:p-10 p-5 rounded-lg shadow-lg border-b-4 border-purple-500"
    >
      <div class="flex border-b py-3 gap-3 font-semibold">
        <div class="text-2xl">Create Your Account--</div>
      </div>

      <div class="grid gap-3 mt-5">
        <h1 class="text-gray-500 text-sm font-medium">Your Username is</h1>
        <div
          class="flex gap-2 p-2 md:w-96 w-full rounded-md text-xl font-medium bg-gray-200"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke-width="1.5"
            stroke="currentColor"
            class="size-7"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M9 12.75 11.25 15 15 9.75M21 12c0 1.268-.63 2.39-1.593 3.068a3.745 3.745 0 0 1-1.043 3.296 3.745 3.745 0 0 1-3.296 1.043A3.745 3.745 0 0 1 12 21c-1.268 0-2.39-.63-3.068-1.593a3.746 3.746 0 0 1-3.296-1.043 3.745 3.745 0 0 1-1.043-3.296A3.745 3.745 0 0 1 3 12c0-1.268.63-2.39 1.593-3.068a3.745 3.745 0 0 1 1.043-3.296 3.746 3.746 0 0 1 3.296-1.043A3.746 3.746 0 0 1 12 3c1.268 0 2.39.63 3.068 1.593a3.746 3.746 0 0 1 3.296 1.043 3.746 3.746 0 0 1 1.043 3.296A3.745 3.745 0 0 1 21 12Z"
            />
          </svg>
          <span>{$registrationInfo.mobile}</span>
        </div>
      </div>

      <div class="mt-5 font-semibold text-gray-600">Create Your Password</div>

      <div class="mt-5">
        <!-- <input
          class="py-3 px-2 w-96 rounded-md border border-1 border-gray-300 text-xs bg-gray-50"
          placeholder="Password"
          type="password"
        /> -->
        <div class="relative pb-4">
          <Checkbox class="absolute right-0 -top-6 " bind:checked={viewPassword}
            >View</Checkbox
          >
          {#if viewPassword}
            <Input
              on:input={() => {
                handleChange("password");
              }}
              style="outlined"
              id="password"
              name="password"
              type="text"
              label="Password"
              placeholder="Password"
              bind:value={data.password}
            />
          {:else}
            <Input
              on:input={() => {
                handleChange("password");
              }}
              style="outlined"
              id="password"
              name="password"
              type="password"
              label="Password"
              placeholder="Password"
              bind:value={data.password}
            />
          {/if}
          {#if errors.password}
            <Helper color="red" class="absolute">
              {errors.password}
            </Helper>
          {/if}
        </div>
      </div>
      <div class="mt-5">
        <div class="relative pb-4">
          <Checkbox
            class="absolute right-0 -top-6"
            bind:checked={viewConfirmPassword}>View</Checkbox
          >
          {#if viewConfirmPassword}
            <Input
              on:input={() => {
                handleChange("confirmPassword");
              }}
              style="outlined"
              id="floating_outlined"
              name="floating_outlined"
              type="text"
              label="Confirm Password"
              placeholder="Confirm Password"
              bind:value={data.confirmPassword}
            />
          {:else}
            <Input
              on:input={() => {
                handleChange("confirmPassword");
              }}
              style="outlined"
              id="floating_outlined"
              name="floating_outlined"
              type="password"
              label="Confirm Password"
              placeholder="Confirm Password"
              bind:value={data.confirmPassword}
            />
          {/if}
          {#if errors.confirmPassword && data.confirmPassword!=data.password}
            <Helper color="red" class="absolute">
              {errors.confirmPassword}
            </Helper>
          {/if}
        </div>
      </div>

      <div
        class="mt-5 bg-purple-700 py-2 px-3 w-fit rounded-md border border-1 border-gray-400 text-center font-medium text-white"
      >
        <!-- <a href="\successPage"> Create Account</a> -->
        <button on:click={verifyApplicant}>Create Account</button>
      </div>
      {#if alertMsg}
        <AlertMsg {alertMsg} />
      {/if}
    </div>

    <!-- Submit button -->
  </div>
</div>
