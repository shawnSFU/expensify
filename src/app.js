import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import AppRouter, { history } from "./routers/AppRouter";
import configureStore from "./store/configureStore";
import { startSetExpenses } from "./actions/expenses";
import { setTextFilter } from "./actions/filters";
import getVisibleExpenses from "./selectors/expenses";
import "normalize.css/normalize.css";
import "./styles/styles.scss";
import "react-dates/initialize";
import "react-dates/lib/css/_datepicker.css";
import { firebase } from "./firebase/firebase";

const store = configureStore();

const jsx = (
  <Provider store={store}>
    <AppRouter />
  </Provider>
);

ReactDOM.render(<p>Loading...</p>, document.getElementById("app"));


//if user logs in -> fetch data 
//only want to redirect if they're on login page - not any other page. 


let hasRendered = false;
const renderApp = () => {
  if (!hasRendered){
    ReactDOM.render(jsx, document.getElementById("app"));
    hasRendered = true;
  }
}

//to check if logins are working. returns boolean of user.
firebase.auth().onAuthStateChanged(user => {
  if (user) {
    store.dispatch(startSetExpenses()).then(() => {
      renderApp();
      if (history.location.pathname === '/'){
        history.push('/dashboard')
      }
    });
  } else {
    renderApp();
    history.push("/");
  }
});
