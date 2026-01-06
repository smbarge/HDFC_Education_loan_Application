<script>
  import { goto } from "$app/navigation";
  import Fa from "svelte-fa";
  import { faP, faPhone } from "@fortawesome/free-solid-svg-icons";

  // You can add any additional logic here if needed
  import { onMount } from "svelte";

  let userCount = 0;
  let disbursedAmount = 0;
  let approvalRate = 0;
  let customerSatisfaction = 0;

  let cardData = [
    {
      title: "Loan Limit",
      value: "up to ₹20,00,000 to ₹30,00,000",
      icon: "M549-120 280-400v-80h140q53 0 91.5-34.5T558-600H240v-80h306q-17-35-50.5-57.5T420-760H240v-80h480v80H590q14 17 25 37t17 43h88v80h-81q-8 85-70 142.5T420-400h-29l269 280H549Z",
      src: "/termloan/totalloan.png",
    },
    // {
    //   title: "Self Contribution",
    //   value: "5%",
    //   icon: "M560-520q50 0 85-35t35-85q0-50-35-85t-85-35q-50 0-85 35t-35 85q0 50 35 85t85 35ZM320-240q-33 0-56.5-23.5T240-320v-480q0-33 23.5-56.5T320-880h480q33 0 56.5 23.5T880-800v480q0 33-23.5 56.5T800-240H320ZM160-80q-33 0-56.5-23.5T80-160v-560h80v560h560v80H160Zm160-240h480q-42-57-105.5-88.5T560-440q-71 0-134.5 31.5T320-320Z",
    //   src: "/totalloan.png",
    // },
    {
      title: "Loan From",
      value: "NMDFC - 90% \n MAMFDC - 5% \n Self Contribution- 5%",
      icon: "M200-280v-280h80v280h-80Zm240 0v-280h80v280h-80ZM80-120v-80h800v80H80Zm600-160v-280h80v280h-80ZM80-640v-80l400-200 400 200v80H80Z",
      src: "/termloan/bank.png",
    },
    {
      title: "Interest @",
      value:
        "Credit Line 1 : \n 6% + 2 % हमी शुल्क = 8%  \n Credit Line 2 : \n M/ पु. : 8 + 2 = 10% \n F/ स्त्री : 6 + 2 = 8%",
      icon: "m136-240-56-56 296-298 160 160 208-206H640v-80h240v240h-80v-104L536-320 376-480 136-240Z",
      src: "/termloan/interest-rate.png",
    },
    {
      title: "Repayment Period",
      value: "5 years",
      icon: "M120-160q-33 0-56.5-23.5T40-240v-440h80v440h680v80H120Zm160-160q-33 0-56.5-23.5T200-400v-320q0-33 23.5-56.5T280-800h560q33 0 56.5 23.5T920-720v320q0 33-23.5 56.5T840-320H280Zm80-80q0-33-23.5-56.5T280-480v80h80Zm400 0h80v-80q-33 0-56.5 23.5T760-400Zm-200-40q50 0 85-35t35-85q0-50-35-85t-85-35q-50 0-85 35t-35 85q0 50 35 85t85 35ZM280-640q33 0 56.5-23.5T360-720h-80v80Zm560 0v-80h-80q0 33 23.5 56.5T840-640Z",
      src: "/termloan/repayment.png",
    },
    {
      title: "Insurance",
      value:
        "1.5% of total loan amount will be deducted at the time of disbursement from sanction loan amount",
      icon: "M240-80q-50 0-85-35t-35-85v-120h120v-560l60 60 60-60 60 60 60-60 60 60 60-60 60 60 60-60 60 60 60-60v680q0 50-35 85t-85 35H240Zm480-80q17 0 28.5-11.5T760-200v-560H320v440h360v120q0 17 11.5 28.5T720-160ZM360-600v-80h240v80H360Zm0 120v-80h240v80H360Zm320-120q-17 0-28.5-11.5T640-640q0-17 11.5-28.5T680-680q17 0 28.5 11.5T720-640q0 17-11.5 28.5T680-600Zm0 120q-17 0-28.5-11.5T640-520q0-17 11.5-28.5T680-560q17 0 28.5 11.5T720-520q0 17-11.5 28.5T680-480Z",
      src: "/termloan/insurance.png",
    },
    {
      title: "Income Limit",
      value:
        "Credit Line 1 : \n Urban & Rural - less than ₹3,00,000/- \n Credit Line 2 : Upto 8 lakhs",
      icon: "m786-146 28-28-74-74v-112h-40v128l86 86ZM400-720h160v-80H400v80ZM720-40q-83 0-141.5-58.5T520-240q0-83 58.5-141.5T720-440q83 0 141.5 58.5T920-240q0 83-58.5 141.5T720-40Zm-560-80q-33 0-56.5-23.5T80-200v-440q0-33 23.5-56.5T160-720h160v-80q0-33 23.5-56.5T400-880h160q33 0 56.5 23.5T640-800v80h160q33 0 56.5 23.5T880-640v171q-35-25-76-38t-84-13q-116 0-198 82t-82 198q0 31 6.5 61.5T467-120H160Z",
      src: "/termloan/minimum-wage.png",
    },
  ];

  // Define your target values
  let targetValues = {
    userCount: 890,
    disbursedAmount: 50, // In millions
    approvalRate: 85,
    customerSatisfaction: 95,
  };

  // Animation function
  function animateCount(target, setCount) {
    let count = 0;
    let increment = Math.ceil(target / 100); // Adjust this for speed
    let interval = setInterval(() => {
      if (count < target) {
        count += increment;
        setCount(Math.min(count, target));
      } else {
        clearInterval(interval);
      }
    }, 30); // Adjust this for smoother/faster animation
  }

  function openPDF(pdfUrl) {
    window.open(pdfUrl, "_blank"); // Open the PDF in a new tab
  }

  onMount(() => {
    animateCount(targetValues.userCount, (value) => (userCount = value));
    animateCount(
      targetValues.disbursedAmount,
      (value) => (disbursedAmount = value)
    );
    animateCount(targetValues.approvalRate, (value) => (approvalRate = value));
    animateCount(
      targetValues.customerSatisfaction,
      (value) => (customerSatisfaction = value)
    );
  });
