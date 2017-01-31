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

var googleEarthIds = [1003,1004,1006,1007,1008,1010,1012,1014,1017,1018,1019,1021,1022,1023,1024,1026,
  1027,1032,1033,1034,1035,1036,1037,1038,1039,1040,1041,1046,1047,1048,1049,1050,1052,1053,1054,1055,
  1056,1057,1063,1064,1065,1066,1067,1068,1069,1070,1071,1074,1075,1077,1078,1080,1081,1082,1084,1085,
  1086,1087,1089,1091,1092,1093,1094,1095,1096,1097,1098,1099,1101,1102,1103,1104,1105,1107,1109,1110,
  1114,1115,1116,1118,1119,1121,1122,1123,1125,1127,1128,1131,1132,1133,1134,1135,1138,1139,1140,1141,
  1143,1147,1148,1151,1152,1154,1155,1156,1157,1158,1159,1160,1161,1163,1164,1165,1166,1167,1168,1169,
  1170,1172,1173,1174,1176,1177,1178,1180,1181,1183,1184,1186,1190,1191,1192,1195,1196,1197,1198,1199,
  1206,1207,1209,1211,1212,1215,1216,1217,1221,1222,1224,1225,1226,1229,1230,1231,1233,1237,1238,1239,
  1240,1241,1242,1243,1245,1247,1248,1251,1253,1254,1255,1256,1257,1258,1259,1260,1265,1267,1268,1269,
  1270,1273,1274,1277,1280,1282,1285,1286,1287,1289,1290,1292,1293,1297,1298,1300,1301,1302,1308,1309,
  1312,1316,1317,1323,1324,1325,1326,1329,1332,1336,1337,1338,1341,1342,1343,1345,1348,1349,1350,1351,
  1352,1353,1354,1355,1356,1358,1359,1363,1364,1368,1369,1370,1371,1373,1374,1375,1377,1378,1381,1383,
  1385,1388,1393,1394,1396,1397,1398,1399,1400,1402,1403,1406,1407,1408,1409,1413,1414,1416,1417,1418,
  1419,1420,1421,1423,1427,1429,1430,1432,1434,1435,1436,1437,1438,1440,1443,1444,1446,1447,1448,1449,
  1450,1451,1456,1457,1463,1464,1466,1468,1470,1471,1472,1474,1475,1476,1477,1478,1484,1485,1487,1488,
  1490,1491,1492,1494,1495,1496,1498,1500,1501,1502,1505,1506,1508,1509,1510,1511,1512,1514,1515,1516,
  1517,1518,1519,1521,1523,1525,1526,1528,1529,1530,1531,1534,1537,1538,1539,1540,1541,1542,1543,1544,
  1545,1546,1548,1550,1551,1553,1556,1557,1558,1559,1560,1561,1563,1565,1567,1568,1569,1572,1574,1578,
  1579,1582,1583,1584,1585,1588,1589,1591,1594,1595,1598,1600,1606,1607,1608,1609,1610,1611,1612,1613,
  1614,1615,1617,1618,1620,1623,1626,1628,1629,1630,1634,1636,1637,1639,1640,1641,1643,1644,1645,1646,
  1648,1652,1653,1655,1657,1660,1661,1662,1663,1664,1666,1668,1669,1672,1673,1674,1675,1676,1681,1683,
  1684,1685,1686,1687,1688,1689,1690,1692,1694,1695,1697,1698,1699,1701,1702,1703,1704,1707,1710,1711,
  1712,1713,1714,1716,1718,1719,1720,1721,1722,1724,1725,1727,1728,1729,1730,1731,1732,1734,1735,1737,
  1738,1739,1740,1741,1742,1746,1750,1754,1756,1758,1759,1760,1761,1762,1763,1766,1767,1768,1770,1771,
  1772,1774,1775,1776,1777,1778,1779,1780,1782,1783,1784,1785,1786,1787,1788,1790,1792,1793,1796,1797,
  1799,1800,1801,1804,1805,1806,1807,1808,1809,1810,1811,1812,1816,1817,1820,1821,1822,1823,1824,1825,
  1826,1828,1829,1831,1832,1833,1834,1835,1836,1837,1838,1839,1840,1841,1842,1843,1844,1845,1846,1849,
  1852,1853,1854,1855,1857,1858,1859,1860,1861,1863,1864,1868,1870,1872,1873,1875,1883,1884,1885,1887,
  1888,1889,1890,1891,1893,1894,1897,1901,1902,1903,1904,1905,1907,1908,1909,1910,1911,1912,1913,1915,
  1919,1920,1921,1922,1923,1924,1925,1927,1934,1935,1936,1937,1938,1939,1940,1942,1943,1945,1946,1947,
  1948,1949,1951,1952,1954,1955,1956,1957,1959,1960,1961,1962,1964,1965,1966,1967,1968,1969,1970,1971,
  1972,1973,1974,1975,1976,1977,1978,1979,1980,1981,1982,1983,1984,1986,1987,1989,1990,1991,1992,1993,
  1994,1995,1998,1999,2000,2001,2002,2003,2007,2009,2010,2011,2012,2013,2014,2015,2016,2017,2018,2021,
  2022,2023,2024,2025,2026,2027,2028,2029,2030,2031,2032,2033,2034,2035,2036,2037,2038,2039,2040,2041,
  2042,2043,2044,2045,2046,2047,2048,2049,2050,2051,2052,2054,2055,2056,2057,2058,2059,2060,2061,2062,
  2063,2064,2065,2066,2067,2068,2069,2070,2071,2072,2074,2075,2076,2078,2081,2082,2083,2084,2088,2090,
  2091,2093,2095,2096,2097,2098,2100,2102,2103,2109,2112,2113,2116,2118,2120,2121,2124,2125,2126,2131,
  2132,2135,2137,2138,2139,2140,2141,2142,2145,2147,2148,2149,2150,2151,2152,2154,2156,2157,2159,2160,
  2161,2162,2165,2166,2167,2168,2169,2170,2171,2175,2176,2177,2179,2180,2181,2182,2183,2186,2187,2188,
  2190,2191,2192,2194,2195,2197,2198,2199,2202,2203,2204,2205,2206,2207,2209,2211,2212,2213,2216,2218,
  2220,2222,2223,2224,2227,2228,2229,2230,2231,2237,2239,2240,2241,2243,2244,2246,2247,2248,2249,2251,
  2252,2253,2256,2258,2259,2260,2263,2264,2265,2266,2268,2269,2270,2272,2273,2274,2275,2276,2277,2278,
  2280,2281,2284,2287,2288,2290,2291,2292,2293,2294,2295,2296,2297,2299,2303,2304,2305,2307,2308,2311,
  2312,2313,2314,2315,2316,2317,2318,2319,2321,2322,2323,2324,2325,2326,2327,2329,2330,2331,2332,2333,
  2334,2337,2340,2341,2342,2343,2344,2345,2346,2347,2350,2357,2360,2361,2364,2367,2368,2371,2372,2374,
  2375,2377,2378,2379,2380,2381,2382,2383,2385,2386,2388,2389,2390,2391,2392,2393,2395,2397,2398,2399,
  2401,2402,2403,2405,2406,2407,2408,2409,2410,2411,2412,2413,2414,2416,2418,2419,2421,2422,2423,2426,
  2430,2431,2432,2433,2434,2435,2436,2437,2438,2439,2442,2443,2444,2446,2447,2448,5003,5004,5005,5007,
  5008,5012,5015,5016,5019,5022,5023,5027,5028,5035,5037,5038,5039,5040,5041,5043,5044,5045,5046,5047,
  5048,5051,5052,5053,5056,5057,5060,5062,5063,5064,5065,5066,5071,5072,5073,5076,5077,5078,5079,5080,
  5081,5082,5097,5103,5104,5105,5111,5121,5126,5147,5163,5164,5165,5167,5168,5172,5173,5178,5179,5181,
  5182,5183,5188,5189,5192,5198,5199,5206,5207,5215,5216,5217,5228,5231,5234,5237,5238,5242,5243,5244,
  5245,5253,5254,5255,5290,5296,5302,5304,5310,5314,5319,5325,5329,5330,5333,5334,5338,5355,5361,5365,
  5375,5382,5389,5396,5403,5412,5422,5423,5424,5425,5426,5438,5445,5451,5452,5454,5456,5457,5460,5461,
  5462,5464,5474,5477,5478,5479,5480,5481,5484,5485,5487,5502,5508,5511,5513,5527,5528,5529,5530,5531,
  5533,5536,5538,5542,5551,5553,5555,5556,5560,5562,5563,5564,5565,5569,5575,5577,5583,5584,5586,5587,
  5588,5589,5591,5594,5595,5596,5597,5604,5607,5609,5611,5612,5614,5616,5617,5618,5619,5620,5624,5626,
  5628,5629,5630,5634,5635,5636,5641,5646,5651,5653,5654,5660,5663,5666,5668,5674,5675,5676,5686,5688,
  5689,5692,5705,5720,5723,5724,5729,5741,5744,5749,5755,5761,5762,5763,5766,5767,5770,5773,5778,5786,
  5787,5790,5792,5795,5796,5797,5809,5810,5818,5822,5828,5829,5836,5855,5859,5862,5864,5870,5874,5882,
  5884,5890,5898,5901,5924,5933,5938,5941,5944,5945,5951,5952,5954,5955,5957,5958,5959,5960,5964,5975,
  5977,5978,5979,5981,5982,5984,5989,5992,5995,5999,6001,6002,6003,6004,6005,6006,6007,6008,6011,6013,
  6014,6015,6016,6017,6018,6019,6022,6025,6032,6041,6043,6044,6045,6046,6048,6049,6050,6051,6052,6053,
  6054,6055,6056,6057,6058,6059,6060,6062,6063,6065,6066,6068,6069,6070,6072,6073,6074,6078,6079,6080,
  6081,6082,6095,6096,6097,6099,6100,6101,6102,6103,6105,6107,6108,6109,6110,6112,6114,6116,6117,6119,
  6120,6121,6122,6124,6125,6134,6135,6136,6137,6138,6139,6140,6141,6143,6144,6146,6149,6150,6151,6152,
  6153,6155,6160,6161,6167,6170,6175,6176,6177,6178,6180,6181,6182,6183,6184,6186,6187,6189,6201,6202,
  6204,6205,6206,6207,6208,6209,6210,6211,6213,6215,6216,6217,6218,6222,6228,6229,6230,6231,6232,6233,
  6234,6235,6241,6244,6248,6254,6255,6256,6257,6258,6259,6260,6262,6263,6264,6265,6266,6267,6269,6271,
  6272,6275,6276,6279,6280,6281,6282,6283,6284,6285,6287,6290,6291,6292,6293,6294,6295,6296,6298,6300,
  6301,6302,6303,6304,6311,6313,6315,6316,6317,6318,6319,6320,6321,6324,6325,6326,6339,6340,6341,6342,
  6344,6345,6346,6347,6348,6349,6350,6351,6352,6355,6356,6358,6359,6360,6361,6362,6363,6364,6365,6366,
  6367,6368,6371,6372,6374,6375,6376,6377,6378,6379,6380,6381,6382,6383,6384,6386,6387,6388,6389,6402,
  6409,6410,6424,6435,6436,6441,6443,6457,6459,6460,6465,6470,6473,6488,6491,6495,6496,6498,6500,6503,
  6504,6510,6512,6519,6524,6525,6527,6528,6531,6543,6545,6561,6565,6566,6575,6578,6579,6587,6588,6589,
  6590,6600,6607,7001,7002,7003,7004,7005,7006,7008,7009,7010,7011,7012,7013,7015,7016,7017,7018,7019,
  7020,7021,7023];

