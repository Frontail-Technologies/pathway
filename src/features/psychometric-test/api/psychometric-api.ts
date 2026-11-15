import { catalogGet } from '@/services/api/catalog'
import type { PsychometricTest } from '../data/psychometric'

export const getPsychometricTest = () => catalogGet<PsychometricTest>('/psychometric/test').catch(() => null)
