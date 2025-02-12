Create a bookmarklet with the URL set to: 

`javascript:(function(){var%20js=document.createElement('script');js.setAttribute('src','https://cdn.jsdelivr.net/gh/ThomasHaz/jsdelivr/humblebundler.js');document.body.appendChild(js);})();`

Click the bookmark on each purchased bundle page, e.g. each product as viewed from [here](https://www.humblebundle.com/home/purchases)

Once you have visited the bookmarklet from each bundle you wish to download, open the JS console and run:
`logAndClear();`

You can copy the log entry to your terminal and batch download using curl.

You can check the state of errors with:

`find . -type f -name "*.err" -exec grep "curl" {} +`

This will output eg `/example/filename.err:curl: (18) Transferred a partial file`
