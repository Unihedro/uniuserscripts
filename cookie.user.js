// ==UserScript==
// @name Cookie Monster (uni ver.)
// @namespace uni.Cookie
// @include http://orteil.dashnet.org/cookieclicker/
// @include http://orteil.dashnet.org/cookieclicker/beta/
// @version 1
// @grant none
// @require https://craig.global.ssl.fastly.net/js/mousetrap/mousetrap.min.js?a4098
// ==/UserScript==

(function() {
    var checkReady = setInterval(function() {
        if (typeof Game.ready !== 'undefined' && Game.ready) {
            Game.LoadMod('http://aktanusa.github.io/CookieMonster/CookieMonster.js');
            Mousetrap.bind('x z',()=>Game.UpgradesInStore.filter(v=>v.name!=="Chocolate egg"&&v.pool!=='toggle'&&v.getPrice()<=Game.cookiesPs).forEach(v=>v.buy()));
            Mousetrap.bind('x c',()=>Object.keys(Game.Objects).map(k=>Game.Objects[k]).filter(v=>v.price<=Game.cookiesPs).reverse().forEach(v=>v.buy()));
            Mousetrap.bind('f c', () => {
                var js = document.createElement('script');
                js.setAttribute('type', 'text/javascript');
                js.setAttribute('id', 'frozenCookieScript');
                js.setAttribute('src', 'https://rawgithub.com/jtatum/FrozenCookies/master/frozen_cookies.js');
                document.head.appendChild(js);
            });
            setInterval(()=>{
                window.doauto && (Game.shimmers.forEach(v=>v.pop()),
                                  Game.UpgradesById[74].unlocked && Game.UpgradesById[74].buy(),
                                  Game.season || Game.UpgradesById[182].buy());
                var clicker = 0;
                const doClick = () => (clicker = setInterval(()=>Game.ClickCookie(), 50));
                if (Game.hasBuff('Dragonflight') || Game.hasBuff('Click frenzy')) {
                    if (!clicker)
                        doClick();
                } else if (clicker) {
                    clearInterval(clicker);
                    clicker = 0;
                }
            }, 500);
            clearInterval(checkReady);
        }
    }, 1000);
})();
window.doauto=true;
