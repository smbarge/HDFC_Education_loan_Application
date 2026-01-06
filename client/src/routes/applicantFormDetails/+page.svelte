<script>
  let dateOfBirth = "";

  let state = "";
  let district = "";
  let area = "";
  let village = "";
  let gender = "";
  let marital = "";

  let states = ["Maharashtra"];
  let districts = ["Pune", "Nashik", "Jalgaon"];
  let areas = ["Hinjewadi"];
  let villages = ["Maan"];
</script>

<div class=" mx-10 my-10 py-5 p-7">
  <div
    class="bg-deepPurple-100 border border-deepPurple-400 rounded-md shadow-md shadow-deepPurple-200 flex justify-start items-center mb-5"
  >
    <h1 class="text-xl font-semibold font-roboto text-gray-700 py-2 px-6">
      Enter Applicant Details
    </h1>
  </div>
  <div class="border border-deepPurple-300 rounded-lg p-5">
    <div
      class="flex justify-start items-center gap-4 border-b-2 border-deepPurple-300 pb-3"
    >
      <img src="/termloan/applicant.png" alt="applicant" class="size-14" />
      <h2 class="text-xl font-semibold font-roboto text-gray-600">
        Add Applicant Details
      </h2>
    </div>
    <div class=" grid grid-cols-12 gap-5 p-5">
      <div class="col-span-9 grid grid-cols-12 gap-5 items-start">
        <div class="col-span-4">
          <h1 class="block text-sm font-medium text-gray-700 capitalize">
            applicant name
          </h1>
          <input
            type="text"
            id="username"
            class="mt-1 block w-full px-3 py-1 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
          />
        </div>
        <div class="col-span-4">
          <h1 class="block text-sm font-medium text-gray-700 capitalize">
            age
          </h1>
          <input
            type="text"
            id="username"
            class="mt-1 block w-full px-3 py-1 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
          />
        </div>
        <div class="col-span-4">
          <label
            for="dateOfBirth"
            class="block text-sm font-medium text-gray-700">Date of Birth</label
          >
          <input
            type="date"
            id="dateOfBirth"
            bind:value={dateOfBirth}
            class="mt-1 block w-full px-3 py-1 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
          />
        </div>

        <div class="col-span-6">
          <label for="district" class="block text-sm font-medium text-gray-700"
            >State</label
          >
          <select
            id="state"
            bind:value={state}
            class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
          >
            <option value="" disabled>Select a state</option>
            {#each states as stateName}
              <option value={stateName}>{stateName}</option>
            {/each}
          </select>
        </div>
        <div class="col-span-6">
          <label for="district" class="block text-sm font-medium text-gray-700"
            >District</label
          >
          <select
            id="district"
            bind:value={district}
            class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
          >
            <option value="" disabled>Select a district</option>
            {#each districts as districtName}
              <option value={districtName}>{districtName}</option>
            {/each}
          </select>
        </div>
        <div class="col-span-6">
          <label for="district" class="block text-sm font-medium text-gray-700"
            >Area</label
          >
          <select
            id="area"
            bind:value={area}
            class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
          >
            <option value="" disabled>Select a area</option>
            {#each areas as areaName}
              <option value={areaName}>{areaName}</option>
            {/each}
          </select>
        </div>
        <div class="col-span-6">
          <label for="district" class="block text-sm font-medium text-gray-700"
            >Village/City</label
          >
          <select
            id="district"
            bind:value={village}
            class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
          >
            <option value="" disabled>Select a village/city</option>
            {#each villages as villageName}
              <option value={villageName}>{villageName}</option>
            {/each}
          </select>
        </div>
        <div class="col-span-8">
          <h1 class="block text-sm font-medium text-gray-700 capitalize">
            Address
          </h1>
          <input
            type="text"
            id="address"
            class="mt-1 block w-full px-3 py-1 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
          />
        </div>
        <div class="col-span-4">
          <h1 class="block text-sm font-medium text-gray-700 capitalize">
            Pincode
          </h1>
          <input
            type="text"
            id="pincode"
            class="mt-1 block w-full px-3 py-1 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
          />
        </div>

        <div class="col-span-4">
          <h1 class="block text-sm font-medium text-gray-700">Gender</h1>
          <div class="mt-1 flex">
            <label class="inline-flex items-center">
              <input
                type="radio"
                name="gender"
                value="male"
                bind:group={gender}
                class="form-radio"
              />
              <span class="ml-2">Male</span>
            </label>
            <label class="inline-flex items-center ml-6">
              <input
                type="radio"
                name="gender"
                value="female"
                bind:group={gender}
                class="form-radio"
              />
              <span class="ml-2">Female</span>
            </label>
            <label class="inline-flex items-center ml-6">
              <input
                type="radio"
                name="gender"
                value="other"
                bind:group={gender}
                class="form-radio"
              />
              <span class="ml-2">Other</span>
            </label>
          </div>
        </div>
        <div class="col-span-4">
          <h1 class="block text-sm font-medium text-gray-700 capitalize">
            marital
          </h1>
          <div class="mt-1 flex">
            <label class="inline-flex items-center">
              <input
                type="radio"
                name="marital"
                value="male"
                bind:group={marital}
                class="form-radio"
              />
              <span class="ml-2">Married</span>
            </label>
            <label class="inline-flex items-center ml-6">
              <input
                type="radio"
                name="marital"
                value="female"
                bind:group={marital}
                class="form-radio"
              />
              <span class="ml-2">Unmarried</span>
            </label>
          </div>
        </div>

        <div class="col-span-6">
          <h1 class="block text-sm font-medium text-gray-700 capitalize">
            Father / Husband Name
          </h1>
          <input
            type="text"
            id="name"
            class="mt-1 block w-full px-3 py-1 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
          />
        </div>
        <div class="col-span-6">
          <h1 class="block text-sm font-medium text-gray-700 capitalize">
            Caste
          </h1>
          <input
            type="text"
            id="Caste"
            class="mt-1 block w-full px-3 py-1 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
          />
        </div>
        <div class="col-span-6">
          <h1 class="block text-sm font-medium text-gray-700 capitalize">
            PAN Card no.
          </h1>
          <input
            type="text"
            id="PAN Card"
            class="mt-1 block w-full px-3 py-1 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
          />
        </div>
        <div class="col-span-6">
          <h1 class="block text-sm font-medium text-gray-700 capitalize">
            adharcard no.
          </h1>
          <input
            type="text"
            id="adharcard"
            class="mt-1 block w-full px-3 py-1 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
          />
        </div>
      </div>

      <div class="col-span-3 space-y-9">
        <div class="col-span-3">
          <h1 class="block text-sm font-medium text-gray-700 capitalize">
            Upload applicant Photo
          </h1>
          <input
            type="text"
            id="username"
            class="mt-1 block w-full px-3 py-1 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
          />
          <button
            type="button"
            class="my-3 w-[300px] py-2 px-4 capitalize border border-gray-300 bg-gray-200 text-gray-500 font-semibold rounded-md shadow-sm hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2"
          >
            Upload
          </button>
        </div>
        <div>
          <h1 class="block text-sm font-medium text-gray-700 capitalize">
            Mobile no.
          </h1>
          <input
            type="text"
            id="mobNo"
            class="mt-1 block w-full px-3 py-1 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
          />
        </div>
      </div>
      <div class="col-span-12 grid grid-cols-12 gap-5">
        <div
          class="col-span-12 flex justify-start items-center gap-4 border-b-2 border-deepPurple-300 py-3"
        >
          <img src="/termloan/applicant.png" alt="applicant" class="size-14" />
          <h2 class="text-xl font-semibold font-roboto text-gray-600">
            Add Guarantor Details
          </h2>
        </div>

        <div class="col-span-9 grid grid-cols-12 gap-5 items-start">
          <div class="col-span-4">
            <h1 class="block text-sm font-medium text-gray-700 capitalize">
              Full Name
            </h1>
            <input
              type="text"
              id="username"
              class="mt-1 block w-full px-3 py-1 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            />
          </div>
          <div class="col-span-4">
            <h1 class="block text-sm font-medium text-gray-700 capitalize">
              age
            </h1>
            <input
              type="text"
              id="username"
              class="mt-1 block w-full px-3 py-1 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            />
          </div>

          <div class="col-span-6">
            <label
              for="district"
              class="block text-sm font-medium text-gray-700">State</label
            >
            <select
              id="state"
              bind:value={state}
              class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            >
              <option value="" disabled>Select a state</option>
              {#each states as stateName}
                <option value={stateName}>{stateName}</option>
              {/each}
            </select>
          </div>
          <div class="col-span-6">
            <label
              for="district"
              class="block text-sm font-medium text-gray-700">District</label
            >
            <select
              id="district"
              bind:value={district}
              class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            >
              <option value="" disabled>Select a district</option>
              {#each districts as districtName}
                <option value={districtName}>{districtName}</option>
              {/each}
            </select>
          </div>
          <div class="col-span-6">
            <label
              for="district"
              class="block text-sm font-medium text-gray-700">Area</label
            >
            <select
              id="area"
              bind:value={area}
              class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            >
              <option value="" disabled>Select a area</option>
              {#each areas as areaName}
                <option value={areaName}>{areaName}</option>
              {/each}
            </select>
          </div>
          <div class="col-span-6">
            <label
              for="district"
              class="block text-sm font-medium text-gray-700"
              >Village/City</label
            >
            <select
              id="district"
              bind:value={village}
              class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            >
              <option value="" disabled>Select a village/city</option>
              {#each villages as villageName}
                <option value={villageName}>{villageName}</option>
              {/each}
            </select>
          </div>
          <div class="col-span-8">
            <h1 class="block text-sm font-medium text-gray-700 capitalize">
              Address
            </h1>
            <input
              type="text"
              id="address"
              class="mt-1 block w-full px-3 py-1 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            />
          </div>
          <div class="col-span-4">
            <h1 class="block text-sm font-medium text-gray-700 capitalize">
              Pincode
            </h1>
            <input
              type="text"
              id="pincode"
              class="mt-1 block w-full px-3 py-1 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            />
          </div>

          <div class="col-span-4">
            <h1 class="block text-sm font-medium text-gray-700">Gender</h1>
            <div class="mt-1 flex">
              <label class="inline-flex items-center">
                <input
                  type="radio"
                  name="gender"
                  value="male"
                  bind:group={gender}
                  class="form-radio"
                />
                <span class="ml-2">Male</span>
              </label>
              <label class="inline-flex items-center ml-6">
                <input
                  type="radio"
                  name="gender"
                  value="female"
                  bind:group={gender}
                  class="form-radio"
                />
                <span class="ml-2">Female</span>
              </label>
              <label class="inline-flex items-center ml-6">
                <input
                  type="radio"
                  name="gender"
                  value="other"
                  bind:group={gender}
                  class="form-radio"
                />
                <span class="ml-2">Other</span>
              </label>
            </div>
          </div>
          <div class="col-span-4">
            <h1 class="block text-sm font-medium text-gray-700 capitalize">
              marital
            </h1>
            <div class="mt-1 flex">
              <label class="inline-flex items-center">
                <input
                  type="radio"
                  name="marital"
                  value="male"
                  bind:group={marital}
                  class="form-radio"
                />
                <span class="ml-2">Married</span>
              </label>
              <label class="inline-flex items-center ml-6">
                <input
                  type="radio"
                  name="marital"
                  value="female"
                  bind:group={marital}
                  class="form-radio"
                />
                <span class="ml-2">Unmarried</span>
              </label>
            </div>
          </div>

          <div class="col-span-6">
            <h1 class="block text-sm font-medium text-gray-700 capitalize">
              Father / Husband Name
            </h1>
            <input
              type="text"
              id="name"
              class="mt-1 block w-full px-3 py-1 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            />
          </div>
          <div class="col-span-6">
            <h1 class="block text-sm font-medium text-gray-700 capitalize">
              Caste
            </h1>
            <input
              type="text"
              id="Caste"
              class="mt-1 block w-full px-3 py-1 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            />
          </div>
          <div class="col-span-6">
            <h1 class="block text-sm font-medium text-gray-700 capitalize">
              PAN Card no.
            </h1>
            <input
              type="text"
              id="PAN Card"
              class="mt-1 block w-full px-3 py-1 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            />
          </div>
          <div class="col-span-6">
            <h1 class="block text-sm font-medium text-gray-700 capitalize">
              adharcard no.
            </h1>
            <input
              type="text"
              id="adharcard"
              class="mt-1 block w-full px-3 py-1 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            />
          </div>
        </div>

        <div class="col-span-3 space-y-9">
          <div class="col-span-3">
            <h1 class="block text-sm font-medium text-gray-700 capitalize">
              Upload applicant Photo
            </h1>
            <input
              type="text"
              id="username"
              class="mt-1 block w-full px-3 py-1 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            />
            <button
              type="button"
              class="my-3 w-[300px] py-2 px-4 capitalize border border-gray-300 bg-gray-200 text-gray-500 font-semibold rounded-md shadow-sm hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2"
            >
              Upload
            </button>
          </div>
          <div>
            <h1 class="block text-sm font-medium text-gray-700 capitalize">
              Mobile no.
            </h1>
            <input
              type="text"
              id="mobNo"
              class="mt-1 block w-full px-3 py-1 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            />
          </div>
        </div>
      </div>

      <div
        class="col-span-12 flex justify-between items-center mx-auto gap-5 pt-5"
      >
        <button
          type="button"
          class="w-[300px] uppercase py-2 px-4 bg-gray-500 text-white font-semibold rounded-md shadow-sm hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2"
        >
          Cancel
        </button>
        <button
          type="button"
          class="w-[300px] uppercase py-2 px-4 bg-blue-500 text-white font-semibold rounded-md shadow-sm hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
        >
          Save
        </button>
      </div>
    </div>
  </div>
</div>
