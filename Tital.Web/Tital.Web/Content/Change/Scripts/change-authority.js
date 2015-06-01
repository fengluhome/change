

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


