import { Toaster } from "sonner";
import { AppProvidersWrapper, BackToTop } from "./components";
import AllRoutes from "./routes/Routes";

// styles
import '@/assets/css/style.css'


const App = () => {

  return (
    <AppProvidersWrapper>
      <AllRoutes />
      <BackToTop />
      <Toaster richColors />
    </AppProvidersWrapper>
  )
}

export default App
