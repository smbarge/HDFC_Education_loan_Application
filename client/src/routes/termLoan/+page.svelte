<script>
  import PersonalDetails from "../../component/personalDetails/PersonalDetails.svelte";
  import BusinessDetails from "../../component/businessDetails/BusinessDetails.svelte";
  import Eligible from "../../component/eligible/Eligible.svelte";
  import UploadDocuments from "../../component/uploadDocuments/UploadDocuments.svelte";
  import Guarantor from "../../component/guarantor/Guarantor.svelte";
  import InvestmentSummary from "../../component/investmentSummary/InvestmentSummary.svelte";
  import LoanCollateral from "../../component/loanCollateral/LoanCollateral.svelte";
  import { fly } from "svelte/transition";
  import { authApi } from "$api/authApi";
  import { goto } from "$app/navigation";
  import { token, refreshToken, masters, applications } from "$appstore/store";
  import { onMount } from "svelte";
  import identityValidationSuit from "$lib/validate/identityValidationSuit";
  import { api } from "$api/api";
  import { browser } from "$app/environment";
  let dataLoaded = false;
  import personalDetailSuit from "$lib/validate/personalDetailSuit";
  import businessDetailSuit from "$lib/validate/businessDetailSuit";
  import guarantorDetailSuit from "$lib/validate/guarantorDetailSuit";
  import investmentDetailSuit from "$lib/validate/investmentDetailSuit";
  import investmentGuarantorDetailSuit from "$lib/validate/investmentGuarantorDetailSuit";
  import propertyResidentialSuit from "$lib/validate/propertyResidentialSuit";

  let resValidate = identityValidationSuit.get();
  let resPersonalDetails = personalDetailSuit.get();
  let resBusinessDetails = businessDetailSuit.get();
  let resGuarantorDetails = guarantorDetailSuit.get();
  let resInvestmentApplicantDetails = investmentDetailSuit.get();
  let resInvestmentGuarantorDetails = investmentGuarantorDetailSuit.get();
  let resPropertyResidentialDetails = propertyResidentialSuit.get();

  let contacts = [];
  let personalDetails = {
    id: "",
    aadhar: "",
    religion: 0,
    name: "",
    dob: "",
    gender: 0,
    address: "",
    mobile: "",
    email: "",
    pan: "",
    current_address: "",
    current_district: 0,
    current_taluka: 0,
    current_place: "",
    current_area: "",
    current_pincode: "",
    permanent_address: "",
    permanent_district: 0,
    permanent_taluka: 0,
    permanent_place: "",
    permanent_area: "",
    permanent_pincode: "",
    marital_status: 0,
    education_qualification: 0,
    details: "",
    guardian: 0,
    occupation: 0,
    income: "",
    past_surety_commitment: 0,
    past_surety_commitment_detail: "",
    occupationtype: "",
    riot_victim: 0,
    natural_calamity_victim: 0,
    disabled_person: 0,
    guarantor: 0,
    ration_card_number: "",
    district_id: 0,
    resident: 0,
    // literacySelected: "",
    literate: 0,
  };
  let personalDetailsData = {
    id: "",
    name: "",
    mobile: "",
    email: "",
    pan: "",
    current_address: "",
    current_district: 0,
    current_taluka: 0,
    current_place: "",
    current_area: "",
    current_pincode: "",
    permanent_address: "",
    permanent_district: 0,
    permanent_taluka: 0,
    permanent_place: "",
    permanent_area: "",
    permanent_pincode: "",
    marital_status: 0,
    education_qualification: 0,
    details: "",
    guardian: 0,
    occupation: 0,
    income: "",
    past_surety_commitment: 0,
    past_surety_commitment_detail: "",
    occupationtype: "",
    riot_victim: 0,
    natural_calamity_victim: 0,
    disabled_person: 0,
    guarantor: 0,
    ration_card_number: "",
    literate: 0,
    resident: 0,
  };

  let personalDetailsErrors = {
    address: "",
    mobile: "",
    email: "",
    pan: "",
    current_address: "",
    current_district: "",
    current_taluka: "",
    current_place: "",
    current_area: "",
    current_pincode: "",
    permanent_address: "",
    permanent_district: "",
    permanent_taluka: "",
    permanent_place: "",
    permanent_area: "",
    permanent_pincode: "",
    marital_status: "",
    education_qualification: "",
    details: "",
    guardian: "",
    occupation: "",
    income: "",
    past_surety_commitment: "",
    occupationtype: "",
    riot_victim: "",
    natural_calamity_victim: "",
    disabled_person: "",
    guarantor: "",
    ration_card_number: "",
    district_id: "",
    // literacySelected: "",
    literate: "",
    resident: "",
  };
  let currentApplication = {};

  let properties = [];
  let licPolicies = [];
  let fds = [];
  let uploadedDocs = [];

  let uploadedDocsData = [];
  let uploadedDocsErrors = [];

  let businessDetails = {};
  let businessDetailsData = {};
  let businessDetailsErrors = {
    business_name: "",
    business_details: "",
    business_address: "",
    business_district: "",
    business_taluka: "",
    business_place: "",
    business_pincode: "",
    quotation_name: "",
    quotation_gst_number: "",
    quotation_amount: "",
    bank_id: "",
    ifsc_code: "",
    bank_name: "",
    branch_name: "",
    account_number: "",
    bank_address: "",
    nic_code: "",
    business_type: "",
    org_type: "",
  };
  let guarantorPersonalDetailsData = {};
  let guarantorPersonalDetailsErrors = {
    mobile: "",
    email: "",
    pan: "",
    current_address: "",
    current_district: 0,
    current_taluka: 0,
    current_place: "",
    current_area: "",
    current_pincode: "",
    permanent_address: "",
    permanent_district: 0,
    permanent_taluka: 0,
    permanent_place: "",
    permanent_area: "",
    permanent_pincode: "",
    marital_status: 0,
    education_qualification: 0,
    details: "",
    guardian: 0,
    occupation: 0,
    occupation_type: "",
    past_surety_commitment: "",
    riot_victim: 0,
    natural_calamity_victim: false,
    disable_person: false,
    aadhar: "",
    dob: "",
    gender: 0,
    income: "",
    name: "",
    religion: 0,
  };

  let propertyResidentialDetails = [
    {
      property_type: 0,
      area: "",
      area_unit: "",
      survey_no: "",
      street_address: "",
      dist_id: 0,
      taluka_id: 0,
      place: "",
      pincode: "",
      property_value: "",
      unit_no: "",
    },
  ];
  let propertyResidentialData = [
    {
      property_type: 0,
      area: "",
      area_unit: "",
      survey_no: "",
      street_address: "",
      dist_id: 0,
      taluka_id: 0,
      place: "",
      pincode: "",
      property_value: "",
      unit_no: "",
      sub_property: "",
    },
  ];
  let propertyResidentialErrors = [
    {
      property_type: "",
      area: "",
      area_unit: "",
      survey_no: "",
      street_address: "",
      dist_id: "",
      taluka_id: "",
      place: "",
      pincode: "",
      property_value: "",
      unit_no: "",
      sub_property: "",
    },
  ];

  let investmentApplicantDetails = {
    properties: [
      {
        property_type: "",
        property_address: "",
        property_district: "",
        property_taluka: "",
        property_place: "",
        property_pincode: "",
        property_value: "",
        property_area: "",
        property_id: "",
        owner_type: "",
        title: "",
      },
    ],
    licPolicies: [
      {
        policy_number: "",
        policy_type: "",
        policy_amount: "",
        premium_amount: "",
        premium_frequency: "",
        policy_term: "",
        policy_id: "",
        owner_type: "",
      },
    ],
    fds: [
      {
        fd_account_number: "",
        bank_id: "",
        fd_amount: "",
        tenure: "",
        interest_rate: "",
        fd_id: "",
        owner_type: "",
      },
    ],
  };

  let investmentApplicantDetailsData = {
    properties: [
      {
        property_type: "",
        property_address: "",
        property_district: "",
        property_taluka: "",
        property_place: "",
        property_pincode: "",
        property_value: "",
        property_area: "",
        property_id: "",
        owner_type: "",
        title: "",
      },
    ],
    licPolicies: [
      {
        policy_number: "",
        policy_type: "",
        policy_amount: "",
        premium_amount: "",
        premium_frequency: "",
        policy_term: "",
        policy_id: "",
        owner_type: "",
      },
    ],
    fds: [
      {
        fd_account_number: "",
        bank_id: "",
        fd_amount: "",
        tenure: "",
        interest_rate: "",
        fd_id: "",
        owner_type: "",
      },
    ],
  };

  let investmentApplicantDetailsErrors = {
    properties: [
      {
        property_type: "",
        property_address: "",
        property_district: "",
        property_taluka: "",
        property_place: "",
        property_pincode: "",
        property_value: "",
        property_area: "",
        property_id: "",
        owner_type: "",
        title: "",
      },
    ],
    licPolicies: [
      {
        policy_number: "",
        policy_type: "",
        policy_amount: "",
        premium_amount: "",
        premium_frequency: "",
        policy_term: "",
        policy_id: "",
        owner_type: "",
      },
    ],
    fds: [
      {
        fd_account_number: "",
        bank_id: "",
        fd_amount: "",
        tenure: "",
        interest_rate: "",
        fd_id: "",
        owner_type: "",
      },
    ],
  };

  let investmentGuarantorDetails = {
    properties: [
      {
        property_type: "",
        property_address: "",
        property_district: "",
        property_taluka: "",
        property_place: "",
        property_pincode: "",
        property_value: "",
        property_area: "",
        property_id: "",
        owner_type: "",
        title: "",
      },
    ],
    licPolicies: [
      {
        policy_number: "",
        policy_type: "",
        policy_amount: "",
        premium_amount: "",
        premium_frequency: "",
        policy_term: "",
        policy_id: "",
        owner_type: "",
      },
    ],
    fds: [
      {
        fd_account_number: "",
        bank_id: "",
        fd_amount: "",
        tenure: "",
        interest_rate: "",
        fd_id: "",
        owner_type: "",
      },
    ],
  };

  let investmentGuarantorDetailsData = {
    properties: [
      {
        property_type: "",
        property_address: "",
        property_district: "",
        property_taluka: "",
        property_place: "",
        property_pincode: "",
        property_value: "",
        property_area: "",
        property_id: "",
        owner_type: "",
        title: "",
      },
    ],
    licPolicies: [
      {
        policy_number: "",
        policy_type: "",
        policy_amount: "",
        premium_amount: "",
        premium_frequency: "",
        policy_term: "",
        policy_id: "",
        owner_type: "",
      },
    ],
    fds: [
      {
        fd_account_number: "",
        bank_id: "",
        fd_amount: "",
        tenure: "",
        interest_rate: "",
        fd_id: "",
        owner_type: "",
      },
    ],
  };

  let investmentGuarantorDetailsErrors = {
    properties: [
      {
        property_type: "",
        property_address: "",
        property_district: "",
        property_taluka: "",
        property_place: "",
        property_pincode: "",
        property_value: "",
        property_area: "",
        property_id: "",
        owner_type: "",
        title: "",
      },
    ],
    licPolicies: [
      {
        policy_number: "",
        policy_type: "",
        policy_amount: "",
        premium_amount: "",
        premium_frequency: "",
        policy_term: "",
        policy_id: "",
        owner_type: "",
      },
    ],
    fds: [
      {
        fd_account_number: "",
        bank_id: "",
        fd_amount: "",
        tenure: "",
        interest_rate: "",
        fd_id: "",
        owner_type: "",
      },
    ],
  };

  const onFetchUploads = async () => {
    console.log("onFetchUploads called");
    dataLoaded = false;
    let {
      error,
      errorMsg,
      applications: lApplications,
    } = await api.getApplications();
    lApplications = initApplications(lApplications);
    $applications = [...lApplications];
    await init();
  };
  const init = async () => {
    if (!browser) return;
    const { error, errorMsg, masters: lMasters } = await api.getMasters();
    if (error) {
      alertMsg = errorMsg;
      return;
    }
    $masters = { ...lMasters };
    console.log("masters: ", $masters);
    console.log("currentApplications", currentApplication.personalDetails);
    // zero is current application
    currentApplication = { ...$applications[0] };

    personalDetails = { ...currentApplication.personalDetails };
    businessDetails = { ...currentApplication.businessDetails };
    businessDetailsData = { ...businessDetails };
    contacts = [...currentApplication.contacts];
    console.log("personalDetails init: ", personalDetails);
    delete businessDetailsData.id;
    uploadedDocs = [...currentApplication.uploadedDocs];
    uploadedDocsData = [...uploadedDocs];
    console.log("uploadedDocs", uploadedDocs);
    guarantorPersonalDetails = {
      ...currentApplication.guarantorPersonalDetails,
    };
    guarantorPersonalDetailsData = { ...guarantorPersonalDetails };
    guarantorPersonalDetailsData.guarantor = personalDetails.guarantor; // input for the guarantor is taken on the form of Guarantor but stored in personalDetails

    console.log("guarantorPersonalDetailsData: ", guarantorPersonalDetailsData);
    properties = [...currentApplication.properties];
    licPolicies = [...currentApplication.licPolicies];
    fds = [...currentApplication.fds];
    uploadedDocs = { ...currentApplication.uploadedDocs };
    console.log("personalDetails: ", personalDetails);

    console.log("$master", $masters.m_configration[0]);

    // identity data
    identityData.religion = personalDetails.religion;
    identityData.name = personalDetails.name;
    personalDetailsData.name = personalDetails.name;
    identityData.aadhar = personalDetails.aadhar;
    identityData.district_id = personalDetails.district_id;
    identityData.gender = personalDetails.gender;
    identityData.dob = new Date(personalDetails.dob);
    identityData.concent_for_aadhar_verification =
      personalDetails.concent_for_aadhar_verification;
    identityData.resident = personalDetails.resident;

    // personal details data
    (personalDetailsData.id = personalDetails.id),
      (personalDetailsData.mobile = personalDetails.mobile);
    personalDetailsData.email = personalDetails.email;
    personalDetailsData.pan = personalDetails.pan;
    personalDetailsData.current_address = personalDetails.current_address;
    personalDetailsData.current_district = personalDetails.current_district;
    personalDetailsData.current_taluka = personalDetails.current_taluka;
    personalDetailsData.current_place = personalDetails.current_place;
    personalDetailsData.current_area = personalDetails.current_area;
    personalDetailsData.current_pincode = personalDetails.current_pincode;
    personalDetailsData.permanent_address = personalDetails.permanent_address;
    personalDetailsData.permanent_district = personalDetails.permanent_district;
    personalDetailsData.permanent_taluka = personalDetails.permanent_taluka;
    personalDetailsData.permanent_place = personalDetails.permanent_place;
    personalDetailsData.permanent_area = personalDetails.permanent_area;
    personalDetailsData.permanent_pincode = personalDetails.permanent_pincode;
    personalDetailsData.marital_status = personalDetails.marital_status;
    personalDetailsData.education_qualification =
      personalDetails.education_qualification;
    personalDetailsData.details = personalDetails.details;
    personalDetailsData.guardian = personalDetails.guardian;
    personalDetailsData.occupation = personalDetails.occupation;
    personalDetailsData.income = personalDetails.income;
    personalDetailsData.past_surety_commitment =
      personalDetails.past_surety_commitment;
    personalDetailsData.past_surety_commitment_detail =
      personalDetails.past_surety_commitment_detail
        ? personalDetails.past_surety_commitment_detail
        : "";
    personalDetailsData.occupationtype = personalDetails.occupationtype;

    personalDetailsData.riot_victim = personalDetails.riot_victim;
    personalDetailsData.natural_calamity_victim =
      personalDetails.natural_calamity_victim;
    personalDetailsData.disabled_person = personalDetails.disabled_person;
    personalDetailsData.guarantor = personalDetails.guarantor;
    personalDetailsData.ration_card_number = personalDetails.ration_card_number;
    personalDetailsData.literate = personalDetails.literate;
    personalDetailsData.resident = personalDetails.resident;
    // personalDetailsData.litrate = 0;

    dataLoaded = true;
  };

  const personalDetailsDefault = {
    id: 0,
    religion: 0, // Default: 0 (integer)
    name: "", // Default: "" (string)
    dob: "2024-01-01", // Default: "" (string, should be in YYYY-MM-DD format)
    gender: 0, // Default: 0 (integer)
    address: "", // Default: "" (string)
    mobile: "", // Default: "" (string)
    email: "", // Default: "" (string)
    pan: "", // Default: "" (string)
    current_address: "", // Default: "" (string)
    current_district: 0, // Default: 0 (integer)
    current_taluka: 0, // Default: 0 (integer)
    current_place: "", // Default: "" (string)
    current_area: "",
    current_pincode: "", // Default: "" (string)
    permanent_address: "", // Default: "" (string)
    permanent_district: 0, // Default: 0 (integer)
    permanent_taluka: 0, // Default: 0 (integer)
    permanent_place: "", // Default: "" (string)
    permanent_area: "",
    permanent_pincode: "", // Default: "" (string)
    marital_status: 0, // Default: 0 (integer)
    education_qualification: 0, // Default: 0 (integer)
    details: "", // Default: "" (string)
    guardian: 0, // Default: 0 (integer)
    occupation: 0, // Default: 0 (integer)
    income: "", // Default: "" (string)
    past_surety_commitment: "", // Default: "" (string)
    aadhar: "", // Default: "" (string)
    occupationtype: "", // Default: "" (string)
    riot_victim: 0, // Default: 0 (integer)
    natural_calamity_victim: 0, // Default: 0 (integer)
    disabled_person: 0, // Default: 0 (integer)
    guarantor: 0, // Default: 0 (integer)
    ration_card_number: "",
    district_id: 0, // Default: 0 (integer)
    concent_for_aadhar_verification: 0,
  };

  const businessDetailsDefault = {
    id: 0, // Default: 0 (integer)
    business_name: "", // Default: "" (string)
    business_details: "", // Default: "" (text)
    business_address: "", // Default: "" (text)
    business_district: 0, // Default: 0 (integer)
    business_taluka: 0, // Default: 0 (integer)
    business_place: "", // Default: "" (string)
    business_pincode: "", // Default: "" (string, length 6)
    quotation_name: "", // Default: "" (string)
    quotation_gst_number: "", // Default: "" (string, length 15)
    quotation_amount: 0.0, // Default: 0.00 (numeric(15,2))
    loan_amount: 0.0, // Default: 0.00 (numeric(15,2))
    bank_id: 0, // Default: 0 (integer)
    ifsc_code: "", // Default: "" (string, length 11)
    bank_name: "", // Default: "" (string)
    branch_name: "", // Default: "" (string)
    account_number: "", // Default: "" (string, length 20)
    bank_address: "", // Default: "" (text)
    nic_code: "", // Default: "" (string)
    business_type: 0, // Default: 0 (integer)
    org_type: 0, // Default: 0 (integer)
  };
  const guarantorPersonalDetailsDefault = {
    id: 0, // Default: 0 (integer)
    name: "", // Default: "" (string)
    dob: "", // Default: "" (string, should be in YYYY-MM-DD format)
    gender: 0, // Default: 0 (integer)
    religion: 0, // Default: 0 (integer)
    aadhar: "", // Default: "" (string, length 12)
    mobile: "", // Default: "" (string)
    email: "", // Default: "" (string)
    pan: "", // Default: "" (string)
    current_address: "", // Default: "" (string)
    current_district: 0, // Default: 0 (integer)
    current_taluka: 0, // Default: 0 (integer)
    current_place: "", // Default: "" (string)
    current_area: "",
    current_pincode: "", // Default: "" (string)
    permanent_address: "", // Default: "" (string)
    permanent_district: 0, // Default: 0 (integer)
    permanent_taluka: 0, // Default: 0 (integer)
    permanent_place: "", // Default: "" (string)
    permanent_area: "",
    permanent_pincode: "", // Default: "" (string)
    marital_status: 0, // Default: 0 (integer)
    education_qualification: 0, // Default: 0 (integer)
    details: "", // Default: "" (string)
    guardian: 0, // Default: 0 (integer)
    occupation: 0, // Default: 0 (integer)
    occupation_type: "", // Default: "" (string)
    income: "", // Default: "" (string)
    past_surety_commitment: "", // Default: "" (string)
    past_surety_commitment_detail: "", // Default: "" (string)
    riot_victim: false, // Default: false (boolean)
    natural_calamity_victim: false, // Default: false (boolean)
    disable_person: false, // Default: false (boolean)
    guarantor: 0,
  };

  const initApplications = (applications) => {
    console.log("init applications called: ", applications.length);
    if (applications.length == 0) {
      applications = [
        {
          personalDetails: personalDetailsDefault,
          businessDetails: businessDetailsDefault,
          guarantorPersonalDetails: guarantorPersonalDetailsDefault,
          properties: [],
          licPolicies: [],
          fds: [],
          uploadedDocs: [],
          contacts: [],
        },
      ];
    }
    // if business details is not added, add default business details with id=0
    // if guarantor personal details is not added, add default guarantor personal details with id=0

    applications = applications.map((a) => {
      if (!a.businessDetails.id) {
        a = {
          ...a,
          businessDetails: businessDetailsDefault,
        };
      }
      if (!a.guarantorPersonalDetails.id) {
        a = {
          ...a,
          guarantorPersonalDetails: guarantorPersonalDetailsDefault,
        };
      }
      return { ...a };
    });

    return applications;
  };

  onMount(async () => {
    let {
      error,
      errorMsg,
      applications: lApplications,
    } = await api.getApplications();
    $applications = [...lApplications];

    lApplications = initApplications(lApplications);
    console.log("error: ", error);
    console.log("errorMsg: ", errorMsg);
    console.log("applications: ", lApplications);
    $applications = lApplications;
    await init();
  });

  let identityData = {
    religion: "",
    aadhar: "",
    district_id: 0,
    resident: 0,
    // aadharPart1: "",
    // aadharPart2: "",
    // aadharPart3: "",
    name: "",
    dob: new Date(),
    gender: "",
  };

  let identityErrors = {
    religion: "",
    aadhar: "",
    current_district: "",
    resident: "",
    // aadharPart1: "",
    // aadharPart2: "",
    // aadharPart3: "",
    name: "",
    dob: "",
    gender: "",
  };
  let alertMsg = "";

  const onInputPersonalDetails = (fieldName) => {
    // Trim the mobile input field
    if (fieldName === "mobile") {
      personalDetailsData.mobile = personalDetailsData.mobile.trim(); // Remove any surrounding spaces
    }

    resPersonalDetails = personalDetailSuit(personalDetailsData, fieldName);
    const keys = Object.keys(personalDetailsErrors);
    keys.forEach((key) => {
      personalDetailsErrors[key] = "";
    });

    resPersonalDetails.errors.forEach((e) => {
      personalDetailsErrors[e.fieldName] = e.message;
    });
  };

  function formatDateToSQL(date) {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0"); // Months are 0-based
    const day = String(date.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  }
  const onInputEligible = (fieldName) => {
    // Trim the mobile input field
    // if (fieldName === "mobileNumber") {

    //   otpData.mobileNumber = otpData.mobileNumber.trim(); // Remove any surrounding spaces
    // }
    resValidate = identityValidationSuit(identityData, fieldName);
    const keys = Object.keys(identityErrors);
    keys.forEach((key) => {
      identityErrors[key] = "";
    });

    resValidate.errors.forEach((e) => {
      identityErrors[e.fieldName] = e.message;
    });
  };
  const onSubmitEligible = async () => {
    alertMsg = "";
    const keys = Object.keys(identityErrors);
    keys.forEach((key) => {
      identityErrors[key] = "";
    });
    console.log("identityData: ", identityData);
    resValidate = identityValidationSuit(identityData, "submit");
    console.log("errors: ", resValidate.errors);
    resValidate.errors.forEach((e) => {
      identityErrors[e.fieldName] = e.message;
    });
    if (resValidate.errors.length > 0) {
      alertMsg = "Please attend to errors";
      return;
    }

    personalDetails.religion = Number(identityData.religion);
    personalDetails.resident = identityData.resident;
    // personalDetails.aadhar =
    //   identityData.aadharPart1 +
    //   identityData.aadharPart2 +
    //   identityData.aadharPart3;
    console.log("identityData:", identityData);
    console.log("personalDetails", personalDetails);
    personalDetails.aadhar = identityData.aadhar;
    personalDetails.name = identityData.name;
    personalDetails.dob = formatDateToSQL(identityData.dob);
    personalDetails.gender = Number(identityData.gender);
    personalDetails.district_id = identityData.district_id;
    personalDetails.concent_for_aadhar_verification =
      identityData.concent_for_aadhar_verification;
    // personalDetails.resident = identityData.resident;
    console.log("personalDetails ", personalDetails);
    const {
      error,
      errorMsg,
      personalDetails: lPersonalDetails,
    } = await api.savePersonalDetails({ personalDetails });
    if (error) {
      alertMsg = errorMsg;
      return;
    }
    personalDetails = { ...lPersonalDetails };
    businessDetails.id = personalDetails.id;
    personalDetails.literate = personalDetails.literate;
    personalDetailsData = { ...personalDetails };
    console.log("updated personal details: ", personalDetails);
    next();
  };
  const aadharVerify = async () => {
    console.log("aadhar Verify");
  };

  let guarantorPersonalDetails = {
    guarantorId: "",
    mobile: "",
    email: "",
    pan: "",
    currentAddress: "",
    currentDistrict: "",
    currentTaluka: "",
    currentPlace: "",
    currentArea: "",
    currentPincode: "",
    permanentAddress: "",
    permanentDistrict: "",
    permanentTaluka: "",
    permanentPlace: "",
    permanentArea: "",
    permanentPincode: "",
    maritalStatus: "",
    educationQualification: "",
    details: "",
    guardian: "",
    occupation: "",
    occupationType: "",
    income: "",
    pastSuretyCommitment: "",
    riotVictim: false,
    naturalCalamityVictim: false,
    disabledPerson: false,
  };

  const onSubmitPersonalDetail = async () => {
    // personalDetailsData.literate = ""
    console.log("onSubmitPersonalDetail: ", personalDetailsData);
    alertMsg = "";
    resPersonalDetails = personalDetailSuit(personalDetailsData, "submit");
    const keys = Object.keys(personalDetailsErrors);
    keys.forEach((key) => {
      personalDetailsErrors[key] = "";
    });
    console.log("resPersonalDetails.erros`: ", resPersonalDetails.errors);
    resPersonalDetails.errors.forEach((e) => {
      personalDetailsErrors[e.fieldName] = e.message;
    });

    if (resPersonalDetails.errors.length > 0) {
      console.log("resPersonalDetails.errors: ", resPersonalDetails.errors);
      alertMsg = "Please attend to errors";
      return;
    }
    console.log("personalDetails: ", personalDetails);
    personalDetails = { ...personalDetails, ...personalDetailsData };
    console.log("personalDetails: ", personalDetails);
    const {
      error,
      errorMsg,
      personalDetails: lPersonalDetails,
    } = await api.savePersonalDetails({
      personalDetails,
    });
    if (error) {
      alertMsg = errorMsg;
      return;
    }

    personalDetails = { ...lPersonalDetails };
    businessDetails.id = personalDetails.id;
    console.log("updated personal details: ", personalDetails);

    next();
  };

  const onInputBusinessDetails = (fieldName) => {
    // Trim the mobile input field
    resBusinessDetails = businessDetailSuit(businessDetailsData, fieldName);
    const keys = Object.keys(businessDetailsErrors);
    keys.forEach((key) => {
      businessDetailsErrors[key] = "";
    });

    resBusinessDetails.errors.forEach((e) => {
      businessDetailsErrors[e.fieldName] = e.message;
    });
    businessDetailsErrors = { ...businessDetailsErrors };
  };

  const onInputGuarantorDetails = (fieldName) => {
    // Trim the mobile input field
    console.log("fieldName is ", fieldName);
    console.log("guarantorPersonalDetailsData", guarantorPersonalDetailsData);
    if (fieldName != "applicant") {
      resGuarantorDetails = guarantorDetailSuit(
        guarantorPersonalDetailsData,
        fieldName
      );
      const keys = Object.keys(guarantorPersonalDetailsErrors);
      keys.forEach((key) => {
        guarantorPersonalDetailsErrors[key] = "";
      });

      resGuarantorDetails.errors.forEach((e) => {
        guarantorPersonalDetailsErrors[e.fieldName] = e.message;
      });
      guarantorPersonalDetailsErrors = { ...guarantorPersonalDetailsErrors };
    }
  };

  const onSubmitGuarantorDetail = async () => {
    alertMsg = "";
    console.log("guarantorPersonalDetailsData: ", guarantorPersonalDetailsData);
    if (guarantorPersonalDetailsData.guarantor != 2) {
      console.log("will check errors: ");
      resGuarantorDetails = guarantorDetailSuit(
        guarantorPersonalDetailsData,
        "submit"
      );
      console.log("resGuarantor", resGuarantorDetails);
      const keys = Object.keys(guarantorPersonalDetailsErrors);
      keys.forEach((key) => {
        guarantorPersonalDetailsErrors[key] = "";
      });

      resGuarantorDetails.errors.forEach((e) => {
        guarantorPersonalDetailsErrors[e.fieldName] = e.message;
      });
      if (resGuarantorDetails.errors.length > 0) {
        console.log("errors:", resGuarantorDetails.errors);
        alertMsg = "Please attend to errors";
        return;
      }
    }
    console.log("guarantorPersonalDetails org: ", guarantorPersonalDetails);
    guarantorPersonalDetails = {
      ...guarantorPersonalDetails,
      ...guarantorPersonalDetailsData,
      id: personalDetails.id,
    };
    console.log(
      "onSubmit guarantorPersonalDetails: ",
      guarantorPersonalDetails
    );
    console.log(
      "onSubmit guarantorPersonalDetails.guarantor: ",
      guarantorPersonalDetails.guarantor
    );
    // fixme
    // guarantorPersonalDetails.name = "name";
    // guarantorPersonalDetails.dob = "01-01-2001";
    // guarantorPersonalDetails.gender = 1;
    // guarantorPersonalDetails.religion = 1;
    // guarantorPersonalDetails.aadhar = "111111111111";
    guarantorPersonalDetails.occupation_type = "-----"; //todo
    {
      let inputPersonalDetails = { ...personalDetails };
      inputPersonalDetails.guarantor = guarantorPersonalDetailsData.guarantor;
      const {
        error,
        errorMsg,
        personalDetails: savedPersonalDetails,
      } = await api.savePersonalDetails({
        personalDetails: inputPersonalDetails,
      });
      if (error) {
        alertMsg = errorMsg;
        return;
      }

      personalDetails = { ...savedPersonalDetails };
      personalDetailsData = { ...savedPersonalDetails };
    }
    // no need to save guarantor details if applicant is himself giving collateral
    if (guarantorPersonalDetailsData.guarantor == 2) {
      next();
      return;
    }

    const {
      error,
      errorMsg,
      guarantorPersonalDetails: lGuarantorPersonalDetails,
    } = await api.saveGuarantorPersonalDetails({
      guarantorPersonalDetails,
    });
    if (error) {
      alertMsg = errorMsg;
      return;
    }

    guarantorPersonalDetails = { ...lGuarantorPersonalDetails };
    businessDetails.id = guarantorPersonalDetails.id;
    console.log(
      "updated guarantor personal details: ",
      guarantorPersonalDetails
    );
    next();
  };

  const onSubmitBusinessDetail = async () => {
    console.log("onSubmitBusinessDetail called");
    alertMsg = "";
    resBusinessDetails = businessDetailSuit(businessDetailsData, "submit");
    const keys = Object.keys(businessDetailsErrors);
    keys.forEach((key) => {
      businessDetailsErrors[key] = "";
    });

    resBusinessDetails.errors.forEach((e) => {
      businessDetailsErrors[e.fieldName] = e.message;
    });
    businessDetailsErrors = { ...businessDetailsErrors };

    if (resBusinessDetails.errors.length > 0) {
      alertMsg = "Please attend to errors";
      return;
    }

    let businessDetails = { ...businessDetailsData, id: personalDetails.id };
    console.log("businessDetails 1", businessDetails);

    const propertiesToConvert = [
      "business_district",
      "business_taluka",
      "quotation_amount",
    ];

    propertiesToConvert.forEach((prop) => {
      if (businessDetails[prop]) {
        businessDetails[prop] = Number(businessDetails[prop]); // Convert each property to a number
      }
    });

    console.log("businessDetails 2", businessDetails);
    const {
      error,
      errorMsg,
      businessDetails: lBusinessDetails,
    } = await api.saveBusinessDetails({
      businessDetails,
    });
    if (error) {
      alertMsg = errorMsg;
      return;
    }

    // businessDetails = lBusinessDetails;
    console.log("updated business details: ", businessDetails);
    businessDetailsData = businessDetails;
    next();
  };

  const onInputUploadDocuments = (field) => {};
  const onSubmitUploadDocuments = () => {};

  const onInputInvestmentApplicantDetails = (fieldName) => {
    // Trim the mobile input field
    resInvestmentApplicantDetails = investmentDetailSuit(
      investmentApplicantDetailsData,
      fieldName
    );
    const keys = Object.keys(investmentApplicantDetailsErrors);
    keys.forEach((key) => {
      investmentApplicantDetailsErrors[key] = "";
    });

    resInvestmentApplicantDetails.errors.forEach((e) => {
      investmentApplicantDetailsErrors[e.fieldName] = e.message;
    });
    investmentApplicantDetailsErrors = { ...investmentApplicantDetailsErrors };
  };

  const onSubmitInvestmentApplicantDetail = async () => {
    alertMsg = "";
    resInvestmentApplicantDetails = investmentDetailSuit(
      investmentApplicantDetailsData,
      "submit"
    );
    const keys = Object.keys(investmentApplicantDetailsErrors);
    keys.forEach((key) => {
      investmentApplicantDetailsErrors[key] = "";
    });

    resInvestmentApplicantDetails.errors.forEach((e) => {
      investmentApplicantDetailsErrors[e.fieldName] = e.message;
    });
    console.log(
      "resInvestmentApplicantDetails.errors",
      resInvestmentApplicantDetails.errors
    );
    if (resInvestmentApplicantDetails.errors.length > 0) {
      alertMsg = "Please attend to errors";
      return;
    }
    next();
  };

  const onInputInvestmentGuarantorDetails = (fieldName) => {
    // Trim the mobile input field
    resInvestmentGuarantorDetails = investmentGuarantorDetailSuit(
      investmentGuarantorDetailsData,
      fieldName
    );
    const keys = Object.keys(investmentGuarantorDetailsErrors);
    keys.forEach((key) => {
      investmentGuarantorDetailsErrors[key] = "";
    });

    resInvestmentGuarantorDetails.errors.forEach((e) => {
      investmentGuarantorDetailsErrors[e.fieldName] = e.message;
    });
    investmentGuarantorDetailsErrors = { ...investmentGuarantorDetailsErrors };
  };

  const onSubmitInvestmentGuarantorDetail = async () => {
    alertMsg = "";
    resInvestmentGuarantorDetails = investmentGuarantorDetailSuit(
      investmentGuarantorDetailsData,
      "submit"
    );
    const keys = Object.keys(investmentGuarantorDetailsErrors);
    keys.forEach((key) => {
      investmentGuarantorDetailsErrors[key] = "";
    });

    resInvestmentGuarantorDetails.errors.forEach((e) => {
      investmentGuarantorDetailsErrors[e.fieldName] = e.message;
    });
    if (resInvestmentGuarantorDetails.errors.length > 0) {
      alertMsg = "Please attend to errors";
      return;
    }
  };

  const onInputPropertyResidential = (fieldName) => {
    // Trim the mobile input field
    resPropertyResidentialDetails = propertyResidentialSuit(
      propertyResidentialData,
      fieldName
    );
    const keys = Object.keys(propertyResidentialErrors);
    keys.forEach((key) => {
      propertyResidentialErrors[key] = "";
    });

    resPropertyResidentialDetails.errors.forEach((e) => {
      propertyResidentialErrors[e.fieldName] = e.message;
    });
    propertyResidentialErrors = { ...propertyResidentialErrors };
    if (resPropertyResidentialDetails.errors.length > 0) {
      alertMsg = "Please attend to errors";
      return;
    }
  };

  const onAddProperty = async (e) => {
    console.log("event.detail: ", e.detail);

    const { error, errorMsg, id } = await api.addCollateralProperty({
      property: e.detail,
      application_id: businessDetails.id,
    });
    if (error) {
      return { error, errorMsg };
    }
    {
      const {
        error,
        errorMsg,
        properties: lProperties,
      } = await api.getCollateralProperties({
        application_id: businessDetails.id,
      });
      if (error) {
        return { error, errorMsg };
      }
      console.log("properties after addProperty: ", lProperties);
      properties = [...lProperties];
      return { error: 0, errorMsg: "", properties: lProperties };
    }
  };
  const onSaveProperty = async (e) => {
    console.log("event.detail: ", e.detail);

    const { error, errorMsg, id } = await api.saveCollateralProperty({
      property: e.detail,
      application_id: businessDetails.id,
    });
    if (error) {
      return { error, errorMsg };
    }
    {
      const {
        error,
        errorMsg,
        properties: lProperties,
      } = await api.getCollateralProperties({
        application_id: businessDetails.id,
      });
      if (error) {
        return { error, errorMsg };
      }
      console.log("properties after addProperty: ", lProperties);
      properties = [...lProperties];
      return { error: 0, errorMsg: "", properties: lProperties };
    }
  };
  const onDeleteProperty = async (e) => {
    console.log("event.detail: ", e.detail);
    const { id } = e.detail;
    const { error, errorMsg } = await api.deleteCollateralProperty({
      id,
      application_id: businessDetails.id,
    });
    if (error) {
      return { error, errorMsg };
    }
    {
      const {
        error,
        errorMsg,
        properties: lProperties,
      } = await api.getCollateralProperties({
        application_id: businessDetails.id,
      });
      if (error) {
        return { error, errorMsg };
      }
      console.log("properties after addProperty: ", lProperties);
      properties = [...lProperties];
      return { error: 0, errorMsg: "", properties: lProperties };
    }
  };
  const onDeleteFD = async (e) => {
    console.log("event.detail: ", e.detail);
    const id = e.detail;
    const { error, errorMsg } = await api.deleteCollateralFD({
      id,
      application_id: businessDetails.id,
    });
    console.log("application_id: ", businessDetails.id);
    if (error) {
      return { error, errorMsg };
    }
    {
      const {
        error,
        errorMsg,
        fds: lFds,
      } = await api.getCollateralFDs({
        application_id: businessDetails.id,
      });
      if (error) {
        return { error, errorMsg };
      }
      console.log("properties after delete fd: ", lFds);
      fds = [...lFds];
      return { error: 0, errorMsg: "", fds: lFds };
    }
  };

  const onAddFD = async (e) => {
    console.log("event.detail: ", e.detail);

    const { error, errorMsg, id } = await api.addCollateralFD({
      fd: e.detail,
      application_id: businessDetails.id,
    });
    if (error) {
      return { error, errorMsg };
    }
    {
      const {
        error,
        errorMsg,
        fds: lFds,
      } = await api.getCollateralFDs({
        application_id: businessDetails.id,
      });
      if (error) {
        return { error, errorMsg };
      }
      console.log("properties after addFD: ", lFds);
      fds = [...lFds];
      return { error: 0, errorMsg: "", fds: lFds };
    }
  };

  const onSaveFD = async (e) => {
    console.log("onSaveFD event.detail: ", e.detail);

    const { error, errorMsg, id } = await api.saveCollateralFD({
      fd: e.detail,
      application_id: businessDetails.id,
    });
    if (error) {
      return { error, errorMsg };
    }
    {
      const {
        error,
        errorMsg,
        fds: lFds,
      } = await api.getCollateralFDs({
        application_id: businessDetails.id,
      });
      if (error) {
        return { error, errorMsg };
      }
      console.log("properties after addFD: ", lFds);
      fds = [...lFds];
      return { error: 0, errorMsg: "", fds: lFds };
    }
  };
  const onAddLICPolicy = async (e) => {
    console.log("event.detail: ", e.detail);
    const { error, errorMsg, id } = await api.addCollateralLICPolicy({
      licPolicy: e.detail,
      application_id: businessDetails.id,
    });
    if (error) {
      return { error, errorMsg };
    }
    {
      const {
        error,
        errorMsg,
        licPolicies: lLicPolicies,
      } = await api.getCollateralLICPolicies({
        application_id: businessDetails.id,
      });
      if (error) {
        return { error, errorMsg };
      }
      licPolicies = [...lLicPolicies];
      console.log("properties after add lic policy: ", lLicPolicies);
      return { error: 0, errorMsg: "", licPolicies: lLicPolicies };
    }
  };
  const onDeleteLICPolicy = async (e) => {
    console.log("event.detail: ", e.detail);
    const id = e.detail;
    const { error, errorMsg } = await api.deleteCollateralLICPolicy({
      id,
      application_id: businessDetails.id,
    });
    console.log("application_id: ", businessDetails.id);
    if (error) {
      return { error, errorMsg };
    }
    {
      const {
        error,
        errorMsg,
        licPolicies: lLicPolicies,
      } = await api.getCollateralLICPolicies({
        application_id: businessDetails.id,
      });
      if (error) {
        return { error, errorMsg };
      }
      licPolicies = [...lLicPolicies];
      console.log("properties after delete lic policies: ", licPolicies);
      return { error: 0, errorMsg: "", licPolicies };
    }
  };

  const onSaveLICPolicy = async (e) => {
    console.log("onSaveFD event.detail: ", e.detail);

    const { error, errorMsg, id } = await api.saveCollateralLICPolicy({
      licPolicy: e.detail,
      application_id: businessDetails.id,
    });
    if (error) {
      return { error, errorMsg };
    }
    {
      const {
        error,
        errorMsg,
        licPolicies: lLicPolicies,
      } = await api.getCollateralLICPolicies({
        application_id: businessDetails.id,
      });
      if (error) {
        return { error, errorMsg };
      }
      console.log("properties after addLicPolicies: ", lLicPolicies);
      licPolicies = [...lLicPolicies];
      return { error: 0, errorMsg: "", licPolicies: lLicPolicies };
    }
  };

  const onSubmitCollateralDetail = async () => {
    alertMsg = "";
    const totalPropertyValue = properties
      .map((p) => parseFloat(p.property_value))
      .reduce((sum, value) => sum + value, 0);

    const totalLicPoliciesValue = licPolicies
      .map((l) => parseFloat(l.surrender_value))
      .reduce((sum, value) => sum + value, 0);

    const totalFdsValue = fds
      .map((f) => parseFloat(f.amount))
      .reduce((sum, value) => sum + value, 0);

    const CollateralAmount =
      totalPropertyValue + totalLicPoliciesValue + totalFdsValue;
    console.log("CollateralAmount", CollateralAmount);

    console.log("businessDetails", businessDetails);
    console.log("businessDetailsData", businessDetailsData);
    const businessLoanAmount = businessDetailsData.loan_amount;
    let loanAmount = parseInt(businessLoanAmount);

    console.log("loanAmount", loanAmount);

    if (loanAmount > CollateralAmount) {
      alertMsg = `Collateral Amount ${CollateralAmount} is must be greater than Loan Amount :${loanAmount}`;
      return;
    }
    next();
  };

  let activeStep = 0;

  let steps = [
    {
      id: 1,
      name: "IDENTITY PRE-CHECK",
      marathi_name: "ओळख पूर्व-तपासणी",
      path: "M80-160v-112q0-33 17-62t47-44q51-26 115-44t141-18q30 0 58.5 3t55.5 9l-70 70q-11-2-21.5-2H400q-71 0-127.5 17T180-306q-9 5-14.5 14t-5.5 20v32h250l80 80H80Zm542 16L484-282l56-56 82 82 202-202 56 56-258 258ZM400-480q-66 0-113-47t-47-113q0-66 47-113t113-47q66 0 113 47t47 113q0 66-47 113t-113 47Zm10 240Zm-10-320q33 0 56.5-23.5T480-640q0-33-23.5-56.5T400-720q-33 0-56.5 23.5T320-640q0 33 23.5 56.5T400-560Zm0-80Z",
    },
    {
      id: 2,
      name: "PERSONAL DETAILS",
      marathi_name: "वैयक्तिक तपशील",
      path: "M160-80q-33 0-56.5-23.5T80-160v-440q0-33 23.5-56.5T160-680h200v-120q0-33 23.5-56.5T440-880h80q33 0 56.5 23.5T600-800v120h200q33 0 56.5 23.5T880-600v440q0 33-23.5 56.5T800-80H160Zm0-80h640v-440H600q0 33-23.5 56.5T520-520h-80q-33 0-56.5-23.5T360-600H160v440Zm80-80h240v-18q0-17-9.5-31.5T444-312q-20-9-40.5-13.5T360-330q-23 0-43.5 4.5T276-312q-17 8-26.5 22.5T240-258v18Zm320-60h160v-60H560v60Zm-200-60q25 0 42.5-17.5T420-420q0-25-17.5-42.5T360-480q-25 0-42.5 17.5T300-420q0 25 17.5 42.5T360-360Zm200-60h160v-60H560v60ZM440-600h80v-200h-80v200Zm40 220Z",
    },
    {
      id: 3,
      name: "BUSINESS & BANKING INFO",
      marathi_name: "व्यवसाय आणि बँकिंग माहिती",
      path: "M160-120q-33 0-56.5-23.5T80-200v-440q0-33 23.5-56.5T160-720h160v-80q0-33 23.5-56.5T400-880h160q33 0 56.5 23.5T640-800v80h160q33 0 56.5 23.5T880-640v440q0 33-23.5 56.5T800-120H160Zm240-600h160v-80H400v80Zm400 360H600v80H360v-80H160v160h640v-160Zm-360 0h80v-80h-80v80Zm-280-80h200v-80h240v80h200v-200H160v200Zm320 40Z",
    },
    {
      id: 4,
      name: "GUARANTOR DETAILS",
      marathi_name: "जामीनदार तपशील",
      path: "M531-260h96v-3L462-438l1-3h10q54 0 89.5-33t43.5-77h40v-47h-41q-3-15-10.5-28.5T576-653h70v-47H314v57h156q26 0 42.5 13t22.5 32H314v47h222q-6 20-23 34.5T467-502H367v64l164 178ZM480-80q-83 0-156-31.5T197-197q-54-54-85.5-127T80-480q0-83 31.5-156T197-763q54-54 127-85.5T480-880q83 0 156 31.5T763-763q54 54 85.5 127T880-480q0 83-31.5 156T763-197q-54 54-127 85.5T480-80Zm0-80q134 0 227-93t93-227q0-134-93-227t-227-93q-134 0-227 93t-93 227q0 134 93 227t227 93Zm0-320Z",
    },
    {
      id: 5,
      name: "COLLATERAL DETAILS",
      marathi_name: "तारण तपशील",
      path: "M531-260h96v-3L462-438l1-3h10q54 0 89.5-33t43.5-77h40v-47h-41q-3-15-10.5-28.5T576-653h70v-47H314v57h156q26 0 42.5 13t22.5 32H314v47h222q-6 20-23 34.5T467-502H367v64l164 178ZM480-80q-83 0-156-31.5T197-197q-54-54-85.5-127T80-480q0-83 31.5-156T197-763q54-54 127-85.5T480-880q83 0 156 31.5T763-763q54 54 85.5 127T880-480q0 83-31.5 156T763-197q-54 54-127 85.5T480-80Zm0-80q134 0 227-93t93-227q0-134-93-227t-227-93q-134 0-227 93t-93 227q0 134 93 227t227 93Zm0-320Z",
    },
    {
      id: 6,
      name: "UPLOAD",
      marathi_name: "अपलोड",
      path: "M260-160q-91 0-155.5-63T40-377q0-78 47-139t123-78q25-92 100-149t170-57q117 0 198.5 81.5T760-520q69 8 114.5 59.5T920-340q0 75-52.5 127.5T740-160H520q-33 0-56.5-23.5T440-240v-206l-64 62-56-56 160-160 160 160-56 56-64-62v206h220q42 0 71-29t29-71q0-42-29-71t-71-29h-60v-80q0-83-58.5-141.5T480-720q-83 0-141.5 58.5T280-520h-20q-58 0-99 41t-41 99q0 58 41 99t99 41h100v80H260Zm220-280Z",
    },
  ];

  function next() {
    window.scrollTo({ top: 0, behavior: "smooth" });
    if (activeStep < steps.length - 1) {
      activeStep++;
    }
  }

  function prev() {
    window.scrollTo({ top: 0, behavior: "smooth" });
    if (activeStep > 0) {
      activeStep--;
    }
  }
</script>

{#if dataLoaded}
  <div class="py-3 border border-deepPurple-300 my-5 mx-5">
    <div class="flex">
      {#each steps as step, index}
        <div class="w-1/6">
          <div class="relative mb-2">
            {#if index > 0}
              <div
                class="absolute flex items-center"
                style="width: calc(100% - 0.5rem - 1rem); top: 50%; transform: translate(-50%, -50%)"
              >
                <div
                  class="w-full bg-gray-100 rounded items-center flex-1 border lg:mx-4 md:mx-2 {index <=
                  activeStep
                    ? 'border-deepPurple-600'
                    : 'border-deepPurple-200'}"
                >
                  <div
                    class="bg-deepPurple-300 lg:py-1 md:py-0.5 py-px rounded"
                    style="width: {index <= activeStep ? '100%' : '0%'};"
                  />
                </div>
              </div>
            {/if}
            <div
              class="lg:size-10 md:size-7 size-5 mx-auto border {index <=
              activeStep
                ? 'bg-deepPurple-300 border-deepPurple-600'
                : 'bg-deepPurple-50 border-deepPurple-200'} rounded-full text-lg text-white flex items-center"
            >
              <span class="text-center w-full">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 -960 960 960"
                  class="w-full md:size-5 size-3 mx-auto {index <= activeStep
                    ? 'fill-white'
                    : 'fill-gray-500'}"
                >
                  <path d={step.path} />
                </svg>
              </span>
            </div>
          </div>
          <div
            class="text-[5px] md:text-[10px] lg:text-sm text-center xl:text-base text-gray-600"
          >
            <div>
              {step.name} -
            </div>
            <div>
              {step.marathi_name}
            </div>
          </div>
        </div>
      {/each}
    </div>
  </div>
  <div class="mt-5">
    <div>
      {#if activeStep === 0}
        <div
          in:fly={{ x: 1000, duration: 500 }}
          out:fly={{ x: -1000, duration: 500 }}
        >
          <Eligible
            {alertMsg}
            bind:data={identityData}
            bind:errors={identityErrors}
            {contacts}
            onInput={onInputEligible}
            onSubmit={onSubmitEligible}
            {aadharVerify}
          />
        </div>
      {:else if activeStep === 1}
        <div
          in:fly={{ x: 1000, duration: 500 }}
          out:fly={{ x: -1000, duration: 500 }}
        >
          <pre>

        <!-- {JSON.stringify(personalDetails, null, 2)} -->
        </pre>
          <PersonalDetails
            bind:data={personalDetailsData}
            bind:errors={personalDetailsErrors}
            {alertMsg}
            onInput={onInputPersonalDetails}
            onSubmit={onSubmitPersonalDetail}
            handleBackButtonClick={prev}
          />
        </div>
      {:else if activeStep === 2}
        <div
          in:fly={{ x: 1000, duration: 500 }}
          out:fly={{ x: -1000, duration: 500 }}
        >
          <!-- <BusinessDetails bind:businessDetails {handleButtonClick} {handleBackButtonClick} /> -->
          <BusinessDetails
            bind:data={businessDetailsData}
            bind:errors={businessDetailsErrors}
            onInput={onInputBusinessDetails}
            onSubmit={onSubmitBusinessDetail}
            handleBackButtonClick={prev}
          />
        </div>
      {:else if activeStep === 3}
        <div
          in:fly={{ x: 1000, duration: 500 }}
          out:fly={{ x: -1000, duration: 500 }}
        >
          <!-- handleButtonClick={next} -->
          <!-- handleBackButtonClick={prev} -->
          <Guarantor
            bind:data={guarantorPersonalDetailsData}
            bind:errors={guarantorPersonalDetailsErrors}
            {alertMsg}
            onInput={onInputGuarantorDetails}
            onSubmit={onSubmitGuarantorDetail}
            handleBackButtonClick={prev}
          />
        </div>
      {:else if activeStep === 4}
        <div
          in:fly={{ x: 1000, duration: 500 }}
          out:fly={{ x: -1000, duration: 500 }}
        >
          {#key properties}
            <LoanCollateral
              {properties}
              {fds}
              {licPolicies}
              on:addProperty={onAddProperty}
              on:saveProperty={onSaveProperty}
              on:deleteProperty={onDeleteProperty}
              on:addFD={onAddFD}
              on:saveFD={onSaveFD}
              on:deleteFD={onDeleteFD}
              on:addLICPolicy={onAddLICPolicy}
              on:saveLICPolicy={onSaveLICPolicy}
              on:deleteLICPolicy={onDeleteLICPolicy}
              handleBackButtonClick={prev}
              onSubmit={onSubmitCollateralDetail}
              {alertMsg}
            />
          {/key}
        </div>
        <!-- <div transition:fly={{ x: -1000, duration: 500 }}>
          <InvestmentSummary
            bind:data={investmentApplicantDetailsData}
            bind:errors={investmentApplicantDetailsErrors}
            onInput={onInputInvestmentApplicantDetails}
            onSubmit={onSubmitInvestmentApplicantDetail}
            bind:guarantorData={investmentGuarantorDetailsData}
            bind:guarantorErrors={investmentGuarantorDetailsErrors}
            onGuarantorInput={onInputInvestmentGuarantorDetails}
            onGuarantorSubmit={onSubmitInvestmentGuarantorDetail}
            handleButtonClick={next}
            handleBackButtonClick={prev}
          />
          <pre>
            fds: {JSON.stringify(fds, null, 2)}
          </pre>
        </div> -->
      {:else if activeStep === 5}
        <div
          in:fly={{ x: 1000, duration: 500 }}
          out:fly={{ x: -1000, duration: 500 }}
        >
          <UploadDocuments
            {personalDetails}
            {businessDetails}
            {properties}
            {fds}
            {licPolicies}
            {guarantorPersonalDetails}
            data={uploadedDocsData}
            errors={uploadedDocsErrors}
            onInput={onInputUploadDocuments}
            onSubmit={onSubmitUploadDocuments}
            handleBackButtonClick={prev}
            on:fetchUploads={onFetchUploads}
          />
        </div>
      {/if}
    </div>
  </div>
{:else}
  <div>...Loading</div>
{/if}
