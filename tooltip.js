class Tooltip extends HTMLElement {
  _tooltipContainer;
  _tooltipText;
  _tooltipIcon;

  //Basic initializations
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
    this.shadowRoot.innerHTML = `<slot>Some default</slot><span>(?)</span>`;
    this._tooltipContainer = document.createElement("div");
    this._tooltipText = "";
  }

  //Here the component is loaded into de DOM and it's possible to work with it
  connectedCallback() {
    if (this.hasAttribute("text")) this._tooltipText = this._text;
    this._addTooltipListeners();
  }

  //Element detached from DOM, cleanup work
  disconnectedCallback() {}

  //Observed attribute updated, update data + DOM
  attributeChangedCallback() {}

  get _text() {
    return this.getAttribute("text");
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
    this._tooltipContainer.textContent = this._tooltipText;
    this.shadowRoot.appendChild(this._tooltipContainer);
  }

  _hideTooltip() {
    this.shadowRoot.removeChild(this._tooltipContainer);
  }
}

customElements.define("rfl-tooltip", Tooltip);
