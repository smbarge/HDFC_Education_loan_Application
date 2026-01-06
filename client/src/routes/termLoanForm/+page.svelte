<script>
  let gender = "";
  let marital = "";
  let hasGivenSurety = "";
  let suretyDetails = "";

  let currentStreet = "";
  let currentState = "";
  let currentDistrict = "";
  let currentCity = "";
  let currentPinCode = "";

  let permanentStreet = "";
  let permanentState = "";
  let permanentCity = "";
  let permanentDistrict = "";
  let permanentPinCode = "";

  let isSameAddress = false;

  // This will handle the conditional display of the input field
  //   $: showSuretyDetails = hasGivenSurety === "yes";
  function handleSuretyChange(value) {
    hasGivenSurety = value;
  }

  function handleAddressYes() {
    isSameAddress = true;
    permanentStreet = currentStreet;
    permanentState = currentState;
    permanentCity = currentCity;
    permanentDistrict = currentDistrict;
    permanentPinCode = currentPinCode;
  }

  function handleAddressNo() {
    isSameAddress = false;
    permanentStreet = "";
    permanentState = "";
    permanentCity = "";
    permanentDistrict = "";
    permanentPinCode = "";
  }
</script>

<div class="min-h-screen mx-10 my-10 space-y-7">
  <div
    class="bg-deepPurple-100 border border-deepPurple-400 rounded-md shadow-md shadow-deepPurple-200 flex justify-start items-center mb-5"
  >
    <h1 class="text-xl font-semibold font-roboto text-gray-700 py-2 px-6">
      Term Loan : Enter Applicant Details
    </h1>
  </div>
  <div class="border border-deepPurple-300 rounded-lg shadow-lg p-5 grid gap-6">
    <div
      class="flex justify-start items-center gap-4 pb-4 border-b-4 border-deepPurple-100 px-7"
    >
      <img src="/termloan/applicant.png" alt="applicant" class="size-10" />
      <h2 class="text-xl font-semibold font-roboto text-gray-600">
        Add Applicant Details
      </h2>
    </div>
    <div class="grid grid-cols-12 gap-5">
      <div class="col-span-12 space-y-5">
        <div class="grid grid-cols-12 gap-5">
          <div class="col-span-4">
            <label
              for="fullName"
              class="block text-sm font-medium text-gray-700"
              >Applicant's Full Name</label
            >
            <div class="mt-1 relative">
              <div
                class="absolute inset-y-0 left-0 px-4 flex items-center pointer-events-none border-r border-gray-300"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 -960 960 960"
                  class="size-7 fill-gray-500"
                >
                  <path
                    d="M480-480q-66 0-113-47t-47-113q0-66 47-113t113-47q66 0 113 47t47 113q0 66-47 113t-113 47ZM160-160v-112q0-34 17.5-62.5T224-378q62-31 126-46.5T480-440q66 0 130 15.5T736-378q29 15 46.5 43.5T800-272v112H160Z"
                  />
                </svg>
              </div>
              <input
                type="text"
                name="fullName"
                id="fullName"
                class="block w-full pl-20 pr-3 py-3 border border-gray-300 placeholder-gray-400 placeholder:font-robotoMono focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                placeholder="Enter full name..."
              />
            </div>
          </div>
          <div class="col-span-2">
            <label for="dob" class="block text-sm font-medium text-gray-700"
              >Date of Birth</label
            >
            <div class="mt-1 relative">
              <div
                class="absolute inset-y-0 left-0 px-4 flex items-center pointer-events-none border-r border-gray-300"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 -960 960 960"
                  class="size-6 fill-gray-500"
                >
                  <path
                    d="M480-400q-17 0-28.5-11.5T440-440q0-17 11.5-28.5T480-480q17 0 28.5 11.5T520-440q0 17-11.5 28.5T480-400Zm-160 0q-17 0-28.5-11.5T280-440q0-17 11.5-28.5T320-480q17 0 28.5 11.5T360-440q0 17-11.5 28.5T320-400Zm320 0q-17 0-28.5-11.5T600-440q0-17 11.5-28.5T640-480q17 0 28.5 11.5T680-440q0 17-11.5 28.5T640-400ZM480-240q-17 0-28.5-11.5T440-280q0-17 11.5-28.5T480-320q17 0 28.5 11.5T520-280q0 17-11.5 28.5T480-240Zm-160 0q-17 0-28.5-11.5T280-280q0-17 11.5-28.5T320-320q17 0 28.5 11.5T360-280q0 17-11.5 28.5T320-240Zm320 0q-17 0-28.5-11.5T600-280q0-17 11.5-28.5T640-320q17 0 28.5 11.5T680-280q0 17-11.5 28.5T640-240ZM200-80q-33 0-56.5-23.5T120-160v-560q0-33 23.5-56.5T200-800h40v-80h80v80h320v-80h80v80h40q33 0 56.5 23.5T840-720v560q0 33-23.5 56.5T760-80H200Zm0-80h560v-400H200v400Z"
                  />
                </svg>
              </div>
              <input
                type="date"
                name="dob"
                id="dob"
                class="block w-full pl-20 pr-3 py-3 border border-gray-300 placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 text-sm"
              />
            </div>
          </div>
          <div class="col-span-2">
            <label for="age" class="block text-sm font-medium text-gray-700"
              >Age</label
            >
            <div class="mt-1 relative">
              <div
                class="absolute inset-y-0 left-0 px-3 flex items-center pointer-events-none border-r border-gray-300"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 -960 960 960"
                  class="size-6 fill-gray-500"
                >
                  <path
                    d="M500-482q29-32 44.5-73t15.5-85q0-44-15.5-85T500-798q60 8 100 53t40 105q0 60-40 105t-100 53Zm220 322v-120q0-36-16-68.5T662-406q51 18 94.5 46.5T800-280v120h-80Zm80-280v-80h-80v-80h80v-80h80v80h80v80h-80v80h-80Zm-480-40q-66 0-113-47t-47-113q0-66 47-113t113-47q66 0 113 47t47 113q0 66-47 113t-113 47ZM0-160v-112q0-34 17.5-62.5T64-378q62-31 126-46.5T320-440q66 0 130 15.5T576-378q29 15 46.5 43.5T640-272v112H0Z"
                  />
                </svg>
              </div>
              <input
                type="number"
                name="age"
                id="age"
                class="block w-full pl-16 pr-3 py-3 border border-gray-300 placeholder-gray-400 placeholder:font-robotoMono focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                placeholder="Enter age..."
              />
            </div>
          </div>
          <div class="col-span-2">
            <label for="number" class="block text-sm font-medium text-gray-700"
              >Mobile Number</label
            >
            <div class="mt-1 relative">
              <div
                class="absolute inset-y-0 left-0 px-3 flex items-center pointer-events-none border-r border-gray-300"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 -960 960 960"
                  class="size-6 fill-gray-500"
                >
                  <path
                    d="M798-120q-125 0-247-54.5T329-329Q229-429 174.5-551T120-798q0-18 12-30t30-12h162q14 0 25 9.5t13 22.5l26 140q2 16-1 27t-11 19l-97 98q20 37 47.5 71.5T387-386q31 31 65 57.5t72 48.5l94-94q9-9 23.5-13.5T670-390l138 28q14 4 23 14.5t9 23.5v162q0 18-12 30t-30 12Z"
                  />
                </svg>
              </div>
              <input
                type="text"
                name="number"
                id="number"
                class="block w-full pl-16 pr-3 py-3 border border-gray-300 placeholder-gray-400 placeholder:font-robotoMono focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                placeholder="Enter mobile number..."
              />
            </div>
          </div>
          <div class="col-span-2">
            <label for="email" class="block text-sm font-medium text-gray-700"
              >Email ID</label
            >
            <div class="mt-1 relative">
              <div
                class="absolute inset-y-0 left-0 px-3 flex items-center pointer-events-none border-r border-gray-300"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 -960 960 960"
                  class="size-6 fill-gray-500"
                >
                  <path
                    d="M160-160q-33 0-56.5-23.5T80-240v-480q0-33 23.5-56.5T160-800h640q33 0 56.5 23.5T880-720v480q0 33-23.5 56.5T800-160H160Zm320-280 320-200v-80L480-520 160-720v80l320 200Z"
                  />
                </svg>
              </div>
              <input
                type="text"
                name="email"
                id="email"
                class="block w-full pl-16 pr-3 py-3 border border-gray-300 placeholder:font-robotoMono placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                placeholder="Enter email id..."
              />
            </div>
          </div>
        </div>
        <div class="grid grid-cols-12 justify-start items-center">
          <div class="col-span-6">
            <p class="text-sm font-inter font-semibold text-gray-700">
              Is your current address the same as your permanent address?
            </p>
          </div>
          <div class="col-span-2 flex justify-between items-center gap-5">
            <button
              class={`${isSameAddress == true ? "bg-primary-400 text-white" : "bg-white text-gray-500"} w-full  hover:bg-primary-200 shadow-lg  border border-gray-500 font-bold py-1 px-4`}
              type="button"
              on:click={handleAddressYes}
            >
              Yes
            </button>
            <button
              class={`${isSameAddress == false ? "bg-rose-400 text-white" : "bg-white text-gray-500"} w-full  hover:bg-rose-200 shadow-lg  border border-gray-500 font-bold py-1 px-4`}
              type="button"
              on:click={handleAddressNo}
            >
              No
            </button>
          </div>
        </div>
        <div class="grid grid-cols-12 gap-5">
          <div
            class="col-span-6 grid grid-cols-12 gap-5 border border-gray-300 rounded-lg shadow-lg p-5"
          >
            <label
              for="streetAddress1"
              class="col-span-12 block text-xl font-semibold font-inter text-gray-700"
              >Current Address :</label
            >
            <div class="col-span-12">
              <label
                for="streetAddress"
                class="block text-sm font-medium text-gray-700"
                >Current Street Address</label
              >
              <div class="mt-1 relative">
                <div
                  class="absolute inset-y-0 left-0 px-4 flex items-center pointer-events-none border-r border-gray-300"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 -960 960 960"
                    class="size-6 fill-gray-500"
                  >
                    <path
                      d="M160-120v-480l320-240 320 240v480H560v-280H400v280H160Z"
                    />
                  </svg>
                </div>
                <input
                  type="text"
                  id="streetAddress"
                  bind:value={currentStreet}
                  class="block w-full pl-20 pr-3 py-3 placeholder:font-robotoMono border border-gray-300 placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  placeholder="Enter street address ..."
                />
              </div>
            </div>

            <div class="col-span-3">
              <label for="state" class="block text-sm font-medium text-gray-700"
                >State</label
              >
              <div class="mt-1">
                <input
                  type="text"
                  id="state"
                  bind:value={currentState}
                  class="block w-full px-4 py-3 placeholder:font-robotoMono border border-gray-300 placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  placeholder="Enter state..."
                />
              </div>
            </div>
            <div class="col-span-3">
              <label for="city" class="block text-sm font-medium text-gray-700"
                >City</label
              >
              <div class="mt-1">
                <input
                  type="text"
                  id="city"
                  bind:value={currentCity}
                  class="block w-full px-4 py-3 placeholder:font-robotoMono border border-gray-300 placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  placeholder="Enter city..."
                />
              </div>
            </div>
            <div class="col-span-3">
              <label
                for="district"
                class="block text-sm font-medium text-gray-700">District</label
              >
              <div class="mt-1">
                <input
                  type="text"
                  id="district"
                  bind:value={currentDistrict}
                  class="block w-full px-4 py-3 placeholder:font-robotoMono border border-gray-300 placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  placeholder="Enter district..."
                />
              </div>
            </div>
            <div class="col-span-3">
              <label
                for="pinCode"
                class="block text-sm font-medium text-gray-700">Pin Code</label
              >
              <div class="mt-1">
                <input
                  type="text"
                  id="pinCode"
                  bind:value={currentPinCode}
                  class="block w-full px-4 py-3 placeholder:font-robotoMono border border-gray-300 placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  placeholder="Enter pincode..."
                />
              </div>
            </div>
          </div>
          <div
            class={` ${isSameAddress == true ? "bg-gray-100" : ""} col-span-6 grid grid-cols-12 gap-5 border border-gray-300 rounded-lg shadow-lg p-5`}
          >
            <label
              for="streetAddress"
              class="col-span-12 block text-xl font-semibold font-inter text-gray-700"
              >Permanent Address :</label
            >
            <div class="col-span-12">
              <label
                for="streetAddress1"
                class="block text-sm font-medium text-gray-700"
                >Permanent Street Address
              </label>
              <div class="mt-1 relative">
                <div
                  class="absolute inset-y-0 left-0 px-4 flex items-center pointer-events-none border-r border-gray-300"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 -960 960 960"
                    class="size-6 fill-gray-500"
                  >
                    <path
                      d="M160-120v-480l320-240 320 240v480H560v-280H400v280H160Z"
                    />
                  </svg>
                </div>
                <input
                  type="text"
                  id="streetAddress"
                  bind:value={permanentStreet}
                  disabled={isSameAddress === true}
                  class="block w-full pl-20 pr-3 py-3 placeholder:font-robotoMono border border-gray-300 placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  placeholder="Enter street address ..."
                />
              </div>
            </div>

            <div class="col-span-3">
              <label for="state" class="block text-sm font-medium text-gray-700"
                >State</label
              >
              <div class="mt-1">
                <input
                  type="text"
                  id="state"
                  bind:value={permanentState}
                  disabled={isSameAddress === true}
                  class="block w-full px-4 py-3 placeholder:font-robotoMono border border-gray-300 placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  placeholder="Enter state..."
                />
              </div>
            </div>
            <div class="col-span-3">
              <label for="city" class="block text-sm font-medium text-gray-700"
                >City</label
              >
              <div class="mt-1">
                <input
                  type="text"
                  id="city"
                  bind:value={permanentCity}
                  disabled={isSameAddress === true}
                  class="block w-full px-4 py-3 placeholder:font-robotoMono border border-gray-300 placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  placeholder="Enter city..."
                />
              </div>
            </div>
            <div class="col-span-3">
              <label
                for="district"
                class="block text-sm font-medium text-gray-700">District</label
              >
              <div class="mt-1">
                <input
                  type="text"
                  id="district"
                  bind:value={permanentDistrict}
                  disabled={isSameAddress === true}
                  class="block w-full px-4 py-3 placeholder:font-robotoMono border border-gray-300 placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  placeholder="Enter district..."
                />
              </div>
            </div>
            <div class="col-span-3">
              <label
                for="pinCode"
                class="block text-sm font-medium text-gray-700">Pin Code</label
              >
              <div class="mt-1">
                <input
                  type="text"
                  id="pinCode"
                  bind:value={permanentPinCode}
                  disabled={isSameAddress === true}
                  class="block w-full px-4 py-3 placeholder:font-robotoMono border border-gray-300 placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  placeholder="Enter pincode..."
                />
              </div>
            </div>
          </div>
        </div>

        <div class="grid grid-cols-2 gap-5 pb-5 border-b-2 border-gray-300">
          <div
            class="col-start-2 col-span-1 flex justify-start items-center gap-2 bg-sky-100 rounded-md shadow-md p-2"
          >
            {#if isSameAddress !== null}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 -960 960 960"
                class="size-5 fill-blue-500"
              >
                <path
                  d="M440-280h80v-240h-80v240Zm40-320q17 0 28.5-11.5T520-640q0-17-11.5-28.5T480-680q-17 0-28.5 11.5T440-640q0 17 11.5 28.5T480-600Zm0 520q-83 0-156-31.5T197-197q-54-54-85.5-127T80-480q0-83 31.5-156T197-763q54-54 127-85.5T480-880q83 0 156 31.5T763-763q54 54 85.5 127T880-480q0 83-31.5 156T763-197q-54 54-127 85.5T480-80Zm0-80q134 0 227-93t93-227q0-134-93-227t-227-93q-134 0-227 93t-93 227q0 134 93 227t227 93Zm0-320Z"
                />
              </svg>
              <p class="text-sm font-inter font-semibold text-blue-700">
                {isSameAddress
                  ? "Your current address is the same as your permanent address."
                  : "Your current address is not the same as your permanent address."}
              </p>
            {/if}
          </div>
        </div>

        <div class="grid grid-cols-3 gap-5">
          <div class="col-span-1 px-2">
            <h1 class="block text-sm font-medium text-gray-700 capitalize">
              Gender
            </h1>
            <div class="mt-2.5 flex">
              <label class="inline-flex items-center cursor-pointer">
                <input
                  type="radio"
                  name="gender"
                  value="male"
                  bind:group={gender}
                  class="form-radio size-4"
                />
                <span class="ml-2">Male</span>
              </label>
              <label class="inline-flex items-center ml-6 cursor-pointer">
                <input
                  type="radio"
                  name="gender"
                  value="female"
                  bind:group={gender}
                  class="form-radio size-4"
                />
                <span class="ml-2">Female</span>
              </label>
              <label class="inline-flex items-center ml-6 cursor-pointer">
                <input
                  type="radio"
                  name="gender"
                  value="other"
                  bind:group={gender}
                  class="form-radio size-4"
                />
                <span class="ml-2">Other</span>
              </label>
            </div>
          </div>
          <div class="col-span-1">
            <h1 class="block text-sm font-medium text-gray-700 capitalize">
              marital status
            </h1>
            <div class="mt-2.5 flex">
              <label class="inline-flex items-center cursor-pointer">
                <input
                  type="radio"
                  name="marital"
                  value="male"
                  bind:group={marital}
                  class="form-radio size-4"
                />
                <span class="ml-2">Married</span>
              </label>
              <label class="inline-flex items-center ml-6 cursor-pointer">
                <input
                  type="radio"
                  name="marital"
                  value="female"
                  bind:group={marital}
                  class="form-radio size-4"
                />
                <span class="ml-2">Unmarried</span>
              </label>
            </div>
          </div>
          <div class="col-span-1">
            <label for="caste" class="block text-sm font-medium text-gray-700"
              >Caste</label
            >
            <div class="mt-1">
              <input
                type="text"
                name="caste"
                id="caste"
                class="block w-full px-4 py-3 border border-gray-300 placeholder:font-robotoMono placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                placeholder="Enter caste..."
              />
            </div>
          </div>

          <div class="col-span-1">
            <label
              for="educational"
              class="block capitalize text-sm font-medium text-gray-700"
              >Educational qualifications
            </label>
            <div class="mt-1 relative">
              <div
                class="absolute inset-y-0 left-0 px-4 flex items-center pointer-events-none border-r border-gray-300"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 -960 960 960"
                  class="size-7 fill-gray-500"
                >
                  <path
                    d="M840-280v-276L480-360 40-600l440-240 440 240v320h-80ZM480-120 200-272v-200l280 152 280-152v200L480-120Z"
                  />
                </svg>
              </div>
              <input
                type="text"
                name="educational"
                id="educational"
                class="block w-full pl-20 pr-3 py-3 border border-gray-300 placeholder:font-robotoMono placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                placeholder="Enter educational qualifications..."
              />
            </div>
          </div>
          <div class="col-span-1">
            <label
              for="occupation"
              class="block capitalize text-sm font-medium text-gray-700"
              >occupation of father/husband
            </label>
            <div class="mt-1 relative">
              <div
                class="absolute inset-y-0 left-0 px-4 flex items-center pointer-events-none border-r border-gray-300"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 -960 960 960"
                  class="size-6 fill-gray-500"
                >
                  <path
                    d="M160-120q-33 0-56.5-23.5T80-200v-440q0-33 23.5-56.5T160-720h160v-80q0-33 23.5-56.5T400-880h160q33 0 56.5 23.5T640-800v80h160q33 0 56.5 23.5T880-640v440q0 33-23.5 56.5T800-120H160Zm240-600h160v-80H400v80Z"
                  />
                </svg>
              </div>
              <input
                type="text"
                name="occupation"
                id="occupation"
                class="block w-full pl-20 pr-3 py-3 border border-gray-300 placeholder:font-robotoMono placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                placeholder="Enter occupation of father/husband..."
              />
            </div>
          </div>

          <div class="col-span-1">
            <label
              for="fullName"
              class="block text-sm font-medium text-gray-700"
              >Annual Income Of Family
            </label>
            <div class="mt-1 relative">
              <div
                class="absolute inset-y-0 left-0 px-4 flex items-center pointer-events-none border-r border-gray-300"
              >
                <svg
                  viewBox="-96 0 512 512"
                  xmlns="http://www.w3.org/2000/svg"
                  class="size-5 fill-gray-500"
                >
                  <g id="SVGRepo_bgCarrier" stroke-width="0"></g><g
                    id="SVGRepo_tracerCarrier"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  >
                  </g>
                  <g id="SVGRepo_iconCarrier">
                    <path
                      d="M308 96c6.627 0 12-5.373 12-12V44c0-6.627-5.373-12-12-12H12C5.373 32 0 37.373 0 44v44.748c0 6.627 5.373 12 12 12h85.28c27.308 0 48.261 9.958 60.97 27.252H12c-6.627 0-12 5.373-12 12v40c0 6.627 5.373 12 12 12h158.757c-6.217 36.086-32.961 58.632-74.757 58.632H12c-6.627 0-12 5.373-12 12v53.012c0 3.349 1.4 6.546 3.861 8.818l165.052 152.356a12.001 12.001 0 0 0 8.139 3.182h82.562c10.924 0 16.166-13.408 8.139-20.818L116.871 319.906c76.499-2.34 131.144-53.395 138.318-127.906H308c6.627 0 12-5.373 12-12v-40c0-6.627-5.373-12-12-12h-58.69c-3.486-11.541-8.28-22.246-14.252-32H308z"
                    >
                    </path>
                  </g>
                </svg>
              </div>
              <input
                type="text"
                name="annual income"
                id="annual income"
                class="block w-full pl-20 pr-3 py-3 border border-gray-300 placeholder:font-robotoMono placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                placeholder="Enter annual income of family..."
              />
            </div>
          </div>
        </div>
        <div
          class="grid grid-cols-6 gap-5 border border-gray-300 rounded-lg shadow-lg p-5"
        >
          <label
            for="streetAddress1"
            class="col-span-6 block text-xl font-semibold font-inter text-gray-700 capitalize"
            >ID proof Info. :</label
          >
          <div class="col-span-2">
            <label
              for="pancard"
              class="block text-sm font-medium text-gray-700 capitalize"
              >pan card number
            </label>
            <div class="mt-1 relative">
              <div
                class="absolute inset-y-0 left-0 px-4 flex items-center pointer-events-none border-r border-gray-300"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 -960 960 960"
                  class="size-7 fill-gray-500"
                >
                  <path
                    d="M560-440h200v-80H560v80Zm0-120h200v-80H560v80ZM200-320h320v-22q0-45-44-71.5T360-440q-72 0-116 26.5T200-342v22Zm160-160q33 0 56.5-23.5T440-560q0-33-23.5-56.5T360-640q-33 0-56.5 23.5T280-560q0 33 23.5 56.5T360-480ZM160-160q-33 0-56.5-23.5T80-240v-480q0-33 23.5-56.5T160-800h640q33 0 56.5 23.5T880-720v480q0 33-23.5 56.5T800-160H160Z"
                  />
                </svg>
              </div>
              <input
                type="text"
                name="pancard"
                id="pancard"
                class="block w-full pl-20 pr-3 py-3 border border-gray-300 placeholder:font-robotoMono placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                placeholder="Enter pan card number..."
              />
            </div>
          </div>
          <div class="col-span-2">
            <label
              for="adharcard"
              class="block text-sm font-medium text-gray-700 capitalize"
              >adhar card number
            </label>
            <div class="mt-1 relative">
              <div
                class="absolute inset-y-0 left-0 px-4 flex items-center pointer-events-none border-r border-gray-300"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 -960 960 960"
                  class="size-7 fill-gray-500"
                >
                  <path
                    d="M560-440h200v-80H560v80Zm0-120h200v-80H560v80ZM200-320h320v-22q0-45-44-71.5T360-440q-72 0-116 26.5T200-342v22Zm160-160q33 0 56.5-23.5T440-560q0-33-23.5-56.5T360-640q-33 0-56.5 23.5T280-560q0 33 23.5 56.5T360-480ZM160-160q-33 0-56.5-23.5T80-240v-480q0-33 23.5-56.5T160-800h640q33 0 56.5 23.5T880-720v480q0 33-23.5 56.5T800-160H160Z"
                  />
                </svg>
              </div>
              <input
                type="text"
                name="adharcard"
                id="adharcard"
                class="block w-full pl-20 pr-3 py-3 border border-gray-300 placeholder:font-robotoMono placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                placeholder="Enter adhar card number..."
              />
            </div>
          </div>
        </div>
        <div class="grid grid-cols-12 justify-start items-center">
          <div class="col-span-6">
            <h1 class="text-sm text-gray-700 font-semibold font-roboto">
              Has the applicant or guarantor previously provided surety for
              anyone else?
            </h1>
          </div>
          <div class="col-span-2 flex items-center gap-5">
            <button
              type="button"
              class={`${
                hasGivenSurety === "yes"
                  ? "bg-primary-400 text-white"
                  : "bg-gray-100 text-gray-500"
              } w-full border border-gray-500 font-bold px-4 py-1`}
              on:click={() => handleSuretyChange("yes")}
            >
              Yes
            </button>
            <button
              type="button"
              class={`${
                hasGivenSurety === "no"
                  ? "bg-rose-400 text-white"
                  : "bg-gray-100 text-gray-500"
              } w-full border border-gray-500 font-bold px-7 py-1`}
              on:click={() => handleSuretyChange("no")}
            >
              No
            </button>

            <!-- <div class="flex items-center mr-4">
              <input
                id="yes"
                name="surety"
                type="radio"
                value="yes"
                bind:group={hasGivenSurety}
                class="size-5 text-indigo-600 focus:ring-indigo-500 border-gray-300"
              />
              <label
                for="yes"
                class="ml-2 block text-lg font-roboto font-semibold text-gray-700"
                >Yes</label
              >
            </div>
            <div class="flex items-center">
              <input
                id="no"
                name="surety"
                type="radio"
                value="no"
                bind:group={hasGivenSurety}
                class="size-5 text-indigo-600 focus:ring-indigo-500 border-gray-300"
              />
              <label
                for="no"
                class="ml-2 block text-lg font-roboto font-semibold text-gray-700"
                >No</label
              >
            </div> -->
          </div>
          {#if hasGivenSurety == "yes"}
            <div class="col-span-12">
              <label
                for="suretyDetails"
                class="block text-sm text-gray-500 font-semibold font-robotoMono"
                >If yes, please provide details:</label
              >
              <textarea
                id="suretyDetails"
                name="suretyDetails"
                rows="4"
                bind:value={suretyDetails}
                class="mt-1 p-3 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 text-sm"
                placeholder="Enter details here..."
              ></textarea>
            </div>
          {/if}
        </div>
        <div class="grid grid-cols-12 justify-start items-center">
          <div class="col-span-6">
            <h1 class="text-sm text-gray-700 font-semibold font-roboto">
              Is the applicant a Divorced/Widowed/Riot victim/Natural calamity
              victim/Disabled person?
            </h1>
          </div>
          <div class="col-span-2 flex items-center gap-5">
            <button
              type="button"
              class="bg-gray-100 text-gray-500 w-full border border-gray-500 font-bold px-4 py-1"
            >
              Yes
            </button>
            <button
              type="button"
              class="bg-gray-100 text-gray-500 w-full border border-gray-500 font-bold px-4 py-1"
            >
              No
            </button>
          </div>
          <!-- <div class="col-span-2 flex items-center">
            <div class="flex items-center mr-4 cursor-pointer">
              <input
                id="yes"
                name="Divorced"
                type="radio"
                value="yes"
                class="size-5 text-indigo-600 focus:ring-indigo-500 border-gray-300"
              />
              <label
                for="yes"
                class="ml-2 block text-lg font-roboto font-semibold text-gray-700"
                >Yes</label
              >
            </div>
            <div class="flex items-center">
              <input
                id="no"
                name="Divorced"
                type="radio"
                value="no"
                class="size-5 text-indigo-600 focus:ring-indigo-500 border-gray-300"
              />
              <label
                for="no"
                class="ml-2 block text-lg font-roboto font-semibold text-gray-700"
                >No</label
              >
            </div>
          </div> -->
        </div>
        <div class="grid grid-cols-12 justify-start items-center">
          <div class="col-span-6">
            <h1 class="text-sm text-gray-700 font-semibold font-roboto">
              Description of the property or any information about LIC/FD.
            </h1>
          </div>
          <div class="col-span-6">
            <input
              type="text"
              id="Name"
              class="block w-full px-4 py-3 border border-gray-300 placeholder:font-robotoMono placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              placeholder="Enter ther information about Property/LIC/FD..."
            />
          </div>
          <!-- <textarea
              id="propertyDetails"
              name="propertyDetails"
              rows="4"
              class="mt-1 p-3 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 text-sm"
              placeholder="Enter details here..."
            ></textarea> -->
        </div>
        <div
          class="grid grid-cols-6 gap-5 border border-gray-300 rounded-lg p-5 shadow-lg"
        >
          <label
            for="streetAddress1"
            class="col-span-6 block text-xl font-semibold font-inter text-gray-700"
            >Business Info. :</label
          >
          <div class="col-span-3">
            <label
              for="bussinessName"
              class="block text-sm font-medium text-gray-700 capitalize"
              >Applicant bussiness name
            </label>
            <div class="mt-1 relative">
              <div
                class="absolute inset-y-0 left-0 px-4 flex items-center pointer-events-none border-r border-gray-300"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 -960 960 960"
                  class="size-7 fill-gray-500"
                >
                  <path
                    d="M40-160v-160q0-34 23.5-57t56.5-23h131q20 0 38 10t29 27q29 39 71.5 61t90.5 22q49 0 91.5-22t70.5-61q13-17 30.5-27t36.5-10h131q34 0 57 23t23 57v160H640v-91q-35 25-75.5 38T480-200q-43 0-84-13.5T320-252v92H40Zm440-160q-38 0-72-17.5T351-386q-17-25-42.5-39.5T253-440q22-37 93-58.5T480-520q63 0 134 21.5t93 58.5q-29 0-55 14.5T609-386q-22 32-56 49t-73 17ZM160-440q-50 0-85-35t-35-85q0-51 35-85.5t85-34.5q51 0 85.5 34.5T280-560q0 50-34.5 85T160-440Zm640 0q-50 0-85-35t-35-85q0-51 35-85.5t85-34.5q51 0 85.5 34.5T920-560q0 50-34.5 85T800-440ZM480-560q-50 0-85-35t-35-85q0-51 35-85.5t85-34.5q51 0 85.5 34.5T600-680q0 50-34.5 85T480-560Z"
                  />
                </svg>
              </div>
              <input
                type="text"
                name="bussinessName"
                id="bussinessName"
                class="block w-full pl-20 pr-3 py-3 border border-gray-300 placeholder:font-robotoMono placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                placeholder="Enter bussiness name..."
              />
            </div>
          </div>
          <div class="col-span-3">
            <label
              for="bussinessdetails"
              class="block text-sm font-medium text-gray-700 capitalize"
              >Applicant bussiness details
            </label>
            <div class="mt-1 relative">
              <div
                class="absolute inset-y-0 left-0 px-4 flex items-center pointer-events-none border-r border-gray-300"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 -960 960 960"
                  class="size-7 fill-gray-500"
                >
                  <path
                    d="M440-280h80v-240h-80v240Zm40-320q17 0 28.5-11.5T520-640q0-17-11.5-28.5T480-680q-17 0-28.5 11.5T440-640q0 17 11.5 28.5T480-600Zm0 520q-83 0-156-31.5T197-197q-54-54-85.5-127T80-480q0-83 31.5-156T197-763q54-54 127-85.5T480-880q83 0 156 31.5T763-763q54 54 85.5 127T880-480q0 83-31.5 156T763-197q-54 54-127 85.5T480-80Z"
                  />
                </svg>
              </div>
              <input
                type="text"
                name="bussinessdetails"
                id="bussinessdetails"
                class="block w-full pl-20 pr-3 py-3 border border-gray-300 placeholder:font-robotoMono placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                placeholder="Enter bussiness details..."
              />
            </div>
          </div>
          <div class="col-span-4">
            <label
              for="businessAddress"
              class="block text-sm font-medium text-gray-700"
              >Business Address
            </label>
            <div class="mt-1 relative">
              <div
                class="absolute inset-y-0 left-0 px-4 flex items-center pointer-events-none border-r border-gray-300"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 -960 960 960"
                  class="size-6 fill-gray-500"
                >
                  <path
                    d="M160-120v-480l320-240 320 240v480H560v-280H400v280H160Z"
                  />
                </svg>
              </div>
              <input
                type="text"
                name="businessAddress"
                id="businessAddress"
                class="block w-full pl-20 pr-3 py-3 border border-gray-300 placeholder:font-robotoMono placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                placeholder="Enter Business Address..."
              />
            </div>
          </div>
          <div class="col-span-2">
            <label
              for="tariffName"
              class="block text-sm font-medium text-gray-700 capitalize"
              >Tariff Name
            </label>
            <div class="mt-1 relative">
              <div
                class="absolute inset-y-0 left-0 px-4 flex items-center pointer-events-none border-r border-gray-300"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 -960 960 960"
                  class="size-7 fill-gray-500"
                >
                  <path
                    d="M80-120v-720h400v160h400v560H80Zm80-80h240v-80H160v80Zm0-160h240v-80H160v80Zm0-160h240v-80H160v80Zm0-160h240v-80H160v80Zm320 480h320v-400H480v400Zm80-240v-80h160v80H560Zm0 160v-80h160v80H560Z"
                  />
                </svg>
              </div>
              <input
                type="text"
                name="tariffName"
                id="tariffName"
                class="block w-full pl-20 pr-3 py-3 border border-gray-300 placeholder:font-robotoMono placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                placeholder="Enter Tariff Name..."
              />
            </div>
          </div>
          <div class="col-span-2">
            <label
              for="GSTNumber"
              class="block text-sm font-medium text-gray-700 capitalize"
              >Tariff GST Number
            </label>
            <div class="mt-1 relative">
              <div
                class="absolute inset-y-0 left-0 px-4 flex items-center pointer-events-none border-r border-gray-300"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 -960 960 960"
                  class="size-7 fill-gray-500"
                >
                  <path
                    d="M80-120v-720h400v160h400v560H80Zm80-80h240v-80H160v80Zm0-160h240v-80H160v80Zm0-160h240v-80H160v80Zm0-160h240v-80H160v80Zm320 480h320v-400H480v400Zm80-240v-80h160v80H560Zm0 160v-80h160v80H560Z"
                  />
                </svg>
              </div>
              <input
                type="text"
                name="GSTNumber"
                id="GSTNumber"
                class="block w-full pl-20 pr-3 py-3 border border-gray-300 placeholder:font-robotoMono placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                placeholder="Enter Tariff GST Number..."
              />
            </div>
          </div>
          <div class="col-span-2">
            <label
              for="tariffAmount"
              class="block text-sm font-medium text-gray-700 capitalize"
              >Tariff Amount
            </label>
            <div class="mt-1 relative">
              <div
                class="absolute inset-y-0 left-0 px-4 flex items-center pointer-events-none border-r border-gray-300"
              >
                <svg
                  viewBox="-96 0 512 512"
                  xmlns="http://www.w3.org/2000/svg"
                  class="size-5 fill-gray-500"
                >
                  <g id="SVGRepo_bgCarrier" stroke-width="0"></g><g
                    id="SVGRepo_tracerCarrier"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  >
                  </g>
                  <g id="SVGRepo_iconCarrier">
                    <path
                      d="M308 96c6.627 0 12-5.373 12-12V44c0-6.627-5.373-12-12-12H12C5.373 32 0 37.373 0 44v44.748c0 6.627 5.373 12 12 12h85.28c27.308 0 48.261 9.958 60.97 27.252H12c-6.627 0-12 5.373-12 12v40c0 6.627 5.373 12 12 12h158.757c-6.217 36.086-32.961 58.632-74.757 58.632H12c-6.627 0-12 5.373-12 12v53.012c0 3.349 1.4 6.546 3.861 8.818l165.052 152.356a12.001 12.001 0 0 0 8.139 3.182h82.562c10.924 0 16.166-13.408 8.139-20.818L116.871 319.906c76.499-2.34 131.144-53.395 138.318-127.906H308c6.627 0 12-5.373 12-12v-40c0-6.627-5.373-12-12-12h-58.69c-3.486-11.541-8.28-22.246-14.252-32H308z"
                    >
                    </path>
                  </g>
                </svg>
              </div>
              <input
                type="text"
                name="tariffAmount"
                id="tariffAmount"
                class="block w-full pl-20 pr-3 py-3 border border-gray-300 placeholder:font-robotoMono placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                placeholder="Enter Tariff Amount..."
              />
            </div>
          </div>
        </div>
        <div
          class="grid grid-cols-7 gap-5 border border-gray-300 rounded-lg shadow-lg p-5"
        >
          <label
            for="fullName"
            class="col-span-7 block text-xl font-semibold font-inter text-gray-700"
            >Financial References :
          </label>
          <div class="col-span-3">
            <label
              for="bankName"
              class="block text-sm font-medium text-gray-700"
              >Nationalized Bank Name
            </label>
            <div class="mt-1 relative">
              <div
                class="absolute inset-y-0 left-0 px-4 flex items-center pointer-events-none border-r border-gray-300"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 -960 960 960"
                  class="size-7 fill-gray-500"
                >
                  <path
                    d="M200-280v-280h80v280h-80Zm240 0v-280h80v280h-80ZM80-120v-80h800v80H80Zm600-160v-280h80v280h-80ZM80-640v-80l400-200 400 200v80H80Z"
                  />
                </svg>
              </div>
              <input
                type="text"
                name="bankName"
                id="bankName"
                class="block w-full pl-20 pr-3 py-3 border border-gray-300 placeholder:font-robotoMono placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                placeholder="Enter nationalized bank name..."
              />
            </div>
          </div>
          <div class="col-span-2">
            <label
              for="bankNumber"
              class="block text-sm font-medium text-gray-700"
              >Nationalized Bank Account Number
            </label>
            <div class="mt-1 relative">
              <div
                class="absolute inset-y-0 left-0 px-4 flex items-center pointer-events-none border-r border-gray-300"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 -960 960 960"
                  class="size-7 fill-gray-500"
                >
                  <path
                    d="M200-280v-280h80v280h-80Zm240 0v-280h80v280h-80ZM80-120v-80h800v80H80Zm600-160v-280h80v280h-80ZM80-640v-80l400-200 400 200v80H80Z"
                  />
                </svg>
              </div>
              <input
                type="text"
                name="bankName"
                id="bankName"
                class="block w-full pl-20 pr-3 py-3 border border-gray-300 placeholder:font-robotoMono placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                placeholder="Enter bank account number..."
              />
            </div>
          </div>
          <div class="col-span-2">
            <label
              for="bankCode"
              class="block text-sm font-medium text-gray-700"
              >IFSC Code
            </label>
            <div class="mt-1 relative">
              <div
                class="absolute inset-y-0 left-0 px-4 flex items-center pointer-events-none border-r border-gray-300"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 -960 960 960"
                  class="size-7 fill-gray-500"
                >
                  <path
                    d="M200-280v-280h80v280h-80Zm240 0v-280h80v280h-80ZM80-120v-80h800v80H80Zm600-160v-280h80v280h-80ZM80-640v-80l400-200 400 200v80H80Z"
                  />
                </svg>
              </div>
              <input
                type="text"
                name="code"
                id="code"
                class="block w-full pl-20 pr-3 py-3 border border-gray-300 placeholder:font-robotoMono placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                placeholder="Enter bank IFSC code..."
              />
            </div>
          </div>
          <div class="col-span-3">
            <label for="address" class="block text-sm font-medium text-gray-700"
              >Bank Address
            </label>
            <div class="mt-1 relative">
              <div
                class="absolute inset-y-0 left-0 px-4 flex items-center pointer-events-none border-r border-gray-300"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 -960 960 960"
                  class="size-7 fill-gray-500"
                >
                  <path
                    d="M200-280v-280h80v280h-80Zm240 0v-280h80v280h-80ZM80-120v-80h800v80H80Zm600-160v-280h80v280h-80ZM80-640v-80l400-200 400 200v80H80Z"
                  />
                </svg>
              </div>
              <input
                type="text"
                name="address"
                id="address"
                class="block w-full pl-20 pr-3 py-3 border border-gray-300 placeholder:font-robotoMono placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                placeholder="Enter bank address..."
              />
            </div>
          </div>
          <div class="col-span-2">
            <label for="number" class="block text-sm font-medium text-gray-700"
              >Branch Number
            </label>
            <div class="mt-1 relative">
              <div
                class="absolute inset-y-0 left-0 px-4 flex items-center pointer-events-none border-r border-gray-300"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 -960 960 960"
                  class="size-7 fill-gray-500"
                >
                  <path
                    d="M200-280v-280h80v280h-80Zm240 0v-280h80v280h-80ZM80-120v-80h800v80H80Zm600-160v-280h80v280h-80ZM80-640v-80l400-200 400 200v80H80Z"
                  />
                </svg>
              </div>
              <input
                type="text"
                name="number"
                id="number"
                class="block w-full pl-20 pr-3 py-3 border border-gray-300 placeholder:font-robotoMono placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                placeholder="Enter bank branch number..."
              />
            </div>
          </div>
        </div>
        <div class="col-span-2 flex justify-start items-center gap-2 px-5 pt-5 border-t-2 border-deepPurple-300">
          <input
            class="form-checkbox size-5 text-blue-600 transition duration-150 ease-in-out cursor-pointer"
            id="declaration-checkbox"
            type="checkbox"
          />
          <label
            for="declaration-checkbox"
            class="ml-2 text-deepPurple-500 font-semibold font-roboto text-sm"
          >
            I hereby declare that information given above is true to the best of
            my knowledge. Any information to be found incorrect / false / wrong
            , I shall be liable for suitable Action.
          </label>
        </div>
        <div class="flex justify-center items-center py-5">
          <button
            class="relative inline-flex items-center px-12 py-3 overflow-hidden text-lg font-semibold text-deepPurple-600 border-2 border-deepPurple-600 rounded-lg hover:text-white group"
          >
            <span
              class="absolute left-0 block w-full h-0 transition-all bg-deepPurple-400 opacity-100 group-hover:h-full top-1/2 group-hover:top-0 duration-400 ease"
            >
            </span>
            <span
              class="absolute right-0 flex items-center justify-start w-10 h-10 duration-300 transform translate-x-full group-hover:translate-x-0 ease"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 -960 960 960"
                class="size-6 fill-white"
              >
                <path
                  d="m600-200-57-56 184-184H80v-80h647L544-704l56-56 280 280-280 280Z"
                />
              </svg>
            </span>
            <span class="relative font-Kanit capitalize">
              save applicant data & proceed
            </span>
          </button>
        </div>
      </div>

      <!-- <div class="col-span-3 grid gap-5">
        <div>
          <label for="Name" class="block text-sm font-medium text-gray-700"
            >Upload Applicant Photo :
          </label>
          <div
            class="mt-1 border-dashed border-2 border-deepPurple-300 rounded-lg shadow-lg p-5 grid gap-3 bg-gray-100"
          >
            <button class="flex justify-center items-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 -960 960 960"
                class="size-28 fill-gray-500"
              >
                <path
                  d="M440-160H260q-91 0-155.5-63T40-377q0-78 47-139t123-78q25-92 100-149t170-57q117 0 198.5 81.5T760-520q69 8 114.5 59.5T920-340q0 75-52.5 127.5T740-160H520v-286l64 62 56-56-160-160-160 160 56 56 64-62v286Z"
                />
              </svg>
            </button>
            <h1
              class="text-sm text-gray-500 font-semibold font-roboto text-center"
            >
              Drag and drop your file here <br />
              OR
            </h1>
            <div class="flex justify-center items-center">
              <button
                class="w-[220px] border bg-white hover:bg-gray-200 text-lg font-semibold font-robotoMono border-gray-300 rounded-md shadow-md text-gray-500 py-3"
                >Select a file</button
              >
            </div>
          </div>
        </div>
      </div> -->
    </div>
  </div>
</div>
