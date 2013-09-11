// This document defines main functions

var count=0;
var surveyNum=0;
var radioIndex=0;
var selectIndex=0;
var checkIndex=0;
var dropIndex=0;
var dropOptionIndex=0;
var textAreaIndex=0;
var objectArray=[];
var surveyArray=[];

function createSurvey(name){
if(document.getElementById('surveyName').value==""){
alert("Please name your survey");
return;
}
surveyNum++;
var newSurvey=new survey(surveyNum,objectArray);
surveyArray.push(newSurvey);
newSurvey.setName(document.getElementById('surveyName').value);
document.getElementById('surveyTitle').innerHTML=newSurvey.getName();
document.getElementById('surveyTitle2').innerHTML=newSurvey.getName();
document.getElementById('p1').style.display="block";
document.getElementById('main').style.display="none";
}

function showP2(){
var currentQArray=surveyArray[surveyArray.length-1].getQuestions();
var start=0;
var end=0;
document.getElementById('p1').style.display="none";
document.getElementById('p2').style.display="block";
for(i=0;i<currentQArray.length;i++){
//create a new div along with property
var obj=currentQArray[i];
var innerDiv=document.createElement('div');
var idName="qst"+i;
innerDiv.id=idName;
innerDiv.style="border:1px dotted";
innerDiv.style.margin="10px";
if(i>0)
innerDiv.style.display="none";
//append the new div
document.getElementById('p2').appendChild(innerDiv);

var content="<p style='margin:10px'>"+"Q"+obj.getId()+". "+obj.getQuest()+"<br>";
//append elements in the new div
if(obj.type=="openEnd"){
start=textAreaIndex;
textAreaIndex++;
var aid='textArea'+textAreaIndex;
content+="<textarea id='"+aid+"' cols='70%px' rows='2px'></textarea><br>";
end=textAreaIndex;
}
else if(obj.type=="radio"){
start=radioIndex;
content +="<form>";
for(j=0;j<obj.getOption().length;j++){
radioIndex++;
var tid='radio'+radioIndex;
content += "<input id='"+tid+"' style='margin:10px' name='rad' value="+obj.getOption()[j]+" type='radio'>"+obj.getOption()[j]+"<br>";

}
content +="</form>";
end=radioIndex;
}
else if(obj.type=="dropDown"){
start=dropIndex;
dropIndex++;
var did='drop'+dropIndex;
content+="<select style='margin:10px' id='"+did+"' style='margin:10px'>";
content += "<option value='default'>----</option>";
for(j=0;j<obj.getOption().length;j++)
content += "<option value='"+obj.getOption()[i]+"'>"+obj.getOption()[j]+"</option>";
content+="</select><br>";
end=dropIndex;
}
else if(obj.type=="checkBox"){
start=checkIndex;
for(j=0;j<obj.getOption().length;j++){
checkIndex++;
var cid='cBox'+checkIndex;
content += "<input id='"+cid+"' style='margin:10px' name='rad' type='checkBox' value='"+obj.getOption()[j]+"'>"+obj.getOption()[j]+"<br>";
}
end=checkIndex;
}

if(currentQArray.length==1){
content+="<input type='button' value='Finish' onclick='showP3("+i+","+start+","+end+")' />";
}
else{
if(i==0){
content+="<input id=''next'+"+i+"' type='button' value='Next' onclick='moveForward("+i+","+start+","+end+")' />";
}

else if(i==currentQArray.length-1){
content+="<input id=''pre'+i' type='button' value='Previous' onclick='moveBack("+i+","+start+","+end+")' />";
content+="<input id=''next'+i' type='button' value='Finish' onclick='showP3("+i+","+start+","+end+")' />";
}
else{
content+="<input id=''pre'+i' type='button' value='Previous' onclick='moveBack("+i+","+start+","+end+")' />";
content+="<input id=''next'+i type='button' value='Next' onclick='moveForward("+i+","+start+","+end+")' />";
}

}

document.getElementById(innerDiv.id).innerHTML=content;
}
}

