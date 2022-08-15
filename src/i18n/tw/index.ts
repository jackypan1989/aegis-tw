import type { Translation } from '../i18n-types'

const tw: Translation = {
  SCHEMA: {
    TYPE: {
      PROFILE: {
        EMAIL: '電子郵件',
        USERNAME: '帳戶',
        FULLNAME: '全名',
        ROLES: '職能角色',
        MARKETS: '關注市場'
      },
      POST: {
        URL: '網址',
        TITLE: '標題'
      }
    }
  },
  COMPONENT: {
    NAVBAR: {
      NEWS: '新聞',
      JOBS: '徵才',
      SOCIAL: '社群',
      SIGN_IN: '登入'
    },
    FOOTER: {
      ABOUT: '關於',
      PRIVACY: '隱私'
    },
    BUTTON: {
      SUBMIT: '送出',
      UPDATE: '更新',
      SIGN_OUT: '登出',
      SEARCH: '搜索',
      LOAD_MORE: '讀取更多'
    },
    COMMENT_LIST: {
      TITLE: '評論'
    }
  },
  PAGE: {
    PROFLIE: {
			LIST: {
				TITLE: '尋找夥伴',
				FILTER: {
					TITLE: '篩選器'
				}
			}
		},
    POST: {
      CREATE: {
        TITLE: '新增文章',
        NOTE: '標題包含 Job 或 徵才 之文章將會收錄於徵才版塊'
      }
    }
  },
  MISC: {
    YOU_NEED_TO_SIGN_IN_FIRST: '你必須要先登入',
    NO_MATCHED_RESULT: '無搜索對應結果'
  }
}

export default tw