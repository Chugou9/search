

export class ImagePreviewComponent extends HTMLElement {
    constructor(src, width, height) {
        super();

        this.attachShadow({mode: 'open'});

        const linkElement = document.createElement('link');
        linkElement.setAttribute('rel', 'stylesheet');
        linkElement.setAttribute('href', 'app.css');

        const imageContainer = document.createElement('div');
        imageContainer.setAttribute('class', 'image-container');
        const image = document.createElement('img');
        image.src = src;
        image.width = width;
        image.height = height;
        const tags = document.createElement('p');
        imageContainer.appendChild(image);
        imageContainer.appendChild(tags);

        this.shadowRoot.appendChild(linkElement);
        this.shadowRoot.appendChild(imageContainer);
    }
}

customElements.define('image-preview', ImagePreviewComponent);