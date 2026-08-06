// ==UserScript==
// @name         Hotkey script
// @namespace    accomodata
// @version      1.0.2
// @description  Add hotkeys to the environment
// @author       Kenzo Staelens
// @match        *://*.accomodata.be/*
// @icon         data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw==
// @require      https://raw.githubusercontent.com/kenzo-staelens/accomodata_gm_scripts/refs/heads/main/gm_hotkey_util.js
// ==/UserScript==

function bind_goto_taskid(host){
        let id = prompt("Task ID")
        if (!id) return;
        return `/odoo/my-tasks/${id}`
    }

//possible modifiers: c(trl), s(hift), a(lt)

/* eslint-disable no-alert, no-multi-spaces */

(function() {
    'use strict';
    let HotkeyBinding = unsafeWindow.HotkeyBinding;
    // note: ctrl+shift+1 before ctrl+shift as first match counts (and ctrl+1 would also match ctrl+shift+1)
    unsafeWindow.KEYBINDS.push(
        new HotkeyBinding({key: '1', modifiers:['c', 's'], name:"Ctrl+Shift 1", description :"Infrastructure", action : "/odoo/action-2945?debug=1" }),
        new HotkeyBinding({key: '1', modifiers:['c'],      name:"Ctrl 1",       description :"My Tasks",       action : "/odoo/my-tasks?debug=1" }),
        new HotkeyBinding({key: '2', modifiers:['c'],      name:"Ctrl 2",       description :"My HR Project",  action : "/odoo/project.project/2103" }),
        new HotkeyBinding({key: '3', modifiers:['c'],      name:"Ctrl 3",       description :"Infra Helpdesk", action : "/odoo/helpdesk/11/tickets" }),
        new HotkeyBinding({key: '4', modifiers:['c'],      name:"Ctrl 4",       description :"My timesheets",  action : "/odoo/timesheets" }),
        new HotkeyBinding({key: ';', modifiers:['c'],      name:"Ctrl ;",       description :"GOTO task id",   action : bind_goto_taskid }),
    )
})();


