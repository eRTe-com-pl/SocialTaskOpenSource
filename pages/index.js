import React from 'react';
import dynamic from 'next/dynamic';
import ControlPanel from "../src/components/ControlPanel.js";
import ErrorMessage from "../src/components/ErrorMessage.js";
import UserNamePrompt from "../src/components/UserNamePrompt.js";
import { useUserLocation } from '../src/hooks/useUserLocation';
import { useSocket } from '../src/hooks/useSocket';

const DynamicGlobeComponent = dynamic(() => import('../src/components/GlobeComponent'), { ssr: false });

function HomePage() {
    const [errorState, setErrorState] = React.useState({
        title: '',
        error: null,
        disableRefresh: false
    });
    const [username, setUsername] = React.useState('');
    const { userLocation, errorMessage } = useUserLocation();
    
    const errorHandler = {
        setError: (title, message, disableRefresh) => {
            setErrorState({ title, error: message, disableRefresh });
        }
    };

    const { places, globeEl, handleJoin, handleMyLocation } = useSocket(
        userLocation,
        username,
        errorHandler
    );

    return (
        <main>
           <ErrorMessage error={errorState} />
           <UserNamePrompt setError={errorHandler.setError} setUsername={setUsername} />
           <ControlPanel 
             username={username}
             handleMyLocation={handleMyLocation}
             handleJoin={() => handleJoin(username)}
             globeElement={globeEl.current}
             setError={errorHandler.setError}
           />
           <DynamicGlobeComponent 
             places={places} 
             globeEl={globeEl}
           />
        </main>
    );
}

export default HomePage;