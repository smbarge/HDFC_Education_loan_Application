<script>
  import { onMount, createEventDispatcher } from "svelte";
  export let showModal = false;
  export let title;
  export let application_id;
  export let docId;
  export let fileTypes;
  export let iteration = 0;
  let isUploading = false;
  let isUploaded = false;
  let uploadProgress = 0;

  let file;
  const dispatch = createEventDispatcher();
  console.log("iteration is: ", iteration);
  function getFileExtension(fileName) {
    const parts = fileName.split(".");
    return parts.length > 1 ? `.${parts.pop().toLowerCase()}` : "No extension";
  }

  const init = async () => {
    console.log("Refreshing data...");
  };

  async function handleFileUpload(event) {
  event.preventDefault();
  console.log("Handle change called", file);

  if (!file) {
    alert("Please select a file.");
    return;
  }

  if (file.size === 0) {
    alert("File size is zero, please select a valid file.");
    return;
  }

  let fileExtension = getFileExtension(file.name);
  if (
    !fileTypes.find((e) => e.toLowerCase() === fileExtension.toLowerCase())
  ) {
    alert(
      `Your file extension ${fileExtension} is not allowed. Only extension(s) ${fileTypes.join(", ")} are allowed.`
    );
    return;
  }

  const formData = new FormData();
  formData.append("file", file);

  isUploading = true;
  uploadProgress = 100; 

  try {
    const response = await fetch(
      `/termloan/api/upload/${application_id}/${docId}/${iteration}`,
      {
        method: "POST",
        body: formData,
      }
    );
      
    if (response.ok) {
      uploadProgress = 100; 
      alert("File uploaded successfully");
      isUploaded = true;
      showModal = false;
      await init();
    } else {
      uploadProgress = 0; 
      let result = await response.json()
      console.log('response',result)
      alert(result?.message);
    }
  } catch (error) {
    alert("An error occurred during the upload.");
    console.error(error);
  } finally {
    isUploading = false;
  }

  dispatch("fetchUploads", {});
}

  // async function handleFileUpload(event) {
  //   event.preventDefault();
  //   console.log("Handle change called", file);

  //   if (!file) {
  //     alert("Please select a file.");
  //     return;
  //   }

  //   if (file.size === 0) {
  //     alert("File size is zero, please select a valid file.");
  //     return;
  //   }

  //   let fileExtension = getFileExtension(file.name);
  //   if (
  //     !fileTypes.find((e) => e.toLowerCase() === fileExtension.toLowerCase())
  //   ) {
  //     alert(
  //       `Your file extension ${fileExtension} is not allowed. Only extension(s) ${fileTypes.join(", ")} are allowed.`
  //     );
  //     return;
  //   }

  //   const formData = new FormData();
  //   formData.append("file", file);

  //   isUploading = true;

  //   try {
  //     const response = await fetch(
  //       `/termloan/api/upload/${application_id}/${docId}/${iteration}`,
  //       {
  //         method: "POST",
  //         body: formData,
  //       }
  //     );

  //     if (response.ok) {
  //       alert("File uploaded successfully");
  //       isUploaded = true;
  //       showModal = false;
  //       await init();
  //     } else {
  //       alert("File upload failed");
  //     }
  //   } catch (error) {
  //     alert("An error occurred during the upload.");
  //     console.error(error);
  //   } finally {
  //     isUploading = false;
  //   }

  //   dispatch("fileUploaded", {});
  // }

  onMount(async () => {
    await init();
  });
</script>

