export type ReviewTopic = {
  title: string
  note?: string
}

export type ReviewMaterial = {
  label: string
  url?: string
}

export type ReviewSession = {
  id: string
  code: string
  date: string
  time?: string
  venue: string
  summary: string
  topics: readonly ReviewTopic[]
  materials?: readonly ReviewMaterial[]
}

export const reviewSessions: readonly ReviewSession[] = [
  {
    id: '2026-09-23',
    code: '01',
    date: '2026. 9. 23. (수)',
    venue: '미래관 232호',
    summary:
      '오버워치의 로드호그와 솜브라 리워크안을 중심으로, 플레이어가 겪는 위기 대응 난이도를 어떻게 설계하고 조절할지 다뤘습니다.',
    topics: [
      {
        title: '유저가 겪는 위기 대응 난이도 조절',
        note: '오버워치 로드호그 · 솜브라 리워크안 중심',
      },
    ],
  },
  {
    id: '2026-10-28',
    code: '02',
    date: '2026. 10. 28. (수)',
    time: '18:10',
    venue: '미래관 232호',
    summary:
      '캐릭터 디자인의 핵심 고민과 AI 시대 인디게임의 방향성을 주제로 두 가지 발표를 진행했습니다.',
    topics: [
      {
        title: '캐릭터 디자인에 대한 이야기',
      },
      {
        title: 'AI 시대의 인디게임, 이대로 괜찮은가',
      },
    ],
  },
  {
    id: '2026-11-04',
    code: '03',
    date: '2026. 11. 4. (수)',
    time: '18:10',
    venue: '미래관 445호',
    summary:
      '이전 피드백을 바탕으로 매칭 시스템의 실제 설계와 유저가 체감하는 경험 사이의 괴리를 한층 깊게 파고들었습니다.',
    topics: [
      {
        title: '매칭조작론과 시스템, 유저 체감의 괴리',
        note: '피드백 반영 심화 발표',
      },
    ],
  },
  {
    id: '2026-11-11',
    code: '04',
    date: '2026. 11. 11. (수)',
    time: '18:10',
    venue: '미래관 445호',
    summary:
      '미래관 445호에서 진행된 정기 모임입니다. 발표 주제와 세부 내용, PPT 자료는 정리 후 업데이트될 예정입니다.',
    topics: [],
  },
  {
    id: '2026-11-18',
    code: '05',
    date: '2026. 11. 18. (수)',
    time: '18:10',
    venue: '미래관 447호',
    summary:
      '미래관 447호에서 진행된 정기 모임입니다. 발표 주제와 세부 내용, PPT 자료는 정리 후 업데이트될 예정입니다.',
    topics: [],
  },
]
