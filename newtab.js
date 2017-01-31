function ajax(url, callback, data, post, x) {
	try {
		x = new(this.XMLHttpRequest || ActiveXObject)('MSXML2.XMLHTTP.3.0');
    if (!post && data) {
      var delim = (url.indexOf('?') == -1) ? '?' : '&';
      for (var k in data) {
        url += delim + encodeURIComponent(k) + '=' + encodeURIComponent(data[k]);
        delim = '&';
      }
    }
		x.open(post ? 'POST' : 'GET', url, 1);
		x.setRequestHeader('X-Requested-With', 'XMLHttpRequest');
		x.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
		x.onreadystatechange = function () {
			x.readyState > 3 && callback && callback(x.responseText, x);
		};
    if (post) {
      x.send(data)
    } else {
      x.send()
    }
	} catch (e) {
		window.console && console.log(e);
	}
};

function jsonp(url, callback, data) {
  var cb = 'callback' + ((new Date()).getTime()) + '' + ((Math.random() * 1000) | 0);
  window[cb] = function(res) {
    delete window[cb];
    script.remove();

    callback(res);
  }

  var script = document.createElement('script');
  script.type = 'text/javascript';

  var uri = url + '?callback=' + cb;

  data = data || {};
  for (var k in data) {
    uri += '&' + encodeURIComponent(k) + '=' + encodeURIComponent(data[k]);
  }

  script.src = uri;
  document.getElementsByTagName('head')[0].appendChild(script);
}

function el(parent, id) {
  return (id ? parent : document).getElementById(id ? id : parent);
}
function cl(parent, className) {
  return (className ? parent : document).getElementsByClassName(className ? className : parent);
}
function cl1(parent, className) {
  return (className ? parent : document).getElementsByClassName(className ? className : parent)[0];
}


/*
Not really needed
jsonp('https://yandex.ru/images/', function(result) {
  console.log(result);
  if (result && result.blocks && result.blocks.length &&
      result.blocks[0] && result.blocks[0].params && result.blocks[0].params.images &&
      result.blocks[0].params.images.length) {
    var images = result.blocks[0].params.images;
    //el('image').style.backgroundImage = 'url(https:' + images[0].slide.preview + ')';
    el('image').style.backgroundImage = 'url(https://yandex.ru/images/today?size=1920x1080)';
  }
}, {
  format: 'json',
  request: JSON.stringify([{
    block: 'b-501px__data',
    version: 2
  }]),
  yu: '1160362191462569503',
  date: new Date().toISOString().slice(0, 10)
});
*/


chrome.runtime.sendMessage({ type: 'getImage' }, function(data) {
	el('image').style.backgroundImage = 'url(' + data.url + ')';
	console.log('Meta: ', data.meta);
	el('attribution').innerHTML =
		'<div class="title">' + (data.meta.title || '&nbsp;') + '</div>' +
		'<div class="copyright">' +
			(data.meta.author ? '<a href="' + data.meta.link + '" target="_blank" class="author">' + data.meta.author + '</a> (' +
				'<span class="providers">' + data.meta.providers.join(', ') + '</span>)' :
			('<a href="' + data.meta.link + '" target="_blank" class="providers">' + data.meta.providers.join(', ') + '</a>')) +
		'</div>';
});

/*ajax('https://p.ya.ru/saint-petersburg', function(result) {
  //console.log(result);
  var temp = result.match(/{&quot;temp-current&quot;:{&quot;temp&quot;:([^}]+)}}/);
  var forecast = result.match(/<div class="today-forecast">([^<]+)<\/div>/);
  console.log(parseFloat(temp[1]), forecast[1]);
}, {
  lat: 59.934516,
  lon: 30.40466
});*/

function time() {
  var dt = new Date();
  return dt.getHours() + ':' + (dt.getMinutes() < 10 ? '0' : '') + dt.getMinutes();
}

var lastTime = el('time').innerHTML = time();
setInterval(function() {
  var tm = time();
  if (lastTime != tm) {
    lastTime = el('time').innerHTML = tm;
  }
}, 300);
