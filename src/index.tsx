import { MsalProvider } from "@azure/msal-react";
import { ThemeProvider, initializeIcons, registerIcons } from "@fluentui/react";
import { ApolloProvider } from "@apollo/client";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { persistStore } from "redux-persist";
import React from "react";
import ReactDOM from "react-dom";

import { AuthService } from "./services/AuthService";
import App from "./App";
import { store } from "./app/Store";
import { client as apolloClient } from "src/common/helpers/ApolloHelper";

import { FeedbackProvider } from "src/common/contexts/Feedback";
import { theme } from "./theme";
import { initializeCentro } from "./userfeedback/CentroFeedbackFunctions";
import { QuestionMarkIcon } from "./assets/Misc/QuestionMarkIcon";
import { initConsent } from "./wcpConsentInit";
import { ClipboardHeart } from "./assets/Misc/ClipboardHeart";
import { Print } from "./assets/Misc/Print";
import { Stethoscope } from "./assets/Misc/Stethoscope";
import { ClipboardConditions } from "./assets/Misc/ClipboardConditions";
import { Immunization } from "./assets/Misc/Immunization";
import AdminIcon from "src/assets/UserRoles/AdminIcon";
import CreatorIcon from "src/assets/UserRoles/CreatorIcon";
import MemberIcon from "src/assets/UserRoles/MemberIcon";
import { PersonPill } from "./assets/Misc/PersonPill";
import { ClipboardAllergies } from "./assets/Misc/ClipboardAllergies";
import { PersonCard } from "./assets/Misc/PersonCard";
import { Location } from "./assets/Misc/Location";
import { Phone } from "./assets/Misc/Phone";
import { DocumentUpload } from "./assets/Misc/DocumentUpload";
import { ChevronRightButton } from "./assets/Misc/ChevronRightButton";
import { ChevronLeftButton } from "./assets/Misc/ChevronLeftButton";
import { ToastCheck } from "./assets/Toasts/ToastCheck";
import { ToastWarning } from "./assets/Toasts/ToastWarning";
import { ToastError } from "./assets/Toasts/ToastError";
import { ToastInfo } from "./assets/Toasts/ToastInfo";
import { Letter } from "./assets/Activities/Letter";
import { Car } from "./assets/Activities/Car";
import { Pen } from "./assets/Activities/Pen";
import { House } from "./assets/Activities/House";
import AllergiesIcon from "./assets/CareRecipient/AllergiesIcon";

let persistor = persistStore(store);
// const msalInstance = AuthService.getMsalInstance();

if ("serviceWorker" in navigator) {
  window.addEventListener("load", () => {
    navigator.serviceWorker
      .register("/sw.js")
      .then((registration) => {
        console.log(
          "Service Worker registered with scope:",
          registration.scope
        );
      })
      .catch((error) => {
        console.error("Service Worker registration failed:", error);
      });
  });
}

// Commenting out until I can test in custom env
// const isRunningAsPwa = () => {
//     //eslint-disable-next-line
//     return window.matchMedia('(display-mode: standalone)').matches;
// };

// if (isRunningAsPwa()) {
//     document.body.classList.add('pwa-mode');
// }

const renderReactDom = () => {
  initConsent();

  // Initializing centro engine
  initializeCentro();

  registerIcons({
    icons: {
      QuestionMarkCircle: <QuestionMarkIcon />,
      ClipboardHeart: <ClipboardHeart />,
      Stethoscope: <Stethoscope />,
      ClipboardConditions: <ClipboardConditions />,
      AdminIcon: <AdminIcon />,
      CreatorIcon: <CreatorIcon />,
      MemberIcon: <MemberIcon />,
      PersonPill: <PersonPill />,
      Immunization: <Immunization />,
      ClipboardAllergies: <ClipboardAllergies />,
      PersonCard: <PersonCard />,
      Phone: <Phone />,
      Location: <Location />,
      DocumentUpload: <DocumentUpload />,
      ToastCheck: <ToastCheck />,
      ToastWarning: <ToastWarning />,
      ToastInfo: <ToastInfo />,
      ToastError: <ToastError />,
      House: <House />,
      Pen: <Pen />,
      Car: <Car />,
      Letter: <Letter />,
      AllergiesIcon: <AllergiesIcon />,
      ChevronRightButton: <ChevronRightButton />,
      ChevronLeftButton: <ChevronLeftButton />,
      PrintIcon: <Print />,
    },
  });

  initializeIcons(undefined, { disableWarnings: true });

  ReactDOM.render(
    <React.StrictMode>
      {/* <MsalProvider instance={msalInstance}> */}
      <Provider store={store}>
        {/* <PersistGate persistor={persistor}> */}
        {/* <ApolloProvider client={apolloClient}> */}
        <FeedbackProvider>
          <ThemeProvider theme={theme}>
            <div className="App">
              <div id="centroRef"> </div>
              <App />
            </div>
          </ThemeProvider>
        </FeedbackProvider>
        {/* </ApolloProvider> */}
        {/* </PersistGate> */}
      </Provider>
      {/* </MsalProvider> */}
    </React.StrictMode>,
    document.getElementById("root")
  );
};

renderReactDom();
