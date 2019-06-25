export class Rss {

  fetch(websiteUrl).then((res) => {
    res.text().then((htmlTxt) => {
      var domParser = new DOMParser()
      let doc = domParser.parseFromString(htmlTxt, 'text/html')
      var feedUrl = doc.querySelector('link[type="application/rss+xml"]').href
    })
  }).catch(() => console.error('Error in fetching the website'))

}
