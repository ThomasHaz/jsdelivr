const KEY = "humble_key";
function get(t) {
    var title = document.getElementById("hibtext").innerHTML;
    title = $('<textarea />').html(title.trim().split("\n")[0].split("br>")[1]).text();
    let lns = [];
    let lsa = document.getElementsByTagName("a");
    for (let i = 0; i < lsa.length; i++) {
        let a = lsa[i].href;
        if(a.indexOf("torrents") < 0) {
            for (let x = 0; x < t.length; x++) {
                if(a.indexOf(`.${t[x]}`) >= 0) {
                    lns.push(a);
                }
            }
        }
    }
    addToLocal(title, lns);
}

function curl(item) {
    let title = item.title;
    let links = item.links;
    var out = `mkdir -p "${title}"; cd "${title}"; `;

    for (let i = 0; i < links.length; i++) {
        let fn = links[i].split('/').pop().split("?")[0];
        out += `curl -C - -O "${links[i]}" >/dev/null 2>"${fn}.err"; `;
    }
    out += "cd ..; "
    return out;
}

function addToLocal(title, links) {
    var items = [];
    if (KEY in localStorage) {
        items = JSON.parse(localStorage.getItem(KEY));
    }
    items.push({"title": title.replace(/[.,\/#!$%\^&\*;:{}=\-_`~()]/g,"").replace(/\s{2,}/g," "), "links": links});
    localStorage.setItem(KEY, JSON.stringify(items));
}

function logLocal() {
    if (KEY in localStorage) {
        var out = "";
        let items = JSON.parse(localStorage.getItem(KEY));
        for(let i = 0; i < items.length; i++) {
            out += curl(items[i]);
        }
        console.log(out);
    } else {
        console.log(`${KEY} not found. :( `);
    }
    
}

function logAndClear() {
    logLocal();
    localStorage.removeItem(KEY);
}

get(["pdf", "mobi", "epub", "cbz", "zip", "prc", "pkg", "exe", "rar", "png"]);

/* 
   Once you have run the code on each page...
   Call `logAndClear();` to output the content of the cookie (and delete it).
*/