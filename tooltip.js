const TooltipAttributes = {
  text: "text",
};

class Tooltip extends HTMLElement {
  _tooltipText;
  _tooltipIcon;
  _isVisible;

  //Basic initializations
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
    this.shadowRoot.innerHTML = `<slot>Some default</slot><span>(?)</span>`;
    this._tooltipText = "";
    this._isVisible = false;
  }

  //Here the component is loaded into de DOM and it's possible to work with it
  connectedCallback() {
    if (this.hasAttribute(TooltipAttributes.text))
      this._tooltipText = this._text;
    this._addTooltipListeners();
    this._render();
  }

  //Observed attribute updated, update data + DOM
  attributeChangedCallback(name, oldValue, newValue) {
    if (oldValue !== newValue)
      switch (name) {
        case TooltipAttributes.text:
          this._tooltipText = newValue;
      }
  }

  //Element detached from DOM, cleanup work
  disconnectedCallback() {
    this._tooltipIcon.removeEventListener("mouseenter", this._showTooltip);
    this._tooltipIcon.removeEventListener("mouseleave", this._hideTooltip);
  }

  static get observedAttributes() {
    return [TooltipAttributes.text];
  }

  get _text() {
    return this.getAttribute(TooltipAttributes.text);
  }

  _addTooltipListeners() {
    this._tooltipIcon = this.shadowRoot.querySelector("span");
    this._tooltipIcon.addEventListener(
      "mouseenter",
      this._showTooltip.bind(this)
    );
    this._tooltipIcon.addEventListener(
      "mouseleave",
      this._hideTooltip.bind(this)
    );
    this.shadowRoot.appendChild(this._tooltipIcon);
  }

  _showTooltip() {
    this._isVisible = true;
    this._render();
  }
  _hideTooltip() {
    this._isVisible = false;
    this._render();
  }

  _render() {
    let tooltipContainer = this.shadowRoot.querySelector("div");
    if (this._isVisible) {
      tooltipContainer = document.createElement("div");
      tooltipContainer.textContent = this._tooltipText;
      this.shadowRoot.appendChild(tooltipContainer);
    } else if (tooltipContainer) {
      this.shadowRoot.removeChild(tooltipContainer);
    }
  }
}

customElements.define("rfl-tooltip", Tooltip);
