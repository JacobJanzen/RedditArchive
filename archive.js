const reddit = new RegExp("^https?://(www\.|old\.)?reddit\.com");
if (reddit.test(window.location.href)) {
    window.location.replace("https://web.archive.org/web/*/" + window.location.href);
} else {
    newURL = window.location.href.split("*", 2)[1].substr(1);
    if (reddit.test(newURL)) {
        fetch("https://web.archive.org/wayback/available?url="+newURL)
            .then(response => response.json())
            .then(response => window.location.replace(response.archived_snapshots.closest.url))
    }
}


