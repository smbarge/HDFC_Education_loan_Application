let recheckServer = import.meta.env.VITE_RECHECK_API_SERVER;
import { token, refreshToken, user } from "$appstore/store.js";
import { get } from "svelte/store";

const getTokenAndRefreshToken = () => {
  const currentToken = get(token);
  const currentRefreshToken = get(refreshToken);
  return { token: currentToken, refreshToken: currentRefreshToken };
};

const addAddress = async ({ userId, seatNo, exam, address }) => {
  const { token, refreshToken } = getTokenAndRefreshToken();
  try {
    let url = new URL(
      `${recheckServer}/recheck/address/${userId}/${seatNo}/${exam}`
    );
    const params = { userId, seatNo, exam, address };
    let reply = await fetch(url.toString(), {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(params),
    });

    if (!(reply.status >= 200 && reply.status <= 300)) {
      console.log("status is: ", reply.status);
      const { error, errorMsg } = await reply.json();
      return { error, errorMsg };
    }
    const { error, errorMsg, success, recheckVerificationApplication } =
      await reply.json();
    return { error, errorMsg, success, recheckVerificationApplication };
  } catch (e) {
    console.log("recheckApi.addAddress failed with error :", e);
    return { error: -1, errorMsg: e };
  }
};

const getAddress = async ({ userId }) => {
  const { token, refreshToken } = getTokenAndRefreshToken();
  try {
    let url = new URL(`${recheckServer}/recheck/address/${userId}`);
    let reply = await fetch(url.toString(), {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    if (!(reply.status >= 200 && reply.status <= 300)) {
      console.log("status is: ", reply.status);
      const { error, errorMsg } = await reply.json();
      return { error, errorMsg };
    }
    const { error, errorMsg, address } =
      await reply.json();
    return { error, errorMsg, address };
  } catch (e) {
    console.log("recheckApi.getAddress failed with error :", e);
    return { error: -1, errorMsg: e };
  }
};

const patchAddress = async ({ userId, address }) => {
  const { token, refreshToken } = getTokenAndRefreshToken();
  try {
    console.log('patchAddress', address)
    let url = new URL(
      `${recheckServer}/recheck/address/updateAddress/${userId}`
    );
    const params = { userId };
    let reply = await fetch(url.toString(), {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ ...address }),
    });

    if (!(reply.status >= 200 && reply.status <= 300)) {
      console.log("status is: ", reply.status);
      const { error, errorMsg } = await reply.json();
      return { error, errorMsg };
    }
    const { error, errorMsg } =
      await reply.json();
    return { error, errorMsg };
  } catch (e) {
    console.log("recheckApi.patchAddress failed with error :", e);
    return { error: -1, errorMsg: e };
  }
};

const patchEmail = async ({ userId, seatNo, exam, email }) => {
  const { token, refreshToken } = getTokenAndRefreshToken();
  try {
    let url = new URL(
      `${recheckServer}/recheck/email/${userId}/${seatNo}/${exam}`
    );
    const params = { userId, seatNo, exam };
    let reply = await fetch(url.toString(), {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ email }),
    });

    if (!(reply.status >= 200 && reply.status <= 300)) {
      console.log("status is: ", reply.status);
      const { error, errorMsg } = await reply.json();
      return { error, errorMsg };
    }
    const { error, errorMsg, success, recheckVerificationApplication } =
      await reply.json();
    return { error, errorMsg, success, recheckVerificationApplication };
  } catch (e) {
    console.log("patchEmail failed with error :", e);
    return { error: -1, errorMsg: e };
  }
};

const patchMobileNo = async ({ userId, seatNo, exam, mobileNo }) => {
  const { token, refreshToken } = getTokenAndRefreshToken();
  try {
    let url = new URL(
      `${recheckServer}/recheck/mobile/${userId}/${seatNo}/${exam}`
    );
    const params = { userId, seatNo, exam };
    let reply = await fetch(url.toString(), {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ mobileNo }),
    });

    if (!(reply.status >= 200 && reply.status <= 300)) {
      console.log("status is: ", reply.status);
      const { error, errorMsg } = await reply.json();
      return { error, errorMsg };
    }
    const { error, errorMsg, success, recheckVerificationApplication } =
      await reply.json();
    return { error, errorMsg, success, recheckVerificationApplication };
  } catch (e) {
    console.log("patchMobileNo failed with error :", e);
    return { error: -1, errorMsg: e };
  }
};

