let btn=document.getElementById("btn");
let div=document.getElementById("div");
let body=document.getElementsByTagName("body");
let pname=document.getElementById("name");
let pdesc=document.getElementById("quantity");
let pprice=document.getElementById("price");
let clear=document.getElementById("clear");

let infos=[];

btn.onclick=function(){
    
    let info={};
    info.name=pname.value;
    info.desc=pdesc.value;
    info.price=pprice.value;

    
    Add(info);
    if(localStorage.getItem('data')){
        infos=JSON.parse(localStorage.getItem('data'));
    }
    infos.push(info);
    localStorage.setItem('data',JSON.stringify(infos));
}

let a=document.createElement("div");
body[0].append(a);

function Add(info){
    
    let div1 = document.createElement("div");
    div1.classList.add("entry");

    let span1 = document.createElement("span");
    let p1 = document.createElement("p");
    p1.innerHTML = info.name;

    let span2 = document.createElement("span");
    let p2 = document.createElement("p");
    p2.innerHTML = info.desc;

    let span3 = document.createElement("span");
    let p3 = document.createElement("p");
    p3.innerHTML = info.price;

    let span4 = document.createElement("span");
    let button1 = document.createElement("button");
    button1.innerHTML = "Update";
    button1.classList.add("update-button");
    let button2 = document.createElement("button");
    button2.innerHTML = "Delete";
    button2.classList.add("delete-button");

    span1.classList.add("entry-info");
    span2.classList.add("entry-info");
    span3.classList.add("entry-info");
    span4.classList.add("entry-actions");

    span1.append(p1);
    span2.append(p2);
    span3.append(p3);

    span4.append(button1, button2);

    div1.append(span1, span2, span3, span4);
    a.append(div1);

    button1.onclick = () => {
        let updateForm = document.createElement("form");
        updateForm.innerHTML = `
            <input type="text" placeholder="Product Name" id="updName" value="${info.name}">
            <input type="text" placeholder="Product Description" id="updDesc" value="${info.desc}">
            <input type="text" placeholder="Product Price" id="updPrice" value="${info.price}">
            <button type="submit">Update</button>
        `;
        div1.appendChild(updateForm);

        updateForm.onsubmit = (e) => {
            e.preventDefault();
            let updName = document.getElementById("updName").value;
            let updDesc = document.getElementById("updDesc").value;
            let updPrice = document.getElementById("updPrice").value;

            p1.innerHTML = updName;
            p2.innerHTML = updDesc;
            p3.innerHTML = updPrice;

            let index = infos.indexOf(info);
            if (index > -1) {
                infos[index].name = updName;
                infos[index].desc = updDesc;
                infos[index].price = updPrice;
                localStorage.setItem('data', JSON.stringify(infos));
            }
            div1.removeChild(updateForm); // Remove the form after update
        };
    };

    button2.onclick = () => {
        a.removeChild(div1);

        let index = infos.indexOf(info);
        if (index > -1) {
            infos.splice(index, 1);
            localStorage.setItem('data', JSON.stringify(infos));
        }
    };

    pname.value = "";
    pdesc.value = "";
    pprice.value = "";
}

document.body.onload=function(){
    if(localStorage.getItem('data')){
        infos=JSON.parse(localStorage.getItem('data'));
        console.log(infos);
        infos.forEach(function(ele){
            Add(ele);
        })
    }
}


clear.onclick=function(){
    localStorage.clear();
    a="";
}