function moveForward(index,start,end){

var currentQArray=surveyArray[surveyArray.length-1].getQuestions();
var id="";
if(currentQArray[index].getType()=="radio"){
for(i=start+1;i<=end;i++){
id='radio'+i;
if(document.getElementById(id).checked)
currentQArray[index].setAnswer(document.getElementById(id).value);
}
}
else if(currentQArray[index].getType()=="checkBox"){

var ansArr=[];
for(i=start+1;i<=end;i++){
id='cBox'+i;	
if(document.getElementById(id).checked)
ansArr.push(document.getElementById(id).value);
}
var result="";
for(i=0;i<ansArr.length;i++){
if(i==ansArr.length-1)
result+=ansArr[i]
else
result+=ansArr[i]+", ";
}
currentQArray[index].setAnswer(result);
}

else if(currentQArray[index].getType()=="dropDown"){
id='drop'+end;
var e = document.getElementById(id);
var val=e.options[e.selectedIndex].text;
if(val=="----")
currentQArray[index].setAnswer("");
else
currentQArray[index].setAnswer(val);
}
else if(currentQArray[index].getType()=="openEnd"){
id='textArea'+end;
currentQArray[index].setAnswer(document.getElementById(id).value);
}

if(currentQArray[index].getAnswer()==""){
if(currentQArray[index].getType()=="openEnd")
alert("Do not leave the text field empty");
if(currentQArray[index].getType()=="dropDown")
alert("Please select an option");
if(currentQArray[index].getType()=="checkBox")
alert("Please select at least one option");
if(currentQArray[index].getType()=="radio")
alert("Please select an option");
return;
}
var id='qst'+index;
document.getElementById(id).style.display="none";
index++;
id='qst'+index;
document.getElementById(id).style.display="block";
}

function moveBack(index){

var id='qst'+index;
document.getElementById(id).style.display="none";
index--;
id='qst'+index;
document.getElementById(id).style.display="block";
}



function showP3(index,start,end){
var currentSurvey=surveyArray[surveyArray.length-1];
var currentQArray=currentSurvey.getQuestions();

var id="";
if(currentQArray[index].getType()=="radio"){
for(i=start+1;i<=end;i++){
id='radio'+i;
if(document.getElementById(id).checked)
currentQArray[index].setAnswer(document.getElementById(id).value);
}
}
else if(currentQArray[index].getType()=="checkBox"){

var ansArr=[];
for(i=start+1;i<=end;i++){
id='cBox'+i;	
if(document.getElementById(id).checked)
ansArr.push(document.getElementById(id).value);
}
var result="";
for(i=0;i<ansArr.length;i++){
if(i==ansArr.length-1)
result+=ansArr[i]
else
result+=ansArr[i]+", ";
}
currentQArray[index].setAnswer(result);
}

else if(currentQArray[index].getType()=="dropDown"){
id='drop'+end;
var e = document.getElementById(id);
var val=e.options[e.selectedIndex].text;
if(val=="----")
currentQArray[index].setAnswer("");
else
currentQArray[index].setAnswer(val);
}
else if(currentQArray[index].getType()=="openEnd"){
id='textArea'+end;
currentQArray[index].setAnswer(document.getElementById(id).value);
}

if(currentQArray[index].getAnswer()==""){
if(currentQArray[index].getType()=="openEnd")
alert("Do not leave the text field empty");
if(currentQArray[index].getType()=="dropDown")
alert("Please select an option");
if(currentQArray[index].getType()=="checkBox")
alert("Please select at least one option");
if(currentQArray[index].getType()=="radio")
alert("Please select an option");
return;
}
var id='qst'+index;
document.getElementById('p2').style.display="none";
document.getElementById('p3').style.display="block";
displayAnswer(currentQArray);
}

function displayAnswer(objectArray){
for(i=0;i<objectArray.length;i++){
var obj=objectArray[i];
var innerDiv=document.createElement('div');
var idName="ans"+i;
innerDiv.id=idName;
innerDiv.style="border:1px dotted";
innerDiv.style.margin="10px";
//append the new div
document.getElementById('p3').appendChild(innerDiv);
var content="<p style='margin:10px'>"+"Question "+(i+1)+". "+objectArray[i].getQuest()+"<br>";
content+="<p style='margin:10px'>"+"Your response: "+objectArray[i].getAnswer()+"<br>";

document.getElementById(innerDiv.id).innerHTML=content;
}

}

function addCount(){
count++;
}
function getCount(){
return count;
}


function displayOption(){
var type=document.getElementById('qType').value;
if(type=="openEnd"||type=="default")
document.getElementById('options').style.display="none";
else
document.getElementById('options').style.display="block";
}

