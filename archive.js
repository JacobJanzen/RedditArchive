const reddit = new RegExp("^https?://(www\.|old\.)?reddit\.com/r/.*/comments/");

if (reddit.test(window.location.href)) { // in a reddit comment section
    // redirect to archive.org to allow a requests to archive.org
    window.location.replace("https://web.archive.org/web/*/" + window.location.href);
} else { // on archive.org
    tokens = window.location.href.split("*", 2); // get reddit url and archive url
    tokens[1] = tokens[1].replace(/^[\/]/, "") // remove leading slash from reddit url

    // if this is a reddit comment section and searching all history, move to latest snapshot
    if (tokens[1] && reddit.test(tokens[1]) && tokens[0] === "https://web.archive.org/web/") {
        fetch("https://web.archive.org/wayback/available?url="+tokens[1])
            .then(response => response.json())
            .then(response => window.location.replace(response.archived_snapshots.closest.url))
    }
}


