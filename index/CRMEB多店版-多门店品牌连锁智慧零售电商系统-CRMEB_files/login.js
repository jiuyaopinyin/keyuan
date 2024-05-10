$(function () {
    const vmLogin = new Vue({
        el: '#login',
        data() {
            return {
                loginStatus: false,
                loginAfterFn: null,
                timer: null,
                loginQrcode: '',
                loginCode: {},
                loginShow: false,//遮罩
                isQrcode: true,
                phone:'',
                captcha:'',
                code:'',
                captchaCode: '',
                codeText:'发送验证码',
                disabled: false,
                run: undefined,
                active: false,
                bind_phone:false, // 是否绑定手机号
                uid: '', 
                token: '',
                exp: '',
            };
        },
        mounted() {
            //全局可打开登录弹窗方法
            window.commonLogin = this.marketLogin
            window.loginStatus = this.loginStatus = !!localStorage.getItem('token');
        },
        methods: {
            toggleLogin(){
                this.isQrcode = !this.isQrcode;
                if(!this.isQrcode){
                    this.getCodeVal();
                    this.stopSetInterval();
                }
            },
            sendCode() {
                if (this.disabled) return;
                this.disabled = true;
                let n = 60;
                this.codeText = "剩余 " + n + "s";
                this.run = setInterval(() => {
                    n = n - 1;
                    if (n < 0) {
                        clearInterval(this.run);
                    }
                    this.codeText = "剩余 " + n + "s";
                    if (this.codeText < "剩余 " + 0 + "s") {
                        this.disabled = false;
                        this.codeText = "重新获取";
                    }
                }, 1000);
            },
            getCode(){
                if(this.disabled) return
                if (!this.phone) return this.$message.warning('请输入手机号');
                if (!/^1(3|4|5|7|8|9|6)\d{9}$/i.test(this.phone)) return this.$message.warning('请输入正确的手机号');
                postRequest('/api/register/verify', {
                   phone:this.phone,
                    type:'login',
                    key:this.keyCode,
                    login_type: this.bind_phone ? 1 : 0,
                    code:this.code,
                    is_login:1
                }, false).then(res => {
                    this.$message.success(res.msg)
                    this.sendCode();
                }).catch(err=>{
                    this.$message.error(err.msg)
                })
            },
            getCodeVal() {
                getRequest('/api/verify_code', {}, false).then(res => {
                    this.keyCode = res.data.key;
                    this.captchaCode = '/api/sms_captcha?key=' + res.data.key;
                })
            },
            getCaptcha() {
                this.captchaCode = '';
                this.captchaCode = '/api/sms_captcha?key=' + this.keyCode + '&date=' + Date.parse(new Date());
            },
            phoneLogin(){
                if(this.active) return
                this.active = true;
                if (!this.phone) return this.$message.warning('请输入手机号');
                if (!/^1(3|4|5|7|8|9|6)\d{9}$/i.test(this.phone)) return this.$message.warning('请输入正确的手机号');
                if (!this.captcha) return this.$message.warning('请输入验证码');
                if (!/^[\w\d]+$/i.test(this.captcha)) return  this.$message.warning('请输入正确的验证码');
                let url = '/api/login/mobile'
                let data = {
                    phone:this.phone,
                    captcha:this.captcha,
                }
                if(this.bind_phone){
                    url = '/api/pc/scan_bind_phone'
                    data.key = this.loginCode.key
                    data.uid = this.uid
                }
                postRequest(url, data, false).then(res => {
                    this.active = false;
                    this.loginShow = false;
                    window.loginStatus = this.loginStatus = true;
                    localStorage.setItem('token', 'Bearer ' + res.data.token);
                    this.setCookie('auth._token.local4', encodeURI('Bearer ' + res.data.token), res.data.exp);
                    this.setCookie('auth.strategy', 'local4', res.data.exp);
                    window.loginAfter && window.loginAfter();
                    window.loginBack && window.loginBack();
                }).catch(err=>{
                    this.active = false;
                    this.$message.error(err.msg)
                })
            },
            //展开弹窗
            marketLogin(e) {
                this.loginShow = e;
                window.loginBefore && window.loginBefore();
                window.loginStatus = this.loginStatus = false;
                this.getLoginCode();
            },
            closeLogin() {
                this.loginShow = false;
                this.isQrcode = true;
                this.stopSetInterval();
            },
            refreshQrCode() {
                this.getLoginCode();
            },
            //获取二维码
            getLoginCode() {
                let spread_uid = this.getCookie('spread_uid');
                getRequest('/api/pc/get_login_code/1' + (spread_uid ? '/' + spread_uid : ''), {}, false).then(res => {
                    this.loginQrcode = res.data.url;
                    this.loginCode = res.data;
                    localStorage.removeItem('token')
                    this.createSetInterval();
                })
            },
            createSetInterval() {
                this.stopSetInterval();
                this.timer = setInterval(() => {
                    let time = Date.parse(new Date()).toString().substr(0, 10);
                    if (time > parseInt(this.loginCode.fail_time)) {
                        this.loginShow = false;
                        this.loginStatus = false;
                        clearInterval(this.timer)
                    } else {
                        this.setScanLogin();
                    }
                }, 2000);
            },
            stopSetInterval() {
                if (this.timer) {
                    clearInterval(this.timer);
                    this.timer = null;
                }
            },
            //扫码登录
            setScanLogin() {
                postRequest('/api/pc/set_scan_login', {
                    key: this.loginCode.key,
                    ticket: this.loginCode.ticket,
                }, false).then(res => {
                    if(res.data.bind_phone){
                        this.bind_phone = res.data.bind_phone
                        this.uid = res.data.uid
                        this.token = res.data.token
                        this.exp = res.data.exp
                        this.toggleLogin()
                    } else {
                        this.stopSetInterval();
                        this.loginShow = false;
                        window.loginStatus = this.loginStatus = true;
                        localStorage.setItem('token', 'Bearer ' + res.data.token);
                        this.setCookie('auth._token.local4', encodeURI('Bearer ' + res.data.token), res.data.exp);
                        this.setCookie('auth.strategy', 'local4', res.data.exp);
                        window.loginAfter && window.loginAfter();
                        window.loginBack && window.loginBack();
                    }
                })
            },
            goLogin(){
                this.loginShow = false;
                window.loginStatus = this.loginStatus = true;
                localStorage.setItem('token', 'Bearer ' + this.token);
                this.setCookie('auth._token.local4', encodeURI('Bearer ' + this.token), this.exp);
                this.setCookie('auth.strategy', 'local4', this.exp);
                window.loginAfter && window.loginAfter();
                window.loginBack && window.loginBack();
            },
            setCookie(cname, cvalue, exdays) {
                var d = new Date();
                d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
                var expires = "expires=" + d.toGMTString();
                document.cookie = cname + "=" + cvalue + "; " + expires + ';path=/';
            },
            getCookie(cookieName) {
                var totalCookie = document.cookie;
                var cookieStartAt = totalCookie.indexOf(cookieName + "=");
                if (cookieStartAt == -1) {
                    return;
                }
                var valueStartAt = totalCookie.indexOf("=", cookieStartAt) + 1;
                var valueEndAt = totalCookie.indexOf(";", cookieStartAt);
                if (valueEndAt == -1) {
                    valueEndAt = totalCookie.length;
                }
                var cookieValue = unescape(totalCookie.substring(valueStartAt, valueEndAt));
                return cookieValue;
            }
        },
    })
})