var providers = [{
  // Картинка дня (только её можно скачать в высоком разрешении)
  id: 'yimages',
  title: 'Яндекс.Картинки',
  description: '<b>Пейзажи и животные</b>, профессиональные фото. <b>1 изображение в день</b> выбирается с помощью нейросетей и модераторов. Источники — 500px, Fotodom, Airpano.',

  load: function(isPremature, callback) {
    ajax('https://yandex.ru/images/', function(result) {
			try {
        result = JSON.parse(result);
      } catch (e) {
        callback({ error: 'Invalid response from Yandex.Images', details: result });
        return;
      }

      //console.log(result);
      if (result && result.blocks && result.blocks.length &&
          result.blocks[0] && result.blocks[0].params && result.blocks[0].params.today) {
        var today = result.blocks[0].params.today;
        addAvailable({
          id: 'yimages:' + today.date,
          url: 'https:' + today.slide.appropriate.url,
          meta: {
            width: today.slide.appropriate.width,
            height: today.slide.appropriate.height,
            title: today.snippet.title,
            description: today.snippet.description,
            author: today.author.name,
            // Somehow attribute Ya.Images too?
            providers: [today.author.linkText.split(' на ').pop(), 'Яндекс.Картинки'],
            link: today.author.link
          }
        });
        // Also available as 'https://yandex.ru/images/today?size=' + targetWidth + 'x' + targetHeight
        callback();
      } else {
        callback({ error: 'Invalid response from Yandex.Images', details: result });
      }
    }, {
      format: 'json',
      request: JSON.stringify([{
        block: 'b-501px',
        version: 2
      }]),
      uinfo: 'sw-' + targetWidth + '-sh-' + targetHeight + '-ww-' + targetWidth + '-wh-' + targetHeight + '-pd-1-wp-16x9_1920x1080'
    });
  }
}, {
  // Фотка дня (только сегодняшняя — повторы нам не нужны)
  id: 'yphotos',
  title: 'Яндекс.Фотки',
  description: 'Пользовательские фото, преимущественно <b>природа, изредка портреты</b>. <b>1 изображение в день</b> по результатам оценок пользователей.',

  load: function(isPremature, callback) {
    jsonp('https://api-fotki.yandex.ru/api/podhistory/', function(result) {
      if (result && result.entries && result.entries.length && result.entries[0].img) {
        var image = result.entries[0];
        var min = false;
        for (var k in image.img) {
          var ver = image.img[k];
          if (ver.width < targetWidth || ver.height < targetHeight) {
            continue;
          }
          if (!min || ver.width < min.width || ver.height < min.height) {
            min = ver;
          }
        }
        if (!min) {
          for (var k in image.img) {
            var ver = image.img[k];
            if (!min || ver.width > min.width || ver.height > min.height) {
              min = ver;
            }
          }
        }

        if (min) {
          addAvailable({
            id: 'yphotos:' + image.id,
            url: min.href,
            meta: {
              width: min.width,
              height: min.height,
              title: (image.title && image.title.match(/\.jpg$/i)) ? false : image.title,
              author: image.author,
              providers: ['Яндекс.Фотки'],
              link: image.links.alternate
            }
          });
          callback();
        } else {
          callback({ error: 'No valid sizes found', details: image });
        }
      } else {
        callback({ error: 'Invalid response from Yandex.Fotki', details: result });
      }
    }, {
      format: 'json',
      limit: 1
    });
  }
}, {
  // Тут тоже берём только последнее фото
  id: 'natgeo',
  title: 'National Geographic',
  description: '<b>Природа, города, люди</b>. <b>1 изображение в день</b>, отобранное редакцией журнала; как правило — очень качественные, выразительные фото.',

  load: function(isPremature, callback) {
    ajax('https://www.nationalgeographic.com/photography/photo-of-the-day/_jcr_content/.gallery.json', function(result) {
      try {
        result = JSON.parse(result);
      } catch (e) {
        callback({ error: 'Invalid response from National Geographic', details: result });
        return;
      }
      if (result && result.items && result.items[0] && result.items[0].sizes) {
        var image = result.items[0];
        var min = false;
        for (var k in image.sizes) {
          var ver = image.sizes[k];
          if (parseInt(k, 10) < targetWidth) {
            continue;
          }
          if (!min || parseInt(k, 10) < min.width) {
            min = {
              width: parseInt(k, 10),
              url: ver
            }
          }
        }
        if (!min) {
          for (var k in image.sizes) {
            var ver = image.sizes[k];
            if (!min || parseInt(k, 10) > min.width) {
              min = {
                width: parseInt(k, 10),
                url: ver
              }
            }
          }
        }

        if (min) {
          addAvailable({
            id: 'natgeo:' + image['full-path-url'],
            url: 'https://yourshot.nationalgeographic.com' + min.url,
            meta: {
              width: min.width,
              height: Math.round(min.width * image.aspectRatio),
              title: image.title,
              description: image.caption.replace(/<[^>]+>/g, ''), // There's HTML-formatted image.caption, but it's too long for our purposes...
              author: image.credit,
              providers: ['National Geographic'],
              link: image['full-path-url']
            }
          });
          callback();
        } else {
          callback({ error: 'No valid sizes found', details: image });
        }
      } else {
        callback({ error: 'Invalid response from National Geographic', details: result });
      }
    });
  }
}, {
  id: 'gearth',
  title: 'Google Earth View',
  description: '<b>Виды Земли с воздуха</b>. Фиксированная подборка из примерно <b>1000 изображений</b> (не обновляется).',

  load: function(isPremature, callback) {
    var id = googleEarthIds[Math.floor(Math.random() * googleEarthIds.length)];
    ajax('https://www.gstatic.com/prettyearth/' + id + '.json', function(result) {
      try {
        result = JSON.parse(result);
      } catch (e) {
        callback({ error: 'Invalid response from Google Earth', details: result });
        return;
      }
      if (result && result.dataUri) {
        var byteString = atob(result.dataUri.split(',')[1]);
        var mimeString = result.dataUri.split(',')[0].split(':')[1].split(';')[0];
        var ab = new ArrayBuffer(byteString.length);
        var ia = new Uint8Array(ab);
        for (var i = 0; i < byteString.length; i++) {
          ia[i] = byteString.charCodeAt(i);
        }
        var blob = new Blob([ab], { type: mimeString });
        var providers;
        try {
          providers = result.attribution.split('©')[1].split(' ').slice(1).join(' ').split(', ').concat('Google Earth View');
        } catch (e) {
          providers = ['Google Earth View'];
        }

        addAvailable({
          id: 'gearth:' + id,
          blob: blob,
          meta: {
            title: result.geocode && (result.geocode.country + (result.geocode.locality ? ', ' + result.geocode.locality : '')),
            author: false,
            providers: providers,
            link: 'https://g.co/ev/' + id
          }
        });
        callback();
      } else {
        callback({ error: 'Invalid response from Google Earth', details: result });
      }
    });
  }
}, {
  id: 'flickr',
  title: 'Flickr',
  description: 'Качественные пользовательские фото, без ограничений по тематике. Выбирается <b>50 лучших изображений</b> (по оценкам пользователей) за последний день.',

  load: function(isPremature, callback) {
    var longest = Math.max(targetWidth, targetHeight);
    var sizes = ['z', 'c', 'b', 'h', 'k', 'o'];

    var date = new Date((new Date()).getTime() - 24*60*60*1000);
    date = date.getFullYear() + '-' +
      ((date.getMonth() + 1) < 10 ? '0' : '') +
      (date.getMonth() + 1) + '-' +
      (date.getDate() < 10 ? '0' : '') +
      date.getDate();

    ajax('https://api.flickr.com/services/rest/', function(result) {
      try {
        result = JSON.parse(result);
      } catch (e) {
        callback({ error: 'Invalid response from Flickr', details: result });
        return;
      }
      if (result && result.photos && result.photos.photo && result.photos.photo.length) {
        result.photos.photo.forEach(function(photo) {
          var min;
          sizes.forEach(function(size) {
            if (('width_' + size) in photo && ('height_' + size) in photo &&
                (photo['width_' + size] > targetWidth ||
                 photo['height_' + size] > targetHeight) &&
                (!min ||
                 photo['width_' + size] < photo['width_' + min] ||
                  photo['height_' + size] < photo['height_' + min])) {
              min = size;
            }
          });
          if (!min) {
            sizes.forEach(function(size) {
              if (('width_' + size) in photo && ('height_' + size) in photo &&
                  (!min ||
                   photo['width_' + size] > photo['width_' + min] ||
                    photo['height_' + size] > photo['height_' + min])) {
                min = size;
              }
            });
          }
          if (!min || photo['width_' + min] < photo['height_' + min]) {
            return;
          }

          addAvailable({
            id: 'flickr:' + photo.id,
            url: photo['url_' + min],
            meta: {
              width: photo['width_' + min],
              height: photo['height_' + min],
              title: photo.title,
              description: photo.description._content, // There's photo.description._content, but it's too long for our purposes...
              author: photo.ownername,
              providers: ['Flickr'],
              link: 'https://www.flickr.com/photos/' + photo.owner + '/' + photo.id
            }
          });
        });
        callback();
      } else {
        callback({ error: 'Invalid response from Flickr', details: result });
      }
    }, {
      format: 'json',
      nojsoncallback: 1,
      method: 'flickr.interestingness.getList',
      api_key: '1ebf85d697668d0da2e5519f37302329',
      date: date,
      per_page: 50,
      extras: 'description,owner_name,geo,url_z,url_c,url_b,url_h,url_k,url_o'
    });
  }
}, {
  id: 'bing',
  title: 'Bing',
  description: '<b>Природа, животные, города</b>, премодерированные фото. <b>1 изображение</b> в день. Источники: Getty Images, Minden Pictures, NASA.',

  load: function(isPremature, callback) {
    ajax('https://www.bing.com/HPImageArchive.aspx', function(result) {
      try {
        result = JSON.parse(result);
      } catch (e) {
        callback({ error: 'Invalid response from Bing', details: result });
        return;
      }
      if (result && result.images && result.images.length) {
        result.images.forEach(function(image) {
          var attrib = image.copyright.match(/^(.*) \(© ([^)]+)\)$/);

          addAvailable({
            id: 'bing:' + image.hsh,
            url: 'https://www.bing.com' + image.url,
            meta: {
              width: false,
              height: false,
              title: attrib[1],
              description: false,
              author: attrib[2].indexOf('/') > -1 && attrib[2].split('/')[0],
              providers: [attrib[2].split('/').pop()].concat('Bing'),
              link: image.copyrightlink
            }
          });
        });
        callback();
      } else {
        callback({ error: 'Invalid response from Bing', details: result });
      }
    }, {
      format: 'js',
      n: 1
    });
  }
}, {
  id: '500px',
  title: '500px',
  description: '<b>Много портретов, пейзажи, животные</b>, профессиональные фото. Присутствует эротика. <b>30 изображений</b> в каждой из трёх категорий.',

  load: function(isPremature, callback) {
    var featuresLeft = 3;
    var featuresLoaded = 0;
    ['editors', 'fresh_today', 'popular'].forEach(function(feature) {
      if (!options.providers['500px'][feature]) {
        featuresLeft--;
        featuresLoaded++;
        return;
      }

      var longest = Math.max(targetWidth, targetHeight);
      var size;
      if (longest <= 900) {
        size = 4;
      } else
      if (longest <= 1080) {
        size = 1080;
      } else
      if (longest <= 1170) {
        size = 5;
      } else
      if (longest <= 1600) {
        size = 1600;
      } else {
        size = 2048;
      }
      size = 2048;

      var params = {
        feature: feature,
        sort: feature == 'fresh_today' ? 'rating' : '',
        image_size: size,
        tags: 1,
        exclude: false,
        rpp: 30,
        consumer_key: 'YpdudYxFxY6iA2jHXaUNO1JB5nAINyfhjzROOcro'
      };

      if (options.providers['500px'].categories) {
        var map = {};
        categories.forEach(function(cat) {
          map[cat.id] = cat.en;
        });
        params.only = options.providers['500px'].categories.map(function(cat) {
          return map[cat];
        }).join(',');
      }

      ajax('https://api.500px.com/v1/photos', function(result) {
        featuresLeft--;
        try {
          result = JSON.parse(result);
        } catch (e) {
          if (!featuresLeft) {
            if (!featuresLoaded) {
              callback({ error: 'Invalid response from 500px', details: result });
            } else {
              callback();
            }
          }
          return;
        }

        if (result && result.photos && result.photos.length) {
          featuresLoaded++;
          for (var index = 0; index < (feature == 'editors' ? 1 : result.photos.length); index++) {
            var image = result.photos[index];
            if (image.width > image.height) {
              addAvailable({
                id: '500px:' + image.id,
                url: image.image_url,
                meta: {
                  width: image.width,
                  height: image.height,
                  title: image.name.replace(/<[^>]+>/g, ''),
                  description: (image.description || '').replace(/<[^>]+>/g, ''),
                  author: (image.user.firstname + ' ' + image.user.lastname).trim() || image.user.username,
                  providers: ['500px'],
                  link: 'https://500px.com/photo/' + image.id
                }
              });
            }
          }
        }

        if (!featuresLeft) {
          if (!featuresLoaded) {
            callback({ error: 'Invalid response from 500px', details: result });
          } else {
            callback();
          }
        }
      }, params);
    });

    if (!featuresLeft) {
      if (!featuresLoaded) {
        callback({ error: 'Invalid response from 500px', details: result });
      } else {
        callback();
      }
    }
  }
}, {
  id: 'unsplash',
  title: 'Unsplash',
  description: 'Фотографии различной тематики. <b>30 последних изображений</b>, выбранных модераторами.',

  load: function(isPremature, callback) {
    ajax('https://api.unsplash.com/photos/curated', function(result) {
      try {
        result = JSON.parse(result);
      } catch (e) {
        callback({ error: 'Invalid response from Unsplash', details: result });
        return;
      }

      result.forEach(function(photo) {
        addAvailable({
          id: 'unsplash:' + photo.id,
          url: targetWidth <= 1080 ? photo.urls.regular : photo.urls.full,
          meta: {
            width: photo.width,
            height: photo.height,
            title: false,
            description: false,
            author: photo.user.name,
            providers: ['Unsplash'],
            link: 'https://unsplash.com/?photo=' + photo.id
          }
        });
      });
      callback();
    }, {
      client_id: 'd8efa6423fc5adf096cf7a09fa291ca9351df1e902113eb5a34192143b1d3edb',
      per_page: 30
    });
  }
}];

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

