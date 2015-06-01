
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

(function (ce) {
    /**
    * Ajax封装
    * 
    * @memberOf shangyan
    * @method  ajax
    * 
    * @param {Object} option 配置对象，如：isAsync,data,arguments,success,error,complete,timeout,contentType,dataType
    * @return {Object} ajax 返回一个ajax对象，可以abort掉
    */
    ce.Ajax = function (option) {
        var httpRequest,
            httpSuccess,
            timeout,
            isTimeout = false,
            isComplete = false;

        option = {
            url: option.url || "",
            method: (option.type || "GET").toUpperCase(),
            data: option.data || null,
            arguments: option.arguments || null,

            success: option.success || function () { },
            error: option.error || function () { },
            complete: option.complete || function () { },


            isAsync: option.isAsync || true,
            timeout: option.timeout || 30000,
            contentType: option.contentType,
            dataType: option.dataType || "xml",
            getLoading: option.getLoading || false,
            postLoading: option.postLoading || false,
            showText: option.showText || false,

        };
        if (option.getLoading) {
            option.showText = "正在请求数据，请稍等...";
        }
        if (option.postLoading) {
            option.showText = "正在提交您的数据，请稍后...";
        }

        if (option.data && typeof option.data === "object") {
            option.data = ce.ToQueryString(option.data);
        }

        //检查ajax请求
        var httpSuccess = function (r) {
            try {
                return (!r.status && location.protocol == "file:")
                    || (r.status >= 200 && r.status < 300)
                    || (r.status == 304)
                    || (navigator.userAgent.indexOf("Safari") > -1 && typeof r.status == "undefined");
            } catch (e) {
                ce.out("错误：[" + e.name + "] " + e.message + ", " + e.fileName + ", 行号:" + e.lineNumber + "; stack:" + typeof e.stack, 2);
            }
            return false;
        };
        timeout = option.timeout;

        httpRequest = new window.XMLHttpRequest();

        /**
         * @ignore
         */
        httpRequest.onreadystatechange = function () {
            if (httpRequest.readyState == 4) {
                if (!isTimeout) {
                    var o = {};
                    o.responseText = httpRequest.responseText;
                    o.responseXML = httpRequest.responseXML;
                    o.data = option.data;
                    o.status = httpRequest.status;
                    o.uri = option.url;
                    o.arguments = option.arguments;
                    if (option.dataType === 'json') {
                        try {
                            o.responseJSON = JSON.parse(httpRequest.responseText);
                        } catch (e) {
                        }
                    }
                    if (httpSuccess(httpRequest)) {
                        if (option.showText) {
                            document.getElementById("div-shengyan-loading").style.display = "none";
                        }
                        option.success(o.responseJSON || o.responseXML || o.responseText);
                    } else {
                        option.error(o);
                    }
                    option.complete(o);
                }
                isComplete = true;
                //删除对象,防止内存溢出
                httpRequest = null;
            }
        };
        if (option.showText) {
            var loading = document.getElementById("div-shengyan-loading");
            if (!loading) {
                document.body.insertAdjacentHTML("beforeend", "<div id='div-shengyan-loading' class='scripturesStyle modal_bg modal_bg2' style='text-align: center; background: none;'>\
                                                                <div class='info'>\
                                                                    <img src='/Content/Change/Images/loading.gif' />\
                                                                     <span>"+ option.showText + "<span>\
                                                                </div>\
                                                            </div>");
            } else {
                loading.style.display = "block";
            }

        }
        if (option.method === "GET") {
            if (option.data) {
                option.url += (option.url.indexOf("?") > -1 ? "&" : "?") + option.data;
                option.data = null;
            }
            httpRequest.open("GET", option.url, option.isAsync);
            httpRequest.setRequestHeader("Content-Type", option.contentType || "text/plain;charset=UTF-8");
            httpRequest.send();
        } else if (option.method === "POST") {
            httpRequest.open("POST", option.url, option.isAsync);
            httpRequest.setRequestHeader("Content-Type", option.contentType || "application/x-www-form-urlencoded;charset=UTF-8");
            httpRequest.send(option.data);
        } else {
            httpRequest.open(option.method, option.url, option.isAsync);
            httpRequest.send();
        }

        window.setTimeout(function () {
            var o;
            if (!isComplete) {
                isTimeout = true;
                o = {};
                o.uri = option.url;
                o.arguments = option.arguments;

                option.complete(o);
            }
        }, timeout);

        return httpRequest;
    };
}(ce));
(function (ce) {
    /*
    *上传组件  目前只适用于上传单张图片
    *@params {String} Option.height  上传图片截取高度
    *@params {String} option.width  上传图片截取的宽度
    *@params {String} Option.targetInput  触发上传元素ID
    *@params {String} option.targetImage  上传文件成功后显示的图片id
    *@params {String} option.progressdiv  上传文件进度条
    *@params {String} option.animation  图片翻滚动画 默认开启
    */
    ce.UploadInput = function (option) {
        var input = document.createElement("input"), a = 0, container = $("#" + option.targetInput).parents(".upload_seat_pic");
        input.type = "file";
        input.accept = "image/*";
        input.multiple = 'multiple';
        input.style.display = "none";
        if (option.progressdiv) {
            var progressdiv = document.getElementById(option.progressdiv);
            progressdiv.innerHTML = " <div class='rate'style='display:none;'><div data-progress='true' style='width: 0%;'></div></div></div>";

        }
        if (container.length > 0) {
            var width = option.width || 160, height = option.height || 160,
            font = container[0].querySelector(".front"),
            back = container[0].querySelector(".back"),
             con = container[0].querySelector(".flip-container");


            font.style.width = width + "px";
            font.style.height = height + "px";

            back.style.width = width + "px";
            back.style.height = height + "px";

            con.style.width = width + 2 + "px";
            con.style.height = height + 2 + "px";
        }


        input.onchange = function () {
            if (option.progressdiv) {
                document.getElementById(option.progressdiv).querySelector(".rate").style.display = "block";
            }
            ce.Upload("/UpLoadObject/UploadifyUpload?width=" + (option.width || 160) + "&height=" + (option.height || 160), {
                data: this.files,
                count: 1,
                size: 2,
                dataType: "json",
                loadstart: function () {
                    if (option.progressdiv) {
                        document.getElementById(option.progressdiv).querySelector("div[data-progress='true']").style.width = "0%";

                    }
                },
                progress: function () {
                    if (event.lengthComputable && option.progress) {
                        document.getElementById(option.progressdiv).querySelector("div[data-progress='true']").style.width = 100 * event.loaded / event.total + "%";
                        option.progress(event);
                    }
                },
                onload: function () {
                    if (option.progressdiv) {
                        document.getElementById(option.progressdiv).querySelector("div[data-progress='true']").style.width = "100%";
                    }

                },
                success: function (data) {
                    if (typeof option.animation === "undefined" || option.animation === true) {
                        var img = container.find("img")[(a + 1) % 2];
                        img.src = data.ImgFullPath;
                        img.onload = function () {
                            container[0].querySelector(".front").style[shengyan.Literal.transform] = "rotateY(" + ((a + 1) * 180) + "deg)";
                            container[0].querySelector(".back").style[shengyan.Literal.transform] = "rotateY(" + (a * 180) + "deg)";
                            a++;
                        };
                    } else {
                        if (option.targetImage) {
                            document.getElementById(option.targetImage).src = data.ImgFullPath;
                        }
                    }

                    if (option.success) {
                        option.success(data);
                    }
                }
            });
        };
        document.body.appendChild(input);
        document.getElementById(option.targetInput).onclick = (function (input) {
            return function () {
                input.click();
            };
        }(input));

    };
    /* 
     *异步上传原型
     */
    ce.Upload = function (url, option) {
        option = {
            data: option.data || null,
            success: option.success || function () {
            },
            error: option.error || function () {
            },
            isAsync: option.isAsync || true,
            dataType: option.dataType || "xml",
            image: true,  //上传文件类型 默认图片
            count: option.count || 1, //多上传个数进行限制
            size: 2,//默认2M,
            progress: option.progress,
            onload: option.onload,
            loadstart: option.loadstart

        };
        if (option.data.lenght > option.count) {
            ce.AlertInfo("对不起只能上传一个" + (option.image ? "图片" : "文件") + "!");
        }

        if (option.image) {
            for (var i = 0; i < option.data.length; i++) {
                if (!option.data[i].type.match(/image.*/)) {
                    ce.AlertInfo(" 只能上传图片!");
                    return;
                } else {

                    if (parseFloat(option.data[i].size) > (1024 * 1024 * option.size)) {
                        ce.AlertInfo("只能上传小于" + option.size + "M的图片!");
                        return;
                    }
                }
            }

        }

        var xhr = new XMLHttpRequest();
        if (option.loadstart) {
            xhr.onloadstart = option.loadstart;

        }
        xhr.open("POST", url);

        if (option.progress) {

            xhr.upload.addEventListener("progress", option.progress, false);
        }

        if (option.onload) {

            xhr.addEventListener("load", option.onload, false);
        }

        //检查ajax请求
        var httpSuccess = function (r) {
            try {
                return (!r.status && location.protocol == "file:")
                    || (r.status >= 200 && r.status < 300)
                    || (r.status == 304)
                    || (navigator.userAgent.indexOf("Safari") > -1 && typeof r.status == "undefined");
            } catch (e) {
                ce.out("错误：[" + e.name + "] " + e.message + ", " + e.fileName + ", 行号:" + e.lineNumber + "; stack:" + typeof e.stack, 2);
            }
            return false;
        };
        xhr.onreadystatechange = function () {
            if (xhr.readyState === 4) {
                var o = {};
                o.responseText = xhr.responseText;
                o.responseXML = xhr.responseXML;
                o.data = option.data;
                o.status = xhr.status;
                o.uri = option.url;
                if (option.dataType === 'json') {
                    try {
                        o.responseJSON = JSON.parse(xhr.responseText);
                    } catch (e) {
                    }
                }
                if (httpSuccess(xhr)) {
                    option.success(o.responseJSON || o.responseXML || o.responseText);
                } else {
                    option.error(o);
                }

                //删除对象,防止内存溢出
                xhr = null;
            }
        };
        var fd = new FormData;
        if (option.data instanceof File) {
            option.data = { "file": data };
        }

        for (var key in option.data) {
            fd.append(key, option.data[key]);
        }
        xhr.send(fd);
    };
}(ce));
(function (ce) {
    /*
     * 打印
     *@params {String} str 打印内容
     *@params {String} syleId 打印的纸张类型  可以print.css文件中自定义 例如 a4  a58 
     *@params {String} debug 调试模式
     */
    ce.Print = function (str, syleId, debug) {

        var div = document.createElement("div");
        div.innerHTML = str;
        div.id = syleId;
        div.display = "block";
        if (!(iframe = document.getElementById("change_print_iframe"))) {
            var iframe = document.createElement("iframe");
            iframe.src = "/Content/Change/printIFrame.html";
            iframe.id = "change_print_iframe";
            if (debug) {
                iframe.style.width = "100%";
                iframe.style.height = "600px";

            } else {
                iframe.style.display = "none";
            }

            document.body.appendChild(iframe);
            iframe.onload = function () {
                var _this = iframe.contentWindow;
                var printcss = document.querySelectorAll("link[media='print']");
                for (var i = 0; i < printcss.length; i++) {
                    _this.document.head.appendChild(printcss[i].cloneNode());
                }

                _this.document.body.innerHTML = div.outerHTML;
                _this.print();

            };
        } else {
            iframe.contentWindow.document.body.innerHTML = div.outerHTML;
            iframe.contentWindow.print();
        }

    };
}(ce));

