import { userId, username, token } from "$appstore/store"; // Adjust path based on your structure


let currentUserId = "";
let currentUsername = "";
let userToken = "";

// Subscribe to the store to get the current userId
userId.subscribe((value) => {
  currentUserId = value;
});

username.subscribe((value) => {
  // currentUsername = value;
  currentUsername = value;
});

token.subscribe((value) => {
  // currentUsername = value;
  userToken = value;
});

const getMasters = async () => {
  try {
    const response = await fetch("/termloan/api/masters"); // Call the API endpoint
    if (response.ok) {
      const { error, errorMsg, masters } = await response.json(); // Parse the response as JSON
      return { error, errorMsg, masters };
    } else {
      return { error: -1, errorMsg: "failed to get masters" };
    }
  } catch (err) {
    const errorMsg = "An error occurred while fetching religion data";
    return { error: -1, errorMsg };
    console.error(err);
  }
};

const getApplications = async () => {
  try {
    console.log("getApplications called", currentUserId, userToken);
    let url = `/termloan/api/applications/${currentUsername}`;

    const method = "GET";

    let reply = await fetch(url.toString(), {
      method,
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${userToken}`,
      },
    });
    console.log(reply.status);

    if (!(reply.status >= 200 && reply.status < 300)) {
      const { error, errorMsg } = await reply.json();
      return { error, errorMsg };
    }

    if (reply.ok) {
      const { error, errorMsg, applications } = await reply.json();
      return { error, errorMsg, applications };
    } else {
      return { error: -1, errorMsg: "failed to getApplications" };
    }
  } catch (err) {
    const errorMsg = "An error occurred while fetching applications";
    console.error(err);
    return { error: -1, errorMsg };
  }
};

const savePersonalDetails = async ({ personalDetails }) => {
  try {
    let url = `/termloan/api/applications/${currentUsername}`;
    const method = personalDetails.id ? "PUT" : "POST";
    console.log("personalDetails: ", personalDetails);
    const params = {
      personalDetails,
      user: currentUsername,
      userId: currentUserId,
    };

    let reply = await fetch(url.toString(), {
      method,
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${userToken}`,
      },
      body: JSON.stringify(params),
    });

    if (!(reply.status >= 200 && reply.status < 300)) {
      const { error, errorMsg } = await reply.json();
      return { error, errorMsg };
    }

    if (reply.ok) {
      const { error, errorMsg, personalDetails } = await reply.json(); // Parse the response as JSON
      return { error, errorMsg, personalDetails };
    } else {
      return { error: -1, errorMsg: "failed to save personalDetails" };
    }
  } catch (err) {
    const errorMsg = "An error occurred while saving personalDetails";
    console.error(err);
    return { error: -1, errorMsg };
  }
};

const saveBusinessDetails = async ({ businessDetails }) => {
  try {
    let url = `/termloan/api/applications/${currentUsername}`;
    const method = "PUT";

    const params = {
      businessDetails,
      user: currentUsername,
      userId: currentUserId,
    };

    let reply = await fetch(url.toString(), {
      method,
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${userToken}`,
      },
      body: JSON.stringify(params),
    });

    if (!(reply.status >= 200 && reply.status < 300)) {
      const { error, errorMsg } = await reply.json();
      return { error, errorMsg };
    }

    if (reply.ok) {
      const { error, errorMsg, businessDetails } = await reply.json(); // Parse the response as JSON
      return { error, errorMsg, businessDetails };
    } else {
      return { error: -1, errorMsg: "failed to save businessDetails" };
    }
  } catch (err) {
    const errorMsg = "An error occurred while saving businessDetails";
    console.error(err);
    return { error: -1, errorMsg };
  }
};

const saveGuarantorPersonalDetails = async ({ guarantorPersonalDetails }) => {
  try {
    let url = `/termloan/api/applications/${currentUsername}`;
    const method = "PUT";

    const params = {
      guarantorPersonalDetails,
      user: currentUsername,
      userId: currentUserId,
    };

    let reply = await fetch(url.toString(), {
      method,
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${userToken}`,
      },
      body: JSON.stringify(params),
    });

    if (!(reply.status >= 200 && reply.status < 300)) {
      const { error, errorMsg } = await reply.json();
      return { error, errorMsg };
    }

    if (reply.ok) {
      const { error, errorMsg, guarantorPersonalDetails } = await reply.json(); // Parse the response as JSON
      return { error, errorMsg, guarantorPersonalDetails };
    } else {
      return { error: -1, errorMsg: "failed to saveGuarantorPersonalDetails " };
    }
  } catch (err) {
    const errorMsg =
      "An error occurred while saving saveGuarantorPersonalDetails";
    console.error(err);
    return { error: -1, errorMsg };
  }
};

