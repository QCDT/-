
import newSong from '@/views/newsong';
import rank from '@/views/rank';
import list from '@/views/list';
import singer from '@/views/singer';
import nav from '@/components/nav';

export const navBar=[
    {
      path: "/",
      name: "newsong",
      title:'新歌',
      components:{
        default:newSong,
        navbar:nav
      }
    },
    {
      path: "/rank",
      name: "rank",
      title:'排行',
      components:{
        default:rank,
        navbar:nav
      }
    },
    {
      path: "/list",
      name: "list",
      title:'歌单',
      components:{
        default:list,
        navbar:nav
      }
    },
    {
      path: "/singer",
      name: "singer",
      title:'歌手',
      components:{
        default:singer,
        navbar:nav
      }
    }
  ];
  