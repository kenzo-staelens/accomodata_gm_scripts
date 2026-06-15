// ==UserScript==
// @name         Hotkey script
// @namespace    accomodata
// @version      2025-08-04
// @description  Add hotkeys to the environment
// @author       Kenzo Staelens
// @match        *://*.accomodata.be/*
// @icon         data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw==
// ==/UserScript==

function bind_goto_taskid(host){
        let id = prompt("Task ID")
        if (!id) return;
        return `/odoo/my-tasks/${id}`
    }

(function() {
    'use strict';
    let HotkeyBinding = unsafeWindow.HotkeyBinding;
    unsafeWindow.KEYBINDS.push(
        new HotkeyBinding({key: '1', modifiers:['c'], name:"Ctrl 1", description :"My Tasks      ", action : "/odoo/my-tasks?debug=1" }),
        new HotkeyBinding({key: '2', modifiers:['c'], name:"Ctrl 2", description :"Internal Tasks", action : "/odoo/timesheets/project.task/19299" }),
        new HotkeyBinding({key: '3', modifiers:['c'], name:"Ctrl 3", description :"Infra Helpdesk", action : "/odoo/helpdesk/11/tickets" }),
        new HotkeyBinding({key: '4', modifiers:['c'], name:"Ctrl 4", description :"My timesheets ", action : "/odoo/timesheets" }),
        new HotkeyBinding({key: ';', modifiers:['c'], name:"Ctrl ;", description :"GOTO task id  ", action : bind_goto_taskid }),
    )
})();


