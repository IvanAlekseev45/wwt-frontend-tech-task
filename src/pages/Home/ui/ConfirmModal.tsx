/* eslint-disable i18next/no-literal-string */
import { useEffect, useId } from 'react'

interface ConfirmModalProps {
	onUseOld: () => void
	onApplyNew: () => void
	onClose: () => void
}

const ConfirmModal = ({ onUseOld, onApplyNew, onClose }: ConfirmModalProps) => {
	const titleId = useId()

	useEffect(() => {
		const handleEscape = (event: KeyboardEvent) => {
			if (event.key === 'Escape') {
				event.stopImmediatePropagation()
				onClose()
			}
		}

		document.addEventListener('keydown', handleEscape)

		return () => {
			document.removeEventListener('keydown', handleEscape)
		}
	}, [onClose])

	return (
		<div className="fixed inset-0 z-[60] flex items-center justify-center bg-black/40 p-4 backdrop-blur-[3px]">
			<div
				role="alertdialog"
				aria-modal="true"
				aria-labelledby={titleId}
				className="relative w-full max-w-[980px] rounded-2xl bg-white px-5 pb-12 pt-9 shadow-2xl sm:px-10 sm:pb-14"
			>
				<button
					type="button"
					onClick={onClose}
					aria-label="Close confirmation"
					className="absolute right-5 top-4 flex h-9 w-9 items-center justify-center rounded-full text-3xl font-light text-gray-700 transition-colors hover:bg-gray-100"
				>
					×
				</button>

				<h2
					id={titleId}
					className="mx-auto max-w-[760px] text-center text-2xl font-medium leading-snug text-gray-800 sm:text-[30px]"
				>
					Do you want to apply new filter
				</h2>

				<div className="mt-14 flex flex-col items-center justify-center gap-4 sm:mt-20 sm:flex-row sm:gap-6">
					<button
						type="button"
						onClick={onUseOld}
						className="min-h-12 w-full max-w-[220px] rounded-xl border border-gray-400 bg-white px-5 py-3 text-sm font-medium text-gray-800 transition-colors hover:bg-gray-100"
					>
						Use old filter
					</button>

					<button
						type="button"
						onClick={onApplyNew}
						className="min-h-12 w-full max-w-[220px] rounded-xl bg-orange-500 px-5 py-3 text-sm font-medium text-white transition-colors hover:bg-orange-600"
					>
						Apply new filter
					</button>
				</div>
			</div>
		</div>
	)
}

export default ConfirmModal
