#include <cstdlib>
#include <stdio.h>
#include <string.h>
#include <iostream>
#include <fstream>
#include <vector>
#include <algorithm>

const int wordSize = 200 ;
const int hashSize = 20000; 
const int nodeSize = 200000;
using namespace std;

// make a Node struct
struct Node{
    char word[wordSize];
    Node *next;
};

Node node[nodeSize];
Node* head[hashSize];

// build a hash class
class Hash{
public:
    Hash();
    unsigned int hash(const char* str);
    void insert(const char* str);
    bool find(const char* str);
private:
    unsigned int number;
    unsigned int size;
};

unsigned int Hash::hash(const char* str){
    unsigned int hash = 0;
    while(*str){
	hash = hash * number+ (*str);
	str++;
	}
    return (hash&0x7FFFFFFF)%hashSize ;
}

Hash::Hash():number(131),size(0){
    memset(head, 0, sizeof(head));
}

void Hash::insert(const char* str){
    unsigned int id = hash(str);
    char *dest = (char*)node[size].word;
    while(*dest= *str){
	dest++;
	str++;
	}
    node[size].next = head[id];
    head[id] = &node[size];
    size++;
}

bool Hash::find(const char* str){
    unsigned int id = hash(str);
    for(Node* p=head[id];p;p=p->next){
        char *dest=(char*)p->word;
        int i=0;
        while(*(str+i)&&*(dest+i)==*(str+i))
            i++;
        if(*(str+i)=='\0'&&*(dest+i)=='\0')
            return true;
    }
    return false;
}

bool stringCompare(string,string);
bool buildWord(string, bool,Hash);

int main(int argc, char *argv[])
{
	string lineBuffer;
    	ifstream file;
	file.open(argv[1]);
	int count=0;
	Hash strHash;
	vector<string> wordArray;
	//insert strings into vector
	int g=0;
	while (!file.eof()){
		getline(file, lineBuffer);
		string str=new char[lineBuffer.length()]();
		if (lineBuffer.length() != 0)
			wordArray.push_back(lineBuffer);
	}
	for(int i=0;i<wordArray.size();i++)
		strHash.insert((char*)&wordArray.at(i)[0]);
	//sort vector by string length
	sort( wordArray.begin(), wordArray.end(), stringCompare);
	for(int i=0;i<wordArray.size();i++){
		//check whether this word is made up of other words
		if(buildWord(wordArray.at(i), true, strHash)){
			count++;
			//only print first 2 longest word made up of other words
			if(count<4)	
				cout<<wordArray.at(i)<<endl;
		}
	}
	//printf how many of the words in the list can be constructed of other words in the list
	cout<<"There are "<<count<<" words that can be constructed of other words in the list"<<endl;
	return 0;
}

bool buildWord(string str, bool original, Hash strHash){
	if(strHash.find((char*)&str[0])&&!original)
		return true;
	for(int i=1;i<=str.length();i++){
		string left=str.substr(0,i);
		string right=str.substr(i,str.length()-i);
		if(strHash.find((char*)&left[0])&&buildWord(right, false, strHash))
			return true;
	}
	return false;
}

// a function to sort strings by length
bool stringCompare( string left, string right ){
	if(left.length() > right.length() )
		return true;
   return false;
}
