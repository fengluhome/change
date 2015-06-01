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