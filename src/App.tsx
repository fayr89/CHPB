import { BrowserRouter } from "react-router-dom";
import { AppRoutes } from "./router";
import { I18nextProvider } from "react-i18next";
import i18n from "./i18n";
import { ContentProvider } from "./content/ContentContext";
import { MetrikaTracker } from "./components/MetrikaTracker";


function App() {
  return (
    <I18nextProvider i18n={i18n}>
      <ContentProvider>
        <BrowserRouter basename={__BASE_PATH__}>
          <MetrikaTracker />
          <AppRoutes />
        </BrowserRouter>
      </ContentProvider>
    </I18nextProvider>
  );
}

export default App;
