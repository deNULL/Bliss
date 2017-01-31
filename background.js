var targetWidth = screen.availWidth * window.devicePixelRatio;
var targetHeight = screen.availHeight * window.devicePixelRatio;

var available = [];
var availableLoaded = 0;
function addAvailable(photo) {
  if ('id' in photo) {
    for (var i = 0; i < available.length; i++) {
      if (available[i].id == photo.id) {
        return;
      }
    }
  } else {
    console.warn('No id present in ', photo);
  }
  available.push(photo);
}
function loadAvailable(isPremature, callback) {
  console.log('Loading available images');
  var loading = 0;
  available = [];
  providers.forEach(function(provider) {
		if (!options.providers[provider.id].enabled) {
			return;
		}

    loading++;
    provider.load(isPremature, function(err) {
      if (err) {
        console.warn(provider.title + ' returned error: ', err);
      }
      loading--;
      if (!loading) {
        availableLoaded = +new Date;
        callback();
      }
    });
  });

	if (!loading) {
		availableLoaded = +new Date;
		callback();
	}
}

var nextImage = false;
var lastLoaded;
var isPreparing = false;
var callbacks = [];
function prepareNextImage(callback, tries) {
  console.log('Request to prepare next image, ' + (tries || 0) + ' tries');

  function fail(reason) {
    console.log('Failed: ' + reason);
    // Попробуем снова
    if (tries > 10) {
      console.log('Too many tries, keeping old image');

      // Ничего не вышло. Интернет кончился?
      callbacks.forEach(function(callback) {
        callback(nextImage);
      });
      callbacks = [];
      isPreparing = false;
      return;
    }
    prepareNextImage(false, (tries || 0) + 1);
  }

  callback && callbacks.push(callback);

  if (isPreparing && !tries) {
    console.log('Already preparing');
    return;
  }

  console.log('Available: ', available.length, ', age: ', +new Date - availableLoaded);
  if ((!available.length && (+new Date - availableLoaded > 10 * 60 * 1000)) ||
      (+new Date - availableLoaded > 8 * 60 * 60 * 1000)) {
    // Update available images each 8 hours
    loadAvailable(+new Date - availableLoaded < 8 * 60 * 60 * 1000, function() {
      prepareNextImage(false, tries);
    });
    return;
  }

  isPreparing = true;

  var image = available.splice(Math.floor(Math.random() * available.length), 1)[0];
  console.log('Selected image: ', image);

  if (image.blob) {
    console.log('Blob loaded, finishing');
    // Уже есть блоб, не надо качать
    nextImage = image;
    lastLoaded = +new Date;
    callbacks.forEach(function(callback) {
      callback(nextImage);
    });
    callbacks = [];
    isPreparing = false;
    return;
  }

  // Скачиваем
  var x = new(this.XMLHttpRequest || ActiveXObject)('MSXML2.XMLHTTP.3.0');
  x.open('GET', image.url, 1);
  //x.setRequestHeader('X-Requested-With', 'XMLHttpRequest');
  x.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
  x.responseType = 'blob';
  x.onreadystatechange = function(e) {
    if (this.readyState == 4) {
      if (this.status == 200) {
        console.log('Image loaded, finishing');
        // Еее, всё получилось
        image.blob = this.response;
        nextImage = image;
        lastLoaded = +new Date;
        callbacks.forEach(function(callback) {
          callback(nextImage);
        });
        callbacks = [];
        isPreparing = false;
      } else {
        fail('Unable to download image');
      }
    }
  };
  x.send();
}

chrome.storage.sync.get(defaults, function(options) {
	window.options = options;
  prepareNextImage();
});
chrome.runtime.onMessage.addListener(function(message, sender, sendResponse) {
  if (message.type == 'getImage') {
    if (nextImage) {
      sendResponse({ url: URL.createObjectURL(nextImage.blob), meta: nextImage.meta });
      prepareNextImage();
    } else {
      prepareNextImage(function(image) {
        if (image) {
          sendResponse({ url: URL.createObjectURL(nextImage.blob), meta: nextImage.meta });
        } else {
          sendResponse({ url: false, meta: false });
        }
      });
    }
  } else
	if (message.type == 'setOptions') {
		options = message.options;
		available = [];
		availableLoaded = 0;
		prepareNextImage();
	}
});
