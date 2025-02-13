import React, { useState, useEffect } from 'react';
import CircularProgress from '@material-ui/core/CircularProgress';
import { init } from 'emailjs-com';
import ResourceLoadedApp from './ResourceLoadedApp';

function App () {
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    init('user_GDgPHJRKg1GLbUltmYaW1');
    setIsLoading(false);
  }, []);

  return (
    isLoading ? (
      <div style={{
        display: 'flex',
        justifyContent: 'space-around',
        verticalAlign: 'center',
        height: '100vh',
        width: '100%',
        alignItems: 'center',
      }}
      >
        <CircularProgress color="secondary" />
      </div>
    ) : (
      <ResourceLoadedApp />
    )
  );
}

export default App;
