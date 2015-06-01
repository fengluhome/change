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