const addCollateralProperty = async ({ property, application_id }) => {
  try {
    let url = `/termloan/api/applications/${currentUsername}/property`;
    const method = "POST";

    const body = {
      application_id,
      property,
      user: currentUsername,
      userId: currentUserId,
    };

    // console.log("property: ", property);
    // console.log("id: ", application_id);
    // console.log("user: ", currentUsername);
    // console.log("userId: ", currentUserId);

    let reply = await fetch(url, {
      method,
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${userToken}`,
      },
      body: JSON.stringify(body),
    });

    if (!(reply.status >= 200 && reply.status < 300)) {
      const { error, errorMsg } = await reply.json();
      return { error, errorMsg };
    }

    if (reply.ok) {
      const { error, errorMsg, id } = await reply.json(); // Parse the response as JSON
      return { error, errorMsg, id };
    } else {
      return { error: -1, errorMsg: "failed to add property " };
    }
  } catch (err) {
    const errorMsg = "An error occurred in adding property";
    console.error(err);
    return { error: -1, errorMsg };
  }
};

const getCollateralProperties = async ({ application_id }) => {
  try {
    let url = `/termloan/api/applications/${currentUsername}/property/${application_id}`;
    const method = "GET";

    let reply = await fetch(url, {
      method,
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${userToken}`,
      },
    });

    if (!(reply.status >= 200 && reply.status < 300)) {
      const { error, errorMsg } = await reply.json();
      return { error, errorMsg };
    }

    if (reply.ok) {
      const { error, errorMsg, properties } = await reply.json(); // Parse the response as JSON
      return { error, errorMsg, properties };
    } else {
      return { error: -1, errorMsg: "failed to get application properties" };
    }
  } catch (err) {
    const errorMsg = "An error occurred in fetching collateral properties";
    console.error(err);
    return { error: -1, errorMsg };
  }
};

