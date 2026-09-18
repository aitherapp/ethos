import{t as e}from"./assets/iroh-Czgn42oN.js";function t(){let e=new Uint8Array(2);return typeof crypto<`u`&&crypto.getRandomValues?crypto.getRandomValues(e):(e[0]=Math.floor(Math.random()*256),e[1]=Math.floor(Math.random()*256)),`Visitor #${Array.from(e).map(e=>e.toString(16).padStart(2,`0`)).join(``)}`}function n(e){if(!e.ownerTicket)throw Error(`ETHOS Widget requires data-owner-ticket attribute.`);return{ownerTicket:e.ownerTicket,title:e.title||`Chat with us`,greeting:e.greeting||`Hello! How can we help you today?`,primaryColor:e.primaryColor||`#000000`}}function r(e,t,n,r){return{type:`ethos_widget_init`,visitorId:e,page:t,referrer:n,message:r,timestamp:Date.now()}}function i(e){let t=document.createElement(`div`);t.id=`ethos-widget-root`,document.body.appendChild(t);let n=t.attachShadow({mode:`open`}),r=document.createElement(`style`);r.textContent=`
    * { box-sizing: border-box; margin: 0; padding: 0; font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif; }
    
    .ethos-launcher {
      position: fixed;
      bottom: 20px;
      right: 20px;
      width: 60px;
      height: 60px;
      border-radius: 30px;
      background: ${e.primaryColor};
      color: #ffffff;
      border: none;
      cursor: pointer;
      box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
      display: flex;
      align-items: center;
      justify-content: center;
      z-index: 99999;
      transition: transform 0.2s ease, box-shadow 0.2s ease;
    }
    .ethos-launcher:hover {
      transform: scale(1.05);
      box-shadow: 0 6px 16px rgba(0, 0, 0, 0.2);
    }
    .ethos-launcher svg {
      width: 28px;
      height: 28px;
      fill: currentColor;
    }

    .ethos-chat-window {
      position: fixed;
      bottom: 90px;
      right: 20px;
      width: 360px;
      max-width: calc(100vw - 40px);
      height: 520px;
      max-height: calc(100vh - 120px);
      background: #ffffff;
      border-radius: 16px;
      box-shadow: 0 8px 32px rgba(0, 0, 0, 0.16);
      display: flex;
      flex-direction: column;
      z-index: 99999;
      opacity: 0;
      transform: translateY(20px) scale(0.95);
      pointer-events: none;
      transition: opacity 0.25s ease, transform 0.25s ease;
      overflow: hidden;
      border: 1px solid #e5e7eb;
    }

    .ethos-chat-window.open {
      opacity: 1;
      transform: translateY(0) scale(1);
      pointer-events: auto;
    }

    .ethos-header {
      background: ${e.primaryColor};
      color: #ffffff;
      padding: 16px 20px;
      display: flex;
      align-items: center;
      justify-content: space-between;
    }
    .ethos-header-title {
      font-weight: 600;
      font-size: 16px;
    }
    .ethos-header-subtitle {
      font-size: 12px;
      opacity: 0.8;
      display: flex;
      align-items: center;
      gap: 6px;
      margin-top: 2px;
    }
    .ethos-online-dot {
      width: 8px;
      height: 8px;
      background: #22c55e;
      border-radius: 50%;
      display: inline-block;
    }

    .ethos-messages {
      flex: 1;
      padding: 16px;
      overflow-y: auto;
      display: flex;
      flex-direction: column;
      gap: 10px;
      background: #f9fafb;
    }

    .ethos-msg {
      max-width: 80%;
      padding: 10px 14px;
      border-radius: 12px;
      font-size: 14px;
      line-height: 1.4;
      word-break: break-word;
    }
    .ethos-msg.owner {
      align-self: flex-start;
      background: #ffffff;
      color: #1f2937;
      border: 1px solid #e5e7eb;
    }
    .ethos-msg.visitor {
      align-self: flex-end;
      background: ${e.primaryColor};
      color: #ffffff;
    }

    .ethos-input-area {
      padding: 12px;
      background: #ffffff;
      border-top: 1px solid #e5e7eb;
      display: flex;
      gap: 8px;
    }
    .ethos-input {
      flex: 1;
      border: 1px solid #d1d5db;
      border-radius: 20px;
      padding: 10px 16px;
      font-size: 14px;
      outline: none;
    }
    .ethos-input:focus {
      border-color: ${e.primaryColor};
    }
    .ethos-send-btn {
      background: ${e.primaryColor};
      color: #ffffff;
      border: none;
      border-radius: 20px;
      padding: 0 16px;
      font-weight: 600;
      cursor: pointer;
      font-size: 14px;
    }

    .ethos-footer {
      padding: 8px;
      text-align: center;
      background: #f3f4f6;
      font-size: 11px;
      color: #6b7280;
      border-top: 1px solid #f3f4f6;
    }
    .ethos-footer a {
      color: #4b5563;
      text-decoration: none;
      font-weight: 600;
    }
    .ethos-footer a:hover {
      text-decoration: underline;
    }
  `;let i=document.createElement(`button`);i.className=`ethos-launcher`,i.innerHTML=`
    <svg viewBox="0 0 24 24">
      <path d="M20 2H4c-1.1 0-2 .9-2 2v18l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm0 14H5.2L4 17.2V4h16v12z"/>
    </svg>
  `;let a=document.createElement(`div`);a.className=`ethos-chat-window`;let o=document.createElement(`div`);o.className=`ethos-header`,o.innerHTML=`
    <div>
      <div class="ethos-header-title">${e.title}</div>
      <div class="ethos-header-subtitle">
        <span class="ethos-online-dot"></span> End-to-end encrypted
      </div>
    </div>
  `;let s=document.createElement(`div`);if(s.className=`ethos-messages`,e.greeting){let t=document.createElement(`div`);t.className=`ethos-msg owner`,t.textContent=e.greeting,s.appendChild(t)}let c=document.createElement(`div`);c.className=`ethos-input-area`;let l=document.createElement(`input`);l.className=`ethos-input`,l.placeholder=`Write a message...`;let u=document.createElement(`button`);u.className=`ethos-send-btn`,u.textContent=`Send`,c.appendChild(l),c.appendChild(u);let d=document.createElement(`div`);return d.className=`ethos-footer`,d.innerHTML=`
    E T H O S by aitherapp · <a href="https://github.com/aitherapp/ethos-core" target="_blank" rel="noopener noreferrer">GitHub</a>
  `,a.appendChild(o),a.appendChild(s),a.appendChild(c),a.appendChild(d),n.appendChild(r),n.appendChild(i),n.appendChild(a),i.addEventListener(`click`,()=>{a.classList.toggle(`open`)}),{container:t,shadowRoot:n,toggleButton:i,chatWindow:a,messageLog:s,inputField:l,sendButton:u}}(async function(){if(typeof window>`u`||typeof document>`u`)return;let a=document.querySelectorAll(`script[data-owner-ticket]`),o=a[a.length-1];if(!o){console.warn(`[ETHOS Widget] Script tag missing data-owner-ticket attribute.`);return}try{let a=n({ownerTicket:o.getAttribute(`data-owner-ticket`)||void 0,title:o.getAttribute(`data-title`)||void 0,greeting:o.getAttribute(`data-greeting`)||void 0,primaryColor:o.getAttribute(`data-color`)||void 0}),s=localStorage.getItem(`ethos_widget_visitor_id`)||t();localStorage.setItem(`ethos_widget_visitor_id`,s);let c=i(a);await e.initialize(s);let l=a.ownerTicket;await e.connectByTicket(l);let u=!0;e.onMessage(e=>{if(e.senderId===l||e.receiverId===s){let t=e.content;if(t){let e=document.createElement(`div`);e.className=`ethos-msg owner`,e.textContent=t,c.messageLog.appendChild(e),c.messageLog.scrollTop=c.messageLog.scrollHeight}}});let d=async()=>{let t=c.inputField.value.trim();if(!t)return;let n=document.createElement(`div`);if(n.className=`ethos-msg visitor`,n.textContent=t,c.messageLog.appendChild(n),c.messageLog.scrollTop=c.messageLog.scrollHeight,c.inputField.value=``,u){let n=r(s,window.location.pathname||`/`,document.referrer||``,t);await e.sendMessage(l,JSON.stringify(n)),u=!1}else await e.sendMessage(l,t)};c.sendButton.addEventListener(`click`,d),c.inputField.addEventListener(`keydown`,e=>{e.key===`Enter`&&d()})}catch(e){console.error(`[ETHOS Widget]`,e)}})();