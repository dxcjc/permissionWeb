    /**
     * 检查工具
     */
    var Verify = {};
    /**
     * 身份证正则判断
     * @param str
     * @returns {boolean}
     */
    Verify.checkIdCard = function(num) {
        num = num.toUpperCase();
        //身份证号码为15位或者18位，15位时全为数字，18位前17位为数字，最后一位是校验位，可能为数字或字符X。
        if (!(/(^\d{15}$)|(^\d{17}([0-9]|X)$)/.test(num))) {
            // alert('输入的身份证号长度不对，或者号码不符合规定！\n15位号码应全为数字，18位号码末位可以为数字或X。');
            return false;
        }
        //校验位按照ISO 7064:1983.MOD 11-2的规定生成，X可以认为是数字10。
        //下面分别分析出生日期和校验位
        var len, re;
        len = num.length;
        if (len == 15) {
            re = new RegExp(/^(\d{6})(\d{2})(\d{2})(\d{2})(\d{3})$/);
            var arrSplit = num.match(re);
            //检查生日日期是否正确
            var dtmBirth = new Date('19' + arrSplit[2] + '/' + arrSplit[3] + '/' + arrSplit[4]);
            var bGoodDay = (dtmBirth.getYear() == Number(arrSplit[2])) && ((dtmBirth.getMonth() + 1) == Number(arrSplit[3])) && (dtmBirth.getDate() == Number(arrSplit[4]));
            if (!bGoodDay) {
                // alert('输入的身份证号里出生日期不对！');
                return false;
            } else {
                //将15位身份证转成18位
                //校验位按照ISO 7064:1983.MOD 11-2的规定生成，X可以认为是数字10。
                var arrInt = new Array(7, 9, 10, 5, 8, 4, 2, 1, 6, 3, 7, 9, 10, 5, 8, 4, 2);
                var arrCh = new Array('1', '0', 'X', '9', '8', '7', '6', '5', '4', '3', '2');
                var nTemp = 0,
                    i;
                num = num.substr(0, 6) + '19' + num.substr(6, num.length - 6);
                for (i = 0; i < 17; i++) {
                    nTemp += num.substr(i, 1) * arrInt[i];
                }
                num += arrCh[nTemp % 11];
                return num;
            }
        }
        if (len == 18) {
            re = new RegExp(/^(\d{6})(\d{4})(\d{2})(\d{2})(\d{3})([0-9]|X)$/);
            var arrSplit = num.match(re);
            //检查生日日期是否正确
            var dtmBirth = new Date(arrSplit[2] + "/" + arrSplit[3] + "/" + arrSplit[4]);
            var bGoodDay;
            bGoodDay = (dtmBirth.getFullYear() == Number(arrSplit[2])) && ((dtmBirth.getMonth() + 1) == Number(arrSplit[3])) && (dtmBirth.getDate() == Number(arrSplit[4]));
            if (!bGoodDay) {
                // alert(dtmBirth.getYear());
                // alert(arrSplit[2]);
                // alert('输入的身份证号里出生日期不对！');
                return false;
            } else {
                //检验18位身份证的校验码是否正确。
                //校验位按照ISO 7064:1983.MOD 11-2的规定生成，X可以认为是数字10。
                var valnum;
                var arrInt = new Array(7, 9, 10, 5, 8, 4, 2, 1, 6, 3, 7, 9, 10, 5, 8, 4, 2);
                var arrCh = new Array('1', '0', 'X', '9', '8', '7', '6', '5', '4', '3', '2');
                var nTemp = 0,
                    i;
                for (i = 0; i < 17; i++) {
                    nTemp += num.substr(i, 1) * arrInt[i];
                }
                valnum = arrCh[nTemp % 11];
                if (valnum != num.substr(17, 1)) {
                    // alert('18位身份证的校验码不正确！应该为：' + valnum);
                    return false;
                }
                return num;
            }
        }
        return false;
    };

    /**
     * 手机号正则判断
     * @param str
     * @returns {boolean}
     */
    Verify.checkPhone = function(str) {
        var reg = new RegExp(/^1[0-9]{10}$/)
        if (reg.test(str)) {
            return true;
        } else {
            return false;
        }
    };

    /**
     * javascript验证纳税人识别号格式
     * @param  taxId [纳税人识别号]
     * @return true格式正确，false格式错误
     */
    Verify.checkTaxId = function(str) {
        var reg = /^[0-9A-Z]+$/;
        if (reg.test(str)) {
            return true;
        } else {
            return false;
        }
    }

    /**
     * 密码组合规则-正则判断
     * @param str
     * @returns {boolean}
     */
    Verify.checkPassWord = function(str) {
        var pattern = /^(?![0-9]+$)(?![a-z]+$)(?![A-Z]+$)(?!([^(0-9a-zA-Z)])+$)^.{6,16}$/;
        if (pattern.test(str)) {
            //正确
            return true;
        } else {
            return false;
        }
    };

    /**
     * 双字节字符串正则判断
     * @param str
     * @returns {boolean}
     */
    Verify.hasDoubleBitStr = function(str) {
        var pattern = /[^\x00-\xff]/;
        if (pattern.test(str)) {
            //正确
            return true;
        } else {
            return false;
        }
    };

    /**
     * 中文字符串正则判断
     * 包含中文，就返回true
     * @param str
     * @returns {boolean}
     */
    Verify.hasChineseStr = function(str) {
        var pattern = /[\u4e00-\u9fa5]/;
        if (pattern.test(str)) {
            //正确
            return true;
        } else {
            return false;
        }
    };

    /**
     * 中文字符串正则判断
     * 全部是中文，返回true
     * @param str
     * @returns {boolean}
     */
    Verify.onlyChineseStr = function(str) {
        var pattern = /^[\u4e00-\u9fa5]+$/;
        if (pattern.test(str)) {
            return true;
        } else {
            return false;
        }
    };

    /**
     * 验证：中，英文字符串 + ·
     * @param str
     * @returns {boolean}
     */
    Verify.isCNorEng = function(str) {
        var reg = new RegExp(/^[\u4e00-\u9fa5a-zA-Z·]+$/)
        if (reg.test(str)) {
            return true;
        } else {
            return false;
        }
    };

    /**
     * 校验邮箱
     * @param str
     * @returns {boolean}
     */
    Verify.checkEmail = function(str) {
        var reg = new RegExp(/^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/)
        if (reg.test(str)) {
            return true;
        } else {
            return false;
        }
    }

    /**
     * 校验真实姓名
     * 1、中文2-4位；
     * 2、英文2-10位，可以输入空格和.
     * @param str
     * @returns {boolean}
     */
    Verify.checkRealName = function(str) {
        // var reg = new RegExp(/^[a-z\u4e00-\u9fa5]{2,10}$/gi)
        var reg = new RegExp(/^([\u4e00-\u9fa5]{2,4}|[a-zA-Z\.\s]{2,10})$/gi)
        if (reg.test(str)) {
            return true;
        } else {
            return false;
        }
    }

    /**
     * 校验昵称
     * 中文或英文或数字，不包含特殊字符，不能输入空格、表情
     * returnApply true，意思是符合以上规则
     * @param str
     * @returns {boolean}
     */
    Verify.checkNickName = function(str) {
        var reg = new RegExp(/^[a-zA-Z0-9\u4e00-\u9fa5]+$/g)
        if (reg.test(str)) {
            return true;
        } else {
            return false;
        }
    }

    /**
     * 校验车牌号
     * @param str
     * @returns {boolean}
     */
    Verify.checkCarNo = function(str) {
        //新能源车规则：[京津沪渝冀豫云辽黑湘皖鲁新苏浙赣鄂桂甘晋蒙陕吉闽贵粤青藏川宁琼使领A-Z]{1}[A-Z]{1}(([0-9]{5}[DF])|([DF][A-HJ-NP-Z0-9][0-9]{4}))
        //普通汽车规则：[京津沪渝冀豫云辽黑湘皖鲁新苏浙赣鄂桂甘晋蒙陕吉闽贵粤青藏川宁琼使领A-Z]{1}[A-Z]{1}[A-Z0-9]{4}[A-Z0-9挂学警港澳]{1})
        var reg = new RegExp(/^(([京津沪渝冀豫云辽黑湘皖鲁新苏浙赣鄂桂甘晋蒙陕吉闽贵粤青藏川宁琼使领A-Z]{1}[A-Z]{1}(([0-9]{5}[DF])|([DF][A-HJ-NP-Z0-9][0-9]{4})))|([京津沪渝冀豫云辽黑湘皖鲁新苏浙赣鄂桂甘晋蒙陕吉闽贵粤青藏川宁琼使领A-Z]{1}[A-Z]{1}[A-Z0-9]{4}[A-Z0-9挂学警港澳]{1}))$/)
        if (reg.test(str)) {
            return true;
        } else {
            return false;
        }
    }

    /**
     * 校验银行卡号
     * 不是0开头，16-19位数字
     * @param str
     * @returns {boolean}
     */
    Verify.checkBankCardNo = function(str) {
        var reg = new RegExp(/^([1-9]{1})(\d{15,18})$/)
        if (reg.test(str)) {
            return true;
        } else {
            return false;
        }
    }
    Verify.checkDigitCharacter = function(nubmer) {
        var re = /^[0-9a-zA-Z]*$/; //判断字符串是否为数字和字母组合
        if (re.test(nubmer)) {
            return true;
        } else {
            return false;
        }
    }

    export default Verify