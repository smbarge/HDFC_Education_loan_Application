<script>
  let applicantDocuments = [
    { id: 1, name: "Photograph", fileName: "" },
    { id: 2, name: "identity card proof/residence proof", fileName: "" },
    { id: 3, name: "domicile certificate", fileName: "" },
    { id: 4, name: "proof of date of birth", fileName: "" },
    { id: 5, name: "income certificate (original copy)", fileName: "" },
    { id: 6, name: "certificate of religion", fileName: "" },
    {
      id: 7,
      name: "GST number holder quatation certificate (original copy)",
      fileName: "",
    },
    { id: 8, name: "business address", fileName: "" },
    {
      id: 9,
      name: "Clerk of Place of Business / Shop Act License",
      fileName: "",
    },
    { id: 10, name: "xerox of first page of bank passbook", fileName: "" },
    { id: 11, name: "pan card", fileName: "" },
    { id: 12, name: "ration card", fileName: "" },
  ];

  let guarantorDocuments = [
    { id: 1, name: "Photograph", fileName: "" },
    { id: 2, name: "identity card proof/residence proof", fileName: "" },
    { id: 3, name: "proof of residency", fileName: "" },
    {
      id: 4,
      name: "7/12, 6d, 8a transcript and PR card (original copy)",
      fileName: "",
    },
    { id: 5, name: "Assessment Certificate", fileName: "" },
    { id: 6, name: "Affidavit", fileName: "" },
  ];

  let showModal = false;
  let isUploading = false;
  let isUploaded = false;
  let uploadProgress = 0;
  let file;

  function handleFileChange(event) {
    file = event.target.files[0];
    if (file) {
      startUpload();
    }
  }

  function startUpload() {
    isUploading = true;
    isUploaded = false;
    uploadProgress = 0;

    // Simulate file upload progress
    const interval = setInterval(() => {
      uploadProgress += 10;
      if (uploadProgress >= 100) {
        clearInterval(interval);
        uploadProgress = 100;
        isUploading = false;
        isUploaded = true;
      }
    }, 500); // Adjust the interval duration as needed
  }
</script>

