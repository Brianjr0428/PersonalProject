// This document defines survey and question objects

//define survey object
function survey(id,questionArr){	
this.id=id;
this.name="";
this.questionArr=questionArr;
}
survey.prototype.setId=function(){
return this.id;
}

survey.prototype.getId=function(){
return this.id;
}

survey.prototype.setName=function(name){
this.name=name;
}

survey.prototype.getName=function(){
return this.name;
}

survey.prototype.addQuestion=function(question){
this.questionArr.push(question);
}

survey.prototype.getQuestions=function(question){
return this.questionArr;
}

//define question object

function question(id){	
this.type="none";
this.id=id;
this.answer="";
}

function radio(quest,arr){
question.call( this, getCount() );
this.type="radio";
this.quest=quest;
this.option=arr;
}

radio.prototype.getType= function(){
return this.type;
}

radio.prototype.getId= function(){
return this.id;
}

radio.prototype.getQuest= function(){
return this.quest;
}
radio.prototype.getOption= function(){
return this.option;
}

radio.prototype.setAnswer=function(answer){
this.answer=answer;
}

radio.prototype.getAnswer=function(){
return this.answer;
}

function dropDown(quest,arr){
question.call( this, getCount() );
this.type="dropDown";
this.quest=quest;
this.option=arr;
}

dropDown.prototype.getType= function(){
return this.type;
}

dropDown.prototype.getId= function(){
return this.id;
}

dropDown.prototype.getQuest= function(){
return this.quest;
}

dropDown.prototype.getOption= function(){
return this.option;
}

dropDown.prototype.setAnswer=function(answer){
this.answer=answer;
}

dropDown.prototype.getAnswer=function(){
return this.answer;
}


function checkBox(quest,arr){
question.call( this, getCount() );
this.type="checkBox";
this.quest=quest;
this.option=arr;
}

checkBox.prototype.getType= function(){
return this.type;
}

checkBox.prototype.getId= function(){
return this.id;
}

checkBox.prototype.getQuest= function(){
return this.quest;
}
checkBox.prototype.getOption= function(){
return this.option;
}

checkBox.prototype.setAnswer=function(answer){
this.answer=answer;
}

checkBox.prototype.getAnswer=function(){
return this.answer;
}	


function openEnd(quest){
question.call( this, getCount() );
this.type="openEnd";
this.quest=quest;
}

openEnd.prototype.getType= function(){
return this.type;
}

openEnd.prototype.getId= function(){
return this.id;
}

openEnd.prototype.getQuest= function(){
return this.quest;
}

openEnd.prototype.setAnswer=function(answer){
this.answer=answer;
}

openEnd.prototype.getAnswer=function(){
return this.answer;
}	

