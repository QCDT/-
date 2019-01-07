<template>
<!-- //当前歌曲列表 
    //你点击的歌曲是哪首
-->
    <div>
        <div class="play-bottom" ref="playbox" style="bottom:-3rem;">
            <div class="play-left">
                <img :src="songInfo.imgUrl | imgUrl" alt="" srcset="">
                <p>
                <span>{{songInfo.songName}}</span>
                <span>{{songInfo.singerName}}</span>
                </p>
            </div>
            <div class="play-right">
                <div class="iconfont  icon-prev prev-song"
                
                ></div>
                <div
                class="iconfont play-song" 
                :class="{'icon-bofang':!isPlay,'icon-zanting':isPlay}"
                @touchstart="playorpause"
                ></div>
                <div class="iconfont  icon-next next-song"
                @touchstart="next"
                ></div>      
            </div>
        </div>
        
        <audio ref="audio" preload :src="songInfo.url" ></audio>
        <!-- <play-info 
            :playTop.sync="playTop"
            :songInfo="songInfo"
            @next="next"
            @prev="prev"
            @playorpause="playorpause"
            :isPlay="isPlay"
            :duration="duration"
            :current-time="currentTime"
            @changeCurrentTime="changeCurrentTime"
            :ric="lyric"
        ></play-info> -->
    </div>
</template>
<script>
export default {
    data(){
        return {
            hash:this.$store.state.activeHash,
            list:this.$store.state.list,
            songInfo:{},
            isPlay:false,
            audio:'',
            songIndex:0
        }
    },
    created(){
        console.log(this.$store.state.list);
    },
    watch:{
        '$store.state.list':{
            handler:function(data){
               this.list=data;
            }
        },
        '$store.state.activeHash':{
            handler:function(data){
               this.hash=data;
               this.getSong();
            }
        },
    },
    methods:{
        next(){
            //获取下一首歌的hash
            this.songIndex++;
            if(this.songIndex==this.list.length){
                this.songIndex=0;
            }
            this.$store.commit('updateHash',this.list[this.songIndex].hash);
        },
        getSong(){
            this.$ajax({
                url:'/api/app/i/getSongInfo.php',
                params:{
                    cmd:'playInfo',
                    hash:this.hash
                }
            }).then(({data})=>{
                
                //显示播放器
                this.$refs.playbox.style.bottom=0;

               this.songInfo=data;

                //切换播放状态
                this.isPlay=true;
                this.audio=this.$refs.audio;

                //资源预加载
                this.$refs.audio.addEventListener('loadeddata',()=>{
                    this.$refs.audio.play();
                })

                //获取当前歌曲的下标值
                //歌曲 列表  this.list
                //当前歌曲的hash值  this.hash
                this.songIndex= this.list.findIndex((e)=>{return e.hash==this.hash});
            })
            .catch((err)=>{
                console.log(err);
            })
        },
        playorpause(){
           this.isPlay=!this.isPlay;
           if(this.isPlay){
               this.audio.play();
           }else{
               //暂停
               this.audio.pause();
           }
        }
    }

}
</script>
<style scoped>
    #app .play-bottom {
  width: 100%;
  height: 1.5rem;
  background-color:rgba(5, 5, 5, 0.7);
  position: fixed;
  left: 0;
  bottom: 0;
  overflow: hidden;
  transition: .3s;
  z-index: 9;
}
.play-left {
  width: 55%;
  height: 100%;
  float: left;
  overflow: hidden;
  position:relative;
  box-sizing: border-box;
  display: flex;
}
.play-left img {
  width: 1.5rem;
  float: left;
}
.play-left p {
  margin: auto 0;
  width: 60%;
  color: #fff;
  float: left;
  font-size: .35rem;
  margin-left: .1rem;
}
.play-left p span {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  display: block;
}
.play-left p span:nth-child(2){
  font-size: .3rem;
}
.play-right {
  position:relative;
  float: left;
  width: 40%;
  box-sizing: border-box;
  font-size: 0;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding-right: .1rem;
  height: 100%;
}
.play-right > div {
  font-size: .7rem;
  color: #fff;
}

.play-right > div:active{
  color: #e5e5e5;
}
</style>



