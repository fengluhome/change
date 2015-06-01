
/*
 *日历控件 使用方法 Calendar.Create($('#data_date1'));
 */
window.Calendar = {
    Close: function() {
        $('#calendar').remove();
    },
    Create: function(object) {
        // 创建日期组件
        var date = new Date();
        var offsert = object.offset();
        var left = offsert.left;
        var top = offsert.top + 5 + object.height();
        // 包装日历的HTML代码
        var html = '<div id="calendar"  onmouseleave="Calendar.Close();" style="z-index:99999999999;left:' + left + 'px;top:' + top + 'px;" class="calendar_min" data-target="' + object.attr('id') + '" data-year="' + date.getFullYear() + '" data-month="' + (date.getMonth() + 1) + '"><h3>';
        html = html + '<a href="javascript:Calendar.LastYear();" class="pre_year" title="去年">去年</a>';
        html = html + '<a href="javascript:Calendar.LastMonth()" class="pre_month" title="上个月">上个月</a>';
        html = html + '<span class="tit">' + date.getFullYear() + '年' + (date.getMonth() + 1) + '月</span>';
        html = html + '<a href="javascript:Calendar.NextYear()" class="next_year" title="明年">明年</a>';
        html = html + '<a href="javascript:Calendar.NextMonth()" class="next_month" title="下个月">下个月</a></h3>';
        html = html + '<div class="week"><ul><li>一</li><li>二</li><li>三</li><li>四</li><li>五</li><li>六</li><li class="last">日</li></ul></div>';
        html = html + '<div class="days"><ul>';
        for (var index = 1; index < 43; index++) {
            if ((index % 7 === 0)) {
                html = html + '<li class="space r"></li>';
            } else {
                html = html + '<li class="space"></li>';
            }
        }
        html = html + '</ul></div>';
        // 移除正在显示的日历
        Calendar.Close();
        // 插入即将显示的日历
        $(document.body).append(html);
        //object.parent().append(html);
        // 渲染正在显示的日历
        Calendar.Render(date.getFullYear(), (date.getMonth() + 1));

    },
    Render: function(year, month) {
        var space = (new Date(year, month - 1, 1).getDay() - 1);
        if (space < 0) space = space + 7;
        var items = new Date(year, month, 0).getDate();
        var object = $('#calendar');
        var index = 1;
        Calendar.Reset();
        object.attr('data-year', year);
        object.attr('data-month', month);
        object.find('span.tit').html(year + '年' + month + '月');
        object.find('div.days > ul > li').each(function() {
            if (index > space && index <= (items + space)) {
                var result = index - space;
                $(this).html('<span onclick="Calendar.Click(' + result + ');">' + result + '</span>').removeClass('space');
            }
            index++;
        });
    },
    LastMonth: function() {
        var object = $('#calendar');
        var year = parseInt(object.attr('data-year'));
        var month = parseInt(object.attr('data-month')) - 1;
        if (month < 1) {
            month = 12;
            year--;
        }
        Calendar.Reset();
        Calendar.Render(year, month);
    },
    LastYear: function() {
        var object = $('#calendar');
        var year = parseInt(object.attr('data-year')) - 1;
        var month = parseInt(object.attr('data-month'));
        Calendar.Reset();
        Calendar.Render(year, month);
    },
    NextMonth: function() {
        var object = $('#calendar');
        var year = parseInt(object.attr('data-year'));
        var month = parseInt(object.attr('data-month')) + 1;
        if (month > 12) {
            month = 1;
            year++;
        }
        Calendar.Reset();
        Calendar.Render(year, month);
    },
    NextYear: function() {
        var object = $('#calendar');
        var year = parseInt(object.attr('data-year')) + 1;
        var month = parseInt(object.attr('data-month'));
        Calendar.Reset();
        Calendar.Render(year, month);
    },
    Reset: function() {
        var object = $('#calendar');
        object.find('div.days > ul > li').each(function() {
            $(this).html('').addClass('space');
        });
    },
    Click: function(day) {
        var object = $('#calendar');
        var year = parseInt(object.attr('data-year'));
        var month = parseInt(object.attr('data-month'));
        var result = year + '-' + month + '-' + day;
        var target = object.attr('data-target');
        $('#' + target).val(result).trigger('change');
        Calendar.Close();
    }
};