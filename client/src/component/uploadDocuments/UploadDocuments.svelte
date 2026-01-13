<script>
  import { beforeNavigate, goto } from "$app/navigation";
  import { onMount, createEventDispatcher } from "svelte";
  import { masters, username, given_name, id } from "$appstore/store";
  import FileUploadModal from "./FileUploadModal.svelte";
  import { Helper } from "flowbite-svelte";
  console.log("username", $id);

  // export let handleButtonClick;
  export let data;
  export let properties;
  export let licPolicies;
  export let fds;
  export let guarantorPersonalDetails;
  export let errors;
  export let onInput;
  export let onSubmit;
  export let personalDetails;
  let dataloaded = false;
  console.log("guarantor person details", guarantorPersonalDetails);

  let applicantDocuments = [];
  let guarantorDocuments = [];
  let collateralDocuments = [];

  const dispatch = createEventDispatcher();
  const aadhar_no = personalDetails.aadhar;
  let education = [];
  const application_id = personalDetails.id;
  export let handleBackButtonClick;
  let m_upload_documents = [];
const init = async () => {
    console.log("Refreshing data...");
    console.log("masters: ", $masters);
    console.log("data: ", data);
    console.log("properties: ", properties);
    console.log("fds: ", fds);
    console.log("licPolicies: ", licPolicies);
    education = $masters.m_educational_qualification.filter(
      (e) => e.id == personalDetails.education_qualification
    );
    console.log("education is ", education);

    m_upload_documents = $masters.m_upload_documents;
    applicantDocuments = m_upload_documents
      .filter((e) => e.upload_for == 1)
      .map((e) => {
        const entry = data.find((d) => d.document_id == e.id);
        const fileName = entry?.org_filename;
        console.log("filename for id: ", e.id, " is : ", fileName);
        return {
          id: e.id,
          name: `${e.eng_name} - ${e.dev_name}`,
          fileName,
          showModal: false,
          fileTypes: e.file_type.split(",").map((e) => e.trim(e)),
        };
      })
      .sort((a, b) => a.id - b.id);

    if (!personalDetails.pan) {
      // Remove the document with id 19 (Applicant PAN Card)
      applicantDocuments = applicantDocuments.filter(
        (document) => document.id !== 19
      );
    }

    guarantorDocuments = m_upload_documents
      .filter((e) => e.upload_for == 2)
      .map((e) => {
        const entry = data.find((d) => d.document_id == e.id);
        const fileName = entry?.org_filename;
        return {
          id: e.id,
          name: `${e.eng_name} - ${e.dev_name}`,
          fileName,
          showModal: false,
          fileTypes: e.file_type.split(",").map((e) => e.trim(e)),
        };
      })
      .sort((a, b) => a.id - b.id);

    if (!guarantorPersonalDetails.pan) {
      // Remove the document with id 19 (Applicant PAN Card)
      guarantorDocuments = guarantorDocuments.filter(
        (document) => document.id !== 27
      );
    }

    if (personalDetails.guarantor == 2) {
      guarantorDocuments = guarantorDocuments.filter((e) => {
        if (e.id == 14) return true;
        if (properties.length && e.id == 26) return true;
      });
    }

    console.log("guarantorDocuments: ", guarantorDocuments);

    collateralDocuments = m_upload_documents
      .filter((e) => e.upload_for == 3)
      .map((e) => {
        const entry = data.find((d) => d.document_id == e.id);
        const fileName = entry?.org_filename;
        return {
          id: e.id,
          name: `${e.eng_name} - ${e.dev_name}`,
          fileName,
          showModal: false,
          fileTypes: e.file_type.split(",").map((e) => e.trim(e)),
        };
      })
      .sort((a, b) => a.id - b.id);

    // id 10 and 13 are from properties

    if (properties.length == 0) {
      // if no properties then remove property related attachments, not required
      collateralDocuments = collateralDocuments.filter((e) => {
        return e.id != 10 && e.id != 13;
      });
    }
    if (licPolicies.length == 0) {
      // if no properties then remove property related attachments, not required
      collateralDocuments = collateralDocuments.filter((e) => {
        return e.id != 21;
      });
    }
    if (fds.length == 0) {
      // if no properties then remove property related attachments, not required
      collateralDocuments = collateralDocuments.filter((e) => {
        return e.id != 22;
      });
    }
    console.log("m_upload_documents: ", m_upload_documents);
    console.log("applicantDocuments: ", applicantDocuments);
    console.log("guarantorDocuments: ", guarantorDocuments);
    console.log("collateralDocuments: ", collateralDocuments);
    dataloaded = true;
  };

  onMount(async() => {
    await init();
  });

  // async function fetchFile(applicationId, documentId) {
  //   const response = await fetch(`/termloan/api/upload/${applicationId}/${documentId}/0`);
  //   if (!response.ok) {
  //     console.error("Failed to fetch file:", response.statusText);
  //     return;
  //   }

  //   const contentType = response.headers.get("Content-Type");

  //   if (contentType.startsWith("image/") || contentType === "application/pdf") {
  //     const blob = await response.blob();
  //     const newTab = window.open();

  //     if (contentType.startsWith("image/")) {
  //       const imgURL = URL.createObjectURL(blob);
  //       newTab.document.write(
  //         `<img src="/termloan/${imgURL}" style="max-width: 100%; height: auto;" />`
  //       );
  //     } else if (contentType === "application/pdf") {
  //       const pdfURL = URL.createObjectURL(blob);
  //       console.log('pdfURl',pdfURL)
  //       newTab.document.write(
  //         `<iframe src="/termloan/${pdfURL}" style="width: 100%; height: 100vh;" frameborder="0"></iframe>`
  //       );
  //     }

  //     newTab.document.close();
  //   } else {
  //     const fileContent = await response.text(); // Handle as text if it's not an image or PDF
  //     const newTab = window.open();
  //     newTab.document.write(`<pre>${fileContent}</pre>`);
  //     newTab.document.close();
  //   }
  // }

  

  //Disply the Uploded documents ...
  async function fetchFile(applicationId, documentId) {
  const response = await fetch(
    `/termloan/api/upload/${applicationId}/${documentId}/0`
  );

  if (!response.ok) {
    console.error("Failed to fetch file:", response.statusText);
    return;
  }

  const contentType = response.headers.get("Content-Type");
  const blob = await response.blob();
  const fileURL = URL.createObjectURL(blob);

  const newTab = window.open();

  if (contentType.startsWith("image/")) {
    newTab.document.write(`
      <img src="${fileURL}" style="max-width:100%;height:auto;" />
    `);
  } 
  else if (contentType === "application/pdf") {
    newTab.document.write(`
      <iframe src="${fileURL}" style="width:100%;height:100vh;" frameborder="0"></iframe>
    `);
  } 
  else {
    newTab.document.write(`<pre>Unsupported file type</pre>`);
  }

  newTab.document.close();
}


  async function deleteFile(applicationId, documentId) {
    let message;
    if (!applicationId || !documentId) {
      message = "Please provide both Application ID and Document ID.";
      return;
    }

    const response = await fetch(`/termloan/api/upload/${applicationId}/${documentId}/0`, {
      method: "DELETE",
    });

    const data = await response.json();

    if (response.ok) {
      message = data.message; // Success message
    } else {
      message = data.error; // Error message
    }
    dispatch("fetchUploads", {});
  }
  let alerts = [];

  const onFinish = () => {
    alerts = [];
    let alertApplicationDocuments = "";
    let alertGuarantorDocuments = "";
    let alertCollateralDocuments = "";

    console.log("applicantDocuments: ", applicantDocuments);
    const shortFallApplicantDocuments = applicantDocuments
      .filter((e) => !e.fileName)
      .map((e) => e.name);
    if (shortFallApplicantDocuments.length) {
      alertApplicationDocuments = shortFallApplicantDocuments.join(", ");
      alertApplicationDocuments = `You need to attach ${alertApplicationDocuments} documents`;
    }

    const shortFallGuarantorDocuments = guarantorDocuments
      .filter((e) => !e.fileName)
      .map((e) => e.name);
    if (shortFallGuarantorDocuments.length) {
      alertGuarantorDocuments = shortFallGuarantorDocuments.join(", ");
      alertGuarantorDocuments = `You need to attach ${alertGuarantorDocuments} documents`;
    }
    const shortFallCollateralDocuments = collateralDocuments
      .filter((e) => !e.fileName)
      .map((e) => e.name);
    if (shortFallCollateralDocuments.length) {
      alertCollateralDocuments = shortFallCollateralDocuments.join(", ");
      alertCollateralDocuments = `You need to attach ${alertCollateralDocuments} documents`;
    }

    alerts = [
      ...shortFallApplicantDocuments,
      ...shortFallGuarantorDocuments,
      ...shortFallCollateralDocuments,
    ];
    alerts = alerts;
    console.log("alerts: ", alerts);
    if (alerts.length) return;
    goto("/termloan/finalForm");
  };
  let isUploading = false;
  let isUploaded = false;
  let uploadProgress = 0;
  let file;

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

