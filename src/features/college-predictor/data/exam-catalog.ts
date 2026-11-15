export type PredictorCourse = 'engineering' | 'medical'

export type CatalogExam = { slug: string; label: string; short: string; region: string; counselling: string }

export const predictorCourses: { id: PredictorCourse; label: string; title: string }[] = [
  { id: 'engineering', label: 'Engineering', title: 'B.Tech / B.E.' },
  { id: 'medical', label: 'Medical', title: 'MBBS / BDS' },
]

export const examCatalog: Record<PredictorCourse, CatalogExam[]> = {
  engineering: [
    { slug: 'jee-main', label: 'JEE Main', short: 'JEE M', region: 'National', counselling: 'JoSAA' },
    { slug: 'jee-advanced', label: 'JEE Advanced', short: 'JEE A', region: 'National', counselling: 'JoSAA' },
    { slug: 'bitsat', label: 'BITSAT', short: 'BITS', region: 'National', counselling: 'BITS Pilani' },
    { slug: 'viteee', label: 'VITEEE', short: 'VIT', region: 'National', counselling: 'VIT' },
    { slug: 'srmjeee', label: 'SRMJEEE', short: 'SRM', region: 'National', counselling: 'SRMIST' },
    { slug: 'met', label: 'MET', short: 'MET', region: 'National', counselling: 'Manipal' },
    { slug: 'comedk-uget', label: 'COMEDK UGET', short: 'COMED', region: 'Karnataka', counselling: 'COMEDK' },
    { slug: 'kcet', label: 'KCET', short: 'KCET', region: 'Karnataka', counselling: 'KEA' },
    { slug: 'mht-cet', label: 'MHT CET', short: 'MHT', region: 'Maharashtra', counselling: 'State CET Cell' },
    { slug: 'wbjee', label: 'WBJEE', short: 'WBJEE', region: 'West Bengal', counselling: 'WBJEEB' },
    { slug: 'tnea', label: 'TNEA', short: 'TNEA', region: 'Tamil Nadu', counselling: 'DOTE' },
    { slug: 'keam', label: 'KEAM', short: 'KEAM', region: 'Kerala', counselling: 'CEE Kerala' },
    { slug: 'ap-eapcet', label: 'AP EAPCET', short: 'AP', region: 'Andhra Pradesh', counselling: 'APSCHE' },
    { slug: 'ts-eapcet', label: 'TS EAPCET', short: 'TS', region: 'Telangana', counselling: 'TGCHE' },
    { slug: 'gujcet', label: 'GUJCET', short: 'GUJ', region: 'Gujarat', counselling: 'ACPC' },
    { slug: 'ojee', label: 'OJEE', short: 'OJEE', region: 'Odisha', counselling: 'OJEE' },
    { slug: 'ipu-cet', label: 'IPU CET', short: 'IPU', region: 'Delhi', counselling: 'GGSIPU' },
    { slug: 'jac-delhi', label: 'JAC Delhi', short: 'JAC D', region: 'Delhi', counselling: 'JAC Delhi' },
    { slug: 'jac-chandigarh', label: 'JAC Chandigarh', short: 'JAC C', region: 'Chandigarh', counselling: 'JAC Chandigarh' },
    { slug: 'hstes', label: 'HSTES', short: 'HSTES', region: 'Haryana', counselling: 'HSTES' },
    { slug: 'reap', label: 'REAP', short: 'REAP', region: 'Rajasthan', counselling: 'REAP' },
    { slug: 'uptac', label: 'UPTAC', short: 'UPTAC', region: 'Uttar Pradesh', counselling: 'AKTU' },
    { slug: 'bihar-ugeac', label: 'Bihar UGEAC', short: 'BCECE', region: 'Bihar', counselling: 'BCECEB' },
    { slug: 'cg-pet', label: 'CG PET', short: 'CG', region: 'Chhattisgarh', counselling: 'CG Vyapam' },
    { slug: 'mp-dte', label: 'MP DTE', short: 'MP', region: 'Madhya Pradesh', counselling: 'MP DTE' },
    { slug: 'cusat-cat', label: 'CUSAT CAT', short: 'CUSAT', region: 'Kerala', counselling: 'CUSAT' },
    { slug: 'dasa-ug', label: 'DASA UG', short: 'DASA', region: 'NRI / foreign', counselling: 'DASA' },
    { slug: 'aeee', label: 'AEEE', short: 'AEEE', region: 'National', counselling: 'Amrita' },
  ],
  medical: [
    { slug: 'neet-ug', label: 'NEET UG (All India)', short: 'NEET', region: 'National', counselling: 'MCC' },
    { slug: 'neet-ug-maharashtra', label: 'NEET UG Maharashtra', short: 'MH', region: 'Maharashtra', counselling: 'State CET Cell' },
    { slug: 'neet-ug-karnataka', label: 'NEET UG Karnataka', short: 'KA', region: 'Karnataka', counselling: 'KEA' },
    { slug: 'neet-ug-tamil-nadu', label: 'NEET UG Tamil Nadu', short: 'TN', region: 'Tamil Nadu', counselling: 'TN Selection Committee' },
    { slug: 'neet-ug-uttar-pradesh', label: 'NEET UG Uttar Pradesh', short: 'UP', region: 'Uttar Pradesh', counselling: 'DGME UP' },
    { slug: 'neet-ug-rajasthan', label: 'NEET UG Rajasthan', short: 'RJ', region: 'Rajasthan', counselling: 'RUHS' },
    { slug: 'neet-ug-gujarat', label: 'NEET UG Gujarat', short: 'GJ', region: 'Gujarat', counselling: 'ACPUGMEC' },
    { slug: 'neet-ug-kerala', label: 'NEET UG Kerala', short: 'KL', region: 'Kerala', counselling: 'CEE Kerala' },
    { slug: 'neet-ug-west-bengal', label: 'NEET UG West Bengal', short: 'WB', region: 'West Bengal', counselling: 'WBMCC' },
    { slug: 'neet-ug-telangana', label: 'NEET UG Telangana', short: 'TS', region: 'Telangana', counselling: 'KNRUHS' },
    { slug: 'neet-ug-andhra-pradesh', label: 'NEET UG Andhra Pradesh', short: 'AP', region: 'Andhra Pradesh', counselling: 'NTRUHS' },
    { slug: 'neet-ug-madhya-pradesh', label: 'NEET UG Madhya Pradesh', short: 'MP', region: 'Madhya Pradesh', counselling: 'DME MP' },
  ],
}

export const isPredictorCourse = (value: string | undefined): value is PredictorCourse => value === 'engineering' || value === 'medical'
