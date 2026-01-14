let authApiServer = import.meta.env.VITE_AUTH_API_SERVER;
import { token, refreshToken, username, id } from "$appstore/store.js";
import { get } from "svelte/store";

const getTokenAndRefreshToken = () => {
  const currentToken = get(token);
  const currentRefreshToken = get(refreshToken);
  const currentUsername = get(username);
  const currentId = get(id);

  return {
    token: currentToken,
    refreshToken: currentRefreshToken,
    username: currentUsername,
    id: currentId,
  };
};

// const verifyApplicantAndSendOtp = async ({ mobile, name }) => {
//   console.log("verifyApplicantAndSendOtp called ##1 mobileNo: ", mobile);
//   try {
//     let url = new URL(
//       `${authApiServer}/api/auth/signup/verifyApplicantAndSendOtp`
//     );
//     const params = { mobile, name };
//     let reply = await fetch(url.toString(), {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json",
//       },
//       body: JSON.stringify(params),
//     });

//     if (!(reply.status >= 200 && reply.status < 300)) {
//       const { error, errorMsg } = await reply.json();
//       return { error, errorMsg };
//     }

//     const { error, errorMsg, mobileVerificationId } = await reply.json();
//     console.log("mobileverificationcodeId--- ", mobileVerificationId);
//     return { error, errorMsg, mobileVerificationId };
//   } catch (e) {
//     console.log("authApi.verifyApplicantAndSendOtp failed with error :", e);
//     return { error: -1, errorMsg: e };
//   }
// };

const verifyApplicantAndSendOtp = async ({ mobile, name }) => {
  console.log("verifyApplicantAndSendOtp called ##1 mobileNo: ", mobile);
  try {
    const { error, errorMsg, userId } = await getUserId({ mobile });
    if (error == 0) {
      return {
        error: -1,
        errorMsg: `user with mobile number ${mobile} already registered`,
      };
    }
    const params = { mobileNumber: mobile,name };

    let url = `/termloan/api/sendOTP`;
    let reply = await fetch(url.toString(), {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(params),
    });
    if (!(reply.status >= 200 && reply.status < 300)) {
      const { error, errorMsg } = await reply.json();
      return { error, errorMsg };
    }

    {
      const { error, errorMsg, uid: mobileVerificationId } = await reply.json();
      console.log("mobileConfirmationId--- ", mobileVerificationId);
      return { error, errorMsg, mobileVerificationId };
    }
  } catch (e) {
    console.log("authApi.verifyApplicantAndSendOtp failed with error :", e);
    return { error: -1, errorMsg: e };
  }
};

const verifyOtp = async ({ mobileVerificationId, otp, mobileNumber }) => {
  console.log(
    "verifyOtp called ##1 mobileNo: ",
    otp,
    "mobileVerificationId: ",
    mobileVerificationId
  );
  try {
    const response = await fetch("/termloan/api/verifyOTP", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        otp,
        uid: mobileVerificationId,
        mobile: mobileNumber,
      }),
    });
    const { error, errorMsg } = await response.json();
    return { error, errorMsg, mobileConfirmationId: mobileVerificationId };
  } catch (e) {
    console.log("authApi.verifyOtp failed with error :", e);
    return { error: -1, errorMsg: e };
  }
};