{#if showModal}
  <div
    class="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-75"
  >
    <div class="relative bg-white shadow-lg lg:w-1/2 md:w-2/3 w-[310px]">
      <button
        on:click={() => {
          showModal = false;
        }}
        class="absolute right-2 top-2"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 -960 960 960"
          class="md:size-7 size-6 fill-white"
        >
          <path
            d="m336-280 144-144 144 144 56-56-144-144 144-144-56-56-144 144-144-144-56 56 144 144-144 144 56 56ZM480-80q-83 0-156-31.5T197-197q-54-54-85.5-127T80-480q0-83 31.5-156T197-763q54-54 127-85.5T480-880q83 0 156 31.5T763-763q54 54 85.5 127T880-480q0 83-31.5 156T763-197q-54 54-127 85.5T480-80Zm0-80q134 0 227-93t93-227q0-134-93-227t-227-93q-134 0-227 93t-93 227q0 134 93 227t227 93Zm0-320Z"
          />
        </svg>
      </button>
      <div class="bg-Calypso-400 px-4 py-2 text-center">
        <h2
          class="md:text-xl text-base font-semibold font-roboto uppercase text-white mr-4"
        >
          {title ? title : "Upload your document"}
        </h2>
      </div>
      <div class="p-5">
        <form on:submit={handleFileUpload}>
          <div class="">
            <label
              for="file-upload"
              class="{isUploading || isUploaded
                ? 'hidden'
                : 'block'} flex flex-col items-center p-6 border-2 border-dashed rounded-lg cursor-pointer hover:bg-gray-100 mx-10"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 -960 960 960"
                class="md:size-14 size-10 fill-gray-500"
              >
                <path
                  d="M260-160q-91 0-155.5-63T40-377q0-78 47-139t123-78q25-92 100-149t170-57q117 0 198.5 81.5T760-520q69 8 114.5 59.5T920-340q0 75-52.5 127.5T740-160H520q-33 0-56.5-23.5T440-240v-206l-64 62-56-56 160-160 160 160-56 56-64-62v206h220q42 0 71-29t29-71q0-42-29-71t-71-29h-60v-80q0-83-58.5-141.5T480-720q-83 0-141.5 58.5T280-520h-20q-58 0-99 41t-41 99q0 58 41 99t99 41h100v80H260Zm220-280Z"
                />
              </svg>
              <span
                class="mt-2 md:text-base text-sm font-semibold font-marvel text-gray-500"
                >Click to upload</span
              >
              <input
                id="file-upload"
                type="file"
                class="hidden"
                on:change={(e) => (file = e.target.files[0])}
              />
            </label>
            {#if file}
              <div class="mt-4 text-center">
                <span class="text-gray-700 md:text-lg text-base font-roboto"
                  >file name : <span
                    class="text-Calypso-500 md:text-lg text-base"
                  >
                    {file.name}
                  </span>
                </span>
              </div>
            {/if}
            {#if isUploading}
              <div
                class="mt-4 flex justify-center items-center md:p-5 p-2.5 bg-gray-100 gap-3 md:mx-10"
              >
                <div class="w-full bg-gray-200 md:h-6 h-4">
                  <div
                    class="bg-Calypso-400 md:h-6 h-4"
                    style="width: {uploadProgress}%"
                  />
                </div>
                <div
                  class="text-center lg:text-2xl md:text-xl text-base font-semibold font-nanum text-gray-600"
                >
                  {uploadProgress}%
                </div>
              </div>
            {/if}
            {#if isUploaded}
              <div class="mt-4 text-center text-green-600">
                <p class="text-sm text-gray-700 mt-2">
                  The file <strong class="text-Calypso-600">
                    {file.name}
                  </strong>
                  has been uploaded successfully.
                </p>
              </div>
            {/if}
          </div>

          <div class="mt-5 flex justify-between md:mx-10 items-center">
            <button
              class="bg-blue-500 font-roboto md:text-base text-sm text-white md:px-10 px-5 md:py-2 py-1.5"
              on:click={() => {
                showModal = false;
              }}>CANCEL</button
            >
            <button
              type="submit"
              class="bg-blue-500 font-roboto md:text-base text-sm text-white md:px-10 px-5 md:py-2 py-1.5"
              >DONE</button
            >
          </div>
        </form>
      </div>
    </div>
  </div>
{/if}
