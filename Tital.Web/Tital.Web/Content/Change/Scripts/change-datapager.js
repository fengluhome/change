/// <reference path="jquery-1.7.1.js" />
/// <reference path="valid.js" />
/// <reference path="change.js" />

/*  
 *分页对象  依赖库：change.js、jquery
 * 本分页控件提供 AJax和loaction地址 两种分页。 
 * 1.AjaxDatapager  使用方法
 *             
 *         window.pageMutual = new shengyan.AjaxDatapager( "/Material/GetMaterialpage",
 *                                                           null,
 *                                                          "pagediv",
 *                                                          6, 
 *                                                          function (data) {
 *                                                             viewModal.Materials(data.List);
 *                                                          });
 *         pageMutual.Target({ name: "张三" }, 1);
 *                        
 *                        
 * 2.LocationDatapager 使用方法  var locatinPage = new shengyan.LocationDatapager('pageFooterId',20,50);
 *                  
 *  
 */
(function (ce) {
    /*
     *分页基类
     */
    function Datapager() {
        this.url = "", this.pageIndex = 0, this.pageSize = 0, this.totalCount = 0, this.totalpage = 0, this.pageFooterId, this.where = null, this.pagediv = null; //过滤条件
        this.ShowSatus = function () {
            var str = "";
            var start = Math.floor((this.pageIndex - 1) / 10) * 10 + 1;
            for (var i = start; i <= this.totalpage; i++) {
                if (i - start > 9) {
                    break;
                }
                str += "<li " + (this.pageIndex === i ? "class='on'" : "") + "><a   href='javascript:void(0);' data-action='" + i + "'>" + i + "</a></li>";
            }
            return str;
        };

        this.ToHtml = function () {

            var html = shengyan.Format("<div class='scripturesStyle'><div class='page_nav'>\
                               <dl class='jump_menu'>\
                                   <dt><a href='javascript:void(0)'>转到</a></dt>\
                                   <dd class='input_jumpmenu'>\
                                       <input type='text' style='height: 100%;'></dd>\
                                   <dd class='text_page'>页</dd>\
                               </dl>\
                               <ul class='page_file'>\
                                   <li class='pre'>\
                                       <a href='javascript:void(0)' data-action='pre' title='上十页'>上十页</a>\
                                   </li>\
                                  #{4}\
                                   <li class='next'><a href='javascript:void(0)' data-action='next' title='下十页'>&gt;&gt;</a></li>\
                               </ul>\
                               <span class='page_nav_info'>共 #{0} 条记录 页次：#{1}/#{2}页 #{3}条/页</span>\
                       </div></div>", this.totalCount, this.pageIndex, this.totalpage, this.pageSize, this.ShowSatus());

            this.pagediv.innerHTML = html;

        };

        this.BindClick = function () {
            var that = this;
            $(that.pagediv).find(".page_file li a").click(function () {
                var target = $(this).attr("data-action"), index;
                if (target === "pre") {
                    index = (Math.floor(that.pageIndex / 10) - 1) * 10 + 1;
                    if (index > 0) {
                        that.Target(that.where, index);

                    }
                } else if (target === "next") {
                    index = Math.ceil(that.pageIndex / 10) * 10 + 1;
                    if (index < that.totalpage) {

                        that.Target(that.where, index);
                    }
                } else {
                    that.Target(that.where, parseInt(target));
                }
            });
            Verification.BindnumberInput($(that.pagediv).find(".jump_menu input")[0]);

            $(that.pagediv).find(".jump_menu a").click(function () {
                var index = $(that.pagediv).find(".jump_menu input").val();
                if (!isNaN(index)) {
                    that.Target(that.where, parseInt(index));
                }
            });
        };
    };

    /*
     *跳转分页
     *@params {Object}  where过滤条件、 例如 { name: "张三" }
     *@params {Number}  页数
     */
    Datapager.prototype.Target = function (where, index) {
        this.where = where || null;
        if (index == 1) {
            this.pageIndex = index;
            this.GetData();
        } else {
            if (index > 0 && index <= this.totalpage) {
                this.pageIndex = index;
                this.GetData();
            } else {
                shengyan.HeaderInfo("没有该页！", function () {
                    $(pagediv).find(".jump_menu input").val("");
                });

            }
        }
    };
    Datapager.prototype.Bind = function () {
        if (this.totalpage !== 0) {
            this.ToHtml();
            this.BindClick();
        }
    };

    /*
     *location 分页对象
     *@params {String} pageFooterId 分页存放容器ID
     *@params {String} pageSize 分页大小
     *@params {String} totalCount 总条数
     */
    function locationDatapager(pageFooterId, pageSize, totalCount) {
        Datapager.call(this);
        var urlParam = shengyan.GetUrlParam();
        this.totalCount = parseInt(totalCount || 0);
        this.pageSize = parseInt(pageSize || 20);
        this.pageIndex = parseInt(urlParam["pageIndex"] || 1);
        this.totalpage = Math.ceil(this.totalCount / this.pageSize);

        this.pageFooterId = pageFooterId;
        this.pagediv = document.getElementById(this.pageFooterId);
        this.GetData = function () {
            //var href = window.location.href;
            //var index = href.indexOf("?");
            //var url = index > 0 ? href.substring(0, index) : href;
            //urlParam["pageIndex"] = this.pageIndex;
            //url += "?" + shengyan.ToQueryString(urlParam);
            //window.location.href = url;

            shengyan.SetLocationUrl({ "pageIndex": this.pageIndex });
        };
        this.Bind();
    };
    locationDatapager.prototype = new Datapager();

    /*
     *Ajax 分页对象
     *@params {String} url 请求地址
     *@params {String} showDataId  展示数据容器ID
     *@params {String} pageFooterId 分页存放容器ID
     *@params {String} pageSize  分页大小
     *@params {String} callBack  分页回调函数
     */
    function ajaxDatapager(url, showDataId, pageFooterId, pageSize, callBack) {
        //default
        this.pageSize = 8;
        this.url = url;
        this.showDataId = showDataId;
        this.pageFooterId = pageFooterId;
        this.pageSize = pageSize || 8;
        this.callBack = callBack;
        this.pagediv = document.getElementById(this.pageFooterId);
        this.GetData = function () {
            var that = this;
            $.ajax({
                type: 'get',
                url: this.url + "?pageIndex=" + that.pageIndex + "&pageSize=" + that.pageSize,
                data: that.where,
                cache: false,
                dataType: 'json',
                success: function (data) {
                    that.totalCount = data.RecordCount || 0;
                    that.totalpage = Math.ceil(that.totalCount / that.pageSize);
                    that.Bind();
                    if (that.callBack) {
                        that.callBack(data);
                    }
                    if (that.showDataId) {
                        document.getElementById(that.showDataId).innerHTML = data.List;
                    }

                },
                error: function () {

                }
            });
        };
    };
    ajaxDatapager.prototype = new Datapager();

    ce.LocationDatapager = locationDatapager;
    ce.AjaxDatapager = ajaxDatapager;

}(ce));