const saveCollateralProperty = async ({ application_id, property }) => {
  try {
    let url = `/termloan/api/applications/${currentUsername}/property/${application_id}`;
    const method = "PUT";

    const body = {
      application_id,
      property,
      user: currentUsername,
      userId: currentUserId,
    };

    // console.log("property: ", property);
    // console.log("id: ", application_id);
    // console.log("user: ", currentUsername);
    // console.log("userId: ", currentUserId);

    let reply = await fetch(url, {
      method,
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${userToken}`,
      },
      body: JSON.stringify(body),
    });

    if (!(reply.status >= 200 && reply.status < 300)) {
      const { error, errorMsg } = await reply.json();
      return { error, errorMsg };
    }

    if (reply.ok) {
      const { error, errorMsg, id } = await reply.json(); // Parse the response as JSON
      return { error, errorMsg, id };
    } else {
      return { error: -1, errorMsg: "failed to add property " };
    }
  } catch (err) {
    const errorMsg = "An error occurred in adding property";
    console.error(err);
    return { error: -1, errorMsg };
  }
};


const deleteCollateralProperty = async ({ application_id, id }) => {
  try {
    let url = `/termloan/api/applications/${currentUsername}/property/${application_id}/${id}`;
    const method = "DELETE";

    let reply = await fetch(url, {
      method,
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${userToken}`,
      },
    });

    if (!(reply.status >= 200 && reply.status < 300)) {
      const { error, errorMsg } = await reply.json();
      return { error, errorMsg };
    }

    if (reply.ok) {
      const { error, errorMsg } = await reply.json(); // Parse the response as JSON
      return { error, errorMsg, id };
    } else {
      return { error: -1, errorMsg: "failed to add property " };
    }
  } catch (err) {
    const errorMsg = "An error occurred in adding property";
    console.error(err);
    return { error: -1, errorMsg };
  }
};
const addCollateralFD = async ({ fd, application_id }) => {
  try {
    let url = `/termloan/api/applications/${currentUsername}/fd`;
    const method = "POST";

    const body = {
      application_id,
      fd,
      user: currentUsername,
      userId: currentUserId,
    };

    let reply = await fetch(url, {
      method,
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${userToken}`,
      },
      body: JSON.stringify(body),
    });

    if (!(reply.status >= 200 && reply.status < 300)) {
      const { error, errorMsg } = await reply.json();
      return { error, errorMsg };
    }

    if (reply.ok) {
      const { error, errorMsg, id } = await reply.json(); // Parse the response as JSON
      return { error, errorMsg, id };
    } else {
      return { error: -1, errorMsg: "failed to add fd " };
    }
  } catch (err) {
    const errorMsg = "An error occurred in adding fd";
    console.error(err);
    return { error: -1, errorMsg };
  }
};

const getCollateralFDs = async ({ application_id }) => {
  try {
    let url = `/termloan/api/applications/${currentUsername}/fd/${application_id}`;
    const method = "GET";

    let reply = await fetch(url, {
      method,
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${userToken}`,
      },
    });

    if (!(reply.status >= 200 && reply.status < 300)) {
      const { error, errorMsg } = await reply.json();
      return { error, errorMsg };
    }

    if (reply.ok) {
      const { error, errorMsg, fds } = await reply.json(); // Parse the response as JSON
      return { error, errorMsg, fds };
    } else {
      return { error: -1, errorMsg: "failed to get fds " };
    }
  } catch (err) {
    const errorMsg = "An error occurred in getting fds";
    console.error(err);
    return { error: -1, errorMsg };
  }
};
const saveCollateralFD = async ({ fd, application_id }) => {
  try {
    let url = `/termloan/api/applications/${currentUsername}/fd/${application_id}`;
    const method = "PUT";

    const body = {
      application_id,
      fd,
      user: currentUsername,
      userId: currentUserId,
    };

    let reply = await fetch(url, {
      method,
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${userToken}`,
      },
      body: JSON.stringify(body),
    });

    if (!(reply.status >= 200 && reply.status < 300)) {
      const { error, errorMsg } = await reply.json();
      return { error, errorMsg };
    }

    if (reply.ok) {
      const { error, errorMsg, id } = await reply.json(); // Parse the response as JSON
      return { error, errorMsg, id };
    } else {
      return { error: -1, errorMsg: "failed to add fd " };
    }
  } catch (err) {
    const errorMsg = "An error occurred in adding fd";
    console.error(err);
    return { error: -1, errorMsg };
  }
};
const deleteCollateralFD = async ({ application_id, id }) => {
  try {
    let url = `/termloan/api/applications/${currentUsername}/fd/${application_id}/${id}`;
    const method = "DELETE";

    let reply = await fetch(url, {
      method,
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${userToken}`,
      },
    });

    if (!(reply.status >= 200 && reply.status < 300)) {
      const { error, errorMsg } = await reply.json();
      return { error, errorMsg };
    }

    if (reply.ok) {
      const { error, errorMsg } = await reply.json(); // Parse the response as JSON
      return { error, errorMsg, id };
    } else {
      return { error: -1, errorMsg: "failed to delete fd" };
    }
  } catch (err) {
    const errorMsg = "An error occurred in deleting fd";
    console.error(err);
    return { error: -1, errorMsg };
  }
};

const addCollateralLICPolicy = async ({ licPolicy, application_id }) => {
  try {
    let url = `/termloan/api/applications/${currentUsername}/licPolicy`;
    const method = "POST";

    const body = {
      application_id,
      licPolicy,
      user: currentUsername,
      userId: currentUserId,
    };

    let reply = await fetch(url, {
      method,
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${userToken}`,
      },
      body: JSON.stringify(body),
    });

    if (!(reply.status >= 200 && reply.status < 300)) {
      const { error, errorMsg } = await reply.json();
      return { error, errorMsg };
    }

    if (reply.ok) {
      const { error, errorMsg, id } = await reply.json(); // Parse the response as JSON
      return { error, errorMsg, id };
    } else {
      return { error: -1, errorMsg: "failed to add lic policy " };
    }
  } catch (err) {
    const errorMsg = "An error occurred in adding lic policy";
    console.error(err);
    return { error: -1, errorMsg };
  }
};

const getCollateralLICPolicies = async ({ application_id }) => {
  try {
    let url = `/termloan/api/applications/${currentUsername}/licPolicy/${application_id}`;
    const method = "GET";

    let reply = await fetch(url, {
      method,
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${userToken}`,
      },
    });

    if (!(reply.status >= 200 && reply.status < 300)) {
      const { error, errorMsg } = await reply.json();
      return { error, errorMsg };
    }

    if (reply.ok) {
      const { error, errorMsg, licPolicies } = await reply.json(); // Parse the response as JSON
      return { error, errorMsg, licPolicies };
    } else {
      return { error: -1, errorMsg: "failed to get lic policies " };
    }
  } catch (err) {
    const errorMsg = "An error occurred in getting lic policies";
    console.error(err);
    return { error: -1, errorMsg };
  }
};

