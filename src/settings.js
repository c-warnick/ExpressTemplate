var siteUrl = 'https://belk-content.herokuapp.com/';

module.exports.APP = {
  name: 'Belk Internal Content Test',
  email: '',
  url: siteUrl,
  phone: '(888) 555-7355',
  debug: true,
  minified: false,
  rssUrl:'http://belk.mediaroom.com/pressreleases?pagetemplate=rss',
  productFeed:'feeds/dw/UploadSource_62061_ORIGINAL.xml',
  userKey:"T4-s-knHwp^7Zt#Y",
  priceFormat: (price) => {
    if(price === "" || price == undefined)
      console.error("Price not provided");
    
    var formatCheck = new Number(price).toString().indexOf('.');

    if(formatCheck !== -1){
      return `$${price}`;
    } else {
      return `$${price}.00`;
    }
    
  },
  renderDate: (date) => {
    var monthNames = [
      "January", "February", "March",
      "April", "May", "June", "July",
      "August", "September", "October",
      "November", "December"
    ];

    var date = new Date(date);
    var day = date.getDate();
    var monthIndex = date.getMonth();
    var year = date.getFullYear();

    return `${monthNames[monthIndex]} ${day}, ${year}`;
  }
};
