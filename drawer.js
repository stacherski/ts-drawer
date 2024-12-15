class TSDrawer extends HTMLElement
{
    constructor()
    {
        super();
        // Drawer ID
        this.drawerId = this.getAttribute("id") || crypto.randomUUID();
        // set default ID
        if (!this.getAttribute("id"))
            this.setAttribute("id", this.drawerId);
        /// default options
        this.settings = {};
        this.settings.position = this.getAttribute('position') || 'bottom';
        this.settings.button = this.getAttribute('button-text') || 'Open drawer';
        ///
        this.settings.content = this.innerHTML;
        // render Drawer structure
        this.innerHTML = `
            <button class="btn btn__solid_primary">${this.settings.button}</button>
        `;
        const button = this.querySelector('button');
        button.addEventListener('click', e => this.openDrawer())
    }
    openDrawer()
    {
        //// Dispatch custom event 'ts-drawer-before-open'
        const cEvent = new CustomEvent("ts-drawer-before-open");
        this.dispatchEvent(cEvent);
        //// OVERLAY
        const overlay = document.createElement('div');
        overlay.classList.add('ts-overlay');
        overlay.setAttribute('data-id', this.drawerId);
        document.querySelector('body').appendChild(overlay);
        overlay.addEventListener('click', e => this.closeDrawer());
        //// DRAWER
        const drawer = document.createElement('div');
        drawer.innerHTML = this.settings.content;
        drawer.classList.add('ts-drawer', `${this.settings.position}`);
        drawer.setAttribute('role', 'dialog');
        drawer.setAttribute('data-id', this.drawerId);
        drawer.setAttribute('role', 'dialog');
        document.querySelector('body').appendChild(drawer);
        //// CLOSE BTN
        const btn = document.createElement('button');
        btn.classList.add('btn','btn__outline_primary');
        btn.textContent = 'Close';
        drawer.appendChild(btn);
        btn.addEventListener('click', e => this.closeDrawer());
        btn.focus()
        //// Dispatch custom event 'ts-drawer-after-open'
        drawer.addEventListener('transitionend',e=>{
            const cEvent = new CustomEvent("ts-drawer-after-open");
            this.dispatchEvent(cEvent);
        })
        //// DELAY
        setTimeout(() => 
            {
                document.querySelector(`.ts-drawer[data-id="${this.drawerId}"]`).setAttribute('data-state', 'open');
                document.querySelector(`.ts-overlay[data-id="${this.drawerId}"]`).setAttribute('data-state', 'open')
            }, 300)
    }
    closeDrawer()
    {
        //// Dispatch custom event 'ts-drawer-before-close'
        const cEvent = new CustomEvent("ts-drawer-before-close");
        this.dispatchEvent(cEvent);
        const drawer = document.querySelector(`.ts-drawer[data-id="${this.drawerId}"]`);
        const overlay = document.querySelector(`.ts-overlay[data-id="${this.drawerId}"]`);
        const body = document.querySelector('body');
        //// Invoke change by removing data state attribute
        drawer.removeAttribute('data-state');
        overlay.removeAttribute('data-state');
        //// Set attribute on body to use in CSS to block all user input during transition
        body.toggleAttribute('freeze');
        //// Remove elements from DOM after transition end
        //// It makes it in sync with transition time set in CSS
        drawer.addEventListener('transitionend', e => 
            {
                e.target.remove();
                //// remove attribute to unlock user input
                body.removeAttribute('freeze');
                //// Dispatch custom event 'ts-drawer-after-close'
                const cEvent = new CustomEvent("ts-drawer-after-close");
                this.dispatchEvent(cEvent);
            });
        overlay.addEventListener('transitionend', e => e.target.remove())
    }
}
// register new custom element
window.customElements.define("ts-drawer", TSDrawer)

document.addEventListener('DOMContentLoaded',e=>{
//    console.log(e);
    document.querySelectorAll('ts-drawer').forEach(drawer=>{
        drawer.addEventListener('ts-drawer-before-open',evt=>{
            console.log(evt);
        })
        drawer.addEventListener('ts-drawer-after-open',evt=>{
            console.log(evt);
        })
        drawer.addEventListener('ts-drawer-before-close',evt=>{
            console.log(evt);
        })
        drawer.addEventListener('ts-drawer-after-close',evt=>{
            console.log(evt);
        })
    })
})