const getResult = async ({ userId }) => {
  console.log("userId is: ", userId);
  const { token, refreshToken } = getTokenAndRefreshToken();
  try {
    let url = new URL(`${recheckServer}/result/${userId}`);
    let reply = await fetch(url.toString(), {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    if (!(reply.status >= 200 && reply.status <= 300)) {
      console.log("status is: ", reply.status);
      const { error, errorMsg } = await reply.json();
      return { error, errorMsg };
    }
    const { error, errorMsg, success, result } = await reply.json();
    console.log("getResult returned : ", result);
    return { error, errorMsg, success, result };
  } catch (e) {
    console.log("recheckApi.getResult failed with error :", e);
    return { error: -1, errorMsg: e };
  }
};

const addRecheckApplication = async ({ recheckApplication }) => {
  const { token, refreshToken } = getTokenAndRefreshToken();
  const { seatNo, recheckType, subjectCodes, deliveryType, addressId, clientTransId, sabpaisaTransId } = recheckApplication;
  try {
    console.log('seatNo', seatNo, 'recheckType', recheckType, 'subjectCodes', subjectCodes, 'addressId', addressId)
    let url = new URL(`${recheckServer}/recheck/application`);
    let reply = await fetch(url.toString(), {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ seatNo, recheckType, subjectCodes, deliveryType, addressId, clientTransId, sabpaisaTransId }),
    });

    if (!(reply.status >= 200 && reply.status < 300)) {
      console.log("status is: ", reply.status);
      const { error, errorMsg } = await reply.json();
      return { error, errorMsg };
    }
    const { error, errorMsg, recheckApplication } = await reply.json();
    console.log("recheckApplication returned : ", recheckApplication);
    return { error, errorMsg, recheckApplication };
  } catch (e) {
    console.log("recheckApi.recheckApplication failed with error :", e);
    return { error: -1, errorMsg: e };
  }
};

