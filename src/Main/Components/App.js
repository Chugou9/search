export class App extends HTMLElement {
    constructor() {
        super();

        this.attachShadow({mode: 'open'});
        const navigationPanel = document.createElement('div');
        const resultsView = document.createElement('div');

        resultsView.setAttribute('class', 'search-results');
        navigationPanel.setAttribute('class', 'navigation-panel');

        this.shadowRoot.append(resultsView, navigationPanel);
    }
}