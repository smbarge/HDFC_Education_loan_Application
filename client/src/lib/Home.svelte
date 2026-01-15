<script>
  import { goto } from "$app/navigation";
  import Fa from "svelte-fa";
  import { faPhone } from "@fortawesome/free-solid-svg-icons";
  import { onMount } from "svelte";

  let userCount = 0;
  let disbursedAmount = 0;
  let approvalRate = 0;
  let customerSatisfaction = 0;

  let cardData = [
    {
      title: "Loan Eligibility",
      value: "• Belongs to a Minority Community.\n• Resident of the State of Maharashtra.",
      src: "/termloan/bank.png",
    },
    {
      title: "Loan Limit",
      value: "up to ₹5,00,000",
      src: "/termloan/totalloan.png",
    },
    {
      title: "Interest @",
      value: "3% per annum",
      src: "/termloan/interest-rate.png",
    },
    {
      title: "Repayment Period",
      value: "• Repayment starts 6 months after completion of education\n• Maximum repayment period: 5 years",
      src: "/termloan/bank.png",
    },
    {
      title: "Insurance",
      value: "1.5% of total loan amount will be deducted at the time of disbursement from sanction loan amount",
      src: "/termloan/insurance.png",
    },
    {
      title: "Income Limit",
      value: "Parent/Guardian annual income Up to ₹8,00,000",
      src: "/termloan/minimum-wage.png",
    },
  ];

  let targetValues = {
    userCount: 890,
    disbursedAmount: 50,
    approvalRate: 85,
    customerSatisfaction: 95,
  };

  function animateCount(target, setCount) {
    let count = 0;
    let increment = Math.ceil(target / 100);
    let interval = setInterval(() => {
      if (count < target) {
        count += increment;
        setCount(Math.min(count, target));
      } else {
        clearInterval(interval);
      }
    }, 30);
  }

  function openPDF(pdfUrl) {
    window.open(pdfUrl, "_blank");
  }

  onMount(() => {
    animateCount(targetValues.userCount, (value) => (userCount = value));
    animateCount(targetValues.disbursedAmount, (value) => (disbursedAmount = value));
    animateCount(targetValues.approvalRate, (value) => (approvalRate = value));
    animateCount(targetValues.customerSatisfaction, (value) => (customerSatisfaction = value));
  });
</script>

