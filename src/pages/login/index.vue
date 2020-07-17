<template>
	<div>
		<div class="wrapper-login">
			<div class="big-photo">
				<div class="login-background"></div>
			</div>
			<div class="wrap-form">
				<div class="left">
					<img :src="loginLogoImg" alt="">
				</div>
				<div class="right"
					v-loading="loading"
					element-loading-text="正在登录..."
					element-loading-spinner="el-icon-loading"
					element-loading-background="rgba(0, 0, 0, 0.2)">
					<el-form
						:rules="rules"
						ref="loginForm"
						:model="loginForm"
						class="login-container">
						<h3 class="loginTitle">管理系统登录</h3>
						<el-form-item prop="username">
							<el-input
								size="normal"
								type="text"
								v-model="loginForm.username"
								auto-complete="off"
								@keyup.enter.native="submitLogin"
								placeholder="请输入手机号码"
							></el-input>
						</el-form-item>
						<el-form-item prop="password">
							<el-input
								size="normal"
								type="password"
								@keyup.enter.native="submitLogin"
								v-model="loginForm.password"
								auto-complete="off"
								placeholder="请输入密码"
							></el-input>
						</el-form-item>
						<el-form-item style="text-align: right;">
							<el-checkbox v-model="isPsd" @change="handleCheck">记住密码</el-checkbox>
						</el-form-item>
						<el-form-item class="loginbutton">
							<el-button
								size="normal"
								type="primary"
								style="width: 100%;"
								@click.native.prevent="submitLogin"
							>登录</el-button>
						</el-form-item>
					</el-form>
				</div>
			</div>
		</div>
	</div>
</template>
<script>
import Cookies from 'js-cookie'
export default {
	name: 'Login',
	data () {
		return {
			loading: false,
			loginForm: {
				username: '',
				password: '',
				code: ''
			},
			checked: true,
			rules: {
				username: [{ required: true, message: '请输入用户名', trigger: 'blur' }],
				password: [{ required: true, message: '请输入密码', trigger: 'blur' }]
			},
			loginLogoImg: require('@/assets/img/logo.png'),
			isPsd: false
		};
	},
	methods: {
		init () {
			let username = Cookies.get('username')
			let password = window.atob(Cookies.get('password'))
			this.isPsd = parseInt(Cookies.get('isPsd')) === 1
			this.loginForm.username = username
			this.loginForm.password = password
		},
		submitLogin () {
			this.$refs.loginForm.validate(valid => {
				if (valid) {
					this.loading = true
					if (this.isPsd) {
						Cookies.set('username', this.loginForm.username)
						Cookies.set('password', window.btoa(this.loginForm.password))
						Cookies.set('isPsd', 1)
                    }
                    this.loading = false
                    this.$router.replace('/index/home')
				} 
			});
		},
		handleCheck (val) {
			if (!val) {
				Cookies.remove('username')
				Cookies.remove('password')
				Cookies.remove('isPsd')
			}
		}
	},
	created () {
		this.init()
	}
};
</script>

<style lang="scss">
@mixin flex($direction: row, $justifyContent: center, $alignItems: center) {
    display: flex;
    flex-direction: $direction;
    justify-content: $justifyContent;
    align-items: $alignItems;
}
.loginContainer {
	border-radius: 15px;
	background-clip: padding-box;
	width: 350px;
	padding: 35px;
	position: fixed;
	top: 50%;
	left: 50%;
	transform: translateX(-50%) translateY(-50%);
	background: #fff;
	border: 1px solid #eaeaea;
}

.loginTitle {
	font-size: 30px;
	margin: 15px auto 20px auto;
	text-align: center;
	color: #303133;
}

.loginRemember {
	text-align: left;
	margin: 0px 0px 15px 0px;
}

.wrapper-login .big-photo {
	position: fixed;
	top: 0;
	left: 0;
	width: 100%;
	height: 100%;
	z-index: -10;
	zoom: 1;
	background-color: #000;
	background-image: url('../../assets/img/bg.jpg');
	background-repeat: no-repeat;
	background-size: cover;
	-webkit-background-size: cover;
	-o-background-size: cover;
	background-position: center 0;
    filter: blur(10px);
}
.wrapper-login .big-photo .login-background {
	height: 100%;
	width: 100%;
}

.wrap-form {
	@include flex(row, flex-start, center);
	position: fixed;
	top: 50%;
	left: 50%;
	transform: translateX(-50%) translateY(-50%);
	box-shadow: 1px 1px 6px 1px rgba(0, 0, 0, .5);
	border-radius: 15px;
	.left {
		@include flex;
		width: 300px;
		height: 600px;
		background: linear-gradient(to right bottom, #409EFF, #66B1FF);
		border-top-left-radius: 15px;
		border-bottom-left-radius: 15px;
	}
	.right {
		@include flex;
		width: 600px;
		height: 600px;
		background: #fff;
		border-top-right-radius: 15px;
		border-bottom-right-radius: 15px;
		.login-container {
			width: 300px;
			.el-button--primary {
				background: linear-gradient(to right bottom, #409EFF, #66B1FF);
			}
		}
	}
}
@media screen and (max-width: 500px) {
	.wrap-form {
		width: 90%;
		.left {
			width: 0;
			img {
				display: none;
			}
		}
		.right {
			border-top-left-radius: 15px;
			border-bottom-left-radius: 15px;
		}
	}
}

</style>
