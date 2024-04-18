import './App.css';
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './components/Home/Home.jsx';
import CollegePage from './pages/colleges/Page.jsx';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/college" element={<CollegePage />} />
      </Routes>
    </Router>
  );
};

export default App;
  
// function App() {
//     const [forecasts, setForecasts] = useState();

//     useEffect(() => {
//         const getColleges = async () => {
//             const data = await getAllColleges();
//             setForecasts(data);
//         }

//         getColleges();
        
//     }, []);

//     const contents = forecasts === undefined
//         ? <p><em>Loading... Please refresh once the ASP.NET backend has started. See <a href="https://aka.ms/jspsintegrationreact">https://aka.ms/jspsintegrationreact</a> for more details.</em></p>
//         : <table className="table table-striped" aria-labelledby="tabelLabel">
//             <thead>
//                 <tr>
//                     <th>Date</th>
//                     <th>Temp. (C)</th>
//                     <th>Temp. (F)</th>
//                     <th>Summary</th>
//                 </tr>
//             </thead>
//             <tbody>
//                 {forecasts.map(forecast =>
//                     <tr key={forecast.collegeHeader.collegeId}>
//                         <td>{forecast.collegeHeader.collegeId}</td>
//                         <td>{forecast.collegeHeader.title}</td>
//                         <td>{forecast.temperatureC}</td>
//                         <td>{forecast.temperatureF}</td>
//                     </tr>
//                 )}
//             </tbody>
//         </table>;

//     return (
//         <div>
//             <h1 id="tabelLabel">Weather forecast</h1>
//             <p>This component demonstrates fetching data from the server.</p>
//             {contents}
//         </div>
//     );
    
//     async function populateWeatherData() {
//         const response = await fetch('college');
//         const data = await response.json();
//         setForecasts(data);
//     }
// }

// export default App;