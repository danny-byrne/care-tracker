import "./App.scss";
import { BrowserRouter, Outlet, Route, Routes } from "react-router-dom";
import RouterConfig from "./app/RouterConfig";
import RequireAuth from "./common/components/RouteValidation/RequireAuth";
import RequireAdminPermissions from "./common/components/RouteValidation/RequireAdminPermissions";
import DocumentDetails from "./features/Documents/DocumentDetails";

import DashboardPage from "./features/DashboardPage";
import { ConditionList, ConditionView } from "./features/Conditions";
import TogetherTimeLayout from "./features/TogetherTimeLayout";
import MedManagerLayout from "./features/MedManagerLayout";
import LandingPage from "./features/LandingPage";
import LoginLoadingPage from "./features/LoginLoadingPage";
import PendingUserPage from "./features/PendingUserPage";
import PageNotFound from "./features/PageNotFound";
import GetStarted from "./features/GetStarted";
import { Medication } from "./features/Medications";
import { CareCircle, Member } from "./features/Members";
import Layout from "./common/components/Layout/Layout";
import { ProviderList, ProviderView } from "./features/Providers";
import CareRecipient from "./features/CareRecipient";
import { PharmacyList, PharmacyView } from "./features/Pharmacies";
import { ImmunizationList, ImmunizationView } from "./features/Immunizations";
import { TermsOfService, ServiceTermsSuccess } from "./features/TermsOfService";
import { NotificationsSubscribe } from "./features/NotificationsSubscribe";
import EmergencyContactList from "./features/EmergencyContacts/EmergencyContactsList";
import FrequentlyAskedQuestions from "./features/AppProfile/FrequentlyAskedQuestions";
import { Activities, ActivityView } from "./features/Activities";
import { TimelineList } from "./features/Timeline";
import GoalsPage from "./features/Goals";
import {
  GoalInfoCarePlan,
  GoalInfoTogetherTimeAdmin,
  GoalInfoTogetherTimeMember,
  GoalInfoMedManager,
} from "./features/GoalInfo";

import { AllergyList, AllergyView } from "./features/Allergies";
import ErrorBoundary from "./common/components/ErrorBoundary/ErrorBoundary";
import RecipientProfileWizard from "./features/RecipientProfileWizard/RecipientProfileWizard";
import CarePlanLayout from "./features/CarePlanLayout/CarePlanLayout";
import CarePlan from "./features/CarePlan/CarePlan";
import Home from "./features/Home/Home";
import QuestionView from "./features/Home/QuestionView";
import Calendar from "./features/Calendar/Calendar";
import AppointmentView from "./features/Calendar/AppointmentView";
import { AnnotationList, AnnotationView } from "./features/Annotations";
import DocumentAnswer from "./features/Documents/DocumentAnswer";
import { useEffect } from "react";
import { SessionDataProvider } from "./common/contexts/SessionDataContext";

// Prevent the body from scrolling when the user is typing in an input or textarea
// This fixes the issue of the component being pushed off screen when the keyboard is opened on mobile
const preventBodyScroll = (e) => {
  if (e.target.tagName === "INPUT" || e.target.tagName === "TEXTAREA") {
    document.body.classList.add("body-no-scroll");
  }
};

const allowBodyScroll = (e) => {
  if (e.target.tagName === "INPUT" || e.target.tagName === "TEXTAREA") {
    document.body.classList.remove("body-no-scroll");
  }
};

const MIN_DESKTOP_WIDTH = 768;