const getRecheckApplicationsByUserId = async ({ userId }) => {
  const { token, refreshToken } = getTokenAndRefreshToken();
  try {
    console.log("userId is ..", userId);
    let url = new URL(`${recheckServer}/recheck/application/${userId}`);
    let reply = await fetch(url.toString(), {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    if (!(reply.status >= 200 && reply.status <= 300)) {
      console.log("status is: ", reply.status);
      const { error, errorMsg } = await reply.json();
      return { error, errorMsg };
    }
    const { error, errorMsg, recheckApplications } = await reply.json();
    return { error, errorMsg, recheckApplications };
  } catch (e) {
    console.log("recheckApi.recheckApplications failed with error :", e);
    return { error: -1, errorMsg: e };
  }
};

const getSubjectMaster = async ({ }) => {
  const { token, refreshToken } = getTokenAndRefreshToken();
  console.log("getSubjectMaster: token: ", token);
  try {
    let url = new URL(`${recheckServer}/subjectMaster`);
    console.log('url is getSubjectMaster .././', url)
    let reply = await fetch(url.toString(), {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    if (!(reply.status >= 200 && reply.status <= 300)) {
      console.log("status is: ", reply.status);
      const { error, errorMsg } = await reply.json();
      return { error, errorMsg };
    }
    const { error, errorMsg, subjectCodes } = await reply.json();
    return { error, errorMsg, subjectCodes };
  } catch (e) {
    console.log("recheckApi.getSubjectMaster failed with error :", e);
    return { error: -1, errorMsg: e };
  }
};

const SaveAddressBySeatNo = async ({ userId, address }) => {
  const { token, refreshToken } = getTokenAndRefreshToken();
  console.log(`userId : ${userId} address:${JSON.stringify(address)}`)
  try {
    let url = new URL(`${recheckServer}/recheck/address/${userId}`);
    let reply = await fetch(url.toString(), {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ address }),
    });

    if (!(reply.status >= 200 && reply.status < 300)) {
      console.log("status is: ", reply.status);
      const { error, errorMsg } = await reply.json();
      return { error, errorMsg };
    }
    const { error, errorMsg, addressId } = await reply.json();
    console.log("SaveAddressBySeatNo returned : ", addressId);
    return { error, errorMsg, addressId };
  } catch (e) {
    console.log("recheckApi.SaveAddressBySeatNo failed with error :", e);
    return { error: -1, errorMsg: e };
  }
};

const getDivisionInfoByUserId = async ({ userId }) => {
  const { token, refreshToken } = getTokenAndRefreshToken();
  console.log("getDivisionInfoByUserId: token: ", token);
  try {
    let url = new URL(`${recheckServer}/recheck/address/divisionInfoByUserId/${userId}`);
    let reply = await fetch(url.toString(), {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    if (!(reply.status >= 200 && reply.status <= 300)) {
      console.log("status is: ", reply.status);
      const { error, errorMsg } = await reply.json();
      return { error, errorMsg };
    }
    const { error, errorMsg, divisionInfo } = await reply.json();
    return { error, errorMsg, divisionInfo };
  } catch (e) {
    console.log("recheckApi.getDivisionInfoByUserId failed with error :", e);
    return { error: -1, errorMsg: e };
  }
};

const getUserInfo = async ({ userId }) => {
  const { token, refreshToken } = getTokenAndRefreshToken();
  try {
    let url = new URL(`${recheckServer}/user/${userId}`);
    let reply = await fetch(url.toString(), {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    if (!(reply.status >= 200 && reply.status <= 300)) {
      console.log("status is: ", reply.status);
      const { error, errorMsg } = await reply.json();
      return { error, errorMsg };
    }
    const { error, errorMsg, userInfo } =
      await reply.json();
    return { error, errorMsg, userInfo };
  } catch (e) {
    console.log("recheckApi.getUserInfo failed with error :", e);
    return { error: -1, errorMsg: e };
  }
};

const makePayment = async ({ userId, recheckType, amount, udf3, payerName, payerEmail, payerMobile }) => {
  const { token, refreshToken } = getTokenAndRefreshToken();
  let params = {
    udf3,
    payerName,
    payerEmail,
    payerMobile
  }
  try {
    let url = new URL(`${recheckServer}/recheck/payment/${userId}/${recheckType}/${amount}`);
    let reply = await fetch(url.toString(), {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(params)
    });

    if (!(reply.status >= 200 && reply.status <= 300)) {
      console.log("status is: ", reply.status);
      const { error, errorMsg } = await reply.json();
      return { error, errorMsg };
    }
    const { error, errorMsg, encData, clientCode, options } =
      await reply.json();
    return { error, errorMsg, encData, clientCode, options };
  } catch (e) {
    console.log("recheckApi makepayment failed with error :", e);
    return { error: -1, errorMsg: e };
  }
};

const saveInsertResponse = async ({ userId, responseData }) => {
  const { token, refreshToken } = getTokenAndRefreshToken();
  let params = {
    responseData
  }
  try {
    let url = new URL(`${recheckServer}/recheck/payment/paymentResponse/${userId}`);
    let reply = await fetch(url.toString(), {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(params)
    });

    if (!(reply.status >= 200 && reply.status <= 300)) {
      console.log("status is: ", reply.status);
      const { error, errorMsg } = await reply.json();
      return { error, errorMsg };
    }
    const { error, errorMsg, response } =
      await reply.json();
    return { error, errorMsg, response };
  } catch (e) {
    console.log("recheckApi saveInsertResponse failed with error :", e);
    return { error: -1, errorMsg: e };
  }
};

export let recheckApi = {
  addAddress,
  getAddress,
  patchAddress,
  patchEmail,
  patchMobileNo,
  getResult,
  addRecheckApplication,
  getRecheckApplicationsByUserId,
  getSubjectMaster,
  SaveAddressBySeatNo,
  getDivisionInfoByUserId,
  getUserInfo,
  makePayment,
  saveInsertResponse
};
