<script>
  import { onMount } from "svelte";
  import { sakalBharatiFontBase64 } from "$lib/sakalBharati";
  import { api } from "$api/api";
  import { userId } from "$appstore/store";
  import { base } from "$app/paths";

  export let applications;
  export let masters;
  export let allAnswers;
  export let sanctionDetails;
  let pdfMake;
  let disbursement_Question = [];
  onMount(async () => {
    console.log("sanctionDetails", sanctionDetails);

    disbursement_Question = allAnswers.filter((a) => a.checkpoint_id == 23);

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
    let fontSize = "14";
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
        //       text: "मौलाना आझाद अल्पसंख्याक आर्थिक विकास महामंडळ मर्यादित, मुंबई\n",
        //       style: "header",
        //       alignment: "center",
        //       fontSize: 12,
        //     },
        //     {
        //       text: "मुदत कर्ज योजना पार्ट २ वैधानिक दस्तावेज छाननी अहवाल",
        //       style: "subheader",
        //       alignment: "center",
        //       fontSize: 12,
        //     },
        //     // {
        //     //   text: "GOVT. OF MAHARASHTRA",
        //     //   style: "subsubsubheader",
        //     //   alignment: "center",
        //     // },
        //   ],
        // },
        // {
        //   text: `(जिल्हा कार्यालय- ${masters.m_district.find((m) => m.dist_id == applications.personalDetails.district_id)?.eng_name}`,
        //   style: "subsubheader",
        //   alignment: "center",
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
          text: [
            {
              text: `कर्ज अर्ज क्रमांक :-${applications.personalDetails.form_no}`,
            },
            {
              text: ` \t \tजिल्हा:- ${masters.m_district.find((m) => m.dist_id == applications.personalDetails.district_id)?.eng_name}`,
            },
          ],
          fontSize: 10,
        },
        {
          text: `जिल्हा कार्यालयात पार्ट २ अर्ज जमा केलेल्याचा दिनांक :- ${applications.personalDetails.updated_at.split("T")[0]}`,
          margin: [0, 0, 0, 0],
          fontSize: 10,
        },
        {
          text: `अर्जदाराचे नाव :-${applications.personalDetails.name}`,
          margin: [0, 0, 0, 0],
          fontSize: 10,
        },
        {
          text: `व्यवसायाचे नाव :-${applications.businessDetails.business_name}`,
          margin: [0, 0, 0, 0],
          fontSize: 10,
        },
        {
          text: `मंजूर झालेली रक्कम : ${sanctionDetails[0]?.approved_loan_amount}`,
          margin: [0, 0, 0, 0],
          fontSize: 10,
        },
        {
          canvas: [
            {
              type: "line",
              x1: 0,
              y1: 0,
              x2: 590 - 2 * 30,
              y2: 0,
              lineWidth: 2,
            },
          ],
        },

        // {
        //   text: `१) पार्ट २ अर्ज (वैधानिक दस्तावेज) संपूर्ण भरलेले आहे का? `,
        //   margin: [0, 20, 0, 0],
        //   fontSize: 9,
        // },

        // {
        //   text: `2) वैधानिक दस्तावेजावर प्रत्येक पानावर जिल्हा व्यवस्थापक यांनी सही व शिक्का मारलेला आहे का ?`,
        //   margin: [0, 0, 0, 0],
        //   fontSize: 9,
        // },
        // {
        //   text: `३) वैधानिक दस्तावेज रजिस्टर नोटरी करुन जोडले आहे का ?`,
        //   margin: [0, 0, 0, 0],
        //   fontSize: 9,
        // },
        // {
        //   text: `४) कर्ज मंजूरीपत्र (स्वाक्षरीसह) करुन जोडले आहे का ?`,
        //   margin: [0, 0, 0, 0],
        //   fontSize: 9,
        // },
        // {
        //   text: `५) वीस धनादेश PDC धनादेश जिल्हा कार्यालयात जमा करुन घेतले आहे का? सोबत त्याचा अहवाल जोडला आहे का?`,
        //   margin: [0, 0, 0, 0],
        //   fontSize: 9,
        // },
        // {
        //   text: `६) जामीनदाराचे रु.१०० स्टॅम्प वरील प्रतिज्ञापत्र रजिस्टर नोटरीसहीत जोडलेले आहे का?`,
        //   margin: [0, 0, 0, 0],
        //   fontSize: 9,
        // },
        // {
        //   text: `७) धनादेशाची छायांकित प्रत जोडलेली आहे का?`,
        //   margin: [0, 0, 0, 0],
        //   fontSize: 9,
        // },
        // {
        //   text: `८) जामीनदार मालमत्ता धारक असल्यास त्याचा ७/१२ चढविल्याची मूळ प्रत तसेच On-Line पडताळणी केली आहे काय ? पडताळणी केली असत्यास त्याची प्रिन्ट अर्जासोबत जोडून जिल्हा व्यवस्थापक यांनी प्रमाणित करुन जोडलेले आहे काय ?`,
        //   margin: [0, 0, 0, 0],
        //   fontSize: 9,
        // },
        // {
        //   text: `९) परतफेड वेळापत्रक जोडलेले आहे का ?`,
        //   margin: [0, 0, 0, 0],
        //   fontSize: 9,
        // },
        // {
        //   text: `१०) वसूली अधिकारी यांनी केलेला स्थळपाहणी अहवाल जोडले आहे का ?-`,
        //   margin: [0, 0, 0, 0],
        //   fontSize: 9,
        // },
        // {
        //   text: `११) नंच (NACH) अहवाल जोडलेले आहे का ?`,
        //   margin: [0, 0, 0, 0],
        //   fontSize: 9,
        // },
        // {
        //   text: `१२) वैधानिक दस्तावेज अर्ज जमा झाल्याची पावती जोडलेली आहे का?  `,
        //   margin: [0, 0, 0, 0],
        //   fontSize: 9,
        // },
        {
          table: {
            headerRows: 1,
            widths: ["10%", "70%", "20%"], // Adjust column widths as needed
            body: [
              // Table header
              // Table rows
              [
                "१)",
                "पार्ट २ अर्ज (वैधानिक दस्तावेज) संपूर्ण भरलेले आहे का?",
                `${disbursement_Question.find((d) => d.question_id == 164)?.answer == "1" ? "होय" : "नाही"}`,
              ],
              [
                "२)",
                "वैधानिक दस्तावेजावर प्रत्येक पानावर जिल्हा व्यवस्थापक यांनी सही व शिक्का मारलेला आहे का?",
                `${disbursement_Question.find((d) => d.question_id == 165)?.answer == "1" ? "होय" : "नाही"}`,
              ],
              [
                "३)",
                "वैधानिक दस्तावेज रजिस्टर नोटरी करुन जोडले आहे का?",
                `${disbursement_Question.find((d) => d.question_id == 166)?.answer == "1" ? "होय" : "नाही"}`,
              ],
              [
                "४)",
                "कर्ज मंजूरीपत्र (स्वाक्षरीसह) करुन जोडले आहे का?",
                `${disbursement_Question.find((d) => d.question_id == 167)?.answer == "1" ? "होय" : "नाही"}`,
              ],
              [
                "५)",
                "वीस धनादेश PDC धनादेश जिल्हा कार्यालयात जमा करुन घेतले आहे का? सोबत त्याचा अहवाल जोडला आहे का?",
                `${disbursement_Question.find((d) => d.question_id == 168)?.answer == "1" ? "होय" : "नाही"}`,
              ],
              [
                "६)",
                "जामीनदाराचे रु.१०० स्टॅम्प वरील प्रतिज्ञापत्र रजिस्टर नोटरीसहीत जोडलेले आहे का?",
                `${disbursement_Question.find((d) => d.question_id == 169)?.answer == "1" ? "होय" : "नाही"}`,
              ],
              [
                "७)",
                "धनादेशाची छायांकित प्रत जोडलेली आहे का?",
                `${disbursement_Question.find((d) => d.question_id == 170)?.answer == "1" ? "होय" : "नाही"}`,
              ],
              [
                "८)",
                "जामीनदार मालमत्ता धारक असल्यास त्याचा ७/१२ चढविल्याची मूळ प्रत तसेच On-Line पडताळणी केली आहे काय? पडताळणी केली असत्यास त्याची प्रिन्ट अर्जासोबत जोडून जिल्हा व्यवस्थापक यांनी प्रमाणित करुन जोडलेले आहे काय?",
                `${disbursement_Question.find((d) => d.question_id == 171)?.answer == "1" ? "होय" : "नाही"}`,
              ],
              [
                "९)",
                "परतफेड वेळापत्रक जोडलेले आहे का?",
                `${disbursement_Question.find((d) => d.question_id == 172)?.answer == "1" ? "होय" : "नाही"}`,
              ],
              [
                "१०)",
                "वसूली अधिकारी यांनी केलेला स्थळपाहणी अहवाल जोडले आहे का?",
                `${disbursement_Question.find((d) => d.question_id == 173)?.answer == "1" ? "होय" : "नाही"}`,
              ],
              [
                "११)",
                "नंच (NACH) अहवाल जोडलेले आहे का?",
                `${disbursement_Question.find((d) => d.question_id == 174)?.answer == "1" ? "होय" : "नाही"}`,
              ],
              [
                "१२)",
                "वैधानिक दस्तावेज अर्ज जमा झाल्याची पावती जोडलेली आहे का?",
                `${disbursement_Question.find((d) => d.question_id == 175)?.answer == "1" ? "होय" : "नाही"}`,
              ],
            ],
          },
          layout: {
            // Custom layout to remove all borders
            hLineWidth: function () {
              return 0;
            }, // Remove horizontal lines
            vLineWidth: function () {
              return 0;
            }, // Remove vertical lines
          },
          margin: [0, 20, 0, 0],
          // layout: "lightHorizontalLines", // Optional: Adds horizontal lines
        },

        {
          text: `प्रमाणित करण्यात येते की, मी ________________  जिल्हा व्यवस्थापक / प्रभारी जिल्हा व्यवस्थापक कर्ज अर्जातील सर्व मूळ कागदपत्रांची तपासणी केली आहे. अर्जातील सर्व कागदपत्रे बरोबर असल्याची माझी खात्री झाली आहे. सदरील नस्तीमध्ये पृष्ट क्र. ०१ ते _____ पर्यंतची एकूण पृष्ट संख्या______ - आहे. वरील संबंधितांचे कर्ज प्रकरणाचा पहिला हप्ता रुपये _____ - मंजूर करण्यास मी शिफारस करीत आहे. `,
          margin: [0, 20, 0, 0],
          fontSize: 9,
        },
        {
          text: `जिल्हा व्यवस्थापकाची`,
          margin: [0, 20, 0, 0],
          fontSize: 9,
        },
        {
          text: `सही व शिक्का`,
          margin: [400, 40, 0, 0],
          fontSize: 9,
        },
      ],
      styles: {
        fontawesome: {
          font: "FontAwesome",
          color: "#656565",
        },
      },
    };

    pdfMake.createPdf(docDefinition).download("inspection_report_part2.pdf");
  }
</script>

<button on:click={generatePdf} class="bg-blue-500 text-white px-4 py-2 rounded">
  Download
</button>
