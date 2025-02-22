import Sidebar from '../sidebar'

const Container = ({children}: any) => {
  return (
    <div className='flex items-center'>
        <Sidebar children={"Menu"}/>
        {children}
    </div>
  )
}

export default Container