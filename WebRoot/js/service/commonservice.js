// 查询当前用户所在单位分管的路段
function queryLdByGroupId(id,callback){
	$.ajax({
		url: "expenseBudget/selectld.do",
		type:"POST",
		dataType : "json",
		contentType:'application/json;charset=UTF-8',  
		data:JSON.stringify({groupid:id}),
		success:function(result){
			if (result == null) {
				alert('没有查询结果');
				return;
			}
			else {
				callback(result.data);
			}
		}
	});
}

// 查询统计后 的填报信息
function queryStatisticHcetc(groupid,tbsj,sh_zt,currentPage,pageSize,callback){
	$.ajax({
		url: "hcetc/select.do",
		type:"POST",
		dataType : "json",
		contentType:'application/json;charset=UTF-8',  
		data:JSON.stringify({"groupid":groupid,"tbsj":tbsj,"sh_zt":sh_zt,"currentPage":currentPage,"pageSize":pageSize}),
		success:function(result){
			if(result==null || result.data==null){
				alert("没有查询结果！");
			}
			else{
				var s = result.data;
				var total=result.total;
				var rows=result.rows;
				var pages=result.pages;
				callback(s,total,rows,pages);
			}
		}
		
	});
}


//查询填报信息明细
function queryBudgets(ld,tbsj,currentPage,pageSize,callback){
	$.ajax({
		url: "hcetc/select.do",
		type:"POST",
		dataType : "json",
		contentType:'application/json;charset=UTF-8',  
		data:JSON.stringify({"ld":ld,"tbsj":tbsj,"detailOrNot":"yes","currentPage":currentPage,"pageSize":pageSize}),
		success:function(result){
			if(result==null || result.data==null){
				alert("没有查询结果！");
			}
			else{
				var s = result.data;
				callback(s);
			}
		}
		
	});
}

// 获取路段下所有项目的初始化信息
function selectSfxmByLd(ld,callback){
	$.ajax({
		url: "expenseBudget/selectSfxmByLd.do",
		type:"POST",
		dataType : "json",
		contentType:'application/json;charset=UTF-8',  
		data:JSON.stringify({"ld":ld}),
		success:function(result){
			if(result==null || result.data==null){
				alert("没有查询结果！");
			}
			else{
				var s = result.data;
				callback(s);
			}
		}
		
	});
	
}




// 查询设备投入运行时间是否存在
function querySystemsRunTime(){
	$.ajax({
		url: "expenseBudget/select.do",
		type:"POST",
		dataType : "json",
		contentType:'application/json;charset=UTF-8',  
		data:JSON.stringify({"detailOrNot":detailOrNot,"currentPage":currentPage,"pageSize":pageSize}),
		success:function(result){
			if(result==null || result.data==null){
				alert("没有查询结果！");
			}
			else{
				var s = result.data;
				callback(s);
			}
		}
		
	});
}

//导出Excel
function exportExcel(gid,year,callback){
	$.ajax({
		url: "export/excel.do",
		type:"POST",
		dataType : "json",
		contentType:'application/json;charset=UTF-8',  
		data:JSON.stringify({"gid":gid,"year":year}),
		success:function(result){
			if(result==null || result.data==null){
				alert("没有查询结果！");
			}
			else{
				var s = result.data;
				callback(s);
			}
		}
		
	});
}


//导出Excel
function exportExcelCollect(year,callback){
	$.ajax({
		url: "export/excel/collect.do",
		type:"POST",
		dataType : "json",
		contentType:'application/json;charset=UTF-8',  
		data:JSON.stringify({"year":year}),
		success:function(result){
			if(result==null || result.data==null){
				alert("没有查询结果！");
			}
			else{
				var s = result.data;
				callback(s);
			}
		}
		
	});
}



