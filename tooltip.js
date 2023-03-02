class Tooltip extends HTMLElement {
  //Basic initializations
  constructor() {
    super();
    this.tooltipContainer = document.createElement("div");
  }
  //Here the component is loaded into de DOM and it's possible to work with it
  connectedCallback() {
    const icon = document.createElement("span");
    icon.textContent = " (?)";
    icon.addEventListener("mouseenter", this._showTooltip.bind(this));
    icon.addEventListener("mouseleave", this._hideTooltip.bind(this));
    this.appendChild(icon);
  }
  //Element detached from DOM, cleanup work
  disconnectedCallback() {}

  //Observed attribute updated, update data + DOM
  attributeChangedCallback() {}

  _showTooltip() {
    this.tooltipContainer.textContent = "This is the tooltip text";
    this.appendChild(this.tooltipContainer);
  }

  _hideTooltip() {
    this.removeChild(this.tooltipContainer);
  }
}

customElements.define("rfl-tooltip", Tooltip);
