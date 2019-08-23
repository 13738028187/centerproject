
import Vue from 'vue';
import Vuex from 'vuex';
import fly from '@/utils/fly';

Vue.use(Vuex);

let machinetype=[]
let nursezw=[]
let nursezc=[]
let hostype=[]
let hoslevel=[]
let deptype=[]

// fly.request({
//     method:"post", //post/get 请求方式
//     url:"http://192.168.2.27:8080/hi/main?hi=24987F6N21TK",     //医药器械类型字典表
//     body:{}
// }).then(res =>{
//     res.rows.forEach(e=>{
//         machinetype.push({id:e.id,name:e.name})
//     })
// })

// fly.request({
//     method:"post", //post/get 请求方式
//     url:"http://192.168.2.27:8080/hi/main?hi=24987F6N1P4O",     //护士职务字典表
//     body:{}
// }).then(res =>{
//     res.rows.forEach(e=>{
//         nursezw.push({id:e.value,name:e.name})
//     })
// })

// fly.request({
//     method:"post", //post/get 请求方式
//     url:"http://192.168.2.27:8080/hi/main?hi=24987F6N1P3L",     //护士职称字典表
//     body:{}
// }).then(res =>{
//     console.log(res)
//     res.rows.forEach(e=>{
//         nursezc.push({id:e.value,name:e.name})
//     })
// })


// fly.request({
//     method:"post", //post/get 请求方式
//     url:"http://192.168.2.27:8080/hi/main?hi=24987F6N2IN9",     //科室类型字典表
//     body:{}
// }).then(res =>{
//     console.log(res)
//     res.rows.forEach(e=>{
//         deptype.push({id:e.value,name:e.name})
//     })
// })


// fly.request({
//     method:"post", //post/get 请求方式
//     url:"http://192.168.2.27:8080/hi/main?hi=24987F6N27K1",     //医院类型字典表
//     body:{}
// }).then(res =>{
//     res.rows.forEach(e=>{
//         hostype.push({id:e.value,name:e.name})
//     })
// })

// fly.request({
//     method:"post", //post/get 请求方式
//     url:"http://192.168.2.27:8080/hi/main?hi=249GTBY2S5AO",     //医院等级字典表 http://www.ty5m.com:8081
//     body:{}
// }).then(res =>{
//     res.rows.forEach(e=>{
//         hoslevel.push({id:e.value,name:e.name})
//     })
// })

