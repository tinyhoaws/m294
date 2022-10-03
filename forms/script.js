document.addEventListener('DOMContentLoaded', function() {
      const cont = document.getElementById('container');
      const list = document.createElement('ul');
      const button = document.createElement('button');
      const input = document.createElement('input');
      button.innerHTML="Add";
      this.body.appendChild(cont);
      cont.appendChild(list);
      cont.appendChild(button);
      cont.appendChild(input);
      button.addEventListener("click", function handleClick() {
        const tick = document.createElement('button');
        const edit = document.createElement('button');
        const remove = document.createElement('button');
        const newtd = document.createElement('li');
        const req = input.value;
        tick.innerHTML= "Done!";
        edit.innerHTML= "Edit";
        remove.innerHTML= "X";
        newtd.innerHTML = req;
        if(req!=""){
        list.appendChild(newtd);
        newtd.appendChild(tick);
        newtd.appendChild(edit);
        newtd.appendChild(remove);
        input.value="";
        }
      });
      listbuttons = list.getElementsByTagName("button");
      listbuttons.addEventListener("click", event => {
        console.log(listbuttons);
    });
    });