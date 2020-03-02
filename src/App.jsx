import React from 'react';

import Layout from "./components/layout/layout.component";
import BurgerBuilder from "./containers/burger-builder/burger-bulder.component";
// import classes from "./App.module.css"

function App() {
  return (
    <div>
      <Layout>
        <BurgerBuilder />
      </Layout>
    </div>
  );
}

export default App;
