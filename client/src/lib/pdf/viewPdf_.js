import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
let authApiServer = import.meta.env.VITE_AUTH_API_SERVER;

let getGender = (genderId, masters) => {
  let gender = masters.m_gender.find((e) => e.id == genderId)?.eng_name;
  return gender;
};
function formatDate(dateString) {
  const date = new Date(dateString);
  return date.toLocaleDateString("en-GB"); // Formats to 'DD/MM/YYYY'
}
function getDistrict(district, masters) {
  const districtName = masters.m_district.find(
    (d) => d.dist_id == district
  )?.eng_name;
  return districtName;
}
function getTaluka(taluka, masters) {
  const talukaName = masters.m_taluka.find(
    (d) => d.taluka_id == taluka
  )?.eng_name;
  return talukaName;
}

export async function createPDF(applications, masters) {
  console.log("applications ", applications);
  console.log("masters ", masters);
  const doc = new jsPDF();
  let application = applications[0];
  // Add the logo image (as a base64 string or from a URL)
  const logoUrl = "/termloan/MaulanaAzad.jpg"; // Replace with your actual image URL or base64 string

  // Add a rectangle for the header border
  doc.setLineWidth(0.5);
  doc.setDrawColor(128, 0, 128); // Purple border
  doc.rect(10, 10, 190, 45); // x, y, width, height

  // Add the logo to the header
  doc.addImage(logoUrl, "PNG", 15, 15, 20, 20); // image, format, x, y, width, height

  // Add text for company name and application type
  doc.setTextColor(128, 0, 128); // Purple text
  doc.setFontSize(12);
  doc.text("MAULANA AZAD MINORITIES FINANCIAL DEVELOPMENT CORPORATION", 40, 20);
  doc.text("LIMITED", 40, 26);
  doc.setFontSize(10);
  doc.text("A GOVT. OF MAHARASHTRA UNDERTAKING", 40, 32);

  // Add text for "TERM LOAN APPLICATION"
  doc.setFontSize(14);
  doc.setTextColor(128, 0, 255); // Darker purple
  doc.text("TERM LOAN APPLICATION", 80, 45);

  doc.setTextColor(0, 0, 0); // Purple text
  doc.rect(10, 60, 190, 15); // x, y, width, height

  doc.text("Applicant's Application", 80, 70);

  doc.setFontSize(12);
  doc.rect(10, 80, 190, 60);
  doc.text("Applicant Photo", 20, 90);
  doc.text("Guarantor Photo", 130, 90);

  let imageUrl = `/termloan/api/upload/${application.personalDetails.id}/1/1`;
  let guarantorUrl = `/termloan/api/upload/${application.personalDetails.id}/2/1`;
  function convertBlobToBase64(blob) {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onloadend = () => resolve(reader.result);
      reader.onerror = reject;
      reader.readAsDataURL(blob);
    });
  }

  let response = await fetch(imageUrl);
  let blob = await response.blob();

  // Convert blob to base64 using FileReader
  const base64data = await convertBlobToBase64(blob);

  let imageFormat = base64data.includes("png") ? "PNG" : "JPEG";
  doc.addImage(base64data, imageFormat, 20, 100, 30, 30);

  response = await fetch(guarantorUrl);
  blob = await response.blob();

  const guarantorBase64Data = await convertBlobToBase64(blob);
  imageFormat = guarantorBase64Data.includes("png") ? "PNG" : "JPEG";

  doc.addImage(guarantorBase64Data, imageFormat, 130, 100, 30, 30);

  const startY = 20; // Starting Y position for the table
  const columnOffset = 100; // Offset for the second column
  const PersonalData = [
    { label: "Applicant Personal Detail", value: "" },
    { label: "Application ID", value: application.personalDetails.id },
    { label: "Aadhar Number", value: application.personalDetails.aadhar },
    { label: "Pancard Number", value: application.personalDetails.pan },
    { label: "Name of Applicant", value: application.personalDetails.name },
    {
      label: "Gender",
      value: getGender(application.personalDetails.gender, masters),
    },
    { label: "Date of Birth", value: application.personalDetails.dob },
    { label: "Mobile Number", value: application.personalDetails.mobile },
    { label: "Email ID", value: application.personalDetails.email },
    {
      label: "Marital Status",
      value: masters.m_marital_status.find(
        (m) => m.id == application.personalDetails.marital_status
      )?.eng_name,
    },
    {
      label: "Caste",
      value: masters.m_religion.find(
        (e) => e.id == application.personalDetails.religion
      )?.eng_name,
    },
    {
      label: "Educational Qualifications:",
      value: masters.m_educational_qualification.find(
        (e) => application.personalDetails.education_qualification
      )?.eng_name,
    },
    { label: "Enter Details", value: application.personalDetails.details },
    {
      label: "Current Address:",
      value: `${application.personalDetails.current_address} ${
        application.personalDetails.current_area
      } ${getDistrict(
        application.personalDetails.current_district,
        masters
      )} ${getTaluka(application.personalDetails.current_taluka, masters)} ${
        application.personalDetails.current_place
      } ${application.personalDetails.current_pincode} `,
    },
    {
      label: "Permanent Address :",

      value: `${application.personalDetails.permanent_address} ${
        application.personalDetails.permanent_area
      } ${getDistrict(
        application.personalDetails.permanent_district,
        masters
      )} ${getTaluka(application.personalDetails.permanent_taluka, masters)} ${
        application.personalDetails.permanent_place
      } ${application.personalDetails.permanent_pincode}`,
    },
    {
      label: "Select Father/Husband :",
      value: masters.m_guardian.find(
        (e) => e.id == application.personalDetails.guardian
      )?.eng_name,
    },
    {
      label: "Select Occupation :",
      value: masters.m_occupation.find(
        (o) => o.id == application.personalDetails.occupation
      )?.eng_name,
    },
    {
      label: "Enter Type Of Occupation :",
      value: masters.m_organization_type.find(
        (o) => o.id == application.personalDetails.occupationtype
      )?.eng_name,
    },
    {
      label:
        "Has The Applicant Or Guarantor Previously Provided Surety For Anyone Else?  (If Yes, Please Provide Details)",
      value: masters.m_past_surety_commitment.find(
        (p) => p.id == application.personalDetails.past_surety_commitment
      )?.eng_name,
    },
  ];

  let formattedData = [
    [
      {
        content: PersonalData[0].label,
        colSpan: 2,
        styles: { halign: "center", fontSize: 14 },
      }, // First cell with colspan
    ],
    ...PersonalData.slice(1).map((item) => [item.label, item.value]), // Remaining rows
  ];
  doc.autoTable({
    // head: [header],
    body: formattedData,
    startY: 150, // Adjust starting position as needed
    theme: "grid", // Choose a theme (grid, plain, striped)
    styles: {
      fontSize: 12,
      cellWidth: "auto", // Adjust cell width if needed
    },

    columnStyles: {
      0: { cellWidth: 87, halign: "right" }, // Set a fixed width for the first column (labels)
      1: { cellWidth: 100, halign: "left" }, // Set a fixed width for the second column (values)
    },
  });

  let bussinessDetail = [
    { label: "BUSINESS DETAILS", value: "" },
    {
      label: "Applicant Bussiness Name :",
      value: application.businessDetails.business_name,
    },
    {
      label: "Applicant Bussiness Details :",
      value: application.businessDetails.business_details,
    },
    {
      label: "Current Address :",
      value: application.businessDetails.business_address,
    },
    {
      label: "Quotation Name :",
      value: application.businessDetails.quotation_name,
    },
    {
      label: "Quotation GST Number :",
      value: application.businessDetails.quotation_gst_number,
    },
    {
      label: "Quotation Amount :",
      value: application.businessDetails.quotation_amount,
    },
  ];

  let bussinessDetailData = [
    [
      {
        content: bussinessDetail[0].label,
        colSpan: 2,
        styles: { halign: "center", fontSize: 12 },
      }, // First cell with colspan
    ],
    ...bussinessDetail.slice(1).map((item) => [item.label, item.value]), // Remaining rows
  ];
  doc.autoTable({
    // head: [header],
    body: bussinessDetailData,
    startY: 100, // Adjust starting position as needed
    theme: "grid", // Choose a theme (grid, plain, striped)
    styles: {
      fontSize: 12,
      cellWidth: "auto", // Adjust cell width if needed
      halign: "center", // Align text within cells
    },

    columnStyles: {
      0: { cellWidth: 87, halign: "right" }, // Set a fixed width for the first column (labels)
      1: { cellWidth: 100, halign: "left" }, // Set a fixed width for the second column (values)
    },
  });
  // Draw the table in the second column
  let financialReferences = [
    { label: "Bank Details", value: "" },
    {
      label: "Nationalized Bank Name:",
      value: application.businessDetails.bank_name,
    },
    { label: "IFSC Code:", value: application.businessDetails.ifsc_code },
    { label: "Branch Name:", value: application.businessDetails.branch_name },
    {
      label: "Account Number:",
      value: application.businessDetails.account_number,
    },
    {
      label: "Bank Address:",
      value: application.businessDetails.bank_address,
    },
  ];

  let financialReferencesData = [
    [
      {
        content: financialReferences[0].label,
        colSpan: 2,
        styles: { halign: "center", fontSize: 12 },
      }, // First cell with colspan
    ],
    ...financialReferences.slice(1).map((item) => [item.label, item.value]), // Remaining rows
  ];

  doc.autoTable({
    // head: [header],
    body: financialReferencesData,
    startY: 180, // Adjust starting position as needed
    theme: "grid", // Choose a theme (grid, plain, striped)
    styles: {
      fontSize: 12,
      cellWidth: "auto", // Adjust cell width if needed
      halign: "center", // Align text within cells
    },

    columnStyles: {
      0: { cellWidth: 87, halign: "right" }, // Set a fixed width for the first column (labels)
      1: { cellWidth: 100, halign: "left" }, // Set a fixed width for the second column (values)
    },
  });

  let guarantorDetail = [
    { label: "GUARANTOR PERSONAL DETAILS", value: "" },
    {
      label: "Aadhar Number :",
      value: application.guarantorPersonalDetails.aadhar,
    },
    {
      label: "Pancard Number :",
      value: application.guarantorPersonalDetails.pan,
    },
    {
      label: "Name Of Applicant :",
      value: application.guarantorPersonalDetails.name,
    },
    {
      label: "Gender :",
      value: getGender(application.guarantorPersonalDetails.gender, masters),
    },
    {
      label: "Date Of Birth :",
      value: application.guarantorPersonalDetails.dob,
    },
    {
      label: "Mobile Number :",
      value: application.guarantorPersonalDetails.mobile,
    },
    { label: "Email ID :", value: application.guarantorPersonalDetails.email },
    {
      label: "Marital Status :",
      value: masters.m_marital_status.find(
        (e) => e.id == application.guarantorPersonalDetails.marital_status
      )?.eng_name,
    },
    {
      label: "Caste :",
      value: masters.m_religion.find(
        (r) => r.id == application.guarantorPersonalDetails.religion
      )?.eng_name,
    },
    {
      label: "Educational Qualifications :",
      value: masters.m_educational_qualification.find(
        (e) =>
          e.id == application.guarantorPersonalDetails.education_qualification
      )?.eng_name,
    },
    {
      label: "Enter Details :",
      value: application.guarantorPersonalDetails.details,
    },
    {
      label: "Current Address :",
      value: `${
        application.guarantorPersonalDetails.current_address
      }  ${getDistrict(
        application.guarantorPersonalDetails.current_district,
        masters
      )} ${getTaluka(
        application.guarantorPersonalDetails.current_taluka,
        masters
      )} ${application.guarantorPersonalDetails.current_place} ${
        application.guarantorPersonalDetails.current_area
      } ${application.guarantorPersonalDetails.current_pincode}`,
    },

    {
      label: "Permanent Address :",
      value: `${
        application.guarantorPersonalDetails.permanent_address
      }  ${getDistrict(
        application.guarantorPersonalDetails.permanent_district,
        masters
      )} ${getTaluka(
        application.guarantorPersonalDetails.permanent_taluka,
        masters
      )} ${application.guarantorPersonalDetails.permanent_place} ${
        application.guarantorPersonalDetails.permanent_area
      } ${application.guarantorPersonalDetails.permanent_pincode}`,
    },

    {
      label: "Select Father/Husband :",
      value: masters.m_guardian.find(
        (e) => e.id == application.guarantorPersonalDetails.guardian
      )?.eng_name,
    },
    {
      label: "Select Occupation :",
      value: masters.m_occupation.find(
        (o) => o.id == application.guarantorPersonalDetails.occupation
      )?.eng_name,
    },
    {
      label: "Enter Type Of Occupation :",
      value: masters.m_organization_type.find(
        (o) => o.id == application.guarantorPersonalDetails.occupationtype
      )?.eng_name,
    },
    {
      label:
        "Has The Applicant Or Guarantor Previously Provided Surety For Anyone Else?  (If Yes, Please Provide Details)",
      value: masters.m_past_surety_commitment.find(
        (p) =>
          p.id == application.guarantorPersonalDetails.past_surety_commitment
      )?.eng_name,
    },
  ];

  let guarantorDetailData = [
    [
      {
        content: guarantorDetail[0].label,
        colSpan: 2,
        styles: { halign: "center", fontSize: 12 },
      }, // First cell with colspan
    ],
    ...guarantorDetail.slice(1).map((item) => [item.label, item.value]), // Remaining rows
  ];

  doc.autoTable({
    // head: [header],
    body: guarantorDetailData,
    startY: 220, // Adjust starting position as needed
    theme: "grid", // Choose a theme (grid, plain, striped)
    styles: {
      fontSize: 12,
      cellWidth: "auto", // Adjust cell width if needed
      halign: "right", // Align text within cells
    },

    columnStyles: {
      0: { cellWidth: 87, halign: "right" }, // Set a fixed width for the first column (labels)
      1: { cellWidth: 100, halign: "left" }, // Set a fixed width for the second column (values)
    },
  });
  function parseDescription(description) {
    try {
      return JSON.parse(description);
    } catch (e) {
      return { area: "", area_unit: "" }; // Default empty values
    }
  }
  doc.setFontSize(14);

  doc.text("Collateral Details:", 10, 145);
  let applicantInvestMent = [];
  application.properties.forEach((property, index) => {
    const description = parseDescription(property.description);

    applicantInvestMent.push(
      // { lable: "Collateral Details", value: "" },
      { lable: "Property Description", value: "" },
      { lable: `Property ${index + 1} :`, value: "" },
      {
        lable: "Property Type :",
        value: masters.m_property_type.find(
          (p) => p.id == property.property_type
        )?.eng_name,
      },
      { lable: "Ownership Status :", value: "Owned" }, // Assuming ownership status as an example
      { lable: "Survey No :", value: property.survey_no },
      { lable: "Unit No :", value: property.unit_no },
      { lable: "Street Address :", value: property.street_address },
      { lable: "Place :", value: property.place },
      { lable: "District :", value: getDistrict(property.dist_id, masters) },
      { lable: "Taluka :", value: getTaluka(property.taluka_id, masters) },
      { lable: "Pincode :", value: property.pincode },
      { lable: "Property Value :", value: property.property_value },
      { lable: "Area :", value: `${description.area} ${description.area_unit}` }
    );
  });
  let applicantLIC = [];

  // application.licPolicies.forEach((lic, index) => {
  //     applicantLIC.push(
  //         { lable: "LIC Information", value: "" },
  //         { lable: "LIC1", value: "" },
  //         { lable: "LIC Policy Number :", value: lic.policy_receipt_no },
  //         { lable: "Policy Type :", value: lic.policy_type },
  //         { lable: "Policy Amount :", value: "" },
  //         { lable: "Premium Amount :", value: "" },
  //         { lable: "Premium Frequency :", value: "" },
  //         { lable: "Policy Term :", value: "" },

  //     )
  // })
  application.licPolicies.forEach((policy, index) => {
    applicantLIC.push(
      { lable: "LIC Information", value: "" },
      { lable: `LIC Policy ${index + 1} :`, value: policy.policy_name },
      { lable: "Policy Receipt No :", value: policy.policy_receipt_no },
      { lable: "Policy Type :", value: policy.policy_type },
      { lable: "Start Date :", value: formatDate(policy.start_date) },
      { lable: "Maturity Date :", value: formatDate(policy.maturity_date) },
      { lable: "Surrender Value :", value: policy.surrender_value }
    );
  });

  let FD1 = [];

  application.fds.forEach((fd, index) => {
    FD1.push(
      { lable: "FD Information", value: "" },
      { lable: `FD ${index + 1}:`, value: "" },
      { lable: "Bank Name :", value: fd.bank_name },
      { lable: "FD Account Number :", value: fd.fd_acc_no },
      { lable: "Start Date :", value: formatDate(fd.start_date) },
      { lable: "Maturity Date :", value: formatDate(fd.maturity_date) },
      { lable: "FD Amount :", value: fd.amount }
    );
  });

  function mapSection(sectionArray) {
    if (sectionArray.length > 0) {
      // Extract header and rows, ensuring there's only one header per section
      let header = sectionArray[0];
      let rows = sectionArray.slice(1).map((item) => [item.lable, item.value]);

      // Map the section header and rows into the format for jsPDF autoTable
      return [
        [
          {
            content: header?.lable, // Print the header
            // content: "lable", // Print the header
            colSpan: 2,
            styles: { halign: "center", fontSize: 12 },
          },
        ],
        ...rows, // Add the rest of the data as rows
      ];
    } else {
      return [];
    }
  }

  // Mapping the data from each section
  let applicantInvestMentData = [
    ...mapSection(applicantInvestMent), // Collateral details
    ...mapSection(applicantLIC), // LIC details
    ...mapSection(FD1), // FD details
  ];

  // Generating the table in the PDF
  doc.autoTable({
    body: applicantInvestMentData, // Use the correctly formatted data
    startY: 155, // Adjust starting position as needed
    theme: "grid", // Choose a theme (grid, plain, striped)
    styles: {
      fontSize: 12,
      cellWidth: "auto", // Adjust cell width if needed
      halign: "center", // Align text within cells
    },
    columnStyles: {
      0: { cellWidth: 87, halign: "right" }, // Set a fixed width for the first column (labels)
      1: { cellWidth: 100, halign: "left" }, // Set a fixed width for the second column (values)
    },
  });

  // Save the PDF
  doc.save(`${application.personalDetails.name}-MAMFDC.pdf`);
}