function submitQuestion(){	
var currentSurvey=surveyArray[surveyArray.length-1];
var currentQArray=currentSurvey.getQuestions();

var question=document.getElementById('qText').value;
if(question==""){
alert("Plase enter your question");
return;
}
var type=document.getElementById('qType').value;
if(type=="default"){
alert("Plase select question type");
return;
}
else if(document.getElementById('options').style.display!="none"){
var text=document.getElementById('optionText');
if(text.value==""){
alert("Plase enter at least one option");
return;
}
addCount();
var optionByLine=text.value.split("\n");
if(type=="radio"){
var radioQuest=new radio(question,optionByLine);
currentQArray.push(radioQuest);
createRadioQuestion(currentQArray);
}
if(type=="dropDown"){
var dropQuest=new dropDown(question,optionByLine);
currentQArray.push(dropQuest);
createDropQuestion(currentQArray);
}
if(type=="checkBox"){
var checkQuest=new checkBox(question,optionByLine);
currentQArray.push(checkQuest);
createCheckQuestion(currentQArray);
}

}
else if(type=="openEnd"){
addCount();
var openQuest=new openEnd(question);
currentQArray.push(openQuest);
createOpenQuestion(currentQArray);
}
document.getElementById('qText').value="";
document.getElementById('qType').value="default";
text.value="";
document.getElementById('options').style.display="none"

}

//create Radio Questions
function createRadioQuestion(objectArray){
//create a new div property
var obj=objectArray[objectArray.length-1];
var innerDiv=document.createElement('div');
var idName="new"+count;

innerDiv.id=idName;
innerDiv.style="border:1px dotted";
innerDiv.style.margin="10px";

//append the new div
document.getElementById('questions').appendChild(innerDiv);

var inputRadio="<p style='margin:10px'>"+"Q"+obj.getId()+". "+obj.getQuest()+"<br>";
for(i=0;i<obj.getOption().length;i++){
inputRadio += "<input id='obj.getOption()[i]' style='margin:10px' name='rad' type='radio'>"+obj.getOption()[i]+"<br>"
}
document.getElementById(idName).innerHTML=inputRadio;
}

//create Dropdown Questions
function createDropQuestion(objectArray){
//create a new div property
var obj=objectArray[objectArray.length-1];
var innerDiv=document.createElement('div');
var idName="new"+count;

innerDiv.id=idName;
innerDiv.style="border:1px dotted";
innerDiv.style.margin="10px";

//append the new div
document.getElementById('questions').appendChild(innerDiv);

var inputDrop="<p style='margin:10px'>"+"Q"+obj.getId()+". "+obj.getQuest()+"<br>";
inputDrop+="<select style='margin:10px' id='obj.getOption()[i]' style='margin:10px'>";

inputDrop += "<option value='default'>----</option>";
for(i=0;i<obj.getOption().length;i++){
inputDrop += "<option value='obj.getOption()[i]'>"+obj.getOption()[i]+"</option>";
}
inputDrop+="</select>";
document.getElementById(idName).innerHTML=inputDrop;
}

//create CheckBob Questions
function createCheckQuestion(objectArray){
//create a new div property
var obj=objectArray[objectArray.length-1];
var innerDiv=document.createElement('div');
var idName="new"+count;

innerDiv.id=idName;
innerDiv.style="border:1px dotted";
innerDiv.style.margin="10px";

//append the new div
document.getElementById('questions').appendChild(innerDiv);

var inputRadio="<p style='margin:10px'>"+"Q"+obj.getId()+". "+obj.getQuest()+"<br>";
for(i=0;i<obj.getOption().length;i++){
inputRadio += "<input id='obj.getOption()[i]' style='margin:10px' name='rad' type='checkbox'>"+obj.getOption()[i]+"<br>"
}
document.getElementById(idName).innerHTML=inputRadio;
}

//create Open-Ended Questions
function createOpenQuestion(objectArray){
var obj=objectArray[objectArray.length-1];
//create a new div property
var innerDiv=document.createElement('div');
var idName="new"+count;

innerDiv.id=idName;
innerDiv.style="border:1px dotted";
innerDiv.style.margin="10px";
//append the new div
document.getElementById('questions').appendChild(innerDiv);
var inputText="<p style='margin:10px'>"+"Q"+obj.getId()+". "+obj.getQuest()+"<br>";
inputText+="<textarea cols='70%px' rows='2px'></textarea>";
//append elements in the new div
document.getElementById(idName).innerHTML=inputText;
}

