import {App} from "./app";
new App();

window["onSignIn"] = function() {
    console.log("Hello World!");
};