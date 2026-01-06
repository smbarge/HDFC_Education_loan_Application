<script>
    import { slide } from "svelte/transition";
  
    let selectedReligion = "";
    let isOpen = false;
    let isgenderOpen = false;
    let gender = "";
  
    let cardNames = [
      {
        id: "1",
        src: `/termloan/aadharcard.svg`,
        name: "Aadhar (Mandatory)",
        subtitle:
          "keep Aadhar card with you along with the Mobile Number registered in Aadhar.",
      },
      {
        id: "1",
        src: `/termloan/pancard.png`,
        name: "PAN",
        subtitle: "keep PAN card with you.",
      },
    ];
    let showLists = Array(cardNames.length).fill(false);
  
    function toggleList(cardIndex) {
      for (let i = 0; i < showLists.length; i++) {
        if (i !== cardIndex) {
          showLists[i] = false;
        }
      }
      showLists[cardIndex] = !showLists[cardIndex];
    }
  </script>
  
  <div class="min-h-screen mx-10 my-5">
    <div class="bg-white shadow-lg rounded-xl p-5 space-y-5 border">
      <h1
        class="text-2xl font-semibold font-roboto py-2 text-gray-700 border-b-2 border-gray-300"
      >
        Let's check your eligibility
      </h1>
      <div class={selectedReligion ? "border-b border-gray-300 pb-3" : ""}>
        <p class="text-lg font-semibold font-roboto mb-3 text-gray-700">
          Please first select your religion, only then you can avail this scheme.
        </p>
  
        <div class="flex justify-start items-center gap-10">
          <label class="flex items-center space-x-2">
            <input
              type="radio"
              name="religion"
              value="Jains"
              bind:group={selectedReligion}
              class="form-radio text-blue-500"
            />
            <span class="text-gray-700 font-marvel font-medium">Jains</span>
          </label>
  
          <label class="flex items-center space-x-2">
            <input
              type="radio"
              name="religion"
              value="Christians"
              bind:group={selectedReligion}
              class="form-radio text-blue-500"
            />
            <span class="text-gray-700 font-marvel font-medium">Christians</span>
          </label>
  
          <label class="flex items-center space-x-2">
            <input
              type="radio"
              name="religion"
              value="Sikhs"
              bind:group={selectedReligion}
              class="form-radio text-blue-500"
            />
            <span class="text-gray-700 font-marvel font-medium">Sikhs</span>
          </label>
        </div>
      </div>
      {#if selectedReligion}
        <div transition:slide={{ duration: 400 }} class="pb-3">
          <h1 class="text-xl text-left font-semibold font-roboto text-gray-700">
            Identity Verification :
          </h1>
          {#each cardNames as cards, cardIndex}
            <div
              class="border border-deepPurple-300 p-5 rounded-lg shadow-xl my-3 hover:bg-gray-100"
            >
              <div class="flex justify-between items-start">
                <div class="flex justify-start items-start gap-5">
                  <!-- <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 -960 960 960"
                      fill="#5f6368"
                      class="size-10"
                    >
                      <path
                        d="M560-440h200v-80H560v80Zm0-120h200v-80H560v80ZM200-320h320v-22q0-45-44-71.5T360-440q-72 0-116 26.5T200-342v22Zm160-160q33 0 56.5-23.5T440-560q0-33-23.5-56.5T360-640q-33 0-56.5 23.5T280-560q0 33 23.5 56.5T360-480ZM160-160q-33 0-56.5-23.5T80-240v-480q0-33 23.5-56.5T160-800h640q33 0 56.5 23.5T880-720v480q0 33-23.5 56.5T800-160H160Zm0-80h640v-480H160v480Zm0 0v-480 480Z"
                      />
                    </svg> -->
                  <img src={cards.src} alt="logo" class="size-8" />
                  <div class="grid justify-start">
                    <h1
                      class="text-lg text-left font-semibold font-roboto text-gray-600"
                    >
                      {cards.name}
                    </h1>
                    <h1 class="text-sm text-left font-roboto text-gray-500">
                      {cards.subtitle}
                    </h1>
                  </div>
                </div>
                <button
                  on:click={() => toggleList(cardIndex)}
                  class=" p-2 border border-gray-300 rounded-md hover:bg-gray-300"
                >
                  <div class="flex justify-center items-center gap-2">
                    <h1 class="text-sm text-gray-600 font-lato">
                      Complete Details
                    </h1>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 -960 960 960"
                      class="size-6 fill-gray-500 {isOpen ? 'rotate-180' : ''}"
                    >
                      <path
                        d="M480-344 240-584l56-56 184 184 184-184 56 56-240 240Z"
                      />
                    </svg>
                  </div>
                </button>
              </div>
              {#if showLists[cardIndex]}
                <div transition:slide={{ duration: 400 }}>
                  {#if cardIndex === 0}
                    <div
                      class="grid grid-cols-6 gap-5 border-t border-gray-300 mt-5 pt-5"
                    >
                      <div class="col-span-2">
                        <label
                          for="aadhaar-number"
                          class="block text-base font-medium text-gray-700 capitalize mb-2"
                          >Aadhaar Number</label
                        >
                        <div class="flex space-x-2">
                          <input
                            type="text"
                            maxlength="4"
                            class="block w-full p-2 border border-gray-300 placeholder:font-robotoMono placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 text-base text-center"
                            placeholder="0000"
                          />
                          <input
                            type="text"
                            maxlength="4"
                            class="block w-full p-2 border border-gray-300 placeholder:font-robotoMono placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 text-base text-center"
                            placeholder="0000"
                          />
                          <input
                            type="text"
                            maxlength="4"
                            class="block w-full p-2 border border-gray-300 placeholder:font-robotoMono placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 text-base text-center"
                            placeholder="0000"
                          />
                        </div>
                      </div>
                      <div class="col-span-3">
                        <label
                          for="fullName"
                          class="block font-medium text-gray-700 mb-2"
                          >Applicant's Full Name <span
                            class="text-sm text-gray-500 font-robotoMono"
                            >(Name as Per Aadhaar Card)</span
                          ></label
                        >
                        <div class="relative">
                          <div
                            class="absolute inset-y-0 left-0 px-3 flex items-center pointer-events-none border-r border-gray-300"
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
                            class="block w-full pl-16 pr-3 py-2 border border-gray-300 placeholder:text-sm placeholder-gray-400 placeholder:font-robotoMono focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                            placeholder="Enter full name..."
                          />
                        </div>
                      </div>
                      <div class="col-span-2">
                        <label
                          for="dob"
                          class="block font-medium text-gray-700 mb-2"
                          >Date of Birth</label
                        >
                        <div class="relative">
                          <div
                            class="absolute inset-y-0 left-0 px-3 flex items-center pointer-events-none border-r border-gray-300"
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
                            class="block w-full pl-16 pr-3 py-2 border border-gray-300 uppercase font-roboto focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                          />
                        </div>
                      </div>
                      <div class="col-span-2">
                        <label
                          for="gender"
                          class="block font-medium text-gray-700 mb-2"
                          >Gender</label
                        >
                        <select
                          id="gender"
                          bind:value={gender}
                          class="block w-full bg-white px-3 py-3 font-roboto border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                          required
                        >
                          <option value="" disabled selected
                            >Select your gender</option
                          >
                          <option value="male">Male</option>
                          <option value="female">Female</option>
                          <option value="other">Other</option>
                        </select>
                      </div>
  
                      <!-- <div class="mb-4">
                          <label
                            for="mobile-number"
                            class="block text-base font-medium text-gray-700 capitalize mb-2"
                            >Registered Mobile Number</label
                          >
    
                          <div class="relative">
                            <div
                              class="absolute inset-y-0 left-0 px-3 flex items-center pointer-events-none border-r border-gray-300"
                            >
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 -960 960 960"
                                class="size-6 fill-gray-500"
                              >
                                <path
                                  d="M280-40q-33 0-56.5-23.5T200-120v-720q0-33 23.5-56.5T280-920h400q33 0 56.5 23.5T760-840v720q0 33-23.5 56.5T680-40H280Zm0-120v40h400v-40H280Zm0-80h400v-480H280v480Zm0-560h400v-40H280v40Zm0 0v-40 40Zm0 640v40-40Z"
                                />
                              </svg>
                            </div>
                            <input
                              type="text"
                              id="mobile-number"
                              maxlength="10"
                              class="block w-full pl-16 pr-3 py-2 border border-gray-300 placeholder:font-robotoMono placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 text-base"
                              placeholder="Enter your mobile number..."
                            />
                          </div>
                        </div> -->
                      <!-- <h1
                      class="col-span-4 text-sm text-gray-500 font-marvel font-semibold"
                    >
                      A 4 digit OTP will be sent to your Aadhaar registered mobile
                      number for verification. If you don't receive OTP kindly
                      re-enter your registered mobile number.
                    </h1> -->
                      <div
                        class="col-span-4 flex justify-start items-center gap-2"
                      >
                        <input
                          class="form-checkbox size-4 text-blue-600 transition duration-150 ease-in-out cursor-pointer"
                          id="declaration-checkbox"
                          type="checkbox"
                        />
                        <h1
                          class="text-sm text-gray-500 font-marvel font-semibold"
                        >
                          I provide my consent to share my details with the issuer
                          for the purpose of fetching my details.
                        </h1>
                      </div>
                      <div class="col-span-4">
                        <button
                          class="border border-gray-300 shadow-lg py-2 bg-deepPurple-300 mx-auto px-10 text-white font-semibold font-marvel"
                          >Verify</button
                        >
                      </div>
                    </div>
                  {/if}
                  {#if cardIndex === 1}
                    <div
                      class="grid grid-cols-4 gap-5 border-t border-gray-300 mt-5 pt-5"
                    >
                      <div class="col-span-1">
                        <label
                          for="pancard"
                          class="block text-base font-medium text-gray-700 capitalize mb-2"
                          >Pan card number
                        </label>
                        <div class="relative">
                          <div
                            class="absolute inset-y-0 left-0 px-3 flex items-center pointer-events-none border-r border-gray-300"
                          >
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              viewBox="0 -960 960 960"
                              class="size-6 fill-gray-500"
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
                            class="block w-full pl-16 pr-3 py-2 border border-gray-300 placeholder:font-robotoMono placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                            placeholder="Enter pancard number..."
                          />
                        </div>
                      </div>
  
                      <div class="col-span-2">
                        <label
                          for="pancard"
                          class="block text-base font-medium text-gray-700 capitalize mb-2"
                          >Name of the card holder
                        </label>
                        <div class="relative">
                          <div
                            class="absolute inset-y-0 left-0 px-3 flex items-center pointer-events-none border-r border-gray-300"
                          >
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              viewBox="0 -960 960 960"
                              fill="#5f6368"
                              class="size-5"
                            >
                              <path
                                d="M480-480q-66 0-113-47t-47-113q0-66 47-113t113-47q66 0 113 47t47 113q0 66-47 113t-113 47ZM160-160v-112q0-34 17.5-62.5T224-378q62-31 126-46.5T480-440q66 0 130 15.5T736-378q29 15 46.5 43.5T800-272v112H160Zm80-80h480v-32q0-11-5.5-20T700-306q-54-27-109-40.5T480-360q-56 0-111 13.5T260-306q-9 5-14.5 14t-5.5 20v32Zm240-320q33 0 56.5-23.5T560-640q0-33-23.5-56.5T480-720q-33 0-56.5 23.5T400-640q0 33 23.5 56.5T480-560Zm0-80Zm0 400Z"
                              />
                            </svg>
                          </div>
                          <input
                            type="text"
                            name="pancard"
                            id="pancard"
                            class="block w-full pl-16 pr-3 py-2 border border-gray-300 placeholder:font-robotoMono placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                            placeholder="Enter pancard holder name..."
                          />
                        </div>
                      </div>
                      <div class="col-span-4">
                        <button
                          class="border border-gray-300 shadow-lg py-2 bg-deepPurple-300 mx-auto px-10 text-white font-semibold font-marvel"
                          >Submit</button
                        >
                      </div>
                    </div>
                  {/if}
                </div>
              {/if}
            </div>
          {/each}
        </div>
      {/if}
      <div
        class="flex justify-center items-center py-5 border-t-2 border-gray-300"
      >
        <button
          class="group relative flex items-center justify-center gap-3 border border-gray-300 w-[230px] py-4 overflow-hidden bg-Calypso-400"
        >
          <span
            class="absolute w-0 h-0 transition-all duration-500 ease-out bg-Calypso-500 group-hover:w-[300px] group-hover:h-56"
          ></span>
          <span class="absolute inset-0 w-full h-full opacity-30"></span>
  
          <h1
            class="relative font-roboto capitalize font-semibold text-xl text-gray-800 group-hover:text-white"
          >
            Proceed
          </h1>
          <span class="relative">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 -960 960 960"
              class="size-7 fill-gray-800 group-hover:fill-white"
            >
              <path
                d="m700-300-57-56 84-84H120v-80h607l-83-84 57-56 179 180-180 180Z"
              />
            </svg>
          </span>
        </button>
      </div>
    </div>
  </div>












  <div class="flex flex-col items-center space-y-4">
    {#each steps as step, index}
      <div class="relative flex items-center">
        <div
          class={`w-12 h-12 flex items-center justify-center rounded-full 
                 ${index <= activeStep ? "bg-red-500" : "bg-gray-200"} 
                 transition-colors duration-300`}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 -960 960 960"
            class={`w-6 h-6 ${index <= activeStep ? "fill-white" : "fill-gray-600"}`}
          >
            <path d={step.path} />
          </svg>
        </div>
        {#if index < steps.length - 1}
          <div
            class={`w-1 h-20 ${index < activeStep ? "bg-red-500" : "bg-gray-300"} 
                   absolute left-1/2 transform -translate-x-1/2 top-full  
                   transition-colors duration-300`}
          ></div>
        {/if}
      </div>
      <span class="mt-2 text-sm">{step.name}</span>
    {/each}
    <button
      class="mt-4 px-4 py-2 bg-blue-500 text-white rounded"
      on:click={handleButtonClick}
    >
      Proceed
    </button>
  </div>