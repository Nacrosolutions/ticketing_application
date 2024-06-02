class Node {
  constructor(value) {
      this.value=value;
      this.next=null;
  }
}

class LinkedList {


  constructor(value) {
  const newNode=new Node(value);
      this.head=newNode;
      this.tail=newNode;
  }
  printList() {
      let temp = this.head;
      let output = "";
      if (temp === null) {
          console.log("empty");
          return;
      }
      while (temp !== null) {
          output += String(temp.value);
          temp = temp.next;
          if (temp !== null) {
              output += " -> ";
          }
      }
      console.log(output);
  }

  push(value) {
      const newNode=new Node(value);
if(this.head===null){
  this.head=newNode;
  this.tail=newNode;
  
}
else {
      
        this.tail.next=newNode;
      this.tail=newNode;
}  
             this.length++;

  }  
  rotate(num) {

    let currentHead=this.head;
   // let currentTail=this.tail;
  
  console.log(this,"THIS")
          for(let i=0;i<num;i++) {
           
  
              this.tail.next=currentHead;
              this.tail=currentHead;
              console.log("tail",this.tail)
  
              currentHead=currentHead.next;
              console.log("currentHead",currentHead)
  
              this.tail.next=null;
              console.log(this.tail,"NEW_TAILS")
          }
  
          return this;
          
      }
  
}
const ll=new LinkedList(5);
ll.push(10);
ll.push(15);
ll.push(20);
ll.push(25);

