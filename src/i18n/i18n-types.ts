// This file was auto-generated by 'typesafe-i18n'. Any manual changes will be overwritten.
/* eslint-disable */
import type { BaseTranslation as BaseTranslationType, LocalizedString } from 'typesafe-i18n'

export type BaseTranslation = BaseTranslationType
export type BaseLocale = 'en'

export type Locales =
	| 'en'
	| 'tw'

export type Translation = RootTranslation

export type Translations = RootTranslation

type RootTranslation = {
	SCHEMA: {
		TYPE: {
			PROFILE: {
				/**
				 * Email
				 */
				EMAIL: string
				/**
				 * Username
				 */
				USERNAME: string
				/**
				 * Fullname
				 */
				FULLNAME: string
				/**
				 * Roles
				 */
				ROLES: string
				/**
				 * Markets
				 */
				MARKETS: string
			}
			POST: {
				/**
				 * Url
				 */
				URL: string
				/**
				 * Title
				 */
				TITLE: string
			}
		}
	}
	COMPONENT: {
		NAVBAR: {
			/**
			 * News
			 */
			NEWS: string
			/**
			 * Jobs
			 */
			JOBS: string
			/**
			 * Community
			 */
			COMMUNITY: string
			/**
			 * Sign In
			 */
			SIGN_IN: string
		}
		FOOTER: {
			/**
			 * About
			 */
			ABOUT: string
			/**
			 * Privacy
			 */
			PRIVACY: string
		}
		BUTTON: {
			/**
			 * Submit
			 */
			SUBMIT: string
			/**
			 * Update
			 */
			UPDATE: string
			/**
			 * Search
			 */
			SEARCH: string
			/**
			 * Load More
			 */
			LOAD_MORE: string
			/**
			 * Sign Out
			 */
			SIGN_OUT: string
		}
		COMMENT_LIST: {
			/**
			 * Comments
			 */
			TITLE: string
		}
	}
	PAGE: {
		PROFLIE: {
			LIST: {
				/**
				 * Search Partner
				 */
				TITLE: string
				FILTER: {
					/**
					 * Profile Filter
					 */
					TITLE: string
				}
			}
		}
		POST: {
			CREATE: {
				/**
				 * Create Post
				 */
				TITLE: string
				/**
				 * Title contains "Job" or "徵才" will be curated in Jobs tab.
				 */
				NOTE: string
			}
		}
	}
	MISC: {
		/**
		 * You need to sign in at first.
		 */
		YOU_NEED_TO_SIGN_IN_AT_FIRST: string
		/**
		 * No matched result.
		 */
		NO_MATCHED_RESULT: string
	}
}

export type TranslationFunctions = {
	SCHEMA: {
		TYPE: {
			PROFILE: {
				/**
				 * Email
				 */
				EMAIL: () => LocalizedString
				/**
				 * Username
				 */
				USERNAME: () => LocalizedString
				/**
				 * Fullname
				 */
				FULLNAME: () => LocalizedString
				/**
				 * Roles
				 */
				ROLES: () => LocalizedString
				/**
				 * Markets
				 */
				MARKETS: () => LocalizedString
			}
			POST: {
				/**
				 * Url
				 */
				URL: () => LocalizedString
				/**
				 * Title
				 */
				TITLE: () => LocalizedString
			}
		}
	}
	COMPONENT: {
		NAVBAR: {
			/**
			 * News
			 */
			NEWS: () => LocalizedString
			/**
			 * Jobs
			 */
			JOBS: () => LocalizedString
			/**
			 * Community
			 */
			COMMUNITY: () => LocalizedString
			/**
			 * Sign In
			 */
			SIGN_IN: () => LocalizedString
		}
		FOOTER: {
			/**
			 * About
			 */
			ABOUT: () => LocalizedString
			/**
			 * Privacy
			 */
			PRIVACY: () => LocalizedString
		}
		BUTTON: {
			/**
			 * Submit
			 */
			SUBMIT: () => LocalizedString
			/**
			 * Update
			 */
			UPDATE: () => LocalizedString
			/**
			 * Search
			 */
			SEARCH: () => LocalizedString
			/**
			 * Load More
			 */
			LOAD_MORE: () => LocalizedString
			/**
			 * Sign Out
			 */
			SIGN_OUT: () => LocalizedString
		}
		COMMENT_LIST: {
			/**
			 * Comments
			 */
			TITLE: () => LocalizedString
		}
	}
	PAGE: {
		PROFLIE: {
			LIST: {
				/**
				 * Search Partner
				 */
				TITLE: () => LocalizedString
				FILTER: {
					/**
					 * Profile Filter
					 */
					TITLE: () => LocalizedString
				}
			}
		}
		POST: {
			CREATE: {
				/**
				 * Create Post
				 */
				TITLE: () => LocalizedString
				/**
				 * Title contains "Job" or "徵才" will be curated in Jobs tab.
				 */
				NOTE: () => LocalizedString
			}
		}
	}
	MISC: {
		/**
		 * You need to sign in at first.
		 */
		YOU_NEED_TO_SIGN_IN_AT_FIRST: () => LocalizedString
		/**
		 * No matched result.
		 */
		NO_MATCHED_RESULT: () => LocalizedString
	}
}

export type Formatters = {}