(function (ce) {
    /*
     * 页面顶部信息提示
     *@params {String} text 提示文字
     *@params {function} [可选]fun  回调函数
     */
    ce.HeaderInfo = function (text, fun) {
        var info = document.getElementById("system-info");
        if (!info) {
            var str = ce.Format("<div id='system-info' class='alert  system-info-div'>#{0}</div>", text);
            document.body.insertAdjacentHTML("beforeend", str);
            info = document.getElementById("system-info");
        } else {
            info.innerText = text;
        }
        info.style.display = "inline-block";
        var height = info.offsetHeight + 1;
        info.style.top = -height + "px";
        var top = -height;
        var hiden = function () {
            top -= 2;
            info.style.top = top + "px";
            if (top < -height) {
                if (fun) { fun(); }
                return false;
            } else {
                return true;
            }
        };

        var show = function () {
            info.style.top = top + "px";
            if (top <= height / 2) {
                top += 1.5;
            } else {
                top += 1;
            }
            if (top > 0) {
                return false;
            } else {
                return true;
            }
        };
        function animlHiden() {
            if (hiden()) { requestAnimFrame(animlHiden); }
        };
        if (window.__hidenTime) {
            clearTimeout(window.__hidenTime);
            window.__hidenTime = setTimeout(animlHiden, 2000);
        } else {
            window.__hidenTime = setTimeout(animlHiden, 2000);
        }

        (function animloop() {
            if (show()) { requestAnimFrame(animloop); }

        })();
    };

    /*
     *系统信息提示弹出层
     *@method AlertInfo 
     *@for ce
     *@params {String} content 提示信息内容
     *@parmas {Function} [可选]fun  确认按钮点击后的回调函数
    */
    ce.AlertInfo = function (content, fun) {
        var okFun, cancerFun;
        if (arguments.length > 2) {
            okFun = arguments[1] || function () { };
            cancerFun = arguments[2] || function () { };
        } else {
            okFun = fun;
        }
        var removeModeal = function () {
            var shegnyanModal = document.getElementById("_shegnyan_modal");
            shegnyanModal.parentNode.removeChild(shegnyanModal);
            document.body.style.overflowY = 'scroll';
        };
        var ok = function () {
            removeModeal();
            if (okFun) { okFun(); }
        };
        var hide = function () {
            removeModeal();
            if (cancerFun) { cancerFun(); }
        };
        var str = ce.Format("<div class='modalDiv' style='width: 350px; height: 200px;'>\
                                  <div data-cont='0'> \
                                    <h1 class='title_1'><span>系统提示</span></h1>\
                                    <div style='min-width: inherit;'>\
                                        <div class='con_box' style='padding-bottom: 1px;'>\
                                            <form>\
                                                <ul>\
                                                    <li class='notice'><span>#{0}</span></li>\
                                                </ul>\
                                                <div class='btn_area_c'>\
                                                      <a id='_shengyan_ok' href='javascript:void(0)' style='margin-right: 20px;' class='btn_2'><span>确定</span></a>                                             #{1}\
                                                </div>\
                                            </form>\
                                        </div>\
                                    </div>\
                                 </div>\
                         </div>", content, (cancerFun ? "<a id='_shengyan_cancer' href='javascript:void(0)' class='btn_1'><span>取消</span></a>" : ""));
        var div = document.createElement("div");
        div.id = "_shegnyan_modal";
        div.classList.add("scripturesStyle");
        div.classList.add("modal_bg");
        div.classList.add("modal_bg2");
        
        div.innerHTML = str;

        document.body.appendChild(div);
        document.body.style.overflowY = 'hidden';
        document.getElementById("_shengyan_ok").onclick = ok;
        var cancerBtn = document.getElementById("_shengyan_cancer");
        if (cancerBtn) {
            cancerBtn.onclick = hide;
        }

        var text = div.querySelector("div[data-cont='0']");
        text.addEventListener("mouseover", function () {
            var classList = this.classList;
            if (!classList.contains("shengyanTransformScale")) {
                classList.add("shengyanTransformScale");
            }
        });
        text.addEventListener("mouseleave", function () {
            var classList = this.classList;
            if (classList.contains("shengyanTransformScale")) {
                classList.remove("shengyanTransformScale");
            }
        });
    };

    /*
     *系统确认取消弹出层
     *@method ComfirmInfo 
     *@for ce
     *@params {String} content 提示信息内容
     *@parmas {Function} [可选]okFun  "确认" 按钮点击后的回调函数 
     *@params {Function} [可选]cancerFun "确认"按钮 点击后的回调函数
    */
    ce.ComfirmInfo = function (content, okFun, cancerFun) {
        ce.AlertInfo(content, okFun, cancerFun);
    };
    ce.AlertPage = (function () {
        this.Callback = null;

        /*
        *页面弹出层
        *@method Show 
        *@for AlertPage
        *@parmas {String} url
        *@parmas {width} 弹出层宽度 [可选]  默认800px
        *@params {height}弹出层高度 [可选]  默认600px
        *@params {title} 弹出层的标题 [可选]   默认弹出页面的<title>标签的内容
        *@params {callback} 页面关闭后的回调函数 [可选]
       */
        function show(url, width, height, title, callback) {

            var modalbg = document.getElementById("_shengyan_popBkg"),
                width = width || 800, height = height || 600;
            this.Callback = callback || null;

            if (modalbg) {
                var modalDiv = modalbg.querySelector(".modalDiv");
                modalDiv.style.width = width + "px";
                modalDiv.style.height = height + "px";
                modalDiv.querySelector("#_shengyan_popFrame").src = url;

            } else {
                var str = ce.Format(
             "<div id='_shengyan_popBkg' class='scripturesStyle modal_bg'>\
                    <div class='modalDiv' style='width: #{0}px; height: #{1}px;'>\
                       <h1 class='title_1'><a href='javascript:ce.AlertPage.Hide();' class='close' title='关闭'>关闭</a><span class='__popBkgtitle'></span></h1>\
                       <iframe id='_shengyan_popFrame' style='height: #{1}px' src='#{2}' frameborder='0'></iframe>\
                    </div>\
              </div>", width, height, url);
                document.body.insertAdjacentHTML("beforeend", str);
                modalbg = document.getElementById("_shengyan_popBkg");
            }
            modalbg.querySelector("#_shengyan_popFrame").onload = (function (title) {
                return function () {
                    title = title || document.getElementById("_shengyan_popFrame").contentWindow.document.querySelector("title").innerText;
                    modalbg.querySelector("span.__popBkgtitle").innerText = title;
                    modalbg.style.display = "block";
                };
            })(title);
            document.body.style.overflowY = 'hidden';
        };
        function hide(data) {
            if (this.Callback) { this.Callback(data); }
            setTimeout(function () {
                document.getElementById("_shengyan_popBkg").style.display = "none";
                document.body.style.overflowY = 'scroll';
            }, 0);
        };
        return {
            Show: show,
            Hide: hide
        };

    }());
}(ce));

/*
 * 序列化表单 
 * 对jquery 扩展 支持 增加属性为disabled控件的取值 
 * 增加 序列化JSON 方法
 * 增加 .net对json数组问题解决的方法
 */
$(function () {
    
    jQuery.fn.extend({
        serialize: function () {
            return jQuery.param(this.serializeArray());
        },
        serializeArray: function () {
            return this.map(function () {
                return this.elements ? jQuery.makeArray(this.elements) : this;
            })
            .filter(function () {
                return this.name &&
                    (this.checked || /^(?:select|textarea)/i.test(this.nodeName) ||
                        /^(?:color|date|datetime|datetime-local|email|hidden|month|number|password|range|search|tel|text|time|url|week)$/i.test(this.type));
            })
            .map(function (i, elem) {
                var val = jQuery(this).val();

                return val == null ?
                    null :
                    jQuery.isArray(val) ?
                        jQuery.map(val, function (val, i) {
                            return { name: elem.name, value: val.replace(/\r?\n/g, "\r\n") };
                        }) :
					{ name: elem.name, value: val.replace(/\r?\n/g, "\r\n") };
            }).get();
        }
    });

    /*
     * 序列化成json
     */
    $.fn.serializeJson = function () {
        var serializeObj = {};
        $(this.serializeArray()).each(function () {
            var val = serializeObj[this.name];
            if (val!==undefined) {
                if (Array.isArray(val)) {
                    serializeObj[this.name].push(this.value);
                } else {
                    serializeObj[this.name] = [serializeObj[this.name], this.value];
                }
            } else {
                serializeObj[this.name] = this.value;
            }

        });
        return serializeObj;
    };
    /*
     * 解决.net 数组问题 
     */
    $.fn.serializeJsonNET = function () {
        var serializeObj = this.serializeJson();
        for (var o in serializeObj) {
            var obj = serializeObj[o];
            if (Array.isArray(obj)) {
                for (var k = 0; k < obj.length; k++) {
                    serializeObj[o + "[" + k + "]"] = obj[k];
                }
                delete serializeObj[o];
            }

        }
        return serializeObj;
    };
});
/// <reference path="jquery-1.7.1.js" />
/// <reference path="valid.js" />
/// <reference path="change.js" />

