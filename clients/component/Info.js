import { Dialog, Transition } from '@headlessui/react'
import { Fragment, useState } from 'react'
import { ChevronLeftIcon, ChevronRightIcon, InformationCircleIcon } from "@heroicons/react/24/outline"

const helpInfo = [
  {
    title: "Map",
    description: "The map shows a quick view of the current locust swarm attacks. It allows you to interactively inspect swarm movements across the country.",
  },
  {
    title: "Swarm information",
    description: "You can inspect any swarm hotspot to get detailed information about the type and speed of swarm as well as control measures.",
  },
  {
    title: "Forecast",
    description: "You can toggle between different time views to see how a swarm migrates across regions over time. This is powered by our unique AI based migration algorithms.",
  },
]

const Info = () => {
  let [isOpen, setIsOpen] = useState(true)
  const [step, setStep] = useState(0)

  function closeModal() {
    setIsOpen(false)
  }

  function openModal() {
    setIsOpen(true)
  }

  return (
    <>
      <div className="">
        <button
          type="button"
          onClick={openModal}
          className="rounded-md bg-white p-2" 
        >
          <InformationCircleIcon className="h-7 w-7" />
        </button>
      </div>

      <Transition appear show={isOpen} as={Fragment}>
        <Dialog as="div" className="relative z-10" onClose={closeModal}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black/25" />
          </Transition.Child>

          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4 text-center">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                  <Dialog.Title
                    as="h3"
                    className="text-lg font-medium leading-6 text-gray-900"
                  >
                    {helpInfo[step].title}
                  </Dialog.Title>
                  <div className="mt-2">
                    <p className="text-sm text-gray-500">
                      {helpInfo[step].description}
                    </p>
                  </div>

                  <div className="mt-4 flex space-x-2">
                    <button
                      type="button"
                      className="inline-flex justify-center rounded-md border border-transparent bg-blue-100 p-1 text-sm font-medium"
                      onClick={() => setStep(Math.max(0, step - 1))}
                    >
                      <ChevronLeftIcon className='h-6 w-6' />
                    </button>
                    <button
                      type="button"
                      className="inline-flex justify-center rounded-md border border-transparent bg-blue-100 p-1 text-sm font-medium"
                      onClick={() => setStep(Math.min(2, step + 1))}
                    >
                      <ChevronRightIcon className='h-6 w-6' />
                    </button>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  )
}

export default Info
