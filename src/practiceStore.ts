import { create } from 'zustand'

import type { SearchRequestFilter } from '@/shared/api/types/SearchRequest/SearchRequestFilter'

interface FiltersStore {
	appliedFilters: SearchRequestFilter
	setAppliedFilters: (filters: SearchRequestFilter) => void
}

export const useFiltersStore = create<FiltersStore>()(set => ({
	appliedFilters: [],

	setAppliedFilters: filters => {
		set({ appliedFilters: filters })
	}
}))
