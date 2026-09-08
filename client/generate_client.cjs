const fs = require('fs');
const path = require('path');

const components = {
  'Navbar.jsx': `import React from 'react';
import { Link } from 'react-router-dom';
export default function Navbar() {
  return (
    <nav className="glass-card p-4 flex justify-between items-center mb-6">
      <h1 className="text-2xl font-bold text-primary">FinPilot AI</h1>
      <div className="flex gap-4">
        <Link to="/dashboard" className="text-darkBlue hover:text-primary">Dashboard</Link>
        <Link to="/coach" className="text-darkBlue hover:text-primary">AI Coach</Link>
      </div>
    </nav>
  );
}`,
  'Sidebar.jsx': `import React from 'react';
export default function Sidebar() {
  return <div className="glass-card w-64 h-[calc(100vh-2rem)] p-4 m-4 hidden md:block">Sidebar Links</div>;
}`
};

const pages = {
  'Dashboard.jsx': `import React from 'react';
import Navbar from '../components/Navbar';
export default function Dashboard() {
  return (
    <div className="p-4">
      <Navbar />
      <h2 className="text-3xl font-bold mb-4">Welcome back!</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="glass-card p-6">
          <h3 className="text-lg text-gray-500">Balance</h3>
          <p className="text-2xl font-bold">₹1,50,000</p>
        </div>
      </div>
    </div>
  );
}`,
  'LandingPage.jsx': `import React from 'react';
import { Link } from 'react-router-dom';
export default function LandingPage() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center text-center p-4">
      <h1 className="text-5xl font-bold text-darkBlue mb-4">Meet FinPilot AI</h1>
      <p className="text-xl text-gray-600 mb-8">Your Intelligent Banking Companion</p>
      <Link to="/dashboard" className="bg-primary text-white px-6 py-3 rounded-xl font-semibold shadow-lg hover:bg-blue-500 transition">Get Started</Link>
    </div>
  );
}`,
  'AICoach.jsx': `import React from 'react';
import Navbar from '../components/Navbar';
export default function AICoach() {
  return (
    <div className="p-4">
      <Navbar />
      <h2 className="text-3xl font-bold mb-4">AI Coach</h2>
      <div className="glass-card p-6 h-96 flex flex-col justify-end">
        <p className="text-gray-500 text-center mb-auto mt-auto">How can I help you today?</p>
        <input type="text" placeholder="Ask something..." className="w-full border p-3 rounded-xl" />
      </div>
    </div>
  );
}`
};

const appFile = `import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LandingPage from './pages/LandingPage';
import Dashboard from './pages/Dashboard';
import AICoach from './pages/AICoach';

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-[#F5F8FC]">
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/coach" element={<AICoach />} />
        </Routes>
      </div>
    </Router>
  );
}
export default App;`;

const writeFiles = (dir, files) => {
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
  for (const [filename, content] of Object.entries(files)) {
    fs.writeFileSync(path.join(dir, filename), content);
  }
};

writeFiles(path.join(__dirname, 'src/components'), components);
writeFiles(path.join(__dirname, 'src/pages'), pages);
fs.writeFileSync(path.join(__dirname, 'src/App.jsx'), appFile);
console.log('Client files generated successfully');
