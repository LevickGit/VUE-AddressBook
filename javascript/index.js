new Vue({
    el:'#app',
    data: function(){

        return{
            //input:'',
            userInfo:{  //显示的用户信息
                name:'',
                gender: '',
                phoneNum: '',
                birthday: '',
            },
            tableData: [{
                name: '王小虎',
                gender:'男',
                phoneNum:'12345678900',
                birthday:'2001-02-24',
            }],
            dialogVisible: false,  //控制弹框的显示(不显示)
            editObj:{
                name:'',
                gender: '',
                phoneNum: '',
                birthday: '',
            },
            userIndex:0,
        }
    },
    methods:{
        //添加用户信息
        addUser(){
            if(!this.userInfo.name){
                this.$message({
                    message: '请输入姓名！',
                    type: 'warning'
                });
                return;
            }
            if(!this.userInfo.gender){
                this.$message({
                    message: '请输入性别！',
                    type: 'warning'
                });
                return;
            }
            if (!this.userInfo.birthday) {
                this.$message({
                    message: '请输入您的生日！',
                    type: 'warning'
                });
                return;
            }
            if (!this.userInfo.phoneNum) {
                this.$message({
                    message: '请输入电话号码！',
                    type: 'warning'
                });
                return;
            }
            if (!/^1[3456789]\d{9}$/.test(this.userInfo.phoneNum)) {
                this.$message({
                    message: '请输入正确的电话号码！',
                    type: 'warning'
                });
                return;
            }
            this.tableData.push(this.userInfo);
            this.userInfo = { //每添加一次，就将原来的数据清空一下
                name:'',
                gender: '',
                phoneNum: '',
                birthday: '',
            };
        },

        //删除一组用户信息
        delUser(idx){
            this.$confirm('确认删除此用户信息？')
                .then(_ => {
                    this.tableData.splice(idx, 1); //此处是重点难点，分析vue源码有帮助与理解
                })
                .catch(_ => {});
        },
        
        //编辑数据
        editUser(item,idx){
            //console.log(item);
             this.userIndex = idx;
             this.editObj = {
                 name: item.name,
                 gender: item.gender,
                 phoneNum: item.phoneNum,
                 birthday: item.birthday,
             };
             this.dialogVisible = true;
        },

        handleClose(){
             this.dialogVisible = false;
        },

        confirm(){
            this.dialogVisible = false;
            //Vue对象提供的静态方法
            Vue.set(this.tableData, this.userIndex, this.editObj);
            //下面的方法不可以，因为事件可以监听到但不能及时渲染到页面上去
            //this.tableData[this.userIndex] = this.editObj;
        }
    },
})