//查询目前报表中都有那些年份
function queryReportYears(callback){
	$.ajax({
		url: "query/years.do",
		type:"POST",
		dataType : "json",
		contentType:'application/json;charset=UTF-8',  
		success:function(result){
			if(result==null || result.data==null){
				alert("没有查询结果！");
			}
			else{
				var s = result.data;
				callback(s);
			}
		}
		
	});
}

// 查询当前路段是否已经填报过预算
function getExpenseBudgetCountByParams(ld,callback){
	$.ajax({
		url: "expenseBudget/getExpenseBudgetCountByParams.do",
		type:"POST",
		dataType : "json",
		contentType:'application/json;charset=UTF-8',  
		data:JSON.stringify({"ld":ld}),
		success:function(result){
			if(result==null || result.data==null){
				alert("没有查询结果！");
			}
			else{
				var s = result.data;
				callback(s);
			}
		}
		
	});
}



function insertReportData(vos,callback){
	 $.ajax({  
        type:"POST",   //http请求方式  
        url:'expenseBudget/insert.do',
        data:JSON.stringify(vos), //发送给服务器的参数  ,JSON.stringify将json对象转换成json字符串，否则后台bean接收不到,报400,415错误
        dataType:"json",  //告诉JQUERY返回的数据格式(注意此处数据格式一定要与提交的controller返回的数据格式一致,不然不会调用回调函数complete)
        contentType:'application/json;charset=UTF-8',  
        complete:function(msg) {  
            var vstatus=eval("(" + msg.responseText + ")").vstatus;
            var messages=eval("(" + msg.responseText + ")").messages;
            var returnstr;
            //alert(vstatus);
            if (vstatus=='false') {   	                
                alert(messages);	                    
            } else {  	              
             callback();           
            }  
        }//定义交互完成,并且服务器正确返回数据时调用回调函数   
    });  
}

function updateReportData(vos,callback){
	 $.ajax({  
       type:"POST",   //http请求方式  
       url:'expenseBudget/update.do',
       data:JSON.stringify(vos), //发送给服务器的参数  ,JSON.stringify将json对象转换成json字符串，否则后台bean接收不到,报400,415错误
       dataType:"json",  //告诉JQUERY返回的数据格式(注意此处数据格式一定要与提交的controller返回的数据格式一致,不然不会调用回调函数complete)
       contentType:'application/json;charset=UTF-8',  
       complete:function(msg) {  
           var vstatus=eval("(" + msg.responseText + ")").vstatus;
           var messages=eval("(" + msg.responseText + ")").messages;
           var returnstr;
           //alert(vstatus);
           if (vstatus=='false') {   	                
               alert(messages);	                    
           } else {  	              
            callback();           
           }  
       }//定义交互完成,并且服务器正确返回数据时调用回调函数   
   });  
}

function deleteReportRows(ids,callback){
	 $.ajax({  
      type:"POST",   //http请求方式  
      url:'expenseBudget/delete.do',
      data:JSON.stringify(ids), //发送给服务器的参数  ,JSON.stringify将json对象转换成json字符串，否则后台bean接收不到,报400,415错误
      dataType:"json",  //告诉JQUERY返回的数据格式(注意此处数据格式一定要与提交的controller返回的数据格式一致,不然不会调用回调函数complete)
      contentType:'application/json;charset=UTF-8',  
      success:function(result) {  
           callback();           
      },//定义交互完成,并且服务器正确返回数据时调用回调函数   
      error:function(result){
    	  callback();
      }
  });  
}


// 系数填报
function insertXstb(vos,callback){
	 $.ajax({  
       type:"POST",   //http请求方式  
       url:'xstb/insert.do',
       data:JSON.stringify(vos), //发送给服务器的参数  ,JSON.stringify将json对象转换成json字符串，否则后台bean接收不到,报400,415错误
       dataType:"json",  //告诉JQUERY返回的数据格式(注意此处数据格式一定要与提交的controller返回的数据格式一致,不然不会调用回调函数complete)
       contentType:'application/json;charset=UTF-8',  
       complete:function(msg) {  
           var vstatus=eval("(" + msg.responseText + ")").vstatus;
           var messages=eval("(" + msg.responseText + ")").messages;
           var returnstr;
           //alert(vstatus);
           if (vstatus=='false') {   	                
               alert(messages);	                    
           } else {  	              
            callback();           
           }  
       }//定义交互完成,并且服务器正确返回数据时调用回调函数   
   });  
}