var categories = [
  { id: 10, title: 'Абстрактные' },
  { id: 9, title: 'Город и архитектура' },
  { id: 23, title: 'Еда' },
  { id: 11, title: 'Животные' },
  { id: 1, title: 'Знаменитости' },
  { id: 19, title: 'Зрелища' },
  { id: 27, title: 'Индустриальный туризм' },
  { id: 24, title: 'Искусство' },
  { id: 16, title: 'Концерт' },
  { id: 7, title: 'Люди' },
  { id: 12, title: 'Макросъемка' },
  { id: 14, title: 'Мода' },
  { id: 6, title: 'Натюрморт' },
  { id: 4, en: 'Nude', title: 'Ню' },
  { id: 8, title: 'Пейзажи' },
  { id: 2, title: 'Пленка' },
  { id: 22, title: 'Подводный мир' },
  { id: 18, title: 'Природа' },
  { id: 13, title: 'Путешествия' },
  { id: 15, title: 'Реклама' },
  { id: 3, title: 'Репортаж' },
  { id: 25, title: 'Свадьба' },
  { id: 20, title: 'Семья' },
  { id: 17, title: 'Спорт' },
  { id: 26, title: 'Транспорт' },
  { id: 21, title: 'Улица' },
  { id: 5, title: 'Черно-белые' },
  { id: 0, title: 'Без рубрики' }
];

var options;

/*providers = providers.filter(function(p) {
  return p.title == 'Bing';
});*/