const getKeycloakToken = async () => {
  const url =
    "https://keycloak.chanakyasoft.com/realms/fat/protocol/openid-connect/token";

  const params = new URLSearchParams();
  // params.append("grant_type", "password"); // Change this if needed
  // params.append("client_id", "admin-cli");
  // params.append("username", "admin");
  // params.append("password", "Admin@2024");
  params.append("grant_type", "client_credentials"); // Change this if needed
  params.append("client_id", "admin-cli");
  params.append("client_secret", "6IK6vGWtVtx5SZrLGiRf8c4H6MUMLAPi");
  try {
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: params,
    });

    if (response.ok) {
      const data = await response.json();
      console.log("Access Token:", data.access_token);
      return { error: 0, errorMsg: "", accessToken: data.access_token };
    } else {
      console.error("Error fetching token:", response.statusText);
      return { error: -1, errorMsg: response.statusText };
    }
  } catch (error) {
    console.error("Error:", error);
    return { error: -1, errorMsg: error };
  }
};
async function createUserInRealmFat({ token, mobile, name, password }) {
  console.log("token is: ", token);
  const url = "https://keycloak.chanakyasoft.com/admin/realms/fat/users";
  const userData = {
    username: mobile, // Change to the desired username
    enabled: true,
    firstName: name,
    lastName: "--",
    email: `${mobile}@example.com`,
    attributes: {
      mobile: [mobile],
    },
    credentials: [
      {
        type: "password",
        value: password,
        temporary: false,
      },
    ],
  };

  try {
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`, // Include the access token
      },
      body: JSON.stringify(userData),
    });

    if (response.ok) {
      console.log("User created successfully");
      return { error: 0, errorMsg: "" };
    } else {
      console.error("Error creating user:", response.statusText);
      return {
        error: -1,
        errorMsg: `failed to create user ${response.statusText}`,
      };
    }
  } catch (error) {
    console.error("Error:", error);
    return {
      error: -1,
      errorMsg: `exception is creating user ${error}`,
    };
  }
}

const verifyApplicant = async ({
  mobile,
  name,
  password,
  mobileConfirmationCode,
}) => {
  console.log(
    "verifyApplicant called ##1 mobileConfirmationCode: ",
    mobileConfirmationCode
  );
  try {
    let token;
    {
      const { error, errorMsg, accessToken } = await getKeycloakToken();
      console.log(
        "error, errorMsg, accessToken: ",
        error,
        errorMsg,
        accessToken
      );
      if (error) {
        return { error, errorMsg };
      }
      token = accessToken;
    }
    {
      const { error, errorMsg } = await createUserInRealmFat({
        token,
        mobile,
        name,
        password,
      });
      if (error) {
        return { error, errorMsg };
      }
    }
    return { error: 0, errorMsg: "", mobileConfirmationCode: "" };
  } catch (e) {
    console.log("authApi.verifyApplicant failed with error :", e);
    return { error: -1, errorMsg: e };
  }
};

async function changePasswordKeycloak({ token, mobile, password, userId }) {
  // Now, reset the user's password
  try {
    const resetResponse = await fetch(
      `https://keycloak.chanakyasoft.com/admin/realms/fat/users/${userId}/reset-password`,
      {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          type: "password",
          temporary: false,
          value: password,
        }),
      }
    );

    if (resetResponse.ok) {
      return { error: 0, errorMsg: "" };
    } else {
      return { error: -1, errorMsg: "Failed to reset password" };
    }
  } catch (e) {
    return { error: -2, errorMsg: `Exception in resetting password ${e}` };
  }
}

const changePassword = async ({ uid, mobile, password, userId }) => {
  console.log(
    "changePassword called ##1 mobileConfirmationCode: ",
    mobile,
    uid,
    password
  );
  try {
    let token;
    {
      const { error, errorMsg, accessToken } = await getKeycloakToken();
      console.log(
        "error, errorMsg, accessToken: ",
        error,
        errorMsg,
        accessToken
      );
      if (error) {
        return { error, errorMsg };
      }
      token = accessToken;
    }
    {
      const { error, errorMsg } = await changePasswordKeycloak({
        token,
        mobile,
        password,
        userId,
      });
      if (error) {
        return { error, errorMsg };
      }
    }
    return { error: 0, errorMsg: "" };
  } catch (e) {
    console.log("authApi.verifyApplicant failed with error :", e);
    return { error: -1, errorMsg: e };
  }
};

const loginApplicant = async ({ mobile, password }) => {
  console.log("loginApplicant called with mobile: ", mobile, password);
  try {
    let url = new URL(`${authApiServer}/api/auth/signin/loginApplicant`);
    const params = { mobile, password };

    let reply = await fetch(url.toString(), {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(params),
    });

    if (!(reply.status >= 200 && reply.status < 300)) {
      const { error, errorMsg } = await reply.json();
      return { error, errorMsg };
    }

    const { error, errorMsg, user, token, refreshToken } = await reply.json();
    return { error, errorMsg, user, token, refreshToken };
  } catch (e) {
    console.log("authApi.loginApplicant failed with error :", e);
    return { error: -1, errorMsg: e.message };
  }
};

