import page from "../node_modules/page/page.mjs";
import { render } from "../node_modules/lit-html/lit-html.js";
import { renderNavi } from "./btnnavi.js";
import { renderLogin } from "./login.js";
import { renderHome } from "./homePage.js";
import { renderRegister } from "./register.js";
import { renderDash } from "./dashboard.js"; 
import { renderCreate } from "./addAlbum.js";
import { renderDetails } from "./details.js";
import { renderEdit } from "./edit.js";




const root = document.getElementById('main-content');

page(decoration)
page("/Login", renderLogin);
page("/Register", renderRegister);
page("/", renderHome)
page("/Dashboard", renderDash);
page("/Create", renderCreate);
page("/albums/:id", renderDetails);
page("/edit/:id", renderEdit)

renderNavi();

page.start();

function decoration(ctx, next){
    ctx.render = (content) => render(content, root);
    ctx.renderNavi = renderNavi;
    next();
 }

 