//系数审批
function xtsp(vos,callback){
	 $.ajax({  
       type:"POST",   //http请求方式  
       url:'xstb/sfxs_sp.do',
       data:JSON.stringify(vos), //发送给服务器的参数  ,JSON.stringify将json对象转换成json字符串，否则后台bean接收不到,报400,415错误
       dataType:"json",  //告诉JQUERY返回的数据格式(注意此处数据格式一定要与提交的controller返回的数据格式一致,不然不会调用回调函数complete)
       contentType:'application/json;charset=UTF-8',  
       complete:function(msg) {  
           var vstatus=eval("(" + msg.responseText + ")").vstatus;
           var messages=eval("(" + msg.responseText + ")").messages;
           var returnstr;
           //alert(vstatus);
           if (vstatus=='false') {   	                
               alert(messages);	                    
           } else {  	              
            callback();           
           }  
       }//定义交互完成,并且服务器正确返回数据时调用回调函数   
   });  
}



//系数查询
function queryXstb(callback,year,limit){
	var vos = {
			ysnf:year,
			rownum:limit
	};
	 $.ajax({  
       type:"POST",   //http请求方式  
       url:'xstb/selectSfXs_sp.do',
       data:JSON.stringify(vos), //发送给服务器的参数  ,JSON.stringify将json对象转换成json字符串，否则后台bean接收不到,报400,415错误
       dataType:"json",  //告诉JQUERY返回的数据格式(注意此处数据格式一定要与提交的controller返回的数据格式一致,不然不会调用回调函数complete)
       contentType:'application/json;charset=UTF-8',  
       complete:function(msg) {  
           var vstatus=eval("(" + msg.responseText + ")").vstatus;
           var messages=eval("(" + msg.responseText + ")").messages;
           var xs_nx = eval("(" + msg.responseText + ")").xs_nx;
           var xs_cd = eval("(" + msg.responseText + ")").xs_cd;
           //alert(vstatus);
           if (vstatus=='false') {   	                
               alert(messages);	                    
           } 
           else {  
        	   callback(xs_nx,xs_cd);           
           }  
       }//定义交互完成,并且服务器正确返回数据时调用回调函数   
   });  
}




//查询所有组织机构信息
function queryGroupInfos(gid,callback){
	 $.ajax({  
       type:"POST",   //http请求方式  
       url:'groups.do',
       data:JSON.stringify({"gid":gid}),
       dataType:"json",  //告诉JQUERY返回的数据格式(注意此处数据格式一定要与提交的controller返回的数据格式一致,不然不会调用回调函数complete)
       contentType:'application/json;charset=UTF-8',  
       success:function(result){
		 callback(result.data);
	   },
	   error:function(){
		 alert("查询组织机构数据失败！");  
	   }
   });  
}

// 按各公路局分组统计预算信息
function queryBudgetCollect(tbsj,callback){
	 $.ajax({  
	       type:"POST",   //http请求方式  
	       url:'expenseBudget/getTotalExpenseBudgetByGroup.do',
	       data:JSON.stringify({"tbsj":tbsj}),
	       dataType:"json",  //告诉JQUERY返回的数据格式(注意此处数据格式一定要与提交的controller返回的数据格式一致,不然不会调用回调函数complete)
	       contentType:'application/json;charset=UTF-8',  
	       success:function(result){
			 callback(result.expenseBudgetLst);
		   },
		   error:function(){
			 alert("查询组织机构数据失败！");  
		   }
	   });  
}