const refreshAuthToken = async () => {
  console.log("refreshAuthToken called");
  const currentRefreshToken = get(refreshToken);

  if (!currentRefreshToken) {
    throw new Error("No refresh token available");
  }

  let url = new URL(`${authApiServer}/api/auth/signin/token`);
  const response = await fetch(url.toString(), {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ refreshToken: currentRefreshToken }),
  });

  if (!response.ok) {
    throw new Error("Failed to refresh token");
  }

  const data = await response.json();
  token.set(data.token); // Update the token store
  refreshToken.set(data.refreshToken); // Update the refresh token store
  console.log("updated token and refreshToken");

  return true;
};
const personalDetails = async (personalDetails) => {
  try {
    const { token, refreshToken, username } = getTokenAndRefreshToken();
    let url = new URL(`${authApiServer}/api/application/personalDetails`);
    const params = {
      username,
      personalDetails,
    };
    const options = {};
    options.headers = {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    };
    options.method = "POST";
    options.body = JSON.stringify(params);
    let reply = await fetch(url.toString(), options);
    if (reply.status === 401) {
      // Token might be expired, try refreshing
      const refreshed = await refreshAuthToken();
      if (refreshed) {
        // Retry the original request with the new token
        const { token } = getTokenAndRefreshToken();
        options.headers["Authorization"] = `Bearer ${token}}`;
        reply = await fetch(url.toString(), options);
      }
    }

    if (!(reply.status >= 200 && reply.status < 300)) {
      const { error, errorMsg } = await reply.json();
      return { error, errorMsg };
    }

    const {
      personalDetails: lPersonalDetails,
      error,
      errorMsg,
    } = await reply.json();
    return { personalDetails: lPersonalDetails, error, errorMsg };
  } catch (e) {
    console.log("submitPersonalDetails failed with error:", e);
    return { error: -1, errorMsg: e.message };
  }
};

const businessDetails = async (businessDetails) => {
  try {
    const { token, refreshToken, username, id } = getTokenAndRefreshToken();
    let url = new URL(`${authApiServer}/api/application/businessDetails`);
    const params = {
      username,
      id,
      businessDetails,
    };
    console.log("businessDetails", businessDetails);
    const options = {};
    options.headers = {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    };
    options.method = "POST";
    options.body = JSON.stringify(params);
    let reply = await fetch(url.toString(), options);
    if (reply.status === 401) {
      // Token might be expired, try refreshing
      const refreshed = await refreshAuthToken();
      if (refreshed) {
        // Retry the original request with the new token
        const { token } = getTokenAndRefreshToken();
        options.headers["Authorization"] = `Bearer ${token}}`;
        reply = await fetch(url.toString(), options);
      }
    }

    if (!(reply.status >= 200 && reply.status < 300)) {
      const { error, errorMsg } = await reply.json();
      return { error, errorMsg };
    }

    const {
      businessDetails: lBusinessDetails,
      error,
      errorMsg,
    } = await reply.json();
    return { businessDetails: lBusinessDetails, error, errorMsg };
  } catch (e) {
    console.log("submitBusinessDetails failed with error:", e);
    return { error: -1, errorMsg: e.message };
  }
};

const guarantorPersonalDetails = async (guarantorPersonalDetails) => {
  try {
    const { token, refreshToken, username, id } = getTokenAndRefreshToken();
    let url = new URL(
      `${authApiServer}/api/application/guarantorPersonalDetails`
    );
    const params = {
      username,
      id,
      guarantorPersonalDetails,
    };
    console.log("guarantorPersonalDetails", guarantorPersonalDetails);
    const options = {};
    options.headers = {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    };
    options.method = "POST";
    options.body = JSON.stringify(params);
    let reply = await fetch(url.toString(), options);
    if (reply.status === 401) {
      // Token might be expired, try refreshing
      const refreshed = await refreshAuthToken();
      if (refreshed) {
        // Retry the original request with the new token
        const { token } = getTokenAndRefreshToken();
        options.headers["Authorization"] = `Bearer ${token}}`;
        reply = await fetch(url.toString(), options);
      }
    }

    if (!(reply.status >= 200 && reply.status < 300)) {
      const { error, errorMsg } = await reply.json();
      return { error, errorMsg };
    }

    const {
      guarantorPersonalDetails: lGuarantorPersonalDetails,
      error,
      errorMsg,
    } = await reply.json();
    return {
      guarantorPersonalDetails: lGuarantorPersonalDetails,
      error,
      errorMsg,
    };
  } catch (e) {
    console.log("submitGuarantorPersonalDetails failed with error:", e);
    return { error: -1, errorMsg: e.message };
  }
};

// const InvestmentApplicantDetails = async (investmentDetails) => {
//   try {
//     const { token, refreshToken, username, id } = getTokenAndRefreshToken();
//     let url = new URL(`${authApiServer}/api/application/investmentApplicantDetails`);

//     const params = {
//       username,
//       id,
//       investmentDetails,
//     };

//     const options = {
//       method: "POST",
//       headers: {
//         Authorization: `Bearer ${token}`,
//         "Content-Type": "application/json",
//       },
//       body: JSON.stringify(params),
//     };

