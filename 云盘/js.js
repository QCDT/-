{
    let contentLeft = document.querySelector(".contentLeft");
    let nav = document.querySelector(".nav");
    let file = document.querySelector(".file");
    let fileBox = document.querySelector(".files")
    let checkedAll = document.querySelector(".navs i")

    let topPid = -1;
    let id = 0
    nav.innerHTML = createTopnav(id);//··········顶部导航生成
    contentLeft.innerHTML = createnav(topPid,2);//·········左侧导航的生成
    file.innerHTML = createfile(id);//·········文件区域的生成
    function getChild(id) {//找到当前项下的所有子级
        return data.filter((item) => (item.pid == id))
    }
    function getSelf(id) {//找到当前项
        let res = data.filter((item) => (item.id == id))
        return res[0]
    }
    function getParent(id){
        let self = getSelf(id);
        return getSelf(self.pid);
    }
    function getParentAll(id) {//找到当前项所有的父祖级
        let parents = [];
        let parent = getParent(id);
        while (parent) {
            parents.unshift(parent);
            parent = getParent(parent.id)
        }
        // console.log(parents)
        return parents;
    }
    function getAllchilds(id){
        let child = getChild(id);
       // console.log(child);
        child.forEach((item)=>{
            let itemChild =  getChild(item.id);
            if(itemChild.length > 0){
                child = child.concat(getAllchilds(item.id));
            }
        });
        return child;
    }
    function removeDate(id){
        let self = getSelf(id);
        let childs = getAllchilds(id);
        childs.push(self);
        data =  data.filter((item)=>!childs.includes(item));
    }
    function testName(id,newName, pid){//··········重命名的检测
        let child = getChild(pid);
        return child.some((item)=>{
            return item.title == newName&&item.id != id;
        })
    }
    //······························左侧导航的生成
    function createnav(id) {
        let child = getChild(id);     
        let inner = `<ul>`
        child.forEach((item) => {
            let itemchild = getChild(item.id);
            inner += `
                <li class="${id==-1?"open":""}" >
                    <p data-id=${item.id}>
                        ${itemchild.length > 0 ? `<img src="img/arrow-close.png" class="arrow">` : "<em></em>"}
                        ${itemchild.length > 0 ? `<img src="img/folder-open.png">` : `<img src="img/folder-close.png">`}
                        <span>${item.title}</span>
                    </p>
                    ${itemchild.length > 0 ? createnav(item.id) : ""}
                </li>
            `
        })
        inner += "</ul>"
        return inner;
    }
    //···························左侧导航的展开与收缩
    contentLeft.addEventListener("click", function (e) {
        if (e.target.tagName == "SPAN") {
            let p = e.target.parentNode
            let nextElement = p.nextElementSibling
            let arrow = p.querySelector(".arrow")
            let uls = p.parentNode.parentNode.querySelectorAll("ul")
            let arrows = p.parentNode.parentNode.querySelectorAll(".arrow")
            uls.forEach((item,index)=>{
                if(nextElement == item){
                    return;
                }
                item.style.display = "none";
                arrows[index].style.transform = "rotate(0deg)"
            })
            if (nextElement) {
                nextElement.style.display = nextElement.style.display == "block" ? "none" : "block";
            }
            if (arrow) {
                arrow.style.transform = arrow.style.transform == "rotate(90deg)" ? "rotate(0deg)" : "rotate(90deg)";
            }
            checkedAll.classList.remove("checkedAll")
            nav.innerHTML = createTopnav(p.dataset.id);//······顶部导航的重新渲染
            file.innerHTML = createfile(p.dataset.id);//·······文件区域的重新渲染
        }
        if(e.target.tagName == "P"){
            let nextElement = e.target.nextElementSibling
            if (nextElement) {
                nextElement.style.display = nextElement.style.display == "block" ? "none" : "block";
            }
            checkedAll.classList.remove("checkedAll")
            nav.innerHTML = createTopnav(e.target.dataset.id);//······顶部导航的重新渲染
            file.innerHTML = createfile(e.target.dataset.id);//·······文件区域的重新渲染
        }
    })
    //····························顶部导航生成
    function createTopnav(id) {
        let topinner = "";
        let self = getSelf(id);
        if (id == 0) {
            topinner = `<span class="active" data-id = 0>微云</span>`;
            return topinner;
        } else {
            let parents = getParentAll(id)
            parents.push(self);
            topinner = parents.map((item) => {
                return `<span><a href="javascript:;" data-id=${item.id}>${item.title}</a></span>`
            })
            topinner[parents.length - 1] = `<span class="active" data-id=${parents[parents.length - 1].id}>${parents[parents.length - 1].title}</span>`
            topinner = topinner.join("<img src='img/path-arrow.png'>")
        }
        return topinner
    }
    //·························顶部区域的点击事件
    nav.addEventListener("click", function (e) {
        if (e.target.tagName == "A") {
            let p = contentLeft.querySelectorAll("p");
            p.forEach((item) => {
                if (item.dataset.id == e.target.dataset.id) {
                    let nextElement = item.nextElementSibling.querySelectorAll("ul");
                    let arrows = item.nextElementSibling.querySelectorAll(".arrow")
                    nextElement.forEach((item) => {
                        item.style.display = "none";
                    });
                    arrows.forEach((item) => {
                        item.style.transform = "rotate(0deg)";
                    });
                }
            })//········左侧导航的同步变化
            checkedAll.classList.remove("checkedAll")
            nav.innerHTML = createTopnav(e.target.dataset.id);
            file.innerHTML = createfile(e.target.dataset.id);
        }
    })
    //········································文件区域的生成
    function createfile(id) {
        let child = getChild(id)
        let noFile = document.querySelector(".noFile")

        if (child.length == 0) {
            noFile.style.display = "block"
        } else {
            noFile.style.display = "none"
        }
        let inner = ""
        child.forEach((item) => {
            inner += `
            <li data-id =${item.id}>
                <i></i>
                <img src="img/icon-folder.png" data-id=${item.id}>
                <p>
                    <span>${item.title}</span>
                    <input type="text">
                </p>
            </li>
            `
        })
        return inner
    }
    //·····································文件区域的点击事件
    file.addEventListener("click", function (e) {
        if(e.target.tagName == "I") {//················选中,全选
            e.target.classList.toggle("checked")
            let checkeds = file.querySelectorAll(".checked")
            let list = file.querySelectorAll("li");
            if(checkeds.length == 0) return;
            if (checkeds.length == list.length) {
                checkedAll.classList.add("checkedAll");
            } else {
                checkedAll.classList.remove("checkedAll")
            }
        }
    })
    file.addEventListener("dblclick", function (e) {
        if(e.target.tagName === "IMG"){
            let p = contentLeft.querySelectorAll("p");
            let noFile = document.querySelector(".noFile")
            p.forEach((item) => {
                if (item.dataset.id == e.target.dataset.id) {
                    let nextElement = item.nextElementSibling;
                    let arrow = item.parentNode.querySelector(".arrow")
                    if (nextElement) {
                        nextElement.style.display = "block";
                    }
                    if (arrow) {
                        arrow.style.transform = "rotate(90deg)";
                    }
                }
            })//········左侧导航的同步变化
            if(e.target.dataset.id) {
                file.innerHTML = createfile(e.target.dataset.id);
                noFile.style.display = "none"
            }else {
                noFile.style.display = "block"
            }
            checkedAll.classList.remove("checkedAll")
            nav.innerHTML = createTopnav(e.target.dataset.id);//······顶部导航的重新渲染
            file.innerHTML = createfile(e.target.dataset.id);//·······文件区域的重新渲染
        }
        if(e.target.tagName === "SPAN"){//···············重命名
            let li = e.target.parentNode.parentNode;
            console.log(li);
            rename(li)
        }
    })
    function rename(li){//···················重命名
        let span = li.querySelector("span");
        let input = li.querySelector("input");
        let activeid = li.dataset.id
        let self = getSelf(activeid);
        input.value = span.innerHTML
        span.style.display = "none";
        input.style.display = "block";
        input.select();
        input.onblur =function(){
            let newName = input.value.trim();
            if(!newName){
                alertFail("名字不能为空")
                input.focus();
            }else if(testName(activeid,newName,self.pid)){
                alertFail("该名称已存在")
                input.focus();
            }else{
                if(self.title == newName){
                    span.style.display = "block";
                    input.style.display = "none"
                }else{
                    self.title = newName
                    file.innerHTML = createfile(getParent(activeid).id);
                    contentLeft.innerHTML = createnav(topPid);
                    alertSucceed("重命名成功")
                    let p = contentLeft.querySelectorAll("p");
                    p.forEach((item) => {
                        if (item.dataset.id == getParent(activeid).id) {
                            let nextElement = item.nextElementSibling
                            let arrow = item.querySelector(".arrow")
                            if (nextElement) {
                                nextElement.style.display = "block";
                            }
                            if (arrow) {
                                arrow.style.transform = "rotate(90deg)";
                            }
                        }
                    })//········左侧导航的同步变化
                }
            }
        }

    }
    //·······························确定按钮的点击
    let confirm = document.querySelector(".confirm")
    let button = confirm.querySelectorAll("button")
    let i = confirm.querySelector("i")
    let mask = document.querySelector(".mask")
    // let isRemove = false
    i.addEventListener("click",function(){
        confirm.style.display ="none";
        mask.style.display = "none";
    })
    i.addEventListener("mouseover",function(){
        i.style.transform = "rotate(360deg)";
        i.style.transition = "1s";
    })
    i.addEventListener("mouseout",function(){
        i.style.transform = "rotate(0deg)";
        i.style.transition = "1s";
    })
    button[1].addEventListener("click",function(){
        confirm.style.display ="none";
        mask.style.display = "none";
    })
    function delFunc(info,cb){
        confirm.style.display ="block";
        mask.style.display = "block";
        button[0].onclick = function(){
            confirm.style.display ="none";
            mask.style.display = "none";
            cb();
        }
    }
    //·············移动到的弹窗
    let choosePosition = document.querySelector(".choosePosition")
    let center = choosePosition.querySelector(".center")
    let close =  choosePosition.querySelector(".top img")
    let btn = choosePosition.querySelectorAll("button")
    let parent_id = 0
    center.innerHTML = createnav(topPid);
    center.addEventListener("click",function(e){
        let item
        if(e.target.tagName=="SPAN" || e.target.tagName=="IMG"){
            item = e.target.parentNode
        }
        if(e.target.tagName == "P"){
            item = e.target
        }
        parent_id = item.dataset.id
        let p = center.querySelectorAll("p");
        p.forEach((item)=>{
            item.style.background = "";
        })
        item.style.background = "yellow";
    })
    close.onclick = function(){
        choosePosition.style.display = "none"
        mask.style.display = "none"
    }
    btn[1].onclick = function(){
        choosePosition.style.display = "none"
        mask.style.display = "none"
    }

    //·······························右键菜单
    let target_El = null;
    let list = document.querySelector(".list");
    list.addEventListener("click",function(e){
        e.cancelBubble = true;
        let item
        if(e.target.tagName == "SPAN"){
            item = e.target.parentNode
        }else if(e.target.tagName == "LI"){
            item = e.target
        }
        if(item){
            switch(item.className){
                case "del":
                    delFunc("确定要删除这个文件夹吗",function(e){
                        let parent = getParent(target_El.dataset.id)
                        removeDate(target_El.dataset.id)
                        contentLeft.innerHTML = createnav(topPid);
                        file.innerHTML = createfile(parent.id);
                        let parents = getParentAll(parent.id)
                        parents.push(parent);
                        console.log(parents);
                        let p = contentLeft.querySelectorAll("p");
                        parents.forEach((item)=>{
                            p.forEach((i)=>{
                                if(item.id == i.dataset.id){
                                    let li = i.parentNode
                                    li.classList.add("open")
                                }
                            })
                        })
                        alertSucceed("删除文件成功")
                    })
                    break;
                case "move":
                    choosePosition.style.display = "block"
                    btn[0].onclick = function(){
                        let parent = getParent(target_El.dataset.id)
                        if(parent_id == parent.id){
                            alertFail("请选择移动位置")
                            return;
                        }
                        if(target_El.dataset.id == parent_id){
                            alertFail("不能移动到自己")
                            return;
                        }
                        let childs = getAllchilds(target_El.dataset.id)
                        childs.forEach((item)=>{
                            if(item.id == parent_id){
                                alertFail("不能移动到子级")
                                return
                            }
                        })
                        let self = getSelf(target_El.dataset.id)
                        self.pid = parent_id
                        nav.innerHTML = createTopnav(parent.id);//··········顶部导航生成
                        contentLeft.innerHTML = createnav(topPid);//·········左侧导航的生成
                        file.innerHTML = createfile(parent.id);//·········文件区域的生成
                        choosePosition.style.display = "none"
                        alertSucceed("移动文件成功")
                    }
                    break;
                case "ren":
                    rename(target_El);
                    break;  
            }
            list.style.display = "none";
        }
    })  
    fileBox.addEventListener("contextmenu" ,function(e){
        e.preventDefault();
        let item
        if(e.target.tagName == "LI"){
            item = e.target
        }else if(e.target.tagName == "IMG"
        || e.target.tagName == "I"
        || e.target.tagName == "P"){
            item = e.target.parentNode;
        }else if(e.target.tagName == "SPAN"){
            item = e.target.parentNode.parentNode
        }
        if(item){
            target_El = item;
            list.style.display = "block"
            list.style.left = e.clientX +"px"
            list.style.top = e.clientY +"px"
        }
    })
    document.addEventListener("click",function(){
        list.style.display = "none";
    })
    //··································框选，全选
    document.addEventListener("selectstart",function(e){
        e.preventDefault();
    })
    document.addEventListener("dragstart",function(e){
        e.preventDefault();
    })
    let startClient = {};
    let box = null;
    let isDown = false;
    fileBox.addEventListener("mousedown", function (e) {
        if(e.button == 0){
            if(e.target.tagName === "DIV"){
                startClient = {
                    x: e.clientX,
                    y: e.clientY
                }
                isDown = true;
                box = document.createElement("div");
                box.className = "box";
                // e.preventDefault();
            }
        }
    })
    document.addEventListener("mousemove", function (e) {
        if (!isDown) {
            return;
        }
        let li = file.querySelectorAll("li");
        if(li.length == 0)return;
        let nowClient = {
            x: e.clientX,
            y: e.clientY
        }
        let l = Math.min(nowClient.x, startClient.x)
        let t = Math.min(nowClient.y, startClient.y)
        let w = Math.abs(nowClient.x - startClient.x)
        let h = Math.abs(nowClient.y - startClient.y)
        if (l < fileBox.offsetLeft) {
            l = fileBox.offsetLeft
            w = Math.abs(startClient.x - fileBox.offsetLeft)
        } else if (w > fileBox.getBoundingClientRect().right - fileBox.offsetLeft) {
            w = fileBox.getBoundingClientRect().right - fileBox.offsetLeft
        }
        if (t < fileBox.offsetTop) {
            t = fileBox.offsetTop
            h = Math.abs(startClient.y - fileBox.offsetTop)
        } else if (h > fileBox.getBoundingClientRect().bottom - fileBox.offsetTop) {
            h = fileBox.getBoundingClientRect().bottom - fileBox.offsetTop
        }
        fileBox.appendChild(box);
        css(box, "width", w)
        css(box, "height", h)
        css(box, "left", l)
        css(box, "top", t)
     
        let checkeds = file.querySelectorAll(".checked")
        li.forEach((item) => {
            let i = item.querySelector("i")
            if (isBoon(item, box)) {
                i.classList.add("checked")
            } else {
                i.classList = "";
            }
        })
        if (checkeds.length == li.length) {
            checkedAll.classList.add("checkedAll");
        } else {
            checkedAll.classList.remove("checkedAll")
        }
    })
    document.addEventListener("mouseup", function () {
        if (!isDown) {
            return
        }
        if (fileBox.children.length > 2) {
            fileBox.removeChild(box);
        }
        isDown = false;
    })
    function isBoon(el, el2) {
        let rect1 = el.getBoundingClientRect();
        let rect2 = el2.getBoundingClientRect();
        if (rect1.left > rect2.right
            || rect2.left > rect1.right
            || rect1.top > rect2.bottom
            || rect2.top > rect1.bottom) {
            return false;
        }
        return true;
    }
    checkedAll.addEventListener("click", function () {//··················全选按钮的点击
        checkedAll.classList.toggle("checkedAll");
        let li = file.querySelectorAll("li");
        li.forEach((item) => {
            let i = item.querySelector("i")
            if (checkedAll.className == "checkedAll") {
                i.classList.add("checked")
            } else {
                i.classList.remove("checked");
            }
        })
    })
    //·······························新建文件
    let newFolder = document.querySelector(".newFolder");
    let nowId = 0
    newFolder.addEventListener("click", function () {
        let span = document.querySelectorAll(".nav span");
        span.forEach((item) => {
            if (item == span[span.length - 1]) {
                nowId = item.dataset.id
            }
        })
        let newfile = {
            id: Date.now(),
            pid: nowId,
            title: getName(nowId)
        }
        data.push(newfile);
        contentLeft.innerHTML = createnav(topPid);//·········左侧导航的生成
        file.innerHTML = createfile(nowId);//·········文件区域的生成
        let parents = getParentAll(nowId)
        parents.push(getSelf(nowId));
        console.log(parents);
        let p = contentLeft.querySelectorAll("p");
        parents.forEach((item)=>{
            p.forEach((i)=>{
                if(item.id == i.dataset.id){
                    let li = i.parentNode
                    li.classList.add("open")
                }
            })
        })
        alertSucceed("新建文件成功");
    })
    function getName(nowId) {//················新建文件夹的命名
        let child = getChild(nowId);
        let names = child.map((item) => item.title)
        names = names.filter((item) => {
            if (item == "新建文件夹") {
                return true;
            }
            let start = item.substr(0, 6);
            let nub = item.substring(6, item.length - 1);
            let end = item.substr(item.length - 1)
            if (start === "新建文件夹("
                && Number(nub) > 1
                && parseInt(nub) + "" === nub
                && end === ")") {
                return true
            }
            return false
        })
        names.sort((n1, n2) => {
            n1 = n1 == "新建文件夹" ? 1 : Number(n1.substring(6, n1.length - 1));
            n2 = n2 == "新建文件夹" ? 1 : Number(n2.substring(6, n2.length - 1));
            return n1- n2
        })
        if (names[0] !== "新建文件夹") {
            return "新建文件夹"
        }
        for(let i = 1; i < names.length; i++){
            if(names[i] != "新建文件夹("+(i+1)+")"){
                console.log(11111)
                return "新建文件夹("+(i+1)+")";
            }
        }
        return "新建文件夹("+(names.length+1)+")";
    }
    //·························批量删除文件夹
    let deleteEl = document.querySelector(".delete")
    deleteEl.addEventListener("click",function(){
        let checked = file.querySelectorAll(".checked");
        if(checked.length == 0){
            return alertFail("请选择文件");
        }else{
            delFunc("确定要删除这个文件夹吗",function(e){
                // console.log(target_El);
                let parent = null
                checked.forEach((item)=>{
                    parent = getParent(item.parentNode.dataset.id)
                    removeDate(item.parentNode.dataset.id)
                    // console.log(parent);
                })
                contentLeft.innerHTML = createnav(topPid);
                file.innerHTML = createfile(parent.id);
                alertSucceed("删除文件成功")
            })
        }
    })
    //·························批量移动文件夹
    let moveEl = document.querySelector(".move");
    moveEl.addEventListener("click",function(){
        let checked = file.querySelectorAll(".checked");
        console.log(checked);
        if(checked.length == 0){
            return alertFail("请选择文件");
        }else{
           choosePosition.style.display = "block"
           btn[0].onclick = function(){
               checked.forEach((item)=>{
                   let parent = getParent(item.parentNode.dataset.id)
                   if(parent_id == item.parentNode.dataset.id){
                       alertFail("不能移动到自己");
                       return;
                   }
                   if(parent_id == parent.id){
                    alertFail("请选择移动位置");
                    return;
                   }
                   let childs = getAllchilds(item.parentNode.dataset.id)
                   childs.forEach((child)=>{
                       if(child.id == item.parentNode.dataset.id){
                        alertFail("不能移动到子级");
                        return;
                       }
                   })
                   let self = getSelf(item.parentNode.dataset.id);
                   self.pid = parent_id
                   nav.innerHTML = createTopnav(parent.id);//··········顶部导航生成
                   contentLeft.innerHTML = createnav(topPid);//·········左侧导航的生成
                   file.innerHTML = createfile(parent.id);//·········文件区域的生成
                   choosePosition.style.display = "none"
                   alertSucceed("移动文件成功")
               })

           }
        }
    })
    //·····················信息提示框
    let succeed = document.querySelector(".succeed");
    let fail = document.querySelector(".fail");
    function alertSucceed(info){//·····················成功提示
        let text = succeed.querySelector("span")
        text.innerHTML = info
        succeed.style.display = "block";
        setTimeout(function(){
            succeed.style.display = "none";
        },1000)
    }
    function alertFail(info){//·····················失败提示
        let text = fail.querySelector("span")
        text.innerHTML = info
        fail.style.display = "block";
        setTimeout(function(){
            fail.style.display = "none";
        },1000)
    }
}