/*  
 *分页对象  依赖库：change.js、jquery
 * 本分页控件提供 AJax和loaction地址 两种分页。 
 * 1.AjaxDatapager  使用方法
 *             
 *         window.pageMutual = new shengyan.AjaxDatapager( "/Material/GetMaterialpage",
 *                                                           null,
 *                                                          "pagediv",
 *                                                          6, 
 *                                                          function (data) {
 *                                                             viewModal.Materials(data.List);
 *                                                          });
 *         pageMutual.Target({ name: "张三" }, 1);
 *                        
 *                        
 * 2.LocationDatapager 使用方法  var locatinPage = new shengyan.LocationDatapager('pageFooterId',20,50);
 *                  
 *  
 */
(function (ce) {
    /*
     *分页基类
     */
    function Datapager() {
        this.url = "", this.pageIndex = 0, this.pageSize = 0, this.totalCount = 0, this.totalpage = 0, this.pageFooterId, this.where = null, this.pagediv = null; //过滤条件
        this.ShowSatus = function () {
            var str = "";
            var start = Math.floor((this.pageIndex - 1) / 10) * 10 + 1;
            for (var i = start; i <= this.totalpage; i++) {
                if (i - start > 9) {
                    break;
                }
                str += "<li " + (this.pageIndex === i ? "class='on'" : "") + "><a   href='javascript:void(0);' data-action='" + i + "'>" + i + "</a></li>";
            }
            return str;
        };

        this.ToHtml = function () {

            var html = shengyan.Format("<div class='scripturesStyle'><div class='page_nav'>\
                               <dl class='jump_menu'>\
                                   <dt><a href='javascript:void(0)'>转到</a></dt>\
                                   <dd class='input_jumpmenu'>\
                                       <input type='text' style='height: 100%;'></dd>\
                                   <dd class='text_page'>页</dd>\
                               </dl>\
                               <ul class='page_file'>\
                                   <li class='pre'>\
                                       <a href='javascript:void(0)' data-action='pre' title='上十页'>上十页</a>\
                                   </li>\
                                  #{4}\
                                   <li class='next'><a href='javascript:void(0)' data-action='next' title='下十页'>&gt;&gt;</a></li>\
                               </ul>\
                               <span class='page_nav_info'>共 #{0} 条记录 页次：#{1}/#{2}页 #{3}条/页</span>\
                       </div></div>", this.totalCount, this.pageIndex, this.totalpage, this.pageSize, this.ShowSatus());

            this.pagediv.innerHTML = html;

        };

        this.BindClick = function () {
            var that = this;
            $(that.pagediv).find(".page_file li a").click(function () {
                var target = $(this).attr("data-action"), index;
                if (target === "pre") {
                    index = (Math.floor(that.pageIndex / 10) - 1) * 10 + 1;
                    if (index > 0) {
                        that.Target(that.where, index);

                    }
                } else if (target === "next") {
                    index = Math.ceil(that.pageIndex / 10) * 10 + 1;
                    if (index < that.totalpage) {

                        that.Target(that.where, index);
                    }
                } else {
                    that.Target(that.where, parseInt(target));
                }
            });
            Verification.BindnumberInput($(that.pagediv).find(".jump_menu input")[0]);

            $(that.pagediv).find(".jump_menu a").click(function () {
                var index = $(that.pagediv).find(".jump_menu input").val();
                if (!isNaN(index)) {
                    that.Target(that.where, parseInt(index));
                }
            });
        };
    };

    /*
     *跳转分页
     *@params {Object}  where过滤条件、 例如 { name: "张三" }
     *@params {Number}  页数
     */
    Datapager.prototype.Target = function (where, index) {
        this.where = where || null;
        if (index == 1) {
            this.pageIndex = index;
            this.GetData();
        } else {
            if (index > 0 && index <= this.totalpage) {
                this.pageIndex = index;
                this.GetData();
            } else {
                shengyan.HeaderInfo("没有该页！", function () {
                    $(pagediv).find(".jump_menu input").val("");
                });

            }
        }
    };
    Datapager.prototype.Bind = function () {
        if (this.totalpage !== 0) {
            this.ToHtml();
            this.BindClick();
        }
    };

    /*
     *location 分页对象
     *@params {String} pageFooterId 分页存放容器ID
     *@params {String} pageSize 分页大小
     *@params {String} totalCount 总条数
     */
    function locationDatapager(pageFooterId, pageSize, totalCount) {
        Datapager.call(this);
        var urlParam = shengyan.GetUrlParam();
        this.totalCount = parseInt(totalCount || 0);
        this.pageSize = parseInt(pageSize || 20);
        this.pageIndex = parseInt(urlParam["pageIndex"] || 1);
        this.totalpage = Math.ceil(this.totalCount / this.pageSize);

        this.pageFooterId = pageFooterId;
        this.pagediv = document.getElementById(this.pageFooterId);
        this.GetData = function () {
            //var href = window.location.href;
            //var index = href.indexOf("?");
            //var url = index > 0 ? href.substring(0, index) : href;
            //urlParam["pageIndex"] = this.pageIndex;
            //url += "?" + shengyan.ToQueryString(urlParam);
            //window.location.href = url;

            shengyan.SetLocationUrl({ "pageIndex": this.pageIndex });
        };
        this.Bind();
    };
    locationDatapager.prototype = new Datapager();

    /*
     *Ajax 分页对象
     *@params {String} url 请求地址
     *@params {String} showDataId  展示数据容器ID
     *@params {String} pageFooterId 分页存放容器ID
     *@params {String} pageSize  分页大小
     *@params {String} callBack  分页回调函数
     */
    function ajaxDatapager(url, showDataId, pageFooterId, pageSize, callBack) {
        //default
        this.pageSize = 8;
        this.url = url;
        this.showDataId = showDataId;
        this.pageFooterId = pageFooterId;
        this.pageSize = pageSize || 8;
        this.callBack = callBack;
        this.pagediv = document.getElementById(this.pageFooterId);
        this.GetData = function () {
            var that = this;
            $.ajax({
                type: 'get',
                url: this.url + "?pageIndex=" + that.pageIndex + "&pageSize=" + that.pageSize,
                data: that.where,
                cache: false,
                dataType: 'json',
                success: function (data) {
                    that.totalCount = data.RecordCount || 0;
                    that.totalpage = Math.ceil(that.totalCount / that.pageSize);
                    that.Bind();
                    if (that.callBack) {
                        that.callBack(data);
                    }
                    if (that.showDataId) {
                        document.getElementById(that.showDataId).innerHTML = data.List;
                    }

                },
                error: function () {

                }
            });
        };
    };
    ajaxDatapager.prototype = new Datapager();

    ce.LocationDatapager = locationDatapager;
    ce.AjaxDatapager = ajaxDatapager;

}(ce));




/*
 *日历控件 使用方法 Calendar.Create($('#data_date1'));
 */
window.Calendar = {
    Close: function() {
        $('#calendar').remove();
    },
    Create: function(object) {
        // 创建日期组件
        var date = new Date();
        var offsert = object.offset();
        var left = offsert.left;
        var top = offsert.top + 5 + object.height();
        // 包装日历的HTML代码
        var html = '<div id="calendar"  onmouseleave="Calendar.Close();" style="z-index:99999999999;left:' + left + 'px;top:' + top + 'px;" class="calendar_min" data-target="' + object.attr('id') + '" data-year="' + date.getFullYear() + '" data-month="' + (date.getMonth() + 1) + '"><h3>';
        html = html + '<a href="javascript:Calendar.LastYear();" class="pre_year" title="去年">去年</a>';
        html = html + '<a href="javascript:Calendar.LastMonth()" class="pre_month" title="上个月">上个月</a>';
        html = html + '<span class="tit">' + date.getFullYear() + '年' + (date.getMonth() + 1) + '月</span>';
        html = html + '<a href="javascript:Calendar.NextYear()" class="next_year" title="明年">明年</a>';
        html = html + '<a href="javascript:Calendar.NextMonth()" class="next_month" title="下个月">下个月</a></h3>';
        html = html + '<div class="week"><ul><li>一</li><li>二</li><li>三</li><li>四</li><li>五</li><li>六</li><li class="last">日</li></ul></div>';
        html = html + '<div class="days"><ul>';
        for (var index = 1; index < 43; index++) {
            if ((index % 7 === 0)) {
                html = html + '<li class="space r"></li>';
            } else {
                html = html + '<li class="space"></li>';
            }
        }
        html = html + '</ul></div>';
        // 移除正在显示的日历
        Calendar.Close();
        // 插入即将显示的日历
        $(document.body).append(html);
        //object.parent().append(html);
        // 渲染正在显示的日历
        Calendar.Render(date.getFullYear(), (date.getMonth() + 1));

    },
    Render: function(year, month) {
        var space = (new Date(year, month - 1, 1).getDay() - 1);
        if (space < 0) space = space + 7;
        var items = new Date(year, month, 0).getDate();
        var object = $('#calendar');
        var index = 1;
        Calendar.Reset();
        object.attr('data-year', year);
        object.attr('data-month', month);
        object.find('span.tit').html(year + '年' + month + '月');
        object.find('div.days > ul > li').each(function() {
            if (index > space && index <= (items + space)) {
                var result = index - space;
                $(this).html('<span onclick="Calendar.Click(' + result + ');">' + result + '</span>').removeClass('space');
            }
            index++;
        });
    },
    LastMonth: function() {
        var object = $('#calendar');
        var year = parseInt(object.attr('data-year'));
        var month = parseInt(object.attr('data-month')) - 1;
        if (month < 1) {
            month = 12;
            year--;
        }
        Calendar.Reset();
        Calendar.Render(year, month);
    },
    LastYear: function() {
        var object = $('#calendar');
        var year = parseInt(object.attr('data-year')) - 1;
        var month = parseInt(object.attr('data-month'));
        Calendar.Reset();
        Calendar.Render(year, month);
    },
    NextMonth: function() {
        var object = $('#calendar');
        var year = parseInt(object.attr('data-year'));
        var month = parseInt(object.attr('data-month')) + 1;
        if (month > 12) {
            month = 1;
            year++;
        }
        Calendar.Reset();
        Calendar.Render(year, month);
    },
    NextYear: function() {
        var object = $('#calendar');
        var year = parseInt(object.attr('data-year')) + 1;
        var month = parseInt(object.attr('data-month'));
        Calendar.Reset();
        Calendar.Render(year, month);
    },
    Reset: function() {
        var object = $('#calendar');
        object.find('div.days > ul > li').each(function() {
            $(this).html('').addClass('space');
        });
    },
    Click: function(day) {
        var object = $('#calendar');
        var year = parseInt(object.attr('data-year'));
        var month = parseInt(object.attr('data-month'));
        var result = year + '-' + month + '-' + day;
        var target = object.attr('data-target');
        $('#' + target).val(result).trigger('change');
        Calendar.Close();
    }
};
/*
 *现住址选择级联
 *@for shengyan
 *@params {String} id 呈现内容的容器ID
 *@params {integer} cityid  城市ID  设置城市
 *@params {String} address 详细地址
 */
