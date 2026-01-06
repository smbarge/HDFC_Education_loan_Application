<script>
  import { onMount } from "svelte";
  import { sakalBharatiFontBase64 } from "$lib/sakalBharati";

  let pdfMake;

  onMount(async () => {
    const pdfMakeModule = await import("pdfmake/build/pdfmake");

    pdfMake = pdfMakeModule.default;

    // Define the custom font
    const fonts = {
      SakalBharati: {
        normal: "SakalBharati",
        bold: "SakalBharati",
        italics: "SakalBharati",
        bolditalics: "SakalBharati",
      },
      //   FontAwesome: {
      //     normal: "./font/FontAwesome.ttf",
      //   },
    };

    // Add the font to virtual file system
    const vfs = {
      SakalBharati: sakalBharatiFontBase64,
    };

    pdfMake.vfs = vfs;
    pdfMake.fonts = fonts;
  });
  function generatePdf() {
    if (!pdfMake) {
      alert("PDF generator is not ready yet.");
      return;
    }
    let fontSize = "14";
    const docDefinition = {
      pageSize: "A4",
      pageMargins: [30, 20, 20, 20],
      defaultStyle: {
        font: "SakalBharati",
        fontSize: 9.5,
      },

      content: [
        {
          table: {
            widths: [50, 200, 50, 200],
            body: [
              ["प्रकरण क्र : -", "", "वर्ष :-", ""],
              ["योजना :-", "", "दिनांक :-", ""],
            ],
          },
        },
        {
          text: `सादर,`,
          fontSize: 11,
          margin: [10, 10, 0, 0],
        },
        {
          text: `विषय :- मुदत कर्जाची मंजुर रक्कम वितरित करण्याबाबत..`,
          fontSize: 11,
          margin: [50, 0, 0, 0],
        },
        {
          text: `श्री.${applications.personalDetails.name}`,
          fontSize: 11,
          margin: [50, 0, 0, 0],
        },
        {
          fontSize: 11,
          text: `रा.${applications.personalDetails.current_address}  ता. ${masters.m_taluka.find((t) => t.taluka_id == applications.personalDetails.current_taluka)?.eng_name} जि.${masters.m_district.find((m) => m.dist_id == applications.personalDetails.current_district)?.eng_name} अर्जदार यांनी ${applications.businessDetails.business_name} या व्यवसायासाठी मुदत कर्ज योजने अंतर्गत कर्जाची मागणी केली आहे.`,
          margin: [0, 0, 0, 0],
        },
        {
          text: `महामंडळाच्या संचालक मंडळाच्या दिनांक 20/01/2023 रोजीच्या ११२ व्या बैठकीत संचालक मंडळाचे पात्र लाभार्थ्यांना मंजूर व वितरीत `,
          fontSize: 11,
          margin: [50, 5, 0, 0],
        },
        {
          text: `करण्याचे अधिकार व्यवस्थापकीय संचालक यांना देण्यात आले आहेत.`,
          fontSize: 11,
          margin: [0, 0, 0, 0],
        },
        {
          text: `सदर अर्जदाराचे सर्व वैधानिक दस्तावेज व मुदत कर्ज मंजूरी आदेशात दर्शविण्यात आलेल्या अटी व शर्थी मान्य असल्याबाबतचे जिल्हा`,
          fontSize: 11,
          margin: [50, 5, 0, 0],
        },
        {
          text: `व्यवस्थापक,________________________ यांनी पत्र क्र._______ दिनांक ________अन्वये त्यांचा अहवाल सादर करून कर्ज वितरित करण्याची शिफारस केली आहे.`,
          fontSize: 11,
          margin: [0, 0, 0, 0],
        },
        {
          columns: [
            {
              text: `व्यवसाय :`,
              fontSize: 11,
              alignment: "left",
            },
            {
              text: `क्रेडीट लाईनः`,
              fontSize: 11,
              alignment: "center",
            },
          ],
        },
        {
          table: {
            // headers are automatically repeated if the table spans over multiple pages
            // you can declare how many rows should be treated as headers
            headerRows: 1,
            widths: ["*", "auto", 100, "*", "*", "*"],
            fontSize: 11,

            body: [
              [
                " कर्ज मंजूर",
                "स्वतःची गुंतवणूक \n५%",
                "वितरित होणाऱ्या रक्कमेतुन विम्याची वजावट १.५% (एकदाच)",
                "महामंडळाचे कर्ज ५%",
                "राष्ट्रीय महामंडळाचे कर्ज ९०%",
                "एकूण वितरित रक्कम",
              ],
              [
                sanctionDetails[0].approved_loan_amount,
                sanctionDetails[0].self_investment_amount,
                sanctionDetails[0].insurance_deduction_amount,
                sanctionDetails[0].corporation_loan_amount,
                sanctionDetails[0].national_corporation_loan_amount,
                sanctionDetails[0].total_disbursed_loan,
              ],

              [
                { text: "व्याजाचा दरः ८%", bold: true, colSpan: 2 },
                {},
                { text: "हमी शुल्कः २%", colSpan: 2 },
                {},
                { text: "एकूणः १०%", colSpan: 2 },
                {},
              ],
            ],
          },
        },
        {
          text: `तरी अर्जदार यांना वरील तपशिला प्रमाणे देय असलेली रक्कम रु. ${sanctionDetails[0].approved_loan_amount}`,
          fontSize: 11,
          margin: [50, 10, 0, 0],
        },
        {
          text: `(अक्षरी रु.________________________________________________ ) अर्जदाराच्या बँक खाते क्र. _________________________________________________ मध्ये जमा करण्यास हरकत नसावी.`,
          fontSize: 11,
          margin: [0, 0, 0, 0],
        },
        {
          text: `मान्यतेस्तव व आदेशार्थ सादर,`,
          fontSize: 11,
          margin: [0, 0, 0, 0],
        },
        {
          text: `डाटा एन्ट्री ऑपरेटर / लिपिक टंकलेखक`,
          fontSize: 11,
          margin: [0, 30, 0, 0],
        },
        {
          text: `सहाय्यक व्यवस्थापक / वसुली अधिकारी`,
          fontSize: 11,
          margin: [0, 30, 0, 0],
        },
        {
          columns: [
            {
              text: "प्र. उप. व्यवस्थापक",
              fontSize: 11,
              // alignment:'center',
              margin: [0, 40, 0, 0],
            },
            {
              fontSize: 11,
              text: "व्यवस्थापकीय संचालक",
              alignment: "center",
              margin: [0, 40, 0, 0],
            },
          ],
        },
      ],
      styles: {
        fontawesome: {
          font: "FontAwesome",
          color: "#656565",
        },
      },
    };

    pdfMake.createPdf(docDefinition).download("loan-application-form.pdf");
  }
</script>

<button on:click={generatePdf} class="bg-blue-500 text-white px-4 py-2 rounded">
  Download
</button>
