
/*
 *  前端基础库 change (嫦娥)
 */
(function (window) {
    var ce = {};

    /*
     *检查是否包含字符串
     *@method  Contains
     *@params {String} 字符串
     *@params {boolean} ignorecase 是否区别大小写默认不区分大小写, 默认不区分大小写
     *@return {boolean} true包含 false不包含
     */
    String.prototype.Contains = function (it, ignorecase) {
        return ignorecase ? this.toLowerCase().indexOf(it.toLowerCase()) : this.indexOf(it) !== -1;
    };

    /* 目标函数是否位于原字符串的开始处
    * @method StartsWith
    * @params {String}  it 字符串
    * @params {boolean} ignorecase 是否区分大小写  
    * @return {boolean} 原开始处是否有 true 有 false 没有
    */
    String.prototype.StartsWith = function (it, ignorecase) {
        var start_str = this.substr(0, it.length);
        return ignorecase ? start_str.toLowerCase() === it.toLowerCase() : start_str === it;
    };

    /*
    *目标函数是否位于原字符串的结束处-参数(it-String-字符串 ignorecase-boolean-是否区别大小写默认不区分大小写)
    */
    String.prototype.EndsWith = function (it, ignorecase) {
        var end_str = this.substring(this.length - it.length);
        return ignorecase ? end_str.toLowerCase() === it.toLowerCase() : end_str === it;
    };

    /*
     *将当前字符串重复N次-参数(it-String-字符串 ignorecase-boolean-是否区别大小写默认不区分大小写)
     */
    String.prototype.Repeat = function (n) {
        var s = this, total = "";
        while (n > 0) {
            if (n % 2 === 1) {
                total += s;
            }
            if (n === 1) {
                break;
            }
            s += s;
            n = n >> 1;
        }
        return total;
    };

    /*
     *返回所有字节的长度
     */
    String.prototype.ByteLen = function () {
        var byteLength = this.length, i = 0;
        for (; i < this.length; i++) {
            if (this.charCodeAt(i) > 255) {
                byteLength++;
            }
        }
        return byteLength;
    };

    /*
     *对字符串进行截断操作,当超过限定长度，默认添加三个点
     */
    String.prototype.Truncate = function (length, truncation) {
        length = length || 30;
        truncation = truncation === void (0) ? '...' : truncation;
        return this.length > length ? this.slice(0, length - truncation.length) + truncation : this;
    };

    /*
     *移除字符串中的html标签
     */
    String.prototype.StripTags = function () {
        return this.replace(/<[^>]+>/g, '');
    };

    /*
     *移除字符串中的script标签包括js
     */
    String.prototype.StripScripts = function () {
        return this.replace(/<script[^>]*>([\S\s]*?)<\/script>/img, '');
    };

    /*
     *将字符串进行html转义
     */
    String.prototype.EscapeHTML = function () {
        return this.replace(/&/g, '&amp;')
            .replace(/</g, '&lt;')
            .replace(/>/g, '&gt;')
            .replace(/"/g, '&quot;')
            .replace(/'/g, '&#39;');
    };

    /*
     *将字符串中的html实体转换成对应字符
     */
    String.prototype.UnescapeHTML = function () {
        return this.replace(/&quot;/g, '"')
            .replace(/&lt;/g, '<')
            .replace(/&gt;/g, '>')
            .replace(/&amp;/g, "&")
            .replace(/&#([\d]+);/g, function ($0, $1) {
                return String.fromCharCode(parseInt($1, 10));
            }
        );
    };

    /*
    *为字符串某一段添加字符串(n-number字符串长度 filling-String填充的字符串 right-boolean填充方向 radix-number-数字类型)
    */
    String.prototype.Pad = function (n, filling, right, radix) {
        var num = this.toString(radix || 10);
        filling = filling || "0";
        while (num.length < n) {
            if (!right) {
                num = filling + num;
            } else {
                num += filling;
            }
        }
        return num;
    };

    /*
     *格式化字符串
     */
    ce.Format = function (str, object) {
        var array = Array.prototype.slice.call(arguments, 1);
        return str.replace(/\\?\#{([^{}]+)\}/gm, function (match, name) {
            if (match.charAt(0) === '\\') {
                return match.slice(1);
            }
            var index = Number(name);
            if (index >= 0) {
                return array[index];
            }
            if (object && object[name] !== void 0) {
                return object[name];
            }
            return '';
        }
        );
    };

    /*
     *去除空格
     */
    String.prototype.Trim = function () {
        var whitespace = ' \n\r\t\f\x0b\xa0\u2000\u2001\u2002\u2003\u2004\u2005\u2006\u2007\u2008\u2009\u200a\u200b\u2028\u2029\u3000', str = this;
        for (var i = 0; i < str.length; i++) {
            if (whitespace.indexOf(str.charAt(i)) === -1) {
                str = str.substring(i);
                break;
            }
        }
        for (i = str.length - 1; i >= 0; i--) {
            if (whitespace.indexOf(str.charAt(i)) === -1) {
                str = str.substring(0, i + 1);
                break;
            }
        }
        return whitespace.indexOf(str.charAt(0)) === -1 ? str : '';
    };

    /*
     *判定数组是否包含指定目标
     */
    Array.prototype.Contains = function (item) {
        return this.indexOf(item) > -1;
    };
    /*
     * 对数组去重操作
     */
    Array.prototype.Unique = function () {
        var result = [];
        loop: for (var i = 0, n = this.length; i < n; i++) {
            for (var x = i + 1; x < n; x++) {
                if (this[x] === this[i]) {
                    continue loop;
                }
            }
            result.push(this[i]);
        }
        return result;
    };
    /*
     *取得对象数组的每个元素的指定属性
     */
    Array.prototype.Pluck = function (name) {
        var result = [], prop;
        this.forEach(function (item) {
            prop = item[name];
            if (prop != null) {
                result.push(prop);
            }
        });
        return result;
    };

    /*
     *根据某个条件进行分组
     */
    Array.prototype.GroupBy = function (val) {
        var result = {};
        var iterator = typeof val === "function" ? val : function (obj) {
            return obj[val];
        };
        this.forEach(function (value, index) {
            var key = iterator(value, index);
            (result[key] || (result[key] = [])).push(value);
        });
        return result;
    };

    /*
     *根据指定条件排序
     */
    Array.prototype.SortBy = function (fn, scope) {
        var array = this.map(function (item, index) {
            return {
                el: item,
                re: fn.cache(scope, item, index)
            };
        }).sort(function (left, right) {
            var a = left.re, b = right.re;
            return a < b ? -1 : a > b ? 1 : 0;
        });
        return array.pluck('el');
    };

    /*
     *对两个数组取并集
     */
    Array.prototype.Union = function (array) {
        return this.concat(array).unique();
    };

    /*
     *对两个数组取交集
     */
    Array.prototype.Intersect = function (array) {
        return this.filter(function (n) {
            return ~array.indexOf(n);
        });
    };
    /*
     *对两个数组取差集
     */
    Array.prototype.Diff = function (array) {
        var result = this.slice();
        for (var i = 0; i < result.length; i++) {
            for (var j = 0; j < array.length; j++) {
                if (result[i] === array[j]) {
                    result.splice(i, 1);
                    i--;
                    break;
                }
            }
        }
        return result;
    };

    /*
     *返回数组中的最小值，用于数字数组
     */
    Array.prototype.Min = function () {
        return Math.min.apply(0, this);
    };

    /*
     *返回数组中的最大值，用于数字数组
     */
    Array.prototype.Max = function () {
        return Math.max.apply(0, this);
    };

    /*
   * 创建一个副本 浅复制
   */
    Array.prototype.Copy = function () {
        return JSON.parse(JSON.stringify(this));
    }
    /*
     *浅复制
     */
    ce.Copy = function (val) {
        if (val.isArray()) {
            return val.Copy();
        } else {
            return JSON.parse(JSON.stringify(val));
        }

    }
    /*
     * 修复Number toFixed
     */
    if (parseFloat(0.9).toFixed(0) !== '1') {
        Number.prototype.ToFixed = function (n) {
            var power = Math.pow(10, n);
            var fixed = (Math.round(this * power) / power).toString();
            if (n === 0) {
                return fixed;
            }
            if (fixed.indexOf('.') < 0) {
                fixed += ".";
            }
            var padding = n + 1 - (fixed.length - fixed.indexOf('.'));
            for (var i = 0; i < padding; i++) {
                fixed += '0';
            }
            return fixed;
        };
    }
    Date.prototype.AddDays = function (d) {
        var date = new Date(this);
        date.setDate(this.getDate() + d);
        return date;
    };
    Date.prototype.AddWeeks = function (w) {
        return this.addDays(w * 7);
    };
    Date.prototype.AddMonths = function (m) {
        var ret = new Date(this);
        var d = this.getDate();
        ret.setMonth(this.getMonth() + m);
        if (ret.getDate() < d)
            ret.setDate(0);

        return ret;
    };
    Date.prototype.AddYears = function (y) {
        var ret = new Date(this);
        var m = this.getMonth();
        ret.setFullYear(this.getFullYear() + y);
        if (m < ret.getMonth()) {
            ret.setDate(0);
        }
        return ret;
    };
    Date.prototype.Compare = function (date) {
        var ret = this - date;
        return ret === 0 ? 0 : (ret < 0 ? -1 : 1);
    };

    /*
    *求出相隔多少天
    */
    Date.prototype.GetDatePeriod = function (finish) {
        return Math.abs(this * 1 - finish * 1) / 60 / 60 / 1000 / 24;
    };

    /*
     *求出当前时间所在季度的第一天
     */
    Date.prototype.GetFirstDateInQuarter = function () {
        return new Date(this.getFullYear(), ~~(this.getMonth() / 3) * 3, 1);
    };

    /*
     *求出当前时间所在季度的最后一天
     */
    Date.prototype.GetLastDateInQuarter = function () {
        return new Date(this.getFullYear(), ~~(this.getMonth() / 3) * 3 + 3, 0);
    };

    /*
     *判断当前日期是否为闰年
     */
    Date.prototype.IsLeapYear = function () {
        return new Date(this.getFullYear(), 2, 0).getDate() === 29;
    };
    Date.prototype.Date = function () {
        return new Date(this.getFullYear(), this.getMonth(), this.getDate());
    };

    /*
     *取得当前月份的天数
     */
    Date.prototype.GetDaysInMonth = function () {
        switch (this.getMonth()) {
            case 0:
            case 2:
            case 4:
            case 6:
            case 7:
            case 9:
            case 11:
                return 31;
            case 1:
                var y = this.getFullYear();
                return y % 4 === 0 && y % 100 !== 0 || y % 400 === 0 ? 29 : 28;
            default:
                return 30;
        }
    };
    /*
     修复IE9 以下 事件绑定this指向问题
     */
    Function.prototype.Bind = function (content) {
        if (arguments.length < 2 && content === void (0)) {
            return this;
        }
        var method = this, args = [].slice.call(arguments, 1);
        return function () {
            method.apply(content, args.concat.apply(args, arguments));
        };
    };
    Date.prototype.Format = (function (formats) {
        function padNumber(num, digits, trim) {
            var neg = '';
            if (num < 0) {
                neg = '-';
                num = -num;
            }
            num = '' + num;
            while (num.length < digits)
                num = '0' + num;
            if (trim) num = num.substr(num.length - digits);
            return neg + num;
        }

        function dateGetter(name, size, offset, trim) {
            return function (date) {
                var value = date['get' + name]();
                if (offset > 0 || value > -offset) value += offset;
                if (value === 0 && offset === -12) {
                    value = 12;
                }
                return padNumber(value, size, trim);
            };
        }

        function dateStrGetter(name, shortForm) {
            return function (date, formats) {
                var value = date['get' + name]();
                var get = (shortForm ? ('SHORT' + name) : name).toUpperCase();
                return formats[get][value];
            };
        };

        function timeZoneGetter(date) {
            var zone = -1 * date.getTimezoneOffset();
            var paddedZone = (zone >= 0) ? "+" : "";
            paddedZone += padNumber(Math[zone > 0 ? 'floor' : 'ceil'](zone / 60), 2) + padNumber(Math.abs(zone % 60), 2);
            return paddedZone;
        }

        //取得上午下午
        function ampmGetter(date, formats) {
            return date.getHours() < 12 ? formats.AMPMS[0] : formats.AMPMS[1];
        }

        var DATE_FORMATS = {
            yyyy: dateGetter('FullYear', 4),
            yy: dateGetter('FullYear', 2, 0, true),
            y: dateGetter('FullYear', 1),
            MMMM: dateStrGetter('Month'),
            MMM: dateStrGetter('Month', true),
            MM: dateGetter('Month', 2, 1),
            M: dateGetter('Month', 1, 1),
            dd: dateGetter('Date', 2),
            d: dateGetter('Date', 1),
            HH: dateGetter('Hours', 2),
            H: dateGetter('Hours', 1),
            hh: dateGetter('Hours', 2, -12),
            h: dateGetter('Hours', 1, -12),
            mm: dateGetter('Minutes', 2),
            m: dateGetter('Minutes', 1),
            ss: dateGetter('Seconds', 2),
            s: dateGetter('Seconds', 1),
            sss: dateGetter('Milliseconds', 3),
            EEEE: dateStrGetter('Day'),
            EEE: dateStrGetter('Day', true),
            a: ampmGetter,
            Z: timeZoneGetter
        };
        var dataFormatsSolit = /((?:[^yMdHhmsaZE']+)|(?:'(?:[^']|'')*')|(?:E+|y+|M+|d+|H+|h+|m+|s+|a|Z))(.*)/,
            numberString = /^\d+$/;
        var iso8065Str = /^(\d{4})-?(\d\d)-?(\d\d)(?:T(\d\d)(?::?(\d\d)(?::?(\d\d)(?:\.(\d+))?)?)?(Z|([+-])(\d\d):?(\d\d))?)?$/;

        function jsonStringToDate(string) {
            var match = string.match(iso8065Str);
            if (match) {
                var date = new Date(0),
                    tzHour = 0,
                    tzMin = 0,
                    dateSetter = match[8] ? date.setUTCFullYear : date.setFullYear,
                    timeSetter = match[8] ? date.setUTCHours : date.setHours;
                if (match[9]) {
                    tzHour = parseInt(match[9] + match[10]);
                    tzMin = parseInt(match[9] + match[11]);
                }
                dateSetter.call(date, parseInt(match[1]), parseInt(match[2]) - 1, parseInt(match[3]));
                timeSetter.call(date, parseInt(match[4] || 0) - tzHour, parseInt(match[5] || 0) - tzMin, parseInt(match[6] || 0), parseInt(match[7] || 0));
                return date;
            }
            return string;
        }

        return function (format) {
            var date = this,
                text = '',
                parts = [],
                fn, match;
            format = format || 'mediumDate';
            format = formats[format] || format;
            if (typeof (date) === "string") {
                if (numberString.test(date)) {
                    date = parseInt(date);
                } else {
                    date = jsonStringToDate(date);
                }
            }
            if (ce.Type(date) === "Number") {
                date = new Date(date);
            }
            if (ce.Type(date) !== "Date") {
                return;
            }
            while (format) {
                match = dataFormatsSolit.exec(format);
                if (match) {
                    parts = parts.concat(match.slice(1));
                    format = parts.pop();
                } else {
                    parts.push(format);
                    format = null;
                }
            }
            parts.forEach(function (value) {
                fn = DATE_FORMATS[value];
                text += fn ? fn(date, formats) : value.replace(/(^'|'$)/g, '').replace(/''/g, "'");
            });
            return text;
        };
    })({
        "AMPMS": {
            "0": "上午",
            "1": "下午"
        },
        "DAY": {
            "0": "星期日",
            "1": "星期一",
            "2": "星期二",
            "3": "星期三",
            "4": "星期四",
            "5": "星期五",
            "6": "星期六"
        },
        "MONTH": {
            "0": "1月",
            "1": "2月",
            "2": "3月",
            "3": "4月",
            "4": "5月",
            "5": "6月",
            "6": "7月",
            "7": "8月",
            "8": "9月",
            "9": "10月",
            "10": "11月",
            "11": "12月"
        },
        "SHORTDAY": {
            "0": "周日",
            "1": "周一",
            "2": "周二",
            "3": "周三",
            "4": "周四",
            "5": "周五",
            "6": "周六"
        },
        "SHORTMONTH": {
            "0": "一月",
            "1": "二月",
            "2": "三月",
            "3": "四月",
            "4": "五月",
            "5": "六月",
            "6": "七月",
            "7": "八月",
            "8": "九月",
            "9": "十月",
            "10": "十一月",
            "11": "十二月"
        },
        "fullDate": "y年M月d日EEEE",
        "longDate": "y年M月d日",
        "medium": "yyyy-M-d ah:mm:ss",
        "mediumDate": "yyyy-M-d",
        "mediumTime": "ah:mm:ss",
        "short": "yy-M-d ah:mm",
        "shortDate": "yyyy-MM-dd",
        "shortTime": "hh:mm"
    });
    ce.LoadScript = function (url) {
        var script = document.createElement("script");
        script.type = "text/javascript";
        script.src = url;
        document.body.appendChild(script);
    };
    ce.LoadStyle = function (url) {
        var link = document.createElement("link");
        link.rel = "stylesheet";
        link.type = "text/css";
        link.href = url;
        var head = document.getElementsByTagName("head")[0];
        document.body.appendChild(link);
    };
    ce.Type = function (obj) { //类型检测
        return obj === null ? "Null" : obj === void 0 ? "Undefined" : Object.prototype.toString.call(obj).slice(8, -1);
    };
    //常量
    ce.Literal = {
        transform: (function () {
            var prefixes = ['Webkit', 'Moz', 'O', 'ms'];
            var mod = document.createElement("div").style;
            for (p in prefixes) {
                if (mod[prefixes[p] + "Transform"] !== undefined) {
                    return prefixes[p] + "Transform";
                }
            }
            return '';
        }())
    };

    /*
     *获得URL参数
     */
    ce.GetUrlParam = function () {
        var qs = (location.search.length > 0 ? location.search.substring(1) : ""),
            arges = {},
            items = qs.length ? qs.split("&") : [],
            item = null,
            name = null,
            value = null,
            i = 0,
            len = items.length;
        for (i = 0; i < len; i++) {
            item = items[i].split("=");
            name = decodeURIComponent(item[0]);
            value = decodeURIComponent(item[1]);
            if (name.length) {
                arges[name] = value;
            }
        }
        return arges;
    };
    /// <summary>Cookie操作对象</summary>
    ce.CookieUtil = {
        get: function (name) {
            var cookieName = encodeURIComponent(name) + "=",
                cookieStart = document.cookie.indexOf(cookieName),
                cookieValue = null;
            if (cookieStart > -1) {
                var cookieEnd = document.cookie.indexOf(";", cookieStart);
                if (cookieEnd === -1) {
                    cookieEnd = document.cookie.length;
                }
                cookieValue = decodeURIComponent(document.cookie.substring(cookieStart + cookieName.length, cookieEnd));
            }
            return cookieValue;
        },
        set: function (name, value, expires, path, domain, secure) {
            var cookieText = encodeURIComponent(name) + "=" + encodeURIComponent(value);
            if (expires instanceof Date) {
                cookieText += "; expries=" + expires.toGMTString();
            }

            if (path) {
                cookieText += "; path=" + path;
            }
            if (domain) {
                cookieText += "; domain=" + domain;
            }
            if (secure) {
                cookieText += "; secure";
            }
            document.cookie = cookieText;

        },
        del: function (name) {//为了删除指定名称的cookie，可以将其过期时间设定为一个过去的时间
            var date = new Date();
            date.setTime(date.getTime() - 10000);
            document.cookie = name + "=; expires=" + date.toGMTString();
        }

    };
    /* 
     * 生成唯一的不重复的字符串
     * @return {String} 返回字符串
     */
    ce.Guid = function () {
        return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
            var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
            return v.toString(16);
        }).toUpperCase();
    };

    /**
    * 
    * @memberOf string
    * @param {Object} obj 要转换成查询字符串的对象
    * @return {String} 返回转换后的查询字符串
    */
    var toQueryPair = function (key, value) {
        return encodeURIComponent(String(key)) + "=" + encodeURIComponent(String(value));
    };

    /**
     * 
     * @memberOf string
     * @param {Object} obj 要转换成查询字符串的对象
     * @return {String} 返回转换后的查询字符串
     */
    ce.ToQueryString = function (obj) {
        var result = [];
        for (var key in obj) {
            result.push(toQueryPair(key, obj[key]));
        }
        return result.join("&");
    };
    /*
    * 更改当前url的值
    */
    ce.SetLocationUrl = function (param) {
        var urlParam = shengyan.GetUrlParam();
        var href = window.location.href;
        var index = href.indexOf("?");
        var url = index > 0 ? href.substring(0, index) : href;
        for (var o in param) {
            urlParam[o] = param[o];
        }
        url += "?" + shengyan.ToQueryString(urlParam);
        window.location.href = url;
    };
    /*
     * 向控制台输出信息的方法,通过url里面的consolefilter参数可以控制tag输出
     * 
     * @param {String} msg 要输出的信息
     */
    ce.Out = function (text) {
        console.log(text);
    };

    // 兼容不同浏览器的 Adapter 适配层
    if (typeof window.XMLHttpRequest === "undefined") {
        /**
         * @ignore
         */
        window.XMLHttpRequest = function () {
            return new window.ActiveXObject(navigator.userAgent.indexOf("MSIE 5") >= 0 ? "Microsoft.XMLHTTP" : "Msxml2.XMLHTTP");
        };
    }



    /*
     *回车焦点控制 
     *@params {HTMLCollection} dom集合
     */
    ce.EnterDomHelper = function (doms) {
        var length = doms.length;
        for (var i = 0; i < length; i++) {
            doms[i]._shengyan_i = i;
            doms[i].addEventListener("keydown", function (e) {
                var keyCode = event.keyCode || event.charCode;
                if (keyCode === 13) {
                    var dom = doms[this._shengyan_i + 1];
                    if (dom) {
                        if (dom.nodeName === "INPUT" && (dom.type === "radio" || dom.type === "checkbox" || dom.type === "text" || dom.type === "password")) {
                            dom.focus();
                        } else {
                            dom.click();
                        }
                    }
                }
            }, false);
        }
    };
    /*
     *焦点控制
     *@params {String} id集合
     */
    ce.EnterIdHelper = function (ids) {
        var doms = [];
        for (var i = 0; i < ids.length; i++) {
            doms.push(document.getElementById(ids[i]));
        }
        ce.EnterDomHelper(doms);

    };
    window.requestAnimFrame = (function () {
        return window.requestAnimationFrame ||
          window.webkitRequestAnimationFrame ||
          window.mozRequestAnimationFrame ||
          window.oRequestAnimationFrame ||
          window.msRequestAnimationFrame ||
          function (callback) {
              window.setTimeout(callback, 1000 / 60);
          };
    })();

    window.shengyan = window.change = window.ce = ce;

})(window);