ce.SelectCurrentCity = function (param) {
    var _this = this;
    var value = param.cityid,
        address = param.address,
        selects = [],
        values = [],
        dom = document.getElementById(param.id);
    _this.Data = null;
    _this.length = 3;

    var change = function () {
        if (selects[0] == this) {
            createOption(selects[1], filter(this.value));
            selects[2].innerHTML = "<option value='-1'>请选择</option>";
        } else if (selects[1] == this) {
            createOption(selects[2], filter(this.value));
        }
    };
    var createHtml = function () {
        for (var i = 0; i < _this.length; i++) {
            var select = document.createElement("select");
            select.style.marginRight = "1px";
            dom.appendChild(select);
            selects.push(select);
        }
        var input = document.createElement("input");
        input.type = "text";
        input.maxLength = 25;
        input.style.width = "110px";

        input.value = address;
        dom.appendChild(input);
        _this.input = input;
    };

    var createOption = function (select, data) {
        var str = "<option value='-1'>请选择</option>";
        for (var i = 0; i < data.length; i++) {
            str += "<option value='" + data[i].CityID + "'>" + data[i].CityName + "</option>";
        }
        select.innerHTML = str;
    };
    var filter = function (parentID) {
        var data = [];
        for (var i = 0; i < _this.Data.length; i++) {
            if (_this.Data[i].ParentID == parentID) {
                data.push(_this.Data[i]);
            }
        }
        return data.sort(function (a, b) { a.Sequence - b.Sequence });
    };
    var getData = function () {
        shengyan.Ajax({
            type: "GET",
            url: "/City/GetAllCity",
            cache: false,
            dataType: "json",
            data: {},
            success: function (data) {
                _this.Data = data;
                if (value != null) {
                    setValue();
                }
            },
            error: function () {

            }
        });

    };
    var find = function (id) {
        for (var i = 0; i < _this.Data.length; i++) {
            if (_this.Data[i].CityID == id) {
                return _this.Data[i];
            }
        }

    };
    var setValue = function () {
        var val1 = find(value);
        if (val1) {
            if (val1.ParentID == 0) {
                values.push(val1);
            } else {
                var val2 = find(val1.ParentID);
                if (val2.ParentID == 0) {
                    values.push(val2, val1);
                } else {
                    var val3 = find(val2.ParentID);
                    if (val3.ParentID == 0) {
                        values.push(val3, val2, val1);
                    }
                }
            }

        }
        var parentID = 0;
        for (var i = 0; i < _this.length; i++) {
            createOption(selects[i], filter(parentID));
            if (values[i]) {
                selects[i].value = values[i].CityID;
                parentID = values[i].CityID;
            }
            selects[i].addEventListener("change", change, false);
        }
        if (values.length == 0) {
            selects[1].innerHTML = "<option value='-1'>请选择</option>";
            selects[2].innerHTML = "<option value='-1'>请选择</option>";

        } else if (values.length == 1) {
            selects[2].innerHTML = "<option value='-1'>请选择</option>";
        }

    };
    createHtml();
    getData();
    return {
        GetValue: function () {
            var val = null;
            for (var i = selects.length - 1; i >= 0 ; i--) {
                if (selects[i].value && selects[i].value != "-1") {
                    val = selects[i].value;
                    break;
                }
            }
            return { CityID: val, Address: _this.input.value || "" };
        }

    };
};



/*
 *籍贯选择级联
 *@for shengyan
 *@params {String} id 呈现内容的容器ID
 *@params {integer} cityid  城市ID  设置城市
 */
ce.SelectNativeCity = function (param) {
    var _this = this;
    var value = param.cityid,
        selects = [],
        values = [],
        dom = document.getElementById(param.id);
    _this.Data = null;
    _this.length = 2;

    var change = function () {
        if (selects[0] == this) {
            createOption(selects[1], filter(this.value));
        }
    };
    var createHtml = function () {
        for (var i = 0; i < _this.length; i++) {
            var select = document.createElement("select");

            select.style.marginRight = "1px";
            dom.appendChild(select);
            selects.push(select);
        }

    };

    var createOption = function (select, data) {
        var str = "<option value='-1'>请选择</option>";
        for (var i = 0; i < data.length; i++) {
            str += "<option value='" + data[i].CityID + "'>" + data[i].CityName + "</option>";
        }
        select.innerHTML = str;
    };
    var filter = function (parentID) {
        var data = [];
        for (var i = 0; i < _this.Data.length; i++) {
            if (_this.Data[i].ParentID == parentID) {
                data.push(_this.Data[i]);
            }
        }
        return data.sort(function (a, b) { a.Sequence - b.Sequence });
    };
    var getData = function () {
        shengyan.Ajax({
            type: "GET",
            url: "/City/GetAllCity",
            cache: false,
            dataType: "json",
            data: {},
            success: function (data) {
                _this.Data = data;
                if (value != null) {
                    setValue();
                }
            },
            error: function () {

            }
        });
    };
    var find = function (id) {
        for (var i = 0; i < _this.Data.length; i++) {
            if (_this.Data[i].CityID == id) {
                return _this.Data[i];
            }
        }

    };
    var setValue = function () {
        var val1 = find(value);
        if (val1) {
            if (val1.ParentID == 0) {
                values.push(val1);
            } else {
                var val2 = find(val1.ParentID);
                if (val2.ParentID == 0) {
                    values.push(val2, val1);
                }
            }
        }
        var parentID = 0;
        for (var i = 0; i < _this.length; i++) {
            createOption(selects[i], filter(parentID));
            if (values[i]) {
                selects[i].value = values[i].CityID;
                parentID = values[i].CityID;
            }
            selects[i].addEventListener("change", change, false);
        }
        if (values.length == 0) {
            selects[1].innerHTML = "<option value='-1'>请选择</option>";
        }

    };
    createHtml();
    getData();
    return {
        GetValue: function () {
            var val = null;
            for (var i = selects.length - 1; i >= 0 ; i--) {
                if (selects[i].value && selects[i].value != "-1") {
                    val = selects[i].value;
                    break;
                }
            }
            return { CityID: val };
        }
    };
};




/*
 * 权限模块 authority  
 *                    
 *                     调用用例：
 *                                                         
 *                     var obj = new shengyan.Authority(dataTest, "div")
 *                     
 *                     obj.SetValue(["003001001"]);
 *
 *                   
 *                     obj.GetValue();
 * 
 */
(function (ce) {

    function authority(data, id) {

        this.id = id;
        if (!(data && data.length > 0)) {
            return;
        }
        var nbsps = "&nbsp;&nbsp;&nbsp;&nbsp;", dataType = [], dataTypes = {};
        function getNbsps(lg) {
            lg = lg / 3;
            if (lg <= 2) {
                return "";
            }
            return nbsps.Repeat(lg - 2);
        };
        function sort(arr) {
            return arr.sort(function (a, b) {
                return b.Sequence - a.Sequence;
            });
        }

        for (var i = 0; i < data.length; i++) {
            if (data[i].ModuleId.length === 3) {
                dataType.push(data[i]);
            }
        }

        dataType = sort(dataType);
        for (var i = 0; i < data.length; i++) {
            var type = data[i].ModuleId;
            if (type.length > 3) {
                var moduleId = type.substr(0, 3);
                if (dataTypes[moduleId]) {
                    dataTypes[moduleId].push(data[i]);
                } else {
                    dataTypes[moduleId] = [data[i]];
                }
            }
        };

        function chlidStairData(data, moduleId) {
            var arr = [];
            for (var i = 0; i < data.length; i++) {
                if (data[i] && data[i].ModuleId.length == moduleId.length + 3 && data[i].ModuleId.substr(0, moduleId.length) === moduleId) {
                    arr.push(data[i]);
                }

            }
            return sort(arr);
        };

        function brotherData(data, moduleId) {
            var arr = [];
            if (moduleId.length === 3) {
                return arr;
            }
            for (var i = 0; i < data.length; i++) {
                if (data[i] && data[i].ModuleId.length == moduleId.length && data[i].ModuleId.substr(0, moduleId.length - 3) === moduleId.substr(0, moduleId.length - 3)) {
                    arr.push(data[i]);
                }

            }
            return sort(arr);
        };

        function parentData(data, moduleId) {
            return brotherData(data, moduleId.substr(0, moduleId.length - 3));
        };

        function delterow(moduleId) {
            var d = dataTypes[moduleId.substr(0, 3)];
            for (var i = 0; i < d.length; i++) {
                if (d[i].ModuleId === moduleId) {
                    d.splice(i, 1);
                    i--;
                    break;
                }
            }
            dataTypes[moduleId] = d;
        }
        function getTypeHtml(data, moduleId) {
            var temp = null, html = [];
            while (temp !== moduleId) {
                //子节点
                var obj = chlidStairData(data, temp || moduleId)[0];
                //兄弟节点
                if (!obj) {
                    obj = brotherData(data, temp || moduleId)[0];
                }
                //父兄节点
                if (!obj) {
                    obj = parentData(data, temp || moduleId)[0];
                    if (!obj) {

                        temp = temp.substr(0, temp.length - 3);
                    }
                }

                if (obj) {

                    //删除
                    temp = obj.ModuleId;
                    delterow(temp);
                    html.push(shengyan.Format("<td class='tl' #{5}>#{0}\
                                                             <label><input type='checkbox' value='#{1}' name='UserModuleIds' #{3} #{4}/>#{2}</label>\
                                              </td>", getNbsps(obj.ModuleId.length), obj.ModuleId, obj.Name, (obj.Checked ? "checked='checked'" : ""),
                   (obj.Disabled ? "disabled='disabled'" : ""), (obj.ModuleId.length === 6 ? " style='background: #f5f5f5;'" : "")));
                }

            }
            return html;

        }

        function toHtml() {
            var html = " <table width='0' border='0' cellspacing='0' cellpadding='0' class='scripturesStyle table_3'><tbody>";
            html += "<tr>";
            for (var i = 0; i < dataType.length; i++) {
                html += "<th>" + dataType[i].Name + "</th>";
            }
            html += "</tr>";
            var htmltemp = [];
            for (var o in dataTypes) {
                if (typeof dataTypes[o] !== "function") {
                    htmltemp.push(getTypeHtml(dataTypes[o], o));
                }

            }
            var lengtarr = [];
            for (var o in htmltemp) {
                lengtarr.push(htmltemp[o].length);
            }
            var maxLeng = lengtarr.Max();
            for (var j = 0; j < maxLeng; j++) {
                html += "<tr>";
                for (var k = 0; k < htmltemp.length; k++) {
                    html += htmltemp[k][j] || "<td></td>";
                }
                html += "</tr>";
            }
            html += " </tbody></table>";
            document.getElementById(id).innerHTML = html;
        }


        toHtml();


    }
    /*
     *设置权限的值
     *method SetValue
     *@for authority
     *@params {Array} arrid  权限ID的数组
     */
    authority.prototype.SetValue = function (arrId) {
        var checkboxs = document.getElementById(this.id).querySelectorAll("input[type='checkbox']"), length = checkboxs.length;
        for (var j = 0; j < arrId.length; j++) {
            for (var i = 0; i < length; i++) {
                if (arrId[j] === checkboxs[i].value) {
                    checkboxs[i].checked = true;
                }
            }
        }
    };
    /*
     *设置权限的值
     *method GetValue
     *@for authority
     *@params {Array} arrid  权限ID的数组
     *@return {Array} 勾选权限(ID)数组集合
     */
    authority.prototype.GetValue = function () {
        var checkboxs = document.getElementById(this.id).querySelectorAll("input[type='checkbox']"), length = checkboxs.length;
        var arr = [];
        for (var i = 0; i < length; i++) {
            if (checkboxs[i].checked) {
                arr.push(checkboxs[i].value);
            }
        }
        return arr;
    };
    ce.Authority = authority;

}(ce));



