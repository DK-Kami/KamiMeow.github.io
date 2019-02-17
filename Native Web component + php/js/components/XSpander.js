class XSpander extends HTMLElement {
  constructor () {
    super();

    this.text = {
      'when-close': 'Развернуть',
      'when-open': 'Свернуть',
    }

    this.smallStyle = `
    text-decoration: underline;
    cursor: pointer;
    `

    this.innerHTML = `
    <span class="subheading mb-5">Комментарии:</span>
    <small class="form-text text-muted" style="cursor: pointer;"><i>${this.text['when-close']}</i></small>
    <section style="display: none;">${this.innerHTML}</section>
    `;

    this.querySelector('small').addEventListener('click', () => {
      this.opened = !this.opened;
    })
  }

  get opened() {
    return (this.getAttribute('opened') !== null);
  }
  set opened(state) {
    if (!!state) {
      this.setAttribute('opened', '');
    }
    else {
      this.removeAttribute('opened');
    }
  }

  static get observedAttributes() {
    return [
      'opened',
      'text-when-open',
      'text-when-close',
    ];
  }

  attributeChangedCallback(attrName, oldVal, newVal) {
    switch(attrName) {
      case 'opened': 
        const opened = newVal !== null;
        const small = this.querySelector('small');
        const content = this.querySelector('section');
        const display = opened ? 'block' : 'none';
        const text = this.text[opened ? 'when-open' : 'when-close'];
        content.style.display = display;
        small.textContent = text;
        break;

      case 'text-when-close':
        this.text['when-open'] = newVal;
        if (this.opened) 
          this.querySelector('small').textContent = newVal;
        break;
      
      case 'text-when-close':
        this.text['when-close'] = newVal;
        if (!this.opened)
          this.querySelector('small').textContent = newVal;
        break;
    }
  }
}

customElements.define('x-spander', XSpander)
console.log('baka');