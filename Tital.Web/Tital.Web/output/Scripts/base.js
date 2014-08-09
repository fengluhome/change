
/*
 *  前端基础库
 */
(function (window) {
    var shengyan = {};
    shengyan.version = "0.01";
    shengyan.mark = "";
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
    shengyan.Format = function (str, object) {
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
            if (shengyan.Type(date) === "Number") {
                date = new Date(date);
            }
            if (shengyan.Type(date) !== "Date") {
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
    shengyan.LoadScript = function (url) {
        var script = document.createElement("script");
        script.type = "text/javascript";
        script.src = url;
        document.body.appendChild(script);
    };
    shengyan.LoadStyle = function (url) {
        var link = document.createElement("link");
        link.rel = "stylesheet";
        link.type = "text/css";
        link.href = url;
        var head = document.getElementsByTagName("head")[0];
        document.body.appendChild(link);
    };
    shengyan.Type = function (obj) { //类型检测
        return obj === null ? "Null" : obj === void 0 ? "Undefined" : Object.prototype.toString.call(obj).slice(8, -1);
    }
    /// <summary>获得URL参数</summary> 
    ///调用方法 var parma=shengyan.getUrlParam();  params["ur"]
    shengyan.GetUrlParam = function () {
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
    shengyan.CookieUtil = {
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
     *系统信息提示弹出层
     *@method AlertInfo 
     *@for shengyan
     *@params {String} content 提示信息内容
     *@parmas {Function} [可选]fun  确认按钮点击后的回调函数
    */
    shengyan.AlertInfo = function (content, fun) {
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
        var str = shengyan.Format("<div class='modalDiv' style='width: 350px; height: 200px;'>\
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
     *@for shengyan
     *@params {String} content 提示信息内容
     *@parmas {Function} [可选]okFun  "确认" 按钮点击后的回调函数 
     *@params {Function} [可选]cancerFun "确认"按钮 点击后的回调函数
    */
    shengyan.ComfirmInfo = function (content, okFun, cancerFun) {
        shengyan.AlertInfo(content, okFun, cancerFun);
    };
    window.shengyan = shengyan;

})(window);

/// <reference path="base.js" />

/*
 * 验证对象
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
                    if (isonpaste && ((keyCode === 86 && event.ctrlKey) || keyCode === 17 || keyCode === 67)) {
                        return true;
                    } else {
                        return false;
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
    */
    function BindnumberInput2(dom) {
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
                    }
                }
            } else {
                return false;
            }
            return true;
        };
        dom.onkeyup = function () {
            this.value = this.value.replace(/[^\d.]/g, '');
        };
        dom.setAttribute("onpaste", "return false");
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
            var valid = new Valid("联系方式", text, true);
            valid.Course = function () {
                if (!CheckTelAndPhone(valid.text)) {
                    return "联系方式格式不正确！";
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
            if (!str) { return "密码不能为空！（长度6-20个字符  支持数字、大小写字母和标点符号  不允许有空格）"; }
            if (str.length < 6) {
                return "密码强度不够！（长度6-20个字符  支持数字、大小写字母和标点符号  不允许有空格）";
            }
            var pattern = /^\S+$/gi;

            if (!pattern.test(str)) {
                return "密码不能有空格！（长度6-20个字符  支持数字、大小写字母和标点符号  不允许有空格）";
            }
            if (str.length > 20) {
                return "密码长度太长！（长度6-20个字符  支持数字、大小写字母和标点符号  不允许有空格）";
            }
            return null;
        },

        /*
        * 表单方案内容验证 规则（非空，最大160个长度）
        * @params {String} str 文本值
        * @return {String or NULL}  验证信息提示
        */
        ValidMarketingContent: function (text) {
            var valid = new Valid("方案内容", text, true, 160);
            return valid.Execute();
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
            var valid = new Valid("交通指引", text, false, 120);
            return valid.Execute();

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
            if (valid.GetLenth() > 2000) {
                return "全文详情长度不能大于2000个字符！";
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
        * 短信验证 规则（可空，最大160个长度）
        * @params {String} text 文本值
        * @return {String or NULL}  验证信息提示
        */
        ValidSmsContent: function (text) {
            var valid = new Valid("短信", text, false, 160);
            return valid.Execute();
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
            if (parseInt(val) < 100 || parseInt(val) > 99999) {
                return "充值金额不能低于100元！";
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
            return CheckPhone(text);
        }
    };
})();