import React,{useState} from 'react';
import UserForm from './components/UserForm';
import Sidebar from './components/SiderBar';
import Home from './components/Home'
const App: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleOpenModal = () => {
      setIsModalOpen(true);
  };

  const handleCloseModal = () => {
      setIsModalOpen(false);
  };

    return (
        <div className="flex">
            <Sidebar />
            <div className="flex-grow p-4" style={{marginLeft: '256px'}}>
                {/* Add User Button */}
                <div className="flex justify-end mb-4">
                    <button 
                        onClick={handleOpenModal} 
                        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                    >
                        Add User
                    </button>
                </div>
                <Home/>
            </div>
                <UserForm isOpen={isModalOpen} onClose={handleCloseModal} />
        </div>
    );
};

export default App;
