import React, { ReactComponentElement } from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import * as serviceWorker from './serviceWorker';
import { rootStore } from 'src/store';
import {  Provider } from 'mobx-react';


// ReactDOM.render(<App />, document.getElementById('root'));

function renderApp(Root:any) {
  ReactDOM.render(  
      <Provider {...rootStore}>
        <Root />
      </Provider>, 
      document.getElementById('root'));
}

renderApp(App);
// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();




//@ts-ignore
if (process.env.NODE_ENV !== 'production') {
  //@ts-ignore
  if (module.hot) {
    //@ts-ignore
    module.hot.accept('./App', () => {
      renderApp(require('./App').default)
    });
  }
}

