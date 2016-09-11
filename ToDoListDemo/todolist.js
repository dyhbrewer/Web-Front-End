
var toDoCount=0;
var completeCount=0;
function addList(){
	var doListText=$("#inputToDo").val();
	var doList="<div class='item'>"+"<input type='checkbox' id='checkbox' onclick='clickbox(this)'>"+"<span class='content'>"+"&nbsp;"+doListText+"&nbsp"+"</span>"+"<button class='deleBtn' onclick='deleteItem(this)'>X</button>"+"</div>";
	if(doListText!=""){
		$("#toDo").prepend(doList);
		$("#inputToDo").val("");
		toDoCount+=1;
		$("#todoNum").text(toDoCount);
	}else{
		$("#inputToDo").focus();
	}
}
function clickbox(item){
	var completeItem=$(item).next().text();
	var doneList="<div class='doneItem'>"+"&nbsp;"+completeItem+"&nbsp;"+"<button class='deleBtn' onclick='doneDelete(this)'>X</button>"+"</div>";
	$("#complete").prepend(doneList);
	deleteItem(item);
	completeCount+=1;
	$("#completeNum").text(completeCount);
	}
function deleteItem(item){
	$(item).parent().remove();
	toDoCount-=1;
	$("#todoNum").text(toDoCount);
}
function doneDelete(item){
	$(item).parent().remove();
	completeCount-=1;
	$("#completeNum").text(completeCount);
}