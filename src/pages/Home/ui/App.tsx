/* eslint-disable i18next/no-literal-string */
import { useState } from 'react'

import { useFiltersStore } from '@/practiceStore'

import Modal from './Modal'

export const App = () => {
	const [isOpenModal, setIsOpenModal] = useState(false)
	const appliedFilters = useFiltersStore(state => state.appliedFilters)

	return (
		<main className="min-h-screen bg-gray-100 px-5 py-10 sm:px-10">
			<div className="mx-auto max-w-5xl">
				<h1 className="mb-6 text-2xl font-semibold text-gray-900">
					Accommodation filters
				</h1>

				<button
					type="button"
					onClick={() => setIsOpenModal(true)}
					className="rounded-lg bg-orange-500 px-6 py-3 font-medium text-white transition-colors hover:bg-orange-600"
				>
					Filters
				</button>

				<section className="mt-9">
					<h2 className="mb-3 text-lg font-medium text-gray-900">
						Applied filters
					</h2>

					<pre className="overflow-x-auto rounded-xl bg-white p-5 text-sm text-gray-800 shadow-sm">
						{JSON.stringify(appliedFilters, null, 2)}
					</pre>
				</section>
			</div>

			{isOpenModal && (
				<Modal
					title="Filter"
					onClose={() => setIsOpenModal(false)}
				/>
			)}
		</main>
	)
}
