// ==UserScript==
// @name         Hotkey script util
// @namespace    accomodata
// @version      2025-08-04
// @description  base classes and functionalities for hotkey script
// @author       Kenzo Staelens
// @match        *://*/*
// @require      http://ajax.googleapis.com/ajax/libs/jquery/1.7.2/jquery.min.js
// @icon         data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw==
// @grant        GM_addStyle
// ==/UserScript==


class HotkeyBinding {
    constructor({key, action, name=null, description=null, modifiers=null}) {
        if (modifiers === null) modifiers=[]
        this.binding_key = key;
        this.modifiers = modifiers;
        this.name = name;
        this.action = action;
        if (description == null){
            this.description = action;
        }
        else {
            this.description = description;
        }
    }

    is_binding(e){
        let keyCode = e.which === 0 ? e.charCode : e.keyCode;
        let modifiers = this.parse_modifiers(e)
        let is_key = false;
        if (typeof(this.binding_key) == "number"){
            is_key = (this.binding_key == keyCode);
        }
        else {
            is_key = (this.binding_key.charCodeAt(0) == keyCode);
        }
        return [is_key, ...modifiers].reduce((a,b)=>{return a && b;})
    }

    parse_modifiers(e){
        let keyAlt = e.altKey;
        let keyCtrl = e.ctrlKey;
        let keyShift = e.shiftKey;

        let binds ={
            "a": keyAlt,
            "c": keyCtrl,
            "s": keyShift
        }
        return this.modifiers.map((m)=>{return binds[m]})
    }

    execute_binding(){
        let host = `${document.location.protocol}//${document.location.host}`;
        if (!this.action){
            return;
        }
        if (typeof(this.action) == "function"){
            window.location = this.action(host);
            return;
        }
        window.location = `${host}${this.action}`;
    }
}

unsafeWindow.HotkeyBinding = HotkeyBinding;
unsafeWindow.KEYBINDS = [
    // eslint-disable-next-line
    new HotkeyBinding({key: 192, modifiers:['c'], name:"Ctrl ²", description : "My Bindings",      action : build_popup} ),
];


let onKeyDown = (e) => {
    for(let bind of unsafeWindow.KEYBINDS){
       if (bind.is_binding(e)){
           bind.execute_binding();
           return
       }
    }

}

function build_popup(){
    let check = document.getElementById("gmPopupContainer");
    if (check){
        check.remove();
        return
    }
    let root = document.createElement("div")
    root.id = 'gmPopupContainer';
    let table = document.createElement("table")
    root.appendChild(table)
    for (let bind of unsafeWindow.KEYBINDS) {
        const node = document.createElement("tr");
        const left = document.createElement("td");
        const right = document.createElement("td");
        left.innerText = bind.name;
        right.innerText = bind.description;
        node.appendChild(left);
        node.appendChild(right);
        table.appendChild(node);
    }

    let button = document.createElement('button');
    button.id = "gmCloseDlgBtn";
    button.type= "button"
    button.innerText = "Close popup"
    button.onclick = ()=>{root.remove();}
    root.appendChild(button);
    document.body.appendChild(root);
}

//eslint-disable-next-line
GM_addStyle ( "                                                 \
    #gmPopupContainer {                                         \
        position:               fixed;                          \
        top:                    5%;                            \
        left:                   5%;                            \
        padding:                2em;                            \
        border:                 3px double black;               \
        border-radius:          1ex;                            \
        z-index:                9999;                            \
        color:                  #121212;                        \
        background:             #f8f8f2;                        \
    }                                                           \
    #gmPopupContainer button{                                   \
        cursor:                 pointer;                        \
        margin:                 1em 1em 0;                      \
        border:                 1px outset buttonface;          \
    }                                                           \
    #gmPopupContainer td{                                       \
        border:                 1px solid black;                \
        padding:                5px;                            \
    }                                                           \
" );

(function() {
    'use strict';
    document.addEventListener("keydown", onKeyDown);
})();

