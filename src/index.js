import React from 'react';
import ReactDOM from 'react-dom';

import '@clayui/css/lib/css/atlas.css';
import PollingLoader from './PollingLoader';

import PollingService from './services/PollingService';

class PollingLoaderWebComponent extends HTMLElement {

    /* For Local Testing */
    username = 'test@liferay.com';
    password = 'test1234';
    authString = `${this.username}:${this.password}`;

    baseURL = "http://localhost:8080/o/c/";

    objectName = this.getAttribute('objectName');
    objectEntryId = this.getAttribute('objectEntryId');
    pollingStatusFieldName = this.getAttribute('pollingStatusFieldName');
    pollingStatusFieldPending = this.getAttribute('pollingStatusFieldPending');
    pollingStatusFieldSuccess = this.getAttribute('pollingStatusFieldSuccess');
    mode = this.getAttribute('mode');
    client = this.getAttribute('client');

    constructor() {
        super();
    }

    connectedCallback() {

        if (!this.shadowRoot) {
            this.attachShadow({ mode: 'open' });
        }

        this.renderReactComponent();

    }

    renderReactComponent() {

        if (!this.shadowRoot.querySelector('.react-root')) {
            const reactRoot = document.createElement('div');
            reactRoot.className = 'react-root';
            this.shadowRoot.appendChild(reactRoot);
        }

        const spriteMap = window.Liferay ? window.Liferay.Icons.spritemap : "/icons.svg";

        ReactDOM.render(
            <>
                <PollingLoader
                    mode={this.mode}
                    spriteMap={spriteMap}
                    objectEntryId={this.objectEntryId}
                    pollingService={new PollingService(
                        this.baseURL, this.authString, this.client, this.objectName, this.pollingStatusFieldName,
                        this.pollingStatusFieldPending, this.pollingStatusFieldSuccess)}
                />                    
            </>,
            this.shadowRoot.querySelector('.react-root')
        );
    }

    disconnectedCallback() {
        ReactDOM.unmountComponentAtNode(this.shadowRoot.querySelector('.react-root'));
    }
}

const POLLING_LOADER_ELEMENT_ID = 'polling-loader';

if (!customElements.get(POLLING_LOADER_ELEMENT_ID)) {
	customElements.define(POLLING_LOADER_ELEMENT_ID, PollingLoaderWebComponent);
}