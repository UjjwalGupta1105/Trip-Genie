import { Link } from "react-router-dom"
import Header from "../elements/Header"

const Home=()=>{
    return(
        <>

            <div className="HomePage">
              <Header for="header-home"/>
              <div className="HomePageContainer">
                <div>
                    <h2>Unlock the World with AI-Enhanced Travel:</h2>
                    <h1>Personalized Itineraries at Your Fingertips</h1>
                </div>
                <div>
                    <p>An AI-powered trip planner that creates personalized travel Itineraries,recommends destinations, making travel planning smart, and stress-free.</p>
                </div>
                <div>

                    <Link to="/create-trip">Let's Go</Link>
                </div>
               </div>
            </div>
        </>
    )
}

export default Home