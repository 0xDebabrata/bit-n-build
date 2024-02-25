import { Fragment, useState } from 'react'
import { Transition } from '@headlessui/react'
import { ArrowsPointingOutIcon, InboxIcon } from '@heroicons/react/24/outline'
import { XMarkIcon } from '@heroicons/react/20/solid'

export default function InfoBox() {
    const [show, setShow] = useState(true)

    return (
        <div className="pointer-events-auto w-full max-w-sm overflow-hidden rounded-lg bg-white shadow-md ring-1 ring-black ring-opacity-5">
            <div className="p-4">
                <div className="flex items-start">
                    <div className="flex-shrink-0">
                        <ArrowsPointingOutIcon className="h-6 w-6 text-gray-400" aria-hidden="true" />
                    </div>
                    <div className="ml-3 w-0 flex-1 pt-0.5">
                        <p className="text-sm font-medium text-gray-900">Swarm size</p>
                        <p className="mt-1 text-sm text-gray-500">
                            This swarm is estimated to contain 2.3 lakh locusts, capable of covering around 103 sq kms in size. Farmers are advised to stay ale..
                            <div className="mt-3 flex space-x-7">
                                <button
                                    type="button"
                                    className="rounded-md bg-white text-sm font-medium text-indigo-600 hover:text-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                                >
                                    More info
                                </button>
                            </div>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    )
}
