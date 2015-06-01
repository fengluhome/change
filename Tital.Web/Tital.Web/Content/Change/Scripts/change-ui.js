
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