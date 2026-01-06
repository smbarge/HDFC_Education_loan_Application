<script>
  import { onMount } from "svelte";
  import { sakalBharatiFontBase64 } from "$lib/sakalBharati";
  import { base } from "$app/paths";

  export let applications;
  export let masters;
  export let allAnswers;
  let pdfMake;
  let answers;
  onMount(async () => {
    answers = allAnswers.filter((e) => e.checkpoint_id == 23);

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
  const remarksArray = [
    {
      questionId: 164,
      text: "जि. व्यवस्थापक/प्र.जिल्हा व्यवस्थापक यांनी छाननी अहवाल अपुर्ण भरलेला आहे / छाननी अहवाल जोडलेला नाही.",
    },
    {
      questionId: 165,
      text: "वैधानिक दस्तावेज (भाग-२) अपूर्ण भरलेला आहे. रजी. नोटरी केलेले नाही.",
    },
    {
      questionId: 166,
      text: "वैधानिक दस्तावेजात अर्जदार/सहअर्जदार/जामिनदार सहीमध्ये तफावत आहे.",
    },
    {
      questionId: 167,
      text: "वैधानिक दस्तावेजात अर्जावर जि. व्यवस्थापक/प्र. जिल्हा व्यवस्थापक यांनी सही व शिक्का मारलेला नाही.",
    },
    {
      questionId: 168,
      text: "वैधानिक दस्तावेजात जि. व्यवस्थापक/प्र.जिल्हा व्यवस्थापक यांचे नाव नमुद नाही. सहअर्जदाराचे प्रतिज्ञापत्र नाही / प्रतिज्ञापत्र अपूर्ण भरलेला आहे / चुकीचा भरलेला आहे.",
    },
    {
      questionId: 169,
      text: "जामिनदाराचे प्रतिज्ञापत्र १०० रु. च्या बॉन्डपेपवर (रजिस्टर नोटरीसहीत नाही / प्रतिज्ञापत्र अपूर्ण भरलेला आहे / चुकीचा भरलेला आहे.",
    },
    {
      questionId: 170,
      text: "Surety Bond / Deed of Equitable Mortagage Form अपुर्ण भरलेला आहे / चुकीचा भरलेला आहे.",
    },
    {
      questionId: 171,
      text: "Promissory Note Form अपूर्ण भरलेला आहे / चुकीचा भरलेला आहे.",
    },
    {
      questionId: 172,
      text: "अर्जदाराच्या धनादेशाची छांयाकित प्रत जोडलेली नाही.",
    },
    {
      questionId: 10,
      text: "कर्ज मंजूरीपत्र अर्जदार/ सहअर्जदार/जि. व्यवस्थापक यांची स्वाक्षरी केलेली नाही.",
    },
    {
      questionId: 11,
      text: "जामिनदार मालमत्ताधारक असल्यास ७/१२ उतारा जोडलेला नाही. /७/१२ ची नोंद नाही.",
    },
    {
      questionId: 12,
      text: "जामिनदार मालमत्ताधारक असल्यास ७/१२ उतारा चढविल्याची मुळ प्रत तसेच online पडताळणी करुन त्याची छांयाकित प्रत",
    },
    {
      questionId: 13,
      text: "जि. व्यवस्थापक यांनी प्रमाणित करुन जोडलेली नाही.",
    },
    { questionId: 14, text: "नॅच अहवाल जोडलेले नाही." },
    { questionId: 15, text: "वसुली अधिकारी यांचे स्थळपाहणी अहवाल नाही." },
    { questionId: 16, text: "परतफेड तक्ता अहवाल नाही" },
  ];

  async function generatePdf() {
    if (!pdfMake) {
      alert("PDF generator is not ready yet.");
      return;
    }
    const imageUrl = `${base}/MAMFDC_LetterHead_2.jpg`; // Path from static/
    const base64Image = await getBase64FromUrl(imageUrl);

    const d = new Date();
    let year = d.getFullYear();

    let headerText =
      "Maulana Azad Minorities Financial Development Corporation Ltd., Mumbai";
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
        //     },
        //     {
        //       text: `${headerText.toUpperCase()}\n`,
        //       style: "subheader",
        //       alignment: "center",
        //       decoration: "underline",
        //     },

        //     {
        //       text: "MINORITIES DEVELOPMENT DEPARTMENT, MANTRALAYA, MUMBAI \n GOVT.OF MAHARASHTRA",
        //       style: "subsubheader",
        //       alignment: "center",
        //     },
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
              text: `जा.क्र. मौआआआविमं/प्रशासन/२०२3/`,
              margin: [0, 0, 0, 0],
            },
            {
              text: `दिनांक :-`,
              margin: [100, 0, 0, 0],
            },
          ],
        },
        {
          text: `प्रति.
                _________________
                _________________ 
            `,
          margin: [0, 0, 0, 0],
          fontSize: 10,
        },
        {
          text: `विषय :- मुदत कर्ज प्रस्तावातील (भाग-२) त्रुटीची पूर्तता करणेबाबत.........`,
          margin: [100, 0, 0, 0],
        },
        {
          text: `अर्ज क्रमांक :-${applications.personalDetails.form_no}`,
          margin: [150, 0, 0, 0],
        },
        {
          text: `आपल्या कर्ज प्रस्तावामधील खालील दर्शविल्याप्रमाणे त्रुटी निर्देशनास आल्या आहेत.`,
          margin: [0, 0, 0, 0],
        },
        {
          text: "जि. व्यवस्थापक/प्र.जिल्हा व्यवस्थापक यांनी छाननी अहवाल अपुर्ण भरलेला आहे / छाननी अहवाल जोडलेला नाही.",
          margin: [10, 0, 0, 0],
        },
        {
          text: `वैधानिक दस्तावेज (भाग-२) अपूर्ण भरलेला आहे. रजी. नोटरी केलेले नाही.`,
          margin: [10, 0, 0, 0],
        },
        {
          text: `वैधानिक दस्तावेजात अर्जदार/सहअर्जदार/जामिनदार सहीमध्ये तफावत आहे.`,
          margin: [10, 0, 0, 0],
        },
        {
          text: `वैधानिक दस्तावेजात अर्जावर जि. व्यवस्थापक/प्र. जिल्हा व्यवस्थापक यांनी सही व शिक्का मारलेला नाही.`,
          margin: [10, 0, 0, 0],
        },
        {
          text: `वैधानिक दस्तावेजात जि. व्यवस्थापक/प्र.जिल्हा व्यवस्थापक यांचे नाव नमुद नाही. सहअर्जदाराचे प्रतिज्ञापत्र नाही / प्रतिज्ञापत्र अपूर्ण भरलेला आहे / चुकीचा भरलेला आहे.`,
          margin: [10, 0, 0, 0],
        },
        {
          text: `जामिनदाराचे प्रतिज्ञापत्र १०० रु. च्या बॉन्डपेपवर (रजिस्टर नोटरीसहीत नाही / प्रतिज्ञापत्र अपूर्ण भरलेला आहे / चुकीचा भरलेला आहे.`,
          margin: [10, 0, 0, 0],
        },
        {
          text: `Surety Bond / Deed of Equitable Mortagage Form अपुर्ण भरलेला आहे / चुकीचा भरलेला आहे.`,
          margin: [10, 0, 0, 0],
        },
        {
          text: `Promissory Note Form अपूर्ण भरलेला आहे / चुकीचा भरलेला आहे.`,
          margin: [10, 0, 0, 0],
        },
        {
          text: `अर्जदाराच्या धनादेशाची छांयाकित प्रत जोडलेली नाही.`,
          margin: [10, 0, 0, 0],
        },
        {
          text: `कर्ज मंजूरीपत्र अर्जदार/ सहअर्जदार/जि. व्यवस्थापक यांची स्वाक्षरी केलेली नाही.`,
          margin: [10, 0, 0, 0],
        },
        {
          text: `जामिनदार मालमत्ताधारक असल्यास ७/१२ उतारा जोडलेला नाही. /७/१२ ची नोंद नाही.`,
          margin: [10, 0, 0, 0],
        },
        {
          text: `जामिनदार मालमत्ताधारक असल्यास ७/१२ उतारा चढविल्याची मुळ प्रत तसेच online पडताळणी करुन त्याची छांयाकित प्रत`,
          margin: [10, 0, 0, 0],
        },
        {
          text: `जि. व्यवस्थापक यांनी प्रमाणित करुन जोडलेली नाही.`,
          margin: [10, 0, 0, 0],
        },
        {
          text: `नॅच अहवाल जोडलेले नाही.`,
          margin: [10, 0, 0, 0],
        },
        {
          text: `वसुली अधिकारी यांचे स्थळपाहणी अहवाल नाही.`,
          margin: [10, 0, 0, 0],
        },
        {
          text: `परतफेड तक्ता अहवाल नाही`,
          margin: [10, 0, 0, 0],
        },
        {
          text: `हे पत्र मिळाल्यानंतर सात दिवसाच्या आत संबधित जि.व्यवस्थापकांकडे संपर्क साधुन त्यांच्या कार्यालयात त्रुटी पुर्तता करणे `,
          margin: [60, 10, 0, 0],
        },
        {
          text: `बंधणकारक आहे. त्रुटी विहीत कालावधीत पुर्ण केल्याशिवाय आपल्या कर्ज प्रकरणावर कोणतीही कार्यवाही केली जाणार नाही. देण्यात आलेले पुरावे खाटे ठरल्यास महामंडळाची दिशाभूल केल्याबद्यल आपला अर्ज तात्काळ रद्य करण्यात येईल व आपल्याविरूध्द उचित कायदेशीर कारवाईस आपण पात्र ठराल.`,
          margin: [0, 0, 0, 0],
        },
        // {
        //   text: `व्यवस्थापकीय संचालक`,
        //   margin: [400, 30, 0, 0],
        // },
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
