/* eslint-disable i18next/no-literal-string */
import { useEffect, useId, useState } from 'react'

import { useFiltersStore } from '@/practiceStore'
import { FilterType } from '@/shared/api/types/Filter'
import type { SearchRequestFilter } from '@/shared/api/types/SearchRequest/SearchRequestFilter'
import filterData from '@/shared/temp/filterData.json'

import ConfirmModal from './ConfirmModal'

interface ModalProps {
	onClose: () => void
	title: string
}

const Modal = ({ onClose, title }: ModalProps) => {
	const appliedFilters = useFiltersStore(state => state.appliedFilters)
	const setAppliedFilters = useFiltersStore(state => state.setAppliedFilters)

	const [selectedOptions, setSelectedOptions] =
		useState<SearchRequestFilter>(appliedFilters)

	const [isConfirmOpen, setIsConfirmOpen] = useState(false)

	const titleId = useId()

	useEffect(() => {
		const previousOverflow = document.body.style.overflow
		document.body.style.overflow = 'hidden'

		return () => {
			document.body.style.overflow = previousOverflow
		}
	}, [])

	useEffect(() => {
		if (isConfirmOpen) {
			return
		}

		const handleEscape = (event: KeyboardEvent) => {
			if (event.key === 'Escape') {
				onClose()
			}
		}

		document.addEventListener('keydown', handleEscape)

		return () => {
			document.removeEventListener('keydown', handleEscape)
		}
	}, [isConfirmOpen, onClose])

	const isOptionSelected = (groupId: string, optionId: string) => {
		return selectedOptions.some(
			filter => filter.id === groupId && filter.optionsIds.includes(optionId)
		)
	}

	const handleToggleOption = (optionId: string, groupId: string) => {
		setSelectedOptions(prev => {
			const existingGroup = prev.find(filter => filter.id === groupId)

			if (!existingGroup) {
				return [
					...prev,
					{
						id: groupId,
						type: FilterType.OPTION,
						optionsIds: [optionId]
					}
				]
			}

			if (existingGroup.optionsIds.includes(optionId)) {
				return prev
					.map(filter => {
						if (filter.id !== groupId) {
							return filter
						}

						return {
							...filter,
							optionsIds: filter.optionsIds.filter(id => id !== optionId)
						}
					})
					.filter(filter => filter.optionsIds.length > 0)
			}

			return prev.map(filter => {
				if (filter.id !== groupId) {
					return filter
				}

				return {
					...filter,
					optionsIds: [...filter.optionsIds, optionId]
				}
			})
		})
	}

	const handleApply = () => {
		setIsConfirmOpen(true)
	}

	const handleApplyNew = () => {
		setAppliedFilters(selectedOptions)
		onClose()
	}

	const handleUseOld = () => {
		onClose()
	}

	const handleClearAll = () => {
		setSelectedOptions([])
	}

	return (
		<div className="fixed inset-0 z-50 flex items-center justify-center bg-black/45 p-3 backdrop-blur-sm sm:p-6">
			<div
				role="dialog"
				aria-modal="true"
				aria-labelledby={titleId}
				className="flex max-h-[94vh] w-full max-w-[1000px] flex-col overflow-hidden rounded-2xl bg-white shadow-2xl sm:max-h-[92vh]"
			>
				<header className="relative flex shrink-0 items-center justify-center border-b border-gray-300 px-12 py-6 sm:py-7">
					<h2
						id={titleId}
						className="text-2xl font-medium text-gray-800 sm:text-[30px]"
					>
						{title}
					</h2>

					<button
						type="button"
						onClick={onClose}
						aria-label="Close filters"
						className="absolute right-5 top-1/2 flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-full text-3xl font-light text-gray-700 transition-colors hover:bg-gray-100"
					>
						×
					</button>
				</header>

				<div className="min-h-0 flex-1 overflow-y-auto px-6 sm:px-8">
					{filterData.filterItems.map(group => (
						<section
							key={group.id}
							className="border-b border-gray-300 py-7 sm:py-8"
						>
							<h3 className="mb-5 text-lg font-medium text-gray-800 sm:text-xl">
								{group.name}
							</h3>

							<div className="grid grid-cols-1 gap-x-8 gap-y-4 sm:grid-cols-2 lg:grid-cols-3">
								{group.options.map(option => (
									<label
										key={option.id}
										className="flex cursor-pointer items-start gap-3 text-[13px] leading-5 text-gray-700"
									>
										<input
											type="checkbox"
											checked={isOptionSelected(group.id, option.id)}
											onChange={() => handleToggleOption(option.id, group.id)}
											className="mt-0.5 h-4 w-4 shrink-0 cursor-pointer accent-orange-500"
										/>

										<span>{option.name}</span>
									</label>
								))}
							</div>
						</section>
					))}
				</div>

				<footer className="relative flex shrink-0 flex-col items-center gap-4 border-t border-gray-300 bg-white px-6 py-6 sm:min-h-[105px] sm:flex-row sm:justify-center sm:px-8">
					<button
						type="button"
						onClick={handleApply}
						className="min-h-12 w-40 rounded-xl bg-orange-500 px-8 py-3 text-sm font-medium text-white transition-colors hover:bg-orange-600"
					>
						Apply
					</button>

					<button
						type="button"
						onClick={handleClearAll}
						className="text-sm text-cyan-700 underline underline-offset-2 transition-colors hover:text-cyan-900 sm:absolute sm:right-8"
					>
						Clear all parameters
					</button>
				</footer>
			</div>

			{isConfirmOpen && (
				<ConfirmModal
					onUseOld={handleUseOld}
					onApplyNew={handleApplyNew}
					onClose={() => setIsConfirmOpen(false)}
				/>
			)}
		</div>
	)
}

export default Modal