const deleteCollateralLICPolicy = async ({ application_id, id }) => {
  try {
    let url = `/termloan/api/applications/${currentUsername}/licPolicy/${application_id}/${id}`;
    const method = "DELETE";

    let reply = await fetch(url, {
      method,
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${userToken}`,
      },
    });

    if (!(reply.status >= 200 && reply.status < 300)) {
      const { error, errorMsg } = await reply.json();
      return { error, errorMsg };
    }

    if (reply.ok) {
      const { error, errorMsg } = await reply.json(); // Parse the response as JSON
      return { error, errorMsg, id };
    } else {
      return { error: -1, errorMsg: "failed to delete fd" };
    }
  } catch (err) {
    const errorMsg = "An error occurred in deleting fd";
    console.error(err);
    return { error: -1, errorMsg };
  }
};

const saveCollateralLICPolicy = async ({ licPolicy, application_id }) => {
  try {
    let url = `/termloan/api/applications/${currentUsername}/licPolicy/${application_id}`;
    const method = "PUT";

    const body = {
      application_id,
      licPolicy,
      user: currentUsername,
      userId: currentUserId,
    };

    let reply = await fetch(url, {
      method,
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${userToken}`,
      },
      body: JSON.stringify(body),
    });

    if (!(reply.status >= 200 && reply.status < 300)) {
      const { error, errorMsg } = await reply.json();
      return { error, errorMsg };
    }

    if (reply.ok) {
      const { error, errorMsg, id } = await reply.json(); // Parse the response as JSON
      return { error, errorMsg, id };
    } else {
      return { error: -1, errorMsg: "failed to add licPolicy " };
    }
  } catch (err) {
    const errorMsg = "An error occurred in adding licPolicy";
    console.error(err);
    return { error: -1, errorMsg };
  }
};
const confirmForm = async ({ application_id,final_confirmation }) => {
  try {
    let url = `/termloan/api/applications/${currentUsername}/updateFormStatus/${application_id}`;
    const method = "POST";

    const body = {
      application_id,
      user: currentUsername,
      userId: currentUserId,
      application_status: 2,
      final_confirmation,
    };
    let reply = await fetch(url, {
      method,
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${userToken}`,
      },
      body: JSON.stringify(body),
    });

    if (!(reply.status >= 200 && reply.status < 300)) {
      const { error, errorMsg } = await reply.json();
      return { error, errorMsg };
    }

    if (reply.ok) {
      const { error, errorMsg, formNo } = await reply.json(); // Parse the response as JSON
      return { error, errorMsg, formNo };
    } else {
      return { error: -1, errorMsg: "failed to confirm the form" };
    }
  } catch (err) {
    const errorMsg = "exception in confirming the form";
    console.error(err);
    return { error: -1, errorMsg };
  }
};
const reConfirmForm = async ({ application_id, iteration }) => {
  try {
    let url = `/termloan/api/applications/${currentUsername}/updateFormStatus/${application_id}`;
    const method = "POST";

    const body = {
      application_id,
      user: currentUsername,
      userId: currentUserId,
      application_status: 2,
      iteration,
      verification_status: "00",
    };
    let reply = await fetch(url, {
      method,
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${userToken}`,
      },
      body: JSON.stringify(body),
    });

    if (!(reply.status >= 200 && reply.status < 300)) {
      const { error, errorMsg } = await reply.json();
      return { error, errorMsg };
    }

    if (reply.ok) {
      const { error, errorMsg, formNo } = await reply.json(); // Parse the response as JSON
      return { error, errorMsg, formNo };
    } else {
      return { error: -1, errorMsg: "failed to confirm the form" };
    }
  } catch (err) {
    const errorMsg = "exception in confirming the form";
    console.error(err);
    return { error: -1, errorMsg };
  }
};
const getAnswers = async ({ application_id, status }) => {
  try {
    let url = `/termloan/api/applicationStatus/${application_id}-${status}`;
    const method = "GET";

    let reply = await fetch(url, {
      method,
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${userToken}`,
      },
    });

    if (!(reply.status >= 200 && reply.status < 300)) {
      const { error, errorMsg } = await reply.json();
      return { error, errorMsg };
    }

    if (reply.ok) {
      const {
        error,

        errorMsg,
        iteration,
        application_id,
        status,
        answers,
      } = await reply.json(); // Parse the response as JSON
      return { error, errorMsg, iteration, application_id, status, answers };
    } else {
      return { error: -1, errorMsg: "failed to get getAnswers " };
    }
  } catch (err) {
    const errorMsg = "An error occurred in getting getAnswers";
    console.error(err);
    return { error: -1, errorMsg };
  }
};

const getUploadDocs = async ({ application_id }) => {
  try {
    let url = `/termloan/api/uploadDocsView/${application_id}`;
    const method = "GET";

    let reply = await fetch(url, {
      method,
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${userToken}`,
      },
    });

    if (!(reply.status >= 200 && reply.status < 300)) {
      const { error, errorMsg, documents } = await reply.json();
      return { error, errorMsg };
    }

    if (reply.ok) {
      const { error, errorMsg, documents } = await reply.json();
      return { error, errorMsg, documents };
    }
  } catch (err) {
    return { error: -1, errorMsg: `Exception is getUploadDocs` };
  }
};

