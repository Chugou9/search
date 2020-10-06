import {App} from './Components/App';
import {configureStore} from '../Common/Store/ReduxStore';

const store = configureStore();
window.store = store;
export const dispatch = store.dispatch;

customElements.define('app-container', App);
const application = document.createElement("app-container");
document.body.appendChild(application);
