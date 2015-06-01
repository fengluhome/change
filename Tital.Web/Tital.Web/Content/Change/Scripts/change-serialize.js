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