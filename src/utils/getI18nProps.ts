import { GetStaticProps } from "next"
import { Locales } from "../i18n/i18n-types"
import { loadedLocales } from "../i18n/i18n-util"
import { loadLocale } from "../i18n/i18n-util.sync"

export const getI18nProps: GetStaticProps = (context) => {
	const locale = context.locale as Locales
	loadLocale(locale)

	return {
		props: {
			i18n: {
				locale: locale,
				dictionary: loadedLocales[locale],
			},
		},
	}
}