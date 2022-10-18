import React from 'react';
import './asset/css/main.scss';
import { initialMenu, routesConfig } from './defines';
import { Navigation, navigationService, routerService, UiView } from './components';

function App() {
  routerService.setInitRoutes(routesConfig, '/tooltip');
  navigationService.setInitialMenu(initialMenu);

  return (
    <div className="container">
      <div className="container-layout">
        <Navigation />
        <section>
          <UiView />
        </section>
      </div>
    </div>
  );
}

export default App;
