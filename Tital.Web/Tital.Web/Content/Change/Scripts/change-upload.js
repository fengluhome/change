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