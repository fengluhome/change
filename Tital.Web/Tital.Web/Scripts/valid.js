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