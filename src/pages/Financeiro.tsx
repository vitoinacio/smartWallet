import DebitosForm from "@/components/FinanceiroComponents/DebitosForm"
import ListDebitos from "@/components/FinanceiroComponents/ListDebitos"
import { useDebitos } from "@/hooks/useDebitos";
import { ToastContainer } from "react-toastify"

const Financeiro = () => {
  const {
      setTitle,
      setValor,
      setData,
      setNotifi,
      setObs,
      isLoading,
      errorMessage,
      handleSubmit,
      debitosList,
      deleteDebito,
    } = useDebitos();

  return (
    <main className="w-full mt-10 px-[5%] flex flex-col gap-3">
      <div>
        <DebitosForm setTitle={setTitle} setValor={setValor} setData={setData} setNotifi={setNotifi} setObs={setObs} isLoading={isLoading} errorMessage={errorMessage} handleSubmit={handleSubmit}/>
      </div>
      <div>
        <ListDebitos debitosList={debitosList} isLoading={isLoading} deleteDebito={deleteDebito}/>
      </div>
      <ToastContainer />
    </main>
  )
}

export default Financeiro