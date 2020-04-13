    let box = document.querySelectorAll(".box");
    let home = document.querySelector("#home")
    let skill = document.querySelector("#skill")
    let about = document.querySelector("#about")
                    home.style.opacity = "1"
                    skill.style.opacity = "1"
                    about.style.opacity = "1"
//幻灯片
{
    var certifySwiper = new Swiper('#certify .swiper-container', {
        watchSlidesProgress: true,
        slidesPerView: 'auto',
        centeredSlides: true,
        loop: true,
        loopedSlides: 5,
        autoplay: true,
        navigation: {
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev',
        },
        // pagination: {
        //     el: '.swiper-pagination',
        //     //clickable :true,
        // },
        on: {
            progress: function(progress) {
                for (i = 0; i < this.slides.length; i++) {
                    var slide = this.slides.eq(i);
                    var slideProgress = this.slides[i].progress;
                    modify = 1;
                    if (Math.abs(slideProgress) > 1) {
                        modify = (Math.abs(slideProgress) - 1) * 0.3 + 1;
                    }
                    translate = slideProgress * modify * 260 + 'px';
                    scale = 1 - Math.abs(slideProgress) / 5;
                    zIndex = 999 - Math.abs(Math.round(10 * slideProgress));
                    slide.transform('translateX(' + translate + ') scale(' + scale + ')');
                    slide.css('zIndex', zIndex);
                    slide.css('opacity', 1);
                    if (Math.abs(slideProgress) > 3) {
                        slide.css('opacity', 0);
                    }
                }
            },
            setTransition: function(transition) {
                for (var i = 0; i < this.slides.length; i++) {
                    var slide = this.slides.eq(i)
                    slide.transition(transition);
                }
    
            }
        }
    
    })
}
//返回顶部
{
    let topBtn = document.querySelector("#topBtn");
    let timer = 0;
    window.onscroll = function(){
        if(document.documentElement.scrollTop >window.innerHeight){
            topBtn.style.display = "block";

        }else{
            topBtn.style.display = "none";
        }
    };
    topBtn.onclick = function(){
        cancelAnimationFrame(timer);
        timer = requestAnimationFrame(move);
        function move(){
            let scrollY = document.documentElement.scrollTop;
            if(scrollY > 0){
                scrollY = scrollY * 0.81;
                document.documentElement.scrollTop = scrollY;
                timer = requestAnimationFrame(move);
            }
        
        }
    }

}
{
    let  s = `妙味课堂是北京最资深的前端开发培训机构，妙味课堂拥有系统的JavaScript、HTML5、CSS3、移动开发、远程培训等课程，并录制成最系统的前端开发视频教程，妙味课堂推出的VIP前端学习平台已经成为学习氛围最浓郁的前端学习圈。在未来几年内，妙味课堂会逐渐发展成由上百位优秀讲师所带领的创业培训团队，这些优秀讲师将是每个培训区域的独立负责人，他们是妙味课堂未来发展道路中最强大的力量。我们希望自己亦或是将来加入妙味的朋友一起，永远秉持以下思维方式：追求卓越但不崇拜权威，反叛创新绝不敷衍妥协；专注严谨摒弃死板生硬，细致耐心我们年复一年。`
    let boxWrap = document.querySelector(".boxWrap");
    let box = boxWrap.querySelector(".box");
    let ring = boxWrap.querySelector(".ring");
    let li = ring.getElementsByTagName("li");
    let table = document.querySelector(".table");
    let text = boxWrap.querySelector(".text");
    let p = text.querySelector("p");
    let close = text.querySelector("span");
    let a = table.querySelectorAll("a");
    let btn = document.querySelector(".btnWrap .btn");
    let num = 0;
    let layer = 0;
    let wordNum = -1;
    let circleArr = [];
    let coneArr = [];
    let coneNum = 0;
    let liNub = 0;
    let r=150;
    let columnH = 0;
    let columnNum = 0;
    let theta = 0;
    let phi = 0;
    let timer1 = null;
    p.innerHTML = s;
    Init();
    function Init(){
        circleArr = [];
        coneArr = [];
        coneNum = 0;
        wordNum = -1;
        liNub = 0;
        theta = 0;
        phi = 0;
        layer = 0;
        num = 0;
        for(let i=4; i<13; i++){
            num = i*i + (i+1)*(i+1);
            if(num >= s.length){
                layer = (i-1)*2+1;
                break;
            }
            layer = (i-1)*2+1;
        }
        for(let i=0; i<layer; i++){
            if(i<(layer+1)/2){
                wordNum+=2;
            }else{
                wordNum-=2;
            }
            circleArr.push(wordNum);
        }
        num = 0;
        for(let i=0; i<circleArr.length; i++){
            theta = Math.PI/circleArr.length;
            phi = 2*Math.PI/circleArr[i];
            for(let j=0; j<circleArr[i]; j++){
                let li = document.createElement('li');
                li.innerHTML = s[num];
                num++;
                drawCircle(li,theta,phi,i,j);
                ring.appendChild(li);
            }
        }
        console.log(li);
        for(let i=0; i<li.length; i++){
            coneNum += 2*i+1;
            if(coneNum>li.length){
                coneNum -= 2*i+1;
                break;
            }
            coneArr.push(2*i+1);
        }

        for(let i=0; i<coneArr.length; i++){
            phi = 2*Math.PI/coneArr[i];
            for(let j=0; j<coneArr[i]; j++){
                drawCone(li[liNub],phi,i,j);
                liNub++;
            }
        }

        liNub = 0;
        columnH = Math.floor(li.length/(circleArr.length-2));
        columnNum = columnH*(circleArr.length-2);
        for(let i=0; i<circleArr.length-1; i++){
            phi = 2*Math.PI/columnH;
            for(let j=0; j<columnH; j++){
                drawColumn(li[liNub],phi,i,j);
                liNub++;
            }
        }
    }
    circle()
    a[0].onclick = function(){
        if(text.style.display == "block"){
            return;
        }
        clearTimeout(timer1);
        startChange();
        timer1 = setTimeout(function(){
            changeCircle();
        },1010)
    }
    a[1].onclick = function(){
        if(text.style.display == "block"){
            return;
        }
        clearTimeout(timer1);
        startChange();
        timer1 = setTimeout(function(){
            changeCone();
        },1010)
    }
    a[2].onclick = function(){
        if(text.style.display == "block"){
            return;
        }
        clearTimeout(timer1);
        startChange();
        timer1 = setTimeout(function(){
            changeColumn();
        },1010)
    }
    btn.onclick = function(){
        startChange();
        text.style.display = "block";
        setTimeout(function(){
            text.style.transform = "scale(1)";
            text.style.opacity = 1;
        },1020)
    }
    close.onclick = function(){
        out();
    }
    function out(){
        text.style.transform = "translateZ(-2000px) rotateX(-180deg)"
        text.style.opacity = "0"
        setTimeout(function(){
            changeCircle();
            text.style.display = "none"
            text.style.transform = "translateZ(0px) scale(2) rotateX(0)"
        },600)
    }
    function startChange(){
        for(let  i=0; i<li.length; i++) {
            li[i].className = 'all';
            li[i].style.transform = `translate3D(${li[i].maxX}px, ${li[i].maxY}px,${li[i].maxZ}px)
                                 rotateY(${li[i].maxPhi}rad)
                                 rotateX(${li[i].maxTheta}rad)
                                `
            li[i].style.opacity = 0;
        }
    }
    function changeCircle(){
        for(var i=0; i<li.length; i++){
            li[i].className = '';
            li[i].maxX = li[i].bigCircleX;
            li[i].maxY = li[i].bigCircleY;
            li[i].maxZ = li[i].bigCircleZ;
            li[i].maxTheta = li[i].circleTheta;
            li[i].maxPhi = li[i].circlePhi;
            li[i].style.transform = `translate3D(${li[i].maxCircleX}px, ${li[i].maxCircleY}px,${li[i].maxCircleZ}px)
                                 rotateY(${li[i].maxPhi}rad)
                                 rotateX(${li[i].maxTheta}rad)
                                `
        }
        setTimeout(function() {
            for (var i = 0; i < li.length; i++) {
                li[i].className = 'one';
                li[i].style.opacity = 1;
                li[i].style.transform = `translate3D(${li[i].circleX}px, ${li[i].circleY}px,${li[i].circleZ}px)
                                    rotateY(${li[i].circlePhi}rad)
                                    rotateX(${li[i].circleTheta}rad)
                                `
            }
        },100);
    }
    function changeCone(){
        for(let  i=0; i<coneNum; i++){
            li[i].className = '';
            li[i].maxX = li[i].bigConeX;
            li[i].maxY = li[i].bigConeY;
            li[i].maxZ = li[i].bigConeZ;
            li[i].maxPhi = li[i].conePhi;
            li[i].maxTheta = li[i].coneTheta;
            li[i].style.transform = `translate3D(${li[i].maxX}px, ${li[i].maxY}px,${li[i].maxZ}px)
                                 rotateY(${li[i].maxPhi}rad)
                                 rotateX(${li[i].maxTheta}rad)
                                `
        }
        setTimeout(function(){
            for(var i=0; i<coneNum; i++){
                li[i].className = 'one';
                li[i].style.opacity = 1;
                li[i].style.transform = `translate3D(${li[i].coneX}px, ${li[i].coneY}px,${li[i].coneZ}px)
                                 rotateY(${li[i].conePhi}rad)
                                 rotateX(${li[i].coneTheta}rad)
                                `
            }
        },100)
    }
    function changeColumn(){
        for(var i=0; i<=columnNum; i++){
            li[i].className = '';
            li[i].maxX = li[i].bigColumnX;
            li[i].maxY = li[i].bigColumnY;
            li[i].maxZ = li[i].bigColumnZ;
            li[i].maxTheta = 0;
            li[i].maxPhi = li[i].columnPhi;
            li[i].style.transform = `translate3D(${li[i].maxX}px, ${li[i].maxY}px,${li[i].maxZ}px)
                                 rotateY(${li[i].maxPhi}rad)
                                 rotateX(${li[i].maxTheta}rad)
                                `
        }
        setTimeout(function(){
            for(var i=0; i<=columnNum; i++){
            li[i].className = 'one';
            li[i].style.opacity = 1;
            li[i].style.transform = `translate3D(${li[i].columnX}px, ${li[i].columnY}px,${li[i].columnZ}px)
                                 rotateY(${li[i].columnPhi}rad)
                                `
            console.log(li[i].columnZ,li[i].columnPhi);
        }
        },100);
    }
    function cone(){
        for(let i=0; i<li.length; i++){
            li[i].style.display = "none";
        }
        for(let i=0; i<coneNum;i++){
        li[i].style.display = "block";
        li[i].style.transform = `translate3D(${li[i].coneX}px, ${li[i].coneY}px,${li[i].coneZ}px)
                                 rotateY(${li[i].conePhi}rad)
                                 rotateX(${li[i].coneTheta}rad)
                                `
        }
    }
    function column(){
        for(let i=0; i<li.length; i++){
            li[i].style.display = "none";
        }
        console.log(columnNum);
        for(let i=0; i<columnNum; i++){
        li[i].style.display = "block"
        li[i].style.transform = `translate3D(${li[i].columnX}px, ${li[i].columnY}px,${li[i].columnZ}px)
                                 rotateY(${li[i].columnPhi}rad)
                                `
        }
    }
    function circle(){
        for(let i = 0; i<li.length; i++){
        li[i].style.transform = `translate3D(${li[i].circleX}px, ${li[i].circleY}px,${li[i].circleZ}px)
                                 rotateY(${li[i].circlePhi}rad)
                                 rotateX(${li[i].circleTheta}rad)
                                `
        }
    }
    function drawColumn(el,phi,i,j){
        el.columnX = r/1.5*Math.sin(phi*j)+200
        el.columnY = (2*r/(circleArr.length-2))*i +50
        el.columnZ = r/1.5*Math.cos(phi*j);
        el.columnPhi = phi*j
        el.bigColumnX = (r+2000)/1.5*Math.sin(phi*j)+200
        el.bigColumnY = (2*(r+2000)/(circleArr.length-2))*i +50-2000
        el.bigColumnZ = (r+2000)/1.5*Math.cos(phi*j);
    }
    function drawCone(el,phi,i,j){
        el.coneX = (2*r/coneArr.length)*i*Math.tan(Math.PI/6)*Math.sin(phi*j)+200
        el.coneY = (2*r/coneArr.length)*i+50
        el.coneZ =  (2*r/coneArr.length)*i*Math.tan(Math.PI/6)*Math.cos(phi*j)
        el.coneTheta = Math.PI/6
        el.conePhi = phi*j
        el.bigConeX = (2*(r+2000)/coneArr.length)*i*Math.tan(Math.PI/6)*Math.sin(phi*j)+200
        el.bigConeY = (2*(r+2000)/coneArr.length)*i+50-2000
        el.bigConeZ =  (2*(r+2000)/coneArr.length)*i*Math.tan(Math.PI/6)*Math.cos(phi*j)
    }
    function drawCircle(el,theta,phi,i,j){
        el.circleX = r*Math.sin(theta*i)*Math.sin(phi*j)+200;
        el.circleY = -r*Math.cos(theta*i)+200;
        el.circleZ = r*Math.sin(theta*i)*Math.cos(phi*j);
        el.circleTheta = theta*(circleArr.length-i) - Math.PI/2
        el.circlePhi = phi*j
        el.bigCircleX = (r+2000)*Math.sin(theta*i)*Math.sin(phi*j)+200;
        el.bigCircleY = -(r+2000)*Math.cos(theta*i)+200;
        el.bigCircleZ = (r+2000)*Math.sin(theta*i)*Math.cos(phi*j);
        el.maxX = el.bigCircleX;
        el.maxY = el.bigCircleY;
        el.maxZ = el.bigCircleZ;
        el.maxTheta = el.circleTheta;
        el.maxPhi = el.circlePhi;
    }
    let angleY = 0;
    let timer = null
    timer =  setInterval(function(){
        angleY++
        box.style.transform =`rotateY(${angleY}deg)`
    },60)
}
