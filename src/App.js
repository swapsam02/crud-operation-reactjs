import React from 'react';
import { HashRouter as Router, Route, Switch } from 'react-router-dom'
import { ToastContainer, Flip } from 'react-toastify';
import routes from './routes'

function App() {
        
    return (
        <>  
            <ToastContainer
                draggable={false}
                position="top-center"
                transition={Flip}
                autoClose={3000}
                pauseOnHover={true}
            />
            <Router>
                <Switch>
                    {routes.map((route, id) =>{
                        return route.component ? (
                            <Route
                                key = {id}
                                path = {route.path}
                                exact = {route.exact}
                                name = {route.name}
                                component = {route.component}
                            />
                        ) : (null);
                    })}
                </Switch>
            </Router>
        </>
    );
}

export default App;