//     console.log("Investment Details: ", investmentDetails);

//     let reply = await fetch(url.toString(), options);

//     if (reply.status === 401) {
//       const refreshed = await refreshAuthToken();
//       if (refreshed) {
//         const { token } = getTokenAndRefreshToken();
//         options.headers["Authorization"] = `Bearer ${token}`;
//         reply = await fetch(url.toString(), options);
//       }
//     }

//     if (!(reply.status >= 200 && reply.status < 300)) {
//       const { error, errorMsg } = await reply.json();
//       return { error, errorMsg };
//     }

//     const { applicantDetails, error, errorMsg } = await reply.json();
//     return { applicantDetails, error, errorMsg };

//   } catch (e) {
//     console.log("submitInvestmentApplicantDetails failed with error:", e);
//     return { error: -1, errorMsg: e.message };
//   }
// };

const InvestmentApplicantDetails = async (investmentDetails) => {
  try {
    const { token, refreshToken, username, id } = getTokenAndRefreshToken();
    const url = new URL(
      `${authApiServer}/api/application/investmentApplicantDetails`
    );
    const params = {
      username,
      id,
      investmentDetails,
    };

    const options = {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      method: "POST",
      body: JSON.stringify(params),
    };

    let reply = await fetch(url.toString(), options);

    if (reply.status === 401) {
      // Token might be expired, try refreshing
      const refreshed = await refreshAuthToken();
      if (refreshed) {
        const { token } = getTokenAndRefreshToken();
        options.headers["Authorization"] = `Bearer ${token}`;
        reply = await fetch(url.toString(), options);
      }
    }

    if (!(reply.status >= 200 && reply.status < 300)) {
      const { error, errorMsg } = await reply.json();
      console.log("Error:", error);
      console.log("Error Message:", errorMsg);
      return { error, errorMsg };
    }

    const {
      applicantDetails: lapplicantDetails,
      error,
      errorMsg,
    } = await reply.json();
    return { applicantDetails: lapplicantDetails, error, errorMsg };
  } catch (e) {
    console.log("submitInvestmentApplicantDetails failed with error:", e);
    return { error: -1, errorMsg: e.message };
  }
};

const InvestmentGuarantorDetails = async (investmentGuarantorDetails) => {
  try {
    const { token, refreshToken, username, id } = getTokenAndRefreshToken();
    const url = new URL(
      `${authApiServer}/api/application/investmentGuarantorDetails`
    );
    const params = {
      username,
      id,
      investmentGuarantorDetails,
    };

    const options = {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      method: "POST",
      body: JSON.stringify(params),
    };

    let reply = await fetch(url.toString(), options);

    if (reply.status === 401) {
      // Token might be expired, try refreshing
      const refreshed = await refreshAuthToken();
      if (refreshed) {
        const { token } = getTokenAndRefreshToken();
        options.headers["Authorization"] = `Bearer ${token}`;
        reply = await fetch(url.toString(), options);
      }
    }

    if (!(reply.status >= 200 && reply.status < 300)) {
      const { error, errorMsg } = await reply.json();
      console.log("Error:", error);
      console.log("Error Message:", errorMsg);
      return { error, errorMsg };
    }

    const {
      guarantorDetails: lguarantorDetails,
      error,
      errorMsg,
    } = await reply.json();
    return { guarantorDetails: lguarantorDetails, error, errorMsg };
  } catch (e) {
    console.log("submitInvestmentGuarantorDetails failed with error:", e);
    return { error: -1, errorMsg: e.message };
  }
};

