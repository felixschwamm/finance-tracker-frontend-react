import './App.css';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import Start from './page/Start';
import Settings from './page/Settings';
import { useState, useEffect } from 'react';
import Keycloak from 'keycloak-js';
import { Provider, useSelector } from 'react-redux';
import { store } from './store/store';
import { useDispatch } from 'react-redux';
import { setKeycloak } from './store/slices/keycloakSlice';
import { fetchAccount } from './store/slices/accountSlice';
import { fetchSpendings } from './store/slices/spendingsSlice';

const keycloakConfig = {
  url: "https://keycloak.schwaemmle.cloud",
  realm: "finance-tracker",
  clientId: "finance-tracker-express-backend",
};

const keycloak = new Keycloak(keycloakConfig);

function App() {

  const dispatch = useDispatch();
  const token = useSelector(state => state.keycloak.token);

  useEffect(() => {
    if (token) {
      dispatch(fetchAccount());
      dispatch(fetchSpendings());
    }
  }, [token, dispatch]);

  const [keycloakReady, setKeycloakReady] = useState(false);

  useEffect(() => {
    keycloak.init({ onLoad: 'login-required' })
      .then(authenticated => {
        console.log('Keycloak ist initialisiert:', authenticated);
        setKeycloakReady(true);
        if (authenticated) {
          dispatch(setKeycloak({
            token: keycloak.token,
            username: keycloak.tokenParsed.preferred_username,
          }));
        }
      })
      .catch(e => {
        console.error('Fehler bei der Initialisierung von Keycloak:', e);
      });
  }, []);


  const router = createBrowserRouter([
    {
      path: '/',
      element: <Start />
    },
    {
      path: '/settings',
      element: <Settings />
    }
  ]);

  if (!keycloakReady) {
    return <h1>Loading...</h1>;
  }

  return (
    <RouterProvider router={router} />
  );
}

export default App;
