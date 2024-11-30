import { createSignal, For } from 'solid-js'

export default function PlaybackSpeedControl() {
  const speeds = [0.5, 0.75, 1, 1.25, 1.5]
  const [selectedSpeed, setSelectedSpeed] = createSignal(1)

  return (
    <div class="bg-gray-900 text-white p-4 rounded-lg shadow-lg w-64">
      <h2 class="text-lg font-semibold mb-3">Kecepatan Pemutaran</h2>
      <div class="relative">
        <div class="absolute w-full h-0.5 bg-gray-600"></div>
        <div class="flex justify-between">
          <For each={speeds}>
            {(speed) => (
              <button
                class={`w-4 h-4 rounded-full focus:outline-none focus:ring-2 focus:ring-white transform transition-transform duration-200 ${
                  selectedSpeed() === speed ? 'bg-white scale-125' : 'bg-gray-600 hover:bg-gray-400'
                }`}
                onClick={() => setSelectedSpeed(speed)}
                style={{ 'margin-top': '-0.375rem' }}
              ></button>
            )}
          </For>
        </div>
        <div class="flex justify-between mt-2">
          <For each={speeds}>
            {(speed) => (
              <span class={`text-xs ${selectedSpeed() === speed ? 'text-white' : 'text-gray-400'}`}>
                {speed}x
              </span>
            )}
          </For>
        </div>
      </div>
    </div>
  )
}