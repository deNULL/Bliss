function saveOptions() {
  providers.forEach(function(provider) {
    options.providers[provider.id].enabled = document.getElementById(provider.id + '_enabled').checked;
    if (provider.id == '500px') {
      options.providers[provider.id].popular =
        document.getElementById(provider.id + '_popular').checked;
      options.providers[provider.id].editors =
        document.getElementById(provider.id + '_editors').checked;
      options.providers[provider.id].fresh_today =
        document.getElementById(provider.id + '_fresh_today').checked;
    }
  });

  chrome.storage.sync.set(options, function() {
    var status = document.getElementById('status');
    status.textContent = 'Настройки сохранены.';
    setTimeout(function() {
      status.textContent = '';
    }, 2000);

    chrome.runtime.sendMessage({ type: 'setOptions', options: options });
  });
}

function updateCategories() {
  var allOn = true;
  var allOff = true;
  var selected = [];
  categories.forEach(function(cat) {
    if (document.getElementById('500px_category_' + cat.id).checked) {
      selected.push(cat.id);
      allOff = false;
    } else {
      allOn = false;
    }
  });
  options.providers['500px'].categories = allOn ? false : selected;
  document.getElementById('500px_category_all').checked = !allOff;
  document.getElementById('500px_category_all').indeterminate = !allOff && !allOn;
}

function toggleAllCategories() {
  var allOn = document.getElementById('500px_category_all').checked;
  options.providers['500px'].categories = allOn ? false : [];
  categories.forEach(function(cat) {
    document.getElementById('500px_category_' + cat.id).checked = allOn;
  });
}

function loadOptions() {
  var defaults = {
    providers: {}
  };
  providers.forEach(function(provider) {
    defaults.providers[provider.id] = {
      enabled: true
    };
  });
  defaults.providers['500px'] = {
    enabled: true,
    categories: false,
    popular: true,
    editors: true,
    fresh_today: false
  };
  // Use default value color = 'red' and likesColor = true.
  chrome.storage.sync.get(defaults, function(options) {
    window.options = options;

    var html = [];
    providers.forEach(function(provider) {
      html.push('<div class="provider">');
      html.push('<label>' +
          '<input type="checkbox" id="' + provider.id + '_enabled"' + (options.providers[provider.id].enabled ? ' checked' : '') + '>' +
        provider.title +
        '</label>' +
        '<small>' + provider.description + '</small>');
      if (provider.id == '500px') {
        html.push('<div class="sections">');
        html.push('<h5>Разделы:</h5>');
        html.push('<label>' +
          '<input type="checkbox" id="500px_popular"' + (options.providers['500px'].popular ? ' checked' : '') + '>' +
          'Популярные'+
        '</label>');
        html.push('<label>' +
          '<input type="checkbox" id="500px_editors"' + (options.providers['500px'].editors ? ' checked' : '') + '>' +
          'Выбор редакции'+
        '</label>');
        html.push('<label>' +
          '<input type="checkbox" id="500px_fresh_today"' + (options.providers['500px'].fresh_today ? ' checked' : '') + '>' +
          'Свежие'+
        '</label>');
        html.push('</div>');
        html.push('<div class="categories">');
        html.push('<h5>Категории:</h5>');
        html.push('<div class="checklist">');
        html.push('<label>' +
          '<input type="checkbox" id="500px_category_all""' + (!options.providers['500px'].categories ? ' checked' : '') + '>' +
          'Все категории'+
        '</label>');
        html.push('<hr/>');
        categories.forEach(function(cat) {
          html.push('<label>' +
            '<input type="checkbox" id="500px_category_' + cat.id + '" onchange="updateCategories()"' +
              (!options.providers['500px'].categories || options.providers['500px'].categories.indexOf(cat.id) > -1 ? ' checked' : '') + '>' +
            cat.title +
          '</label>');
        });
        html.push('</div>');
        html.push('</div>');
      }
      html.push('</div>');
    });
    document.getElementById('providers').innerHTML = html.join('');
    document.getElementById('500px_category_all').addEventListener('change', toggleAllCategories);
    categories.forEach(function(cat) {
      document.getElementById('500px_category_' + cat.id).addEventListener('change', updateCategories);
    });
  });
}

document.addEventListener('DOMContentLoaded', loadOptions);
document.getElementById('save').addEventListener('click', saveOptions);