export default new Vuex.Store({
    state: {
        mac: machinetype,
        nurzw:nursezw,
        nurzc:nursezc,
        hostp:hostype,
        hoslev:hoslevel,
        deptp:deptype,
        setidimg:"https://www.ty5m.com:8443/hi/main?hi=24987F6N0ROP",            //获取图片地址
        login:"https://www.ty5m.com:8443/hi/main?hi=249GTBY2RK2G",               //中心端登录
        qxapp:"https://www.ty5m.com:8443/hi/main?hi=13MC0NFI4FQE",               //权限验证

        hospitalapp:"https://www.ty5m.com:8443/hi/main?hi=2495PF2JVS87",         //医院申请
        hospitalcheckno:"https://www.ty5m.com:8443/hi/main?hi=249GTBY2SNYN",     //医院审核不通过
        hospitalzhuce:'https://www.ty5m.com:8443/hi/main?hi=249GTBY2SIPG',       //医院注册
        hospitallist:"https://www.ty5m.com:8443/hi/main?hi=2495PF2JVSDO",        //医院列表
        hospitaldetail:"https://www.ty5m.com:8443/hi/main?hi=2495YYMEFKHH",      //医院信息详情 
        hospitalsearch:"https://www.ty5m.com:8443/hi/main?hi=24987F6N1WJ2",      //医院查询
        hospitalupdate:"https://www.ty5m.com:8443/hi/main?hi=24987F6N1QSD",      //医院信息修改
        hospitallevel:"https://www.ty5m.com:8443/hi/main?hi=249GTBY2S5AO",       //医院等级
        hospitalnolist:"https://www.ty5m.com:8443/hi/main?hi=249GTBY2SHYQ",      //医院待审核列表

        nursedetail:"https://www.ty5m.com:8443/hi/main?hi=24969FGJJDU5",         //护士详情
        nurselist:"https://www.ty5m.com:8443/hi/main?hi=24969FGJJDW4",           //护士列表
        nurseapp:"https://www.ty5m.com:8443/hi/main?hi=249GTBY2RUVD",            //护士审核
        nursesearch:"https://www.ty5m.com:8443/hi/main?hi=249GTBY2RTEB",         //护士查询
        nurseupdate:"https://www.ty5m.com:8443/hi/main?hi=24987F6N23M8",         //护士修改
        nursereadylist:"https://www.ty5m.com:8443/hi/main?hi=249GTBY2RQEI",      //已审核护士列表
        nursenolist:"https://www.ty5m.com:8443/hi/main?hi=249GTBY2RQAS",         //待审核护士列表
        nursedetailinfo:"https://www.ty5m.com:8443/hi/main?hi=24987F6MZPMM",     //护士详情sid
        nursezw:"https://www.ty5m.com:8443/hi/main?hi=24987F6N1P4O",             //护士职务
        nursezc:"https://www.ty5m.com:8443/hi/main?hi=24987F6N1P3L",             //护士职称
        nurselist2:"https://www.ty5m.com:8443/hi/main?hi=249MJYGJLUUI",          //新护士列表

        orderreadylist:"https://www.ty5m.com:8443/hi/main?hi=24976FJ4T666",      //已审核订单列表
        ordernolist:"https://www.ty5m.com:8443/hi/main?hi=24976FJ4T67O",         //未审核订单列表
        orderchecknolist:"https://www.ty5m.com:8443/hi/main?hi=249P942MRT62",     //订单审核不通过列表
        orderdetail:"https://www.ty5m.com:8443/hi/main?hi=24976FJ4T68V",         //订单详情
        orderapp:"https://www.ty5m.com:8443/hi/main?hi=24976FJ4T7ZD",            //订单审核通过
        orderappno:"https://www.ty5m.com:8443/hi/main?hi=24987F6MZVC5",          //订单审核不通过
        ordersearch:"https://www.ty5m.com:8443/hi/main?hi=24987F6N10NF",         //订单查询
        orderlist:"https://www.ty5m.com:8443/hi/main?hi=249GTBY2SMYG",           //订单列表

        instrulist:"https://www.ty5m.com:8443/hi/main?hi=24987F6N1LWJ",          //器械列表
        instrudetail:"https://www.ty5m.com:8443/hi/main?hi=24987F6N1M6T",        //器械详情
        instrumentupdate:"https://www.ty5m.com:8443/hi/main?hi=24987F6N20HD",    //器械修改

        serviceappyes:"https://www.ty5m.com:8443/hi/main?hi=24987F6N1RRF",       //服务审核通过
        serviceappno:"https://www.ty5m.com:8443/hi/main?hi=24987F6N1RX0",        //服务审核失败
        servicereadylist:"https://www.ty5m.com:8443/hi/main?hi=24987F6N1SQY",    //已审核服务项目列表
        servicenolist:"https://www.ty5m.com:8443/hi/main?hi=24987F6N1RZT",       //未审核服务项目列表
        servicedetail:"https://www.ty5m.com:8443/hi/main?hi=24987F6N1S2R",       //服务详情
        servicesearch:"https://www.ty5m.com:8443/hi/main?hi=249GTBY2RX00",       //服务搜索  
        // servicesearch:"https://www.ty5m.com:8443/hi/main?hi=24987F6N1XTZ",    //服务项目查询
        serviceupdate:"https://www.ty5m.com:8443/hi/main?hi=24987F6N25KC",       //服务修改
        servicelist:"https://www.ty5m.com:8443/hi/main?hi=24987F6N1K7L",         //医院服务项目列表
        serlist:"https://www.ty5m.com:8443/hi/main?hi=249MJYGJLUU0",             //服务列表
        //fblist:"https://www.ty5m.com:8443/hi/main?hi=249KZN6KTZ6W",            //反馈列表
        fblist:"https://www.ty5m.com:8443/hi/main?hi=249MJYGJLUU3",              //反馈列表
        fbsearch:"https://www.ty5m.com:8443/hi/main?hi=249MJYGJLUV6",            //反馈搜索
        fbdetail:"https://www.ty5m.com:8443/hi/main?hi=249GTBY2SDAD",            //反馈详情

        keshilist:"https://www.ty5m.com:8443/hi/main?hi=24969FGJJESS",           //科室列表      
        keshidetail:"https://www.ty5m.com:8443/hi/main?hi=24969FGJJF1S",         //科室信息详情

        muserlist:"https://www.ty5m.com:8443/hi/main?hi=249MJYGJM2V5",           //主用户列表
        patientlist:"https://www.ty5m.com:8443/hi/main?hi=249MJYGJM2X5",         //患者列表
        patientdetail:"https://www.ty5m.com:8443/hi/main?hi=249MJYGJM2YC",       //患者详情
        findusers:"https://www.ty5m.com:8443/hi/main?hi=249MJYGJM3RT",           //用户搜索

    },
    mutations: {
    }
});
