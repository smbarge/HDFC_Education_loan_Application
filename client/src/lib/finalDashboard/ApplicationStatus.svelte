<script>
  import { onMount, createEventDispatcher } from "svelte";
  import FileUploadModal from "../../component/uploadDocuments/FileUploadModal.svelte";
  import { api } from "$api/api";
  import Aadhar from "../../component/reUploadDocDetails/Aadhar.svelte";
  import PanCard from "../../component/reUploadDocDetails/PanCard.svelte";
  import RationCard from "../../component/reUploadDocDetails/RationCard.svelte";
  import IncomeCertificate from "../../component/reUploadDocDetails/IncomeCertificate.svelte";
  import GstQuotation from "../../component/reUploadDocDetails/GSTQuotation.svelte";
  import BankPassbook from "../../component/reUploadDocDetails/BankPassbook.svelte";
  import GuarantorPanCard from "../../component/reUploadDocDetails/GuarantorPanCard.svelte";
  import GuarantorAadhar from "../../component/reUploadDocDetails/GuarantorAadhar.svelte";
  import ShopAct from "../../component/reUploadDocDetails/ShopAct.svelte";
  import { masters } from "$appstore/store";
  import MmfcPdf3ManjuriPatr from "$lib/component/pdf/mmfcPdf3_manjuriPatr.svelte";
  import MmfcPdf3ManjuriPatr2 from "$lib/component/pdf/mmfcPdf3_manjuriPatr2.svelte";
  export let onDocumentsUpload;
  export let steps;
  export let application;
  export let answerArray;
  export let documentMaster;
  console.log("documets master issss", answerArray);
  let uploadedDocuments = [];
  const dispatch = createEventDispatcher();
  let sanctionDetails;

  let documents = [
    // {
    //   document_id:0,
    //   answerArray: [],
    //   isTheDocumentUploaded = false
    // }
  ];

  let nextIteration = 0;
  let alertMsg = "";
  let alertType = "error";
  const onSubmit = async () => {
    alertMsg = "";
    const notUploaded = documents
      .filter((e) => !e.fileExists)
      .map((e) => e.document_name);

    if (notUploaded.length > 0) {
      alertMsg = `Please upload files: ${notUploaded.join(", ")}`;
      alertType = "error";
      hideAlertAfterTimeout();
      return;
    }

    const application_id = application.personalDetails.id;
    const response = await api.reConfirmForm({
      application_id: application_id,
      iteration: nextIteration,
    });

    if (response.error) {
      alertMsg =
        response.errorMsg || "An error occurred while confirming the form.";
      alertType = "error";
    } else {
      alertMsg = "Form confirmed successfully.";
      alertType = "success";
    }

    hideAlertAfterTimeout();
    // await init();
    window.location.reload();
  };

  const downloadDocx = async () => {
    let app = application;
    console.log("application is...", application);
    const guarantorCheck = application.personalDetails.guarantor;
    let applicantAadhar = application.personalDetails.aadhar;
    let applicantDOB = application.personalDetails.dob;
    let applicantAddress =
      application.personalDetails.permanent_address +
      " " +
      application.personalDetails.permanent_area +
      " " +
      application.personalDetails.permanent_place;
    let applicantPinCode = application.personalDetails.permanent_pincode;

    let guarantorName =
      guarantorCheck == 1
        ? application.guarantorPersonalDetails.name
        : application.personalDetails.name;
    let guarantorDOB =
      guarantorCheck == 1
        ? application.guarantorPersonalDetails.dob
        : application.personalDetails.dob;
    let guarantorAddress =
      guarantorCheck == 1
        ? application.guarantorPersonalDetails.permanent_address +
          " " +
          application.guarantorPersonalDetails.permanent_area +
          " " +
          application.guarantorPersonalDetails.permanent_place
        : application.personalDetails.permanent_address +
          " " +
          application.personalDetails.permanent_area +
          " " +
          application.personalDetails.permanent_place;
    let guarantorPinCode =
      guarantorCheck == 1
        ? application.guarantorPersonalDetails.permanent_pincode
        : application.personalDetails.permanent_pincode;
    let guarantorPanCard =
      guarantorCheck == 1
        ? application.guarantorPersonalDetails.pan
        : application.personalDetails.pan;
    let guarantorAadhar =
      guarantorCheck == 1
        ? application.guarantorPersonalDetails.aadhar
        : application.personalDetails.aadhar;

    let district = $masters.m_district.find(
      (e) => e.dist_id == app.personalDetails.distric_id
    )?.eng_name;
    const calculateAge = (dob) => {
      let birthDate = new Date(dob);
      let today = new Date();
      let age = today.getFullYear() - birthDate.getFullYear();
      let monthDiff = today.getMonth() - birthDate.getMonth();

      if (
        monthDiff < 0 ||
        (monthDiff === 0 && today.getDate() < birthDate.getDate())
      ) {
        age--;
      }
      return age;
    };

    let applicantAge = calculateAge(applicantDOB);
    let guarantorAge = calculateAge(guarantorDOB);
    console.log("Applicant's Age:", applicantAge);

    try {
      const response = await fetch("/termloan/api/aggreementDoc", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          applicantDistrict: district,
          applicantName: app.personalDetails.name,
          applicantAge: applicantAge,
          applicantAddress: applicantAddress,
          applicantPinCode: applicantPinCode,
          applicantAadhar: applicantAadhar,
          guarantorName: guarantorName,
          guarantorAge: guarantorAge,
          guarantorAddress: guarantorAddress,
          guarantorPinCode: guarantorPinCode,
          guarantorAadhar: guarantorAadhar,
          guarantorPanCard: guarantorPanCard,
        }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const blob = await response.blob();
      const url = URL.createObjectURL(blob);

      const a = document.createElement("a");
      a.href = url;
      a.download = "generated_report.docx";
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
    } catch (error) {
      console.error("Error downloading DOCX:", error);
    }
  };

  const hideAlertAfterTimeout = () => {
    setTimeout(() => {
      alertMsg = "";
    }, 3000);
  };

  const checkFileExists = async (fileUrl) => {
    let fileExists = false;
    try {
      const response = await fetch(fileUrl, { method: "HEAD" });
      fileExists = response.ok; // true if the file exists
    } catch (error) {
      console.error("Error checking file existence:", error);
      fileExists = false;
    }
    return fileExists;
  };
  let dataLoaded = false;

  const viewDocument = (documentUrl) => {
    window.open(documentUrl, "_blank");
  };
  let docNames = [];

  const init = async () => {
    dataLoaded = false;
    let application_id = application?.personalDetails?.id;
    {
      let { error, errorMsg, iteration, answers } = await api.getAnswers({
        application_id,
        status: application?.personalDetails.verification_status,
      });
      nextIteration = iteration + 1;
    }

    console.log("nextIteration :", nextIteration);

    if (application?.personalDetails.verification_status === "00") {
      let { error, errorMsg, documents } = await api.getUploadDocs({
        application_id,
      });

      console.log("documents fetched:", documents);

      if (error) {
        console.error("API getUploadDocs returned error: ", error, errorMsg);
        return;
      }

      docNames = documents.map((d) => ({
        dev_name: d.dev_name,
        eng_name: d.eng_name,
      }));

      console.log("Filtered document names:", docNames);

      uploadedDocuments = documents.map((d) => {
        return {
          document_id: d.document_id,
          fileUrl: `/termloan/api/upload/${d.application_id}/${d.document_id}/${d.iteration}`,
          dev_name: d.dev_name,
          eng_name: d.eng_name,
        };
      });

      console.log("uploadedDocuments:", uploadedDocuments);
    }

    console.log("answer array iss", answerArray);
    answerArray = answerArray.filter(
      (e) => ![30, 31, 32, 33, 34, 35].includes(e.document_id)
    );

    let document_ids = answerArray.map((e) => e.document_id);
    document_ids = [...new Set(document_ids)].sort((a, b) => b - a);

    const promises = document_ids.map(async (document_id) => {
      let fileUrl = `/termloan/api/upload/${application_id}/${document_id}/${nextIteration}`;
      let fileExists = await checkFileExists(fileUrl);

      const dmEntry = documentMaster.find((e) => e.id === document_id);
      let document_name = `${dmEntry?.eng_name}-${dmEntry?.dev_name}`;

      return {
        document_id,
        answerArray: answerArray.filter((e) => e.document_id === document_id),
        isTheDocumentUploaded: fileExists,
        fileUrl,
        fileExists,
        document_name,
      };
    });

    documents = await Promise.all(promises);
    console.log("Documents info:", documents);
    {
      let {
        error,
        errorMsg,
        distrctDetails,
        sanctionDetails: lSanctionDetails,
      } = await api.getSanctionDetails({
        applicationId: application?.personalDetails.id,
      });
      sanctionDetails = lSanctionDetails;
    }
    dataLoaded = true;
  };
  onMount(async () => {
    await init();
  });

  async function deleteFile(applicationId, documentId, iteration) {
    console.log(
      "application id is",
      applicationId,
      "doc id",
      documentId,
      "iteration",
      iteration
    );

    if (!applicationId || !documentId) {
      alert("Please provide both Application ID and Document ID.");
      return;
    }

    try {
      const response = await fetch(
        `/termloan/api/upload/${applicationId}/${documentId}/${iteration}`,
        {
          method: "DELETE",
        }
      );

      if (response.ok) {
        const data = await response.json();
        alert(data.message || "File deleted successfully!");
        documents = documents.filter((doc) => doc.document_id !== documentId);
        dispatch("fetchUploads", {});

        await init();
      } else {
        const errorData = await response.json();
        alert(errorData.error || "Failed to delete the file.");
      }
    } catch (error) {
      console.error("Error deleting file:", error);
      alert("An unexpected error occurred.");
    }
  }

  const status = {
    "00": {
      text: "submitted",
      description:
        "Congratulations! Your term loan application has been received. Please wait while we process the application. You can check the status here.",
    },
    "11": {
      text: "Accepted District",
      description:
        "Congratulations! Your term loan application has been accepted. Please wait while we process the application. You can check the status here.",
    },
    "21": {
      text: "Accepted clerk Scrutiny",
      description:
        "Congratulations! Your term loan application has been accepted. Please wait while we process the application. You can check the status here.",
    },
    "25": {
      text: "Accepted Scrutiny",
      description:
        "Congratulations! Your term loan application has been accepted. Please wait while we process the application. You can check the status here.",
    },
    "31": {
      text: "Accepted Review",
      description:
        "Congratulations! Your term loan application has been accepted. Please wait while we process the application. You can check the status here.",
    },
    "33": {
      text: "returned",
      description:
        "Your application is returned by MAMFDC, following questions were answered in negative. Kindly review the questions and upload the required documents to resolve the questions",
    },
    "13": {
      text: "returned",
      description:
        "Your application is returned by MAMFDC, following questions were answered in negative. Kindly review the questions and upload the required documents to resolve the questions",
    },
    "23": {
      text: "returned",
      description:
        "Your application is returned by MAMFDC, following questions were answered in negative. Kindly review the questions and upload the required documents to resolve the questions",
    },
    "42": {
      text: "rejected",
      description: "Your application for term loan is rejected",
    },
    "41": { text: "sanctioned", description: "Your loan is sancitoned" },
    "51": { text: "sanctioned", description: "Your loan is sancitoned" },
    "53": { text: "sanctioned", description: "Your loan is sancitoned" },
    "61": { text: "sanctioned", description: "Your loan is sancitoned" },
    "63": { text: "sanctioned", description: "Your loan is sancitoned" },
    "71": { text: "sanctioned", description: "Your loan is sancitoned" },
    "73": { text: "sanctioned", description: "Your loan is sancitoned" },
    "81": { text: "sanctioned", description: "Your loan is sancitoned" },
    "82": { text: "Rejected", description: "Your loan is Rejected" },
    "83": { text: "sanctioned", description: "Your loan is sancitoned" },
  };

  let showModal = false;
  let documentToBeUploaded = undefined;
  const openModal = (document_id) => {
    documentToBeUploaded = documentMaster.find((d) => d.id == document_id);

    console.log("document to be uploaded: ", documentToBeUploaded);
    showModal = true;
  };

  $: console.log("reactive statement: ", alertMsg);