{#if dataloaded}
  <div
    class="border border-deepPurple-300 rounded-lg md:p-5 p-3 space-y-5 lg:mx-10 mx-5 mt-10"
  >
    <h1
      class="lg:text-2xl md:text-xl text-base text-center text-gray-500 font-semibold font-lato border-b-2 border-deepPurple-300 pb-5"
    >
      Applicant Name/अर्जदाराचे नाव : {$given_name}
    </h1>
    <div class="border border-deepPurple-300 rounded-lg pb-5">
      <h1
        class="lg:text-xl md:text-lg text-sm py-3 px-7 bg-deepPurple-100 text-center rounded-t-lg uppercase font-semibold font-roboto text-gray-700 border-b border-deepPurple-300"
      >
        Online Applicant document / certificate upload form <br />
        <h1
          class="lg:text-xl md:text-lg text-sm py-1 px-7 bg-deepPurple-100 text-center rounded-t-lg uppercase font-semibold font-roboto text-gray-700 border-b border-deepPurple-300"
        >
          ऑनलाइन अर्जदार दस्तऐवज / प्रमाणपत्र अपलोड फॉर्म
        </h1>
      </h1>
      <div
        class="grid grid-cols-2 gap-5 border-b-2 border-gray-300 pb-3 py-5 md:px-7 px-5"
      >
        <div
          class="col-span-1 grid grid-cols-12 justify-start items-center lg:gap-5"
        >
          <div
            class="lg:col-span-5 col-span-12 grid grid-cols-3 justify-between items-center lg:text-base text-sm font-inter font-semibold text-gray-500 capitalize"
          >
            <div class="col-span-2">name/नाव</div>
            <div class="hidden lg:block col-span-1 text-end">:</div>
          </div>
          <div
            class="lg:col-span-7 col-span-12 lg:text-base md:text-sm text-xs font-inter font-medium text-gray-500 capitalize text-left"
          >
            {$given_name}
          </div>
        </div>
        <!-- <div
          class="col-span-1 grid grid-cols-12 justify-start items-center lg:gap-5"
        >
          <div
            class="lg:col-span-5 col-span-12 grid grid-cols-3 justify-between items-center lg:text-base text-sm font-inter font-semibold text-gray-500 capitalize"
          >
            <div class="col-span-2">Application ID</div>
            <div class="hidden lg:block col-span-1 text-end">:</div>
          </div>
          <div
            class="lg:col-span-7 col-span-12 lg:text-base md:text-sm text-xs font-inter font-medium text-gray-500 capitalize text-left"
          >
            {personalDetails.form_no == null ? "--" : personalDetails.form_no}
          </div>
        </div> -->
        <div
          class="col-span-1 grid grid-cols-12 justify-start items-center lg:gap-5"
        >
          <div
            class="lg:col-span-5 col-span-12 grid grid-cols-3 justify-between items-center lg:text-base text-sm font-inter font-semibold text-gray-500 capitalize"
          >
            <div class="col-span-2">mobile no/मोबाईल नंबर</div>
            <div class="hidden lg:block col-span-1 text-end">:</div>
          </div>
          <div
            class="lg:col-span-7 col-span-12 lg:text-base md:text-sm text-xs font-inter font-medium text-gray-500 capitalize"
          >
            {$username}
          </div>
        </div>
        <div
          class="col-span-1 grid grid-cols-12 justify-start items-center lg:gap-5"
        >
          <div
            class="lg:col-span-5 col-span-12 grid grid-cols-3 justify-between items-center lg:text-base text-sm font-inter font-semibold text-gray-500 capitalize"
          >
            <div class="col-span-2">Aadhar no/आधार आधार</div>
            <div class="hidden lg:block col-span-1 text-end">:</div>
          </div>
          <div
            class="lg:col-span-7 col-span-12 lg:text-base md:text-sm text-xs font-inter font-medium text-gray-500 capitalize"
          >
            {aadhar_no}
          </div>
        </div>
        <!-- <div
          class="col-span-1 grid grid-cols-12 justify-start items-center lg:gap-5"
        >
          <div
            class="lg:col-span-5 col-span-12 grid grid-cols-3 justify-between items-center lg:text-base text-sm font-inter font-semibold text-gray-500 capitalize"
          >
            <div class="col-span-2">Category</div>
            <div class="hidden lg:block col-span-1 text-end">:</div>
          </div>
          <div
            class="lg:col-span-7 col-span-12 lg:text-base md:text-sm text-xs font-inter font-medium text-gray-500 capitalize"
          >
            Scheduled Caste
          </div>
        </div> -->
        <div
          class="col-span-1 grid grid-cols-12 justify-start items-center lg:gap-5"
        >
          <div
            class="lg:col-span-5 col-span-12 grid grid-cols-3 justify-between items-center lg:text-base text-sm font-inter font-semibold text-gray-500 capitalize"
          >
            <div class="col-span-2">PAN No/पॅन नंबर</div>
            <div class="hidden lg:block col-span-1 text-end">:</div>
          </div>
          <div
            class="lg:col-span-7 col-span-12 lg:text-base md:text-sm text-xs font-inter font-medium text-gray-500 capitalize"
          >
            {personalDetails.pan ? personalDetails.pan : "NA"}
          </div>
        </div>
        <div
          class="col-span-1 grid grid-cols-12 justify-start items-center lg:gap-5"
        >
          <div
            class="lg:col-span-5 col-span-12 grid grid-cols-3 justify-between items-center lg:text-base text-sm font-inter font-semibold text-gray-500 capitalize"
          >
            <div class="col-span-2">Education/शिक्षण</div>
            <div class="hidden lg:block col-span-1 text-end">:</div>
          </div>
          <div
            class="lg:col-span-7 col-span-12 lg:text-base md:text-sm text-xs font-inter font-medium text-gray-500 capitalize"
          >
            {education[0].eng_name}

            {education[0].dev_name}
          </div>
        </div>
      </div>
      <div class="py-3 border-b-2 border-gray-300">
        <h1
          class="lg:text-2xl md:text-xl text-base text-center font-semibold font-inter text-deepPurple-400"
        >
          Upload All Valid Documents <br />
          <h1
            class="lg:text-1xl md:text-xl text-base text-center font-semibold font-inter text-deepPurple-400"
          >
            सर्व वैध कागदपत्रे अपलोड करा
          </h1>
        </h1>
      </div>
      <div class="grid grid-cols-12 lg:gap-5">
        <div class="lg:col-span-6 col-span-12 my-5">
          <div
            class="border border-deepPurple-300 rounded-lg 2xl:ml-7 lg:ml-4 mx-5 lg:mx-0"
          >
            <div
              class="bg-deepPurple-200 py-2 rounded-t-lg border-b border-deepPurple-300"
            >
              <h1
                class="md:text-base text-sm text-center text-gray-700 font-semibold font-inter uppercase"
              >
                Applicant Documents/अर्जदाराची कागदपत्रे
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
                class="col-span-6 xl:text-base md:text-xs text-[10px] uppercase text-gray-500 font-semibold"
              >
                Douments name<br />दस्तऐवजांची नावे
              </div>
              <!-- <div
              class="col-span-6 xl:text-base md:text-xs text-[10px] uppercase text-gray-500 font-semibold"
            >
              uploaed doc. name
            </div> -->
              <div
                class="col-span-3 xl:text-base md:text-xs text-[10px] uppercase text-gray-500 font-semibold text-center"
              >
                Upload / view<br />अपलोड / पहा
              </div>
              <div
                class="col-span-3 xl:text-base md:text-xs text-[10px] uppercase text-gray-500 font-semibold text-center"
              >
                delete<br />काढा
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
                    class="col-span-6 text-left xl:text-base md:text-xs text-[9px] capitalize text-gray-500 font-medium"
                  >
                    {document.name}<span class="text-red-500">*</span>
                  </div>
                  <!-- <div
                  class="col-span-4 xl:text-base text-xs capitalize text-gray-500 font-semibold mx-auto"
                >
                  {document.fileName}
                </div> -->
                  <div class="col-span-3 w-full">
                    {#if !document.fileName}
                      <button
                        on:click={() => {
                          document.showModal = true;
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
                    <!-- read file -->
                    {#if document.fileName}
                      <div class="flex items-center justify-around">
                        <button
                          on:click={() => {
                            fetchFile(application_id, document.id);
                          }}
                        >
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
                        </button>
                      </div>
                    {/if}
                  </div>
                  <!-- delete file -->
                  <div class="col-span-3 w-full">
                    {#if document.fileName}
                      <div class="flex items-center justify-around">
                        <button
                          on:click={() => {
                            deleteFile(application_id, document.id);
                          }}
                        >
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
                        </button>
                      </div>
                    {/if}
                  </div>
                  <div></div>
                </div>
                <FileUploadModal
                  bind:showModal={document.showModal}
                  title={document.name}
                  {application_id}
                  docId={document.id}
                  fileTypes={document.fileTypes}
                  on:fetchUploads
                ></FileUploadModal>
              {/each}
            </div>
          </div>
        </div>
        <!-- {#if guarantorPersonalDetails.current_pincode?.length > 0} -->
        <!-- {#if personalDetails.guarantor == 1} -->
        <div class="lg:col-span-6 col-span-12 my-5">
          <div
            class="border border-deepPurple-300 rounded-lg 2xl:mr-7 mr-4 lg:mx-0 mx-5"
          >
            <div
              class="bg-deepPurple-200 py-2 rounded-t-lg border-b border-deepPurple-300"
            >
              <h1
                class="md:text-base text-sm text-center text-gray-700 font-semibold font-inter uppercase"
              >
                Guarantor Documents/जामीनदार कागदपत्रे
              </h1>
            </div>
            <div
              class="grid grid-cols-12 gap-5 bg-gray-100 border-b border-deepPurple-300 px-3 py-3"
            >
              <div
                class="col-span-6 xl:text-base md:text-xs text-[10px] uppercase text-gray-500 font-semibold"
              >
                Douments name<br />दस्तऐवजांची नावे
              </div>
              <div
                class="col-span-3 xl:text-base md:text-xs text-[10px] uppercase text-gray-500 font-semibold text-center"
              >
                Upload / view<br />अपलोड / पहा
              </div>
              <div
                class="col-span-3 xl:text-base md:text-xs text-[10px] uppercase text-gray-500 font-semibold text-center"
              >
                delete<br />काढा
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
                  <div
                    class="col-span-6 text-left xl:text-base md:text-xs text-[9px] capitalize text-gray-500 font-medium"
                  >
                    {document.name}
                  </div>
                  <div class="col-span-3 w-full">
                    {#if !document.fileName}
                      <button
                        on:click={() => {
                          document.showModal = true;
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
                      <div class="flex items-center justify-around">
                        <button
                          on:click={() => {
                            fetchFile(application_id, document.id);
                          }}
                        >
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
                        </button>
                      </div>
                    {/if}
                  </div>
                  <div class="col-span-3 w-full">
                    {#if document.fileName}
                      <button
                        on:click={() => {
                          deleteFile(application_id, document.id);
                        }}
                      >
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
                      </button>
                    {/if}
                  </div>
                </div>
                <div>
                  <FileUploadModal
                    bind:showModal={document.showModal}
                    title={document.name}
                    {application_id}
                    docId={document.id}
                    fileTypes={document.fileTypes}
                    on:fetchUploads
                  ></FileUploadModal>
                </div>
              {/each}
            </div>
          </div>
        </div>
        <!-- {/if} -->
        <div class="lg:col-span-6 col-span-12 my-5">
          <div
            class="border border-deepPurple-300 rounded-lg 2xl:mr-7 mr-4 lg:mx-0 mx-5"
          >
            <div
              class="bg-deepPurple-200 py-2 rounded-t-lg border-b border-deepPurple-300"
            >
              <h1
                class="md:text-base text-sm text-center text-gray-700 font-semibold font-inter uppercase"
              >
                Collateral Document/तारण कागदपत्र
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
                class="col-span-6 xl:text-base md:text-xs text-[10px] uppercase text-gray-500 font-semibold"
              >
                Douments name<br />दस्तऐवजांची नावे
              </div>
              <!-- <div
            class="col-span-3 xl:text-base md:text-xs text-[10px] uppercase text-gray-500 font-semibold text-center"
            >
              uploaed doc. name
            </div> -->
              <div
                class="col-span-3 xl:text-base md:text-xs text-[10px] uppercase text-gray-500 font-semibold text-center"
              >
                Upload / view<br />अपलोड / पहा
              </div>
              <div
                class="col-span-3 xl:text-base md:text-xs text-[10px] uppercase text-gray-500 font-semibold text-center"
              >
                delete<br />काढा
              </div>
            </div>
            <div class="grid grid-cols-12">
              {#each collateralDocuments as document, index}
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
                    class="col-span-6 text-left xl:text-base md:text-xs text-[9px] capitalize text-gray-500 font-medium"
                  >
                    {document.name}
                  </div>
                  <!-- <div
                  class="col-span-4 xl:text-base text-xs capitalize text-gray-500 font-semibold mx-auto"
                >
                  {document.fileName}
                </div> -->
                  <div class="col-span-3 w-full">
                    {#if !document.fileName}
                      <button
                        on:click={() => {
                          document.showModal = true;
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
                      <div class="flex items-center justify-around">
                        <button
                          on:click={() => {
                            fetchFile(application_id, document.id);
                          }}
                        >
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
                        </button>
                      </div>
                    {/if}
                  </div>
                  <div class="col-span-3 w-full">
                    {#if document.fileName}
                      <button
                        on:click={() => {
                          deleteFile(application_id, document.id);
                        }}
                      >
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
                      </button>
                    {/if}
                  </div>
                </div>
                <div>
                  <FileUploadModal
                    bind:showModal={document.showModal}
                    title={document.name}
                    {application_id}
                    docId={document.id}
                    fileTypes={document.fileTypes}
                    on:fetchUploads
                  ></FileUploadModal>
                </div>
              {/each}
            </div>
          </div>
        </div>
      </div>
    </div>
    {#if alerts.length}
      <Helper color="red">Following documents are missing</Helper>
    {/if}

    {#each alerts as alert, i}
      <Helper color="red">
        {i + 1}
        {alert}
      </Helper>
    {/each}
    <div class="flex justify-center items-center py-5 gap-4">
      <button
        on:click={() => handleBackButtonClick()}
        class="group relative flex items-center justify-center gap-3 border border-gray-300 md:w-[200px] w-[150px] md:py-2 py-1.5 overflow-hidden bg-Calypso-400"
      >
        <span
          class="absolute w-0 h-0 transition-all duration-500 ease-out bg-Calypso-500 group-hover:w-[300px] group-hover:h-56"
        />
        <span class="absolute inset-0 w-full h-full opacity-30" />

        <span class="relative">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke-width="1.5"
            stroke="currentColor"
            class="size-6"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M6.75 15.75 3 12m0 0 3.75-3.75M3 12h18"
            />
          </svg>
        </span>
        <button
          class="relative font-roboto capitalize font-semibold lg:text-xl md:text-base text-sm text-gray-800 group-hover:text-white"
        >
          Back
        </button>
      </button>
      <!-- on:click={() => goto("/finalForm")} -->
      <button
        on:click={onFinish}
        class="group relative flex items-center justify-center gap-3 border border-gray-300 md:w-[200px] w-[150px] py-1.5 md:py-2 overflow-hidden bg-Calypso-400"
      >
        <span
          class="absolute w-0 h-0 transition-all duration-500 ease-out bg-Calypso-500 group-hover:w-[300px] group-hover:h-56"
        />
        <span class="absolute inset-0 w-full h-full opacity-30" />

        <h1
          class="relative font-roboto capitalize font-semibold lg:text-xl md:text-base text-sm text-gray-800 group-hover:text-white"
        >
          Finish
        </h1>
        <span class="relative">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 -960 960 960"
            class="size-6 fill-gray-800 group-hover:fill-white"
          >
            <path
              d="m700-300-57-56 84-84H120v-80h607l-83-84 57-56 179 180-180 180Z"
            />
          </svg>
        </span>
      </button>
    </div>
  </div>
{:else}
  ...Loading
{/if}