<div class="border border-deepPurple-300 rounded-lg p-5 space-y-5 mx-10 mt-10">
  <h1
    class="text-2xl text-center text-gray-500 font-semibold font-lato border-b-2 border-deepPurple-300 pb-5"
  >
    Applicant Name : Ahmed Khan Pathan
  </h1>
  <div class="border border-deepPurple-300 rounded-lg pb-5">
    <h1
      class="text-xl py-3 px-7 bg-deepPurple-100 text-center rounded-t-lg uppercase font-semibold font-roboto text-gray-700 border-b border-deepPurple-300"
    >
      Online Applicant document / certificate upload form
    </h1>
    <div
      class="grid grid-cols-2 gap-5 border-b-2 border-gray-300 pb-3 py-5 px-7"
    >
      <div class="col-span-1 grid grid-cols-12 gap-5">
        <div
          class="col-span-3 grid grid-cols-3 justify-between items-center text-base font-inter font-semibold text-gray-500 capitalize"
        >
          <div class="col-span-2">name</div>
          <div class="col-span-1 text-end">:</div>
        </div>
        <div
          class="col-span-6 text-base font-inter font-semibold text-gray-500 capitalize text-left"
        >
          Ahmed Khan Pathan
        </div>
      </div>
      <div class="col-span-1 grid grid-cols-12 gap-5">
        <div
          class="col-span-3 grid grid-cols-3 justify-between items-center text-base font-inter font-semibold text-gray-500 capitalize"
        >
          <div class="col-span-2">mobile no</div>
          <div class="col-span-1 text-end">:</div>
        </div>
        <div
          class="col-span-6 text-base font-inter font-semibold text-gray-500 capitalize"
        >
          9857493824
        </div>
      </div>
      <div class="col-span-1 grid grid-cols-12 gap-5">
        <div
          class="col-span-3 grid grid-cols-3 justify-between items-center text-base font-inter font-semibold text-gray-500 capitalize"
        >
          <div class="col-span-2">Aadhar no.</div>
          <div class="col-span-1 text-end">:</div>
        </div>
        <div
          class="col-span-6 text-base font-inter font-semibold text-gray-500 capitalize"
        >
          343556789834
        </div>
      </div>
      <div class="col-span-1 grid grid-cols-12 gap-5">
        <div
          class="col-span-3 grid grid-cols-3 justify-between items-center text-base font-inter font-semibold text-gray-500 capitalize"
        >
          <div class="col-span-2">Category</div>
          <div class="col-span-1 text-end">:</div>
        </div>
        <div
          class="col-span-6 text-base font-inter font-semibold text-gray-500 capitalize"
        >
          Scheduled Caste
        </div>
      </div>
      <div class="col-span-1 grid grid-cols-12 gap-5">
        <div
          class="col-span-3 grid grid-cols-3 justify-between items-center text-base font-inter font-semibold text-gray-500 capitalize"
        >
          <div class="col-span-2">PAN No.</div>
          <div class="col-span-1 text-end">:</div>
        </div>
        <div
          class="col-span-6 text-base font-inter font-semibold text-gray-500 capitalize"
        >
          ABCDE1234M
        </div>
      </div>
      <div class="col-span-1 grid grid-cols-12 gap-5">
        <div
          class="col-span-3 grid grid-cols-3 justify-between items-center text-base font-inter font-semibold text-gray-500 capitalize"
        >
          <div class="col-span-2">Education</div>
          <div class="col-span-1 text-end">:</div>
        </div>
        <div
          class="col-span-6 text-base font-inter font-semibold text-gray-500 capitalize"
        >
          Graduate
        </div>
      </div>
    </div>
    <div class="py-3 border-b-2 border-gray-300">
      <h1
        class="text-2xl text-center font-semibold font-inter text-deepPurple-400"
      >
        Upload all valid Documents
      </h1>
    </div>
    <div class="grid grid-cols-12 gap-5">
      <div class="col-span-6 my-5">
        <!-- <h1
          class="py-3 text-2xl text-center font-semibold font-inter text-gray-600 uppercase"
        >
          Applicant Documents
        </h1> -->
        <div class="border border-deepPurple-300 rounded-lg 2xl:ml-7 ml-4">
          <div
            class="bg-deepPurple-200 py-2 rounded-t-lg border-b border-deepPurple-300"
          >
            <h1
              class="text-center text-gray-700 font-semibold font-inter uppercase"
            >
              Applicant Documents
            </h1>
          </div>
          <div
            class="grid grid-cols-12 gap-5 bg-gray-100 border-b border-deepPurple-300 px-3 py-3"
          >
            <!-- <div
              class="col-span-1 xl:text-base text-xs uppercase text-gray-500 font-semibold mx-auto"
            >
              sr.no.
            </div> -->
            <div
              class="col-span-4 xl:text-base text-xs uppercase text-gray-500 font-semibold"
            >
              douments name
            </div>
            <div
              class="col-span-4 xl:text-base text-xs uppercase text-gray-500 font-semibold mx-auto"
            >
              uploaed doc. name
            </div>
            <div
              class="col-span-2 xl:text-base text-xs uppercase text-gray-500 font-semibold mx-auto"
            >
              Upload/view
            </div>
            <div
              class="col-span-2 xl:text-base text-xs uppercase text-gray-500 font-semibold mx-auto"
            >
              delete
            </div>
          </div>
          <div class="grid grid-cols-12">
            {#each applicantDocuments as document, index}
              <div
                class="col-span-12 grid grid-cols-12 hover:bg-gray-200 py-3 px-3 {index !==
                applicantDocuments.length - 1
                  ? 'border-b border-gray-300 '
                  : 'rounded-b-lg'}"
              >
                <!-- <div
                  class="col-span-1 xl:text-base text-xs capitalize text-gray-500 font-semibold mx-auto"
                >
                  {index + 1}.
                </div> -->
                <div
                  class="col-span-4 text-left xl:text-base text-xs capitalize text-gray-500 font-semibold"
                >
                  {document.name}
                </div>
                <div
                  class="col-span-4 xl:text-base text-xs capitalize text-gray-500 font-semibold mx-auto"
                >
                  {document.fileName}
                </div>
                <div class="col-span-2 w-full">
                  {#if !document.fileName}
                    <button
                      on:click={() => {
                        showModal = true;
                      }}
                      class="flex justify-center mx-auto"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 -960 960 960"
                        fill="#5f6368"
                        class="xl:size-7 size-5 hover:fill-blue-500"
                        id="file-{document.id}"
                      >
                        <path
                          d="M440-160H260q-91 0-155.5-63T40-377q0-78 47-139t123-78q25-92 100-149t170-57q117 0 198.5 81.5T760-520q69 8 114.5 59.5T920-340q0 75-52.5 127.5T740-160H520v-286l64 62 56-56-160-160-160 160 56 56 64-62v286Z"
                        />
                      </svg>
                    </button>
                  {/if}
                  {#if document.fileName}
                    <div>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 -960 960 960"
                        fill="#5f6368"
                        class="xl:size-7 size-5 cursor-pointer hover:fill-blue-500 mx-auto"
                      >
                        <path
                          d="M480-320q75 0 127.5-52.5T660-500q0-75-52.5-127.5T480-680q-75 0-127.5 52.5T300-500q0 75 52.5 127.5T480-320Zm0-72q-45 0-76.5-31.5T372-500q0-45 31.5-76.5T480-608q45 0 76.5 31.5T588-500q0 45-31.5 76.5T480-392Zm0 192q-146 0-266-81.5T40-500q54-137 174-218.5T480-800q146 0 266 81.5T920-500q-54 137-174 218.5T480-200Z"
                        />
                      </svg>
                    </div>
                  {/if}
                </div>
                <div class="col-span-2 w-full">
                  {#if document.fileName}
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 -960 960 960"
                      fill="#5f6368"
                      class="xl:size-7 size-5 cursor-pointer hover:fill-red-500 mx-auto"
                    >
                      <path
                        d="M280-120q-33 0-56.5-23.5T200-200v-520h-40v-80h200v-40h240v40h200v80h-40v520q0 33-23.5 56.5T680-120H280Zm80-160h80v-360h-80v360Zm160 0h80v-360h-80v360Z"
                      />
                    </svg>
                  {/if}
                </div>
              </div>
            {/each}
          </div>
        </div>
      </div>
      <div class="col-span-6 my-5">
        <!-- <h1
          class="py-3 text-2xl text-center font-semibold font-inter text-gray-600 uppercase"
        >
          Guarantor Documents
        </h1> -->
        <div class="border border-deepPurple-300 rounded-lg 2xl:mr-7 mr-4">
          <div
            class="bg-deepPurple-200 py-2 rounded-t-lg border-b border-deepPurple-300"
          >
            <h1
              class="text-center text-gray-700 font-semibold font-inter uppercase"
            >
              Guarantor Documents
            </h1>
          </div>
          <div
            class="grid grid-cols-12 gap-5 bg-gray-100 border-b border-deepPurple-300 px-3 py-3"
          >
            <!-- <div
              class="col-span-1 xl:text-base text-xs uppercase text-gray-500 font-semibold mx-auto"
            >
              sr.no.
            </div> -->
            <div
              class="col-span-4 xl:text-base text-xs uppercase text-gray-500 font-semibold"
            >
              douments name
            </div>
            <div
              class="col-span-4 xl:text-base text-xs uppercase text-gray-500 font-semibold mx-auto"
            >
              uploaed doc. name
            </div>
            <div
              class="col-span-2 xl:text-base text-xs uppercase text-gray-500 font-semibold mx-auto"
            >
              Upload/view
            </div>
            <div
              class="col-span-2 xl:text-base text-xs uppercase text-gray-500 font-semibold mx-auto"
            >
              delete
            </div>
          </div>
          <div class="grid grid-cols-12">
            {#each guarantorDocuments as document, index}
              <div
                class="col-span-12 grid grid-cols-12 hover:bg-gray-200 py-3 px-3 {index !==
                guarantorDocuments.length - 1
                  ? 'border-b border-gray-300 '
                  : 'rounded-b-lg'}"
              >
                <!-- <div
                  class="col-span-1 xl:text-base text-xs capitalize text-gray-500 font-semibold mx-auto"
                >
                  {index + 1}.
                </div> -->
                <div
                  class="col-span-4 text-left xl:text-base text-xs capitalize text-gray-500 font-semibold"
                >
                  {document.name}
                </div>
                <div
                  class="col-span-4 xl:text-base text-xs capitalize text-gray-500 font-semibold mx-auto"
                >
                  {document.fileName}
                </div>
                <div class="col-span-2 w-full">
                  {#if !document.fileName}
                    <div>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 -960 960 960"
                        fill="#5f6368"
                        class="xl:size-7 size-5 cursor-pointer hover:fill-blue-500 mx-auto"
                        id="file-{document.id}"
                      >
                        <path
                          d="M440-160H260q-91 0-155.5-63T40-377q0-78 47-139t123-78q25-92 100-149t170-57q117 0 198.5 81.5T760-520q69 8 114.5 59.5T920-340q0 75-52.5 127.5T740-160H520v-286l64 62 56-56-160-160-160 160 56 56 64-62v286Z"
                        />
                      </svg>
                    </div>
                  {/if}
                  {#if document.fileName}
                    <div>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 -960 960 960"
                        fill="#5f6368"
                        class="xl:size-7 size-5 cursor-pointer hover:fill-blue-500 mx-auto"
                      >
                        <path
                          d="M480-320q75 0 127.5-52.5T660-500q0-75-52.5-127.5T480-680q-75 0-127.5 52.5T300-500q0 75 52.5 127.5T480-320Zm0-72q-45 0-76.5-31.5T372-500q0-45 31.5-76.5T480-608q45 0 76.5 31.5T588-500q0 45-31.5 76.5T480-392Zm0 192q-146 0-266-81.5T40-500q54-137 174-218.5T480-800q146 0 266 81.5T920-500q-54 137-174 218.5T480-200Z"
                        />
                      </svg>
                    </div>
                  {/if}
                </div>
                <div class="col-span-2 w-full">
                  <!-- {#if document.fileName} -->

                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 -960 960 960"
                    fill="#5f6368"
                    class="xl:size-7 size-5 cursor-pointer hover:fill-red-500 mx-auto"
                  >
                    <path
                      d="M280-120q-33 0-56.5-23.5T200-200v-520h-40v-80h200v-40h240v40h200v80h-40v520q0 33-23.5 56.5T680-120H280Zm80-160h80v-360h-80v360Zm160 0h80v-360h-80v360Z"
                    />
                  </svg>
                  <!-- {/if} -->
                </div>
              </div>
            {/each}
          </div>
        </div>
      </div>
    </div>
  </div>
</div>
{#if showModal}
  <div
    class="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-75"
  >
    <div class="relative bg-white shadow-lg w-1/2">
      <button
        on:click={() => {
          showModal = false;
        }}
        class="absolute right-2 top-2"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 -960 960 960"
          class="size-7 fill-white"
        >
          <path
            d="m336-280 144-144 144 144 56-56-144-144 144-144-56-56-144 144-144-144-56 56 144 144-144 144 56 56ZM480-80q-83 0-156-31.5T197-197q-54-54-85.5-127T80-480q0-83 31.5-156T197-763q54-54 127-85.5T480-880q83 0 156 31.5T763-763q54 54 85.5 127T880-480q0 83-31.5 156T763-197q-54 54-127 85.5T480-80Zm0-80q134 0 227-93t93-227q0-134-93-227t-227-93q-134 0-227 93t-93 227q0 134 93 227t227 93Zm0-320Z"
          />
        </svg>
      </button>
      <div class="bg-Calypso-400 px-4 py-2 text-center">
        <h2 class="text-xl font-semibold font-roboto uppercase text-white">
          Upload your document
        </h2>
      </div>
      <div class="p-5">
        <div class="mx-10">
          <label
            for="file-upload"
            class="{isUploading || isUploaded
              ? 'hidden'
              : 'block'} flex flex-col items-center p-6 border-2 border-dashed rounded-lg cursor-pointer hover:bg-gray-100"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 -960 960 960"
              class="size-14 fill-gray-500"
            >
              <path
                d="M260-160q-91 0-155.5-63T40-377q0-78 47-139t123-78q25-92 100-149t170-57q117 0 198.5 81.5T760-520q69 8 114.5 59.5T920-340q0 75-52.5 127.5T740-160H520q-33 0-56.5-23.5T440-240v-206l-64 62-56-56 160-160 160 160-56 56-64-62v206h220q42 0 71-29t29-71q0-42-29-71t-71-29h-60v-80q0-83-58.5-141.5T480-720q-83 0-141.5 58.5T280-520h-20q-58 0-99 41t-41 99q0 58 41 99t99 41h100v80H260Zm220-280Z"
              />
            </svg>
            <span class="mt-2 text-base font-semibold font-marvel text-gray-500"
              >Click to upload</span
            >
            <input
              id="file-upload"
              type="file"
              class="hidden"
              on:change={handleFileChange}
            />
          </label>
          {#if file}
            <div class="mt-4 text-center">
              <span class="text-gray-700 text-lg font-roboto"
                >file name : <span class="text-Calypso-500">
                  {file.name}
                </span>
              </span>
            </div>
          {/if}
          {#if isUploading}
            <div
              class="mt-4 flex justify-center items-center p-5 bg-gray-100 gap-3"
            >
              <div class="w-full bg-gray-200 h-6">
                <div
                  class="bg-Calypso-400 h-6"
                  style="width: {uploadProgress}%"
                ></div>
              </div>
              <div
                class="text-center text-2xl font-semibold font-nanum text-gray-600"
              >
                {uploadProgress}%
              </div>
            </div>
          {/if}
          {#if isUploaded}
            <div class="mt-4 text-center text-green-600">
              <p class="text-sm text-gray-700 mt-2">
                The file <strong class="text-Calypso-600">{file.name}</strong> has
                been uploaded successfully.
              </p>
            </div>
          {/if}
        </div>

        <div class="mt-5 flex justify-between mx-10 items-center">
          <button
            class="bg-blue-500 font-marvel text-white px-10 py-2"
            on:click={() => {
              showModal = false;
            }}>CANCEL</button
          >
          <button
            class="bg-blue-500 font-marvel text-white px-10 py-2"
            on:click={() => {
              showModal = false;
            }}>DONE</button
          >
        </div>
      </div>
    </div>
  </div>
{/if}