/// <reference path="base.js" />

/*
 * 验证对象 主要用于表单
 */
var Verification = (function () {
    /*
     数字控件，绑定后只能输入数字
     @method  BindnumberInput
     @params {HTMLInputElement} dom 文本框
     @params {Number}  max 最大值（大于0）
     @params {Boolean} isZero false 不予许为0  true 可以为零 默认false
     @params {Boolean} isonpaste true 允许复制  false 不予许复制 默认 false
    */
    function BindnumberInput(dom, max, isZero, isonpaste) {
        dom.onkeyup = function () {
            this.value = this.value.replace(/\D/g, '');
        };
        dom.onkeydown = (function (max, isZero, isonpaste) {
            return function () {
                var keyCode = event.keyCode || event.charCode;
                if ((keyCode >= 48 && keyCode <= 57) || keyCode === 8 || (keyCode >= 96 && keyCode <= 105)) {
                    if (keyCode >= 48) {
                        var num = 0;
                        if (keyCode <= 57) {
                            num = keyCode - 48;
                        } else if (keyCode <= 105) {
                            num = keyCode - 96;
                        }
                        if (!isZero) {
                            if (this.value === "0") {
                                this.value = "";
                            }
                        }

                        var nextValue = parseInt(this.value.toString() + num);
                        if (max && nextValue > max) {
                            return false;
                        }
                    }
                } else {
                    if (isonpaste && ((keyCode === 86 && event.ctrlKey) || keyCode === 17 || keyCode === 67)) { //粘贴
                        return true;
                    } else {
                        if (!(keyCode === 13)) {
                            return false;
                        }
                    }
                }
                return true;
            };
        })(max, isZero, isonpaste);
        if (!isonpaste) {
            dom.setAttribute("onpaste", "return false");
        }
    }

    /*
     双浮点控件
     @method BindnumberInput2
     @params {HTMLInputElement} dom 文本框
     @params {Number} max 最大长度
    */
    function BindnumberInput2(dom, max) {
        dom.onkeydown = function () {
            var keyCode = event.keyCode || event.charCode;
            if ((keyCode >= 48 && keyCode <= 57) || keyCode === 8 || keyCode === 110 || keyCode === 190 || (keyCode >= 96 && keyCode <= 105)) {
                if (this.value === "." || this.value === "0.00") {
                    this.value = "";
                }
                if (keyCode === 110 || keyCode === 190) {

                    if (this.value.Trim().length === 0) {
                        return false;
                    }
                    if (this.value.indexOf(".") > 0) {
                        return false;
                    }

                } else {
                    if (this.value === "0") {
                        this.value = "";
                    } else {
                        if ((keyCode >= 48 && keyCode <= 57) || (keyCode >= 96 && keyCode <= 105)) {
                            var num = 0;
                            if (keyCode <= 57) {
                                num = keyCode - 48;
                            } else if (keyCode <= 105) {
                                num = keyCode - 96;
                            }
                            var nextValue = parseInt(this.value.toString() + num);
                            if (max && nextValue > max) {
                                return false;
                            }
                            var str = this.value.toString() + num, index = str.indexOf(".");
                            if (index > 0 && str.length > index + 1 && str.substring(index + 1).length > 2) {
                                return false;
                            }
                        }

                    }
                }
            } else {
                if (!(keyCode === 13)) {
                    return false;
                }

            }
            return true;
        };
        dom.onkeyup = function () {
            this.value = this.value.replace(/[^\d.]/g, '');
        };
        dom.setAttribute("onpaste", "return false");
        if (max) {
            dom.setAttribute("maxlength", max);
        }


        dom.addEventListener("blur", function () {
            if (this.value === "" || this.value === "." || this.value === "0") {
                this.value = "0.00";
            }
        }, false);

    }

    /* 
     验证手机号  规则:开头为1的12位数字
     @method CheckPhone
     @params {String} text 手机号
     @return {Boolean} true 验证通过 false不通过
    */
    function CheckPhone(text) {
        text = text.Trim();
        if (text.length !== 11) {
            return false;
        }
        if (isNaN(text)) {
            return false;
        }
        if (text.substring(0, 1) !== "1") {
            return false;
        }
        return true;
    }

    /* 
    验证电话  规则:正则验证
    @method CheckPhone
    @params {String} text 电话号码
    @return {Boolean} true 验证通过 false不通过
   */
    function CheckTel(text) {
        var tel = /\d{7,12}$/;
        return tel.test(text.Trim());
    }
    /// <summary>验证手机号或电话号</summary>

    /*
       验证手机号或电话号码
     @method CheckTelAndPhone
     @params {String} text 验证字符
     @return {Boolean} true 验证通过 false 验证不通过
    */
    function CheckTelAndPhone(text) {
        return CheckPhone(text) || CheckTel(text);
    }

    /*
     验证基类
     @class Valid
     @constructor 
     @params {String} name 验证类型名称
     @params {String} text 验证内容
     @params {Boolean} noNull [可选] 是否非空验证
     @params {Number} MaxLen  [可选] 验证最大长度 
    */
    function Valid(name, text, noNull, maxLength) {
        this.name = name ? name.Trim() : "";
        this.text = text ? text.Trim() : "";
        this.noNull = noNull || null;
        this.maxLength = maxLength || null;
    }

    /*
      获得验证对象字节长度
      @method 获得字节长度  
      @for Valid
      @return {Number} 验证内容长度 
    */
    Valid.prototype.GetLenth = function () {
        return this.text.replace(/[^\x00-\xff]/g, '**').length;
    };

    /*
      验证对象非法字符，非空 ，字符长度
      @method 验证
      @for Valid
      @return {Number} 返回提示信息
     */
    Valid.prototype.NoSafetyText = function () {
        if (this.text !== this.text.StripTags().StripScripts()) {
            return this.name + "有非法字符！";
        }
        var len = this.GetLenth();
        if (this.noNull && len === 0) {
            return this.name + "不能为空！";
        }
        if (this.maxLength && len > this.maxLength) {
            return this.name + "长度不能大于" + this.maxLength + "个字符！";
        }
        return null;
    };
    /*
      待子类重写
      @method  Course
      @for Valid
      @return {String} 子类自定义验证
    */
    Valid.prototype.Course = function () { };
    /*
     将验证结果输出
     @method Execute
     @for Valid
     @return {String} 提示信息
    */
    Valid.prototype.Execute = function () {
        return this.NoSafetyText() || this.Course();
    };


    return {
        BindnumberInput: BindnumberInput,
        /*
          人数控件 规则（范围 0~9999）
          @params {String} id
        */
        InputPeople: function (id) {
            BindnumberInput(document.getElementById(id), 9999);
        },

        /*
          电话控件 规则 （最大12位数字）
          @params {String} id
        */
        InputTelephone: function (id) {
            var dom = document.getElementById(id);
            dom.setAttribute("maxlength", "12");
            BindnumberInput(dom, undefined, true, true);

        },

        /*
        *[方法重载] 电话控件 规则（最大12位数字）
        *@params {HTMLInputElement} dom 文本框对象
        */
        InputTelephone2: function (dom) {
            dom.setAttribute("maxlength", "12");
            BindnumberInput(dom, undefined, true, true);
        },
        /*
        * 表单电话验证  
        * @params {String} text 验证字符
        * @return {String or NULL}  验证信息提示
        */
        ValidTelephone: function (text) {
            var valid = new Valid("电话", text, true);
            valid.Course = function () {
                if (!CheckTelAndPhone(valid.text)) {
                    return "电话格式不正确！";
                }
            };
            return valid.Execute();
        },

        /*
        * 验证姓名 规则（非空 最大20个长度）
        * @params {String} text 验证字符
        * @return {String or NULL}  验证信息提示
        */
        ValidCustomerName: function (text) {
            var valid = new Valid("姓名", text, true, 20);
            return valid.Execute();
        },
        /*
         * 验证渠道名称 规则（非空 最大20个长度）
         * @params {String} text 验证字符
         * @return {String or NULL}  验证信息提示
         */
        ValidChannelName: function () {
            var valid = new Valid("渠道名称", text, true, 20);
            return valid.Execute();
        },
        /*
        * 验证单位 规则（可空 最大40个长度）
        * @params {String} text 验证字符
        * @return {String or NULL}  验证信息提示
        */
        ValidCustomerUnit: function (text) {
            var valid = new Valid("单位", text, false, 40);
            return valid.Execute();
        },
        /*
        * 定金控件 规则（大于0 小于等于999999）
        * @params {String} id
        */
        InputDeposit: function (id) {
            BindnumberInput(document.getElementById(id), 999999);
        },

        /*
        * 表单备注验证 规则（可空 最大50个长度 ）
        * @params {String} text 文本值
        * @return {String or NULL}  验证信息提示
        */
        ValidRequirement: function (text) {
            var valid = new Valid("备注", text, false, 50);
            return valid.Execute();
        },

        /*
        * 表单排序控件 （范围0~999999）     
        */
        InputSequence: function (dom) {
            BindnumberInput(dom, 999999);
        },

        /*
        * 表单密码验证 规则（长度6-20个字符  支持数字、大小写字母和标点符号、不允许有空格）
        * @params {String} str 文本值
        * @return {String or NULL}  验证信息提示
        */
        ValidPassWord: function (str) {
            if (!str) { return "密码不能为空！（长度6-20个字符  支持数字、大小写字母）"; }
            if (str.length < 6) {
                return "密码长度不够！（长度6-20个字符  支持数字、大小写字母）";
            }
            var pattern = /[0-9|A-Z|a-z]{6,20}/;

            if (!pattern.test(str)) {
                return "密码不能有特殊符号！（长度6-20个字符  支持数字、大小写字母）";
            }
            if (str.length > 20) {
                return "密码长度太长！（长度6-20个字符  支持数字、大小写字母）";
            }
            return null;
        },

        /*
        * 表单方案内容验证 规则（非空，最大118个字）
        * @params {String} str 文本值
        * @return {String or NULL}  验证信息提示
        */
        ValidMarketingContent: function (text) {
            var length = (text || "").length;
            if (length == 0) {
                return "短信内容不能为空！";
            }
            if (length > 118) {
                return "短信内容不能超过118个字！";
            }
            return null;
        },

        /*
        * 最近有订单控件 规则（范围0~999）
        * @params {String} id 
        */
        InputRecOrderDays: function (id) {
            BindnumberInput(document.getElementById(id), 999);
        },

        /*
        * 总订单量控件 规则（范围0~999）
        * @params {String} id 
        */
        InputTotalOrders: function (id) {
            BindnumberInput(document.getElementById(id), 999);
        },

        /*
        * 消费金额控件 双浮点
        * @params {String} id 
        */
        InputSpend: function (id) {
            BindnumberInput2(document.getElementById(id));
        },
        /*
        * [方法重载] 消费金额控件 双浮点
        * @params {HTMLInputElement} dom 
        */
        InputSpend2: function (dom) {
            BindnumberInput2(dom);
        },
        /*
        * 表单消费金额验证 规则（小于等于6位浮点数）
        * @params {String} text 文本值
        * @return {String or NULL}  验证信息提示
        */
        ValidSpend: function (text) {
            var valid = new Valid("消费金额", text);
            valid.Course = function () {
                if (isNaN(valid.text)) {
                    return valid.name + "格式不正确！";
                }
                if (parseInt(valid.text) > 999999) {
                    return valid.name + "不能大于6位数！";
                }
                return null;
            };
            return valid.Execute();
        },
        /*
        * 表单消费金额提成比例 规则（不能大于100%）
        * @params {String} text 文本值
        * @return {String or NULL}  验证信息提示
        */
        ValideProportion: function (text) {
            var valid = new Valid("消费金额提成比例", text);
            valid.Course = function () {
                if (isNaN(valid.text)) {
                    return valid.name + "格式不正确！";
                }
                if (parseFloat(valid.text) > 100) {
                    return valid.name + "不能大于100%！";
                }
                return null;
            };
            return valid.Execute();
        },
        /*
        * 表单用户名验证 规则（格式 A-Z a-z _ 0-9  4-20位）
        * @params {String} text 文本值
        * @return {String or NULL}  验证信息提示
        */
        ValidUserName: function (text) {
            if (text.Trim().length === 0) {
                return "用户名不能为空！";
            }
            var re = /^[a-zA-z0-9]\w{3,19}$/;
            if (!re.test(text)) {
                return "用户名格式不正确！(格式 A-Z a-z _ 0-9  4-20位)";
            }
            return null;
        },
        /*
        * 图片验证码验证 规则（非空，五位正整数）
        * @params {String} text 文本值
        * @return {String or NULL}  验证信息提示
        */
        ValidImageCode: function (text) {
            var valid = new Valid("验证码", text, true);
            valid.Course = function () {
                if (this.GetLenth() !== 5) {
                    return valid.name + "格式不正确（五位）！";
                }
                return null;
            };
            return valid.Execute();

        },
        /*
        * 手机验证码控件 规则（0~9999）
        * @params {String} id 
        */
        InputPhoneCode: function (id) {
            BindnumberInput(document.getElementById(id), 9999, true);
        },
        /*
        * 手机验证码 规则（非空，四位正整数）
        * @params {String} text 文本值
        * @return {String or NULL}  验证信息提示
        */
        ValidPhoneCode: function (text) {
            var valid = new Valid("手机验证码", text, true);
            valid.Course = function () {
                if (this.GetLenth() !== 4) {
                    return valid.name + "格式不正确！(4为数字)";
                }
                return null;
            };
            return valid.Execute();
        },

        /*
        * 职位验证 规则（可空，最大20个长度）
        * @params {String} text 文本值
        * @return {String or NULL}  验证信息提示
        */
        ValidPosition: function (text) {
            var valid = new Valid("职位", text, false, 20);
            return valid.Execute();
        },

        /*
        * 餐厅区域验证 规则（非空，最大20个长度）
        * @params {String} text 文本值
        * @return {String or NULL}  验证信息提示
        */
        ValidAreaName: function (text) {
            var valid = new Valid("餐厅区域", text, true, 20);
            return valid.Execute();
        },

        /*
        * 桌位名称验证 规则（非空，最大20个长度）
        * @params {String} text 文本值
        * @return {String or NULL}  验证信息提示
        */
        ValidDeskName: function (text) {
            var valid = new Valid("桌位名称", text, true, 20);
            return valid.Execute();
        },

        /*
        * 可坐人数上下线验证 规则（非空，上线人数不能小于下线人数）
        * @params {String} str1  上线人数
        * @params {String} str2  下线人数
        * @return {String or NULL}  验证信息提示
        */
        ValidPeopleMaxOrMin: function (str1, str2) {
            if (shengyan.Type(str1) === "Undefined" || str1 === "") {
                return "请输入上线人数！";
            } else if (shengyan.Type(str2) === "Undefined" || str2 === "") {
                return "请输入下线人数！";
            }
            if (parseInt(str2) < parseInt(str1)) {
                return "上线人数不能小于下线人数！";
            }
            return null;
        },

        /*
        * 餐厅说明验证 （可空，长度小于等于50）
        * @params {String} text  文本值
        */
        ValidDeskRemark: function (text) {
            var valid = new Valid("餐厅说明", text, false, 50);
            return valid.Execute();
        },

        /*
        * 桌位费用控件 （范围 0~9999）
        * @params {String} id  文本值
        */
        InputDeskBalance: function (id) {
            BindnumberInput(document.getElementById(id), 9999);
        },

        /*
        * 餐厅面积控件 （范围 0~9999）
        * @params {String} id  文本值
        */
        InputDiningRoomArea: function (id) {
            BindnumberInput(document.getElementById(id), 9999);
        },

        /*
        * 人均消费最低值控件 （范围 0~9999）
        * @params {String} id  文本值
        */
        InputAverageSpendBegin: function (id) {
            BindnumberInput(document.getElementById(id), 9999);
        },
        /*
        * 人均消费最大值控件 （范围 0~9999）
        * @params {String} id  文本值
        */
        InputAverageSpendEnd: function (id) {
            BindnumberInput(document.getElementById(id), 9999);
        },

        /*
        * 交通指引验证 规则（可空，最大120个长度）
        * @params {String} text 文本值
        * @return {String or NULL}  验证信息提示
        */
        ValidTheBus: function (text) {
            var length = (text || "").length;
            if (length === 0) {
                return "交通指引内容不能为空！";
            } else if (length > 120) {
                return "交通指引内容不能超过120个字！";
            }
            return null;
        },

        /*
        * 公众号名称验证 规则（非空，最大120个长度）
        * @params {String} text 文本值
        * @return {String or NULL}  验证信息提示
        */
        ValidDeskMpName: function (text) {
            var valid = new Valid("公共号名称", text, true, 20);
            return valid.Execute();
        },

        /*
        * 公众号原始id验证 规则（非空，最大20个长度）
        * @params {String} text 文本值
        * @return {String or NULL}  验证信息提示
        */
        ValidDeskMpId: function (text) {
            var valid = new Valid("公众号原始id", text, true, 20);
            return valid.Execute();
        },

        /*
        * 微信号验证 规则（非空，最大20个长度）
        * @params {String} text 文本值
        * @return {String or NULL}  验证信息提示
        */
        ValidDeskWeiXinId: function (text) {
            var valid = new Valid("微信号", text, true, 20);
            return valid.Execute();
        },

        /*
        * AppID验证 规则（非空，最大50个长度）
        * @params {String} text 文本值
        * @return {String or NULL}  验证信息提示
        */
        ValidDeskAppId: function (text) {
            var valid = new Valid("AppID", text, true, 50);
            return valid.Execute();
        },

        /*
        * AppSecret验证 规则（非空，最大50个长度）
        * @params {String} text 文本值
        * @return {String or NULL}  验证信息提示
        */
        ValidDeskAppSecret: function (text) {
            var valid = new Valid("AppSecret", text, true, 50);
            return valid.Execute();
        },

        /*
        * 文本自动回复验证 规则（非空，最大2000个长度）
        * @params {String} text 文本值
        * @return {String or NULL}  验证信息提示
        */
        ValidDeskMaterialContent: function (text) {
            var valid = new Valid("文本自动回复", text, true, 2000);
            return valid.Execute();
        },

        /*
        * 标题验证 规则（非空，最大100个长度）
        * @params {String} text 文本值
        * @return {String or NULL}  验证信息提示
        */
        ValidDeskMaterialTitle: function (text) {
            var valid = new Valid("标题", text, true, 100);
            return valid.Execute();
        },

        /*
        * 内容简介验证 规则（可空，最大1000个长度）
        * @params {String} text 文本值
        * @return {String or NULL}  验证信息提示
        */
        ValidDeskMaterialIntroduction: function (text) {
            var valid = new Valid("内容简介", text, false, 1000);
            return valid.Execute();
        },

        /*
        * 全文详情验证 规则（可空，最大2000个长度）
        * @params {String} text 文本值
        * @return {String or NULL}  验证信息提示
        */
        ValidDeskMaterialDetail: function (text) {
            var valid = new Valid("全文详情", text);
            if (valid.GetLenth() > 5000) {
                return "全文详情长度不能大于5000个字符！";
            }
            return null;
        },
        /*
        * 姓名或手机验证 规则（可空，最大20个长度）
        * @params {String} text 文本值
        * @return {String or NULL}  验证信息提示
        */
        ValidNameOrPhone: function (text) {
            var valid = new Valid("姓名或手机", text, false, 20);
            return valid.Execute();
        },

        /*
        * 现住址验证 规则（可空，最大50个长度）
        * @params {String} text 文本值
        * @return {String or NULL}  验证信息提示
        */
        ValidAddress: function (text) {
            var valid = new Valid("现住址", text, false, 50);
            return valid.Execute();
        },

        /*
        * 喜好验证 规则（非空，最大20个长度）
        * @params {String} text 文本值
        * @return {String or NULL}  验证信息提示
        */
        ValidLike: function (text) {
            var valid = new Valid("喜好", text, true, 20);
            return valid.Execute();
        },
        /*
        * 忌口验证 规则（非空，最大20个长度）
        * @params {String} text 文本值
        * @return {String or NULL}  验证信息提示
        */
        ValidIntolerance: function (text) {
            var valid = new Valid("忌口", text, true, 20);
            return valid.Execute();
        },

        /*
        * 不良记录验证 规则（可空，最大100个长度）
        * @params {String} text 文本值
        * @return {String or NULL}  验证信息提示
        */
        ValidBadRecord: function (text) {
            var valid = new Valid("不良记录", text, false, 100);
            return valid.Execute();
        },

        /*
        * 短信验证 规则（非空，最大160个字）
        * @params {String} text 文本值
        * @return {String or NULL}  验证信息提示
        */
        ValidSmsContent: function (text) {
            var length = (text || "").length;
            if (length === 0) {
                return "短信内容不能为空！";
            } else if (length > 120) {
                return "短信内容不能超过120个字！";
            }
            return null;
        },

        /*
        * 备忘录验证 规则（可空，最大50个长度）
        * @params {String} text 文本值
        * @return {String or NULL}  验证信息提示
        */
        ValidMemoContent: function (text) {
            var valid = new Valid("备忘录", text, false, 50);
            return valid.Execute();
        },

        /*
        * 活跃会员天数控件 规则（范围 0~365）
        * @params {String} id 
        */
        InputActiveDays: function (id) {
            BindnumberInput(document.getElementById(id), 365);
        },

        /*
        * 活跃会员天数验证 规则（非空，活跃会员天数必须大于等于31天）
        * @params {String} val 文本值
        * @return {String or NULL}  验证信息提示
        */
        ValidActiveDays: function (val) {
            if (val.Trim().length === 0) {
                return "活跃会员天数不能为空！";
            }
            if (parseInt(val) < 31) { return "活跃会员天数必须大于等于31天！"; }
            return null;
        },

        /*
        * 沉睡会员结束天数控件 规则（数字）
        * @params {String} id 
        */
        InputSleepDays: function (id) {
            BindnumberInput(document.getElementById(id));
        },

        /*
        * 沉睡会员结束天数数验证 规则（非空，沉睡会员结束天数必须小于等于活跃会员天数*2且大于0）
        * @params {String} val1 活跃会员天数
        * @params {String} val2 沉睡会员结束天数
        * @return {String or NULL}  验证信息提示
        */
        ValidSleepDays: function (val1, val2) {
            if (val2.Trim().length === 0) {
                return "沉睡会员天数不能为空！";
            }
            if (parseInt(val2) === 0 || parseInt(val2) > parseInt(val1) * 2) {
                return "沉睡会员结束天数必须小于等于活跃会员天数*2且大于0";
            }
            return null;
        },

        /*
        * 分类名称验证 规则（非空，最大20个长度）
        * @params {String} text 文本值
        * @return {String or NULL}  验证信息提示
        */
        ValidClassificationName: function (text) {
            var valid = new Valid("分类名称", text, true, 20);
            return valid.Execute();
        },
        /*
        * 充值金额控件 规则（范围 0~99999）
        * @params {String} id 
        */
        InputAccountAmount: function (id) {
            BindnumberInput(document.getElementById(id), 99999);
        },
        /*
        * 充值金额验证 规则（范围 100~99999）
        * @params {String} val 文本值
        * @return {String or NULL}  验证信息提示
        */
        ValidAccountAmount: function (val) {
            if ((val || "").Trim().length === 0) {
                return "请输入金额！";
            }
            if (parseInt(val) < 200 || parseInt(val) > 99999) {
                return "充值金额不能低于200元！";
            }
            return null;
        },
        /*
        * 手机号码控件 
        * @params {String} id 
        */
        InputPhone: function (id) {
            var dom = document.getElementById(id);
            dom.setAttribute("maxlength", "11");
            BindnumberInput(dom, undefined, true, true);
        },
        /*
        * 手机号码验证 规则（11位以1开头的数字）
        * @params {String} text 文本值
        * @return {String or NULL}  验证信息提示
        */
        ValidPhone: function (text) {
            text = (text || "").Trim();
            if (text === "") {
                return "请输入手机号！";
            }
            if (!CheckPhone(text)) {
                return "手机格式不正确！";
            }
            return null;
        },
        /*
        * 二维码名称验证 规则（只能输入 汉字 字母 数字 30个字符）
        * @params {String} text 文本值
        * @return {String or NULL}  验证信息提示
        */
        ValidQrCode: function (text) {
            var valid = new Valid("二维码名称", text, true, 30);
            valid.Course = function () {
                var reg = new RegExp("^[A-Za-z0-9\u4e00-\u9fa5]+$");
                if (!reg.test(text)) {
                    return "二维码名称格式错误！（只能输入 汉字 字母 数字）";
                }
            };
            return valid.Execute();

        },
        /*
         *微信菜单名称验证 规则(非空 最大8个字符)
         *@params {String} text 文本值
         *@return {String or NULL}  验证信息提示
         */
        ValidStairMenu: function (text) {
            var valid = new Valid("一级菜单名称", text, true, 8);
            return valid.Execute();
        },
        /*
        *微信二级菜单名称验证 规则(非空 最大14个字符)
        *@params {String} text 文本值
        *@return {String or NULL}  验证信息提示
        */
        ValidSecondMenu: function (text) {
            var valid = new Valid("二级菜单名称", text, true, 14);
            return valid.Execute();
        },
        /*
         *链接字符验证 规则(非空 )
         *@params {String} text 文本值
         *@return {String or NULL}  验证信息提示
         */
        ValidLink: function (text) {
            var valid = new Valid("链接", text, true);
            valid.Course = function () {
                var strRegex = new RegExp("^((https|http|ftp|rtsp|mms)://)?[a-z0-9A-Z]{3}\.[a-z0-9A-Z][a-z0-9A-Z]{0,61}?[a-z0-9A-Z]\.com|net|cn|cc (:s[0-9]{1-4})?/$");

                if (!strRegex.test(text)) {
                    return "链接格式不正确！";
                }
            };
            return valid.Execute();
        },
        /*
        *提交表单，提供动态效果 以及页面状态保存
        *@params {JqueryDom} 触发按钮对象
        *@params {JqueryDom} 提交表单对象
        */
        SumbitForm: function ($btn, $Form) {
            window.location.href = window.location.href.split("#form", "") + "#form";
            $btn.removeClass();
            $btn.find(".save").eq(0).text("正在处理...");
            $btn.attr("class", "btn_2 btn_unclick");
            $btn.removeAttr("onclick");
            //提交表单
            $Form.get(0).submit();
        },
        /*
         * 验证初始化，用于控件初始化绑定
         *
         */
        Init: function () {
            //金额控件 number
            var numberInputs = document.querySelectorAll("input[data-shengyan='number']");
            for (var k = 0; k < numberInputs.length; k++) {
                BindnumberInput2(numberInputs[k], 1000000);
            }

            //数字控件  integer
            var integerInputs = document.querySelectorAll("input[data-shengyan='integer']");
            for (var d = 0; d < integerInputs.length; d++) {
                Verification.BindnumberInput(integerInputs[d], 1000000);
            }

            //手机控件  phone
            var phoneInputs = document.querySelectorAll("input[data-shengyan='phone']");
            for (var a = 0; a < phoneInputs.length; a++) {
                Verification.InputTelephone2(phoneInputs[a]);
            }
        }
    };
})();
/// <reference path="change-valid.js" />
/// <reference path="change.js" />
/// <reference path="ReturnCode.js" />

