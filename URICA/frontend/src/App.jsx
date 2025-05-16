import React from 'react';
import Questionnaire from './components/Questionnaire';

function App() {
  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto py-4 px-4">
          <h1 className="text-2xl font-bold text-gray-900">URICA Assessment</h1>
        </div>
      </header>
      
      <main className="py-8">
        <Questionnaire />
      </main>
    </div>
  );
}

export default App;
