import { BacklogContainer } from "."
import { BacklogProvider } from '../context/BacklogContext'

const Home = () => {

  return (
    <>
      <BacklogProvider>
        <section className="header d-flex justify-content-center align-items-center">
          <h1>Games</h1>
        </section>
        <BacklogContainer />
      </BacklogProvider>
    </>

  )
}

export default Home