/*
 *手机号，电话组件 ，支持增删该 
 * 
 */
(function (ce) {

    function UIPone(params) {

        var containerID = params.containerID,
            phoneArray = params.phoneArray,
            isAdd = true,
            isDele = true,
            isEditor = true,
            getUrl = params.getUrl,
            deleteUrl = params.deleteUrl,
            addUrl = params.addUrl,
            updateUrl = params.updateUrl,
            data = params.data || {},
            EditorStatus = false,
            isOnlay = true,
            container = document.getElementById(containerID),
            _this = this,
            unAdd = params.unAdd,
            unEidtor = params.unEidtor,
            unDel = params.unDel,
            size = params.size || 12,
            existsPhoneUrl = params.existsPhoneUrl;
        var fun = params.fun;
        function control() {
            if (unAdd) {
                $(".shengyan-glyphicon-add").hide();
            }
            if (unEidtor) {
                $(".shengyan-glyphicon-editor").hide();
            }
            if (unDel) {
                $(".shengyan-glyphicon-delete").hide();

            }
        }

        function Count() {
            return container.querySelectorAll("input").length;
        }

        function DeletePhone(e) {
            shengyan.ComfirmInfo("确认要删除吗？", function () {
                var div = e.target.parentNode;
                var phone = div.querySelector("input[name=Phone]");
                data.phoneId = phone.getAttribute("data-id");
                $.ajax({
                    url: deleteUrl,
                    type: 'POST',
                    data: data,
                    dataType: 'json',
                    success: function (data) {
                        if (data.Code === 0) {
                            shengyan.HeaderInfo("删除成功");
                            div.parentNode.removeChild(div);
                            var adds = container.querySelectorAll(".shengyan-glyphicon-add");
                            if (adds.length > 0) {
                                adds[adds.length - 1].style.display = "inline-block";
                            }
                        } else {
                            shengyan.HeaderInfo(getReturnMessage(data.Code));
                        }
                    }
                });
            });
        }
        function AddPhone(e) {
            if (Count() >= 5) {
                shengyan.HeaderInfo("最多只能参加5个电话！");
                return;
            }

            var btn = e.target;

            btn.style.display = "none";
            container.appendChild(GetItem("", false, false, false, true));
        }

        function Focus(e) {
            var phone = e.target;
            phone.classList.remove("shengyan-error");
        }

        function ButtonChange(div, isEdtor) {
            var glyphiconEditor = div.querySelector(".shengyan-glyphicon-editor");
            var glyphiconEelete = div.querySelector(".shengyan-glyphicon-delete");
            var glyphiconAdd = div.querySelector(".shengyan-glyphicon-add");
            var glyphiconOk = div.querySelector(".shengyan-glyphicon-ok");
            var glyphiconCancer = div.querySelector(".shengyan-glyphicon-cancer");
            if (isEdtor) {
                glyphiconEditor.style.display = "none";
                glyphiconEelete.style.display = "none";
                glyphiconAdd.style.display = "none";

                glyphiconOk.style.display = "inline-block";
                glyphiconCancer.style.display = "inline-block";
            } else {
                glyphiconEditor.style.display = "inline-block";

                var phone = div.querySelector("input[name=Phone]"), phones = container.querySelectorAll("input[name=Phone]");

                for (var j = 0; j < phones.length; j++) {
                    if (phone == phones[j]) {
                        if (j !== 0) {
                            glyphiconEelete.style.display = "inline-block";
                        }
                    }
                    if (j === phones.length - 1) {
                        glyphiconAdd.style.display = "inline-block";
                    }
                }

                glyphiconOk.style.display = "none";
                glyphiconCancer.style.display = "none";
            }
            control();
        }

        function Editor(e) {
            var div = e.target.parentNode;
            var phone = div.querySelector("input[name=Phone]");
            phone.classList.remove("shengyan-phone");
            phone.classList.add("shengyan-phone-editor");
            phone.setAttribute("data-oldval", phone.value);
            phone.readOnly = false;
            ButtonChange(div, true);
        }

        function addAction(e) {
            var div = e.target.parentNode;
            var phone = div.querySelector("input[name=Phone]");
            if (!_this.Execute(phone)) {
                return;
            }
            data.phone = phone.value;
            $.ajax({
                url: addUrl,
                type: 'POST',
                data: data,
                dataType: 'json',
                success: function (data) {
                    if (data.Code === 0) {
                        shengyan.HeaderInfo("添加电话成功！", function () {
                            if (fun) {
                                window.location.reload();
                            }
                        });
                        phone.classList.remove("shengyan-phone-editor");
                        phone.classList.add("shengyan-phone");
                        phone.setAttribute("data-oldval", phone.value);
                        phone.setAttribute("data-id", data.Data);
                        phone.readOnly = true;
                        ButtonChange(div, false);

                    } else {
                        if (data.Message) {
                            shengyan.HeaderInfo(data.Message);
                        } else {
                            shengyan.HeaderInfo(getReturnMessage(data.Code));
                        }
                    }
                }
            });
        }

        function UpdateAction(e) {
            var div = e.target.parentNode;
            var phone = div.querySelector("input[name=Phone]");

            if (!_this.Execute(phone)) {
                return;
            }
            data.phoneId = phone.getAttribute("data-id");
            data.phone = phone.value;
            $.ajax({
                url: updateUrl,
                type: 'POST',
                data: data,
                dataType: 'json',
                success: function (data) {
                    if (data.Code === 0) {
                        shengyan.HeaderInfo("修改电话成功！", function () {
                            if (fun) {
                                window.location.reload();
                            }
                        });
                        phone.classList.remove("shengyan-phone-editor");
                        phone.classList.add("shengyan-phone");
                        phone.setAttribute("data-oldval", phone.value);
                        phone.readOnly = true;
                        ButtonChange(div, false);

                    } else {
                        if (data.Message) {
                            shengyan.HeaderInfo(data.Message);
                        } else {
                            shengyan.HeaderInfo(getReturnMessage(data.Code));
                        }


                    }
                }
            });
        }

        function OkPhone(e) {
            var div = e.target.parentNode;
            var phone = div.querySelector("input[name=Phone]");
            if (phone.getAttribute("data-oldval")) {
                UpdateAction(e);
            } else {
                addAction(e);
            }
        }

        function CancerPhone(e) {
            var div = e.target.parentNode;
            var phone = div.querySelector("input[name=Phone]");
            phone.classList.remove("shengyan-phone-editor");
            phone.classList.add("shengyan-phone");
            phone.value = phone.getAttribute("data-oldval");
            if (phone.value.Trim().length == 0) {
                var div1 = $(div).prev()[0];
                div.parentNode.removeChild(div);
                ButtonChange(div1, false);
            } else {
                phone.readOnly = true;
                ButtonChange(div, false);
            }

        }

        function Blur(e) {
            var phone = e.target;

            if (existsPhoneUrl && !phone.readOnly) {
                data.phone = phone.value;
                $.ajax({
                    url: existsPhoneUrl,
                    type: 'get',
                    data: data,
                    dataType: 'json',
                    cache: false,
                    async: false,
                    success: function (data) {
                        if (data && data.length > 0) {
                            shengyan.HeaderInfo("此电话已被" + data + "使用！");
                            phone.focus();
                            isOnlay = false;
                        } else {
                            isOnlay = true;
                        }
                    }
                });
            } else {
                isOnlay = true;
            }
        }

        function GetItem(phone, isAdd, isDele, isEditor, EditorStatus) {
            var div = document.createElement("div");
            div.style.marginBottom = "5px";

            var input = document.createElement("input");
            input.type = "text";
            input.size = size;
            input.name = "Phone";
            input.value = phone.Phone || "";
            input.setAttribute("data-id", phone.Id);
            input.style.marginLeft = "3px";
            input.classList.add(EditorStatus ? "shengyan-phone-editor" : "shengyan-phone");
            input.readOnly = EditorStatus ? false : true;
            Verification.InputTelephone2(input);

            input.addEventListener("focus", Focus, false);
            input.addEventListener("blur", Blur, false);
            div.appendChild(input);

            var editorA = document.createElement("a");
            editorA.href = "javascript:void(0)";
            editorA.classList.add("shengyan-glyphicon");
            editorA.classList.add("shengyan-glyphicon-editor");
            editorA.style.marginLeft = "3px";
            editorA.style.display = isEditor ? "inline-block" : "none";
            editorA.addEventListener("click", Editor, false);
            div.appendChild(editorA);

            var deleA = document.createElement("a");
            deleA.href = "javascript:void(0)";
            deleA.classList.add("shengyan-glyphicon");
            deleA.classList.add("shengyan-glyphicon-delete");
            deleA.style.marginLeft = "3px";
            deleA.style.display = isDele ? "inline-block" : "none";
            deleA.addEventListener("click", DeletePhone, false);
            div.appendChild(deleA);


            var addA = document.createElement("a");
            addA.href = "javascript:void(0)";
            addA.classList.add("shengyan-glyphicon");
            addA.classList.add("shengyan-glyphicon-add");
            addA.style.marginLeft = "3px";
            addA.style.display = isAdd ? "inline-block" : "none";
            addA.addEventListener("click", AddPhone, false);
            div.appendChild(addA);

            var okA = document.createElement("a");
            okA.href = "javascript:void(0)";
            okA.classList.add("shengyan-glyphicon");
            okA.classList.add("shengyan-glyphicon-ok");
            okA.style.marginLeft = "3px";
            okA.style.display = EditorStatus ? "inline-block" : "none";
            okA.addEventListener("click", OkPhone, false);
            div.appendChild(okA);


            var cancerA = document.createElement("a");
            cancerA.href = "javascript:void(0)";
            cancerA.classList.add("shengyan-glyphicon");
            cancerA.classList.add("shengyan-glyphicon-cancer");
            cancerA.style.marginLeft = "3px";
            cancerA.style.display = EditorStatus ? "inline-block" : "none";
            cancerA.addEventListener("click", CancerPhone, false);
            div.appendChild(cancerA);
            if (fun && phone !== "") {
                fun(div, phone.Phone);
            }

            return div;


        }
        function Show(dt) {
            for (var i = 0; i < dt.length; i++) {
                if (i === 0) {
                    container.appendChild(GetItem(dt[i], dt.length === 1, false, isEditor, false));
                } else if (i === dt.length - 1) {
                    container.appendChild(GetItem(dt[i], isAdd, isDele, isEditor, false));
                } else {
                    container.appendChild(GetItem(dt[i], false, isDele, isEditor, false));
                }
            }
        }
        function GetPhone() {
            $.ajax({
                type: 'get',
                url: getUrl,
                data: data,
                cache: false,
                dataType: 'json',
                success: function (data) {
                    Show(data);
                    control();
                }
            });
        }



        if (phoneArray) {
            Show(phoneArray);
        } else {
            GetPhone();
        }
        control();

        _this.Execute = function (phone) {
            var inputs = container.querySelectorAll("input[name='Phone']");
            for (var j = 0; j < inputs.length; j++) {
                var input = inputs[j];
                if (input != phone && phone.value.Trim() !== "" && input.value === phone.value) {
                    shengyan.HeaderInfo("有重复的电话！", function () {
                    });
                    phone.classList.add("shengyan-error");
                    isOnlay = false;
                    return false;
                }
            }

            for (var i = 0; i < inputs.length; i++) {
                var mesa = Verification.ValidTelephone(inputs[i].value);
                if (mesa) {
                    shengyan.AlertInfo(mesa, function () {
                        inputs[i].focus();
                    });
                    return false;
                }
            }

            return true;

        };

    }

    ce.UIPone = UIPone;
}(ce));