</script>

{#if dataLoaded}
  <div class="space-y-5">
    <div>
      <h1 class="text-xl font-roboto font-semibold text-Calypso-600 pb-2">
        Application {status[application.personalDetails.verification_status]
          .text}
      </h1>
      <p class="text-gray-600 font-robotoMono text-left text-sm">
        {status[application.personalDetails.verification_status].description}
      </p>
    </div>
    {#if application.personalDetails.verification_status == 41 || application.personalDetails.verification_status >= 51}
      <div class="bg-white rounded-lg shadow-lg p-6 mb-8">
        <h2
          class="text-2xl font-bold text-gray-800 mb-4 flex items-center border-b pb-3"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="h-6 w-6 mr-2 text-blue-600"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
            />
          </svg>
          Available Documents
        </h2>

        <div class="overflow-hidden border border-gray-200 rounded-lg">
          <table class="min-w-full divide-y divide-gray-200">
            <thead class="bg-gradient-to-r from-blue-50 to-blue-100">
              <tr>
                <th
                  class="px-6 py-3 text-left text-xs font-medium text-blue-700 uppercase tracking-wider"
                  >Sr.No</th
                >
                <th
                  class="px-6 py-3 text-left text-xs font-medium text-blue-700 uppercase tracking-wider"
                  >Document Type</th
                >
                <th
                  class="px-6 py-3 text-left text-xs font-medium text-blue-700 uppercase tracking-wider"
                  >Download Options</th
                >
              </tr>
            </thead>
            <tbody class="bg-white divide-y divide-gray-200">
              {#if Number(application.personalDetails.income) < 300000}
                <tr class="hover:bg-blue-50 transition-colors duration-150">
                  <td
                    class="px-6 py-4 whitespace-nowrap text-sm text-gray-600 font-medium"
                    >1</td
                  >
                  <td class="px-6 py-4 whitespace-nowrap">
                    <span
                      class="text-sm font-medium text-gray-900 flex items-center"
                    >
                      <!-- <svg
                        xmlns="http://www.w3.org/2000/svg"
                        class="h-4 w-4 mr-1 text-red-500"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          stroke-width="2"
                          d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z"
                        />
                      </svg> -->
                      Sanction Letter
                    </span>
                  </td>
                  <td class="px-6 py-4 whitespace-nowrap">
                    <div class="flex flex-wrap gap-2">
                      <MmfcPdf3ManjuriPatr
                        applications={application}
                        masters={$masters}
                        {sanctionDetails}
                        let:downloadPdf
                      >
                        <button
                          on:click={downloadPdf}
                          class="inline-flex items-center px-3 py-1 text-sm font-medium text-white bg-red-600 rounded-md shadow hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-1 focus:ring-red-500 transition-all duration-200"
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            class="h-4 w-4 mr-1"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                          >
                            <path
                              stroke-linecap="round"
                              stroke-linejoin="round"
                              stroke-width="2"
                              d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"
                            />
                          </svg>
                          PDF Format
                        </button>
                      </MmfcPdf3ManjuriPatr>

                      <button
                        on:click={() => downloadDocx()}
                        class="inline-flex items-center px-3 py-1 text-sm font-medium text-white bg-blue-600 rounded-md shadow hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-1 focus:ring-blue-500 transition-all duration-200"
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          class="h-4 w-4 mr-1"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            stroke-width="2"
                            d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"
                          />
                        </svg>
                        Agreement
                      </button>
                    </div>
                  </td>
                </tr>
              {:else if application.personalDetails.gender == 2}
                <tr class="hover:bg-blue-50 transition-colors duration-150">
                  <td
                    class="px-6 py-4 whitespace-nowrap text-sm text-gray-600 font-medium"
                    >1</td
                  >
                  <td class="px-6 py-4 whitespace-nowrap">
                    <span
                      class="text-sm font-medium text-gray-900 flex items-center"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        class="h-4 w-4 mr-1 text-red-500"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          stroke-width="2"
                          d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z"
                        />
                      </svg>
                      Sanction Letter
                    </span>
                    <span class="text-xs text-gray-500 block mt-1"
                      >Special format for women applicants</span
                    >
                  </td>
                  <td class="px-6 py-4 whitespace-nowrap">
                    <div class="flex flex-wrap gap-2">
                      <MmfcPdf3ManjuriPatr
                        applications={application}
                        masters={$masters}
                        {sanctionDetails}
                        let:downloadPdf
                      >
                        <button
                          on:click={downloadPdf}
                          class="inline-flex items-center px-3 py-1 text-sm font-medium text-white bg-red-600 rounded-md shadow hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-1 focus:ring-red-500 transition-all duration-200"
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            class="h-4 w-4 mr-1"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                          >
                            <path
                              stroke-linecap="round"
                              stroke-linejoin="round"
                              stroke-width="2"
                              d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"
                            />
                          </svg>
                          PDF Format
                        </button>
                      </MmfcPdf3ManjuriPatr>

                      <button
                        on:click={() => downloadDocx()}
                        class="inline-flex items-center px-3 py-1 text-sm font-medium text-white bg-blue-600 rounded-md shadow hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-1 focus:ring-blue-500 transition-all duration-200"
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          class="h-4 w-4 mr-1"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            stroke-width="2"
                            d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"
                          />
                        </svg>
                        Agreement (DOCX)
                      </button>
                    </div>
                  </td>
                </tr>
              {:else if Number(application.personalDetails.income) > 300000}
                <tr class="hover:bg-blue-50 transition-colors duration-150">
                  <td
                    class="px-6 py-4 whitespace-nowrap text-sm text-gray-600 font-medium"
                    >DOC-003</td
                  >
                  <td class="px-6 py-4 whitespace-nowrap">
                    <span
                      class="text-sm font-medium text-gray-900 flex items-center"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        class="h-4 w-4 mr-1 text-red-500"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          stroke-width="2"
                          d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z"
                        />
                      </svg>
                      Sanction Letter
                    </span>
                    <span class="text-xs text-gray-500 block mt-1"
                      >Premium format for income above 3L</span
                    >
                  </td>
                  <td class="px-6 py-4 whitespace-nowrap">
                    <div class="flex flex-wrap gap-2">
                      <MmfcPdf3ManjuriPatr2
                        applications={application}
                        masters={$masters}
                        {sanctionDetails}
                        let:downloadPdf
                      >
                        <button
                          on:click={downloadPdf}
                          class="inline-flex items-center px-3 py-1 text-sm font-medium text-white bg-red-600 rounded-md shadow hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-1 focus:ring-red-500 transition-all duration-200"
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            class="h-4 w-4 mr-1"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                          >
                            <path
                              stroke-linecap="round"
                              stroke-linejoin="round"
                              stroke-width="2"
                              d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"
                            />
                          </svg>
                          PDF Format
                        </button>
                      </MmfcPdf3ManjuriPatr2>

                      <button
                        on:click={() => downloadDocx()}
                        class="inline-flex items-center px-3 py-1 text-sm font-medium text-white bg-blue-600 rounded-md shadow hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-1 focus:ring-blue-500 transition-all duration-200"
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          class="h-4 w-4 mr-1"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            stroke-width="2"
                            d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"
                          />
                        </svg>
                        Agreement (DOCX)
                      </button>
                    </div>
                  </td>
                </tr>
              {/if}
            </tbody>
          </table>
        </div>
        <!-- <div class="bg-blue-50 rounded-lg p-4 text-center">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="h-10 w-10 text-blue-500 mx-auto mb-2"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
          <p class="text-sm text-blue-800">
            Documents will be available after your verification is complete (Status:)
          </p>
        </div> -->
      </div>
    {/if}

    {#each documents as document}
      <div
        class="p-6 mx-auto border rounded-lg shadow-md bg-white flex flex-col gap-4"
      >
        {#each document.answerArray.filter((e) => ![146, 147, 148, 149, 150, 97, 107, 104, 98, 99, 107].includes(e.question_id)) as answer}
          <!-- <pre>
              document: {JSON.stringify(documents, null, 2)}
          </pre> -->
          <div class="flex justify-between items-center">
            <span class="text-lg font-semibold text-gray-800">
              {answer.question} <span class="text-red-500">Ans: No</span>
            </span>
          </div>
          <span class="text-sm">
            ({answer.instruction_eng}/{answer.instruction_dev})
          </span>
        {/each}
        <!-- <pre>
          {JSON.stringify(document, null, 2)}
        </pre> -->
        {#if ![11, 5, 19, 20, 15, 18, 27, 6, 17].includes(document.document_id)}
          {#if document.fileExists}
            <div
              class="flex justify-between items-center bg-gray-50 p-4 rounded-lg shadow-sm"
            >
              <div class="text-gray-800 font-medium">
                {document.document_name}
              </div>
              <div class="flex items-center gap-2">
                <a
                  href={document.fileUrl}
                  target="_blank"
                  class="px-4 py-2 text-sm text-white bg-gray-400 hover:bg-gray-500 rounded-md shadow-md flex items-center gap-2"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 -960 960 960"
                    fill="#5f6368"
                    class="xl:size-7 size-5 cursor-pointer hover:fill-blue-300 mx-auto"
                  >
                    <path
                      d="M480-320q75 0 127.5-52.5T660-500q0-75-52.5-127.5T480-680q-75 0-127.5 52.5T300-500q0 75 52.5 127.5T480-320Zm0-72q-45 0-76.5-31.5T372-500q0-45 31.5-76.5T480-608q45 0 76.5 31.5T588-500q0 45-31.5 76.5T480-392Zm0 192q-146 0-266-81.5T40-500q54-137 174-218.5T480-800q146 0 266 81.5T920-500q-54 137-174 218.5T480-200Z"
                    />
                  </svg>
                  View
                </a>

                <button
                  class="px-4 py-2 text-sm text-white bg-gray-400 hover:bg-gray-500 rounded-md shadow-md flex items-center gap-2"
                  on:click={() =>
                    deleteFile(
                      application.personalDetails.id,
                      document.document_id,
                      nextIteration
                    )}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 -960 960 960"
                    fill="#5f6368"
                    class="xl:size-7 size-5 cursor-pointer hover:fill-red-300 mx-auto"
                  >
                    <path
                      d="M280-120q-33 0-56.5-23.5T200-200v-520h-40v-80h200v-40h240v40h200v80h-40v520q0 33-23.5 56.5T680-120H280Zm80-160h80v-360h-80v360Zm160 0h80v-360h-80v360Z"
                    />
                  </svg>
                  Delete
                </button>
              </div>
            </div>
          {:else}
            <button
              class="px-4 py-2 text-white bg-blue-500 hover:bg-blue-600 rounded-md shadow-md"
              on:click={() => openModal(document.document_id)}
            >
              Reupload Document
            </button>
          {/if}
        {/if}
        {#if document.document_id == 11}
          <IncomeCertificate
            {application}
            masters={$masters}
            documentsUrl={document.fileUrl}
            on:onUpload={() => openModal(document.document_id)}
            on:onDelete={() =>
              deleteFile(
                application.personalDetails.id,
                document.document_id,
                nextIteration
              )}
            fileIsAvalable={document.fileExists}
          ></IncomeCertificate>
        {/if}
        {#if document.document_id == 5}
          <Aadhar
            {application}
            masters={$masters}
            documentsUrl={document.fileUrl}
            on:onUpload={() => openModal(document.document_id)}
            on:onDelete={() =>
              deleteFile(
                application.personalDetails.id,
                document.document_id,
                nextIteration
              )}
            fileIsAvalable={document.fileExists}
          ></Aadhar>
        {/if}
        {#if document.document_id == 19}
          <PanCard
            {application}
            masters={$masters}
            documentsUrl={document.fileUrl}
            on:onUpload={() => openModal(document.document_id)}
            on:onDelete={() =>
              deleteFile(
                application.personalDetails.id,
                document.document_id,
                nextIteration
              )}
            fileIsAvalable={document.fileExists}
          ></PanCard>
        {/if}
        {#if document.document_id == 20}
          <RationCard
            {application}
            masters={$masters}
            documentsUrl={document.fileUrl}
            on:onUpload={() => openModal(document.document_id)}
            on:onDelete={() =>
              deleteFile(
                application.personalDetails.id,
                document.document_id,
                nextIteration
              )}
            fileIsAvalable={document.fileExists}
          ></RationCard>
        {/if}
        {#if document.document_id == 15}
          <GstQuotation
            {application}
            masters={$masters}
            documentsUrl={document.fileUrl}
            on:onUpload={() => openModal(document.document_id)}
            on:onDelete={() =>
              deleteFile(
                application.personalDetails.id,
                document.document_id,
                nextIteration
              )}
            fileIsAvalable={document.fileExists}
          ></GstQuotation>
        {/if}
        {#if document.document_id == 18}
          <BankPassbook
            {application}
            documentsUrl={document.fileUrl}
            on:onUpload={() => openModal(document.document_id)}
            on:onDelete={() =>
              deleteFile(
                application.personalDetails.id,
                document.document_id,
                nextIteration
              )}
            fileIsAvalable={document.fileExists}
          ></BankPassbook>
        {/if}
        {#if document.document_id == 27}
          <GuarantorPanCard
            {application}
            masters={$masters}
            documentsUrl={document.fileUrl}
            on:onUpload={() => openModal(document.document_id)}
            on:onDelete={() =>
              deleteFile(
                application.personalDetails.id,
                document.document_id,
                nextIteration
              )}
            fileIsAvalable={document.fileExists}
          ></GuarantorPanCard>
        {/if}
        {#if document.document_id == 6}
          <GuarantorAadhar
            {application}
            masters={$masters}
            documentsUrl={document.fileUrl}
            on:onUpload={() => openModal(document.document_id)}
            on:onDelete={() =>
              deleteFile(
                application.personalDetails.id,
                document.document_id,
                nextIteration
              )}
            fileIsAvalable={document.fileExists}
          ></GuarantorAadhar>
        {/if}

        {#if document.document_id == 17}
          <ShopAct
            {application}
            masters={$masters}
            documentsUrl={document.fileUrl}
            on:onUpload={() => openModal(document.document_id)}
            on:onDelete={() =>
              deleteFile(
                application.personalDetails.id,
                document.document_id,
                nextIteration
              )}
            fileIsAvalable={document.fileExists}
          ></ShopAct>
        {/if}
        <!-- {#if ![11, 5, 19, 20, 15, 18, 27, 6, 17].includes(document.document_id)}
          <button
            class="px-4 py-2 text-white bg-blue-500 hover:bg-blue-600 rounded-md shadow-md"
            on:click={() => openModal(document.document_id)}
          >
            Reupload Document
          </button>
        {/if} -->
      </div>
    {/each}

    <div>
      <div class="border-b-2 border-gray-200 pb-2">
        <h1 class="capitalize text-base text-gray-700 font-medium">
          stage<span class="text-sm">(s)</span> of completed
        </h1>
      </div>
      <div class="border border-gray-300 mt-3">
        {#each steps as stepNames, index}
          <div
            class="grid grid-cols-5 items-center border-b last:border-b-0 hover:bg-gray-100"
          >
            <div class="col-span-3 px-5 py-2 border-r">
              <label class="flex justify-start items-center gap-5">
                <input
                  type="radio"
                  name="nameSelection"
                  value={stepNames}
                  class="form-radio text-blue-600 cursor-pointer"
                />
                <h1
                  class="uppercase text-sm text-gray-600 font-medium cursor-pointer"
                >
                  {stepNames.name}
                </h1>
              </label>
            </div>
            <div class="col-span-2 px-5 py-2">
              <h1
                class="capitalize text-sm font-medium text-center {stepNames.status ===
                'completed'
                  ? 'text-green-500'
                  : 'text-red-500'}"
              >
                {stepNames.status}
              </h1>
            </div>
          </div>
        {/each}
      </div>
      {#if alertMsg}
        <div class="w-auto">
          <div
            class="flex items-center border px-4 py-3 rounded-lg shadow-md mt-6"
            role="alert"
            class:border-red-400={alertType === "error"}
            class:border-green-400={alertType === "success"}
            class:bg-red-100={alertType === "error"}
            class:bg-green-100={alertType === "success"}
            class:text-red-700={alertType === "error"}
            class:text-green-700={alertType === "success"}
          >
            <svg
              class="flex-shrink-0 inline w-4 h-4 me-3"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path
                d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM9.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM12 15H8a1 1 0 0 1 0-2h1v-3H8a1 1 0 0 1 0-2h2a1 1 0 0 1 1 1v4h1a1 1 0 0 1 0 2Z"
              />
            </svg>
            <span class="text-sm font-semibold">{alertMsg}</span>
          </div>
        </div>
      {/if}

      <div class="flex justify-center items-center mt-5">
        {#if documents.length}
          <button
            on:click={(e) => {
              onSubmit(e);
            }}
            class="bg-Calypso-500 hover:bg-Calypso-700 text-white text-sm font-robotoMono px-5 py-1.5 rounded shadow-md uppercase"
          >
            Proceed
          </button>
        {/if}
      </div>
      <!-- {#if alertMsg}
        <div class="w-auto">
          {#if alertMsg}
            <div
              class="flex items-center bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-lg shadow-md mt-6"
              role="alert"
            >
              <svg
                class="flex-shrink-0 inline w-4 h-4 me-3"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM9.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM12 15H8a1 1 0 0 1 0-2h1v-3H8a1 1 0 0 1 0-2h2a1 1 0 0 1 1 1v4h1a1 1 0 0 1 0 2Z"
                />
              </svg>
              <span class="text-sm font-semibold">
                {alertMsg}
              </span>
            </div>
          {/if}
        </div>
      {/if}
      <div class="flex justify-center items-center mt-5">
        <button
          on:click={(e) => {
            onSubmit(e);
          }}
          class="bg-Calypso-500 hover:bg-Calypso-700 text-white text-sm font-robotoMono px-5 py-1.5 rounded shadow-md uppercase"
          >proceed</button
        >
      </div> -->
      {#if uploadedDocuments.length > 0}
        <div class="p-6 bg-white shadow-md rounded-lg">
          <h3 class="text-xl font-semibold mb-4">Uploaded Documents</h3>
          <ul class="space-y-4">
            <!-- <pre>
           uploadedDocuments: {JSON.stringify(uploadedDocuments, null, 2)}
            </pre> -->
            {#each uploadedDocuments as doc, i}
              <li
                class="flex justify-between items-center bg-gray-50 p-4 rounded-lg shadow-sm"
              >
                <span class="text-sm text-gray-700 mr-8">{i + 1}</span>
                <span class="text-sm text-gray-700 flex-1">
                  {doc.eng_name} - {doc.dev_name}
                </span>
                <button
                  class="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  on:click={() => viewDocument(doc.fileUrl)}
                >
                  View
                </button>
              </li>
            {/each}
          </ul>
        </div>
      {/if}
    </div>
  </div>
  {#if showModal}
    <FileUploadModal
      bind:showModal
      title={`Please upload ${documentToBeUploaded.eng_name}/${documentToBeUploaded.dev_name}`}
      application_id={application.personalDetails.id}
      docId={documentToBeUploaded.id}
      fileTypes={documentToBeUploaded.file_type.split(",")}
      iteration={nextIteration}
      on:fileUploaded={async () => {
        await init();
      }}
    ></FileUploadModal>
  {/if}
{:else}
  ...Loading
{/if}
