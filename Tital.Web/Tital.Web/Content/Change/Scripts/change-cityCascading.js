/*
 *现住址选择级联
 *@for shengyan
 *@params {String} id 呈现内容的容器ID
 *@params {integer} cityid  城市ID  设置城市
 *@params {String} address 详细地址
 *@params {String} url 
 */
ce.SelectCurrentCity = function (param) {
    var _this = this;
    var value = param.cityid,
        address = param.address,
        selects = [],
        values = [],
        url = param.url || "/City/GetAllCity",
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
            url: url,
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
 *@params {String} url 
 */
ce.SelectNativeCity = function (param) {
    var _this = this;
    var value = param.cityid,
        selects = [],
        values = [],
        url = param.url || "/City/GetAllCity",
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
            url: url,
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