const saveReuploadDocsData = async ({
  application_id,
  iteration,
  tableName,
  data,
}) => {
  try {
    let url = `/termloan/api/reUploadData/aadharCardInfo`;
    const method = "POST";

    const body = {
      application_id,
      iteration,
      tableName,
      data,
    };
    let reply = await fetch(url, {
      method,
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${userToken}`,
      },
      body: JSON.stringify(body),
    });

    if (!(reply.status >= 200 && reply.status < 300)) {
      const { error, errorMsg } = await reply.json();
      return { error, errorMsg };
    }

    if (reply.ok) {
      const { error, errorMsg } = await reply.json(); // Parse the response as JSON
      return { error, errorMsg };
    } else {
      return { error: -1, errorMsg: "failed to confirm the form" };
    }
  } catch (err) {
    const errorMsg = "exception in confirming the form";
    console.error(err);
    return { error: -1, errorMsg };
  }
};

const getAadharDetails = async ({ application_id }) => {
  try {
    let url = `/termloan/api/reUploadData/aadharCardInfo?application_id=${application_id}`;
    const method = "GET";

    let reply = await fetch(url, {
      method,
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${userToken}`,
      },
    });

    if (!(reply.status >= 200 && reply.status < 300)) {
      const { error, errorMsg, details } = await reply.json();
      return { error, errorMsg };
    }

    if (reply.ok) {
      const { error, errorMsg, details } = await reply.json();
      return { error, errorMsg, details };
    }
  } catch (err) {
    return { error: -1, errorMsg: `Exception is getUploadDocs` };
  }
};

const sendSubmitEmail = async ({
  id,
  email,
  applicantName,
  applicationDate,
  quotationAmount,
  buisnessName,
  districtName,
}) => {
  try {
    let url = `/termloan/api/sendSubmitEmail`;
    const method = "POST";

    const body = {
      id,
      email,
      applicantName,
      applicationDate,
      quotationAmount,
      buisnessName,
      districtName,
    };
    let reply = await fetch(url, {
      method,
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${userToken}`,
      },
      body: JSON.stringify(body),
    });

    if (!(reply.status >= 200 && reply.status < 300)) {
      const { error, errorMsg } = await reply.json();
      return { error, errorMsg };
    }

    if (reply.ok) {
      const { error, errorMsg } = await reply.json(); // Parse the response as JSON
      return { error, errorMsg };
    } else {
      return { error: -1, errorMsg: "failed to confirm the form" };
    }
  } catch (err) {
    const errorMsg = "exception in confirming the form";
    console.error(err);
    return { error: -1, errorMsg };
  }
};

const getSanctionDetails = async ({ applicationId }) => {
  try {
    let url = `/termloan/api/sanctionInfo?application_id=${applicationId}`;
    const method = "GET";

    let reply = await fetch(url, {
      method,
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${userToken}`,
      },
    });

    if (!(reply.status >= 200 && reply.status < 300)) {
      const { error, errorMsg, details } = await reply.json();
      return { error, errorMsg };
    }

    if (reply.ok) {

      const {response} =
        await reply.json();

      const { error, errorMsg, districtDetails, sanctionDetails } =response
        
    console.log("sanction details in applicationStatus",sanctionDetails);
      return { error, errorMsg, districtDetails, sanctionDetails };
    }
  } catch (err) {
    return { error: -1, errorMsg: `Exception is getUploadDocs` };
  }
};

export let api = {
  getMasters,
  getApplications,
  savePersonalDetails,
  saveGuarantorPersonalDetails,
  saveBusinessDetails,
  addCollateralProperty,
  getCollateralProperties,
  saveCollateralProperty,
  deleteCollateralProperty,
  addCollateralFD,
  getCollateralFDs,
  saveCollateralFD,
  deleteCollateralFD,
  addCollateralLICPolicy,
  getCollateralLICPolicies,
  deleteCollateralLICPolicy,
  saveCollateralLICPolicy,
  confirmForm,
  reConfirmForm,
  getAnswers,
  getUploadDocs,
  saveReuploadDocsData,
  getAadharDetails,
  sendSubmitEmail,
  getSanctionDetails,
};
