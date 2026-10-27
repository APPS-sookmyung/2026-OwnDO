export const EMOTIONS = [
  { 
    id: 'JOYFUL', 
    label: '기쁨', 
    emoji: '🥰',
    aiMessage: '"가슴 벅차게 기분 좋은 오늘! 이 반짝이는 행복한 기억들이 앞으로의 당신을 밝게 비춰줄 거예요."',
    tags: ['#행복한하루', '#웃음가득', '#반짝이는기억'],
    colors: {
      gradientStart: '#F7D694',
      gradientEnd: '#FDF2DB',
      mainText: '#664F1F',
      subText: '#8C7747',
      accent: '#E6B85C'
    }
  },
  { 
    id: 'PROUD', 
    label: '뿌듯', 
    emoji: '😊',
    aiMessage: '"작은 발걸음이 모여 큰 길을 만들듯, 오늘 하루 알차게 보낸 스스로에게 듬뿍 칭찬해 주고 싶어요."',
    tags: ['#오늘도성장중', '#뿌듯한하루', '#스스로칭찬해'],
    colors: {
      gradientStart: '#F1B7A6',
      gradientEnd: '#F8D6BA',
      mainText: '#5A403A',
      subText: '#82665F',
      accent: '#D98F7C'
    }
  },
  { 
    id: 'CALM', 
    label: '평온', 
    emoji: '😌',
    aiMessage: '"잔잔한 물결처럼 고요하게 흘러간 오늘. 바쁜 일상 속에서 마주한 이 작은 평온함이 참 소중해요."',
    tags: ['#소소한행복', '#내마음의평화', '#잔잔한하루'],
    colors: {
      gradientStart: '#BFDBC8',
      gradientEnd: '#DCEBE7',
      mainText: '#365047',
      subText: '#667C74',
      accent: '#89B39D'
    }
  },
  { 
    id: 'TIRED', 
    label: '지침', 
    emoji: '💨',
    aiMessage: '"지친 마음을 달래기 위해 온전히 쉬어간 하루. 나에게 필요한 휴식을 듬뿍 선물해 준 날이에요."',
    tags: ['#나를위한휴식', '#에너지충전', '#마음돌봄'],
    colors: {
      gradientStart: '#B8CAD8',
      gradientEnd: '#DED9D1',
      mainText: '#3E4B54',
      subText: '#69757D',
      accent: '#8BA5B5'
    }
  },
  { 
    id: 'ANXIOUS', 
    label: '불안', 
    emoji: '😰',
    aiMessage: '"알 수 없는 내일에 대한 불안함은 누구나 겪는 자연스러운 감정이에요. 오늘 하루도 잘 버텨낸 당신을 안아주세요."',
    tags: ['#괜찮아질거야', '#안심해도돼', '#잘하고있어'],
    colors: {
      gradientStart: '#A8C3C8',
      gradientEnd: '#D6E4E6',
      mainText: '#334C52',
      subText: '#5C747A',
      accent: '#79A3A8'
    }
  },
  { 
    id: 'LONELY', 
    label: '외로움', 
    emoji: '🥺',
    aiMessage: '"때론 텅 빈 것 같은 기분이 들어도, 당신은 결코 혼자가 아니에요. 스스로의 가장 따뜻한 친구가 되어주는 밤이 되길 바랍니다."',
    tags: ['#토닥토닥', '#나만의시간', '#나를사랑하기'],
    colors: {
      gradientStart: '#B0BEE6',
      gradientEnd: '#D9E0F2',
      mainText: '#364366',
      subText: '#606C8C',
      accent: '#869ACF'
    }
  },
  { 
    id: 'UPSET', 
    label: '속상함', 
    emoji: '😥',
    aiMessage: '"내 마음처럼 되지 않아 많이 속상했죠. 억지로 웃지 않아도 괜찮아요. 속상한 마음을 있는 그대로 인정해주는 것도 용기니까요."',
    tags: ['#위로가필요해', '#마음알아주기', '#힘내지않아도괜찮아'],
    colors: {
      gradientStart: '#DDA1B5',
      gradientEnd: '#EED2DB',
      mainText: '#593645',
      subText: '#825F6E',
      accent: '#BF829B'
    }
  },
  { 
    id: 'GUILTY', 
    label: '자책', 
    emoji: '😔',
    aiMessage: '"스스로에게 너무 엄격해지지 마세요. 실수해도 괜찮고, 완벽하지 않아도 당신은 충분히 멋지고 소중한 사람이라는 걸 잊지 말아요."',
    tags: ['#나를용서하기', '#완벽하지않아도돼', '#충분히소중해'],
    colors: {
      gradientStart: '#C0B4D6',
      gradientEnd: '#E1DBEA',
      mainText: '#463B59',
      subText: '#6F6482',
      accent: '#9A89BA'
    }
  },
  { 
    id: 'DEPRESSED', 
    label: '우울', 
    emoji: '😞',
    aiMessage: '"비 갠 뒤의 맑은 하늘처럼, 오늘 흘려보낸 감정들이 내일의 당신을 더 단단하고 눈부시게 만들어 줄 거예요."',
    tags: ['#스스로다독이기', '#내일은맑음', '#충분히잘하고있어'],
    colors: {
      gradientStart: '#B8B4D9',
      gradientEnd: '#DADCEC',
      mainText: '#3F3B59',
      subText: '#696580',
      accent: '#8E87B8'
    }
  },
  { 
    id: 'ANGRY', 
    label: '화남', 
    emoji: '😡',
    aiMessage: '"화가 나는 건 내 마음이 그만큼 무언가를 소중히 여기고 있다는 증거예요. 크게 심호흡하며 놀란 나를 다독여 주세요."',
    tags: ['#감정비우기', '#나를이해하기', '#심호흡'],
    colors: {
      gradientStart: '#F4A2A2',
      gradientEnd: '#FADCD9',
      mainText: '#5C3333',
      subText: '#855C5C',
      accent: '#D97979'
    }
  }
];
