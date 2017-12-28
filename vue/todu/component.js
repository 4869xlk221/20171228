Vue.component("guojinling",{
    template:`<div class="box">
        <input type="text" placeholder="请输入事项" v-model="con" @keyup.13="add">
        <div class="btns">
            <input type="button" value="全部" @click="changeStatus('all')" :class="{check:status=='all'}">
            <input type="button" value="已完成" @click="changeStatus('1')" :class="{check:status=='1'}">
            <input type="button" value="未完成" @click="changeStatus('0')" :class="{check:status=='0'}">
        </div>
        <ul class="list">
            <li v-for="item in datas">
                <div v-if="item.edit" @dblclick="edit(item)">
                    <span class="opt" @click="changeState(item)"
                          :class="{red:item.state==1}"></span>
                    <p>{{item.title}}</p>
                    <span class="del"  @click="del(item.id)">删除</span>
                </div>
                <div v-else>
                    <input type="text" v-model="item.title" @blur="edit(item)">
                </div>
            </li>
        </ul>
        <div v-show="all.length==0">没有数据</div>
    </div>
    `,
    data:function () {
        return{
            all:localStorage.doto?JSON.parse(localStorage.doto):[],
            con:"",
            status:"all"
        }
    },
    methods:{
        add(){
            if(!this.con){
                alert("请输入内容");
                return
            }
            var obj={};
            obj.title=this.con;
            obj.id=Math.random()+new Date().getTime();
            obj.state=0;
            obj.edit=true;
            this.all.push(obj);
            this.con="";
            localStorage.doto=JSON.stringify(this.all);
        },
        changeStatus(val){
            this.status=val
        },
        changeState(obj){
            if(obj.state==0){
                obj.state=1
            }else{
                obj.state=0
            }
            localStorage.doto=JSON.stringify(this.all);
        },
        del(id){
            this.all=this.all.filter(function (a) {
                if(a.id!=id){
                    return a
                }
            })
            localStorage.doto=JSON.stringify(this.all);
        },
        edit(obj){
            obj.edit=!obj.edit
        }
    },
    computed:{
        datas(){
            return this.all.filter((a)=>{
                if(this.status=="all"){
                    return a
                }else{
                    if(a.state==this.status){
                        return a
                    }
                }
            })
        }
    }
})