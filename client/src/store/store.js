import { writable } from "svelte/store";
import { browser } from "$app/environment";

export const token = writable((browser && localStorage.getItem("token")) || "");
export const userId = writable(
  (browser && localStorage.getItem("userId")) || ""
);

export const refreshToken = writable(
  browser && localStorage.getItem("refreshToken")
);
export const username = writable(browser && localStorage.getItem("username"));

export const id = writable(browser && localStorage.getItem("id"));

function persistStore(key, initialValue) {
  if (!browser) return writable(initialValue); // Return writable with default if SSR

  // Get the stored value from localStorage (if it exists)
  const storedValue = localStorage.getItem(key);
  const parsedValue = storedValue ? JSON.parse(storedValue) : initialValue;

  // Create a writable store with the parsed value or initial value
  const store = writable(parsedValue);

  // Subscribe to the store, and update localStorage whenever the value changes
  store.subscribe((value) => {
    if (browser) {
      localStorage.setItem(key, JSON.stringify(value));
    }
  });

  return store;
}
// function persistStore(key, initialValue) {
//   if (!browser) return;
//   // Get the stored value from localStorage (if it exists)
//   const storedValue = localStorage.getItem(key);
//   const parsedValue = storedValue ? JSON.parse(storedValue) : initialValue;

//   // Create a writable store with the parsed value or initial value
//   const store = writable(parsedValue);

//   // Subscribe to the store, and update localStorage whenever the value changes
//   store.subscribe((value) => {
//     localStorage.setItem(key, JSON.stringify(value));
//   });

//   return store;
// }

export const registrationInfo = persistStore("registrationInfo", {
  name: "",
  mobile: "",
  mobileVerificationId: "",
  mobileConfirmationCode: "",
  token: "",
  refreshToken: "",
});
// export const masters = persistStore("masters", {});
export const masters = persistStore("masters", { m_upload_documents: [] });
export const applications = persistStore("applications", []);

username.subscribe((value) => {
  if (browser) {
    if (value) {
      localStorage.setItem("username", value);
    } else {
      localStorage.removeItem("username");
    }
  }
});

id.subscribe((value) => {
  if (browser) {
    if (value) {
      localStorage.setItem("id", value);
    } else {
      localStorage.removeItem("id");
    }
  }
});

token.subscribe((value) => {
  if (browser) {
    if (value) {
      localStorage.setItem("token", value);
    } else {
      localStorage.removeItem("token");
    }
  }
});
refreshToken.subscribe((value) => {
  if (browser) {
    if (value) {
      localStorage.setItem("refreshToken", value);
    } else {
      localStorage.removeItem("refreshToken");
    }
  }
});
// store values for name of logged in user
export const given_name = writable(
  browser && localStorage.getItem("given_name")
);
export const preferred_username = writable(
  browser && localStorage.getItem("preferred_username")
);

given_name.subscribe((value) => {
  if (browser) {
    if (value) {
      localStorage.setItem("given_name", value);
    } else {
      localStorage.removeItem("given_name");
    }
  }
});
// store values for mobile of logged in user
preferred_username.subscribe((value) => {
  if (browser) {
    if (value) {
      localStorage.setItem("preferred_username", value);
    } else {
      localStorage.removeItem("preferred_username");
    }
  }
});

export const formSubmitted = writable(
  browser && localStorage.getItem("formSubmitted")
);
formSubmitted.subscribe((value) => {
  if (browser) {
    if (value) {
      localStorage.setItem("formSubmitted", value);
    } else {
      localStorage.removeItem("formSubmitted");
    }
  }
});
