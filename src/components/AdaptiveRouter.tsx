import { FC, PropsWithChildren, useEffect, useMemo, useState } from 'react';
import { BrowserRouter, Router } from 'react-router-dom';
import { useIntegration } from '@tma.js/react-router-integration';
import { initNavigator, retrieveLaunchParams } from '@tma.js/sdk';
const TgRouter: FC<PropsWithChildren> = ({ children }) => {
  // Create new application navigator and attach it to the browser history, so it could modify
  // it and listen to its changes.
  const navigator = useMemo(() => initNavigator('app-navigation-state'), []);
  const [location, reactNavigator] = useIntegration(navigator);
  const [attached, setAttached] = useState(false);

  // Don't forget to attach the navigator to allow it to control the BackButton state as well
  // as browser history.
  useEffect(() => {
    navigator.attach().then(() => setAttached(true));

    return () => {
      navigator.detach();
    };
  }, [navigator]);

  if (!attached) {
    return null;
  }

  return (
    <Router location={location} navigator={reactNavigator}>
      {children}
    </Router>
  );
};

export const AdaptiveRouter: FC<PropsWithChildren> = ({ children }) => {
  const [isTg, setIsTg] = useState(false);

  useEffect(() => {
    try {
      retrieveLaunchParams();
      setIsTg(true);
    } catch {
      setIsTg(false);
    }
  }, [window.location]);

  if (isTg) {
    return <TgRouter>{children}</TgRouter>;
  }

  return <BrowserRouter>{children}</BrowserRouter>;
};
