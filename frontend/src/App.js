// import React from 'react';
// import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
// import EventDetail from './Components/eventDetail';   // Updated path
// import EventList from './Components/eventList';       // Updated path

// function App() {
//     return (
//         <Router>
//             <Routes>
//                 <Route path="/" element={<EventList />} />
//                 <Route path="/events/:id" element={<EventDetail />} />
//             </Routes>
//         </Router>
//     );
// }

// export default App;
// frontend/src/App.js
// import React from 'react';
// import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
// import EventList from './Components/eventList';
// import CreateEvent from './Components/CreateEvent';
// import UpdateDeleteEvents from './Components/UpdateDeleteEvents';
// import EditEvent from './Components/EditEvent';
// import Login from './Components/Login';
// import Register from './Components/Register';
// import EventCRUD from './Components/EventCRUD';

// function App() {
//   return (
//     <Router>
//       <Routes>
//         <Route path="/" element={<EventList />} />
//         <Route path="/login" element={<Login />} />
//         <Route path="/register" element={<Register />} />
//         <Route path="/manage-events" element={<EventCRUD />} />
//         <Route path="/manage-events/create" element={<CreateEvent />} />
//         <Route path="/manage-events/update-delete" element={<UpdateDeleteEvents />} />
//         <Route path="/manage-events/edit/:id" element={<EditEvent />} />
//       </Routes>
//     </Router>
//   );
// }

// export default App;
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import EventList from './Components/eventList';
import CreateEvent from './Components/CreateEvent';
import RegistrationForm from './Components/RegistrationForm';
import RegisteredEvents from './Components/RegisteredEvents';
import UpdateDeleteEvents from './Components/UpdateDeleteEvents';
import Login from './Components/Login';
import EditEvent from './Components/EditEvent';

function App() {
  return (
    <Router>
      <Routes>
      <Route path="/" element={<Login />} />
        <Route path="/events-list" element={<EventList />} />
        <Route path="/register" element={<RegistrationForm />} />
        <Route path="/registered-events" element={<RegisteredEvents />} />
        <Route path="/manage-events" element={<UpdateDeleteEvents />} />
        <Route path="/manage-events/create" element={<CreateEvent />} />
        <Route path="/manage-events/edit/:id" element={<EditEvent />} />
      </Routes>
    </Router>
  );
}

export default App;

