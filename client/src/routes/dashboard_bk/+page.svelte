<script>
  import { goto } from "$app/navigation";

  let years = [];

  let months = [
    { name: "January", value: "01" },
    { name: "February", value: "02" },
    { name: "March", value: "03" },
    { name: "April", value: "04" },
    { name: "May", value: "05" },
    { name: "June", value: "06" },
    { name: "July", value: "07" },
    { name: "August", value: "08" },
    { name: "September", value: "09" },
    { name: "October", value: "10" },
    { name: "November", value: "11" },
    { name: "December", value: "12" },
  ];

  // Generate years from 2000 to the current year
  let currentYear = new Date().getFullYear();
  for (let i = 2000; i <= currentYear; i++) {
    years.push(i);
  }

  let selectedYearMonth = "";

  function handleSelect(event) {
    selectedYearMonth = event.target.value;
  }

  function termLoan() {
    goto("/termloan/termLoan");
  }
</script>

<div class="min-h-screen py-14 px-14">
  <div class="grid gap-7">
    <div
      class="bg-deepPurple-100 rounded-md shadow-lg flex justify-start items-center gap-3 px-7 py-2"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 -960 960 960"
        fill="#5f6368"
        class="size-7"
      >
        <path
          d="M520-600v-240h320v240H520ZM120-440v-400h320v400H120Zm400 320v-400h320v400H520Zm-400 0v-240h320v240H120Zm80-400h160v-240H200v240Zm400 320h160v-240H600v240Zm0-480h160v-80H600v80ZM200-200h160v-80H200v80Zm160-320Zm240-160Zm0 240ZM360-280Z"
        />
      </svg>
      <!-- <img src="/dashboard.png" alt="dashboard" class="size-7" /> -->
      <h1 class="text-2xl font-semibold font-roboto text-gray-700 text-left">
        Dashboard
      </h1>
    </div>
    <div
      class="rounded-md shadow-xl border border-gray-300 p-8 bg-gray-200 max-h-max"
    >
      <div class="grid grid-cols-7 gap-6">
        <div
          class="col-span-3 rounded-xl border border-sky-500 shadow-xl shadow-sky-200 bg-gradient-to-br from-sky-500 to-sky-100"
        >
          <div class="rounded-md grid grid-cols-6 p-5">
            <div class="col-span-4 space-y-2">
              <div class="pb-2 flex justify-start items-center gap-2">
                <img src="/termloan/totalloan.png" alt="totalloanlogo" class="size-6" />
                <h1
                  class="text-xl font-semibold font-roboto text-left text-white"
                >
                  Total Loan Disbursed
                </h1>
              </div>
              <div class="flex justify-start items-center gap-5">
                <h1 class="text-lg font-semibold font-inter text-left">
                  ₹ 103,30,00,000
                </h1>
                <div
                  class="flex justify-start items-center gap-1.5 rounded-full border border-gray-300 py-1 px-2 bg-white shadow-xl"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 -960 960 960"
                    class="size-5 fill-green-500"
                  >
                    <path
                      d="M440-80v-647L256-544l-56-56 280-280 280 280-56 57-184-184v647h-80Z"
                    />
                  </svg>
                  <div class="flex justify-start items-center gap-1">
                    <h1
                      class="text-base text-gray-500 font-semibold font-roboto text-left"
                    >
                      +9%
                    </h1>
                    <h1
                      class="text-sm text-gray-500 font-inter font-semibold text-left"
                    >
                      last year
                    </h1>
                  </div>
                </div>
              </div>
              <div>
                <div class="mt-1 flex pt-2">
                  <label class="inline-flex items-center">
                    <input
                      type="radio"
                      name="marital"
                      value="male"
                      class="form-radio size-4"
                    />
                    <span class="ml-2 font-semibold font-robotoMono">2023</span>
                  </label>
                  <label class="inline-flex items-center ml-6">
                    <input
                      type="radio"
                      name="marital"
                      value="female"
                      class="form-radio size-4"
                    />
                    <span class="ml-2 font-semibold font-robotoMono">2022</span>
                  </label>
                </div>
              </div>
            </div>
            <div class="col-span-2 mx-auto">
              <div class="relative w-32 h-32">
                <!-- Donut Chart Background -->
                <div class="absolute inset-0 flex items-center justify-center">
                  <svg
                    class="w-full h-full transform rotate-[-90deg] shadow-xl shadow-deepPurple-200 rounded-full"
                    viewBox="0 0 100 100"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <circle
                      class="text-gray-200"
                      cx="50"
                      cy="50"
                      r="40"
                      stroke-width="18"
                      stroke="currentColor"
                      fill="none"
                    />
                    <circle
                      class="text-blue-500 animate-progress"
                      cx="50"
                      cy="50"
                      r="40"
                      stroke-width="18"
                      stroke="currentColor"
                      stroke-dasharray="251.2"
                      stroke-dashoffset="0"
                      fill="none"
                    />
                  </svg>
                  <div
                    class="absolute inset-0 grid items-center justify-center"
                  >
                    <div class="grid justify-center items-center">
                      <img
                        src="/termloan/statistics.png"
                        alt="statisticslogo"
                        class="size-5 mx-auto"
                      />
                      <h1 class="text-xl font-semibold text-gray-500">28%</h1>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div
          class="col-span-2 p-5 rounded-xl border border-deepPurple-500 shadow-xl shadow-deepPurple-200 bg-gradient-to-br from-deepPurple-500 to-deepPurple-100"
        >
          <div class="mb-3">
            <img src="/termloan/payment.png" alt="paymentLogo" class="size-12 mx-auto" />
          </div>
          <div class="grid justify-center items-center">
            <h1
              class="text-center capitalize text-lg text-white font-semibold font-inter pb-2"
            >
              total repayment received
            </h1>
            <h1 class="text-lg text-white font-semibold font-inter text-center">
              ₹ 9,70,00,000
            </h1>
          </div>
        </div>
        <div
          class="col-span-2 p-5 rounded-xl border border-orange-500 shadow-xl shadow-orange-200 bg-gradient-to-br from-orange-500 to-orange-100"
        >
          <div class="mb-3">
            <img
              src="/termloan/Repayment.png"
              alt="paymentLogo"
              class="size-12 mx-auto"
            />
          </div>
          <div class="grid justify-center items-center">
            <h1
              class="text-center capitalize text-lg text-white font-semibold font-inter pb-2"
            >
              total outstanding repayment
            </h1>
            <h1 class="text-lg text-white font-semibold font-inter text-center">
              ₹ 6,50,00,000
            </h1>
          </div>
        </div>
      </div>
      <div class="grid grid-cols-12 justify-center items-center gap-7 my-10">
        <div
          class="col-span-3 px-4 py-2.5 rounded-xl border border-gray-300 bg-white shadow-xl h-[180px]"
        >
          <div class="mb-2">
            <img src="/termloan/team.png" alt="paymentLogo" class="size-12 mx-auto" />
          </div>
          <div class="grid justify-center items-center">
            <h1
              class="text-center text-lg text-gray-500 font-semibold font-inter pb-2"
            >
              Default in Current Month
            </h1>
            <h1
              class="text-2xl text-gray-600 font-semibold font-inter text-center"
            >
              32
            </h1>
          </div>
        </div>
        <div
          class="col-span-3 px-4 py-2.5 rounded-xl border border-gray-300 bg-white shadow-xl h-[180px]"
        >
          <div class="mb-2">
            <img
              src="/termloan/registered.png"
              alt="paymentLogo"
              class="size-12 mx-auto"
            />
          </div>
          <div class="grid justify-center items-center">
            <h1
              class="text-center text-lg text-gray-500 font-semibold font-inter pb-2"
            >
              Registered Applicant in <br /> Current Month
            </h1>
            <h1
              class="text-2xl text-gray-600 font-semibold font-inter text-center"
            >
              450
            </h1>
          </div>
        </div>
        <div
          class="col-span-3 px-4 py-2.5 rounded-xl border border-gray-300 bg-white shadow-xl h-[180px]"
        >
          <div class="mb-2">
            <img src="/termloan/poor.png" alt="paymentLogo" class="size-12 mx-auto" />
          </div>
          <div class="grid justify-center items-center">
            <h1
              class="text-center text-lg text-gray-500 font-semibold font-inter pb-2"
            >
              Loan Disbursed in Current Month
            </h1>
            <h1
              class="text-2xl text-gray-600 font-semibold font-inter text-center"
            >
              ₹ 2,90,00,000
            </h1>
          </div>
        </div>
        <div
          class="col-span-3 px-4 py-2.5 rounded-xl border border-gray-300 bg-white shadow-xl h-[180px]"
        >
          <div class="mb-2">
            <img
              src="/termloan/disruption.png"
              alt="paymentLogo"
              class="size-12 mx-auto"
            />
          </div>
          <div class="grid justify-center items-center">
            <h1
              class="text-center text-lg text-gray-500 font-semibold font-inter pb-2"
            >
              Outstanding in Current Month
            </h1>
            <h1
              class="text-2xl text-gray-600 font-semibold font-inter text-center"
            >
              ₹ 93,00,000
            </h1>
          </div>
        </div>
      </div>
      <div class="grid grid-cols-12 gap-7">
        <div
          class="col-span-7 border border-gray-300 rounded-lg shadow-lg shadow-gray-400 h-fit"
        >
          <div
            class="bg-gray-100 rounded-t-lg py-2 px-5 flex justify-between items-center border-b border-gray-300"
          >
            <h1
              class="text-gray-500 font-semibold uppercase font-Kanit text-base"
            >
              Scheme wise loan Disbursed
            </h1>
            <div class="border border-gray-300 rounded-lg">
              <select
                id="year-month"
                class="block w-full text-sm p-1 border border-gray-300 rounded-lg text-gray-500 font-robotoMono"
                on:change={handleSelect}
              >
                <option value="" disabled selected
                  >Select a year and month</option
                >
                {#each years as year}
                  {#each months as month}
                    <option value="{year}-{month.value}"
                      >{year} - {month.name}</option
                    >
                  {/each}
                {/each}
              </select>
            </div>
          </div>
          <div
            class="grid grid-cols-4 justify-start items-center bg-white rounded-b-lg"
          >
            <div
              class="col-span-4 flex justify-between items-center px-7 py-3 border-b border-gray-300"
            >
              <div class="flex justify-start items-center gap-2">
                <img src="/termloan/financial.png" alt="financiallogo" class="size-5" />
                <h1
                  class="text-base text-gray-500 uppercase text-left font-roboto"
                >
                  unnati mudat karj yojana
                </h1>
              </div>
              <h1
                class="text-xl text-gray-500 font-semibold font-inter text-left"
              >
                ₹ 13,30,00,000
              </h1>
            </div>
            <div
              class="col-span-4 flex justify-between items-center px-7 py-3 border-b border-gray-400"
            >
              <div class="flex justify-start items-center gap-2">
                <img src="/termloan/financial.png" alt="financiallogo" class="size-5" />
                <h1
                  class="text-base py-2 text-gray-500 uppercase text-left font-roboto"
                >
                  sukshm patpurvatha yojana
                </h1>
              </div>
              <h1
                class="text-xl text-gray-500 font-semibold font-inter text-left"
              >
                ₹ 13,30,00,000
              </h1>
            </div>
            <div class="col-span-4 flex justify-between items-center py-3 px-7">
              <div class="flex justify-start items-center gap-2">
                <img src="/termloan/financial.png" alt="financiallogo" class="size-5" />
                <h1
                  class="text-base py-2 text-gray-500 uppercase text-left font-roboto"
                >
                  dr apj abdul kalam shaikshanik karj yojana
                </h1>
              </div>
              <h1
                class="text-xl text-gray-500 font-semibold font-inter text-left"
              >
                ₹ 13,30,00,000
              </h1>
            </div>
          </div>
        </div>
        <div
          class="col-span-5 border border-gray-300 rounded-lg shadow-lg shadow-gray-400 h-fit"
        >
          <div
            class="flex justify-between items-center bg-gray-100 rounded-t-lg border-b border-gray-300 px-7 py-3"
          >
            <h1
              class="text-base text-gray-500 uppercase text-left font-roboto font-semibold"
            >
              unnati mudat karj yojana
            </h1>
            <h1 class="text-xs text-gray-700 text-left font-robotoMono">
              March 2023
            </h1>
          </div>
          <div class="bg-white p-4 space-y-2 rounded-b-lg">
            <!-- Labels -->

            <div class="relative w-28 h-28 mx-auto">
              <!-- Donut Chart -->
              <div class="absolute inset-0 flex items-center justify-center">
                <svg
                  class="w-full h-full transform rotate-[-90deg]"
                  viewBox="0 0 100 100"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <circle
                    class="text-gray-200"
                    cx="50"
                    cy="50"
                    r="40"
                    stroke-width="18"
                    stroke="currentColor"
                    fill="none"
                  />
                  <circle
                    class="text-blue-500"
                    cx="50"
                    cy="50"
                    r="40"
                    stroke-width="18"
                    stroke="currentColor"
                    stroke-dasharray="120, 251.2"
                    stroke-dashoffset="50"
                    fill="none"
                  />
                  <circle
                    class="text-red-500"
                    cx="50"
                    cy="50"
                    r="40"
                    stroke-width="20"
                    stroke="currentColor"
                    stroke-dasharray="100, 221.2"
                    stroke-dashoffset="120"
                    fill="none"
                  />
                </svg>
              </div>
              <div class="absolute -top-1 -left-32 text-center">
                <div class="text-red-500 text-lg font-bold">₹ 6,65,00,000</div>
                <h1
                  class="text-sm text-red-500 uppercase font-bold text-center font-roboto pb-1"
                >
                  Disbursed
                </h1>
              </div>
              <div class="absolute -top-1 -right-32 text-center">
                <div class="text-blue-500 font-bold text-lg">₹ 8,30,00,000</div>
                <h1
                  class="text-sm text-blue-500 uppercase font-bold text-center font-roboto pb-1"
                >
                  Repayment
                </h1>
              </div>
              <div class="absolute inset-0 grid items-center justify-center">
                <div class="grid justify-center items-center">
                  <img
                    src="/termloan/money.png"
                    alt="statisticslogo"
                    class="size-7 mx-auto"
                  />
                </div>
              </div>
            </div>
            <div>
              <h1
                class="text-lg text-deepPurple-500 font-semibold font-inter text-center"
              >
                ₹ 14,95,00,000
              </h1>
            </div>
          </div>
        </div>
      </div>

      <div
        class="mt-5 bg-purple-500 hover:bg-purple-700 py-2 px-3 w-36 rounded-md border border-1 border-gray-400 text-center text-lg font-medium text-white"
      >
        <button on:click={termLoan}>Apply</button>
      </div>
    </div>
  </div>
</div>

<style>
  @keyframes progress {
    from {
      stroke-dashoffset: 251.2; /* Full circumference */
    }
    to {
      stroke-dashoffset: 180.96; /* 20% of circumference */
    }
  }

  .animate-progress {
    animation: progress 2s ease-out forwards;
  }
</style>
