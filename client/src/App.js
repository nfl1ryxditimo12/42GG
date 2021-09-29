import React from "react";
import bg from "./images/background.jpeg";
import { createGlobalStyle } from "styled-components";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import Main from "./components/views/Main";
import NotFound from "./components/views/NotFound";
import ProfileContainer from "./containers/ProfileContainer";

const GlobalStyle = createGlobalStyle`
	html {
		width: 100%;
		height: 100%;
	}
	body {
		background-color: #2e2f32;
		// background-image: url(${bg});
		width: 100%;
		height: 100%;
		margin: 0;
	}
	#root {
		width: 100%;
		height: 100%;
	}
`;

function App() {
    return (
        <Router>
            <GlobalStyle />
            <Switch>
                <Route exact path={"/"} component={Main} />
                <Route exact path={"/profile/:id"} component={ProfileContainer} />
                <Route component={NotFound} />
            </Switch>
        </Router>
    );
}

export default App;