</script>

<div class="min-h-screen space-y-10">
  <div
    class="text-white md:py-10 py-5 h-[300px] md:h-auto"
    style="background: linear-gradient(0deg, #8e24aa, #ce93d8); clip-path: ellipse(85% 65% at 50% 30%);"
  >
    <div class="space-y-5">
      <div>
        <h1
          class="text-center xl:text-4xl text-2xl font-bold capitalize font-roboto mb-1"
        >
          Get Your Term Loan Today!
        </h1>
        <p
          class="text-center xl:text-xl text-lg font-bold capitalize font-marathi2"
        >
          आपले मुदत कर्ज आजच मिळवा!
        </p>
      </div>

      <div class="mb-8">
        <p
          class="text-center xl:text-lg text-base capitalize font-robotoMono mb-1"
        >
          Low interest rates, easy application, quick approval
        </p>
        <p class="text-center text-base capitalize font-robotoMono">
          कमी व्याज दर, सोपी अर्ज प्रक्रिया, जलद मंजुरी
        </p>
      </div>

      <div class="flex justify-center items-center gap-5">
        <button
          on:click={() => {
            goto("/termloan/LogInForm");
          }}
          class="rounded-md bg-white before:ease z-10 relative h-10 md:w-48 w-[140px] overflow-hidden border border-purple-500 text-blue-600 font-semibold shadow-2xl transition-all before:absolute before:top-1/2 before:h-0 before:w-64 before:origin-center before:-translate-x-20 before:rotate-45 before:bg-blue-500 before:duration-300 hover:text-white hover:shadow-blue-500 hover:before:h-64 hover:before:-translate-y-32"
        >
          <span class="relative capitalize md:text-base text-sm"
            >Log In / लॉग इन
          </span>
        </button>
        <!-- <button
          
          class="cursor-not-allowed rounded-md bg-white before:ease z-10 relative h-10 md:w-48 w-[155px] overflow-hidden border border-purple-500 text-blue-600 font-semibold shadow-2xl transition-all before:absolute before:top-1/2 before:h-0 before:w-64 before:origin-center before:-translate-x-20 before:rotate-45 before:bg-gray-500 before:duration-300 hover:text-white hover:shadow-blue-500 hover:before:h-64 hover:before:-translate-y-32"
        >
          <span class="relative capitalize md:text-base text-sm"
            >register / नोंदणी करा</span
          >
        </button> -->
        <button
          on:click={() => {
            goto("/termloan/registrationForm");
          }}
          class="rounded-md bg-white before:ease z-10 relative h-10 md:w-48 w-[155px] overflow-hidden border border-purple-500 text-blue-600 font-semibold shadow-2xl transition-all before:absolute before:top-1/2 before:h-0 before:w-64 before:origin-center before:-translate-x-20 before:rotate-45 before:bg-blue-500 before:duration-300 hover:text-white hover:shadow-blue-500 hover:before:h-64 hover:before:-translate-y-32"
        >
          <span class="relative capitalize md:text-base text-sm"
            >register / नोंदणी करा</span
          >
        </button>
      </div>
      <div class="flex items-center justify-center">
        <div
          class=" p-6 rounded-lg shadow-lg text-center border border-purple-600"
        >
          <div class="flex items-center justify-center">
            <span class="mr-2 text-lg font-semibold">Help Desk</span>
            <Fa icon={faPhone}></Fa>
            <span class="ml-2">9028947883</span>
          </div>
          <div class="mt-2">M - F 11 am to 5 pm</div>
        </div>
      </div>
      <!-- <img
        src="https://via.placeholder.com/400x200.png?text=Loan+Image"
        alt="Loan"
        class="mx-auto rounded-lg mt-4"
      /> 
      <button
        class="bg-white text-blue-600 px-6 py-3 font-semibold rounded-lg shadow-lg mt-4"
      >
        Apply Now
      </button>-->
    </div>
  </div>
  <div class="bg-pink-100 relative">
    <svg
      class="absolute top-0 left-0 h-[200px] md:h-[300px] lg:h-auto w-full"
      id="wave"
      style="transform:rotate(180deg); transition: 0.3s"
      viewBox="0 0 1440 350"
      version="1.1"
      xmlns="http://www.w3.org/2000/svg"
      ><defs
        ><linearGradient id="sw-gradient-0" x1="0" x2="0" y1="1" y2="0"
          ><stop stop-color="rgba(252, 231, 243, 1)" offset="0%"></stop><stop
            stop-color="rgba(251, 207, 232, 1)"
            offset="100%"
          ></stop></linearGradient
        ></defs
      ><path
        style="transform:translate(0, 0px); opacity:1"
        fill="url(#sw-gradient-0)"
        d="M0,98L40,130.7C80,163,160,229,240,245C320,261,400,229,480,212.3C560,196,640,196,720,220.5C800,245,880,294,960,285.8C1040,278,1120,212,1200,196C1280,180,1360,212,1440,204.2C1520,196,1600,147,1680,130.7C1760,114,1840,131,1920,179.7C2000,229,2080,310,2160,318.5C2240,327,2320,261,2400,220.5C2480,180,2560,163,2640,196C2720,229,2800,310,2880,285.8C2960,261,3040,131,3120,98C3200,65,3280,131,3360,179.7C3440,229,3520,261,3600,269.5C3680,278,3760,261,3840,269.5C3920,278,4000,310,4080,285.8C4160,261,4240,180,4320,122.5C4400,65,4480,33,4560,57.2C4640,82,4720,163,4800,187.8C4880,212,4960,180,5040,163.3C5120,147,5200,147,5280,122.5C5360,98,5440,49,5520,49C5600,49,5680,98,5720,122.5L5760,147L5760,490L5720,490C5680,490,5600,490,5520,490C5440,490,5360,490,5280,490C5200,490,5120,490,5040,490C4960,490,4880,490,4800,490C4720,490,4640,490,4560,490C4480,490,4400,490,4320,490C4240,490,4160,490,4080,490C4000,490,3920,490,3840,490C3760,490,3680,490,3600,490C3520,490,3440,490,3360,490C3280,490,3200,490,3120,490C3040,490,2960,490,2880,490C2800,490,2720,490,2640,490C2560,490,2480,490,2400,490C2320,490,2240,490,2160,490C2080,490,2000,490,1920,490C1840,490,1760,490,1680,490C1600,490,1520,490,1440,490C1360,490,1280,490,1200,490C1120,490,1040,490,960,490C880,490,800,490,720,490C640,490,560,490,480,490C400,490,320,490,240,490C160,490,80,490,40,490L0,490Z"
      ></path></svg
    >
    <div
      class="relative z-10 grid grid-cols-12 justify-center items-center lg:mx-10 mx-5 my-5"
    >
      <div
        class="lg:col-span-6 col-span-12 w-full 2xl:px-16 lg:px-0 md:px-10 lg:pb-0 pb-6 lg:order-1 order-2"
      >
        <div class="mb-5 border-b-2 border-purple-500 pb-2">
          <!-- <h1
              class="text-6xl text-purple-800 font-roboto font-semibold text-left"
            >
              Term Loan
            </h1> -->
          <h1
            class="lg:text-4xl text-2xl text-purple-800 font-marathi1 font-semibold text-left"
          >
            मुदत कर्ज योजना
          </h1>
        </div>
        <p class="lg:text-lg text-base text-purple-700 font-marathi2">
          <strong> 'मौलाना आझाद अल्पसंख्यांक मुदत कर्ज योजने'</strong> चा उद्देश
          महाराष्ट्रातील अल्पसंख्यांक समुदायातील व्यक्तींना (जसे की मुस्लिम, शीख,
          ख्रिश्चन, पारशी, बौद्ध, जैन, आणि ज्यू) कर्ज स्वरूपात आर्थिक मदत प्रदान
          करणे आहे. हे कर्ज त्यांना लहान व्यवसाय सुरू करण्यास किंवा विस्तारित करण्यास
          मदत करण्यासाठी, आत्मनिर्भरतेला प्रोत्साहन देण्यासाठी आणि त्यांच्या आर्थिक
          परिस्थितीमध्ये सुधारणा करण्यासाठी आहे.
        </p>
        <!-- <p class="text-lg text-purple-700 font-inter">
            The objective of the <strong>
              'Maulana Azad Minorities Term Loan'
            </strong> is to provide financial support to individuals from minority
            communities (such as Muslims, Sikhs, Christians, Parsis, Buddhists, Jains,
            and Jews) in Maharashtra. The loan is aimed at helping them start or expand
            small businesses, promoting self-employment, and improving their economic
            conditions.
          </p> -->
        <!-- <p class="text-lg text-purple-700 font-inter">
            A term loan is a fixed-amount loan that is repaid over a set period,
            typically ranging from one to ten years. It provides businesses and
            individuals with a stable source of financing for major purchases or
            investments, helping to manage cash flow effectively.
          </p> -->
        <div class="mt-5 md:space-y-2 space-y-3">
          <div class="md:flex grid justify-start items-start gap-2">
            <div class="flex justify-start items-start gap-2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 -960 960 960"
                class="size-6 fill-green-500"
              >
                <path
                  d="m424-296 282-282-56-56-226 226-114-114-56 56 170 170Zm56 216q-83 0-156-31.5T197-197q-54-54-85.5-127T80-480q0-83 31.5-156T197-763q54-54 127-85.5T480-880q83 0 156 31.5T763-763q54 54 85.5 127T880-480q0 83-31.5 156T763-197q-54 54-127 85.5T480-80Z"
                />
              </svg>
              <h1
                class="xl:text-lg lg:text-[17px] text-base font-roboto font-semibold"
              >
                <!-- Flexible repayment terms : -->
                लवचिक परतफेड अटी :
              </h1>
            </div>
            <p class="xl:text-base lg:text-[15px] text-sm">
              <!-- Choose a schedule that fits your financial situation. -->
              तुमच्या आर्थिक परिस्थितीशी जुळणारे वेळापत्रक निवडा.
            </p>
          </div>
          <div class="md:flex grid justify-start items-start gap-2">
            <div class="flex justify-start items-start gap-2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 -960 960 960"
                class="size-6 fill-green-500"
              >
                <path
                  d="m424-296 282-282-56-56-226 226-114-114-56 56 170 170Zm56 216q-83 0-156-31.5T197-197q-54-54-85.5-127T80-480q0-83 31.5-156T197-763q54-54 127-85.5T480-880q83 0 156 31.5T763-763q54 54 85.5 127T880-480q0 83-31.5 156T763-197q-54 54-127 85.5T480-80Z"
                />
              </svg>
              <h1
                class="xl:text-lg lg:text-[17px] text-base font-roboto font-semibold"
              >
                <!-- Fixed or variable interest rates : -->
                स्थिर किंवा परिवर्तनीय व्याजदर :
              </h1>
            </div>

            <p class="xl:text-base lg:text-[15px] text-sm">
              <!-- Offers predictability in payments. -->
              भुगतानामध्ये निश्चितता प्रदान करते.
            </p>
          </div>
          <div class="md:flex grid justify-start items-start gap-2">
            <div class="flex justify-start items-start gap-2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 -960 960 960"
                class="size-6 fill-green-500"
              >
                <path
                  d="m424-296 282-282-56-56-226 226-114-114-56 56 170 170Zm56 216q-83 0-156-31.5T197-197q-54-54-85.5-127T80-480q0-83 31.5-156T197-763q54-54 127-85.5T480-880q83 0 156 31.5T763-763q54 54 85.5 127T880-480q0 83-31.5 156T763-197q-54 54-127 85.5T480-80Z"
                />
              </svg>
              <h1
                class="xl:text-lg lg:text-[17px] text-base font-roboto font-semibold"
              >
                <!-- Fast approval process : -->
                जलद मंजुरी प्रक्रिया :
              </h1>
            </div>
            <p class="xl:text-base lg:text-[15px] text-sm">
              <!-- Get funds quickly to grow your business or finance your needs. -->
              आपला व्यवसाय वाढवण्यासाठी किंवा गरजा पूर्ण करण्यासाठी जलद निधी मिळवा.
            </p>
          </div>
        </div>
      </div>
      <div
        class="lg:col-span-6 col-span-12 w-full lg:order-2 order-1 pt-6 md:pt-8 lg:pt-10 pb-3 lg:pb-5"
      >
        <img
          src="/termloan/landing/landing5New.png"
          alt="logo"
          class="xl:h-[580px] md:h-[500px] h-[250px] mx-auto xl:mx-0 animate-up-down"
        />
      </div>
    </div>
  </div>

  <div
    class="bg-gray-100 rounded-lg shadow-lg xl:px-10 xl:py-8 px-5 py-5 lg:mx-24 md:mx-5 mx-10"
  >
    <div class="grid grid-cols-4 gap-5">
      <div
        class="md:col-span-1 col-span-4 grid grid-cols-12 justify-center items-center md:border-r-2 border-b-2 md:border-b-0 md:pb-0 pb-3"
      >
        <div
          class="lg:col-span-6 md:col-span-4 col-span-6 bg-rose-100 rounded-full w-fit xl:p-4 lg:p-3 p-2 lg:mx-auto md:mx-0 mx-auto"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 -960 960 960"
            class="xl:size-8 lg:size-6 size-5 fill-rose-500"
          >
            <path
              d="M480-480q-66 0-113-47t-47-113q0-66 47-113t113-47q66 0 113 47t47 113q0 66-47 113t-113 47ZM160-160v-112q0-34 17.5-62.5T224-378q62-31 126-46.5T480-440q66 0 130 15.5T736-378q29 15 46.5 43.5T800-272v112H160Z"
            />
          </svg>
        </div>
        <div class="lg:col-span-6 md:col-span-8 col-span-6">
          <h1 class="font-bold text-gray-700 xl:text-2xl lg:text-xl text-lg">
            {userCount}+
          </h1>
          <h1 class="text-gray-600 xl:text-lg lg:text-base text-sm">Users</h1>
        </div>
      </div>
      <div
        class="md:col-span-1 col-span-4 grid grid-cols-12 justify-center items-center md:border-r-2 border-b-2 md:border-b-0 md:pb-0 pb-3"
      >
        <div
          class="lg:col-span-6 md:col-span-4 col-span-6 bg-rose-100 rounded-full w-fit xl:p-4 lg:p-3 p-2 lg:mx-auto md:mx-0 mx-auto"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 -960 960 960"
            class="xl:size-8 lg:size-6 size-5 fill-rose-500"
          >
            <path
              d="M200-120q-33 0-56.5-23.5T120-200v-560q0-33 23.5-56.5T200-840h560q8 0 15 1.5t14 4.5l-74 74H200v560h560v-266l80-80v346q0 33-23.5 56.5T760-120H200Zm261-160L235-506l56-56 170 170 367-367 57 55-424 424Z"
            />
          </svg>
        </div>
        <div class="lg:col-span-6 md:col-span-8 col-span-6">
          <h1 class="font-bold text-gray-700 xl:text-2xl lg:text-xl text-lg">
            ₹{disbursedAmount}M+
          </h1>
          <h1 class="text-gray-600 xl:text-lg lg:text-base text-sm">
            Disbursed
          </h1>
        </div>
      </div>
      <div
        class="md:col-span-1 col-span-4 grid grid-cols-12 justify-center items-center md:border-r-2 border-b-2 md:border-b-0 md:pb-0 pb-3"
      >
        <div
          class="lg:col-span-6 md:col-span-4 col-span-6 bg-rose-100 rounded-full w-fit xl:p-4 lg:p-3 p-2 lg:mx-auto md:mx-0 mx-auto"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 -960 960 960"
            class="xl:size-8 lg:size-6 size-5 fill-rose-500"
          >
            <path
              d="m136-240-56-56 296-298 160 160 208-206H640v-80h240v240h-80v-104L536-320 376-480 136-240Z"
            />
          </svg>
        </div>
        <div class="lg:col-span-6 md:col-span-8 col-span-6">
          <h1 class="font-bold text-gray-700 xl:text-2xl lg:text-xl text-lg">
            {approvalRate}%
          </h1>
          <h1 class="text-gray-600 xl:text-lg lg:text-base text-sm">
            Approval Rate
          </h1>
        </div>
      </div>
      <div
        class="md:col-span-1 col-span-4 grid grid-cols-12 items-center md:border-r-2 border-b-2 md:border-b-0 last:border-r-0 last:border-b-0"
      >
        <div
          class="lg:col-span-6 md:col-span-4 col-span-6 bg-rose-100 rounded-full w-fit xl:p-4 lg:p-3 p-2 lg:mx-auto md:mx-0 mx-auto"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 -960 960 960"
            class="xl:size-8 lg:size-6 size-5 fill-rose-500"
          >
            <path
              d="M620-520q25 0 42.5-17.5T680-580q0-25-17.5-42.5T620-640q-25 0-42.5 17.5T560-580q0 25 17.5 42.5T620-520Zm-280 0q25 0 42.5-17.5T400-580q0-25-17.5-42.5T340-640q-25 0-42.5 17.5T280-580q0 25 17.5 42.5T340-520Zm140 260q68 0 123.5-38.5T684-400h-66q-22 37-58.5 58.5T480-320q-43 0-79.5-21.5T342-400h-66q25 63 80.5 101.5T480-260Zm0 180q-83 0-156-31.5T197-197q-54-54-85.5-127T80-480q0-83 31.5-156T197-763q54-54 127-85.5T480-880q83 0 156 31.5T763-763q54 54 85.5 127T880-480q0 83-31.5 156T763-197q-54 54-127 85.5T480-80Z"
            />
          </svg>
        </div>
        <div class="lg:col-span-6 md:col-span-8 col-span-6">
          <h1 class="font-bold text-gray-700 xl:text-2xl lg:text-xl text-lg">
            {customerSatisfaction}%
          </h1>
          <h1 class="text-gray-600 xl:text-lg lg:text-base text-sm">
            Customer Satisfaction
          </h1>
        </div>
      </div>
    </div>
  </div>

  <div
    class="grid lg:grid-cols-6 md:grid-cols-3 grid-cols-1 gap-x-5 gap-y-14 md:mx-5 mx-10 py-10"
  >
    <!-- {#each cardData as card (card.title)}
      <div
        class="border hover:border-deepPurple-400 rounded shadow-lg p-5 transition-transform duration-500 ease-in-out transform hover:-translate-y-3"
      >
        <div class="grid justify-center items-center lg:gap-3 gap-2">
          <div class="p-4 bg-gray-100 rounded-full mx-auto">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 -960 960 960"
              class="xl:size-8 md:size-6 size-5 fill-gray-600"
            >
              <path d={card.icon} />
            </svg>
          </div>
          <h1
            class="text-center font-roboto font-semibold capitalize xl:text-lg text-base text-gray-700"
          >
            {card.title}
          </h1>
          <h1
            class="xl:text-base text-sm text-center font-inter text-blue-700 whitespace-pre-line"
          >
            {card.value}
          </h1>
        </div>
      </div>
    {/each} -->

    {#each cardData as card (card.title)}
      <div
        class="group relative rounded-lg shadow-lg bg-Calypso-100 hover:border-4 hover:border-morpankhi p-5 transition-transform duration-500 ease-in-out transform hover:-translate-y-2"
      >
        <div
          class="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2 border-4 border-morpankhi group-hover:border-Calypso-300 p-4 rounded-full bg-Calypso-200 group-hover:bg-Calypso-50"
        >
          <img src={card.src} alt="" class="xl:size-10 md:size-8 size-7" />
        </div>
        <div class="pt-10 grid justify-center items-center gap-3">
          <h1
            class="uppercase text-center xl:text-lg text-base font-josefin font-semibold text-[#001f2e] group-hover:text-[#33393D]"
          >
            {card.title}
          </h1>
          <h1
            class="text-center text-[#001f2e] xl:text-base text-sm font-marvel group-hover:text-[#33393D] whitespace-pre-line"
          >
            {card.value}
          </h1>
        </div>
      </div>
    {/each}
  </div>

  <div class="grid md:grid-cols-3 grid-cols-1 gap-5 mx-5">
    <div
      class="col-span-1 border-b-4 border-morpankhi shadow-lg ring-1 rounded-md p-5"
    >
      <h1
        class="text-center xl:text-3xl lg:text-2xl text-xl font-bold font-marathi1 text-gray-700 xl:mb-5 mb-3"
      >
        अर्हता
      </h1>
      <div
        class="xl:text-xl lg:text-lg text-base font-marathi2 text-gray-600 space-y-1"
      >
        <div class="flex justify-start items-start gap-3">
          <span> ➤ </span>
          <h1>
            लाभार्थी अल्पसंख्याक समुदायातील असावा म्हणजेच मुस्लिम, शीख,
            ख्रिश्चन, पारसी, बौद्ध, जैन आणि ज्यू
          </h1>
        </div>
        <div class="flex justify-start items-start gap-3">
          <span> ➤ </span>
          <h1>लाभार्थी महाराष्ट्र राज्याचा रहिवासी असावा</h1>
        </div>
        <div class="flex justify-start items-start gap-3">
          <span> ➤ </span>
          <h1>लाभार्थी शिक्षित असावा</h1>
        </div>
        <div class="flex justify-start items-start gap-3">
          <span> ➤ </span>
          <h1>व्यवसाय कर्जासाठी वयोमर्यादा : १८ वर्षे - ६० वर्षे</h1>
        </div>
        <div class="flex justify-start items-start gap-3">
          <span> ➤ </span>
          <h1>कुटुंबाचे वार्षिक उत्पन्न :</h1>
        </div>
        <div class="pl-10 flex justify-start items-start gap-3">
          <span> ✥ </span>
          <h1>शहरी क्षेत्र - ₹१,२०,०००/- किंवा कमी</h1>
        </div>
        <div class="pl-10 flex justify-start items-start gap-3">
          <span> ✥ </span>
          <h1>ग्रामीण क्षेत्र - ₹९८,०००/- किंवा कमी</h1>
        </div>
      </div>
    </div>
    <div
      class="col-span-1 border-b-4 border-morpankhi shadow-lg ring-1 rounded-md p-5"
    >
      <h1
        class="text-center xl:text-3xl lg:text-2xl text-xl font-bold font-marathi1 text-gray-700 xl:mb-5 mb-3"
      >
        अर्जदारासाठी आवश्यक कागदपत्रे
      </h1>
      <div
        class="xl:text-xl lg:text-lg text-base font-marathi2 text-gray-600 space-y-1"
      >
        <div class="flex justify-start items-start gap-3">
          <span> ➤ </span>
          <h1>रंगीत पासपोर्ट आकाराचे फोटो</h1>
        </div>
        <div class="flex justify-start items-start gap-3">
          <span> ➤ </span>
          <h1>
            फोटो आयडी पुरावा - निवडणूक कार्ड / पॅन कार्ड / पासपोर्ट / ड्रायविंग
            लायसन्स (कोणतेही एक)
          </h1>
        </div>
        <div class="flex justify-start items-start gap-3">
          <span> ➤ </span>
          <h1>
            निवासाचा पुरावा - निवडणूक कार्ड / पासपोर्ट / ड्रायविंग लायसन्स /
            अधिवास प्रमाणपत्र / वीज बिल (कोणतेही एक)
          </h1>
        </div>
        <div class="flex justify-start items-start gap-3">
          <span> ➤ </span>
          <h1>सक्षम प्राधिकाऱ्याने जारी केलेले उत्पन्नाचे प्रमाणपत्र</h1>
        </div>
        <div class="flex justify-start items-start gap-3">
          <span> ➤ </span>
          <h1>
            जन्म तारीखचा पुरावा (शाळा सोडण्याचे प्रमाणपत्र / जन्म प्रमाणपत्र /
            पासपोर्ट)
          </h1>
        </div>
        <div class="flex justify-start items-start gap-3">
          <span> ➤ </span>
          <h1>आधार कार्ड (मोबाईल नंबर आधार कार्डशी लिंक असणे आवक्षक)</h1>
        </div>
        <div class="flex justify-start items-start gap-3">
          <span> ➤ </span>
          <h1>प्रस्तावित व्यवसायासाठी आवश्यक वस्तू/लेखांसाठी कोटेशन</h1>
        </div>
        <div class="flex justify-start items-start gap-3">
          <span> ➤ </span>
          <h1>
            व्यवसायाचे ठिकाण / दुकान उपलब्ध असल्याचा पुरावा / गुमास्ता, शॉप ॲक्ट
            लायसन्स
          </h1>
        </div>
        <div class="flex justify-start items-start gap-3">
          <span> ➤ </span>
          <h1>बँक पासबुकची झेरॉक्स प्रत</h1>
        </div>
        <div class="flex justify-start items-start gap-3">
          <span> ➤ </span>
          <h1>Affidavit - प्रतिज्ञापत्र</h1>
          <div class="flex justify-start items-center gap-2">
            <p class="font-marathi2 text-sm">
              (डाउनलोड करण्यासाठी येथे क्लिक करा)
            </p>
            <button
              on:click={() => openPDF("/termloan/applicant_affidavit.pdf")}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 -960 960 960"
                class="size-7 fill-blue-500 hover:fill-rose-500"
              >
                <path
                  d="M480-320 280-520l56-58 104 104v-326h80v326l104-104 56 58-200 200ZM240-160q-33 0-56.5-23.5T160-240v-120h80v120h480v-120h80v120q0 33-23.5 56.5T720-160H240Z"
                />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </div>
    <div
      class="col-span-1 border-b-4 border-morpankhi shadow-lg ring-1 rounded-md p-5"
    >
      <h1
        class="text-center xl:text-3xl lg:text-2xl text-xl font-bold font-marathi1 text-gray-700 xl:mb-5 mb-3"
      >
        हमीदाराचे आवश्यक कागदपत्रे
      </h1>
      <div
        class="xl:text-xl lg:text-lg text-base font-marathi2 text-gray-600 space-y-1"
      >
        <div class="flex justify-start items-start gap-3">
          <span> ➤ </span>
          <h1>रंगीत पासपोर्ट आकाराचे फोटो</h1>
        </div>
        <div class="flex justify-start items-start gap-3">
          <span> ➤ </span>
          <h1>
            फोटो आयडी पुरावा - निवडणूक कार्ड / पॅन कार्ड / पासपोर्ट / आधार कार्ड
            (मोबाईल नंबर आधार कार्डशी लिंक असणे आवक्षक) / ड्रायविंग लायसन्स
            (कोणतेही एक)
          </h1>
        </div>
        <div class="flex justify-start items-start gap-3">
          <span> ➤ </span>
          <h1>
            निवासाचा पुरावा - निवडणूक कार्ड / पासपोर्ट / ड्रायविंग लायसन्स /
            अधिवास प्रमाणपत्र / वीज बिल (कोणतेही एक)
          </h1>
        </div>
        <div class="flex justify-start items-start gap-3">
          <span> ➤ </span>
          <h1>
            गहाण ठेवण्याच्या मालमत्तेची कायदेशीर कागदपत्रे जसे की ७/१२ ची प्रत,
            ६ड, ८अ उतारा आणि मालमत्तेचे मूल्यांकन प्रमाणपत्र (मूळ प्रत)
          </h1>
        </div>
        <div class="flex justify-start items-start gap-3">
          <span> ➤ </span>
          <h1>Affidavit - प्रतिज्ञापत्र</h1>
          <div class="flex justify-start items-center gap-2">
            <p class="font-marathi2 text-sm">
              (डाउनलोड करण्यासाठी येथे क्लिक करा)
            </p>
            <button
              on:click={() => openPDF("/termloan/guarantor_affidavit.pdf")}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 -960 960 960"
                class="size-7 fill-blue-500 hover:fill-rose-500"
              >
                <path
                  d="M480-320 280-520l56-58 104 104v-326h80v326l104-104 56 58-200 200ZM240-160q-33 0-56.5-23.5T160-240v-120h80v120h480v-120h80v120q0 33-23.5 56.5T720-160H240Z"
                />
              </svg>
            </button>
          </div>
        </div>
        <div class="flex justify-start items-start gap-3">
          <span> ➤ </span>
          <h1>मालमत्ता धारक जमीनदाराची माहिती</h1>
          <div class="flex justify-start items-center gap-2">
            <p class="font-marathi2 text-sm">
              (डाउनलोड करण्यासाठी येथे क्लिक करा)
            </p>
            <button
              on:click={() => openPDF("/termloan/24_b_property_info.pdf")}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 -960 960 960"
                class="size-7 fill-blue-500 hover:fill-rose-500"
              >
                <path
                  d="M480-320 280-520l56-58 104 104v-326h80v326l104-104 56 58-200 200ZM240-160q-33 0-56.5-23.5T160-240v-120h80v120h480v-120h80v120q0 33-23.5 56.5T720-160H240Z"
                />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>
<footer class="bg-gray-800 text-white py-8 mt-10">
  <div class="container mx-auto px-6 text-center">
    <p>
      Copyright &copy; 2024 Maulana Azad Minorities Financial Development
      Corporation Limited, A Govt. of Maharashtra Undertaking. <br /> All Rights
      Reserved.
    </p>
    <div class="mt-4 space-x-4">
      <a href="#" class="text-gray-400">Privacy Policy</a>
      <a href="#" class="text-gray-400">Terms of Service</a>
      <a href="#" class="text-gray-400">Contact Us</a>
    </div>
  </div>
</footer>

<style>
  @keyframes move-up-down {
    0%,
    100% {
      transform: translateY(0);
    }
    50% {
      transform: translateY(
        -13px
      ); /* Adjust the value for more/less movement */
    }
  }

  .animate-up-down {
    animation: move-up-down 2s ease-in-out infinite; /* Changed to 2s for slower movement */
  }
</style>