<div class="min-h-screen">
  <!-- Hero Section -->
  <section
    class="text-white md:py-10 py-5 h-[300px] md:h-auto"
    style="background: linear-gradient(0deg, #8e24aa, #ce93d8); clip-path: ellipse(85% 65% at 50% 30%);"
  >
    <div class="container mx-auto px-5 space-y-5">
      <div class="text-center">
        <h1 class="xl:text-4xl text-2xl font-bold capitalize font-roboto mb-1">
          Get Your Term Education Today!
        </h1>
        <p class="xl:text-xl text-lg font-bold capitalize font-marathi2">
          आपले मुदत कर्ज आजच मिळवा!
        </p>
      </div>

      <div class="text-center mb-8">
        <p class="xl:text-lg text-base capitalize font-robotoMono mb-1">
          Low interest rates, easy application, quick approval
        </p>
        <p class="text-base capitalize font-robotoMono">
          कमी व्याज दर, सोपी अर्ज प्रक्रिया, जलद मंजुरी
        </p>
      </div>

      <div class="flex justify-center items-center gap-5">
        <button
          on:click={() => goto("/termloan/LogInForm")}
          class="rounded-md bg-white before:ease z-10 relative h-10 md:w-48 w-[140px] overflow-hidden border border-purple-500 text-blue-600 font-semibold shadow-2xl transition-all before:absolute before:top-1/2 before:h-0 before:w-64 before:origin-center before:-translate-x-20 before:rotate-45 before:bg-blue-500 before:duration-300 hover:text-white hover:shadow-blue-500 hover:before:h-64 hover:before:-translate-y-32"
        >
          <span class="relative capitalize md:text-base text-sm">Log In / लॉग इन</span>
        </button>

        <button
          on:click={() => goto("/termloan/registrationForm")}
          class="rounded-md bg-white before:ease z-10 relative h-10 md:w-48 w-[155px] overflow-hidden border border-purple-500 text-blue-600 font-semibold shadow-2xl transition-all before:absolute before:top-1/2 before:h-0 before:w-64 before:origin-center before:-translate-x-20 before:rotate-45 before:bg-blue-500 before:duration-300 hover:text-white hover:shadow-blue-500 hover:before:h-64 hover:before:-translate-y-32"
        >
          <span class="relative capitalize md:text-base text-sm">register / नोंदणी करा</span>
        </button>
      </div>

      <div class="flex items-center justify-center">
        <div class="p-6 rounded-lg shadow-lg text-center border border-purple-600">
          <div class="flex items-center justify-center">
            <span class="mr-2 text-lg font-semibold">Help Desk</span>
            <Fa icon={faPhone} />
            <span class="ml-2">9028947883</span>
          </div>
          <div class="mt-2">M - F 11 am to 5 pm</div>
        </div>
      </div>
    </div>
  </section>

  <!-- About Section -->
  <section class="bg-pink-100 relative py-16">
    <svg
      class="absolute top-0 left-0 h-[200px] md:h-[300px] lg:h-auto w-full"
      style="transform:rotate(180deg); transition: 0.3s"
      viewBox="0 0 1440 350"
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <linearGradient id="sw-gradient-0" x1="0" x2="0" y1="1" y2="0">
          <stop stop-color="rgba(252, 231, 243, 1)" offset="0%" />
          <stop stop-color="rgba(251, 207, 232, 1)" offset="100%" />
        </linearGradient>
      </defs>
      <path
        style="transform:translate(0, 0px); opacity:1"
        fill="url(#sw-gradient-0)"
        d="M0,98L40,130.7C80,163,160,229,240,245C320,261,400,229,480,212.3C560,196,640,196,720,220.5C800,245,880,294,960,285.8C1040,278,1120,212,1200,196C1280,180,1360,212,1440,204.2C1520,196,1600,147,1680,130.7C1760,114,1840,131,1920,179.7C2000,229,2080,310,2160,318.5C2240,327,2320,261,2400,220.5C2480,180,2560,163,2640,196C2720,229,2800,310,2880,285.8C2960,261,3040,131,3120,98C3200,65,3280,131,3360,179.7C3440,229,3520,261,3600,269.5C3680,278,3760,261,3840,269.5C3920,278,4000,310,4080,285.8C4160,261,4240,180,4320,122.5C4400,65,4480,33,4560,57.2C4640,82,4720,163,4800,187.8C4880,212,4960,180,5040,163.3C5120,147,5200,147,5280,122.5C5360,98,5440,49,5520,49C5600,49,5680,98,5720,122.5L5760,147L5760,490L5720,490C5680,490,5600,490,5520,490C5440,490,5360,490,5280,490C5200,490,5120,490,5040,490C4960,490,4880,490,4800,490C4720,490,4640,490,4560,490C4480,490,4400,490,4320,490C4240,490,4160,490,4080,490C4000,490,3920,490,3840,490C3760,490,3680,490,3600,490C3520,490,3440,490,3360,490C3280,490,3200,490,3120,490C3040,490,2960,490,2880,490C2800,490,2720,490,2640,490C2560,490,2480,490,2400,490C2320,490,2240,490,2160,490C2080,490,2000,490,1920,490C1840,490,1760,490,1680,490C1600,490,1520,490,1440,490C1360,490,1280,490,1200,490C1120,490,1040,490,960,490C880,490,800,490,720,490C640,490,560,490,480,490C400,490,320,490,240,490C160,490,80,490,40,490L0,490Z"
      />
    </svg>

    <div class="relative z-10 container mx-auto px-5">
      <div class="grid lg:grid-cols-2 grid-cols-1 gap-10 items-center">
        <div class="lg:order-1 order-2">
          <div class="mb-5 border-b-2 border-purple-500 pb-2">
            <h1 class="lg:text-4xl text-2xl text-purple-800 font-marathi1 font-semibold">
              मुदत कर्ज योजना
            </h1>
          </div>
          <p class="lg:text-lg text-base text-purple-700 font-marathi2 mb-5">
            <strong>'मौलाना आझाद अल्पसंख्यांक मुदत कर्ज योजने'</strong> चा उद्देश
            महाराष्ट्रातील अल्पसंख्यांक समुदायातील व्यक्तींना (जसे की मुस्लिम, शीख,
            ख्रिश्चन, पारशी, बौद्ध, जैन, आणि ज्यू) कर्ज स्वरूपात आर्थिक मदत प्रदान
            करणे आहे. हे कर्ज त्यांना लहान व्यवसाय सुरू करण्यास किंवा विस्तारित करण्यास
            मदत करण्यासाठी, आत्मनिर्भरतेला प्रोत्साहन देण्यासाठी आणि त्यांच्या आर्थिक
            परिस्थितीमध्ये सुधारणा करण्यासाठी आहे.
          </p>

          <div class="space-y-3">
            <div class="flex items-start gap-3">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 -960 960 960" class="size-6 fill-green-500 flex-shrink-0 mt-1">
                <path d="m424-296 282-282-56-56-226 226-114-114-56 56 170 170Zm56 216q-83 0-156-31.5T197-197q-54-54-85.5-127T80-480q0-83 31.5-156T197-763q54-54 127-85.5T480-880q83 0 156 31.5T763-763q54 54 85.5 127T880-480q0 83-31.5 156T763-197q-54 54-127 85.5T480-80Z" />
              </svg>
              <div>
                <h2 class="xl:text-lg text-base font-roboto font-semibold">लवचिक परतफेड अटी :</h2>
                <p class="xl:text-base text-sm text-gray-700">तुमच्या आर्थिक परिस्थितीशी जुळणारे वेळापत्रक निवडा.</p>
              </div>
            </div>

            <div class="flex items-start gap-3">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 -960 960 960" class="size-6 fill-green-500 flex-shrink-0 mt-1">
                <path d="m424-296 282-282-56-56-226 226-114-114-56 56 170 170Zm56 216q-83 0-156-31.5T197-197q-54-54-85.5-127T80-480q0-83 31.5-156T197-763q54-54 127-85.5T480-880q83 0 156 31.5T763-763q54 54 85.5 127T880-480q0 83-31.5 156T763-197q-54 54-127 85.5T480-80Z" />
              </svg>
              <div>
                <h2 class="xl:text-lg text-base font-roboto font-semibold">स्थिर किंवा परिवर्तनीय व्याजदर :</h2>
                <p class="xl:text-base text-sm text-gray-700">भुगतानामध्ये निश्चितता प्रदान करते.</p>
              </div>
            </div>

            <div class="flex items-start gap-3">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 -960 960 960" class="size-6 fill-green-500 flex-shrink-0 mt-1">
                <path d="m424-296 282-282-56-56-226 226-114-114-56 56 170 170Zm56 216q-83 0-156-31.5T197-197q-54-54-85.5-127T80-480q0-83 31.5-156T197-763q54-54 127-85.5T480-880q83 0 156 31.5T763-763q54 54 85.5 127T880-480q0 83-31.5 156T763-197q-54 54-127 85.5T480-80Z" />
              </svg>
              <div>
                <h2 class="xl:text-lg text-base font-roboto font-semibold">जलद मंजुरी प्रक्रिया :</h2>
                <p class="xl:text-base text-sm text-gray-700">आपला व्यवसाय वाढवण्यासाठी किंवा गरजा पूर्ण करण्यासाठी जलद निधी मिळवा.</p>
              </div>
            </div>
          </div>
        </div>

        <div class="lg:order-2 order-1 flex justify-center lg:justify-end">
          <img src="/termloan/landing/landing5New.png" alt="Term Loan Illustration" class="xl:h-[580px] md:h-[500px] h-[250px] animate-up-down" />
        </div>
      </div>
    </div>
  </section>

  <!-- Statistics Section -->
  <section class="py-16">
    <div class="container mx-auto px-5">
      <div class="bg-gray-100 rounded-lg shadow-lg xl:px-10 xl:py-8 px-5 py-5">
        <div class="grid md:grid-cols-4 grid-cols-2 gap-5">
          <div class="flex items-center gap-4 md:border-r-2 md:pr-5">
            <div class="bg-rose-100 rounded-full p-4 flex-shrink-0">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 -960 960 960" class="xl:size-8 size-6 fill-rose-500">
                <path d="M480-480q-66 0-113-47t-47-113q0-66 47-113t113-47q66 0 113 47t47 113q0 66-47 113t-113 47ZM160-160v-112q0-34 17.5-62.5T224-378q62-31 126-46.5T480-440q66 0 130 15.5T736-378q29 15 46.5 43.5T800-272v112H160Z" />
              </svg>
            </div>
            <div>
              <h3 class="font-bold text-gray-700 xl:text-2xl text-xl">{userCount}+</h3>
              <p class="text-gray-600 xl:text-lg text-sm">Users</p>
            </div>
          </div>

          <div class="flex items-center gap-4 md:border-r-2 md:pr-5">
            <div class="bg-rose-100 rounded-full p-4 flex-shrink-0">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 -960 960 960" class="xl:size-8 size-6 fill-rose-500">
                <path d="M200-120q-33 0-56.5-23.5T120-200v-560q0-33 23.5-56.5T200-840h560q8 0 15 1.5t14 4.5l-74 74H200v560h560v-266l80-80v346q0 33-23.5 56.5T760-120H200Zm261-160L235-506l56-56 170 170 367-367 57 55-424 424Z" />
              </svg>
            </div>
            <div>
              <h3 class="font-bold text-gray-700 xl:text-2xl text-xl">₹{disbursedAmount}M+</h3>
              <p class="text-gray-600 xl:text-lg text-sm">Disbursed</p>
            </div>
          </div>

          <div class="flex items-center gap-4 md:border-r-2 md:pr-5">
            <div class="bg-rose-100 rounded-full p-4 flex-shrink-0">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 -960 960 960" class="xl:size-8 size-6 fill-rose-500">
                <path d="m136-240-56-56 296-298 160 160 208-206H640v-80h240v240h-80v-104L536-320 376-480 136-240Z" />
              </svg>
            </div>
            <div>
              <h3 class="font-bold text-gray-700 xl:text-2xl text-xl">{approvalRate}%</h3>
              <p class="text-gray-600 xl:text-lg text-sm">Approval Rate</p>
            </div>
          </div>

          <div class="flex items-center gap-4">
            <div class="bg-rose-100 rounded-full p-4 flex-shrink-0">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 -960 960 960" class="xl:size-8 size-6 fill-rose-500">
                <path d="M620-520q25 0 42.5-17.5T680-580q0-25-17.5-42.5T620-640q-25 0-42.5 17.5T560-580q0 25 17.5 42.5T620-520Zm-280 0q25 0 42.5-17.5T400-580q0-25-17.5-42.5T340-640q-25 0-42.5 17.5T280-580q0 25 17.5 42.5T340-520Zm140 260q68 0 123.5-38.5T684-400h-66q-22 37-58.5 58.5T480-320q-43 0-79.5-21.5T342-400h-66q25 63 80.5 101.5T480-260Zm0 180q-83 0-156-31.5T197-197q-54-54-85.5-127T80-480q0-83 31.5-156T197-763q54-54 127-85.5T480-880q83 0 156 31.5T763-763q54 54 85.5 127T880-480q0 83-31.5 156T763-197q-54 54-127 85.5T480-80Z" />
              </svg>
            </div>
            <div>
              <h3 class="font-bold text-gray-700 xl:text-2xl text-xl">{customerSatisfaction}%</h3>
              <p class="text-gray-600 xl:text-lg text-sm">Customer Satisfaction</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>

  <!-- Features Section -->
  <section class="py-16 bg-gray-50">
    <div class="container mx-auto px-5">
      <div class="grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-8">
        {#each cardData as card}
          <div class="group relative rounded-lg shadow-lg bg-Calypso-100 hover:border-4 hover:border-morpankhi p-6 pt-14 transition-all duration-500 ease-in-out transform hover:-translate-y-2">
            <div class="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2 border-4 border-morpankhi group-hover:border-Calypso-300 p-4 rounded-full bg-Calypso-200 group-hover:bg-Calypso-50 transition-all duration-300">
              <img src={card.src} alt={card.title} class="xl:size-10 size-8" />
            </div>
            <h3 class="uppercase text-center xl:text-lg text-base font-josefin font-semibold text-[#001f2e] group-hover:text-[#33393D] mb-3">
              {card.title}
            </h3>
            <p class="text-center text-[#001f2e] xl:text-base text-sm font-marvel group-hover:text-[#33393D] whitespace-pre-line">
              {card.value}
            </p>
          </div>
        {/each}
      </div>
    </div>
  </section>

  <!-- Documents Section -->

  <!-- Documents Section -->
<section class="py-16">
  <div class="container mx-auto px-5">
    <h2 class="text-center xl:text-4xl lg:text-3xl text-2xl font-bold font-marathi1 text-gray-800 mb-12">
      आवश्यक कागदपत्रे
    </h2>

    <div class="grid lg:grid-cols-2 grid-cols-1 gap-6 mb-6">
      <!-- Applicant Documents -->
      <div class="border-b-4 border-morpankhi shadow-lg ring-1 rounded-md p-6 bg-white">
        <h3 class="text-center xl:text-2xl lg:text-xl text-lg font-bold font-marathi1 text-gray-700 mb-5">
          अर्जदारासाठी आवश्यक कागदपत्रे
        </h3>
        <div class="xl:text-lg lg:text-base text-sm font-marathi2 text-gray-600 space-y-2">
          <div class="flex items-start gap-3">
            <span class="text-purple-600 font-bold">➤</span>
            <p>रंगीत पासपोर्ट आकाराचे फोटो</p>
          </div>
          <div class="flex items-start gap-3">
            <span class="text-purple-600 font-bold">➤</span>
            <p>आधार कार्ड</p>
          </div>
          <div class="flex items-start gap-3">
            <span class="text-purple-600 font-bold">➤</span>
            <p>शाळा सोडल्याचा दाखला (School Leaving Certificate)</p>
          </div>
          <div class="flex items-start gap-3">
            <span class="text-purple-600 font-bold">➤</span>
            <p>मागील शैक्षणिक वर्षाचा बोनाफाईड दाखला (मूळ)</p>
          </div>
          <div class="flex items-start gap-3">
            <span class="text-purple-600 font-bold">➤</span>
            <p>अभ्यासक्रमाची फी रचना / फी स्ट्रक्चर (वर्षनिहाय – मूळ)</p>
          </div>
          <div class="flex items-start gap-3">
            <span class="text-purple-600 font-bold">➤</span>
            <p>फी मागणी पत्र (Fee Demand Letter – मूळ)</p>
          </div>
          <div class="flex items-start gap-3">
            <span class="text-purple-600 font-bold">➤</span>
            <p>बँक पासबुकची छायांकित प्रत</p>
          </div>
          <div class="flex items-start gap-3">
            <span class="text-purple-600 font-bold">➤</span>
            <p>प्रवेश पत्र / अ‍ॅडमिशन लेटर (असल्यास)</p>
          </div>
          <div class="ml-5 mt-3">
            <div class="flex items-start gap-3 mb-2">
              <span class="text-purple-600 font-bold">➤</span>
              <p class="font-semibold">
                परदेशातील शिक्षणाकरिता विद्यार्थ्यांची आवश्यक कागदपत्रे (वरील कागदपत्रांव्यतिरिक्त)
              </p>
            </div>
            <ul class="list-decimal ml-12 space-y-1 text-sm">
              <li>संपूर्ण पासपोर्टची छायांकित प्रत</li>
              <li>व्हिसाची (Visa) छायांकित प्रत</li>
            </ul>
          </div>
          <div class="flex items-center gap-2 pt-2">
            <span class="text-purple-600 font-bold">➤</span>
            <p>Affidavit - प्रतिज्ञापत्र</p>
            <button on:click={() => openPDF("/termloan/applicant_affidavit.pdf")} class="ml-auto">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 -960 960 960" class="size-6 fill-blue-600 hover:fill-rose-500 transition-colors">
                <path d="M480-320 280-520l56-58 104 104v-326h80v326l104-104 56 58-200 200ZM240-160q-33 0-56.5-23.5T160-240v-120h80v120h480v-120h80v120q0 33-23.5 56.5T720-160H240Z" />
              </svg>
            </button>
          </div>
        </div>
      </div>

      <!-- Co-Applicant Documents -->
      <div class="border-b-4 border-morpankhi shadow-lg ring-1 rounded-md p-6 bg-white">
        <h3 class="text-center xl:text-2xl lg:text-xl text-lg font-bold font-marathi1 text-gray-700 mb-5">
          सहअर्जदारासाठी आवश्यक कागदपत्रे
        </h3>
        <p class="text-center xl:text-lg text-base font-marathi2 text-gray-500 mb-4">(पालक / पालकत्वधारक)</p>
        <div class="xl:text-lg lg:text-base text-sm font-marathi2 text-gray-600 space-y-2">
          <div class="flex items-start gap-3">
            <span class="text-purple-600 font-bold">➤</span>
            <p>आधार कार्ड</p>
          </div>
          <div class="flex items-start gap-3">
            <span class="text-purple-600 font-bold">➤</span>
            <p>उत्पन्न प्रमाणपत्र (तहसीलदार यांचे – मूळ)</p>
          </div>
          <div class="flex items-start gap-3">
            <span class="text-purple-600 font-bold">➤</span>
            <p>रेशन कार्ड</p>
          </div>
          <div class="flex items-start gap-3">
            <span class="text-purple-600 font-bold">➤</span>
            <p>बँक पासबुकची छायांकित प्रत</p>
          </div>
          <div class="flex items-start gap-3">
            <span class="text-purple-600 font-bold">➤</span>
            <p>व्यवसाय / नोकरी प्रमाणपत्र (असल्यास)</p>
          </div>
        </div>
      </div>
    </div>

    <!-- Guarantor Documents Grid -->
    <div class="grid lg:grid-cols-2 grid-cols-1 gap-6">
      <!-- Property Guarantor -->
      <div class="border-b-4 border-morpankhi shadow-lg ring-1 rounded-md p-6 bg-white">
        <h3 class="text-center xl:text-2xl lg:text-xl text-lg font-bold font-marathi1 text-gray-700 mb-5">
          (मालमत्ता) हमीदाराचे आवश्यक कागदपत्रे
        </h3>
        <div class="xl:text-lg lg:text-base text-sm font-marathi2 text-gray-600 space-y-3">
          <div>
            <div class="flex items-start gap-3 mb-2">
              <span class="text-purple-600 font-bold">➤</span>
              <p class="font-semibold">अ) मालमत्ताधारक हमीदार</p>
            </div>
            <ul class="list-decimal ml-10 space-y-1">
              <li>आधार कार्ड</li>
              <li>सक्षम अधिकाऱ्याचा ७/१२, ६ड, ८अ उतारा व मालमत्ता नोंदणीपत्रक</li>
              <li>दुय्यम निबंधकाचे मालमत्ता मूल्यांकन प्रमाणपत्र (मूळ)</li>
              <li>नमुना – २४ (अ)</li>
            </ul>
          </div>

          <div>
            <div class="flex items-start gap-3 mb-2">
              <span class="text-purple-600 font-bold">➤</span>
              <p class="font-semibold">ब) शासकीय हमीदार</p>
            </div>
            <ul class="list-decimal ml-10 space-y-1">
              <li>आधार कार्ड</li>
              <li>पगार प्रमाणपत्र (मूळ)</li>
              <li>कार्यालयाचे ओळखपत्र</li>
              <li>नमुना – २४ (अ)</li>
            </ul>
          </div>

          <div class="flex items-center gap-2 pt-2">
            <span class="text-purple-600 font-bold">➤</span>
            <p>Affidavit - प्रतिज्ञापत्र</p>
            <button on:click={() => openPDF("/termloan/guarantor_affidavit.pdf")} class="ml-auto">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 -960 960 960" class="size-6 fill-blue-600 hover:fill-rose-500 transition-colors">
                <path d="M480-320 280-520l56-58 104 104v-326h80v326l104-104 56 58-200 200ZM240-160q-33 0-56.5-23.5T160-240v-120h80v120h480v-120h80v120q0 33-23.5 56.5T720-160H240Z" />
              </svg>
            </button>
          </div>

          <div class="flex items-center gap-2">
            <span class="text-purple-600 font-bold">➤</span>
            <p>मालमत्ता धारक माहिती</p>
            <button on:click={() => openPDF("/termloan/24_b_property_info.pdf")} class="ml-auto">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 -960 960 960" class="size-6 fill-blue-600 hover:fill-rose-500 transition-colors">
                <path d="M480-320 280-520l56-58 104 104v-326h80v326l104-104 56 58-200 200ZM240-160q-33 0-56.5-23.5T160-240v-120h80v120h480v-120h80v120q0 33-23.5 56.5T720-160H240Z" />
              </svg>
            </button>
          </div>
        </div>
      </div>

      <!-- LIC/FD Guarantor -->
      <div class="border-b-4 border-morpankhi shadow-lg ring-1 rounded-md p-6 bg-white">
        <h3 class="text-center xl:text-2xl lg:text-xl text-lg font-bold font-marathi1 text-gray-700 mb-5">
          (LIC / FD) हमीदाराचे आवश्यक कागदपत्रे
        </h3>
        <div class="xl:text-lg lg:text-base text-sm font-marathi2 text-gray-600 space-y-3">
          <div>
            <div class="flex items-start gap-3 mb-2">
              <span class="text-purple-600 font-bold">➤</span>
              <p class="font-semibold">क) विमाधारक (LIC) हमीदार</p>
            </div>
            <ul class="list-decimal ml-10 space-y-1">
              <li>आधार कार्ड</li>
              <li>अर्जावरील हमीदाराच्या पासपोर्ट साईज रंगीत फोटोवर क्रॉस स्वाक्षरी असणे आवश्यक</li>
              <li>एल.आय.सी. पॉलिसी (मूळ)</li>
              <li>पॉलिसी रक्कम कर्ज रकमेच्या किमान दुप्पट असावी</li>
              <li>पॉलिसीच्या संपूर्ण कालावधीतील किमान अर्ध्या हप्त्यांचा भरणा झालेला असावा</li>
              <li>एल.आय.सी. हप्ते भरणा केलेले विवरणपत्र जोडणे आवश्यक</li>
            </ul>
          </div>

          <div>
            <div class="flex items-start gap-3 mb-2">
              <span class="text-purple-600 font-bold">➤</span>
              <p class="font-semibold">ड) मुदती ठेवीदार (FD) हमीदार</p>
            </div>
            <ul class="list-decimal ml-10 space-y-1">
              <li>आधार कार्ड</li>
              <li>अर्जावरील हमीदाराच्या पासपोर्ट साईज रंगीत फोटोवर क्रॉस स्वाक्षरी असणे आवश्यक</li>
              <li>मूळ मुदत ठेव (FD)</li>
            </ul>
          </div>

          <div class="flex items-center gap-2 pt-2">
            <span class="text-purple-600 font-bold">➤</span>
            <p>Affidavit - प्रतिज्ञापत्र</p>
            <button on:click={() => openPDF("/termloan/guarantor_affidavit.pdf")} class="ml-auto">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 -960 960 960" class="size-6 fill-blue-600 hover:fill-rose-500 transition-colors">
                <path d="M480-320 280-520l56-58 104 104v-326h80v326l104-104 56 58-200 200ZM240-160q-33 0-56.5-23.5T160-240v-120h80v120h480v-120h80v120q0 33-23.5 56.5T720-160H240Z" />
              </svg>
            </button>
          </div>

          <div class="flex items-center gap-2">
            <span class="text-purple-600 font-bold">➤</span>
            <p>मालमत्ता धारक माहिती</p>
            <button on:click={() => openPDF("/termloan/24_b_property_info.pdf")} class="ml-auto">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 -960 960 960" class="size-6 fill-blue-600 hover:fill-rose-500 transition-colors">
                <path d="M480-320 280-520l56-58 104 104v-326h80v326l104-104 56 58-200 200ZM240-160q-33 0-56.5-23.5T160-240v-120h80v120h480v-120h80v120q0 33-23.5 56.5T720-160H240Z" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</section>
 
</div>

<!-- Footer -->
<footer class="bg-gray-800 text-white py-8">
  <div class="container mx-auto px-6 text-center">
    <p>
      Copyright &copy; 2025 Maulana Azad Minorities Financial Development Corporation Limited, A Govt. of Maharashtra Undertaking.
      <br />All Rights Reserved.
    </p>
    <div class="mt-4 space-x-4">
      <a href="#" class="text-gray-400 hover:text-white transition-colors">Privacy Policy</a>
      <a href="#" class="text-gray-400 hover:text-white transition-colors">Terms of Service</a>
      <a href="#" class="text-gray-400 hover:text-white transition-colors">Contact Us</a>
    </div>
  </div>
</footer>

<style>
  @keyframes move-up-down {
    0%, 100% {
      transform: translateY(0);
    }
    50% {
      transform: translateY(-13px);
    }
  }

  .animate-up-down {
    animation: move-up-down 2s ease-in-out infinite;
  }
</style>