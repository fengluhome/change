
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
    /// <summary>目标函数是否位于原字符串的结束处-参数(it-String-字符串 ignorecase-boolean-是否区别大小写默认不区分大小写)</summary>
    String.prototype.EndsWith = function (it, ignorecase) {
        var end_str = this.substring(this.length - it.length);
        return ignorecase ? end_str.toLowerCase() === it.toLowerCase() : end_str === it;
    };
    /// <summary>将当前字符串重复N次-参数(it-String-字符串 ignorecase-boolean-是否区别大小写默认不区分大小写)</summary>
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
    /// <summary>返回所有字节的长度</summary>
    String.prototype.ByteLen = function () {
        var byteLength = this.length, i = 0;
        for (; i < this.length; i++) {
            if (this.charCodeAt(i) > 255) {
                byteLength++;
            }
        }
        return byteLength;
    };
    /// <summary>对字符串进行截断操作,当超过限定长度，默认添加三个点</summary>
    String.prototype.Truncate = function (length, truncation) {
        length = length || 30;
        truncation = truncation === void (0) ? '...' : truncation;
        return this.length > length ? this.slice(0, length - truncation.length) + truncation : this;
    };
    /// <summary>移除字符串中的html标签 </summary>
    String.prototype.StripTags = function () {
        return this.replace(/<[^>]+>/g, '');
    };
    /// <summary>移除字符串中的script标签包括js </summary>
    String.prototype.StripScripts = function () {
        return this.replace(/<script[^>]*>([\S\s]*?)<\/script>/img, '');
    };
    /// <summary>将字符串进行html转义</summary>
    String.prototype.EscapeHTML = function () {
        return this.replace(/&/g, '&amp;')
            .replace(/</g, '&lt;')
            .replace(/>/g, '&gt;')
            .replace(/"/g, '&quot;')
            .replace(/'/g, '&#39;');
    };
    /// <summary>将字符串中的html实体转换成对应字符</summary>
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
    /// <summary>为字符串某一段添加字符串(n-number字符串长度 filling-String填充的字符串 right-boolean填充方向 radix-number-数字类型)</summary>
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
    /// <summary>格式化字符串</summary>
    ///'reust is #{0}，#{2}'.format(22,33)或者String.format.call("reust is #{0}，#{2}",1,2)
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
    /// <summary>去除空格</summary>
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
    /// <summary>修复 IE6 IE7 IE8</summary>
    Array.prototype.IndexOf = function (item, index) {
        var n = this.length, i = ~~index;
        if (i < 0) {
            i += n;
        }
        for (; i < n; i++) {
            if (this[i] === item) {
                return i;
            }
        }
        return -1;
    };
    /// <summary>判定数组是否包含指定目标</summary>
    Array.prototype.Contains = function (item) {
        return this.indexOf(item) > -1;
    };
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
    /// <summary>取得对象数组的每个元素的指定属性</summary>
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
    /// <summary>根据某个条件进行分组</summary>
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
    /// <summary>根据指定条件排序</summary>
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
    /// <summary>对两个数组取并集</summary>
    Array.prototype.Union = function (array) {
        return this.concat(array).unique();
    };
    /// <summary>对两个数组取交集</summary>
    Array.prototype.Intersect = function (array) {
        return this.filter(function (n) {
            return ~array.indexOf(n);
        });
    };
    /// <summary>对两个数组取差集</summary>
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
    /// <summary>返回数组中的最小值，用于数字数组</summary>
    Array.prototype.Min = function () {
        return Math.min.apply(0, this);
    };
    /// <summary>返回数组中的最大值，用于数字数组</summary>
    Array.prototype.Max = function () {
        return Math.max.apply(0, this);
    };
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
    /// <summary>求出相隔多少天</summary>
    Date.prototype.GetDatePeriod = function (finish) {
        return Math.abs(this * 1 - finish * 1) / 60 / 60 / 1000 / 24;
    };
    /// <summary>求出当前时间所在季度的第一天</summary>
    Date.prototype.GetFirstDateInQuarter = function () {
        return new Date(this.getFullYear(), ~~(this.getMonth() / 3) * 3, 1);
    };
    /// <summary>求出当前时间所在季度的最后一天</summary>
    Date.prototype.GetLastDateInQuarter = function () {
        return new Date(this.getFullYear(), ~~(this.getMonth() / 3) * 3 + 3, 0);
    };
    /// <summary>判断当前日期是否为闰年</summary>
    Date.prototype.IsLeapYear = function () {
        return new Date(this.getFullYear(), 2, 0).getDate() === 29;
    };
    Date.prototype.Date = function () {
        return new Date(this.getFullYear(), this.getMonth(), this.getDate());
    };
    /// <summary>取得当前月份的天数</summary>
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
        var _method = this, args = [].slice.call(arguments, 1);
        return function () {
            _method.apply(content, args.concat.apply(args, arguments));
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
        }

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
        var DATE_FORMATS_SPLIT = /((?:[^yMdHhmsaZE']+)|(?:'(?:[^']|'')*')|(?:E+|y+|M+|d+|H+|h+|m+|s+|a|Z))(.*)/,
            NUMBER_STRING = /^\d+$/;
        var R_ISO8601_STR = /^(\d{4})-?(\d\d)-?(\d\d)(?:T(\d\d)(?::?(\d\d)(?::?(\d\d)(?:\.(\d+))?)?)?(Z|([+-])(\d\d):?(\d\d))?)?$/;

        function jsonStringToDate(string) {
            var match = string.match(R_ISO8601_STR);
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
                if (NUMBER_STRING.test(date)) {
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
                match = DATE_FORMATS_SPLIT.exec(format);
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
    }
    /// <summary>获得URL参数</summary> 
    ///调用方法 var parma=ce.getUrlParam();  params["ur"]
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
    var toQueryString = function (obj) {
        var result = [];
        for (var key in obj) {
            result.push(toQueryPair(key, obj[key]));
        }
        return result.join("&");
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
    /**
     * Ajax
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
            method: (option.method || "GET").toUpperCase(),
            data: option.data || null,
            arguments: option.arguments || null,

            success: option.success || function () { },
            error: option.error || function () { },
            complete: option.complete || function () { },


            isAsync: option.isAsync || true,
            timeout: option.timeout || 30000,
            contentType: option.contentType,
            dataType: option.dataType || "xml",
        };
        if (option.data && typeof option.data === "object") {
            option.data = toQueryString(option.data);
        }


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
    /*
    * 上传组件  目前只适用于上传单张图片
    *@params {String} url 
    *@params {String} Option.targetInput  触发上传元素ID
    *@params {String} option.targetImage  上传文件成功后显示的图片id
    */
    ce.UploadInput = function (url, option) {
        // <input id='pictureFile' accept='image/*' type='file' multiple='multiple' data-target='#pictureBtn' style='display: none' />
        var setion = {
            targetInput: option.targetInput,
            targetImage: option.targetImage
        }
        var input = document.createElement("input");
        input.type = "file";
        input.accept = "image/*";
        input.multiple = 'multiple';
        input.style.display = "none";
        input.onchange = function () {
            ce.upload("/content/upload", {
                data: this.files,
                count: 1,
                size: 2,
                upload: {
                    progress: function () {
                        //进度条
                    }

                },
                success: function (data) {
                    // 显示图片
                    document.getElementById(option.targetImage).src = data;
                }
            });
        }

        document.getElementById(option.targetInput).click = (function (input) { input.click(); }(input));

    };

    /* 
     *异步上传原型
     */
    ce.Upload = function (url, option) {

        option = {
            data: option.data || null,
            success: option.success || function () { },
            error: option.error || function () { },
            isAsync: option.isAsync || true,
            dataType: option.dataType || "xml",
            image: true,  //上传文件类型 默认图片
            count: option.count || 1, //多上传个数进行限制
            size: 2 //默认2M
        };
        if (option.data.lenght > option.count) {
            ce.AlertInfo("对不起只能上传一个" + (opion.image ? "图片" : "文件") + "!");
        }
        if (opion.image) {
            for (var i = 0; i < option.data.length; i++) {
                if (!option.data[i].type.match(/image.*/)) {
                    ce.AlertInfo(" 只能上传图片!");
                    return;
                } else {
                    if (parseFloat(files[i].size) > (1024 * 1024 * option.size)) {
                        ce.AlertInfo("只能上传小于" + option.size + "M的图片!");
                        return;
                    }
                }
            }

        }
        var xhr = new window.XMLHttpRequest();
        xhr.open("POST", url, option.async);

        delete headers["Content-Type"];
        headers["X-Requested-With"] = "XMLHttpRequest";

        for (i in headers) {
            xhr.setRequestHeader(i, headers[i]);
        }
        // xhr.addEventListener("error", callback);

        if (option.progress)
            xhr.addEventListener("progress", option.progress);
        if (option.upload && s.upload.success)
            xhr.upload.addEventListener("load", option.upload.load);
        if (option.upload && s.upload.progress)
            xhr.upload.addEventListener("progress", option.upload.progress);

        xhr.onreadystatechange = function () {
            if (httpRequest.readyState == 4) {
                var o = {};
                o.responseText = xhr.responseText;
                o.responseXML = xhr.responseXML;
                o.data = option.data;
                o.status = xhr.status;
                o.uri = option.url;
                if (option.dataType === 'json') {
                    try {
                        o.responseJSON = JSON.parse(httpRequest.responseText);
                    } catch (e) {
                    }
                }
                if (httpSuccess(httpRequest)) {
                    option.success(o.responseJSON || o.responseXML || o.responseText);
                } else {
                    option.error(o);
                }

                //删除对象,防止内存溢出
                xhr = null;
            }
        };

        xhr.send(s.data);
    }

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
            var shegnyan_modal = document.getElementById("_shegnyan_modal");
            shegnyan_modal.parentNode.removeChild(shegnyan_modal);
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
                                   <h1 class='title_1'><span>系统提示</span></h1>\
                                    <div class='pop' style='min-width: inherit;'>\
                                        <div class='con_box' style='padding-bottom: 1px;'>\
                                            <form>\
                                                <ul>\
                                                    <li class='notice'>#{0}</li>\
                                                </ul>\
                                                <div class='btn_area_c'>\
                                                      <a id='_shengyan_ok' href='javascript:void(0)' style='margin-right: 20px;' class='btn_2'><span>确认</span></a>                                             #{1}\
                                                </div>\
                                            </form>\
                                        </div>\
                                    </div>\
                         </div>", content, (cancerFun ? "<a id='_shengyan_cancer' href='javascript:void(0)' class='btn_1'><span>取消</span></a>" : ""));
        var div = document.createElement("div");
        div.id = "_shegnyan_modal";
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
    window.shengyan = ce;

})(window);