const getUserId = async ({ mobile }) => {
  try {
    let token;
    {
      const { error, errorMsg, accessToken } = await getKeycloakToken();
      console.log(
        "error, errorMsg, accessToken: ",
        error,
        errorMsg,
        accessToken
      );
      if (error) {
        return { error, errorMsg };
      }
      token = accessToken;
    }
    {
      const userResponse = await fetch(
        `https://keycloak.chanakyasoft.com/admin/realms/fat/users?username=${mobile}`,
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const users = await userResponse.json();
      console.log("users is ",users);
      
      
      if (users.length > 0) {
        const userId = users[0].id;
        const name=users[0].firstName // Extract user ID
        console.log("User ID:", userId);
        return { error: 0, errorMsg: "", userId ,name};
      } else {
        console.log("User not found");
        return { error: -1, errorMsg: "User not found, please enter registered mobile number" };
      }
    }
  } catch (e) {
    return { error: -2, errorMsg: e };
  }
};

//MAIN
// Custom Registration - Send OTP----------------------

const customVerifyApplicantAndSendOtp = async ({ mobile, name }) => {
  console.log("customVerifyApplicantAndSendOtp called with mobile:", mobile);
  try {

    
    // Use GET request to check if user exists
    const checkResponse = await fetch(`/termloan/api/auth?action=checkUser&mobile=${mobile}`, {  
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      }
    });

    const checkData = await checkResponse.json();
    
    // If user exists, return error and DON'T send OTP
    if (checkData.error === 0) {
      return {
        error: -1,
        errorMsg: `User with mobile number ${mobile} already registered. Please login.`,
      };
    }

    // Only send OTP if user does NOT exist
    const params = { mobileNumber: mobile, name };
    let url = `/termloan/api/sendOTP`;
    let reply = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(params),
    });

    if (!(reply.status >= 200 && reply.status < 300)) {
      const { error, errorMsg } = await reply.json();
      return { error, errorMsg };
    }

    const { error, errorMsg, uid: mobileVerificationId } = await reply.json();
    console.log("mobileVerificationId---", mobileVerificationId);
    return { error, errorMsg, mobileVerificationId };
  } catch (e) {
    console.log("customVerifyApplicantAndSendOtp failed with error:", e);
    return { error: -1, errorMsg: e.message };
  }
};

// Custom Registration
const customVerifyApplicant = async ({ mobile, name, password, mobileConfirmationCode }) => {
  console.log("customVerifyApplicant called with mobile:", mobile);
  try {
    const response = await fetch('/termloan/api/auth', {  
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        mobile,
        name,
        password,
        otp: mobileConfirmationCode,
        action: 'register'
      }),
    });

    const data = await response.json();
    
    if (data.error && data.error !== 0) {
      return { error: data.error, errorMsg: data.errorMsg };
    }

    console.log('User registered successfully');
    return { error: 0, errorMsg: "", mobileConfirmationCode: "" };
  } catch (e) {
    console.log("customVerifyApplicant failed with error:", e);
    return { error: -1, errorMsg: e.message };
  }
};

// Custom Login
const customLoginApplicant = async ({ mobile, password }) => {
  console.log("customLoginApplicant called with mobile:", mobile);
  try {
    const response = await fetch('/termloan/api/auth', {  
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ 
        mobile, 
        password,
        action: 'login'
      }),
    });

    const data = await response.json();
    
    if (data.error && data.error !== 0) {
      return { error: data.error, errorMsg: data.errorMsg };
    }

    console.log('Login successful');
    return {
      error: 0,
      errorMsg: "",
      user: data.user,
      token: data.access_token,
      refreshToken: data.refresh_token,
    };
  } catch (e) {
    console.log("customLoginApplicant failed with error:", e);
    return { error: -1, errorMsg: e.message };
  }
};

// Custom Get User ID
const customGetUserId = async ({ mobile }) => {
  try {
    const response = await fetch('/termloan/api/auth', {  
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ 
        mobile,
        action: 'getUserByMobile'
      }),
    });

    const data = await response.json();
    
    if (data.error && data.error !== 0) {
      return { error: data.error, errorMsg: data.errorMsg };
    }

    return {
      error: 0,
      errorMsg: "",
      userId: data.userId,
      name: data.name,
    };
  } catch (e) {
    console.log("customGetUserId failed with error:", e);
    return { error: -2, errorMsg: e.message };
  }
};

// Custom Change Password
const customChangePassword = async ({ mobile, password, userId }) => {
  console.log("customChangePassword called for mobile:", mobile);
  try {
    const response = await fetch('/termloan/api/auth', { 
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ 
        mobile, 
        password, 
        userId,
        action: 'changePassword'
      }),
    });

    const data = await response.json();
    
    if (data.error && data.error !== 0) {
      return { error: data.error, errorMsg: data.errorMsg };
    }

    return { error: 0, errorMsg: "" };
  } catch (e) {
    console.log("customChangePassword failed with error:", e);
    return { error: -1, errorMsg: e.message };
  }
};

export let authApi = {
  verifyApplicantAndSendOtp: customVerifyApplicantAndSendOtp, // C
  verifyOtp,
  verifyApplicant: customVerifyApplicant, // C
  loginApplicant: customLoginApplicant, // C
  personalDetails,
  businessDetails,
  guarantorPersonalDetails,
  InvestmentApplicantDetails,
  InvestmentGuarantorDetails,
  changePassword: customChangePassword, // C
  getUserId: customGetUserId, // C
};
