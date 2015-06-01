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