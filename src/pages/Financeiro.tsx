import DebitosForm from "@/components/FinanceiroComponents/DebitosForm"
import ListDebitos from "@/components/FinanceiroComponents/ListDebitos"
import { ToastContainer } from "react-toastify"

const Financeiro = () => {
  return (
    <main className="w-full mt-10 px-[5%] flex flex-col gap-3">
      <div>
        <DebitosForm />
      </div>
      <div>
        <ListDebitos />
      </div>
      <ToastContainer />
    </main>
  )
}

export default Financeiro