import '../../Styles/app.css';
import { SearchPanel } from './SearchPanel';
import { ViewResultsComponentActions } from '../../Modules/ViewResultsComponent/Actions/ViewResultsComponentActions';
import { ViewResultsComponentServices } from '../../Modules/ViewResultsComponent/Services/ViewResultsComponentServices';
import {dispatch} from '../index';
import { ResultsView } from './ResultsView/ResultsView';

export class App extends HTMLElement {
    constructor() {
        super();

        this.attachShadow({mode: 'open'});

        const viewComponentActions = new ViewResultsComponentActions(new ViewResultsComponentServices, dispatch);
        let searchPanelInputValue = '';
        let navigationPanelInputValue = '';

        customElements.define('search-panel', SearchPanel, {extends: 'input'});
        const searchPanel = document.createElement('input', {is: 'search-panel'});


        const navigationPanel = document.createElement('div');
        navigationPanel.setAttribute('class', 'navigation-panel');
        navigationPanel.textContent = 'NAV';
        navigationPanel.appendChild(searchPanel);
        

        // const resultsView = new ResultsView();
        const resultsView = document.createElement('results-view');
        resultsView.searchPanelInputValue = searchPanelInputValue;
        resultsView.setAttribute('class', 'search-results');
        resultsView.onChangeSearchPanelInputValue = this.handleChangeSearchPanelInputValue;
        loadData();
        
        const container = document.createElement('div');
        container.setAttribute('class', 'container');
        
        const linkElem = document.createElement('link');
        linkElem.setAttribute('rel', 'stylesheet');
        linkElem.setAttribute('href', 'app.css');

        container.appendChild(navigationPanel);
        container.appendChild(resultsView);

        this.shadowRoot.appendChild(linkElem);
        this.shadowRoot.appendChild(container);
        // container.setAttribute('class', 'container');
        // const shadow = this.attachShadow({mode: 'open'});
        // shadow.appendChild(container);
        // console.log('hi');
        async function loadData() {
            const data = await viewComponentActions.getImages({
                dataType: 'image',
                data: 'nature',
                amount: 50,
            });

            resultsView.imageData = window.store.getState().ViewResultsState.asyncImages.data;
        }
    }

    handleChangeSearchPanelInputValue = (value) => {
        this.searchPanelInputValue = value;
    };
}