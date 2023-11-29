import React from 'react';
import {BrowserRouter} from 'react-router-dom';
import Router from "./components/navigation/Router";
import Navigator from "./components/navigation/Navigator";
import {Provider} from "react-redux";
import configureStore from "./store/ConfigureStore";

const store = configureStore();


const App: React.FC = () => {
    return (
        <Provider store={store}>
            <BrowserRouter>
                <div>
                    <Navigator/>
                    <Router/>
                </div>
            </BrowserRouter>
        </Provider>

    );
}

export default App;