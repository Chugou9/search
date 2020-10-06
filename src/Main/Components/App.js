import '../../Styles/app.css';
import { SearchPanel } from './SearchPanel';
import { ViewResultsComponentActions } from '../../Modules/ViewResultsComponent/Actions/ViewResultsComponentActions';
import { ViewResultsComponentServices } from '../../Modules/ViewResultsComponent/Services/ViewResultsComponentServices';
import {dispatch} from '../index';
import { ResultsView } from './ResultsView/ResultsView';
import { image } from 'faker';

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
        resultsView.onChangeSearchPanelInputValue = this.handleChangeSearchPanelInputWrapped;
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

        async function loadData() {
            const data = await viewComponentActions.getImages({
                dataType: 'image',
                data: 'nature',
                amount: 50,
            });

            resultsView.imageData = window.store.getState().ViewResultsState.asyncImages.data;
        }
    }

    handleChangeSearchPanelInputValue = async (value) => {
        this.searchPanelInputValue = value;
        const container = this.shadowRoot.querySelector('.container');
        const resultsView = container.querySelector('results-view');
        const viewComponentActions = new ViewResultsComponentActions(new ViewResultsComponentServices, dispatch);
        
        const data = await viewComponentActions.getImages({
            dataType: 'image',
            data: value,
            amount: 50
        });

        resultsView.imageData = window.store.getState().ViewResultsState.asyncImages.data;
        container.appendChild(resultsView);

        this.shadowRoot.appendChild(container);
    };

    wrapper = (func, time) => {
        let isFuncCalled = false;
        let timerId;

        return function(...args) {
            if (timerId) {
                clearTimeout(timerId);
            };

            timerId = setTimeout(() => {func.apply(this, args)}, time);
        }
    };
    
    handleChangeSearchPanelInputWrapped = this.wrapper(this.handleChangeSearchPanelInputValue, 2000);
}