import type { BaseTranslation } from '../i18n-types'

const en: BaseTranslation = {
	SCHEMA: {
		TYPE: {
			PROFILE: {
				EMAIL: 'Email',
				USERNAME: 'Username',
				FULLNAME: 'Fullname',
				ROLES: 'Roles',
				MARKETS: 'Markets'
			},
			POST: {
				URL: 'Url',
				TITLE: 'Title'
			}
		},
	},
	COMPONENT: {
		NAVBAR: {
			NEWS: 'News',
			JOBS: 'Jobs',
			SOCIAL: 'SOCIAL',
			SIGN_IN: 'Sign In'
		},
		FOOTER: {
			ABOUT: 'About',
			PRIVACY: 'Privacy'
		},
		BUTTON: {
			SUBMIT: 'Submit',
			UPDATE: 'Update',
			SEARCH: 'Search',
			LOAD_MORE: 'Load More',
			SIGN_OUT: 'Sign Out'
		},
		COMMENT_LIST: {
      TITLE: 'Comments'
    }
	},
	PAGE: {
		PROFLIE: {
			LIST: {
				TITLE: 'Search Partner',
				FILTER: {
					TITLE: 'Profile Filter'
				}
			}
		},
		POST: {
      CREATE: {
        TITLE: 'Create Post',
				NOTE: 'Title contains "Job" or "徵才" will be curated in Jobs tab.'
      }
    },
	},
	MISC: {
		YOU_NEED_TO_SIGN_IN_FIRST: 'You need to sign in first.',
		NO_MATCHED_RESULT: 'No matched result.'
	}
}

export default en
