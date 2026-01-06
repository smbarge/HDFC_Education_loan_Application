<script>
  let dateOfBirth = "";

  let Data = [
    {
      srNo: 1,
      name: "Birth Certificate",
      isVerified: false,
      selectedStatus: "",
      remark: "",
      submittedDate: "",
      verifiedDate: "",
    },
    {
      srNo: 2,
      name: "Address Proff",
      isVerified: false,
      selectedStatus: "",
      remark: "",
      submittedDate: "",
      verifiedDate: "",
    },
    {
      srNo: 3,
      name: "Domicile Certificate",
      isVerified: false,
      selectedStatus: "",
      remark: "",
      submittedDate: "",
      verifiedDate: "",
    },
    {
      srNo: 4,
      name: "Bank Passbook Copy",
      isVerified: false,
      selectedStatus: "",
      remark: "",
      submittedDate: "",
      verifiedDate: "",
    },
    {
      srNo: 5,
      name: "Pan Card",
      isVerified: false,
      selectedStatus: "",
      remark: "",
      submittedDate: "",
      verifiedDate: "",
    },
  ];

  let status = ["pending", "progress", "verified", "rejected"];
  // let selectedStatus = "";
  // let isVerified = false;
</script>

<div class="bg-gray-100 h-screen">
  <!-- <div class="p-10">
        <img src="/logo.png" alt="">
    </div> -->
  <!-- <div class="bg-violet-800 py-4">
    </div> -->
  <div class="mx-10">
    <div class="flex py-5 text-2xl font-bold gap-5 items-center">
      <div class="">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke-width="1.5"
          stroke="currentColor"
          class="size-8"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10"
          />
        </svg>
      </div>
      <div class="">Document Verification</div>
    </div>
    <div class="bg-white border-2 p-5">
      <div class="bg-white rounded-lg shadow-md">
        <div class=" grid grid-cols-12 p-5 gap-10 mx-10">
          <div
            class="grid gap-3 col-span-2 rounded-2xl shadow-lg p-1 border border-gray-300"
          >
            <img src="/termloan/user.png" class="" alt="" />
          </div>
          <div class="col-span-10 grid grid-cols-12">
            <div class="flex col-span-12 justify-between">
              <div>
                <div class="text-gray-400 text-lg font-semibold">Name :</div>
                <div class="text-3xl font-semibold text-gray-700">
                  Fatima Begum Shaikh
                </div>
              </div>
              <div>
                <div class="text-gray-400 text-lg font-semibold">Loan No.:</div>
                <div class="text-3xl text-deepPurple-500 font-medium">
                  A120931212
                </div>
              </div>
            </div>
            <div class=" col-span-12 grid grid-cols-12">
              <div class="flex gap-2 col-span-4">
                <div class="text-gray-400 text-xl font-semibold">
                  Mobile No :
                </div>
                <div class="text-xl font-semibold text-gray-700">
                  9876543210
                </div>
              </div>
              <div class="flex gap-2 col-span-4">
                <div class="text-gray-400 text-xl font-semibold">Gender :</div>
                <div class="text-xl font-semibold text-gray-700">Female</div>
              </div>
            </div>
            <div class=" col-span-12 grid grid-cols-12">
              <div class="flex gap-2 col-span-4">
                <div class="text-gray-400 text-xl font-semibold">
                  Loan Ammount (₹):
                </div>
                <div class="text-xl font-semibold text-gray-700">50,00,000</div>
              </div>
              <div class="flex gap-2 col-span-4">
                <div class="text-gray-400 text-xl font-semibold">Age :</div>
                <div class="text-xl font-semibold text-gray-700">25</div>
              </div>
              <div class="flex gap-2 col-span-4">
                <div class="text-gray-400 text-xl font-semibold">
                  District :
                </div>
                <div class="text-xl font-semibold text-gray-700">Nashik</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="bg-white rounded-xl shadow-md p-5 mt-10">
        <div class=" grid grid-cols-12">
          <div
            class="col-span-1 font-semibold text-gray-700 text-xl py-5 flex justify-center items-center"
          >
            Sr No.
          </div>
          <div
            class="col-span-2 font-semibold text-gray-700 text-xl py-5 flex justify-start items-center"
          >
            Particulars (in Original)
          </div>
          <div
            class="col-span-1 font-semibold text-gray-700 text-xl py-5 flex justify-center items-center"
          >
            Status
          </div>
          <div
            class="col-span-2 font-semibold text-gray-700 text-xl py-5 flex justify-center items-center"
          >
            Submitted Date
          </div>
          <div
            class="col-span-1 font-semibold text-gray-700 text-xl py-5 flex justify-center items-center"
          >
            Verify
          </div>
          <div
            class="col-span-2 font-semibold text-gray-700 text-xl py-5 flex justify-center items-center"
          >
            Verified Date
          </div>
          <div
            class="col-span-2 font-semibold text-gray-700 text-xl py-5 flex justify-center items-center"
          >
            Download/View
          </div>
          <div
            class="col-span-1 font-semibold text-gray-700 text-xl py-5 flex justify-center items-center"
          >
            Remark
          </div>
        </div>

        {#each Data as data}
          <div class=" grid grid-cols-12">
            <div
              class="col-span-1 py-5 border-t font-medium border-gray-300 text-gray-500 text-lg flex justify-center items-center"
            >
              {data.srNo}
            </div>
            <div
              class="col-span-2 py-5 border-t font-medium border-gray-300 text-gray-500 text-lg flex justify-start items-center"
            >
              {data.name}
            </div>
            <div
              class="col-span-1 py-5 border-t font-medium border-gray-300 text-gray-500 text-lg flex justify-center items-center"
            >
              <!-- status -->
              <select
                id="status-dropdown"
                bind:value={data.selectedStatus}
                class="mt-1 block w-auto px-2 py-1 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              >
                <option value="" disabled>Select Status</option>
                {#each status as statusName}
                  <option value={statusName}>{statusName}</option>
                {/each}
              </select>
            </div>
            <div
              class="col-span-2 py-5 border-t font-medium border-gray-300 text-gray-500 text-lg flex justify-center items-center"
            >
              <input
                type="date"
                id="dateOfBirth"
                bind:value={data.submittedDate}
                class="mt-1 block w-auto px-3 py-1 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              />
            </div>
            <div
              class="col-span-1 py-5 border-t font-medium border-gray-300 text-gray-500 text-lg flex justify-center items-center"
            >
              <!-- Verify -->
              <input
                class="p-5"
                type="checkbox"
                id="verified-checkbox"
                bind:checked={data.isVerified}
              />
            </div>
            <div
              class="col-span-2 py-5 border-t font-medium border-gray-300 text-gray-500 text-lg flex justify-center items-center"
            >
              <input
                type="date"
                id="dateOfBirth"
                bind:value={data.verifiedDate}
                class="mt-1 block w-auto px-3 py-1 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              />
            </div>
            <div
              class="gap-5 col-span-2 py-5 border-t font-medium border-gray-300 text-gray-500 text-lg flex justify-center items-center"
            >
              <button
                class="flex gap-1 text-sm text-sky-600 font-semibold underline"
              >
                <span> Download </span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke-width="1.5"
                  stroke="currentColor"
                  class="size-5 text-sky-600 font-semibold"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M12 9.75v6.75m0 0-3-3m3 3 3-3m-8.25 6a4.5 4.5 0 0 1-1.41-8.775 5.25 5.25 0 0 1 10.233-2.33 3 3 0 0 1 3.758 3.848A3.752 3.752 0 0 1 18 19.5H6.75Z"
                  />
                </svg>
              </button>

              <button
                class="flex gap-1 text-sm text-sky-600 font-semibold underline"
              >
                <span> View </span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke-width="1.5"
                  stroke="currentColor"
                  class="size-5 text-sky-600 font-semibold"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M7.5 3.75H6A2.25 2.25 0 0 0 3.75 6v1.5M16.5 3.75H18A2.25 2.25 0 0 1 20.25 6v1.5m0 9V18A2.25 2.25 0 0 1 18 20.25h-1.5m-9 0H6A2.25 2.25 0 0 1 3.75 18v-1.5M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
                  />
                </svg>
              </button>
            </div>
            <div
              class="col-span-1 py-5 border-t font-medium border-gray-300 text-gray-500 text-lg flex justify-center items-center"
            >
              <!-- Remark -->
              <input
                class="mt-1 block w-36 text-center px-3 py-1 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                type="text"
                id="remark-input"
                bind:value={data.remark}
                placeholder="Remarks"
              />
            </div>
          </div>
        {/each}
        <div
          class="col-span-12 flex justify-center items-center mx-auto gap-5 pt-8 border-t-2 border-gray-300"
        >
          <button
            type="button"
            class="w-[300px] uppercase py-2 px-4 bg-rose-500 text-white font-semibold rounded-md shadow-sm hover:bg-rose-600 focus:outline-none focus:ring-2 focus:ring-rose-500 focus:ring-offset-2"
          >
            Cancel
          </button>
          <button
            type="button"
            class="w-[300px] uppercase py-2 px-4 bg-blue-500 text-white font-semibold rounded-md shadow-sm hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
          >
            Verify
          </button>
        </div>
      </div>
    </div>
  </div>
</div>
