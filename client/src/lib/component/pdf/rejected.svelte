<script>
  import { onMount } from "svelte";
  import { sakalBharatiFontBase64 } from "$lib/sakalBharati";
  import { api } from "$api/api";
  import { base } from "$app/paths";
  import {DateTime} from 'luxon'
  let pdfMake;
  export let applications;
  export let masters;
  export let verification;
  let rejectReasons;
  let reasons = [];
  let rejectRecord = 0;
  onMount(async () => {
    console.log("applications", verification);
    rejectRecord = verification
      .filter((item) => item.status == 41)
      .reduce((max, current) => (current.id > max.id ? current : max));

    console.log("rejectRecord", rejectRecord);

    {
      let {
        error,
        errorMsg,
        rejectReasons: lRejectReasons,
      } = await api.getRejectReasonsByApplicationId({
        applicationId: applications.personalDetails.id,
      });
      rejectReasons = lRejectReasons;
      console.log("rejectReasons", rejectReasons);
      rejectReasons.forEach((e) => {
        console.log(
          "master",
          masters.m_rejectReasons.find((r) => r.reason_code == e)
        );
        let reason = masters.m_rejectReasons.find(
          (r) => r.reason_code == e.reason_code
        )?.reason_text_marathi;
        reasons = [...reasons, reason];
      });
      console.log("rejectedReasons", reasons);
    }

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
    let district = masters.m_district.find(
      (d) => d.dist_id == applications.personalDetails.current_district
    )?.eng_name;
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
        //   text: "",
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
          columns: [
            {
              text: `जा.क्र. मौआआआदिमं/प्रकल्प/${year}/`,
              margin: [0, 0, 0, 0],
            },
            {
              text: `दिनांक :- ${DateTime.fromISO(rejectRecord.updated_at).setZone("Asia/Kolkata").toFormat("dd/MM/yyyy")}`,
              margin: [100, 0, 0, 0],
            },
          ],
        },
        //  { text: 'दि.: ___/__/2025', alignment: 'right' ,margin:[0,0,40,0]},
        { text: "\nREJECTED", style: "reject", alignment: "center" },
        { text: "\nप्रति,", bold: true },
        { text: applications.personalDetails.name },
        { text: applications.personalDetails.current_address },
        { text: `${district} ${applications.personalDetails.current_pincode}` },
        {
          text: `\nविषय:- मुदत कर्ज योजनेच्या अर्ज क्र. ${applications.personalDetails.form_no}`,
        },
        { text: "नामंजुर करणेबाबत", alignment: "right", margin: [0, 0, 40, 0] },

        {
          text: "\nखालील खून दर्शविलेल्या कारणास्तव आपले मुदत कर्ज प्रकरण नामंजूर करण्यात येत आहे.",
          bold: true,
        },
        // {
        //   text: "1. अर्जदाराचे कौटुंबिक उत्पन्न मुदत कर्ज योजनेकरिता विहीत केलेल्या उत्पन्न मर्यादपेक्षा जास्त आहे.",
        //   margin: [0, 5],
        // },
        // { text: "2. अर्जदाराचे वय ६० वर्ष पेक्षा जास्त आहे.", margin: [0, 5] },
        // { text: "3. अर्जदार अल्पसंख्याक समाजातील नाही.", margin: [0, 5] },
        // {
        //   text: "4. या कर्ज प्रकरणात तुटी असल्याबाबत अर्जदाराला कळविल्यानंतर ही अर्जदाराने तुटीची पूर्तता केली नाही.",
        //   margin: [0, 5],
        // },
        // {
        //   text: "5. जिल्हा व्यवस्थापक यानी हे प्रकरण रद्द करण्याची शिफारस केलेली आहे.",
        //   margin: [0, 5],
        // },
        // {
        //   text: "6. अर्जदार/जामिनदाराने हे प्रकरण रद्द करण्याची विनंती केली आहे.",
        //   margin: [0, 5],
        // },
        reasons.map((text, i) => ({
          text: `${i + 1}. ${text}`,
          margin: [10, 0, 0, 0], // Adjust margins for each text block
          fontSize: 11, // Adjust font size as needed
          bold: true,
        })),
        // {
        //   text: `1. ${rejectedReasons}`,
        //   margin: [0, 5],
        // },

        {
          text: "\n\nव्यवस्थापकीय संचालक",
          alignment: "right",
          bold: true,
          margin: [0, 0, 40, 0],
        },
        {
          text: "प्रत- जिल्हा व्यवस्थापक, मौलाना आजाद अल्पसंख्याक आर्थिक विकास महामंडळ मर्यादित,",
          margin: [0, 5],
        },
        {
          text: `${district} याना माहितीस्तव व आवश्यक त्या कार्यवाहीसाठी`,
          margin: [0, 5],
        },
      ],
      styles: {
        fontawesome: {
          font: "FontAwesome",
          color: "#656565",
        },
      },
    };

    pdfMake.createPdf(docDefinition).download("reject_Letter.pdf");
  }
</script>

<button
  on:click={generatePdf}
  class="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600 transition"
>
  Download
</button>
<!-- <button on:click={generatePdf} class="bg-blue-500 text-white px-4 py-2 rounded">
  Download
</button>`` -->
