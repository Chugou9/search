import '../../../Styles/app.css';
import { ImagePreviewComponent } from "../../../Common/Modules/ImagePreview/Components/ImagePreviewComponent";

export class ResultsView extends HTMLElement {
    constructor() {
        super();
        ResultsView.imageData = null;
        this.attachShadow({mode: 'open'});
        const resultsViewContainer = document.createElement('div');
        const searchImagePanel = document.createElement('input', {is: 'search-panel'});

        searchImagePanel.setAttribute('class', 'search-panel__input');
        searchImagePanel.value = this.searchPanelInputValue;
        searchImagePanel.onkeyup = (event) => {
            const value = event.target.value;

            this.onChangeSearchPanelInputValue(value);
        };

        const linkElem = document.createElement('link');
        linkElem.setAttribute('rel', 'stylesheet');
        linkElem.setAttribute('href', 'app.css');

        resultsViewContainer.setAttribute('class', 'results-view');
        resultsViewContainer.setAttribute('id', 'view-container')

        this.shadowRoot.appendChild(linkElem);
        this.shadowRoot.appendChild(searchImagePanel);
        this.shadowRoot.appendChild(resultsViewContainer);
    }

    get imageData() {
        let result = null;

        if (this._imageData) {
            result = imageData;
        }

        return result;
    }

    set imageData(data) {
        const imageData = data;

        if (Array.isArray(imageData) && imageData.length) {
            let imageContainers = [];
            const resultsViewContainer = this.shadowRoot.getElementById('view-container');
            resultsViewContainer.innerHTML = null;

            imageContainers = imageData.map((imageLink, index) => {
                const imageContainer = new ImagePreviewComponent(imageLink, '100', '100');
                imageContainer.setAttribute('class', 'image');

                return imageContainer;
            });
            imageContainers.length && resultsViewContainer.append(...imageContainers);
        }

        this._imageData = data;
    }
}

customElements.define('results-view', ResultsView);