const App = () => {
  // useIsMobile hook currently always returns true due to max width locking to 425px
  // This check is use to determine whether to add the event listeners to prevent body scrolling
  // on a mobile device, so it needs to do it's own check against window.innerWidth
  const isMobile = window.innerWidth <= MIN_DESKTOP_WIDTH;
  useEffect(() => {
    if (isMobile) {
      window.addEventListener("focus", preventBodyScroll, true);
      window.addEventListener("blur", allowBodyScroll, true);

      return () => {
        window.removeEventListener("focus", preventBodyScroll, true);
        window.removeEventListener("blur", allowBodyScroll, true);
      };
    }
  }, [isMobile]);

  // RequireAuth is used if the page requires the user to be authenticated
  // RequireAdminPermissions is used if the page requires the user to be an Admin
  return (
    <BrowserRouter>
      <Routes>
        {/* Layout Routes */}
        <Route
          element={
            <SessionDataProvider>
              <Layout>
                <Outlet />
              </Layout>
            </SessionDataProvider>
          }
        >
          {/* Auth Routes */}
          <Route
            element={
              <RequireAuth>
                <Outlet />
              </RequireAuth>
            }
          >
            {/* Admin Routes */}
            <Route
              element={
                <RequireAdminPermissions>
                  <Outlet />
                </RequireAdminPermissions>
              }
            >
              <Route
                path={RouterConfig.CarePlan}
                element={
                  <ErrorBoundary>
                    <CarePlanLayout>
                      <CarePlan />
                    </CarePlanLayout>
                  </ErrorBoundary>
                }
              />
              <Route
                path={RouterConfig.Documents}
                element={
                  <ErrorBoundary>
                    <CarePlanLayout />
                  </ErrorBoundary>
                }
              />
              <Route
                path={RouterConfig.Timeline}
                element={
                  <ErrorBoundary>
                    <CarePlanLayout>
                      <TimelineList />
                    </CarePlanLayout>
                  </ErrorBoundary>
                }
              />
              <Route
                path={RouterConfig.Document(null)}
                element={
                  <ErrorBoundary>
                    <DocumentDetails />
                  </ErrorBoundary>
                }
              />
              <Route
                path={RouterConfig.DocumentAnswer(null)}
                element={
                  <ErrorBoundary>
                    <DocumentAnswer />
                  </ErrorBoundary>
                }
              />
              <Route
                path={RouterConfig.Medications}
                element={
                  <ErrorBoundary>
                    <MedManagerLayout />
                  </ErrorBoundary>
                }
              />
              <Route
                path={RouterConfig.Medication(null)}
                element={
                  <ErrorBoundary>
                    <Medication />
                  </ErrorBoundary>
                }
              />
              <Route
                path={RouterConfig.Providers}
                element={
                  <ErrorBoundary>
                    <ProviderList />
                  </ErrorBoundary>
                }
              />
              <Route
                path={RouterConfig.Conditions}
                element={
                  <ErrorBoundary>
                    <ConditionList />
                  </ErrorBoundary>
                }
              />
              <Route
                path={RouterConfig.Provider(null)}
                element={
                  <ErrorBoundary>
                    <ProviderView />
                  </ErrorBoundary>
                }
              />

              <Route
                path={RouterConfig.Condition(null)}
                element={
                  <ErrorBoundary>
                    <ConditionView />
                  </ErrorBoundary>
                }
              />
              <Route
                path={RouterConfig.Pharmacies}
                element={
                  <ErrorBoundary>
                    <PharmacyList />
                  </ErrorBoundary>
                }
              />
              <Route
                path={RouterConfig.Pharmacy(null)}
                element={
                  <ErrorBoundary>
                    <PharmacyView />
                  </ErrorBoundary>
                }
              />
              <Route
                path={RouterConfig.Immunizations}
                element={
                  <ErrorBoundary>
                    <ImmunizationList />
                  </ErrorBoundary>
                }
              />
              <Route
                path={RouterConfig.Immunization(null)}
                element={
                  <ErrorBoundary>
                    <ImmunizationView />
                  </ErrorBoundary>
                }
              />
              <Route
                path={RouterConfig.Allergies}
                element={
                  <ErrorBoundary>
                    <AllergyList />
                  </ErrorBoundary>
                }
              />
              <Route
                path={RouterConfig.Allergy(null)}
                element={
                  <ErrorBoundary>
                    <AllergyView />
                  </ErrorBoundary>
                }
              />
              <Route
                path={RouterConfig.Annotations}
                element={
                  <ErrorBoundary>
                    <AnnotationList />
                  </ErrorBoundary>
                }
              />
              <Route
                path={RouterConfig.Annotation(null)}
                element={
                  <ErrorBoundary>
                    <AnnotationView />
                  </ErrorBoundary>
                }
              />
              <Route
                path={RouterConfig.EmergencyContacts}
                element={
                  <ErrorBoundary>
                    <EmergencyContactList />
                  </ErrorBoundary>
                }
              />
              {/* /Admin Routes */}
            </Route>

            <Route
              path={RouterConfig.RecipientProfile}
              element={
                <ErrorBoundary>
                  <CareRecipient />
                </ErrorBoundary>
              }
            />
            <Route
              path={RouterConfig.TogetherTimeLayout}
              element={
                <ErrorBoundary>
                  <TogetherTimeLayout>
                    <ErrorBoundary>
                      <Activities />
                    </ErrorBoundary>
                  </TogetherTimeLayout>
                </ErrorBoundary>
              }
            />

            <Route
              path={RouterConfig.Members}
              element={
                <ErrorBoundary>
                  <TogetherTimeLayout>
                    <ErrorBoundary>
                      <CareCircle />
                    </ErrorBoundary>
                  </TogetherTimeLayout>
                </ErrorBoundary>
              }
            />
            <Route
              path={RouterConfig.Member(null)}
              element={
                <ErrorBoundary>
                  <Member />
                </ErrorBoundary>
              }
            />
            <Route
              path={RouterConfig.Activities}
              element={
                <ErrorBoundary>
                  <TogetherTimeLayout>
                    <ErrorBoundary>
                      <Activities />
                    </ErrorBoundary>
                  </TogetherTimeLayout>
                </ErrorBoundary>
              }
            />
            <Route
              path={RouterConfig.Activity(null)}
              element={
                <ErrorBoundary>
                  <ActivityView />
                </ErrorBoundary>
              }
            />
            <Route
              path={RouterConfig.DashboardPage}
              element={
                <ErrorBoundary>
                  <DashboardPage />
                </ErrorBoundary>
              }
            />
            <Route
              path={RouterConfig.FAQ}
              element={
                <ErrorBoundary>
                  <FrequentlyAskedQuestions />
                </ErrorBoundary>
              }
            />
            <Route
              path={RouterConfig.Question}
              element={
                <ErrorBoundary>
                  <ErrorBoundary>
                    <QuestionView />
                  </ErrorBoundary>
                </ErrorBoundary>
              }
            />
            <Route
              path={RouterConfig.Home}
              element={
                <ErrorBoundary>
                  <ErrorBoundary>
                    <Home />
                  </ErrorBoundary>
                </ErrorBoundary>
              }
            />
            <Route
              path={RouterConfig.PageNotFound}
              element={
                <ErrorBoundary>
                  <PageNotFound />
                </ErrorBoundary>
              }
            />
            <Route
              path={RouterConfig.Calendar}
              element={
                <ErrorBoundary>
                  <ErrorBoundary>
                    <Calendar />
                  </ErrorBoundary>
                </ErrorBoundary>
              }
            />
            <Route
              path={RouterConfig.Appointment(null)}
              element={
                <ErrorBoundary>
                  <AppointmentView />
                </ErrorBoundary>
              }
            />
            {/*/ Auth Routes */}
          </Route>
          {/* /Layout Routes */}
        </Route>

        <Route
          path={RouterConfig.TermsOfService}
          element={
            <RequireAuth>
              <ErrorBoundary>
                <TermsOfService />
              </ErrorBoundary>
            </RequireAuth>
          }
        />
        <Route
          path={RouterConfig.GetStarted}
          element={
            <RequireAuth>
              <ErrorBoundary>
                <GetStarted />
              </ErrorBoundary>
            </RequireAuth>
          }
        />
        <Route
          path={RouterConfig.LandingPage}
          element={
            <ErrorBoundary>
              <LandingPage />
            </ErrorBoundary>
          }
        />
        <Route
          path={RouterConfig.LoginLoadingPage}
          element={
            <ErrorBoundary>
              <LoginLoadingPage />
            </ErrorBoundary>
          }
        />
        <Route
          path={RouterConfig.PendingUserPage}
          element={
            <ErrorBoundary>
              <PendingUserPage />
            </ErrorBoundary>
          }
        />
        <Route
          path={RouterConfig.TermsSuccessFAQ}
          element={
            <RequireAuth>
              <ErrorBoundary>
                <FrequentlyAskedQuestions fromInitLogin />
              </ErrorBoundary>
            </RequireAuth>
          }
        />
        <Route
          path={RouterConfig.TermsSuccess}
          element={
            <RequireAuth>
              <ErrorBoundary>
                <ServiceTermsSuccess />
              </ErrorBoundary>
            </RequireAuth>
          }
        />
        <Route
          path={RouterConfig.Goals}
          element={
            <RequireAdminPermissions>
              <ErrorBoundary>
                <GoalsPage />
              </ErrorBoundary>
            </RequireAdminPermissions>
          }
        />
        <Route
          path={RouterConfig.GetStartedRecipientProfile}
          element={
            <RequireAdminPermissions>
              <ErrorBoundary>
                <RecipientProfileWizard />
              </ErrorBoundary>
            </RequireAdminPermissions>
          }
        />
        <Route
          path={RouterConfig.GoalInfoCarePlan}
          element={
            <RequireAdminPermissions>
              <ErrorBoundary>
                <GoalInfoCarePlan />
              </ErrorBoundary>
            </RequireAdminPermissions>
          }
        />
        <Route
          path={RouterConfig.GoalInfoMedManager}
          element={
            <RequireAdminPermissions>
              <ErrorBoundary>
                <GoalInfoMedManager />
              </ErrorBoundary>
            </RequireAdminPermissions>
          }
        />
        <Route
          path={RouterConfig.GoalInfoTogetherTimeMember}
          element={
            <RequireAuth>
              <ErrorBoundary>
                <GoalInfoTogetherTimeMember />
              </ErrorBoundary>
            </RequireAuth>
          }
        />
        <Route
          path={RouterConfig.GoalInfoTogetherTimeAdmin}
          element={
            <RequireAdminPermissions>
              <ErrorBoundary>
                <GoalInfoTogetherTimeAdmin />
              </ErrorBoundary>
            </RequireAdminPermissions>
          }
        />
        <Route
          path={RouterConfig.NotificationsSubscribe}
          element={
            <RequireAuth>
              <ErrorBoundary>
                <NotificationsSubscribe />
              </ErrorBoundary>
            </RequireAuth>
          }
        />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
