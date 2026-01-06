<script>
  import { onMount } from "svelte";
  import { sakalBharatiFontBase64 } from "$lib/sakalBharati";
  import { base } from "$app/paths";
  import { DateTime } from "luxon";
  export let applications;
  export let sanctionDetails;
  export let masters;
  let pdfMake;

  onMount(async () => {
    console.log("sanction details is",sanctionDetails);
    
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

  async function getBase64FromUrl(url) {
    const res = await fetch(url);
    const blob = await res.blob();
    return await convertBlobToBase64(blob);
  }

  function convertBlobToBase64(blob) {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onerror = reject;
      reader.onload = () => resolve(reader.result);
      reader.readAsDataURL(blob);
    });
  }

  async function generatePdf() {
    if (!pdfMake) {
      alert("PDF generator is not ready yet.");
      return;
    }
    const imageUrl = `${base}/MAMFDC_LetterHead_2.jpg`; // Path from static/
    const base64Image = await getBase64FromUrl(imageUrl);

    const d = new Date();
    let year = d.getFullYear();

    const docDefinition = {
      pageSize: "A4",
      pageMargins: [30, 20, 20, 20],
      defaultStyle: {
        font: "SakalBharati",
        fontSize: 9.5,
      },
      content: [
        // {
        //   text: [
        //     {
        //       text: "महाराष्ट्र शासन \nअल्पसंख्याक विकास विभाग",
        //       style: "header",
        //       alignment: "center",
        //       fontSize: 10,
        //     },
        //     {
        //       text: "मौलाना आजाद अल्पसंख्याक आर्थिक विकास महामंडळ मर्यादित, मुंबई",
        //       style: "subheader",
        //       alignment: "center",
        //       fontSize: 10,
        //     },

        //     // {
        //     //   text: "GOVT. OF MAHARASHTRA",
        //     //   style: "subsubsubheader",
        //     //   alignment: "center",
        //     // },
        //   ],
        // },

        // {
        //   text: "MAULANA AZAD ALAPSANKHYANK ARTHIK VIKAS MAHAMANDAL MARVADIT, MUMBAI - 23",
        //   alignment: "center",
        //   fontSize: 10,
        // },
        // {
        //   text: "२ रा मजला बी. जुनेजारीच मार्ग मुंबई २३",
        //   alignment: "center",
        //   fontSize: 10,
        // },
        {
          image: base64Image,
          width: 550,
          height: 150,
          margin: [-10, 0, 0, 10],
        },
        {
          canvas: [
            {
              type: "line",
              x1: 0,
              y1: 0,
              x2: 590 - 2 * 30,
              y2: 0,
              lineWidth: 2.5,
            },
          ],
        },

        {
          columns: [
            {
              text: `क. मौआम/मुदत/कमं/${year}/`,
              fontSize: 10,
            },
            {
              text: `दिनांक :  ${DateTime.fromISO(sanctionDetails.created_at).setZone("Asia/Kolkata").toFormat("dd/MM/yyyy")}`,
              fontSize: 10,
              alignment: "center",
            },
          ],
        },
        {
          text: "मंजुरी पत्र",
          alignment: "center",
          fontSize: 14,
        },
        {
          text: `प्रति,`,
          alignment: "left",
          fontSize: 10,
        },

        {
          text: `${applications.personalDetails.name}`,
          alignment: "left",
          fontSize: 10,
        },
        {
          text: `${applications.personalDetails.current_address},${applications.personalDetails.current_place}`,
          alignment: "left",
          fontSize: 10,
        },
        {
          text: `Tal:- ${masters.m_taluka.find((e) => e.taluka_id == applications.personalDetails.current_taluka)?.eng_name} Dist:- ${masters.m_district.find((e) => e.dist_id == applications.personalDetails.current_district)?.eng_name} `,
          alignment: "left",
          fontSize: 10,
        },
        {
          text: `${applications.personalDetails.current_pincode}`,
          alignment: "left",
          fontSize: 10,
        },
        {
          text: "विषयः महामंडळाच्या मुदत कर्ज योजनेअंतर्गत कर्ज मंजूरीबाबत...",
          alignment: "center",
          fontSize: 10,
          margin: [0, 5, 0, 0],
        },
        {
          columns: [
            {
              text: [
                {
                  text: `कर्ज अर्ज क्रः  ${applications.personalDetails.form_no}\n`,
                  alignment: "left",
                  fontSize: 10,
                },
                {
                  text: `दूरध्वनी क्रः ${applications.personalDetails.mobile}`,
                  alignment: "left",
                  fontSize: 10,
                },
              ],
            },
            {
              text: [
                {
                  text: "योजना : मुदत कर्ज\n",
                  alignment: "center",
                  fontSize: 10,
                },
                {
                  text: "बैठक क्रः ",
                  alignment: "center",
                  fontSize: 10,
                },
              ],
            },
          ],
        },

        {
          text: `राष्ट्रीय अल्पसंख्याक विकास व वित्त निगम नवी दिल्ली यांच्या कडून कर्ज स्वरुपात प्राप्त होणाऱ्या निधीतून या महामंडळाकडून मागील पृष्ठावर दिलेल्या अटी व शर्तीवर कर्ज मंजूर करण्यात येत असून हे मंजूरी आदेश प्राप्त झाल्यावर ३० दिवसांत वैधानिक दस्तऐवज व आवश्यक कागदपत्रे मौलाना आझाद अल्पसंख्याक आर्थिक विकास महामंडळाच्या जिल्हा कार्यालयात जमा करावी, अर्जदाराने खोटी माहिती, कागदपत्रे व दस्तऐवज देऊन कर्ज मंजूर करुन घेण्याचे प्रयत्न केल्याचे सिध्द झाल्यास हे कर्ज नामंजूर करण्यात येईल व एक रक्कमी कर्ज परत घेतले जाईल व मंडळाची दिशाभूल केल्याप्रकरणी लाभार्थी कारवाईस पात्र राहील. कर्ज मंजूर करणे, नामंजूर करणे, मंजूरीकर्जाच्या रक्कमेत बदल करणे व कर्ज प्रलंबित ठेवण्याचा अधिकार महामंडळाने राखून ठेवला आहे. हे पत्र कर्ज मंजूर झाले असल्याची माहिती देणारे प्राथमिक पत्र आहे, वैधानिक कागदपत्रे तपासून, निधी उपलब्धतेच्या अधीन कर्ज वितरणाची पुढील प्रक्रिया सुरु केली जाईल.`,
          fontSize: 10,
          margin: [0, 0, 10, 0],
        },
        {
          columns: [
            {
              text: `व्यवसायः`,
              alignment: "left",
              fontSize: 10,
            },
            {
              text: `क्रेडीट लाईनः`,
              alignment: "center",
              fontSize: 10,
            },
          ],
        },
        {
          table: {
            // headers are automatically repeated if the table spans over multiple pages
            // you can declare how many rows should be treated as headers
            headerRows: 1,
            widths: ["*", "auto", 100, "*", "*", "*"],

            body: [
              [
                "मंजूर कर्ज",
                "स्वतःची गुंतवणूक \n५%",
                "वितरित होणाऱ्या रक्कमेतुन विम्याची वजावट १.५% (एकदाच)",
                "महामंडळाचे कर्ज ५%",
                "राष्ट्रीय महामंडळाचे कर्ज ९०%",
                "एकूण वितरित रक्कम",
              ],
              [
                sanctionDetails.approved_loan_amount,
                sanctionDetails.self_investment_amount,
                sanctionDetails.insurance_deduction_amount,
                sanctionDetails.corporation_loan_amount,
                sanctionDetails.national_corporation_loan_amount,
                sanctionDetails.total_disbursed_loan,
              ],
              [
                { text: "व्याजाचा दरः ६%", bold: true, colSpan: 2 },
                {},
                { text: "हमी शुल्कः २%", colSpan: 2 },
                {},
                { text: "एकूणः ८%", colSpan: 2 },
                {},
              ],
            ],
          },
        },
        {
          text: `परतफेड कालावधीः ५ वर्षे`,
          alignment: "left",
          fontSize: 10,
          // pageBreak:"before"
        },
        {
          text: `या मंजुरी पत्राच्या मागील पृष्ठावर नमुद असलेल्या अटी व शर्ती आपणास मान्य असल्याबद्दल आपली स्वाक्षरी (दिनांकासह) करुन ते पत्र मुळ प्रतीत महामंडळाच्या जिल्हा कार्यालयात वैधानिक दस्तऐवज व इतर कागदपत्रासहीत जमा करावे.`,
          alignment: 10,
        },
        {
          columns: [
            // {
            //   text: "टीप:",
            //   bold: true,
            //   fontSize: 10,
            //   margin: [0, 0, 0, 5],
            // },
            {
              table: {
                widths: ["*"],
                body: [
                  [
                    {
                      text: "टीप:",
                      border: [true, true, true, true],
                      fillColor: "#FFFFFF",
                      margin: [0, 10, 0, 0],
                    },
                  ],
                ],
              },
              margin: [0, 0, 0, 20],
            },

            {
              text: "व्यवस्थापकीय संचालक \n मौलाना आझाद अल्पसंख्याक\nआर्थिक विकास महामंडळ मर्यादित, मुंबई",
              alignment: "right",
              bold: true,
              fontSize: 10,
              margin: [0, 20, 0, 2],
            },
          ],
        },
        {
          text: "प्रति,  जिल्हा व्यवस्थापक, मौलाना आझाद अल्पसंख्याक आर्थिक विकास महामंडळ मर्या.",
          fontSize: 10,
          margin: [0, 2, 0, 5],
        },
        // {
        //   text: ` जिल्हा व्यवस्थापक, मौलाना आझाद अल्पसंख्याक आर्थिक विकास महामंडळ मर्या.`,
        //   fontSize: 10,
        //   margin: [10, 0, 0, 5],
        // },
      ],

      styles: {
        fontawesome: {
          font: "FontAwesome",
          color: "#656565",
        },
      },
    };

    pdfMake.createPdf(docDefinition).download("Sanction-Letter.pdf");
  }
</script>

<button on:click={generatePdf} class="bg-blue-500 text-white px-4 py-2 rounded">
  Download
</button>
