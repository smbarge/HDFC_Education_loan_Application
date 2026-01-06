import fs from "fs";
import path from "path";
import { error, json } from "@sveltejs/kit";
import PizZip from "pizzip";
import Docxtemplater from "docxtemplater";

export async function POST({ request }) {
  try {
    // Parse request body
    const {
      applicantName,
      applicantDistrict,
      applicantAge,
      applicantAddress,
      applicantPinCode,
      applicantAadhar,
      guarantorName,
      guarantorDistrict,
      guarantorAge,
      guarantorAddress,
      guarantorPinCode,
      guarantorAadhar,
      guarantorPanCard,
    } = await request.json();

    // Load the template file (Ensure it's inside `static/`)
    const templatePath = path.resolve(
      "static/template_Term_Loan_Agreement.docx"
    );
    const content = fs.readFileSync(templatePath, "binary");

    // Load the template into PizZip
    const zip = new PizZip(content);
    const doc = new Docxtemplater(zip);

    // Replace placeholders in the document
    doc.setData({
      APPLICANT_NAME: applicantName,
      APPLICANT_ADDRESS: applicantAddress,
      APPLICANT_PINCODE: applicantPinCode,
      APPLICANT_DISTRICT: applicantDistrict,
      APPLICANT_AGE: applicantAge,
      APPLICANT_AADHAR: applicantAadhar,

      GUARANTOR_NAME: guarantorName,
      GUARANTOR_ADDRESS: guarantorAddress,
      GUARANTOR_PINCODE: guarantorPinCode,
      GUARANTOR_DISTRICT: guarantorDistrict,
      GUARANTOR_AGE: guarantorAge,
      GUARANTOR_AADHAR: guarantorAadhar,
      GUARANTOR_PAN: guarantorPanCard,
    });

    // Render the document
    doc.render();

    // Generate the updated document as a buffer
    const buffer = doc.getZip().generate({ type: "nodebuffer" });

    return new Response(buffer, {
      headers: {
        "Content-Type":
          "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
        "Content-Disposition": "attachment; filename=generated_report.docx",
      },
    });
  } catch (err) {
    console.error("Error generating DOCX:", err);
    return json({ error: "Failed to generate DOCX" }, { status: 500 });
  }
}
