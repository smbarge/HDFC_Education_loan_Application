<script>
  import { onMount } from "svelte";
  import { sakalBharatiFontBase64 } from "$lib/sakalBharati";
  import { base } from "$app/paths";

  export let applications;
  export let masters;
  export let allAnswers;
  export let verification;
  let pdfMake;

  onMount(async () => {
    console.log("masters", masters);
    console.log("applications", applications);
    console.log("allAnswers", allAnswers);
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
    };

    // Add the font to virtual file system
    const vfs = {
      SakalBharati: sakalBharatiFontBase64,
    };

    pdfMake.vfs = vfs;
    pdfMake.fonts = fonts;
  });

  function formatDateToDDMMYYYY(date) {
    date = new Date(date.split("T")[0]);
    console.log("date is", date);
    const day = String(date.getDate()).padStart(2, "0"); // Get day and pad with leading zero
    const month = String(date.getMonth() + 1).padStart(2, "0"); // Get month (0-indexed) and pad
    const year = date.getFullYear(); // Get full year
    return `${day}-${month}-${year}`;
  }
  let errorArray = [];
  const textArray = [
    { text: `अधिवास प्रमाणपत्र मान्य नाही.`, docId: 7, queId: 97 },
    // { text: `मुदत कर्ज अर्ज अपूर्ण भरलेला आहे.`, docId: 0 },
    { text: `अर्जदार रहिवासी पुरावा मान्य नाही.`, docId: 5, queId: 96 },
    { text: `जामीनदार रहिवासी पुरावा मान्य नाही.`, docId: 6, queId: 106 },
    // { text: `अर्जदाराचे अधिवास प्रमाणपत्र जोडले नाही.`, docId: 0 },
    {
      text: `अर्जदाराचे जन्म दिनांकाचा पुरावा धर्माचे प्रमाणपत्र मान्य नाही.`,
      docId: 12,
      queId: 98,
    },
    {
      text: `GST नंबरधारक कोटेशन प्रमाणपत्र मान्य नाही.`,
      docId: 15,
      queId: 100,
    },
    {
      text: `अर्जदाराच्या व्यवसायाचे जागेचे गुमास्ता/ शॉप अॅक्ट लायसन्स पुरावे मान्य नाही.`,
      docId: 17,
      queId: 101,
    },
    {
      text: `कुंटुबातील व्यक्तीने कर्ज घेतलेले असून परतफेडीचा अहवाल जोडलेला नाही कुंटुबातील उत्पन्नाच्या खुलासाबाबत अहवाल मागविणे.`,
      docId: 11,
      queId: 99,
    },
    {
      // text: `शिधापत्रिकेची झेरॉक्स मान्य नाही. शिधापत्रिकेत अर्जदार यांचे नाव नाही/ पैनकार्ड नाही.`,
      text: `शिधापत्रिकेची झेरॉक्स मान्य नाही.`,
      docId: 20,
      queId: 58,
    },
    {
      text: `अर्जदार यांचे विहीत नमुन्यातील प्रतिज्ञापत्र मान्य नाही.`,
      docId: 25,
      queId: 105,
    },
    {
      text: `जामिनदार यांचे विहीत नमुन्यातील प्रतिज्ञापत्र मान्य नाही.`,
      docId: 14,
      queId: 109,
    },
    { text: `अर्जदाराचे बैंक खाते राष्ट्रीयकृत नाही.`, docId: 0, queId: 39 },
    {
      text: `जामिनदार मालमत्ताधारक असल्यास ७/१२, ६-४, ८-अ उतारा तसेच मालमत्ता नोंदणीपत्रक (P.R CARD) मान्य नाही.`,
      docId: 10,
      queId: 107,
    },
    {
      text: `जामिनदाराच्या ७/१२.६-८-अ उतारा व मालमत्तानोंदणीपत्रक गट क्र. व सर्वे नंबर/नावामध्ये तफावत आहे.`,
      docId: 0,
      queId: 85,
    },
    // {  text: `जामिनदार सक्षम नाही. बदलून घेणे.`, docId: 0 },
    { text: `प्राथमिक मंजूरीपत्र जोडलेले नाही.`, docId: 0, queId: 0 },
  ];

  textArray.forEach((e) => {
    let found = allAnswers.find(
      (a) =>
        a.application_id == applications.personalDetails.id &&
        e.queId == a.question_id
    )?.answer;
    console.log("found", found);
    if (found == "2") {
      errorArray.push(e);
    }
  });
  console.log("errorArray is", errorArray);
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

    let fontSize = "14";
    let date = verification.find((e) => e.status == "13")?.updated_at;
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
        //       text: "मौलाना आझाद अल्पसंख्याक आर्थिक विकास महामंडळ मर्यादित, मुंबई\n",
        //       style: "header",
        //       alignment: "center",
        //     },
        //     {
        //       text: "Maulana Azad Minorities Financial Development Corporation Ltd., Mumbai\n",
        //       style: "subheader",
        //       alignment: "center",
        //     },
        //     {
        //       text: "MINORITIES DEVELOPMENT DEPARTMENT, MANTRALAYA, MUMBAI \n GOVT.OF MAHARASHTRA",
        //       style: "subsubheader",
        //       alignment: "center",
        //     },
        //     // {
        //     //   text: "GOVT. OF MAHARASHTRA",
        //     //   style: "subsubsubheader",
        //     //   alignment: "center",
        //     // },
        //   ],
        // },
        // {
        //   canvas: [
        //     {
        //       type: "line",
        //       x1: 0,
        //       y1: 0,
        //       x2: 590 - 2 * 30,
        //       y2: 0,
        //       lineWidth: 1,
        //     },
        //   ],
        // },
        // {
        //   text: "मुख्यालय 2रा मजला, डी, डी. बिल्डिंग, जुने जकात घर,शहीद भगतसिंग मार्ग, मुंबई - 400023, दूरध्वनी क्र.022-22672293,फॅक्स क्र. 22672294,email Id contact@mamfdc.org ",
        //   fontSize: 7,
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
              lineWidth: 1,
            },
          ],
        },
        {
          columns: [
            {
              text: `जा.क्र. मौआआआदिमं/प्रकल्प/${year}/`,
              margin: [0, 0, 0, 0],
            },
            {
              text: `दिनांक :- ${date ? formatDateToDDMMYYYY(date) : ""}`,
              margin: [100, 0, 0, 0],
            },
          ],
        },
        {
          text: `प्रति.
                ${applications.personalDetails.name}
            `,
          margin: [0, 0, 0, 0],
          fontSize: 10,
        },
        {
          text: `विषय :- मुदत कर्ज प्रस्तावातील (भाग-१) त्रुटीची पूर्तता करणेबाबत.........`,
          margin: [100, 0, 0, 0],
        },
        {
          text: `अर्ज क्रमांक :-  ${applications.personalDetails.form_no}`,
          margin: [150, 0, 0, 0],
        },
        {
          text: `आपल्या कर्ज प्रस्तावामधील खालील दर्शविल्याप्रमाणे त्रुटी निर्देशनास आल्या आहेत.`,
          margin: [0, 0, 0, 0],
        },
        errorArray.map((text, i) => ({
          text: `${i + 1}. ${text.text}`,
          margin: [10, 0, 0, 0], // Adjust margins for each text block
          fontSize: 11, // Adjust font size as needed
          bold: true,
        })),
        {
          // text: `हे पत्र मिळाल्यानंतर सात दिवसाच्या आत ऑनलाइन पोर्टलवर अर्जातील त्रुटीची पुर्तता करणे बंधणकारक आहे.`,
          text: `हे पत्र प्राप्त झाल्यानंतर सात दिवसांच्या आत संबंधित त्रुटींची पूर्तता ऑनलाइन पोर्टलवर लॉगिन करून करणे बंधनकारक आहे.`,
          margin: [60, 0, 0, 0],
        },
        {
          text: `त्रुटी विहीत कालावधीत पुर्ण केल्याशिवाय आपल्या कर्ज प्रकरणावर कोणतीही कार्यवाही केली जाणार नाही. देण्यात आलेले पुरावे खोटे ठरल्यास महामंडळाची दिशाभूल केल्याबद्यल आपला अर्ज तात्काळ रद्य करण्यात येईल व आपल्याविरूध्द उचित कायदेशीर कारवाईस आपण पात्र ठराल.`,
          margin: [0, 0, 0, 0],
        },
        {
          text: `व्यवस्थापकीय संचालक`,
          margin: [400, 30, 0, 0],
        },
      ],
    };

    pdfMake.createPdf(docDefinition).download("completing_necessary.pdf");
  }
</script>

<button on:click={generatePdf} class="bg-blue-500 text-white px-4 py-2 rounded">
  Download
</button>
