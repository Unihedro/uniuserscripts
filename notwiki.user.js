// ==UserScript==
// @name         Not wiki tweaks
// @namespace    com.unihedro.musicfamily
// @version      1.0
// @description  Functionality improvements.
// @author       Unihedron
// @match        http://musicfamily.org/realm/*
// @grant        none
// @require      https://code.jquery.com/jquery-3.2.1.min.js
// ==/UserScript==

// Make templates copyable
const sRe = /\n/g;
$('p>b:contains(Template)').parent().each((_, v) => {
    var $v = $(v);
    var next = $v.next();
    var nodes = $v.add(next);
    var template = next.text().replace(sRe, '').trim();
    while (template.endsWith(',')) {
        nodes = nodes.add(next = next.next());
        template += next.text().replace(sRe, '').trim();
    }
    nodes.css('color', 'red').on('click', () => prompt('Copy template: ', template));
});
