import { Outlet } from "react-router"
import { Header } from "./layout/components/Header"
import { Footer } from "./layout/components/Footer"

function App() {

  return (
    <>
      <Header />
      <main className="w-full">
        <Outlet />

      </main>
      <Footer />
    </>
  )
}

export default App
