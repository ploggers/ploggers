export const carouselDummy = [
  {
    id: 1,
    path: require('../../assets/images/banners/banner1.jpg'),
  },
  {
    id: 2,
    path: require('../../assets/images/banners/banner2.jpg'),
  },
  {
    id: 3,
    path: require('../../assets/images/banners/banner3.jpg'),
  },
];

export const members = [
  { name: '권혁준', role: '관리자' },
  { name: '이영빈', role: '구성원' },
  { name: '김홍엽', role: '구성원' },
  { name: '장수용', role: '구성원' },
];

export const badgeDummy = [
  {
    id: 1,
    src: require('@assets/images/badges/badge1.png'),
    name: '북악산 배지',
    desc: '2021년 북악산 플로깅 이벤트에 참여한 크루에게 주어지는 배지입니다.',
  },
  {
    id: 2,
    src: require('@assets/images/badges/badge2.png'),
    name: '50km 배지',
    desc: '50km 거리를 달성한 크루에 주어지는 배지입니다.',
  },
  {
    id: 3,
    src: require('@assets/images/badges/badge3.png'),
    name: '100km 배지',
    desc: '100km 거리를 달성한 크루에 주어지는 배지입니다.',
  },
];
export const teamInfo = {
  name: '피포피포',
  town: '마포구',
  school: '서강대학교',
  announcement:
    '다음주에 정모가 예정되어 있습니다. 일정 확인하시고 꼭 참여해주세요! :)',
  desc: '마포구에서 활동하는 서강대학교 학생들의 크루입니다.',
  users: members,
  score: 940,
  badges: badgeDummy,
  leader: {
    id: 1,
    name: '김쓰줍',
  },
};


export const homeContentDummy = [
  {
    id: 1,
    title: '연말 북악산 플로깅 이벤트',
    date: '2021.11.14 ~ 12.31',
    content: '따뜻한 연말, 북안산에서 함께 플로깅 해요!',
    path: require('../../assets/images/thumbnails/thumbnail1.jpg'),
  },
  {
    id: 2,
    title: '공간을 재생하다, 플레이수퍼빈',
    date: '2021.12.01 ~ 12.25',
    content: '12월 01일 COMING SOON! 수퍼빈의 첫번째 플래그쉽 스토어',
    path: require('../../assets/images/thumbnails/thumbnail2.jpg'),
  },
  {
    id: 3,
    title: '이달의 크루 인터뷰',
    date: '2021.11.11 ~ 11.25',
    content: '4명의 플로거스가 들려주는 이야기',
    path: require('../../assets/images/thumbnails/thumbnail3.jpg'),
  },
];

export const EventDummy = [
  {
    id: 1,
    title: '연말 북악산 플로깅 이벤트',
    date: '2021.11.14 ~ 12.31',
    content: '따뜻한 연말, 북안산에서 함께 플로깅 해요!',
    path: require('../../assets/images/thumbnails/thumbnail1.jpg'),
  },
  {
    id: 2,
    title: '공간을 재생하다, 플레이수퍼빈',
    date: '2021.12.01 ~ 12.25',
    content: '12월 01일 COMING SOON! 수퍼빈의 첫번째 플래그쉽 스토어',
    path: require('../../assets/images/thumbnails/thumbnail2.jpg'),
  },
];

export const Details = [
  {
    id: 1,
    path: require('../../assets/images/details/detail1.jpg'),
  },
  {
    id: 2,
    path: require('../../assets/images/details/detail2.jpg'),
  },
  {
    id: 2,
    path: require('../../assets/images/details/detail3.jpg'),
  },
];

export const NewsDummy = [
  {
    id: 1,
    title: '이달의 크루 인터뷰',
    date: '2021.11.14',
    content: '4명의 플로거스가 들려주는 이야기',
    path: require('../../assets/images/banners/banner3.jpg'),
  },
];

export const crewData = [
  {
    id: 1,
    color: 'green',
    name: '피포피포',
    ranking: 1,
    town: '마포구',
    university: '서강대학교',
    path: require('../../assets/images/crews/crew1.jpg'),
    score: 1250,
  },
  {
    id: 2,
    color: 'orange',
    name: 'NGFamily',
    ranking: 2,
    town: '파주시',
    university: ' ',
    path: require('../../assets/images/crews/crew2.jpg'),
    score: 900,
  },
  {
    id: 3,
    color: 'pink',
    name: '아토하우스',
    ranking: 3,
    town: '고양시',
    university: ' ',
    path: require('../../assets/images/crews/crew3.jpg'),
    score: 456,
  },
];

export const universityData = [
  {
    id: 1,
    color: 'green',
    name: '단국대학교',
    ranking: 1,
    town: '수지구',
    university: '단국대학교',
    uri: 'https://placeimg.com/300/300/4',
    score: 256,
  },
  {
    id: 5,
    color: 'orange',
    name: '연세대학고',
    ranking: 2,
    town: '서대문구',
    university: '연세대학교',
    uri: 'https://placeimg.com/300/300/5',
    score: 200,
  },
  {
    id: 6,
    color: 'pink',
    name: '서강대학교',
    ranking: 3,
    town: '마포구',
    university: '서강대학교',
    uri: 'https://placeimg.com/300/300/6',
    score: 150,
  },
];