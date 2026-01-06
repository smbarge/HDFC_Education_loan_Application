import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
let authApiServer = import.meta.env.VITE_AUTH_API_SERVER;

let getGender = (genderId, masters) => {
  console.log("genderID", masters);
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
  try {
    console.log("applications ", applications);
    console.log("masters ", masters);
    const doc = new jsPDF({
      format: "a4",
    });
    let application = applications[0];
    let guarantorPersonalDetails =
      application.personalDetails.guarantor == 1
        ? application.guarantorPersonalDetails
        : application.personalDetails;
    // Add the logo image (as a base64 string or from a URL)
    const logoUrl = "/termloan/MaulanaAzad.jpg"; // Replace with your actual image URL or base64 string

    // Add a rectangle for the header border
    // doc.setLineWidth(0.5);
    // doc.setDrawColor(128, 0, 128); // Purple border
    // doc.rect(10, 10, 190, 45); // x, y, width, height

    // Add the logo to the header
    doc.addImage(logoUrl, "PNG", 15, 15, 20, 20); // image, format, x, y, width, height

    // Add text for company name and application type
    // doc.setTextColor(128, 0, 128); // Purple text
    doc.setFontSize(12);
    doc.text(
      "MAULANA AZAD MINORITIES FINANCIAL DEVELOPMENT CORPORATION",
      40,
      20
    );
    doc.text("LIMITED", 40, 26);
    doc.setFontSize(10);
    doc.text("A GOVT. OF MAHARASHTRA UNDERTAKING", 40, 32);
    doc.setLineWidth(0.5);
    doc.line(5, 40, 205, 39);

    // doc.line(10, 200, 200, 20)
    // Add text for "TERM LOAN APPLICATION"
    doc.setFontSize(14);
    // doc.setTextColor(128, 0, 255); // Darker purple
    doc.text("TERM LOAN APPLICATION", 80, 50); // doc.setLineWidth(0.5);

    // doc.setTextColor(0, 0, 0); // Purple text
    // doc.rect(10, 60, 190, 15); // x, y, width, height

    // doc.text("Applicant's Application", 80, 70);

    doc.setFontSize(12);
    // doc.rect(10, 80, 190, 60);
    // doc.text("Applicant Photo", 20, 90);
    // doc.text("Guarantor Photo", 130, 90);

    let imageUrl = `/termloan/api/upload/${application.personalDetails.id}/1/1`;

    let guarantorUrl = `/termloan/api/upload/${application.personalDetails.id}/${
      application.personalDetails.guarantor == 1 ? "2" : "1"
    }/1`;
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

    let x = 20;
    let y = 60;
    doc.setFontSize(14);
    doc.setFont("helvetica", "bold");
    doc.text("Applicant Personal Details:", x, y);
    doc.setFont("helvetica", "normal");
    doc.setFontSize(12);
    doc.text("Application ID", 130, y + 20);
    doc.text(":", 160, y + 20);
    doc.text(
      `${
        application.personalDetails.form_no == null
          ? "--"
          : application.personalDetails.form_no
      }`,
      162,
      y + 20
    );
    doc.text("Name of Applicant", x, y + 10);
    doc.text(":", x + 40, y + 10);
    doc.text(`${application.personalDetails.name}`, x + 50, y + 10);
    doc.text("Aadhar Number", x, y + 20);
    doc.text(":", x + 40, y + 20);
    doc.text(
      `${
        application.personalDetails.aadhar
          ? application.personalDetails.aadhar
          : "NA"
      }`,
      x + 50,
      y + 20
    );
    doc.text("Pan Card Number", x, y + 30);
    doc.text(":", x + 40, y + 30);
    doc.text(
      `${
        application.personalDetails.pan ? application.personalDetails.pan : "NA"
      }`,
      x + 50,
      y + 30
    );
    doc.text("Gender", x, y + 40);
    doc.text(":", x + 40, y + 40);
    doc.text(
      `${getGender(application.personalDetails.gender, masters)}`,
      x + 50,
      y + 40
    );
    doc.text("Date of Birth", x, y + 50);
    doc.text(":", x + 40, y + 50);
    doc.text(`${formatDate(application.personalDetails.dob)}`, x + 50, y + 50);
    doc.text("Mobile Number", x, y + 60);
    doc.text(":", x + 40, y + 60);
    doc.text(`${application.personalDetails.mobile}`, x + 50, y + 60);
    doc.text("Marital Status", x, y + 70);
    doc.text(":", x + 40, y + 70);
    doc.text(
      `${
        masters.m_marital_status.find(
          (m) => m.id == application.personalDetails.marital_status
        )?.eng_name
      }`,
      x + 50,
      y + 70
    );
    doc.text("Community", x, y + 80);
    doc.text(":", x + 40, y + 80);
    doc.text(
      `${
        masters.m_religion.find(
          (e) => e.id == application.personalDetails.religion
        )?.eng_name
      }`,
      x + 50,
      y + 80
    );
    doc.text("Educational Qualification", x, y + 90);
    doc.text(":", x + 50, y + 90);
    doc.text(
      `${
        masters.m_educational_qualification.find(
          (e) => application.personalDetails.education_qualification
        )?.eng_name
      }`,
      x + 55,
      y + 90
    );
    doc.text("Qualification Details", x, y + 100);
    doc.text(":", x + 40, y + 100);
    doc.text(
      `${
        application.personalDetails.details
          ? application.personalDetails.details
          : "NA"
      }`,
      x + 50,
      y + 100
    );

    doc.text("Current Address", x, y + 110);
    doc.text(":", x + 40, y + 110);
    doc.text(`${application.personalDetails.current_address}`, x + 50, y + 110);
    doc.text(
      `${getDistrict(
        application.personalDetails.current_district,
        masters
      )} ${getTaluka(application.personalDetails.current_taluka, masters)} ${
        application.personalDetails.current_place
      } ${application.personalDetails.current_pincode}  `,
      x + 50,
      y + 120
    );
    // doc.text(`${application.personalDetails.current_place} ${application.personalDetails.current_pincode} `, x + 50, y + 130)

    doc.text("Permanent Address", x, y + 130);
    doc.text(":", x + 40, y + 130);
    doc.text(`${application.personalDetails.current_address}`, x + 50, y + 130);
    doc.text(
      `${getDistrict(
        application.personalDetails.current_district,
        masters
      )} ${getTaluka(application.personalDetails.current_taluka, masters)} ${
        application.personalDetails.current_place
      } ${application.personalDetails.current_pincode}  `,
      x + 50,
      y + 140
    );

    doc.text("Father/Husband ", x, y + 150);
    doc.text(":", x + 50, y + 150);
    doc.text(
      `${
        masters.m_guardian.find(
          (e) => e.id == application.personalDetails.guardian
        )?.eng_name
      }`,
      x + 60,
      y + 150
    );

    doc.text("Father/Husband Occupation", x, y + 160);
    doc.text(":", x + 60, y + 160);
    doc.text(
      `
    ${
      masters.m_occupation.find(
        (o) => o.id == application.personalDetails.occupation
      )?.eng_name
    }`,
      x + 70,
      y + 155
    );

    doc.text("Annual Income of Family", x, y + 170);
    doc.text(":", x + 50, y + 170);
    doc.text(
      `${application.personalDetails.income}
    `,
      x + 55,
      y + 170
    );

    doc.text(
      "Has The Applicant Previously Provided Surety For Anyone Else?",
      x,
      y + 180
    );
    // doc.text("(If Yes, Please Provide Details)", x, y + 188);
    doc.text(":", x + 130, y + 180);
    doc.text(
      `${
        masters.m_past_surety_commitment.find(
          (p) => p.id == application.personalDetails.past_surety_commitment
        )?.eng_name
      }`,
      x + 140,
      y + 180
    );
    // Convert blob to base64 using FileReader
    const base64data = await convertBlobToBase64(blob);
    let imageFormat = base64data.includes("png") ? "PNG" : "JPEG";
    // doc.rect(150, y + 30, 35, 35); // x, y, width, height
    doc.addImage(base64data, imageFormat, 150, y + 30, 30, 30);

    doc.line(5, 260, 205, 260);

    doc.setFontSize(14);
    doc.setFont("helvetica", "bold");
    doc.text("Applicant Business Details :", x, y + 210);
    doc.setFont("helvetica", "normal");

    doc.setFontSize(12);
    doc.text(" Business Name", x, y + 220);
    doc.text(":", x + 60, y + 220);
    doc.text(`${application.businessDetails.business_name}`, x + 65, y + 220);

    doc.addPage();
    y = 30;
    // doc.setFontSize(14)
    // doc.setFont("helvetica", "bold");
    // doc.text("Bussiness Details :", x, y)
    // doc.setFont("helvetica", "normal");
    doc.text("Business Details", x, y);
    doc.text(":", x + 60, y);
    doc.text(`${application.businessDetails.business_details}`, x + 65, y);

    const addressText = application.businessDetails.business_address;
    const maxWidth = 100; // Set the maximum width for the text

    // Split the text into lines that fit within the maxWidth
    const wrappedText = doc.splitTextToSize(addressText, maxWidth);
    doc.text("Business Address", x, y + 10);
    doc.text(":", x + 60, y + 10);
    doc.text(`${wrappedText}`, x + 65, y + 10);

    doc.text("Quotation Name", x, y + 20);
    doc.text(":", x + 60, y + 20);
    doc.text(
      `${
        application.businessDetails.quotation_name
          ? application.businessDetails.quotation_name
          : "NA"
      }`,
      x + 65,
      y + 20
    );

    doc.text("Quotation GST Number", x, y + 30);
    doc.text(":", x + 60, y + 30);
    doc.text(
      `${
        application.businessDetails.quotation_gst_number
          ? application.businessDetails.quotation_gst_number
          : "NA"
      }`,
      x + 65,
      y + 30
    );

    doc.text("Quotation Amount", x, y + 40);
    doc.text(":", x + 60, y + 40);
    doc.text(
      `${
        application.businessDetails.quotation_amount
          ? application.businessDetails.quotation_amount
          : "NA"
      }`,
      x + 65,
      y + 40
    );

    doc.text("Loan Required Amount", x, y + 50);
    doc.text(":", x + 60, y + 50);
    doc.text(
      `${
        application.businessDetails.loan_amount
          ? application.businessDetails.loan_amount
          : "NA"
      }`,
      x + 65,
      y + 50
    );

    doc.line(5, 85, 205, 85);

    doc.setFontSize(14);
    doc.setFont("helvetica", "bold");
    doc.text("Bank Details:", x, y + 65);
    doc.setFont("helvetica", "normal");

    doc.setFontSize(12);
    doc.text("Nationalized Bank Name", x, y + 75);
    doc.text(":", x + 60, y + 75);
    doc.text(`${application.businessDetails.bank_name}`, x + 65, y + 75);

    doc.text("IFSC Code", x, y + 85);
    doc.text(":", x + 60, y + 85);
    doc.text(`${application.businessDetails.ifsc_code}`, x + 65, y + 85);

    doc.text("Branch Name", x, y + 95);
    doc.text(":", x + 60, y + 95);
    doc.text(`${application.businessDetails.branch_name}`, x + 65, y + 95);

    doc.text("Account Number", x, y + 105);
    doc.text(":", x + 60, y + 105);
    doc.text(`${application.businessDetails.account_number}`, x + 65, y + 105);

    doc.text("Bank Address", x, y + 115);
    doc.text(":", x + 60, y + 115);
    doc.text(`${application.businessDetails.bank_address}`, x + 65, y + 115);

    doc.line(5, y + 125, 205, y + 125);

    doc.setFontSize(14);
    doc.setFont("helvetica", "bold");
    doc.text("Guarantor Personal Details", x, y + 135);
    doc.setFont("helvetica", "normal");

    doc.setFontSize(12);
    doc.text("Name of Applicant", x, y + 145);
    doc.text(":", x + 40, y + 145);
    doc.text(`${guarantorPersonalDetails.name}`, x + 50, y + 145);
    doc.text("Aadhar Number", x, y + 155);
    doc.text(":", x + 40, y + 155);
    doc.text(
      `${
        guarantorPersonalDetails.aadhar ? guarantorPersonalDetails.aadhar : "NA"
      }`,
      x + 50,
      y + 155
    );
    doc.text("Pan Card Number", x, y + 165);
    doc.text(":", x + 40, y + 165);
    doc.text(
      `${guarantorPersonalDetails.pan ? guarantorPersonalDetails.pan : "NA"}`,
      x + 50,
      y + 165
    );
    doc.text("Gender", x, y + 175);
    doc.text(":", x + 40, y + 175);
    doc.text(
      `${getGender(guarantorPersonalDetails.gender, masters)}`,
      x + 50,
      y + 175
    );
    doc.text("Date of Birth", x, y + 185);
    doc.text(":", x + 40, y + 185);
    doc.text(
      `${
        guarantorPersonalDetails.dob
          ? formatDate(guarantorPersonalDetails.dob)
          : "NA"
      }`,
      x + 50,
      y + 185
    );
    //doc.text(`${formatDate(application.personalDetails.dob)}`, x + 50, y + 50);

    doc.text("Mobile Number", x, y + 195);
    doc.text(":", x + 40, y + 195);
    doc.text(`${guarantorPersonalDetails.mobile}`, x + 50, y + 195);

    doc.text("Marital Status", x, y + 205);
    doc.text(":", x + 40, y + 205);
    doc.text(
      `${
        masters.m_marital_status.find(
          (e) => e.id == guarantorPersonalDetails.marital_status
        )?.eng_name
      }`,
      x + 50,
      y + 205
    );
    doc.text("Community", x, y + 215);
    doc.text(":", x + 40, y + 215);
    doc.text(
      `${
        masters.m_religion.find(
          (r) => r.id == guarantorPersonalDetails.religion
        )?.eng_name
      }`,
      x + 50,
      y + 215
    );
    doc.text("Educational Qualification", x, y + 225);
    doc.text(":", x + 50, y + 225);
    doc.text(
      `${
        masters.m_educational_qualification.find(
          (e) => e.id == guarantorPersonalDetails.education_qualification
        )?.eng_name
      }`,
      x + 55,
      y + 225
    );
    doc.text("Qualification Details", x, y + 235);
    doc.text(":", x + 40, y + 235);
    doc.text(
      `${
        guarantorPersonalDetails.details
          ? guarantorPersonalDetails.details
          : "NA"
      }`,
      x + 50,
      y + 235
    );

    doc.text("Current Address", x, y + 245);
    doc.text(":", x + 40, y + 245);
    doc.text(`${guarantorPersonalDetails.current_address}`, x + 50, y + 245);
    doc.text(
      `${getDistrict(
        guarantorPersonalDetails.current_district,
        masters
      )} ${getTaluka(guarantorPersonalDetails.current_taluka, masters)} ${
        guarantorPersonalDetails.current_place
      } ${guarantorPersonalDetails.current_pincode}  `,
      x + 50,
      y + 255
    );

    response = await fetch(guarantorUrl);
    blob = await response.blob();

    const guarantorBase64Data = await convertBlobToBase64(blob);
    imageFormat = guarantorBase64Data.includes("png") ? "PNG" : "JPEG";
    doc.addImage(guarantorBase64Data, imageFormat, 140, y + 155, 30, 30);
    // doc.text(`${application.personalDetails.current_place} ${application.personalDetails.current_pincode} `, x + 50, y + 130)
    doc.addPage();
    y = 30;
    doc.text("Permanent Address", x, y);
    doc.text(":", x + 40, y);
    doc.text(`${guarantorPersonalDetails.current_address}`, x + 50, y);
    doc.text(
      `${getDistrict(
        guarantorPersonalDetails.current_district,
        masters
      )} ${getTaluka(guarantorPersonalDetails.current_taluka, masters)} ${
        guarantorPersonalDetails.current_place
      } ${guarantorPersonalDetails.current_pincode}  `,
      x + 50,
      y + 10
    );

    //   doc.text("Father/Husband ", x, y + 20);
    //   doc.text(":", x + 40, y + 20);
    //   doc.text(`${masters.m_guardian.find(
    //     (e) => e.id == guarantorPersonalDetails.guardian
    //   )?.eng_name
    //     }
    // `, x + 50, y + 20);

    //   doc.text("Father/Husband Occupation", x, y + 30);
    //   doc.text(":", x + 60, y + 30);
    //   doc.text(`${masters.m_occupation.find(
    //     (o) => o.id == guarantorPersonalDetails.occupation
    //   )?.eng_name
    //     }
    //    `, x + 70, y + 30);

    doc.text("Annual Income of Family", x, y + 20);
    doc.text(":", x + 50, y + 20);
    doc.text(
      `${application.guarantorPersonalDetails.income}
`,
      x + 55,
      y + 20
    );
    let q =
      application.personalDetails.guarantor == 1 ? "Guarantor" : "Applicant";
    doc.text(
      `Has The ${q} Previously Provided Surety For Anyone Else?`,
      x,
      y + 30
    );
    doc.text(":", x + 130, y + 30);
    doc.text(
      `${
        masters.m_past_surety_commitment.find(
          (p) => p.id == guarantorPersonalDetails.past_surety_commitment
        )?.eng_name
      } `,
      x + 140,
      y + 30
    );

    doc.line(5, y + 45, 205, y + 45);

    doc.setFontSize(14);
    doc.setFont("helvetica", "bold");
    doc.text("Collateral Summary:", x, y + 55);
    doc.setFont("helvetica", "normal");
    doc.setFontSize(12);

    const pageHeight = doc.internal.pageSize.height; // Get page height
    const marginTop = 10; // Adjust the top margin as needed
    y = 100; // Starting Y-coordinate

    // Function to check if we need a new page
    function checkPageBreak(doc, y, pageHeight) {
      if (y + 20 > pageHeight) {
        // Adding 20px buffer before breaking
        doc.addPage();
        y = marginTop; // Reset Y-coordinate for the new page
      }
      return y;
    }

    if (application.properties.length) {
      application.properties.forEach((property, index) => {
        const description = parseDescription(property.description);

        const details = [
          { label: "Property Description", value: "" },
          { label: `Property ${index + 1} : `, value: "" },
          {
            label: "Property Type :",
            value:
              masters.m_property_type.find(
                (p) => p.id == property.property_type
              )?.eng_name || "N/A",
          },
          { label: "Ownership Status :", value: "Owned" }, // Example
          { label: "Survey No :", value: property.survey_no || "N/A" },
          { label: "Unit No :", value: property.unit_no || "N/A" },
          {
            label: "Street Address :",
            value: property.street_address || "N/A",
          },
          { label: "Place :", value: property.place || "N/A" },
          {
            label: "District :",
            value: getDistrict(property.dist_id, masters),
          },
          { label: "Taluka :", value: getTaluka(property.taluka_id, masters) },
          { label: "Pincode :", value: property.pincode || "N/A" },
          {
            label: "Property Value in Rs.:",
            value: property.property_value || "N/A",
          },
          {
            label: "Area :",
            value: `${description.area} ${description.area_unit}`,
          },
        ];

        details.forEach((detail, i) => {
          y = checkPageBreak(doc, y, pageHeight); // Check if new page is needed
          doc.text(`${detail.label} ${detail.value} `, x, y);
          y += 10; // Move Y-coordinate down
        });

        y += 20; // Add space before the next property
      });
    }

    if (application.licPolicies.length) {
      application.licPolicies.forEach((policy, index) => {
        const details = [
          { label: "LIC Information", value: "" },
          {
            label: `LIC Policy ${index + 1} : `,
            value: policy.policy_name || "N/A",
          },
          {
            label: "Policy Receipt No :",
            value: policy.policy_receipt_no || "N/A",
          },
          { label: "Policy Type :", value: policy.policy_type || "N/A" },
          {
            label: "Start Date :",
            value: formatDate(policy.start_date) || "N/A",
          },
          {
            label: "Maturity Date :",
            value: formatDate(policy.maturity_date) || "N/A",
          },
          {
            label: "Surrender Value :",
            value: policy.surrender_value || "N/A",
          },
        ];

        details.forEach((detail) => {
          y = checkPageBreak(doc, y, pageHeight); // Check if new page is needed
          doc.text(`${detail.label} ${detail.value} `, x, y);
          y += 10;
        });

        y += 20; // Add space before the next policy
      });
    }

    if (application.fds.length) {
      application.fds.forEach((fd, index) => {
        const details = [
          { label: "FD Information", value: "" },
          { label: `FD ${index + 1}: `, value: "" },
          { label: "Bank Name :", value: fd.bank_name || "N/A" },
          { label: "FD Account Number :", value: fd.fd_acc_no || "N/A" },
          { label: "Start Date :", value: formatDate(fd.start_date) || "N/A" },
          {
            label: "Maturity Date :",
            value: formatDate(fd.maturity_date) || "N/A",
          },
          { label: "FD Amount :", value: fd.amount || "N/A" },
        ];

        details.forEach((detail) => {
          y = checkPageBreak(doc, y, pageHeight); // Check if new page is needed
          doc.text(`${detail.label} ${detail.value} `, x, y);
          y += 10;
        });

        y += 20; // Add space before the next FD
      });
    }
    function parseDescription(description) {
      try {
        return JSON.parse(description);
      } catch (e) {
        return { area: "", area_unit: "" }; // Default empty values
      }
    }

    // Save the PDF
    doc.save(`${application.personalDetails.name} -MAMFDC.pdf`);
  } catch (e) {
    console.log("error in createPdf ", e);
  }
}
