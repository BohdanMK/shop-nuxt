export interface CompanyInfoBannerContent {
	title: string;
	subtitle: string;
	image: string;
	imageAlt: string;
	bgImage?: string;
	bgImageAlt?: string;
}

export interface CompanyInfoLogo {
	src: string;
	alt: string;
}

export interface CompanyInfo {
	_id?: string;
	aboutDescription: string;
	bannerContents: CompanyInfoBannerContent[];
	companyLogo: CompanyInfoLogo;
	companyTitle: string;
}
