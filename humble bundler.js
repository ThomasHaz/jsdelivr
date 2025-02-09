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
    curl(title, lns);
}

function curl(title, links) {
    var punctuationless = title.replace(/[.,\/#!$%\^&\*;:{}=\-_`~()]/g,"");
    var t = punctuationless.replace(/\s{2,}/g," ");
    var out = `mkdir -p "${t}"; cd "${t}"; `;

    for (let i = 0; i < links.length; i++) {
        let fn = links[i].split('/').pop().split("?")[0];
        out += `curl -C - -O "${links[i]}" >/dev/null 2>"${fn}.err"; `;
    }
    out += "cd ..; "
    console.log(out);
}
get(["pdf", "mobi", "epub", "cbz", "zip", "prc", "pkg", "exe", "rar", "png"]);